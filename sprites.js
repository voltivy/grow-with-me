
/* ======================== */
const R=(c,col,x,y,w,h)=>{c.fillStyle=col;c.fillRect(Math.floor(x),Math.floor(y),w,h);};
const G1="#4a8238", G2="#79b445", GL="#A7C69A";

function head(c,sp,cx,cy,t){
  if(sp==="daisy"){
    [[-1,-5],[-1,3],[-5,-1],[3,-1],[-4,-4],[2,-4],[-4,2],[2,2]].forEach(([x,y])=>R(c,"#F4EEF8",cx+x,cy+y,3,3));
    R(c,"#d8cfe6",cx-5,cy-1,1,3);R(c,"#E9A83C",cx-2,cy-2,5,5);R(c,"#FFE9A0",cx-1,cy-1,2,2);
  }else if(sp==="tulip"){
    R(c,"#D9708F",cx-4,cy-1,9,6);R(c,"#D9708F",cx-4,cy-5,3,5);R(c,"#D9708F",cx+2,cy-5,3,5);
    R(c,"#B04A6E",cx-1,cy-4,3,7);R(c,"#F0A0B8",cx-3,cy,2,3);R(c,"#8f3556",cx-3,cy+4,7,1);
  }else if(sp==="sunflower"){
    [[-1,-8],[-1,6],[-8,-1],[6,-1],[-6,-6],[4,-6],[-6,4],[4,4],[-4,-8],[2,-8],[-4,6],[2,6],[-8,-4],[-8,2],[6,-4],[6,2]]
      .forEach(([x,y],i)=>R(c,i%2?"#F7D77A":"#F2B93B",cx+x,cy+y,3,3));
    R(c,"#F2B93B",cx-5,cy-5,11,11);R(c,"#5b3a29",cx-4,cy-4,9,9);R(c,"#3a2418",cx-2,cy-2,1,1);R(c,"#3a2418",cx+1,cy-2,1,1);
    R(c,"#3a2418",cx-2,cy+1,1,1);R(c,"#3a2418",cx+1,cy+1,1,1);R(c,"#8a5a3a",cx-3,cy-3,2,1);
  }else if(sp==="lavender"){
    for(let i=0;i<5;i++){const y=cy-8+i*3,o=i%2;R(c,"#9C86CE",cx-2+o,y,2,2);R(c,"#C5B4EE",cx+o,y+1,2,2);R(c,"#77669F",cx-1,y+2,1,1);}
    R(c,"#C5B4EE",cx-1,cy-10,2,2);
  }else if(sp==="forgetmenot"){
    [[0,-2],[-5,2],[5,1]].forEach(([x,y])=>{const X=cx+x,Y=cy+y;R(c,"#8FB2E8",X-1,Y-2,3,1);R(c,"#8FB2E8",X-2,Y-1,5,3);R(c,"#8FB2E8",X-1,Y+2,3,1);R(c,"#F2D98C",X,Y,1,1);});
  }else if(sp==="rose"){
    R(c,"#8E2E52",cx-3,cy-5,7,10);R(c,"#8E2E52",cx-5,cy-3,11,6);
    R(c,"#C84B72",cx-3,cy-4,7,8);R(c,"#C84B72",cx-4,cy-2,9,4);
    R(c,"#E0708F",cx-2,cy-3,3,1);R(c,"#E0708F",cx-3,cy-2,1,3);R(c,"#F0A0B8",cx-1,cy-1,2,1);R(c,"#8E2E52",cx,cy+1,2,1);R(c,"#8E2E52",cx-2,cy,1,2);
  }else if(sp==="moonpetal"){
    const k=.5+.5*Math.sin(t*3);
    R(c,"#CFC3F2",cx-1,cy-7,3,15);R(c,"#CFC3F2",cx-7,cy-1,15,3);
    [[-5,-5],[3,-5],[-5,3],[3,3]].forEach(([x,y])=>R(c,"#B7A6EA",cx+x,cy+y,3,3));
    R(c,k>.5?"#fff":"#F2D98C",cx-1,cy-1,3,3);
  }
}
function plant(c,sp,st,bx,by,t,b){
  const dy = b>0 ? -Math.round(Math.sin((1-b)*Math.PI)*3) : 0;
  c.save();c.translate(0,dy);
  if(st===0){
    R(c,"#c9b392",bx-4,by-3,2,1);R(c,"#c9b392",bx+2,by-4,2,1);R(c,"#c9b392",bx-1,by-1,2,1);R(c,"#e3d2b0",bx-3,by-3,1,1);R(c,"#e3d2b0",bx+2,by-4,1,1);
  }else{
    const S_=SPECIES[sp],h=st===1?7:st===2?12:S_.stem,sw=Math.round(Math.sin(t*1.3+bx*.1)*.6),w=st===1?1:2,sx=st===1?bx:bx-1;
    for(let i=0;i<h;i++)R(c,G1,sx+(i>h*.6?sw:0),by-1-i,w,1);
    if(st===1){R(c,G2,bx-3,by-5,3,2);R(c,G2,bx+1,by-6,3,2);R(c,G2,bx,by-9,1,2);}
    else{R(c,G2,bx-6,by-6,5,2);R(c,GL,bx-6,by-6,2,1);R(c,G2,bx+1,by-9,5,2);R(c,GL,bx+4,by-9,2,1);R(c,G1,bx-4,by-4,3,1);}
    const hx=bx+sw,top=by-h;
    if(st===2){
      const col=S_.color;R(c,col,hx-2,top-5,4,5);R(c,col,hx-1,top-6,2,1);R(c,G2,hx-2,top-1,4,1);
      if(sp==="daisy")R(c,"#d8cfe6",hx-2,top-4,1,3);
    }else if(st===3){
      const k=.5+.5*Math.sin(t*2+bx);c.globalAlpha=.10+.06*k;c.fillStyle=S_.color;c.beginPath();c.arc(hx+.5,top-2,15,0,7);c.fill();c.globalAlpha=1;
      head(c,sp,hx,top-3,t);
    }
  }
  c.restore();
}
function canIcon(c,x,y){R(c,"#6f7fb8",x+3,y+7,9,7);R(c,"#8a9bd0",x+3,y+7,9,5);R(c,"#aab8e8",x+3,y+6,9,1);R(c,"#aab8e8",x+4,y+8,2,3);
  R(c,"#6f7fb8",x+12,y+8,2,1);R(c,"#6f7fb8",x+13,y+8,1,4);R(c,"#6f7fb8",x+12,y+11,2,1);
  R(c,"#8a9bd0",x+2,y+5,2,1);R(c,"#8a9bd0",x+1,y+4,2,1);R(c,"#8a9bd0",x,y+3,2,1);R(c,"#aab8e8",x,y+2,2,1);}
