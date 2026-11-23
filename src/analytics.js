let analyticsSpan=6,analyticsMetric='sessions',analyticsMonth=monthKey(new Date());
function monthKey(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`}
function localDate(date){return `${monthKey(date)}-${String(date.getDate()).padStart(2,'0')}`}
function numberValue(value){if(value===null||value===undefined||String(value).trim()==='')return null;const n=Number(value);return Number.isFinite(n)?n:null}
function sportOf(h){if(h.sport)return h.sport;if(/^(rest|active recovery)/i.test(h.name||'')||h.type==='Recovery')return 'recovery';if(/hyrox/i.test(h.name||''))return 'hyrox';if(/swim/i.test(h.name||''))return 'swim';if(/bike|cycling/i.test(h.name||''))return 'bike';if(/run/i.test(h.name||''))return 'run';if(/strength|upper|lower|push|pull/i.test(h.name||''))return 'strength';return 'other'}
function distanceMeters(h){const n=numberValue(h.metrics?.distance);if(n===null||n<0)return null;const unit=h.metrics?.distanceUnit||(sportOf(h)==='swim'?'m':'miles');const factor={m:1,km:1000,miles:1609.344,yd:.9144}[unit];return factor?n*factor:null}
function aggregateMonths(history,span=6,now=new Date()){
 const valid=history.filter(h=>Number.isFinite(new Date(h.completedAt).getTime())&&new Date(h.completedAt)<=now);
 const end=new Date(now.getFullYear(),now.getMonth(),1);
 let start=new Date(end.getFullYear(),end.getMonth()-(Number(span)||1)+1,1);
 if(span==='all')start=valid.length?new Date(Math.min(...valid.map(h=>new Date(h.completedAt).getTime()))):end;
 start=new Date(start.getFullYear(),start.getMonth(),1);
 const months=[];const byKey=new Map();
 for(let d=new Date(start);d<=end;d=new Date(d.getFullYear(),d.getMonth()+1,1)){
  const key=monthKey(d);const b={key,label:d.toLocaleDateString(undefined,{month:'short',year:'numeric'}),longLabel:d.toLocaleDateString(undefined,{month:'long',year:'numeric'}),sessions:0,minutes:0,activeDays:new Set(),sets:0,runKm:0,bikeKm:0,swimM:0,mix:{},loads:{},records:[],rpes:[],recovery:0};months.push(b);byKey.set(key,b);
 }
 for(const h of valid){
  const date=new Date(h.completedAt),b=byKey.get(monthKey(date));if(!b)continue;
  const sport=sportOf(h);if(sport==='recovery'){b.recovery++;continue}
  b.records.push(h);b.sessions++;b.minutes+=Math.max(0,numberValue(h.duration)||0);b.activeDays.add(localDate(date));b.mix[sport]=(b.mix[sport]||0)+1;
  const meters=distanceMeters(h);if(meters!==null){if(sport==='run')b.runKm+=meters/1000;if(sport==='bike')b.bikeKm+=meters/1000;if(sport==='swim')b.swimM+=meters}
  const effort=numberValue(h.metrics?.rpe);if(effort!==null&&effort>=1&&effort<=10)b.rpes.push(effort);
  if(Array.isArray(h.exercises)&&h.sets){
   for(const e of h.exercises){
    const name=String(e.name||'').replace(/^[A-Z]\d:\s*/,'').trim();
    for(let i=0;i<e.sets;i++){
     const s=h.sets[`${e.id}-${i}`];if(!s?.done)continue;b.sets++;
     const weight=numberValue(s.weight);if(weight!==null&&weight>0&&usesLoad(e))b.loads[name]=Math.max(b.loads[name]||0,weight);
    }
   }
  }else b.sets+=Math.max(0,numberValue(h.checked)||0);
 }
 return months.map(b=>({...b,activeDays:b.activeDays.size}));
}
function formatNumber(n,d=0){return Number(n).toLocaleString(undefined,{maximumFractionDigits:d})}
function monthlyDashboard(){const m=aggregateMonths(state.history,1)[0];return `<div class="stat"><span class="stat-icon">✓</span><div><strong>${m.sessions}</strong><small>Workouts this month</small></div></div><div class="stat"><span class="stat-icon">◷</span><div><strong>${formatNumber(m.minutes)} <span style="font-size:13px;font-weight:400">min</span></strong><small>Trained this month</small></div></div><div class="stat"><span class="stat-icon">▦</span><div><strong>${m.activeDays}</strong><small>Active days this month</small></div></div>`}
function analyticsPage(){
 const months=aggregateMonths(state.history,analyticsSpan);if(!months.some(m=>m.key===analyticsMonth))analyticsMonth=months.at(-1).key;
 const selected=months.find(m=>m.key===analyticsMonth),index=months.indexOf(selected),previous=index>0?months[index-1]:null;
 const metricNames={sessions:'Workouts',minutes:'Training minutes',runKm:'Running · km',bikeKm:'Cycling · km',swimM:'Swimming · m'};
 const max=Math.max(1,...months.map(m=>m[analyticsMetric]));const total=months.reduce((s,m)=>s+m[analyticsMetric],0);
 const weights=Object.entries(selected.loads).sort((a,b)=>b[1]-a[1]);
 const sports={run:'Running',bike:'Cycling',swim:'Swimming',strength:'Strength',hyrox:'HYROX',erg:'Bike + row',other:'Other'};
 return `<div class="page-heading"><div><h1>See the bigger picture.</h1><p class="subtitle">Your progress over calendar months, across every training block.</p></div><label class="range-label">Time range<select id="analytics-range" aria-label="Analytics time range">${[[6,'Last 6 months'],[12,'Last 12 months'],[24,'Last 24 months'],['all','All history']].map(([v,label])=>`<option value="${v}" ${String(analyticsSpan)===String(v)?'selected':''}>${label}</option>`).join('')}</select></label></div>
 <section class="analytics-chart panel"><div class="section-head"><div><span class="tag">MONTHLY TREND</span><h2>${formatNumber(total,analyticsMetric==='runKm'||analyticsMetric==='bikeKm'?1:0)} <span class="muted chart-total-label">${metricNames[analyticsMetric].toLowerCase()}</span></h2></div><select id="analytics-metric" aria-label="Chart metric">${Object.entries(metricNames).map(([k,v])=>`<option value="${k}" ${k===analyticsMetric?'selected':''}>${v}</option>`).join('')}</select></div><p class="chart-hint">Choose a month to see its details.</p><div class="chart-scroll"><div class="month-bars" style="--bar-count:${months.length}">${months.map(m=>`<button class="month-bar ${m.key===selected.key?'selected':''}" data-month="${m.key}" aria-label="${esc(m.longLabel)}: ${formatNumber(m[analyticsMetric],1)} ${metricNames[analyticsMetric]}"><span class="bar-value">${formatNumber(m[analyticsMetric],analyticsMetric==='runKm'||analyticsMetric==='bikeKm'?1:0)}</span><span class="bar-track"><span class="bar-fill" style="height:${m[analyticsMetric]/max*100}%"></span></span><span class="bar-label">${esc(m.label)}</span></button>`).join('')}</div></div></section>
 <div class="section-head analytics-month-title"><h2>${esc(selected.longLabel)}</h2><span class="muted">${selected.key===monthKey(new Date())?'Month in progress':'Completed month'}</span></div>
 <section class="analytics-cards">${[['Workouts',selected.sessions],['Training minutes',formatNumber(selected.minutes)],['Active days',selected.activeDays],['Sets checked off',selected.sets]].map(([label,value])=>`<div class="panel metric-card"><span>${label}</span><strong>${value}</strong></div>`).join('')}</section>
 <p class="comparison">${previous?`${selected.sessions-previous.sessions>=0?'+':''}${selected.sessions-previous.sessions} workouts and ${selected.minutes-previous.minutes>=0?'+':''}${formatNumber(selected.minutes-previous.minutes)} minutes compared with ${esc(previous.label)}. `:''}Rest days are excluded from training totals.${selected.key===monthKey(new Date())?' This month is still in progress.':''}</p>
 ${!selected.sessions?'<div class="empty analytics-empty"><h2>Your history will tell the story.</h2><p>No training logged for this month yet. Finish a workout to add your results, or use the workout date to record an earlier session.</p><button class="btn" id="analytics-train">Go to my training</button></div>':''}
 <div class="analytics-detail-grid"><section class="panel analytics-detail"><h2>Distance logged</h2><p class="muted">Your recorded distances, converted to consistent units.</p><div class="distance-row"><span>Running</span><strong>${formatNumber(selected.runKm,2)} <small>km</small></strong></div><div class="distance-row"><span>Cycling</span><strong>${formatNumber(selected.bikeKm,2)} <small>km</small></strong></div><div class="distance-row"><span>Swimming</span><strong>${formatNumber(selected.swimM)} <small>m</small></strong></div></section>
 <section class="panel analytics-detail"><h2>Your training mix</h2><p class="muted">Completed workouts by activity this month.</p>${Object.entries(selected.mix).map(([sport,count])=>`<div class="mix-row"><span>${sports[sport]||'Other'}</span><span class="mix-track"><span style="width:${count/Math.max(1,selected.sessions)*100}%"></span></span><b>${count}</b></div>`).join('')||'<p class="muted empty-detail">No activity recorded yet.</p>'}${selected.rpes.length?`<p class="effort-summary">Average logged effort: <strong>${formatNumber(selected.rpes.reduce((a,b)=>a+b,0)/selected.rpes.length,1)} / 10</strong> · ${selected.rpes.length} workouts with RPE</p>`:''}</section></div>
 <section class="panel analytics-detail"><div class="section-head"><div><h2>Your lifting progress</h2><p class="muted">Heaviest checked-off set for each exercise in the selected month.</p></div></div>${weights.length?`<div class="table-scroll"><table><thead><tr><th>Exercise</th><th>${esc(selected.label)}</th><th>${previous?esc(previous.label):'Previous month'}</th><th>Change</th></tr></thead><tbody>${weights.map(([name,weight])=>{const old=previous?.loads[name];return `<tr><td>${esc(name)}</td><td>${formatNumber(weight,1)} lb</td><td>${old?formatNumber(old,1)+' lb':'—'}</td><td>${old?`${weight-old>0?'+':''}${formatNumber(weight-old,1)} lb`:'—'}</td></tr>`}).join('')}</tbody></table></div>`:'<p class="muted empty-detail">Enter a weight and check off the set to start tracking an exercise here.</p>'}</section>
 <section class="panel analytics-detail"><h2>Month by month</h2><div class="table-scroll"><table><thead><tr><th>Month</th><th>Workouts</th><th>Minutes</th><th>Active days</th><th>Run km</th><th>Bike km</th><th>Swim m</th></tr></thead><tbody>${[...months].reverse().map(m=>`<tr class="${m.key===selected.key?'selected-month-row':''}"><td><button class="month-table-button" data-month="${m.key}">${esc(m.label)}</button></td><td>${m.sessions}</td><td>${formatNumber(m.minutes)}</td><td>${m.activeDays}</td><td>${formatNumber(m.runKm,2)}</td><td>${formatNumber(m.bikeKm,2)}</td><td>${formatNumber(m.swimM)}</td></tr>`).join('')}</tbody></table></div></section><p class="analytics-footnote">Based on completed workouts saved in this browser. Missing distances, effort, and weights are not estimated. Repeated sessions are separate entries; editing an existing log updates that entry.</p>`;
}
function bindAnalytics(){
 if($('#analytics-range'))$('#analytics-range').onchange=e=>{analyticsSpan=e.target.value==='all'?'all':Number(e.target.value);render()};
 if($('#analytics-metric'))$('#analytics-metric').onchange=e=>{analyticsMetric=e.target.value;render()};
 document.querySelectorAll('[data-month]').forEach(b=>b.onclick=()=>{analyticsMonth=b.dataset.month;render()});
 on('analytics-train',()=>navigate('training'));
}
