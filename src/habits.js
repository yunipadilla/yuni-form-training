let journalMonth = localDate(new Date()).slice(0,7);
let journalFlat = false;
const JOURNAL_DEFAULTS = ['Reading my Bible','Movement','80 oz of water daily','Shoulder rehab','Prayer','Reading','Nutrition'];
const PERSONAL_HABIT_PRESET='personal-v2';
function personalizeHabits(m){
 if(m.habitPreset===PERSONAL_HABIT_PRESET)return;
 const aliases=[['reading my bible','bible','bible reading'],['movement','daily movement'],['80 oz of water daily','hydrate','water'],['shoulder rehab'],['prayer'],['reading','read'],['nutrition']];
 const used=new Set();
 const selected=JOURNAL_DEFAULTS.map((name,i)=>{const h=m.habits.find(h=>!used.has(h.id)&&aliases[i].includes(h.name.toLowerCase()));if(h){used.add(h.id);return {...h,name,active:true}}return {id:uid(),name,active:true}});
 const extra=m.habits.filter(h=>!used.has(h.id)).map(h=>({...h,active:h.name.toLowerCase()==='wind down'?false:h.active}));
 m.habits=[...selected,...extra];m.habitPreset=PERSONAL_HABIT_PRESET;
}
function validJournalMonth(k){return /^\d{4}-(0[1-9]|1[0-2])$/.test(k)&&Number(k.slice(0,4))>=1900&&Number(k.slice(0,4))<=2200}
function journalDayCount(k){return new Date(Number(k.slice(0,4)),Number(k.slice(5)),0).getDate()}
function shiftJournalMonth(k,n){const d=new Date(Number(k.slice(0,4)),Number(k.slice(5))-1+n,1);return localDate(d).slice(0,7)}
function journalMonthLabel(k){return new Date(Number(k.slice(0,4)),Number(k.slice(5))-1,1).toLocaleDateString(undefined,{month:'long',year:'numeric'})}
function validHabitJournal(j){
 const obj=v=>v&&typeof v==='object'&&!Array.isArray(v);
 return obj(j)&&j.version===1&&obj(j.months)&&Object.entries(j.months).every(([k,m])=>validJournalMonth(k)&&obj(m)&&Array.isArray(m.habits)&&m.habits.length<=60&&new Set(m.habits.map(h=>h.id)).size===m.habits.length&&m.habits.every(h=>obj(h)&&typeof h.id==='string'&&typeof h.name==='string'&&h.name.length<=40&&typeof h.active==='boolean')&&obj(m.days)&&Object.entries(m.days).every(([d,v])=>/^\d{2}$/.test(d)&&Number(d)>=1&&Number(d)<=journalDayCount(k)&&obj(v)&&typeof v.insight==='string'&&v.insight.length<=3000&&validSleepEntry(v)&&obj(v.done)&&Object.values(v.done).every(b=>typeof b==='boolean')));
}
function getJournalMonth(k=journalMonth){
 state.habitJournal??={version:1,months:{}};
 if(!state.habitJournal.months[k]){
  const prior=Object.keys(state.habitJournal.months).filter(m=>m<k).sort().at(-1);
  const habits=prior?state.habitJournal.months[prior].habits.filter(h=>h.active).map(h=>({...h})):JOURNAL_DEFAULTS.map(name=>({id:uid(),name,active:true}));
  state.habitJournal.months[k]={habits,days:{},habitPreset:prior?state.habitJournal.months[prior].habitPreset:PERSONAL_HABIT_PRESET};personalizeHabits(state.habitJournal.months[k]);save();
 }
 const m=state.habitJournal.months[k];if(k>=localDate(new Date()).slice(0,7)&&m.habitPreset!==PERSONAL_HABIT_PRESET){personalizeHabits(m);save()}return m;
}
function journalEntry(n){const m=getJournalMonth(),k=String(n).padStart(2,'0');return m.days[k]??(m.days[k]={insight:'',done:{}})}
function journalSummary(m=getJournalMonth()){
 const today=localDate(new Date()),habits=m.habits.filter(h=>h.active);let done=0,reflections=0,elapsed=0;
 for(let n=1;n<=journalDayCount(journalMonth);n++){const date=`${journalMonth}-${String(n).padStart(2,'0')}`,entry=m.days[String(n).padStart(2,'0')];if(date<=today){elapsed++;done+=habits.filter(h=>entry?.done[h.id]).length}if(entry?.insight.trim())reflections++}
 return {done,reflections,possible:elapsed*habits.length};
}
function habitJournalPage(){
 const m=getJournalMonth(),habits=m.habits.filter(h=>h.active),summary=journalSummary(m),today=localDate(new Date());
 return `<div class="page-heading journal-heading"><div><span class="tag">THE DAILY PRACTICE</span><h1>The moments. The little things.</h1><p class="subtitle">Your month in memories, habits, and nights of rest.</p></div><button class="btn light" id="manage-habits">Edit / add habits</button></div>
 <div class="journal-toolbar"><div class="journal-month-nav"><button class="btn light" id="journal-prev" aria-label="Previous journal month" ${journalMonth==='1900-01'?'disabled':''}>‹</button><label class="field">Journal month<input id="journal-month" type="month" min="1900-01" max="2200-12" value="${journalMonth}"></label><button class="btn light" id="journal-next" aria-label="Next journal month" ${journalMonth==='2200-12'?'disabled':''}>›</button></div><div class="journal-tools"><button class="text-button" id="journal-today">Current month</button><button class="btn light" id="journal-view">${journalFlat?'3D journal view':'Flat journal view'}</button></div></div>
 <div class="journal-summary" id="journal-summary">${journalSummaryText(summary)}</div>
 ${sleepSummaryPanel(m)}
 <div class="journal-stage ${journalFlat?'is-flat':''}"><section class="journal-book" aria-label="Monthly graph journal"><div class="journal-cover"><div><span class="tag">FORM / THE EVERYDAY NOTEBOOK</span><h2>${esc(journalMonthLabel(journalMonth))}</h2></div><span class="journal-edition">HIGHLIGHTS · HABITS · SLEEP<br>${journalDayCount(journalMonth)} DAYS TO REMEMBER</span></div><div class="journal-help"><span>Days ${journalDayCount(journalMonth)}–1 · Write a memory. Mark a habit X. Log last night’s rest.<br>Tap a day number for a longer reflection.</span><span id="journal-save" role="status">Saved on this browser</span></div>
 <div class="journal-scroll" tabindex="0" role="region" aria-label="Scrollable habit grid"><table class="journal-grid"><caption class="sr-only">Daily highlights, Oura sleep scores, previous-night sleep hours, habit tracking, and a sleep constellation for ${esc(journalMonthLabel(journalMonth))}. Days descend from ${journalDayCount(journalMonth)} to 1.</caption>
 <colgroup><col class="day-width"><col class="insight-width"><col class="sleep-width"><col class="sleep-width">${habits.map(()=>'<col class="habit-width">').join('')}<col class="constellation-width"></colgroup>
 <thead><tr><th class="journal-day" scope="col">Day</th><th class="journal-insight" scope="col">Memorable moments<span>Highlights / insights</span></th><th class="sleep-col" scope="col"><span>Oura score</span></th><th class="sleep-col" scope="col"><span>Sleep hours</span></th>${habits.map(h=>`<th class="habit-col" scope="col"><span>${esc(h.name)}</span></th>`).join('')}<th class="constellation-heading" scope="col">Sleep constellation<span>Last night · hours</span><div class="sleep-axis"><span>0</span><span>6</span><span>12</span></div></th></tr></thead>
 <tbody>${Array.from({length:journalDayCount(journalMonth)},(_,i)=>journalDayCount(journalMonth)-i).map((n,i)=>{
 const d=String(n).padStart(2,'0'),date=`${journalMonth}-${d}`,entry=m.days[d],future=date>today,dayLabel=new Date(Number(journalMonth.slice(0,4)),Number(journalMonth.slice(5))-1,n).toLocaleDateString(undefined,{weekday:'short'}),fullLabel=`${journalMonthLabel(journalMonth)} ${n}`;
 return `<tr class="${date===today?'journal-current':''} ${future?'journal-future':''}"><th scope="row" class="journal-day"><button data-journal-detail="${n}" aria-label="Edit journal entry for ${esc(fullLabel)}" title="${dayLabel}${date===today?' · Today':''}">${d}${date===today?'<span aria-hidden="true">•</span>':''}</button></th><td class="journal-insight"><input data-insight="${n}" aria-label="Highlights and insights for ${esc(fullLabel)}" maxlength="3000" value="${esc(entry?.insight||'')}" placeholder="${future?'…':'A moment worth keeping…'}"></td>
 ${sleepRowFields(n,entry,future,fullLabel)}
 ${habits.map(h=>`<td class="habit-col"><button class="habit-box ${entry?.done[h.id]?'is-done':''}" data-habit="${esc(h.id)}" data-jday="${n}" aria-label="${esc(h.name)} on ${esc(fullLabel)}${future?' (future day)':''}" aria-pressed="${!!entry?.done[h.id]}" ${future?'disabled title="Available on this day"':''}><span aria-hidden="true">${entry?.done[h.id]?'X':''}</span></button></td>`).join('')}
 ${i===0?`<td class="constellation-cell" rowspan="${journalDayCount(journalMonth)}"><div id="sleep-constellation">${sleepConstellation(m)}</div></td>`:''}</tr>`
 }).join('')}</tbody><tfoot><tr><th scope="row" colspan="4">Habit totals <span>Completed days this month</span></th>${habits.map(h=>`<td data-habit-total="${esc(h.id)}">${Object.values(m.days).filter(d=>d.done[h.id]).length}</td>`).join('')}<td class="constellation-key">One star per logged night.<br>Blank nights stay blank.</td></tr></tfoot></table></div><div class="journal-bottom"><span>X = accomplished · blank = not marked · future habits open on the day</span><span>Sleep belongs to the morning you woke up.</span></div></section></div>
 <div class="journal-footnote"><p>Oura scores and sleep hours are entered manually. No Oura account is connected. Everything saves in this browser; export to keep a copy or move devices.</p><button class="text-button" id="journal-backup">Export journal & training backup</button></div>`;
}
function journalSummaryText(s){return `<span><b>${s.done}</b> habit checkoffs</span><span><b>${s.reflections}</b> daily reflections</span><span><b>${s.possible?Math.round(s.done/s.possible*100):0}%</b> of available habit boxes</span>`}
function journalSaved(){const ok=save(),status=$('#journal-save');if(status)status.textContent=ok?'Saved on this browser':'Not saved — export a backup';return ok}
function bindHabitJournal(){
 if(page!=='journal')return;
 const change=k=>{if(!validJournalMonth(k))return;journalMonth=k;render()};
 on('journal-prev',()=>change(shiftJournalMonth(journalMonth,-1)));on('journal-next',()=>change(shiftJournalMonth(journalMonth,1)));on('journal-today',()=>change(localDate(new Date()).slice(0,7)));
 $('#journal-month').onchange=e=>{if(validJournalMonth(e.target.value))change(e.target.value);else e.target.value=journalMonth};
 bindSleepJournal();document.querySelectorAll('[data-journal-detail]').forEach(b=>b.onclick=()=>editJournalDay(Number(b.dataset.journalDetail)));
 on('journal-view',()=>{journalFlat=!journalFlat;render()});on('manage-habits',manageHabits);on('journal-backup',backup);
 document.querySelectorAll('[data-insight]').forEach(el=>el.oninput=()=>{journalEntry(Number(el.dataset.insight)).insight=el.value;journalSaved();$('#journal-summary').innerHTML=journalSummaryText(journalSummary())});
 document.querySelectorAll('[data-habit]').forEach(b=>b.onclick=()=>{
  if(b.disabled)return;const entry=journalEntry(Number(b.dataset.jday)),id=b.dataset.habit;entry.done[id]=!entry.done[id];b.classList.toggle('is-done',entry.done[id]);b.setAttribute('aria-pressed',String(entry.done[id]));b.querySelector('span').textContent=entry.done[id]?'X':'';journalSaved();$('#journal-summary').innerHTML=journalSummaryText(journalSummary());
  document.querySelectorAll('[data-habit-total]').forEach(t=>{if(t.dataset.habitTotal===id)t.textContent=Object.values(getJournalMonth().days).filter(d=>d.done[id]).length});
 });
}
function manageHabits(){
 const m=getJournalMonth();modal('Your habits · '+journalMonthLabel(journalMonth),`<form id="habits-form"><p class="subtitle">Name the habits you want to keep. Changes apply to this month. Hide a habit to keep its entries without showing its column; show it again any time.</p><div class="habit-edit-list">${m.habits.map((h,i)=>`<div class="habit-editor"><label class="field">Habit ${i+1}<input name="habit-${i}" value="${esc(h.name)}" maxlength="40" required></label><label class="habit-visible"><input type="checkbox" name="active-${i}" ${h.active?'checked':''}> Show</label></div>`).join('')}</div><label class="field">Add a habit<input name="newHabit" maxlength="40" placeholder="e.g. Journal, walk, practice guitar"></label><p class="subtitle">Up to 20 visible habits. New months copy your most recent earlier month’s visible habits.</p><p id="habit-error" class="habit-error" role="alert"></p><div class="modal-buttons"><button class="btn" type="submit">Save habits</button></div></form>`);
 $('#habits-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),list=m.habits.map((h,i)=>({...h,name:String(f.get('habit-'+i)).trim(),active:f.has('active-'+i)})),name=String(f.get('newHabit')).trim();if(name)list.push({id:uid(),name,active:true});const active=list.filter(h=>h.active),names=active.map(h=>h.name.toLocaleLowerCase());let error='';if(list.some(h=>!h.name))error='Give each habit a name.';else if(active.length<1)error='Keep at least one habit visible.';else if(active.length>20||list.length>60)error='Keep up to 20 habits visible (60 saved in a month).';else if(new Set(names).size!==names.length)error='Use a different name for each visible habit.';if(error){$('#habit-error').textContent=error;return}m.habits=list;save();$('#modal').close();render();toast('Habits saved for '+journalMonthLabel(journalMonth))};
}

function editJournalDay(n){
 const entry=journalEntry(n),label=`${journalMonthLabel(journalMonth)} ${n}`;
 modal('A moment to remember · '+label,`<form id="journal-detail-form"><label class="field">Highlights / insights<textarea name="insight" maxlength="3000" rows="8">${esc(entry.insight)}</textarea></label><p class="subtitle">Your full reflection stays saved, even when the notebook shows a single line.</p><div class="modal-buttons"><button class="btn" type="submit">Save reflection</button></div></form>`);
 $('#journal-detail-form').onsubmit=e=>{e.preventDefault();entry.insight=String(new FormData(e.target).get('insight'));save();$('#modal').close();render();toast('Reflection saved')};
}