function shovelIcon(c,x,y){R(c,"#8b6b4a",x+7,y+3,2,8);R(c,"#a98760",x+5,y+1,6,2);R(c,"#b9b4c9",x+5,y+10,6,4);R(c,"#dcd7e8",x+6,y+10,2,3);R(c,"#8f8aa3",x+6,y+14,4,1);}
function seedIcon(c,x,y,col){R(c,"#e9dfcf",x+3,y+3,10,12);R(c,"#cdbf9f",x+3,y+3,10,2);R(c,"#b9a98c",x+3,y+14,10,1);R(c,col,x+6,y+7,4,4);R(c,"#F2D98C",x+7,y+8,2,2);}

/* ---- static sprites made once ---- */
const moon=document.createElement("canvas");moon.width=32;moon.height=32;
(function(){const c=moon.getContext("2d");for(let y=0;y<32;y++)for(let x=0;x<32;x++){
  const a=(x-16)**2+(y-16)**2<=121, b=(x-21)**2+(y-13)**2<=90;
  if(a&&!b){const edge=(x-16)**2+(y-16)**2>96;R(c,edge?"#e2d29a":"#F6EBC0",x,y,1,1);}}})();
function rng(seed){let s=seed;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296);}
const rnd=rng(7);
const stars=Array.from({length:44},()=>({x:rnd()*320,y:rnd()*84,p:rnd()*6,big:rnd()>.84}));
const tufts=Array.from({length:90},()=>({x:rnd()*320,y:100+rnd()*98,c:rnd()>.7?"#5f8f63":"#3d6b55"}));
const trees=Array.from({length:17},(_,i)=>({x:i*20-6+rnd()*6,h:16+rnd()*16}));
const flies=Array.from({length:16},()=>({x:rnd()*320,y:60+rnd()*130,p:rnd()*6,s:.4+rnd()*.7}));
const sparkles=Array.from({length:12},()=>({x:rnd()*320,y:100+rnd()*95,p:rnd()*6}));
const bf={x:200,y:80,tx:220,ty:70,trail:0};
let particles=[],fx={can:null};

