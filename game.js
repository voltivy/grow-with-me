
/* ============ dialog ============ */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const dlgs = {g:{box:$("#dlg"),who:$("#dlg-who"),txt:$("#dlg-txt"),timer:null,full:""},
              s:{box:$("#dlg2"),who:$("#dlg2-who"),txt:$("#dlg2-txt"),timer:null,full:""}};
function say(who,text,k="g"){
  const d=dlgs[k];d.full=text;d.who.textContent=who;d.box.classList.add("show");clearInterval(d.timer);
  if(reduce){d.txt.textContent=text;return;}
  let i=0;d.txt.textContent="";d.timer=setInterval(()=>{i+=2;d.txt.textContent=d.full.slice(0,i);if(i>=d.full.length)clearInterval(d.timer);},22);
}
Object.values(dlgs).forEach(d=>d.box.addEventListener("click",()=>{
  if(d.txt.textContent.length<d.full.length){clearInterval(d.timer);d.txt.textContent=d.full;}else d.box.classList.remove("show");sfx("tap");}));


let flash="",flashUntil=0;
function setStatus(t,ms=3200){flash=t;flashUntil=performance.now()+ms;renderStatus();}
function guide(){
  const s=S.stats;
  if(!s.planted)return "Click a patch of soil to plant your seed.";
  if(!s.watered)return "Pick the watering can, then click your plant.";
  if(!s.bloomed)return "Keep watering. Each stage takes a couple of waterings, so there is no hurry.";
  if(!msgCount())return "A flower is in bloom. Click it to read what it holds.";
  return "Plant more seeds. The moon, the butterfly and the sign each have something to say.";
}
function plotInfo(i){
  const p=S.plots[i];if(!p)return S.tool==="seed"?"<b>Empty soil</b>Click to plant "+SPECIES[S.seed].name:"<b>Empty soil</b>Pick the seed to plant here";
  const n=SPECIES[p.sp].name;
  if(p.stage===3)return "<b>"+n+"</b>In bloom"+(S.found[p.sp]||p.sp==="moonpetal"?"":" · click to read its memory");
  return "<b>"+n+"</b>"+STAGE_NAMES[p.stage]+" · water "+Math.round(p.water)+"% · planted "+fmt(p.planted);
}
function renderStatus(){
  const el=$("#status");
  const t = performance.now()<flashUntil ? esc(flash) : (st.hover>=0 ? plotInfo(st.hover) : esc(guide()));
  if(el._last!==t){el.innerHTML=t;el._last=t;}
}


const st={hover:-1,moonWob:0};
let digArm=-1,digUntil=0,moonClicks=0,moonLast=0;
const msgsLeftNote=()=>msgCount()>=TOTAL_MSGS?" The Everlasting Flower is waiting in the Secret Garden.":"";

