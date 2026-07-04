const fade=t=>t*t*t*(t*(t*6-15)+10);
export class Perlin {
  constructor(s=42){
    const p=[...Array(256)].map((_,i)=>i),r=this._m32(s);
    for(let i=255;i;i--){const j=Math.floor(r()*(i+1));[p[i],p[j]]=[p[j],p[i]]}
    this.perm=[...p,...p];
  }
  _m32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  _gr(h,x,y){const h2=h&3;return(h2&1?x:-x)+(h2&2?y:-y)}
  noise(x,y){
    const X=Math.floor(x)&255,Y=Math.floor(y)&255;const xf=x-Math.floor(x),yf=y-Math.floor(y),u=fade(xf),v=fade(yf);
    const p=this.perm,aa=p[p[X]+Y],ab=p[p[X]+Y+1],ba=p[p[X+1]+Y],bb=p[p[X+1]+Y+1];
    const L=(a,b,t)=>a+t*(b-a);return L(L(this._gr(aa,xf,yf),this._gr(ba,xf-1,yf),u),L(this._gr(ab,xf,yf-1),this._gr(bb,xf-1,yf-1),u),v);
  }
  fbm(x,y,o=5,l=2,g=.5){let v=0,a=1,f=1,m=0;for(let i=0;i<o;i++){v+=a*this.noise(x*f,y*f);m+=a;a*=g;f*=l}return v/m}
}
