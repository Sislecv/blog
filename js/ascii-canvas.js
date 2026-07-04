import{Perlin}from'./perlin.js';
const G=' .:-=+*#%@';
export class AsciiCanvas{
  constructor(cv,o={}){
    this.cv=cv;this.ctx=cv.getContext('2d');this.pn=new Perlin(o.s||42);
    this.cw=o.cw||6;this.ch=o.ch||10;this.sc=o.sc||0.015;this.sp=o.sp||0.3;this.it=o.it||1;
    this.t=0;this.mx=-999;this.my=-999;this.resize();this._a=null;
  }
  resize(){this.cv.width=innerWidth;this.cv.height=innerHeight}
  onMouse(x,y){this.mx=x;this.my=y}
  start(){if(!this._a)this._a=requestAnimationFrame(t=>this._l(t))}
  stop(){if(this._a){cancelAnimationFrame(this._a);this._a=null}}
  _l(ts){this.t=ts*this.sp*.001;this._r();this._a=requestAnimationFrame(t=>this._l(t))}
  _r(){
    const w=this.cv.width,h=this.cv.height;if(!w||!h)return;
    const cw=this.cw,ch=this.ch,cols=Math.ceil(w/cw),rows=Math.ceil(h/ch);
    const mx=this.mx/cw,my=this.my/ch;
    this.ctx.fillStyle='#05050f';this.ctx.fillRect(0,0,w,h);
    this.ctx.font=`12px 'VT323','Courier New',monospace`;this.ctx.textBaseline='top';
    for(let py=0;py<rows;py++)for(let px=0;px<cols;px++){
      let nx=px*this.sc,ny=py*this.sc+this.t;
      if(mx>-100&&my>-100){const dx=px-mx,dy=py-my,d=Math.hypot(dx,dy);if(d<40){const s=(1-d/40)*3;nx+=dx*s*this.sc;ny+=dy*s*this.sc}}
      const v=this.pn.fbm(nx,ny,5)*this.it,t=(v+1)/2;
      let bg,fg,ch;
      if(t<.15){bg='#000010';fg='#2a2a3a';ch=G[0]}
      else if(t<.35){bg='#000020';fg='#4a4a6a';ch=G[2]}
      else if(t<.55){bg='#000030';fg='#6a6a9a';ch=G[4]}
      else if(t<.72){bg='#000048';fg='#8a8acc';ch=G[6]}
      else if(t<.88){bg='#000060';fg='#aaaaff';ch=G[8]}
      else{bg='#000080';fg='#dddfff';ch=G[9]}
      const x=px*cw,y=py*ch;this.ctx.fillStyle=bg;this.ctx.fillRect(x,y,cw,ch);
      this.ctx.fillStyle=fg;this.ctx.fillText(ch,x,y+1);
    }
  }
  frame(){this._r()}
}
