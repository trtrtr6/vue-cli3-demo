(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["waterCompView"],{"28a5":function(t,e,i){"use strict";var n=i("aae3"),r=i("cb7c"),a=i("ebd6"),s=i("0390"),o=i("9def"),l=i("5f1b"),c=i("520a"),h=i("79e5"),u=Math.min,d=[].push,f="split",g="length",x="lastIndex",w=4294967295,v=!h(function(){RegExp(w,"y")});i("214f")("split",2,function(t,e,i,h){var p;return p="c"=="abbc"[f](/(b)*/)[1]||4!="test"[f](/(?:)/,-1)[g]||2!="ab"[f](/(?:ab)*/)[g]||4!="."[f](/(.?)(.?)/)[g]||"."[f](/()()/)[g]>1||""[f](/.?/)[g]?function(t,e){var r=String(this);if(void 0===t&&0===e)return[];if(!n(t))return i.call(r,t,e);var a,s,o,l=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),u=0,f=void 0===e?w:e>>>0,v=new RegExp(t.source,h+"g");while(a=c.call(v,r)){if(s=v[x],s>u&&(l.push(r.slice(u,a.index)),a[g]>1&&a.index<r[g]&&d.apply(l,a.slice(1)),o=a[0][g],u=s,l[g]>=f))break;v[x]===a.index&&v[x]++}return u===r[g]?!o&&v.test("")||l.push(""):l.push(r.slice(u)),l[g]>f?l.slice(0,f):l}:"0"[f](void 0,0)[g]?function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)}:i,[function(i,n){var r=t(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,r,n):p.call(String(r),i,n)},function(t,e){var n=h(p,t,this,e,p!==i);if(n.done)return n.value;var c=r(t),d=String(this),f=a(c,RegExp),g=c.unicode,x=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(v?"y":"g"),m=new f(v?c:"^(?:"+c.source+")",x),b=void 0===e?w:e>>>0;if(0===b)return[];if(0===d.length)return null===l(m,d)?[d]:[];var C=0,S=0,y=[];while(S<d.length){m.lastIndex=v?S:0;var R,F=l(m,v?d:d.slice(S));if(null===F||(R=u(o(m.lastIndex+(v?0:S)),d.length))===C)S=s(d,S,g);else{if(y.push(d.slice(C,S)),y.length===b)return y;for(var T=1;T<=F.length-1;T++)if(y.push(F[T]),y.length===b)return y;S=C=R}}return y.push(d.slice(C)),y}]})},"36bd":function(t,e,i){"use strict";var n=i("4bf8"),r=i("77f1"),a=i("9def");t.exports=function(t){var e=n(this),i=a(e.length),s=arguments.length,o=r(s>1?arguments[1]:void 0,i),l=s>2?arguments[2]:void 0,c=void 0===l?i:r(l,i);while(c>o)e[o++]=t;return e}},"6c7b":function(t,e,i){var n=i("5ca1");n(n.P,"Array",{fill:i("36bd")}),i("9c6c")("fill")},"8c98":function(t,e,i){},aea7:function(t,e,i){"use strict";i.r(e);var n,r,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"water-box"},[i("water",{staticClass:"water-wrapper",attrs:{rangeValue:t.rangeValue,colorStart:t.colorInfo.colorStart,colorEnd:t.colorInfo.colorEnd,textColor:t.colorInfo.textColor,textStrokeColor:t.colorInfo.textStrokeColor,duration:3e3}})],1)},s=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("canvas",{ref:"water"})},l=[],c=(i("6c7b"),i("c5f6"),i("2a40")),h=(i("28a5"),0),u="webkit moz ms o".split(" "),d="undefined"===typeof window;if(d)n=function(){},r=function(){};else{var f;n=window.requestAnimationFrame,r=window.cancelAnimationFrame;for(var g=0;g<u.length;g++){if(n&&r)break;f=u[g],n=n||window[f+"RequestAnimationFrame"],r=r||window[f+"CancelAnimationFrame"]||window[f+"CancelRequestAnimationFrame"]}n&&r||(n=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-h)),n=window.setTimeout(function(){t(e+i)},i);return h=e+i,n},r=function(t){window.clearTimeout(t)})}var x={props:{max:{type:Number,default:1e3},rangeValue:{type:[Number],default:0},duration:{type:Number,default:3e3},autoplay:{type:Boolean,default:!0},colorStart:{type:String,default:"rgba(238,220,178,1)"},colorEnd:{type:String,default:"rgba(192,150,99,0.2)"},textColor:{type:String,default:"#F2691D"},textStrokeColor:{type:String,default:"rgba(242,78,29,1)"},useEasing:{type:Boolean,default:!0},easingFn:{type:Function,default:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e}}},data:function(){return{drawCloseFlag:!1,rAF:null,ctx:null,nowRange:0,startTime:null,mW:200,mH:200,sX:0,waveWidth:.035,waveHeight:6,speed:.05,xOffset:0,isClip:!1}},computed:{sY:function(){return this.mH/2},axisLength:function(){return this.mW},r:function(){return this.mH/2},cR:function(){return this.r-Object(c["c"])(12)}},watch:{rangeValue:function(){this.drawWater()}},methods:{drawWater:function(){var t=this,e=document.documentElement.style.fontSize;"0px"===e?setTimeout(function(){t.waterInit()},350):this.waterInit()},waterInit:function(){this.ctx||this.creatCtx(),this.autoplay&&(this.start(),this.ctx||window.addEventListener("scroll",this.handleScroll))},start:function(){this.startTime=null,this.nowRange=0,r(this.rAF),this.rAF=n(this.render)},pause:function(){r(this.rAF),this.rAF=null},continue:Object(c["a"])(function(){this.rAF=n(this.render)},300),handleScroll:function(){var t=this.$refs.water.getBoundingClientRect();t.bottom<0?this.drawCloseFlag&&this.pause():this.rAF||this.continue()},creatCtx:function(){var t=window.devicePixelRatio,e=this.$refs.water;this.ctx=e.getContext("2d");var i=e.getBoundingClientRect();console.log("canvasBox",i),console.log("scaleFactor",t),this.mW=i.width,this.mH=i.height,e.width=i.width*t,e.height=i.height*t,this.ctx.scale(t,t)},drawCircle:function(t){var e=this.ctx,i=this.r,n=this.cR;e.beginPath(),"left"===t?(e.fillStyle="rgba(255,255,255,0.24)",e.arc(i+Object(c["c"])(10),i-Object(c["c"])(6),n,0,2*Math.PI)):"right"===t?(e.fillStyle="rgba(255,255,255,0.24)",e.arc(i-Object(c["c"])(10),i,n,0,2*Math.PI)):(e.fillStyle="rgba(255,255,255,0.6)",e.arc(i,i,n,0,2*Math.PI)),e.fill(),e.restore()},clipCircle:function(){var t=this.r,e=this.cR;this.ctx.beginPath(),this.ctx.save(),this.ctx.arc(t,t,e,0,2*Math.PI),this.ctx.restore(),this.ctx.clip()},drawSin:function(){var t=this.sX,e=this.axisLength,i=this.waveWidth,n=this.xOffset,r=this.nowRange,a=this.waveHeight,s=this.mH;this.ctx.save();var o=[];this.ctx.beginPath();for(var l=t;l<t+e;l+=20/e){var c=-Math.sin((t+l)*i+n),h=s*(1-r/this.max);o.push([l,h+c*a]),this.ctx.lineTo(l,h+c*a)}this.ctx.lineTo(e,s),this.ctx.lineTo(t,s);var u=o[0];u&&this.ctx.lineTo(u[0],u[1]);var d=this.ctx.createLinearGradient(0,0,0,180);d.addColorStop(0,this.colorStart),d.addColorStop(1,this.colorEnd),this.ctx.fillStyle=d,this.ctx.fill(),this.ctx.restore()},drawText:function(){var t=this.nowRange,e=this.r;this.ctx.save(),this.ctx.font="bold ".concat(Object(c["c"])(48),"px sans-serif"),this.ctx.textAlign="center",this.ctx.fillStyle=this.textColor,this.ctx.fillText(~~t,e,e),this.ctx.strokeStyle=this.textStrokeColor,this.ctx.strokeText(~~t,e,e),this.ctx.restore()},drawLabelText:function(){var t=this.r;this.ctx.save(),this.ctx.font="bold ".concat(Object(c["c"])(24),"px sans-serif"),this.ctx.textAlign="center",this.ctx.fillStyle="rgba(255,255,255,1)",this.ctx.fillText("价值分",t,t+Object(c["c"])(35)),this.ctx.restore()},render:function(t){this.startTime||(this.startTime=t);var e=t-this.startTime,i=this.rangeValue,r=this.nowRange,a=this.mW,s=this.mH,o=this.speed;this.ctx.clearRect(0,0,a,s),this.drawCircle(),this.drawCircle("left"),this.drawCircle("right"),this.isClip||(this.isClip=!0,this.clipCircle()),r<i&&e<this.duration&&(this.useEasing?this.nowRange=this.easingFn(e,0,this.rangeValue,this.duration):this.nowRange=this.rangeValue*(e/this.duration),this.nowRange=this.nowRange>this.rangeValue?this.rangeValue:this.nowRange,this.nowRange=this.nowRange.toFixed(0),this.nowRange===this.rangeValue&&(this.drawCloseFlag=!0)),this.drawSin(),this.drawText(),this.drawLabelText(),this.xOffset+=o,this.rAF=n(this.render)}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll),r(this.rAF)}},w=x,v=i("2877"),p=Object(v["a"])(w,o,l,!1,null,null,null),m=p.exports,b={data:function(){return{colorInfo:{colorStart:"rgba(108,109,210,1)",colorEnd:"rgba(75,81,168,0.2)",textColor:"#FE6400",textStrokeColor:"rgba(242,78,29,0.5)"},rangeValue:-1}},components:{water:m},mounted:function(){this.rangeValue=678}},C=b,S=(i("bacd"),Object(v["a"])(C,a,s,!1,null,"62cb6a3f",null));e["default"]=S.exports},bacd:function(t,e,i){"use strict";var n=i("8c98"),r=i.n(n);r.a}}]);