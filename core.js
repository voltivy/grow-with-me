/* Data, saving and sound */
/* ============ Data ============ */
const SPECIES = {
  daisy:      {name:"Daisy",         line:"Cheerful and unbothered. Blooms for almost anyone.", color:"#F4EEF8", stem:14},
  tulip:      {name:"Tulip",         line:"Shy at first, then all at once.",                  color:"#D9708F", stem:17},
  sunflower:  {name:"Sunflower",     line:"Follows the light, and the people who bring it.",  color:"#F2C14E", stem:26},
  lavender:   {name:"Lavender",      line:"Calm. Smells like the end of a long day.",         color:"#9C86CE", stem:14},
  forgetmenot:{name:"Forget-me-not", line:"Small, blue, and impossible to forget.",           color:"#8FB2E8", stem:12},
  rose:       {name:"Rose",          line:"Takes its time. Worth the wait.",                  color:"#C84B72", stem:19},
  poppy:      {name:"Poppy",         line:"Bright, brave, and a little dramatic.",            color:"#E5533D", stem:18},
  cosmos:     {name:"Cosmos",        line:"Light as air. Dances in any breeze.",              color:"#F08FB5", stem:22},
  bluebell:   {name:"Bluebell",      line:"Bows its head, but only to listen.",               color:"#6F8FE0", stem:16},
  marigold:   {name:"Marigold",      line:"Warm, loud and impossible to ignore.",             color:"#F28C28", stem:15},
  iris:       {name:"Iris",          line:"Elegant, and quietly proud of it.",                color:"#8D6FD6", stem:24},
  moonpetal:  {name:"Moonpetal",     line:"Only grows when two flowers stay close.",          color:"#CFC3F2", stem:20}
};
const BASE = ["daisy","tulip","sunflower","lavender","forgetmenot","rose"];
const EXTRA = ["poppy","cosmos","bluebell","marigold","iris"];   // bonus flowers, not needed for the Everlasting Flower
const ORDER = BASE.concat(EXTRA);
const STAGE_NAMES = ["Seed","Sprout","Bud","Bloom"];
const NEED = 2;            // waterings per stage
const IDLE_SECS = 150;     // optional: a watered plant also grows by itself, slowly
const TOTAL_MSGS = 8;      // 6 flowers + moon + butterfly

/* ============ State & saving ============ */
const KEY = "growwithme.v1";
const $ = (s,e=document)=>e.querySelector(s);
const $$ = (s,e=document)=>[...e.querySelectorAll(s)];
function fresh(){return {plots:Array(8).fill(null),unlocked:["daisy"],bloomedSp:{},found:{},stats:{planted:0,bloomed:0,watered:0},
  log:[],miles:{},notes:"",pair:false,letterRead:false,secretSeen:false,tool:"seed",seed:"daisy",custom:{},last:Date.now(),started:false,v:3,newStuff:false};}
let S = fresh();
function load(){try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);S=Object.assign(fresh(),o);
  if(!o.v){S.newStuff=true;S.v=2;                       // saved before the 8-plot update
    if(Array.isArray(o.plots)&&o.plots.length===6){S.plots=Array(8).fill(null);o.plots.forEach((p,i)=>{S.plots[((i/3)|0)*4+(i%3)]=p;});}}}}catch(e){}}
function unlockPass(){const got=[];for(let i=1;i<ORDER.length;i++){if(S.bloomedSp[ORDER[i-1]]&&!S.unlocked.includes(ORDER[i])){S.unlocked.push(ORDER[i]);logIt("Found a "+SPECIES[ORDER[i]].name+" seed.");got.push(ORDER[i]);}}return got;}
function save(){S.last=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const cfg = ()=>{const c=S.custom||{};return {
  to:c.to||CONFIG.to, from:c.from||CONFIG.from, signMessage:c.signMessage||CONFIG.signMessage,
  signTitle:(CONFIG.signTitle).replace("{to}",c.to||CONFIG.to),
  memories:Object.assign({},CONFIG.memories,c.memories||{}),
  moonMessage:c.moonMessage||CONFIG.moonMessage, butterflyMessage:c.butterflyMessage||CONFIG.butterflyMessage,
  letter:c.letter||CONFIG.letter, ending:CONFIG.ending, pairMessage:CONFIG.pairMessage};};
function logIt(t){S.log.unshift({t:Date.now(),text:t});if(S.log.length>80)S.log.length=80;}
function mile(id,text){if(!S.miles[id]){S.miles[id]={t:Date.now(),text};logIt(text);}}
const fmt = t=>new Date(t).toLocaleDateString(undefined,{day:"numeric",month:"short"});
const CORE_KEYS = BASE.concat(["moon","butterfly"]);
const msgCount = ()=>CORE_KEYS.filter(k=>S.found[k]).length;
const bonusCount = ()=>EXTRA.filter(k=>S.found[k]).length;
const allBloomed = ()=>BASE.every(s=>S.bloomedSp[s]);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ============ Sound (tiny, generated, starts after a click) ============ */
let AC=null, master=null, musicOn=false, musicTimer=null;
function audio(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.5;master.connect(AC.destination);}catch(e){AC=null;}}
  if(AC&&AC.state==="suspended")AC.resume();return AC;}
function tone(f,t0,dur,type="sine",vol=.12){const a=audio();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(0,a.currentTime+t0);g.gain.linearRampToValueAtTime(vol,a.currentTime+t0+.02);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+t0+dur);
  o.connect(g);g.connect(master);o.start(a.currentTime+t0);o.stop(a.currentTime+t0+dur+.05);}
const N = {c4:262,d4:294,e4:330,g4:392,a4:440,c5:523,d5:587,e5:659,g5:784,a5:880,c6:1047};
function sfx(k){
  if(k==="water"){[0,.06,.12].forEach((t,i)=>tone(700-i*90,t,.12,"triangle",.07));}
  else if(k==="plant"){tone(N.c4,0,.12,"square",.05);tone(N.g4,.07,.14,"square",.05);}
  else if(k==="grow"){tone(N.e5,0,.2,"sine",.1);tone(N.g5,.1,.3,"sine",.1);}
  else if(k==="bloom"){[N.c5,N.e5,N.g5,N.c6].forEach((f,i)=>tone(f,i*.11,.5,"sine",.11));}
  else if(k==="found"){[N.g5,N.a5,N.c6].forEach((f,i)=>tone(f,i*.09,.45,"triangle",.09));}
  else if(k==="tap"){tone(520,0,.05,"square",.03);}
  else if(k==="dig"){tone(160,0,.1,"sawtooth",.04);}
}
function music(on){musicOn=on;clearTimeout(musicTimer);const b=$("#btn-music");b.textContent="Music: "+(on?"on":"off");b.setAttribute("aria-pressed",on);b.classList.toggle("on",on);
  if(!on)return;audio();const scale=[N.c4,N.d4,N.e4,N.g4,N.a4,N.c5,N.d5,N.e5];let i=0;
  (function step(){if(!musicOn)return;const f=scale[(Math.random()*scale.length)|0];tone(f,0,1.8,"sine",.045);
    if(i%4===0)tone(f/2,0,2.4,"triangle",.03);i++;musicTimer=setTimeout(step,1100+Math.random()*900);})();}