function cloud(c,x,y,w,t){
  const dark="#a874a5",mid="#D79BBF",hi="#ecc3da";
  R(c,dark,x+2,y+9,w-4,5);R(c,mid,x,y+6,w,6);R(c,mid,x+5,y+2,w-10,8);R(c,hi,x+8,y+2,w-18,3);R(c,hi,x+3,y+6,6,2);R(c,mid,x+w*.35,y-1,w*.3,4);R(c,hi,x+w*.38,y-1,w*.2,2);
}
function sky(c,t){
  ["#171521","#1b1830","#1f1a3a","#2a2147","#37295a","#4a3568","#5d4377","#74528a"].forEach((col,i)=>R(c,col,0,i*12,320,12));
  stars.forEach(s=>{const a=.4+.6*Math.max(0,Math.sin(t*1.4+s.p));c.globalAlpha=a;
    if(s.big){R(c,"#fff7dc",s.x,s.y-2,1,5);R(c,"#fff7dc",s.x-2,s.y,5,1);}else R(c,"#f4eaff",s.x,s.y,1,1);});
  c.globalAlpha=1;
}
function drawMoon(c,t,wob){
  const mx=250,my=14+Math.round(Math.sin(t*.6)*1)+(wob>0?Math.round(Math.sin(wob*30)*2):0);
  c.globalAlpha=.07;c.fillStyle="#F6EBC0";[22,18,15].forEach(r=>{c.beginPath();c.arc(mx+16,my+16,r,0,7);c.fill();});c.globalAlpha=1;
  c.drawImage(moon,mx,my);
}
function ground(c,t){
  R(c,"#1d1830",0,64,320,34);
  trees.forEach(tr=>{R(c,"#231d3a",tr.x+3,96-tr.h-5,14,6);R(c,"#231d3a",tr.x,96-tr.h,20,tr.h);R(c,"#2b2447",tr.x+4,96-tr.h-4,6,2);});
  R(c,"#223439",0,96,320,104);
  for(let y=96;y<200;y+=16)R(c,"#25393e",0,y+8,320,8);
  R(c,"#2f4a47",0,96,320,2);
  tufts.forEach(g=>{R(c,g.c,g.x,g.y,1,2);R(c,g.c,g.x+1,g.y-1,1,3);R(c,g.c,g.x+2,g.y,1,2);});
}
function sign(c,t,cfgv){
  const bx=34,by=136;R(c,"#4a3228",bx-1,by-14,4,22);R(c,"#5a3f33",bx-1,by-14,3,22);
  R(c,"#3b2820",bx-25,by-31,50,20);R(c,"#7a5642",bx-24,by-30,48,18);R(c,"#8d6750",bx-24,by-30,48,2);
  let fs=8;c.font=fs+"px 'Pixelify Sans', monospace";let w=c.measureText(cfgv.signTitle).width;
  while(w>42&&fs>5){fs--;c.font=fs+"px 'Pixelify Sans', monospace";w=c.measureText(cfgv.signTitle).width;}
  c.fillStyle="#f6e5cb";c.textAlign="center";c.textBaseline="middle";c.fillText(cfgv.signTitle,bx,by-21);c.textAlign="left";
  const k=Math.sin(t*3)>0?1:0;R(c,"#F2D98C",bx+21,by-36-k,1,3);R(c,"#F2D98C",bx+20,by-35-k,3,1);
}
const PX=[100,160,220], PY=[132,174];
const plotPos=i=>({x:PX[i%3],y:PY[(i/3)|0]});
function drawPlots(c,t,hover){
  for(let row=0;row<2;row++)for(let col=0;col<3;col++){
    const i=row*3+col,{x,y}=plotPos(i),p=S.plots[i];
    const wet=p&&p.water>35;
    R(c,"#171521",x-18,y-6,36,14);R(c,wet?"#2a2440":"#3a3350",x-17,y-6,34,12);
    R(c,wet?"#221d33":"#2f2943",x-14,y-3,28,1);R(c,wet?"#221d33":"#2f2943",x-14,y+1,28,1);
    R(c,"#4a3f6b",x-17,y-6,34,1);
    if(hover===i){c.fillStyle="#D79BBF";c.fillRect(x-19,y-8,38,1);c.fillRect(x-19,y+7,38,1);c.fillRect(x-19,y-8,1,16);c.fillRect(x+18,y-8,1,16);}
    if(p){plant(c,p.sp,p.stage,x,y,t,p.bounce||0);
      if(p.stage===3&&!S.found[p.sp]&&p.sp!=="moonpetal"){const top=y-SPECIES[p.sp].stem-14,k=Math.round(Math.sin(t*3));R(c,"#F2D98C",x-1,top+k,2,2);R(c,"#fff7dc",x,top+k-1,1,1);R(c,"#fff7dc",x,top+k+2,1,1);R(c,"#fff7dc",x-2,top+k,1,2);R(c,"#fff7dc",x+2,top+k,1,2);}
    }
  }
}
function drawFlies(c,t){
  flies.forEach(f=>{const x=f.x+Math.sin(t*f.s+f.p)*12,y=f.y+Math.cos(t*f.s*.8+f.p)*7,a=.35+.65*Math.max(0,Math.sin(t*1.7+f.p*3));
    c.globalAlpha=a*.25;R(c,"#bfe88a",x-2,y-2,5,5);c.globalAlpha=a;R(c,"#e8ffb0",x,y,1,1);c.globalAlpha=1;});
}
function drawButterfly(c,t){
  const x=Math.round(bf.x),y=Math.round(bf.y+Math.sin(t*5)*1.5),up=Math.sin(t*16)>0;
  R(c,"#2a1830",x,y-1,1,4);
  if(up){R(c,"#D79BBF",x-4,y-3,4,3);R(c,"#D79BBF",x+1,y-3,4,3);R(c,"#9C86CE",x-3,y,3,2);R(c,"#9C86CE",x+1,y,3,2);}
  else{R(c,"#D79BBF",x-3,y-1,3,3);R(c,"#D79BBF",x+1,y-1,3,3);R(c,"#9C86CE",x-3,y+2,2,1);R(c,"#9C86CE",x+1,y+2,2,1);}
}
function spawn(n,o){for(let i=0;i<n;i++)particles.push(Object.assign({x:0,y:0,vx:(Math.random()-.5)*30,vy:-Math.random()*30,g:60,life:.8,max:.8,col:"#fff",type:"px"},typeof o==="function"?o(i):o));}
function drawParticles(c,dt){
  particles=particles.filter(p=>(p.life-=dt)>0);
  particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.g*dt;const a=Math.min(1,p.life/p.max*1.5);c.globalAlpha=a;
    if(p.type==="txt"){c.font="7px 'Pixelify Sans', monospace";c.fillStyle=p.col;c.textAlign="center";c.fillText(p.txt,p.x,p.y);c.textAlign="left";}
    else if(p.type==="star"){R(c,p.col,p.x,p.y-1,1,3);R(c,p.col,p.x-1,p.y,3,1);}
    else R(c,p.col,p.x,p.y,p.sz||1,p.sz||1);});
  c.globalAlpha=1;
}
function drawCanAnim(c,dt){
  const a=fx.can;if(!a)return;a.t+=dt;if(a.t>.9){fx.can=null;return;}
  const x=a.x+14,y=a.y-30+Math.sin(a.t*6)*1;R(c,"#6f7fb8",x,y,10,8);R(c,"#aab8e8",x,y,10,2);R(c,"#8a9bd0",x-5,y+3,5,2);R(c,"#6f7fb8",x+10,y+1,2,6);
  if(a.t>.15&&a.t<.7&&Math.random()<.8)spawn(1,{x:a.x+6+Math.random()*3,y:y+5,vx:-8,vy:10,g:140,life:.4,max:.4,col:"#9fd4ff"});
}
function drawGarden(c,t,dt,st){
  c.imageSmoothingEnabled=false;
  sky(c,t);drawMoon(c,t,st.moonWob);
  cloud(c,((t*2)%420)-60,26,46);cloud(c,((t*1.3+200)%420)-60,52,36);cloud(c,((t*1.7+90)%420)-60,10,32);
  ground(c,t);sign(c,t,cfg());drawPlots(c,t,st.hover);
  sparkles.forEach(s=>{const a=Math.max(0,Math.sin(t*2+s.p));if(a>.8)R(c,"#d9c8ff",s.x,s.y,1,1);});
  drawFlies(c,t);drawButterfly(c,t);drawCanAnim(c,dt);drawParticles(c,dt);
  c.fillStyle="rgba(23,21,33,.0)";
}
function moveButterfly(dt){
  const dx=bf.tx-bf.x,dy=bf.ty-bf.y,d=Math.hypot(dx,dy);
  if(d<3){bf.tx=30+Math.random()*260;bf.ty=30+Math.random()*130;}else{bf.x+=dx/d*28*dt;bf.y+=dy/d*28*dt;}
  if(bf.trail>0){bf.trail-=dt;if(Math.random()<.7)spawn(1,{x:bf.x,y:bf.y+3,vx:(Math.random()-.5)*10,vy:Math.random()*8,g:10,life:1,max:1,col:Math.random()>.5?"#F2D98C":"#D79BBF",type:"star"});}
}


