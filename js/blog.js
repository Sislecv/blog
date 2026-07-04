import{AsciiCanvas}from'./ascii-canvas.js';
const POSTS=[
  {id:1,cat:'systems',title:'Building a 3D ASCII Extrusion Engine in the Browser',desc:'How I built a real-time 3D ASCII art renderer using Perlin noise and layer-based extrusion in pure JS.',date:'Jul 01, 2026'},
  {id:2,cat:'ai',title:'Orchestrating Sub-Agent Swarms',desc:'Patterns for delegating complex workflows across multiple autonomous agents with parallel execution.',date:'Jun 28, 2026'},
  {id:3,cat:'terminal',title:'Designing a BSOD-Inspired Personal Page',desc:'Turning a Windows Blue Screen of Death into a stylish homepage with Perlin noise, scanlines, and 3D ASCII.',date:'Jun 24, 2026'},
  {id:4,cat:'infra',title:'Running MS-DOS via WebAssembly',desc:'Embedding DOSBox in a web page using js-dos, and the painful journey debugging WASM loading.',date:'Jun 20, 2026'},
  {id:5,cat:'frontend',title:'Perlin Noise: From Python to Canvas',desc:'Implementing 2D Perlin noise with FBM, then porting to JS for real-time browser rendering.',date:'Jun 16, 2026'},
  {id:6,cat:'agents',title:'Self-Reviewing Code with AI Sub-Agents',desc:'Using a multi-agent system to review its own output — the meta-loop that actually works.',date:'Jun 12, 2026'},
  {id:7,cat:'design',title:'The CRT Monitor as a Design System',desc:'Deconstructing the CRT monitor into a web design system: beige casing, green phosphor, scanlines.',date:'Jun 08, 2026'},
  {id:8,cat:'systems',title:'Building a Terminal Music Player',desc:'Creating an interactive retro cassette player inside a simulated DOS terminal with ASCII equalizer.',date:'Jun 04, 2026'},
];

const SYMS=[['╱╲╱╲','╲╱╲╱','╱╲╱╲','╲╱╲╱'],['┌┐┌┐','└┘└┘','┌┐┌┐','└┘└┘'],['▄▄▄▄','████','▀▀▀▀','    ']];

export function init(){
  const cv=document.getElementById('bg');const bg=new AsciiCanvas(cv);bg.start();
  document.addEventListener('mousemove',e=>bg.onMouse(e.clientX,e.clientY));
  window.addEventListener('resize',()=>bg.resize());
  renderPosts();animSymbols();animScene();
}

function renderPosts(){
  const g=document.getElementById('grid');
  for(const p of POSTS){
    const a=document.createElement('a');a.href='#';a.className='cl';
    const c=document.createElement('article');c.className='card';
    c.innerHTML=`
      <div class="ch"><span class="cor">┌</span><span class="cn">#${String(p.id).padStart(2,'0')}</span></div>
      <div class="cb">
        <div class="co"><span class="dot"></span><span class="cc">${p.cat}</span></div>
        <h3 class="ct">${p.title}</h3>
        <p class="cd">${p.desc}</p>
      </div>
      <div class="cf"><span>${p.date}</span><span class="rm">read →</span></div>
    `;
    a.appendChild(c);g.appendChild(a);
  }
}

function animSymbols(){
  const c=document.getElementById('syms');if(!c)return;
  for(let s=0;s<3;s++){
    const e=document.createElement('div');e.className='sym';e.dataset.sym=s;
    e.innerHTML=SYMS[s].map(l=>`<span class="sl">${l}</span>`).join('\n');
    c.appendChild(e);
    setInterval(()=>{
      const lines=e.querySelectorAll('.sl');const sym=SYMS[Number(e.dataset.sym)];
      if(lines.length)for(let i=0;i<lines.length;i++)lines[i].textContent=sym[(e._f||0)%sym.length];
      e._f=(e._f||0)+1;
    },700+Math.random()*400);
  }
}

function animScene(){
  const e=document.getElementById('scene');if(!e)return;
  const S=['  .--.  ',' /    \\ ','/      \\','\\      /',' \\    / ','  \\--/  '];
  let f=0;setInterval(()=>{e.textContent=S.map((l,i)=>' '.repeat(Math.abs(i%2?f%4:-(f%4)))+l).join('\n');f++;},180);
}
