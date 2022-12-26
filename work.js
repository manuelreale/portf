(()=>{"use strict";function e(e,n,o,i){const a=document.createElement("span");a.className="cardSpan";const c=document.createElement("div");switch(c.className="card hoverable",a.appendChild(c),e){case"THE JOURNALIST'S THREAD":default:c.onclick=function(){window.location.href="./tjt.html"};break;case"ARIA":c.onclick=function(){window.location.href="./aria.html"};break;case"IO APP":c.onclick=function(){window.location.href="./io.html"};break;case"OIKIA":c.onclick=function(){window.location.href="./oikia.html"};break;case"FLOW":c.onclick=function(){window.location.href="./flow.html"};break;case"ASPIRE":c.onclick=function(){window.location.href="./aspire.html"};break;case"INTERTWINED":c.onclick=function(){window.location.href="./intertwined.html"};break;case"EMA":c.onclick=function(){window.location.href="./ema.html"};break;case"PASTACHUTE":c.onclick=function(){window.location.href="./pastachute.html"};break;case"ARTÙ":c.onclick=function(){window.location.href="./artu.html"};break;case"DOLOMITI":c.onclick=function(){window.location.href="./dolomiti.html"}}c.style.animation="swift-box 0.6s forwards ease-in-out 0."+i+"s";const l=document.createElement("div");l.className="thumbnail",c.appendChild(l);const m=document.createElement("div");m.className="thumbnail-back",m.style.backgroundImage="url('img/"+o+".1.png')",l.appendChild(m);const s=document.createElement("div");s.className="thumbnail-front",s.id=i,s.style.backgroundImage="url('img/"+o+".0.png')",1==mobile&&(s.style.opacity="0"),l.appendChild(s);const d=document.createElement("h2");d.className="projectName",d.innerHTML=e,c.appendChild(d);const r=document.createElement("hr");c.appendChild(r);for(let e=0;e<n.length;e++)t(n[e],c);document.getElementById("projectsList").appendChild(a)}function t(e,t){const n=document.createElement("div");n.className="projectTag",n.innerHTML=e,t.appendChild(n)}function n(e){const t=document.getElementById("searchTagSpan"),n=document.createElement("div");n.className="searchTag hoverable",n.innerHTML=e;const o=document.createElement("h2");o.innerHTML="X",n.appendChild(o),n.onclick=function(){"searchTagOff"==this.className?(this.className="searchTag",a(this)):(this.className="searchTagOff",a(this))},t.appendChild(n),document.getElementById("tags").appendChild(t)}screen.width<900?mobile=1:mobile=0,init_pointer({pointerColor:"#000",ringSize:0==mobile?25:0,ringClickSize:10}),n("UX/UI"),n("PRODUCT"),n("VR/AR"),n("VISUAL");let o=[];o[0]={name:"JOURNALIST'S THREAD",tags:["UX/UI"],img:["tjt"]},o[1]={name:"ARIA",tags:["UX/UI"],img:["aria"]},o[2]={name:"IO APP",tags:["UX/UI"],img:["io"]},o[3]={name:"OIKIA",tags:["UX/UI","PRODUCT"],img:["oikia"]},o[4]={name:"FLOW",tags:["UX/UI","PRODUCT"],img:["flow"]},o[5]={name:"ASPIRE",tags:["UX/UI","PRODUCT"],img:["aspire"]},o[6]={name:"INTERTWINED",tags:["VISUAL","VR/AR"],img:["itw"]},o[7]={name:"EMA",tags:["UX/UI"],img:["ema"]},o[8]={name:"PASTACHUTE",tags:["VISUAL"],img:["pastachute"]},o[9]={name:"ARTÙ",tags:["VISUAL"],img:["artu"]},o[10]={name:"DOLOMITI",tags:["VISUAL"],img:["dolomiti"]};let i=0;function a(e){"VISUAL<h2>X</h2>"==e.innerHTML&&(u=0==u?1:0),"VR/AR<h2>X</h2>"==e.innerHTML&&(c=0==c?1:0),"PRODUCT<h2>X</h2>"==e.innerHTML&&(d=0==d?1:0),"UX/UI<h2>X</h2>"==e.innerHTML&&(m=0==m?1:0),function(){let e=document.getElementsByClassName("card");for(;e[0];)e[0].parentNode.removeChild(e[0])}(),h()}let c=1,l=(e,t)=>"VR/AR"==o[e].tags[t]&&1==c||0==c&&0==m&&0==d&&0==u,m=1,s=(e,t)=>"UX/UI"==o[e].tags[t]&&1==m||0==c&&0==m&&0==d&&0==u,d=1,r=(e,t)=>"PRODUCT"==o[e].tags[t]&&1==d||0==c&&0==m&&0==d&&0==u,u=1,g=(e,t)=>"VISUAL"==o[e].tags[t]&&1==u||0==c&&0==m&&0==d&&0==u;function h(){let t=0;i=0;for(let n=0;n<o.length;n++){t=0;for(let e=0;e<o[n].tags.length;e++)(l(n,e)||s(n,e)||r(n,e)||g(n,e))&&(t=1);1==t&&(e(o[n].name,o[n].tags,o[n].img,i),i++)}document.getElementById("projectsArchiveTitle").innerHTML="Projects Archive ("+i+")"}h();var f=[];function w(){for(let e=0;e<12;e++)document.getElementById(e)&&(1==mobile&&p(document.getElementById(e))?document.getElementById(e).style.opacity="1":1==mobile&&(document.getElementById(e).style.opacity="0"))}function I(){E(f[0])&&(document.getElementById("word5").style.animation="swift-text 0.6s forwards ease-in-out 0.0s",document.getElementById("word6").style.animation="swift-text 0.6s forwards ease-in-out 0.2s",document.getElementById("word7").style.animation="swift-text 0.6s forwards ease-in-out 0.4s",document.getElementById("word8").style.animation="swift-text 0.6s forwards ease-in-out 0.6s",document.getElementById("word9").style.animation="swift-text 0.6s forwards ease-in-out 0.8s",document.getElementById("word10").style.animation="swift-ptext 0.4s forwards ease-in-out 0.9s",document.getElementById("word11").style.animation="swift-ptext 0.4s forwards ease-in-out 1.0s",document.getElementById("word12").style.animation="swift-ptext 0.4s forwards ease-in-out 1.1s",document.getElementById("word13").style.animation="swift-ptext 0.4s forwards ease-in-out 1.2s")}window.onload=function(){f[0]=document.getElementById("footer1"),I(),w(),function(){if(1==mobile)for(let e=0;e<i;e++)document.getElementById(e)&&(document.getElementById(e).style.opacity="0")}()},window.addEventListener("scroll",(function(e){f[0]=document.getElementById("footer1"),I(),w()}),!1);var E=function(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.top<=(window.innerHeight||document.documentElement.clientHeight)&&t.right-10<=(window.innerWidth||document.documentElement.clientWidth)},p=function(e){var t=e.getBoundingClientRect();return t.bottom>=0&&t.left>=-10&&t.bottom+150<=(window.innerHeight||document.documentElement.clientHeight)&&t.right-10<=(window.innerWidth||document.documentElement.clientWidth)};!function e(){w(),setTimeout(e,200)}()})();
//# sourceMappingURL=work.js.map