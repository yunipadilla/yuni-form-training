// Friday alternatives supplement the imported trainer program without replacing saved logs.
function fridaySwim(week){
 const rounds=week===1?4:week===2?5:6;
 const prefix=`coach-w${week}-fri-swim`;
 const item=(suffix,name,sets,target,note)=>({id:prefix+'-'+suffix,name,sets,reps:String(target),unit:'min',note});
 return {id:prefix,weekday:'FRI',slot:'friday',mode:'swim',sport:'swim',name:'Friday swim · steady intervals',type:'Friday choice · generated swim',minutes:5+rounds*4+4,generated:true,
 note:`Generated swim option · Week ${week}\nChoose this swim OR the trainer’s speed run on Friday.\n\nWarm-up: 5 minutes easy.\nMain set: ${rounds} rounds of 3 minutes steady (RPE 4–5), then 1 minute easy swimming or wall rest.\nCool-down: 4 minutes easy.\n\nTotal: ${5+rounds*4+4} minutes including recoveries. Use a comfortable stroke in a pool. Take extra rest or shorten the main set if your technique becomes difficult to maintain. This is an editable generated option, separate from your trainer’s original program.`,
 exercises:[item('warmup','Swim warm-up',1,5,'Easy effort, RPE 2–3. Use a comfortable stroke.'),item('steady','Steady swim intervals',rounds,3,'RPE 4–5. After EACH interval, take the 1-minute recovery below before the next interval.'),item('recovery','Easy swim / wall rest',rounds,1,'Alternate with the steady intervals. Easy swimming or rest at the wall. Take longer if needed.'),item('cooldown','Swim cool-down',1,4,'Easy effort, RPE 2–3.')],
 referenceUrl:'https://www.usms.org/fitness-and-training/articles-and-videos/articles/how-to-write-a-swimming-workout'};
}
function installFridayChoices(){
 if(state.block.id!=='yuni-fitness-v1-w1-3'||!state.block.weekDays)return;
 state.block.fridayVariants??={};
 for(const [w,list] of Object.entries(state.block.weekDays)){
  const index=list.findIndex(d=>d.weekday==='FRI');if(index<0)continue;
  const current=list[index];
  if(!state.block.fridayVariants[w]){
   const run={...structuredClone(current),slot:'friday',mode:'run'};
   state.block.fridayVariants[w]={run,swim:fridaySwim(Number(w))};
   list[index]=run;
  }
 }
}
