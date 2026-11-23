// Field-level sync for FORM. Arrays with stable item IDs merge by ID rather than index.
const clone=v=>structuredClone(v),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const unsafe=k=>['__proto__','constructor','prototype'].includes(k);
const key=p=>JSON.stringify(p);
function stampCompare(a,b){for(let i=0;i<3;i++){if(a[i]!==b[i])return a[i]>b[i]?1:-1}return 0}
export function flattenState(state){
 const cells={};
 function visit(v,p,order,epoch){
  if(p.length>32)throw Error('Entry nesting exceeds sync limits.');
  if(p[0]==='logs'&&p.length===2&&v&&typeof v==='object')epoch=String(v.historyId||v.startedAt||'not-started');
  const c={type:'value',value:v};if(order!==undefined)c.order=order;if(epoch!==undefined)c.epoch=epoch;
  if(Array.isArray(v)&&v.every(x=>x&&typeof x==='object'&&typeof x.id==='string')&&new Set(v.map(x=>x.id)).size===v.length){c.type='array';delete c.value;cells[key(p)]=c;v.forEach((x,i)=>visit(x,[...p,'@'+x.id],i,epoch));return}
  if(v&&typeof v==='object'&&!Array.isArray(v)){c.type='object';delete c.value;cells[key(p)]=c;for(const [k,x] of Object.entries(v)){if(unsafe(k))throw Error('Invalid entry field.');if(p.length===0&&['recipes','syncMetadata'].includes(k))continue;if(x!==undefined)visit(x,[...p,k],undefined,epoch)}return}
  if(v===undefined)return;cells[key(p)]=clone(c);
 }
 visit(state,[]);return cells;
}
export function validDocument(doc){
 if(!doc||doc.format!==1||!doc.cells||Array.isArray(doc.cells)||typeof doc.cells!=='object'||Object.keys(doc.cells).length>60000)return false;
 return Object.entries(doc.cells).every(([k,c])=>{let p;try{p=JSON.parse(k)}catch{return false}return Array.isArray(p)&&p.length<=32&&p.every(s=>typeof s==='string'&&!unsafe(s))&&c&&['object','array','value','deleted'].includes(c.type)&&Array.isArray(c.t)&&c.t.length===3&&Number.isSafeInteger(c.t[0])&&c.t[0]>=0&&Number.isSafeInteger(c.t[1])&&c.t[1]>=0&&typeof c.t[2]==='string'&&c.t[2].length<=100&&(c.order===undefined||Number.isFinite(c.order))&&(c.epoch===undefined||typeof c.epoch==='string')});
}
export function mergeDocuments(a,b){
 if(!validDocument(a)||!validDocument(b))throw Error('The saved sync document is invalid.');
 const out=clone(a);for(const [p,c] of Object.entries(b.cells)){const old=out.cells[p],cmp=old?stampCompare(c.t,old.t):1;if(cmp>0||(cmp===0&&JSON.stringify(c)>JSON.stringify(old)))out.cells[p]=clone(c)}return out;
}
export function materializeDocument(doc){
 if(!validDocument(doc))throw Error('Invalid sync document.');
 const children=new Map();for(const k of Object.keys(doc.cells)){const p=JSON.parse(k);if(p.length){const parent=key(p.slice(0,-1));if(!children.has(parent))children.set(parent,[]);children.get(parent).push(k)}}
 function read(k,parentEpoch){const c=doc.cells[k];if(!c||c.type==='deleted'||(parentEpoch!==undefined&&c.epoch!==parentEpoch))return undefined;const epoch=c.epoch??parentEpoch;if(c.type==='value')return clone(c.value);const kids=children.get(k)||[];if(c.type==='array')return kids.sort((a,b)=>(doc.cells[a].order??0)-(doc.cells[b].order??0)||a.localeCompare(b)).map(p=>read(p,epoch)).filter(v=>v!==undefined);const result={};for(const p of kids){const name=JSON.parse(p).at(-1),v=read(p,epoch);if(v!==undefined)result[name]=v}return result}
 return read('[]');
}
export function applyState(doc,state,writer,now=Date.now()){
 if(!validDocument(doc))throw Error('Invalid sync document.');
 const next=flattenState(state),out=clone(doc);let latest=[0,0,''];for(const c of Object.values(doc.cells))if(stampCompare(c.t,latest)>0)latest=c.t;
 const t=[Math.max(now,latest[0]),now>latest[0]?0:latest[1]+1,writer];
 for(const [p,c] of Object.entries(next)){const old=out.cells[p];if(!old||!same({...old,t:undefined},c))out.cells[p]={...c,t}}
 for(const [p,c] of Object.entries(out.cells)){if(!(p in next)&&c.type!=='deleted')out.cells[p]={type:'deleted',t,...(c.epoch===undefined?{}:{epoch:c.epoch})}}
 return out;
}
export function newDocument(state,writer,now=Date.now()){return applyState({format:1,cells:{}},state,writer,now)}
// Used only on the first connection of a browser that already has local entries.
// All conflicting nonempty scalar values are returned for explicit review.
export function mergeExistingEntries(local,remote){
 const incoming=clone(local),base=clone(remote),conflicts=[];
 for(const [month,m] of Object.entries(incoming.habitJournal?.months||{})){
  const other=base.habitJournal?.months?.[month];if(!other)continue;const mapping=new Map();
  for(const h of m.habits){const match=other.habits.find(x=>x.id===h.id)||other.habits.find(x=>x.name.trim().toLowerCase()===h.name.trim().toLowerCase());if(match){mapping.set(h.id,match.id);h.id=match.id}}
  for(const d of Object.values(m.days))for(const [old,id] of mapping)if(old!==id&&Object.hasOwn(d.done,old)){d.done[id]=d.done[id]||d.done[old];delete d.done[old]}
 }
 function merge(a,b,p=[]){
  if(a===undefined)return clone(b);if(b===undefined)return clone(a);if(same(a,b))return clone(a);
  if(a===null||a==='')return clone(b);if(b===null||b==='')return clone(a);
  if(Array.isArray(a)&&Array.isArray(b)){
   if([...a,...b].every(x=>x&&typeof x==='object'&&typeof x.id==='string')){const ids=[...new Set([...b,...a].map(x=>x.id))];return ids.map(id=>merge(a.find(x=>x.id===id),b.find(x=>x.id===id),[...p,'@'+id]))}
   if(!a.length)return clone(b);if(!b.length)return clone(a);
  }
  if(a&&b&&typeof a==='object'&&typeof b==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
   const out={};for(const k of new Set([...Object.keys(a),...Object.keys(b)])){if(unsafe(k))throw Error('Invalid field.');if(p.length===0&&k==='recipes')continue;out[k]=merge(a[k],b[k],[...p,k])}return out;
  }
  if(typeof a==='boolean'&&typeof b==='boolean'&&p.includes('done'))return a||b;
  if(typeof a==='string'&&typeof b==='string'&&['insight','notes'].includes(p.at(-1))){if(a.includes(b))return a;if(b.includes(a))return b;return b+'\n\n[From this device]\n'+a}
  conflicts.push({path:p,local:clone(a),remote:clone(b)});return clone(b);
 }
 const state=merge(incoming,base);return {state,conflicts};
}
export function resolveConflict(state,path,value){
 let node=state;for(const part of path.slice(0,-1)){node=part.startsWith('@')&&Array.isArray(node)?node.find(x=>x.id===part.slice(1)):node[part];if(!node)throw Error('Missing conflict target')}
 const last=path.at(-1);if(last.startsWith('@')&&Array.isArray(node)){const i=node.findIndex(x=>x.id===last.slice(1));if(i<0)throw Error('Missing entry');node[i]=clone(value)}else node[last]=clone(value);return state;
}
// Capture only the local edit, preserving remote fields not yet painted in the UI.
export function applyDelta(doc,before,after,writer,now=Date.now()){
 if(!validDocument(doc))throw Error('Invalid sync document.');const a=flattenState(before),b=flattenState(after),out=clone(doc);let latest=[0,0,''];for(const c of Object.values(doc.cells))if(stampCompare(c.t,latest)>0)latest=c.t;const t=[Math.max(now,latest[0]),now>latest[0]?0:latest[1]+1,writer];
 for(const [p,c] of Object.entries(b))if(!same(a[p],c))out.cells[p]={...c,t};
 for(const [p,c] of Object.entries(a))if(!(p in b))out.cells[p]={type:'deleted',t,...(c.epoch===undefined?{}:{epoch:c.epoch})};
 return out;
}
export function sameDocument(a,b){const stable=v=>v&&typeof v==='object'?Array.isArray(v)?v.map(stable):Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;return JSON.stringify(stable(a))===JSON.stringify(stable(b))}
