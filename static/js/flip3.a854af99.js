(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["flip3"],{"184f":function(t,e,s){"use strict";var n=s("acc6"),a=s.n(n);a.a},"33af":function(t,e,s){},"576c":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[t._m(0),s("div",{staticClass:"btn_cont"},[s("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.flipani2()}}},[t._v("FLIP动画")])]),s("div",[s("div",{ref:"test1",staticClass:"test1",on:{click:function(e){return t.ceshi(e)}}},[s("img",{attrs:{src:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png"}})]),s("div",{ref:"test2",staticClass:"test2"},[s("img")])]),s("div",{staticClass:"app"},[s("div",{staticClass:"scene -gallery"},t._l(t.items,function(e,n){return s("div",{key:n,staticClass:"item",attrs:{"data-key":e.dataKey},on:{click:function(e){return t.detail(e)}}},[s("img",{attrs:{src:e.src,alt:""}})])}),0),t._m(1)])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ani_cont"},[s("div",{staticClass:"ani_cont2",attrs:{id:"tg2"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"scene -detail",staticStyle:{display:"none"}},[s("div",{staticClass:"detail"},[s("img")])])}],c={data:function(){return{items:[{dataKey:"owl",src:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png"},{dataKey:"deer",src:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-deer.png"},{dataKey:"hipster",src:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-hipster.png"}]}},mounted:function(){},methods:{ceshi:function(t){var e=t.target;console.log(e);var s=e.getBoundingClientRect();console.log(s);var n=this.$refs.test2;n.querySelector("img").setAttribute("src",e.getAttribute("src"));var a=n.getBoundingClientRect();console.log(a),n.style.background="#ddd",n.animate([{transform:"\n              translateX(".concat(s.left-a.left,"px)\n              translateY(").concat(s.top-a.top,"px)\n              scale(").concat(s.width/a.width,")\n            ")},{transform:"none"}],{duration:600,easing:"cubic-bezier(0.2, 0, 0.2, 1)"})},flipani2:function(){var t=document.getElementById("tg2"),e=t.getBoundingClientRect();t.style.left="400px";var s=t.getBoundingClientRect(),n=e.left-s.left;console.log(n),t.style.transform="translateX("+n+"px)",requestAnimationFrame(function(){t.className=t.className+" trans2",t.style.transform=""})},detail:function(t){console.log(t);var e=document.querySelector(".detail"),s=document.querySelector(".scene.-detail"),n=t.target.parentNode;console.log(n);var a=n.querySelector("img");e.setAttribute("data-image",n.getAttribute("data-key")),e.querySelector("img").setAttribute("src",a.getAttribute("src")),s.style.display="block",n.style.opacity=0;var c=a.getBoundingClientRect(),i=e.getBoundingClientRect();console.log("firstRect",c),console.log("lastRect",i),console.log("translateX",c.left-i.left),console.log("translateY",c.top-i.top),console.log("scale",c.width/i.width),e.style.transform="translate(".concat(c.left-i.left,"px,").concat(c.top-i.top,"px) scale(").concat(c.width/i.width,")"),requestAnimationFrame(function(){e.className=e.className+" trans2",e.style.transform=""})}}},i=c,o=(s("184f"),s("e7d8"),s("2877")),l=Object(o["a"])(i,n,a,!1,null,"3541946b",null);e["default"]=l.exports},acc6:function(t,e,s){},e7d8:function(t,e,s){"use strict";var n=s("33af"),a=s.n(n);a.a}}]);