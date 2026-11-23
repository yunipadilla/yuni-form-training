import {readFile,writeFile} from 'node:fs/promises';
const engine=await readFile(new URL('sync-engine.mjs',import.meta.url),'utf8'),crypto=await readFile(new URL('crypto.mjs',import.meta.url),'utf8');
const names=[...engine.matchAll(/export function (\w+)/g),...crypto.matchAll(/export async function (\w+)/g)].map(m=>m[1]);
await writeFile(new URL('../src/sync-core.js',import.meta.url),'const FormSyncCore=(()=>{\n'+(engine+'\n'+crypto).replaceAll('export async function','async function').replaceAll('export function','function')+'\nreturn {'+names.join(',')+'};\n})();\n');