function plantAt(i){
  if(S.plots[i]){setStatus("That soil is busy. Try another patch.");return;}
  if(!S.unlocked.includes(S.seed)){setStatus("You don't have that seed yet.");return;}
  const {x,y}=plotPos(i);
  S.plots[i]={sp:S.seed,stage:0,prog:0,water:20,idle:0,planted:Date.now(),bounce:1};
  S.stats.planted++;mile("plant1","Planted the first seed.");logIt("Planted a "+SPECIES[S.seed].name+".");
  sfx("plant");spawn(8,{x,y:y-2,vx:(Math.random()-.5)*40,vy:-20-Math.random()*20,g:120,life:.5,max:.5,col:"#6b5c8f",sz:2});
  save();renderStatus();
}
function waterAt(i){
  const p=S.plots[i],{x,y}=plotPos(i);
  if(!p){setStatus("Plant a seed here first.");return;}
  if(p.stage===3){showMemory(i);return;}
  fx.can={x,y,t:0};sfx("water");S.stats.watered++;p.bounce=1;
  if(p.water<=60){p.water=Math.min(100,p.water+40);p.prog++;if(p.prog>=NEED)grow(p,i);}
  else{p.water=100;particles.push({type:"txt",txt:"plenty for now",x,y:y-36,vx:0,vy:-8,g:0,life:1.4,max:1.4,col:"#cfe8ff"});}
  save();
}
function grow(p,i){
  const {x,y}=plotPos(i),n=SPECIES[p.sp].name;p.stage++;p.prog=0;p.bounce=1;
  if(p.stage===3){bloom(p,i);return;}
  sfx("grow");logIt(p.stage===1?"A "+n+" sprouted.":"The "+n+" formed a bud.");
  particles.push({type:"txt",txt:STAGE_NAMES[p.stage].toLowerCase()+"!",x,y:y-24,vx:0,vy:-10,g:0,life:1.4,max:1.4,col:"#F2D98C"});
  spawn(6,{x,y:y-12,vx:(Math.random()-.5)*30,vy:-Math.random()*25,g:20,life:.9,max:.9,col:"#F2D98C",type:"star"});
}
function bloom(p,i){
  const {x,y}=plotPos(i),sp=SPECIES[p.sp];p.bloomed=Date.now();S.stats.bloomed++;S.bloomedSp[p.sp]=true;
  mile("bloom1","First flower bloomed.");logIt("A "+sp.name+" bloomed.");sfx("bloom");
  spawn(22,{x,y:y-sp.stem,vx:(Math.random()-.5)*70,vy:-Math.random()*50,g:30,life:1.3,max:1.3,col:Math.random()>.5?sp.color:"#F2D98C",type:"star"});
  let extra="";
  const next=BASE.find(b=>!S.unlocked.includes(b));
  if(next&&p.sp!=="moonpetal"){S.unlocked.push(next);extra=" A "+SPECIES[next].name+" seed turned up in the Seeds screen.";logIt("Found a "+SPECIES[next].name+" seed.");}
  if(allBloomed()&&!S.miles.allspecies){mile("allspecies","Every kind of flower has bloomed.");extra+=" Something stirs at the edge of the garden. Try the Secret Garden tab.";}
  checkPair();
  say(sp.name,"A "+sp.name+" bloomed. Click it to see what it holds."+extra);
  save();renderAll();
}
function checkPair(){
  if(S.pair)return;
  for(let i=0;i<6;i++){const a=S.plots[i];if(!a||a.stage<3)continue;
    [[i%3<2?i+1:-1],[i<3?i+3:-1]].forEach(([j])=>{if(j<0)return;const b=S.plots[j];
      if(b&&b.stage===3&&[a.sp,b.sp].sort().join()==="daisy,sunflower"&&!S.pair){
        S.pair=true;S.unlocked.push("moonpetal");mile("pair","Two flowers grew side by side.");logIt("Found a Moonpetal seed.");
        setTimeout(()=>{say("Garden",cfg().pairMessage+" It's a Moonpetal. Check the Seeds screen.");sfx("found");renderAll();},1400);}});}
}
function found(key,who,text){
  const first=!S.found[key];
  if(first){S.found[key]=true;sfx("found");
    if(key==="moon")mile("moon","Found the moon's secret.");else if(key==="butterfly")mile("butterfly","Heard the butterfly's whisper.");
    else{mile("read1","Read the first memory.");logIt("Read the memory in the "+SPECIES[key].name+".");}
    if(msgCount()>=TOTAL_MSGS)mile("allmsg","Found every hidden message.");}
  say(who,text+(first&&msgCount()>=TOTAL_MSGS?msgsLeftNote():""));
  if(first){save();renderAll();}
}
function showMemory(i){
  const p=S.plots[i],{x,y}=plotPos(i);p.bounce=1;
  spawn(5,{x,y:y-SPECIES[p.sp].stem-4,vx:(Math.random()-.5)*30,vy:-Math.random()*25,g:15,life:1,max:1,col:"#F2D98C",type:"star"});
  if(p.sp==="moonpetal"){say("Moonpetal","It grew because two flowers stayed close. Like us.");return;}
  found(p.sp,SPECIES[p.sp].name,cfg().memories[p.sp]);
}
function digAt(i){
  const p=S.plots[i];if(!p){setStatus("Nothing to dig up here.");return;}
  const n=SPECIES[p.sp].name;
  if(digArm===i&&performance.now()<digUntil){S.plots[i]=null;digArm=-1;sfx("dig");const {x,y}=plotPos(i);
    spawn(12,{x,y:y-4,vx:(Math.random()-.5)*60,vy:-30-Math.random()*20,g:140,life:.5,max:.5,col:"#4a3f6b",sz:2});setStatus("Cleared. The soil is ready again.");save();}
  else{digArm=i;digUntil=performance.now()+2500;setStatus("Click again to dig up the "+n+".");}
}


