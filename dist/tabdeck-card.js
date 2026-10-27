var e,t,a,i,o,r,n,s,d,l,c,p,u,h,b,_,m,g,v,y,f,k,w,x,z,$,A,S,C,T,j,E,O,N,M,P,I,L,D,R,V,H,B,q,U,F,K,W,Z,G,J,Y,X,Q,ee,te,ae,ie,oe,re,ne,se,de=Object.defineProperty,le=(e,t,a)=>()=>{if(a)throw a[0];try{return e&&(t=e(e=0)),t}catch(S){throw a=[S],S}},ce=(e,t)=>{let a={};for(var i in e)de(a,i,{get:e[i],enumerable:!0});return t||de(a,Symbol.toStringTag,{value:"Module"}),a},pe=le(()=>{e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),i=/* @__PURE__ */new WeakMap,o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const a=this.t;if(t&&void 0===e){const t=void 0!==a&&1===a.length;t&&(e=i.get(a)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(a,e))}return e}toString(){return this.cssText}},r=e=>new o("string"==typeof e?e:e+"",void 0,a),n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,a,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[i+1],e[0]);return new o(i,e,a)},s=(a,i)=>{if(t)a.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)}},d=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return r(t)})(e):e}),ue=le(()=>{pe(),({is:l,defineProperty:c,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:b}=Object),_=globalThis,m=_.trustedTypes,g=m?m.emptyScript:"",v=_.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},k=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:k},Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=/* @__PURE__ */new WeakMap,x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:o}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);o?.call(this,t),this.requestUpdate(e,r,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=b(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...u(e),...h(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=/* @__PURE__ */new Map;for(const[t,a]of this.elementProperties){const e=this._$Eu(t,a);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=/* @__PURE__ */new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=/* @__PURE__ */new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(void 0!==i&&!0===a.reflect){const o=(void 0!==a.converter?.toAttribute?a.converter:f).toAttribute(t,a.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=a.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const r=o.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,a,i=!1,o){if(void 0!==e){const r=this.constructor;if(!1===i&&(o=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??k)(o,t)||a.useDefault&&a.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:i,wrapped:o},r){a&&!(this._$Ej??=/* @__PURE__ */new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=/* @__PURE__ */new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,a,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}},x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=/* @__PURE__ */new Map,x[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2")});function he(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}function be(e,t,a=e,i){if(t===W)return t;let o=void 0!==i?a._$Co?.[i]:a._$Cl;const r=M(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,a,i)),void 0!==i?(a._$Co??=[])[i]=o:a._$Cl=o),void 0!==o&&(t=be(e,o._$AS(e,t.values),o,i)),t}var _e,me,ge,ve,ye,fe,ke=le(()=>{z=globalThis,$=e=>e,A=z.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,E=`<${j="?"+T}>`,O=document,N=()=>O.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,I=e=>P(e)||"function"==typeof e?.[Symbol.iterator],L="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,V=/>/g,H=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,q=/"/g,U=/^(?:script|style|textarea|title)$/i,F=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),K=F(1),F(2),F(3),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),G=/* @__PURE__ */new WeakMap,J=O.createTreeWalker(O,129),Y=(e,t)=>{const a=e.length-1,i=[];let o,r=2===t?"<svg>":3===t?"<math>":"",n=D;for(let s=0;s<a;s++){const t=e[s];let a,d,l=-1,c=0;for(;c<t.length&&(n.lastIndex=c,d=n.exec(t),null!==d);)c=n.lastIndex,n===D?"!--"===d[1]?n=R:void 0!==d[1]?n=V:void 0!==d[2]?(U.test(d[2])&&(o=RegExp("</"+d[2],"g")),n=H):void 0!==d[3]&&(n=H):n===H?">"===d[0]?(n=o??D,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?H:'"'===d[3]?q:B):n===q||n===B?n=H:n===R||n===V?n=D:(n=H,o=void 0);const p=n===H&&e[s+1].startsWith("/>")?" ":"";r+=n===D?t+E:l>=0?(i.push(a),t.slice(0,l)+C+t.slice(l)+T+p):t+T+(-2===l?s:p)}return[he(e,r+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]},X=class e{constructor({strings:t,_$litType$:a},i){let o;this.parts=[];let r=0,n=0;const s=t.length-1,d=this.parts,[l,c]=Y(t,a);if(this.el=e.createElement(l,i),J.currentNode=this.el.content,2===a||3===a){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=J.nextNode())&&d.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=c[n++],a=o.getAttribute(e).split(T),i=/([.?@])?(.*)/.exec(t);d.push({type:1,index:r,name:i[2],strings:a,ctor:"."===i[1]?ae:"?"===i[1]?ie:"@"===i[1]?oe:te}),o.removeAttribute(e)}else e.startsWith(T)&&(d.push({type:6,index:r}),o.removeAttribute(e));if(U.test(o.tagName)){const e=o.textContent.split(T),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let a=0;a<t;a++)o.append(e[a],N()),J.nextNode(),d.push({type:2,index:++r});o.append(e[t],N())}}}else if(8===o.nodeType)if(o.data===j)d.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(T,e+1));)d.push({type:7,index:r}),e+=T.length-1}r++}}static createElement(e,t){const a=O.createElement("template");return a.innerHTML=e,a}},Q=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??O).importNode(t,!0);J.currentNode=i;let o=J.nextNode(),r=0,n=0,s=a[0];for(;void 0!==s;){if(r===s.index){let t;2===s.type?t=new ee(o,o.nextSibling,this,e):1===s.type?t=new s.ctor(o,s.name,s.strings,this,e):6===s.type&&(t=new re(o,this,e)),this._$AV.push(t),s=a[++n]}r!==s?.index&&(o=J.nextNode(),r++)}return J.currentNode=O,i}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=be(this,e,t),M(e)?e===Z||null==e||""===e?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):I(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Z&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=X.createElement(he(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let i,o=0;for(const r of t)o===a.length?a.push(i=new e(this.O(N()),this.O(N()),this,this.options)):i=a[o],i._$AI(r),o++;o<a.length&&(this._$AR(i&&i._$AB.nextSibling,o),a.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}},te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(/* @__PURE__ */new String),this.strings=a):this._$AH=Z}_$AI(e,t=this,a,i){const o=this.strings;let r=!1;if(void 0===o)e=be(this,e,t,0),r=!M(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{const i=e;let n,s;for(e=o[0],n=0;n<o.length-1;n++)s=be(this,i[a+n],t,n),s===W&&(s=this._$AH[n]),r||=!M(s)||s!==this._$AH[n],s===Z?e=Z:e!==Z&&(e+=(s??"")+o[n+1]),this._$AH[n]=s}r&&!i&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ae=class extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}},ie=class extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Z)}},oe=class extends te{constructor(e,t,a,i,o){super(e,t,a,i,o),this.type=5}_$AI(e,t=this){if((e=be(this,e,t,0)??Z)===W)return;const a=this._$AH,i=e===Z&&a!==Z||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==Z&&(a===Z||i);i&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},re=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){be(this,e)}},ne=z.litHtmlPolyfillSupport,ne?.(X,ee),(z.litHtmlVersions??=[]).push("3.3.3"),se=(e,t,a)=>{const i=a?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=a?.renderBefore??null;i._$litPart$=o=new ee(t.insertBefore(N(),e),e,void 0,a??{})}return o._$AI(e),o}}),we=le(()=>{ue(),ue(),ke(),ke(),_e=globalThis,me=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}},me._$litElement$=!0,me.finalized=!0,_e.litElementHydrateSupport?.({LitElement:me}),ge=_e.litElementPolyfillSupport,ge?.({LitElement:me}),(_e.litElementVersions??=[]).push("4.2.2")}),xe=le(()=>{}),ze=le(()=>{ue(),ke(),we(),xe()}),$e=le(()=>{ve=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)}});function Ae(e){return(t,a)=>"object"==typeof a?fe(e,t,a):((e,t,a)=>{const i=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),i?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}var Se=le(()=>{ue(),ye={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:k},fe=(e=ye,t,a)=>{const{kind:i,metadata:o}=a;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=/* @__PURE__ */new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(a.name,e),"accessor"===i){const{name:i}=a;return{set(a){const o=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,o,e,!0,a)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=a;return function(a){const o=this[i];t.call(this,a),this.requestUpdate(i,o,e,!0,a)}}throw Error("Unsupported decorator location: "+i)}});function Ce(e){return Ae({...e,state:!0,attribute:!1})}var Te,je,Ee,Oe,Ne,Me,Pe,Ie,Le,De,Re=le(()=>{Se()}),Ve=le(()=>{}),He=le(()=>{}),Be=le(()=>{}),qe=le(()=>{}),Ue=le(()=>{}),Fe=le(()=>{}),Ke=le(()=>{$e(),Se(),Re(),Ve(),He(),Be(),qe(),Ue(),Fe()});var We=le(()=>{!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Te||(Te={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(je||(je={})),Ee=["closed","locked","off"],Oe=(e,t,a,i)=>{i=i||{},a=null==a?{}:a;const o=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=a,e.dispatchEvent(o),o},Ne=e=>{Oe(window,"haptic",e)},Me=(e,t,a=!1)=>{a?history.replaceState(null,"",t):history.pushState(null,"",t),Oe(window,"location-changed",{replace:a})},Pe=(e,t,a=!0)=>{const i=function(e){return e.substr(0,e.indexOf("."))}(t),o="group"===i?"homeassistant":i;let r;switch(i){case"lock":r=a?"unlock":"lock";break;case"cover":r=a?"open_cover":"close_cover";break;default:r=a?"turn_on":"turn_off"}return e.callService(o,r,{entity_id:t})},Ie=(e,t)=>{const a=Ee.includes(e.states[t].state);return Pe(e,t,a)},Le=(e,t,a,i)=>{if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(e=>e.user===t.user.id)||(Ne("warning"),confirm(i.confirmation.text||`Are you sure you want to ${i.action}?`)))switch(i.action){case"more-info":(a.entity||a.camera_image)&&Oe(e,"hass-more-info",{entityId:a.entity?a.entity:a.camera_image});break;case"navigate":i.navigation_path&&Me(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":a.entity&&(Ie(t,a.entity),Ne("success"));break;case"call-service":{if(!i.service)return void Ne("failure");const[e,a]=i.service.split(".",2);t.callService(e,a,i.service_data,i.target),Ne("success");break}case"fire-dom-event":Oe(e,"ll-custom",i)}},De=(e,t,a,i)=>{let o;"double_tap"===i&&a.double_tap_action?o=a.double_tap_action:"hold"===i&&a.hold_action?o=a.hold_action:"tap"===i&&a.tap_action&&(o=a.tap_action),Le(e,t,a,o)}});function Ze(e){if(!e||"object"!=typeof e)return;const t={},a=Number(e.precision);void 0!==e.precision&&Number.isInteger(a)&&a>=0&&a<=6&&(t.precision=a);const i=Number(e.max);return void 0!==e.max&&Number.isFinite(i)&&(t.max=i),"string"==typeof e.unit&&(t.unit=e.unit),t}function Ge(e,t){if(void 0===e||!t||!function(e){return""!==e.trim()&&Number.isFinite(Number(e))}(e))return e;const a=Number(e);let i;return i=void 0!==t.max&&a>t.max?`${t.max}+`:void 0!==t.precision?a.toFixed(t.precision):e.trim(),t.unit?i+t.unit:i}var Je,Ye,Xe,Qe,et=le(()=>{});function tt(e){return Je.includes(e)}function at(e){const t=Xe[e];return{...Ye,...t,styles:{...t.styles??{}}}}var it=le(()=>{Je=["default","ios","material","glass","minimal","rail"],Ye={position:"top",style:"underline",align:"start",tab_display:"both",badge_display:"text",indicator_size:3,indicator_radius:void 0,elevation:!1,sticky:!1,bar_background:void 0,styles:{}},Xe={default:{},ios:{style:"segmented",align:"justify",indicator_radius:8,bar_background:"var(--secondary-background-color, #efefef)",styles:{"--tabdeck-tab-height":"36px"}},material:{style:"underline",align:"justify",elevation:!0},glass:{style:"pill",sticky:!0,bar_background:"color-mix(in srgb, var(--card-background-color, #fff) 60%, transparent)",styles:{"--tabdeck-bar-backdrop":"blur(12px)"}},minimal:{style:"text",tab_display:"label",badge_display:"dot"},rail:{position:"left",style:"rail",tab_display:"icon"}},Qe=new Set(Object.values(Xe).flatMap(e=>Object.keys(e.styles??{})))});function ot(e){if("number"==typeof e)return Number.isFinite(e)&&e>0?`${e}px`:void 0;if("string"!=typeof e)return;const t=e.trim();return""===t||/[;{}"<>]/.test(t)||!/^[\d.]/.test(t)&&!/^(calc|min|max|clamp|var)\(/.test(t)?void 0:t}function rt(e,t){const a=Array.from({length:Math.max(1,t)},()=>[]),i=a.map(()=>0);return e.forEach((e,t)=>{let o=0;for(let r=1;r<a.length;r++)i[r]<i[o]&&(o=r);a[o].push(t),i[o]+=Math.max(1,Number(e)||1)}),a}var nt,st,dt,lt,ct,pt,ut,ht,bt,_t,mt,gt,vt=le(()=>{});function yt(e){const t=st[e.source];return"tiles"===e.content&&t?ct({name:"{{ item.name }}",icon:"{{ item.icon }}",[t]:"{{ item.id }}",...e.domains?.length?{domains:e.domains}:{}}):pt[e.source]??dt}function ft(e){return"["+e.map(e=>`'${e}'`).join(", ")+"]"}function kt(e){const t=(e.domains??[]).map(String).filter(e=>bt.test(e)),a=ft((e.exclude??[]).map(String).filter(e=>_t.test(e))),i=t.length?` | select('match', '^(${t.join("|")})\\\\.')`:"",o=e=>`{%- set ns.out = ns.out + [{${e}}] -%}`,r=e=>["{%- if ents | count > 0 -%}",o(e),"{%- endif -%}"];switch(e.source){case"areas":case"labels":{const t="areas"===e.source,o=t?"mdi:texture-box":"mdi:label-outline";return[...mt,`{%- for id in ${t?"areas()":"labels()"} if id not in ${a} -%}`,`{%- set ents = ${t?"area_entities":"label_entities"}(id)${i} | list -%}`,...r(`'id': id, 'name': ${t?"area_name":"label_name"}(id), 'icon': '${o}', 'entities': ents`),"{%- endfor -%}",...gt].join("\n")}case"floors":return[...mt,`{%- for id in floors() if id not in ${a} -%}`,"{%- set acc = namespace(l=[]) -%}","{%- for a in floor_areas(id) -%}{%- set acc.l = acc.l + (area_entities(a) | list) -%}{%- endfor -%}",`{%- set ents = acc.l${i} | list -%}`,...r("'id': id, 'name': floor_name(id), 'icon': 'mdi:home-floor-1', 'entities': ents"),"{%- endfor -%}",...gt].join("\n");case"domains":{const e=t.length?t:ht;return[...mt,`{%- set icons = ${n=ut,"{"+Object.entries(n).map(([e,t])=>`'${e}': '${t}'`).join(", ")+"}"} -%}`,`{%- for id in ${ft(e)} if id not in ${a} -%}`,"{%- set ents = states[id] | map(attribute='entity_id') | list -%}",...r("'id': id, 'name': id | replace('_', ' ') | capitalize, 'icon': icons.get(id, 'mdi:shape'), 'entities': ents"),"{%- endfor -%}",...gt].join("\n")}case"devices":return[...mt,"{%- for id in states | map(attribute='entity_id') | map('device_id') | reject('none') | unique | list -%}",`{%- if id not in ${a} -%}`,`{%- set ents = device_entities(id)${i} | list -%}`,...r("'id': id, 'name': device_attr(id, 'name_by_user') or device_attr(id, 'name'), 'icon': 'mdi:devices', 'entities': ents"),"{%- endif -%}","{%- endfor -%}","{{ ns.out | sort(attribute='name') | tojson }}"].join("\n");case"todo":case"calendars":case"cameras":{const t={todo:"todo",calendars:"calendar",cameras:"camera"}[e.source];return[...mt,`{%- for s in states.${t} if s.entity_id not in ${a} -%}`,o("'id': s.entity_id, 'name': s.name"),"{%- endfor -%}",...gt].join("\n")}case"zones":return[...mt,`{%- for z in states.zone if z.entity_id not in ${a} -%}`,"{%- set key = 'home' if z.entity_id == 'zone.home' else z.name -%}","{%- set people = states.person | selectattr('state', 'eq', key) | map(attribute='entity_id') | list -%}",o("'id': z.entity_id, 'name': z.name, 'icon': z.attributes.icon or 'mdi:map-marker-radius', 'entities': [z.entity_id] + people, 'count': people | count | string"),"{%- endfor -%}",...gt].join("\n")}var n}var wt,xt,zt,$t,At,St,Ct,Tt,jt=le(()=>{nt=["areas","labels","floors","domains","devices","todo","calendars","cameras","zones"],st={areas:"area",floors:"floor",labels:"label"},dt={name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"entities",entities:"{{ item.entities }}"}},lt=new WeakSet([dt]),ct=e=>(lt.add(e),e),pt={todo:ct({name:"{{ item.name }}",icon:"mdi:clipboard-list-outline",badge:"{{ item.id }}",card:{type:"todo-list",entity:"{{ item.id }}"}}),calendars:ct({name:"{{ item.name }}",icon:"mdi:calendar",card:{type:"calendar",entities:["{{ item.id }}"],initial_view:"listWeek"}}),cameras:ct({name:"{{ item.name }}",icon:"mdi:cctv",card:{type:"picture-entity",entity:"{{ item.id }}",camera_view:"auto",show_state:!1}}),zones:ct({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.count }}",card:{type:"map",entities:"{{ item.entities }}"}})},ut={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",media_player:"mdi:television",lock:"mdi:lock",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-blank-circle-outline",person:"mdi:account",scene:"mdi:palette",script:"mdi:script-text",automation:"mdi:robot"},ht=["light","switch","climate","cover","fan","media_player","lock","camera","vacuum"],bt=/^[a-z0-9_]+$/,_t=/^[a-z0-9_]+(\.[a-z0-9_]+)?$/,mt=["{%- set ns = namespace(out=[]) -%}"],gt=["{{ ns.out | tojson }}"]});function Et(e,t,a){return t.includes(e)?e:a}function Ot(e,t,a,i){const o=Number(e);return Number.isFinite(o)?Math.min(a,Math.max(t,o)):i}function Nt(e){if(e)return"string"==typeof e?{entity:e}:"object"==typeof e&&"string"==typeof e.entity?void 0===e.state?{entity:e.entity}:{entity:e.entity,state:String(e.state)}:void 0}function Mt(e){return e&&"object"==typeof e&&e.action&&"none"!==e.action?e:void 0}function Pt(e){const t=e?.attributes??{};let a,i=e?.card??{};if(Array.isArray(e?.children)&&e.children.length>0){const t="menu"===e.children_display?"menu":"row",o=e.children_options&&"object"==typeof e.children_options?e.children_options:{};i={type:"custom:tabdeck-card",...wt,...o,hide_bar:"menu"===t,tabs:e.children},a={display:t,items:e.children.map(e=>({name:e?.name??e?.attributes?.label,icon:e?.icon}))}}else if("sections"===e?.layout&&Array.isArray(e?.sections)&&e.sections.length>0){const t=Number(e?.max_columns);i={type:"custom:tabdeck-sections-card",max_columns:Number.isFinite(t)&&t>=1?Math.round(t):4,sections:e.sections}}else if(Array.isArray(e?.cards)&&e.cards.length>0){const t=Number(e?.columns),a=Number(e?.min_column_width);i="masonry"===e?.layout?{type:"custom:tabdeck-masonry-card",...Number.isFinite(a)&&a>0?{min_column_width:a}:{columns:Number.isFinite(t)&&t>=1?Math.round(t):2},cards:e.cards}:Number.isFinite(t)&&t>1?{type:"grid",columns:t,square:!1,cards:e.cards}:{type:"vertical-stack",cards:e.cards}}return{name:e?.name??t.label??void 0,subtitle:e?.subtitle??void 0,icon:e?.icon??t.icon??void 0,accent:e?.accent??void 0,color:e?.color??void 0,badge:e?.badge??void 0,badge_color:e?.badge_color??void 0,badge_icon:"string"==typeof e?.badge_icon&&e.badge_icon?e.badge_icon:void 0,ring:void 0===e?.ring||null===e.ring||""===e.ring?void 0:String(e.ring),ring_max:Number(e?.ring_max)>0?Number(e.ring_max):void 0,ring_color:"string"==typeof e?.ring_color&&e.ring_color?e.ring_color:void 0,pin:void 0===e?.pin||null===e.pin||""===e.pin?void 0:String(e.pin),pin_timeout:Number(e?.pin_timeout)>0?Number(e.pin_timeout):void 0,area:"string"==typeof e?.area&&e.area?e.area:void 0,floor:"string"==typeof e?.floor&&e.floor?e.floor:void 0,label:"string"==typeof e?.label&&e.label?e.label:void 0,domains:Array.isArray(e?.domains)&&e.domains.length?e.domains.map(String):void 0,badge_format:Ze(e?.badge_format),disabled:!!e?.disabled||void 0,fab:!!e?.fab||void 0,card_size:"number"==typeof e?.card_size?e.card_size:void 0,hold_action:e?.hold_action??void 0,badge_action:e?.badge_action??void 0,tap_action:e?.tap_action&&"object"==typeof e.tap_action&&"none"!==e.tap_action.action?e.tap_action:void 0,enter_action:Mt(e?.enter_action),leave_action:Mt(e?.leave_action),auto_select:Nt(e?.auto_select),default_if:e?.default_if??void 0,visibility:e?.visibility??void 0,alert:Array.isArray(e?.alert)&&e.alert.length>0?e.alert:void 0,background:"string"==typeof e?.background&&e.background.trim()?e.background:void 0,layout:"masonry"===e?.layout&&Array.isArray(e?.cards)&&e.cards.length>0?"masonry":"sections"===e?.layout&&Array.isArray(e?.sections)&&e.sections.length>0&&!a?"sections":void 0,styles:e?.styles&&"object"==typeof e.styles&&!Array.isArray(e.styles)?e.styles:void 0,group:a,children:a?e.children:void 0,children_display:a?a.display:void 0,children_options:a&&e.children_options&&"object"==typeof e.children_options?e.children_options:void 0,card:i}}function It(e){return!!e?.tap_action}function Lt(e){const t="object"==typeof e&&null!==e?e:{interval:e},a=Number(t.interval);if(Number.isFinite(a)&&!(a<=0))return{interval:Math.max(2,a),resume_after:Ot(t.resume_after,0,86400,60)}}function Dt(e){return e&&"object"==typeof e&&!Array.isArray(e)&&Object.keys(e).length?e:void 0}function Rt(e){return Array.isArray(e)&&e.length>0?e:void 0}function Vt(e){return"tallest"===e?"tallest":ot(e)??"auto"}function Ht(e){const t="object"==typeof e&&null!==e?e:{min_width:e},a=Number(t.min_width);if(Number.isFinite(a)&&!(a<=0))return{min_width:a,columns:Math.round(Ot(t.columns,2,4,2))}}function Bt(e){e=function(e){if(!e||!tt(e.preset))return e;const t=at(e.preset),a={...t};for(const[i,o]of Object.entries(e))void 0!==o&&(a[i]=o);return a.styles={...t.styles,...e.styles??{}},a}(e);const t=Array.isArray(e?.tabs)?e.tabs:[],a=function(e){if(e&&"object"==typeof e){if(nt.includes(e.source)){const t=Array.isArray(e.domains)?e.domains.map(String):void 0,a=Array.isArray(e.exclude)?e.exclude.map(String):void 0,i="tiles"===e.content?"tiles":void 0;return{source:e.source,domains:t,exclude:a,content:i,template:kt({source:e.source,domains:t,exclude:a}),tab_template:e.tab_template&&"object"==typeof e.tab_template?e.tab_template:yt({source:e.source,content:i,domains:t})}}if("string"==typeof e.template&&""!==e.template.trim())return{template:e.template,tab_template:e.tab_template&&"object"==typeof e.tab_template?e.tab_template:void 0}}}(e?.auto_tabs);if(0===t.length&&!a)throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");const i=e?.default_tab??e?.options?.defaultTabIndex??0;return{type:e?.type??"custom:tabdeck-card",default_tab:i,position:Et(e?.position,xt,"top"),style:Et(e?.style,zt,"underline"),tab_display:Et(e?.tab_display,At,"both"),align:Et(e?.align,St,"start"),badge_display:Et(e?.badge_display,Ct,"text"),hide_inactive_badge:Boolean(e?.hide_inactive_badge),badge_format:Ze(e?.badge_format),transition:Et(e?.transition,Tt,"none"),indicator_size:Ot(e?.indicator_size,1,16,3),indicator_radius:void 0===e?.indicator_radius?void 0:Ot(e?.indicator_radius,0,999,0),scrollable:void 0===e?.scrollable?"auto":e.scrollable,remember:Et(e?.remember,$t,"none"),remember_entity:e?.remember_entity??void 0,storage_key:e?.storage_key??void 0,lazy:Boolean(e?.lazy),unmount_hidden:Boolean(e?.unmount_hidden),swipe_wrap:Boolean(e?.swipe_wrap),swipe_mouse:Boolean(e?.swipe_mouse),animated:void 0===e?.animated||Boolean(e.animated),accent_indicator:void 0===e?.accent_indicator||Boolean(e.accent_indicator),header:Boolean(e?.header),aria_label:e?.aria_label??void 0,sticky:Boolean(e?.sticky),elevation:Boolean(e?.elevation),scroll_buttons:Boolean(e?.scroll_buttons),overflow_menu:Boolean(e?.overflow_menu),bar_background:e?.bar_background??void 0,swipe:Boolean(e?.swipe),styles:e?.styles??{},tabs:t.map(Pt),auto_tabs:a,auto_rotate:Lt(e?.auto_rotate),scroll_spy:Boolean(e?.scroll_spy),split:Ht(e?.split),tab_display_narrow:At.includes(e?.tab_display_narrow)?e.tab_display_narrow:void 0,narrow_width:Ot(e?.narrow_width,100,4e3,450),preset:tt(e?.preset)?e.preset:void 0,collapsible:Boolean(e?.collapsible),start_collapsed:Boolean(e?.collapsible&&e?.start_collapsed),idle_return:Number(e?.idle_return)>0?Math.max(5,Number(e.idle_return)):void 0,dock:Boolean(e?.dock),content_arrows:Boolean(e?.content_arrows),hide_bar:Boolean(e?.hide_bar),search:Boolean(e?.search),hotkeys:Boolean(e?.hotkeys),history:Boolean(e?.history),customize:Boolean(e?.customize),rail_expand:Boolean(e?.rail_expand),edit_mode_reveal:void 0===e?.edit_mode_reveal||Boolean(e.edit_mode_reveal),transition_duration:Ot(e?.transition_duration,0,2e3,180),transition_narrow:Tt.includes(e?.transition_narrow)?e.transition_narrow:void 0,transition_easing:"string"==typeof e?.transition_easing&&e.transition_easing.trim()&&!/[;{}"<>]/.test(e.transition_easing)?e.transition_easing.trim():"ease",content_height:Vt(e?.content_height),content_max_height:ot(e?.content_max_height),header_cards:Rt(e?.header_cards),footer_cards:Rt(e?.footer_cards),fullscreen:Boolean(e?.fullscreen),swipe_peek:Boolean(e?.swipe_peek),alert_first:Boolean(e?.alert_first),alert_snooze:Number(e?.alert_snooze)>0?Number(e.alert_snooze):void 0,default_by_time:Dt(e?.default_by_time),default_by_device:Dt(e?.default_by_device),fire_event:Boolean(e?.fire_event),event_id:"string"==typeof e?.event_id&&e.event_id?e.event_id:void 0,remote_entity:"string"==typeof e?.remote_entity&&e.remote_entity?e.remote_entity:void 0,remote_event:Boolean(e?.remote_event),unload_after:Number(e?.unload_after)>0?Math.max(1,Number(e.unload_after)):void 0}}function qt(e){const t=e.default_tab;if("string"==typeof t){const a=e.tabs.findIndex(e=>e.name===t);return a>=0?a:0}return"number"==typeof t&&t>=0&&t<e.tabs.length?t:0}var Ut=le(()=>{et(),it(),vt(),jt(),wt={style:"text",align:"start",styles:{"--tabdeck-tab-height":"36px","--tabdeck-tab-font-size":"13px"}},xt=["top","bottom","left","right"],zt=["underline","pill","segmented","boxed","text","rail"],$t=["none","browser","url","entity"],At=["both","icon","label","active","dots"],St=["start","center","end","justify"],Ct=["text","dot"],Tt=["none","fade","slide","scale","flip","rise"]});ze(),Ke(),We(),Ut();var Ft,Kt=/\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g,Wt=/^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;function Zt(e,t){if("item"===t)return e;const a=t.split(".");let i=e;for(let o=1;o<a.length;o++)i=null==i?void 0:i[a[o]];return i}function Gt(e,t,a){if("string"==typeof e){const i=e.match(Wt);if(i){const e=i[1];if("index"===e)return a;const o=Zt(t,e);return void 0===o?"":o}return e.replace(Kt,(e,i)=>String("index"===i?a:Zt(t,i)??""))}if(Array.isArray(e))return e.map(e=>Gt(e,t,a));if(e&&"object"==typeof e){const i={};for(const o of Object.keys(e))i[o]=Gt(e[o],t,a);return i}return e}function Jt(e,t){if(!Array.isArray(e))return[];const a=t.tab_template,i=[];return e.forEach((e,t)=>{a?i.push(Gt(a,e,t)):e&&"object"==typeof e&&!Array.isArray(e)&&i.push(e)}),i}function Yt(e){const t=/^(\d{1,2}):(\d{2})/.exec(String(e));return t?60*Number(t[1])+Number(t[2]):null}function Xt(e){return Array.isArray(e?.conditions)?e.conditions:[]}function Qt(e,t,a){switch(e?.condition){case"state":return function(e,t){const a=t.states[e.entity];if(!a)return!1;const i=a.state;return Array.isArray(e.state)?e.state.includes(i):void 0!==e.state?i===e.state:void 0!==e.state_not&&(Array.isArray(e.state_not)?!e.state_not.includes(i):i!==e.state_not)}(e,t);case"numeric_state":return function(e,t){const a=t.states[e.entity];if(!a)return!1;const i=Number(a.state);return!Number.isNaN(i)&&(void 0===e.above||i>Number(e.above))&&(void 0===e.below||i<Number(e.below))&&(void 0!==e.above||void 0!==e.below)}(e,t);case"screen":return function(e){return!(!e.media_query||"function"!=typeof matchMedia)&&matchMedia(e.media_query).matches}(e);case"time":return function(e,t=/* @__PURE__ */new Date){const a=void 0!==e.after,i=void 0!==e.before,o=Array.isArray(e.weekday)&&e.weekday.length>0;if(!a&&!i&&!o)return!1;const r=60*t.getHours()+t.getMinutes();let n=!0;if(a&&i){const t=Yt(e.after),a=Yt(e.before);if(null===t||null===a)return!1;n=t<=a?r>=t&&r<a:r>=t||r<a}else if(a){const t=Yt(e.after);if(null===t)return!1;n=r>=t}else if(i){const t=Yt(e.before);if(null===t)return!1;n=r<t}if(n&&o){const a=Ft[t.getDay()];n=e.weekday.map(e=>String(e).toLowerCase().slice(0,3)).includes(a)}return n}(e);case"user":return function(e,t){const a=t?.user?.id;return!(!a||!Array.isArray(e.users))&&e.users.includes(a)}(e,t);case"template":return function(e,t){return!(!t||!e.value_template)&&!0===t(e.value_template)}(e,a);case"and":return Xt(e).every(e=>Qt(e,t,a));case"or":return Xt(e).some(e=>Qt(e,t,a));case"not":return!Xt(e).some(e=>Qt(e,t,a));default:return!1}}function ea(e,t,a){return!e||0===e.length||(!t||e.every(e=>Qt(e,t,a)))}var ta=le(()=>{Ft=["sun","mon","tue","wed","thu","fri","sat"]});function aa(e){return"tabdeck-card:"+e}function ia(e,t,a){return e>=0&&e<t?e:a}function oa(e){return e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ra(e){const{mode:t,cardKey:a,defaultIndex:i,tabCount:o}=e;if("entity"===t){const t=Number(e.entityValue);return void 0!==e.entityValue&&Number.isFinite(t)?ia(Math.trunc(t),o,i):ia(i,o,0)}if("url"===t){const t=function(e,t){const a=/(?:^|[#&])tab=([^&]+)/.exec(e||"");if(!a)return null;const i=decodeURIComponent(a[1]),o=t.indexOf(i);if(o>=0)return o;const r=oa(i),n=r?t.findIndex(e=>oa(e)===r):-1;if(n>=0)return n;const s=Number(i);return Number.isInteger(s)&&s>=0?s:null}(e.hash??"",e.tabNames??[]);if(null!==t)return ia(t,o,i)}if("browser"===t){const t=(e.storage??globalThis.localStorage)?.getItem(aa(a));if(null!=t)return ia(Number(t),o,i)}return ia(i,o,0)}async function na(){const e=await window.loadCardHelpers();return t=>e.createCardElement(t)}ta();var sa,da=class extends EventTarget{constructor(e){super(),this._configs=[],this._elements=[],this._create=e}async build(e){this._configs=e.slice(),this._elements=e.map((e,t)=>this._make(e,t))}_make(e,t){if(!e)return;const a=this._create(e);return this._hass&&(a.hass=this._hass),a.addEventListener("ll-rebuild",e=>{e.stopPropagation(),this._rebuild(t)}),a}get(e){return this._elements[e]}all(){return this._elements}replace(e,t){this._configs[e]=t,this._elements[e]=this._make(t,e)}unload(e){this._elements[e]=void 0}isLoaded(e){return!!this._elements[e]}ensure(e){return!this._elements[e]&&this._configs[e]&&(this._elements[e]=this._make(this._configs[e],e)),this._elements[e]}setHass(e){this._hass=e;for(const t of this._elements)t&&(t.hass=e)}notifyVisible(e){const t=this._elements[e];t&&t.dispatchEvent(new Event("resize"))}async _rebuild(e){const t=this._make(this._configs[e],e);t&&(this._hass&&(t.hass=this._hass),this._elements[e]=t,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:e}})))}};function la(e){return(t,a,i)=>{const o=e()?.connection;if(!o?.subscribeMessage)return i(),()=>{};let r,n=!1;return Promise.resolve(o.subscribeMessage(e=>{e&&void 0!==e.error?i():a(e?.result)},{type:"render_template",template:t,report_errors:!0})).then(e=>{r=e,n&&e?.()}).catch(()=>i()),()=>{n=!0,r?.()}}}function ca(e){return"string"==typeof e&&(e.includes("{{")||e.includes("{%"))}var pa,ua,ha,ba,_a,ma,ga,va,ya,fa=le(()=>{sa=class extends EventTarget{constructor(e){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=e}track(e){const t=new Set(e.filter(e=>!!e));for(const[a,i]of this._entries)t.has(a)||(i.unsub(),this._entries.delete(a));for(const a of t){if(this._entries.has(a))continue;const e={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(a,e),e.unsub=this._subscribe(a,t=>{e.result=t,e.hasResult=!0,e.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:a}}))},()=>{e.error=!0,e.hasResult=!1,e.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:a}}))})}}result(e){const t=this._entries.get(e);if(t&&!t.error&&t.hasResult)return t.result}boolean(e){const t=this._entries.get(e);return!(!t||t.error||!t.hasResult)&&("boolean"==typeof(a=t.result)?a:"number"==typeof a?0!==a:"string"==typeof a&&["1","true","yes","on","enable"].includes(a.trim().toLowerCase()));var a}destroy(){for(const e of this._entries.values())e.unsub();this._entries.clear()}}}),ka=le(()=>{pa={"editor.tab.name":"Tab name","editor.tab.subtitle":"Subtitle","editor.tab.icon":"Icon","editor.tab.accent":"Accent colour","editor.tab.color":"Text/icon colour","editor.tab.badge":"Badge (entity id or template)","editor.tab.badge_color":"Badge colour","editor.tab.disabled":"Disable tab (greyed, not selectable)","editor.tab.card_size":"Card size hint (rows)","editor.tab.hold_action":"Long-press action","editor.tab.badge_action":"Badge tap action","editor.tab.tap_action":"Tap action (replaces opening the tab, e.g. navigate)","editor.tab.enter_action":"Action when this tab is opened","editor.tab.leave_action":"Action when leaving this tab","editor.global.preset":"Style preset (applies a bundle of the options below)","editor.global.position":"Position","editor.global.style":"Style","editor.global.tab_display":"Tab display","editor.global.align":"Tab alignment","editor.global.badge_display":"Badge display","editor.global.hide_inactive_badge":"Hide inactive badges (0/off)","editor.global.transition":"Panel transition","editor.global.indicator_size":"Indicator thickness (px)","editor.global.indicator_radius":"Indicator corner radius (px)","editor.global.remember":"Remember selected tab","editor.global.remember_entity":"Remember entity (input_number/input_text)","editor.global.storage_key":"Storage key (browser mode)","editor.global.default_tab":"Default tab","editor.global.scrollable":"Scrollable","editor.global.lazy":"Lazy-mount inactive tabs","editor.global.unmount_hidden":"Unmount hidden tabs (save memory)","editor.global.swipe_wrap":"Swipe wraps around ends","editor.global.animated":"Animate indicator","editor.global.accent_indicator":"Colour indicator by tab accent","editor.global.header":"Show header (active tab title above content)","editor.global.aria_label":"Accessible name for the tab bar","editor.global.sticky":"Sticky tab bar","editor.global.elevation":"Raise bar with shadow","editor.global.scroll_buttons":"Scroll buttons when bar overflows","editor.global.overflow_menu":"Overflow ⋯ menu when bar overflows","editor.global.bar_background":"Tab bar background colour","editor.global.swipe":"Swipe to change tabs (mobile)","editor.global.swipe_mouse":"Mouse drag to change tabs (desktop)","editor.global.tab_display_narrow":"Tab display on narrow cards","editor.global.narrow_width":"Narrow below (px)","editor.global.split":"Side-by-side split at or above width (px, 0 = off)","editor.global.collapsible":"Collapsible (tap the active tab to fold content)","editor.global.start_collapsed":"Start collapsed","editor.global.scroll_spy":"Scroll-spy: stack tabs as sections","editor.global.auto_rotate":"Auto-rotate tabs every (seconds, 0 = off)","editor.global.idle_return":"Return to default tab after idle (seconds, 0 = off)","editor.global.edit_mode_reveal":"Show hidden tabs while editing the dashboard","editor.cond.visibility.label":"Visibility","editor.cond.visibility.hint":"show the tab only when…","editor.cond.alert.label":"Alert","editor.cond.alert.hint":"pulse the tab when…","editor.cond.default_if.label":"Default when","editor.cond.default_if.hint":"start on this tab when…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} copy","editor.copied":'Copied tab "{name}" — paste it into Import tab.',"editor.clipboard_error":"Couldn't access the clipboard.","editor.import_error":"That doesn't look like a tab (needs a card, cards or tap_action).","editor.imported_one":"Imported 1 tab.","editor.imported_many":"Imported {count} tabs.","editor.import_hint":"Paste a tab (or a list of tabs) copied with Copy tab, or any tab YAML.","editor.add":"Add","editor.cancel":"Cancel","editor.warn_duplicates":'Duplicate tab names ({names}). "Remember: url" and default-tab-by-name may be ambiguous.',"editor.back":"Back","editor.change_type":"Change card type","editor.card_type":"Card type","editor.card_type_hint":"Choose a card type to configure it. Enter a custom type (e.g. custom:my-card) for cards not in the list.","editor.card_json":"Card (JSON)","editor.invalid_json":"Invalid JSON — not saved.","editor.expand_all":"Expand all","editor.collapse_all":"Collapse all","editor.drag":"Drag to reorder","editor.move_up":"Move up","editor.move_down":"Move down","editor.copy_tab":"Copy tab","editor.duplicate_tab":"Duplicate tab","editor.delete_tab":"Delete tab","editor.add_tab":"Add tab","editor.import_tab":"Import tab","editor.edit_card":"Edit card","editor.preview":"Preview","editor.opt.position.top":"Top","editor.opt.position.bottom":"Bottom","editor.opt.position.left":"Left","editor.opt.position.right":"Right","editor.opt.tab_display.both":"Icon and label","editor.opt.tab_display.icon":"Icon only","editor.opt.tab_display.label":"Label only","editor.opt.tab_display.active":"Icons; selected tab expanded","editor.opt.tab_display.":"(same as tab display)","editor.opt.align.start":"Start","editor.opt.align.center":"Centre","editor.opt.align.end":"End","editor.opt.align.justify":"Fill width","editor.opt.badge_display.text":"Text","editor.opt.badge_display.dot":"Dot","editor.opt.transition.none":"None","editor.opt.transition.fade":"Fade","editor.opt.transition.slide":"Slide","editor.opt.remember.none":"Don't remember","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"In the URL (#tab=)","editor.opt.remember.entity":"In a helper entity (all devices)","editor.opt.scrollable.auto":"Automatic","editor.opt.scrollable.true":"Always","editor.opt.scrollable.false":"Never","check.now_met":"Met right now","check.now_unmet":"Not met right now","check.chip_hidden":"Hidden now","check.chip_alert":"Alerting","check.chip_hidden_title":"This tab's visibility conditions aren't met, so it's hidden on the dashboard.","check.state_is":"{entity} is {values}","check.state_is_not":"{entity} is not {values}","check.or":" or ","check.now":"now: {value}","check.missing":"entity not found","check.numeric":"{entity} {range}","check.above":"above {value}","check.below":"below {value}","check.and":" and ","check.screen":"screen matches {query}","check.time":"time {range}","check.time_after":"after {value}","check.time_before":"before {value}","check.time_days":"on {days}","check.user":"current user is one of {count} selected","check.template":"template renders true","check.template_pending":"template (waiting for Home Assistant)","check.group_and":"all of:","check.group_or":"any of:","check.group_not":"none of:","check.unknown":"unknown condition type","card.tabs":"Tabs","card.scroll_left":"Scroll left","card.scroll_right":"Scroll right","card.all_tabs":"All tabs","card.badge":"badge: {value}","card.ghost":"Hidden: its visibility conditions aren't met (shown while editing)","starter.button":"Start from a template","starter.hint":"Build a deck from your own entities. Replace swaps out the current tabs; Add keeps them.","starter.pick":"Template","starter.replace":"Replace tabs","starter.append":"Add tabs","starter.cancel":"Cancel","starter.none":'Nothing to build: no matching entities found for "{name}".',"starter.done":'Added the "{name}" template.',"starter.kind.rooms":"Rooms: a tab per area","starter.kind.lights":"Lights: a tab per area with lights","starter.kind.security":"Security: alarm, cameras, doors & locks","starter.kind.media":"Media: a tab per media player","starter.kind.climate":"Climate: a tab per thermostat","starter.kind.energy":"Energy: the energy dashboard cards","starter.kind.family":"Family: a tab per person, with a map","starter.tab.alarm":"Alarm","starter.tab.cameras":"Cameras","starter.tab.openings":"Doors & windows","starter.tab.locks":"Locks","starter.tab.energy_now":"Now","starter.tab.energy_usage":"Usage","starter.tab.energy_sources":"Sources","starter.tab.energy_devices":"Devices","convert.button":"Convert from another card","convert.hint":"Paste the YAML of a tabbed-card, swipe-card, state-switch, a vertical/horizontal stack or grid, Bubble Card pop-ups, a conditional card, a sections view or a whole dashboard.","convert.detected":"Detected {source}: {count} tabs.","convert.replace":"Replace tabs","convert.append":"Add tabs","convert.cancel":"Cancel","convert.done":"Converted {count} tabs from {source}.","convert.error.empty":"There's nothing to convert in that list.","convert.error.not_card":"That doesn't look like a card, a list of cards, a view or a dashboard.","convert.error.no_tabs":"Nothing to convert: no cards found.","convert.source.tabdeck":"a Tabdeck card","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card pop-ups","convert.source.dashboard":"a dashboard (one tab per view)","convert.source.view":"a view","convert.source.sections":"a sections view (one tab per section)","convert.source.stack":"a stack (one tab per card or heading)","convert.source.cards":"cards","convert.note.styles":"Only --mdc-theme-primary was carried over (as --tabdeck-accent); other tabbed-card styles have no Tabdeck equivalent.","convert.note.tab_styles":"Per-tab styles from tabbed-card were not carried over.","convert.note.autoplay":"Autoplay became auto_rotate (seconds).","convert.note.state_switch_mode":"This state-switch mode (user / media query / template) has no direct equivalent; the states became plain tabs. Add visibility conditions if needed.","convert.note.bubble":"Each pop-up became a tab; the pop-up's own button and styling are not used.","convert.note.dashboard":"Each view became a tab. Large dashboards can make a heavy card; consider lazy: true.","editor.global.dock":"Dock: pin the bar to the bottom of the screen (phone navigation)","editor.tab.fab":"Floating action button style","editor.global.content_arrows":"Previous / next arrows over the content","editor.opt.tab_display.dots":"Dots","card.prev_tab":"Previous tab","card.next_tab":"Next tab","editor.global.search":"Quick-switch search (🔍 button)","editor.global.hotkeys":"Keyboard shortcuts (1–9, [ ], /)","card.search":"Find a tab","card.search_placeholder":"Type to filter…","card.search_none":"No matching tabs","editor.global.history":"Back button returns to the previous tab","editor.global.customize":"Let people reorder and hide tabs for themselves (per browser)","card.customize":"Arrange tabs","card.move_up":"Move {name} up","card.move_down":"Move {name} down","card.hide_tab":"Hide {name}","card.show_tab":"Show {name}","card.reset":"Reset","card.done":"Done","editor.global.rail_expand":"Side rail: icons only, labels on hover (left/right)","card.fullscreen":"Full screen","card.exit_fullscreen":"Exit full screen","editor.tab.background":"Background (colour, gradient or image URL)","editor.opt.transition.scale":"Scale","editor.opt.transition.flip":"Flip","editor.opt.transition.rise":"Rise","editor.global.transition_duration":"Transition duration (ms)","editor.global.transition_easing":"Transition easing (CSS, e.g. ease-out)","editor.global.content_height":"Content height (auto, tallest or e.g. 400px)","editor.global.content_max_height":"Maximum content height (scrolls inside)","editor.global.fullscreen":"Full-screen button","editor.global.swipe_peek":"Swipe peek (content follows the finger)","editor.global.unload_after":"Free unused tabs after (minutes, 0 = never)","editor.global.transition_narrow":"Transition on narrow cards (e.g. phones)","card.no_entities":"No entities here.","card.pin_title":"Enter the code for {tab}","card.pin_label":"Code","card.pin_wrong":"Wrong code","card.cancel":"Cancel","card.open":"Open","editor.tab.badge_icon":"Badge icon","editor.tab.ring":"Progress ring (entity, template or number)","editor.tab.ring_max":"Ring maximum (default 100)","editor.tab.ring_color":"Ring colour","editor.tab.area":"Area (no card: shows its entities as tiles)","editor.tab.pin":"PIN (a convenience lock, not security)","editor.tab.pin_timeout":"Unlock lasts (minutes, 0 = until reload)","editor.global.alert_first":"Move alerting tabs to the front","editor.global.alert_snooze":"Long-press snoozes an alert (minutes, 0 = off)","editor.global.remote_entity":"Follow this entity (its state picks the tab)","editor.global.remote_event":"Switch on tabdeck_select events (admin users)","editor.global.fire_event":"Fire tabdeck_tab_changed events (admin users)","editor.global.event_id":"Deck name in events"}}),wa=le(()=>{ua={"editor.tab.name":"Tab-Name","editor.tab.subtitle":"Untertitel","editor.tab.icon":"Symbol","editor.tab.accent":"Akzentfarbe","editor.tab.color":"Text-/Symbolfarbe","editor.tab.badge":"Badge (Entitäts-ID oder Template)","editor.tab.badge_color":"Badge-Farbe","editor.tab.disabled":"Tab deaktivieren (ausgegraut, nicht wählbar)","editor.tab.card_size":"Kartengröße (Zeilen)","editor.tab.hold_action":"Halten-Aktion","editor.tab.badge_action":"Tippen-Aktion für Badge","editor.tab.tap_action":"Tippen-Aktion (ersetzt das Öffnen des Tabs, z. B. navigate)","editor.tab.enter_action":"Aktion beim Öffnen dieses Tabs","editor.tab.leave_action":"Aktion beim Verlassen dieses Tabs","editor.global.preset":"Stilvorlage (setzt mehrere der folgenden Optionen)","editor.global.position":"Position","editor.global.style":"Stil","editor.global.tab_display":"Tab-Anzeige","editor.global.align":"Tab-Ausrichtung","editor.global.badge_display":"Badge-Anzeige","editor.global.hide_inactive_badge":"Inaktive Badges ausblenden (0/off)","editor.global.transition":"Übergang","editor.global.indicator_size":"Indikatorstärke (px)","editor.global.indicator_radius":"Indikator-Eckenradius (px)","editor.global.remember":"Ausgewählten Tab merken","editor.global.remember_entity":"Entität zum Merken (input_number/input_text)","editor.global.storage_key":"Speicherschlüssel (Browser-Modus)","editor.global.default_tab":"Standard-Tab","editor.global.scrollable":"Scrollbar","editor.global.lazy":"Inaktive Tabs erst bei Bedarf laden","editor.global.unmount_hidden":"Ausgeblendete Tabs entladen (spart Speicher)","editor.global.swipe_wrap":"Wischen springt vom Ende zum Anfang","editor.global.animated":"Indikator animieren","editor.global.accent_indicator":"Indikator in Akzentfarbe des Tabs","editor.global.header":"Kopfzeile anzeigen (Titel des aktiven Tabs über dem Inhalt)","editor.global.aria_label":"Barrierefreier Name der Tab-Leiste","editor.global.sticky":"Tab-Leiste fixieren","editor.global.elevation":"Leiste mit Schatten hervorheben","editor.global.scroll_buttons":"Scroll-Schaltflächen bei Überlauf","editor.global.overflow_menu":"Überlaufmenü ⋯ bei Überlauf","editor.global.bar_background":"Hintergrundfarbe der Tab-Leiste","editor.global.swipe":"Tabs per Wischen wechseln (Mobil)","editor.global.swipe_mouse":"Tabs per Mausziehen wechseln (Desktop)","editor.global.tab_display_narrow":"Tab-Anzeige bei schmalen Karten","editor.global.narrow_width":"Schmal unter (px)","editor.global.split":"Nebeneinander ab Breite (px, 0 = aus)","editor.global.collapsible":"Einklappbar (aktiven Tab antippen zum Einklappen)","editor.global.start_collapsed":"Eingeklappt starten","editor.global.scroll_spy":"Scroll-Spy: Tabs als Abschnitte untereinander","editor.global.auto_rotate":"Tabs automatisch wechseln alle (Sekunden, 0 = aus)","editor.global.idle_return":"Nach Inaktivität zum Standard-Tab (Sekunden, 0 = aus)","editor.global.edit_mode_reveal":"Ausgeblendete Tabs beim Bearbeiten des Dashboards anzeigen","editor.cond.visibility.label":"Sichtbarkeit","editor.cond.visibility.hint":"Tab nur anzeigen, wenn…","editor.cond.alert.label":"Hinweis","editor.cond.alert.hint":"Tab pulsieren lassen, wenn…","editor.cond.default_if.label":"Standard wenn","editor.cond.default_if.hint":"mit diesem Tab starten, wenn…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} Kopie","editor.copied":'Tab "{name}" kopiert – unter Tab importieren einfügen.',"editor.clipboard_error":"Kein Zugriff auf die Zwischenablage.","editor.import_error":"Das sieht nicht nach einem Tab aus (benötigt card, cards oder tap_action).","editor.imported_one":"1 Tab importiert.","editor.imported_many":"{count} Tabs importiert.","editor.import_hint":"Einen mit Tab kopieren kopierten Tab (oder eine Liste von Tabs) oder beliebiges Tab-YAML einfügen.","editor.add":"Hinzufügen","editor.cancel":"Abbrechen","editor.warn_duplicates":'Doppelte Tab-Namen ({names}). "Remember: url" und Standard-Tab per Name können mehrdeutig sein.',"editor.back":"Zurück","editor.change_type":"Kartentyp ändern","editor.card_type":"Kartentyp","editor.card_type_hint":"Kartentyp zum Konfigurieren auswählen. Für Karten, die nicht in der Liste stehen, einen eigenen Typ eingeben (z. B. custom:my-card).","editor.card_json":"Karte (JSON)","editor.invalid_json":"Ungültiges JSON – nicht gespeichert.","editor.expand_all":"Alle ausklappen","editor.collapse_all":"Alle einklappen","editor.drag":"Zum Sortieren ziehen","editor.move_up":"Nach oben","editor.move_down":"Nach unten","editor.copy_tab":"Tab kopieren","editor.duplicate_tab":"Tab duplizieren","editor.delete_tab":"Tab löschen","editor.add_tab":"Tab hinzufügen","editor.import_tab":"Tab importieren","editor.edit_card":"Karte bearbeiten","editor.preview":"Vorschau","editor.opt.position.top":"Oben","editor.opt.position.bottom":"Unten","editor.opt.position.left":"Links","editor.opt.position.right":"Rechts","editor.opt.tab_display.both":"Symbol und Beschriftung","editor.opt.tab_display.icon":"Nur Symbol","editor.opt.tab_display.label":"Nur Beschriftung","editor.opt.tab_display.active":"Symbole; ausgewählter Tab erweitert","editor.opt.tab_display.":"(wie Tab-Anzeige)","editor.opt.align.start":"Anfang","editor.opt.align.center":"Mitte","editor.opt.align.end":"Ende","editor.opt.align.justify":"Volle Breite","editor.opt.badge_display.text":"Text","editor.opt.badge_display.dot":"Punkt","editor.opt.transition.none":"Keiner","editor.opt.transition.fade":"Überblenden","editor.opt.transition.slide":"Schieben","editor.opt.remember.none":"Nicht merken","editor.opt.remember.browser":"Pro Browser","editor.opt.remember.url":"In der URL (#tab=)","editor.opt.remember.entity":"In einer Helfer-Entität (alle Geräte)","editor.opt.scrollable.auto":"Automatisch","editor.opt.scrollable.true":"Immer","editor.opt.scrollable.false":"Nie","check.now_met":"Aktuell erfüllt","check.now_unmet":"Aktuell nicht erfüllt","check.chip_hidden":"Gerade ausgeblendet","check.chip_alert":"Hinweis aktiv","check.chip_hidden_title":"Die Sichtbarkeitsbedingungen dieses Tabs sind nicht erfüllt, daher ist er im Dashboard ausgeblendet.","check.state_is":"{entity} ist {values}","check.state_is_not":"{entity} ist nicht {values}","check.or":" oder ","check.now":"aktuell: {value}","check.missing":"Entität nicht gefunden","check.numeric":"{entity} {range}","check.above":"über {value}","check.below":"unter {value}","check.and":" und ","check.screen":"Bildschirm entspricht {query}","check.time":"Zeit {range}","check.time_after":"nach {value}","check.time_before":"vor {value}","check.time_days":"am {days}","check.user":"aktueller Benutzer ist einer von {count} ausgewählten","check.template":"Template ergibt true","check.template_pending":"Template (warte auf Home Assistant)","check.group_and":"alle von:","check.group_or":"eine von:","check.group_not":"keine von:","check.unknown":"unbekannter Bedingungstyp","card.tabs":"Tabs","card.scroll_left":"Nach links scrollen","card.scroll_right":"Nach rechts scrollen","card.all_tabs":"Alle Tabs","card.badge":"Badge: {value}","card.ghost":"Ausgeblendet: Sichtbarkeitsbedingungen nicht erfüllt (beim Bearbeiten sichtbar)","starter.button":"Mit einer Vorlage starten","starter.hint":"Ein Deck aus den eigenen Entitäten erstellen. Ersetzen tauscht die aktuellen Tabs aus; Hinzufügen behält sie.","starter.pick":"Vorlage","starter.replace":"Tabs ersetzen","starter.append":"Tabs hinzufügen","starter.cancel":"Abbrechen","starter.none":'Nichts zu erstellen: keine passenden Entitäten für "{name}" gefunden.',"starter.done":'Vorlage "{name}" hinzugefügt.',"starter.kind.rooms":"Räume: ein Tab pro Bereich","starter.kind.lights":"Licht: ein Tab pro Bereich mit Lichtern","starter.kind.security":"Sicherheit: Alarm, Kameras, Türen & Schlösser","starter.kind.media":"Medien: ein Tab pro Media-Player","starter.kind.climate":"Klima: ein Tab pro Thermostat","starter.kind.energy":"Energie: die Karten des Energie-Dashboards","starter.kind.family":"Familie: ein Tab pro Person, mit Standortkarte","starter.tab.alarm":"Alarm","starter.tab.cameras":"Kameras","starter.tab.openings":"Türen & Fenster","starter.tab.locks":"Schlösser","starter.tab.energy_now":"Jetzt","starter.tab.energy_usage":"Verbrauch","starter.tab.energy_sources":"Quellen","starter.tab.energy_devices":"Geräte","convert.button":"Von anderer Karte konvertieren","convert.hint":"YAML einfügen von: tabbed-card, swipe-card, state-switch, vertikalem/horizontalem Stapel oder Raster, Bubble Card Pop-ups, bedingter Karte, Abschnittsansicht oder ganzem Dashboard.","convert.detected":"{source} erkannt: {count} Tabs.","convert.replace":"Tabs ersetzen","convert.append":"Tabs hinzufügen","convert.cancel":"Abbrechen","convert.done":"{count} Tabs aus {source} konvertiert.","convert.error.empty":"In dieser Liste gibt es nichts zu konvertieren.","convert.error.not_card":"Das sieht nicht nach einer Karte, Kartenliste, Ansicht oder einem Dashboard aus.","convert.error.no_tabs":"Nichts zu konvertieren: keine Karten gefunden.","convert.source.tabdeck":"eine Tabdeck-Karte","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card Pop-ups","convert.source.dashboard":"ein Dashboard (ein Tab pro Ansicht)","convert.source.view":"eine Ansicht","convert.source.sections":"eine Abschnittsansicht (ein Tab pro Abschnitt)","convert.source.stack":"ein Stapel (ein Tab pro Karte oder Überschrift)","convert.source.cards":"Karten","convert.note.styles":"Nur --mdc-theme-primary wurde übernommen (als --tabdeck-accent); andere tabbed-card-Stile haben in Tabdeck keine Entsprechung.","convert.note.tab_styles":"Tab-spezifische Stile aus tabbed-card wurden nicht übernommen.","convert.note.autoplay":"Autoplay wurde zu auto_rotate (Sekunden).","convert.note.state_switch_mode":"Dieser state-switch-Modus (Benutzer / Media Query / Template) hat keine direkte Entsprechung; die Zustände wurden zu normalen Tabs. Bei Bedarf Sichtbarkeitsbedingungen hinzufügen.","convert.note.bubble":"Jedes Pop-up wurde zu einem Tab; Schaltfläche und Styling des Pop-ups werden nicht verwendet.","convert.note.dashboard":"Jede Ansicht wurde zu einem Tab. Große Dashboards können eine schwere Karte ergeben; lazy: true erwägen.","editor.global.dock":"Dock: Leiste unten am Bildschirm fixieren (Handy-Navigation)","editor.tab.fab":"Als schwebende Aktionsschaltfläche","editor.global.content_arrows":"Zurück-/Weiter-Pfeile über dem Inhalt","editor.opt.tab_display.dots":"Punkte","card.prev_tab":"Vorheriger Tab","card.next_tab":"Nächster Tab","editor.global.search":"Schnellsuche (🔍-Schaltfläche)","editor.global.hotkeys":"Tastenkürzel (1–9, [ ], /)","card.search":"Tab suchen","card.search_placeholder":"Zum Filtern tippen…","card.search_none":"Keine passenden Tabs","editor.global.history":"Zurück-Taste kehrt zum vorherigen Tab zurück","editor.global.customize":"Nutzer können Tabs für sich umsortieren und ausblenden (pro Browser)","card.customize":"Tabs anordnen","card.move_up":"{name} nach oben","card.move_down":"{name} nach unten","card.hide_tab":"{name} ausblenden","card.show_tab":"{name} einblenden","card.reset":"Zurücksetzen","card.done":"Fertig","editor.global.rail_expand":"Seitenleiste: nur Symbole, Beschriftungen beim Überfahren (links/rechts)","card.fullscreen":"Vollbild","card.exit_fullscreen":"Vollbild beenden","editor.tab.background":"Hintergrund (Farbe, Verlauf oder Bild-URL)","editor.opt.transition.scale":"Zoom","editor.opt.transition.flip":"Drehen","editor.opt.transition.rise":"Von unten","editor.global.transition_duration":"Übergangsdauer (ms)","editor.global.transition_easing":"Übergangskurve (CSS, z. B. ease-out)","editor.global.content_height":"Inhaltshöhe (auto, tallest oder z. B. 400px)","editor.global.content_max_height":"Maximale Inhaltshöhe (scrollt innen)","editor.global.fullscreen":"Vollbild-Schaltfläche","editor.global.swipe_peek":"Wisch-Vorschau (Inhalt folgt dem Finger)","editor.global.unload_after":"Unbenutzte Tabs freigeben nach (Minuten, 0 = nie)","editor.global.transition_narrow":"Übergang auf schmalen Karten (z. B. Handys)","card.no_entities":"Hier gibt es keine Entitäten.","card.pin_title":"Code für {tab} eingeben","card.pin_label":"Code","card.pin_wrong":"Falscher Code","card.cancel":"Abbrechen","card.open":"Öffnen","editor.tab.badge_icon":"Badge-Symbol","editor.tab.ring":"Fortschrittsring (Entität, Template oder Zahl)","editor.tab.ring_max":"Ring-Maximum (Standard 100)","editor.tab.ring_color":"Ringfarbe","editor.tab.area":"Bereich (ohne Karte: zeigt seine Entitäten als Kacheln)","editor.tab.pin":"PIN (Komfortsperre, kein Schutz)","editor.tab.pin_timeout":"Entsperrung gilt (Minuten, 0 = bis Neuladen)","editor.global.alert_first":"Alarmierende Tabs nach vorne","editor.global.alert_snooze":"Langes Drücken pausiert einen Alarm (Minuten, 0 = aus)","editor.global.remote_entity":"Dieser Entität folgen (ihr Zustand wählt den Tab)","editor.global.remote_event":"Bei tabdeck_select-Ereignissen wechseln (Admins)","editor.global.fire_event":"tabdeck_tab_changed-Ereignisse auslösen (Admins)","editor.global.event_id":"Name des Decks in Ereignissen"}}),xa=le(()=>{ha={"editor.tab.name":"Nombre de la pestaña","editor.tab.subtitle":"Subtítulo","editor.tab.icon":"Icono","editor.tab.accent":"Color de acento","editor.tab.color":"Color de texto/icono","editor.tab.badge":"Distintivo (id de entidad o plantilla)","editor.tab.badge_color":"Color del distintivo","editor.tab.disabled":"Desactivar pestaña (atenuada, no seleccionable)","editor.tab.card_size":"Tamaño orientativo de la tarjeta (filas)","editor.tab.hold_action":"Acción al mantener pulsado","editor.tab.badge_action":"Acción al tocar el distintivo","editor.tab.tap_action":"Acción al tocar (en lugar de abrir la pestaña, p. ej. navegar)","editor.tab.enter_action":"Acción al abrir esta pestaña","editor.tab.leave_action":"Acción al salir de esta pestaña","editor.global.preset":"Estilo predefinido (aplica un conjunto de las opciones siguientes)","editor.global.position":"Posición","editor.global.style":"Estilo","editor.global.tab_display":"Visualización de pestañas","editor.global.align":"Alineación de pestañas","editor.global.badge_display":"Visualización de distintivos","editor.global.hide_inactive_badge":"Ocultar distintivos inactivos (0/off)","editor.global.transition":"Transición del contenido","editor.global.indicator_size":"Grosor del indicador (px)","editor.global.indicator_radius":"Radio de esquina del indicador (px)","editor.global.remember":"Recordar la pestaña seleccionada","editor.global.remember_entity":"Entidad para recordar (input_number/input_text)","editor.global.storage_key":"Clave de almacenamiento (modo navegador)","editor.global.default_tab":"Pestaña predeterminada","editor.global.scrollable":"Desplazable","editor.global.lazy":"Carga diferida de pestañas inactivas","editor.global.unmount_hidden":"Descargar pestañas ocultas (ahorra memoria)","editor.global.swipe_wrap":"Deslizar de forma circular","editor.global.animated":"Animar indicador","editor.global.accent_indicator":"Colorear indicador con el acento de la pestaña","editor.global.header":"Mostrar encabezado (título de la pestaña activa sobre el contenido)","editor.global.aria_label":"Nombre accesible de la barra de pestañas","editor.global.sticky":"Barra de pestañas fija","editor.global.elevation":"Elevar barra con sombra","editor.global.scroll_buttons":"Botones de desplazamiento si la barra no cabe","editor.global.overflow_menu":"Menú ⋯ si la barra no cabe","editor.global.bar_background":"Color de fondo de la barra de pestañas","editor.global.swipe":"Deslizar para cambiar de pestaña (móvil)","editor.global.swipe_mouse":"Arrastrar con el ratón para cambiar de pestaña (escritorio)","editor.global.tab_display_narrow":"Visualización de pestañas en tarjetas estrechas","editor.global.narrow_width":"Estrecha por debajo de (px)","editor.global.split":"Vista dividida a partir de este ancho (px, 0 = desactivado)","editor.global.collapsible":"Plegable (toca la pestaña activa para plegar el contenido)","editor.global.start_collapsed":"Iniciar plegada","editor.global.scroll_spy":"Scroll-spy: apilar pestañas como secciones","editor.global.auto_rotate":"Rotar pestañas automáticamente cada (segundos, 0 = desactivado)","editor.global.idle_return":"Volver a la pestaña predeterminada tras inactividad (segundos, 0 = desactivado)","editor.global.edit_mode_reveal":"Mostrar pestañas ocultas al editar el panel de control","editor.cond.visibility.label":"Visibilidad","editor.cond.visibility.hint":"mostrar la pestaña solo cuando…","editor.cond.alert.label":"Alerta","editor.cond.alert.hint":"hacer parpadear la pestaña cuando…","editor.cond.default_if.label":"Predeterminada cuando","editor.cond.default_if.hint":"empezar en esta pestaña cuando…","editor.tab_n":"Pestaña {n}","editor.copy_name":"Copia de {name}","editor.copied":'Pestaña "{name}" copiada: pégala en Importar pestaña.',"editor.clipboard_error":"No se pudo acceder al portapapeles.","editor.import_error":"Eso no parece una pestaña (necesita card, cards o tap_action).","editor.imported_one":"1 pestaña importada.","editor.imported_many":"{count} pestañas importadas.","editor.import_hint":"Pega una pestaña (o una lista de pestañas) copiada con Copiar pestaña, o cualquier YAML de pestaña.","editor.add":"Añadir","editor.cancel":"Cancelar","editor.warn_duplicates":'Nombres de pestaña duplicados ({names}). "Remember: url" y la pestaña predeterminada por nombre pueden ser ambiguos.',"editor.back":"Atrás","editor.change_type":"Cambiar tipo de tarjeta","editor.card_type":"Tipo de tarjeta","editor.card_type_hint":"Elige un tipo de tarjeta para configurarla. Introduce un tipo personalizado (p. ej. custom:my-card) para tarjetas que no estén en la lista.","editor.card_json":"Tarjeta (JSON)","editor.invalid_json":"JSON no válido: no se ha guardado.","editor.expand_all":"Expandir todo","editor.collapse_all":"Contraer todo","editor.drag":"Arrastrar para reordenar","editor.move_up":"Subir","editor.move_down":"Bajar","editor.copy_tab":"Copiar pestaña","editor.duplicate_tab":"Duplicar pestaña","editor.delete_tab":"Eliminar pestaña","editor.add_tab":"Añadir pestaña","editor.import_tab":"Importar pestaña","editor.edit_card":"Editar tarjeta","editor.preview":"Vista previa","editor.opt.position.top":"Arriba","editor.opt.position.bottom":"Abajo","editor.opt.position.left":"Izquierda","editor.opt.position.right":"Derecha","editor.opt.tab_display.both":"Icono y etiqueta","editor.opt.tab_display.icon":"Solo icono","editor.opt.tab_display.label":"Solo etiqueta","editor.opt.tab_display.active":"Iconos; pestaña seleccionada expandida","editor.opt.tab_display.":"(igual que la visualización de pestañas)","editor.opt.align.start":"Inicio","editor.opt.align.center":"Centro","editor.opt.align.end":"Final","editor.opt.align.justify":"Ancho completo","editor.opt.badge_display.text":"Texto","editor.opt.badge_display.dot":"Punto","editor.opt.transition.none":"Ninguna","editor.opt.transition.fade":"Fundido","editor.opt.transition.slide":"Deslizamiento","editor.opt.remember.none":"No recordar","editor.opt.remember.browser":"Por navegador","editor.opt.remember.url":"En la URL (#tab=)","editor.opt.remember.entity":"En una entidad ayudante (todos los dispositivos)","editor.opt.scrollable.auto":"Automático","editor.opt.scrollable.true":"Siempre","editor.opt.scrollable.false":"Nunca","check.now_met":"Se cumple ahora","check.now_unmet":"No se cumple ahora","check.chip_hidden":"Oculta ahora","check.chip_alert":"En alerta","check.chip_hidden_title":"Las condiciones de visibilidad de esta pestaña no se cumplen, por lo que está oculta en el panel de control.","check.state_is":"{entity} es {values}","check.state_is_not":"{entity} no es {values}","check.or":" o ","check.now":"ahora: {value}","check.missing":"entidad no encontrada","check.numeric":"{entity} {range}","check.above":"por encima de {value}","check.below":"por debajo de {value}","check.and":" y ","check.screen":"la pantalla coincide con {query}","check.time":"hora {range}","check.time_after":"después de {value}","check.time_before":"antes de {value}","check.time_days":"los días {days}","check.user":"el usuario actual es uno de los {count} seleccionados","check.template":"la plantilla devuelve true","check.template_pending":"plantilla (esperando a Home Assistant)","check.group_and":"todas:","check.group_or":"alguna:","check.group_not":"ninguna:","check.unknown":"tipo de condición desconocido","card.tabs":"Pestañas","card.scroll_left":"Desplazar a la izquierda","card.scroll_right":"Desplazar a la derecha","card.all_tabs":"Todas las pestañas","card.badge":"distintivo: {value}","card.ghost":"Oculta: no se cumplen sus condiciones de visibilidad (se muestra al editar)","starter.button":"Empezar desde una plantilla","starter.hint":"Crea un conjunto de pestañas con tus propias entidades. Reemplazar sustituye las pestañas actuales; Añadir las conserva.","starter.pick":"Plantilla","starter.replace":"Reemplazar pestañas","starter.append":"Añadir pestañas","starter.cancel":"Cancelar","starter.none":'Nada que crear: no se encontraron entidades para "{name}".',"starter.done":'Plantilla "{name}" añadida.',"starter.kind.rooms":"Habitaciones: una pestaña por área","starter.kind.lights":"Luces: una pestaña por área con luces","starter.kind.security":"Seguridad: alarma, cámaras, puertas y cerraduras","starter.kind.media":"Multimedia: una pestaña por reproductor","starter.kind.climate":"Climatización: una pestaña por termostato","starter.kind.energy":"Energía: las tarjetas del panel de energía","starter.kind.family":"Familia: una pestaña por persona, con mapa","starter.tab.alarm":"Alarma","starter.tab.cameras":"Cámaras","starter.tab.openings":"Puertas y ventanas","starter.tab.locks":"Cerraduras","starter.tab.energy_now":"Ahora","starter.tab.energy_usage":"Consumo","starter.tab.energy_sources":"Fuentes","starter.tab.energy_devices":"Dispositivos","convert.button":"Convertir desde otra tarjeta","convert.hint":"Pega el YAML de un tabbed-card, swipe-card, state-switch, una pila vertical/horizontal o cuadrícula, ventanas emergentes de Bubble Card, una tarjeta condicional, una vista de secciones o un panel de control completo.","convert.detected":"Detectado {source}: {count} pestañas.","convert.replace":"Reemplazar pestañas","convert.append":"Añadir pestañas","convert.cancel":"Cancelar","convert.done":"{count} pestañas convertidas desde {source}.","convert.error.empty":"No hay nada que convertir en esa lista.","convert.error.not_card":"Eso no parece una tarjeta, una lista de tarjetas, una vista ni un panel de control.","convert.error.no_tabs":"Nada que convertir: no se encontraron tarjetas.","convert.source.tabdeck":"una tarjeta Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"ventanas emergentes de Bubble Card","convert.source.dashboard":"un panel de control (una pestaña por vista)","convert.source.view":"una vista","convert.source.sections":"una vista de secciones (una pestaña por sección)","convert.source.stack":"una pila (una pestaña por tarjeta o encabezado)","convert.source.cards":"tarjetas","convert.note.styles":"Solo se ha conservado --mdc-theme-primary (como --tabdeck-accent); los demás estilos de tabbed-card no tienen equivalente en Tabdeck.","convert.note.tab_styles":"No se han conservado los estilos por pestaña de tabbed-card.","convert.note.autoplay":"Autoplay se ha convertido en auto_rotate (segundos).","convert.note.state_switch_mode":"Este modo de state-switch (usuario / media query / plantilla) no tiene equivalente directo; los estados se han convertido en pestañas normales. Añade condiciones de visibilidad si es necesario.","convert.note.bubble":"Cada ventana emergente se ha convertido en una pestaña; no se usan el botón ni el estilo propios de la ventana emergente.","convert.note.dashboard":"Cada vista se ha convertido en una pestaña. Los paneles de control grandes pueden generar una tarjeta pesada; considera lazy: true.","editor.global.dock":"Dock: fijar la barra en la parte inferior de la pantalla (navegación móvil)","editor.tab.fab":"Estilo de botón de acción flotante","editor.global.content_arrows":"Flechas anterior / siguiente sobre el contenido","editor.opt.tab_display.dots":"Puntos","card.prev_tab":"Pestaña anterior","card.next_tab":"Pestaña siguiente","editor.global.search":"Búsqueda rápida (botón 🔍)","editor.global.hotkeys":"Atajos de teclado (1–9, [ ], /)","card.search":"Buscar una pestaña","card.search_placeholder":"Escribe para filtrar…","card.search_none":"No hay pestañas que coincidan","editor.global.history":"El botón Atrás vuelve a la pestaña anterior","editor.global.customize":"Permitir que cada persona reordene y oculte pestañas (por navegador)","card.customize":"Organizar pestañas","card.move_up":"Subir {name}","card.move_down":"Bajar {name}","card.hide_tab":"Ocultar {name}","card.show_tab":"Mostrar {name}","card.reset":"Restablecer","card.done":"Listo","editor.global.rail_expand":"Barra lateral: solo iconos, etiquetas al pasar el ratón (izquierda/derecha)","card.fullscreen":"Pantalla completa","card.exit_fullscreen":"Salir de pantalla completa","editor.tab.background":"Fondo (color, degradado o URL de imagen)","editor.opt.transition.scale":"Escala","editor.opt.transition.flip":"Giro","editor.opt.transition.rise":"Desde abajo","editor.global.transition_duration":"Duración de la transición (ms)","editor.global.transition_easing":"Curva de la transición (CSS, p. ej. ease-out)","editor.global.content_height":"Altura del contenido (auto, tallest o p. ej. 400px)","editor.global.content_max_height":"Altura máxima del contenido (desplazamiento interno)","editor.global.fullscreen":"Botón de pantalla completa","editor.global.swipe_peek":"Vista previa al deslizar (el contenido sigue al dedo)","editor.global.unload_after":"Liberar pestañas sin uso tras (minutos, 0 = nunca)","editor.global.transition_narrow":"Transición en tarjetas estrechas (p. ej. móviles)","card.no_entities":"No hay entidades aquí.","card.pin_title":"Introduce el código de {tab}","card.pin_label":"Código","card.pin_wrong":"Código incorrecto","card.cancel":"Cancelar","card.open":"Abrir","editor.tab.badge_icon":"Icono de la insignia","editor.tab.ring":"Anillo de progreso (entidad, plantilla o número)","editor.tab.ring_max":"Máximo del anillo (por defecto 100)","editor.tab.ring_color":"Color del anillo","editor.tab.area":"Área (sin tarjeta: muestra sus entidades como mosaicos)","editor.tab.pin":"PIN (bloqueo de comodidad, no de seguridad)","editor.tab.pin_timeout":"El desbloqueo dura (minutos, 0 = hasta recargar)","editor.global.alert_first":"Mover al principio las pestañas con alerta","editor.global.alert_snooze":"Pulsación larga pospone una alerta (minutos, 0 = no)","editor.global.remote_entity":"Seguir esta entidad (su estado elige la pestaña)","editor.global.remote_event":"Cambiar con eventos tabdeck_select (administradores)","editor.global.fire_event":"Lanzar eventos tabdeck_tab_changed (administradores)","editor.global.event_id":"Nombre de la tarjeta en los eventos"}}),za=le(()=>{ba={"editor.tab.name":"Nom de l'onglet","editor.tab.subtitle":"Sous-titre","editor.tab.icon":"Icône","editor.tab.accent":"Couleur d'accent","editor.tab.color":"Couleur du texte/de l'icône","editor.tab.badge":"Badge (ID d'entité ou modèle)","editor.tab.badge_color":"Couleur du badge","editor.tab.disabled":"Désactiver l'onglet (grisé, non sélectionnable)","editor.tab.card_size":"Taille de carte indicative (lignes)","editor.tab.hold_action":"Action d'appui long","editor.tab.badge_action":"Action d'appui sur le badge","editor.tab.tap_action":"Action d'appui (remplace l'ouverture de l'onglet, ex. naviguer)","editor.tab.enter_action":"Action à l'ouverture de cet onglet","editor.tab.leave_action":"Action en quittant cet onglet","editor.global.preset":"Style prédéfini (applique un ensemble des options ci-dessous)","editor.global.position":"Position","editor.global.style":"Style","editor.global.tab_display":"Affichage des onglets","editor.global.align":"Alignement des onglets","editor.global.badge_display":"Affichage des badges","editor.global.hide_inactive_badge":"Masquer les badges inactifs (0/off)","editor.global.transition":"Transition du panneau","editor.global.indicator_size":"Épaisseur de l'indicateur (px)","editor.global.indicator_radius":"Rayon des coins de l'indicateur (px)","editor.global.remember":"Mémoriser l'onglet sélectionné","editor.global.remember_entity":"Entité de mémorisation (input_number/input_text)","editor.global.storage_key":"Clé de stockage (mode navigateur)","editor.global.default_tab":"Onglet par défaut","editor.global.scrollable":"Défilement","editor.global.lazy":"Chargement différé des onglets inactifs","editor.global.unmount_hidden":"Décharger les onglets masqués (économise la mémoire)","editor.global.swipe_wrap":"Le balayage boucle aux extrémités","editor.global.animated":"Animer l'indicateur","editor.global.accent_indicator":"Colorer l'indicateur avec l'accent de l'onglet","editor.global.header":"Afficher l'en-tête (titre de l'onglet actif au-dessus du contenu)","editor.global.aria_label":"Nom accessible de la barre d'onglets","editor.global.sticky":"Barre d'onglets fixe","editor.global.elevation":"Surélever la barre avec une ombre","editor.global.scroll_buttons":"Boutons de défilement si la barre déborde","editor.global.overflow_menu":"Menu ⋯ si la barre déborde","editor.global.bar_background":"Couleur de fond de la barre d'onglets","editor.global.swipe":"Balayer pour changer d'onglet (mobile)","editor.global.swipe_mouse":"Glisser à la souris pour changer d'onglet (ordinateur)","editor.global.tab_display_narrow":"Affichage des onglets sur les cartes étroites","editor.global.narrow_width":"Étroite en dessous de (px)","editor.global.split":"Vue côte à côte à partir de la largeur (px, 0 = désactivé)","editor.global.collapsible":"Repliable (appuyer sur l'onglet actif pour replier le contenu)","editor.global.start_collapsed":"Replié au démarrage","editor.global.scroll_spy":"Défilement suivi : empiler les onglets en sections","editor.global.auto_rotate":"Rotation automatique des onglets toutes les (secondes, 0 = désactivé)","editor.global.idle_return":"Revenir à l'onglet par défaut après inactivité (secondes, 0 = désactivé)","editor.global.edit_mode_reveal":"Afficher les onglets masqués pendant la modification du tableau de bord","editor.cond.visibility.label":"Visibilité","editor.cond.visibility.hint":"afficher l'onglet uniquement si…","editor.cond.alert.label":"Alerte","editor.cond.alert.hint":"faire clignoter l'onglet si…","editor.cond.default_if.label":"Par défaut si","editor.cond.default_if.hint":"démarrer sur cet onglet si…","editor.tab_n":"Onglet {n}","editor.copy_name":"{name} (copie)","editor.copied":"Onglet « {name} » copié — collez-le dans Importer un onglet.","editor.clipboard_error":"Impossible d'accéder au presse-papiers.","editor.import_error":"Ceci ne ressemble pas à un onglet (il faut card, cards ou tap_action).","editor.imported_one":"1 onglet importé.","editor.imported_many":"{count} onglets importés.","editor.import_hint":"Collez un onglet (ou une liste d'onglets) copié avec Copier l'onglet, ou tout YAML d'onglet.","editor.add":"Ajouter","editor.cancel":"Annuler","editor.warn_duplicates":"Noms d'onglets en double ({names}). « Remember: url » et l'onglet par défaut par nom peuvent être ambigus.","editor.back":"Retour","editor.change_type":"Changer le type de carte","editor.card_type":"Type de carte","editor.card_type_hint":"Choisissez un type de carte pour la configurer. Saisissez un type personnalisé (ex. custom:my-card) pour les cartes absentes de la liste.","editor.card_json":"Carte (JSON)","editor.invalid_json":"JSON invalide — non enregistré.","editor.expand_all":"Tout déplier","editor.collapse_all":"Tout replier","editor.drag":"Glisser pour réorganiser","editor.move_up":"Monter","editor.move_down":"Descendre","editor.copy_tab":"Copier l'onglet","editor.duplicate_tab":"Dupliquer l'onglet","editor.delete_tab":"Supprimer l'onglet","editor.add_tab":"Ajouter un onglet","editor.import_tab":"Importer un onglet","editor.edit_card":"Modifier la carte","editor.preview":"Aperçu","editor.opt.position.top":"Haut","editor.opt.position.bottom":"Bas","editor.opt.position.left":"Gauche","editor.opt.position.right":"Droite","editor.opt.tab_display.both":"Icône et libellé","editor.opt.tab_display.icon":"Icône seule","editor.opt.tab_display.label":"Libellé seul","editor.opt.tab_display.active":"Icônes ; onglet sélectionné déplié","editor.opt.tab_display.":"(identique à l'affichage des onglets)","editor.opt.align.start":"Début","editor.opt.align.center":"Centre","editor.opt.align.end":"Fin","editor.opt.align.justify":"Pleine largeur","editor.opt.badge_display.text":"Texte","editor.opt.badge_display.dot":"Point","editor.opt.transition.none":"Aucune","editor.opt.transition.fade":"Fondu","editor.opt.transition.slide":"Glissement","editor.opt.remember.none":"Ne pas mémoriser","editor.opt.remember.browser":"Par navigateur","editor.opt.remember.url":"Dans l'URL (#tab=)","editor.opt.remember.entity":"Dans une entité d'entrée (tous les appareils)","editor.opt.scrollable.auto":"Automatique","editor.opt.scrollable.true":"Toujours","editor.opt.scrollable.false":"Jamais","check.now_met":"Remplie actuellement","check.now_unmet":"Non remplie actuellement","check.chip_hidden":"Masqué","check.chip_alert":"En alerte","check.chip_hidden_title":"Les conditions de visibilité de cet onglet ne sont pas remplies : il est donc masqué sur le tableau de bord.","check.state_is":"{entity} est {values}","check.state_is_not":"{entity} n'est pas {values}","check.or":" ou ","check.now":"actuel : {value}","check.missing":"entité introuvable","check.numeric":"{entity} {range}","check.above":"supérieur à {value}","check.below":"inférieur à {value}","check.and":" et ","check.screen":"l'écran correspond à {query}","check.time":"heure {range}","check.time_after":"après {value}","check.time_before":"avant {value}","check.time_days":"le {days}","check.user":"l'utilisateur actuel fait partie des {count} sélectionnés","check.template":"le modèle renvoie vrai","check.template_pending":"modèle (en attente de Home Assistant)","check.group_and":"toutes :","check.group_or":"au moins une :","check.group_not":"aucune :","check.unknown":"type de condition inconnu","card.tabs":"Onglets","card.scroll_left":"Défiler vers la gauche","card.scroll_right":"Défiler vers la droite","card.all_tabs":"Tous les onglets","card.badge":"badge : {value}","card.ghost":"Masqué : ses conditions de visibilité ne sont pas remplies (affiché pendant la modification)","starter.button":"Partir d'un modèle","starter.hint":"Créez un ensemble d'onglets à partir de vos entités. Remplacer supprime les onglets actuels ; Ajouter les conserve.","starter.pick":"Modèle","starter.replace":"Remplacer les onglets","starter.append":"Ajouter les onglets","starter.cancel":"Annuler","starter.none":"Rien à créer : aucune entité correspondante trouvée pour « {name} ».","starter.done":"Modèle « {name} » ajouté.","starter.kind.rooms":"Pièces : un onglet par pièce","starter.kind.lights":"Lumières : un onglet par pièce avec des lumières","starter.kind.security":"Sécurité : alarme, caméras, portes et serrures","starter.kind.media":"Médias : un onglet par lecteur multimédia","starter.kind.climate":"Climat : un onglet par thermostat","starter.kind.energy":"Énergie : les cartes du tableau de bord Énergie","starter.kind.family":"Famille : un onglet par personne, avec une carte géographique","starter.tab.alarm":"Alarme","starter.tab.cameras":"Caméras","starter.tab.openings":"Portes et fenêtres","starter.tab.locks":"Serrures","starter.tab.energy_now":"Actuel","starter.tab.energy_usage":"Consommation","starter.tab.energy_sources":"Sources","starter.tab.energy_devices":"Appareils","convert.button":"Convertir depuis une autre carte","convert.hint":"Collez le YAML d'une tabbed-card, swipe-card, state-switch, d'une pile verticale/horizontale ou grille, de pop-ups Bubble Card, d'une carte conditionnelle, d'une vue sections ou d'un tableau de bord entier.","convert.detected":"{source} détecté : {count} onglets.","convert.replace":"Remplacer les onglets","convert.append":"Ajouter les onglets","convert.cancel":"Annuler","convert.done":"{count} onglets convertis depuis {source}.","convert.error.empty":"Il n'y a rien à convertir dans cette liste.","convert.error.not_card":"Ceci ne ressemble pas à une carte, une liste de cartes, une vue ou un tableau de bord.","convert.error.no_tabs":"Rien à convertir : aucune carte trouvée.","convert.source.tabdeck":"une carte Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"pop-ups Bubble Card","convert.source.dashboard":"un tableau de bord (un onglet par vue)","convert.source.view":"une vue","convert.source.sections":"une vue sections (un onglet par section)","convert.source.stack":"une pile (un onglet par carte ou titre)","convert.source.cards":"des cartes","convert.note.styles":"Seul --mdc-theme-primary a été repris (en tant que --tabdeck-accent) ; les autres styles de tabbed-card n'ont pas d'équivalent dans Tabdeck.","convert.note.tab_styles":"Les styles par onglet de tabbed-card n'ont pas été repris.","convert.note.autoplay":"Autoplay est devenu auto_rotate (secondes).","convert.note.state_switch_mode":"Ce mode de state-switch (utilisateur / media query / modèle) n'a pas d'équivalent direct ; les états sont devenus de simples onglets. Ajoutez des conditions de visibilité si besoin.","convert.note.bubble":"Chaque pop-up est devenu un onglet ; le bouton et le style propres au pop-up ne sont pas utilisés.","convert.note.dashboard":"Chaque vue est devenue un onglet. Les grands tableaux de bord peuvent alourdir la carte ; envisagez lazy: true.","editor.global.dock":"Dock : épingler la barre en bas de l'écran (navigation mobile)","editor.tab.fab":"Style bouton d'action flottant","editor.global.content_arrows":"Flèches précédent / suivant sur le contenu","editor.opt.tab_display.dots":"Points","card.prev_tab":"Onglet précédent","card.next_tab":"Onglet suivant","editor.global.search":"Recherche rapide (bouton 🔍)","editor.global.hotkeys":"Raccourcis clavier (1–9, [ ], /)","card.search":"Rechercher un onglet","card.search_placeholder":"Tapez pour filtrer…","card.search_none":"Aucun onglet correspondant","editor.global.history":"Le bouton Retour revient à l'onglet précédent","editor.global.customize":"Permettre à chacun de réordonner et masquer les onglets (par navigateur)","card.customize":"Organiser les onglets","card.move_up":"Monter {name}","card.move_down":"Descendre {name}","card.hide_tab":"Masquer {name}","card.show_tab":"Afficher {name}","card.reset":"Réinitialiser","card.done":"Terminé","editor.global.rail_expand":"Barre latérale : icônes seules, libellés au survol (gauche/droite)","card.fullscreen":"Plein écran","card.exit_fullscreen":"Quitter le plein écran","editor.tab.background":"Arrière-plan (couleur, dégradé ou URL d'image)","editor.opt.transition.scale":"Zoom","editor.opt.transition.flip":"Retournement","editor.opt.transition.rise":"Depuis le bas","editor.global.transition_duration":"Durée de la transition (ms)","editor.global.transition_easing":"Courbe de la transition (CSS, ex. ease-out)","editor.global.content_height":"Hauteur du contenu (auto, tallest ou ex. 400px)","editor.global.content_max_height":"Hauteur maximale du contenu (défile à l'intérieur)","editor.global.fullscreen":"Bouton plein écran","editor.global.swipe_peek":"Aperçu au balayage (le contenu suit le doigt)","editor.global.unload_after":"Libérer les onglets inutilisés après (minutes, 0 = jamais)","editor.global.transition_narrow":"Transition sur les cartes étroites (ex. téléphones)","card.no_entities":"Aucune entité ici.","card.pin_title":"Saisissez le code pour {tab}","card.pin_label":"Code","card.pin_wrong":"Code incorrect","card.cancel":"Annuler","card.open":"Ouvrir","editor.tab.badge_icon":"Icône du badge","editor.tab.ring":"Anneau de progression (entité, modèle ou nombre)","editor.tab.ring_max":"Maximum de l'anneau (100 par défaut)","editor.tab.ring_color":"Couleur de l'anneau","editor.tab.area":"Pièce (sans carte : affiche ses entités en tuiles)","editor.tab.pin":"Code (verrou pratique, pas une sécurité)","editor.tab.pin_timeout":"Déverrouillage valable (minutes, 0 = jusqu'au rechargement)","editor.global.alert_first":"Placer les onglets en alerte en premier","editor.global.alert_snooze":"Appui long met une alerte en sourdine (minutes, 0 = non)","editor.global.remote_entity":"Suivre cette entité (son état choisit l'onglet)","editor.global.remote_event":"Changer sur les événements tabdeck_select (administrateurs)","editor.global.fire_event":"Émettre des événements tabdeck_tab_changed (administrateurs)","editor.global.event_id":"Nom de la carte dans les événements"}}),$a=le(()=>{_a={"editor.tab.name":"Nome della tab","editor.tab.subtitle":"Sottotitolo","editor.tab.icon":"Icona","editor.tab.accent":"Colore di accento","editor.tab.color":"Colore testo/icona","editor.tab.badge":"Badge (ID entità o modello)","editor.tab.badge_color":"Colore del badge","editor.tab.disabled":"Disattiva tab (in grigio, non selezionabile)","editor.tab.card_size":"Dimensione indicativa (righe)","editor.tab.hold_action":"Azione alla pressione prolungata","editor.tab.badge_action":"Azione al tocco del badge","editor.tab.tap_action":"Azione al tocco (sostituisce l'apertura della tab, es. navigazione)","editor.tab.enter_action":"Azione all'apertura di questa tab","editor.tab.leave_action":"Azione all'uscita da questa tab","editor.global.preset":"Stile predefinito (applica un insieme delle opzioni sottostanti)","editor.global.position":"Posizione","editor.global.style":"Stile","editor.global.tab_display":"Visualizzazione tab","editor.global.align":"Allineamento tab","editor.global.badge_display":"Visualizzazione badge","editor.global.hide_inactive_badge":"Nascondi badge inattivi (0/off)","editor.global.transition":"Transizione del pannello","editor.global.indicator_size":"Spessore indicatore (px)","editor.global.indicator_radius":"Raggio angoli indicatore (px)","editor.global.remember":"Ricorda la tab selezionata","editor.global.remember_entity":"Entità di memoria (input_number/input_text)","editor.global.storage_key":"Chiave di archiviazione (modalità browser)","editor.global.default_tab":"Tab predefinita","editor.global.scrollable":"Scorrevole","editor.global.lazy":"Caricamento differito delle tab inattive","editor.global.unmount_hidden":"Scarica le tab nascoste (risparmia memoria)","editor.global.swipe_wrap":"Lo scorrimento ricomincia dagli estremi","editor.global.animated":"Anima l'indicatore","editor.global.accent_indicator":"Colora l'indicatore con l'accento della tab","editor.global.header":"Mostra intestazione (titolo della tab attiva sopra il contenuto)","editor.global.aria_label":"Nome accessibile della barra delle tab","editor.global.sticky":"Barra delle tab fissa","editor.global.elevation":"Solleva la barra con un'ombra","editor.global.scroll_buttons":"Pulsanti di scorrimento se la barra trabocca","editor.global.overflow_menu":"Menu ⋯ se la barra trabocca","editor.global.bar_background":"Colore di sfondo della barra delle tab","editor.global.swipe":"Scorri per cambiare tab (mobile)","editor.global.swipe_mouse":"Trascina col mouse per cambiare tab (desktop)","editor.global.tab_display_narrow":"Visualizzazione tab su schede strette","editor.global.narrow_width":"Stretta sotto (px)","editor.global.split":"Vista affiancata da questa larghezza (px, 0 = disattivato)","editor.global.collapsible":"Comprimibile (tocca la tab attiva per comprimere il contenuto)","editor.global.start_collapsed":"Inizia compressa","editor.global.scroll_spy":"Scroll-spy: impila le tab come sezioni","editor.global.auto_rotate":"Ruota automaticamente le tab ogni (secondi, 0 = disattivato)","editor.global.idle_return":"Torna alla tab predefinita dopo inattività (secondi, 0 = disattivato)","editor.global.edit_mode_reveal":"Mostra le tab nascoste durante la modifica della plancia","editor.cond.visibility.label":"Visibilità","editor.cond.visibility.hint":"mostra la tab solo quando…","editor.cond.alert.label":"Avviso","editor.cond.alert.hint":"fai lampeggiare la tab quando…","editor.cond.default_if.label":"Predefinita quando","editor.cond.default_if.hint":"inizia da questa tab quando…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} (copia)","editor.copied":"Tab «{name}» copiata — incollala in Importa tab.","editor.clipboard_error":"Impossibile accedere agli appunti.","editor.import_error":"Non sembra una tab (servono card, cards o tap_action).","editor.imported_one":"1 tab importata.","editor.imported_many":"{count} tab importate.","editor.import_hint":"Incolla una tab (o un elenco di tab) copiata con Copia tab, o qualsiasi YAML di tab.","editor.add":"Aggiungi","editor.cancel":"Annulla","editor.warn_duplicates":"Nomi di tab duplicati ({names}). «Remember: url» e la tab predefinita per nome potrebbero essere ambigui.","editor.back":"Indietro","editor.change_type":"Cambia tipo di scheda","editor.card_type":"Tipo di scheda","editor.card_type_hint":"Scegli un tipo di scheda per configurarla. Inserisci un tipo personalizzato (es. custom:my-card) per le schede non presenti nell'elenco.","editor.card_json":"Scheda (JSON)","editor.invalid_json":"JSON non valido — non salvato.","editor.expand_all":"Espandi tutto","editor.collapse_all":"Comprimi tutto","editor.drag":"Trascina per riordinare","editor.move_up":"Sposta su","editor.move_down":"Sposta giù","editor.copy_tab":"Copia tab","editor.duplicate_tab":"Duplica tab","editor.delete_tab":"Elimina tab","editor.add_tab":"Aggiungi tab","editor.import_tab":"Importa tab","editor.edit_card":"Modifica scheda","editor.preview":"Anteprima","editor.opt.position.top":"In alto","editor.opt.position.bottom":"In basso","editor.opt.position.left":"A sinistra","editor.opt.position.right":"A destra","editor.opt.tab_display.both":"Icona ed etichetta","editor.opt.tab_display.icon":"Solo icona","editor.opt.tab_display.label":"Solo etichetta","editor.opt.tab_display.active":"Icone; tab selezionata espansa","editor.opt.tab_display.":"(come la visualizzazione tab)","editor.opt.align.start":"Inizio","editor.opt.align.center":"Centro","editor.opt.align.end":"Fine","editor.opt.align.justify":"Larghezza piena","editor.opt.badge_display.text":"Testo","editor.opt.badge_display.dot":"Punto","editor.opt.transition.none":"Nessuna","editor.opt.transition.fade":"Dissolvenza","editor.opt.transition.slide":"Scorrimento","editor.opt.remember.none":"Non ricordare","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"Nell'URL (#tab=)","editor.opt.remember.entity":"In un'entità aiutante (tutti i dispositivi)","editor.opt.scrollable.auto":"Automatico","editor.opt.scrollable.true":"Sempre","editor.opt.scrollable.false":"Mai","check.now_met":"Soddisfatta ora","check.now_unmet":"Non soddisfatta ora","check.chip_hidden":"Nascosta ora","check.chip_alert":"In avviso","check.chip_hidden_title":"Le condizioni di visibilità di questa tab non sono soddisfatte, quindi è nascosta nella plancia.","check.state_is":"{entity} è {values}","check.state_is_not":"{entity} non è {values}","check.or":" o ","check.now":"ora: {value}","check.missing":"entità non trovata","check.numeric":"{entity} {range}","check.above":"sopra {value}","check.below":"sotto {value}","check.and":" e ","check.screen":"lo schermo corrisponde a {query}","check.time":"ora {range}","check.time_after":"dopo le {value}","check.time_before":"prima delle {value}","check.time_days":"di {days}","check.user":"l'utente attuale è tra i {count} selezionati","check.template":"il modello restituisce vero","check.template_pending":"modello (in attesa di Home Assistant)","check.group_and":"tutte:","check.group_or":"almeno una:","check.group_not":"nessuna:","check.unknown":"tipo di condizione sconosciuto","card.tabs":"Tab","card.scroll_left":"Scorri a sinistra","card.scroll_right":"Scorri a destra","card.all_tabs":"Tutte le tab","card.badge":"badge: {value}","card.ghost":"Nascosta: le condizioni di visibilità non sono soddisfatte (mostrata durante la modifica)","starter.button":"Parti da un modello","starter.hint":"Crea un insieme di tab dalle tue entità. Sostituisci rimpiazza le tab attuali; Aggiungi le mantiene.","starter.pick":"Modello","starter.replace":"Sostituisci tab","starter.append":"Aggiungi tab","starter.cancel":"Annulla","starter.none":"Niente da creare: nessuna entità corrispondente trovata per «{name}».","starter.done":"Modello «{name}» aggiunto.","starter.kind.rooms":"Stanze: una tab per area","starter.kind.lights":"Luci: una tab per ogni area con luci","starter.kind.security":"Sicurezza: allarme, telecamere, porte e serrature","starter.kind.media":"Media: una tab per lettore multimediale","starter.kind.climate":"Clima: una tab per termostato","starter.kind.energy":"Energia: le schede della plancia Energia","starter.kind.family":"Famiglia: una tab per persona, con una mappa","starter.tab.alarm":"Allarme","starter.tab.cameras":"Telecamere","starter.tab.openings":"Porte e finestre","starter.tab.locks":"Serrature","starter.tab.energy_now":"Ora","starter.tab.energy_usage":"Consumo","starter.tab.energy_sources":"Fonti","starter.tab.energy_devices":"Dispositivi","convert.button":"Converti da un'altra scheda","convert.hint":"Incolla lo YAML di una tabbed-card, swipe-card, state-switch, una pila verticale/orizzontale o griglia, pop-up di Bubble Card, una scheda condizionale, una vista a sezioni o un'intera plancia.","convert.detected":"Rilevato {source}: {count} tab.","convert.replace":"Sostituisci tab","convert.append":"Aggiungi tab","convert.cancel":"Annulla","convert.done":"{count} tab convertite da {source}.","convert.error.empty":"Non c'è niente da convertire in questo elenco.","convert.error.not_card":"Non sembra una scheda, un elenco di schede, una vista o una plancia.","convert.error.no_tabs":"Niente da convertire: nessuna scheda trovata.","convert.source.tabdeck":"una scheda Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"pop-up di Bubble Card","convert.source.dashboard":"una plancia (una tab per vista)","convert.source.view":"una vista","convert.source.sections":"una vista a sezioni (una tab per sezione)","convert.source.stack":"una pila (una tab per scheda o intestazione)","convert.source.cards":"schede","convert.note.styles":"È stato mantenuto solo --mdc-theme-primary (come --tabdeck-accent); gli altri stili di tabbed-card non hanno equivalenti in Tabdeck.","convert.note.tab_styles":"Gli stili per tab di tabbed-card non sono stati mantenuti.","convert.note.autoplay":"Autoplay è diventato auto_rotate (secondi).","convert.note.state_switch_mode":"Questa modalità di state-switch (utente / media query / modello) non ha un equivalente diretto; gli stati sono diventati tab semplici. Aggiungi condizioni di visibilità se necessario.","convert.note.bubble":"Ogni pop-up è diventato una tab; il pulsante e lo stile propri del pop-up non vengono usati.","convert.note.dashboard":"Ogni vista è diventata una tab. Plance di grandi dimensioni possono appesantire la scheda; valuta lazy: true.","editor.global.dock":"Dock: fissa la barra in fondo allo schermo (navigazione da telefono)","editor.tab.fab":"Stile pulsante d'azione flottante","editor.global.content_arrows":"Frecce precedente / successiva sul contenuto","editor.opt.tab_display.dots":"Punti","card.prev_tab":"Tab precedente","card.next_tab":"Tab successiva","editor.global.search":"Ricerca rapida (pulsante 🔍)","editor.global.hotkeys":"Scorciatoie da tastiera (1–9, [ ], /)","card.search":"Cerca una tab","card.search_placeholder":"Digita per filtrare…","card.search_none":"Nessuna tab corrispondente","editor.global.history":"Il tasto Indietro torna alla tab precedente","editor.global.customize":"Consenti a ciascuno di riordinare e nascondere le tab (per browser)","card.customize":"Organizza le tab","card.move_up":"Sposta su {name}","card.move_down":"Sposta giù {name}","card.hide_tab":"Nascondi {name}","card.show_tab":"Mostra {name}","card.reset":"Ripristina","card.done":"Fatto","editor.global.rail_expand":"Barra laterale: solo icone, etichette al passaggio del mouse (sinistra/destra)","card.fullscreen":"Schermo intero","card.exit_fullscreen":"Esci da schermo intero","editor.tab.background":"Sfondo (colore, gradiente o URL immagine)","editor.opt.transition.scale":"Scala","editor.opt.transition.flip":"Rotazione","editor.opt.transition.rise":"Dal basso","editor.global.transition_duration":"Durata della transizione (ms)","editor.global.transition_easing":"Curva della transizione (CSS, es. ease-out)","editor.global.content_height":"Altezza del contenuto (auto, tallest o es. 400px)","editor.global.content_max_height":"Altezza massima del contenuto (scorre all'interno)","editor.global.fullscreen":"Pulsante schermo intero","editor.global.swipe_peek":"Anteprima allo scorrimento (il contenuto segue il dito)","editor.global.unload_after":"Libera le tab inutilizzate dopo (minuti, 0 = mai)","editor.global.transition_narrow":"Transizione sulle schede strette (es. telefoni)","card.no_entities":"Nessuna entità qui.","card.pin_title":"Inserisci il codice per {tab}","card.pin_label":"Codice","card.pin_wrong":"Codice errato","card.cancel":"Annulla","card.open":"Apri","editor.tab.badge_icon":"Icona del badge","editor.tab.ring":"Anello di avanzamento (entità, template o numero)","editor.tab.ring_max":"Massimo dell'anello (predefinito 100)","editor.tab.ring_color":"Colore dell'anello","editor.tab.area":"Area (senza scheda: mostra le sue entità come riquadri)","editor.tab.pin":"PIN (blocco di comodità, non di sicurezza)","editor.tab.pin_timeout":"Lo sblocco dura (minuti, 0 = fino al ricaricamento)","editor.global.alert_first":"Sposta in testa le tab in allerta","editor.global.alert_snooze":"Pressione lunga silenzia un'allerta (minuti, 0 = no)","editor.global.remote_entity":"Segui questa entità (il suo stato sceglie la tab)","editor.global.remote_event":"Cambia con gli eventi tabdeck_select (amministratori)","editor.global.fire_event":"Genera eventi tabdeck_tab_changed (amministratori)","editor.global.event_id":"Nome della scheda negli eventi"}}),Aa=le(()=>{ma={"editor.tab.name":"Tabnaam","editor.tab.subtitle":"Ondertitel","editor.tab.icon":"Pictogram","editor.tab.accent":"Accentkleur","editor.tab.color":"Tekst-/pictogramkleur","editor.tab.badge":"Badge (entiteit-ID of template)","editor.tab.badge_color":"Badgekleur","editor.tab.disabled":"Tab uitschakelen (grijs, niet selecteerbaar)","editor.tab.card_size":"Kaartgrootte (rijen)","editor.tab.hold_action":"Vasthouden-actie","editor.tab.badge_action":"Tik-actie voor badge","editor.tab.tap_action":"Tik-actie (vervangt het openen van de tab, bijv. navigate)","editor.tab.enter_action":"Actie bij openen van deze tab","editor.tab.leave_action":"Actie bij verlaten van deze tab","editor.global.preset":"Stijlvoorinstelling (past een set van de opties hieronder toe)","editor.global.position":"Positie","editor.global.style":"Stijl","editor.global.tab_display":"Tabweergave","editor.global.align":"Tabuitlijning","editor.global.badge_display":"Badgeweergave","editor.global.hide_inactive_badge":"Inactieve badges verbergen (0/off)","editor.global.transition":"Paneelovergang","editor.global.indicator_size":"Indicatordikte (px)","editor.global.indicator_radius":"Hoekradius indicator (px)","editor.global.remember":"Geselecteerde tab onthouden","editor.global.remember_entity":"Entiteit om te onthouden (input_number/input_text)","editor.global.storage_key":"Opslagsleutel (browsermodus)","editor.global.default_tab":"Standaardtab","editor.global.scrollable":"Scrollbaar","editor.global.lazy":"Inactieve tabs pas laden wanneer nodig","editor.global.unmount_hidden":"Verborgen tabs ontladen (bespaart geheugen)","editor.global.swipe_wrap":"Vegen gaat rond bij de uiteinden","editor.global.animated":"Indicator animeren","editor.global.accent_indicator":"Indicator in accentkleur van de tab","editor.global.header":"Koptekst tonen (titel van actieve tab boven inhoud)","editor.global.aria_label":"Toegankelijke naam voor de tabbalk","editor.global.sticky":"Tabbalk vastzetten","editor.global.elevation":"Balk verhogen met schaduw","editor.global.scroll_buttons":"Scrollknoppen als de balk overloopt","editor.global.overflow_menu":"Overloopmenu ⋯ als de balk overloopt","editor.global.bar_background":"Achtergrondkleur tabbalk","editor.global.swipe":"Vegen om van tab te wisselen (mobiel)","editor.global.swipe_mouse":"Slepen met muis om van tab te wisselen (desktop)","editor.global.tab_display_narrow":"Tabweergave op smalle kaarten","editor.global.narrow_width":"Smal onder (px)","editor.global.split":"Naast elkaar vanaf breedte (px, 0 = uit)","editor.global.collapsible":"Inklapbaar (tik op actieve tab om inhoud in te klappen)","editor.global.start_collapsed":"Ingeklapt starten","editor.global.scroll_spy":"Scroll-spy: tabs als secties onder elkaar","editor.global.auto_rotate":"Tabs automatisch wisselen elke (seconden, 0 = uit)","editor.global.idle_return":"Na inactiviteit terug naar standaardtab (seconden, 0 = uit)","editor.global.edit_mode_reveal":"Verborgen tabs tonen tijdens bewerken van het dashboard","editor.cond.visibility.label":"Zichtbaarheid","editor.cond.visibility.hint":"toon de tab alleen als…","editor.cond.alert.label":"Melding","editor.cond.alert.hint":"laat de tab pulseren als…","editor.cond.default_if.label":"Standaard als","editor.cond.default_if.hint":"start op deze tab als…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} kopie","editor.copied":'Tab "{name}" gekopieerd — plak hem in Tab importeren.',"editor.clipboard_error":"Geen toegang tot het klembord.","editor.import_error":"Dat lijkt geen tab (vereist card, cards of tap_action).","editor.imported_one":"1 tab geïmporteerd.","editor.imported_many":"{count} tabs geïmporteerd.","editor.import_hint":"Plak een tab (of lijst met tabs) gekopieerd met Tab kopiëren, of willekeurige tab-YAML.","editor.add":"Toevoegen","editor.cancel":"Annuleren","editor.warn_duplicates":'Dubbele tabnamen ({names}). "Remember: url" en standaardtab op naam kunnen dubbelzinnig zijn.',"editor.back":"Terug","editor.change_type":"Kaarttype wijzigen","editor.card_type":"Kaarttype","editor.card_type_hint":"Kies een kaarttype om het te configureren. Voer een aangepast type in (bijv. custom:my-card) voor kaarten die niet in de lijst staan.","editor.card_json":"Kaart (JSON)","editor.invalid_json":"Ongeldige JSON — niet opgeslagen.","editor.expand_all":"Alles uitklappen","editor.collapse_all":"Alles inklappen","editor.drag":"Sleep om te herschikken","editor.move_up":"Omhoog","editor.move_down":"Omlaag","editor.copy_tab":"Tab kopiëren","editor.duplicate_tab":"Tab dupliceren","editor.delete_tab":"Tab verwijderen","editor.add_tab":"Tab toevoegen","editor.import_tab":"Tab importeren","editor.edit_card":"Kaart bewerken","editor.preview":"Voorbeeld","editor.opt.position.top":"Boven","editor.opt.position.bottom":"Onder","editor.opt.position.left":"Links","editor.opt.position.right":"Rechts","editor.opt.tab_display.both":"Pictogram en label","editor.opt.tab_display.icon":"Alleen pictogram","editor.opt.tab_display.label":"Alleen label","editor.opt.tab_display.active":"Pictogrammen; geselecteerde tab uitgebreid","editor.opt.tab_display.":"(zelfde als tabweergave)","editor.opt.align.start":"Begin","editor.opt.align.center":"Midden","editor.opt.align.end":"Eind","editor.opt.align.justify":"Volledige breedte","editor.opt.badge_display.text":"Tekst","editor.opt.badge_display.dot":"Stip","editor.opt.transition.none":"Geen","editor.opt.transition.fade":"Vervagen","editor.opt.transition.slide":"Schuiven","editor.opt.remember.none":"Niet onthouden","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"In de URL (#tab=)","editor.opt.remember.entity":"In een helper-entiteit (alle apparaten)","editor.opt.scrollable.auto":"Automatisch","editor.opt.scrollable.true":"Altijd","editor.opt.scrollable.false":"Nooit","check.now_met":"Nu voldaan","check.now_unmet":"Nu niet voldaan","check.chip_hidden":"Nu verborgen","check.chip_alert":"Melding actief","check.chip_hidden_title":"Niet aan de zichtbaarheidsvoorwaarden van deze tab is voldaan, dus hij is verborgen op het dashboard.","check.state_is":"{entity} is {values}","check.state_is_not":"{entity} is niet {values}","check.or":" of ","check.now":"nu: {value}","check.missing":"entiteit niet gevonden","check.numeric":"{entity} {range}","check.above":"boven {value}","check.below":"onder {value}","check.and":" en ","check.screen":"scherm voldoet aan {query}","check.time":"tijd {range}","check.time_after":"na {value}","check.time_before":"voor {value}","check.time_days":"op {days}","check.user":"huidige gebruiker is een van {count} geselecteerde","check.template":"template geeft true","check.template_pending":"template (wacht op Home Assistant)","check.group_and":"alle van:","check.group_or":"een van:","check.group_not":"geen van:","check.unknown":"onbekend voorwaardetype","card.tabs":"Tabs","card.scroll_left":"Naar links scrollen","card.scroll_right":"Naar rechts scrollen","card.all_tabs":"Alle tabs","card.badge":"badge: {value}","card.ghost":"Verborgen: niet aan de zichtbaarheidsvoorwaarden voldaan (getoond tijdens bewerken)","starter.button":"Beginnen met een sjabloon","starter.hint":"Bouw een deck met je eigen entiteiten. Vervangen wisselt de huidige tabs uit; Toevoegen behoudt ze.","starter.pick":"Sjabloon","starter.replace":"Tabs vervangen","starter.append":"Tabs toevoegen","starter.cancel":"Annuleren","starter.none":'Niets te bouwen: geen passende entiteiten gevonden voor "{name}".',"starter.done":'Sjabloon "{name}" toegevoegd.',"starter.kind.rooms":"Ruimtes: een tab per ruimte","starter.kind.lights":"Lampen: een tab per ruimte met lampen","starter.kind.security":"Beveiliging: alarm, camera's, deuren & sloten","starter.kind.media":"Media: een tab per mediaspeler","starter.kind.climate":"Klimaat: een tab per thermostaat","starter.kind.energy":"Energie: de kaarten van het energiedashboard","starter.kind.family":"Gezin: een tab per persoon, met locatiekaart","starter.tab.alarm":"Alarm","starter.tab.cameras":"Camera's","starter.tab.openings":"Deuren & ramen","starter.tab.locks":"Sloten","starter.tab.energy_now":"Nu","starter.tab.energy_usage":"Verbruik","starter.tab.energy_sources":"Bronnen","starter.tab.energy_devices":"Apparaten","convert.button":"Converteren vanaf een andere kaart","convert.hint":"Plak de YAML van een tabbed-card, swipe-card, state-switch, verticale/horizontale stapel of raster, Bubble Card-pop-ups, een voorwaardelijke kaart, een sectieweergave of een heel dashboard.","convert.detected":"{source} gedetecteerd: {count} tabs.","convert.replace":"Tabs vervangen","convert.append":"Tabs toevoegen","convert.cancel":"Annuleren","convert.done":"{count} tabs geconverteerd vanuit {source}.","convert.error.empty":"Er valt niets te converteren in die lijst.","convert.error.not_card":"Dat lijkt geen kaart, lijst met kaarten, weergave of dashboard.","convert.error.no_tabs":"Niets te converteren: geen kaarten gevonden.","convert.source.tabdeck":"een Tabdeck-kaart","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card-pop-ups","convert.source.dashboard":"een dashboard (een tab per weergave)","convert.source.view":"een weergave","convert.source.sections":"een sectieweergave (een tab per sectie)","convert.source.stack":"een stapel (een tab per kaart of kop)","convert.source.cards":"kaarten","convert.note.styles":"Alleen --mdc-theme-primary is overgenomen (als --tabdeck-accent); andere tabbed-card-stijlen hebben geen equivalent in Tabdeck.","convert.note.tab_styles":"Stijlen per tab uit tabbed-card zijn niet overgenomen.","convert.note.autoplay":"Autoplay is auto_rotate geworden (seconden).","convert.note.state_switch_mode":"Deze state-switch-modus (gebruiker / media query / template) heeft geen direct equivalent; de statussen zijn gewone tabs geworden. Voeg zo nodig zichtbaarheidsvoorwaarden toe.","convert.note.bubble":"Elke pop-up is een tab geworden; de eigen knop en opmaak van de pop-up worden niet gebruikt.","convert.note.dashboard":"Elke weergave is een tab geworden. Grote dashboards kunnen een zware kaart opleveren; overweeg lazy: true.","editor.global.dock":"Dock: balk onderaan het scherm vastzetten (telefoonnavigatie)","editor.tab.fab":"Als zwevende actieknop","editor.global.content_arrows":"Vorige/volgende-pijlen over de inhoud","editor.opt.tab_display.dots":"Stippen","card.prev_tab":"Vorige tab","card.next_tab":"Volgende tab","editor.global.search":"Snel zoeken (🔍-knop)","editor.global.hotkeys":"Sneltoetsen (1–9, [ ], /)","card.search":"Tab zoeken","card.search_placeholder":"Typ om te filteren…","card.search_none":"Geen overeenkomende tabs","editor.global.history":"Terugknop gaat naar de vorige tab","editor.global.customize":"Laat mensen zelf tabs herschikken en verbergen (per browser)","card.customize":"Tabs ordenen","card.move_up":"{name} omhoog","card.move_down":"{name} omlaag","card.hide_tab":"{name} verbergen","card.show_tab":"{name} tonen","card.reset":"Herstellen","card.done":"Klaar","editor.global.rail_expand":"Zijbalk: alleen pictogrammen, labels bij aanwijzen (links/rechts)","card.fullscreen":"Volledig scherm","card.exit_fullscreen":"Volledig scherm sluiten","editor.tab.background":"Achtergrond (kleur, verloop of afbeeldings-URL)","editor.opt.transition.scale":"Schalen","editor.opt.transition.flip":"Draaien","editor.opt.transition.rise":"Van onderen","editor.global.transition_duration":"Duur van de overgang (ms)","editor.global.transition_easing":"Overgangscurve (CSS, bijv. ease-out)","editor.global.content_height":"Inhoudshoogte (auto, tallest of bijv. 400px)","editor.global.content_max_height":"Maximale inhoudshoogte (scrolt binnenin)","editor.global.fullscreen":"Knop voor volledig scherm","editor.global.swipe_peek":"Veegvoorbeeld (inhoud volgt de vinger)","editor.global.unload_after":"Ongebruikte tabs vrijgeven na (minuten, 0 = nooit)","editor.global.transition_narrow":"Overgang op smalle kaarten (bijv. telefoons)","card.no_entities":"Hier zijn geen entiteiten.","card.pin_title":"Voer de code voor {tab} in","card.pin_label":"Code","card.pin_wrong":"Onjuiste code","card.cancel":"Annuleren","card.open":"Openen","editor.tab.badge_icon":"Badge-pictogram","editor.tab.ring":"Voortgangsring (entiteit, template of getal)","editor.tab.ring_max":"Maximum van de ring (standaard 100)","editor.tab.ring_color":"Ringkleur","editor.tab.area":"Ruimte (zonder kaart: toont de entiteiten als tegels)","editor.tab.pin":"Pincode (gemaksslot, geen beveiliging)","editor.tab.pin_timeout":"Ontgrendeling geldt (minuten, 0 = tot herladen)","editor.global.alert_first":"Tabs met een melding vooraan zetten","editor.global.alert_snooze":"Lang drukken dempt een melding (minuten, 0 = uit)","editor.global.remote_entity":"Deze entiteit volgen (de status kiest de tab)","editor.global.remote_event":"Wisselen bij tabdeck_select-gebeurtenissen (beheerders)","editor.global.fire_event":"tabdeck_tab_changed-gebeurtenissen afvuren (beheerders)","editor.global.event_id":"Naam van het deck in gebeurtenissen"}}),Sa=le(()=>{ga={"editor.tab.name":"Nazwa zakładki","editor.tab.subtitle":"Podtytuł","editor.tab.icon":"Ikona","editor.tab.accent":"Kolor akcentu","editor.tab.color":"Kolor tekstu/ikony","editor.tab.badge":"Plakietka (identyfikator encji lub szablon)","editor.tab.badge_color":"Kolor plakietki","editor.tab.disabled":"Wyłącz zakładkę (wyszarzona, nie do wybrania)","editor.tab.card_size":"Wskazówka rozmiaru karty (wiersze)","editor.tab.hold_action":"Akcja długiego naciśnięcia","editor.tab.badge_action":"Akcja dotknięcia plakietki","editor.tab.tap_action":"Akcja dotknięcia (zamiast otwarcia zakładki, np. nawigacja)","editor.tab.enter_action":"Akcja po otwarciu tej zakładki","editor.tab.leave_action":"Akcja po opuszczeniu tej zakładki","editor.global.preset":"Styl gotowy (ustawia zestaw poniższych opcji)","editor.global.position":"Położenie","editor.global.style":"Styl","editor.global.tab_display":"Wygląd zakładek","editor.global.align":"Wyrównanie zakładek","editor.global.badge_display":"Wygląd plakietek","editor.global.hide_inactive_badge":"Ukryj nieaktywne plakietki (0/off)","editor.global.transition":"Przejście panelu","editor.global.indicator_size":"Grubość wskaźnika (px)","editor.global.indicator_radius":"Zaokrąglenie wskaźnika (px)","editor.global.remember":"Zapamiętaj wybraną zakładkę","editor.global.remember_entity":"Encja do zapamiętania (input_number/input_text)","editor.global.storage_key":"Klucz zapisu (tryb przeglądarki)","editor.global.default_tab":"Domyślna zakładka","editor.global.scrollable":"Przewijanie","editor.global.lazy":"Leniwie ładuj nieaktywne zakładki","editor.global.unmount_hidden":"Odmontuj ukryte zakładki (oszczędza pamięć)","editor.global.swipe_wrap":"Przesuwanie zapętla się na końcach","editor.global.animated":"Animuj wskaźnik","editor.global.accent_indicator":"Koloruj wskaźnik akcentem zakładki","editor.global.header":"Pokaż nagłówek (tytuł aktywnej zakładki nad treścią)","editor.global.aria_label":"Dostępna nazwa paska zakładek","editor.global.sticky":"Przyklejony pasek zakładek","editor.global.elevation":"Unieś pasek z cieniem","editor.global.scroll_buttons":"Przyciski przewijania, gdy pasek się nie mieści","editor.global.overflow_menu":"Menu ⋯, gdy pasek się nie mieści","editor.global.bar_background":"Kolor tła paska zakładek","editor.global.swipe":"Zmiana zakładek przesunięciem (mobilne)","editor.global.swipe_mouse":"Zmiana zakładek przeciąganiem myszą (komputer)","editor.global.tab_display_narrow":"Wygląd zakładek na wąskich kartach","editor.global.narrow_width":"Wąska poniżej (px)","editor.global.split":"Podział obok siebie od szerokości (px, 0 = wył.)","editor.global.collapsible":"Zwijana (dotknij aktywnej zakładki, by zwinąć treść)","editor.global.start_collapsed":"Początkowo zwinięta","editor.global.scroll_spy":"Scroll-spy: zakładki jako sekcje jedna pod drugą","editor.global.auto_rotate":"Automatycznie zmieniaj zakładki co (sekundy, 0 = wył.)","editor.global.idle_return":"Wróć do domyślnej zakładki po bezczynności (sekundy, 0 = wył.)","editor.global.edit_mode_reveal":"Pokazuj ukryte zakładki podczas edycji dashboardu","editor.cond.visibility.label":"Widoczność","editor.cond.visibility.hint":"pokaż zakładkę tylko, gdy…","editor.cond.alert.label":"Alert","editor.cond.alert.hint":"pulsuj zakładką, gdy…","editor.cond.default_if.label":"Domyślna, gdy","editor.cond.default_if.hint":"zacznij od tej zakładki, gdy…","editor.tab_n":"Zakładka {n}","editor.copy_name":"{name} (kopia)","editor.copied":'Skopiowano zakładkę "{name}" — wklej ją w Importuj zakładkę.',"editor.clipboard_error":"Brak dostępu do schowka.","editor.import_error":"To nie wygląda na zakładkę (wymaga card, cards lub tap_action).","editor.imported_one":"Zaimportowano 1 zakładkę.","editor.imported_many":"Zaimportowano zakładki: {count}.","editor.import_hint":"Wklej zakładkę (lub listę zakładek) skopiowaną przez Kopiuj zakładkę albo dowolny YAML zakładki.","editor.add":"Dodaj","editor.cancel":"Anuluj","editor.warn_duplicates":'Powtórzone nazwy zakładek ({names}). "Zapamiętaj: url" i domyślna zakładka według nazwy mogą być niejednoznaczne.',"editor.back":"Wstecz","editor.change_type":"Zmień typ karty","editor.card_type":"Typ karty","editor.card_type_hint":"Wybierz typ karty, aby ją skonfigurować. Wpisz własny typ (np. custom:my-card) dla kart spoza listy.","editor.card_json":"Karta (JSON)","editor.invalid_json":"Nieprawidłowy JSON — nie zapisano.","editor.expand_all":"Rozwiń wszystko","editor.collapse_all":"Zwiń wszystko","editor.drag":"Przeciągnij, aby zmienić kolejność","editor.move_up":"Przenieś w górę","editor.move_down":"Przenieś w dół","editor.copy_tab":"Kopiuj zakładkę","editor.duplicate_tab":"Duplikuj zakładkę","editor.delete_tab":"Usuń zakładkę","editor.add_tab":"Dodaj zakładkę","editor.import_tab":"Importuj zakładkę","editor.edit_card":"Edytuj kartę","editor.preview":"Podgląd","editor.opt.position.top":"Góra","editor.opt.position.bottom":"Dół","editor.opt.position.left":"Lewo","editor.opt.position.right":"Prawo","editor.opt.tab_display.both":"Ikona i etykieta","editor.opt.tab_display.icon":"Tylko ikona","editor.opt.tab_display.label":"Tylko etykieta","editor.opt.tab_display.active":"Ikony; wybrana zakładka rozwinięta","editor.opt.tab_display.":"(jak wygląd zakładek)","editor.opt.align.start":"Początek","editor.opt.align.center":"Środek","editor.opt.align.end":"Koniec","editor.opt.align.justify":"Pełna szerokość","editor.opt.badge_display.text":"Tekst","editor.opt.badge_display.dot":"Kropka","editor.opt.transition.none":"Brak","editor.opt.transition.fade":"Zanikanie","editor.opt.transition.slide":"Przesunięcie","editor.opt.remember.none":"Nie zapamiętuj","editor.opt.remember.browser":"Dla przeglądarki","editor.opt.remember.url":"W adresie URL (#tab=)","editor.opt.remember.entity":"W encji pomocnika (wszystkie urządzenia)","editor.opt.scrollable.auto":"Automatycznie","editor.opt.scrollable.true":"Zawsze","editor.opt.scrollable.false":"Nigdy","check.now_met":"Spełniony teraz","check.now_unmet":"Niespełniony teraz","check.chip_hidden":"Teraz ukryta","check.chip_alert":"Alert","check.chip_hidden_title":"Warunki widoczności tej zakładki nie są spełnione, więc jest ukryta na dashboardzie.","check.state_is":"{entity} ma stan {values}","check.state_is_not":"{entity} nie ma stanu {values}","check.or":" lub ","check.now":"teraz: {value}","check.missing":"nie znaleziono encji","check.numeric":"{entity} {range}","check.above":"powyżej {value}","check.below":"poniżej {value}","check.and":" i ","check.screen":"ekran pasuje do {query}","check.time":"czas {range}","check.time_after":"po {value}","check.time_before":"przed {value}","check.time_days":"w dni: {days}","check.user":"bieżący użytkownik należy do wybranych (liczba: {count})","check.template":"szablon zwraca prawdę","check.template_pending":"szablon (oczekiwanie na Home Assistant)","check.group_and":"wszystkie z:","check.group_or":"dowolny z:","check.group_not":"żaden z:","check.unknown":"nieznany typ warunku","card.tabs":"Zakładki","card.scroll_left":"Przewiń w lewo","card.scroll_right":"Przewiń w prawo","card.all_tabs":"Wszystkie zakładki","card.badge":"plakietka: {value}","card.ghost":"Ukryta: warunki widoczności nie są spełnione (widoczna podczas edycji)","starter.button":"Zacznij od szablonu","starter.hint":"Zbuduj zestaw ze swoich encji. Zastąp usuwa bieżące zakładki; Dodaj je zachowuje.","starter.pick":"Szablon","starter.replace":"Zastąp zakładki","starter.append":"Dodaj zakładki","starter.cancel":"Anuluj","starter.none":'Nie ma czego zbudować: brak pasujących encji dla "{name}".',"starter.done":'Dodano szablon "{name}".',"starter.kind.rooms":"Pokoje: zakładka dla każdego obszaru","starter.kind.lights":"Światła: zakładka dla każdego obszaru ze światłami","starter.kind.security":"Bezpieczeństwo: alarm, kamery, drzwi i zamki","starter.kind.media":"Multimedia: zakładka dla każdego odtwarzacza","starter.kind.climate":"Klimat: zakładka dla każdego termostatu","starter.kind.energy":"Energia: karty dashboardu energii","starter.kind.family":"Rodzina: zakładka dla każdej osoby, z mapą","starter.tab.alarm":"Alarm","starter.tab.cameras":"Kamery","starter.tab.openings":"Drzwi i okna","starter.tab.locks":"Zamki","starter.tab.energy_now":"Teraz","starter.tab.energy_usage":"Zużycie","starter.tab.energy_sources":"Źródła","starter.tab.energy_devices":"Urządzenia","convert.button":"Konwertuj z innej karty","convert.hint":"Wklej YAML karty tabbed-card, swipe-card, state-switch, stosu pionowego/poziomego lub siatki, wyskakujących okienek Bubble Card, karty warunkowej, widoku sekcji lub całego dashboardu.","convert.detected":"Wykryto {source}. Zakładki: {count}.","convert.replace":"Zastąp zakładki","convert.append":"Dodaj zakładki","convert.cancel":"Anuluj","convert.done":"Skonwertowano z {source}. Zakładki: {count}.","convert.error.empty":"Na tej liście nie ma nic do konwersji.","convert.error.not_card":"To nie wygląda na kartę, listę kart, widok ani dashboard.","convert.error.no_tabs":"Nic do konwersji: nie znaleziono kart.","convert.source.tabdeck":"karta Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"wyskakujące okienka Bubble Card","convert.source.dashboard":"dashboard (zakładka na każdy widok)","convert.source.view":"widok","convert.source.sections":"widok sekcji (zakładka na każdą sekcję)","convert.source.stack":"stos (zakładka na każdą kartę lub nagłówek)","convert.source.cards":"karty","convert.note.styles":"Przeniesiono tylko --mdc-theme-primary (jako --tabdeck-accent); pozostałe style tabbed-card nie mają odpowiednika w Tabdeck.","convert.note.tab_styles":"Style poszczególnych zakładek z tabbed-card nie zostały przeniesione.","convert.note.autoplay":"Autoplay zamieniono na auto_rotate (sekundy).","convert.note.state_switch_mode":"Ten tryb state-switch (użytkownik / media query / szablon) nie ma bezpośredniego odpowiednika; stany stały się zwykłymi zakładkami. W razie potrzeby dodaj warunki widoczności.","convert.note.bubble":"Każde wyskakujące okienko stało się zakładką; jego własny przycisk i styl nie są używane.","convert.note.dashboard":"Każdy widok stał się zakładką. Duże dashboardy mogą dać ciężką kartę; rozważ lazy: true.","editor.global.dock":"Dock: przypnij pasek do dołu ekranu (nawigacja jak w telefonie)","editor.tab.fab":"Styl pływającego przycisku akcji","editor.global.content_arrows":"Strzałki poprzednia / następna nad zawartością","editor.opt.tab_display.dots":"Kropki","card.prev_tab":"Poprzednia zakładka","card.next_tab":"Następna zakładka","editor.global.search":"Szybkie wyszukiwanie (przycisk 🔍)","editor.global.hotkeys":"Skróty klawiaturowe (1–9, [ ], /)","card.search":"Znajdź zakładkę","card.search_placeholder":"Wpisz, aby filtrować…","card.search_none":"Brak pasujących zakładek","editor.global.history":"Przycisk Wstecz wraca do poprzedniej zakładki","editor.global.customize":"Pozwól każdemu zmieniać kolejność i ukrywać zakładki (na przeglądarkę)","card.customize":"Ułóż zakładki","card.move_up":"Przesuń {name} w górę","card.move_down":"Przesuń {name} w dół","card.hide_tab":"Ukryj {name}","card.show_tab":"Pokaż {name}","card.reset":"Resetuj","card.done":"Gotowe","editor.global.rail_expand":"Pasek boczny: same ikony, etykiety po najechaniu (lewo/prawo)","card.fullscreen":"Pełny ekran","card.exit_fullscreen":"Zamknij pełny ekran","editor.tab.background":"Tło (kolor, gradient lub adres obrazu)","editor.opt.transition.scale":"Skalowanie","editor.opt.transition.flip":"Obrót","editor.opt.transition.rise":"Od dołu","editor.global.transition_duration":"Czas przejścia (ms)","editor.global.transition_easing":"Krzywa przejścia (CSS, np. ease-out)","editor.global.content_height":"Wysokość treści (auto, tallest lub np. 400px)","editor.global.content_max_height":"Maksymalna wysokość treści (przewijanie wewnątrz)","editor.global.fullscreen":"Przycisk pełnego ekranu","editor.global.swipe_peek":"Podgląd przy przesuwaniu (treść podąża za palcem)","editor.global.unload_after":"Zwalniaj nieużywane zakładki po (minuty, 0 = nigdy)","editor.global.transition_narrow":"Przejście na wąskich kartach (np. telefony)","card.no_entities":"Brak encji.","card.pin_title":"Wpisz kod dla {tab}","card.pin_label":"Kod","card.pin_wrong":"Nieprawidłowy kod","card.cancel":"Anuluj","card.open":"Otwórz","editor.tab.badge_icon":"Ikona plakietki","editor.tab.ring":"Pierścień postępu (encja, szablon lub liczba)","editor.tab.ring_max":"Maksimum pierścienia (domyślnie 100)","editor.tab.ring_color":"Kolor pierścienia","editor.tab.area":"Obszar (bez karty: pokazuje jego encje jako kafelki)","editor.tab.pin":"PIN (blokada wygody, nie zabezpieczenie)","editor.tab.pin_timeout":"Odblokowanie trwa (minuty, 0 = do przeładowania)","editor.global.alert_first":"Przenoś alarmujące zakładki na początek","editor.global.alert_snooze":"Długie naciśnięcie wycisza alarm (minuty, 0 = wył.)","editor.global.remote_entity":"Śledź tę encję (jej stan wybiera zakładkę)","editor.global.remote_event":"Przełączaj na zdarzenia tabdeck_select (administratorzy)","editor.global.fire_event":"Wysyłaj zdarzenia tabdeck_tab_changed (administratorzy)","editor.global.event_id":"Nazwa karty w zdarzeniach"}}),Ca=le(()=>{va={"editor.tab.name":"Nome do separador","editor.tab.subtitle":"Subtítulo","editor.tab.icon":"Ícone","editor.tab.accent":"Cor de destaque","editor.tab.color":"Cor do texto/ícone","editor.tab.badge":"Distintivo (id de entidade ou modelo)","editor.tab.badge_color":"Cor do distintivo","editor.tab.disabled":"Desativar separador (esbatido, não selecionável)","editor.tab.card_size":"Tamanho indicativo do cartão (linhas)","editor.tab.hold_action":"Ação ao manter premido","editor.tab.badge_action":"Ação ao tocar no distintivo","editor.tab.tap_action":"Ação ao tocar (em vez de abrir o separador, p. ex. navegar)","editor.tab.enter_action":"Ação ao abrir este separador","editor.tab.leave_action":"Ação ao sair deste separador","editor.global.preset":"Estilo predefinido (aplica um conjunto das opções abaixo)","editor.global.position":"Posição","editor.global.style":"Estilo","editor.global.tab_display":"Apresentação dos separadores","editor.global.align":"Alinhamento dos separadores","editor.global.badge_display":"Apresentação dos distintivos","editor.global.hide_inactive_badge":"Ocultar distintivos inativos (0/off)","editor.global.transition":"Transição do conteúdo","editor.global.indicator_size":"Espessura do indicador (px)","editor.global.indicator_radius":"Raio dos cantos do indicador (px)","editor.global.remember":"Lembrar o separador selecionado","editor.global.remember_entity":"Entidade para lembrar (input_number/input_text)","editor.global.storage_key":"Chave de armazenamento (modo navegador)","editor.global.default_tab":"Separador predefinido","editor.global.scrollable":"Deslocável","editor.global.lazy":"Carregamento diferido dos separadores inativos","editor.global.unmount_hidden":"Descarregar separadores ocultos (poupa memória)","editor.global.swipe_wrap":"Deslizar de forma circular","editor.global.animated":"Animar indicador","editor.global.accent_indicator":"Colorir indicador com o destaque do separador","editor.global.header":"Mostrar cabeçalho (título do separador ativo acima do conteúdo)","editor.global.aria_label":"Nome acessível da barra de separadores","editor.global.sticky":"Barra de separadores fixa","editor.global.elevation":"Elevar barra com sombra","editor.global.scroll_buttons":"Botões de deslocamento quando a barra não cabe","editor.global.overflow_menu":"Menu ⋯ quando a barra não cabe","editor.global.bar_background":"Cor de fundo da barra de separadores","editor.global.swipe":"Deslizar para mudar de separador (telemóvel)","editor.global.swipe_mouse":"Arrastar com o rato para mudar de separador (computador)","editor.global.tab_display_narrow":"Apresentação dos separadores em cartões estreitos","editor.global.narrow_width":"Estreito abaixo de (px)","editor.global.split":"Vista dividida a partir desta largura (px, 0 = desligado)","editor.global.collapsible":"Recolhível (toque no separador ativo para recolher o conteúdo)","editor.global.start_collapsed":"Iniciar recolhido","editor.global.scroll_spy":"Scroll-spy: empilhar separadores como secções","editor.global.auto_rotate":"Rodar separadores automaticamente a cada (segundos, 0 = desligado)","editor.global.idle_return":"Voltar ao separador predefinido após inatividade (segundos, 0 = desligado)","editor.global.edit_mode_reveal":"Mostrar separadores ocultos ao editar o painel","editor.cond.visibility.label":"Visibilidade","editor.cond.visibility.hint":"mostrar o separador apenas quando…","editor.cond.alert.label":"Alerta","editor.cond.alert.hint":"fazer pulsar o separador quando…","editor.cond.default_if.label":"Predefinido quando","editor.cond.default_if.hint":"começar neste separador quando…","editor.tab_n":"Separador {n}","editor.copy_name":"Cópia de {name}","editor.copied":'Separador "{name}" copiado: cole-o em Importar separador.',"editor.clipboard_error":"Não foi possível aceder à área de transferência.","editor.import_error":"Isso não parece um separador (requer card, cards ou tap_action).","editor.imported_one":"1 separador importado.","editor.imported_many":"{count} separadores importados.","editor.import_hint":"Cole um separador (ou uma lista de separadores) copiado com Copiar separador, ou qualquer YAML de separador.","editor.add":"Adicionar","editor.cancel":"Cancelar","editor.warn_duplicates":'Nomes de separador duplicados ({names}). "Remember: url" e o separador predefinido por nome podem ser ambíguos.',"editor.back":"Voltar","editor.change_type":"Alterar tipo de cartão","editor.card_type":"Tipo de cartão","editor.card_type_hint":"Escolha um tipo de cartão para o configurar. Introduza um tipo personalizado (p. ex. custom:my-card) para cartões que não estejam na lista.","editor.card_json":"Cartão (JSON)","editor.invalid_json":"JSON inválido: não foi guardado.","editor.expand_all":"Expandir tudo","editor.collapse_all":"Recolher tudo","editor.drag":"Arrastar para reordenar","editor.move_up":"Mover para cima","editor.move_down":"Mover para baixo","editor.copy_tab":"Copiar separador","editor.duplicate_tab":"Duplicar separador","editor.delete_tab":"Eliminar separador","editor.add_tab":"Adicionar separador","editor.import_tab":"Importar separador","editor.edit_card":"Editar cartão","editor.preview":"Pré-visualização","editor.opt.position.top":"Topo","editor.opt.position.bottom":"Fundo","editor.opt.position.left":"Esquerda","editor.opt.position.right":"Direita","editor.opt.tab_display.both":"Ícone e etiqueta","editor.opt.tab_display.icon":"Apenas ícone","editor.opt.tab_display.label":"Apenas etiqueta","editor.opt.tab_display.active":"Ícones; separador selecionado expandido","editor.opt.tab_display.":"(igual à apresentação dos separadores)","editor.opt.align.start":"Início","editor.opt.align.center":"Centro","editor.opt.align.end":"Fim","editor.opt.align.justify":"Largura total","editor.opt.badge_display.text":"Texto","editor.opt.badge_display.dot":"Ponto","editor.opt.transition.none":"Nenhuma","editor.opt.transition.fade":"Desvanecer","editor.opt.transition.slide":"Deslizar","editor.opt.remember.none":"Não lembrar","editor.opt.remember.browser":"Por navegador","editor.opt.remember.url":"No URL (#tab=)","editor.opt.remember.entity":"Numa entidade auxiliar (todos os dispositivos)","editor.opt.scrollable.auto":"Automático","editor.opt.scrollable.true":"Sempre","editor.opt.scrollable.false":"Nunca","check.now_met":"Cumprida agora","check.now_unmet":"Não cumprida agora","check.chip_hidden":"Oculto agora","check.chip_alert":"Em alerta","check.chip_hidden_title":"As condições de visibilidade deste separador não são cumpridas, por isso está oculto no painel.","check.state_is":"{entity} é {values}","check.state_is_not":"{entity} não é {values}","check.or":" ou ","check.now":"agora: {value}","check.missing":"entidade não encontrada","check.numeric":"{entity} {range}","check.above":"acima de {value}","check.below":"abaixo de {value}","check.and":" e ","check.screen":"o ecrã corresponde a {query}","check.time":"hora {range}","check.time_after":"depois das {value}","check.time_before":"antes das {value}","check.time_days":"em {days}","check.user":"o utilizador atual é um dos {count} selecionados","check.template":"o modelo devolve true","check.template_pending":"modelo (a aguardar o Home Assistant)","check.group_and":"todas:","check.group_or":"qualquer uma:","check.group_not":"nenhuma:","check.unknown":"tipo de condição desconhecido","card.tabs":"Separadores","card.scroll_left":"Deslocar para a esquerda","card.scroll_right":"Deslocar para a direita","card.all_tabs":"Todos os separadores","card.badge":"distintivo: {value}","card.ghost":"Oculto: as condições de visibilidade não são cumpridas (visível ao editar)","starter.button":"Começar a partir de um modelo","starter.hint":"Crie um conjunto de separadores a partir das suas entidades. Substituir troca os separadores atuais; Adicionar mantém-nos.","starter.pick":"Modelo","starter.replace":"Substituir separadores","starter.append":"Adicionar separadores","starter.cancel":"Cancelar","starter.none":'Nada para criar: não foram encontradas entidades para "{name}".',"starter.done":'Modelo "{name}" adicionado.',"starter.kind.rooms":"Divisões: um separador por área","starter.kind.lights":"Luzes: um separador por área com luzes","starter.kind.security":"Segurança: alarme, câmaras, portas e fechaduras","starter.kind.media":"Multimédia: um separador por leitor multimédia","starter.kind.climate":"Climatização: um separador por termóstato","starter.kind.energy":"Energia: os cartões do painel de energia","starter.kind.family":"Família: um separador por pessoa, com mapa","starter.tab.alarm":"Alarme","starter.tab.cameras":"Câmaras","starter.tab.openings":"Portas e janelas","starter.tab.locks":"Fechaduras","starter.tab.energy_now":"Agora","starter.tab.energy_usage":"Consumo","starter.tab.energy_sources":"Fontes","starter.tab.energy_devices":"Dispositivos","convert.button":"Converter a partir de outro cartão","convert.hint":"Cole o YAML de um tabbed-card, swipe-card, state-switch, uma pilha vertical/horizontal ou grelha, pop-ups do Bubble Card, um cartão condicional, uma vista de secções ou um painel completo.","convert.detected":"Detetado {source}: {count} separadores.","convert.replace":"Substituir separadores","convert.append":"Adicionar separadores","convert.cancel":"Cancelar","convert.done":"{count} separadores convertidos a partir de {source}.","convert.error.empty":"Não há nada para converter nessa lista.","convert.error.not_card":"Isso não parece um cartão, uma lista de cartões, uma vista nem um painel.","convert.error.no_tabs":"Nada para converter: não foram encontrados cartões.","convert.source.tabdeck":"um cartão Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"pop-ups do Bubble Card","convert.source.dashboard":"um painel (um separador por vista)","convert.source.view":"uma vista","convert.source.sections":"uma vista de secções (um separador por secção)","convert.source.stack":"uma pilha (um separador por cartão ou cabeçalho)","convert.source.cards":"cartões","convert.note.styles":"Apenas --mdc-theme-primary foi transferido (como --tabdeck-accent); os outros estilos do tabbed-card não têm equivalente no Tabdeck.","convert.note.tab_styles":"Os estilos por separador do tabbed-card não foram transferidos.","convert.note.autoplay":"Autoplay passou a auto_rotate (segundos).","convert.note.state_switch_mode":"Este modo do state-switch (utilizador / media query / modelo) não tem equivalente direto; os estados passaram a separadores simples. Adicione condições de visibilidade se necessário.","convert.note.bubble":"Cada pop-up passou a um separador; o botão e o estilo próprios do pop-up não são usados.","convert.note.dashboard":"Cada vista passou a um separador. Painéis grandes podem gerar um cartão pesado; considere lazy: true.","editor.global.dock":"Dock: fixar a barra no fundo do ecrã (navegação de telemóvel)","editor.tab.fab":"Estilo de botão de ação flutuante","editor.global.content_arrows":"Setas anterior / seguinte sobre o conteúdo","editor.opt.tab_display.dots":"Pontos","card.prev_tab":"Separador anterior","card.next_tab":"Separador seguinte","editor.global.search":"Pesquisa rápida (botão 🔍)","editor.global.hotkeys":"Atalhos de teclado (1–9, [ ], /)","card.search":"Procurar um separador","card.search_placeholder":"Escreva para filtrar…","card.search_none":"Nenhum separador corresponde","editor.global.history":"O botão Voltar regressa ao separador anterior","editor.global.customize":"Permitir que cada pessoa reordene e oculte separadores (por navegador)","card.customize":"Organizar separadores","card.move_up":"Mover {name} para cima","card.move_down":"Mover {name} para baixo","card.hide_tab":"Ocultar {name}","card.show_tab":"Mostrar {name}","card.reset":"Repor","card.done":"Concluído","editor.global.rail_expand":"Barra lateral: só ícones, rótulos ao passar o rato (esquerda/direita)","card.fullscreen":"Ecrã inteiro","card.exit_fullscreen":"Sair do ecrã inteiro","editor.tab.background":"Fundo (cor, gradiente ou URL de imagem)","editor.opt.transition.scale":"Escala","editor.opt.transition.flip":"Rotação","editor.opt.transition.rise":"De baixo","editor.global.transition_duration":"Duração da transição (ms)","editor.global.transition_easing":"Curva da transição (CSS, ex. ease-out)","editor.global.content_height":"Altura do conteúdo (auto, tallest ou ex. 400px)","editor.global.content_max_height":"Altura máxima do conteúdo (desliza por dentro)","editor.global.fullscreen":"Botão de ecrã inteiro","editor.global.swipe_peek":"Pré-visualização ao deslizar (o conteúdo segue o dedo)","editor.global.unload_after":"Libertar separadores sem uso após (minutos, 0 = nunca)","editor.global.transition_narrow":"Transição em cartões estreitos (ex. telemóveis)","card.no_entities":"Não há entidades aqui.","card.pin_title":"Introduza o código de {tab}","card.pin_label":"Código","card.pin_wrong":"Código errado","card.cancel":"Cancelar","card.open":"Abrir","editor.tab.badge_icon":"Ícone do distintivo","editor.tab.ring":"Anel de progresso (entidade, modelo ou número)","editor.tab.ring_max":"Máximo do anel (predefinição 100)","editor.tab.ring_color":"Cor do anel","editor.tab.area":"Divisão (sem cartão: mostra as entidades em mosaicos)","editor.tab.pin":"PIN (bloqueio de conveniência, não de segurança)","editor.tab.pin_timeout":"O desbloqueio dura (minutos, 0 = até recarregar)","editor.global.alert_first":"Mover para o início os separadores em alerta","editor.global.alert_snooze":"Toque longo silencia um alerta (minutos, 0 = não)","editor.global.remote_entity":"Seguir esta entidade (o estado escolhe o separador)","editor.global.remote_event":"Mudar com eventos tabdeck_select (administradores)","editor.global.fire_event":"Disparar eventos tabdeck_tab_changed (administradores)","editor.global.event_id":"Nome do cartão nos eventos"}});function Ta(e){return String(e?.locale?.language??e?.language??"en")}function ja(e,t,a){let i=ya[function(e){if(ya[e])return e;const t=e.split(/[-_]/)[0].toLowerCase();return ya[t]?t:"en"}(e)][t]??pa[t]??t;if(a)for(const[o,r]of Object.entries(a))i=i.split(`{${o}}`).join(String(r));return i}function Ea(e){return e in pa}var Oa=le(()=>{ka(),wa(),xa(),za(),$a(),Aa(),Sa(),Ca(),ya={en:pa,de:ua,es:ha,fr:ba,it:_a,nl:ma,pl:ga,pt:va}});fa(),Oa();var Na={order:[],hidden:[]},Ma=e=>`tabdeck-layout:${e}`;function Pa(e,t){if(0===t.order.length)return e;const a=e=>{const a=void 0===e.name?-1:t.order.indexOf(e.name);return a<0?Number.MAX_SAFE_INTEGER:a};return e.map((e,t)=>({t:e,i:t})).sort((e,t)=>a(e.t)-a(t.t)||e.i-t.i).map(e=>e.t)}function Ia(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n}var La,Da,Ra=le(()=>{});function Va(e){if(null==e)return!1;const t=String(e).trim().toLowerCase();return(""===t||0!==Number(t))&&!La.has(t)}var Ha=le(()=>{Ra(),La=/* @__PURE__ */new Set(["","0","off","false","no","none","unavailable","unknown","closed"]),Da=class extends me{constructor(...e){super(...e),this.badgeAction=!1,this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1,this.alert=!1,this.action=!1,this.ghost=!1,this.stacked=!1,this.fab=!1,this.hasMenu=!1,this.ghostLabel="Hidden: its visibility conditions aren't met (shown while editing)",this._onKeydown=e=>{!this.action||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab"),this.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),super.disconnectedCallback()}updated(){this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected||this.action?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color"),this.ghost?this.title=this.ghostLabel:this.removeAttribute("title"),"dots"===this.display&&this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")}render(){if("dots"===this.display)return K`<span class="dot" part="dot"></span>`;const e="active"===this.display?this.selected?"both":"icon":this.display,t=!!this.icon,a="icon"!==e||!t;return K`
      <div class="inner">
        ${"label"!==e&&t?this._renderIcon():Z}
        ${a&&this.label?K`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?K`<span class="subtitle">${this.subtitle}</span>`:Z}
            </span>`:Z}
        ${this._renderBadge()}
        ${this.hasMenu?K`<span class="caret" aria-hidden="true">▾</span>`:Z}
        ${this.ghost?K`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`:Z}
      </div>
    `}_renderIcon(){return void 0!==this.ring&&null!==this.ring&&Number.isFinite(this.ring)?K`<span class="icon-wrap">
      <svg class="ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="ring-track" cx="18" cy="18" r="16" pathLength="100"></circle>
        <circle
          class="ring-value"
          cx="18"
          cy="18"
          r="16"
          pathLength="100"
          stroke-dasharray="${Math.round(this.ring)} 100"
          style=${this.ringColor?`stroke:${this.ringColor}`:""}
        ></circle>
      </svg>
      <ha-icon icon=${this.icon}></ha-icon>
    </span>`:K`<ha-icon icon=${this.icon}></ha-icon>`}_onBadgeClick(e){this.badgeAction&&(e.stopPropagation(),this.dispatchEvent(new CustomEvent("badge-click",{bubbles:!0,composed:!0})))}_renderBadge(){const e=this.badgeColor?`background:${this.badgeColor}`:"",t=this.badgeAction?" clickable":"";return this.badgeIcon&&(void 0===this.badge||Va(this.badge))?K`<span
        class="badge icon-badge${t}"
        part="badge"
        style=${e}
        aria-label=${this.badgeLabel??`badge: ${this.badge??""}`}
        @click=${this._onBadgeClick}
        ><ha-icon icon=${this.badgeIcon}></ha-icon
      ></span>`:"dot"===this.badgeDisplay?Va(this.badge)?K`<span class="badge-dot${t}" part="badge-dot" style=${e} @click=${this._onBadgeClick}></span>`:Z:this.badge?K`<span
          class="badge${t}"
          part="badge"
          style=${e}
          aria-label=${this.badgeLabel??`badge: ${this.badge}`}
          @click=${this._onBadgeClick}
          >${this.badge}</span>`:Z}static{this.styles=n`
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 16px;
      height: var(--tabdeck-tab-height, 48px);
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: var(--tabdeck-tab-font-size, 14px);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      user-select: none;
      white-space: nowrap;
      outline: none;
      transition: color 120ms ease;
    }
    :host([selected]) {
      color: var(--tabdeck-accent, var(--primary-color));
    }
    /* alert: a gentle pulsing tint + alert-coloured label/icon. */
    :host([alert]) {
      color: var(--tabdeck-alert-color, var(--error-color, #db4437));
      border-radius: var(--tabdeck-alert-radius, 8px);
      animation: tabdeck-alert-pulse 1.6s ease-in-out infinite;
    }
    @keyframes tabdeck-alert-pulse {
      0%,
      100% {
        background: transparent;
      }
      50% {
        background: color-mix(
          in srgb,
          var(--tabdeck-alert-color, var(--error-color, #db4437)) 20%,
          transparent
        );
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([alert]) {
        animation: none;
        background: color-mix(
          in srgb,
          var(--tabdeck-alert-color, var(--error-color, #db4437)) 14%,
          transparent
        );
      }
    }
    /* dots: pagination dots; the selected one stretches into a pill. */
    :host([display="dots"]) {
      padding: 0 4px;
      height: var(--tabdeck-dot-area, 24px);
    }
    .dot {
      display: block;
      width: var(--tabdeck-dot-size, 8px);
      height: var(--tabdeck-dot-size, 8px);
      border-radius: 999px;
      background: var(--secondary-text-color);
      opacity: 0.5;
      transition: width 160ms ease, opacity 160ms ease, background 160ms ease;
    }
    :host([selected]) .dot {
      width: calc(var(--tabdeck-dot-size, 8px) * 2.5);
      opacity: 1;
      background: var(--tabdeck-accent, var(--primary-color));
    }
    :host([alert]) .dot {
      background: var(--tabdeck-alert-color, var(--error-color, #db4437));
      opacity: 1;
    }
    :host([stacked]) {
      flex-direction: column;
      justify-content: center;
      padding: 0 8px;
      height: var(--tabdeck-dock-tab-height, 56px);
      font-size: var(--tabdeck-dock-font-size, 11px);
    }
    :host([stacked]) .inner {
      flex-direction: column;
      gap: 2px;
      position: relative;
    }
    :host([stacked]) .text {
      align-items: center;
    }
    :host([stacked]) .subtitle {
      display: none;
    }
    :host([stacked]) .badge,
    :host([stacked]) .badge-dot {
      position: absolute;
      top: -4px;
      left: calc(50% + 6px);
    }
    :host([fab]) {
      color: var(--text-primary-color, #fff);
      padding: 0;
      align-self: center;
      justify-content: center;
      width: var(--tabdeck-fab-size, 48px);
      height: var(--tabdeck-fab-size, 48px);
      margin: 0 6px;
      border-radius: 50%;
      background: var(--tabdeck-fab-color, var(--tabdeck-accent, var(--primary-color)));
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      flex: 0 0 auto !important;
    }
    :host([fab][stacked]) {
      margin-top: -18px;
      width: var(--tabdeck-fab-size, 56px);
      height: var(--tabdeck-fab-size, 56px);
    }
    :host([fab]) .text,
    :host([fab]) .badge {
      display: none;
    }
    :host([fab]) ha-icon {
      --mdc-icon-size: 26px;
    }
    :host([ghost]) {
      opacity: 0.55;
      outline: 1px dashed currentColor;
      outline-offset: -6px;
      border-radius: 8px;
    }
    .caret {
      font-size: 11px;
      opacity: 0.7;
      margin-left: -2px;
    }
    .ghost-mark {
      --mdc-icon-size: 14px;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 2px var(--tabdeck-accent, var(--primary-color));
      border-radius: 6px;
    }
    .inner {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .text {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.15;
    }
    .subtitle {
      font-size: 11px;
      font-weight: 400;
      color: var(--secondary-text-color);
      opacity: 0.9;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    .icon-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 18px;
    }
    .ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ring circle {
      fill: none;
      stroke-width: 3;
    }
    .ring-track {
      stroke: var(--tabdeck-ring-track, rgba(127, 127, 127, 0.25));
    }
    .ring-value {
      stroke: var(--tabdeck-ring-color, var(--tabdeck-accent, var(--primary-color)));
      stroke-linecap: round;
    }
    .icon-badge {
      padding: 0 3px;
    }
    .icon-badge ha-icon {
      --mdc-icon-size: 13px;
    }
    .badge {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--tabdeck-accent, var(--primary-color));
      color: var(--text-primary-color, #fff);
      font-size: 11px;
      line-height: 18px;
      text-align: center;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tabdeck-accent, var(--primary-color));
      flex-shrink: 0;
    }
    .badge.clickable,
    .badge-dot.clickable {
      cursor: pointer;
    }
  `}},Ia([Ae()],Da.prototype,"label",void 0),Ia([Ae()],Da.prototype,"subtitle",void 0),Ia([Ae()],Da.prototype,"icon",void 0),Ia([Ae()],Da.prototype,"badge",void 0),Ia([Ae()],Da.prototype,"badgeColor",void 0),Ia([Ae({type:Boolean})],Da.prototype,"badgeAction",void 0),Ia([Ae()],Da.prototype,"badgeDisplay",void 0),Ia([Ae()],Da.prototype,"accent",void 0),Ia([Ae()],Da.prototype,"color",void 0),Ia([Ae({reflect:!0})],Da.prototype,"display",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"selected",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"disabled",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"alert",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"action",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"ghost",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"stacked",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"fab",void 0),Ia([Ae({type:Boolean,reflect:!0})],Da.prototype,"hasMenu",void 0),Ia([Ae()],Da.prototype,"ghostLabel",void 0),Ia([Ae()],Da.prototype,"badgeLabel",void 0),Ia([Ae({type:Number})],Da.prototype,"ring",void 0),Ia([Ae()],Da.prototype,"ringColor",void 0),Ia([Ae()],Da.prototype,"badgeIcon",void 0),Da=Ia([ve("tabdeck-tab")],Da)});Ha();var Ba=e=>void 0===e?void 0:(Array.isArray(e)?e:[e]).map(String).filter(e=>""!==e);function qa(e,t){const a=e?.entities?.[t];if(a)return a.area_id||e?.devices?.[a.device_id]?.area_id||void 0}var Ua=/^([01]?\d|2[0-3]):([0-5]\d)$/;var Fa="tabdeck-device";function Ka(e=("undefined"!=typeof location?location.search:"")){try{const t=new URLSearchParams(e).get("tabdeck_device");return t?(localStorage.setItem(Fa,t),t):localStorage.getItem(Fa)||localStorage.getItem("browser_mod-browser-id")||void 0}catch{return}}var Wa=(e,t)=>`tabdeck-snooze:${e}:${t}`;var Za,Ga=(e,t)=>`tabdeck-pin:${e}:${t}`;var Ja,Ya=le(()=>{Za=3}),Xa=le(()=>{ze(),Ke(),Ya(),Ha(),Ra(),Ja=class extends me{constructor(...e){super(...e),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this.scrollButtons=!1,this.overflowMenu=!1,this._menuOpen=!1,this._groupOpen=-1,this._groupLeft=0,this.collapsed=!1,this.language="en",this.railExpand=!1,this._railOpen=!1,this.customizable=!1,this.customItems=[],this._customOpen=!1,this.searchable=!1,this.expandable=!1,this._searchOpen=!1,this._query="",this._active=0,this.dock=!1,this._ready=!1,this._overflow=!1,this._resizeRaf=0,this._railEnter=()=>{this._railActive&&(this._railOpen=!0)},this._railLeave=()=>{this._railActive&&!this.matches(":focus-within")&&(this._railOpen=!1)},this._railFocusOut=e=>{if(!this._railActive)return;const t=e.relatedTarget;t&&this.contains(t)||this.matches(":hover")||(this._railOpen=!1)},this._suppressClick=!1,this._onCustomOutside=e=>{const t=this.renderRoot.querySelector(".custom-panel"),a=this.renderRoot.querySelector(".custom-btn"),i=e.composedPath();t&&i.includes(t)||a&&i.includes(a)||this._closeCustom()},this._onSearchOutside=e=>{const t=this.renderRoot.querySelector(".search-panel"),a=this.renderRoot.querySelector(".search-btn"),i=e.composedPath();t&&i.includes(t)||a&&i.includes(a)||this._closeSearch()},this._onOutside=e=>{const t=this.renderRoot.querySelector(".group-menu");if(t&&e.composedPath().includes(t))return;const a=this.renderRoot.querySelectorAll("tabdeck-tab");e.composedPath().includes(a[this._groupOpen])||this._closeGroup()},this._onKeydown=e=>{const t="left"===this.position||"right"===this.position,a=t?"ArrowDown":"ArrowRight",i=t?"ArrowUp":"ArrowLeft";let o=null;e.key===a?o=this._step(this.selected,1):e.key===i?o=this._step(this.selected,-1):"Home"===e.key?o=this._firstEnabled():"End"===e.key&&(o=this._firstEnabled(!0)),null!==o&&(e.preventDefault(),this._select(o))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.setAttribute("aria-label",this.barLabel||ja(this.language,"card.tabs")),this.addEventListener("keydown",this._onKeydown),this.addEventListener("mouseenter",this._railEnter),this.addEventListener("mouseleave",this._railLeave),this.addEventListener("focusin",this._railEnter),this.addEventListener("focusout",this._railFocusOut),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0,this._position()}))}))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),window.removeEventListener("pointerdown",this._onOutside,!0),window.removeEventListener("pointerdown",this._onSearchOutside,!0),window.removeEventListener("pointerdown",this._onCustomOutside,!0),this._resizeObserver?.disconnect(),super.disconnectedCallback()}get _railActive(){return this.railExpand&&!this._horizontal}_select(e){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:e},bubbles:!0,composed:!0}))}_emitAction(e,t){this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:e,kind:t},bubbles:!0,composed:!0}))}_onPointerDown(e){this._suppressClick=!1,this.items[e]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._suppressClick=!0,this._emitAction(e,"hold")},500))}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(e,t){this._cancelHold(),this._suppressClick?this._suppressClick=!1:this.items[e]?.menu?.length?this._toggleGroup(e,t?.currentTarget):this._select(e)}_emitCustomize(e){this.dispatchEvent(new CustomEvent("tabdeck-customize",{detail:e,bubbles:!0,composed:!0}))}_customLayout(e=this.customItems){return{order:e.map(e=>e.key).filter(e=>void 0!==e),hidden:e.filter(e=>e.hidden&&void 0!==e.key).map(e=>e.key)}}_moveCustom(e,t){const a=this.customItems.slice(),i=e+t;i<0||i>=a.length||([a[e],a[i]]=[a[i],a[e]],this._emitCustomize(this._customLayout(a)))}_toggleCustomHidden(e){const t=this.customItems.map((t,a)=>a===e?{...t,hidden:!t.hidden}:t);t.every(e=>e.hidden)||this._emitCustomize(this._customLayout(t))}_openCustom(){this._customOpen=!0,window.addEventListener("pointerdown",this._onCustomOutside,!0)}_closeCustom(){this._customOpen=!1,window.removeEventListener("pointerdown",this._onCustomOutside,!0)}_renderCustom(){const e=this.language,t=(t,a)=>ja(e,t,a),a=this.customItems.length;return K`<div
      class="custom-panel"
      role="dialog"
      aria-label=${t("card.customize")}
      @keydown=${e=>{e.stopPropagation(),"Escape"===e.key&&this._closeCustom()}}
    >
      <div class="custom-title">${t("card.customize")}</div>
      ${this.customItems.map((e,i)=>K`<div class="custom-row ${e.hidden?"is-hidden":""}">
          ${e.icon?K`<ha-icon .icon=${e.icon}></ha-icon>`:K`<span class="custom-noicon"></span>`}
          <span class="custom-name">${e.name??""}</span>
          <button class="custom-up" ?disabled=${0===i} aria-label=${t("card.move_up",{name:e.name??""})} @click=${()=>this._moveCustom(i,-1)}>↑</button>
          <button class="custom-down" ?disabled=${i===a-1} aria-label=${t("card.move_down",{name:e.name??""})} @click=${()=>this._moveCustom(i,1)}>↓</button>
          <button
            class="custom-eye"
            aria-pressed=${e.hidden?"false":"true"}
            aria-label=${t(e.hidden?"card.show_tab":"card.hide_tab",{name:e.name??""})}
            @click=${()=>this._toggleCustomHidden(i)}
          >
            <ha-icon .icon=${e.hidden?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
          </button>
        </div>`)}
      <div class="custom-actions">
        <button class="custom-reset" @click=${()=>this._emitCustomize({reset:!0})}>${t("card.reset")}</button>
        <button class="custom-done" @click=${()=>this._closeCustom()}>${t("card.done")}</button>
      </div>
    </div>`}_matches(e){const t=e=>(e??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),a=t(e).trim();return this.items.map((e,t)=>({index:t,item:e})).filter(({item:e})=>!e.disabled).filter(({item:e})=>!a||t(e.name).includes(a)||t(e.subtitle).includes(a))}openSearch(){this._query="",this._active=0,this._searchOpen=!0,window.addEventListener("pointerdown",this._onSearchOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeSearch(){this._searchOpen=!1,window.removeEventListener("pointerdown",this._onSearchOutside,!0)}_pickSearch(e){this._closeSearch(),this._select(e)}_onSearchKeydown(e){e.stopPropagation();const t=this._matches(this._query);if("Escape"===e.key)this._closeSearch();else if("Enter"===e.key){e.preventDefault();const a=t[this._active]??t[0];a&&this._pickSearch(a.index)}else if("ArrowDown"===e.key||"ArrowUp"===e.key){e.preventDefault();const a=t.length||1;this._active=(this._active+("ArrowDown"===e.key?1:-1)+a)%a}}_renderSearch(){const e=this._matches(this._query),t=this.language;return K`<div class="search-panel" role="dialog" aria-label=${ja(t,"card.search")}>
      <input
        class="search-input"
        type="search"
        placeholder=${ja(t,"card.search_placeholder")}
        aria-label=${ja(t,"card.search")}
        .value=${this._query}
        @input=${e=>{this._query=e.target.value,this._active=0}}
        @keydown=${e=>this._onSearchKeydown(e)}
      />
      <div class="search-results" role="listbox">
        ${e.length?e.map((e,t)=>K`<button
                class="group-item ${t===this._active?"active":""}"
                role="option"
                aria-selected=${t===this._active?"true":"false"}
                @click=${()=>this._pickSearch(e.index)}
              >
                ${e.item.icon?K`<ha-icon .icon=${e.item.icon}></ha-icon>`:""}<span>${e.item.name??""}</span>
              </button>`):K`<div class="search-empty">${ja(t,"card.search_none")}</div>`}
      </div>
    </div>`}_toggleGroup(e,t){if(this._groupOpen===e)return void this._closeGroup();const a=this.renderRoot.querySelector(".bar");this._groupLeft=t?t.offsetLeft-(a?.scrollLeft??0):0,this._groupOpen=e,window.addEventListener("pointerdown",this._onOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".group-item")?.focus())}_closeGroup(){this._groupOpen=-1,window.removeEventListener("pointerdown",this._onOutside,!0)}_pickChild(e,t){this._closeGroup(),this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:e,child:t},bubbles:!0,composed:!0}))}_onGroupKeydown(e){const t=[...this.renderRoot.querySelectorAll(".group-item")],a=t.indexOf(e.composedPath()[0]);if("Escape"===e.key){e.stopPropagation();const t=this.renderRoot.querySelectorAll("tabdeck-tab")[this._groupOpen];this._closeGroup(),t?.focus()}else if("ArrowDown"===e.key||"ArrowUp"===e.key){e.preventDefault(),e.stopPropagation();const i=t.length;t[(a+("ArrowDown"===e.key?1:-1)+i)%i]?.focus()}}_renderGroupMenu(){const e=this.items[this._groupOpen];if(!e?.menu)return"";const t=this._groupOpen;return K`<div
      class="group-menu"
      role="menu"
      style="left:${this._groupLeft}px"
      @keydown=${e=>this._onGroupKeydown(e)}
    >
      ${e.menu.map(e=>K`<button class="group-item" role="menuitem" @click=${()=>this._pickChild(t,e.name)}>
          ${e.icon?K`<ha-icon .icon=${e.icon}></ha-icon>`:""}<span>${e.name??""}</span>
        </button>`)}
    </div>`}_selectable(e){const t=this.items[e];return!!t&&!t.disabled&&!t.action}_step(e,t){const a=this.items.length;for(let i=1;i<=a;i++){const o=(e+t*i+a*i)%a;if(this._selectable(o))return o}return e}_firstEnabled(e=!1){const t=this.items.length;for(let a=0;a<t;a++){const i=e?t-1-a:a;if(this._selectable(i))return i}return 0}_position(){const e=this.renderRoot,t=e?.querySelector(".indicator");if(!t)return;const a=(e?.querySelectorAll("tabdeck-tab"))?.[this.selected],i=a?function(e,t,a,i=Za){if(!e||e.offsetWidth<=0)return null;const o=i>0?i:Za;if("text"===a)return null;if("pill"===a||"segmented"===a||"boxed"===a||"rail"===a)return{left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight};switch(t){case"top":return{left:e.offsetLeft,top:e.offsetTop+e.offsetHeight-o,width:e.offsetWidth,height:o};case"bottom":return{left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:o};case"left":return{left:e.offsetLeft+e.offsetWidth-o,top:e.offsetTop,width:o,height:e.offsetHeight};case"right":return{left:e.offsetLeft,top:e.offsetTop,width:o,height:e.offsetHeight}}}({offsetLeft:a.offsetLeft,offsetTop:a.offsetTop,offsetWidth:a.offsetWidth,offsetHeight:a.offsetHeight},this.position,this.tabStyle,this.indicatorSize):null;i?(t.style.left=`${i.left}px`,t.style.top=`${i.top}px`,t.style.width=`${i.width}px`,t.style.height=`${i.height}px`,t.style.opacity="1"):t.style.opacity="0"}_applyAccent(){const e=this.accentIndicator?this.items[this.selected]?.accent:void 0;e?this.style.setProperty("--tabdeck-accent",e):this.style.removeProperty("--tabdeck-accent"),null!=this.indicatorRadius?this.style.setProperty("--tabdeck-indicator-radius",`${this.indicatorRadius}px`):this.style.removeProperty("--tabdeck-indicator-radius")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background=this.barBackground?"transparent":"var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.setProperty("top","var(--tabdeck-sticky-top, var(--header-height, 0px))"),this.style.bottom="");else for(const e of["position","zIndex","background","top","bottom"])this.style.removeProperty(e.replace(/[A-Z]/g,e=>"-"+e.toLowerCase()))}firstUpdated(){const e=this.renderRoot.querySelector(".bar");e&&this._resizeObserver&&this._resizeObserver.observe(e)}updated(){this.setAttribute("aria-label",this.barLabel||ja(this.language,"card.tabs")),this.toggleAttribute("rail-expand",this._railActive),this.toggleAttribute("expanded",this._railActive&&this._railOpen),this._applyAccent(),this._applySticky(),this._position();const e=[...this.renderRoot.querySelectorAll("tabdeck-tab")];Promise.all(e.map(e=>e.updateComplete)).then(()=>this._position()),this._updateOverflow(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}get _horizontal(){return"top"===this.position||"bottom"===this.position}_updateOverflow(){if(!this.scrollButtons&&!this.overflowMenu||!this._horizontal)return void(this._overflow&&(this._overflow=!1));const e=this.renderRoot.querySelector(".bar"),t=!!e&&e.scrollWidth-e.clientWidth>1;t!==this._overflow&&(this._overflow=t)}_scrollBy(e){const t=this.renderRoot.querySelector(".bar");t&&t.scrollBy({left:e*t.clientWidth*.8,behavior:"smooth"})}_pickFromMenu(e){this._menuOpen=!1,this.items[e]?.disabled||this._select(e)}render(){const e=this._ready&&this.animated?" animate":"",t=this.scrollButtons&&this._horizontal&&this._overflow,a=this.overflowMenu&&this._horizontal&&this._overflow;return K`
      <div class="bar-wrap ${t||a||this.searchable||this.customizable||this.expandable?"has-arrows":""}">
      ${t?K`<button class="scroll-btn left" aria-label=${ja(this.language,"card.scroll_left")} @click=${()=>this._scrollBy(-1)}>‹</button>`:""}
      <div
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation?"elevated":""} ${"dots"===this.display?"dots":""}"
        part="bar"
        style=${this.barBackground?`background:${this.barBackground}`:""}
      >
        <div class="indicator${e}" part="indicator"></div>
        ${this.items.map((e,t)=>K`
            <tabdeck-tab
              .label=${e.name}
              .subtitle=${e.subtitle}
              .icon=${e.icon}
              .badge=${e.badge}
              .badgeColor=${e.badgeColor}
              .badgeAction=${!!e.badgeAction}
              .badgeDisplay=${this.badgeDisplay}
              @badge-click=${()=>this._emitAction(t,"badge")}
              .accent=${e.accent}
              .color=${e.color}
              .disabled=${!!e.disabled}
              .alert=${!!e.alert}
              .action=${!!e.action}
              .ghost=${!!e.ghost}
              .fab=${!!e.fab}
              .ring=${e.ring}
              .ringColor=${e.ringColor}
              .badgeIcon=${e.badgeIcon}
              .hasMenu=${!!e.menu?.length}
              aria-haspopup=${e.menu?.length?"menu":"false"}
              aria-expanded=${e.menu?.length?String(this._groupOpen===t):"false"}
              .stacked=${this.dock}
              .ghostLabel=${ja(this.language,"card.ghost")}
              .badgeLabel=${ja(this.language,"card.badge",{value:e.badge??""})}
              .display=${this._railActive?this._railOpen?"both":"icon":this.display}
              .selected=${t===this.selected}
              aria-controls="tabdeck-panel"
              @click=${e=>this._onTabClick(t,e)}
              @pointerdown=${()=>this._onPointerDown(t)}
              @pointerup=${()=>this._cancelHold()}
              @pointerleave=${()=>this._cancelHold()}
              @pointercancel=${()=>this._cancelHold()}
            ></tabdeck-tab>
          `)}
      </div>
      ${this._groupOpen>=0?this._renderGroupMenu():""}
      ${this.searchable?K`<button
            class="search-btn"
            aria-label=${ja(this.language,"card.search")}
            aria-expanded=${this._searchOpen?"true":"false"}
            @click=${()=>this._searchOpen?this._closeSearch():this.openSearch()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
          </button>`:""}
      ${this._searchOpen?this._renderSearch():""}
      ${this.customizable?K`<button
            class="custom-btn search-btn"
            aria-label=${ja(this.language,"card.customize")}
            aria-expanded=${this._customOpen?"true":"false"}
            @click=${()=>this._customOpen?this._closeCustom():this._openCustom()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"></path></svg>
          </button>`:""}
      ${this._customOpen?this._renderCustom():""}
      ${this.expandable?K`<button
            class="fs-btn search-btn"
            aria-label=${ja(this.language,"card.fullscreen")}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-fullscreen",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"></path></svg>
          </button>`:""}
      ${t?K`<button class="scroll-btn right" aria-label=${ja(this.language,"card.scroll_right")} @click=${()=>this._scrollBy(1)}>›</button>`:""}
      ${a?K`<button
              class="overflow-btn"
              aria-label=${ja(this.language,"card.all_tabs")}
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${()=>this._menuOpen=!this._menuOpen}
            >
              ⋯
            </button>
            ${this._menuOpen?K`<div class="overflow-menu" role="menu">
                  ${this.items.map((e,t)=>K`<button
                      class="overflow-item ${t===this.selected?"current":""}"
                      role="menuitem"
                      ?disabled=${e.disabled}
                      @click=${()=>this._pickFromMenu(t)}
                    >
                      ${e.name??ja(this.language,"editor.tab_n",{n:t+1})}
                    </button>`)}
                </div>`:""}`:""}
      </div>
    `}static{this.styles=n`
    :host {
      display: block;
    }
    /* rail_expand: an icon rail that widens over the content on hover. */
    :host([rail-expand]) {
      position: relative;
      z-index: 3;
      flex: none;
      width: var(--tabdeck-rail-width, 64px);
    }
    :host([rail-expand]) .bar-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      min-width: 100%;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      transition: box-shadow 150ms ease;
    }
    :host([rail-expand]) .bar {
      height: 100%;
      box-sizing: border-box;
    }
    :host([rail-expand][expanded]) .bar-wrap {
      box-shadow: 4px 0 14px rgba(0, 0, 0, 0.25);
      border-radius: 0 12px 12px 0;
    }
    :host([rail-expand][expanded]) .bar {
      align-items: stretch;
    }
    :host([rail-expand][expanded]) tabdeck-tab {
      justify-content: flex-start;
      padding-right: 20px;
    }
    /* A right-hand rail grows leftwards. */
    :host([rail-expand]) .bar-wrap:has(.bar.right) {
      left: auto;
      right: 0;
    }
    :host([rail-expand][expanded]) .bar-wrap:has(.bar.right) {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
      border-radius: 12px 0 0 12px;
    }
    /* dots: a centred, borderless row of pagination dots, no indicator. */
    .bar.dots {
      justify-content: center;
      border: none;
      padding: 4px 0;
      gap: 0;
    }
    .bar.dots .indicator {
      display: none;
    }
    /* dock: a phone-style navigation bar fixed to the bottom of the screen. */
    :host([dock]) {
      position: fixed;
      left: var(--tabdeck-dock-left, 0);
      right: var(--tabdeck-dock-right, 0);
      bottom: 0;
      z-index: 5;
      padding-bottom: env(safe-area-inset-bottom, 0px);
      background: var(--tabdeck-dock-background, var(--card-background-color, var(--ha-card-background, #fff)));
      box-shadow: var(--tabdeck-dock-shadow, 0 -2px 10px rgba(0, 0, 0, 0.18));
    }
    :host([dock]) .bar {
      border-top: none;
      overflow: visible;
    }
    :host([dock]) .bar tabdeck-tab:not([fab]) {
      flex: 1 1 0;
      justify-content: center;
    }
    .bar-wrap {
      position: relative;
    }
    .group-menu {
      position: absolute;
      top: 100%;
      z-index: 4;
      min-width: 180px;
      max-height: 320px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    :host([dock]) .group-menu,
    .bar.bottom ~ .group-menu {
      top: auto;
      bottom: 100%;
    }
    .group-item {
      display: flex;
      align-items: center;
      gap: 10px;
      text-align: left;
      border: none;
      background: none;
      cursor: pointer;
      padding: 9px 12px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .group-item:hover,
    .group-item:focus-visible {
      background: var(--secondary-background-color, #f5f5f5);
      outline: none;
    }
    .search-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0 8px;
      color: var(--secondary-text-color);
      display: inline-flex;
      align-items: center;
    }
    .search-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .search-panel {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 4;
      width: min(320px, 100%);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 6px;
      box-sizing: border-box;
    }
    :host([dock]) .search-panel {
      top: auto;
      bottom: 100%;
    }
    .search-input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      font: inherit;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      outline: none;
    }
    .search-input:focus {
      border-color: var(--tabdeck-accent, var(--primary-color));
    }
    .search-results {
      display: flex;
      flex-direction: column;
      max-height: 280px;
      overflow: auto;
      margin-top: 4px;
    }
    .search-results .group-item.active {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .custom-panel {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 4;
      width: min(320px, 100%);
      max-height: 420px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 8px;
      box-sizing: border-box;
      color: var(--primary-text-color);
    }
    :host([dock]) .custom-panel {
      top: auto;
      bottom: 100%;
    }
    .custom-title {
      font-weight: 500;
      font-size: 14px;
      padding: 4px 6px 8px;
    }
    .custom-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 4px;
      border-radius: 6px;
    }
    .custom-row.is-hidden .custom-name,
    .custom-row.is-hidden > ha-icon {
      opacity: 0.45;
    }
    .custom-row ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .custom-noicon {
      width: 20px;
    }
    .custom-name {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .custom-row button {
      border: none;
      background: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: var(--secondary-text-color);
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .custom-row button:hover:not([disabled]) {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .custom-row button[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    .custom-actions {
      display: flex;
      justify-content: space-between;
      padding: 8px 4px 2px;
    }
    .custom-actions button {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--tabdeck-accent, var(--primary-color));
      font-size: 14px;
      padding: 6px 8px;
      border-radius: 6px;
    }
    .search-empty {
      padding: 10px 12px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .group-item ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .bar-wrap.has-arrows {
      display: flex;
      align-items: center;
      position: relative;
    }
    .overflow-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      padding: 0 8px;
      color: var(--secondary-text-color);
    }
    .overflow-menu {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 3;
      min-width: 160px;
      max-height: 320px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    .overflow-item {
      text-align: left;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .overflow-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .overflow-item.current {
      color: var(--tabdeck-accent, var(--primary-color));
      font-weight: 600;
    }
    .overflow-item[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .bar-wrap.has-arrows .bar {
      flex: 1;
      min-width: 0;
    }
    .scroll-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      padding: 0 6px;
      color: var(--secondary-text-color);
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      position: relative;
      /* e.g. blur(12px) for a frosted-glass bar (the glass preset). */
      backdrop-filter: var(--tabdeck-bar-backdrop, none);
      -webkit-backdrop-filter: var(--tabdeck-bar-backdrop, none);
    }
    .bar.top,
    .bar.bottom {
      flex-direction: row;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .bar::-webkit-scrollbar {
      display: none;
    }
    .bar.bottom {
      border-bottom: none;
      border-top: 1px solid var(--divider-color);
    }
    .bar.left,
    .bar.right {
      flex-direction: column;
      border-bottom: none;
    }
    .bar.left {
      border-right: 1px solid var(--divider-color);
    }
    .bar.right {
      border-left: 1px solid var(--divider-color);
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 4px;
    }
    /* boxed: each tab is its own bordered chip; selected gets a tinted fill. */
    .bar.style-boxed {
      gap: 8px;
      border: none;
      padding: 4px 0;
    }
    .bar.style-boxed tabdeck-tab {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }
    /* text: no indicator, no borders — just colour the selected label. */
    .bar.style-text {
      gap: 4px;
      border: none;
    }
    /* rail: compact icon rail — centered tabs, rounded selected highlight.
       Designed to pair with position:left/right + tab_display:icon. */
    .bar.style-rail {
      gap: 4px;
      border: none;
      padding: 4px;
      justify-content: center;
    }
    .bar.style-rail tabdeck-tab {
      justify-content: center;
      border-radius: 12px;
    }
    .bar.style-rail.left,
    .bar.style-rail.right {
      align-items: center;
    }
    .bar.style-rail .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: var(--tabdeck-indicator-radius, 12px);
    }
    .bar.elevated {
      box-shadow: var(--tabdeck-bar-shadow, 0 2px 6px rgba(0, 0, 0, 0.18));
      z-index: 1;
    }
    /* Alignment of the tabs within the bar. */
    .bar.align-center {
      justify-content: center;
    }
    .bar.align-end {
      justify-content: flex-end;
    }
    .bar.align-justify tabdeck-tab {
      flex: 1 1 0;
      justify-content: center;
    }
    .bar.align-justify {
      justify-content: stretch;
    }

    /* The single moving indicator. Sits behind tab content. */
    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
      z-index: 0;
    }
    .indicator.animate {
      transition: left 200ms ease, top 200ms ease, width 200ms ease,
        height 200ms ease;
    }
    /* collapsible: while folded, the selection is only hinted. */
    :host([collapsed]) .indicator {
      opacity: 0.35 !important;
    }
    @media (prefers-reduced-motion: reduce) {
      .indicator.animate {
        transition: none;
      }
    }
    tabdeck-tab {
      position: relative;
      z-index: 1;
    }
    .bar.style-underline .indicator {
      background: var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: var(--tabdeck-indicator-radius, 999px);
    }
    .bar.style-segmented .indicator {
      background: var(--card-background-color);
      border-radius: var(--tabdeck-indicator-radius, 7px);
    }
    .bar.style-boxed .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 20%,
        transparent
      );
      border-radius: var(--tabdeck-indicator-radius, 10px);
    }
  `}},Ia([Ae({attribute:!1})],Ja.prototype,"items",void 0),Ia([Ae({type:Number})],Ja.prototype,"selected",void 0),Ia([Ae()],Ja.prototype,"position",void 0),Ia([Ae()],Ja.prototype,"tabStyle",void 0),Ia([Ae()],Ja.prototype,"display",void 0),Ia([Ae()],Ja.prototype,"align",void 0),Ia([Ae()],Ja.prototype,"badgeDisplay",void 0),Ia([Ae()],Ja.prototype,"scrollable",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"animated",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"accentIndicator",void 0),Ia([Ae({type:Number})],Ja.prototype,"indicatorSize",void 0),Ia([Ae({type:Number})],Ja.prototype,"indicatorRadius",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"sticky",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"elevation",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"scrollButtons",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"overflowMenu",void 0),Ia([Ce()],Ja.prototype,"_menuOpen",void 0),Ia([Ce()],Ja.prototype,"_groupOpen",void 0),Ia([Ae({type:Boolean,reflect:!0})],Ja.prototype,"collapsed",void 0),Ia([Ae()],Ja.prototype,"barLabel",void 0),Ia([Ae()],Ja.prototype,"language",void 0),Ia([Ae()],Ja.prototype,"barBackground",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"railExpand",void 0),Ia([Ce()],Ja.prototype,"_railOpen",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"customizable",void 0),Ia([Ae({attribute:!1})],Ja.prototype,"customItems",void 0),Ia([Ce()],Ja.prototype,"_customOpen",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"searchable",void 0),Ia([Ae({type:Boolean})],Ja.prototype,"expandable",void 0),Ia([Ce()],Ja.prototype,"_searchOpen",void 0),Ia([Ce()],Ja.prototype,"_query",void 0),Ia([Ce()],Ja.prototype,"_active",void 0),Ia([Ae({type:Boolean,reflect:!0})],Ja.prototype,"dock",void 0),Ia([Ce()],Ja.prototype,"_ready",void 0),Ia([Ce()],Ja.prototype,"_overflow",void 0),Ja=Ia([ve("tabdeck-tabbar")],Ja)});Xa(),ze(),Ke(),vt(),Ra();var Qa=class extends me{constructor(...e){super(...e),this._cards=[],this._width=0,this._sizes=[]}setConfig(e){if(!Array.isArray(e?.cards)||0===e.cards.length)throw new Error("tabdeck-masonry-card: cards is required.");this._config=e,this._build()}async _build(){const e=await na();this._cards=this._config.cards.map(t=>{const a=e(t);return this._hass&&(a.hass=this._hass),a}),this._sizes=this._cards.map(()=>1),await this._measure()}async _measure(){const e=this._cards,t=await Promise.all(e.map(e=>this._sizeOf(e)));e===this._cards&&(this._sizes=t)}async _sizeOf(e){try{const t=e?.localName??"";"function"!=typeof e?.getCardSize&&t.includes("-")&&await Promise.race([customElements.whenDefined(t),new Promise(e=>setTimeout(e,2e3))]);const a="function"==typeof e?.getCardSize?await e.getCardSize():1;return"number"==typeof a&&a>0?a:1}catch{return 1}}set hass(e){const t=!this._hass;this._hass=e;for(const a of this._cards)a.hass=e;t&&this._cards.length&&this._measure()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._config?.min_column_width&&"undefined"!=typeof ResizeObserver&&(this._observer=new ResizeObserver(e=>this._setWidth(e[0]?.contentRect?.width??0)),this._observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0}_setWidth(e){const t=Math.round(e);t!==this._width&&(this._width=t)}get _columnCount(){const e=this._config;return e?e.min_column_width?this._width<=0?1:Math.max(1,Math.min(this._cards.length||1,Math.floor(this._width/e.min_column_width))):Math.max(1,Math.round(e.columns??2)):1}_size(e){return this._sizes[e]??1}getCardSize(){const e=rt(this._cards.map((e,t)=>this._size(t)),this._columnCount);return Math.max(1,...e.map(e=>e.reduce((e,t)=>e+this._size(t),0)))}render(){if(0===this._cards.length)return Z;const e=this._columnCount,t=rt(this._cards.map((e,t)=>this._size(t)),e);return K`
      <div class="masonry" style="--tabdeck-masonry-columns:${e}">
        ${t.map(e=>K`<div class="column">${e.map(e=>this._cards[e])}</div>`)}
      </div>
    `}static{this.styles=n`
    :host {
      display: block;
    }
    .masonry {
      display: grid;
      grid-template-columns: repeat(var(--tabdeck-masonry-columns, 2), minmax(0, 1fr));
      gap: var(--tabdeck-masonry-gap, 8px);
      align-items: start;
    }
    .column {
      display: flex;
      flex-direction: column;
      gap: var(--tabdeck-masonry-gap, 8px);
      min-width: 0;
    }
  `}};Ia([Ce()],Qa.prototype,"_cards",void 0),Ia([Ce()],Qa.prototype,"_width",void 0),Ia([Ce()],Qa.prototype,"_sizes",void 0),Qa=Ia([ve("tabdeck-masonry-card")],Qa),ze(),Ke(),vt(),Ra();var ei,ti=class extends me{constructor(...e){super(...e),this._sections=[],this._width=0,this._sized=0}setConfig(e){if(!Array.isArray(e?.sections)||0===e.sections.length)throw new Error("tabdeck-sections-card: sections is required.");this._config={max_columns:Math.max(1,Number(e.max_columns)||4),sections:e.sections},this._build()}async _build(){const e=await na(),t=t=>{const a=e(t);return this._hass&&(a.hass=this._hass),a};this._sections=this._config.sections.map(e=>({span:Math.max(1,Math.round(Number(e?.column_span)||1)),heading:e?.title?t({type:"heading",heading:e.title,...e.icon?{icon:e.icon}:{},heading_style:"title",...Array.isArray(e.badges)?{badges:e.badges}:{}}):void 0,cards:(Array.isArray(e?.cards)?e.cards:[]).map(e=>({el:t(e),config:e}))}));const a=new Set(this._sections.flatMap(e=>e.cards.map(e=>e.el?.localName??"")).filter(e=>e.includes("-")));await Promise.race([Promise.all([...a].map(e=>customElements.whenDefined(e))),new Promise(e=>setTimeout(e,2e3))]),this._sized++}set hass(e){this._hass=e;for(const t of this._sections){t.heading&&(t.heading.hass=e);for(const a of t.cards)a.el&&(a.el.hass=e)}}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),"undefined"!=typeof ResizeObserver&&(this._observer=new ResizeObserver(e=>this._setWidth(e[0]?.contentRect?.width??0)),this._observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0}_setWidth(e){const t=Math.round(e);t!==this._width&&(this._width=t)}_cardColumns(e){let t;try{t="function"==typeof e.el?.getGridOptions?e.el.getGridOptions():void 0}catch{t=void 0}return function(e,t){const a=e=>{if("full"===e)return 12;const t=Number(e);return Number.isFinite(t)&&t>0?Math.min(12,Math.round(t)):void 0},i=Number(e?.layout_options?.grid_columns);return a(e?.grid_options?.columns)??(Number.isFinite(i)&&i>0?Math.min(12,Math.round(3*i)):void 0)??a(t?.columns)??12}(e.config,t)}getCardSize(){return Math.max(1,...this._sections.map(e=>2*e.cards.length+(e.heading?1:0)))}render(){if(!this._config||0===this._sections.length)return Z;const e=function(e,t,a=320,i=16){return e>0?Math.max(1,Math.min(t,Math.floor((e+i)/(a+i)))):1}(this._width,this._config.max_columns);return K`
      <div class="sections" style="--tabdeck-section-columns:${e}">
        ${this._sections.map(t=>K`
            <div class="section" style="grid-column:span ${Math.min(t.span,e)}">
              ${t.heading??Z}
              <div class="cards">
                ${t.cards.map(e=>K`<div class="cell" style="grid-column:span ${this._cardColumns(e)}">${e.el}</div>`)}
              </div>
            </div>
          `)}
      </div>
    `}static{this.styles=n`
    :host {
      display: block;
    }
    .sections {
      display: grid;
      grid-template-columns: repeat(var(--tabdeck-section-columns, 1), minmax(0, 1fr));
      gap: var(--tabdeck-section-gap, 16px);
      align-items: start;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 8px;
    }
    .cell {
      min-width: 0;
    }
  `}};function ai(e,t,a){const i=String(e?.condition??"unknown"),o=Qt(e,t,a),r=e?.entity?t.states?.[e.entity]:void 0,n=e?.entity?{entity:String(e.entity),current:r?.state,missing:!r}:{};switch(i){case"state":{const t=void 0===e.state&&void 0!==e.state_not;return{type:i,met:o,...n,negate:t,expected:ei(t?e.state_not:e.state)}}case"numeric_state":return{type:i,met:o,...n,above:void 0===e.above?void 0:Number(e.above),below:void 0===e.below?void 0:Number(e.below)};case"screen":return{type:i,met:o,media_query:e.media_query};case"time":return{type:i,met:o,after:e.after,before:e.before,weekday:Array.isArray(e.weekday)?e.weekday.map(String):void 0};case"user":return{type:i,met:o,count:Array.isArray(e.users)?e.users.length:0};case"template":return{type:i,met:o,pending:!a||void 0===a(e.value_template)};case"and":case"or":case"not":return{type:i,met:o,children:(Array.isArray(e.conditions)?e.conditions:[]).map(e=>ai(e,t,a))};default:return{type:"unknown",met:!1}}}function ii(e,t,a){const i=(Array.isArray(e)?e:[]).map(e=>ai(e,t,a));return{met:i.every(e=>e.met),items:i}}Ia([Ce()],ti.prototype,"_sections",void 0),Ia([Ce()],ti.prototype,"_width",void 0),Ia([Ce()],ti.prototype,"_sized",void 0),ti=Ia([ve("tabdeck-sections-card")],ti);var oi,ri,ni,si,di,li,ci,pi=le(()=>{ei=e=>Array.isArray(e)?e.map(String):[String(e)]});function ui(e){return Object.keys(e?.areas??{}).length}function hi(e,t,a=ri){switch(e){case"rooms":return{tabs:[],auto_tabs:{source:"areas"},options:{scrollable:!0,overflow_menu:!0},count:ui(t)};case"lights":return{tabs:[],auto_tabs:{source:"areas",domains:["light"]},options:{scrollable:!0},count:si(t,"light").length};case"security":return function(e,t){const a=si(e,"camera"),i=si(e,"alarm_control_panel"),o=si(e,"lock"),r=si(e,"binary_sensor").filter(t=>ci.includes(li(e,t,"device_class"))),n=[];return i.length&&n.push({name:t("starter.tab.alarm"),icon:"mdi:shield-home",cards:i.map(e=>({type:"alarm-panel",entity:e})),alert:[{condition:"state",entity:i[0],state:"triggered"}]}),a.length&&n.push({name:t("starter.tab.cameras"),icon:"mdi:cctv",columns:a.length>1?2:void 0,cards:a.slice(0,ni).map(e=>({type:"picture-entity",entity:e,show_state:!1}))}),r.length&&n.push({name:t("starter.tab.openings"),icon:"mdi:door-open",badge:`{{ ${JSON.stringify(r).replace(/"/g,"'")} | select('is_state', 'on') | list | count }}`,card:{type:"entities",entities:r}}),o.length&&n.push({name:t("starter.tab.locks"),icon:"mdi:lock",cards:o.map(e=>({type:"tile",entity:e}))}),{tabs:n,options:{hide_inactive_badge:!0},count:a.length+i.length+o.length+r.length}}(t,a);case"media":return function(e){const t=si(e,"media_player");return{tabs:t.slice(0,ni).map(t=>({name:di(e,t),icon:"tv"===li(e,t,"device_class")?"mdi:television":"mdi:speaker",subtitle:`{{ states('${t}') }}`,card:{type:"media-control",entity:t}})),options:{tab_display:"active",scrollable:!0},count:t.length}}(t);case"climate":return function(e){const t=si(e,"climate");return{tabs:t.slice(0,ni).map(t=>({name:di(e,t),icon:"mdi:thermostat",badge:`{{ state_attr('${t}', 'current_temperature') }}`,badge_format:{precision:1,unit:"°"},card:{type:"thermostat",entity:t}})),count:t.length}}(t);case"energy":return function(e){return{tabs:[{name:e("starter.tab.energy_now"),icon:"mdi:lightning-bolt",card:{type:"energy-distribution",link_dashboard:!0}},{name:e("starter.tab.energy_usage"),icon:"mdi:chart-bar",card:{type:"energy-usage-graph"}},{name:e("starter.tab.energy_sources"),icon:"mdi:table",card:{type:"energy-sources-table"}},{name:e("starter.tab.energy_devices"),icon:"mdi:devices",card:{type:"energy-devices-graph"}}],options:{lazy:!0},count:1}}(a);case"family":return function(e){const t=si(e,"person");return{tabs:t.slice(0,ni).map(t=>({name:di(e,t),icon:"mdi:account",subtitle:`{{ states('${t}') | replace('_', ' ') }}`,cards:[{type:"tile",entity:t},{type:"map",entities:[t],hours_to_show:12}]})),count:t.length}}(t)}}var bi,_i,mi,gi,vi,yi,fi=le(()=>{Oa(),oi=["rooms","lights","security","media","climate","energy","family"],ri=e=>ja("en",e),ni=12,si=(e,t)=>Object.keys(e?.states??{}).filter(e=>e.startsWith(`${t}.`)).sort(),di=(e,t)=>e?.states?.[t]?.attributes?.friendly_name??t.split(".")[1].replace(/_/g," "),li=(e,t,a)=>e?.states?.[t]?.attributes?.[a],ci=["door","window","garage_door","opening"]});function ki(e){const t=e.replace(/^custom:/,"").replace(/[-_]/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}function wi(e,t,a=0){const i=function(e){if("string"==typeof e?.entity)return e.entity;const t=Array.isArray(e?.entities)?e.entities[0]:void 0;return"string"==typeof t?t:mi(t)&&"string"==typeof t.entity?t.entity:void 0}(e),o=e?.title??e?.name??e?.heading??(i?t?.states?.[i]?.attributes?.friendly_name??ki(i.split(".")[1]??i):void 0)??(e?.type?ki(String(e.type)):`Tab ${a+1}`),r=("string"==typeof e?.icon?e.icon:void 0)??bi[gi(e)]??(i?_i[i.split(".")[0]]:void 0);return{name:String(o),icon:r}}function xi(e){if(Array.isArray(e)&&0!==e.length)return e.map(e=>{if(!mi(e)||e.condition)return e;const t={condition:"state",entity:e.entity};return void 0!==e.state&&(t.state=e.state),void 0!==e.state_not&&(t.state_not=e.state_not),t})}function zi(e,t,a,i){let o=e,r=xi(e?.visibility);if("conditional"===gi(e)&&mi(e.card))o=e.card,r=xi(e.conditions);else if(r){const{visibility:t,...a}=e;o=a}const n=wi(o,t,a),s={name:i?.name??n.name,card:o},d=i?.icon??n.icon;return d&&(s.icon=d),r&&(s.visibility=r),s}function $i(e,t,a,i,o){if(0===e.length)return;if(1===e.length)return zi(e[0],t,a,i?{name:i,icon:o}:void 0);const r={name:i??wi(e[0],t,a).name,cards:e},n=o??wi(e[0],t,a).icon;return n&&(r.icon=n),r}function Ai(e,t){if(!e.some(vi))return e.map((e,a)=>zi(e,t,a));const a=[];let i,o,r=[];const n=()=>{const e=$i(r,t,a.length,i,o);e&&a.push(e),r=[]};for(const s of e)vi(s)?(n(),i=s.heading??i,o=s.icon):r.push(s);return n(),a}function Si(e,t,a){return function(e){return e.some(e=>Array.isArray(e?.cards)&&yi(e.cards[0]))}(e)?{source:"bubble-popups",tabs:e.map((e,a)=>function(e,t,a){const i=Array.isArray(e?.cards)?e.cards:[],o=i[0];if(!yi(o))return;const r=i.slice(1),n=o.name??("string"==typeof o.hash?ki(o.hash.replace(/^#/,"")):void 0);return $i(r,t,a,n,o.icon)??{name:n,icon:o.icon,card:{type:"markdown",content:" "}}}(e,t,a)).filter(e=>!!e),options:{},notes:["convert.note.bubble"]}:{source:a,tabs:Ai(e,t),options:{},notes:[]}}function Ci(e,t){if(Array.isArray(e)){if(0===e.length)throw new Error("convert.error.empty");return e.every(e=>mi(e)&&(e.card||e.cards)&&!e.type)?{source:"tabdeck",tabs:e,options:{},notes:[]}:Si(e,t,"cards")}if(!mi(e))throw new Error("convert.error.not_card");if(Array.isArray(e.views))return{source:"dashboard",tabs:e.views.map((e,a)=>{const i=(o=e,Array.isArray(o?.sections)?o.sections.flatMap(e=>Array.isArray(e?.cards)?e.cards:[]):Array.isArray(o?.cards)?o.cards:[]);var o;const r=e.title??e.path??`View ${a+1}`;return $i(i,t,a,String(r),e.icon)??{name:String(r),icon:e.icon,card:{type:"markdown",content:" "}}}),options:{},notes:["convert.note.dashboard"]};if(Array.isArray(e.sections))return{source:"sections",tabs:e.sections.map((e,a)=>function(e,t,a){const i=Array.isArray(e?.cards)?e.cards:[],o=i.find(vi),r=$i(i.filter(e=>e!==o),t,a,o?.heading,o?.icon);return r&&Array.isArray(e.visibility)&&(r.visibility=xi(e.visibility)),r}(e,t,a)).filter(e=>!!e),options:{},notes:[]};const a=gi(e);if("tabdeck-card"===a){const{type:t,tabs:a,...i}=e;return{source:"tabdeck",tabs:Array.isArray(a)?a:[],options:i,notes:[]}}if("tabbed-card"===a)return function(e,t){const a=[],i=(Array.isArray(e.tabs)?e.tabs:[]).map((i,o)=>{const r={...e.attributes??{},...i?.attributes??{}},n=zi(i?.card??{},t,o);return r.label&&(n.name=String(r.label)),r.icon&&(n.icon=r.icon),mi(i?.styles)&&Object.keys(i.styles).length&&a.push("convert.note.tab_styles"),n}),o={},r=Number(e.options?.defaultTabIndex);Number.isInteger(r)&&r>=0&&(o.default_tab=r);const n=e.styles?.["--mdc-theme-primary"];return n&&(o.styles={"--tabdeck-accent":n}),mi(e.styles)&&Object.keys(e.styles).some(e=>"--mdc-theme-primary"!==e)&&a.push("convert.note.styles"),{source:"tabbed-card",tabs:i,options:o,notes:[...new Set(a)]}}(e,t);if("swipe-card"===a)return function(e,t){const a=Array.isArray(e.cards)?e.cards:[],i={swipe:!0,swipe_mouse:!0},o=Number(e.start_card);Number.isInteger(o)&&o>1&&(i.default_tab=o-1),e.parameters?.loop&&(i.swipe_wrap=!0);const r=e.parameters?.autoplay?["convert.note.autoplay"]:[];if(e.parameters?.autoplay){const t=Number(e.parameters.autoplay?.delay);i.auto_rotate=Number.isFinite(t)&&t>0?Math.max(2,Math.round(t/1e3)):5}return{source:"swipe-card",tabs:a.map((e,a)=>zi(e,t,a)),options:i,notes:r}}(e,t);if("state-switch"===a)return function(e,t){const a=mi(e.states)?e.states:{},i=String(e.entity??""),o={},r=[],n=i.includes("."),s=Object.entries(a).map(([e,a],o)=>{const r=zi(a,t,o,{name:e,icon:wi(a,t,o).icon});return n&&(r.auto_select={entity:i,state:e}),r});if("hash"===i?o.remember="url":n||r.push("convert.note.state_switch_mode"),void 0!==e.default&&void 0!==a[e.default]&&(o.default_tab=String(e.default)),n){const e=t?.states?.[i]?.state;void 0!==e&&void 0!==a[e]&&(o.default_tab=e)}return"slide-left"===e.transition||"slide-right"===e.transition?o.transition="slide":"fade"!==e.transition&&"flip"!==e.transition||(o.transition="fade"),{source:"state-switch",tabs:s,options:o,notes:r}}(e,t);if(!e.type&&Array.isArray(e.cards))return{...Si(e.cards,t,"view"),notes:[]};if(Array.isArray(e.cards))return Si(e.cards,t,"stack");if(e.type)return{source:"cards",tabs:[zi(e,t,0)],options:{},notes:[]};throw new Error("convert.error.not_card")}var Ti,ji,Ei,Oi,Ni,Mi,Pi,Ii,Li=le(()=>{bi={light:"mdi:lightbulb",thermostat:"mdi:thermostat",humidifier:"mdi:air-humidifier","media-control":"mdi:speaker","weather-forecast":"mdi:weather-partly-cloudy",map:"mdi:map",calendar:"mdi:calendar","todo-list":"mdi:checkbox-marked-outline","shopping-list":"mdi:cart","history-graph":"mdi:chart-line","statistics-graph":"mdi:chart-bar",sensor:"mdi:chart-line",gauge:"mdi:gauge","alarm-panel":"mdi:shield-home","picture-entity":"mdi:cctv","picture-glance":"mdi:image",picture:"mdi:image","picture-elements":"mdi:image",entities:"mdi:format-list-bulleted",glance:"mdi:view-grid",markdown:"mdi:text",iframe:"mdi:web",area:"mdi:texture-box",logbook:"mdi:format-list-text","energy-distribution":"mdi:lightning-bolt"},_i={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",media_player:"mdi:speaker",camera:"mdi:cctv",person:"mdi:account",lock:"mdi:lock",cover:"mdi:window-shutter",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",weather:"mdi:weather-partly-cloudy"},mi=e=>!!e&&"object"==typeof e&&!Array.isArray(e),gi=e=>String(e?.type??"").replace(/^custom:/,""),vi=e=>"heading"===gi(e),yi=e=>"bubble-card"===gi(e)&&"pop-up"===e.card_type}),Di=/* @__PURE__ */ce({TabdeckCardEditor:()=>Ii,pickCardEditorTag:()=>Ri});function Ri(e){return e("hui-card-element-editor")?"hui-card-element-editor":e("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var Vi=le(()=>{ze(),Ke(),pi(),Oa(),fi(),Li(),it(),jt(),vt(),Ra(),Ti="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",ji="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z",Ei="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74",Oi="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z",Ni=[{name:"name",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"accent",selector:{text:{}}},{name:"color",selector:{text:{}}},{name:"badge",selector:{text:{}}},{name:"badge_color",selector:{text:{}}},{name:"background",selector:{text:{}}},{name:"badge_icon",selector:{icon:{}}},{name:"ring",selector:{text:{}}},{name:"ring_max",selector:{number:{min:1,step:1,mode:"box"}}},{name:"ring_color",selector:{text:{}}},{name:"area",selector:{area:{}}},{name:"pin",selector:{text:{}}},{name:"pin_timeout",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"disabled",selector:{boolean:{}}},{name:"fab",selector:{boolean:{}}},{name:"card_size",selector:{number:{min:1,max:20,step:1,mode:"box"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"badge_action",selector:{ui_action:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"enter_action",selector:{ui_action:{}}},{name:"leave_action",selector:{ui_action:{}}}],Mi=[{name:"type",selector:{select:{mode:"dropdown",custom_value:!0,options:["entities","tile","button","light","thermostat","humidifier","weather-forecast","markdown","picture","picture-entity","picture-glance","glance","gauge","sensor","history-graph","statistics-graph","media-control","map","area","alarm-panel","calendar","todo-list","iframe","entity","conditional","vertical-stack","horizontal-stack","grid","custom:mushroom-template-card","custom:mushroom-entity-card","custom:button-card","custom:mini-graph-card","custom:apexcharts-card","custom:auto-entities","custom:bubble-card","custom:layout-card"].map(e=>({value:e,label:e}))}}}],Pi=[{key:"visibility"},{key:"alert"},{key:"default_if"}],Ii=class extends me{constructor(...e){super(...e),this._editingTab=null,this._cardError=null,this._expanded=/* @__PURE__ */new Set,this._importOpen=!1,this._importError="",this._starterOpen=!1,this._starterKind="rooms",this._convertOpen=!1,this._convertError="",this._status="",this._checkSig="",this._resolver=e=>void 0===this._templates?.result(e)?void 0:this._templates.boolean(e),this._computeGlobalLabel=e=>this._t(`editor.global.${e.name}`),this._computeTabLabel=e=>this._t(`editor.tab.${e.name}`)}set hass(e){const t=!this._hass;this._hass=e,this._syncTemplates();const a=this._checkSignature();(t||a!==this._checkSig)&&(this._checkSig=a,this.requestUpdate())}get hass(){return this._hass}_t(e,t){return ja(Ta(this._hass),e,t)}_conditionTemplates(){const e=[],t=a=>{for(const i of Array.isArray(a)?a:[])"template"===i?.condition&&i.value_template&&e.push(i.value_template),Array.isArray(i?.conditions)&&t(i.conditions)};for(const a of this._config?.tabs??[])t(a.visibility),t(a.alert),t(a.default_if);return e}_syncTemplates(){const e=this._conditionTemplates();0!==e.length&&this._hass?.connection?.subscribeMessage?(this._templates||(this._templates=new sa(la(()=>this._hass)),this._templates.addEventListener("change",()=>this.requestUpdate())),this._templates.track(e)):0===e.length&&(this._templates?.destroy(),this._templates=void 0)}_explain(e){return ii(e,this._hass??{states:{}},this._resolver)}_checkSignature(){return this._hass?Ta(this._hass)+"#"+(this._config?.tabs??[]).map(e=>Pi.map(t=>function(e){const t=e=>`${e.met?1:0}${e.current??""}${e.pending?"p":""}(${(e.children??[]).map(t).join(",")})`;return e.items.map(t).join("|")}(this._explain(e[t.key]))).join("/")).join(";"):""}disconnectedCallback(){super.disconnectedCallback(),this._templates?.destroy(),this._templates=void 0}setConfig(e){this._config=Bt(e),this._syncTemplates()}_emit(e){this._config=e,this._syncTemplates(),Oe(this,"config-changed",{config:this._forOutput(e)}),this.requestUpdate()}_forOutput(e){e.tabs.some(e=>e.group)&&(e={...e,tabs:e.tabs.map(e=>{if(!e.group)return e;const{group:t,card:a,...i}=e;return i})});const t=e.auto_tabs;if(!t?.source)return e;const{template:a,...i}=t,o={...i};(function(e){return!!e&&"object"==typeof e&&lt.has(e)})(o.tab_template)&&delete o.tab_template;for(const r of["domains","exclude","content"])void 0===o[r]&&delete o[r];return{...e,auto_tabs:o}}_patch(e){this._config&&this._emit({...this._config,...e})}_patchTab(e,t){if(!this._config)return;const a=this._config.tabs.map((a,i)=>i===e?{...a,...t}:a);this._emit({...this._config,tabs:a})}_addTab(){if(!this._config)return;const e=[...this._config.tabs,{name:this._t("editor.tab_n",{n:this._config.tabs.length+1}),card:{}}],t=this._config.tabs.length;this._expanded=new Set(this._expanded).add(t),this._emit({...this._config,tabs:e})}_expandAll(){this._config&&(this._expanded=new Set(this._config.tabs.map((e,t)=>t)))}_collapseAll(){this._expanded=/* @__PURE__ */new Set}_deleteTab(e){if(!this._config)return;const t=this._config.tabs.filter((t,a)=>a!==e);this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:t})}_duplicateTab(e){if(!this._config)return;const t=this._config.tabs[e];if(!t)return;const a=JSON.parse(JSON.stringify(t));a.name=this._t("editor.copy_name",{name:t.name??this._t("editor.tab_n",{n:e+1})});const i=this._config.tabs.slice();i.splice(e+1,0,a),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:i})}_flash(e){this._status=e,this._statusTimer&&clearTimeout(this._statusTimer),this._statusTimer=setTimeout(()=>this._status="",2500)}async _copyTab(e){const t=this._config?.tabs[e];if(!t)return;const a=JSON.stringify(t,null,2);let i=!1;try{navigator.clipboard?.writeText&&(await navigator.clipboard.writeText(a),i=!0)}catch{i=!1}if(!i){const e=document.createElement("textarea");e.value=a,e.style.cssText="position:fixed;opacity:0",this.renderRoot.appendChild(e),e.select();try{i=document.execCommand("copy")}catch{i=!1}e.remove()}const o=t.name||this._t("editor.tab_n",{n:e+1});this._flash(i?this._t("editor.copied",{name:o}):this._t("editor.clipboard_error"))}_toggleConvert(){this._convertOpen=!this._convertOpen,this._convertResult=void 0,this._convertError=""}_onConvertInput(e){if(this._convertResult=void 0,this._convertError="",null!=e&&""!==e)try{const t=Ci(e,this._hass);0===t.tabs.length?this._convertError="convert.error.no_tabs":this._convertResult=t}catch(t){const e=String(t?.message??"");this._convertError=e.startsWith("convert.")?e:"convert.error.not_card"}}_applyConvert(e){const t=this._convertResult;if(!this._config||!t)return;const a=Bt(function(e,t,a){if("append"===a)return{...e,tabs:[...e.tabs??[],...t.tabs]};const i={...e,...t.options,tabs:t.tabs};return t.options.auto_tabs||delete i.auto_tabs,i}(this._config,t,e));this._expanded=/* @__PURE__ */new Set,this._convertOpen=!1,this._convertResult=void 0,this._flash(this._t("convert.done",{count:t.tabs.length,source:this._t(`convert.source.${t.source}`)})),this._emit(a)}_renderConvert(){const e=this._convertResult;return K`
      <div class="import-panel convert-panel">
        <div class="import-hint">${this._t("convert.hint")}</div>
        ${customElements.get("ha-yaml-editor")?K`<ha-yaml-editor class="convert-yaml" @value-changed=${e=>{e.stopPropagation();const t=e.detail;!1!==t?.isValid&&this._onConvertInput(t?.value)}}></ha-yaml-editor>`:K`<textarea
              class="import-json convert-json"
              rows="8"
              @input=${e=>{try{this._onConvertInput(JSON.parse(e.target.value))}catch{this._convertResult=void 0}}}
            ></textarea>`}
        ${this._convertError?K`<div class="import-error" role="alert">${this._t(this._convertError)}</div>`:Z}
        ${e?K`<div class="convert-summary" role="status">
              ${this._t("convert.detected",{source:this._t(`convert.source.${e.source}`),count:e.tabs.length})}
              <ul class="convert-tabs">
                ${e.tabs.map(e=>K`<li>${e.icon?K`<ha-icon .icon=${e.icon}></ha-icon>`:Z}${e.name}</li>`)}
              </ul>
              ${e.notes.map(e=>K`<div class="convert-note">ℹ️ ${this._t(e)}</div>`)}
            </div>`:Z}
        <div class="import-actions">
          <ha-button class="convert-replace" .disabled=${!e} @click=${()=>this._applyConvert("replace")}
            >${this._t("convert.replace")}</ha-button
          >
          <ha-button class="convert-append" .disabled=${!e} @click=${()=>this._applyConvert("append")}
            >${this._t("convert.append")}</ha-button
          >
          <ha-button class="convert-cancel" @click=${this._toggleConvert}>${this._t("convert.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleStarter(){this._starterOpen=!this._starterOpen}_applyStarter(e){if(!this._config)return;const t=this._starterKind,a=this._t(`starter.kind.${t}`),i=hi(t,this._hass,e=>this._t(e));if(0===i.count)return void this._flash(this._t("starter.none",{name:a}));const o=Bt(function(e,t,a){const i="replace"===a?t.tabs:[...e.tabs??[],...t.tabs],o={...e,...t.options??{},tabs:i};return t.auto_tabs?o.auto_tabs=t.auto_tabs:"replace"===a&&delete o.auto_tabs,o}(this._config,i,e));this._expanded=/* @__PURE__ */new Set,this._starterOpen=!1,this._flash(this._t("starter.done",{name:a})),this._emit(o)}_renderStarter(){const e=[{name:"kind",selector:{select:{mode:"dropdown",options:oi.map(e=>({value:e,label:this._t(`starter.kind.${e}`)}))}}}];return K`
      <div class="import-panel starter-panel">
        <div class="import-hint">${this._t("starter.hint")}</div>
        <ha-form
          class="starter-form"
          .hass=${this.hass}
          .data=${{kind:this._starterKind}}
          .schema=${e}
          .computeLabel=${()=>this._t("starter.pick")}
          @value-changed=${e=>{e.stopPropagation();const t=e.detail?.value?.kind;oi.includes(t)&&(this._starterKind=t)}}
        ></ha-form>
        <div class="import-actions">
          <ha-button class="starter-replace" @click=${()=>this._applyStarter("replace")}
            >${this._t("starter.replace")}</ha-button
          >
          <ha-button class="starter-append" @click=${()=>this._applyStarter("append")}
            >${this._t("starter.append")}</ha-button
          >
          <ha-button class="starter-cancel" @click=${this._toggleStarter}>${this._t("starter.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleImport(){this._importOpen=!this._importOpen,this._importError="",this._importValue=void 0}_applyImport(){if(!this._config)return;const e=this._importValue,t=Array.isArray(e)?e:[e];if(0===t.length||!t.every(e=>e&&"object"==typeof e&&!Array.isArray(e)&&(e.card||e.cards||e.tap_action)))return void(this._importError=this._t("editor.import_error"));const a=this._config.tabs.length,i=[...this._config.tabs,...t.map(Pt)],o=new Set(this._expanded);for(let r=a;r<i.length;r++)o.add(r);this._expanded=o,this._importOpen=!1,this._importValue=void 0,this._flash(this._t(t.length>1?"editor.imported_many":"editor.imported_one",{count:t.length})),this._emit({...this._config,tabs:i})}_renderImport(){return K`
      <div class="import-panel">
        <div class="import-hint">${this._t("editor.import_hint")}</div>
        ${customElements.get("ha-yaml-editor")?K`<ha-yaml-editor @value-changed=${e=>{e.stopPropagation();const t=e.detail;this._importValue=!1===t?.isValid?void 0:t?.value,this._importError=""}}></ha-yaml-editor>`:K`<textarea
              class="import-json"
              rows="8"
              placeholder='{"name": "Lights", "card": {"type": "light", "entity": "light.kitchen"}}'
              @input=${e=>{try{this._importValue=JSON.parse(e.target.value),this._importError=""}catch{this._importValue=void 0}}}
            ></textarea>`}
        ${this._importError?K`<div class="import-error" role="alert">${this._importError}</div>`:Z}
        <div class="import-actions">
          <ha-button class="import-apply" @click=${this._applyImport}>${this._t("editor.add")}</ha-button>
          <ha-button class="import-cancel" @click=${this._toggleImport}>${this._t("editor.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleExpanded(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_onHeaderKeydown(e,t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleExpanded(e))}_editCardJson(e,t){let a;try{a=JSON.parse(t)}catch{return void(this._cardError=e)}this._cardError=null,this._patchTab(e,{card:a})}_onItemMoved(e){if(!this._config)return;const{oldIndex:t,newIndex:a}=e.detail??{};if(null==t||null==a||t===a||t<0||a<0||t>=this._config.tabs.length||a>=this._config.tabs.length)return;const i=this._config.tabs.slice(),[o]=i.splice(t,1);i.splice(a,0,o),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:i})}_warnings(){const e=this._config;if(!e)return[];const t=[],a=e.tabs.map(e=>e.name??"").filter(e=>e),i=a.filter((e,t)=>a.indexOf(e)!==t);return i.length>0&&t.push(this._t("editor.warn_duplicates",{names:[...new Set(i)].join(", ")})),t}_move(e,t){if(!this._config)return;const a=e+t;if(a<0||a>=this._config.tabs.length)return;const i=this._config.tabs.slice();[i[e],i[a]]=[i[a],i[e]],this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:i})}_openCard(e){this._cardError=null,this._editingTab=e}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(e,t){t.stopPropagation();const a=t.detail?.config;a&&(this._config?.tabs[e]?.children&&Array.isArray(a.tabs)?this._patchTab(e,Pt({...this._config.tabs[e],children:a.tabs})):this._patchTab(e,{card:a}))}_onTypeChosen(e,t){t.stopPropagation();const a=t.detail?.value?.type;a&&this._patchTab(e,{card:{type:a}})}_changeCardType(e){this._patchTab(e,{card:{}})}_onYamlCardChanged(e,t){t.stopPropagation();const a=t.detail;!1!==a?.isValid&&void 0!==a?.value&&this._patchTab(e,{card:a.value})}get _currentDefaultTab(){const e=this._config;for(let t=0;t<e.tabs.length;t++){const a=e.tabs[t].name??String(t);if(String(e.default_tab)===a||e.default_tab===t)return a}}_globalSchema(){const e=(e,t)=>e.map(e=>{const a=`editor.opt.${t}.${e}`;return{value:e,label:t&&Ea(a)?this._t(a):e}}),t=this._config.tabs.map((e,t)=>({value:e.name??String(t),label:e.name||this._t("editor.tab_n",{n:t+1})}));return[{name:"preset",selector:{select:{mode:"dropdown",options:e(["",...Je])}}},{name:"position",selector:{select:{mode:"dropdown",options:e(["top","bottom","left","right"],"position")}}},{name:"style",selector:{select:{mode:"dropdown",options:e(["underline","pill","segmented","boxed","text","rail"])}}},{name:"tab_display",selector:{select:{mode:"dropdown",options:e(["both","icon","label","active","dots"],"tab_display")}}},{name:"align",selector:{select:{mode:"dropdown",options:e(["start","center","end","justify"],"align")}}},{name:"badge_display",selector:{select:{mode:"dropdown",options:e(["text","dot"],"badge_display")}}},{name:"hide_inactive_badge",selector:{boolean:{}}},{name:"transition",selector:{select:{mode:"dropdown",options:e(["none","fade","slide","scale","flip","rise"],"transition")}}},{name:"transition_narrow",selector:{select:{mode:"dropdown",options:e(["","none","fade","slide","scale","flip","rise"],"transition")}}},{name:"transition_duration",selector:{number:{min:0,max:2e3,step:10,mode:"box"}}},{name:"transition_easing",selector:{text:{}}},{name:"indicator_size",selector:{number:{min:1,max:16,step:1,mode:"slider"}}},{name:"indicator_radius",selector:{number:{min:0,max:30,step:1,mode:"slider"}}},{name:"remember",selector:{select:{mode:"dropdown",options:e(["none","browser","url","entity"],"remember")}}},{name:"remember_entity",selector:{text:{}}},{name:"storage_key",selector:{text:{}}},{name:"default_tab",selector:{select:{mode:"dropdown",options:t}}},{name:"scrollable",selector:{select:{mode:"dropdown",options:e(["auto","true","false"],"scrollable")}}},{name:"lazy",selector:{boolean:{}}},{name:"unmount_hidden",selector:{boolean:{}}},{name:"swipe_wrap",selector:{boolean:{}}},{name:"animated",selector:{boolean:{}}},{name:"accent_indicator",selector:{boolean:{}}},{name:"header",selector:{boolean:{}}},{name:"aria_label",selector:{text:{}}},{name:"sticky",selector:{boolean:{}}},{name:"elevation",selector:{boolean:{}}},{name:"scroll_buttons",selector:{boolean:{}}},{name:"overflow_menu",selector:{boolean:{}}},{name:"bar_background",selector:{text:{}}},{name:"swipe",selector:{boolean:{}}},{name:"swipe_mouse",selector:{boolean:{}}},{name:"tab_display_narrow",selector:{select:{mode:"dropdown",options:e(["","both","icon","label","active","dots"],"tab_display")}}},{name:"narrow_width",selector:{number:{min:100,max:4e3,step:10,mode:"box"}}},{name:"split",selector:{number:{min:0,max:4e3,step:10,mode:"box"}}},{name:"collapsible",selector:{boolean:{}}},{name:"start_collapsed",selector:{boolean:{}}},{name:"scroll_spy",selector:{boolean:{}}},{name:"auto_rotate",selector:{number:{min:0,max:3600,step:1,mode:"box"}}},{name:"idle_return",selector:{number:{min:0,max:86400,step:1,mode:"box"}}},{name:"dock",selector:{boolean:{}}},{name:"content_arrows",selector:{boolean:{}}},{name:"search",selector:{boolean:{}}},{name:"hotkeys",selector:{boolean:{}}},{name:"history",selector:{boolean:{}}},{name:"customize",selector:{boolean:{}}},{name:"rail_expand",selector:{boolean:{}}},{name:"content_height",selector:{text:{}}},{name:"content_max_height",selector:{text:{}}},{name:"fullscreen",selector:{boolean:{}}},{name:"swipe_peek",selector:{boolean:{}}},{name:"alert_first",selector:{boolean:{}}},{name:"alert_snooze",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"remote_entity",selector:{entity:{domain:["input_text","input_select","select","sensor"]}}},{name:"remote_event",selector:{boolean:{}}},{name:"fire_event",selector:{boolean:{}}},{name:"event_id",selector:{text:{}}},{name:"unload_after",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"edit_mode_reveal",selector:{boolean:{}}}]}get _globalData(){const e=this._config;return{preset:e.preset??"",position:e.position,style:e.style,tab_display:e.tab_display,align:e.align,badge_display:e.badge_display,hide_inactive_badge:e.hide_inactive_badge,transition:e.transition,indicator_size:e.indicator_size,indicator_radius:e.indicator_radius,remember:e.remember,remember_entity:e.remember_entity??"",storage_key:e.storage_key??"",default_tab:this._currentDefaultTab,scrollable:String(e.scrollable),lazy:e.lazy,unmount_hidden:e.unmount_hidden,swipe_wrap:e.swipe_wrap,animated:e.animated,accent_indicator:e.accent_indicator,header:e.header,aria_label:e.aria_label??"",sticky:e.sticky,elevation:e.elevation,scroll_buttons:e.scroll_buttons,overflow_menu:e.overflow_menu,bar_background:e.bar_background??"",swipe:e.swipe,swipe_mouse:e.swipe_mouse,tab_display_narrow:e.tab_display_narrow??"",narrow_width:e.narrow_width,split:e.split?.min_width??0,collapsible:e.collapsible,start_collapsed:e.start_collapsed,scroll_spy:e.scroll_spy,auto_rotate:e.auto_rotate?.interval??0,idle_return:e.idle_return??0,dock:e.dock,content_arrows:e.content_arrows,search:e.search,hotkeys:e.hotkeys,history:e.history,customize:e.customize,rail_expand:e.rail_expand,edit_mode_reveal:e.edit_mode_reveal,transition_narrow:e.transition_narrow??"",transition_duration:e.transition_duration,transition_easing:e.transition_easing,content_height:e.content_height,content_max_height:e.content_max_height??"",fullscreen:e.fullscreen,swipe_peek:e.swipe_peek,unload_after:e.unload_after??0,alert_first:e.alert_first,alert_snooze:e.alert_snooze??0,remote_entity:e.remote_entity??"",remote_event:e.remote_event,fire_event:e.fire_event,event_id:e.event_id??""}}_onGlobalChanged(e){e.stopPropagation();const t=e.detail.value??{};if(this._config&&tt(t.preset)&&t.preset!==this._config.preset)return void this._emit(function(e,t){const a=at(t),i=Object.fromEntries(Object.entries(e.styles??{}).filter(([e])=>!Qe.has(e)));return{...e,...a,styles:{...i,...a.styles},preset:t}}(this._config,t.preset));const a="auto"===t.scrollable?"auto":"true"===t.scrollable||!0===t.scrollable;this._patch({position:t.position,style:t.style,tab_display:t.tab_display,align:t.align,badge_display:t.badge_display,hide_inactive_badge:!!t.hide_inactive_badge,transition:t.transition,indicator_size:t.indicator_size,indicator_radius:t.indicator_radius,remember:t.remember,remember_entity:t.remember_entity||void 0,storage_key:t.storage_key||void 0,default_tab:t.default_tab,scrollable:a,lazy:!!t.lazy,unmount_hidden:!!t.unmount_hidden,swipe_wrap:!!t.swipe_wrap,animated:!!t.animated,accent_indicator:!!t.accent_indicator,header:!!t.header,aria_label:t.aria_label||void 0,sticky:!!t.sticky,elevation:!!t.elevation,scroll_buttons:!!t.scroll_buttons,overflow_menu:!!t.overflow_menu,bar_background:t.bar_background||void 0,swipe:!!t.swipe,swipe_mouse:!!t.swipe_mouse,tab_display_narrow:t.tab_display_narrow||void 0,narrow_width:Number(t.narrow_width)||450,split:Number(t.split)>0?{min_width:Number(t.split),columns:this._config?.split?.columns??2}:void 0,collapsible:!!t.collapsible,start_collapsed:!!t.collapsible&&!!t.start_collapsed,scroll_spy:!!t.scroll_spy,auto_rotate:Number(t.auto_rotate)>0?{interval:Math.max(2,Number(t.auto_rotate)),resume_after:this._config?.auto_rotate?.resume_after??60}:void 0,idle_return:Number(t.idle_return)>0?Math.max(5,Number(t.idle_return)):void 0,dock:!!t.dock,content_arrows:!!t.content_arrows,search:!!t.search,hotkeys:!!t.hotkeys,history:!!t.history,customize:!!t.customize,rail_expand:!!t.rail_expand,edit_mode_reveal:!1!==t.edit_mode_reveal,transition_duration:Number.isFinite(Number(t.transition_duration))?Math.min(2e3,Math.max(0,Number(t.transition_duration))):180,transition_easing:t.transition_easing||"ease",transition_narrow:t.transition_narrow||void 0,content_height:"tallest"===t.content_height?"tallest":ot(t.content_height)??"auto",content_max_height:ot(t.content_max_height),fullscreen:!!t.fullscreen,swipe_peek:!!t.swipe_peek,unload_after:Number(t.unload_after)>0?Math.max(1,Number(t.unload_after)):void 0,alert_first:!!t.alert_first,alert_snooze:Number(t.alert_snooze)>0?Number(t.alert_snooze):void 0,remote_entity:t.remote_entity||void 0,remote_event:!!t.remote_event,fire_event:!!t.fire_event,event_id:t.event_id||void 0})}_onTabFieldsChanged(e,t){t.stopPropagation();const a=t.detail.value??{};this._patchTab(e,{name:a.name??"",subtitle:a.subtitle||void 0,icon:a.icon||void 0,accent:a.accent||void 0,color:a.color||void 0,badge:a.badge||("object"==typeof this._config?.tabs[e]?.badge?this._config.tabs[e].badge:void 0),badge_color:a.badge_color||void 0,background:a.background||void 0,badge_icon:a.badge_icon||void 0,ring:void 0===a.ring||null===a.ring||""===a.ring?void 0:String(a.ring),ring_max:Number(a.ring_max)>0?Number(a.ring_max):void 0,ring_color:a.ring_color||void 0,area:a.area||void 0,pin:a.pin?String(a.pin):void 0,pin_timeout:Number(a.pin_timeout)>0?Number(a.pin_timeout):void 0,disabled:!!a.disabled||void 0,fab:!!a.fab||void 0,card_size:"number"==typeof a.card_size?a.card_size:void 0,hold_action:a.hold_action??void 0,badge_action:a.badge_action??void 0,tap_action:a.tap_action&&"none"!==a.tap_action.action?a.tap_action:void 0,enter_action:a.enter_action&&"none"!==a.enter_action.action?a.enter_action:void 0,leave_action:a.leave_action&&"none"!==a.leave_action.action?a.leave_action:void 0})}_renderConditions(e,t,a){const i=Array.isArray(t[a.key])?t[a.key]:[],o=t=>{t.stopPropagation();const i=t.detail?.value;!1!==t.detail?.isValid&&Array.isArray(i)&&this._patchTab(e,{[a.key]:i.length?i:void 0})};let r;r=customElements.get("ha-card-conditions-editor")?K`<ha-card-conditions-editor
        .hass=${this.hass}
        .conditions=${i}
        @value-changed=${o}
      ></ha-card-conditions-editor>`:customElements.get("ha-yaml-editor")?K`<ha-yaml-editor
        .defaultValue=${i}
        @value-changed=${o}
      ></ha-yaml-editor>`:K`<textarea
        class="conditions-json"
        rows="6"
        .value=${JSON.stringify(i,null,2)}
        @change=${t=>{try{const i=JSON.parse(t.target.value||"[]");Array.isArray(i)&&this._patchTab(e,{[a.key]:i.length?i:void 0})}catch{}}}
      ></textarea>`;const n=i.length&&this._hass?this._explain(i):void 0;return K`
      <details class="conditions-section" data-key=${a.key}>
        <summary>
          ${this._t(`editor.cond.${a.key}.label`)}${i.length?` (${i.length})`:""}
          ${n?K`<span class="check-dot ${n.met?"met":"unmet"}" aria-hidden="true"></span>`:Z}
          <span class="conditions-hint">${this._t(`editor.cond.${a.key}.hint`)}</span>
        </summary>
        ${n?this._renderCheck(n):Z}
        ${r}
      </details>
    `}_renderCheck(e){return K`
      <div class="check ${e.met?"met":"unmet"}" role="status">
        <div class="check-head">
          ${e.met?"✅":"❌"} ${this._t(e.met?"check.now_met":"check.now_unmet")}
        </div>
        <ul class="check-list">
          ${e.items.map(e=>this._renderCheckItem(e))}
        </ul>
      </div>
    `}_renderCheckItem(e){const t=e.met?"✅":"❌";return K`<li class="check-item ${e.met?"met":"unmet"}">
      <span class="check-mark">${t}</span>
      <span class="check-text">${this._describe(e)}</span>
      ${e.children?K`<ul class="check-list">${e.children.map(e=>this._renderCheckItem(e))}</ul>`:Z}
    </li>`}_describe(e){const t=(e,t)=>this._t(e,t),a=()=>e.missing?` (${t("check.missing")})`:void 0!==e.current?` (${t("check.now",{value:e.current})})`:"";switch(e.type){case"state":return t(e.negate?"check.state_is_not":"check.state_is",{entity:e.entity??"?",values:(e.expected??[]).join(t("check.or"))})+a();case"numeric_state":{const i=[];return void 0!==e.above&&i.push(t("check.above",{value:e.above})),void 0!==e.below&&i.push(t("check.below",{value:e.below})),t("check.numeric",{entity:e.entity??"?",range:i.join(t("check.and"))})+a()}case"screen":return t("check.screen",{query:e.media_query??""});case"time":{const a=[];return e.after&&a.push(t("check.time_after",{value:e.after})),e.before&&a.push(t("check.time_before",{value:e.before})),e.weekday?.length&&a.push(t("check.time_days",{days:e.weekday.join(", ")})),t("check.time",{range:a.join(" ")})}case"user":return t("check.user",{count:e.count??0});case"template":return t(e.pending?"check.template_pending":"check.template");case"and":case"or":case"not":return t(`check.group_${e.type}`);default:return t("check.unknown")}}async _ensureConditionsEditor(){if(!customElements.get("ha-card-conditions-editor"))try{(await(window.loadCardHelpers?.()))?.createCardElement?.({type:"conditional",conditions:[],card:{type:"markdown"}}),await(customElements.get("hui-conditional-card")?.getConfigElement?.()),customElements.get("ha-card-conditions-editor")&&this.requestUpdate()}catch{}}firstUpdated(){this._ensureConditionsEditor()}render(){return this._config?null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView():K``}_renderCardView(e){const t=this._config.tabs[e];if(!t)return this._editingTab=null,this._renderListView();const a=!!t.card?.type;return K`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← ${this._t("editor.back")}</button>
          <span class="card-editor-title">${t.name||this._t("editor.tab_n",{n:e+1})}</span>
          ${a?K`<button class="change-card-type" @click=${()=>this._changeCardType(e)}>
                ${this._t("editor.change_type")}
              </button>`:Z}
        </div>
        ${a?this._renderCardEditor(e,t):this._renderCardTypeChooser(e)}
      </div>
    `}_renderCardTypeChooser(e){return K`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${Mi}
          .computeLabel=${()=>this._t("editor.card_type")}
          @value-changed=${t=>this._onTypeChosen(e,t)}
        ></ha-form>
        <p class="card-type-hint">${this._t("editor.card_type_hint")}</p>
      </div>
    `}_renderCardEditor(e,t){const a=Ri(e=>!!customElements.get(e));return"hui-card-element-editor"===a?K`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${t.card??{}}
          @config-changed=${t=>this._onNativeCardChanged(e,t)}
        ></hui-card-element-editor>
      `:"ha-yaml-editor"===a?K`
        <ha-yaml-editor
          .defaultValue=${t.card??{}}
          @value-changed=${t=>this._onYamlCardChanged(e,t)}
        ></ha-yaml-editor>
      `:K`
      <label class="card-label"
        >${this._t("editor.card_json")}
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(t.card??{},null,2)}
          @change=${t=>this._editCardJson(e,t.target.value)}
        ></textarea>
      </label>
      ${this._cardError===e?K`<div class="tab-card-error">${this._t("editor.invalid_json")}</div>`:Z}
    `}_renderStatusChips(e){if(!this._hass)return Z;const t=Array.isArray(e.visibility)&&e.visibility.length>0&&!this._explain(e.visibility).met,a=Array.isArray(e.alert)&&e.alert.length>0&&this._explain(e.alert).met;return t||a?K`<div class="tab-status">
      ${t?K`<span class="chip chip-hidden" title=${this._t("check.chip_hidden_title")}
            >${this._t("check.chip_hidden")}</span>`:Z}
      ${a?K`<span class="chip chip-alert">${this._t("check.chip_alert")}</span>`:Z}
    </div>`:Z}_renderListView(){const e=this._config;return K`
      <div class="editor">
        <div class="preview" aria-hidden="true">
          <span class="preview-label">${this._t("editor.preview")}</span>
          <tabdeck-tabbar
            class="preview-bar"
            .items=${e.tabs.map((e,t)=>({name:!ca(e.name)&&e.name||this._t("editor.tab_n",{n:t+1}),icon:ca(e.icon)?void 0:e.icon,accent:ca(e.accent)?void 0:e.accent,color:ca(e.color)?void 0:e.color,disabled:e.disabled}))}
            .selected=${0}
            .position=${"top"}
            .tabStyle=${e.style}
            .display=${e.tab_display}
            .align=${e.align}
            .indicatorSize=${e.indicator_size}
            .indicatorRadius=${e.indicator_radius}
            .accentIndicator=${e.accent_indicator}
          ></tabdeck-tabbar>
        </div>

        <ha-form
          class="globals-form"
          .hass=${this.hass}
          .data=${this._globalData}
          .schema=${this._globalSchema()}
          .computeLabel=${this._computeGlobalLabel}
          @value-changed=${this._onGlobalChanged}
        ></ha-form>

        ${this._warnings().map(e=>K`<div class="editor-warning" role="alert">⚠️ ${e}</div>`)}

        ${e.tabs.length>1?K`<div class="bulk-controls">
              <button class="expand-all" @click=${this._expandAll}>${this._t("editor.expand_all")}</button>
              <button class="collapse-all" @click=${this._collapseAll}>${this._t("editor.collapse_all")}</button>
            </div>`:Z}

        <ha-sortable
          handle-selector=".drag-handle"
          @item-moved=${this._onItemMoved}
        >
        <div class="tabs">
          ${e.tabs.map((t,a)=>{const i=this._expanded.has(a);return K`
              <div class="tab ${i?"expanded":"collapsed"}">
                <div
                  class="tab-header"
                  role="button"
                  tabindex="0"
                  aria-expanded=${i?"true":"false"}
                  @click=${()=>this._toggleExpanded(a)}
                  @keydown=${e=>this._onHeaderKeydown(a,e)}
                >
                  <div class="tab-summary">
                    <ha-svg-icon
                      class="drag-handle"
                      .path=${"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"}
                      title=${this._t("editor.drag")}
                      @click=${e=>e.stopPropagation()}
                    ></ha-svg-icon>
                    <ha-svg-icon
                      class="expand-chevron"
                      .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                    ></ha-svg-icon>
                    <ha-icon
                      class="tab-icon"
                      .icon=${!ca(t.icon)&&t.icon||"mdi:tab"}
                    ></ha-icon>
                    <span class="tab-title">${t.name||this._t("editor.tab_n",{n:a+1})}</span>
                    <span class="tab-type">${t.card?.type??"—"}</span>
                  </div>
                  <div class="tab-controls">
                    <ha-icon-button
                      class="move-up"
                      .label=${this._t("editor.move_up")}
                      .path=${"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"}
                      .disabled=${0===a}
                      @click=${e=>{e.stopPropagation(),this._move(a,-1)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="move-down"
                      .label=${this._t("editor.move_down")}
                      .path=${"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"}
                      .disabled=${a===e.tabs.length-1}
                      @click=${e=>{e.stopPropagation(),this._move(a,1)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="copy-tab"
                      .label=${this._t("editor.copy_tab")}
                      .path=${"M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z"}
                      @click=${e=>{e.stopPropagation(),this._copyTab(a)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="duplicate-tab"
                      .label=${this._t("editor.duplicate_tab")}
                      .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                      @click=${e=>{e.stopPropagation(),this._duplicateTab(a)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="delete-tab"
                      .label=${this._t("editor.delete_tab")}
                      .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                      @click=${e=>{e.stopPropagation(),this._deleteTab(a)}}
                    ></ha-icon-button>
                  </div>
                </div>
                ${this._renderStatusChips(t)}
                ${i?K`
                      <ha-form
                        class="tab-form"
                        .hass=${this.hass}
                        .data=${{name:t.name??"",subtitle:t.subtitle??"",icon:t.icon??"",accent:t.accent??"",color:t.color??"",badge:"string"==typeof t.badge?t.badge:"",badge_color:t.badge_color??"",background:t.background??"",badge_icon:t.badge_icon??"",ring:t.ring??"",ring_max:t.ring_max,ring_color:t.ring_color??"",area:t.area??"",pin:t.pin??"",pin_timeout:t.pin_timeout,disabled:!!t.disabled,fab:!!t.fab,card_size:t.card_size,hold_action:t.hold_action,badge_action:t.badge_action,tap_action:t.tap_action,enter_action:t.enter_action,leave_action:t.leave_action}}
                        .schema=${Ni}
                        .computeLabel=${this._computeTabLabel}
                        @value-changed=${e=>this._onTabFieldsChanged(a,e)}
                      ></ha-form>
                      ${Pi.map(e=>this._renderConditions(a,t,e))}
                      <button class="edit-card" @click=${()=>this._openCard(a)}>
                        <span class="edit-card-label">${this._t("editor.edit_card")}</span>
                        <span class="edit-card-type">${t.card?.type??"—"}</span>
                        <span class="edit-card-arrow">→</span>
                      </button>
                    `:Z}
              </div>
            `})}
        </div>
        </ha-sortable>
        <!-- Icons go in both slots: "start" (current WebAwesome ha-button) and
             "icon" (older builds); the unused slot's copy isn't rendered. -->
        <div class="add-row">
          <ha-button class="add-tab" @click=${this._addTab}>
            <ha-svg-icon slot="start" .path=${Ti}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
            ${this._t("editor.add_tab")}
          </ha-button>
          <ha-button class="import-tab" @click=${this._toggleImport}>
            <ha-svg-icon slot="start" .path=${ji}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${ji}></ha-svg-icon>
            ${this._t("editor.import_tab")}
          </ha-button>
          <ha-button class="starter-tab" @click=${this._toggleStarter}>
            <ha-svg-icon slot="start" .path=${Ei}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${Ei}></ha-svg-icon>
            ${this._t("starter.button")}
          </ha-button>
          <ha-button class="convert-tab" @click=${this._toggleConvert}>
            <ha-svg-icon slot="start" .path=${Oi}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${Oi}></ha-svg-icon>
            ${this._t("convert.button")}
          </ha-button>
        </div>
        ${this._convertOpen?this._renderConvert():Z}
        ${this._starterOpen?this._renderStarter():Z}
        ${this._importOpen?this._renderImport():Z}
        ${this._status?K`<div class="editor-status" role="status">${this._status}</div>`:Z}
      </div>
    `}static{this.styles=n`
    .tab-status {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: -8px;
      padding-left: 64px;
    }
    .chip {
      flex-shrink: 0;
      font-size: 11px;
      line-height: 18px;
      padding: 0 8px;
      border-radius: 9px;
      white-space: nowrap;
    }
    .chip-hidden {
      background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent);
      color: var(--secondary-text-color);
    }
    .chip-alert {
      background: color-mix(in srgb, var(--error-color, #db4437) 18%, transparent);
      color: var(--error-color, #db4437);
    }
    .check-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-left: 6px;
      vertical-align: middle;
    }
    .check-dot.met {
      background: var(--success-color, #43a047);
    }
    .check-dot.unmet {
      background: var(--secondary-text-color);
    }
    .check {
      font-size: 13px;
      padding: 8px 10px;
      margin-bottom: 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .check-head {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .check-list {
      list-style: none;
      margin: 0;
      padding-left: 4px;
    }
    .check-list .check-list {
      padding-left: 18px;
    }
    .check-item {
      padding: 2px 0;
    }
    .check-mark {
      font-size: 11px;
      margin-right: 4px;
    }
    .check-text {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .add-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .import-panel {
      margin-top: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px;
    }
    .import-hint {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    textarea.import-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
    }
    .import-error {
      color: var(--error-color, #db4437);
      font-size: 13px;
      margin-top: 6px;
    }
    .import-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
    .convert-summary {
      margin-top: 8px;
      font-size: 13px;
    }
    .convert-tabs {
      margin: 6px 0;
      padding-left: 18px;
    }
    .convert-tabs ha-icon {
      --mdc-icon-size: 16px;
      margin-right: 6px;
      color: var(--secondary-text-color);
    }
    .convert-note {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    .editor-status {
      margin-top: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .conditions-section {
      margin: 8px 0;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 6px 10px;
    }
    .conditions-section summary {
      cursor: pointer;
      font-weight: 500;
      padding: 4px 0;
    }
    .conditions-hint {
      font-weight: 400;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-left: 6px;
    }
    .conditions-section[open] summary {
      margin-bottom: 8px;
    }
    textarea.conditions-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .globals-form {
      display: block;
    }
    .preview {
      border: 1px dashed var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px;
      pointer-events: none;
    }
    .preview-label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    .tabs {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tab {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background));
    }
    .tab-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: pointer;
      padding: 4px;
      margin: -4px;
      border-radius: 8px;
      user-select: none;
    }
    .tab-header:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .tab-header:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 0;
    }
    .tab-summary {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
      overflow: hidden;
    }
    .drag-handle {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      cursor: grab;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .editor-warning {
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .expand-chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
    }
    .tab.expanded .expand-chevron {
      transform: rotate(180deg);
    }
    .tab-icon {
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .tab-title {
      min-width: 3em;
      flex: 0 1 auto;
      font-weight: 500;
      font-size: 15px;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-type {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-controls {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      --mdc-icon-button-size: 40px;
    }
    .delete-tab {
      color: var(--error-color, #db4437);
    }
    .edit-card {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      font-size: 14px;
      text-align: left;
    }
    .edit-card:hover {
      background: var(--divider-color, #e0e0e0);
    }
    .edit-card-type {
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .edit-card-arrow {
      margin-left: auto;
      color: var(--secondary-text-color);
    }
    .add-tab {
      align-self: flex-start;
    }
    .bulk-controls {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
    .bulk-controls button {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 13px;
      padding: 4px 6px;
    }
    .card-editor-view {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .card-editor-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .card-editor-title {
      font-weight: 500;
    }
    .back-to-list,
    .change-card-type {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      color: var(--primary-text-color);
      background: none;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      font-size: 14px;
    }
    .change-card-type {
      margin-left: auto;
      color: var(--primary-color);
    }
    .card-type-chooser {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-type-hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .card-type-hint code {
      font-family: var(--code-font-family, monospace);
    }
    .card-label {
      font-size: 12px;
      gap: 4px;
    }
    .tab-card-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-card-error {
      color: var(--error-color, #b00020);
      font-size: 12px;
    }
    button {
      cursor: pointer;
    }
  `}},Ia([Ce()],Ii.prototype,"_config",void 0),Ia([Ce()],Ii.prototype,"_editingTab",void 0),Ia([Ce()],Ii.prototype,"_cardError",void 0),Ia([Ce()],Ii.prototype,"_expanded",void 0),Ia([Ce()],Ii.prototype,"_importOpen",void 0),Ia([Ce()],Ii.prototype,"_importError",void 0),Ia([Ce()],Ii.prototype,"_starterOpen",void 0),Ia([Ce()],Ii.prototype,"_starterKind",void 0),Ia([Ce()],Ii.prototype,"_convertOpen",void 0),Ia([Ce()],Ii.prototype,"_convertResult",void 0),Ia([Ce()],Ii.prototype,"_convertError",void 0),Ia([Ce()],Ii.prototype,"_status",void 0),Ii=Ia([ve("tabdeck-card-editor")],Ii)});ze(),Ke(),We(),Ut(),ta(),fa(),et(),Oa(),vt(),Xa(),Ha(),Ra();var Hi=["pointerdown","keydown","touchstart","wheel"],Bi=["name","subtitle","icon","color","accent","background"],qi=class extends me{constructor(...e){super(...e),this._selected=0,this._built=!1,this._width=0,this._collapsed=!1,this._fullscreen=!1,this._cardKey="",this._genTabs=[],this._genKey="",this._entityWriteGuard=0,this._editModeFlag=!1,this._previewFlag=!1,this._fromPop=!1,this._onPopState=e=>{if(!this._config?.history||!this._built)return;const t=e.state?.tabdeck?.[this._cardKey];if("number"==typeof t&&t!==this._selected&&this._isContentTab(this._visibleTabs()[t]))if(this._isLocked(this._visibleTabs()[t]))this._pinFor={index:t,error:!1};else{this._fromPop=!0;try{this._collapsed=!1,this._selectIndex(t)}finally{this._fromPop=!1}}},this._onHotkey=e=>{const t=this._config;if(!t?.hotkeys||!this._built||e.ctrlKey||e.metaKey||e.altKey||e.defaultPrevented)return;const a=e.composedPath()[0];if((!a||!a.isContentEditable&&!/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName??""))&&("function"!=typeof this.checkVisibility||this.checkVisibility()))if("/"===e.key&&t.search)e.preventDefault(),this.renderRoot.querySelector("tabdeck-tabbar")?.openSearch?.();else if(/^[1-9]$/.test(e.key))this.selectTab(Number(e.key)-1)&&e.preventDefault();else if("["===e.key||"]"===e.key){const a=this._stepContent(this._selected,"]"===e.key?1:-1,t.swipe_wrap);a!==this._selected&&this._userSelect(a)}},this._lastInteraction=Date.now(),this._lastRotate=Date.now(),this._rotatePausedUntil=0,this._onInteraction=()=>this._noteInteraction(Date.now()),this._autoSigs=[],this._alertOrder=/* @__PURE__ */new Set,this._cancelPin=()=>{this._pinFor=void 0},this._templateResolver=e=>this._templates?.boolean(e),this._layout={order:[],hidden:[]},this._spyObserved=[],this._spyInView=/* @__PURE__ */new Set,this._spySuppressUntil=0,this._spyDriven=!1,this._groupChild=/* @__PURE__ */new WeakMap,this._onNestedChanged=e=>{const t=e.detail;if(!t||t.deck===this)return;const a=this._allTabs().find(e=>this._manager?.get(this._allTabs().indexOf(e))===t.deck);"menu"===a?.group?.display&&t.name&&(this._groupChild.set(a,t.name),this.requestUpdate())},this._seenAt=/* @__PURE__ */new Map,this._builtAt=Date.now(),this._toggleFullscreen=()=>{this._fullscreen=!this._fullscreen,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))},this._onFullscreenKey=e=>{"Escape"===e.key&&this._fullscreen&&(this._fullscreen=!1,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex())))},this._peekSettling=!1,this._onTouchMove=e=>{const t=this._peek,a=e.touches[0];if(!t||!a||!this._config?.swipe_peek)return;const i=a.clientX-t.x,o=a.clientY-t.y;if(!t.axis){if(Math.abs(i)<10&&Math.abs(o)<10)return;t.axis=Math.abs(i)>Math.abs(o)?"x":"y"}"x"===t.axis&&this._peekMove(i)},this._eventWarned=!1,this._onTouchStart=e=>{if(!this._config?.swipe||1!==e.touches.length)return void(this._touchStart=void 0);const t=e.touches[0];this._touchStart={x:t.clientX,y:t.clientY,t:e.timeStamp},this._config.swipe_peek&&this._peekStart(t.clientX,t.clientY)},this._onTouchEnd=e=>{const t=this._touchStart;if(this._touchStart=void 0,!t||!this._config?.swipe)return;if(this._config.swipe_peek)return this._peekEnd();const a=e.changedTouches[0];a&&this._applySwipe(t,{x:a.clientX,y:a.clientY,t:e.timeStamp})},this._onPointerDown=e=>{this._config?.swipe_mouse&&"touch"!==e.pointerType?this._touchStart={x:e.clientX,y:e.clientY,t:e.timeStamp}:this._touchStart=void 0},this._onPointerUp=e=>{const t=this._touchStart;this._touchStart=void 0,t&&this._config?.swipe_mouse&&"touch"!==e.pointerType&&this._applySwipe(t,{x:e.clientX,y:e.clientY,t:e.timeStamp})},this._appliedStyleKeys=[]}set editMode(e){this._setEditFlags(!!e,this._previewFlag)}get editMode(){return this._editModeFlag}set preview(e){this._setEditFlags(this._editModeFlag,!!e)}get preview(){return this._previewFlag}_setEditFlags(e,t){if(e===this._editModeFlag&&t===this._previewFlag)return;const a=this._config&&this._built?this._visibleTabs()[this._selected]?.name:void 0;this._editModeFlag=e,this._previewFlag=t,void 0!==a&&this._restoreSelection(a),this.requestUpdate()}get _editing(){return(this._editModeFlag||this._previewFlag)&&!1!==this._config?.edit_mode_reveal}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(Vi(),Di)),document.createElement("tabdeck-card-editor")}setConfig(e){this._config=Bt(e),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=qt(this._config),this._collapsed=this._config.start_collapsed,this._fullscreen=!1,this._seenAt.clear(),this._alertOrder=/* @__PURE__ */new Set,this._autoSigs=[],this._lastRemote=void 0,this._pinFor=void 0,this._unsubscribeRemote(),this._autoPrev=void 0,this._lastEntityValue=void 0,this._genTabs=[],this._genKey="",this._templates?.destroy(),this._templates=void 0,this._syncTimer(),this._syncUnloadTimer(),this._syncWidthObserver(),this._build()}_syncWidthObserver(){const e=!!(this._config?.split||this._config?.tab_display_narrow||this._config?.transition_narrow)&&this.isConnected&&"undefined"!=typeof ResizeObserver;e&&!this._widthObserver?(this._widthObserver=new ResizeObserver(e=>{const t=Math.round(e[0]?.contentRect?.width??0);t!==this._width&&(this._width=t)}),this._widthObserver.observe(this)):!e&&this._widthObserver&&(this._widthObserver.disconnect(),this._widthObserver=void 0)}get _isSplit(){const e=this._config?.split;return!!e&&this._width>=e.min_width}get _isNarrow(){return this._width>0&&this._width<this._config.narrow_width}get _effectiveDisplay(){const e=this._config;return e.tab_display_narrow&&this._isNarrow?e.tab_display_narrow:e.tab_display}_renderSplit(e){const t=e.filter(e=>!It(e));return K`
      <div class="split" style="--tabdeck-split-columns:${this._config.split.columns}">
        ${t.map(e=>{const t=this._text(e.icon);return K`
            <div class="split-col">
              <div class="split-title">
                ${t?K`<ha-icon .icon=${t}></ha-icon>`:Z}
                <span>${this._text(e.name)??""}</span>
              </div>
              ${this._manager?.get(this._allTabs().indexOf(e))}
            </div>
          `})}
      </div>
    `}connectedCallback(){super.connectedCallback();for(const e of Hi)this.addEventListener(e,this._onInteraction);this._syncTimer(),this._syncUnloadTimer(),this._syncWidthObserver(),this._hass&&this._syncTemplates(),this._config?.scroll_spy&&this.updateComplete.then(()=>this._syncSpyObserver()),this._config?.dock&&this.updateComplete.then(()=>this._syncDock()),document.addEventListener("keydown",this._onHotkey),document.addEventListener("keydown",this._onFullscreenKey),window.addEventListener("popstate",this._onPopState)}_historyState(e){const t=history.state&&"object"==typeof history.state?history.state:{};return{...t,tabdeck:{...t.tabdeck??{},[this._cardKey]:e}}}disconnectedCallback(){super.disconnectedCallback();for(const e of Hi)this.removeEventListener(e,this._onInteraction);document.removeEventListener("keydown",this._onHotkey),document.removeEventListener("keydown",this._onFullscreenKey),window.removeEventListener("popstate",this._onPopState),this._stopTimer(),this._unloadTimer&&clearInterval(this._unloadTimer),this._unloadTimer=void 0,this._spyObserver?.disconnect(),this._spyObserver=void 0,this._spyObserved=[],this._widthObserver?.disconnect(),this._widthObserver=void 0,this._dockObserver?.disconnect(),this._dockObserver=void 0,this._templates?.destroy(),this._templates=void 0,this._unsubscribeRemote()}_noteInteraction(e){this._lastInteraction=e;const t=this._config?.auto_rotate?.resume_after??0;this._rotatePausedUntil=e+1e3*t}_syncTimer(){const e=!(!this._config?.auto_rotate&&!this._config?.idle_return)&&this.isConnected;e&&!this._timer?(this._lastInteraction=this._lastRotate=Date.now(),this._timer=setInterval(()=>this._tick(Date.now()),1e3)):e||this._stopTimer()}_stopTimer(){this._timer&&clearInterval(this._timer),this._timer=void 0}_tick(e){const t=this._config;if(!t||!this._built)return;if(this._editing)return void(this._lastInteraction=this._lastRotate=e);const a=e-this._lastInteraction,i=t.auto_rotate;if(i){if(e<this._rotatePausedUntil)return void(this._lastRotate=e);if(e-this._lastRotate>=1e3*i.interval){this._lastRotate=e;const t=this._nextRotatable(this._selected);t!==this._selected&&this._selectIndex(t,!1)}}else if(t.idle_return&&a>=1e3*t.idle_return){const t=this._computeDefaultIndex();t===this._selected||this._isLocked(this._visibleTabs()[t])||this._selectIndex(t,!1),this._lastInteraction=e}}_nextRotatable(e){const t=this._visibleTabs();let a=e;for(let i=0;i<t.length;i++)if(a=this._stepContent(a,1,!0),a===e||!this._isLocked(t[a]))return a;return e}_computeCardKey(e){return e.storage_key?e.storage_key:`${"undefined"!=typeof location?location.pathname:""}#${e.tabs.map(e=>e.name??"").join("|")}`}async _build(){if(!this._config)return;this._layout=this._config.customize?function(e){try{const t=JSON.parse(localStorage.getItem(Ma(e))??"null");if(!t||"object"!=typeof t)return Na;const a=e=>Array.isArray(e)?e.filter(e=>"string"==typeof e):[];return{order:a(t.order),hidden:a(t.hidden)}}catch{return Na}}(this._cardKey):{order:[],hidden:[]};const e=await na();this._manager=new da(e),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._cardConfigs()),this._hass&&this._manager.setHass(this._hass);const t=[...this._config.header_cards??[],...this._config.footer_cards??[]];if(t.length?(this._extras=new da(e),this._extras.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._extras.build(t),this._hass&&this._extras.setHass(this._hass)):this._extras=void 0,this._builtAt=Date.now(),this._syncTemplates(),this._selected=ra({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:this._computeDefaultIndex(),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(e=>e.name??""),entityValue:this._config.remember_entity?this._hass?.states?.[this._config.remember_entity]?.state:void 0}),this._selected=this._ensureContentTab(this._selected),this._isLocked(this._visibleTabs()[this._selected])){const e=this._visibleTabs().findIndex(e=>this._isContentTab(e)&&!this._isLocked(e));e>=0&&(this._selected=e)}this._config.history&&"undefined"!=typeof history&&history.replaceState(this._historyState(this._selected),"",location.href),this._lastEntityValue=this._rememberEntityState(),this._built=!0,this._refreshAlertOrder(),this.requestUpdate()}set hass(e){this._hass=e,this._manager?.setHass(e),this._extras?.setHass(e),this._syncTemplates(),this._runAutoSelect(),this._syncRememberEntity(),this._syncAutoContent(),this._refreshAlertOrder(),this._syncRemoteEntity(),this._syncRemoteEvent(),this.requestUpdate()}_autoCard(e){if(!e.card?.type&&(e.area||e.floor||e.label))return function(e,t,a="No entities here.",i=2){if(!e.area&&!e.floor&&!e.label)return;const o=Object.keys(t?.entities??{}).filter(a=>{const i=t.entities[a];if(i.hidden||i.entity_category||!t.states?.[a])return!1;if(e.domains?.length&&!e.domains.includes(a.split(".")[0]))return!1;if(e.label)return Array.isArray(i.labels)&&i.labels.includes(e.label);const o=qa(t,a);return e.area?o===e.area:!!o&&t.areas?.[o]?.floor_id===e.floor}).sort();return o.length?{type:"grid",columns:i,square:!1,cards:o.map(e=>({type:"tile",entity:e}))}:{type:"markdown",content:a}}(e,this._hass,ja(Ta(this._hass),"card.no_entities"))}_syncAutoContent(){this._manager&&this._built&&this._allTabs().forEach((e,t)=>{const a=this._autoCard(e);if(!a)return;const i=JSON.stringify(a);i!==this._autoSigs[t]&&(this._autoSigs[t]=i,this._manager.replace(t,a))})}_refreshAlertOrder(){if(!this._config?.alert_first||!this._built)return;const e=new Set(this._allTabs().filter(e=>this._isAlerting(e)));if(e.size===this._alertOrder.size&&[...e].every(e=>this._alertOrder.has(e)))return;const t=this._visibleTabs()[this._selected]?.name;this._alertOrder=e,this._restoreSelection(t)}_snoozeKey(e){return this._text(e.name)??String(this._allTabs().indexOf(e))}get _deckId(){return this._config?.event_id??this._config?.storage_key??this._cardKey}_indexOf(e){const t=this._visibleTabs();if("number"==typeof e)return e;const a=String(e??"").trim();if(/^\d+(\.0+)?$/.test(a)&&!t.some(e=>e.name===a))return Number(a);const i=e=>e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),o=t.findIndex(e=>e.name===a);return o>=0?o:t.findIndex(e=>void 0!==e.name&&i(e.name)===i(a))}_remoteSelect(e){const t=this._indexOf(e);this._isContentTab(this._visibleTabs()[t])&&(this._collapsed=!1,t!==this._selected&&this._selectIndex(t,!1))}_syncRemoteEntity(){const e=this._config?.remote_entity;if(!e)return;const t=this._hass?.states?.[e]?.state;if(void 0===t||t===this._lastRemote)return;const a=void 0===this._lastRemote;this._lastRemote=t,a||!this._built||["","unknown","unavailable"].includes(t)||this._remoteSelect(t)}_syncRemoteEvent(){const e=this._hass?.connection;this._config?.remote_event&&!this._remoteSub&&this.isConnected&&e?.subscribeEvents&&(this._remoteSub=Promise.resolve(e.subscribeEvents(e=>{const t=e?.data??{};void 0!==t.deck&&t.deck!==this._deckId||void 0!==t.device&&t.device!==Ka()||this._remoteSelect(t.tab)},"tabdeck_select")).catch(e=>{console.warn("tabdeck-card: remote_event needs an admin user",e?.message??e)}))}_unsubscribeRemote(){const e=this._remoteSub;this._remoteSub=void 0,e?.then(e=>e?.())}_isLocked(e){return!(!e?.pin||this._editing)&&!function(e,t,a,i){try{const o=Number(sessionStorage.getItem(Ga(e,t)));return!(!Number.isFinite(o)||o<=0)&&(void 0===i||a-o<=6e4*i)}catch{return!1}}(this._deckId,e.name??"",Date.now(),e.pin_timeout)}_userSelect(e,t=!0){this._isLocked(this._visibleTabs()[e])?this._pinFor={index:e,error:!1}:(this._collapsed=!1,e!==this._selected&&this._selectIndex(e,t))}_onPinSubmit(e){e.preventDefault();const t=this._pinFor;if(!t)return;const a=this._visibleTabs()[t.index],i=this.renderRoot.querySelector(".pin-dialog input");if(!a||(i?.value??"")!==a.pin)return i&&(i.value=""),void(this._pinFor={...t,error:!0});!function(e,t,a){try{sessionStorage.setItem(Ga(e,t),String(a))}catch{}}(this._deckId,a.name??"",Date.now()),this._pinFor=void 0,this._collapsed=!1,t.index!==this._selected&&this._selectIndex(t.index)}_renderPin(){const e=this._pinFor,t=e?this._visibleTabs()[e.index]:void 0;if(!e||!t)return Z;const a=Ta(this._hass);return K`
      <div class="pin-backdrop" @click=${this._cancelPin}>
        <div
          class="pin-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tabdeck-pin-title"
          @click=${e=>e.stopPropagation()}
        >
          <form @submit=${this._onPinSubmit}>
            <div class="pin-title" id="tabdeck-pin-title">
              ${ja(a,"card.pin_title",{tab:this._text(t.name)??""})}
            </div>
            <input
              type="password"
              inputmode="numeric"
              autocomplete="off"
              aria-label=${ja(a,"card.pin_label")}
              @keydown=${e=>"Escape"===e.key&&this._cancelPin()}
            />
            ${e.error?K`<div class="pin-error" role="alert">${ja(a,"card.pin_wrong")}</div>`:Z}
            <div class="pin-actions">
              <button type="button" class="pin-cancel" @click=${this._cancelPin}>${ja(a,"card.cancel")}</button>
              <button type="submit" class="pin-ok">${ja(a,"card.open")}</button>
            </div>
          </form>
        </div>
      </div>
    `}_rememberEntityState(){const e="entity"===this._config?.remember?this._config.remember_entity:void 0;return e?this._hass?.states?.[e]?.state:void 0}_syncRememberEntity(){if(!this._built)return;const e=this._rememberEntityState();if(void 0===e||e===this._lastEntityValue)return;if(this._lastEntityValue=e,Date.now()<this._entityWriteGuard)return;const t=Math.trunc(Number(e));!Number.isFinite(t)||t<0||t>=this._visibleTabs().length||t!==this._selected&&this._selectIndex(t,!1)}_runAutoSelect(){if(!this._config)return;const e=this._allTabs();if(!e.some(e=>e.auto_select))return;const t=e=>{const t=this._hass?.states?.[e.entity]?.state;return void 0!==t&&(void 0!==e.state?t===e.state:Va(t))},a=e.map(e=>!!e.auto_select&&t(e.auto_select)),i=this._autoPrev;if(this._autoPrev=a,i)for(let o=0;o<e.length;o++)if(a[o]&&!i[o]){const t=this._visibleTabs().indexOf(e[o]);if(t>=0){this._selectIndex(t);break}}}get hass(){return this._hass}_cardConfigs(){return this._allTabs().map((e,t)=>{if(It(e)&&!e.card?.type)return null;const a=this._autoCard(e);return this._autoSigs[t]=a?JSON.stringify(a):void 0,a??e.card})}_isContentTab(e){return!!e&&!e.disabled&&!It(e)}_ensureContentTab(e){const t=this._visibleTabs();if(!t[e]||!It(t[e]))return e;const a=t.findIndex(e=>!It(e));return a>=0?a:e}_stepContent(e,t,a){const i=this._visibleTabs(),o=i.length;for(let r=1;r<o;r++){let n=e+t*r;if(a)n=(n%o+o)%o;else if(n<0||n>=o)return e;if(this._isContentTab(i[n]))return n}return e}_allTabs(){return this._config?this._genTabs.length?[...this._config.tabs,...this._genTabs]:this._config.tabs:[]}_visibleTabs(){if(!this._config)return[];if(this._editing)return this._allTabs();const e=this._allTabs().filter(e=>!this._isHidden(e)),t=this._config.customize?function(e,t){if(0===t.hidden.length)return e;const a=e.filter(e=>void 0===e.name||!t.hidden.includes(e.name));return a.length?a:e}(Pa(e,this._layout),this._layout):e;return this._config.alert_first?(i=e=>this._alertOrder.has(e),[...(a=t).filter(i),...a.filter(e=>!i(e))]):t;var a,i}_customItems(){const e=this._allTabs().filter(e=>!this._isHidden(e));return Pa(e,this._layout).map(e=>({name:this._text(e.name),icon:this._text(e.icon),key:e.name,hidden:void 0!==e.name&&this._layout.hidden.includes(e.name)}))}_onCustomize(e){const t=this._visibleTabs()[this._selected]?.name,a=e.detail??{};this._layout=a.reset?{order:[],hidden:[]}:{order:a.order??[],hidden:a.hidden??[]},function(e,t){try{!t||0===t.order.length&&0===t.hidden.length?localStorage.removeItem(Ma(e)):localStorage.setItem(Ma(e),JSON.stringify(t))}catch{}}(this._cardKey,a.reset?null:this._layout),this._restoreSelection(t),this._isContentTab(this._visibleTabs()[this._selected])||(this._selected=this._ensureContentTab(this._computeDefaultIndex())),this.requestUpdate()}_isHidden(e){return!ea(e.visibility,this._hass,this._templateResolver)}_collectTemplates(){if(!this._config)return[];const e=[];this._config.auto_tabs?.template&&e.push(this._config.auto_tabs.template);const t=a=>{for(const i of a??[])"template"===i?.condition&&i.value_template&&e.push(i.value_template),Array.isArray(i?.conditions)&&t(i.conditions)};for(const a of this._allTabs()){ca(a.badge)&&e.push(a.badge),ca(a.ring)&&e.push(a.ring);for(const t of Bi)ca(a[t])&&e.push(a[t]);t(a.visibility),t(a.default_if),t(a.alert)}return e}_makeSubscribe(){if(this._hass?.connection?.subscribeMessage)return la(()=>this._hass)}_syncTemplates(){const e=this._collectTemplates();if(0===e.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const e=this._makeSubscribe();if(!e)return;this._templates=new sa(e),this._templates.addEventListener("change",()=>{this._syncGeneratedTabs(),this._refreshAlertOrder(),this.requestUpdate()})}this._templates.track(e)}async _syncGeneratedTabs(){const e=this._config?.auto_tabs;if(!e||!this._manager)return;let t=this._templates?.result(e.template);const a=this._hass?.areas;"areas"===e.source&&Array.isArray(t)&&a&&(t=t.map(e=>e&&"object"==typeof e?{...e,icon:a[e.id]?.icon||e.icon}:e));const i=Jt(t,e),o=JSON.stringify(i);if(o===this._genKey)return;const r=this._visibleTabs()[this._selected]?.name;this._genKey=o,this._genTabs=i.map(Pt),this._restoreSelection(r),await this._manager.build(this._cardConfigs()),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this.requestUpdate()}_restoreSelection(e){const t=this._visibleTabs();if(e){const a=t.findIndex(t=>t.name===e);if(a>=0)return void(this._selected=a)}this._selected>t.length-1&&(this._selected=Math.min(this._computeDefaultIndex(),Math.max(0,t.length-1)))}getCardSize(){if(this._collapsed)return 1;const e=this._visibleTabs()[this._selected];if(e&&"number"==typeof e.card_size)return e.card_size;const t=this._manager?.get(this._activeOriginalIndex());return t&&"function"==typeof t.getCardSize?t.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_computeDefaultIndex(){const e=this._visibleTabs();for(let r=0;r<e.length;r++){const t=e[r].default_if;if(Array.isArray(t)&&t.length>0&&ea(t,this._hass,this._templateResolver))return r}const t=this._config,a=function(e,t){if(e&&"object"==typeof e&&t)return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}(t.default_by_device,Ka())??function(e,t){if(!e||"object"!=typeof e)return;const a=Object.entries(e).map(([e,t])=>{const a=Ua.exec(e.trim());return a?{at:60*Number(a[1])+Number(a[2]),tab:t}:void 0}).filter(e=>!!e).sort((e,t)=>e.at-t.at);if(!a.length)return;const i=60*t.getHours()+t.getMinutes(),o=a.filter(e=>e.at<=i);return(o.length?o[o.length-1]:a[a.length-1]).tab}(t.default_by_time,/* @__PURE__ */new Date);if(void 0!==a){const t=this._indexOf(a);if(this._isContentTab(e[t]))return t}const i=qt(t),o=e.indexOf(this._allTabs()[i]??t.tabs[i]);return o>=0?o:0}_activeOriginalIndex(){const e=this._visibleTabs()[this._selected];return this._allTabs().indexOf(e)}_onSelect(e){const t=this._visibleTabs()[e.detail.index];if(void 0!==e.detail.child){if(this._isLocked(t))return void(this._pinFor={index:e.detail.index,error:!1});this._collapsed=!1,e.detail.index!==this._selected&&this._selectIndex(e.detail.index);const a=this._manager?.get(this._allTabs().indexOf(t));return void this.updateComplete.then(()=>a?.selectTab?.(e.detail.child))}It(t)?this._runAction(t.tap_action,"tap"):this._config?.collapsible&&e.detail.index===this._selected?this._collapsed=!this._collapsed:this._userSelect(e.detail.index)}_scrollToSection(e){this._spySuppressUntil=Date.now()+900,this.updateComplete.then(()=>{(this.renderRoot?.querySelector?.(`.panel[data-index="${e}"]`))?.scrollIntoView?.({behavior:"smooth",block:"start"})})}_syncSpyObserver(){if(!this._config?.scroll_spy||"undefined"==typeof IntersectionObserver)return this._spyObserver?.disconnect(),this._spyObserver=void 0,void(this._spyObserved=[]);const e=[...this.renderRoot?.querySelectorAll?.(".panel")??[]];if(e.length!==this._spyObserved.length||!e.every((e,t)=>e===this._spyObserved[t])||!this._spyObserver){this._spyObserver?.disconnect(),this._spyInView.clear(),this._spyObserver=new IntersectionObserver(e=>this._onSpyEntries(e),{rootMargin:"-120px 0px -55% 0px"});for(const t of e)this._spyObserver.observe(t);this._spyObserved=e}}_onSpyEntries(e){for(const a of e){const e=Number(a.target.dataset?.index);Number.isInteger(e)&&(a.isIntersecting?this._spyInView.add(e):this._spyInView.delete(e))}if(Date.now()<this._spySuppressUntil||0===this._spyInView.size)return;const t=Math.min(...this._spyInView);if(t!==this._selected){this._spyDriven=!0;try{this._selectIndex(t,!1)}finally{this._spyDriven=!1}}}_runAction(e,t){if(!e||!this._hass)return;"perform-action"===e.action&&"string"==typeof e.perform_action&&(e={...e,action:"call-service",service:e.perform_action,service_data:e.data??e.service_data});const a={entity:e?.entity,[`${t}_action`]:e};De(this,this._hass,a,t)}_onTabAction(e){const t=this._visibleTabs()[e.detail.index];if(!t||!this._hass)return;if("hold"===e.detail.kind&&this._config?.alert_snooze&&this._isAlerting(t))return function(e,t,a,i){try{localStorage.setItem(Wa(e,t),String(a+6e4*i))}catch{}}(this._deckId,this._snoozeKey(t),Date.now(),this._config.alert_snooze),this._refreshAlertOrder(),void this.requestUpdate();const a="badge"===e.detail.kind?t.badge_action:t.hold_action;this._runAction(a,"badge"===e.detail.kind?"tap":"hold")}selectTab(e){const t=this._visibleTabs(),a="number"==typeof e?e:this._indexOf(e);return!!this._isContentTab(t[a])&&(this._isLocked(t[a])?(this._pinFor={index:a,error:!1},!1):(this._collapsed=!1,a!==this._selected&&this._selectIndex(a),!0))}get selectedTab(){return this._visibleTabs()[this._selected]?.name}_selectIndex(e,t=!0){const a=this._visibleTabs(),i=a[this._selected],o=e!==this._selected,r=Date.now();if(i&&this._seenAt.set(this._allTabs().indexOf(i),r),a[e]){const t=this._allTabs().indexOf(a[e]);this._seenAt.set(t,r),this._manager?.ensure(t)}this._selected=e,o&&(this._runAction(i?.leave_action,"tap"),this._runAction(a[e]?.enter_action,"tap"));const n=a[this._selected];if(o&&this._config?.fire_event&&this._fireTabEvent(e,n?.name,i?.name),o&&this.dispatchEvent(new CustomEvent("tabdeck-tab-changed",{detail:{index:e,name:n?.name,deck:this},bubbles:!0,composed:!0})),this._config&&t&&!this._editing){const e="browser"===(s={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:n?.name}).mode?((s.storage??globalThis.localStorage)?.setItem(aa(s.cardKey),String(s.index)),{}):"url"===s.mode?{hash:"#tab="+(s.tabName?s.tabName:String(s.index))}:{};this._config.history&&!this._fromPop?history.pushState(this._historyState(this._selected),"",e.hash??location.href):e.hash&&"undefined"!=typeof location&&history.replaceState(this._config.history?this._historyState(this._selected):null,"",e.hash),"entity"===this._config.remember&&this._writeRememberEntity(this._selected)}var s;this._config?.scroll_spy&&!this._spyDriven&&this._scrollToSection(e),this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}_syncUnloadTimer(){const e=!!this._config?.unload_after&&this.isConnected;e&&!this._unloadTimer?this._unloadTimer=setInterval(()=>this._sweepUnloaded(Date.now()),3e4):!e&&this._unloadTimer&&(clearInterval(this._unloadTimer),this._unloadTimer=void 0)}_sweepUnloaded(e){const t=this._config?.unload_after;if(!t||!this._manager||!this._built||this._config.scroll_spy||this._isSplit)return;const a=this._activeOriginalIndex();let i=!1;this._allTabs().forEach((o,r)=>{r!==a&&this._manager.isLoaded(r)&&e-(this._seenAt.get(r)??this._builtAt)>=6e4*t&&(this._manager.unload(r),i=!0)}),i&&this.requestUpdate()}_panelEl(e){return this.renderRoot?.querySelector?.(`.panel[data-index="${e}"]`)}_peekStart(e,t){this._peek={x:e,y:t,t:performance.now(),dx:0}}_peekMove(e){const t=this._peek,a=this.renderRoot.querySelector(".content"),i=this._panelEl(this._selected);if(!a||!i)return;const o=e<0?1:-1,r=this._stepContent(this._selected,o,!!this._config?.swipe_wrap),n=r!==this._selected?this._panelEl(r):null,s=n?e:e/3;t.dx=e,a.classList.add("dragging"),i.style.transform=`translateX(${s}px)`,t.neighbour&&t.neighbour!==n&&this._clearPeekPanel(t.neighbour),t.neighbour=n??void 0,n&&(n.classList.add("peek"),n.style.top=`${i.offsetTop}px`,n.style.transform=`translateX(calc(${o>0?"100%":"-100%"} + ${s}px))`)}_clearPeekPanel(e){e.classList.remove("peek"),e.style.transform="",e.style.top=""}_peekEnd(){const e=this._peek;if(this._peek=void 0,!e||"x"!==e.axis)return;const t=this.renderRoot.querySelector(".content"),a=this._panelEl(this._selected),i=t?.clientWidth||1,o=e.dx/Math.max(1,performance.now()-e.t),r=e.neighbour?function(e,t,a){return Math.abs(e)>t/3||Math.abs(e)>=30&&Math.abs(a)>.5?e<0?"next":"prev":null}(e.dx,i,o):null,n=a?.style.transform??"";if(a&&(a.style.transform=""),e.neighbour&&this._clearPeekPanel(e.neighbour),t?.classList.remove("dragging"),r){const t="next"===r?1:-1,a=this._stepContent(this._selected,t,!!this._config?.swipe_wrap);if(this._isLocked(this._visibleTabs()[a]))return void(this._pinFor={index:a,error:!1});this._peekSettling=!0,this._selectIndex(a);const i=`translateX(calc(${t>0?"100%":"-100%"} + ${e.dx}px))`;this.updateComplete.then(()=>{const e=this._panelEl(a);e&&"function"==typeof e.animate&&!this._reducedMotion()&&e.animate([{transform:i},{transform:"translateX(0)"}],{duration:200,easing:"ease-out"})})}else a&&n&&"function"==typeof a.animate&&!this._reducedMotion()&&a.animate([{transform:n},{transform:"translateX(0)"}],{duration:180,easing:"ease-out"})}_reducedMotion(){return"function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches}_fireTabEvent(e,t,a){const i=this._hass;i?.callApi&&Promise.resolve(i.callApi("POST","events/tabdeck_tab_changed",{deck:this._deckId,tab:t,index:e,previous:a,device:Ka()})).catch(e=>{this._eventWarned||(this._eventWarned=!0,console.warn("tabdeck-card: fire_event needs an admin user",e?.message??e))})}_writeRememberEntity(e){const t=this._config?.remember_entity,a=this._hass;if(!t||!a?.callService||!a.states?.[t])return;this._entityWriteGuard=Date.now()+1500;const i=t.split(".")[0];"input_number"===i?a.callService("input_number","set_value",{entity_id:t,value:e}):"input_text"===i&&a.callService("input_text","set_value",{entity_id:t,value:String(e)})}_applySwipe(e,t){const a=function(e,t,a={}){const i=a.minDistance??50,o=a.maxDuration??800,r=a.ratio??1.5,n=t.x-e.x,s=t.y-e.y;return t.t-e.t>o||Math.abs(n)<i||Math.abs(n)<Math.abs(s)*r?null:n<0?"next":"prev"}(e,t);if(!a||!this._config)return;const i=this._stepContent(this._selected,"next"===a?1:-1,this._config.swipe_wrap);i!==this._selected&&this._userSelect(i)}updated(e){super.updated(e);const t=this._visibleTabs();this._selected>t.length-1&&(this._selected=0),e.has("_selected")&&void 0!==e.get("_selected")&&!this._config?.scroll_spy&&(this._peekSettling?this._peekSettling=!1:this._animatePanel(this._selected>=e.get("_selected")?1:-1)),this._applyStyles(),e.has("_pinFor")&&this._pinFor&&!e.get("_pinFor")&&this.renderRoot.querySelector(".pin-dialog input")?.focus(),this._syncSpyObserver(),this._syncDock()}_syncDock(){if(!this._config?.dock||this._editing||!this.isConnected)return this._dockObserver?.disconnect(),void(this._dockObserver=void 0);if(this._dockObserver||"undefined"==typeof ResizeObserver)return;const e=this._dashboardPanel();e&&(this._dockObserver=new ResizeObserver(()=>this._measureDock(e)),this._dockObserver.observe(e),this._measureDock(e))}_dashboardPanel(){let e=this;for(;e;){if(e instanceof Element&&/^(HUI-ROOT|HA-PANEL-LOVELACE)$/.test(e.tagName))return e;e=e.parentNode??e.host??null}}_measureDock(e){const t=e.getBoundingClientRect();0!==t.width&&(this.style.setProperty("--tabdeck-dock-left",`${Math.max(0,Math.round(t.left))}px`),this.style.setProperty("--tabdeck-dock-right",`${Math.max(0,Math.round(window.innerWidth-t.right))}px`))}_applyStyles(){for(const a of this._appliedStyleKeys)this.style.removeProperty(a);const e=this._visibleTabs()[this._selected],t={...this._config?.styles??{},...e?.styles??{}};this._appliedStyleKeys=Object.keys(t);for(const[a,i]of Object.entries(t))this.style.setProperty(a,String(i))}_animatePanel(e){const t=this._config;if(!t)return;const a=t.transition_narrow&&this._isNarrow?t.transition_narrow:t.transition;if("none"===a||t.transition_duration<=0)return;if(this._reducedMotion())return;const i=this._panelEl(this._selected);i&&"function"==typeof i.animate&&i.animate(function(e,t){switch(e){case"fade":return[{opacity:0},{opacity:1}];case"slide":return[{opacity:0,transform:`translateX(${12*t}px)`},{opacity:1,transform:"translateX(0)"}];case"scale":return[{opacity:0,transform:"scale(0.96)"},{opacity:1,transform:"scale(1)"}];case"flip":return[{opacity:0,transform:`perspective(1200px) rotateY(${20*t}deg)`},{opacity:1,transform:"perspective(1200px) rotateY(0deg)"}];case"rise":return[{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}];default:return[]}}(a,e),{duration:t.transition_duration,easing:t.transition_easing})}render(){if(!this._config||!this._built)return Z;const e=this._visibleTabs();if(0===e.length)return K`<div class="empty"></div>`;const t=this._config;if(this._isSplit)return this._wrapExtras(this._renderSplit(e));const a=t.dock&&!this._editing,i=K`
      <tabdeck-tabbar
        .items=${e.map(e=>({name:this._text(e.name),subtitle:this._text(e.subtitle)??("menu"===e.group?.display?this._groupChild.get(e):void 0),icon:this._text(e.icon),accent:this._text(e.accent),color:this._text(e.color),disabled:e.disabled,badgeColor:e.badge_color,holdAction:!!e.hold_action||!!t.alert_snooze&&!!e.alert,badgeAction:!!e.badge_action,action:It(e),badge:this._resolveBadgeFinal(e),alert:this._isAlerting(e),ghost:this._editing&&this._isHidden(e),fab:e.fab,ring:this._ring(e),ringColor:e.ring_color,badgeIcon:e.badge_icon,menu:"menu"===e.group?.display?e.group.items:void 0}))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${a?"bottom":t.position}
        .dock=${a}
        .tabStyle=${t.style}
        .display=${this._effectiveDisplay}
        .align=${t.align}
        .badgeDisplay=${t.badge_display}
        .scrollable=${t.scrollable}
        .animated=${t.animated}
        .accentIndicator=${t.accent_indicator}
        .indicatorSize=${t.indicator_size}
        .indicatorRadius=${t.indicator_radius}
        .sticky=${t.sticky||t.scroll_spy}
        .collapsed=${this._collapsed}
        .elevation=${t.elevation}
        .scrollButtons=${t.scroll_buttons}
        .searchable=${t.search}
        .expandable=${t.fullscreen}
        @tabdeck-fullscreen=${this._toggleFullscreen}
        .railExpand=${t.rail_expand}
        .customizable=${t.customize&&!this._editing}
        .customItems=${t.customize?this._customItems():[]}
        @tabdeck-customize=${this._onCustomize}
        .overflowMenu=${t.overflow_menu}
        .barLabel=${t.aria_label}
        .language=${Ta(this._hass)}
        .barBackground=${t.bar_background}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `,o=e[this._selected],r=o&&!t.scroll_spy?function(e){if("string"!=typeof e)return;const t=e.trim();return""===t||/[;{}"<>\\]/.test(t)?void 0:/^(\/|https?:\/\/)/.test(t)?`center / cover no-repeat url("${t}")`:t}(this._text(o.background)):void 0,n="auto"!==t.content_height&&"tallest"!==t.content_height?t.content_height:void 0,s=!(this._fullscreen||!n&&!t.content_max_height),d=[r?`background:${r}`:"",s&&n?`height:${n}`:"",s&&t.content_max_height?`max-height:${t.content_max_height}`:""].filter(Boolean).join(";"),l=["content",t.content_arrows&&!t.scroll_spy?"with-arrows":"","tallest"!==t.content_height||t.scroll_spy?"":"tallest",s?"scrolls":"",r||!t.scroll_spy&&e.some(e=>e.background)?"has-bg":"",this._fullscreen?"fullscreen":"",t.fullscreen&&t.hide_bar?"with-fs":""].filter(Boolean).join(" "),c=Ta(this._hass),p=K`
      <div
        class=${l}
        style=${d}
        id="tabdeck-panel"
        role="tabpanel"
        ?hidden=${this._collapsed}
        @touchstart=${this._onTouchStart}
        @touchmove=${this._onTouchMove}
        @touchend=${this._onTouchEnd}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @tabdeck-tab-changed=${this._onNestedChanged}
      >
        ${t.content_arrows&&!t.scroll_spy?this._renderArrows():Z}
        ${t.fullscreen&&(this._fullscreen||t.hide_bar)?K`<button
              class="fs-toggle"
              aria-label=${ja(c,this._fullscreen?"card.exit_fullscreen":"card.fullscreen")}
              title=${ja(c,this._fullscreen?"card.exit_fullscreen":"card.fullscreen")}
              @click=${this._toggleFullscreen}
            >
              <ha-icon .icon=${this._fullscreen?"mdi:fullscreen-exit":"mdi:fullscreen"}></ha-icon>
            </button>`:Z}
        ${t.header&&!t.scroll_spy&&e[this._selected]?K`<div class="content-header">
              <span class="content-title">${this._text(e[this._selected].name)??""}</span>
              ${this._text(e[this._selected].subtitle)?K`<span class="content-subtitle"
                    >${this._text(e[this._selected].subtitle)}</span
                  >`:Z}
            </div>`:Z}
        ${e.map((e,a)=>{const i=this._allTabs().indexOf(e),o=a===this._selected,r=t.scroll_spy;return K`
            <div class="panel ${r?"section":""}" data-index=${a} ?hidden=${!r&&!o}>
              ${r&&t.header&&!It(e)?K`<div class="section-title">${this._text(e.name)??""}</div>`:Z}
              ${o?this._manager?.ensure(i):r||!t.unmount_hidden?this._manager?.get(i):Z}
            </div>
          `})}
      </div>
    `;return this._wrapExtras(K`
      <div class="root pos-${a?"bottom":t.position} ${a?"docked":""} ${t.hide_bar?"no-bar":""}">
        ${t.hide_bar?p:a||"bottom"===t.position?K`${p}${i}`:K`${i}${p}`}
      </div>
      ${this._renderPin()}
    `)}_wrapExtras(e){if(!this._extras)return e;const t=this._config.header_cards?.length??0,a=this._extras.all(),i=a.slice(0,t),o=a.slice(t);return K`
      ${i.length?K`<div class="deck-header">${i}</div>`:Z}
      ${e}
      ${o.length?K`<div class="deck-footer">${o}</div>`:Z}
    `}_renderArrows(){const e=!!this._config?.swipe_wrap,t=this._stepContent(this._selected,-1,e),a=this._stepContent(this._selected,1,e),i=Ta(this._hass);return K`
      ${t!==this._selected?K`<button class="nav-arrow prev" aria-label=${ja(i,"card.prev_tab")} @click=${()=>this._userSelect(t)}>‹</button>`:Z}
      ${a!==this._selected?K`<button class="nav-arrow next" aria-label=${ja(i,"card.next_tab")} @click=${()=>this._userSelect(a)}>›</button>`:Z}
    `}_isAlerting(e){if(!e.alert||!this._hass)return!1;const t=ea(e.alert,this._hass,this._templateResolver);if(!this._config?.alert_snooze)return t;const a=this._snoozeKey(e),i=void 0!==function(e,t,a){try{const i=Number(localStorage.getItem(Wa(e,t)));return Number.isFinite(i)&&i>a?i:void 0}catch{return}}(this._deckId,a,Date.now());return!t&&i&&function(e,t){try{localStorage.removeItem(Wa(e,t))}catch{}}(this._deckId,a),t&&!i}_ring(e){if(void 0!==e.ring)return function(e,t){if(void 0===e||""===String(e).trim())return;const a=Number(e);return Number.isFinite(a)&&t>0?Math.min(100,Math.max(0,a/t*100)):void 0}(this._resolveBadge(e.ring),e.ring_max??100)}_text(e){if(!ca(e))return e;const t=this._templates?.result(e);return null==t||""===String(t).trim()?void 0:String(t).trim()}_resolveBadgeFinal(e){const t=this._resolveBadge(e.badge);if(!this._config?.hide_inactive_badge||Va(t))return"dot"===this._config?.badge_display?t:Ge(t,e.badge_format??this._config?.badge_format)}_resolveBadge(e){if(!e)return;if("object"==typeof e){const t=function(e){if(!e||"object"!=typeof e||Array.isArray(e))return;const t=Ba(e.count);if(!t?.length)return;const a={count:t},i=Ba(e.state);return i?.length&&(a.state=i),"string"==typeof e.area&&e.area&&(a.area=e.area),a}(e);return t&&this._hass?function(e,t){let a=0;for(const[i,o]of Object.entries(t?.states??{})){if(!e.count.some(e=>{return t=i,(a=e).includes("*")?new RegExp("^"+a.split("*").map(e=>e.replace(/[.+?^${}()|[\]\\]/g,"\\$&")).join(".*")+"$").test(t):t===a;var t,a}))continue;if(e.area&&qa(t,i)!==e.area)continue;const r=o?.state;(e.state?e.state.includes(r):Va(r))&&a++}return String(a)}(t,this._hass):void 0}if(ca(e)){const t=this._templates?.result(e);return null==t?void 0:String(t)}if(!this._hass)return;const t=this._hass.states[e];return t?t.state:e}static{this.styles=n`
    :host {
      display: block;
    }
    .root.pos-left,
    .root.pos-right {
      display: flex;
    }
    .root.pos-right {
      flex-direction: row-reverse;
    }
    /* Beside a side bar, the content takes the remaining width. */
    .root.pos-left > .content,
    .root.pos-right > .content {
      flex: 1;
      min-width: 0;
    }
    .content {
      padding-top: 8px;
      position: relative;
    }
    .root.no-bar .content {
      padding-top: 0;
    }
    .nav-arrow {
      position: absolute;
      top: 50%;
      z-index: 3;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 24px;
      line-height: 1;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      opacity: var(--tabdeck-arrow-opacity, 0.7);
      transition: opacity 120ms ease;
    }
    .nav-arrow:hover,
    .nav-arrow:focus-visible {
      opacity: 1;
    }
    /* Arrows live in their own gutters so they never cover the card's
       controls. */
    .content.with-arrows {
      padding-left: var(--tabdeck-arrow-gutter, 40px);
      padding-right: var(--tabdeck-arrow-gutter, 40px);
    }
    .nav-arrow.prev {
      left: 2px;
    }
    .nav-arrow.next {
      right: 2px;
    }
    /* Room for the fixed dock so the last card isn't hidden behind it. */
    .root.docked .content {
      padding-bottom: calc(var(--tabdeck-dock-tab-height, 56px) + 16px + env(safe-area-inset-bottom, 0px));
    }
    .content-header {
      display: flex;
      flex-direction: column;
      padding: 4px 4px 10px;
    }
    .content-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .content-subtitle {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .panel[hidden],
    .content[hidden] {
      display: none;
    }
    /* scroll_spy: stacked sections; leave room for HA's header + sticky bar
       when a section is scrolled to. */
    .panel.section {
      scroll-margin-top: var(--tabdeck-spy-offset, 120px);
    }
    .panel.section + .panel.section {
      margin-top: 16px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 4px 4px 10px;
    }
    .empty {
      min-height: 8px;
    }
    .deck-header,
    .deck-footer {
      display: flex;
      flex-direction: column;
      gap: var(--tabdeck-extras-gap, 8px);
    }
    .deck-header {
      margin-bottom: var(--tabdeck-extras-gap, 8px);
    }
    .deck-footer {
      margin-top: var(--tabdeck-extras-gap, 8px);
    }
    /* content_height: tallest — every panel shares one grid cell, so the
       content is as tall as the tallest tab; inactive ones are invisible. */
    .content.tallest {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
    }
    .content.tallest > .content-header {
      grid-row: 1;
    }
    .content.tallest > .panel {
      grid-row: 2;
      grid-column: 1;
    }
    .content.tallest > .panel[hidden] {
      display: block;
      visibility: hidden;
      pointer-events: none;
    }
    .content.scrolls {
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .content.has-bg {
      padding: 12px;
      margin-top: 8px;
      border-radius: var(--tabdeck-content-radius, var(--ha-card-border-radius, 12px));
    }
    .content.with-fs {
      padding-top: 40px;
    }
    .fs-toggle {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 3;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      opacity: var(--tabdeck-arrow-opacity, 0.7);
    }
    .fs-toggle:hover,
    .fs-toggle:focus-visible {
      opacity: 1;
    }
    .content.fullscreen {
      position: fixed;
      inset: 0;
      z-index: var(--tabdeck-fullscreen-z, 9);
      margin: 0;
      padding: calc(52px + env(safe-area-inset-top, 0px)) 16px calc(16px + env(safe-area-inset-bottom, 0px));
      overflow-y: auto;
      border-radius: 0;
      background: var(--tabdeck-fullscreen-background, var(--primary-background-color));
    }
    .content.fullscreen.has-bg {
      background-size: cover;
    }
    .content.fullscreen .fs-toggle {
      position: fixed;
      top: calc(8px + env(safe-area-inset-top, 0px));
      right: 12px;
    }
    /* PIN prompt */
    .pin-backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--tabdeck-pin-z, 10);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);
    }
    .pin-dialog {
      width: min(320px, calc(100vw - 32px));
      padding: 20px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    .pin-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .pin-dialog input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      font-size: 20px;
      letter-spacing: 0.3em;
      text-align: center;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--secondary-background-color, transparent);
      color: inherit;
    }
    .pin-error {
      margin-top: 8px;
      color: var(--error-color, #db4437);
      font-size: 13px;
    }
    .pin-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
    .pin-actions button {
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font: inherit;
      cursor: pointer;
      background: none;
      color: var(--primary-color);
    }
    .pin-actions .pin-ok {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    /* swipe_peek: the neighbour panel shown beside the dragged one. */
    .content.dragging {
      overflow: hidden;
      touch-action: pan-y;
    }
    .panel.peek[hidden] {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .content.has-bg > .panel.peek {
      left: 12px;
      right: 12px;
    }
    .content.with-arrows > .panel.peek {
      left: var(--tabdeck-arrow-gutter, 40px);
      right: var(--tabdeck-arrow-gutter, 40px);
    }
    .split {
      display: grid;
      grid-template-columns: repeat(var(--tabdeck-split-columns, 2), minmax(0, 1fr));
      gap: var(--tabdeck-split-gap, 16px);
      align-items: start;
    }
    .split-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 4px 4px 10px;
    }
    .split-title ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
  `}};Ia([Ce()],qi.prototype,"_config",void 0),Ia([Ce()],qi.prototype,"_selected",void 0),Ia([Ce()],qi.prototype,"_built",void 0),Ia([Ce()],qi.prototype,"_width",void 0),Ia([Ce()],qi.prototype,"_collapsed",void 0),Ia([Ce()],qi.prototype,"_fullscreen",void 0),Ia([Ce()],qi.prototype,"_genTabs",void 0),Ia([Ce()],qi.prototype,"_pinFor",void 0),Ia([Ce()],qi.prototype,"_layout",void 0),qi=Ia([ve("tabdeck-card")],qi),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{qi as TabdeckCard};