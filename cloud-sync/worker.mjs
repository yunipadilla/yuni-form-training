const encoder=new TextEncoder(),TTL=86400000,MAX_BODY=12*1024*1024,CHUNK=400000;
const b64=a=>btoa(String.fromCharCode(...new Uint8Array(a))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const bytes=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
const equal=(a,b)=>{if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0};
async function hash(s){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(s)))].map(n=>n.toString(16).padStart(2,'0')).join('')}
async function signingKey(secret){return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify'])}
async function tokenFor(exp,secret){const body=b64(encoder.encode(JSON.stringify({aud:'form-sync',exp})));return body+'.'+b64(await crypto.subtle.sign('HMAC',await signingKey(secret),encoder.encode(body)))}
async function authorized(header,secret,now){try{const [body,sig,...extra]=(header||'').replace(/^Bearer /,'').split('.');if(extra.length||!body||!sig)return false;const valid=await crypto.subtle.verify('HMAC',await signingKey(secret),bytes(sig),encoder.encode(body));if(!valid)return false;const claims=JSON.parse(new TextDecoder().decode(bytes(body)));return claims.aud==='form-sync'&&Number.isFinite(claims.exp)&&claims.exp>now&&claims.exp<=now+TTL+60000}catch{return false}}
async function bodyJson(request){const stated=Number(request.headers.get('Content-Length'));if(stated>MAX_BODY)throw {status:413};const reader=request.body?.getReader();if(!reader)throw {status:400};const parts=[];let count=0;for(;;){const {value,done}=await reader.read();if(done)break;count+=value.length;if(count>MAX_BODY){await reader.cancel();throw {status:413}}parts.push(value)}const all=new Uint8Array(count);let n=0;for(const p of parts){all.set(p,n);n+=p.length}try{return JSON.parse(new TextDecoder().decode(all))}catch{throw {status:400}}}
export default {
 async fetch(request,env,ctx){
  const url=new URL(request.url),origin=request.headers.get('Origin'),allowed=(env.ALLOWED_ORIGINS||'https://trainwithform.onrender.com').split(',');
  const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin','X-Content-Type-Options':'nosniff'};
  if(origin&&allowed.includes(origin))Object.assign(headers,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,PUT,OPTIONS','Access-Control-Allow-Headers':'Authorization,Content-Type,If-None-Match','Access-Control-Expose-Headers':'ETag','Access-Control-Max-Age':'86400'});
  const send=(status,value,extra={})=>new Response(value===null?null:JSON.stringify(value),{status,headers:{...headers,...extra}});
  if(request.method==='GET'&&url.pathname==='/health')return send(200,{ok:true,service:'form-sync'});
  if(!origin||!allowed.includes(origin))return send(403,{error:'This website is not allowed.'});
  if(request.method==='OPTIONS')return send(204,null);
  if(!env.DB||!env.SESSION_SECRET||!env.ACCESS_PROOF_SHA256)return send(503,{error:'Sync is not configured.'});
  const now=Date.now();
  try{
   if(url.pathname==='/session'&&request.method==='POST'){
    const bucket=Math.floor(now/900000),ip=request.headers.get('CF-Connecting-IP')||'unknown',ipHash=await hash(env.SESSION_SECRET+ip);
    const limit=await env.DB.prepare('SELECT failures FROM form_auth_limits WHERE key_hash=?1 AND bucket=?2').bind(ipHash,bucket).first();
    if(limit?.failures>=8)return send(429,{error:'Please wait before trying to unlock sync again.'},{'Retry-After':'900'});
    const data=await bodyJson(request);
    if(typeof data.proof!=='string'||data.proof.length>100||!equal(await hash(data.proof),env.ACCESS_PROOF_SHA256)){
     await env.DB.prepare('INSERT INTO form_auth_limits(key_hash,bucket,failures) VALUES (?1,?2,1) ON CONFLICT(key_hash,bucket) DO UPDATE SET failures=failures+1').bind(ipHash,bucket).run();
     ctx.waitUntil(env.DB.prepare('DELETE FROM form_auth_limits WHERE bucket<?1').bind(bucket-2).run());
     return send(401,{error:'Unlock FORM again to connect sync.'});
    }
    if(!Number.isFinite(data.expiresAt)||data.expiresAt<=now||data.expiresAt>now+TTL+60000)return send(401,{error:'Your FORM session has expired. Unlock again.'});
    const expiresAt=Math.min(data.expiresAt,now+TTL);return send(200,{token:await tokenFor(expiresAt,env.SESSION_SECRET),expiresAt});
   }
   if(url.pathname!=='/journal')return send(404,{error:'Not found.'});
   if(!await authorized(request.headers.get('Authorization'),env.SESSION_SECRET,now))return send(401,{error:'Unlock FORM again to connect sync.'});
   if(request.method==='GET'){
    const rows=(await env.DB.prepare('SELECT s.revision,s.chunk_count,s.updated_at,c.part,c.ciphertext FROM form_state s LEFT JOIN form_chunks c ON c.commit_id=s.commit_id WHERE s.id=?1 ORDER BY c.part').bind('personal').all()).results;
    if(!rows.length)throw Error('Storage not initialized');const {revision,chunk_count,updated_at}=rows[0],etag='"'+revision+'"';
    if(request.headers.get('If-None-Match')===etag)return send(304,null,{ETag:etag});
    const chunks=rows.filter(r=>r.ciphertext!==null);if(chunks.length!==chunk_count)throw Error('Incomplete snapshot');
    return send(200,{revision,updatedAt:updated_at,payload:chunk_count?JSON.parse(chunks.map(r=>r.ciphertext).join('')):null},{ETag:etag});
   }
   if(request.method==='PUT'){
    const data=await bodyJson(request),p=data.payload;
    if(!Number.isSafeInteger(data.baseRevision)||data.baseRevision<0||!p||p.format!==1||p.algorithm!=='AES-GCM'||!['gzip','none'].includes(p.compression)||typeof p.iv!=='string'||p.iv.length!==16||typeof p.ciphertext!=='string'||p.ciphertext.length<24||!/^[A-Za-z0-9+/]+=*$/.test(p.ciphertext))return send(400,{error:'Invalid sync update.'});
    const text=JSON.stringify(p);if(text.length>MAX_BODY-1000)return send(413,{error:'Your sync update is too large. Export a backup.'});
    const commit=crypto.randomUUID(),chunks=Array.from({length:Math.ceil(text.length/CHUNK)},(_,i)=>text.slice(i*CHUNK,(i+1)*CHUNK));
    const statements=[env.DB.prepare('UPDATE form_state SET previous_commit_id=commit_id,commit_id=?1,revision=revision+1,chunk_count=?2,updated_at=?3 WHERE id=?4 AND revision=?5').bind(commit,chunks.length,now,'personal',data.baseRevision)];
    chunks.forEach((chunk,i)=>statements.push(env.DB.prepare('INSERT INTO form_chunks(commit_id,part,ciphertext) SELECT ?1,?2,?3 WHERE EXISTS (SELECT 1 FROM form_state WHERE id=?4 AND commit_id=?1)').bind(commit,i,chunk,'personal')));
    statements.push(env.DB.prepare('DELETE FROM form_chunks WHERE commit_id NOT IN (SELECT commit_id FROM form_state WHERE commit_id IS NOT NULL UNION SELECT previous_commit_id FROM form_state WHERE previous_commit_id IS NOT NULL)'));
    const results=await env.DB.batch(statements);if(results[0].meta.changes!==1)return send(409,{error:'Another device saved first. Merge and retry.'});
    return send(200,{revision:data.baseRevision+1,updatedAt:now});
   }
   return send(405,{error:'Method not allowed.'});
  }catch(e){const status=e.status||503;return send(status,{error:status===413?'Sync update exceeds the size limit. Your local copy is safe.':status===400?'Invalid request.':'Sync is temporarily unavailable. Your local copy is safe.'})}
 }
};
