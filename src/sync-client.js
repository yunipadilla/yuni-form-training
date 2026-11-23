window.FormCloudSync=(()=>{
 const E=FormSyncCore,writer=crypto.randomUUID();let options,doc=null,baseline=null,bootstrapped=false,revision=null,remoteDoc=null,auth=null,flight=false,again=false,timer,initialized=false,awaitingMerge=false,cacheDb,persistQueue=Promise.resolve(),lastSync=null,channel;
 const clone=v=>structuredClone(v);let status='Connecting sync…',detail='Your entries are saved on this browser while sync connects.';
 const localProof=()=>{const s=window.FormAccess?.getSyncProof?.();if(!s||Date.now()>=s.expiresAt)throw Error('Unlock FORM again to sync.');return s};
 function setStatus(s,d){status=s;detail=d||detail;const b=document.getElementById('sync-status');if(b){b.textContent=s;b.title=detail;b.setAttribute('aria-label','Cloud sync: '+s);b.dataset.status=s==='Synced'?'ok':s.includes('Offline')?'offline':'pending';b.onclick=openDialog}}
 async function cache(){if(cacheDb)return cacheDb;cacheDb=await new Promise((resolve,reject)=>{const r=indexedDB.open('form-cloud-sync',1);r.onupgradeneeded=()=>r.result.createObjectStore('replicas');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});return cacheDb}
 async function cacheGet(){try{const db=await cache();return await new Promise((resolve,reject)=>{const r=db.transaction('replicas').objectStore('replicas').get('personal');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}catch{try{return JSON.parse(localStorage.getItem('form-cloud-sync-cache-v1'))}catch{return null}}}
 async function cachePut(value){try{const db=await cache();await new Promise((resolve,reject)=>{const t=db.transaction('replicas','readwrite');t.objectStore('replicas').put(value,'personal');t.oncomplete=resolve;t.onerror=()=>reject(t.error)})}catch{try{localStorage.setItem('form-cloud-sync-cache-v1',JSON.stringify(value))}catch{}}}
 async function saveOriginalBackup(value){try{const db=await cache();await new Promise((resolve,reject)=>{const t=db.transaction('replicas','readwrite');t.objectStore('replicas').put(clone(value),'before-first-sync');t.oncomplete=resolve;t.onerror=()=>reject(t.error)})}catch{}}
 function persist(){if(!doc||!baseline)return;const snapshot={doc:clone(doc),baseline:clone(baseline),bootstrapped,revision,lastSync};persistQueue=persistQueue.then(()=>cachePut(snapshot));return persistQueue}
 function schedule(ms=900){clearTimeout(timer);timer=setTimeout(sync,ms)}
 function editing(){return document.getElementById('modal')?.open||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)}
 function paint(){if(!doc||!bootstrapped||editing())return;const value=E.materializeDocument(doc);if(!options.valid(value))throw Error('The synced entries could not be read. Your local copy is safe.');if(JSON.stringify(value)!==JSON.stringify(options.getState())){options.setState(value);baseline=clone(value);options.render();persist()}}
 function changed(value){if(!initialized)return;const next=clone(value);if(doc&&bootstrapped){doc=E.applyDelta(doc,baseline,next,writer);channel?.postMessage({doc});}baseline=next;persist();setStatus(navigator.onLine?'Waiting to sync…':'Offline · saved here','Changes are saved on this browser and will upload when connected.');schedule()}
 async function request(path,init={}){
  const proof=localProof();if(!auth||auth.expiresAt<Date.now()+5000||auth.expiresAt>proof.expiresAt){
   const r=await fetch(FORM_SYNC_CONFIG.url+'/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({proof:[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('FORM/session/v1/'+proof.key)))].map(n=>n.toString(16).padStart(2,'0')).join(''),expiresAt:proof.expiresAt})});const v=await r.json().catch(()=>({}));if(!r.ok)throw Error(v.error||'Sync is unavailable. Your local copy is safe.');auth=v;
  }
  const r=await fetch(FORM_SYNC_CONFIG.url+path,{...init,headers:{...init.headers,Authorization:'Bearer '+auth.token}});if(r.status===401){auth=null;throw Error('Your sync session needs to reconnect. Your entries are saved here.')}return r;
 }
 async function remote(){const r=await request('/journal',{headers:revision===null?{}:{'If-None-Match':'"'+revision+'"'}});if(r.status===304)return {revision,payloadUnchanged:true};const v=await r.json().catch(()=>({}));if(!r.ok)throw Error(v.error||'Sync is temporarily unavailable.');if(!Number.isSafeInteger(v.revision)||v.revision<0)throw Error('Invalid sync response.');return v}
 function completeFirstMerge(merged){if(!options.valid(merged))throw Error('These entries could not be merged. Export a backup before trying again.');doc=remoteDoc?E.applyState(remoteDoc,merged,writer):E.newDocument(merged,writer);bootstrapped=true;awaitingMerge=false;baseline=clone(options.getState());paint();persist();schedule(0)}
 async function firstMerge(cloud){
  if(!cloud){completeFirstMerge(options.getState());return}
  const saved=E.materializeDocument(cloud);if(!options.valid(saved))throw Error('The cloud copy is invalid. Your local entries have not changed.');
  const result=E.mergeExistingEntries(options.getState(),saved);await saveOriginalBackup(options.getState());
  if(result.conflicts.length){awaitingMerge=true;setStatus('Review saved entries','Some existing values differ across your devices. Review the choices before combining them.');openMergeDialog();return}
  completeFirstMerge(result.state);
 }
 async function sync(){
  if(!initialized||!FORM_SYNC_CONFIG.url)return;if(flight){again=true;return}if(awaitingMerge)return;if(!navigator.onLine){setStatus('Offline · saved here','Entries are saved here. Sync resumes when you reconnect.');return}
  flight=true;try{
   setStatus('Syncing…','Checking the shared journal and uploading pending entries.');
   let settled=false;for(let attempt=0;attempt<4;attempt++){
    const data=await remote();revision=data.revision;
    if(!data.payloadUnchanged){remoteDoc=data.payload?await E.decryptDocument(data.payload,localProof().key):null;if(remoteDoc&&!E.validDocument(remoteDoc))throw Error('The shared journal is invalid. Your local copy is safe.')}
    if(!bootstrapped){await firstMerge(remoteDoc);if(awaitingMerge)return}
    else if(remoteDoc){doc=E.mergeDocuments(doc,remoteDoc);paint();await persist()}
    if(remoteDoc&&E.sameDocument(doc,remoteDoc)){lastSync=Date.now();setStatus('Synced','Last synced '+new Date(lastSync).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})+'. Open FORM on your other device to receive updates.');await persist();settled=true;break}
    const sending=clone(doc),payload=await E.encryptDocument(sending,localProof().key),body=JSON.stringify({baseRevision:revision,payload});
    const r=await request('/journal',{method:'PUT',headers:{'Content-Type':'application/json'},body,keepalive:body.length<60000});
    if(r.status===409){revision=null;continue}const result=await r.json().catch(()=>({}));if(!r.ok)throw Error(result.error||'Sync has not completed. Your entries are saved here.');
    revision=result.revision;remoteDoc=sending;lastSync=Date.now();await persist();
    if(!E.sameDocument(doc,sending)){again=true;setStatus('Waiting to sync…');settled=true;break}
    setStatus('Synced','Last synced '+new Date(lastSync).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})+'. Open FORM on your other device to receive updates.');settled=true;break;
   }
   if(!settled){setStatus('Waiting to sync…','Another device is saving. Retrying shortly; your local copy is safe.');schedule(3000)}
  }catch(e){setStatus(navigator.onLine?'Not synced · saved here':'Offline · saved here',e.message||'Sync is temporarily unavailable. Your local copy is safe.');schedule(30000)}finally{flight=false;if(again){again=false;schedule(500)}}
 }
 function download(value,name){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
 function labelConflict(c){const p=c.path,fields={ouraScore:'Oura sleep score',sleepHours:'Sleep hours',active:'Habit visibility',name:'Name',reps:'Repetitions',weight:'Weight',duration:'Workout minutes',completedAt:'Workout date'};const date=p.includes('months')?p[p.indexOf('months')+1]+'-'+(p.includes('days')?p[p.indexOf('days')+1]:''):'';return (date?date+' · ':p[0]==='block'?'Training plan · ':p[0]==='logs'?'Workout entry · ':'Saved setting · ')+(fields[p.at(-1)]||p.at(-1))}
 const preview=v=>typeof v==='object'?'Saved version (included in your backup)':String(v??'Blank').slice(0,220);
 function openMergeDialog(){
  if(document.getElementById('modal')?.open){setStatus('Review saved entries','Finish the open dialog, then tap Sync to review existing entries.');return}
  const result=E.mergeExistingEntries(options.getState(),E.materializeDocument(remoteDoc));
  modal('Bring your devices together',`<p class="subtitle">Your existing checkoffs are combined and different notes are both kept. For the values below, choose which to keep. Your original device copy is available to download before merging.</p><form id="sync-merge-form"><div class="sync-conflicts">${result.conflicts.map((c,i)=>`<fieldset><legend>${esc(labelConflict(c))}</legend><label><input type="radio" name="conflict-${i}" value="remote" checked> Synced copy: ${esc(preview(c.remote))}</label><label><input type="radio" name="conflict-${i}" value="local"> This device: ${esc(preview(c.local))}</label></fieldset>`).join('')}</div><div class="modal-buttons"><button class="btn light" type="button" id="download-before-sync">Download this device’s backup</button><button class="btn" type="submit">Merge my entries</button></div></form>`);
  document.getElementById('download-before-sync').onclick=()=>download(options.getState(),'form-before-sync.json');
  document.getElementById('sync-merge-form').onsubmit=e=>{e.preventDefault();const choices=new FormData(e.target);result.conflicts.forEach((c,i)=>{if(choices.get('conflict-'+i)==='local')E.resolveConflict(result.state,c.path,c.local)});document.getElementById('modal').close();try{completeFirstMerge(result.state)}catch(error){setStatus('Not synced · saved here',error.message)}};
 }
 function openDialog(){if(awaitingMerge){openMergeDialog();return}modal('Phone + computer sync',`<p class="sync-modal-status">${esc(status)}</p><p class="subtitle">${esc(detail)}</p><div class="notice">Use the same FORM website and password on both devices. Entries sync automatically while FORM is open. Offline changes stay on this device until you reconnect and the status says Synced.</div><div class="modal-buttons"><button class="btn light" id="sync-export">Export backup</button><button class="btn" id="sync-now">Sync now</button></div>`);document.getElementById('sync-export').onclick=backup;document.getElementById('sync-now').onclick=()=>{document.getElementById('modal').close();sync()}}
 async function start(o){
  options=o;baseline=clone(o.getState());if(!FORM_SYNC_CONFIG.url){setStatus('Saved on this device','Sync is not connected yet.');return}
  const saved=await cacheGet();if(saved?.doc&&E.validDocument(saved.doc)&&saved.bootstrapped){doc=E.applyDelta(saved.doc,saved.baseline||E.materializeDocument(saved.doc),options.getState(),writer);bootstrapped=true;revision=saved.revision??null;lastSync=saved.lastSync||null;baseline=clone(options.getState());paint()}
  initialized=true;try{channel=new BroadcastChannel('form-cloud-sync-v1');channel.onmessage=e=>{if(doc&&bootstrapped&&E.validDocument(e.data?.doc)){doc=E.mergeDocuments(doc,e.data.doc);paint();persist();schedule()}}}catch{}
  window.addEventListener('online',()=>sync());window.addEventListener('offline',()=>setStatus('Offline · saved here','Your changes will sync after reconnecting.'));window.addEventListener('focus',()=>sync());document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();else if(doc&&bootstrapped)schedule(0)});document.addEventListener('focusout',()=>setTimeout(()=>{try{paint()}catch{}},80));
  setInterval(()=>{if(!document.hidden&&!awaitingMerge)sync()},10000);setStatus('Connecting sync…');sync();
 }
 return {start,changed,openDialog,sync};
})();