const cv=$("#cv"),c1=cv.getContext("2d"),cv2=$("#cv2"),c2=cv2.getContext("2d");
function lp(e,cvs){const r=cvs.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*320,y:(e.clientY-r.top)/r.height*200};}
function hit(p){
  if(Math.hypot(p.x-bf.x,p.y-bf.y)<11)return {k:"bf"};
  if(Math.hypot(p.x-266,p.y-30)<16)return {k:"moon"};
  if(p.x>8&&p.x<60&&p.y>100&&p.y<146)return {k:"sign"};
  for(let i=0;i<6;i++){const {x,y}=plotPos(i),pl=S.plots[i],top=pl&&pl.stage>1?y-SPECIES[pl.sp].stem-12:y-10;
    if(p.x>x-19&&p.x<x+19&&p.y>top&&p.y<y+8)return {k:"plot",i};}
  return null;
}
cv.addEventListener("pointermove",e=>{const h=hit(lp(e,cv));st.hover=h&&h.k==="plot"?h.i:-1;cv.classList.toggle("hot",!!h);renderStatus();});
cv.addEventListener("pointerleave",()=>{st.hover=-1;cv.classList.remove("hot");});
cv.addEventListener("click",e=>{
  audio();const p=lp(e,cv),h=hit(p);if(!h)return;
  if(h.k==="bf"){bf.trail=3;sfx("tap");spawn(14,{x:bf.x,y:bf.y,vx:(Math.random()-.5)*50,vy:(Math.random()-.5)*50,g:0,life:1,max:1,col:Math.random()>.5?"#F2D98C":"#D79BBF",type:"star"});
    if(!S.found.butterfly)found("butterfly","Butterfly",cfg().butterflyMessage);return;}
  if(h.k==="moon"){const now=performance.now();moonClicks=now-moonLast>3000?1:moonClicks+1;moonLast=now;st.moonWob=.4;sfx("tap");
    if(moonClicks>=3){moonClicks=0;found("moon","The Moon",cfg().moonMessage);}
    else if(!S.found.moon)setStatus(moonClicks===1?"The moon seems to be listening.":"It's glowing a little brighter.");
    return;}
  if(h.k==="sign"){sfx("tap");say(cfg().signTitle,cfg().signMessage);return;}
  if(h.k==="plot"){
    const pl=S.plots[h.i];
    if(pl&&pl.stage===3&&S.tool!=="shovel"){showMemory(h.i);return;}
    if(S.tool==="seed")plantAt(h.i);else if(S.tool==="can")waterAt(h.i);else digAt(h.i);}
});
cv2.addEventListener("pointermove",e=>{const p=lp(e,cv2);cv2.classList.toggle("hot",p.x>150&&p.x<232&&p.y>70&&p.y<170);});
cv2.addEventListener("click",()=>{
  audio();if(msgCount()>=TOTAL_MSGS){sfx("bloom");openLetter();}
  else{sfx("tap");say("The Everlasting Flower","It is still asleep. "+msgCount()+" of "+TOTAL_MSGS+" hidden messages found. Look inside the flowers, and check the moon, the butterfly and the sign.","s");}
});

/* ============ ending ============ */
function openLetter(){
  const c=cfg();$("#letter").innerHTML=c.letter.split(/\n\s*\n/).map(p=>"<p>"+esc(p)+"</p>").join("")+'<div class="sig">— '+esc(c.from)+"</div>";
  $("#ov-letter").classList.add("show");
  if(!S.letterRead){mile("letter","Opened the Everlasting Flower.");save();renderAll();}
}
$("#btn-letter-close").addEventListener("click",()=>{$("#ov-letter").classList.remove("show");
  if(!S.letterRead){S.letterRead=true;save();$("#end-txt").textContent=cfg().ending;$("#ov-end").classList.add("show");}});
$("#btn-end-close").addEventListener("click",()=>$("#ov-end").classList.remove("show"));

