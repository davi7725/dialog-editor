var ce=Object.defineProperty,ue=Object.defineProperties;var pe=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var _e=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable;var Z=(e,t,n)=>t in e?ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,H=(e,t)=>{for(var n in t||(t={}))_e.call(t,n)&&Z(e,n,t[n]);if(G)for(var n of G(t))he.call(t,n)&&Z(e,n,t[n]);return e},E=(e,t)=>ue(e,pe(t));import{d as F,u as ve,x as ge,J as Y,o as r,c as d,a as o,b as oe,F as fe,r as L,e as ye,f as x,w as se,g as w,h as V,n as me,i as v,t as K,j as A,k as ee,v as te,p as z,l as M,A as q,m as O,q as ne,$ as xe,s as Ne,V as Ce,y as $e}from"./vendor.763a075a.js";const be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const y of i.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&l(y)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}};be();class Se{constructor(t,n,l){this.name=t,this.playerType=n,this.texts=l}}class ke{constructor(t,n){this.x=t,this.y=n}}class we{constructor(t,n,l,s,i){this.id=t,this.position=n,this.type=l,this.class=s,this.data=i}}class De{constructor(t,n,l,s,i){this.id=t,this.source=n,this.target=l,this.sourceHandle=s,this.targetHandle=i}}class ae{}var j=(e,t)=>{const n=e.__vccOpts||e;for(const[l,s]of t)n[l]=s;return n};const Te={class:"save__controls"},Ie={class:"btn"},Ae=oe(" Load scenario "),Pe={inheritAttrs:!1,methods:{onFileChange(e){let t=e.target.files;t==null||!t.length||this.doSomethingWithTheFile(t[0])},onSave(){let e=prompt("Define your file name.");if(this.$props.scenario!=null){var t=new Blob([JSON.stringify(this.$props.scenario)],{type:"text/plain;charset=utf-8"});fe.exports.saveAs(t,e)}},doSomethingWithTheFile(e){let t=new FileReader;t.onload=n=>{if(n.target!=null){let l=JSON.parse(String(n.target.result));console.log(l),this.$emit("json-file-loaded",l)}},t.readAsText(e)}},props:{scenario:ae}},He=F(E(H({},Pe),{setup(e){return ve("example-flow",{nodes:[],edges:[],position:[NaN,NaN],zoom:1}),ge(),Y(),(n,l)=>(r(),d("div",Te,[o("label",{class:"btn",onClick:l[0]||(l[0]=(...s)=>n.onSave&&n.onSave(...s))},"Save scenario"),o("label",Ie,[o("input",{id:"hiddenInput",type:"file",onChange:l[1]||(l[1]=(...s)=>n.onFileChange&&n.onFileChange(...s))},null,32),Ae])]))}}));var Ee=j(He,[["__scopeId","data-v-704b4a50"]]);const N=e=>(z("data-v-4ab11146"),e=e(),M(),e),Fe={class:"hidemenu"},Le={key:0},Ve=N(()=>o("div",{class:"description"},"Here you can select the dialogs from this scenario",-1)),qe=N(()=>o("hr",null,null,-1)),Oe=["onClick"],Re={key:1},je=N(()=>o("div",{class:"description"},"Here you can see and edit the quests for the scenario",-1)),Be=N(()=>o("hr",null,null,-1)),Je=["onUpdate:modelValue"],Ue={key:2},Ke=N(()=>o("div",{class:"description"},"Here you can see and edit the briefing for the scenario",-1)),Ye=N(()=>o("hr",null,null,-1)),ze={class:"sidemenu"},Me={key:0},Qe=N(()=>o("div",{class:"description"},"You can drag these nodes to the pane.",-1)),We=N(()=>o("hr",null,null,-1)),Xe=N(()=>o("div",{class:"description"},"Player Nodes",-1)),Ge=N(()=>o("hr",null,null,-1)),Ze=N(()=>o("div",{class:"description"},"NPC Nodes",-1)),et=["onDragstart"],tt=F({props:{scenario:ae},emits:["dialogSelected"],setup(e,{emit:t}){const n=e,{nodes:l,edges:s,addNodes:i,setNodes:y,setEdges:C,instance:P,dimensions:b}=Y(),g=(f,p,u,_)=>{f.dataTransfer&&(f.dataTransfer.setData("application/vueflow",p),f.dataTransfer.setData("application/nodeClass",u),f.dataTransfer.setData("application/npcName",_),f.dataTransfer.effectAllowed="move")};let S=null,c=L(null);L(null);const B=(f,p)=>{console.log(c),S=f,c.value=p,t("dialogSelected",p),y(f.nodes),C(f.edges)},J=()=>{var f;if(S!=null){let p=prompt("Please enter the new NPC name","");(f=S.actors)==null||f.push(p)}},U=()=>{n.scenario!=null&&n.scenario.quests.push("")};return(f,p)=>{const u=ye("container");return r(),d(w,null,[o("div",Fe,[x(u,null,{default:se(()=>[e.scenario!=null?(r(),d("aside",Le,[Ve,qe,(r(!0),d(w,null,V(e.scenario.conversations,(_,m)=>(r(),d("div",{key:m,class:me(["vue-flow__node-default",{active:m===v(c)}]),onClick:D=>B(_,m)}," Dialog "+K(m),11,Oe))),128))])):A("",!0),e.scenario!=null?(r(),d("aside",Re,[je,Be,(r(!0),d(w,null,V(e.scenario.quests,(_,m)=>(r(),d("div",{key:m},[ee(o("textarea",{name:"quest","onUpdate:modelValue":D=>e.scenario.quests[m]=D,rows:""},null,8,Je),[[te,e.scenario.quests[m]]])]))),128)),o("button",{onClick:U},"Add Quest")])):A("",!0),e.scenario!=null?(r(),d("aside",Ue,[Ke,Ye,ee(o("textarea",{name:"briefing",id:"briefing","onUpdate:modelValue":p[0]||(p[0]=_=>e.scenario.briefing=_),rows:"10"},null,512),[[te,e.scenario.briefing]])])):A("",!0)]),_:1})]),o("div",ze,[v(c)!=null?(r(),d("aside",Me,[Qe,We,Xe,o("div",{class:"vue-flow__node-default player1",draggable:!0,onDragstart:p[1]||(p[1]=_=>g(_,"playerNode","player1"))}," Player1 Node ",32),o("div",{class:"vue-flow__node-default player2",draggable:!0,onDragstart:p[2]||(p[2]=_=>g(_,"playerNode","player2"))}," Player2 Node ",32),o("div",{class:"vue-flow__node-default playerAll",draggable:!0,onDragstart:p[3]||(p[3]=_=>g(_,"playerNode","playerAll"))}," All Players Node ",32),Ge,Ze,(r(!0),d(w,null,V(e.scenario.conversations[v(c)].actors,(_,m)=>(r(),d("div",{key:m,class:"vue-flow__node-default npc",draggable:!0,onDragstart:D=>g(D,"npcNode","npc",_)},K(_),41,et))),128)),o("button",{onClick:J},"Add NPC")])):A("",!0)])],64)}}});var nt=j(tt,[["__scopeId","data-v-4ab11146"]]);const Q=e=>(z("data-v-7d869e2c"),e=e(),M(),e),ot=oe(" NPC - "),st=Q(()=>o("hr",null,null,-1)),at=Q(()=>o("div",null," Responses: ",-1)),lt={id:"texts-npcs"},it=["value","onInput"],rt=["onClick"],dt=Q(()=>o("br",null,null,-1)),ct={inheritAttrs:!1,mounted(){document.querySelectorAll("textarea").forEach(e=>{e.style.height="",e.style.height=e.scrollHeight+"px"})}},ut=F(E(H({},ct),{props:{id:null,data:null},setup(e){const t=e,n={background:"#555",position:"absolute",top:"20px"};E(H({},n),{position:"relative",left:"15px",top:"0px",transform:"0"});const l=()=>{t.data.texts.push("")},s=(y,C)=>{t.data.texts[C]=y.target.value},i=y=>{t.data.texts.splice(y,1)};return(y,C)=>(r(),d(w,null,[x(v(O),{type:"target",id:"gi1",position:v(q).Left,style:n,"on-connect":t.data.onConnect},null,8,["position","on-connect"]),x(v(O),{type:"source",id:"go1",position:v(q).Right,style:n,"on-connect":t.data.onConnect},null,8,["position","on-connect"]),o("div",null,[ot,o("strong",null,K(e.data.name),1)]),st,at,o("ul",lt,[(r(!0),d(w,null,V(e.data.texts,(P,b)=>(r(),d("li",{key:b,style:{position:"relative"}},[o("textarea",{class:"nodrag",value:e.data.texts[b],onInput:g=>s(g,b),oninput:'this.style.height = "";this.style.height = this.scrollHeight + "px"'},null,40,it),o("span",{onClick:g=>i(b)},"x",8,rt)]))),128))]),dt,o("button",{onClick:l},"Add text")],64))}}));var pt=j(ut,[["__scopeId","data-v-7d869e2c"]]);const W=e=>(z("data-v-85324e88"),e=e(),M(),e),_t={key:0},ht={key:1},vt={key:2},gt=W(()=>o("hr",null,null,-1)),ft=W(()=>o("div",null," Responses: ",-1)),yt={id:"texts-npcs"},mt=["value","onInput"],xt=["onClick"],Nt=W(()=>o("br",null,null,-1)),Ct={inheritAttrs:!1,mounted(){document.querySelectorAll("textarea").forEach(e=>{e.style.height="",e.style.height=e.scrollHeight+"px"})}},$t=F(E(H({},Ct),{props:{id:null,data:null},setup(e){const t=e,n={background:"#555",position:"absolute",top:"20px"},l=E(H({},n),{position:"relative",left:"15px",top:"0px",transform:"0"}),s=()=>{t.data.texts.push("")},i=(C,P)=>{t.data.texts[P]=C.target.value},y=C=>{t.data.texts.splice(C,1)};return(C,P)=>(r(),d(w,null,[x(v(O),{type:"target",id:"gi1",position:v(q).Left,style:n,"on-connect":t.data.onConnect},null,8,["position","on-connect"]),x(v(O),{type:"source",id:"go1",position:v(q).Right,style:n,"on-connect":t.data.onConnect},null,8,["position","on-connect"]),o("div",null,[t.data.playerType=="player1"?(r(),d("strong",_t,"Player 1")):A("",!0),t.data.playerType=="player2"?(r(),d("strong",ht,"Player 2")):A("",!0),t.data.playerType=="playerAll"?(r(),d("strong",vt,"All Players")):A("",!0)]),gt,ft,o("ul",yt,[(r(!0),d(w,null,V(e.data.texts,(b,g)=>(r(),d("li",{key:g,style:{position:"relative"}},[o("textarea",{class:"nodrag",value:e.data.texts[g],onInput:S=>i(S,g),oninput:'this.style.height = "";this.style.height = this.scrollHeight + "px"'},null,40,mt),x(v(O),{id:"p"+g,type:"source",position:v(q).Right,style:l},null,8,["id","position"]),o("span",{onClick:S=>y(g)},"x",8,xt)]))),128))]),Nt,o("button",{onClick:s},"Add response")],64))}}));var bt=j($t,[["__scopeId","data-v-85324e88"]]);const St=F({setup(e){const t=[];let n=0;const l=()=>`node_${n++}`,{instance:s,onConnect:i,nodes:y,edges:C,addEdges:P,addNodes:b,onEdgesChange:g,onNodesChange:S}=Y();let c=L(null);const B=()=>u.value!=null&&c.value!=null?u.value.conversations[c.value].nodes.length+1:null;S(a=>{a.forEach(h=>{var $,T;if(u.value!=null&&c.value!=null){if(h.type==="position"){let k=u.value.conversations[c.value].nodes.findIndex(function(I){return I.id==h.id});k>=0&&(u.value.conversations[c.value].nodes[k].position.x=($=h.position)==null?void 0:$.x,u.value.conversations[c.value].nodes[k].position.y=(T=h.position)==null?void 0:T.y)}else if(h.type==="remove"){let k=u.value.conversations[c.value].nodes.findIndex(function(I){return I.id==h.id});u.value.conversations[c.value].nodes.splice(k,1)}}})}),g(a=>{a.forEach(h=>{if(h.type==="remove"&&u.value!=null&&c.value!=null){let $=u.value.conversations[c.value].edges.findIndex(function(T){return T.id==h.id});u.value.conversations[c.value].edges.splice($,1)}})}),i(a=>{if(P([a]),u.value!=null&&c.value!=null){let h="edge-"+a.source+a.sourceHandle+"-"+a.target+a.targetHandle;u.value.conversations[c.value].edges.push(new De(h,a.source,a.target,a.sourceHandle,a.targetHandle))}});const J=a=>{a.preventDefault(),a.dataTransfer&&(a.dataTransfer.dropEffect="move")},U=a=>{},f=a=>{var h,$,T,k;if(s.value){const I=(h=a.dataTransfer)==null?void 0:h.getData("application/vueflow"),R=($=a.dataTransfer)==null?void 0:$.getData("application/nodeClass"),X=(T=a.dataTransfer)==null?void 0:T.getData("application/npcName"),le=s.value.project({x:a.clientX,y:a.clientY-40}),ie={id:l(),type:I,class:R,data:{onChange:U,onConnect:i,name:X,texts:[],playerType:R},connectable:!0,position:le,label:`${I} node`};b([ie]);let re="node"+B(),de=new we(re,new ke(a.clientX,a.clientY-40),I,R,new Se(X,R,[]));(k=u.value)==null||k.conversations[c.value].nodes.push(de)}},p={npcNode:ne(pt),playerNode:ne(bt)},u=L(null),_=a=>{u.value=a,c.value=null},m=a=>{c.value=a},D=L(t);return(a,h)=>(r(),d("div",{class:"dndflow",onDrop:f},[x(v(xe),{modelValue:D.value,"onUpdate:modelValue":h[0]||(h[0]=$=>D.value=$),onDragover:J,"node-types":p},{default:se(()=>[x(v(Ne),{variant:v(Ce).Lines,"pattern-color":"#4d4d4d",gap:"25"},null,8,["variant"]),x(Ee,{scenario:u.value,onJsonFileLoaded:_},null,8,["scenario"]),x(nt,{scenario:u.value,onDialogSelected:m},null,8,["scenario"])]),_:1},8,["modelValue"])],32))}});const kt={style:{height:"100vh"}},wt=F({setup(e){return(t,n)=>(r(),d("div",kt,[x(St)]))}});$e(wt).mount("#app");