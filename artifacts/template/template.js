var s0=Object.defineProperty;var j8=(A,f)=>{for(var N in f)s0(A,N,{get:f[N],enumerable:!0,configurable:!0,set:(G)=>f[N]=()=>G})};var s8=function(A,f,N,G){var B=arguments.length,S=B<3?f:G===null?G=Object.getOwnPropertyDescriptor(f,N):G,O;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")S=Reflect.decorate(A,f,N,G);else for(var Q=A.length-1;Q>=0;Q--)if(O=A[Q])S=(B<3?O(S):B>3?O(f,N,S):O(f,N))||S;return B>3&&S&&Object.defineProperty(f,N,S),S};var $8=globalThis,x8=$8.ShadowRoot&&($8.ShadyCSS===void 0||$8.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V8=Symbol(),a8=new WeakMap;class P8{constructor(A,f,N){if(this._$cssResult$=!0,N!==V8)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=A,this.t=f}get styleSheet(){let A=this.o;const f=this.t;if(x8&&A===void 0){const N=f!==void 0&&f.length===1;N&&(A=a8.get(f)),A===void 0&&((this.o=A=new CSSStyleSheet).replaceSync(this.cssText),N&&a8.set(f,A))}return A}toString(){return this.cssText}}var i8=(A)=>new P8(typeof A=="string"?A:A+"",void 0,V8),D8=(A,...f)=>{const N=A.length===1?A[0]:f.reduce((G,B,S)=>G+((O)=>{if(O._$cssResult$===!0)return O.cssText;if(typeof O=="number")return O;throw Error("Value passed to 'css' function must be a 'css' function result: "+O+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(B)+A[S+1],A[0]);return new P8(N,A,V8)},y8=(A,f)=>{if(x8)A.adoptedStyleSheets=f.map((N)=>N instanceof CSSStyleSheet?N:N.styleSheet);else for(let N of f){const G=document.createElement("style"),B=$8.litNonce;B!==void 0&&G.setAttribute("nonce",B),G.textContent=N.cssText,A.appendChild(G)}},_8=x8?(A)=>A:(A)=>A instanceof CSSStyleSheet?((f)=>{let N="";for(let G of f.cssRules)N+=G.cssText;return i8(N)})(A):A;var{is:a0,defineProperty:i0,getOwnPropertyDescriptor:o0,getOwnPropertyNames:n0,getOwnPropertySymbols:e0,getPrototypeOf:t0}=Object,F8=globalThis,o8=F8.trustedTypes,A1=o8?o8.emptyScript:"",f1=F8.reactiveElementPolyfillSupport,A8=(A,f)=>A,q8={toAttribute(A,f){switch(f){case Boolean:A=A?A1:null;break;case Object:case Array:A=A==null?A:JSON.stringify(A)}return A},fromAttribute(A,f){let N=A;switch(f){case Boolean:N=A!==null;break;case Number:N=A===null?null:Number(A);break;case Object:case Array:try{N=JSON.parse(A)}catch(G){N=null}}return N}},k8=(A,f)=>!a0(A,f),n8={attribute:!0,type:String,converter:q8,reflect:!1,hasChanged:k8};Symbol.metadata??=Symbol("metadata"),F8.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(A){this._$Ei(),(this.l??=[]).push(A)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(A,f=n8){if(f.state&&(f.attribute=!1),this._$Ei(),this.elementProperties.set(A,f),!f.noAccessor){const N=Symbol(),G=this.getPropertyDescriptor(A,N,f);G!==void 0&&i0(this.prototype,A,G)}}static getPropertyDescriptor(A,f,N){const{get:G,set:B}=o0(this.prototype,A)??{get(){return this[f]},set(S){this[f]=S}};return{get(){return G?.call(this)},set(S){const O=G?.call(this);B.call(this,S),this.requestUpdate(A,O,N)},configurable:!0,enumerable:!0}}static getPropertyOptions(A){return this.elementProperties.get(A)??n8}static _$Ei(){if(this.hasOwnProperty(A8("elementProperties")))return;const A=t0(this);A.finalize(),A.l!==void 0&&(this.l=[...A.l]),this.elementProperties=new Map(A.elementProperties)}static finalize(){if(this.hasOwnProperty(A8("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(A8("properties"))){const f=this.properties,N=[...n0(f),...e0(f)];for(let G of N)this.createProperty(G,f[G])}const A=this[Symbol.metadata];if(A!==null){const f=litPropertyMetadata.get(A);if(f!==void 0)for(let[N,G]of f)this.elementProperties.set(N,G)}this._$Eh=new Map;for(let[f,N]of this.elementProperties){const G=this._$Eu(f,N);G!==void 0&&this._$Eh.set(G,f)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(A){const f=[];if(Array.isArray(A)){const N=new Set(A.flat(1/0).reverse());for(let G of N)f.unshift(_8(G))}else A!==void 0&&f.push(_8(A));return f}static _$Eu(A,f){const N=f.attribute;return N===!1?void 0:typeof N=="string"?N:typeof A=="string"?A.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((A)=>this.enableUpdating=A),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((A)=>A(this))}addController(A){(this._$EO??=new Set).add(A),this.renderRoot!==void 0&&this.isConnected&&A.hostConnected?.()}removeController(A){this._$EO?.delete(A)}_$E_(){const A=new Map,f=this.constructor.elementProperties;for(let N of f.keys())this.hasOwnProperty(N)&&(A.set(N,this[N]),delete this[N]);A.size>0&&(this._$Ep=A)}createRenderRoot(){const A=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return y8(A,this.constructor.elementStyles),A}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((A)=>A.hostConnected?.())}enableUpdating(A){}disconnectedCallback(){this._$EO?.forEach((A)=>A.hostDisconnected?.())}attributeChangedCallback(A,f,N){this._$AK(A,N)}_$EC(A,f){const N=this.constructor.elementProperties.get(A),G=this.constructor._$Eu(A,N);if(G!==void 0&&N.reflect===!0){const B=(N.converter?.toAttribute!==void 0?N.converter:q8).toAttribute(f,N.type);this._$Em=A,B==null?this.removeAttribute(G):this.setAttribute(G,B),this._$Em=null}}_$AK(A,f){const N=this.constructor,G=N._$Eh.get(A);if(G!==void 0&&this._$Em!==G){const B=N.getPropertyOptions(G),S=typeof B.converter=="function"?{fromAttribute:B.converter}:B.converter?.fromAttribute!==void 0?B.converter:q8;this._$Em=G,this[G]=S.fromAttribute(f,B.type),this._$Em=null}}requestUpdate(A,f,N){if(A!==void 0){if(N??=this.constructor.getPropertyOptions(A),!(N.hasChanged??k8)(this[A],f))return;this.P(A,f,N)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(A,f,N){this._$AL.has(A)||this._$AL.set(A,f),N.reflect===!0&&this._$Em!==A&&(this._$Ej??=new Set).add(A)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(f){Promise.reject(f)}const A=this.scheduleUpdate();return A!=null&&await A,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[G,B]of this._$Ep)this[G]=B;this._$Ep=void 0}const N=this.constructor.elementProperties;if(N.size>0)for(let[G,B]of N)B.wrapped!==!0||this._$AL.has(G)||this[G]===void 0||this.P(G,this[G],B)}let A=!1;const f=this._$AL;try{A=this.shouldUpdate(f),A?(this.willUpdate(f),this._$EO?.forEach((N)=>N.hostUpdate?.()),this.update(f)):this._$EU()}catch(N){throw A=!1,this._$EU(),N}A&&this._$AE(f)}willUpdate(A){}_$AE(A){this._$EO?.forEach((f)=>f.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(A)),this.updated(A)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(A){return!0}update(A){this._$Ej&&=this._$Ej.forEach((f)=>this._$EC(f,this[f])),this._$EU()}updated(A){}firstUpdated(A){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[A8("elementProperties")]=new Map,C[A8("finalized")]=new Map,f1?.({ReactiveElement:C}),(F8.reactiveElementVersions??=[]).push("2.0.4");function S0(A,f){if(!g8(A)||!A.hasOwnProperty("raw"))throw Error("invalid template strings array");return e8!==void 0?e8.createHTML(f):f}function a(A,f,N=A,G){if(f===r)return f;let B=G!==void 0?N._$Co?.[G]:N._$Cl;const S=G8(f)?void 0:f._$litDirective$;return B?.constructor!==S&&(B?._$AO?.(!1),S===void 0?B=void 0:(B=new S(A),B._$AT(A,N,G)),G!==void 0?(N._$Co??=[])[G]=B:N._$Cl=B),B!==void 0&&(f=a(A,B._$AS(A,f.values),B,G)),f}var C8=globalThis,H8=C8.trustedTypes,e8=H8?H8.createPolicy("lit-html",{createHTML:(A)=>A}):void 0;var g=`lit\$${Math.random().toFixed(9).slice(2)}\$`,B0="?"+g,N1=`<${B0}>`,c=document,N8=()=>c.createComment(""),G8=(A)=>A===null||typeof A!="object"&&typeof A!="function",g8=Array.isArray,G1=(A)=>g8(A)||typeof A?.[Symbol.iterator]=="function";var f8=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,t8=/-->/g,A0=/>/g,m=RegExp(`>|[ \t\n\f\r](?:([^\\s"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|\$)`,"g"),f0=/'/g,N0=/"/g,Y0=/^(?:script|style|textarea|title)$/i,u8=(A)=>(f,...N)=>({_$litType$:A,strings:f,values:N}),O0=u8(1),K1=u8(2),M1=u8(3),r=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),G0=new WeakMap,l=c.createTreeWalker(c,129),B1=(A,f)=>{const N=A.length-1,G=[];let B,S=f===2?"<svg>":f===3?"<math>":"",O=f8;for(let Q=0;Q<N;Q++){const J=A[Q];let E,Y,W=-1,X=0;for(;X<J.length&&(O.lastIndex=X,Y=O.exec(J),Y!==null);)X=O.lastIndex,O===f8?Y[1]==="!--"?O=t8:Y[1]!==void 0?O=A0:Y[2]!==void 0?(Y0.test(Y[2])&&(B=RegExp("</"+Y[2],"g")),O=m):Y[3]!==void 0&&(O=m):O===m?Y[0]===">"?(O=B??f8,W=-1):Y[1]===void 0?W=-2:(W=O.lastIndex-Y[2].length,E=Y[1],O=Y[3]===void 0?m:Y[3]==='"'?N0:f0):O===N0||O===f0?O=m:O===t8||O===A0?O=f8:(O=m,B=void 0);const Z=O===m&&A[Q+1].startsWith("/>")?" ":"";S+=O===f8?J+N1:W>=0?(G.push(E),J.slice(0,W)+"$lit$"+J.slice(W)+g+Z):J+g+(W===-2?Q:Z)}return[S0(A,S+(A[N]||"<?>")+(f===2?"</svg>":f===3?"</math>":"")),G]};class B8{constructor({strings:A,_$litType$:f},N){let G;this.parts=[];let B=0,S=0;const O=A.length-1,Q=this.parts,[J,E]=B1(A,f);if(this.el=B8.createElement(J,N),l.currentNode=this.el.content,f===2||f===3){const Y=this.el.content.firstChild;Y.replaceWith(...Y.childNodes)}for(;(G=l.nextNode())!==null&&Q.length<O;){if(G.nodeType===1){if(G.hasAttributes())for(let Y of G.getAttributeNames())if(Y.endsWith("$lit$")){const W=E[S++],X=G.getAttribute(Y).split(g),Z=/([.?@])?(.*)/.exec(W);Q.push({type:1,index:B,name:Z[2],strings:X,ctor:Z[1]==="."?W0:Z[1]==="?"?J0:Z[1]==="@"?X0:O8}),G.removeAttribute(Y)}else Y.startsWith(g)&&(Q.push({type:6,index:B}),G.removeAttribute(Y));if(Y0.test(G.tagName)){const Y=G.textContent.split(g),W=Y.length-1;if(W>0){G.textContent=H8?H8.emptyScript:"";for(let X=0;X<W;X++)G.append(Y[X],N8()),l.nextNode(),Q.push({type:2,index:++B});G.append(Y[W],N8())}}}else if(G.nodeType===8)if(G.data===B0)Q.push({type:2,index:B});else{let Y=-1;for(;(Y=G.data.indexOf(g,Y+1))!==-1;)Q.push({type:7,index:B}),Y+=g.length-1}B++}}static createElement(A,f){const N=c.createElement("template");return N.innerHTML=A,N}}class Q0{constructor(A,f){this._$AV=[],this._$AN=void 0,this._$AD=A,this._$AM=f}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(A){const{el:{content:f},parts:N}=this._$AD,G=(A?.creationScope??c).importNode(f,!0);l.currentNode=G;let B=l.nextNode(),S=0,O=0,Q=N[0];for(;Q!==void 0;){if(S===Q.index){let J;Q.type===2?J=new Y8(B,B.nextSibling,this,A):Q.type===1?J=new Q.ctor(B,Q.name,Q.strings,this,A):Q.type===6&&(J=new Z0(B,this,A)),this._$AV.push(J),Q=N[++O]}S!==Q?.index&&(B=l.nextNode(),S++)}return l.currentNode=c,G}p(A){let f=0;for(let N of this._$AV)N!==void 0&&(N.strings!==void 0?(N._$AI(A,N,f),f+=N.strings.length-2):N._$AI(A[f])),f++}}class Y8{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(A,f,N,G){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=A,this._$AB=f,this._$AM=N,this.options=G,this._$Cv=G?.isConnected??!0}get parentNode(){let A=this._$AA.parentNode;const f=this._$AM;return f!==void 0&&A?.nodeType===11&&(A=f.parentNode),A}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(A,f=this){A=a(this,A,f),G8(A)?A===L||A==null||A===""?(this._$AH!==L&&this._$AR(),this._$AH=L):A!==this._$AH&&A!==r&&this._(A):A._$litType$!==void 0?this.$(A):A.nodeType!==void 0?this.T(A):G1(A)?this.k(A):this._(A)}O(A){return this._$AA.parentNode.insertBefore(A,this._$AB)}T(A){this._$AH!==A&&(this._$AR(),this._$AH=this.O(A))}_(A){this._$AH!==L&&G8(this._$AH)?this._$AA.nextSibling.data=A:this.T(c.createTextNode(A)),this._$AH=A}$(A){const{values:f,_$litType$:N}=A,G=typeof N=="number"?this._$AC(A):(N.el===void 0&&(N.el=B8.createElement(S0(N.h,N.h[0]),this.options)),N);if(this._$AH?._$AD===G)this._$AH.p(f);else{const B=new Q0(G,this),S=B.u(this.options);B.p(f),this.T(S),this._$AH=B}}_$AC(A){let f=G0.get(A.strings);return f===void 0&&G0.set(A.strings,f=new B8(A)),f}k(A){g8(this._$AH)||(this._$AH=[],this._$AR());const f=this._$AH;let N,G=0;for(let B of A)G===f.length?f.push(N=new Y8(this.O(N8()),this.O(N8()),this,this.options)):N=f[G],N._$AI(B),G++;G<f.length&&(this._$AR(N&&N._$AB.nextSibling,G),f.length=G)}_$AR(A=this._$AA.nextSibling,f){for(this._$AP?.(!1,!0,f);A&&A!==this._$AB;){const N=A.nextSibling;A.remove(),A=N}}setConnected(A){this._$AM===void 0&&(this._$Cv=A,this._$AP?.(A))}}class O8{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(A,f,N,G,B){this.type=1,this._$AH=L,this._$AN=void 0,this.element=A,this.name=f,this._$AM=G,this.options=B,N.length>2||N[0]!==""||N[1]!==""?(this._$AH=Array(N.length-1).fill(new String),this.strings=N):this._$AH=L}_$AI(A,f=this,N,G){const B=this.strings;let S=!1;if(B===void 0)A=a(this,A,f,0),S=!G8(A)||A!==this._$AH&&A!==r,S&&(this._$AH=A);else{const O=A;let Q,J;for(A=B[0],Q=0;Q<B.length-1;Q++)J=a(this,O[N+Q],f,Q),J===r&&(J=this._$AH[Q]),S||=!G8(J)||J!==this._$AH[Q],J===L?A=L:A!==L&&(A+=(J??"")+B[Q+1]),this._$AH[Q]=J}S&&!G&&this.j(A)}j(A){A===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,A??"")}}class W0 extends O8{constructor(){super(...arguments),this.type=3}j(A){this.element[this.name]=A===L?void 0:A}}class J0 extends O8{constructor(){super(...arguments),this.type=4}j(A){this.element.toggleAttribute(this.name,!!A&&A!==L)}}class X0 extends O8{constructor(A,f,N,G,B){super(A,f,N,G,B),this.type=5}_$AI(A,f=this){if((A=a(this,A,f,0)??L)===r)return;const N=this._$AH,G=A===L&&N!==L||A.capture!==N.capture||A.once!==N.once||A.passive!==N.passive,B=A!==L&&(N===L||G);G&&this.element.removeEventListener(this.name,this,N),B&&this.element.addEventListener(this.name,this,A),this._$AH=A}handleEvent(A){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,A):this._$AH.handleEvent(A)}}class Z0{constructor(A,f,N){this.element=A,this.type=6,this._$AN=void 0,this._$AM=f,this.options=N}get _$AU(){return this._$AM._$AU}_$AI(A){a(this,A)}}var Y1=C8.litHtmlPolyfillSupport;Y1?.(B8,Y8),(C8.litHtmlVersions??=[]).push("3.2.1");var $0=(A,f,N)=>{const G=N?.renderBefore??f;let B=G._$litPart$;if(B===void 0){const S=N?.renderBefore??null;G._$litPart$=B=new Y8(f.insertBefore(N8(),S),S,void 0,N??{})}return B._$AI(A),B};class p extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const A=super.createRenderRoot();return this.renderOptions.renderBefore??=A.firstChild,A}update(A){const f=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(A),this._$Do=$0(f,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return r}}p._$litElement$=!0,p.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:p});var O1=globalThis.litElementPolyfillSupport;O1?.({LitElement:p});(globalThis.litElementVersions??=[]).push("4.1.1");var x0=(A)=>(f,N)=>{N!==void 0?N.addInitializer(()=>{customElements.define(A,f)}):customElements.define(A,f)};class I8{constructor(){this.listenersPerType={}}addEventListener(A,f){if(A&&f){const N=this.listenersPerType[A];if(N)N.push(f);else this.listenersPerType[A]=[f]}}removeEventListener(A,f){if(A&&f){const N=this.listenersPerType[A];if(N){const G=N.indexOf(f);if(G>=0)N.splice(G,1)}}}addSingleUseListener(A,f){const N=(G)=>{this.removeEventListener(A,N),f?.(G)};this.addEventListener(A,N)}dispatchEvent(A,f){const N=this.listenersPerType[A];if(N)for(let G of N)G?.(f)}getNumListenersForType(A){const f=this.listenersPerType[A];return f?f.length:0}}var L8={};j8(L8,{printHexMIDIData:()=>d0,isStop:()=>g0,isStart:()=>k0,isSongPositionPointer:()=>I0,isQuarterFrame:()=>D0,isProgramChange:()=>H0,isPitchWheel:()=>z0,isNoteOn:()=>z8,isNoteOff:()=>R8,isNatural:()=>J8,isMetaEvent:()=>u0,isControllerNumber:()=>h8,isController:()=>w8,isContinue:()=>C0,isClock:()=>y0,isChannelPressure:()=>U0,isAllSoundOff:()=>V0,isAllNotesOff:()=>j0,isAftertouch:()=>E0,isActiveSense:()=>S1,isAccidental:()=>J1,getVelocity:()=>S8,getSongPositionPointerValue:()=>w0,getProgramChangeNumber:()=>T0,getPitchWheelValue:()=>R0,getOctaveNumber:()=>h0,getNoteNumber:()=>W8,getNoteNameWithSharps:()=>Q1,getNoteNameWithOctaveNumber:()=>E8,getNoteNameWithFlats:()=>W1,getNoteName:()=>v0,getMessageSize:()=>F0,getMIDIDescription:()=>X1,getControllerValue:()=>b0,getControllerNumber:()=>M0,getControllerName:()=>m0,getChromaticScaleIndex:()=>w,getChannelPressureValue:()=>K0,getChannel1to16:()=>q0,getChannel0to15:()=>_0,getByte2:()=>Q8,getByte1:()=>I,getByte0:()=>y,getAfterTouchValue:()=>L0});function y(A){return A>>16&255}function I(A){return A>>8&255}function Q8(A){return A&255}function u(A,f){return(A>>16&240)==f}function P0(A){return I(A)|Q8(A)<<7}function _0(A){return y(A)&15}function q0(A){return _0(A)+1}function F0(A){const G=y(A),B=G>>4&7;return(B!=7?15103>>2*B:1431655865>>2*(G&15))&3}function z8(A){return u(A,144)&&S8(A)!=0}function R8(A){return u(A,128)||u(A,144)&&S8(A)==0}function W8(A){return I(A)}function S8(A){return Q8(A)}function H0(A){return u(A,192)}function T0(A){return I(A)}function z0(A){return u(A,224)}function R0(A){return P0(A)}function E0(A){return u(A,160)}function L0(A){return Q8(A)}function U0(A){return u(A,208)}function K0(A){return I(A)}function w8(A){return u(A,176)}function M0(A){return I(A)}function b0(A){return Q8(A)}function h8(A,f){return I(A)==f&&w8(A)}function j0(A){return h8(A,123)}function V0(A){return h8(A,120)}function D0(A){return y(A)==241}function y0(A){return y(A)==248}function k0(A){return y(A)==250}function C0(A){return y(A)==251}function g0(A){return y(A)==252}function S1(A){return y(A)==254}function u0(A){return y(A)==255}function I0(A){return y(A)==242}function w0(A){return P0(A)}function w(A){return A%12&15}function h0(A,f){return(Math.floor(A/12)+(f?f:3)&255)-5}function v0(A){return["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"][w(A)]}function Q1(A){return["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"][w(A)]}function W1(A){return["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"][w(A)]}function E8(A){return v0(A)+h0(A)}function J8(A){return[!0,!1,!0,!1,!0,!0,!1,!0,!1,!0,!1,!0][w(A)]}function J1(A){return!J8(A)}function d0(A){const f=F0(A);if(f==0)return"[empty]";let N="";for(let G=0;G<f;++G){if(G!=0)N+=" ";const B=A>>16-8*G&255;N+="0123456789abcdef"[B>>4],N+="0123456789abcdef"[B&15]}return N}function X1(A){const f=" Channel "+q0(A);function N(G){const B=E8(W8(A));return B.length<4?B+" ":B}if(z8(A))return"Note-On:  "+N(A)+f+"  Velocity "+S8(A);if(R8(A))return"Note-Off: "+N(A)+f+"  Velocity "+S8(A);if(E0(A))return"Aftertouch: "+N(A)+f+": "+L0(A);if(z0(A))return"Pitch wheel: "+R0(A)+" "+f;if(U0(A))return"Channel pressure: "+K0(A)+" "+f;if(w8(A))return"Controller:"+f+": "+m0(M0(A))+" = "+b0(A);if(H0(A))return"Program change: "+T0(A)+" "+f;if(j0(A))return"All notes off:"+f;if(V0(A))return"All sound off:"+f;if(D0(A))return"Quarter-frame";if(y0(A))return"Clock";if(k0(A))return"Start";if(C0(A))return"Continue";if(g0(A))return"Stop";if(u0(A))return"Meta-event: type "+I(A);if(I0(A))return"Song Position: "+w0(A);return d0(A)}function m0(A){if(A<128){const N=["Bank Select","Modulation Wheel (coarse)","Breath controller (coarse)",void 0,"Foot Pedal (coarse)","Portamento Time (coarse)","Data Entry (coarse)","Volume (coarse)","Balance (coarse)",void 0,"Pan position (coarse)","Expression (coarse)","Effect Control 1 (coarse)","Effect Control 2 (coarse)",void 0,void 0,"General Purpose Slider 1","General Purpose Slider 2","General Purpose Slider 3","General Purpose Slider 4",void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,"Bank Select (fine)","Modulation Wheel (fine)","Breath controller (fine)",void 0,"Foot Pedal (fine)","Portamento Time (fine)","Data Entry (fine)","Volume (fine)","Balance (fine)",void 0,"Pan position (fine)","Expression (fine)","Effect Control 1 (fine)","Effect Control 2 (fine)",void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,"Hold Pedal","Portamento","Sustenuto Pedal","Soft Pedal","Legato Pedal","Hold 2 Pedal","Sound Variation","Sound Timbre","Sound Release Time","Sound Attack Time","Sound Brightness","Sound Control 6","Sound Control 7","Sound Control 8","Sound Control 9","Sound Control 10","General Purpose Button 1","General Purpose Button 2","General Purpose Button 3","General Purpose Button 4",void 0,void 0,void 0,void 0,void 0,void 0,void 0,"Reverb Level","Tremolo Level","Chorus Level","Celeste Level","Phaser Level","Data Button increment","Data Button decrement","Non-registered Parameter (fine)","Non-registered Parameter (coarse)","Registered Parameter (fine)","Registered Parameter (coarse)",void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,"All Sound Off","All Controllers Off","Local Keyboard","All Notes Off","Omni Mode Off","Omni Mode On","Mono Operation","Poly Operation"][A];if(N)return N}return A.toString()}class i extends HTMLElement{constructor({naturalNoteWidth:A,accidentalWidth:f,accidentalPercentageHeight:N,naturalNoteBorder:G,accidentalNoteBorder:B,pressedNoteColour:S}={}){super();this.naturalWidth=A||20,this.accidentalWidth=f||12,this.accidentalPercentageHeight=N||66,this.naturalBorder=G||"2px solid #333",this.accidentalBorder=B||"2px solid #333",this.pressedColour=S||"#8ad",this.root=this.attachShadow({mode:"open"}),this.root.addEventListener("mousedown",(O)=>this.handleMouse(O,!0,!1)),this.root.addEventListener("mouseup",(O)=>this.handleMouse(O,!1,!0)),this.root.addEventListener("mousemove",(O)=>this.handleMouse(O,!1,!1)),this.root.addEventListener("mouseenter",(O)=>this.handleMouse(O,!1,!1)),this.root.addEventListener("mouseout",(O)=>this.handleMouse(O,!1,!1)),this.addEventListener("keydown",(O)=>this.handleKey(O,!0)),this.addEventListener("keyup",(O)=>this.handleKey(O,!1)),this.addEventListener("focusout",(O)=>this.allNotesOff()),this.currentDraggedNote=-1,this.currentExternalNotesOn=new Set,this.currentKeyboardNotes=new Set,this.currentPlayedNotes=new Set,this.currentDisplayedNotes=new Set,this.notes=[],this.modifierKeys=0,this.currentTouches=new Map,this.refreshHTML();for(let O of this.root.children)O.addEventListener("touchstart",(Q)=>this.touchStart(Q),{passive:!1}),O.addEventListener("touchend",(Q)=>this.touchEnd(Q))}static get observedAttributes(){return["root-note","note-count","key-map"]}get config(){return{rootNote:parseInt(this.getAttribute("root-note")||"36"),numNotes:parseInt(this.getAttribute("note-count")||"61"),keymap:this.getAttribute("key-map")||"KeyA KeyW KeyS KeyE KeyD KeyF KeyT KeyG KeyY KeyH KeyU KeyJ KeyK KeyO KeyL KeyP Semicolon"}}attachToPatchConnection(A,f){const G={noteDown:(B)=>A.sendMIDIInputEvent(f,9437184|B.detail.note<<8|100),noteUp:(B)=>A.sendMIDIInputEvent(f,8388608|B.detail.note<<8|100),midiIn:(B)=>this.handleExternalMIDI(B.message),midiInputEndpointID:f};if(!this.callbacks)this.callbacks=new Map;this.callbacks.set(A,G),this.addEventListener("note-down",G.noteDown),this.addEventListener("note-up",G.noteUp),A.addEndpointListener(f,G.midiIn)}detachPatchConnection(A){const f=this.callbacks.get(A);if(f)this.removeEventListener("note-down",f.noteDown),this.removeEventListener("note-up",f.noteUp),A.removeEndpointListener(f.midiInputEndpointID,f.midiIn);this.callbacks[A]=void 0}getNoteColour(A){return}getNoteLabel(A){return w(A)==0?E8(A):""}handleExternalMIDI(A){if(z8(A)){const f=W8(A);this.currentExternalNotesOn.add(f),this.refreshActiveNoteElements()}else if(R8(A)){const f=W8(A);this.currentExternalNotesOn.delete(f),this.refreshActiveNoteElements()}}sendNoteOn(A){this.dispatchEvent(new CustomEvent("note-down",{detail:{note:A}}))}sendNoteOff(A){this.dispatchEvent(new CustomEvent("note-up",{detail:{note:A}}))}allNotesOff(){this.setDraggedNote(-1),this.modifierKeys=0;for(let A of this.currentKeyboardNotes.values())this.removeKeyboardNote(A);this.currentExternalNotesOn.clear(),this.refreshActiveNoteElements()}setDraggedNote(A){if(A!=this.currentDraggedNote){if(this.currentDraggedNote>=0)this.sendNoteOff(this.currentDraggedNote);if(this.currentDraggedNote=A,this.currentDraggedNote>=0)this.sendNoteOn(this.currentDraggedNote);this.refreshActiveNoteElements()}}addKeyboardNote(A){if(!this.currentKeyboardNotes.has(A))this.sendNoteOn(A),this.currentKeyboardNotes.add(A),this.refreshActiveNoteElements()}removeKeyboardNote(A){if(this.currentKeyboardNotes.has(A))this.sendNoteOff(A),this.currentKeyboardNotes.delete(A),this.refreshActiveNoteElements()}isNoteActive(A){return A==this.currentDraggedNote||this.currentExternalNotesOn.has(A)||this.currentKeyboardNotes.has(A)}touchEnd(A){for(let f of A.changedTouches){const N=this.currentTouches.get(f.identifier);this.currentTouches.delete(f.identifier),this.removeKeyboardNote(N)}A.preventDefault()}touchStart(A){for(let f of A.changedTouches){const N=f.target.id.substring(4);this.currentTouches.set(f.identifier,N),this.addKeyboardNote(N)}A.preventDefault()}handleMouse(A,f,N){if(f)this.isDragging=!0;if(this.isDragging){let G=-1;if(A.buttons!=0&&A.type!="mouseout"){const B=A.target.id.substring(4);if(B!==void 0)G=parseInt(B)}if(this.setDraggedNote(G),!f)A.preventDefault()}if(N)this.isDragging=!1}handleKey(A,f){if(A.key=="Meta"||A.key=="Alt"||A.key=="Control"||A.key=="Shift"){this.modifierKeys+=f?1:-1;return}if(this.modifierKeys!=0)return;const N=this.config,G=N.keymap.split(" ").indexOf(A.code);if(G>=0){const B=Math.floor((N.rootNote+N.numNotes/4+11)/12)*12+G;if(f)this.addKeyboardNote(B);else this.removeKeyboardNote(B);A.preventDefault()}}refreshHTML(){this.root.innerHTML=`<style>${this.getCSS()}</style>${this.getNoteElements()}`;for(let A=0;A<128;++A){const f=this.shadowRoot.getElementById(`note${A.toString()}`);this.notes.push({note:A,element:f})}this.style.maxWidth=window.getComputedStyle(this).scrollWidth}refreshActiveNoteElements(){for(let A of this.notes)if(A.element)if(this.isNoteActive(A.note))A.element.classList.add("active");else A.element.classList.remove("active")}getAccidentalOffset(A){let f=w(A),N=-this.accidentalWidth/16,G=3*this.accidentalWidth/16;return this.naturalWidth-this.accidentalWidth/2+[0,N,0,G,0,0,N,0,0,0,G,0][f]}getNoteElements(){const A=this.config;let f="",N="",G=0;for(let B=0;B<A.numNotes;++B){const S=A.rootNote+B,O=this.getNoteLabel(S);if(J8(S))f+=`<div class="natural-note note" id="note${S}" style=" left: ${G+1}px"><p>${O}</p></div>`;else{let Q=this.getAccidentalOffset(S);N+=`<div class="accidental-note note" id="note${S}" style="left: ${G+Q}px"></div>`}if(J8(S+1)||B==A.numNotes-1)G+=this.naturalWidth}return this.style.maxWidth=G+1+"px",`<div tabindex="0" class="note-holder" style="width: ${G+1}px;">
                ${f}
                ${N}
                </div>`}getCSS(){let A="";const f=this.config;for(let N=0;N<f.numNotes;++N){const G=f.rootNote+N,B=this.getNoteColour(G);if(B)A+=`#note${G}:not(.active) { background: ${B}; }`}return`
            * {
                box-sizing: border-box;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                margin: 0;
                padding: 0;
            }

            :host {
                display: block;
                overflow: auto;
                position: relative;
            }

            .natural-note {
                position: absolute;
                border: ${this.naturalBorder};
                background: #fff;
                width: ${this.naturalWidth}px;
                height: 100%;

                display: flex;
                align-items: end;
                justify-content: center;
            }

            p {
                pointer-events: none;
                text-align: center;
                font-size: 0.7rem;
                color: grey;
            }

            .accidental-note {
                position: absolute;
                top: 0;
                border: ${this.accidentalBorder};
                background: #333;
                width: ${this.accidentalWidth}px;
                height: ${this.accidentalPercentageHeight}%;
            }

            .note-holder {
                position: relative;
                height: 100%;
            }

            .active {
                background: ${this.pressedColour};
            }

            ${A}
            `}}var m8={};j8(m8,{default:()=>M8});var K8={};j8(K8,{getAllCSS:()=>v8,createLabelledControlForEndpointID:()=>Z1,createLabelledControl:()=>U8,createControl:()=>c0,Switch:()=>n,ParameterControlBase:()=>e,Options:()=>h,LabelledControlHolder:()=>X8,Knob:()=>o});function l0(A,f){return`${A.toFixed(2)} ${f.annotation?.unit??""}`}function v8(){return`
        ${h.getCSS()}
        ${o.getCSS()}
        ${n.getCSS()}
        ${X8.getCSS()}`}function c0(A,f){if(n.canBeUsedFor(f))return new n(A,f);if(h.canBeUsedFor(f))return new h(A,f);if(o.canBeUsedFor(f))return new o(A,f);return}function U8(A,f){const N=c0(A,f);if(N)return new X8(A,f,N);return}function Z1(A,f,N){for(let G of f?.details?.inputs)if(G.endpointID==N)return U8(A,G);return}class e extends HTMLElement{constructor(){super();this.onmousedown=(A)=>A.stopPropagation()}setEndpoint(A,f){if(this.detachListener(),this.patchConnection=A,this.endpointInfo=f,this.defaultValue=f.annotation?.init||f.defaultValue||0,this.isConnected)this.attachListener()}valueChanged(A){}setValue(A){this.patchConnection?.sendEventOrValue(this.endpointInfo.endpointID,A)}beginGesture(){this.patchConnection?.sendParameterGestureStart(this.endpointInfo.endpointID)}endGesture(){this.patchConnection?.sendParameterGestureEnd(this.endpointInfo.endpointID)}setValueAsGesture(A){this.beginGesture(),this.setValue(A),this.endGesture()}resetToDefault(){if(this.defaultValue!==null)this.setValueAsGesture(this.defaultValue)}connectedCallback(){this.attachListener()}disconnectedCallback(){this.detachListener()}detachListener(){if(this.listener)this.patchConnection?.removeParameterListener?.(this.listener.endpointID,this.listener),this.listener=void 0}attachListener(){if(this.patchConnection&&this.endpointInfo)this.detachListener(),this.listener=(A)=>this.valueChanged(A),this.listener.endpointID=this.endpointInfo.endpointID,this.patchConnection.addParameterListener(this.endpointInfo.endpointID,this.listener),this.patchConnection.requestParameterValue(this.endpointInfo.endpointID)}}class o extends e{constructor(A,f){super();this.setEndpoint(A,f)}setEndpoint(A,f){super.setEndpoint(A,f),this.innerHTML="",this.className="knob-container";const N=f?.annotation?.min||0,G=f?.annotation?.max||1,B=f?.annotation?.mid||void 0,S=($)=>window.document.createElementNS("http://www.w3.org/2000/svg",$),O=S("svg");O.setAttribute("viewBox","0 0 100 100");const Q=S("path");Q.setAttribute("d","M20,76 A 40 40 0 1 1 80 76"),Q.classList.add("knob-path"),Q.classList.add("knob-track-background");const J=132,E=N+G===0,Y=E?251.5:184,W=E?0:132;this.getDashOffset=($)=>Y-184/(J*2)*($+W),this.trackValue=S("path"),this.trackValue.setAttribute("d",E?"M50.01,10 A 40 40 0 1 1 50 10":"M20,76 A 40 40 0 1 1 80 76"),this.trackValue.setAttribute("stroke-dasharray",Y),this.trackValue.classList.add("knob-path"),this.trackValue.classList.add("knob-track-value"),this.dial=document.createElement("div"),this.dial.className="knob-dial";const X=document.createElement("div");X.className="knob-dial-tick",this.dial.appendChild(X),O.appendChild(Q),O.appendChild(this.trackValue),this.appendChild(O),this.appendChild(this.dial);const Z=($,R,F,b,V)=>b+($-R)*(V-b)/(F-R),x=($)=>{if(B>N&&B<G){const R=Z($,-J,J,0,1),F=G-N,b=Math.log((B-N)/F)/Math.log(0.5);return N+F*Math.pow(R,b)}else return Z($,-J,J,N,G)};this.toRotation=($)=>{if(B>N&&B<G){const R=G-N,F=Math.log((B-N)/R)/Math.log(0.5),b=Math.pow(($-N)/R,1/F);return Z(b,0,1,-J,J)}else return Z($,N,G,-J,J)},this.rotation=this.toRotation(this.defaultValue),this.setRotation(this.rotation,!0);const q=($)=>{$.preventDefault();const R=(v,d)=>{return((t,z,H)=>Math.min(Math.max(t,z),H))(v-d,-J,J)},b=$.movementY===$.screenY?$.screenY-this.previousScreenY:$.movementY;this.previousScreenY=$.screenY;const V=$.shiftKey?0.25:1.5;this.accumulatedRotation=R(this.accumulatedRotation,b*V),this.setValue(x(this.accumulatedRotation))},P=($)=>{this.previousScreenY=void 0,this.accumulatedRotation=void 0,window.removeEventListener("mousemove",q),window.removeEventListener("mouseup",P),this.endGesture()},_=($)=>{this.previousScreenY=$.screenY,this.accumulatedRotation=this.rotation,this.beginGesture(),window.addEventListener("mousemove",q),window.addEventListener("mouseup",P),$.preventDefault()},K=($)=>{this.previousClientY=$.changedTouches[0].clientY,this.accumulatedRotation=this.rotation,this.touchIdentifier=$.changedTouches[0].identifier,this.beginGesture(),window.addEventListener("touchmove",M),window.addEventListener("touchend",s),$.preventDefault()},M=($)=>{for(let R of $.changedTouches)if(R.identifier==this.touchIdentifier){const F=(v,d)=>{return((t,z,H)=>Math.min(Math.max(t,z),H))(v-d,-J,J)},b=R.clientY-this.previousClientY;this.previousClientY=R.clientY;const V=$.shiftKey?0.25:1.5;this.accumulatedRotation=F(this.accumulatedRotation,b*V),this.setValue(x(this.accumulatedRotation))}},s=($)=>{this.previousClientY=void 0,this.accumulatedRotation=void 0,window.removeEventListener("touchmove",M),window.removeEventListener("touchend",s),this.endGesture()};this.addEventListener("mousedown",_),this.addEventListener("dblclick",()=>this.resetToDefault()),this.addEventListener("touchstart",K)}static canBeUsedFor(A){return A.purpose==="parameter"}valueChanged(A){this.setRotation(this.toRotation(A),!1)}getDisplayValue(A){return l0(A,this.endpointInfo)}setRotation(A,f){if(f||this.rotation!==A)this.rotation=A,this.trackValue.setAttribute("stroke-dashoffset",this.getDashOffset(this.rotation)),this.dial.style.transform=`translate(-50%,-50%) rotate(${A}deg)`}static getCSS(){return`
        .knob-container {
            --knob-track-background-color: var(--background);
            --knob-track-value-color: var(--foreground);

            --knob-dial-border-color: var(--foreground);
            --knob-dial-background-color: var(--background);
            --knob-dial-tick-color: var(--foreground);

            position: relative;
            display: inline-block;
            height: 5rem;
            width: 5rem;
            margin: 0;
            padding: 0;
        }

        .knob-path {
            fill: none;
            stroke-linecap: round;
            stroke-width: 0.15rem;
        }

        .knob-track-background {
            stroke: var(--knob-track-background-color);
        }

        .knob-track-value {
            stroke: var(--knob-track-value-color);
        }

        .knob-dial {
            position: absolute;
            text-align: center;
            height: 60%;
            width: 60%;
            top: 50%;
            left: 50%;
            border: 0.15rem solid var(--knob-dial-border-color);
            border-radius: 100%;
            box-sizing: border-box;
            transform: translate(-50%,-50%);
            background-color: var(--knob-dial-background-color);
        }

        .knob-dial-tick {
            position: absolute;
            display: inline-block;

            height: 1rem;
            width: 0.15rem;
            background-color: var(--knob-dial-tick-color);
        }`}}class n extends e{constructor(A,f){super();this.setEndpoint(A,f)}setEndpoint(A,f){super.setEndpoint(A,f);const N=document.createElement("div");N.classList="switch-outline";const G=document.createElement("div");G.classList="switch-thumb",this.innerHTML="",this.currentValue=this.defaultValue>0.5,this.valueChanged(this.currentValue),this.classList.add("switch-container"),N.appendChild(G),this.appendChild(N),this.addEventListener("click",()=>this.setValueAsGesture(this.currentValue?0:1))}static canBeUsedFor(A){return A.purpose==="parameter"&&A.annotation?.boolean}valueChanged(A){const f=A>0.5;this.currentValue=f,this.classList.remove(!f?"switch-on":"switch-off"),this.classList.add(f?"switch-on":"switch-off")}getDisplayValue(A){return`${A>0.5?"On":"Off"}`}static getCSS(){return`
        .switch-container {
            --switch-outline-color: var(--foreground);
            --switch-thumb-color: var(--foreground);
            --switch-on-background-color: var(--background);
            --switch-off-background-color: var(--background);

            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .switch-outline {
            position: relative;
            display: inline-block;
            height: 1.25rem;
            width: 2.5rem;
            border-radius: 10rem;
            box-shadow: 0 0 0 0.15rem var(--switch-outline-color);
            transition: background-color 0.1s cubic-bezier(0.5, 0, 0.2, 1);
        }

        .switch-thumb {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            height: 1rem;
            width: 1rem;
            background-color: var(--switch-thumb-color);
            border-radius: 100%;
            transition: left 0.1s cubic-bezier(0.5, 0, 0.2, 1);
        }

        .switch-off .switch-thumb {
            left: 25%;
            background: none;
            border: var(--switch-thumb-color) solid 0.1rem;
            height: 0.8rem;
            width: 0.8rem;
        }
        .switch-on .switch-thumb {
            left: 75%;
        }

        .switch-off .switch-outline {
            background-color: var(--switch-on-background-color);
        }
        .switch-on .switch-outline {
            background-color: var(--switch-off-background-color);
        }`}}class h extends e{constructor(A,f){super();this.setEndpoint(A,f)}setEndpoint(A,f){super.setEndpoint(A,f);const N=(Y,W,X)=>Y+W*X,G=(Y)=>Y>0?Y-1:1,{min:B,max:S,options:O}=(()=>{if(h.hasTextOptions(f)){const Y=f.annotation.text.split("|"),W=G(Y.length);let X=0,Z=W,x=1;if(f.annotation.min!=null&&f.annotation.max!=null)X=f.annotation.min,Z=f.annotation.max,x=(Z-X)/W;const q=Y.map((P,_)=>({value:N(X,x,_),text:P}));return{min:X,max:Z,options:q}}if(h.isExplicitlyDiscrete(f)){const Y=f.annotation.step,W=f.annotation?.min||0,X=f.annotation?.max||1,Z=((X-W)/Y|0)+1,x=new Array(Z);for(let q=0;q<Z;++q){const P=N(W,Y,q);x[q]={value:P,text:l0(P,f)}}return{min:W,max:X,options:x}}})();this.options=O;const Q=G(this.options.length),J=(Y)=>(Y-B)/(S-B);this.toIndex=(Y)=>Math.min(Q,J(Y)*this.options.length)|0,this.innerHTML="",this.select=document.createElement("select");for(let Y of this.options){const W=document.createElement("option");W.innerText=Y.text,this.select.appendChild(W)}this.selectedIndex=this.toIndex(this.defaultValue),this.select.addEventListener("change",(Y)=>{const W=Y.target.selectedIndex;Y.target.selectedIndex=this.selectedIndex,this.setValueAsGesture(this.options[W].value)}),this.valueChanged(this.selectedIndex),this.className="select-container",this.appendChild(this.select);const E=document.createElement("span");E.className="select-icon",this.appendChild(E)}static canBeUsedFor(A){return A.purpose==="parameter"&&(this.hasTextOptions(A)||this.isExplicitlyDiscrete(A))}valueChanged(A){const f=this.toIndex(A);this.selectedIndex=f,this.select.selectedIndex=f}getDisplayValue(A){return this.options[this.toIndex(A)].text}static hasTextOptions(A){return A.annotation?.text?.split?.("|").length>1}static isExplicitlyDiscrete(A){return A.annotation?.discrete&&A.annotation?.step>0}static getCSS(){return`
        .select-container {
            position: relative;
            display: block;
            font-size: 0.8rem;
            width: 100%;
            color: var(--foreground);
            border: 0.15rem solid var(--foreground);
            border-radius: 0.6rem;
            margin: 0;
            padding: 0;
        }

        select {
            background: none;
            appearance: none;
            -webkit-appearance: none;
            font-family: inherit;
            font-size: 0.8rem;

            overflow: hidden;
            text-overflow: ellipsis;

            padding: 0 1.5rem 0 0.6rem;

            outline: none;
            color: var(--foreground);
            height: 2rem;
            box-sizing: border-box;
            margin: 0;
            border: none;

            width: 100%;
        }

        select option {
            background: var(--background);
            color: var(--foreground);
        }

        .select-icon {
            position: absolute;
            right: 0.3rem;
            top: 0.5rem;
            pointer-events: none;
            background-color: var(--foreground);
            width: 1.4em;
            height: 1.4em;
            mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z'/%3E%3C/svg%3E");
            mask-repeat: no-repeat;
            -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z'/%3E%3C/svg%3E");
            -webkit-mask-repeat: no-repeat;
        }`}}class X8 extends e{constructor(A,f,N){super();this.childControl=N,this.setEndpoint(A,f)}setEndpoint(A,f){super.setEndpoint(A,f),this.innerHTML="",this.className="labelled-control";const N=document.createElement("div");N.className="labelled-control-centered-control",N.appendChild(this.childControl);const G=document.createElement("div");G.className="labelled-control-label-container";const B=document.createElement("div");B.classList.add("labelled-control-name"),B.innerText=f.annotation?.name||f.name||f.endpointID||"",this.valueText=document.createElement("div"),this.valueText.classList.add("labelled-control-value"),G.appendChild(B),G.appendChild(this.valueText),this.appendChild(N),this.appendChild(G)}valueChanged(A){this.valueText.innerText=this.childControl?.getDisplayValue(A)}static getCSS(){return`
        .labelled-control {
            --labelled-control-font-color: var(--foreground);
            --labelled-control-font-size: 0.8rem;

            position: relative;
            display: inline-block;
            margin: 0 0.4rem 0.4rem;
            vertical-align: top;
            text-align: left;
            padding: 0;
        }

        .labelled-control-centered-control {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            width: 5.5rem;
            height: 5rem;
        }

        .labelled-control-label-container {
            position: relative;
            display: block;
            max-width: 5.5rem;
            margin: -0.4rem auto 0.4rem;
            text-align: center;
            font-size: var(--labelled-control-font-size);
            color: var(--labelled-control-font-color);
            cursor: default;
        }

        .labelled-control-name {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .labelled-control-value {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0;
        }

        .labelled-control:hover .labelled-control-name,
        .labelled-control:active .labelled-control-name {
            opacity: 0;
        }
        .labelled-control:hover .labelled-control-value,
        .labelled-control:active .labelled-control-value {
            opacity: 1;
        }`}}if(!window.customElements.get("cmaj-knob-control"))window.customElements.define("cmaj-knob-control",o);if(!window.customElements.get("cmaj-switch-control"))window.customElements.define("cmaj-switch-control",n);if(!window.customElements.get("cmaj-options-control"))window.customElements.define("cmaj-options-control",h);if(!window.customElements.get("cmaj-labelled-control-holder"))window.customElements.define("cmaj-labelled-control-holder",X8);class d8 extends HTMLElement{constructor(A){super();this.patchConnection=A,this.statusListener=(f)=>{this.status=f,this.createControlElements()},this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.getHTML(),this.titleElement=this.shadowRoot.getElementById("patch-title"),this.parametersElement=this.shadowRoot.getElementById("patch-parameters")}hasOwnTitleBar(){return!0}connectedCallback(){this.patchConnection.addStatusListener(this.statusListener),this.patchConnection.requestStatusUpdate()}disconnectedCallback(){this.patchConnection.removeStatusListener(this.statusListener)}createControlElements(){if(this.parametersElement.innerHTML="",this.titleElement.innerText=this.status?.manifest?.name??"Cmajor",this.status?.details?.inputs){for(let A of this.status.details.inputs)if(!A.annotation?.hidden){const f=U8(this.patchConnection,A);if(f)this.parametersElement.appendChild(f)}}}getHTML(){const A=import.meta.url;return`
            <style>
            * {
                box-sizing: border-box;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                font-family: Avenir, 'Avenir Next LT Pro', Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;
                font-size: 0.9rem;
            }

            :host {
                --header-height: 2.5rem;
                --foreground: #ffffff;
                --background: #191b1b;

                display: block;
                height: 100%;
                background-color: var(--background);
            }

            .main {
                background: var(--background);
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .header {
                width: 100%;
                height: var(--header-height);
                border-bottom: 0.1rem solid var(--foreground);
                display: flex;
                justify-content: space-between;
                align-items: center;
                display: none;
            }

            #patch-title {
                color: var(--foreground);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                cursor: default;
                font-size: 140%;
            }

            .logo {
                flex: 1;
                opacity: 0;
                height: 80%;
                margin-left: 0.3rem;
                margin-right: 0.3rem;
                background-color: var(--foreground);
                mask: url(${A}/../assets/cmajor-logo.svg);
                mask-repeat: no-repeat;
                -webkit-mask: url(${A}/../assets/cmajor-logo.svg);
                -webkit-mask-repeat: no-repeat;
                min-width: 6.25rem;
            }

            .header-filler {
                flex: 1;
            }

            #patch-parameters {
                max-height: 100%;
                overflow: auto;
                padding: 1rem;
                text-align: center;
                
            }

            ${v8()}

            </style>

            <div class="main">
              <div class="header">
                <span class="logo"></span>
                <h2 id="patch-title"></h2>
                <div class="header-filler"></div>
              </div>
              <div id="patch-parameters"></div>
            </div>`}}if(!window.customElements.get("cmaj-generic-patch-view"))window.customElements.define("cmaj-generic-patch-view",d8);function M8(A){return new d8(A)}class Z8 extends I8{constructor(){super()}requestStatusUpdate(){this.sendMessageToServer({type:"req_status"})}addStatusListener(A){this.addEventListener("status",A)}removeStatusListener(A){this.removeEventListener("status",A)}resetToInitialState(){this.sendMessageToServer({type:"req_reset"})}sendEventOrValue(A,f,N,G){this.sendMessageToServer({type:"send_value",id:A,value:f,rampFrames:N,timeout:G})}sendMIDIInputEvent(A,f){this.sendEventOrValue(A,{message:f})}sendParameterGestureStart(A){this.sendMessageToServer({type:"send_gesture_start",id:A})}sendParameterGestureEnd(A){this.sendMessageToServer({type:"send_gesture_end",id:A})}requestStoredStateValue(A){this.sendMessageToServer({type:"req_state_value",key:A})}sendStoredStateValue(A,f){this.sendMessageToServer({type:"send_state_value",key:A,value:f})}addStoredStateValueListener(A){this.addEventListener("state_key_value",A)}removeStoredStateValueListener(A){this.removeEventListener("state_key_value",A)}sendFullStoredState(A){this.sendMessageToServer({type:"send_full_state",value:A})}requestFullStoredState(A){const f="fullstate_response_"+Math.floor(Math.random()*1e8).toString();this.addSingleUseListener(f,A),this.sendMessageToServer({type:"req_full_state",replyType:f})}addEndpointListener(A,f,N,G){f.eventID="event_"+A+"_"+Math.floor(Math.random()*1e8).toString(),this.addEventListener(f.eventID,f),this.sendMessageToServer({type:"add_endpoint_listener",endpoint:A,replyType:f.eventID,granularity:N,fullAudioData:G})}removeEndpointListener(A,f){this.removeEventListener(f.eventID,f),this.sendMessageToServer({type:"remove_endpoint_listener",endpoint:A,replyType:f.eventID})}requestParameterValue(A){this.sendMessageToServer({type:"req_param_value",id:A})}addParameterListener(A,f){this.addEventListener("param_value_"+A.toString(),f)}removeParameterListener(A,f){this.removeEventListener("param_value_"+A.toString(),f)}addAllParameterListener(A){this.addEventListener("param_value",A)}removeAllParameterListener(A){this.removeEventListener("param_value",A)}getResourceAddress(A){return A}utilities={midi:L8,PianoKeyboard:i,ParameterControls:K8,GenericPatchView:M8};deliverMessageFromServer(A){if(A.type==="status")this.manifest=A.message?.manifest;if(A.type=="param_value")this.dispatchEvent("param_value_"+A.message.endpointID,A.message.value);this.dispatchEvent(A.type,A.message)}}async function $1(A,f){if(A?.manifest){let N=A.manifest.view;if(N&&f==="generic"){if(N.src)N=void 0}const G=N?.src?A.getResourceAddress(N.src):"./cmaj-generic-patch-view.js",S=await(N?.src?await import(G):m8)?.default(A);if(S){if(S.style.display="block",N?.width>10)S.style.width=N.width+"px";else S.style.width=void 0;if(N?.height>10)S.style.height=N.height+"px";else S.style.height=void 0;return S}}return}function r0(A,f,N){function G(S){const O=getComputedStyle(S);return{width:S.clientHeight-parseFloat(O.paddingTop)-parseFloat(O.paddingBottom),height:S.clientWidth-parseFloat(O.paddingLeft)-parseFloat(O.paddingRight)}}const B=A.getScaleFactorLimits?.();if(B&&(B.minScale||B.maxScale)&&N){const S=B.minScale||0.25,O=B.maxScale||5,Q=G(N),J=G(A),E=Q.width/J.width,Y=Q.height/J.height,W=Math.min(O,Math.max(S,Math.min(E,Y)));f.style.transform=`scale(${W})`}else f.style.transform="none"}async function p0(A,f){const N=await $1(A,f);if(N)return new l8(N)}class l8 extends HTMLElement{constructor(A){super();this.view=A,this.style="display: block; position: relative; width: 100%; height: 100%; overflow: visible; transform-origin: 0% 0%;"}connectedCallback(){this.appendChild(this.view),this.resizeObserver=new ResizeObserver(()=>r0(this.view,this,this.parentElement)),this.resizeObserver.observe(this.parentElement),r0(this.view,this,this.parentElement)}disconnectedCallback(){this.resizeObserver=void 0,this.innerHTML=""}}if(!window.customElements.get("cmaj-patch-view-holder"))window.customElements.define("cmaj-patch-view-holder",l8);async function x1(A,f,N){const G=`(${P1.toString()}) ("${f}", ${A.toString()}, "${N}");`;let B=new FileReader;return B.readAsDataURL(new Blob([G],{type:"text/javascript"})),await new Promise((S)=>{B.onloadend=()=>S(B.result)})}function P1(A,f,N){function G({wrapper:Y,eventOutputs:W,dispatchOutputEvent:X}){const Z=W.map(({endpointID:x})=>{const q=Y[`getOutputEventCount_${x}`]?.bind(Y),P=Y[`resetOutputEventCount_${x}`]?.bind(Y),_=Y[`getOutputEvent_${x}`]?.bind(Y);return()=>{const K=q();for(let M=0;M<K;++M)X(x,_(M));P()}});return()=>Z.forEach((x)=>x())}function B(Y){for(let{initialise:W}of Object.values(Y))W()}function S(Y,W,X){const Z=({endpointType:q,endpointID:P})=>{switch(q){case"event":return`sendInputEvent_${P}`;case"value":return`setInputValue_${P}`}throw"Unhandled endpoint type"},x={};for(let{endpointID:q,endpointType:P,annotation:_,purpose:K}of W){const M=Z({endpointType:P,endpointID:q}),s=Y[M]?.bind(Y),$=(F)=>{if(_.step!=null)F=Math.round(F/_.step)*_.step;if(_.min!=null&&_.max!=null)F=Math.min(Math.max(F,_.min),_.max);return F},R=(F,b)=>{const V=x[q];V.cachedValue=F,s(F,b)};if(R){const F=X[q]??_?.init;x[q]={snapAndConstrainValue:$,update:R,initialise:F!=null?()=>R(F):()=>{},purpose:K,cachedValue:void 0}}}return x}function O({wrapper:Y,toEndpoints:W,wrapperMethodNamePrefix:X}){const Z=W(Y);if(Z.length===0)return()=>{};let x=[],q=[],P=0;for(let _ of Z){const K=Y[`${X}_${_.endpointID}`]?.bind(Y);if(!K)return()=>{};x.push(K),q.push(P),P+=_.numAudioChannels}return(_,K)=>{for(let M=0;M<x.length;M++)x[M](_,K,q[M])}}function Q(Y){return O({wrapper:Y,toEndpoints:(W)=>W.getInputEndpoints().filter(({purpose:X})=>X==="audio in"),wrapperMethodNamePrefix:"setInputStreamFrames"})}function J(Y){return O({wrapper:Y,toEndpoints:(W)=>W.getOutputEndpoints().filter(({purpose:X})=>X==="audio out"),wrapperMethodNamePrefix:"getOutputFrames"})}class E extends AudioWorkletProcessor{static get parameterDescriptors(){return[]}constructor({processorOptions:Y,...W}){super(W);this.processImpl=void 0,this.consumeOutputEvents=void 0;const{sessionID:X=Date.now()&2147483647,initialValueOverrides:Z={}}=Y,x=new f;x.initialise(X,sampleRate).then(()=>this.initialisePatch(x,Z)).catch((q)=>{throw new Error(q)})}process(Y,W){const X=Y[0],Z=W[0];return this.processImpl?.(X,Z),this.consumeOutputEvents?.(),!0}sendPatchMessage(Y){this.port.postMessage({type:"patch",payload:Y})}sendParameterValueChanged(Y,W){this.sendPatchMessage({type:"param_value",message:{endpointID:Y,value:W}})}initialisePatch(Y,W){try{const X=Y.getInputEndpoints().filter(({purpose:z})=>z==="parameter"),Z=S(Y,X,W);B(Z);const x=(z,H)=>{const T=([j,{cachedValue:U}])=>({[z]:j,value:U});return Object.entries(H).map(T)},q=x("endpointID",Z),P=Y.getState(),_=()=>{Y.restoreState(P),B(Z)},K=({purpose:z})=>!["audio in","parameter"].includes(z),M=Y.getInputEndpoints().filter(K),s=S(Y,M,W),$=({endpointType:z})=>z==="event",R=Y.getInputEndpoints().filter($),F=Y.getOutputEndpoints().filter($),b=(z)=>{const H={};for(let{endpointID:T}of z)H[T]=[];return H},V=b(R),v=b(F);this.consumeOutputEvents=G({eventOutputs:F,wrapper:Y,dispatchOutputEvent:(z,H)=>{for(let{replyType:T}of v[z]??[])this.sendPatchMessage({type:T,message:H.event})}});const d=128,b8=Q(Y),t=J(Y);this.processImpl=(z,H)=>{b8(z,d),Y.advance(d),t(H,d)},this.port.addEventListener("message",(z)=>{if(z.data.type!=="patch")return;const H=z.data.payload;switch(H.type){case"req_status":{this.sendPatchMessage({type:"status",message:{details:{inputs:Y.getInputEndpoints(),outputs:Y.getOutputEndpoints()},sampleRate,host:N?N:"WebAudio"}});break}case"req_reset":{_(),q.forEach((T)=>this.sendParameterValueChanged(T.endpointID,T.value));break}case"req_param_value":{const T=H.id,j=Z[T];if(!j)return;const U=j.cachedValue;this.sendParameterValueChanged(T,U);break}case"send_value":{const T=H.id,j=Z[T];if(j){const D=j.snapAndConstrainValue(H.value);j.update(D,H.rampFrames),this.sendParameterValueChanged(T,D);return}const U=s[T];if(U){U.update(H.value);for(let{replyType:D}of V[T]??[])this.sendPatchMessage({type:D,message:U.cachedValue})}break}case"send_gesture_start":break;case"send_gesture_end":break;case"req_full_state":this.sendPatchMessage({type:H?.replyType,message:{parameters:x("name",Z)}});break;case"send_full_state":{const{parameters:T=[]}=z.data.payload?.value||[];for(let[j,U]of Object.entries(Z)){const D=T.find(({name:k})=>k===j);if(D)U.update(D.value);else U.initialise();this.sendParameterValueChanged(j,U.cachedValue)}break}case"add_endpoint_listener":{const T=(j,U)=>{const D=U?.endpoint,k=j[D];if(!k)return!1;return k.push({replyType:U?.replyType})>0};if(!T(V,H))T(v,H);break}case"remove_endpoint_listener":{const T=(j,U)=>{const D=U?.endpoint,k=j[D];if(!k)return!1;const p8=k.indexOf(U?.replyType);if(p8===-1)return!1;return k.splice(p8,1).length===1};if(!T(V,H))T(v,H);break}default:break}}),this.port.postMessage({type:"initialised"}),this.port.start()}catch(X){this.port.postMessage(X.toString())}}}registerProcessor(A,E)}async function _1(A,f){try{const N=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}});if(!N)throw new Error;const G=A.createMediaStreamSource(N);if(!G)throw new Error;G.connect(f)}catch(N){console.warn("Could not open audio input")}}async function q1(A,f){try{if(!navigator.requestMIDIAccess)throw new Error("Web MIDI API not supported.");const N=await navigator.requestMIDIAccess({sysex:!0,software:!0});for(let G of N.inputs.values())G.onmidimessage=({data:B})=>A.sendMIDIInputEvent(f,B[2]|B[1]<<8|B[0]<<16)}catch(N){console.warn(`Could not open MIDI devices: ${N}`)}}class c8 extends Z8{constructor(A){super();this.manifest=A,this.cachedState={}}async initialise({CmajorClass:A,audioContext:f,workletName:N,hostDescription:G,sessionID:B,initialValueOverrides:S,rootResourcePath:O}){if(this.audioContext=f,O){if(this.rootResourcePath=O.toString(),!this.rootResourcePath.endsWith("/"))this.rootResourcePath+="/"}else{const P=(_)=>{return _.href.substring(0,_.href.lastIndexOf("/"))};if(this.rootResourcePath=P(new URL(".",import.meta.url)),!this.rootResourcePath.endsWith("/"))this.rootResourcePath+="/../"}const Q=await x1(A,N,G);await f.audioWorklet.addModule(Q),this.inputEndpoints=A.prototype.getInputEndpoints(),this.outputEndpoints=A.prototype.getOutputEndpoints();const J=this.inputEndpoints.filter(({purpose:P})=>P==="audio in"),E=this.outputEndpoints.filter(({purpose:P})=>P==="audio out");let Y=0,W=0;J.forEach((P)=>{Y=Y+P.numAudioChannels}),E.forEach((P)=>{W=W+P.numAudioChannels});const X=Y>0,Z=W>0,x=new AudioWorkletNode(f,N,{numberOfInputs:+X,numberOfOutputs:+Z,channelCountMode:"explicit",channelCount:X?Y:void 0,outputChannelCount:Z?[W]:[],processorOptions:{sessionID:B,initialValueOverrides:S}}),q=async()=>{return new Promise((P)=>{const _=(K)=>{if(K.data.type==="initialised")x.port.removeEventListener("message",_),P()};x.port.addEventListener("message",_)})};x.port.start(),await q(),this.audioNode=x,x.port.addEventListener("message",(P)=>{if(P.data.type==="patch"){const _=P.data.payload;if(_?.type==="status")_.message={manifest:this.manifest,..._.message};this.deliverMessageFromServer(_)}}),await this.startPatchWorker()}async connectDefaultAudioAndMIDI(A){if(!this.audioNode)throw new Error("AudioWorkletPatchConnection.initialise() must have been successfully completed before calling connectDefaultAudioAndMIDI()");const f=(G)=>{for(let B of this.inputEndpoints)if(B.purpose===G)return B.endpointID},N=f("midi in");if(N)q1(this,N);if(f("audio in"))_1(A,this.audioNode);this.audioNode.connect(A.destination)}sendMessageToServer(A){this.audioNode.port.postMessage({type:"patch",payload:A})}requestStoredStateValue(A){this.dispatchEvent("state_key_value",{key:A,value:this.cachedState[A]})}sendStoredStateValue(A,f){if(this.cachedState[A]!=f){if(f==null){delete this.cachedState[A];return}this.cachedState[A]=f,this.dispatchEvent("state_key_value",{key:A,value:f})}}sendFullStoredState(A){const f=(()=>{const B={};return Object.keys(this.cachedState).forEach((S)=>B[S]=void 0),B})(),N=A.values??{},G={...f,...N};Object.entries(G).forEach(([B,S])=>this.sendStoredStateValue(B,S)),super.sendFullStoredState(A)}requestFullStoredState(A){super.requestFullStoredState((f)=>A({values:{...this.cachedState},...f}))}getResourceAddress(A){return this.rootResourcePath+A}async readResource(A){return fetch(A)}async readResourceAsAudioData(A){const f=await this.readResource(A),N=await this.audioContext.decodeAudioData(await f.arrayBuffer());let G=[];for(let B=0;B<N.length;++B)G.push([]);for(let B=0;B<N.numberOfChannels;++B){const S=N.getChannelData(B);for(let O=0;O<N.length;++O)G[O].push(S[O])}return{frames:G,sampleRate:N.sampleRate}}async startPatchWorker(){if(this.manifest.worker?.length>0)(await import(this.getResourceAddress(this.manifest.worker))).default(this)}}if(!window.customElements.get("cmaj-panel-piano-keyboard"))customElements.define("cmaj-panel-piano-keyboard",i);class r8 extends p{static styles=D8`
		:host {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
		}
		main {
			flex: 1;
			position: relative;
		}
		main>* {
			position: absolute !important;
			inset: 0;
		}
		cmaj-panel-piano-keyboard {
			height: 42px;
			flex-shrink: 0;
			display: none;
			justify-content: center;
			align-items: center;
			max-width: 100% !important;
		}
	`;audioContext;keyboard;container;async firstUpdated(A){super.firstUpdated(A),this.keyboard=this.shadowRoot.querySelector("cmaj-panel-piano-keyboard"),this.container=this.shadowRoot.querySelector("main"),this.audioContext=new AudioContext,this.audioContext.suspend(),window.addEventListener("message",this.handleMessage)}handleMessage=(A)=>{switch(A.data.type){case"init":this.init(A.data.manifest,A.data.version,A.data.code);return}};async init(A,f,N){const G=new c8(A);G.getCmajorVersion=()=>f,await G.initialise({CmajorClass:await new Function(`return (${N});`)(),audioContext:this.audioContext,workletName:"cmaj-worklet-processor",hostDescription:"WebAudio",rootResourcePath:"./"}),window.addEventListener("mousedown",()=>this.startAudioContent(G),{once:!0}),this.container.appendChild(await p0(G));const B=this.getMIDIInputEndpointID(G);if(!B)return;this.keyboard.attachToPatchConnection(G,B),this.keyboard.style.display="flex"}createJavascriptWrapperClass=async(A)=>await new Function(`return (${A});`)();getMIDIInputEndpointID=(A)=>A.inputEndpoints.find((f)=>f.purpose==="midi in")?.endpointID;startAudioContent=(A)=>{A.connectDefaultAudioAndMIDI(this.audioContext),this.audioContext?.resume()};render=()=>O0`
		<main></main>
		<cmaj-panel-piano-keyboard></cmaj-panel-piano-keyboard>
	`}r8=s8([x0("patch-preview")],r8);export{r8 as PreviewComoponents};

//# debugId=8100A7636C45C83964756E2164756E21
//# sourceMappingURL=template.js.map
