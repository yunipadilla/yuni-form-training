(() => {
 'use strict';
 const TTL=24*60*60*1000,SESSION='form-access-v1';
 const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 const encode=a=>btoa(String.fromCharCode(...new Uint8Array(a)));
 let vaultPromise,session=null,expiryTimer=null,checking=false;
 function stored(){for(const storage of ['localStorage','sessionStorage']){try{const v=JSON.parse(window[storage].getItem(SESSION));if(v)return v}catch{}}return null}
 function valid(s,now=Date.now()){return s&&typeof s.key==='string'&&typeof s.salt==='string'&&Number.isFinite(s.issuedAt)&&s.issuedAt<=now&&s.expiresAt===s.issuedAt+TTL&&now<s.expiresAt}
 function remove(){for(const storage of ['localStorage','sessionStorage']){try{window[storage].removeItem(SESSION)}catch{}}}
 function lock(){remove();document.documentElement.style.visibility='hidden';location.reload()}
 function readVault(){return vaultPromise??=fetch('vault.json?v=0fcaf8ef14008f43',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('load');return r.json()}).catch(e=>{vaultPromise=null;throw e})}
 async function decrypt(raw,v){const key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(v.iv)},key,decode(v.content)))}
 function watch(){
  const verify=()=>{if(checking)return;checking=true;if(!valid(session)){lock();return}const s=stored();if(session.persisted&&(!s||s.expiresAt!==session.expiresAt||s.key!==session.key)){lock();return}checking=false};
  expiryTimer=setTimeout(verify,Math.max(1,session.expiresAt-Date.now()));
  setInterval(verify,1000);window.addEventListener('focus',verify);document.addEventListener('visibilitychange',verify);window.addEventListener('pageshow',verify);window.addEventListener('storage',e=>{if(e.key===SESSION)verify()});
 }
 function enter(html,s){
  if(!valid(s))throw Error('expired');session=s;window.FormAccess={lock,expiresAt:s.expiresAt};
  document.open();document.write(html);document.close();watch();
  if(!s.persisted&&typeof toast==='function')toast('Unlocked for this visit. This browser cannot remember the password session.');
 }
 function persist(s){remove();for(const storage of ['localStorage','sessionStorage']){try{window[storage].setItem(SESSION,JSON.stringify(s));return true}catch{}}return false}
 async function unlock(e){
  e.preventDefault();const input=document.getElementById('password'),button=document.getElementById('unlock'),error=document.getElementById('access-error');button.disabled=true;button.textContent='Unlocking…';error.textContent='';
  let v;try{v=await readVault()}catch{error.textContent='Could not load FORM. Check your connection and try again.';button.disabled=false;button.textContent='Unlock FORM';return}
  try{
   const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(input.value),'PBKDF2',false,['deriveBits']);
   const raw=await crypto.subtle.deriveBits({name:'PBKDF2',salt:decode(v.salt),iterations:v.iterations,hash:'SHA-256'},material,256);
   const html=await decrypt(raw,v),issuedAt=Date.now();input.value='';
   const s={key:encode(raw),salt:v.salt,issuedAt,expiresAt:issuedAt+TTL};s.persisted=persist(s);enter(html,s);
  }catch{input.value='';error.textContent='That password didn’t match. Try again.';button.disabled=false;button.textContent='Unlock FORM';input.focus()}
 }
 async function start(){
  document.getElementById('access-form').addEventListener('submit',unlock);
  document.getElementById('show-password').onclick=()=>{const input=document.getElementById('password'),b=document.getElementById('show-password'),show=input.type==='password';input.type=show?'text':'password';b.textContent=show?'Hide':'Show';b.setAttribute('aria-pressed',String(show))};
  const s=stored();if(!valid(s)){remove();return}
  document.getElementById('access-status').textContent='Restoring your 24-hour session…';
  try{const v=await readVault();if(s.salt!==v.salt)throw Error('changed');enter(await decrypt(decode(s.key),v),{...s,persisted:true})}catch{remove();document.getElementById('access-status').textContent='Enter your password to start a new 24-hour session.'}
 }
 start();
})();
