(()=>{"use strict";screen.width<900?mobile=1:mobile=0,init_pointer({pointerColor:"#000",ringSize:0==mobile?25:0,ringClickSize:10});var t=[];function e(){n(t[0])&&(document.getElementById("word5").style.animation="swift-text 0.6s forwards ease-in-out 0.0s",document.getElementById("word6").style.animation="swift-text 0.6s forwards ease-in-out 0.2s",document.getElementById("word7").style.animation="swift-text 0.6s forwards ease-in-out 0.4s",document.getElementById("word8").style.animation="swift-text 0.6s forwards ease-in-out 0.6s",document.getElementById("word9").style.animation="swift-text 0.6s forwards ease-in-out 0.8s",document.getElementById("word10").style.animation="swift-ptext 0.4s forwards ease-in-out 0.9s",document.getElementById("word11").style.animation="swift-ptext 0.4s forwards ease-in-out 1.0s",document.getElementById("word12").style.animation="swift-ptext 0.4s forwards ease-in-out 1.1s",document.getElementById("word13").style.animation="swift-ptext 0.4s forwards ease-in-out 1.2s")}window.onload=function(){t[0]=document.getElementById("footer1"),e()},window.addEventListener("scroll",(function(n){t[0]=document.getElementById("footer1"),e()}),!1);var n=function(t){var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)&&e.right-10<=(window.innerWidth||document.documentElement.clientWidth)}})();
//# sourceMappingURL=flow.js.map