/* ======================== */
function mk(w,h,fn,cls){const k=document.createElement("canvas");k.width=w;k.height=h;if(cls)k.className=cls;fn(k.getContext("2d"));return k;}
function spCanvas(sp,stg,cls){return mk(32,40,c=>{R(c,"#3a3350",3,36,26,4);R(c,"#4a3f6b",3,36,26,1);plant(c,sp,stg,16,37,1,0);},cls);}
function renderTools(){
  $$("[data-tool]").forEach(b=>b.classList.toggle("on",b.dataset.tool===S.tool));
  cv.className="world t-"+S.tool;
  $("#seed-label").textContent="Seed: "+SPECIES[S.seed].name;
  const draw=(id,fn)=>{const k=$(id+" canvas"),c=k.getContext("2d");c.clearRect(0,0,16,16);fn(c);};
  draw("#tool-seed",c=>seedIcon(c,0,0,SPECIES[S.seed].color));draw("#tool-can",c=>canIcon(c,0,0));draw("#tool-shovel",c=>shovelIcon(c,0,0));
}
function renderSeeds(){
  const g=$("#seed-grid");g.innerHTML="";
  const list=BASE.concat(S.pair?["moonpetal"]:[]);
  list.forEach((sp,idx)=>{
    const open=S.unlocked.includes(sp),d=SPECIES[sp],card=document.createElement("div");card.className="card panel"+(open?"":" locked");
    const top=document.createElement("div");top.appendChild(spCanvas(sp,3,"hero"));card.appendChild(top);
    const h=document.createElement("h3");h.textContent=open?d.name:"Locked seed";card.appendChild(h);
    const p=document.createElement("p");p.textContent=open?d.line:"Bloom a "+SPECIES[BASE[idx-1]].name+" to find it.";card.appendChild(p);
    if(open){const row=document.createElement("div");row.className="stages";[0,1,2,3].forEach(s=>{const k=spCanvas(sp,s);k.title=STAGE_NAMES[s];row.appendChild(k);});card.appendChild(row);
      const b=document.createElement("button");b.className="pbtn"+(S.seed===sp?" on":" primary");b.textContent=S.seed===sp?"Selected":"Plant this one";
      b.addEventListener("click",()=>{S.seed=sp;S.tool="seed";save();renderTools();go("garden");setStatus(d.name+" seed ready. Click a patch of soil.");});card.appendChild(b);}
    g.appendChild(card);});
  if(!S.pair){const card=document.createElement("div");card.className="card panel locked";card.appendChild(mk(32,40,c=>{R(c,"#3a3350",3,36,26,4);head(c,"moonpetal",16,20,0);},"hero"));
    card.insertAdjacentHTML("beforeend","<h3>A seed you haven't met</h3><p>Some flowers only grow because of who is standing next to them.</p>");g.appendChild(card);}
}
function bfIcon(c){R(c,"#2a1830",15,14,2,10);R(c,"#D79BBF",6,8,9,8);R(c,"#D79BBF",17,8,9,8);R(c,"#9C86CE",8,16,7,6);R(c,"#9C86CE",17,16,7,6);R(c,"#f4eaff",9,10,2,2);R(c,"#f4eaff",21,10,2,2);}
function renderMemories(){
  const g=$("#mem-grid");g.innerHTML="";const c=cfg();
  const items=BASE.map(sp=>({key:sp,title:SPECIES[sp].name,icon:spCanvas(sp,3,"hero"),text:c.memories[sp]}));
  items.push({key:"moon",title:"The Moon",icon:mk(32,40,x=>x.drawImage(moon,0,4),"hero"),text:c.moonMessage,hide:"Click the moon three times."});
  items.push({key:"butterfly",title:"The Butterfly",icon:mk(32,40,x=>bfIcon(x),"hero"),text:c.butterflyMessage,hide:"Catch it as it drifts by."});
  items.forEach(it=>{const ok=!!S.found[it.key],card=document.createElement("div");card.className="card panel"+(ok?"":" locked");
    card.appendChild(it.icon);const h=document.createElement("h3");h.textContent=ok?it.title:"Not found yet";card.appendChild(h);
    const p=document.createElement("p");if(ok)p.className="hand";p.textContent=ok?it.text:(it.hide||"Bloom a "+it.title+" and click it.");card.appendChild(p);g.appendChild(card);});
  const n=msgCount();$("#mem-count").textContent=n+" of "+TOTAL_MSGS+" messages found";$("#mem-bar").style.width=(n/TOTAL_MSGS*100)+"%";
}
const MILES=[["plant1","First seed planted"],["bloom1","First flower bloomed"],["read1","First memory read"],["moon","The moon's secret"],["butterfly","The butterfly's whisper"],
  ["pair","Two flowers side by side"],["allspecies","Every kind of flower bloomed"],["secret","Found the Secret Garden"],["allmsg","Every hidden message found"],["letter","Opened the Everlasting Flower"]];
