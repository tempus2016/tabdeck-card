var e,t,a,o,i,r,n,s,d,c,l,p,b,h,u,m,_,g,v,y,f,k,w,x,$,z,A,S,T,C,j,E,O,N,P,L,M,I,D,R,B,V,H,q,K,U,F,W,Z,G,J,Y,X,Q,ee,te,ae,oe,ie,re,ne,se,de=Object.defineProperty,ce=(e,t,a)=>()=>{if(a)throw a[0];try{return e&&(t=e(e=0)),t}catch(S){throw a=[S],S}},le=(e,t)=>{let a={};for(var o in e)de(a,o,{get:e[o],enumerable:!0});return t||de(a,Symbol.toStringTag,{value:"Module"}),a},pe=ce(()=>{e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=/* @__PURE__ */new WeakMap,i=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const a=this.t;if(t&&void 0===e){const t=void 0!==a&&1===a.length;t&&(e=o.get(a)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(a,e))}return e}toString(){return this.cssText}},r=e=>new i("string"==typeof e?e:e+"",void 0,a),n=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,a,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[o+1],e[0]);return new i(o,e,a)},s=(a,o)=>{if(t)a.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=t.cssText,a.appendChild(o)}},d=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return r(t)})(e):e}),be=ce(()=>{pe(),({is:c,defineProperty:l,getOwnPropertyDescriptor:p,getOwnPropertyNames:b,getOwnPropertySymbols:h,getPrototypeOf:u}=Object),m=globalThis,_=m.trustedTypes,g=_?_.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},k=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:k},Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=/* @__PURE__ */new WeakMap,x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),o=this.getPropertyDescriptor(e,a,t);void 0!==o&&l(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){const{get:o,set:i}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);i?.call(this,t),this.requestUpdate(e,r,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...b(e),...h(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=/* @__PURE__ */new Map;for(const[t,a]of this.elementProperties){const e=this._$Eu(t,a);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=/* @__PURE__ */new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=/* @__PURE__ */new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(void 0!==o&&!0===a.reflect){const i=(void 0!==a.converter?.toAttribute?a.converter:f).toAttribute(t,a.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const a=this.constructor,o=a._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=a.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=o;const r=i.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,a,o=!1,i){if(void 0!==e){const r=this.constructor;if(!1===o&&(i=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??k)(i,t)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:i},r){a&&!(this._$Ej??=/* @__PURE__ */new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=/* @__PURE__ */new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,a,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}},x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=/* @__PURE__ */new Map,x[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2")});function he(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}function ue(e,t,a=e,o){if(t===W)return t;let i=void 0!==o?a._$Co?.[o]:a._$Cl;const r=P(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,a,o)),void 0!==o?(a._$Co??=[])[o]=i:a._$Cl=i),void 0!==i&&(t=ue(e,i._$AS(e,t.values),i,o)),t}var me,_e,ge,ve,ye,fe,ke=ce(()=>{$=globalThis,z=e=>e,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E=`<${j="?"+C}>`,O=document,N=()=>O.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,M=e=>L(e)||"function"==typeof e?.[Symbol.iterator],I="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,B=/>/g,V=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,q=/"/g,K=/^(?:script|style|textarea|title)$/i,U=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),F=U(1),U(2),U(3),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),G=/* @__PURE__ */new WeakMap,J=O.createTreeWalker(O,129),Y=(e,t)=>{const a=e.length-1,o=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=D;for(let s=0;s<a;s++){const t=e[s];let a,d,c=-1,l=0;for(;l<t.length&&(n.lastIndex=l,d=n.exec(t),null!==d);)l=n.lastIndex,n===D?"!--"===d[1]?n=R:void 0!==d[1]?n=B:void 0!==d[2]?(K.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=V):void 0!==d[3]&&(n=V):n===V?">"===d[0]?(n=i??D,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?V:'"'===d[3]?q:H):n===q||n===H?n=V:n===R||n===B?n=D:(n=V,i=void 0);const p=n===V&&e[s+1].startsWith("/>")?" ":"";r+=n===D?t+E:c>=0?(o.push(a),t.slice(0,c)+T+t.slice(c)+C+p):t+C+(-2===c?s:p)}return[he(e,r+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]},X=class e{constructor({strings:t,_$litType$:a},o){let i;this.parts=[];let r=0,n=0;const s=t.length-1,d=this.parts,[c,l]=Y(t,a);if(this.el=e.createElement(c,o),J.currentNode=this.el.content,2===a||3===a){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=J.nextNode())&&d.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(T)){const t=l[n++],a=i.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);d.push({type:1,index:r,name:o[2],strings:a,ctor:"."===o[1]?ae:"?"===o[1]?oe:"@"===o[1]?ie:te}),i.removeAttribute(e)}else e.startsWith(C)&&(d.push({type:6,index:r}),i.removeAttribute(e));if(K.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let a=0;a<t;a++)i.append(e[a],N()),J.nextNode(),d.push({type:2,index:++r});i.append(e[t],N())}}}else if(8===i.nodeType)if(i.data===j)d.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)d.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const a=O.createElement("template");return a.innerHTML=e,a}},Q=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??O).importNode(t,!0);J.currentNode=o;let i=J.nextNode(),r=0,n=0,s=a[0];for(;void 0!==s;){if(r===s.index){let t;2===s.type?t=new ee(i,i.nextSibling,this,e):1===s.type?t=new s.ctor(i,s.name,s.strings,this,e):6===s.type&&(t=new re(i,this,e)),this._$AV.push(t),s=a[++n]}r!==s?.index&&(i=J.nextNode(),r++)}return J.currentNode=O,o}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ue(this,e,t),P(e)?e===Z||null==e||""===e?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):M(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Z&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,o="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=X.createElement(he(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let o,i=0;for(const r of t)i===a.length?a.push(o=new e(this.O(N()),this.O(N()),this,this.options)):o=a[i],o._$AI(r),i++;i<a.length&&(this._$AR(o&&o._$AB.nextSibling,i),a.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=z(e).nextSibling;z(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}},te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,i){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(/* @__PURE__ */new String),this.strings=a):this._$AH=Z}_$AI(e,t=this,a,o){const i=this.strings;let r=!1;if(void 0===i)e=ue(this,e,t,0),r=!P(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{const o=e;let n,s;for(e=i[0],n=0;n<i.length-1;n++)s=ue(this,o[a+n],t,n),s===W&&(s=this._$AH[n]),r||=!P(s)||s!==this._$AH[n],s===Z?e=Z:e!==Z&&(e+=(s??"")+i[n+1]),this._$AH[n]=s}r&&!o&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ae=class extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}},oe=class extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Z)}},ie=class extends te{constructor(e,t,a,o,i){super(e,t,a,o,i),this.type=5}_$AI(e,t=this){if((e=ue(this,e,t,0)??Z)===W)return;const a=this._$AH,o=e===Z&&a!==Z||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==Z&&(a===Z||o);o&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},re=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){ue(this,e)}},ne=$.litHtmlPolyfillSupport,ne?.(X,ee),($.litHtmlVersions??=[]).push("3.3.3"),se=(e,t,a)=>{const o=a?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=a?.renderBefore??null;o._$litPart$=i=new ee(t.insertBefore(N(),e),e,void 0,a??{})}return i._$AI(e),i}}),we=ce(()=>{be(),be(),ke(),ke(),me=globalThis,_e=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}},_e._$litElement$=!0,_e.finalized=!0,me.litElementHydrateSupport?.({LitElement:_e}),ge=me.litElementPolyfillSupport,ge?.({LitElement:_e}),(me.litElementVersions??=[]).push("4.2.2")}),xe=ce(()=>{}),$e=ce(()=>{be(),ke(),we(),xe()}),ze=ce(()=>{ve=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)}});function Ae(e){return(t,a)=>"object"==typeof a?fe(e,t,a):((e,t,a)=>{const o=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),o?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}var Se=ce(()=>{be(),ye={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:k},fe=(e=ye,t,a)=>{const{kind:o,metadata:i}=a;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=/* @__PURE__ */new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(a.name,e),"accessor"===o){const{name:o}=a;return{set(a){const i=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,i,e,!0,a)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=a;return function(a){const i=this[o];t.call(this,a),this.requestUpdate(o,i,e,!0,a)}}throw Error("Unsupported decorator location: "+o)}});function Te(e){return Ae({...e,state:!0,attribute:!1})}var Ce,je,Ee,Oe,Ne,Pe,Le,Me,Ie,De,Re=ce(()=>{Se()}),Be=ce(()=>{}),Ve=ce(()=>{}),He=ce(()=>{}),qe=ce(()=>{}),Ke=ce(()=>{}),Ue=ce(()=>{}),Fe=ce(()=>{ze(),Se(),Re(),Be(),Ve(),He(),qe(),Ke(),Ue()});var We=ce(()=>{!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ce||(Ce={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(je||(je={})),Ee=["closed","locked","off"],Oe=(e,t,a,o)=>{o=o||{},a=null==a?{}:a;const i=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return i.detail=a,e.dispatchEvent(i),i},Ne=e=>{Oe(window,"haptic",e)},Pe=(e,t,a=!1)=>{a?history.replaceState(null,"",t):history.pushState(null,"",t),Oe(window,"location-changed",{replace:a})},Le=(e,t,a=!0)=>{const o=function(e){return e.substr(0,e.indexOf("."))}(t),i="group"===o?"homeassistant":o;let r;switch(o){case"lock":r=a?"unlock":"lock";break;case"cover":r=a?"open_cover":"close_cover";break;default:r=a?"turn_on":"turn_off"}return e.callService(i,r,{entity_id:t})},Me=(e,t)=>{const a=Ee.includes(e.states[t].state);return Le(e,t,a)},Ie=(e,t,a,o)=>{if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(e=>e.user===t.user.id)||(Ne("warning"),confirm(o.confirmation.text||`Are you sure you want to ${o.action}?`)))switch(o.action){case"more-info":(a.entity||a.camera_image)&&Oe(e,"hass-more-info",{entityId:a.entity?a.entity:a.camera_image});break;case"navigate":o.navigation_path&&Pe(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":a.entity&&(Me(t,a.entity),Ne("success"));break;case"call-service":{if(!o.service)return void Ne("failure");const[e,a]=o.service.split(".",2);t.callService(e,a,o.service_data,o.target),Ne("success");break}case"fire-dom-event":Oe(e,"ll-custom",o)}},De=(e,t,a,o)=>{let i;"double_tap"===o&&a.double_tap_action?i=a.double_tap_action:"hold"===o&&a.hold_action?i=a.hold_action:"tap"===o&&a.tap_action&&(i=a.tap_action),Ie(e,t,a,i)}});function Ze(e){if(!e||"object"!=typeof e)return;const t={},a=Number(e.precision);void 0!==e.precision&&Number.isInteger(a)&&a>=0&&a<=6&&(t.precision=a);const o=Number(e.max);return void 0!==e.max&&Number.isFinite(o)&&(t.max=o),"string"==typeof e.unit&&(t.unit=e.unit),t}function Ge(e,t){if(void 0===e||!t||!function(e){return""!==e.trim()&&Number.isFinite(Number(e))}(e))return e;const a=Number(e);let o;return o=void 0!==t.max&&a>t.max?`${t.max}+`:void 0!==t.precision?a.toFixed(t.precision):e.trim(),t.unit?o+t.unit:o}var Je,Ye,Xe,Qe,et=ce(()=>{});function tt(e){return Je.includes(e)}function at(e){const t=Xe[e];return{...Ye,...t,styles:{...t.styles??{}}}}var ot,it,rt,nt=ce(()=>{Je=["default","ios","material","glass","minimal","rail"],Ye={position:"top",style:"underline",align:"start",tab_display:"both",badge_display:"text",indicator_size:3,indicator_radius:void 0,elevation:!1,sticky:!1,bar_background:void 0,styles:{}},Xe={default:{},ios:{style:"segmented",align:"justify",indicator_radius:8,bar_background:"var(--secondary-background-color, #efefef)",styles:{"--tabdeck-tab-height":"36px"}},material:{style:"underline",align:"justify",elevation:!0},glass:{style:"pill",sticky:!0,bar_background:"color-mix(in srgb, var(--card-background-color, #fff) 60%, transparent)",styles:{"--tabdeck-bar-backdrop":"blur(12px)"}},minimal:{style:"text",tab_display:"label",badge_display:"dot"},rail:{position:"left",style:"rail",tab_display:"icon"}},Qe=new Set(Object.values(Xe).flatMap(e=>Object.keys(e.styles??{})))});function st(e){const t=(e.domains??[]).map(String).filter(e=>rt.test(e)),a=(e.exclude??[]).map(String).filter(e=>rt.test(e)),o="areas"===e.source,i=o?"areas()":"labels()",r=o?"area_name":"label_name",n=o?"area_entities":"label_entities",s=o?"mdi:texture-box":"mdi:label-outline",d=t.length?` | select('match', '^(${t.join("|")})\\\\.')`:"";return["{%- set ns = namespace(out=[]) -%}",`{%- for id in ${i} if id not in ${c=a,"["+c.map(e=>`'${e}'`).join(", ")+"]"} -%}`,`{%- set ents = ${n}(id)${d} | list -%}`,"{%- if ents | count > 0 -%}",`{%- set ns.out = ns.out + [{'id': id, 'name': ${r}(id), 'icon': '${s}', 'entities': ents}] -%}`,"{%- endif -%}","{%- endfor -%}","{{ ns.out | tojson }}"].join("\n");var c}var dt,ct,lt,pt,bt,ht,ut,mt,_t=ce(()=>{ot=["areas","labels"],it={name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"entities",entities:"{{ item.entities }}"}},rt=/^[a-z0-9_]+$/});function gt(e,t,a){return t.includes(e)?e:a}function vt(e,t,a,o){const i=Number(e);return Number.isFinite(i)?Math.min(a,Math.max(t,i)):o}function yt(e){if(e)return"string"==typeof e?{entity:e}:"object"==typeof e&&"string"==typeof e.entity?void 0===e.state?{entity:e.entity}:{entity:e.entity,state:String(e.state)}:void 0}function ft(e){return e&&"object"==typeof e&&e.action&&"none"!==e.action?e:void 0}function kt(e){const t=e?.attributes??{};let a,o=e?.card??{};if(Array.isArray(e?.children)&&e.children.length>0){const t="menu"===e.children_display?"menu":"row",i=e.children_options&&"object"==typeof e.children_options?e.children_options:{};o={type:"custom:tabdeck-card",...dt,...i,hide_bar:"menu"===t,tabs:e.children},a={display:t,items:e.children.map(e=>({name:e?.name??e?.attributes?.label,icon:e?.icon}))}}else if(Array.isArray(e?.cards)&&e.cards.length>0){const t=Number(e?.columns);o=Number.isFinite(t)&&t>1?{type:"grid",columns:t,square:!1,cards:e.cards}:{type:"vertical-stack",cards:e.cards}}return{name:e?.name??t.label??void 0,subtitle:e?.subtitle??void 0,icon:e?.icon??t.icon??void 0,accent:e?.accent??void 0,color:e?.color??void 0,badge:e?.badge??void 0,badge_color:e?.badge_color??void 0,badge_format:Ze(e?.badge_format),disabled:!!e?.disabled||void 0,fab:!!e?.fab||void 0,card_size:"number"==typeof e?.card_size?e.card_size:void 0,hold_action:e?.hold_action??void 0,badge_action:e?.badge_action??void 0,tap_action:e?.tap_action&&"object"==typeof e.tap_action&&"none"!==e.tap_action.action?e.tap_action:void 0,enter_action:ft(e?.enter_action),leave_action:ft(e?.leave_action),auto_select:yt(e?.auto_select),default_if:e?.default_if??void 0,visibility:e?.visibility??void 0,alert:Array.isArray(e?.alert)&&e.alert.length>0?e.alert:void 0,styles:e?.styles&&"object"==typeof e.styles&&!Array.isArray(e.styles)?e.styles:void 0,group:a,children:a?e.children:void 0,children_display:a?a.display:void 0,children_options:a&&e.children_options&&"object"==typeof e.children_options?e.children_options:void 0,card:o}}function wt(e){return!!e?.tap_action}function xt(e){const t="object"==typeof e&&null!==e?e:{interval:e},a=Number(t.interval);if(Number.isFinite(a)&&!(a<=0))return{interval:Math.max(2,a),resume_after:vt(t.resume_after,0,86400,60)}}function $t(e){const t="object"==typeof e&&null!==e?e:{min_width:e},a=Number(t.min_width);if(Number.isFinite(a)&&!(a<=0))return{min_width:a,columns:Math.round(vt(t.columns,2,4,2))}}function zt(e){e=function(e){if(!e||!tt(e.preset))return e;const t=at(e.preset),a={...t};for(const[o,i]of Object.entries(e))void 0!==i&&(a[o]=i);return a.styles={...t.styles,...e.styles??{}},a}(e);const t=Array.isArray(e?.tabs)?e.tabs:[],a=function(e){if(e&&"object"==typeof e){if(ot.includes(e.source)){const t=Array.isArray(e.domains)?e.domains.map(String):void 0,a=Array.isArray(e.exclude)?e.exclude.map(String):void 0;return{source:e.source,domains:t,exclude:a,template:st({source:e.source,domains:t,exclude:a}),tab_template:e.tab_template&&"object"==typeof e.tab_template?e.tab_template:it}}if("string"==typeof e.template&&""!==e.template.trim())return{template:e.template,tab_template:e.tab_template&&"object"==typeof e.tab_template?e.tab_template:void 0}}}(e?.auto_tabs);if(0===t.length&&!a)throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");const o=e?.default_tab??e?.options?.defaultTabIndex??0;return{type:e?.type??"custom:tabdeck-card",default_tab:o,position:gt(e?.position,ct,"top"),style:gt(e?.style,lt,"underline"),tab_display:gt(e?.tab_display,bt,"both"),align:gt(e?.align,ht,"start"),badge_display:gt(e?.badge_display,ut,"text"),hide_inactive_badge:Boolean(e?.hide_inactive_badge),badge_format:Ze(e?.badge_format),transition:gt(e?.transition,mt,"none"),indicator_size:vt(e?.indicator_size,1,16,3),indicator_radius:void 0===e?.indicator_radius?void 0:vt(e?.indicator_radius,0,999,0),scrollable:void 0===e?.scrollable?"auto":e.scrollable,remember:gt(e?.remember,pt,"none"),remember_entity:e?.remember_entity??void 0,storage_key:e?.storage_key??void 0,lazy:Boolean(e?.lazy),unmount_hidden:Boolean(e?.unmount_hidden),swipe_wrap:Boolean(e?.swipe_wrap),swipe_mouse:Boolean(e?.swipe_mouse),animated:void 0===e?.animated||Boolean(e.animated),accent_indicator:void 0===e?.accent_indicator||Boolean(e.accent_indicator),header:Boolean(e?.header),aria_label:e?.aria_label??void 0,sticky:Boolean(e?.sticky),elevation:Boolean(e?.elevation),scroll_buttons:Boolean(e?.scroll_buttons),overflow_menu:Boolean(e?.overflow_menu),bar_background:e?.bar_background??void 0,swipe:Boolean(e?.swipe),styles:e?.styles??{},tabs:t.map(kt),auto_tabs:a,auto_rotate:xt(e?.auto_rotate),scroll_spy:Boolean(e?.scroll_spy),split:$t(e?.split),tab_display_narrow:bt.includes(e?.tab_display_narrow)?e.tab_display_narrow:void 0,narrow_width:vt(e?.narrow_width,100,4e3,450),preset:tt(e?.preset)?e.preset:void 0,collapsible:Boolean(e?.collapsible),start_collapsed:Boolean(e?.collapsible&&e?.start_collapsed),idle_return:Number(e?.idle_return)>0?Math.max(5,Number(e.idle_return)):void 0,dock:Boolean(e?.dock),content_arrows:Boolean(e?.content_arrows),hide_bar:Boolean(e?.hide_bar),search:Boolean(e?.search),hotkeys:Boolean(e?.hotkeys),history:Boolean(e?.history),edit_mode_reveal:void 0===e?.edit_mode_reveal||Boolean(e.edit_mode_reveal)}}function At(e){const t=e.default_tab;if("string"==typeof t){const a=e.tabs.findIndex(e=>e.name===t);return a>=0?a:0}return"number"==typeof t&&t>=0&&t<e.tabs.length?t:0}var St=ce(()=>{et(),nt(),_t(),dt={style:"text",align:"start",styles:{"--tabdeck-tab-height":"36px","--tabdeck-tab-font-size":"13px"}},ct=["top","bottom","left","right"],lt=["underline","pill","segmented","boxed","text","rail"],pt=["none","browser","url","entity"],bt=["both","icon","label","active","dots"],ht=["start","center","end","justify"],ut=["text","dot"],mt=["none","fade","slide"]});$e(),Fe(),We(),St();var Tt,Ct=/\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g,jt=/^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;function Et(e,t){if("item"===t)return e;const a=t.split(".");let o=e;for(let i=1;i<a.length;i++)o=null==o?void 0:o[a[i]];return o}function Ot(e,t,a){if("string"==typeof e){const o=e.match(jt);if(o){const e=o[1];if("index"===e)return a;const i=Et(t,e);return void 0===i?"":i}return e.replace(Ct,(e,o)=>String("index"===o?a:Et(t,o)??""))}if(Array.isArray(e))return e.map(e=>Ot(e,t,a));if(e&&"object"==typeof e){const o={};for(const i of Object.keys(e))o[i]=Ot(e[i],t,a);return o}return e}function Nt(e,t){if(!Array.isArray(e))return[];const a=t.tab_template,o=[];return e.forEach((e,t)=>{a?o.push(Ot(a,e,t)):e&&"object"==typeof e&&!Array.isArray(e)&&o.push(e)}),o}function Pt(e){const t=/^(\d{1,2}):(\d{2})/.exec(String(e));return t?60*Number(t[1])+Number(t[2]):null}function Lt(e){return Array.isArray(e?.conditions)?e.conditions:[]}function Mt(e,t,a){switch(e?.condition){case"state":return function(e,t){const a=t.states[e.entity];if(!a)return!1;const o=a.state;return Array.isArray(e.state)?e.state.includes(o):void 0!==e.state?o===e.state:void 0!==e.state_not&&(Array.isArray(e.state_not)?!e.state_not.includes(o):o!==e.state_not)}(e,t);case"numeric_state":return function(e,t){const a=t.states[e.entity];if(!a)return!1;const o=Number(a.state);return!Number.isNaN(o)&&(void 0===e.above||o>Number(e.above))&&(void 0===e.below||o<Number(e.below))&&(void 0!==e.above||void 0!==e.below)}(e,t);case"screen":return function(e){return!(!e.media_query||"function"!=typeof matchMedia)&&matchMedia(e.media_query).matches}(e);case"time":return function(e,t=/* @__PURE__ */new Date){const a=void 0!==e.after,o=void 0!==e.before,i=Array.isArray(e.weekday)&&e.weekday.length>0;if(!a&&!o&&!i)return!1;const r=60*t.getHours()+t.getMinutes();let n=!0;if(a&&o){const t=Pt(e.after),a=Pt(e.before);if(null===t||null===a)return!1;n=t<=a?r>=t&&r<a:r>=t||r<a}else if(a){const t=Pt(e.after);if(null===t)return!1;n=r>=t}else if(o){const t=Pt(e.before);if(null===t)return!1;n=r<t}if(n&&i){const a=Tt[t.getDay()];n=e.weekday.map(e=>String(e).toLowerCase().slice(0,3)).includes(a)}return n}(e);case"user":return function(e,t){const a=t?.user?.id;return!(!a||!Array.isArray(e.users))&&e.users.includes(a)}(e,t);case"template":return function(e,t){return!(!t||!e.value_template)&&!0===t(e.value_template)}(e,a);case"and":return Lt(e).every(e=>Mt(e,t,a));case"or":return Lt(e).some(e=>Mt(e,t,a));case"not":return!Lt(e).some(e=>Mt(e,t,a));default:return!1}}function It(e,t,a){return!e||0===e.length||(!t||e.every(e=>Mt(e,t,a)))}var Dt=ce(()=>{Tt=["sun","mon","tue","wed","thu","fri","sat"]});function Rt(e){return"tabdeck-card:"+e}function Bt(e,t,a){return e>=0&&e<t?e:a}function Vt(e){return e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Ht(e){const{mode:t,cardKey:a,defaultIndex:o,tabCount:i}=e;if("entity"===t){const t=Number(e.entityValue);return void 0!==e.entityValue&&Number.isFinite(t)?Bt(Math.trunc(t),i,o):Bt(o,i,0)}if("url"===t){const t=function(e,t){const a=/(?:^|[#&])tab=([^&]+)/.exec(e||"");if(!a)return null;const o=decodeURIComponent(a[1]),i=t.indexOf(o);if(i>=0)return i;const r=Vt(o),n=r?t.findIndex(e=>Vt(e)===r):-1;if(n>=0)return n;const s=Number(o);return Number.isInteger(s)&&s>=0?s:null}(e.hash??"",e.tabNames??[]);if(null!==t)return Bt(t,i,o)}if("browser"===t){const t=(e.storage??globalThis.localStorage)?.getItem(Rt(a));if(null!=t)return Bt(Number(t),i,o)}return Bt(o,i,0)}Dt();var qt,Kt=class extends EventTarget{constructor(e){super(),this._configs=[],this._elements=[],this._create=e}async build(e){this._configs=e.slice(),this._elements=e.map((e,t)=>this._make(e,t))}_make(e,t){if(!e)return;const a=this._create(e);return this._hass&&(a.hass=this._hass),a.addEventListener("ll-rebuild",e=>{e.stopPropagation(),this._rebuild(t)}),a}get(e){return this._elements[e]}all(){return this._elements}setHass(e){this._hass=e;for(const t of this._elements)t&&(t.hass=e)}notifyVisible(e){const t=this._elements[e];t&&t.dispatchEvent(new Event("resize"))}async _rebuild(e){const t=this._make(this._configs[e],e);t&&(this._hass&&(t.hass=this._hass),this._elements[e]=t,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:e}})))}};function Ut(e){return(t,a,o)=>{const i=e()?.connection;if(!i?.subscribeMessage)return o(),()=>{};let r,n=!1;return Promise.resolve(i.subscribeMessage(e=>{e&&void 0!==e.error?o():a(e?.result)},{type:"render_template",template:t,report_errors:!0})).then(e=>{r=e,n&&e?.()}).catch(()=>o()),()=>{n=!0,r?.()}}}function Ft(e){return!!e&&(e.includes("{{")||e.includes("{%"))}var Wt,Zt,Gt,Jt,Yt,Xt,Qt,ea,ta,aa=ce(()=>{qt=class extends EventTarget{constructor(e){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=e}track(e){const t=new Set(e.filter(e=>!!e));for(const[a,o]of this._entries)t.has(a)||(o.unsub(),this._entries.delete(a));for(const a of t){if(this._entries.has(a))continue;const e={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(a,e),e.unsub=this._subscribe(a,t=>{e.result=t,e.hasResult=!0,e.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:a}}))},()=>{e.error=!0,e.hasResult=!1,e.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:a}}))})}}result(e){const t=this._entries.get(e);if(t&&!t.error&&t.hasResult)return t.result}boolean(e){const t=this._entries.get(e);return!(!t||t.error||!t.hasResult)&&("boolean"==typeof(a=t.result)?a:"number"==typeof a?0!==a:"string"==typeof a&&["1","true","yes","on","enable"].includes(a.trim().toLowerCase()));var a}destroy(){for(const e of this._entries.values())e.unsub();this._entries.clear()}}}),oa=ce(()=>{Wt={"editor.tab.name":"Tab name","editor.tab.subtitle":"Subtitle","editor.tab.icon":"Icon","editor.tab.accent":"Accent colour","editor.tab.color":"Text/icon colour","editor.tab.badge":"Badge (entity id or template)","editor.tab.badge_color":"Badge colour","editor.tab.disabled":"Disable tab (greyed, not selectable)","editor.tab.card_size":"Card size hint (rows)","editor.tab.hold_action":"Long-press action","editor.tab.badge_action":"Badge tap action","editor.tab.tap_action":"Tap action (replaces opening the tab, e.g. navigate)","editor.tab.enter_action":"Action when this tab is opened","editor.tab.leave_action":"Action when leaving this tab","editor.global.preset":"Style preset (applies a bundle of the options below)","editor.global.position":"Position","editor.global.style":"Style","editor.global.tab_display":"Tab display","editor.global.align":"Tab alignment","editor.global.badge_display":"Badge display","editor.global.hide_inactive_badge":"Hide inactive badges (0/off)","editor.global.transition":"Panel transition","editor.global.indicator_size":"Indicator thickness (px)","editor.global.indicator_radius":"Indicator corner radius (px)","editor.global.remember":"Remember selected tab","editor.global.remember_entity":"Remember entity (input_number/input_text)","editor.global.storage_key":"Storage key (browser mode)","editor.global.default_tab":"Default tab","editor.global.scrollable":"Scrollable","editor.global.lazy":"Lazy-mount inactive tabs","editor.global.unmount_hidden":"Unmount hidden tabs (save memory)","editor.global.swipe_wrap":"Swipe wraps around ends","editor.global.animated":"Animate indicator","editor.global.accent_indicator":"Colour indicator by tab accent","editor.global.header":"Show header (active tab title above content)","editor.global.aria_label":"Accessible name for the tab bar","editor.global.sticky":"Sticky tab bar","editor.global.elevation":"Raise bar with shadow","editor.global.scroll_buttons":"Scroll buttons when bar overflows","editor.global.overflow_menu":"Overflow ⋯ menu when bar overflows","editor.global.bar_background":"Tab bar background colour","editor.global.swipe":"Swipe to change tabs (mobile)","editor.global.swipe_mouse":"Mouse drag to change tabs (desktop)","editor.global.tab_display_narrow":"Tab display on narrow cards","editor.global.narrow_width":"Narrow below (px)","editor.global.split":"Side-by-side split at or above width (px, 0 = off)","editor.global.collapsible":"Collapsible (tap the active tab to fold content)","editor.global.start_collapsed":"Start collapsed","editor.global.scroll_spy":"Scroll-spy: stack tabs as sections","editor.global.auto_rotate":"Auto-rotate tabs every (seconds, 0 = off)","editor.global.idle_return":"Return to default tab after idle (seconds, 0 = off)","editor.global.edit_mode_reveal":"Show hidden tabs while editing the dashboard","editor.cond.visibility.label":"Visibility","editor.cond.visibility.hint":"show the tab only when…","editor.cond.alert.label":"Alert","editor.cond.alert.hint":"pulse the tab when…","editor.cond.default_if.label":"Default when","editor.cond.default_if.hint":"start on this tab when…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} copy","editor.copied":'Copied tab "{name}" — paste it into Import tab.',"editor.clipboard_error":"Couldn't access the clipboard.","editor.import_error":"That doesn't look like a tab (needs a card, cards or tap_action).","editor.imported_one":"Imported 1 tab.","editor.imported_many":"Imported {count} tabs.","editor.import_hint":"Paste a tab (or a list of tabs) copied with Copy tab, or any tab YAML.","editor.add":"Add","editor.cancel":"Cancel","editor.warn_duplicates":'Duplicate tab names ({names}). "Remember: url" and default-tab-by-name may be ambiguous.',"editor.back":"Back","editor.change_type":"Change card type","editor.card_type":"Card type","editor.card_type_hint":"Choose a card type to configure it. Enter a custom type (e.g. custom:my-card) for cards not in the list.","editor.card_json":"Card (JSON)","editor.invalid_json":"Invalid JSON — not saved.","editor.expand_all":"Expand all","editor.collapse_all":"Collapse all","editor.drag":"Drag to reorder","editor.move_up":"Move up","editor.move_down":"Move down","editor.copy_tab":"Copy tab","editor.duplicate_tab":"Duplicate tab","editor.delete_tab":"Delete tab","editor.add_tab":"Add tab","editor.import_tab":"Import tab","editor.edit_card":"Edit card","editor.preview":"Preview","editor.opt.position.top":"Top","editor.opt.position.bottom":"Bottom","editor.opt.position.left":"Left","editor.opt.position.right":"Right","editor.opt.tab_display.both":"Icon and label","editor.opt.tab_display.icon":"Icon only","editor.opt.tab_display.label":"Label only","editor.opt.tab_display.active":"Icons; selected tab expanded","editor.opt.tab_display.":"(same as tab display)","editor.opt.align.start":"Start","editor.opt.align.center":"Centre","editor.opt.align.end":"End","editor.opt.align.justify":"Fill width","editor.opt.badge_display.text":"Text","editor.opt.badge_display.dot":"Dot","editor.opt.transition.none":"None","editor.opt.transition.fade":"Fade","editor.opt.transition.slide":"Slide","editor.opt.remember.none":"Don't remember","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"In the URL (#tab=)","editor.opt.remember.entity":"In a helper entity (all devices)","editor.opt.scrollable.auto":"Automatic","editor.opt.scrollable.true":"Always","editor.opt.scrollable.false":"Never","check.now_met":"Met right now","check.now_unmet":"Not met right now","check.chip_hidden":"Hidden now","check.chip_alert":"Alerting","check.chip_hidden_title":"This tab's visibility conditions aren't met, so it's hidden on the dashboard.","check.state_is":"{entity} is {values}","check.state_is_not":"{entity} is not {values}","check.or":" or ","check.now":"now: {value}","check.missing":"entity not found","check.numeric":"{entity} {range}","check.above":"above {value}","check.below":"below {value}","check.and":" and ","check.screen":"screen matches {query}","check.time":"time {range}","check.time_after":"after {value}","check.time_before":"before {value}","check.time_days":"on {days}","check.user":"current user is one of {count} selected","check.template":"template renders true","check.template_pending":"template (waiting for Home Assistant)","check.group_and":"all of:","check.group_or":"any of:","check.group_not":"none of:","check.unknown":"unknown condition type","card.tabs":"Tabs","card.scroll_left":"Scroll left","card.scroll_right":"Scroll right","card.all_tabs":"All tabs","card.badge":"badge: {value}","card.ghost":"Hidden: its visibility conditions aren't met (shown while editing)","starter.button":"Start from a template","starter.hint":"Build a deck from your own entities. Replace swaps out the current tabs; Add keeps them.","starter.pick":"Template","starter.replace":"Replace tabs","starter.append":"Add tabs","starter.cancel":"Cancel","starter.none":'Nothing to build: no matching entities found for "{name}".',"starter.done":'Added the "{name}" template.',"starter.kind.rooms":"Rooms: a tab per area","starter.kind.lights":"Lights: a tab per area with lights","starter.kind.security":"Security: alarm, cameras, doors & locks","starter.kind.media":"Media: a tab per media player","starter.kind.climate":"Climate: a tab per thermostat","starter.kind.energy":"Energy: the energy dashboard cards","starter.kind.family":"Family: a tab per person, with a map","starter.tab.alarm":"Alarm","starter.tab.cameras":"Cameras","starter.tab.openings":"Doors & windows","starter.tab.locks":"Locks","starter.tab.energy_now":"Now","starter.tab.energy_usage":"Usage","starter.tab.energy_sources":"Sources","starter.tab.energy_devices":"Devices","convert.button":"Convert from another card","convert.hint":"Paste the YAML of a tabbed-card, swipe-card, state-switch, a vertical/horizontal stack or grid, Bubble Card pop-ups, a conditional card, a sections view or a whole dashboard.","convert.detected":"Detected {source}: {count} tabs.","convert.replace":"Replace tabs","convert.append":"Add tabs","convert.cancel":"Cancel","convert.done":"Converted {count} tabs from {source}.","convert.error.empty":"There's nothing to convert in that list.","convert.error.not_card":"That doesn't look like a card, a list of cards, a view or a dashboard.","convert.error.no_tabs":"Nothing to convert: no cards found.","convert.source.tabdeck":"a Tabdeck card","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card pop-ups","convert.source.dashboard":"a dashboard (one tab per view)","convert.source.view":"a view","convert.source.sections":"a sections view (one tab per section)","convert.source.stack":"a stack (one tab per card or heading)","convert.source.cards":"cards","convert.note.styles":"Only --mdc-theme-primary was carried over (as --tabdeck-accent); other tabbed-card styles have no Tabdeck equivalent.","convert.note.tab_styles":"Per-tab styles from tabbed-card were not carried over.","convert.note.autoplay":"Autoplay became auto_rotate (seconds).","convert.note.state_switch_mode":"This state-switch mode (user / media query / template) has no direct equivalent; the states became plain tabs. Add visibility conditions if needed.","convert.note.bubble":"Each pop-up became a tab; the pop-up's own button and styling are not used.","convert.note.dashboard":"Each view became a tab. Large dashboards can make a heavy card; consider lazy: true.","editor.global.dock":"Dock: pin the bar to the bottom of the screen (phone navigation)","editor.tab.fab":"Floating action button style","editor.global.content_arrows":"Previous / next arrows over the content","editor.opt.tab_display.dots":"Dots","card.prev_tab":"Previous tab","card.next_tab":"Next tab","editor.global.search":"Quick-switch search (🔍 button)","editor.global.hotkeys":"Keyboard shortcuts (1–9, [ ], /)","card.search":"Find a tab","card.search_placeholder":"Type to filter…","card.search_none":"No matching tabs","editor.global.history":"Back button returns to the previous tab"}}),ia=ce(()=>{Zt={"editor.tab.name":"Tab-Name","editor.tab.subtitle":"Untertitel","editor.tab.icon":"Symbol","editor.tab.accent":"Akzentfarbe","editor.tab.color":"Text-/Symbolfarbe","editor.tab.badge":"Badge (Entitäts-ID oder Template)","editor.tab.badge_color":"Badge-Farbe","editor.tab.disabled":"Tab deaktivieren (ausgegraut, nicht wählbar)","editor.tab.card_size":"Kartengröße (Zeilen)","editor.tab.hold_action":"Halten-Aktion","editor.tab.badge_action":"Tippen-Aktion für Badge","editor.tab.tap_action":"Tippen-Aktion (ersetzt das Öffnen des Tabs, z. B. navigate)","editor.tab.enter_action":"Aktion beim Öffnen dieses Tabs","editor.tab.leave_action":"Aktion beim Verlassen dieses Tabs","editor.global.preset":"Stilvorlage (setzt mehrere der folgenden Optionen)","editor.global.position":"Position","editor.global.style":"Stil","editor.global.tab_display":"Tab-Anzeige","editor.global.align":"Tab-Ausrichtung","editor.global.badge_display":"Badge-Anzeige","editor.global.hide_inactive_badge":"Inaktive Badges ausblenden (0/off)","editor.global.transition":"Übergang","editor.global.indicator_size":"Indikatorstärke (px)","editor.global.indicator_radius":"Indikator-Eckenradius (px)","editor.global.remember":"Ausgewählten Tab merken","editor.global.remember_entity":"Entität zum Merken (input_number/input_text)","editor.global.storage_key":"Speicherschlüssel (Browser-Modus)","editor.global.default_tab":"Standard-Tab","editor.global.scrollable":"Scrollbar","editor.global.lazy":"Inaktive Tabs erst bei Bedarf laden","editor.global.unmount_hidden":"Ausgeblendete Tabs entladen (spart Speicher)","editor.global.swipe_wrap":"Wischen springt vom Ende zum Anfang","editor.global.animated":"Indikator animieren","editor.global.accent_indicator":"Indikator in Akzentfarbe des Tabs","editor.global.header":"Kopfzeile anzeigen (Titel des aktiven Tabs über dem Inhalt)","editor.global.aria_label":"Barrierefreier Name der Tab-Leiste","editor.global.sticky":"Tab-Leiste fixieren","editor.global.elevation":"Leiste mit Schatten hervorheben","editor.global.scroll_buttons":"Scroll-Schaltflächen bei Überlauf","editor.global.overflow_menu":"Überlaufmenü ⋯ bei Überlauf","editor.global.bar_background":"Hintergrundfarbe der Tab-Leiste","editor.global.swipe":"Tabs per Wischen wechseln (Mobil)","editor.global.swipe_mouse":"Tabs per Mausziehen wechseln (Desktop)","editor.global.tab_display_narrow":"Tab-Anzeige bei schmalen Karten","editor.global.narrow_width":"Schmal unter (px)","editor.global.split":"Nebeneinander ab Breite (px, 0 = aus)","editor.global.collapsible":"Einklappbar (aktiven Tab antippen zum Einklappen)","editor.global.start_collapsed":"Eingeklappt starten","editor.global.scroll_spy":"Scroll-Spy: Tabs als Abschnitte untereinander","editor.global.auto_rotate":"Tabs automatisch wechseln alle (Sekunden, 0 = aus)","editor.global.idle_return":"Nach Inaktivität zum Standard-Tab (Sekunden, 0 = aus)","editor.global.edit_mode_reveal":"Ausgeblendete Tabs beim Bearbeiten des Dashboards anzeigen","editor.cond.visibility.label":"Sichtbarkeit","editor.cond.visibility.hint":"Tab nur anzeigen, wenn…","editor.cond.alert.label":"Hinweis","editor.cond.alert.hint":"Tab pulsieren lassen, wenn…","editor.cond.default_if.label":"Standard wenn","editor.cond.default_if.hint":"mit diesem Tab starten, wenn…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} Kopie","editor.copied":'Tab "{name}" kopiert – unter Tab importieren einfügen.',"editor.clipboard_error":"Kein Zugriff auf die Zwischenablage.","editor.import_error":"Das sieht nicht nach einem Tab aus (benötigt card, cards oder tap_action).","editor.imported_one":"1 Tab importiert.","editor.imported_many":"{count} Tabs importiert.","editor.import_hint":"Einen mit Tab kopieren kopierten Tab (oder eine Liste von Tabs) oder beliebiges Tab-YAML einfügen.","editor.add":"Hinzufügen","editor.cancel":"Abbrechen","editor.warn_duplicates":'Doppelte Tab-Namen ({names}). "Remember: url" und Standard-Tab per Name können mehrdeutig sein.',"editor.back":"Zurück","editor.change_type":"Kartentyp ändern","editor.card_type":"Kartentyp","editor.card_type_hint":"Kartentyp zum Konfigurieren auswählen. Für Karten, die nicht in der Liste stehen, einen eigenen Typ eingeben (z. B. custom:my-card).","editor.card_json":"Karte (JSON)","editor.invalid_json":"Ungültiges JSON – nicht gespeichert.","editor.expand_all":"Alle ausklappen","editor.collapse_all":"Alle einklappen","editor.drag":"Zum Sortieren ziehen","editor.move_up":"Nach oben","editor.move_down":"Nach unten","editor.copy_tab":"Tab kopieren","editor.duplicate_tab":"Tab duplizieren","editor.delete_tab":"Tab löschen","editor.add_tab":"Tab hinzufügen","editor.import_tab":"Tab importieren","editor.edit_card":"Karte bearbeiten","editor.preview":"Vorschau","editor.opt.position.top":"Oben","editor.opt.position.bottom":"Unten","editor.opt.position.left":"Links","editor.opt.position.right":"Rechts","editor.opt.tab_display.both":"Symbol und Beschriftung","editor.opt.tab_display.icon":"Nur Symbol","editor.opt.tab_display.label":"Nur Beschriftung","editor.opt.tab_display.active":"Symbole; ausgewählter Tab erweitert","editor.opt.tab_display.":"(wie Tab-Anzeige)","editor.opt.align.start":"Anfang","editor.opt.align.center":"Mitte","editor.opt.align.end":"Ende","editor.opt.align.justify":"Volle Breite","editor.opt.badge_display.text":"Text","editor.opt.badge_display.dot":"Punkt","editor.opt.transition.none":"Keiner","editor.opt.transition.fade":"Überblenden","editor.opt.transition.slide":"Schieben","editor.opt.remember.none":"Nicht merken","editor.opt.remember.browser":"Pro Browser","editor.opt.remember.url":"In der URL (#tab=)","editor.opt.remember.entity":"In einer Helfer-Entität (alle Geräte)","editor.opt.scrollable.auto":"Automatisch","editor.opt.scrollable.true":"Immer","editor.opt.scrollable.false":"Nie","check.now_met":"Aktuell erfüllt","check.now_unmet":"Aktuell nicht erfüllt","check.chip_hidden":"Gerade ausgeblendet","check.chip_alert":"Hinweis aktiv","check.chip_hidden_title":"Die Sichtbarkeitsbedingungen dieses Tabs sind nicht erfüllt, daher ist er im Dashboard ausgeblendet.","check.state_is":"{entity} ist {values}","check.state_is_not":"{entity} ist nicht {values}","check.or":" oder ","check.now":"aktuell: {value}","check.missing":"Entität nicht gefunden","check.numeric":"{entity} {range}","check.above":"über {value}","check.below":"unter {value}","check.and":" und ","check.screen":"Bildschirm entspricht {query}","check.time":"Zeit {range}","check.time_after":"nach {value}","check.time_before":"vor {value}","check.time_days":"am {days}","check.user":"aktueller Benutzer ist einer von {count} ausgewählten","check.template":"Template ergibt true","check.template_pending":"Template (warte auf Home Assistant)","check.group_and":"alle von:","check.group_or":"eine von:","check.group_not":"keine von:","check.unknown":"unbekannter Bedingungstyp","card.tabs":"Tabs","card.scroll_left":"Nach links scrollen","card.scroll_right":"Nach rechts scrollen","card.all_tabs":"Alle Tabs","card.badge":"Badge: {value}","card.ghost":"Ausgeblendet: Sichtbarkeitsbedingungen nicht erfüllt (beim Bearbeiten sichtbar)","starter.button":"Mit einer Vorlage starten","starter.hint":"Ein Deck aus den eigenen Entitäten erstellen. Ersetzen tauscht die aktuellen Tabs aus; Hinzufügen behält sie.","starter.pick":"Vorlage","starter.replace":"Tabs ersetzen","starter.append":"Tabs hinzufügen","starter.cancel":"Abbrechen","starter.none":'Nichts zu erstellen: keine passenden Entitäten für "{name}" gefunden.',"starter.done":'Vorlage "{name}" hinzugefügt.',"starter.kind.rooms":"Räume: ein Tab pro Bereich","starter.kind.lights":"Licht: ein Tab pro Bereich mit Lichtern","starter.kind.security":"Sicherheit: Alarm, Kameras, Türen & Schlösser","starter.kind.media":"Medien: ein Tab pro Media-Player","starter.kind.climate":"Klima: ein Tab pro Thermostat","starter.kind.energy":"Energie: die Karten des Energie-Dashboards","starter.kind.family":"Familie: ein Tab pro Person, mit Standortkarte","starter.tab.alarm":"Alarm","starter.tab.cameras":"Kameras","starter.tab.openings":"Türen & Fenster","starter.tab.locks":"Schlösser","starter.tab.energy_now":"Jetzt","starter.tab.energy_usage":"Verbrauch","starter.tab.energy_sources":"Quellen","starter.tab.energy_devices":"Geräte","convert.button":"Von anderer Karte konvertieren","convert.hint":"YAML einfügen von: tabbed-card, swipe-card, state-switch, vertikalem/horizontalem Stapel oder Raster, Bubble Card Pop-ups, bedingter Karte, Abschnittsansicht oder ganzem Dashboard.","convert.detected":"{source} erkannt: {count} Tabs.","convert.replace":"Tabs ersetzen","convert.append":"Tabs hinzufügen","convert.cancel":"Abbrechen","convert.done":"{count} Tabs aus {source} konvertiert.","convert.error.empty":"In dieser Liste gibt es nichts zu konvertieren.","convert.error.not_card":"Das sieht nicht nach einer Karte, Kartenliste, Ansicht oder einem Dashboard aus.","convert.error.no_tabs":"Nichts zu konvertieren: keine Karten gefunden.","convert.source.tabdeck":"eine Tabdeck-Karte","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card Pop-ups","convert.source.dashboard":"ein Dashboard (ein Tab pro Ansicht)","convert.source.view":"eine Ansicht","convert.source.sections":"eine Abschnittsansicht (ein Tab pro Abschnitt)","convert.source.stack":"ein Stapel (ein Tab pro Karte oder Überschrift)","convert.source.cards":"Karten","convert.note.styles":"Nur --mdc-theme-primary wurde übernommen (als --tabdeck-accent); andere tabbed-card-Stile haben in Tabdeck keine Entsprechung.","convert.note.tab_styles":"Tab-spezifische Stile aus tabbed-card wurden nicht übernommen.","convert.note.autoplay":"Autoplay wurde zu auto_rotate (Sekunden).","convert.note.state_switch_mode":"Dieser state-switch-Modus (Benutzer / Media Query / Template) hat keine direkte Entsprechung; die Zustände wurden zu normalen Tabs. Bei Bedarf Sichtbarkeitsbedingungen hinzufügen.","convert.note.bubble":"Jedes Pop-up wurde zu einem Tab; Schaltfläche und Styling des Pop-ups werden nicht verwendet.","convert.note.dashboard":"Jede Ansicht wurde zu einem Tab. Große Dashboards können eine schwere Karte ergeben; lazy: true erwägen.","editor.global.dock":"Dock: Leiste unten am Bildschirm fixieren (Handy-Navigation)","editor.tab.fab":"Als schwebende Aktionsschaltfläche","editor.global.content_arrows":"Zurück-/Weiter-Pfeile über dem Inhalt","editor.opt.tab_display.dots":"Punkte","card.prev_tab":"Vorheriger Tab","card.next_tab":"Nächster Tab","editor.global.search":"Schnellsuche (🔍-Schaltfläche)","editor.global.hotkeys":"Tastenkürzel (1–9, [ ], /)","card.search":"Tab suchen","card.search_placeholder":"Zum Filtern tippen…","card.search_none":"Keine passenden Tabs","editor.global.history":"Zurück-Taste kehrt zum vorherigen Tab zurück"}}),ra=ce(()=>{Gt={"editor.tab.name":"Nombre de la pestaña","editor.tab.subtitle":"Subtítulo","editor.tab.icon":"Icono","editor.tab.accent":"Color de acento","editor.tab.color":"Color de texto/icono","editor.tab.badge":"Distintivo (id de entidad o plantilla)","editor.tab.badge_color":"Color del distintivo","editor.tab.disabled":"Desactivar pestaña (atenuada, no seleccionable)","editor.tab.card_size":"Tamaño orientativo de la tarjeta (filas)","editor.tab.hold_action":"Acción al mantener pulsado","editor.tab.badge_action":"Acción al tocar el distintivo","editor.tab.tap_action":"Acción al tocar (en lugar de abrir la pestaña, p. ej. navegar)","editor.tab.enter_action":"Acción al abrir esta pestaña","editor.tab.leave_action":"Acción al salir de esta pestaña","editor.global.preset":"Estilo predefinido (aplica un conjunto de las opciones siguientes)","editor.global.position":"Posición","editor.global.style":"Estilo","editor.global.tab_display":"Visualización de pestañas","editor.global.align":"Alineación de pestañas","editor.global.badge_display":"Visualización de distintivos","editor.global.hide_inactive_badge":"Ocultar distintivos inactivos (0/off)","editor.global.transition":"Transición del contenido","editor.global.indicator_size":"Grosor del indicador (px)","editor.global.indicator_radius":"Radio de esquina del indicador (px)","editor.global.remember":"Recordar la pestaña seleccionada","editor.global.remember_entity":"Entidad para recordar (input_number/input_text)","editor.global.storage_key":"Clave de almacenamiento (modo navegador)","editor.global.default_tab":"Pestaña predeterminada","editor.global.scrollable":"Desplazable","editor.global.lazy":"Carga diferida de pestañas inactivas","editor.global.unmount_hidden":"Descargar pestañas ocultas (ahorra memoria)","editor.global.swipe_wrap":"Deslizar de forma circular","editor.global.animated":"Animar indicador","editor.global.accent_indicator":"Colorear indicador con el acento de la pestaña","editor.global.header":"Mostrar encabezado (título de la pestaña activa sobre el contenido)","editor.global.aria_label":"Nombre accesible de la barra de pestañas","editor.global.sticky":"Barra de pestañas fija","editor.global.elevation":"Elevar barra con sombra","editor.global.scroll_buttons":"Botones de desplazamiento si la barra no cabe","editor.global.overflow_menu":"Menú ⋯ si la barra no cabe","editor.global.bar_background":"Color de fondo de la barra de pestañas","editor.global.swipe":"Deslizar para cambiar de pestaña (móvil)","editor.global.swipe_mouse":"Arrastrar con el ratón para cambiar de pestaña (escritorio)","editor.global.tab_display_narrow":"Visualización de pestañas en tarjetas estrechas","editor.global.narrow_width":"Estrecha por debajo de (px)","editor.global.split":"Vista dividida a partir de este ancho (px, 0 = desactivado)","editor.global.collapsible":"Plegable (toca la pestaña activa para plegar el contenido)","editor.global.start_collapsed":"Iniciar plegada","editor.global.scroll_spy":"Scroll-spy: apilar pestañas como secciones","editor.global.auto_rotate":"Rotar pestañas automáticamente cada (segundos, 0 = desactivado)","editor.global.idle_return":"Volver a la pestaña predeterminada tras inactividad (segundos, 0 = desactivado)","editor.global.edit_mode_reveal":"Mostrar pestañas ocultas al editar el panel de control","editor.cond.visibility.label":"Visibilidad","editor.cond.visibility.hint":"mostrar la pestaña solo cuando…","editor.cond.alert.label":"Alerta","editor.cond.alert.hint":"hacer parpadear la pestaña cuando…","editor.cond.default_if.label":"Predeterminada cuando","editor.cond.default_if.hint":"empezar en esta pestaña cuando…","editor.tab_n":"Pestaña {n}","editor.copy_name":"Copia de {name}","editor.copied":'Pestaña "{name}" copiada: pégala en Importar pestaña.',"editor.clipboard_error":"No se pudo acceder al portapapeles.","editor.import_error":"Eso no parece una pestaña (necesita card, cards o tap_action).","editor.imported_one":"1 pestaña importada.","editor.imported_many":"{count} pestañas importadas.","editor.import_hint":"Pega una pestaña (o una lista de pestañas) copiada con Copiar pestaña, o cualquier YAML de pestaña.","editor.add":"Añadir","editor.cancel":"Cancelar","editor.warn_duplicates":'Nombres de pestaña duplicados ({names}). "Remember: url" y la pestaña predeterminada por nombre pueden ser ambiguos.',"editor.back":"Atrás","editor.change_type":"Cambiar tipo de tarjeta","editor.card_type":"Tipo de tarjeta","editor.card_type_hint":"Elige un tipo de tarjeta para configurarla. Introduce un tipo personalizado (p. ej. custom:my-card) para tarjetas que no estén en la lista.","editor.card_json":"Tarjeta (JSON)","editor.invalid_json":"JSON no válido: no se ha guardado.","editor.expand_all":"Expandir todo","editor.collapse_all":"Contraer todo","editor.drag":"Arrastrar para reordenar","editor.move_up":"Subir","editor.move_down":"Bajar","editor.copy_tab":"Copiar pestaña","editor.duplicate_tab":"Duplicar pestaña","editor.delete_tab":"Eliminar pestaña","editor.add_tab":"Añadir pestaña","editor.import_tab":"Importar pestaña","editor.edit_card":"Editar tarjeta","editor.preview":"Vista previa","editor.opt.position.top":"Arriba","editor.opt.position.bottom":"Abajo","editor.opt.position.left":"Izquierda","editor.opt.position.right":"Derecha","editor.opt.tab_display.both":"Icono y etiqueta","editor.opt.tab_display.icon":"Solo icono","editor.opt.tab_display.label":"Solo etiqueta","editor.opt.tab_display.active":"Iconos; pestaña seleccionada expandida","editor.opt.tab_display.":"(igual que la visualización de pestañas)","editor.opt.align.start":"Inicio","editor.opt.align.center":"Centro","editor.opt.align.end":"Final","editor.opt.align.justify":"Ancho completo","editor.opt.badge_display.text":"Texto","editor.opt.badge_display.dot":"Punto","editor.opt.transition.none":"Ninguna","editor.opt.transition.fade":"Fundido","editor.opt.transition.slide":"Deslizamiento","editor.opt.remember.none":"No recordar","editor.opt.remember.browser":"Por navegador","editor.opt.remember.url":"En la URL (#tab=)","editor.opt.remember.entity":"En una entidad ayudante (todos los dispositivos)","editor.opt.scrollable.auto":"Automático","editor.opt.scrollable.true":"Siempre","editor.opt.scrollable.false":"Nunca","check.now_met":"Se cumple ahora","check.now_unmet":"No se cumple ahora","check.chip_hidden":"Oculta ahora","check.chip_alert":"En alerta","check.chip_hidden_title":"Las condiciones de visibilidad de esta pestaña no se cumplen, por lo que está oculta en el panel de control.","check.state_is":"{entity} es {values}","check.state_is_not":"{entity} no es {values}","check.or":" o ","check.now":"ahora: {value}","check.missing":"entidad no encontrada","check.numeric":"{entity} {range}","check.above":"por encima de {value}","check.below":"por debajo de {value}","check.and":" y ","check.screen":"la pantalla coincide con {query}","check.time":"hora {range}","check.time_after":"después de {value}","check.time_before":"antes de {value}","check.time_days":"los días {days}","check.user":"el usuario actual es uno de los {count} seleccionados","check.template":"la plantilla devuelve true","check.template_pending":"plantilla (esperando a Home Assistant)","check.group_and":"todas:","check.group_or":"alguna:","check.group_not":"ninguna:","check.unknown":"tipo de condición desconocido","card.tabs":"Pestañas","card.scroll_left":"Desplazar a la izquierda","card.scroll_right":"Desplazar a la derecha","card.all_tabs":"Todas las pestañas","card.badge":"distintivo: {value}","card.ghost":"Oculta: no se cumplen sus condiciones de visibilidad (se muestra al editar)","starter.button":"Empezar desde una plantilla","starter.hint":"Crea un conjunto de pestañas con tus propias entidades. Reemplazar sustituye las pestañas actuales; Añadir las conserva.","starter.pick":"Plantilla","starter.replace":"Reemplazar pestañas","starter.append":"Añadir pestañas","starter.cancel":"Cancelar","starter.none":'Nada que crear: no se encontraron entidades para "{name}".',"starter.done":'Plantilla "{name}" añadida.',"starter.kind.rooms":"Habitaciones: una pestaña por área","starter.kind.lights":"Luces: una pestaña por área con luces","starter.kind.security":"Seguridad: alarma, cámaras, puertas y cerraduras","starter.kind.media":"Multimedia: una pestaña por reproductor","starter.kind.climate":"Climatización: una pestaña por termostato","starter.kind.energy":"Energía: las tarjetas del panel de energía","starter.kind.family":"Familia: una pestaña por persona, con mapa","starter.tab.alarm":"Alarma","starter.tab.cameras":"Cámaras","starter.tab.openings":"Puertas y ventanas","starter.tab.locks":"Cerraduras","starter.tab.energy_now":"Ahora","starter.tab.energy_usage":"Consumo","starter.tab.energy_sources":"Fuentes","starter.tab.energy_devices":"Dispositivos","convert.button":"Convertir desde otra tarjeta","convert.hint":"Pega el YAML de un tabbed-card, swipe-card, state-switch, una pila vertical/horizontal o cuadrícula, ventanas emergentes de Bubble Card, una tarjeta condicional, una vista de secciones o un panel de control completo.","convert.detected":"Detectado {source}: {count} pestañas.","convert.replace":"Reemplazar pestañas","convert.append":"Añadir pestañas","convert.cancel":"Cancelar","convert.done":"{count} pestañas convertidas desde {source}.","convert.error.empty":"No hay nada que convertir en esa lista.","convert.error.not_card":"Eso no parece una tarjeta, una lista de tarjetas, una vista ni un panel de control.","convert.error.no_tabs":"Nada que convertir: no se encontraron tarjetas.","convert.source.tabdeck":"una tarjeta Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"ventanas emergentes de Bubble Card","convert.source.dashboard":"un panel de control (una pestaña por vista)","convert.source.view":"una vista","convert.source.sections":"una vista de secciones (una pestaña por sección)","convert.source.stack":"una pila (una pestaña por tarjeta o encabezado)","convert.source.cards":"tarjetas","convert.note.styles":"Solo se ha conservado --mdc-theme-primary (como --tabdeck-accent); los demás estilos de tabbed-card no tienen equivalente en Tabdeck.","convert.note.tab_styles":"No se han conservado los estilos por pestaña de tabbed-card.","convert.note.autoplay":"Autoplay se ha convertido en auto_rotate (segundos).","convert.note.state_switch_mode":"Este modo de state-switch (usuario / media query / plantilla) no tiene equivalente directo; los estados se han convertido en pestañas normales. Añade condiciones de visibilidad si es necesario.","convert.note.bubble":"Cada ventana emergente se ha convertido en una pestaña; no se usan el botón ni el estilo propios de la ventana emergente.","convert.note.dashboard":"Cada vista se ha convertido en una pestaña. Los paneles de control grandes pueden generar una tarjeta pesada; considera lazy: true.","editor.global.dock":"Dock: fijar la barra en la parte inferior de la pantalla (navegación móvil)","editor.tab.fab":"Estilo de botón de acción flotante","editor.global.content_arrows":"Flechas anterior / siguiente sobre el contenido","editor.opt.tab_display.dots":"Puntos","card.prev_tab":"Pestaña anterior","card.next_tab":"Pestaña siguiente","editor.global.search":"Búsqueda rápida (botón 🔍)","editor.global.hotkeys":"Atajos de teclado (1–9, [ ], /)","card.search":"Buscar una pestaña","card.search_placeholder":"Escribe para filtrar…","card.search_none":"No hay pestañas que coincidan","editor.global.history":"El botón Atrás vuelve a la pestaña anterior"}}),na=ce(()=>{Jt={"editor.tab.name":"Nom de l'onglet","editor.tab.subtitle":"Sous-titre","editor.tab.icon":"Icône","editor.tab.accent":"Couleur d'accent","editor.tab.color":"Couleur du texte/de l'icône","editor.tab.badge":"Badge (ID d'entité ou modèle)","editor.tab.badge_color":"Couleur du badge","editor.tab.disabled":"Désactiver l'onglet (grisé, non sélectionnable)","editor.tab.card_size":"Taille de carte indicative (lignes)","editor.tab.hold_action":"Action d'appui long","editor.tab.badge_action":"Action d'appui sur le badge","editor.tab.tap_action":"Action d'appui (remplace l'ouverture de l'onglet, ex. naviguer)","editor.tab.enter_action":"Action à l'ouverture de cet onglet","editor.tab.leave_action":"Action en quittant cet onglet","editor.global.preset":"Style prédéfini (applique un ensemble des options ci-dessous)","editor.global.position":"Position","editor.global.style":"Style","editor.global.tab_display":"Affichage des onglets","editor.global.align":"Alignement des onglets","editor.global.badge_display":"Affichage des badges","editor.global.hide_inactive_badge":"Masquer les badges inactifs (0/off)","editor.global.transition":"Transition du panneau","editor.global.indicator_size":"Épaisseur de l'indicateur (px)","editor.global.indicator_radius":"Rayon des coins de l'indicateur (px)","editor.global.remember":"Mémoriser l'onglet sélectionné","editor.global.remember_entity":"Entité de mémorisation (input_number/input_text)","editor.global.storage_key":"Clé de stockage (mode navigateur)","editor.global.default_tab":"Onglet par défaut","editor.global.scrollable":"Défilement","editor.global.lazy":"Chargement différé des onglets inactifs","editor.global.unmount_hidden":"Décharger les onglets masqués (économise la mémoire)","editor.global.swipe_wrap":"Le balayage boucle aux extrémités","editor.global.animated":"Animer l'indicateur","editor.global.accent_indicator":"Colorer l'indicateur avec l'accent de l'onglet","editor.global.header":"Afficher l'en-tête (titre de l'onglet actif au-dessus du contenu)","editor.global.aria_label":"Nom accessible de la barre d'onglets","editor.global.sticky":"Barre d'onglets fixe","editor.global.elevation":"Surélever la barre avec une ombre","editor.global.scroll_buttons":"Boutons de défilement si la barre déborde","editor.global.overflow_menu":"Menu ⋯ si la barre déborde","editor.global.bar_background":"Couleur de fond de la barre d'onglets","editor.global.swipe":"Balayer pour changer d'onglet (mobile)","editor.global.swipe_mouse":"Glisser à la souris pour changer d'onglet (ordinateur)","editor.global.tab_display_narrow":"Affichage des onglets sur les cartes étroites","editor.global.narrow_width":"Étroite en dessous de (px)","editor.global.split":"Vue côte à côte à partir de la largeur (px, 0 = désactivé)","editor.global.collapsible":"Repliable (appuyer sur l'onglet actif pour replier le contenu)","editor.global.start_collapsed":"Replié au démarrage","editor.global.scroll_spy":"Défilement suivi : empiler les onglets en sections","editor.global.auto_rotate":"Rotation automatique des onglets toutes les (secondes, 0 = désactivé)","editor.global.idle_return":"Revenir à l'onglet par défaut après inactivité (secondes, 0 = désactivé)","editor.global.edit_mode_reveal":"Afficher les onglets masqués pendant la modification du tableau de bord","editor.cond.visibility.label":"Visibilité","editor.cond.visibility.hint":"afficher l'onglet uniquement si…","editor.cond.alert.label":"Alerte","editor.cond.alert.hint":"faire clignoter l'onglet si…","editor.cond.default_if.label":"Par défaut si","editor.cond.default_if.hint":"démarrer sur cet onglet si…","editor.tab_n":"Onglet {n}","editor.copy_name":"{name} (copie)","editor.copied":"Onglet « {name} » copié — collez-le dans Importer un onglet.","editor.clipboard_error":"Impossible d'accéder au presse-papiers.","editor.import_error":"Ceci ne ressemble pas à un onglet (il faut card, cards ou tap_action).","editor.imported_one":"1 onglet importé.","editor.imported_many":"{count} onglets importés.","editor.import_hint":"Collez un onglet (ou une liste d'onglets) copié avec Copier l'onglet, ou tout YAML d'onglet.","editor.add":"Ajouter","editor.cancel":"Annuler","editor.warn_duplicates":"Noms d'onglets en double ({names}). « Remember: url » et l'onglet par défaut par nom peuvent être ambigus.","editor.back":"Retour","editor.change_type":"Changer le type de carte","editor.card_type":"Type de carte","editor.card_type_hint":"Choisissez un type de carte pour la configurer. Saisissez un type personnalisé (ex. custom:my-card) pour les cartes absentes de la liste.","editor.card_json":"Carte (JSON)","editor.invalid_json":"JSON invalide — non enregistré.","editor.expand_all":"Tout déplier","editor.collapse_all":"Tout replier","editor.drag":"Glisser pour réorganiser","editor.move_up":"Monter","editor.move_down":"Descendre","editor.copy_tab":"Copier l'onglet","editor.duplicate_tab":"Dupliquer l'onglet","editor.delete_tab":"Supprimer l'onglet","editor.add_tab":"Ajouter un onglet","editor.import_tab":"Importer un onglet","editor.edit_card":"Modifier la carte","editor.preview":"Aperçu","editor.opt.position.top":"Haut","editor.opt.position.bottom":"Bas","editor.opt.position.left":"Gauche","editor.opt.position.right":"Droite","editor.opt.tab_display.both":"Icône et libellé","editor.opt.tab_display.icon":"Icône seule","editor.opt.tab_display.label":"Libellé seul","editor.opt.tab_display.active":"Icônes ; onglet sélectionné déplié","editor.opt.tab_display.":"(identique à l'affichage des onglets)","editor.opt.align.start":"Début","editor.opt.align.center":"Centre","editor.opt.align.end":"Fin","editor.opt.align.justify":"Pleine largeur","editor.opt.badge_display.text":"Texte","editor.opt.badge_display.dot":"Point","editor.opt.transition.none":"Aucune","editor.opt.transition.fade":"Fondu","editor.opt.transition.slide":"Glissement","editor.opt.remember.none":"Ne pas mémoriser","editor.opt.remember.browser":"Par navigateur","editor.opt.remember.url":"Dans l'URL (#tab=)","editor.opt.remember.entity":"Dans une entité d'entrée (tous les appareils)","editor.opt.scrollable.auto":"Automatique","editor.opt.scrollable.true":"Toujours","editor.opt.scrollable.false":"Jamais","check.now_met":"Remplie actuellement","check.now_unmet":"Non remplie actuellement","check.chip_hidden":"Masqué","check.chip_alert":"En alerte","check.chip_hidden_title":"Les conditions de visibilité de cet onglet ne sont pas remplies : il est donc masqué sur le tableau de bord.","check.state_is":"{entity} est {values}","check.state_is_not":"{entity} n'est pas {values}","check.or":" ou ","check.now":"actuel : {value}","check.missing":"entité introuvable","check.numeric":"{entity} {range}","check.above":"supérieur à {value}","check.below":"inférieur à {value}","check.and":" et ","check.screen":"l'écran correspond à {query}","check.time":"heure {range}","check.time_after":"après {value}","check.time_before":"avant {value}","check.time_days":"le {days}","check.user":"l'utilisateur actuel fait partie des {count} sélectionnés","check.template":"le modèle renvoie vrai","check.template_pending":"modèle (en attente de Home Assistant)","check.group_and":"toutes :","check.group_or":"au moins une :","check.group_not":"aucune :","check.unknown":"type de condition inconnu","card.tabs":"Onglets","card.scroll_left":"Défiler vers la gauche","card.scroll_right":"Défiler vers la droite","card.all_tabs":"Tous les onglets","card.badge":"badge : {value}","card.ghost":"Masqué : ses conditions de visibilité ne sont pas remplies (affiché pendant la modification)","starter.button":"Partir d'un modèle","starter.hint":"Créez un ensemble d'onglets à partir de vos entités. Remplacer supprime les onglets actuels ; Ajouter les conserve.","starter.pick":"Modèle","starter.replace":"Remplacer les onglets","starter.append":"Ajouter les onglets","starter.cancel":"Annuler","starter.none":"Rien à créer : aucune entité correspondante trouvée pour « {name} ».","starter.done":"Modèle « {name} » ajouté.","starter.kind.rooms":"Pièces : un onglet par pièce","starter.kind.lights":"Lumières : un onglet par pièce avec des lumières","starter.kind.security":"Sécurité : alarme, caméras, portes et serrures","starter.kind.media":"Médias : un onglet par lecteur multimédia","starter.kind.climate":"Climat : un onglet par thermostat","starter.kind.energy":"Énergie : les cartes du tableau de bord Énergie","starter.kind.family":"Famille : un onglet par personne, avec une carte géographique","starter.tab.alarm":"Alarme","starter.tab.cameras":"Caméras","starter.tab.openings":"Portes et fenêtres","starter.tab.locks":"Serrures","starter.tab.energy_now":"Actuel","starter.tab.energy_usage":"Consommation","starter.tab.energy_sources":"Sources","starter.tab.energy_devices":"Appareils","convert.button":"Convertir depuis une autre carte","convert.hint":"Collez le YAML d'une tabbed-card, swipe-card, state-switch, d'une pile verticale/horizontale ou grille, de pop-ups Bubble Card, d'une carte conditionnelle, d'une vue sections ou d'un tableau de bord entier.","convert.detected":"{source} détecté : {count} onglets.","convert.replace":"Remplacer les onglets","convert.append":"Ajouter les onglets","convert.cancel":"Annuler","convert.done":"{count} onglets convertis depuis {source}.","convert.error.empty":"Il n'y a rien à convertir dans cette liste.","convert.error.not_card":"Ceci ne ressemble pas à une carte, une liste de cartes, une vue ou un tableau de bord.","convert.error.no_tabs":"Rien à convertir : aucune carte trouvée.","convert.source.tabdeck":"une carte Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"pop-ups Bubble Card","convert.source.dashboard":"un tableau de bord (un onglet par vue)","convert.source.view":"une vue","convert.source.sections":"une vue sections (un onglet par section)","convert.source.stack":"une pile (un onglet par carte ou titre)","convert.source.cards":"des cartes","convert.note.styles":"Seul --mdc-theme-primary a été repris (en tant que --tabdeck-accent) ; les autres styles de tabbed-card n'ont pas d'équivalent dans Tabdeck.","convert.note.tab_styles":"Les styles par onglet de tabbed-card n'ont pas été repris.","convert.note.autoplay":"Autoplay est devenu auto_rotate (secondes).","convert.note.state_switch_mode":"Ce mode de state-switch (utilisateur / media query / modèle) n'a pas d'équivalent direct ; les états sont devenus de simples onglets. Ajoutez des conditions de visibilité si besoin.","convert.note.bubble":"Chaque pop-up est devenu un onglet ; le bouton et le style propres au pop-up ne sont pas utilisés.","convert.note.dashboard":"Chaque vue est devenue un onglet. Les grands tableaux de bord peuvent alourdir la carte ; envisagez lazy: true.","editor.global.dock":"Dock : épingler la barre en bas de l'écran (navigation mobile)","editor.tab.fab":"Style bouton d'action flottant","editor.global.content_arrows":"Flèches précédent / suivant sur le contenu","editor.opt.tab_display.dots":"Points","card.prev_tab":"Onglet précédent","card.next_tab":"Onglet suivant","editor.global.search":"Recherche rapide (bouton 🔍)","editor.global.hotkeys":"Raccourcis clavier (1–9, [ ], /)","card.search":"Rechercher un onglet","card.search_placeholder":"Tapez pour filtrer…","card.search_none":"Aucun onglet correspondant","editor.global.history":"Le bouton Retour revient à l'onglet précédent"}}),sa=ce(()=>{Yt={"editor.tab.name":"Nome della tab","editor.tab.subtitle":"Sottotitolo","editor.tab.icon":"Icona","editor.tab.accent":"Colore di accento","editor.tab.color":"Colore testo/icona","editor.tab.badge":"Badge (ID entità o modello)","editor.tab.badge_color":"Colore del badge","editor.tab.disabled":"Disattiva tab (in grigio, non selezionabile)","editor.tab.card_size":"Dimensione indicativa (righe)","editor.tab.hold_action":"Azione alla pressione prolungata","editor.tab.badge_action":"Azione al tocco del badge","editor.tab.tap_action":"Azione al tocco (sostituisce l'apertura della tab, es. navigazione)","editor.tab.enter_action":"Azione all'apertura di questa tab","editor.tab.leave_action":"Azione all'uscita da questa tab","editor.global.preset":"Stile predefinito (applica un insieme delle opzioni sottostanti)","editor.global.position":"Posizione","editor.global.style":"Stile","editor.global.tab_display":"Visualizzazione tab","editor.global.align":"Allineamento tab","editor.global.badge_display":"Visualizzazione badge","editor.global.hide_inactive_badge":"Nascondi badge inattivi (0/off)","editor.global.transition":"Transizione del pannello","editor.global.indicator_size":"Spessore indicatore (px)","editor.global.indicator_radius":"Raggio angoli indicatore (px)","editor.global.remember":"Ricorda la tab selezionata","editor.global.remember_entity":"Entità di memoria (input_number/input_text)","editor.global.storage_key":"Chiave di archiviazione (modalità browser)","editor.global.default_tab":"Tab predefinita","editor.global.scrollable":"Scorrevole","editor.global.lazy":"Caricamento differito delle tab inattive","editor.global.unmount_hidden":"Scarica le tab nascoste (risparmia memoria)","editor.global.swipe_wrap":"Lo scorrimento ricomincia dagli estremi","editor.global.animated":"Anima l'indicatore","editor.global.accent_indicator":"Colora l'indicatore con l'accento della tab","editor.global.header":"Mostra intestazione (titolo della tab attiva sopra il contenuto)","editor.global.aria_label":"Nome accessibile della barra delle tab","editor.global.sticky":"Barra delle tab fissa","editor.global.elevation":"Solleva la barra con un'ombra","editor.global.scroll_buttons":"Pulsanti di scorrimento se la barra trabocca","editor.global.overflow_menu":"Menu ⋯ se la barra trabocca","editor.global.bar_background":"Colore di sfondo della barra delle tab","editor.global.swipe":"Scorri per cambiare tab (mobile)","editor.global.swipe_mouse":"Trascina col mouse per cambiare tab (desktop)","editor.global.tab_display_narrow":"Visualizzazione tab su schede strette","editor.global.narrow_width":"Stretta sotto (px)","editor.global.split":"Vista affiancata da questa larghezza (px, 0 = disattivato)","editor.global.collapsible":"Comprimibile (tocca la tab attiva per comprimere il contenuto)","editor.global.start_collapsed":"Inizia compressa","editor.global.scroll_spy":"Scroll-spy: impila le tab come sezioni","editor.global.auto_rotate":"Ruota automaticamente le tab ogni (secondi, 0 = disattivato)","editor.global.idle_return":"Torna alla tab predefinita dopo inattività (secondi, 0 = disattivato)","editor.global.edit_mode_reveal":"Mostra le tab nascoste durante la modifica della plancia","editor.cond.visibility.label":"Visibilità","editor.cond.visibility.hint":"mostra la tab solo quando…","editor.cond.alert.label":"Avviso","editor.cond.alert.hint":"fai lampeggiare la tab quando…","editor.cond.default_if.label":"Predefinita quando","editor.cond.default_if.hint":"inizia da questa tab quando…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} (copia)","editor.copied":"Tab «{name}» copiata — incollala in Importa tab.","editor.clipboard_error":"Impossibile accedere agli appunti.","editor.import_error":"Non sembra una tab (servono card, cards o tap_action).","editor.imported_one":"1 tab importata.","editor.imported_many":"{count} tab importate.","editor.import_hint":"Incolla una tab (o un elenco di tab) copiata con Copia tab, o qualsiasi YAML di tab.","editor.add":"Aggiungi","editor.cancel":"Annulla","editor.warn_duplicates":"Nomi di tab duplicati ({names}). «Remember: url» e la tab predefinita per nome potrebbero essere ambigui.","editor.back":"Indietro","editor.change_type":"Cambia tipo di scheda","editor.card_type":"Tipo di scheda","editor.card_type_hint":"Scegli un tipo di scheda per configurarla. Inserisci un tipo personalizzato (es. custom:my-card) per le schede non presenti nell'elenco.","editor.card_json":"Scheda (JSON)","editor.invalid_json":"JSON non valido — non salvato.","editor.expand_all":"Espandi tutto","editor.collapse_all":"Comprimi tutto","editor.drag":"Trascina per riordinare","editor.move_up":"Sposta su","editor.move_down":"Sposta giù","editor.copy_tab":"Copia tab","editor.duplicate_tab":"Duplica tab","editor.delete_tab":"Elimina tab","editor.add_tab":"Aggiungi tab","editor.import_tab":"Importa tab","editor.edit_card":"Modifica scheda","editor.preview":"Anteprima","editor.opt.position.top":"In alto","editor.opt.position.bottom":"In basso","editor.opt.position.left":"A sinistra","editor.opt.position.right":"A destra","editor.opt.tab_display.both":"Icona ed etichetta","editor.opt.tab_display.icon":"Solo icona","editor.opt.tab_display.label":"Solo etichetta","editor.opt.tab_display.active":"Icone; tab selezionata espansa","editor.opt.tab_display.":"(come la visualizzazione tab)","editor.opt.align.start":"Inizio","editor.opt.align.center":"Centro","editor.opt.align.end":"Fine","editor.opt.align.justify":"Larghezza piena","editor.opt.badge_display.text":"Testo","editor.opt.badge_display.dot":"Punto","editor.opt.transition.none":"Nessuna","editor.opt.transition.fade":"Dissolvenza","editor.opt.transition.slide":"Scorrimento","editor.opt.remember.none":"Non ricordare","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"Nell'URL (#tab=)","editor.opt.remember.entity":"In un'entità aiutante (tutti i dispositivi)","editor.opt.scrollable.auto":"Automatico","editor.opt.scrollable.true":"Sempre","editor.opt.scrollable.false":"Mai","check.now_met":"Soddisfatta ora","check.now_unmet":"Non soddisfatta ora","check.chip_hidden":"Nascosta ora","check.chip_alert":"In avviso","check.chip_hidden_title":"Le condizioni di visibilità di questa tab non sono soddisfatte, quindi è nascosta nella plancia.","check.state_is":"{entity} è {values}","check.state_is_not":"{entity} non è {values}","check.or":" o ","check.now":"ora: {value}","check.missing":"entità non trovata","check.numeric":"{entity} {range}","check.above":"sopra {value}","check.below":"sotto {value}","check.and":" e ","check.screen":"lo schermo corrisponde a {query}","check.time":"ora {range}","check.time_after":"dopo le {value}","check.time_before":"prima delle {value}","check.time_days":"di {days}","check.user":"l'utente attuale è tra i {count} selezionati","check.template":"il modello restituisce vero","check.template_pending":"modello (in attesa di Home Assistant)","check.group_and":"tutte:","check.group_or":"almeno una:","check.group_not":"nessuna:","check.unknown":"tipo di condizione sconosciuto","card.tabs":"Tab","card.scroll_left":"Scorri a sinistra","card.scroll_right":"Scorri a destra","card.all_tabs":"Tutte le tab","card.badge":"badge: {value}","card.ghost":"Nascosta: le condizioni di visibilità non sono soddisfatte (mostrata durante la modifica)","starter.button":"Parti da un modello","starter.hint":"Crea un insieme di tab dalle tue entità. Sostituisci rimpiazza le tab attuali; Aggiungi le mantiene.","starter.pick":"Modello","starter.replace":"Sostituisci tab","starter.append":"Aggiungi tab","starter.cancel":"Annulla","starter.none":"Niente da creare: nessuna entità corrispondente trovata per «{name}».","starter.done":"Modello «{name}» aggiunto.","starter.kind.rooms":"Stanze: una tab per area","starter.kind.lights":"Luci: una tab per ogni area con luci","starter.kind.security":"Sicurezza: allarme, telecamere, porte e serrature","starter.kind.media":"Media: una tab per lettore multimediale","starter.kind.climate":"Clima: una tab per termostato","starter.kind.energy":"Energia: le schede della plancia Energia","starter.kind.family":"Famiglia: una tab per persona, con una mappa","starter.tab.alarm":"Allarme","starter.tab.cameras":"Telecamere","starter.tab.openings":"Porte e finestre","starter.tab.locks":"Serrature","starter.tab.energy_now":"Ora","starter.tab.energy_usage":"Consumo","starter.tab.energy_sources":"Fonti","starter.tab.energy_devices":"Dispositivi","convert.button":"Converti da un'altra scheda","convert.hint":"Incolla lo YAML di una tabbed-card, swipe-card, state-switch, una pila verticale/orizzontale o griglia, pop-up di Bubble Card, una scheda condizionale, una vista a sezioni o un'intera plancia.","convert.detected":"Rilevato {source}: {count} tab.","convert.replace":"Sostituisci tab","convert.append":"Aggiungi tab","convert.cancel":"Annulla","convert.done":"{count} tab convertite da {source}.","convert.error.empty":"Non c'è niente da convertire in questo elenco.","convert.error.not_card":"Non sembra una scheda, un elenco di schede, una vista o una plancia.","convert.error.no_tabs":"Niente da convertire: nessuna scheda trovata.","convert.source.tabdeck":"una scheda Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"pop-up di Bubble Card","convert.source.dashboard":"una plancia (una tab per vista)","convert.source.view":"una vista","convert.source.sections":"una vista a sezioni (una tab per sezione)","convert.source.stack":"una pila (una tab per scheda o intestazione)","convert.source.cards":"schede","convert.note.styles":"È stato mantenuto solo --mdc-theme-primary (come --tabdeck-accent); gli altri stili di tabbed-card non hanno equivalenti in Tabdeck.","convert.note.tab_styles":"Gli stili per tab di tabbed-card non sono stati mantenuti.","convert.note.autoplay":"Autoplay è diventato auto_rotate (secondi).","convert.note.state_switch_mode":"Questa modalità di state-switch (utente / media query / modello) non ha un equivalente diretto; gli stati sono diventati tab semplici. Aggiungi condizioni di visibilità se necessario.","convert.note.bubble":"Ogni pop-up è diventato una tab; il pulsante e lo stile propri del pop-up non vengono usati.","convert.note.dashboard":"Ogni vista è diventata una tab. Plance di grandi dimensioni possono appesantire la scheda; valuta lazy: true.","editor.global.dock":"Dock: fissa la barra in fondo allo schermo (navigazione da telefono)","editor.tab.fab":"Stile pulsante d'azione flottante","editor.global.content_arrows":"Frecce precedente / successiva sul contenuto","editor.opt.tab_display.dots":"Punti","card.prev_tab":"Tab precedente","card.next_tab":"Tab successiva","editor.global.search":"Ricerca rapida (pulsante 🔍)","editor.global.hotkeys":"Scorciatoie da tastiera (1–9, [ ], /)","card.search":"Cerca una tab","card.search_placeholder":"Digita per filtrare…","card.search_none":"Nessuna tab corrispondente","editor.global.history":"Il tasto Indietro torna alla tab precedente"}}),da=ce(()=>{Xt={"editor.tab.name":"Tabnaam","editor.tab.subtitle":"Ondertitel","editor.tab.icon":"Pictogram","editor.tab.accent":"Accentkleur","editor.tab.color":"Tekst-/pictogramkleur","editor.tab.badge":"Badge (entiteit-ID of template)","editor.tab.badge_color":"Badgekleur","editor.tab.disabled":"Tab uitschakelen (grijs, niet selecteerbaar)","editor.tab.card_size":"Kaartgrootte (rijen)","editor.tab.hold_action":"Vasthouden-actie","editor.tab.badge_action":"Tik-actie voor badge","editor.tab.tap_action":"Tik-actie (vervangt het openen van de tab, bijv. navigate)","editor.tab.enter_action":"Actie bij openen van deze tab","editor.tab.leave_action":"Actie bij verlaten van deze tab","editor.global.preset":"Stijlvoorinstelling (past een set van de opties hieronder toe)","editor.global.position":"Positie","editor.global.style":"Stijl","editor.global.tab_display":"Tabweergave","editor.global.align":"Tabuitlijning","editor.global.badge_display":"Badgeweergave","editor.global.hide_inactive_badge":"Inactieve badges verbergen (0/off)","editor.global.transition":"Paneelovergang","editor.global.indicator_size":"Indicatordikte (px)","editor.global.indicator_radius":"Hoekradius indicator (px)","editor.global.remember":"Geselecteerde tab onthouden","editor.global.remember_entity":"Entiteit om te onthouden (input_number/input_text)","editor.global.storage_key":"Opslagsleutel (browsermodus)","editor.global.default_tab":"Standaardtab","editor.global.scrollable":"Scrollbaar","editor.global.lazy":"Inactieve tabs pas laden wanneer nodig","editor.global.unmount_hidden":"Verborgen tabs ontladen (bespaart geheugen)","editor.global.swipe_wrap":"Vegen gaat rond bij de uiteinden","editor.global.animated":"Indicator animeren","editor.global.accent_indicator":"Indicator in accentkleur van de tab","editor.global.header":"Koptekst tonen (titel van actieve tab boven inhoud)","editor.global.aria_label":"Toegankelijke naam voor de tabbalk","editor.global.sticky":"Tabbalk vastzetten","editor.global.elevation":"Balk verhogen met schaduw","editor.global.scroll_buttons":"Scrollknoppen als de balk overloopt","editor.global.overflow_menu":"Overloopmenu ⋯ als de balk overloopt","editor.global.bar_background":"Achtergrondkleur tabbalk","editor.global.swipe":"Vegen om van tab te wisselen (mobiel)","editor.global.swipe_mouse":"Slepen met muis om van tab te wisselen (desktop)","editor.global.tab_display_narrow":"Tabweergave op smalle kaarten","editor.global.narrow_width":"Smal onder (px)","editor.global.split":"Naast elkaar vanaf breedte (px, 0 = uit)","editor.global.collapsible":"Inklapbaar (tik op actieve tab om inhoud in te klappen)","editor.global.start_collapsed":"Ingeklapt starten","editor.global.scroll_spy":"Scroll-spy: tabs als secties onder elkaar","editor.global.auto_rotate":"Tabs automatisch wisselen elke (seconden, 0 = uit)","editor.global.idle_return":"Na inactiviteit terug naar standaardtab (seconden, 0 = uit)","editor.global.edit_mode_reveal":"Verborgen tabs tonen tijdens bewerken van het dashboard","editor.cond.visibility.label":"Zichtbaarheid","editor.cond.visibility.hint":"toon de tab alleen als…","editor.cond.alert.label":"Melding","editor.cond.alert.hint":"laat de tab pulseren als…","editor.cond.default_if.label":"Standaard als","editor.cond.default_if.hint":"start op deze tab als…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} kopie","editor.copied":'Tab "{name}" gekopieerd — plak hem in Tab importeren.',"editor.clipboard_error":"Geen toegang tot het klembord.","editor.import_error":"Dat lijkt geen tab (vereist card, cards of tap_action).","editor.imported_one":"1 tab geïmporteerd.","editor.imported_many":"{count} tabs geïmporteerd.","editor.import_hint":"Plak een tab (of lijst met tabs) gekopieerd met Tab kopiëren, of willekeurige tab-YAML.","editor.add":"Toevoegen","editor.cancel":"Annuleren","editor.warn_duplicates":'Dubbele tabnamen ({names}). "Remember: url" en standaardtab op naam kunnen dubbelzinnig zijn.',"editor.back":"Terug","editor.change_type":"Kaarttype wijzigen","editor.card_type":"Kaarttype","editor.card_type_hint":"Kies een kaarttype om het te configureren. Voer een aangepast type in (bijv. custom:my-card) voor kaarten die niet in de lijst staan.","editor.card_json":"Kaart (JSON)","editor.invalid_json":"Ongeldige JSON — niet opgeslagen.","editor.expand_all":"Alles uitklappen","editor.collapse_all":"Alles inklappen","editor.drag":"Sleep om te herschikken","editor.move_up":"Omhoog","editor.move_down":"Omlaag","editor.copy_tab":"Tab kopiëren","editor.duplicate_tab":"Tab dupliceren","editor.delete_tab":"Tab verwijderen","editor.add_tab":"Tab toevoegen","editor.import_tab":"Tab importeren","editor.edit_card":"Kaart bewerken","editor.preview":"Voorbeeld","editor.opt.position.top":"Boven","editor.opt.position.bottom":"Onder","editor.opt.position.left":"Links","editor.opt.position.right":"Rechts","editor.opt.tab_display.both":"Pictogram en label","editor.opt.tab_display.icon":"Alleen pictogram","editor.opt.tab_display.label":"Alleen label","editor.opt.tab_display.active":"Pictogrammen; geselecteerde tab uitgebreid","editor.opt.tab_display.":"(zelfde als tabweergave)","editor.opt.align.start":"Begin","editor.opt.align.center":"Midden","editor.opt.align.end":"Eind","editor.opt.align.justify":"Volledige breedte","editor.opt.badge_display.text":"Tekst","editor.opt.badge_display.dot":"Stip","editor.opt.transition.none":"Geen","editor.opt.transition.fade":"Vervagen","editor.opt.transition.slide":"Schuiven","editor.opt.remember.none":"Niet onthouden","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"In de URL (#tab=)","editor.opt.remember.entity":"In een helper-entiteit (alle apparaten)","editor.opt.scrollable.auto":"Automatisch","editor.opt.scrollable.true":"Altijd","editor.opt.scrollable.false":"Nooit","check.now_met":"Nu voldaan","check.now_unmet":"Nu niet voldaan","check.chip_hidden":"Nu verborgen","check.chip_alert":"Melding actief","check.chip_hidden_title":"Niet aan de zichtbaarheidsvoorwaarden van deze tab is voldaan, dus hij is verborgen op het dashboard.","check.state_is":"{entity} is {values}","check.state_is_not":"{entity} is niet {values}","check.or":" of ","check.now":"nu: {value}","check.missing":"entiteit niet gevonden","check.numeric":"{entity} {range}","check.above":"boven {value}","check.below":"onder {value}","check.and":" en ","check.screen":"scherm voldoet aan {query}","check.time":"tijd {range}","check.time_after":"na {value}","check.time_before":"voor {value}","check.time_days":"op {days}","check.user":"huidige gebruiker is een van {count} geselecteerde","check.template":"template geeft true","check.template_pending":"template (wacht op Home Assistant)","check.group_and":"alle van:","check.group_or":"een van:","check.group_not":"geen van:","check.unknown":"onbekend voorwaardetype","card.tabs":"Tabs","card.scroll_left":"Naar links scrollen","card.scroll_right":"Naar rechts scrollen","card.all_tabs":"Alle tabs","card.badge":"badge: {value}","card.ghost":"Verborgen: niet aan de zichtbaarheidsvoorwaarden voldaan (getoond tijdens bewerken)","starter.button":"Beginnen met een sjabloon","starter.hint":"Bouw een deck met je eigen entiteiten. Vervangen wisselt de huidige tabs uit; Toevoegen behoudt ze.","starter.pick":"Sjabloon","starter.replace":"Tabs vervangen","starter.append":"Tabs toevoegen","starter.cancel":"Annuleren","starter.none":'Niets te bouwen: geen passende entiteiten gevonden voor "{name}".',"starter.done":'Sjabloon "{name}" toegevoegd.',"starter.kind.rooms":"Ruimtes: een tab per ruimte","starter.kind.lights":"Lampen: een tab per ruimte met lampen","starter.kind.security":"Beveiliging: alarm, camera's, deuren & sloten","starter.kind.media":"Media: een tab per mediaspeler","starter.kind.climate":"Klimaat: een tab per thermostaat","starter.kind.energy":"Energie: de kaarten van het energiedashboard","starter.kind.family":"Gezin: een tab per persoon, met locatiekaart","starter.tab.alarm":"Alarm","starter.tab.cameras":"Camera's","starter.tab.openings":"Deuren & ramen","starter.tab.locks":"Sloten","starter.tab.energy_now":"Nu","starter.tab.energy_usage":"Verbruik","starter.tab.energy_sources":"Bronnen","starter.tab.energy_devices":"Apparaten","convert.button":"Converteren vanaf een andere kaart","convert.hint":"Plak de YAML van een tabbed-card, swipe-card, state-switch, verticale/horizontale stapel of raster, Bubble Card-pop-ups, een voorwaardelijke kaart, een sectieweergave of een heel dashboard.","convert.detected":"{source} gedetecteerd: {count} tabs.","convert.replace":"Tabs vervangen","convert.append":"Tabs toevoegen","convert.cancel":"Annuleren","convert.done":"{count} tabs geconverteerd vanuit {source}.","convert.error.empty":"Er valt niets te converteren in die lijst.","convert.error.not_card":"Dat lijkt geen kaart, lijst met kaarten, weergave of dashboard.","convert.error.no_tabs":"Niets te converteren: geen kaarten gevonden.","convert.source.tabdeck":"een Tabdeck-kaart","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card-pop-ups","convert.source.dashboard":"een dashboard (een tab per weergave)","convert.source.view":"een weergave","convert.source.sections":"een sectieweergave (een tab per sectie)","convert.source.stack":"een stapel (een tab per kaart of kop)","convert.source.cards":"kaarten","convert.note.styles":"Alleen --mdc-theme-primary is overgenomen (als --tabdeck-accent); andere tabbed-card-stijlen hebben geen equivalent in Tabdeck.","convert.note.tab_styles":"Stijlen per tab uit tabbed-card zijn niet overgenomen.","convert.note.autoplay":"Autoplay is auto_rotate geworden (seconden).","convert.note.state_switch_mode":"Deze state-switch-modus (gebruiker / media query / template) heeft geen direct equivalent; de statussen zijn gewone tabs geworden. Voeg zo nodig zichtbaarheidsvoorwaarden toe.","convert.note.bubble":"Elke pop-up is een tab geworden; de eigen knop en opmaak van de pop-up worden niet gebruikt.","convert.note.dashboard":"Elke weergave is een tab geworden. Grote dashboards kunnen een zware kaart opleveren; overweeg lazy: true.","editor.global.dock":"Dock: balk onderaan het scherm vastzetten (telefoonnavigatie)","editor.tab.fab":"Als zwevende actieknop","editor.global.content_arrows":"Vorige/volgende-pijlen over de inhoud","editor.opt.tab_display.dots":"Stippen","card.prev_tab":"Vorige tab","card.next_tab":"Volgende tab","editor.global.search":"Snel zoeken (🔍-knop)","editor.global.hotkeys":"Sneltoetsen (1–9, [ ], /)","card.search":"Tab zoeken","card.search_placeholder":"Typ om te filteren…","card.search_none":"Geen overeenkomende tabs","editor.global.history":"Terugknop gaat naar de vorige tab"}}),ca=ce(()=>{Qt={"editor.tab.name":"Nazwa zakładki","editor.tab.subtitle":"Podtytuł","editor.tab.icon":"Ikona","editor.tab.accent":"Kolor akcentu","editor.tab.color":"Kolor tekstu/ikony","editor.tab.badge":"Plakietka (identyfikator encji lub szablon)","editor.tab.badge_color":"Kolor plakietki","editor.tab.disabled":"Wyłącz zakładkę (wyszarzona, nie do wybrania)","editor.tab.card_size":"Wskazówka rozmiaru karty (wiersze)","editor.tab.hold_action":"Akcja długiego naciśnięcia","editor.tab.badge_action":"Akcja dotknięcia plakietki","editor.tab.tap_action":"Akcja dotknięcia (zamiast otwarcia zakładki, np. nawigacja)","editor.tab.enter_action":"Akcja po otwarciu tej zakładki","editor.tab.leave_action":"Akcja po opuszczeniu tej zakładki","editor.global.preset":"Styl gotowy (ustawia zestaw poniższych opcji)","editor.global.position":"Położenie","editor.global.style":"Styl","editor.global.tab_display":"Wygląd zakładek","editor.global.align":"Wyrównanie zakładek","editor.global.badge_display":"Wygląd plakietek","editor.global.hide_inactive_badge":"Ukryj nieaktywne plakietki (0/off)","editor.global.transition":"Przejście panelu","editor.global.indicator_size":"Grubość wskaźnika (px)","editor.global.indicator_radius":"Zaokrąglenie wskaźnika (px)","editor.global.remember":"Zapamiętaj wybraną zakładkę","editor.global.remember_entity":"Encja do zapamiętania (input_number/input_text)","editor.global.storage_key":"Klucz zapisu (tryb przeglądarki)","editor.global.default_tab":"Domyślna zakładka","editor.global.scrollable":"Przewijanie","editor.global.lazy":"Leniwie ładuj nieaktywne zakładki","editor.global.unmount_hidden":"Odmontuj ukryte zakładki (oszczędza pamięć)","editor.global.swipe_wrap":"Przesuwanie zapętla się na końcach","editor.global.animated":"Animuj wskaźnik","editor.global.accent_indicator":"Koloruj wskaźnik akcentem zakładki","editor.global.header":"Pokaż nagłówek (tytuł aktywnej zakładki nad treścią)","editor.global.aria_label":"Dostępna nazwa paska zakładek","editor.global.sticky":"Przyklejony pasek zakładek","editor.global.elevation":"Unieś pasek z cieniem","editor.global.scroll_buttons":"Przyciski przewijania, gdy pasek się nie mieści","editor.global.overflow_menu":"Menu ⋯, gdy pasek się nie mieści","editor.global.bar_background":"Kolor tła paska zakładek","editor.global.swipe":"Zmiana zakładek przesunięciem (mobilne)","editor.global.swipe_mouse":"Zmiana zakładek przeciąganiem myszą (komputer)","editor.global.tab_display_narrow":"Wygląd zakładek na wąskich kartach","editor.global.narrow_width":"Wąska poniżej (px)","editor.global.split":"Podział obok siebie od szerokości (px, 0 = wył.)","editor.global.collapsible":"Zwijana (dotknij aktywnej zakładki, by zwinąć treść)","editor.global.start_collapsed":"Początkowo zwinięta","editor.global.scroll_spy":"Scroll-spy: zakładki jako sekcje jedna pod drugą","editor.global.auto_rotate":"Automatycznie zmieniaj zakładki co (sekundy, 0 = wył.)","editor.global.idle_return":"Wróć do domyślnej zakładki po bezczynności (sekundy, 0 = wył.)","editor.global.edit_mode_reveal":"Pokazuj ukryte zakładki podczas edycji dashboardu","editor.cond.visibility.label":"Widoczność","editor.cond.visibility.hint":"pokaż zakładkę tylko, gdy…","editor.cond.alert.label":"Alert","editor.cond.alert.hint":"pulsuj zakładką, gdy…","editor.cond.default_if.label":"Domyślna, gdy","editor.cond.default_if.hint":"zacznij od tej zakładki, gdy…","editor.tab_n":"Zakładka {n}","editor.copy_name":"{name} (kopia)","editor.copied":'Skopiowano zakładkę "{name}" — wklej ją w Importuj zakładkę.',"editor.clipboard_error":"Brak dostępu do schowka.","editor.import_error":"To nie wygląda na zakładkę (wymaga card, cards lub tap_action).","editor.imported_one":"Zaimportowano 1 zakładkę.","editor.imported_many":"Zaimportowano zakładki: {count}.","editor.import_hint":"Wklej zakładkę (lub listę zakładek) skopiowaną przez Kopiuj zakładkę albo dowolny YAML zakładki.","editor.add":"Dodaj","editor.cancel":"Anuluj","editor.warn_duplicates":'Powtórzone nazwy zakładek ({names}). "Zapamiętaj: url" i domyślna zakładka według nazwy mogą być niejednoznaczne.',"editor.back":"Wstecz","editor.change_type":"Zmień typ karty","editor.card_type":"Typ karty","editor.card_type_hint":"Wybierz typ karty, aby ją skonfigurować. Wpisz własny typ (np. custom:my-card) dla kart spoza listy.","editor.card_json":"Karta (JSON)","editor.invalid_json":"Nieprawidłowy JSON — nie zapisano.","editor.expand_all":"Rozwiń wszystko","editor.collapse_all":"Zwiń wszystko","editor.drag":"Przeciągnij, aby zmienić kolejność","editor.move_up":"Przenieś w górę","editor.move_down":"Przenieś w dół","editor.copy_tab":"Kopiuj zakładkę","editor.duplicate_tab":"Duplikuj zakładkę","editor.delete_tab":"Usuń zakładkę","editor.add_tab":"Dodaj zakładkę","editor.import_tab":"Importuj zakładkę","editor.edit_card":"Edytuj kartę","editor.preview":"Podgląd","editor.opt.position.top":"Góra","editor.opt.position.bottom":"Dół","editor.opt.position.left":"Lewo","editor.opt.position.right":"Prawo","editor.opt.tab_display.both":"Ikona i etykieta","editor.opt.tab_display.icon":"Tylko ikona","editor.opt.tab_display.label":"Tylko etykieta","editor.opt.tab_display.active":"Ikony; wybrana zakładka rozwinięta","editor.opt.tab_display.":"(jak wygląd zakładek)","editor.opt.align.start":"Początek","editor.opt.align.center":"Środek","editor.opt.align.end":"Koniec","editor.opt.align.justify":"Pełna szerokość","editor.opt.badge_display.text":"Tekst","editor.opt.badge_display.dot":"Kropka","editor.opt.transition.none":"Brak","editor.opt.transition.fade":"Zanikanie","editor.opt.transition.slide":"Przesunięcie","editor.opt.remember.none":"Nie zapamiętuj","editor.opt.remember.browser":"Dla przeglądarki","editor.opt.remember.url":"W adresie URL (#tab=)","editor.opt.remember.entity":"W encji pomocnika (wszystkie urządzenia)","editor.opt.scrollable.auto":"Automatycznie","editor.opt.scrollable.true":"Zawsze","editor.opt.scrollable.false":"Nigdy","check.now_met":"Spełniony teraz","check.now_unmet":"Niespełniony teraz","check.chip_hidden":"Teraz ukryta","check.chip_alert":"Alert","check.chip_hidden_title":"Warunki widoczności tej zakładki nie są spełnione, więc jest ukryta na dashboardzie.","check.state_is":"{entity} ma stan {values}","check.state_is_not":"{entity} nie ma stanu {values}","check.or":" lub ","check.now":"teraz: {value}","check.missing":"nie znaleziono encji","check.numeric":"{entity} {range}","check.above":"powyżej {value}","check.below":"poniżej {value}","check.and":" i ","check.screen":"ekran pasuje do {query}","check.time":"czas {range}","check.time_after":"po {value}","check.time_before":"przed {value}","check.time_days":"w dni: {days}","check.user":"bieżący użytkownik należy do wybranych (liczba: {count})","check.template":"szablon zwraca prawdę","check.template_pending":"szablon (oczekiwanie na Home Assistant)","check.group_and":"wszystkie z:","check.group_or":"dowolny z:","check.group_not":"żaden z:","check.unknown":"nieznany typ warunku","card.tabs":"Zakładki","card.scroll_left":"Przewiń w lewo","card.scroll_right":"Przewiń w prawo","card.all_tabs":"Wszystkie zakładki","card.badge":"plakietka: {value}","card.ghost":"Ukryta: warunki widoczności nie są spełnione (widoczna podczas edycji)","starter.button":"Zacznij od szablonu","starter.hint":"Zbuduj zestaw ze swoich encji. Zastąp usuwa bieżące zakładki; Dodaj je zachowuje.","starter.pick":"Szablon","starter.replace":"Zastąp zakładki","starter.append":"Dodaj zakładki","starter.cancel":"Anuluj","starter.none":'Nie ma czego zbudować: brak pasujących encji dla "{name}".',"starter.done":'Dodano szablon "{name}".',"starter.kind.rooms":"Pokoje: zakładka dla każdego obszaru","starter.kind.lights":"Światła: zakładka dla każdego obszaru ze światłami","starter.kind.security":"Bezpieczeństwo: alarm, kamery, drzwi i zamki","starter.kind.media":"Multimedia: zakładka dla każdego odtwarzacza","starter.kind.climate":"Klimat: zakładka dla każdego termostatu","starter.kind.energy":"Energia: karty dashboardu energii","starter.kind.family":"Rodzina: zakładka dla każdej osoby, z mapą","starter.tab.alarm":"Alarm","starter.tab.cameras":"Kamery","starter.tab.openings":"Drzwi i okna","starter.tab.locks":"Zamki","starter.tab.energy_now":"Teraz","starter.tab.energy_usage":"Zużycie","starter.tab.energy_sources":"Źródła","starter.tab.energy_devices":"Urządzenia","convert.button":"Konwertuj z innej karty","convert.hint":"Wklej YAML karty tabbed-card, swipe-card, state-switch, stosu pionowego/poziomego lub siatki, wyskakujących okienek Bubble Card, karty warunkowej, widoku sekcji lub całego dashboardu.","convert.detected":"Wykryto {source}. Zakładki: {count}.","convert.replace":"Zastąp zakładki","convert.append":"Dodaj zakładki","convert.cancel":"Anuluj","convert.done":"Skonwertowano z {source}. Zakładki: {count}.","convert.error.empty":"Na tej liście nie ma nic do konwersji.","convert.error.not_card":"To nie wygląda na kartę, listę kart, widok ani dashboard.","convert.error.no_tabs":"Nic do konwersji: nie znaleziono kart.","convert.source.tabdeck":"karta Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"wyskakujące okienka Bubble Card","convert.source.dashboard":"dashboard (zakładka na każdy widok)","convert.source.view":"widok","convert.source.sections":"widok sekcji (zakładka na każdą sekcję)","convert.source.stack":"stos (zakładka na każdą kartę lub nagłówek)","convert.source.cards":"karty","convert.note.styles":"Przeniesiono tylko --mdc-theme-primary (jako --tabdeck-accent); pozostałe style tabbed-card nie mają odpowiednika w Tabdeck.","convert.note.tab_styles":"Style poszczególnych zakładek z tabbed-card nie zostały przeniesione.","convert.note.autoplay":"Autoplay zamieniono na auto_rotate (sekundy).","convert.note.state_switch_mode":"Ten tryb state-switch (użytkownik / media query / szablon) nie ma bezpośredniego odpowiednika; stany stały się zwykłymi zakładkami. W razie potrzeby dodaj warunki widoczności.","convert.note.bubble":"Każde wyskakujące okienko stało się zakładką; jego własny przycisk i styl nie są używane.","convert.note.dashboard":"Każdy widok stał się zakładką. Duże dashboardy mogą dać ciężką kartę; rozważ lazy: true.","editor.global.dock":"Dock: przypnij pasek do dołu ekranu (nawigacja jak w telefonie)","editor.tab.fab":"Styl pływającego przycisku akcji","editor.global.content_arrows":"Strzałki poprzednia / następna nad zawartością","editor.opt.tab_display.dots":"Kropki","card.prev_tab":"Poprzednia zakładka","card.next_tab":"Następna zakładka","editor.global.search":"Szybkie wyszukiwanie (przycisk 🔍)","editor.global.hotkeys":"Skróty klawiaturowe (1–9, [ ], /)","card.search":"Znajdź zakładkę","card.search_placeholder":"Wpisz, aby filtrować…","card.search_none":"Brak pasujących zakładek","editor.global.history":"Przycisk Wstecz wraca do poprzedniej zakładki"}}),la=ce(()=>{ea={"editor.tab.name":"Nome do separador","editor.tab.subtitle":"Subtítulo","editor.tab.icon":"Ícone","editor.tab.accent":"Cor de destaque","editor.tab.color":"Cor do texto/ícone","editor.tab.badge":"Distintivo (id de entidade ou modelo)","editor.tab.badge_color":"Cor do distintivo","editor.tab.disabled":"Desativar separador (esbatido, não selecionável)","editor.tab.card_size":"Tamanho indicativo do cartão (linhas)","editor.tab.hold_action":"Ação ao manter premido","editor.tab.badge_action":"Ação ao tocar no distintivo","editor.tab.tap_action":"Ação ao tocar (em vez de abrir o separador, p. ex. navegar)","editor.tab.enter_action":"Ação ao abrir este separador","editor.tab.leave_action":"Ação ao sair deste separador","editor.global.preset":"Estilo predefinido (aplica um conjunto das opções abaixo)","editor.global.position":"Posição","editor.global.style":"Estilo","editor.global.tab_display":"Apresentação dos separadores","editor.global.align":"Alinhamento dos separadores","editor.global.badge_display":"Apresentação dos distintivos","editor.global.hide_inactive_badge":"Ocultar distintivos inativos (0/off)","editor.global.transition":"Transição do conteúdo","editor.global.indicator_size":"Espessura do indicador (px)","editor.global.indicator_radius":"Raio dos cantos do indicador (px)","editor.global.remember":"Lembrar o separador selecionado","editor.global.remember_entity":"Entidade para lembrar (input_number/input_text)","editor.global.storage_key":"Chave de armazenamento (modo navegador)","editor.global.default_tab":"Separador predefinido","editor.global.scrollable":"Deslocável","editor.global.lazy":"Carregamento diferido dos separadores inativos","editor.global.unmount_hidden":"Descarregar separadores ocultos (poupa memória)","editor.global.swipe_wrap":"Deslizar de forma circular","editor.global.animated":"Animar indicador","editor.global.accent_indicator":"Colorir indicador com o destaque do separador","editor.global.header":"Mostrar cabeçalho (título do separador ativo acima do conteúdo)","editor.global.aria_label":"Nome acessível da barra de separadores","editor.global.sticky":"Barra de separadores fixa","editor.global.elevation":"Elevar barra com sombra","editor.global.scroll_buttons":"Botões de deslocamento quando a barra não cabe","editor.global.overflow_menu":"Menu ⋯ quando a barra não cabe","editor.global.bar_background":"Cor de fundo da barra de separadores","editor.global.swipe":"Deslizar para mudar de separador (telemóvel)","editor.global.swipe_mouse":"Arrastar com o rato para mudar de separador (computador)","editor.global.tab_display_narrow":"Apresentação dos separadores em cartões estreitos","editor.global.narrow_width":"Estreito abaixo de (px)","editor.global.split":"Vista dividida a partir desta largura (px, 0 = desligado)","editor.global.collapsible":"Recolhível (toque no separador ativo para recolher o conteúdo)","editor.global.start_collapsed":"Iniciar recolhido","editor.global.scroll_spy":"Scroll-spy: empilhar separadores como secções","editor.global.auto_rotate":"Rodar separadores automaticamente a cada (segundos, 0 = desligado)","editor.global.idle_return":"Voltar ao separador predefinido após inatividade (segundos, 0 = desligado)","editor.global.edit_mode_reveal":"Mostrar separadores ocultos ao editar o painel","editor.cond.visibility.label":"Visibilidade","editor.cond.visibility.hint":"mostrar o separador apenas quando…","editor.cond.alert.label":"Alerta","editor.cond.alert.hint":"fazer pulsar o separador quando…","editor.cond.default_if.label":"Predefinido quando","editor.cond.default_if.hint":"começar neste separador quando…","editor.tab_n":"Separador {n}","editor.copy_name":"Cópia de {name}","editor.copied":'Separador "{name}" copiado: cole-o em Importar separador.',"editor.clipboard_error":"Não foi possível aceder à área de transferência.","editor.import_error":"Isso não parece um separador (requer card, cards ou tap_action).","editor.imported_one":"1 separador importado.","editor.imported_many":"{count} separadores importados.","editor.import_hint":"Cole um separador (ou uma lista de separadores) copiado com Copiar separador, ou qualquer YAML de separador.","editor.add":"Adicionar","editor.cancel":"Cancelar","editor.warn_duplicates":'Nomes de separador duplicados ({names}). "Remember: url" e o separador predefinido por nome podem ser ambíguos.',"editor.back":"Voltar","editor.change_type":"Alterar tipo de cartão","editor.card_type":"Tipo de cartão","editor.card_type_hint":"Escolha um tipo de cartão para o configurar. Introduza um tipo personalizado (p. ex. custom:my-card) para cartões que não estejam na lista.","editor.card_json":"Cartão (JSON)","editor.invalid_json":"JSON inválido: não foi guardado.","editor.expand_all":"Expandir tudo","editor.collapse_all":"Recolher tudo","editor.drag":"Arrastar para reordenar","editor.move_up":"Mover para cima","editor.move_down":"Mover para baixo","editor.copy_tab":"Copiar separador","editor.duplicate_tab":"Duplicar separador","editor.delete_tab":"Eliminar separador","editor.add_tab":"Adicionar separador","editor.import_tab":"Importar separador","editor.edit_card":"Editar cartão","editor.preview":"Pré-visualização","editor.opt.position.top":"Topo","editor.opt.position.bottom":"Fundo","editor.opt.position.left":"Esquerda","editor.opt.position.right":"Direita","editor.opt.tab_display.both":"Ícone e etiqueta","editor.opt.tab_display.icon":"Apenas ícone","editor.opt.tab_display.label":"Apenas etiqueta","editor.opt.tab_display.active":"Ícones; separador selecionado expandido","editor.opt.tab_display.":"(igual à apresentação dos separadores)","editor.opt.align.start":"Início","editor.opt.align.center":"Centro","editor.opt.align.end":"Fim","editor.opt.align.justify":"Largura total","editor.opt.badge_display.text":"Texto","editor.opt.badge_display.dot":"Ponto","editor.opt.transition.none":"Nenhuma","editor.opt.transition.fade":"Desvanecer","editor.opt.transition.slide":"Deslizar","editor.opt.remember.none":"Não lembrar","editor.opt.remember.browser":"Por navegador","editor.opt.remember.url":"No URL (#tab=)","editor.opt.remember.entity":"Numa entidade auxiliar (todos os dispositivos)","editor.opt.scrollable.auto":"Automático","editor.opt.scrollable.true":"Sempre","editor.opt.scrollable.false":"Nunca","check.now_met":"Cumprida agora","check.now_unmet":"Não cumprida agora","check.chip_hidden":"Oculto agora","check.chip_alert":"Em alerta","check.chip_hidden_title":"As condições de visibilidade deste separador não são cumpridas, por isso está oculto no painel.","check.state_is":"{entity} é {values}","check.state_is_not":"{entity} não é {values}","check.or":" ou ","check.now":"agora: {value}","check.missing":"entidade não encontrada","check.numeric":"{entity} {range}","check.above":"acima de {value}","check.below":"abaixo de {value}","check.and":" e ","check.screen":"o ecrã corresponde a {query}","check.time":"hora {range}","check.time_after":"depois das {value}","check.time_before":"antes das {value}","check.time_days":"em {days}","check.user":"o utilizador atual é um dos {count} selecionados","check.template":"o modelo devolve true","check.template_pending":"modelo (a aguardar o Home Assistant)","check.group_and":"todas:","check.group_or":"qualquer uma:","check.group_not":"nenhuma:","check.unknown":"tipo de condição desconhecido","card.tabs":"Separadores","card.scroll_left":"Deslocar para a esquerda","card.scroll_right":"Deslocar para a direita","card.all_tabs":"Todos os separadores","card.badge":"distintivo: {value}","card.ghost":"Oculto: as condições de visibilidade não são cumpridas (visível ao editar)","starter.button":"Começar a partir de um modelo","starter.hint":"Crie um conjunto de separadores a partir das suas entidades. Substituir troca os separadores atuais; Adicionar mantém-nos.","starter.pick":"Modelo","starter.replace":"Substituir separadores","starter.append":"Adicionar separadores","starter.cancel":"Cancelar","starter.none":'Nada para criar: não foram encontradas entidades para "{name}".',"starter.done":'Modelo "{name}" adicionado.',"starter.kind.rooms":"Divisões: um separador por área","starter.kind.lights":"Luzes: um separador por área com luzes","starter.kind.security":"Segurança: alarme, câmaras, portas e fechaduras","starter.kind.media":"Multimédia: um separador por leitor multimédia","starter.kind.climate":"Climatização: um separador por termóstato","starter.kind.energy":"Energia: os cartões do painel de energia","starter.kind.family":"Família: um separador por pessoa, com mapa","starter.tab.alarm":"Alarme","starter.tab.cameras":"Câmaras","starter.tab.openings":"Portas e janelas","starter.tab.locks":"Fechaduras","starter.tab.energy_now":"Agora","starter.tab.energy_usage":"Consumo","starter.tab.energy_sources":"Fontes","starter.tab.energy_devices":"Dispositivos","convert.button":"Converter a partir de outro cartão","convert.hint":"Cole o YAML de um tabbed-card, swipe-card, state-switch, uma pilha vertical/horizontal ou grelha, pop-ups do Bubble Card, um cartão condicional, uma vista de secções ou um painel completo.","convert.detected":"Detetado {source}: {count} separadores.","convert.replace":"Substituir separadores","convert.append":"Adicionar separadores","convert.cancel":"Cancelar","convert.done":"{count} separadores convertidos a partir de {source}.","convert.error.empty":"Não há nada para converter nessa lista.","convert.error.not_card":"Isso não parece um cartão, uma lista de cartões, uma vista nem um painel.","convert.error.no_tabs":"Nada para converter: não foram encontrados cartões.","convert.source.tabdeck":"um cartão Tabdeck","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"pop-ups do Bubble Card","convert.source.dashboard":"um painel (um separador por vista)","convert.source.view":"uma vista","convert.source.sections":"uma vista de secções (um separador por secção)","convert.source.stack":"uma pilha (um separador por cartão ou cabeçalho)","convert.source.cards":"cartões","convert.note.styles":"Apenas --mdc-theme-primary foi transferido (como --tabdeck-accent); os outros estilos do tabbed-card não têm equivalente no Tabdeck.","convert.note.tab_styles":"Os estilos por separador do tabbed-card não foram transferidos.","convert.note.autoplay":"Autoplay passou a auto_rotate (segundos).","convert.note.state_switch_mode":"Este modo do state-switch (utilizador / media query / modelo) não tem equivalente direto; os estados passaram a separadores simples. Adicione condições de visibilidade se necessário.","convert.note.bubble":"Cada pop-up passou a um separador; o botão e o estilo próprios do pop-up não são usados.","convert.note.dashboard":"Cada vista passou a um separador. Painéis grandes podem gerar um cartão pesado; considere lazy: true.","editor.global.dock":"Dock: fixar a barra no fundo do ecrã (navegação de telemóvel)","editor.tab.fab":"Estilo de botão de ação flutuante","editor.global.content_arrows":"Setas anterior / seguinte sobre o conteúdo","editor.opt.tab_display.dots":"Pontos","card.prev_tab":"Separador anterior","card.next_tab":"Separador seguinte","editor.global.search":"Pesquisa rápida (botão 🔍)","editor.global.hotkeys":"Atalhos de teclado (1–9, [ ], /)","card.search":"Procurar um separador","card.search_placeholder":"Escreva para filtrar…","card.search_none":"Nenhum separador corresponde","editor.global.history":"O botão Voltar regressa ao separador anterior"}});function pa(e){return String(e?.locale?.language??e?.language??"en")}function ba(e,t,a){let o=ta[function(e){if(ta[e])return e;const t=e.split(/[-_]/)[0].toLowerCase();return ta[t]?t:"en"}(e)][t]??Wt[t]??t;if(a)for(const[i,r]of Object.entries(a))o=o.split(`{${i}}`).join(String(r));return o}function ha(e){return e in Wt}var ua,ma=ce(()=>{oa(),ia(),ra(),na(),sa(),da(),ca(),la(),ta={en:Wt,de:Zt,es:Gt,fr:Jt,it:Yt,nl:Xt,pl:Qt,pt:ea}});aa(),ma();var _a=ce(()=>{ua=3});function ga(e,t,a,o){var i,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(r<3?i(n):r>3?i(t,a,n):i(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n}var va,ya,fa=ce(()=>{});function ka(e){if(null==e)return!1;const t=String(e).trim().toLowerCase();return(""===t||0!==Number(t))&&!va.has(t)}var wa,xa,$a=ce(()=>{fa(),va=/* @__PURE__ */new Set(["","0","off","false","no","none","unavailable","unknown","closed"]),ya=class extends _e{constructor(...e){super(...e),this.badgeAction=!1,this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1,this.alert=!1,this.action=!1,this.ghost=!1,this.stacked=!1,this.fab=!1,this.hasMenu=!1,this.ghostLabel="Hidden: its visibility conditions aren't met (shown while editing)",this._onKeydown=e=>{!this.action||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab"),this.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),super.disconnectedCallback()}updated(){this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected||this.action?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color"),this.ghost?this.title=this.ghostLabel:this.removeAttribute("title"),"dots"===this.display&&this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")}render(){if("dots"===this.display)return F`<span class="dot" part="dot"></span>`;const e="active"===this.display?this.selected?"both":"icon":this.display,t=!!this.icon,a="icon"!==e||!t;return F`
      <div class="inner">
        ${"label"!==e&&t?F`<ha-icon icon=${this.icon}></ha-icon>`:Z}
        ${a&&this.label?F`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?F`<span class="subtitle">${this.subtitle}</span>`:Z}
            </span>`:Z}
        ${this._renderBadge()}
        ${this.hasMenu?F`<span class="caret" aria-hidden="true">▾</span>`:Z}
        ${this.ghost?F`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`:Z}
      </div>
    `}_onBadgeClick(e){this.badgeAction&&(e.stopPropagation(),this.dispatchEvent(new CustomEvent("badge-click",{bubbles:!0,composed:!0})))}_renderBadge(){const e=this.badgeColor?`background:${this.badgeColor}`:"",t=this.badgeAction?" clickable":"";return"dot"===this.badgeDisplay?ka(this.badge)?F`<span class="badge-dot${t}" part="badge-dot" style=${e} @click=${this._onBadgeClick}></span>`:Z:this.badge?F`<span
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
  `}},ga([Ae()],ya.prototype,"label",void 0),ga([Ae()],ya.prototype,"subtitle",void 0),ga([Ae()],ya.prototype,"icon",void 0),ga([Ae()],ya.prototype,"badge",void 0),ga([Ae()],ya.prototype,"badgeColor",void 0),ga([Ae({type:Boolean})],ya.prototype,"badgeAction",void 0),ga([Ae()],ya.prototype,"badgeDisplay",void 0),ga([Ae()],ya.prototype,"accent",void 0),ga([Ae()],ya.prototype,"color",void 0),ga([Ae({reflect:!0})],ya.prototype,"display",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"selected",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"disabled",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"alert",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"action",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"ghost",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"stacked",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"fab",void 0),ga([Ae({type:Boolean,reflect:!0})],ya.prototype,"hasMenu",void 0),ga([Ae()],ya.prototype,"ghostLabel",void 0),ga([Ae()],ya.prototype,"badgeLabel",void 0),ya=ga([ve("tabdeck-tab")],ya)}),za=ce(()=>{$e(),Fe(),_a(),$a(),fa(),wa=class extends _e{constructor(...e){super(...e),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this.scrollButtons=!1,this.overflowMenu=!1,this._menuOpen=!1,this._groupOpen=-1,this._groupLeft=0,this.collapsed=!1,this.language="en",this.searchable=!1,this._searchOpen=!1,this._query="",this._active=0,this.dock=!1,this._ready=!1,this._overflow=!1,this._resizeRaf=0,this._suppressClick=!1,this._onSearchOutside=e=>{const t=this.renderRoot.querySelector(".search-panel"),a=this.renderRoot.querySelector(".search-btn"),o=e.composedPath();t&&o.includes(t)||a&&o.includes(a)||this._closeSearch()},this._onOutside=e=>{const t=this.renderRoot.querySelector(".group-menu");if(t&&e.composedPath().includes(t))return;const a=this.renderRoot.querySelectorAll("tabdeck-tab");e.composedPath().includes(a[this._groupOpen])||this._closeGroup()},this._onKeydown=e=>{const t="left"===this.position||"right"===this.position,a=t?"ArrowDown":"ArrowRight",o=t?"ArrowUp":"ArrowLeft";let i=null;e.key===a?i=this._step(this.selected,1):e.key===o?i=this._step(this.selected,-1):"Home"===e.key?i=this._firstEnabled():"End"===e.key&&(i=this._firstEnabled(!0)),null!==i&&(e.preventDefault(),this._select(i))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.setAttribute("aria-label",this.barLabel||ba(this.language,"card.tabs")),this.addEventListener("keydown",this._onKeydown),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0,this._position()}))}))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),window.removeEventListener("pointerdown",this._onOutside,!0),window.removeEventListener("pointerdown",this._onSearchOutside,!0),this._resizeObserver?.disconnect(),super.disconnectedCallback()}_select(e){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:e},bubbles:!0,composed:!0}))}_emitAction(e,t){this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:e,kind:t},bubbles:!0,composed:!0}))}_onPointerDown(e){this._suppressClick=!1,this.items[e]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._suppressClick=!0,this._emitAction(e,"hold")},500))}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(e,t){this._cancelHold(),this._suppressClick?this._suppressClick=!1:this.items[e]?.menu?.length?this._toggleGroup(e,t?.currentTarget):this._select(e)}_matches(e){const t=e=>(e??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),a=t(e).trim();return this.items.map((e,t)=>({index:t,item:e})).filter(({item:e})=>!e.disabled).filter(({item:e})=>!a||t(e.name).includes(a)||t(e.subtitle).includes(a))}openSearch(){this._query="",this._active=0,this._searchOpen=!0,window.addEventListener("pointerdown",this._onSearchOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeSearch(){this._searchOpen=!1,window.removeEventListener("pointerdown",this._onSearchOutside,!0)}_pickSearch(e){this._closeSearch(),this._select(e)}_onSearchKeydown(e){e.stopPropagation();const t=this._matches(this._query);if("Escape"===e.key)this._closeSearch();else if("Enter"===e.key){e.preventDefault();const a=t[this._active]??t[0];a&&this._pickSearch(a.index)}else if("ArrowDown"===e.key||"ArrowUp"===e.key){e.preventDefault();const a=t.length||1;this._active=(this._active+("ArrowDown"===e.key?1:-1)+a)%a}}_renderSearch(){const e=this._matches(this._query),t=this.language;return F`<div class="search-panel" role="dialog" aria-label=${ba(t,"card.search")}>
      <input
        class="search-input"
        type="search"
        placeholder=${ba(t,"card.search_placeholder")}
        aria-label=${ba(t,"card.search")}
        .value=${this._query}
        @input=${e=>{this._query=e.target.value,this._active=0}}
        @keydown=${e=>this._onSearchKeydown(e)}
      />
      <div class="search-results" role="listbox">
        ${e.length?e.map((e,t)=>F`<button
                class="group-item ${t===this._active?"active":""}"
                role="option"
                aria-selected=${t===this._active?"true":"false"}
                @click=${()=>this._pickSearch(e.index)}
              >
                ${e.item.icon?F`<ha-icon .icon=${e.item.icon}></ha-icon>`:""}<span>${e.item.name??""}</span>
              </button>`):F`<div class="search-empty">${ba(t,"card.search_none")}</div>`}
      </div>
    </div>`}_toggleGroup(e,t){if(this._groupOpen===e)return void this._closeGroup();const a=this.renderRoot.querySelector(".bar");this._groupLeft=t?t.offsetLeft-(a?.scrollLeft??0):0,this._groupOpen=e,window.addEventListener("pointerdown",this._onOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".group-item")?.focus())}_closeGroup(){this._groupOpen=-1,window.removeEventListener("pointerdown",this._onOutside,!0)}_pickChild(e,t){this._closeGroup(),this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:e,child:t},bubbles:!0,composed:!0}))}_onGroupKeydown(e){const t=[...this.renderRoot.querySelectorAll(".group-item")],a=t.indexOf(e.composedPath()[0]);if("Escape"===e.key){e.stopPropagation();const t=this.renderRoot.querySelectorAll("tabdeck-tab")[this._groupOpen];this._closeGroup(),t?.focus()}else if("ArrowDown"===e.key||"ArrowUp"===e.key){e.preventDefault(),e.stopPropagation();const o=t.length;t[(a+("ArrowDown"===e.key?1:-1)+o)%o]?.focus()}}_renderGroupMenu(){const e=this.items[this._groupOpen];if(!e?.menu)return"";const t=this._groupOpen;return F`<div
      class="group-menu"
      role="menu"
      style="left:${this._groupLeft}px"
      @keydown=${e=>this._onGroupKeydown(e)}
    >
      ${e.menu.map(e=>F`<button class="group-item" role="menuitem" @click=${()=>this._pickChild(t,e.name)}>
          ${e.icon?F`<ha-icon .icon=${e.icon}></ha-icon>`:""}<span>${e.name??""}</span>
        </button>`)}
    </div>`}_selectable(e){const t=this.items[e];return!!t&&!t.disabled&&!t.action}_step(e,t){const a=this.items.length;for(let o=1;o<=a;o++){const i=(e+t*o+a*o)%a;if(this._selectable(i))return i}return e}_firstEnabled(e=!1){const t=this.items.length;for(let a=0;a<t;a++){const o=e?t-1-a:a;if(this._selectable(o))return o}return 0}_position(){const e=this.renderRoot,t=e?.querySelector(".indicator");if(!t)return;const a=(e?.querySelectorAll("tabdeck-tab"))?.[this.selected],o=a?function(e,t,a,o=ua){if(!e||e.offsetWidth<=0)return null;const i=o>0?o:ua;if("text"===a)return null;if("pill"===a||"segmented"===a||"boxed"===a||"rail"===a)return{left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight};switch(t){case"top":return{left:e.offsetLeft,top:e.offsetTop+e.offsetHeight-i,width:e.offsetWidth,height:i};case"bottom":return{left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:i};case"left":return{left:e.offsetLeft+e.offsetWidth-i,top:e.offsetTop,width:i,height:e.offsetHeight};case"right":return{left:e.offsetLeft,top:e.offsetTop,width:i,height:e.offsetHeight}}}({offsetLeft:a.offsetLeft,offsetTop:a.offsetTop,offsetWidth:a.offsetWidth,offsetHeight:a.offsetHeight},this.position,this.tabStyle,this.indicatorSize):null;o?(t.style.left=`${o.left}px`,t.style.top=`${o.top}px`,t.style.width=`${o.width}px`,t.style.height=`${o.height}px`,t.style.opacity="1"):t.style.opacity="0"}_applyAccent(){const e=this.accentIndicator?this.items[this.selected]?.accent:void 0;e?this.style.setProperty("--tabdeck-accent",e):this.style.removeProperty("--tabdeck-accent"),null!=this.indicatorRadius?this.style.setProperty("--tabdeck-indicator-radius",`${this.indicatorRadius}px`):this.style.removeProperty("--tabdeck-indicator-radius")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background=this.barBackground?"transparent":"var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.setProperty("top","var(--tabdeck-sticky-top, var(--header-height, 0px))"),this.style.bottom="");else for(const e of["position","zIndex","background","top","bottom"])this.style.removeProperty(e.replace(/[A-Z]/g,e=>"-"+e.toLowerCase()))}firstUpdated(){const e=this.renderRoot.querySelector(".bar");e&&this._resizeObserver&&this._resizeObserver.observe(e)}updated(){this.setAttribute("aria-label",this.barLabel||ba(this.language,"card.tabs")),this._applyAccent(),this._applySticky(),this._position();const e=[...this.renderRoot.querySelectorAll("tabdeck-tab")];Promise.all(e.map(e=>e.updateComplete)).then(()=>this._position()),this._updateOverflow(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}get _horizontal(){return"top"===this.position||"bottom"===this.position}_updateOverflow(){if(!this.scrollButtons&&!this.overflowMenu||!this._horizontal)return void(this._overflow&&(this._overflow=!1));const e=this.renderRoot.querySelector(".bar"),t=!!e&&e.scrollWidth-e.clientWidth>1;t!==this._overflow&&(this._overflow=t)}_scrollBy(e){const t=this.renderRoot.querySelector(".bar");t&&t.scrollBy({left:e*t.clientWidth*.8,behavior:"smooth"})}_pickFromMenu(e){this._menuOpen=!1,this.items[e]?.disabled||this._select(e)}render(){const e=this._ready&&this.animated?" animate":"",t=this.scrollButtons&&this._horizontal&&this._overflow,a=this.overflowMenu&&this._horizontal&&this._overflow;return F`
      <div class="bar-wrap ${t||a||this.searchable?"has-arrows":""}">
      ${t?F`<button class="scroll-btn left" aria-label=${ba(this.language,"card.scroll_left")} @click=${()=>this._scrollBy(-1)}>‹</button>`:""}
      <div
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation?"elevated":""} ${"dots"===this.display?"dots":""}"
        part="bar"
        style=${this.barBackground?`background:${this.barBackground}`:""}
      >
        <div class="indicator${e}" part="indicator"></div>
        ${this.items.map((e,t)=>F`
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
              .hasMenu=${!!e.menu?.length}
              aria-haspopup=${e.menu?.length?"menu":"false"}
              aria-expanded=${e.menu?.length?String(this._groupOpen===t):"false"}
              .stacked=${this.dock}
              .ghostLabel=${ba(this.language,"card.ghost")}
              .badgeLabel=${ba(this.language,"card.badge",{value:e.badge??""})}
              .display=${this.display}
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
      ${this.searchable?F`<button
            class="search-btn"
            aria-label=${ba(this.language,"card.search")}
            aria-expanded=${this._searchOpen?"true":"false"}
            @click=${()=>this._searchOpen?this._closeSearch():this.openSearch()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
          </button>`:""}
      ${this._searchOpen?this._renderSearch():""}
      ${t?F`<button class="scroll-btn right" aria-label=${ba(this.language,"card.scroll_right")} @click=${()=>this._scrollBy(1)}>›</button>`:""}
      ${a?F`<button
              class="overflow-btn"
              aria-label=${ba(this.language,"card.all_tabs")}
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${()=>this._menuOpen=!this._menuOpen}
            >
              ⋯
            </button>
            ${this._menuOpen?F`<div class="overflow-menu" role="menu">
                  ${this.items.map((e,t)=>F`<button
                      class="overflow-item ${t===this.selected?"current":""}"
                      role="menuitem"
                      ?disabled=${e.disabled}
                      @click=${()=>this._pickFromMenu(t)}
                    >
                      ${e.name??ba(this.language,"editor.tab_n",{n:t+1})}
                    </button>`)}
                </div>`:""}`:""}
      </div>
    `}static{this.styles=n`
    :host {
      display: block;
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
  `}},ga([Ae({attribute:!1})],wa.prototype,"items",void 0),ga([Ae({type:Number})],wa.prototype,"selected",void 0),ga([Ae()],wa.prototype,"position",void 0),ga([Ae()],wa.prototype,"tabStyle",void 0),ga([Ae()],wa.prototype,"display",void 0),ga([Ae()],wa.prototype,"align",void 0),ga([Ae()],wa.prototype,"badgeDisplay",void 0),ga([Ae()],wa.prototype,"scrollable",void 0),ga([Ae({type:Boolean})],wa.prototype,"animated",void 0),ga([Ae({type:Boolean})],wa.prototype,"accentIndicator",void 0),ga([Ae({type:Number})],wa.prototype,"indicatorSize",void 0),ga([Ae({type:Number})],wa.prototype,"indicatorRadius",void 0),ga([Ae({type:Boolean})],wa.prototype,"sticky",void 0),ga([Ae({type:Boolean})],wa.prototype,"elevation",void 0),ga([Ae({type:Boolean})],wa.prototype,"scrollButtons",void 0),ga([Ae({type:Boolean})],wa.prototype,"overflowMenu",void 0),ga([Te()],wa.prototype,"_menuOpen",void 0),ga([Te()],wa.prototype,"_groupOpen",void 0),ga([Ae({type:Boolean,reflect:!0})],wa.prototype,"collapsed",void 0),ga([Ae()],wa.prototype,"barLabel",void 0),ga([Ae()],wa.prototype,"language",void 0),ga([Ae()],wa.prototype,"barBackground",void 0),ga([Ae({type:Boolean})],wa.prototype,"searchable",void 0),ga([Te()],wa.prototype,"_searchOpen",void 0),ga([Te()],wa.prototype,"_query",void 0),ga([Te()],wa.prototype,"_active",void 0),ga([Ae({type:Boolean,reflect:!0})],wa.prototype,"dock",void 0),ga([Te()],wa.prototype,"_ready",void 0),ga([Te()],wa.prototype,"_overflow",void 0),wa=ga([ve("tabdeck-tabbar")],wa)});function Aa(e,t,a){const o=String(e?.condition??"unknown"),i=Mt(e,t,a),r=e?.entity?t.states?.[e.entity]:void 0,n=e?.entity?{entity:String(e.entity),current:r?.state,missing:!r}:{};switch(o){case"state":{const t=void 0===e.state&&void 0!==e.state_not;return{type:o,met:i,...n,negate:t,expected:xa(t?e.state_not:e.state)}}case"numeric_state":return{type:o,met:i,...n,above:void 0===e.above?void 0:Number(e.above),below:void 0===e.below?void 0:Number(e.below)};case"screen":return{type:o,met:i,media_query:e.media_query};case"time":return{type:o,met:i,after:e.after,before:e.before,weekday:Array.isArray(e.weekday)?e.weekday.map(String):void 0};case"user":return{type:o,met:i,count:Array.isArray(e.users)?e.users.length:0};case"template":return{type:o,met:i,pending:!a||void 0===a(e.value_template)};case"and":case"or":case"not":return{type:o,met:i,children:(Array.isArray(e.conditions)?e.conditions:[]).map(e=>Aa(e,t,a))};default:return{type:"unknown",met:!1}}}function Sa(e,t,a){const o=(Array.isArray(e)?e:[]).map(e=>Aa(e,t,a));return{met:o.every(e=>e.met),items:o}}var Ta,Ca,ja,Ea,Oa,Na,Pa,La=ce(()=>{xa=e=>Array.isArray(e)?e.map(String):[String(e)]});function Ma(e){return Object.keys(e?.areas??{}).length}function Ia(e,t,a=Ca){switch(e){case"rooms":return{tabs:[],auto_tabs:{source:"areas"},options:{scrollable:!0,overflow_menu:!0},count:Ma(t)};case"lights":return{tabs:[],auto_tabs:{source:"areas",domains:["light"]},options:{scrollable:!0},count:Ea(t,"light").length};case"security":return function(e,t){const a=Ea(e,"camera"),o=Ea(e,"alarm_control_panel"),i=Ea(e,"lock"),r=Ea(e,"binary_sensor").filter(t=>Pa.includes(Na(e,t,"device_class"))),n=[];return o.length&&n.push({name:t("starter.tab.alarm"),icon:"mdi:shield-home",cards:o.map(e=>({type:"alarm-panel",entity:e})),alert:[{condition:"state",entity:o[0],state:"triggered"}]}),a.length&&n.push({name:t("starter.tab.cameras"),icon:"mdi:cctv",columns:a.length>1?2:void 0,cards:a.slice(0,ja).map(e=>({type:"picture-entity",entity:e,show_state:!1}))}),r.length&&n.push({name:t("starter.tab.openings"),icon:"mdi:door-open",badge:`{{ ${JSON.stringify(r).replace(/"/g,"'")} | select('is_state', 'on') | list | count }}`,card:{type:"entities",entities:r}}),i.length&&n.push({name:t("starter.tab.locks"),icon:"mdi:lock",cards:i.map(e=>({type:"tile",entity:e}))}),{tabs:n,options:{hide_inactive_badge:!0},count:a.length+o.length+i.length+r.length}}(t,a);case"media":return function(e){const t=Ea(e,"media_player");return{tabs:t.slice(0,ja).map(t=>({name:Oa(e,t),icon:"tv"===Na(e,t,"device_class")?"mdi:television":"mdi:speaker",subtitle:`{{ states('${t}') }}`,card:{type:"media-control",entity:t}})),options:{tab_display:"active",scrollable:!0},count:t.length}}(t);case"climate":return function(e){const t=Ea(e,"climate");return{tabs:t.slice(0,ja).map(t=>({name:Oa(e,t),icon:"mdi:thermostat",badge:`{{ state_attr('${t}', 'current_temperature') }}`,badge_format:{precision:1,unit:"°"},card:{type:"thermostat",entity:t}})),count:t.length}}(t);case"energy":return function(e){return{tabs:[{name:e("starter.tab.energy_now"),icon:"mdi:lightning-bolt",card:{type:"energy-distribution",link_dashboard:!0}},{name:e("starter.tab.energy_usage"),icon:"mdi:chart-bar",card:{type:"energy-usage-graph"}},{name:e("starter.tab.energy_sources"),icon:"mdi:table",card:{type:"energy-sources-table"}},{name:e("starter.tab.energy_devices"),icon:"mdi:devices",card:{type:"energy-devices-graph"}}],options:{lazy:!0},count:1}}(a);case"family":return function(e){const t=Ea(e,"person");return{tabs:t.slice(0,ja).map(t=>({name:Oa(e,t),icon:"mdi:account",subtitle:`{{ states('${t}') | replace('_', ' ') }}`,cards:[{type:"tile",entity:t},{type:"map",entities:[t],hours_to_show:12}]})),count:t.length}}(t)}}var Da,Ra,Ba,Va,Ha,qa,Ka=ce(()=>{ma(),Ta=["rooms","lights","security","media","climate","energy","family"],Ca=e=>ba("en",e),ja=12,Ea=(e,t)=>Object.keys(e?.states??{}).filter(e=>e.startsWith(`${t}.`)).sort(),Oa=(e,t)=>e?.states?.[t]?.attributes?.friendly_name??t.split(".")[1].replace(/_/g," "),Na=(e,t,a)=>e?.states?.[t]?.attributes?.[a],Pa=["door","window","garage_door","opening"]});function Ua(e){const t=e.replace(/^custom:/,"").replace(/[-_]/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}function Fa(e,t,a=0){const o=function(e){if("string"==typeof e?.entity)return e.entity;const t=Array.isArray(e?.entities)?e.entities[0]:void 0;return"string"==typeof t?t:Ba(t)&&"string"==typeof t.entity?t.entity:void 0}(e),i=e?.title??e?.name??e?.heading??(o?t?.states?.[o]?.attributes?.friendly_name??Ua(o.split(".")[1]??o):void 0)??(e?.type?Ua(String(e.type)):`Tab ${a+1}`),r=("string"==typeof e?.icon?e.icon:void 0)??Da[Va(e)]??(o?Ra[o.split(".")[0]]:void 0);return{name:String(i),icon:r}}function Wa(e){if(Array.isArray(e)&&0!==e.length)return e.map(e=>{if(!Ba(e)||e.condition)return e;const t={condition:"state",entity:e.entity};return void 0!==e.state&&(t.state=e.state),void 0!==e.state_not&&(t.state_not=e.state_not),t})}function Za(e,t,a,o){let i=e,r=Wa(e?.visibility);if("conditional"===Va(e)&&Ba(e.card))i=e.card,r=Wa(e.conditions);else if(r){const{visibility:t,...a}=e;i=a}const n=Fa(i,t,a),s={name:o?.name??n.name,card:i},d=o?.icon??n.icon;return d&&(s.icon=d),r&&(s.visibility=r),s}function Ga(e,t,a,o,i){if(0===e.length)return;if(1===e.length)return Za(e[0],t,a,o?{name:o,icon:i}:void 0);const r={name:o??Fa(e[0],t,a).name,cards:e},n=i??Fa(e[0],t,a).icon;return n&&(r.icon=n),r}function Ja(e,t){if(!e.some(Ha))return e.map((e,a)=>Za(e,t,a));const a=[];let o,i,r=[];const n=()=>{const e=Ga(r,t,a.length,o,i);e&&a.push(e),r=[]};for(const s of e)Ha(s)?(n(),o=s.heading??o,i=s.icon):r.push(s);return n(),a}function Ya(e,t,a){return function(e){return e.some(e=>Array.isArray(e?.cards)&&qa(e.cards[0]))}(e)?{source:"bubble-popups",tabs:e.map((e,a)=>function(e,t,a){const o=Array.isArray(e?.cards)?e.cards:[],i=o[0];if(!qa(i))return;const r=o.slice(1),n=i.name??("string"==typeof i.hash?Ua(i.hash.replace(/^#/,"")):void 0);return Ga(r,t,a,n,i.icon)??{name:n,icon:i.icon,card:{type:"markdown",content:" "}}}(e,t,a)).filter(e=>!!e),options:{},notes:["convert.note.bubble"]}:{source:a,tabs:Ja(e,t),options:{},notes:[]}}function Xa(e,t){if(Array.isArray(e)){if(0===e.length)throw new Error("convert.error.empty");return e.every(e=>Ba(e)&&(e.card||e.cards)&&!e.type)?{source:"tabdeck",tabs:e,options:{},notes:[]}:Ya(e,t,"cards")}if(!Ba(e))throw new Error("convert.error.not_card");if(Array.isArray(e.views))return{source:"dashboard",tabs:e.views.map((e,a)=>{const o=(i=e,Array.isArray(i?.sections)?i.sections.flatMap(e=>Array.isArray(e?.cards)?e.cards:[]):Array.isArray(i?.cards)?i.cards:[]);var i;const r=e.title??e.path??`View ${a+1}`;return Ga(o,t,a,String(r),e.icon)??{name:String(r),icon:e.icon,card:{type:"markdown",content:" "}}}),options:{},notes:["convert.note.dashboard"]};if(Array.isArray(e.sections))return{source:"sections",tabs:e.sections.map((e,a)=>function(e,t,a){const o=Array.isArray(e?.cards)?e.cards:[],i=o.find(Ha),r=Ga(o.filter(e=>e!==i),t,a,i?.heading,i?.icon);return r&&Array.isArray(e.visibility)&&(r.visibility=Wa(e.visibility)),r}(e,t,a)).filter(e=>!!e),options:{},notes:[]};const a=Va(e);if("tabdeck-card"===a){const{type:t,tabs:a,...o}=e;return{source:"tabdeck",tabs:Array.isArray(a)?a:[],options:o,notes:[]}}if("tabbed-card"===a)return function(e,t){const a=[],o=(Array.isArray(e.tabs)?e.tabs:[]).map((o,i)=>{const r={...e.attributes??{},...o?.attributes??{}},n=Za(o?.card??{},t,i);return r.label&&(n.name=String(r.label)),r.icon&&(n.icon=r.icon),Ba(o?.styles)&&Object.keys(o.styles).length&&a.push("convert.note.tab_styles"),n}),i={},r=Number(e.options?.defaultTabIndex);Number.isInteger(r)&&r>=0&&(i.default_tab=r);const n=e.styles?.["--mdc-theme-primary"];return n&&(i.styles={"--tabdeck-accent":n}),Ba(e.styles)&&Object.keys(e.styles).some(e=>"--mdc-theme-primary"!==e)&&a.push("convert.note.styles"),{source:"tabbed-card",tabs:o,options:i,notes:[...new Set(a)]}}(e,t);if("swipe-card"===a)return function(e,t){const a=Array.isArray(e.cards)?e.cards:[],o={swipe:!0,swipe_mouse:!0},i=Number(e.start_card);Number.isInteger(i)&&i>1&&(o.default_tab=i-1),e.parameters?.loop&&(o.swipe_wrap=!0);const r=e.parameters?.autoplay?["convert.note.autoplay"]:[];if(e.parameters?.autoplay){const t=Number(e.parameters.autoplay?.delay);o.auto_rotate=Number.isFinite(t)&&t>0?Math.max(2,Math.round(t/1e3)):5}return{source:"swipe-card",tabs:a.map((e,a)=>Za(e,t,a)),options:o,notes:r}}(e,t);if("state-switch"===a)return function(e,t){const a=Ba(e.states)?e.states:{},o=String(e.entity??""),i={},r=[],n=o.includes("."),s=Object.entries(a).map(([e,a],i)=>{const r=Za(a,t,i,{name:e,icon:Fa(a,t,i).icon});return n&&(r.auto_select={entity:o,state:e}),r});if("hash"===o?i.remember="url":n||r.push("convert.note.state_switch_mode"),void 0!==e.default&&void 0!==a[e.default]&&(i.default_tab=String(e.default)),n){const e=t?.states?.[o]?.state;void 0!==e&&void 0!==a[e]&&(i.default_tab=e)}return"slide-left"===e.transition||"slide-right"===e.transition?i.transition="slide":"fade"!==e.transition&&"flip"!==e.transition||(i.transition="fade"),{source:"state-switch",tabs:s,options:i,notes:r}}(e,t);if(!e.type&&Array.isArray(e.cards))return{...Ya(e.cards,t,"view"),notes:[]};if(Array.isArray(e.cards))return Ya(e.cards,t,"stack");if(e.type)return{source:"cards",tabs:[Za(e,t,0)],options:{},notes:[]};throw new Error("convert.error.not_card")}var Qa,eo,to,ao,oo,io,ro,no,so=ce(()=>{Da={light:"mdi:lightbulb",thermostat:"mdi:thermostat",humidifier:"mdi:air-humidifier","media-control":"mdi:speaker","weather-forecast":"mdi:weather-partly-cloudy",map:"mdi:map",calendar:"mdi:calendar","todo-list":"mdi:checkbox-marked-outline","shopping-list":"mdi:cart","history-graph":"mdi:chart-line","statistics-graph":"mdi:chart-bar",sensor:"mdi:chart-line",gauge:"mdi:gauge","alarm-panel":"mdi:shield-home","picture-entity":"mdi:cctv","picture-glance":"mdi:image",picture:"mdi:image","picture-elements":"mdi:image",entities:"mdi:format-list-bulleted",glance:"mdi:view-grid",markdown:"mdi:text",iframe:"mdi:web",area:"mdi:texture-box",logbook:"mdi:format-list-text","energy-distribution":"mdi:lightning-bolt"},Ra={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",media_player:"mdi:speaker",camera:"mdi:cctv",person:"mdi:account",lock:"mdi:lock",cover:"mdi:window-shutter",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",weather:"mdi:weather-partly-cloudy"},Ba=e=>!!e&&"object"==typeof e&&!Array.isArray(e),Va=e=>String(e?.type??"").replace(/^custom:/,""),Ha=e=>"heading"===Va(e),qa=e=>"bubble-card"===Va(e)&&"pop-up"===e.card_type}),co=/* @__PURE__ */le({TabdeckCardEditor:()=>no,pickCardEditorTag:()=>lo});function lo(e){return e("hui-card-element-editor")?"hui-card-element-editor":e("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var po=ce(()=>{$e(),Fe(),La(),ma(),Ka(),so(),nt(),_t(),za(),fa(),Qa="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",eo="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z",to="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74",ao="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z",oo=[{name:"name",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"accent",selector:{text:{}}},{name:"color",selector:{text:{}}},{name:"badge",selector:{text:{}}},{name:"badge_color",selector:{text:{}}},{name:"disabled",selector:{boolean:{}}},{name:"fab",selector:{boolean:{}}},{name:"card_size",selector:{number:{min:1,max:20,step:1,mode:"box"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"badge_action",selector:{ui_action:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"enter_action",selector:{ui_action:{}}},{name:"leave_action",selector:{ui_action:{}}}],io=[{name:"type",selector:{select:{mode:"dropdown",custom_value:!0,options:["entities","tile","button","light","thermostat","humidifier","weather-forecast","markdown","picture","picture-entity","picture-glance","glance","gauge","sensor","history-graph","statistics-graph","media-control","map","area","alarm-panel","calendar","todo-list","iframe","entity","conditional","vertical-stack","horizontal-stack","grid","custom:mushroom-template-card","custom:mushroom-entity-card","custom:button-card","custom:mini-graph-card","custom:apexcharts-card","custom:auto-entities","custom:bubble-card","custom:layout-card"].map(e=>({value:e,label:e}))}}}],ro=[{key:"visibility"},{key:"alert"},{key:"default_if"}],no=class extends _e{constructor(...e){super(...e),this._editingTab=null,this._cardError=null,this._expanded=/* @__PURE__ */new Set,this._importOpen=!1,this._importError="",this._starterOpen=!1,this._starterKind="rooms",this._convertOpen=!1,this._convertError="",this._status="",this._checkSig="",this._resolver=e=>void 0===this._templates?.result(e)?void 0:this._templates.boolean(e),this._computeGlobalLabel=e=>this._t(`editor.global.${e.name}`),this._computeTabLabel=e=>this._t(`editor.tab.${e.name}`)}set hass(e){const t=!this._hass;this._hass=e,this._syncTemplates();const a=this._checkSignature();(t||a!==this._checkSig)&&(this._checkSig=a,this.requestUpdate())}get hass(){return this._hass}_t(e,t){return ba(pa(this._hass),e,t)}_conditionTemplates(){const e=[],t=a=>{for(const o of Array.isArray(a)?a:[])"template"===o?.condition&&o.value_template&&e.push(o.value_template),Array.isArray(o?.conditions)&&t(o.conditions)};for(const a of this._config?.tabs??[])t(a.visibility),t(a.alert),t(a.default_if);return e}_syncTemplates(){const e=this._conditionTemplates();0!==e.length&&this._hass?.connection?.subscribeMessage?(this._templates||(this._templates=new qt(Ut(()=>this._hass)),this._templates.addEventListener("change",()=>this.requestUpdate())),this._templates.track(e)):0===e.length&&(this._templates?.destroy(),this._templates=void 0)}_explain(e){return Sa(e,this._hass??{states:{}},this._resolver)}_checkSignature(){return this._hass?pa(this._hass)+"#"+(this._config?.tabs??[]).map(e=>ro.map(t=>function(e){const t=e=>`${e.met?1:0}${e.current??""}${e.pending?"p":""}(${(e.children??[]).map(t).join(",")})`;return e.items.map(t).join("|")}(this._explain(e[t.key]))).join("/")).join(";"):""}disconnectedCallback(){super.disconnectedCallback(),this._templates?.destroy(),this._templates=void 0}setConfig(e){this._config=zt(e),this._syncTemplates()}_emit(e){this._config=e,this._syncTemplates(),Oe(this,"config-changed",{config:this._forOutput(e)}),this.requestUpdate()}_forOutput(e){e.tabs.some(e=>e.group)&&(e={...e,tabs:e.tabs.map(e=>{if(!e.group)return e;const{group:t,card:a,...o}=e;return o})});const t=e.auto_tabs;if(!t?.source)return e;const{template:a,...o}=t,i={...o};i.tab_template===it&&delete i.tab_template;for(const r of["domains","exclude"])void 0===i[r]&&delete i[r];return{...e,auto_tabs:i}}_patch(e){this._config&&this._emit({...this._config,...e})}_patchTab(e,t){if(!this._config)return;const a=this._config.tabs.map((a,o)=>o===e?{...a,...t}:a);this._emit({...this._config,tabs:a})}_addTab(){if(!this._config)return;const e=[...this._config.tabs,{name:this._t("editor.tab_n",{n:this._config.tabs.length+1}),card:{}}],t=this._config.tabs.length;this._expanded=new Set(this._expanded).add(t),this._emit({...this._config,tabs:e})}_expandAll(){this._config&&(this._expanded=new Set(this._config.tabs.map((e,t)=>t)))}_collapseAll(){this._expanded=/* @__PURE__ */new Set}_deleteTab(e){if(!this._config)return;const t=this._config.tabs.filter((t,a)=>a!==e);this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:t})}_duplicateTab(e){if(!this._config)return;const t=this._config.tabs[e];if(!t)return;const a=JSON.parse(JSON.stringify(t));a.name=this._t("editor.copy_name",{name:t.name??this._t("editor.tab_n",{n:e+1})});const o=this._config.tabs.slice();o.splice(e+1,0,a),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:o})}_flash(e){this._status=e,this._statusTimer&&clearTimeout(this._statusTimer),this._statusTimer=setTimeout(()=>this._status="",2500)}async _copyTab(e){const t=this._config?.tabs[e];if(!t)return;const a=JSON.stringify(t,null,2);let o=!1;try{navigator.clipboard?.writeText&&(await navigator.clipboard.writeText(a),o=!0)}catch{o=!1}if(!o){const e=document.createElement("textarea");e.value=a,e.style.cssText="position:fixed;opacity:0",this.renderRoot.appendChild(e),e.select();try{o=document.execCommand("copy")}catch{o=!1}e.remove()}const i=t.name||this._t("editor.tab_n",{n:e+1});this._flash(o?this._t("editor.copied",{name:i}):this._t("editor.clipboard_error"))}_toggleConvert(){this._convertOpen=!this._convertOpen,this._convertResult=void 0,this._convertError=""}_onConvertInput(e){if(this._convertResult=void 0,this._convertError="",null!=e&&""!==e)try{const t=Xa(e,this._hass);0===t.tabs.length?this._convertError="convert.error.no_tabs":this._convertResult=t}catch(t){const e=String(t?.message??"");this._convertError=e.startsWith("convert.")?e:"convert.error.not_card"}}_applyConvert(e){const t=this._convertResult;if(!this._config||!t)return;const a=zt(function(e,t,a){if("append"===a)return{...e,tabs:[...e.tabs??[],...t.tabs]};const o={...e,...t.options,tabs:t.tabs};return t.options.auto_tabs||delete o.auto_tabs,o}(this._config,t,e));this._expanded=/* @__PURE__ */new Set,this._convertOpen=!1,this._convertResult=void 0,this._flash(this._t("convert.done",{count:t.tabs.length,source:this._t(`convert.source.${t.source}`)})),this._emit(a)}_renderConvert(){const e=this._convertResult;return F`
      <div class="import-panel convert-panel">
        <div class="import-hint">${this._t("convert.hint")}</div>
        ${customElements.get("ha-yaml-editor")?F`<ha-yaml-editor class="convert-yaml" @value-changed=${e=>{e.stopPropagation();const t=e.detail;!1!==t?.isValid&&this._onConvertInput(t?.value)}}></ha-yaml-editor>`:F`<textarea
              class="import-json convert-json"
              rows="8"
              @input=${e=>{try{this._onConvertInput(JSON.parse(e.target.value))}catch{this._convertResult=void 0}}}
            ></textarea>`}
        ${this._convertError?F`<div class="import-error" role="alert">${this._t(this._convertError)}</div>`:Z}
        ${e?F`<div class="convert-summary" role="status">
              ${this._t("convert.detected",{source:this._t(`convert.source.${e.source}`),count:e.tabs.length})}
              <ul class="convert-tabs">
                ${e.tabs.map(e=>F`<li>${e.icon?F`<ha-icon .icon=${e.icon}></ha-icon>`:Z}${e.name}</li>`)}
              </ul>
              ${e.notes.map(e=>F`<div class="convert-note">ℹ️ ${this._t(e)}</div>`)}
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
    `}_toggleStarter(){this._starterOpen=!this._starterOpen}_applyStarter(e){if(!this._config)return;const t=this._starterKind,a=this._t(`starter.kind.${t}`),o=Ia(t,this._hass,e=>this._t(e));if(0===o.count)return void this._flash(this._t("starter.none",{name:a}));const i=zt(function(e,t,a){const o="replace"===a?t.tabs:[...e.tabs??[],...t.tabs],i={...e,...t.options??{},tabs:o};return t.auto_tabs?i.auto_tabs=t.auto_tabs:"replace"===a&&delete i.auto_tabs,i}(this._config,o,e));this._expanded=/* @__PURE__ */new Set,this._starterOpen=!1,this._flash(this._t("starter.done",{name:a})),this._emit(i)}_renderStarter(){const e=[{name:"kind",selector:{select:{mode:"dropdown",options:Ta.map(e=>({value:e,label:this._t(`starter.kind.${e}`)}))}}}];return F`
      <div class="import-panel starter-panel">
        <div class="import-hint">${this._t("starter.hint")}</div>
        <ha-form
          class="starter-form"
          .hass=${this.hass}
          .data=${{kind:this._starterKind}}
          .schema=${e}
          .computeLabel=${()=>this._t("starter.pick")}
          @value-changed=${e=>{e.stopPropagation();const t=e.detail?.value?.kind;Ta.includes(t)&&(this._starterKind=t)}}
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
    `}_toggleImport(){this._importOpen=!this._importOpen,this._importError="",this._importValue=void 0}_applyImport(){if(!this._config)return;const e=this._importValue,t=Array.isArray(e)?e:[e];if(0===t.length||!t.every(e=>e&&"object"==typeof e&&!Array.isArray(e)&&(e.card||e.cards||e.tap_action)))return void(this._importError=this._t("editor.import_error"));const a=this._config.tabs.length,o=[...this._config.tabs,...t.map(kt)],i=new Set(this._expanded);for(let r=a;r<o.length;r++)i.add(r);this._expanded=i,this._importOpen=!1,this._importValue=void 0,this._flash(this._t(t.length>1?"editor.imported_many":"editor.imported_one",{count:t.length})),this._emit({...this._config,tabs:o})}_renderImport(){return F`
      <div class="import-panel">
        <div class="import-hint">${this._t("editor.import_hint")}</div>
        ${customElements.get("ha-yaml-editor")?F`<ha-yaml-editor @value-changed=${e=>{e.stopPropagation();const t=e.detail;this._importValue=!1===t?.isValid?void 0:t?.value,this._importError=""}}></ha-yaml-editor>`:F`<textarea
              class="import-json"
              rows="8"
              placeholder='{"name": "Lights", "card": {"type": "light", "entity": "light.kitchen"}}'
              @input=${e=>{try{this._importValue=JSON.parse(e.target.value),this._importError=""}catch{this._importValue=void 0}}}
            ></textarea>`}
        ${this._importError?F`<div class="import-error" role="alert">${this._importError}</div>`:Z}
        <div class="import-actions">
          <ha-button class="import-apply" @click=${this._applyImport}>${this._t("editor.add")}</ha-button>
          <ha-button class="import-cancel" @click=${this._toggleImport}>${this._t("editor.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleExpanded(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_onHeaderKeydown(e,t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleExpanded(e))}_editCardJson(e,t){let a;try{a=JSON.parse(t)}catch{return void(this._cardError=e)}this._cardError=null,this._patchTab(e,{card:a})}_onItemMoved(e){if(!this._config)return;const{oldIndex:t,newIndex:a}=e.detail??{};if(null==t||null==a||t===a||t<0||a<0||t>=this._config.tabs.length||a>=this._config.tabs.length)return;const o=this._config.tabs.slice(),[i]=o.splice(t,1);o.splice(a,0,i),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:o})}_warnings(){const e=this._config;if(!e)return[];const t=[],a=e.tabs.map(e=>e.name??"").filter(e=>e),o=a.filter((e,t)=>a.indexOf(e)!==t);return o.length>0&&t.push(this._t("editor.warn_duplicates",{names:[...new Set(o)].join(", ")})),t}_move(e,t){if(!this._config)return;const a=e+t;if(a<0||a>=this._config.tabs.length)return;const o=this._config.tabs.slice();[o[e],o[a]]=[o[a],o[e]],this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:o})}_openCard(e){this._cardError=null,this._editingTab=e}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(e,t){t.stopPropagation();const a=t.detail?.config;a&&(this._config?.tabs[e]?.children&&Array.isArray(a.tabs)?this._patchTab(e,kt({...this._config.tabs[e],children:a.tabs})):this._patchTab(e,{card:a}))}_onTypeChosen(e,t){t.stopPropagation();const a=t.detail?.value?.type;a&&this._patchTab(e,{card:{type:a}})}_changeCardType(e){this._patchTab(e,{card:{}})}_onYamlCardChanged(e,t){t.stopPropagation();const a=t.detail;!1!==a?.isValid&&void 0!==a?.value&&this._patchTab(e,{card:a.value})}get _currentDefaultTab(){const e=this._config;for(let t=0;t<e.tabs.length;t++){const a=e.tabs[t].name??String(t);if(String(e.default_tab)===a||e.default_tab===t)return a}}_globalSchema(){const e=(e,t)=>e.map(e=>{const a=`editor.opt.${t}.${e}`;return{value:e,label:t&&ha(a)?this._t(a):e}}),t=this._config.tabs.map((e,t)=>({value:e.name??String(t),label:e.name||this._t("editor.tab_n",{n:t+1})}));return[{name:"preset",selector:{select:{mode:"dropdown",options:e(["",...Je])}}},{name:"position",selector:{select:{mode:"dropdown",options:e(["top","bottom","left","right"],"position")}}},{name:"style",selector:{select:{mode:"dropdown",options:e(["underline","pill","segmented","boxed","text","rail"])}}},{name:"tab_display",selector:{select:{mode:"dropdown",options:e(["both","icon","label","active","dots"],"tab_display")}}},{name:"align",selector:{select:{mode:"dropdown",options:e(["start","center","end","justify"],"align")}}},{name:"badge_display",selector:{select:{mode:"dropdown",options:e(["text","dot"],"badge_display")}}},{name:"hide_inactive_badge",selector:{boolean:{}}},{name:"transition",selector:{select:{mode:"dropdown",options:e(["none","fade","slide"],"transition")}}},{name:"indicator_size",selector:{number:{min:1,max:16,step:1,mode:"slider"}}},{name:"indicator_radius",selector:{number:{min:0,max:30,step:1,mode:"slider"}}},{name:"remember",selector:{select:{mode:"dropdown",options:e(["none","browser","url","entity"],"remember")}}},{name:"remember_entity",selector:{text:{}}},{name:"storage_key",selector:{text:{}}},{name:"default_tab",selector:{select:{mode:"dropdown",options:t}}},{name:"scrollable",selector:{select:{mode:"dropdown",options:e(["auto","true","false"],"scrollable")}}},{name:"lazy",selector:{boolean:{}}},{name:"unmount_hidden",selector:{boolean:{}}},{name:"swipe_wrap",selector:{boolean:{}}},{name:"animated",selector:{boolean:{}}},{name:"accent_indicator",selector:{boolean:{}}},{name:"header",selector:{boolean:{}}},{name:"aria_label",selector:{text:{}}},{name:"sticky",selector:{boolean:{}}},{name:"elevation",selector:{boolean:{}}},{name:"scroll_buttons",selector:{boolean:{}}},{name:"overflow_menu",selector:{boolean:{}}},{name:"bar_background",selector:{text:{}}},{name:"swipe",selector:{boolean:{}}},{name:"swipe_mouse",selector:{boolean:{}}},{name:"tab_display_narrow",selector:{select:{mode:"dropdown",options:e(["","both","icon","label","active","dots"],"tab_display")}}},{name:"narrow_width",selector:{number:{min:100,max:4e3,step:10,mode:"box"}}},{name:"split",selector:{number:{min:0,max:4e3,step:10,mode:"box"}}},{name:"collapsible",selector:{boolean:{}}},{name:"start_collapsed",selector:{boolean:{}}},{name:"scroll_spy",selector:{boolean:{}}},{name:"auto_rotate",selector:{number:{min:0,max:3600,step:1,mode:"box"}}},{name:"idle_return",selector:{number:{min:0,max:86400,step:1,mode:"box"}}},{name:"dock",selector:{boolean:{}}},{name:"content_arrows",selector:{boolean:{}}},{name:"search",selector:{boolean:{}}},{name:"hotkeys",selector:{boolean:{}}},{name:"history",selector:{boolean:{}}},{name:"edit_mode_reveal",selector:{boolean:{}}}]}get _globalData(){const e=this._config;return{preset:e.preset??"",position:e.position,style:e.style,tab_display:e.tab_display,align:e.align,badge_display:e.badge_display,hide_inactive_badge:e.hide_inactive_badge,transition:e.transition,indicator_size:e.indicator_size,indicator_radius:e.indicator_radius,remember:e.remember,remember_entity:e.remember_entity??"",storage_key:e.storage_key??"",default_tab:this._currentDefaultTab,scrollable:String(e.scrollable),lazy:e.lazy,unmount_hidden:e.unmount_hidden,swipe_wrap:e.swipe_wrap,animated:e.animated,accent_indicator:e.accent_indicator,header:e.header,aria_label:e.aria_label??"",sticky:e.sticky,elevation:e.elevation,scroll_buttons:e.scroll_buttons,overflow_menu:e.overflow_menu,bar_background:e.bar_background??"",swipe:e.swipe,swipe_mouse:e.swipe_mouse,tab_display_narrow:e.tab_display_narrow??"",narrow_width:e.narrow_width,split:e.split?.min_width??0,collapsible:e.collapsible,start_collapsed:e.start_collapsed,scroll_spy:e.scroll_spy,auto_rotate:e.auto_rotate?.interval??0,idle_return:e.idle_return??0,dock:e.dock,content_arrows:e.content_arrows,search:e.search,hotkeys:e.hotkeys,history:e.history,edit_mode_reveal:e.edit_mode_reveal}}_onGlobalChanged(e){e.stopPropagation();const t=e.detail.value??{};if(this._config&&tt(t.preset)&&t.preset!==this._config.preset)return void this._emit(function(e,t){const a=at(t),o=Object.fromEntries(Object.entries(e.styles??{}).filter(([e])=>!Qe.has(e)));return{...e,...a,styles:{...o,...a.styles},preset:t}}(this._config,t.preset));const a="auto"===t.scrollable?"auto":"true"===t.scrollable||!0===t.scrollable;this._patch({position:t.position,style:t.style,tab_display:t.tab_display,align:t.align,badge_display:t.badge_display,hide_inactive_badge:!!t.hide_inactive_badge,transition:t.transition,indicator_size:t.indicator_size,indicator_radius:t.indicator_radius,remember:t.remember,remember_entity:t.remember_entity||void 0,storage_key:t.storage_key||void 0,default_tab:t.default_tab,scrollable:a,lazy:!!t.lazy,unmount_hidden:!!t.unmount_hidden,swipe_wrap:!!t.swipe_wrap,animated:!!t.animated,accent_indicator:!!t.accent_indicator,header:!!t.header,aria_label:t.aria_label||void 0,sticky:!!t.sticky,elevation:!!t.elevation,scroll_buttons:!!t.scroll_buttons,overflow_menu:!!t.overflow_menu,bar_background:t.bar_background||void 0,swipe:!!t.swipe,swipe_mouse:!!t.swipe_mouse,tab_display_narrow:t.tab_display_narrow||void 0,narrow_width:Number(t.narrow_width)||450,split:Number(t.split)>0?{min_width:Number(t.split),columns:this._config?.split?.columns??2}:void 0,collapsible:!!t.collapsible,start_collapsed:!!t.collapsible&&!!t.start_collapsed,scroll_spy:!!t.scroll_spy,auto_rotate:Number(t.auto_rotate)>0?{interval:Math.max(2,Number(t.auto_rotate)),resume_after:this._config?.auto_rotate?.resume_after??60}:void 0,idle_return:Number(t.idle_return)>0?Math.max(5,Number(t.idle_return)):void 0,dock:!!t.dock,content_arrows:!!t.content_arrows,search:!!t.search,hotkeys:!!t.hotkeys,history:!!t.history,edit_mode_reveal:!1!==t.edit_mode_reveal})}_onTabFieldsChanged(e,t){t.stopPropagation();const a=t.detail.value??{};this._patchTab(e,{name:a.name??"",subtitle:a.subtitle||void 0,icon:a.icon||void 0,accent:a.accent||void 0,color:a.color||void 0,badge:a.badge||void 0,badge_color:a.badge_color||void 0,disabled:!!a.disabled||void 0,fab:!!a.fab||void 0,card_size:"number"==typeof a.card_size?a.card_size:void 0,hold_action:a.hold_action??void 0,badge_action:a.badge_action??void 0,tap_action:a.tap_action&&"none"!==a.tap_action.action?a.tap_action:void 0,enter_action:a.enter_action&&"none"!==a.enter_action.action?a.enter_action:void 0,leave_action:a.leave_action&&"none"!==a.leave_action.action?a.leave_action:void 0})}_renderConditions(e,t,a){const o=Array.isArray(t[a.key])?t[a.key]:[],i=t=>{t.stopPropagation();const o=t.detail?.value;!1!==t.detail?.isValid&&Array.isArray(o)&&this._patchTab(e,{[a.key]:o.length?o:void 0})};let r;r=customElements.get("ha-card-conditions-editor")?F`<ha-card-conditions-editor
        .hass=${this.hass}
        .conditions=${o}
        @value-changed=${i}
      ></ha-card-conditions-editor>`:customElements.get("ha-yaml-editor")?F`<ha-yaml-editor
        .defaultValue=${o}
        @value-changed=${i}
      ></ha-yaml-editor>`:F`<textarea
        class="conditions-json"
        rows="6"
        .value=${JSON.stringify(o,null,2)}
        @change=${t=>{try{const o=JSON.parse(t.target.value||"[]");Array.isArray(o)&&this._patchTab(e,{[a.key]:o.length?o:void 0})}catch{}}}
      ></textarea>`;const n=o.length&&this._hass?this._explain(o):void 0;return F`
      <details class="conditions-section" data-key=${a.key}>
        <summary>
          ${this._t(`editor.cond.${a.key}.label`)}${o.length?` (${o.length})`:""}
          ${n?F`<span class="check-dot ${n.met?"met":"unmet"}" aria-hidden="true"></span>`:Z}
          <span class="conditions-hint">${this._t(`editor.cond.${a.key}.hint`)}</span>
        </summary>
        ${n?this._renderCheck(n):Z}
        ${r}
      </details>
    `}_renderCheck(e){return F`
      <div class="check ${e.met?"met":"unmet"}" role="status">
        <div class="check-head">
          ${e.met?"✅":"❌"} ${this._t(e.met?"check.now_met":"check.now_unmet")}
        </div>
        <ul class="check-list">
          ${e.items.map(e=>this._renderCheckItem(e))}
        </ul>
      </div>
    `}_renderCheckItem(e){const t=e.met?"✅":"❌";return F`<li class="check-item ${e.met?"met":"unmet"}">
      <span class="check-mark">${t}</span>
      <span class="check-text">${this._describe(e)}</span>
      ${e.children?F`<ul class="check-list">${e.children.map(e=>this._renderCheckItem(e))}</ul>`:Z}
    </li>`}_describe(e){const t=(e,t)=>this._t(e,t),a=()=>e.missing?` (${t("check.missing")})`:void 0!==e.current?` (${t("check.now",{value:e.current})})`:"";switch(e.type){case"state":return t(e.negate?"check.state_is_not":"check.state_is",{entity:e.entity??"?",values:(e.expected??[]).join(t("check.or"))})+a();case"numeric_state":{const o=[];return void 0!==e.above&&o.push(t("check.above",{value:e.above})),void 0!==e.below&&o.push(t("check.below",{value:e.below})),t("check.numeric",{entity:e.entity??"?",range:o.join(t("check.and"))})+a()}case"screen":return t("check.screen",{query:e.media_query??""});case"time":{const a=[];return e.after&&a.push(t("check.time_after",{value:e.after})),e.before&&a.push(t("check.time_before",{value:e.before})),e.weekday?.length&&a.push(t("check.time_days",{days:e.weekday.join(", ")})),t("check.time",{range:a.join(" ")})}case"user":return t("check.user",{count:e.count??0});case"template":return t(e.pending?"check.template_pending":"check.template");case"and":case"or":case"not":return t(`check.group_${e.type}`);default:return t("check.unknown")}}async _ensureConditionsEditor(){if(!customElements.get("ha-card-conditions-editor"))try{(await(window.loadCardHelpers?.()))?.createCardElement?.({type:"conditional",conditions:[],card:{type:"markdown"}}),await(customElements.get("hui-conditional-card")?.getConfigElement?.()),customElements.get("ha-card-conditions-editor")&&this.requestUpdate()}catch{}}firstUpdated(){this._ensureConditionsEditor()}render(){return this._config?null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView():F``}_renderCardView(e){const t=this._config.tabs[e];if(!t)return this._editingTab=null,this._renderListView();const a=!!t.card?.type;return F`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← ${this._t("editor.back")}</button>
          <span class="card-editor-title">${t.name||this._t("editor.tab_n",{n:e+1})}</span>
          ${a?F`<button class="change-card-type" @click=${()=>this._changeCardType(e)}>
                ${this._t("editor.change_type")}
              </button>`:Z}
        </div>
        ${a?this._renderCardEditor(e,t):this._renderCardTypeChooser(e)}
      </div>
    `}_renderCardTypeChooser(e){return F`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${io}
          .computeLabel=${()=>this._t("editor.card_type")}
          @value-changed=${t=>this._onTypeChosen(e,t)}
        ></ha-form>
        <p class="card-type-hint">${this._t("editor.card_type_hint")}</p>
      </div>
    `}_renderCardEditor(e,t){const a=lo(e=>!!customElements.get(e));return"hui-card-element-editor"===a?F`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${t.card??{}}
          @config-changed=${t=>this._onNativeCardChanged(e,t)}
        ></hui-card-element-editor>
      `:"ha-yaml-editor"===a?F`
        <ha-yaml-editor
          .defaultValue=${t.card??{}}
          @value-changed=${t=>this._onYamlCardChanged(e,t)}
        ></ha-yaml-editor>
      `:F`
      <label class="card-label"
        >${this._t("editor.card_json")}
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(t.card??{},null,2)}
          @change=${t=>this._editCardJson(e,t.target.value)}
        ></textarea>
      </label>
      ${this._cardError===e?F`<div class="tab-card-error">${this._t("editor.invalid_json")}</div>`:Z}
    `}_renderStatusChips(e){if(!this._hass)return Z;const t=Array.isArray(e.visibility)&&e.visibility.length>0&&!this._explain(e.visibility).met,a=Array.isArray(e.alert)&&e.alert.length>0&&this._explain(e.alert).met;return t||a?F`<div class="tab-status">
      ${t?F`<span class="chip chip-hidden" title=${this._t("check.chip_hidden_title")}
            >${this._t("check.chip_hidden")}</span>`:Z}
      ${a?F`<span class="chip chip-alert">${this._t("check.chip_alert")}</span>`:Z}
    </div>`:Z}_renderListView(){const e=this._config;return F`
      <div class="editor">
        <div class="preview" aria-hidden="true">
          <span class="preview-label">${this._t("editor.preview")}</span>
          <tabdeck-tabbar
            class="preview-bar"
            .items=${e.tabs.map((e,t)=>({name:!Ft(e.name)&&e.name||this._t("editor.tab_n",{n:t+1}),icon:Ft(e.icon)?void 0:e.icon,accent:Ft(e.accent)?void 0:e.accent,color:Ft(e.color)?void 0:e.color,disabled:e.disabled}))}
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

        ${this._warnings().map(e=>F`<div class="editor-warning" role="alert">⚠️ ${e}</div>`)}

        ${e.tabs.length>1?F`<div class="bulk-controls">
              <button class="expand-all" @click=${this._expandAll}>${this._t("editor.expand_all")}</button>
              <button class="collapse-all" @click=${this._collapseAll}>${this._t("editor.collapse_all")}</button>
            </div>`:Z}

        <ha-sortable
          handle-selector=".drag-handle"
          @item-moved=${this._onItemMoved}
        >
        <div class="tabs">
          ${e.tabs.map((t,a)=>{const o=this._expanded.has(a);return F`
              <div class="tab ${o?"expanded":"collapsed"}">
                <div
                  class="tab-header"
                  role="button"
                  tabindex="0"
                  aria-expanded=${o?"true":"false"}
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
                      .icon=${!Ft(t.icon)&&t.icon||"mdi:tab"}
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
                ${o?F`
                      <ha-form
                        class="tab-form"
                        .hass=${this.hass}
                        .data=${{name:t.name??"",subtitle:t.subtitle??"",icon:t.icon??"",accent:t.accent??"",color:t.color??"",badge:t.badge??"",badge_color:t.badge_color??"",disabled:!!t.disabled,fab:!!t.fab,card_size:t.card_size,hold_action:t.hold_action,badge_action:t.badge_action,tap_action:t.tap_action,enter_action:t.enter_action,leave_action:t.leave_action}}
                        .schema=${oo}
                        .computeLabel=${this._computeTabLabel}
                        @value-changed=${e=>this._onTabFieldsChanged(a,e)}
                      ></ha-form>
                      ${ro.map(e=>this._renderConditions(a,t,e))}
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
            <ha-svg-icon slot="start" .path=${Qa}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${Qa}></ha-svg-icon>
            ${this._t("editor.add_tab")}
          </ha-button>
          <ha-button class="import-tab" @click=${this._toggleImport}>
            <ha-svg-icon slot="start" .path=${eo}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${eo}></ha-svg-icon>
            ${this._t("editor.import_tab")}
          </ha-button>
          <ha-button class="starter-tab" @click=${this._toggleStarter}>
            <ha-svg-icon slot="start" .path=${to}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${to}></ha-svg-icon>
            ${this._t("starter.button")}
          </ha-button>
          <ha-button class="convert-tab" @click=${this._toggleConvert}>
            <ha-svg-icon slot="start" .path=${ao}></ha-svg-icon>
            <ha-svg-icon slot="icon" .path=${ao}></ha-svg-icon>
            ${this._t("convert.button")}
          </ha-button>
        </div>
        ${this._convertOpen?this._renderConvert():Z}
        ${this._starterOpen?this._renderStarter():Z}
        ${this._importOpen?this._renderImport():Z}
        ${this._status?F`<div class="editor-status" role="status">${this._status}</div>`:Z}
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
  `}},ga([Te()],no.prototype,"_config",void 0),ga([Te()],no.prototype,"_editingTab",void 0),ga([Te()],no.prototype,"_cardError",void 0),ga([Te()],no.prototype,"_expanded",void 0),ga([Te()],no.prototype,"_importOpen",void 0),ga([Te()],no.prototype,"_importError",void 0),ga([Te()],no.prototype,"_starterOpen",void 0),ga([Te()],no.prototype,"_starterKind",void 0),ga([Te()],no.prototype,"_convertOpen",void 0),ga([Te()],no.prototype,"_convertResult",void 0),ga([Te()],no.prototype,"_convertError",void 0),ga([Te()],no.prototype,"_status",void 0),no=ga([ve("tabdeck-card-editor")],no)});$e(),Fe(),We(),St(),Dt(),aa(),et(),ma(),za(),$a(),fa();var bo=["pointerdown","keydown","touchstart","wheel"],ho=["name","subtitle","icon","color","accent"],uo=class extends _e{constructor(...e){super(...e),this._selected=0,this._built=!1,this._width=0,this._collapsed=!1,this._cardKey="",this._genTabs=[],this._genKey="",this._entityWriteGuard=0,this._editModeFlag=!1,this._previewFlag=!1,this._fromPop=!1,this._onPopState=e=>{if(!this._config?.history||!this._built)return;const t=e.state?.tabdeck?.[this._cardKey];if("number"==typeof t&&t!==this._selected&&this._isContentTab(this._visibleTabs()[t])){this._fromPop=!0;try{this._collapsed=!1,this._selectIndex(t)}finally{this._fromPop=!1}}},this._onHotkey=e=>{const t=this._config;if(!t?.hotkeys||!this._built||e.ctrlKey||e.metaKey||e.altKey||e.defaultPrevented)return;const a=e.composedPath()[0];if((!a||!a.isContentEditable&&!/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName??""))&&("function"!=typeof this.checkVisibility||this.checkVisibility()))if("/"===e.key&&t.search)e.preventDefault(),this.renderRoot.querySelector("tabdeck-tabbar")?.openSearch?.();else if(/^[1-9]$/.test(e.key))this.selectTab(Number(e.key)-1)&&e.preventDefault();else if("["===e.key||"]"===e.key){const a=this._stepContent(this._selected,"]"===e.key?1:-1,t.swipe_wrap);a!==this._selected&&this._selectIndex(a)}},this._lastInteraction=Date.now(),this._lastRotate=Date.now(),this._rotatePausedUntil=0,this._onInteraction=()=>this._noteInteraction(Date.now()),this._templateResolver=e=>this._templates?.boolean(e),this._spyObserved=[],this._spyInView=/* @__PURE__ */new Set,this._spySuppressUntil=0,this._spyDriven=!1,this._groupChild=/* @__PURE__ */new WeakMap,this._onNestedChanged=e=>{const t=e.detail;if(!t||t.deck===this)return;const a=this._allTabs().find(e=>this._manager?.get(this._allTabs().indexOf(e))===t.deck);"menu"===a?.group?.display&&t.name&&(this._groupChild.set(a,t.name),this.requestUpdate())},this._onTouchStart=e=>{if(!this._config?.swipe||1!==e.touches.length)return void(this._touchStart=void 0);const t=e.touches[0];this._touchStart={x:t.clientX,y:t.clientY,t:e.timeStamp}},this._onTouchEnd=e=>{const t=this._touchStart;if(this._touchStart=void 0,!t||!this._config?.swipe)return;const a=e.changedTouches[0];a&&this._applySwipe(t,{x:a.clientX,y:a.clientY,t:e.timeStamp})},this._onPointerDown=e=>{this._config?.swipe_mouse&&"touch"!==e.pointerType?this._touchStart={x:e.clientX,y:e.clientY,t:e.timeStamp}:this._touchStart=void 0},this._onPointerUp=e=>{const t=this._touchStart;this._touchStart=void 0,t&&this._config?.swipe_mouse&&"touch"!==e.pointerType&&this._applySwipe(t,{x:e.clientX,y:e.clientY,t:e.timeStamp})},this._appliedStyleKeys=[]}set editMode(e){this._setEditFlags(!!e,this._previewFlag)}get editMode(){return this._editModeFlag}set preview(e){this._setEditFlags(this._editModeFlag,!!e)}get preview(){return this._previewFlag}_setEditFlags(e,t){if(e===this._editModeFlag&&t===this._previewFlag)return;const a=this._config&&this._built?this._visibleTabs()[this._selected]?.name:void 0;this._editModeFlag=e,this._previewFlag=t,void 0!==a&&this._restoreSelection(a),this.requestUpdate()}get _editing(){return(this._editModeFlag||this._previewFlag)&&!1!==this._config?.edit_mode_reveal}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(po(),co)),document.createElement("tabdeck-card-editor")}setConfig(e){this._config=zt(e),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=At(this._config),this._collapsed=this._config.start_collapsed,this._autoPrev=void 0,this._lastEntityValue=void 0,this._genTabs=[],this._genKey="",this._templates?.destroy(),this._templates=void 0,this._syncTimer(),this._syncWidthObserver(),this._build()}_syncWidthObserver(){const e=!(!this._config?.split&&!this._config?.tab_display_narrow)&&this.isConnected&&"undefined"!=typeof ResizeObserver;e&&!this._widthObserver?(this._widthObserver=new ResizeObserver(e=>{const t=Math.round(e[0]?.contentRect?.width??0);t!==this._width&&(this._width=t)}),this._widthObserver.observe(this)):!e&&this._widthObserver&&(this._widthObserver.disconnect(),this._widthObserver=void 0)}get _isSplit(){const e=this._config?.split;return!!e&&this._width>=e.min_width}get _effectiveDisplay(){const e=this._config;return e.tab_display_narrow&&this._width>0&&this._width<e.narrow_width?e.tab_display_narrow:e.tab_display}_renderSplit(e){const t=e.filter(e=>!wt(e));return F`
      <div class="split" style="--tabdeck-split-columns:${this._config.split.columns}">
        ${t.map(e=>{const t=this._text(e.icon);return F`
            <div class="split-col">
              <div class="split-title">
                ${t?F`<ha-icon .icon=${t}></ha-icon>`:Z}
                <span>${this._text(e.name)??""}</span>
              </div>
              ${this._manager?.get(this._allTabs().indexOf(e))}
            </div>
          `})}
      </div>
    `}connectedCallback(){super.connectedCallback();for(const e of bo)this.addEventListener(e,this._onInteraction);this._syncTimer(),this._syncWidthObserver(),this._config?.scroll_spy&&this.updateComplete.then(()=>this._syncSpyObserver()),this._config?.dock&&this.updateComplete.then(()=>this._syncDock()),document.addEventListener("keydown",this._onHotkey),window.addEventListener("popstate",this._onPopState)}_historyState(e){const t=history.state&&"object"==typeof history.state?history.state:{};return{...t,tabdeck:{...t.tabdeck??{},[this._cardKey]:e}}}disconnectedCallback(){super.disconnectedCallback();for(const e of bo)this.removeEventListener(e,this._onInteraction);document.removeEventListener("keydown",this._onHotkey),window.removeEventListener("popstate",this._onPopState),this._stopTimer(),this._spyObserver?.disconnect(),this._spyObserver=void 0,this._spyObserved=[],this._widthObserver?.disconnect(),this._widthObserver=void 0,this._dockObserver?.disconnect(),this._dockObserver=void 0,this._templates?.destroy(),this._templates=void 0}_noteInteraction(e){this._lastInteraction=e;const t=this._config?.auto_rotate?.resume_after??0;this._rotatePausedUntil=e+1e3*t}_syncTimer(){const e=!(!this._config?.auto_rotate&&!this._config?.idle_return)&&this.isConnected;e&&!this._timer?(this._lastInteraction=this._lastRotate=Date.now(),this._timer=setInterval(()=>this._tick(Date.now()),1e3)):e||this._stopTimer()}_stopTimer(){this._timer&&clearInterval(this._timer),this._timer=void 0}_tick(e){const t=this._config;if(!t||!this._built)return;if(this._editing)return void(this._lastInteraction=this._lastRotate=e);const a=e-this._lastInteraction,o=t.auto_rotate;if(o){if(e<this._rotatePausedUntil)return void(this._lastRotate=e);if(e-this._lastRotate>=1e3*o.interval){this._lastRotate=e;const t=this._nextRotatable(this._selected);t!==this._selected&&this._selectIndex(t,!1)}}else if(t.idle_return&&a>=1e3*t.idle_return){const t=this._computeDefaultIndex();t!==this._selected&&this._selectIndex(t,!1),this._lastInteraction=e}}_nextRotatable(e){return this._stepContent(e,1,!0)}_computeCardKey(e){return e.storage_key?e.storage_key:`${"undefined"!=typeof location?location.pathname:""}#${e.tabs.map(e=>e.name??"").join("|")}`}async _build(){if(!this._config)return;const e=await async function(){const e=await window.loadCardHelpers();return t=>e.createCardElement(t)}();this._manager=new Kt(e),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._cardConfigs()),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this._selected=Ht({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:this._computeDefaultIndex(),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(e=>e.name??""),entityValue:this._config.remember_entity?this._hass?.states?.[this._config.remember_entity]?.state:void 0}),this._selected=this._ensureContentTab(this._selected),this._config.history&&"undefined"!=typeof history&&history.replaceState(this._historyState(this._selected),"",location.href),this._lastEntityValue=this._rememberEntityState(),this._built=!0,this.requestUpdate()}set hass(e){this._hass=e,this._manager?.setHass(e),this._syncTemplates(),this._runAutoSelect(),this._syncRememberEntity(),this.requestUpdate()}_rememberEntityState(){const e="entity"===this._config?.remember?this._config.remember_entity:void 0;return e?this._hass?.states?.[e]?.state:void 0}_syncRememberEntity(){if(!this._built)return;const e=this._rememberEntityState();if(void 0===e||e===this._lastEntityValue)return;if(this._lastEntityValue=e,Date.now()<this._entityWriteGuard)return;const t=Math.trunc(Number(e));!Number.isFinite(t)||t<0||t>=this._visibleTabs().length||t!==this._selected&&this._selectIndex(t,!1)}_runAutoSelect(){if(!this._config)return;const e=this._allTabs();if(!e.some(e=>e.auto_select))return;const t=e=>{const t=this._hass?.states?.[e.entity]?.state;return void 0!==t&&(void 0!==e.state?t===e.state:ka(t))},a=e.map(e=>!!e.auto_select&&t(e.auto_select)),o=this._autoPrev;if(this._autoPrev=a,o)for(let i=0;i<e.length;i++)if(a[i]&&!o[i]){const t=this._visibleTabs().indexOf(e[i]);if(t>=0){this._selectIndex(t);break}}}get hass(){return this._hass}_cardConfigs(){return this._allTabs().map(e=>wt(e)&&!e.card?.type?null:e.card)}_isContentTab(e){return!!e&&!e.disabled&&!wt(e)}_ensureContentTab(e){const t=this._visibleTabs();if(!t[e]||!wt(t[e]))return e;const a=t.findIndex(e=>!wt(e));return a>=0?a:e}_stepContent(e,t,a){const o=this._visibleTabs(),i=o.length;for(let r=1;r<i;r++){let n=e+t*r;if(a)n=(n%i+i)%i;else if(n<0||n>=i)return e;if(this._isContentTab(o[n]))return n}return e}_allTabs(){return this._config?this._genTabs.length?[...this._config.tabs,...this._genTabs]:this._config.tabs:[]}_visibleTabs(){return this._config?this._editing?this._allTabs():this._allTabs().filter(e=>!this._isHidden(e)):[]}_isHidden(e){return!It(e.visibility,this._hass,this._templateResolver)}_collectTemplates(){if(!this._config)return[];const e=[];this._config.auto_tabs?.template&&e.push(this._config.auto_tabs.template);const t=a=>{for(const o of a??[])"template"===o?.condition&&o.value_template&&e.push(o.value_template),Array.isArray(o?.conditions)&&t(o.conditions)};for(const a of this._allTabs()){Ft(a.badge)&&e.push(a.badge);for(const t of ho)Ft(a[t])&&e.push(a[t]);t(a.visibility),t(a.default_if),t(a.alert)}return e}_makeSubscribe(){if(this._hass?.connection?.subscribeMessage)return Ut(()=>this._hass)}_syncTemplates(){const e=this._collectTemplates();if(0===e.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const e=this._makeSubscribe();if(!e)return;this._templates=new qt(e),this._templates.addEventListener("change",()=>{this._syncGeneratedTabs(),this.requestUpdate()})}this._templates.track(e)}async _syncGeneratedTabs(){const e=this._config?.auto_tabs;if(!e||!this._manager)return;let t=this._templates?.result(e.template);const a=this._hass?.areas;"areas"===e.source&&Array.isArray(t)&&a&&(t=t.map(e=>e&&"object"==typeof e?{...e,icon:a[e.id]?.icon||e.icon}:e));const o=Nt(t,e),i=JSON.stringify(o);if(i===this._genKey)return;const r=this._visibleTabs()[this._selected]?.name;this._genKey=i,this._genTabs=o.map(kt),this._restoreSelection(r),await this._manager.build(this._cardConfigs()),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this.requestUpdate()}_restoreSelection(e){const t=this._visibleTabs();if(e){const a=t.findIndex(t=>t.name===e);if(a>=0)return void(this._selected=a)}this._selected>t.length-1&&(this._selected=Math.min(this._computeDefaultIndex(),Math.max(0,t.length-1)))}getCardSize(){if(this._collapsed)return 1;const e=this._visibleTabs()[this._selected];if(e&&"number"==typeof e.card_size)return e.card_size;const t=this._manager?.get(this._activeOriginalIndex());return t&&"function"==typeof t.getCardSize?t.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_computeDefaultIndex(){const e=this._visibleTabs();for(let o=0;o<e.length;o++){const t=e[o].default_if;if(Array.isArray(t)&&t.length>0&&It(t,this._hass,this._templateResolver))return o}const t=At(this._config),a=e.indexOf(this._allTabs()[t]??this._config.tabs[t]);return a>=0?a:0}_activeOriginalIndex(){const e=this._visibleTabs()[this._selected];return this._allTabs().indexOf(e)}_onSelect(e){const t=this._visibleTabs()[e.detail.index];if(void 0!==e.detail.child){this._collapsed=!1,e.detail.index!==this._selected&&this._selectIndex(e.detail.index);const a=this._manager?.get(this._allTabs().indexOf(t));return void this.updateComplete.then(()=>a?.selectTab?.(e.detail.child))}if(wt(t))this._runAction(t.tap_action,"tap");else{if(this._config?.collapsible){if(e.detail.index===this._selected)return void(this._collapsed=!this._collapsed);this._collapsed=!1}this._selectIndex(e.detail.index)}}_scrollToSection(e){this._spySuppressUntil=Date.now()+900,this.updateComplete.then(()=>{(this.renderRoot?.querySelector?.(`.panel[data-index="${e}"]`))?.scrollIntoView?.({behavior:"smooth",block:"start"})})}_syncSpyObserver(){if(!this._config?.scroll_spy||"undefined"==typeof IntersectionObserver)return this._spyObserver?.disconnect(),this._spyObserver=void 0,void(this._spyObserved=[]);const e=[...this.renderRoot?.querySelectorAll?.(".panel")??[]];if(e.length!==this._spyObserved.length||!e.every((e,t)=>e===this._spyObserved[t])||!this._spyObserver){this._spyObserver?.disconnect(),this._spyInView.clear(),this._spyObserver=new IntersectionObserver(e=>this._onSpyEntries(e),{rootMargin:"-120px 0px -55% 0px"});for(const t of e)this._spyObserver.observe(t);this._spyObserved=e}}_onSpyEntries(e){for(const a of e){const e=Number(a.target.dataset?.index);Number.isInteger(e)&&(a.isIntersecting?this._spyInView.add(e):this._spyInView.delete(e))}if(Date.now()<this._spySuppressUntil||0===this._spyInView.size)return;const t=Math.min(...this._spyInView);if(t!==this._selected){this._spyDriven=!0;try{this._selectIndex(t,!1)}finally{this._spyDriven=!1}}}_runAction(e,t){if(!e||!this._hass)return;"perform-action"===e.action&&"string"==typeof e.perform_action&&(e={...e,action:"call-service",service:e.perform_action,service_data:e.data??e.service_data});const a={entity:e?.entity,[`${t}_action`]:e};De(this,this._hass,a,t)}_onTabAction(e){const t=this._visibleTabs()[e.detail.index];if(!t||!this._hass)return;const a="badge"===e.detail.kind?t.badge_action:t.hold_action;this._runAction(a,"badge"===e.detail.kind?"tap":"hold")}selectTab(e){const t=this._visibleTabs();let a=-1;if("number"==typeof e)a=e;else{const o=e=>e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");a=t.findIndex(t=>t.name===e),a<0&&(a=t.findIndex(t=>void 0!==t.name&&o(t.name)===o(String(e))))}return!!this._isContentTab(t[a])&&(this._collapsed=!1,a!==this._selected&&this._selectIndex(a),!0)}get selectedTab(){return this._visibleTabs()[this._selected]?.name}_selectIndex(e,t=!0){const a=this._visibleTabs(),o=a[this._selected],i=e!==this._selected;this._selected=e,i&&(this._runAction(o?.leave_action,"tap"),this._runAction(a[e]?.enter_action,"tap"));const r=a[this._selected];if(i&&this.dispatchEvent(new CustomEvent("tabdeck-tab-changed",{detail:{index:e,name:r?.name,deck:this},bubbles:!0,composed:!0})),this._config&&t&&!this._editing){const e="browser"===(n={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:r?.name}).mode?((n.storage??globalThis.localStorage)?.setItem(Rt(n.cardKey),String(n.index)),{}):"url"===n.mode?{hash:"#tab="+(n.tabName?n.tabName:String(n.index))}:{};this._config.history&&!this._fromPop?history.pushState(this._historyState(this._selected),"",e.hash??location.href):e.hash&&"undefined"!=typeof location&&history.replaceState(this._config.history?this._historyState(this._selected):null,"",e.hash),"entity"===this._config.remember&&this._writeRememberEntity(this._selected)}var n;this._config?.scroll_spy&&!this._spyDriven&&this._scrollToSection(e),this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}_writeRememberEntity(e){const t=this._config?.remember_entity,a=this._hass;if(!t||!a?.callService||!a.states?.[t])return;this._entityWriteGuard=Date.now()+1500;const o=t.split(".")[0];"input_number"===o?a.callService("input_number","set_value",{entity_id:t,value:e}):"input_text"===o&&a.callService("input_text","set_value",{entity_id:t,value:String(e)})}_applySwipe(e,t){const a=function(e,t,a={}){const o=a.minDistance??50,i=a.maxDuration??800,r=a.ratio??1.5,n=t.x-e.x,s=t.y-e.y;return t.t-e.t>i||Math.abs(n)<o||Math.abs(n)<Math.abs(s)*r?null:n<0?"next":"prev"}(e,t);if(!a||!this._config)return;const o=this._stepContent(this._selected,"next"===a?1:-1,this._config.swipe_wrap);o!==this._selected&&this._selectIndex(o)}updated(e){super.updated(e);const t=this._visibleTabs();this._selected>t.length-1&&(this._selected=0),e.has("_selected")&&void 0!==e.get("_selected")&&!this._config?.scroll_spy&&this._animatePanel(),this._applyStyles(),this._syncSpyObserver(),this._syncDock()}_syncDock(){if(!this._config?.dock||this._editing||!this.isConnected)return this._dockObserver?.disconnect(),void(this._dockObserver=void 0);if(this._dockObserver||"undefined"==typeof ResizeObserver)return;const e=this._dashboardPanel();e&&(this._dockObserver=new ResizeObserver(()=>this._measureDock(e)),this._dockObserver.observe(e),this._measureDock(e))}_dashboardPanel(){let e=this;for(;e;){if(e instanceof Element&&/^(HUI-ROOT|HA-PANEL-LOVELACE)$/.test(e.tagName))return e;e=e.parentNode??e.host??null}}_measureDock(e){const t=e.getBoundingClientRect();0!==t.width&&(this.style.setProperty("--tabdeck-dock-left",`${Math.max(0,Math.round(t.left))}px`),this.style.setProperty("--tabdeck-dock-right",`${Math.max(0,Math.round(window.innerWidth-t.right))}px`))}_applyStyles(){for(const a of this._appliedStyleKeys)this.style.removeProperty(a);const e=this._visibleTabs()[this._selected],t={...this._config?.styles??{},...e?.styles??{}};this._appliedStyleKeys=Object.keys(t);for(const[a,o]of Object.entries(t))this.style.setProperty(a,String(o))}_animatePanel(){const e=this._config?.transition;if(!e||"none"===e)return;if("function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=this.renderRoot?.querySelector?.(".panel:not([hidden])");if(!t||"function"!=typeof t.animate)return;const a="slide"===e?[{opacity:0,transform:"translateX(12px)"},{opacity:1,transform:"translateX(0)"}]:[{opacity:0},{opacity:1}];t.animate(a,{duration:180,easing:"ease"})}render(){if(!this._config||!this._built)return Z;const e=this._visibleTabs();if(0===e.length)return F`<div class="empty"></div>`;const t=this._config;if(this._isSplit)return this._renderSplit(e);const a=t.dock&&!this._editing,o=F`
      <tabdeck-tabbar
        .items=${e.map(e=>({name:this._text(e.name),subtitle:this._text(e.subtitle)??("menu"===e.group?.display?this._groupChild.get(e):void 0),icon:this._text(e.icon),accent:this._text(e.accent),color:this._text(e.color),disabled:e.disabled,badgeColor:e.badge_color,holdAction:!!e.hold_action,badgeAction:!!e.badge_action,action:wt(e),badge:this._resolveBadgeFinal(e),alert:this._isAlerting(e),ghost:this._editing&&this._isHidden(e),fab:e.fab,menu:"menu"===e.group?.display?e.group.items:void 0}))}
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
        .overflowMenu=${t.overflow_menu}
        .barLabel=${t.aria_label}
        .language=${pa(this._hass)}
        .barBackground=${t.bar_background}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `,i=F`
      <div
        class="content ${t.content_arrows&&!t.scroll_spy?"with-arrows":""}"
        id="tabdeck-panel"
        role="tabpanel"
        ?hidden=${this._collapsed}
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @tabdeck-tab-changed=${this._onNestedChanged}
      >
        ${t.content_arrows&&!t.scroll_spy?this._renderArrows():Z}
        ${t.header&&!t.scroll_spy&&e[this._selected]?F`<div class="content-header">
              <span class="content-title">${this._text(e[this._selected].name)??""}</span>
              ${this._text(e[this._selected].subtitle)?F`<span class="content-subtitle"
                    >${this._text(e[this._selected].subtitle)}</span
                  >`:Z}
            </div>`:Z}
        ${e.map((e,a)=>{const o=this._allTabs().indexOf(e),i=a===this._selected,r=t.scroll_spy;return F`
            <div class="panel ${r?"section":""}" data-index=${a} ?hidden=${!r&&!i}>
              ${r&&t.header&&!wt(e)?F`<div class="section-title">${this._text(e.name)??""}</div>`:Z}
              ${r||!t.unmount_hidden||i?this._manager?.get(o):Z}
            </div>
          `})}
      </div>
    `;return F`
      <div class="root pos-${a?"bottom":t.position} ${a?"docked":""} ${t.hide_bar?"no-bar":""}">
        ${t.hide_bar?i:a||"bottom"===t.position?F`${i}${o}`:F`${o}${i}`}
      </div>
    `}_renderArrows(){const e=!!this._config?.swipe_wrap,t=this._stepContent(this._selected,-1,e),a=this._stepContent(this._selected,1,e),o=pa(this._hass);return F`
      ${t!==this._selected?F`<button class="nav-arrow prev" aria-label=${ba(o,"card.prev_tab")} @click=${()=>this._selectIndex(t)}>‹</button>`:Z}
      ${a!==this._selected?F`<button class="nav-arrow next" aria-label=${ba(o,"card.next_tab")} @click=${()=>this._selectIndex(a)}>›</button>`:Z}
    `}_isAlerting(e){return!(!e.alert||!this._hass)&&It(e.alert,this._hass,this._templateResolver)}_text(e){if(!Ft(e))return e;const t=this._templates?.result(e);return null==t||""===String(t).trim()?void 0:String(t).trim()}_resolveBadgeFinal(e){const t=this._resolveBadge(e.badge);if(!this._config?.hide_inactive_badge||ka(t))return"dot"===this._config?.badge_display?t:Ge(t,e.badge_format??this._config?.badge_format)}_resolveBadge(e){if(!e)return;if(Ft(e)){const t=this._templates?.result(e);return null==t?void 0:String(t)}if(!this._hass)return;const t=this._hass.states[e];return t?t.state:e}static{this.styles=n`
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
  `}};ga([Te()],uo.prototype,"_config",void 0),ga([Te()],uo.prototype,"_selected",void 0),ga([Te()],uo.prototype,"_built",void 0),ga([Te()],uo.prototype,"_width",void 0),ga([Te()],uo.prototype,"_collapsed",void 0),ga([Te()],uo.prototype,"_genTabs",void 0),uo=ga([ve("tabdeck-card")],uo),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{uo as TabdeckCard};