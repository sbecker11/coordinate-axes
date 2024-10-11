import*as e from"three";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function d(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(o){if(o.ep)return;o.ep=!0;const n=d(o);fetch(o.href,n)}})();function R(t,i=!1){try{const o=new e.Mesh(new e.PlaneGeometry(10,10),new e.MeshPhongMaterial({color:16711680,side:e.DoubleSide,transparent:!0,opacity:.5}));o.rotation.y=Math.PI/2,t.add(o);const n=new e.Mesh(new e.PlaneGeometry(10,10),new e.MeshPhongMaterial({color:65280,side:e.DoubleSide,transparent:!0,opacity:.5}));n.rotation.x=Math.PI/2,t.add(n);const c=new e.Mesh(new e.PlaneGeometry(10,10),new e.MeshPhongMaterial({color:255,side:e.DoubleSide,transparent:!0,opacity:.5}));t.add(c);const l=new e.GridHelper(10,10,16777215,16777215);t.add(l);const g=l.clone();g.rotation.x=Math.PI/2,t.add(g);const z=l.clone();z.rotation.z=Math.PI/2,t.add(z);const r=.5,y=.2,s=10/2+r/2,f=.05,b=new e.CylinderGeometry(f,f,s*2+r,32),P=new e.MeshPhongMaterial({color:16711680}),G=new e.Mesh(b,P);G.rotation.z=-Math.PI/2,t.add(G);const E=new e.ConeGeometry(y,r,32),x=new e.Mesh(E,P);if(x.position.x=s+r/2,x.rotation.z=-Math.PI/2,t.add(x),i){const a=m("X",{x:s+r+1,y:0,z:0},16711680);textMeshes.push(a),t.add(a)}const I=new e.CylinderGeometry(f,f,s*2+r,32),S=new e.MeshPhongMaterial({color:65280}),v=new e.Mesh(I,S);t.add(v);const W=new e.ConeGeometry(y,r,32),C=new e.Mesh(W,S);if(C.position.y=s+r/2,t.add(C),i){const a=m("Y",{x:0,y:s+r+1,z:0},65280);textMeshes.push(a),t.add(a)}const O=new e.CylinderGeometry(f,f,s*2+r,32),A=new e.MeshPhongMaterial({color:255}),H=new e.Mesh(O,A);H.rotation.x=Math.PI/2,t.add(H);const D=new e.ConeGeometry(y,r,32),M=new e.Mesh(D,A);if(M.position.z=s+r/2,M.rotation.x=Math.PI/2,t.add(M),i){const a=m("Z",{x:0,y:0,z:s+r+1},255);textMeshes.push(a),t.add(a)}}catch(d){console.error("Error in createPlanesAndAxes",d)}}function m(t,i,d){new e.FontLoader().load("fonts/helvetiker_regular.typeface.json",function(o){const n=new e.TextGeometry(t,{font:o,size:1,height:.1}),c=new e.MeshBasicMaterial({color:d}),l=new e.Mesh(n,c);return l.position.set(i.x,i.y,i.z),l})}let w,p,h,Z,F=[];function N(){try{w=new e.Scene,p=new e.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),h=new e.WebGLRenderer,h.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(h.domElement),createLightingAndCamera(w,p,h),R(w,useTextMeshes=!1),console.log("Scene setup complete")}catch(t){console.error("Error during scene setup:",t)}}window.addEventListener("resize",X,!1);function X(){p.aspect=window.innerWidth/window.innerHeight,p.updateProjectionMatrix(),h.setSize(window.innerWidth,window.innerHeight)}function L(){requestAnimationFrame(L);try{F.forEach(t=>{t.lookAt(p.position)}),h.render(w,p)}catch(t){console.error("Error during animation:",t)}}N();setupWebSocketClient("ws://localhost:3000");L();console.log("Script execution complete");