function renderJournal(){
  const s=S.stats;
  $("#stats").innerHTML=[[s.planted,"Planted"],[s.bloomed,"Bloomed"],[s.watered,"Waterings"],[msgCount()+"/"+TOTAL_MSGS,"Messages"],[BASE.filter(b=>S.bloomedSp[b]).length+"/6","Kinds bloomed"]]
    .map(([n,l])=>'<div class="stat panel"><b>'+n+"</b><span>"+l+"</span></div>").join("");
  $("#miles").innerHTML=MILES.map(([id,t])=>{const m=S.miles[id];return '<li class="'+(m?"done":"")+'"><span class="dot"></span>'+esc(t)+(m?'<span class="when">'+fmt(m.t)+"</span>":"")+"</li>";}).join("");
  $("#log").innerHTML=S.log.length?S.log.slice(0,30).map(l=>'<li class="done"><span class="dot"></span>'+esc(l.text)+'<span class="when">'+fmt(l.t)+"</span></li>").join(""):'<li><span class="dot"></span>Nothing yet. Plant something.</li>';
  const ta=$("#notes");if(document.activeElement!==ta)ta.value=S.notes||"";
}
$("#notes").addEventListener("input",e=>{S.notes=e.target.value;save();});
function renderSecret(){
  const n=BASE.filter(b=>S.bloomedSp[b]).length,open=allBloomed();
  $("#secret-locked").hidden=open;$("#secret-open").hidden=!open;
  const r=$("#reqs");r.innerHTML="";BASE.forEach(b=>{const k=spCanvas(b,3,S.bloomedSp[b]?"":"no");k.title=SPECIES[b].name;r.appendChild(k);});
  $("#req-bar").style.width=(n/6*100)+"%";$("#req-txt").textContent=n+" of 6 kinds of flower have bloomed.";
  if(open){const left=TOTAL_MSGS-msgCount();
    $("#secret-note").textContent=left>0?msgCount()+" of "+TOTAL_MSGS+" hidden messages found. The Everlasting Flower blooms when you've found them all.":"The Everlasting Flower is in bloom. Click it.";
    if(!S.miles.secret){mile("secret","Found the Secret Garden.");save();setTimeout(()=>say("Secret Garden","Nobody told you about this place. It is yours now.","s"),400);}}
}
function renderAll(){renderTools();renderSeeds();renderMemories();renderJournal();renderSecret();renderStatus();}

/* ======================== */
const SCREENS=["garden","seeds","memories","journal","secret"];
function go(name){
  if(!SCREENS.includes(name))name="garden";
  $$(".screen").forEach(s=>s.classList.toggle("show",s.id==="s-"+name));
  $$("[data-go]").forEach(b=>b.classList.toggle("on",b.dataset.go===name));
  if(location.hash!=="#"+name)try{location.hash=name;}catch(e){}
  renderAll();
}
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>{sfx("tap");go(b.dataset.go);}));
addEventListener("hashchange",()=>go(location.hash.slice(1)));
$$("[data-tool]").forEach(b=>b.addEventListener("click",()=>{S.tool=b.dataset.tool;sfx("tap");save();renderTools();
  setStatus(S.tool==="seed"?"Click a patch of soil to plant.":S.tool==="can"?"Click a plant to water it.":"Click a plant to dig it up.");}));
$("#btn-music").addEventListener("click",()=>{S.music=!musicOn;music(S.music);save();});

