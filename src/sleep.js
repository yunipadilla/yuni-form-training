// Manual Oura / sleep entries are attached to the morning of waking.
function validSleepEntry(v){
 const optional=(x,max,whole=false)=>x===undefined||x===null||(typeof x==='number'&&Number.isFinite(x)&&x>=0&&x<=max&&(!whole||Number.isInteger(x)));
 return optional(v.sleepHours,24)&&optional(v.ouraScore,100,true);
}
function sleepNights(m=getJournalMonth()){
 return Object.entries(m.days).filter(([d])=>`${journalMonth}-${d}`<=localDate(new Date())).map(([d,e])=>({day:Number(d),hours:e.sleepHours,score:e.ouraScore}));
}
function sleepMonthlyStats(m=getJournalMonth()){
 const nights=sleepNights(m),hours=nights.filter(n=>typeof n.hours==='number'),scores=nights.filter(n=>typeof n.score==='number');
 return {nights:hours.length,averageHours:hours.length?hours.reduce((s,n)=>s+n.hours,0)/hours.length:null,averageScore:scores.length?scores.reduce((s,n)=>s+n.score,0)/scores.length:null,scoreNights:scores.length};
}
function sleepSummaryPanel(m){return `<section class="sleep-summary" aria-label="Monthly sleep summary"><div class="sleep-summary-title"><span class="tag">THE NIGHT BEFORE</span><h2>Rest, on the record.</h2><p>Oura score + sleep hours · manual entry</p></div><div class="sleep-summary-metrics" id="sleep-summary-metrics">${sleepSummaryMetrics(m)}</div></section>`}
function sleepSummaryMetrics(m){const s=sleepMonthlyStats(m);return `<div><strong>${s.averageScore===null?'—':Math.round(s.averageScore)}<small>/ 100</small></strong><span>Average Oura score${s.scoreNights?' · '+s.scoreNights+' nights':''}</span></div><div><strong>${s.averageHours===null?'—':s.averageHours.toFixed(1)}<small>hrs</small></strong><span>Average sleep${s.nights?' · '+s.nights+' nights':''}</span></div><div><strong>${s.nights}</strong><span>Nights with hours logged</span></div>`}
function sleepRowFields(n,entry,future,label){return `<td class="sleep-col"><input type="number" min="0" max="100" step="1" inputmode="numeric" data-sleep="ouraScore" data-sleep-day="${n}" aria-label="Oura sleep score for ${esc(label)}" value="${entry?.ouraScore??''}" placeholder="—" ${future?'disabled':''}></td><td class="sleep-col"><input type="number" min="0" max="24" step="0.01" inputmode="decimal" data-sleep="sleepHours" data-sleep-day="${n}" aria-label="Previous night sleep hours for ${esc(label)}" value="${entry?.sleepHours??''}" placeholder="—" ${future?'disabled':''}></td>`}
function sleepPlotData(m=getJournalMonth()){
 const count=journalDayCount(journalMonth),nights=sleepNights(m).filter(n=>typeof n.hours==='number').sort((a,b)=>b.day-a.day),max=Math.max(12,...nights.map(n=>Math.ceil(n.hours/2)*2));
 const points=nights.map(n=>({...n,x:12+n.hours/max*156,y:(count-n.day)*36+18}));
 const segments=points.slice(1).filter((p,i)=>points[i].day-p.day===1).map(p=>{const i=points.indexOf(p);return [points[i-1],p]});
 return {count,max,points,segments};
}
function sleepConstellation(m){
 const p=sleepPlotData(m),height=p.count*36,today=localDate(new Date());
 return `<svg class="sleep-constellation" viewBox="0 0 180 ${height}" width="180" height="${height}" role="img" aria-label="Sleep constellation for ${esc(journalMonthLabel(journalMonth))}: ${p.points.length} nights logged. Horizontal position shows hours; stars line up with each day. Missing nights are gaps." preserveAspectRatio="none"><title>Previous night’s sleep by morning date</title>
 ${Array.from({length:7},(_,i)=>`<line class="sleep-grid-line" x1="${12+i*26}" y1="0" x2="${12+i*26}" y2="${height}"/>`).join('')}
 ${Array.from({length:p.count},(_,i)=>`<line class="sleep-grid-line" x1="0" y1="${i*36+35.5}" x2="180" y2="${i*36+35.5}"/>`).join('')}
 ${p.segments.map(([a,b])=>`<line class="sleep-join" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`).join('')}
 ${p.points.map(n=>`<g class="sleep-star ${`${journalMonth}-${String(n.day).padStart(2,'0')}`===today?'sleep-star-today':''}"><title>${esc(journalMonthLabel(journalMonth))} ${n.day}: ${n.hours} hours${typeof n.score==='number'?'; Oura score '+n.score:''}</title><circle class="star-halo" cx="${n.x}" cy="${n.y}" r="5"/><path d="M${n.x} ${n.y-3.5} L${n.x+1.2} ${n.y-1.2} L${n.x+3.5} ${n.y} L${n.x+1.2} ${n.y+1.2} L${n.x} ${n.y+3.5} L${n.x-1.2} ${n.y+1.2} L${n.x-3.5} ${n.y} L${n.x-1.2} ${n.y-1.2} Z"/></g>`).join('')}
 ${!p.points.length?'<text class="sleep-empty" x="90" y="80" text-anchor="middle"><tspan x="90">Your nights will</tspan><tspan x="90" dy="18">make a constellation.</tspan><tspan x="90" dy="28">Add sleep hours</tspan><tspan x="90" dy="18">beside a day.</tspan></text>':''}</svg>`;
}
function refreshSleepJournal(){const m=getJournalMonth();$('#sleep-summary-metrics').innerHTML=sleepSummaryMetrics(m);$('#sleep-constellation').innerHTML=sleepConstellation(m);const max=sleepPlotData(m).max;$('.sleep-axis').innerHTML=`<span>0</span><span>${max/2}</span><span>${max}</span>`}
function bindSleepJournal(){
 const max=sleepPlotData().max;$('.sleep-axis').innerHTML=`<span>0</span><span>${max/2}</span><span>${max}</span>`;
 document.querySelectorAll('[data-sleep]').forEach(el=>{
  el.oninput=()=>{const value=el.value===''?null:el.valueAsNumber,field=el.dataset.sleep;const valid=value===null||(Number.isFinite(value)&&value>=0&&value<=(field==='ouraScore'?100:24)&&(field!=='ouraScore'||Number.isInteger(value)));
   el.setCustomValidity(valid?'':field==='ouraScore'?'Enter a whole score from 0 to 100.':'Enter sleep hours from 0 to 24.');el.setAttribute('aria-invalid',String(!valid));
   if(!valid){$('#journal-save').textContent='Check sleep entry — score 0–100, hours 0–24';return}
   journalEntry(Number(el.dataset.sleepDay))[field]=value;journalSaved();refreshSleepJournal();
  };
  el.onblur=()=>{if(!el.checkValidity())el.reportValidity()};
 });
}