function drawSecret(c,t,dt,st){
  c.imageSmoothingEnabled=false;
  R(c,"#0f0d1c",0,0,320,200);R(c,"#141029",0,0,320,70);
  stars.forEach(s=>{c.globalAlpha=.3+.5*Math.max(0,Math.sin(t+s.p));R(c,"#cbd7ff",s.x,s.y*.6,1,1);});c.globalAlpha=1;
  for(let i=0;i<14;i++){const x=i*24-8,h=70+((i*37)%30);R(c,"#0d0b1a",x,0,10,h);R(c,"#110e22",x+10,0,8,h-20);R(c,"#161230",x-6,h-30,28,22);}
  c.drawImage(moon,236,20);
  R(c,"#122028",0,104,320,96);R(c,"#16282f",0,104,320,3);
  for(let i=0;i<60;i++){const x=(i*53)%320,y=110+((i*29)%86);R(c,i%3?"#1e3a44":"#7fa7e8",x,y,2,1);if(i%5===0)R(c,"#5d80c8",x+1,y-1,1,1);}
  // pond
  c.fillStyle="#0b1626";c.beginPath();c.ellipse(70,150,48,17,0,0,7);c.fill();c.fillStyle="#12233a";c.beginPath();c.ellipse(70,149,44,14,0,0,7);c.fill();
  R(c,"#2f6a52",50,146,8,3);R(c,"#2f6a52",78,152,8,3);R(c,"#d79bbf",54,144,3,2);R(c,"#d79bbf",81,150,3,2);
  // pedestal & flower
  const x=190,y=158,open=msgCount()>=TOTAL_MSGS;
  R(c,"#2b2540",x-22,y,44,8);R(c,"#3b3358",x-18,y-4,36,5);R(c,"#4a3f6b",x-18,y-4,36,1);
  const k=.5+.5*Math.sin(t*2);
  if(open){
    c.globalAlpha=.10+.08*k;c.fillStyle="#F2D98C";[34,26,19].forEach(r=>{c.beginPath();c.arc(x,y-48,r,0,7);c.fill();});c.globalAlpha=1;
    for(let i=0;i<30;i++)R(c,G1,x-1,y-4-i,3,1);R(c,G2,x-14,y-18,12,3);R(c,G2,x+3,y-24,12,3);
    const cx=x,cy=y-50;
    [["#B7A6EA",11],["#D79BBF",8],["#F4EEF8",5]].forEach(([col,r],ring)=>{for(let a=0;a<8;a++){const ang=a*Math.PI/4+ring*.4+Math.sin(t*.8)*.05;R(c,col,cx+Math.cos(ang)*r-2,cy+Math.sin(ang)*r-2,5,5);}});
    R(c,"#F2D98C",cx-3,cy-3,7,7);R(c,"#fff7dc",cx-1,cy-1,3,3);
    if(Math.random()<.25)spawn(1,{x:cx+(Math.random()-.5)*30,y:cy+(Math.random()-.5)*20,vx:0,vy:-10,g:0,life:1.2,max:1.2,col:"#F2D98C",type:"star"});
  }else{
    c.globalAlpha=.06+.04*k;c.fillStyle="#9C86CE";c.beginPath();c.arc(x,y-14,16,0,7);c.fill();c.globalAlpha=1;
    for(let i=0;i<14;i++)R(c,"#2f5a3f",x-1,y-4-i,3,1);R(c,"#2f5a3f",x-7,y-10,6,2);R(c,"#4a3f6b",x-4,y-20,9,8);R(c,"#5d4f86",x-3,y-24,7,5);R(c,"#77669F",x-1,y-27,3,3);
  }
  drawFlies(c,t);drawParticles(c,dt);
}