/* ======================== */
const CF=[["to","Their name","text"],["from","Your name","text"],["signMessage","Message on the sign","area"]]
  .concat(BASE.map(b=>["m_"+b,SPECIES[b].name+" memory","area"])).concat([["moonMessage","Moon's secret","area"],["butterflyMessage","Butterfly's whisper","area"],["letter","The Everlasting letter","area"]]);
function openCustom(){
  const c=cfg(),val=k=>k.startsWith("m_")?c.memories[k.slice(2)]:c[k];
  $("#custom-form").innerHTML=CF.map(([k,l,t])=>"<label for='cf-"+k+"'>"+l+"</label>"+(t==="text"?"<input type='text' id='cf-"+k+"' value=\""+esc(val(k))+"\">":"<textarea id='cf-"+k+"'>"+esc(val(k))+"</textarea>")).join("");
  $("#ov-custom").classList.add("show");
}
$("#btn-custom").addEventListener("click",openCustom);
$("#btn-custom-save").addEventListener("click",()=>{
  const o={memories:{}};CF.forEach(([k])=>{const v=$("#cf-"+k).value.trim();if(!v)return;if(k.startsWith("m_"))o.memories[k.slice(2)]=v;else o[k]=v;});
  S.custom=o;save();$("#ov-custom").classList.remove("show");renderAll();setStatus("Saved.");});
$("#btn-custom-reset").addEventListener("click",()=>{S.custom={};save();openCustom();renderAll();});

/* ======================== */
function catchUp(){
  const away=(Date.now()-S.last)/1000,units=Math.min(5,Math.floor(away/IDLE_SECS));if(units<1)return false;
  let changed=false;S.plots.forEach((p,i)=>{if(!p)return;for(let u=0;u<units&&p.stage<3;u++){p.prog++;changed=true;if(p.prog>=NEED)grow(p,i);}p.water=Math.max(0,p.water-away*.8);});
  return changed;
}
function intro(){
  const c=cfg();$("#intro-for").textContent=S.started?"Welcome back, "+c.to+".":"A little garden for "+c.to+", from "+c.from+".";
  $("#btn-begin").textContent=S.started?"Return to the garden":"Enter the garden";
}
$("#btn-begin").addEventListener("click",()=>{
  audio();const first=!S.started,grew=S.started&&catchUp();S.started=true;$("#ov-intro").classList.remove("show");
  if(S.music!==false){S.music=true;music(true);}
  save();renderAll();
  if(first)say("Garden","There's one seed waiting for you. Click a patch of soil to plant it, then water it with the can.");
  else if(grew)say("Garden","While you were away, the garden grew a little.");
});

let tAcc=0,prev=0;
function frame(ms){
  const t=ms/1000,dt=Math.min(.05,t-prev);prev=t;
  tAcc+=dt;if(tAcc>=1){tAcc-=1;S.plots.forEach((p,i)=>{if(!p)return;p.water=Math.max(0,p.water-.8);
    if(p.stage<3&&p.water>25){p.idle=(p.idle||0)+1;if(p.idle>=IDLE_SECS){p.idle=0;p.prog++;if(p.prog>=NEED)grow(p,i);}}});
    if(performance.now()>flashUntil&&flash){flash="";}renderStatus();}
  S.plots.forEach(p=>{if(p&&p.bounce>0)p.bounce=Math.max(0,p.bounce-dt*2.2);});
  if(st.moonWob>0)st.moonWob=Math.max(0,st.moonWob-dt);
  moveButterfly(dt);
  if($("#s-garden").classList.contains("show"))drawGarden(c1,t,dt,st);
  else if($("#s-secret").classList.contains("show")&&!$("#secret-open").hidden)drawSecret(c2,t,dt,st);
  requestAnimationFrame(frame);
}
load();
if(!Array.isArray(S.plots)||S.plots.length!==6)S.plots=Array(6).fill(null);
if(!S.unlocked.includes("daisy"))S.unlocked.unshift("daisy");
intro();renderAll();
const h0=location.hash.slice(1);if(SCREENS.includes(h0))go(h0);
setInterval(save,10000);
(window.claude&&window.claude.hot&&window.claude.hot.ready)?window.claude.hot.ready(()=>requestAnimationFrame(frame)):requestAnimationFrame(frame);
