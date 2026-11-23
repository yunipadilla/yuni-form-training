let journalScreen='month', journalTurn='';
function journalAddress(hash){if(window.history?.pushState&&window.location?.hash!==hash)window.history.pushState(null,'',hash)}
function openJournalMonth(k){
 if(!validJournalMonth(k))return;
 journalTurn=k<journalMonth?'journal-turn-back':k>journalMonth?'journal-turn-forward':'';
 journalMonth=k;page='journal';activeDay=null;journalScreen='month';getJournalMonth(k);
 journalAddress('#journal/'+k);render();window.scrollTo(0,0);
}
function openJournalLibrary(){page='journal';activeDay=null;journalScreen='library';journalAddress('#journal');render();window.scrollTo(0,0)}
function restoreJournalPageRoute(repaint=false){
 const hash=window.location?.hash||'',match=hash.match(/^#journal\/(\d{4}-\d{2})$/);
 if(match&&validJournalMonth(match[1])){page='journal';journalMonth=match[1];journalScreen='month';activeDay=null}
 else if(hash==='#journal'){page='journal';journalScreen='library';activeDay=null}
 else if(['#training','#analytics','#history','#recipes'].includes(hash)){page=hash.slice(1);activeDay=null}
 else return;
 if(repaint)render();
}
function monthConsistency(m,k){
 const today=localDate(new Date()),habits=m.habits.filter(h=>h.active),elapsed=Math.max(0,Math.min(journalDayCount(k),k<today.slice(0,7)?journalDayCount(k):k===today.slice(0,7)?Number(today.slice(8)):0));
 const counts=habits.map(h=>({...h,count:Array.from({length:elapsed},(_,i)=>m.days[String(i+1).padStart(2,'0')]).filter(d=>d?.done[h.id]).length}));
 const checked=counts.reduce((sum,h)=>sum+h.count,0),possible=elapsed*habits.length;
 const reflections=Object.values(m.days).filter(d=>d.insight.trim()).length;
 const activeDays=Array.from({length:elapsed},(_,i)=>m.days[String(i+1).padStart(2,'0')]).filter(d=>habits.some(h=>d?.done[h.id])).length;
 return {elapsed,counts,checked,possible,reflections,activeDays,rate:possible?Math.round(checked/possible*100):0};
}
function journalLibraryPage(){
 const current=localDate(new Date()).slice(0,7);getJournalMonth(current);
 const months=Object.entries(state.habitJournal.months).sort(([a],[b])=>b.localeCompare(a));
 return `<div class="page-heading"><div><span class="tag">YOUR JOURNAL · ONE MONTH, ONE PAGE</span><h1>A collection of your days.</h1><p class="subtitle">Open a month to revisit its memories, habits, sleep, and consistency.</p></div><button class="btn" id="open-current-page">Open this month</button></div>
 <form id="open-month-form" class="journal-library-toolbar"><label class="field">Open or create a monthly page<input type="month" name="month" aria-label="Monthly page to open" min="1900-01" max="2200-12" required value="${current}"></label><button class="btn light" type="submit">Open page</button><p>Each month keeps its own entries. New pages start with empty boxes.</p></form>
 <div class="month-page-library">${months.map(([k,m])=>{const s=monthConsistency(m,k);return `<button class="month-page-card ${k===current?'current-page-card':''}" data-month-page="${k}" aria-label="Open ${esc(journalMonthLabel(k))}, ${s.rate}% consistency"><span class="month-page-meta">${k===current?'CURRENT MONTH':k<current?'PAST MONTH':'UPCOMING MONTH'}</span><h2>${esc(journalMonthLabel(k))}</h2><div class="month-mini-grid" aria-hidden="true">${Array.from({length:journalDayCount(k)},(_,i)=>{const d=m.days[String(i+1).padStart(2,'0')];return `<span class="${m.habits.some(h=>h.active&&d?.done[h.id])?'marked':''}">${i+1}</span>`}).join('')}</div><div class="month-page-rate"><strong>${s.rate}%</strong><span>habit consistency</span></div><div class="month-page-progress"><i style="width:${s.rate}%"></i></div><div class="month-page-counts"><span>${s.checked} checkoffs</span><span>${s.reflections} reflections</span></div><span class="month-page-open">Open monthly page</span></button>`}).join('')}</div>
 <p class="journal-library-note">Your saved pages live in this browser. Export a backup to keep them safe or take them to another device.</p><button class="text-button" id="library-backup">Export all monthly pages & training</button>`;
}
function bindJournalLibrary(){
 document.querySelectorAll('[data-month-page]').forEach(b=>b.onclick=()=>openJournalMonth(b.dataset.monthPage));
 on('open-current-page',()=>openJournalMonth(localDate(new Date()).slice(0,7)));on('library-backup',backup);
 $('#open-month-form').onsubmit=e=>{e.preventDefault();const k=String(new FormData(e.target).get('month'));if(validJournalMonth(k))openJournalMonth(k)};
}
function monthlyConsistencyPanel(m){const s=monthConsistency(m,journalMonth);return `<details class="month-consistency"><summary><span>${esc(journalMonthLabel(journalMonth))} consistency</span><strong id="month-consistency-rate">${s.rate}%</strong></summary><div id="month-consistency-detail">${monthlyConsistencyDetail(m)}</div></details>`}
function monthlyConsistencyDetail(m){const s=monthConsistency(m,journalMonth);return `<p>${s.checked} of ${s.possible} available habit boxes marked X · ${s.activeDays} days with a habit marked. ${s.elapsed<journalDayCount(journalMonth)?'Future days are excluded.':'This covers the full calendar month.'}</p><div class="month-habit-rates">${s.counts.map(h=>`<div><span>${esc(h.name)}</span><strong>${h.count} / ${s.elapsed} days</strong><div><i style="width:${s.elapsed?h.count/s.elapsed*100:0}%"></i></div></div>`).join('')}</div>`}
function refreshMonthConsistency(){const m=getJournalMonth(),s=monthConsistency(m,journalMonth);if($('#month-consistency-rate'))$('#month-consistency-rate').textContent=s.rate+'%';if($('#month-consistency-detail'))$('#month-consistency-detail').innerHTML=monthlyConsistencyDetail(m)}
