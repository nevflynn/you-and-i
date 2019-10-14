(this["webpackJsonpyou-and-i"]=this["webpackJsonpyou-and-i"]||[]).push([[0],{17:function(e,n,t){e.exports=t(24)},22:function(e,n,t){},23:function(e,n,t){},24:function(e,n,t){"use strict";t.r(n);var a=t(1),o=t.n(a),i=t(11),r=t.n(i),c=(t(22),t(4)),s=t(12),l=t(7),d=t(5),m=t(6),p=(t(23),t(0)),u=t(13),h=t.n(u),f=t(15),_=t(14),g=t(3),v=t.n(g),w=t(16),b=t(9),y=t.n(b),E={fontFamily:"Roboto Mono",fontSize:"20px"},j={fontFamily:"Open Sans",fontWeight:"300",fontSize:"16px"},A=function(e){var n=Object(a.useState)(e.children.split(" ")),t=Object(w.a)(n,2),i=t[0];t[1];return o.a.createElement("div",{style:e.heading?E:j,className:y.a.sentence},i.map((function(n,t){return o.a.createElement(o.a.Fragment,{key:t},o.a.createElement("style",{children:"\n    @keyframes fadeIn {\n        0%   { opacity: 0; filter:blur(5px)}\n        100% { opacity: 1; filter:blur(0px)}\n    }\n"}),o.a.createElement("span",{className:y.a.word,key:t,style:{animationDuration:"1s",animationDelay:"".concat(e.delay+t/30,"s"),animationIterationCount:1,animationName:"fadeIn",animationTimingFunction:"ease-in",animationFillMode:"backwards"}},n))})))};h()(p);var C,P=[],L=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=Object(l.a)(this,(e=Object(d.a)(n)).call.apply(e,[this].concat(o)))).state={phoneLoaded:!1},t.sceneSetup=function(){var e=t.main.clientWidth,n=t.main.clientHeight;t.scene=new p.Scene,t.camera=new p.PerspectiveCamera(60,e/n,.1,1e3),t.camera.position.z=1.5,t.renderer=new p.WebGLRenderer({antialias:!0,aplha:!0}),t.renderer.setSize(e,n),t.main.appendChild(t.renderer.domElement);var a=(new p.TextureLoader).load("./img/scene-bg.jpg");t.scene.background=a,t.composer=new f.a(t.renderer);var o=new _.a(t.scene,t.camera);t.composer.addPass(o)},t.addCustomSceneObjects=function(){t.addPhoneObject(),t.addLights()},t.startAnimationLoop=function(){t.state.phoneLoaded&&(C.rotation.x+=.01,C.rotation.y+=.01),t.composer.render(),requestAnimationFrame(t.startAnimationLoop)},t.addLights=function(){P[0]=new p.PointLight("white",10,0),P[1]=new p.PointLight(16777215,2,0),P[2]=new p.PointLight(16777215,10,0),P[0].position.set(0,200,0),P[1].position.set(100,200,100),P[2].position.set(-100,-200,-100),t.scene.add(P[0]),t.scene.add(P[1]),t.scene.add(P[2])},t.addPhoneObject=function(){var e=new p.MeshPhongMaterial({color:"#343f50",emissive:"#000",flatShading:!0,specular:"#ffffff",transparent:!0,opacity:.2,shininess:60});t.THREE=p,(new t.THREE.OBJLoader).load("./objects/phone.obj",(function(n){n.traverse((function(n){n instanceof p.Mesh&&(n.material=e)})),C=n,n.scale.set(5e-4,5e-4,5e-4),t.scene.add(n),t.setState({phoneLoaded:!0})}),(function(e){console.log(e.loaded/e.total*100+"% loaded")}),(function(e){console.log("An error happened")}))},t}return Object(m.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){this.sceneSetup(),this.addCustomSceneObjects(),this.startAnimationLoop()}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:v.a.scene,ref:function(n){return e.main=n}}),o.a.createElement("div",{className:v.a.document},o.a.createElement("div",{className:v.a.introductionContainer},o.a.createElement("div",{className:v.a.introduction},o.a.createElement(A,{heading:!0,delay:0},"We are You & I - a digital product studio\x03 specialising in cutting edge product design & development."),o.a.createElement(A,{delay:1},"Our goal is to build emotive and memorable digital\x03 experiences which stimulate discussion.")),o.a.createElement("div",{className:v.a.scrollPrompt},o.a.createElement("div",{className:v.a.scrollContainer},o.a.createElement("span",{className:v.a.scrollPoint})))),o.a.createElement("div",{className:v.a.projectsContainer},o.a.createElement("h1",null,"Projects"))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},3:function(e,n,t){e.exports={scene:"App_scene__NJwvr",document:"App_document__23dW3",introductionContainer:"App_introductionContainer__1-pBv",introduction:"App_introduction__1Jmpc",scrollPrompt:"App_scrollPrompt__QpMYU",scrollContainer:"App_scrollContainer__1Rcdz",scrollPoint:"App_scrollPoint__32q9Q",scroll:"App_scroll__32FKA",h3Container:"App_h3Container__3Np-1",projectsContainer:"App_projectsContainer__2bWI6"}},9:function(e,n,t){e.exports={word:"FadeText_word__2fVdl",sentence:"FadeText_sentence__2vnbP"}}},[[17,1,2]]]);
//# sourceMappingURL=main.a7f7fdfd.chunk.js.map