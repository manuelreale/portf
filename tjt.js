(()=>{"use strict";let e,t,n;screen.width<900?mobile=1:mobile=0;var o=0;function i(e){var t=null!==document.webkitFullscreenElement;document.getElementById("html").style.cursor=t?"default":"none"}document.addEventListener("click",(function(i){var l=(i=i||window.event).target;0==o&&"IMG"==l.tagName?(o=1,document.getElementById("html").style.overflowY="hidden",n=document.createElement("div"),n.style.backgroundColor="var(--main-black)",n.style.opacity="90%",n.style.position="fixed",n.style.width="100%",n.style.height="100%",n.style.left="0px",n.style.top="0px",n.style.zIndex="10",document.body.appendChild(n),e=l.cloneNode(!0),e.style.animation="swift-ptext 0.4s forwards ease-in-out 0s",e.style.border="0px",e.style.position="fixed",e.style.left="var(--big-padding)",e.style.top="var(--big-padding)",e.style.zIndex="100",e.style.width="calc(100% - calc(2 * var(--big-padding)))",e.style.height="calc(100% - calc(4 * var(--big-padding)))",e.style.objectFit="contain",document.body.appendChild(e),t=document.createElement("h1"),t.style.top="var(--big-padding)",t.style.right="var(--big-padding)",t.style.position="fixed",t.style.color="var(--main-white)",t.style.mixBlendMode="difference",t.style.transform="translatey(0px)",t.innerHTML="X",t.style.zIndex="101",document.body.appendChild(t)):1==o&&(e.remove(),n.remove(),t.remove(),o=0,document.getElementById("html").style.overflowY="scroll")}),!1);let l=[].concat([].slice.call(document.getElementsByClassName("video")),[].slice.call(document.getElementsByClassName("videoSquare")),[].slice.call(document.getElementsByClassName("video2")),[].slice.call(document.getElementsByClassName("video3")),[].slice.call(document.getElementsByClassName("video4")));for(var d=0;d<l.length;d++)l[d].addEventListener("fullscreenchange",i);init_pointer({pointerColor:"#000",ringSize:0==mobile?25:0,ringClickSize:10});var s=[];function a(){r(s[0])&&(document.getElementById("word5").style.animation="swift-text 0.6s forwards ease-in-out 0.0s",document.getElementById("word6").style.animation="swift-text 0.6s forwards ease-in-out 0.2s",document.getElementById("word7").style.animation="swift-text 0.6s forwards ease-in-out 0.4s",document.getElementById("word8").style.animation="swift-text 0.6s forwards ease-in-out 0.6s",document.getElementById("word9").style.animation="swift-text 0.6s forwards ease-in-out 0.8s",document.getElementById("word10").style.animation="swift-ptext 0.4s forwards ease-in-out 0.9s",document.getElementById("word11").style.animation="swift-ptext 0.4s forwards ease-in-out 1.0s",document.getElementById("word12").style.animation="swift-ptext 0.4s forwards ease-in-out 1.1s",document.getElementById("word13").style.animation="swift-ptext 0.4s forwards ease-in-out 1.2s")}window.onload=function(){s[0]=document.getElementById("footer1"),a()},window.addEventListener("scroll",(function(e){s[0]=document.getElementById("footer1"),a()}),!1);var r=function(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.top<=(window.innerHeight||document.documentElement.clientHeight)&&t.right-10<=(window.innerWidth||document.documentElement.clientWidth)}})();
//# sourceMappingURL=tjt.js.map