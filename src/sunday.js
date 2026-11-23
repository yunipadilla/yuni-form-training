const SUNDAY_MOBILITY_SEQUENCE = [
 {key:'pendulum',group:'Shoulder mobility',name:'Relaxed shoulder pendulum',sets:1,reps:'30 seconds each direction',unit:'as prescribed',noLoad:true,note:'Lean forward slightly, supporting yourself with your other hand. Let the working arm hang loose. Use small, easy forward/back movements, then side-to-side movements. Move from your body rather than actively lifting the arm. No added weight; stay within a comfortable range. Skip this movement if leaning forward bothers your back.'},
 {key:'shoulder-blades',group:'Shoulder mobility',name:'Gentle shoulder-blade setting',sets:1,reps:'5 comfortable repetitions',unit:'as prescribed',noLoad:true,note:'Sit or stand comfortably with arms relaxed. Lightly draw your shoulder blades toward each other without shrugging or arching your lower back. Relax fully between repetitions. Keep the effort light; do not force the shoulders back.'},
 {key:'pelvic-tilts',group:'Lower-back mobility',name:'Small pelvic tilts',sets:1,reps:'5 slow repetitions',unit:'as prescribed',noLoad:true,note:'Lie on your back with knees bent and feet supported. Gently rock the pelvis so your lower back moves a little toward the surface, then relax to your starting position. Use a small comfortable movement and keep breathing normally.'},
 {key:'knee-rolls',group:'Lower-back mobility',name:'Gentle knee rolls',sets:1,reps:'3 each side',unit:'as prescribed',noLoad:true,note:'Lie on your back with knees bent, feet supported, and shoulders relaxed against the surface. Move your knees a small distance to one side, return to the middle, then repeat on the other side. Keep the upper body still and avoid pushing into a stretch.'}
];
function sundayMobility(w){
 return {id:`coach-w${w}-sun-mobility`,weekday:'SUN',slot:'sunday',mode:'mobility',sport:'recovery',name:'Sunday recovery · shoulder + lower back',type:'Recovery · optional gentle mobility',minutes:null,recoveryRoutine:true,
 note:'Optional gentle mobility for Sunday. These are general movements, not an injury-specific rehabilitation prescription. The suggested amounts are a light starting point; doing less or choosing rest is fine.\n\nMove slowly in a comfortable range. Skip any movement that causes pain, tingling, or worsening symptoms. If you are recovering from an injury or surgery, use the exercises and limits your clinician has cleared for you.\n\nUse Edit session to enter your trainer or physical therapist’s exercises, sets, and instructions. You can switch to Rest / active recovery at any time.',
 references:[{title:'Shoulder exercise guide · Leeds Teaching Hospitals NHS',url:'https://www.leedsth.nhs.uk/patients/resources/shoulder-exercises/'},{title:'Back mobility guide · Cambridge University Hospitals NHS',url:'https://www.cuh.nhs.uk/patient-information/back-mobility-exercises/'}],
 exercises:SUNDAY_MOBILITY_SEQUENCE.map(e=>({...e,id:`coach-w${w}-sun-mobility-${e.key}`}))};
}
function installSundayRecovery(){
 if(state.block.id!=='yuni-fitness-v1-w1-3'||!state.block.weekDays)return;
 state.block.sundayVariants??={};
 for(const [w,list] of Object.entries(state.block.weekDays)){
  const i=list.findIndex(d=>d.weekday==='SUN');if(i<0||state.block.sundayVariants[w])continue;
  const current=list[i];const customized=current.exercises.length>0||!/^Rest( \/ active recovery)?$/i.test(current.name);
  const original={...structuredClone(current),slot:'sunday',mode:customized?'custom':'rest'};
  const variants={mobility:sundayMobility(w),[original.mode]:original};
  if(customized)variants.rest={id:`coach-w${w}-sun-rest`,weekday:'SUN',slot:'sunday',mode:'rest',sport:'recovery',name:'Rest / active recovery',type:'Recovery',minutes:0,note:'Take a rest day. Optional comfortable everyday movement is up to you.',exercises:[]};
  state.block.sundayVariants[w]=variants;
  const existing=state.logs[`w${w}-${current.id}`];
  const hasLog=existing&&(existing.startedAt||existing.completedAt||existing.notes||Object.keys(existing.sets||{}).length);
  list[i]=hasLog||customized?original:structuredClone(variants.mobility);
 }
}
function sundayChoice(d){
 if(d.slot!=='sunday'||!state.block.sundayVariants?.[week])return '';
 const variants=state.block.sundayVariants[week];
 return `<div class="cardio-choice sunday-choice"><span class="tag">SUNDAY · RECOVER</span><label for="cardio-mode">Choose your recovery session</label><select id="cardio-mode"><option value="mobility" ${d.mode==='mobility'?'selected':''}>Shoulder + lower-back mobility · optional</option><option value="rest" ${d.mode==='rest'?'selected':''}>Rest / active recovery</option>${variants.custom?`<option value="custom" ${d.mode==='custom'?'selected':''}>Your existing Sunday session</option>`:''}</select><p>Choose the movements that feel comfortable, or keep Sunday as a rest day. Each option keeps a separate log.</p></div>`;
}
function exerciseSectionHeading(exercises,index){
 const group=exercises[index]?.group;
 return group&&group!==exercises[index-1]?.group?`<h2 class="recovery-group">${esc(group)}</h2>`:'';
}
function recoveryReferences(d){return d.recoveryRoutine&&d.references?`<div class="recovery-references"><span>Movement guides</span>${d.references.map(r=>`<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}</a>`).join('')}</div>`:''}
