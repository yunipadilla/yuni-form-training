import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {webcrypto,createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
// Password is supplied on stdin, never committed or written to a build log.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let password='';for await(const chunk of process.stdin)password+=chunk;password=password.replace(/\r?\n$/,'');
if(!password)throw Error('Supply the site password on stdin.');
let html=await readFile(path.join(root,'src/index.html'),'utf8');
for(const match of [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]){const css=await readFile(path.join(root,'src',match[1].split('?')[0]),'utf8');html=html.replace(match[0],`<style>${css}</style>`)}
for(const match of [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]){const code=await readFile(path.join(root,'src',match[1].split('?')[0]),'utf8');html=html.replace(match[0],`<script>${code.replace(/<\/script/gi,'<\\/script')}</script>`)}
let old;try{old=JSON.parse(await readFile(path.join(root,'public/vault.json'),'utf8'))}catch{}
const salt=old?.salt?Buffer.from(old.salt,'base64'):webcrypto.getRandomValues(new Uint8Array(16));
const iterations=600000,iv=webcrypto.getRandomValues(new Uint8Array(12));
const material=await webcrypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);
const key=await webcrypto.subtle.deriveKey({name:'PBKDF2',salt,iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt']);
const encrypted=await webcrypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(html));
await mkdir(path.join(root,'public'),{recursive:true});
await writeFile(path.join(root,'public/vault.json'),JSON.stringify({version:1,iterations,salt:Buffer.from(salt).toString('base64'),iv:Buffer.from(iv).toString('base64'),content:Buffer.from(encrypted).toString('base64')}));
const revision=createHash('sha256').update(new Uint8Array(encrypted)).digest('hex').slice(0,16);
const accessPath=path.join(root,'public/access.js');
let access=await readFile(accessPath,'utf8');
access=access.replace(/fetch\('vault\.json(?:\?v=[^']*)?'/,`fetch('vault.json?v=${revision}'`);
await writeFile(accessPath,access);
const entryPath=path.join(root,'public/index.html');
let entry=await readFile(entryPath,'utf8');
entry=entry.replace(/access\.js\?v=[^" ]+/,`access.js?v=${revision}`);
await writeFile(entryPath,entry);
console.log('Packaged encrypted FORM app with versioned access assets. No password written to output.');
