var t,e,i,s,o,a,r,n,l,c,d,h,p,u,b,_,m,f,g,y,v,x,$,w,k,A,S,T,C,E,z,H,P,M,O,L,N,R,B,V,U,D,I,j,q,K,W,F,J,Z,G,X,Y,Q,tt,et,it,st,ot,at,rt,nt,lt=Object.defineProperty,ct=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(T){throw i=[T],T}},dt=(t,e)=>{let i={};for(var s in t)lt(i,s,{get:t[s],enumerable:!0});return e||lt(i,Symbol.toStringTag,{value:"Module"}),i},ht=ct(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=/* @__PURE__ */new WeakMap,o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}},a=t=>new o("string"==typeof t?t:t+"",void 0,i),r=(t,...e)=>new o(1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]),t,i),n=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),pt=ct(()=>{ht(),({is:c,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:b}=Object),_=globalThis,m=_.trustedTypes,f=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:x},Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=/* @__PURE__ */new WeakMap,w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);o?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const a=o.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const a=this.constructor;if(!1===s&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=/* @__PURE__ */new Map,w[y("finalized")]=/* @__PURE__ */new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2")});function ut(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}function bt(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=bt(t,o._$AS(t,e.values),o,s)),e}var _t,mt,ft,gt,yt,vt,xt=ct(()=>{k=globalThis,A=t=>t,S=k.trustedTypes,T=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,H=`<${z="?"+E}>`,P=document,M=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,N=t=>L(t)||"function"==typeof t?.[Symbol.iterator],R="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,U=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,q=/^(?:script|style|textarea|title)$/i,K=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=K(1),K(2),K(3),F=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Z=/* @__PURE__ */new WeakMap,G=P.createTreeWalker(P,129),X=(t,e)=>{const i=t.length-1,s=[];let o,a=2===e?"<svg>":3===e?"<math>":"",r=B;for(let n=0;n<i;n++){const e=t[n];let i,l,c=-1,d=0;for(;d<e.length&&(r.lastIndex=d,l=r.exec(e),null!==l);)d=r.lastIndex,r===B?"!--"===l[1]?r=V:void 0!==l[1]?r=U:void 0!==l[2]?(q.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=o??B,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?D:'"'===l[3]?j:I):r===j||r===I?r=D:r===V||r===U?r=B:(r=D,o=void 0);const h=r===D&&t[n+1].startsWith("/>")?" ":"";a+=r===B?e+H:c>=0?(s.push(i),e.slice(0,c)+C+e.slice(c)+E+h):e+E+(-2===c?n:h)}return[ut(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]},Y=class t{constructor({strings:e,_$litType$:i},s){let o;this.parts=[];let a=0,r=0;const n=e.length-1,l=this.parts,[c,d]=X(e,i);if(this.el=t.createElement(c,s),G.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&l.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=d[r++],i=o.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?it:"?"===s[1]?st:"@"===s[1]?ot:et}),o.removeAttribute(t)}else t.startsWith(E)&&(l.push({type:6,index:a}),o.removeAttribute(t));if(q.test(o.tagName)){const t=o.textContent.split(E),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),G.nextNode(),l.push({type:2,index:++a});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===z)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(E,t+1));)l.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}},Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),a=0,r=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new tt(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new at(o,this,t)),this._$AV.push(e),n=i[++r]}a!==n?.index&&(o=G.nextNode(),a++)}return G.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},tt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=bt(this,t,e),O(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):N(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(ut(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Y(t)),e}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const a of e)o===i.length?i.push(s=new t(this.O(M()),this.O(M()),this,this.options)):s=i[o],s._$AI(a),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=J}_$AI(t,e=this,i,s){const o=this.strings;let a=!1;if(void 0===o)t=bt(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==F,a&&(this._$AH=t);else{const s=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=bt(this,s[i+r],e,r),n===F&&(n=this._$AH[r]),a||=!O(n)||n!==this._$AH[r],n===J?t=J:t!==J&&(t+=(n??"")+o[r+1]),this._$AH[r]=n}a&&!s&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},it=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}},st=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}},ot=class extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=bt(this,t,e,0)??J)===F)return;const i=this._$AH,s=t===J&&i!==J||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==J&&(i===J||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){bt(this,t)}},rt=k.litHtmlPolyfillSupport,rt?.(Y,tt),(k.litHtmlVersions??=[]).push("3.3.3"),nt=(t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o}}),$t=ct(()=>{pt(),pt(),xt(),xt(),_t=globalThis,mt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}},mt._$litElement$=!0,mt.finalized=!0,_t.litElementHydrateSupport?.({LitElement:mt}),ft=_t.litElementPolyfillSupport,ft?.({LitElement:mt}),(_t.litElementVersions??=[]).push("4.2.2")}),wt=ct(()=>{}),kt=ct(()=>{pt(),xt(),$t(),wt()}),At=ct(()=>{gt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,i)=>"object"==typeof i?vt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var Tt=ct(()=>{pt(),yt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:x},vt=(t=yt,e,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=/* @__PURE__ */new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)}});function Ct(t){return St({...t,state:!0,attribute:!1})}var Et,zt,Ht,Pt,Mt,Ot,Lt,Nt,Rt,Bt,Vt=ct(()=>{Tt()}),Ut=ct(()=>{}),Dt=ct(()=>{}),It=ct(()=>{}),jt=ct(()=>{}),qt=ct(()=>{}),Kt=ct(()=>{}),Wt=ct(()=>{At(),Tt(),Vt(),Ut(),Dt(),It(),jt(),qt(),Kt()});var Ft,Jt,Zt,Gt,Xt,Yt,Qt,te=ct(()=>{!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Et||(Et={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(zt||(zt={})),Ht=["closed","locked","off"],Pt=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o},Mt=t=>{Pt(window,"haptic",t)},Ot=(t,e,i=!1)=>{i?history.replaceState(null,"",e):history.pushState(null,"",e),Pt(window,"location-changed",{replace:i})},Lt=(t,e,i=!0)=>{const s=function(t){return t.substr(0,t.indexOf("."))}(e),o="group"===s?"homeassistant":s;let a;switch(s){case"lock":a=i?"unlock":"lock";break;case"cover":a=i?"open_cover":"close_cover";break;default:a=i?"turn_on":"turn_off"}return t.callService(o,a,{entity_id:e})},Nt=(t,e)=>Lt(t,e,Ht.includes(t.states[e].state)),Rt=(t,e,i,s)=>{if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(t=>t.user===e.user.id)||(Mt("warning"),confirm(s.confirmation.text||`Are you sure you want to ${s.action}?`)))switch(s.action){case"more-info":(i.entity||i.camera_image)&&Pt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&Ot(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(Nt(e,i.entity),Mt("success"));break;case"call-service":{if(!s.service)return void Mt("failure");const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target),Mt("success");break}case"fire-dom-event":Pt(t,"ll-custom",s)}},Bt=(t,e,i,s)=>{let o;"double_tap"===s&&i.double_tap_action?o=i.double_tap_action:"hold"===s&&i.hold_action?o=i.hold_action:"tap"===s&&i.tap_action&&(o=i.tap_action),Rt(t,e,i,o)}});function ee(t,e,i){return e.includes(t)?t:i}function ie(t,e,i,s){const o=Number(t);return Number.isFinite(o)?Math.min(i,Math.max(e,o)):s}function se(t){if(t)return"string"==typeof t?{entity:t}:"object"==typeof t&&"string"==typeof t.entity?void 0===t.state?{entity:t.entity}:{entity:t.entity,state:String(t.state)}:void 0}function oe(t){const e=t?.attributes??{};let i=t?.card??{};if(Array.isArray(t?.cards)&&t.cards.length>0){const e=Number(t?.columns);i=Number.isFinite(e)&&e>1?{type:"grid",columns:e,square:!1,cards:t.cards}:{type:"vertical-stack",cards:t.cards}}return{name:t?.name??e.label??void 0,subtitle:t?.subtitle??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,color:t?.color??void 0,badge:t?.badge??void 0,badge_color:t?.badge_color??void 0,disabled:!!t?.disabled||void 0,card_size:"number"==typeof t?.card_size?t.card_size:void 0,hold_action:t?.hold_action??void 0,badge_action:t?.badge_action??void 0,auto_select:se(t?.auto_select),default_if:t?.default_if??void 0,visibility:t?.visibility??void 0,card:i}}function ae(t){const e=Array.isArray(t?.tabs)?t.tabs:[],i=function(t){if(t&&"object"==typeof t&&"string"==typeof t.template&&""!==t.template.trim())return{template:t.template,tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:void 0}}(t?.auto_tabs);if(0===e.length&&!i)throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");const s=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:s,position:ee(t?.position,Ft,"top"),style:ee(t?.style,Jt,"underline"),tab_display:ee(t?.tab_display,Gt,"both"),align:ee(t?.align,Xt,"start"),badge_display:ee(t?.badge_display,Yt,"text"),hide_inactive_badge:Boolean(t?.hide_inactive_badge),transition:ee(t?.transition,Qt,"none"),indicator_size:ie(t?.indicator_size,1,16,3),indicator_radius:void 0===t?.indicator_radius?void 0:ie(t?.indicator_radius,0,999,0),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:ee(t?.remember,Zt,"none"),remember_entity:t?.remember_entity??void 0,storage_key:t?.storage_key??void 0,lazy:Boolean(t?.lazy),unmount_hidden:Boolean(t?.unmount_hidden),swipe_wrap:Boolean(t?.swipe_wrap),swipe_mouse:Boolean(t?.swipe_mouse),animated:void 0===t?.animated||Boolean(t.animated),accent_indicator:void 0===t?.accent_indicator||Boolean(t.accent_indicator),header:Boolean(t?.header),aria_label:t?.aria_label??void 0,sticky:Boolean(t?.sticky),elevation:Boolean(t?.elevation),scroll_buttons:Boolean(t?.scroll_buttons),overflow_menu:Boolean(t?.overflow_menu),bar_background:t?.bar_background??void 0,swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:e.map(oe),auto_tabs:i}}function re(t){const e=t.default_tab;if("string"==typeof e){const i=t.tabs.findIndex(t=>t.name===e);return i>=0?i:0}return"number"==typeof e&&e>=0&&e<t.tabs.length?e:0}var ne=ct(()=>{Ft=["top","bottom","left","right"],Jt=["underline","pill","segmented","boxed","text","rail"],Zt=["none","browser","url","entity"],Gt=["both","icon","label"],Xt=["start","center","end","justify"],Yt=["text","dot"],Qt=["none","fade","slide"]});kt(),Wt(),te(),ne();var le=/\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g,ce=/^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;function de(t,e){if("item"===e)return t;const i=e.split(".");let s=t;for(let o=1;o<i.length;o++)s=null==s?void 0:s[i[o]];return s}function he(t,e,i){if("string"==typeof t){const s=t.match(ce);if(s){const t=s[1];if("index"===t)return i;const o=de(e,t);return void 0===o?"":o}return t.replace(le,(t,s)=>String("index"===s?i:de(e,s)??""))}if(Array.isArray(t))return t.map(t=>he(t,e,i));if(t&&"object"==typeof t){const s={};for(const o of Object.keys(t))s[o]=he(t[o],e,i);return s}return t}function pe(t,e){if(!Array.isArray(t))return[];const i=e.tab_template,s=[];return t.forEach((t,e)=>{i?s.push(he(i,t,e)):t&&"object"==typeof t&&!Array.isArray(t)&&s.push(t)}),s}var ue=["sun","mon","tue","wed","thu","fri","sat"];function be(t){const e=/^(\d{1,2}):(\d{2})/.exec(String(t));return e?60*Number(e[1])+Number(e[2]):null}function _e(t){return Array.isArray(t?.conditions)?t.conditions:[]}function me(t,e,i){switch(t?.condition){case"state":return function(t,e){const i=e.states[t.entity];if(!i)return!1;const s=i.state;return Array.isArray(t.state)?t.state.includes(s):void 0!==t.state?s===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(s):s!==t.state_not)}(t,e);case"numeric_state":return function(t,e){const i=e.states[t.entity];if(!i)return!1;const s=Number(i.state);return!Number.isNaN(s)&&(void 0===t.above||s>Number(t.above))&&(void 0===t.below||s<Number(t.below))&&(void 0!==t.above||void 0!==t.below)}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"time":return function(t,e=/* @__PURE__ */new Date){const i=void 0!==t.after,s=void 0!==t.before,o=Array.isArray(t.weekday)&&t.weekday.length>0;if(!i&&!s&&!o)return!1;const a=60*e.getHours()+e.getMinutes();let r=!0;if(i&&s){const e=be(t.after),i=be(t.before);if(null===e||null===i)return!1;r=e<=i?a>=e&&a<i:a>=e||a<i}else if(i){const e=be(t.after);if(null===e)return!1;r=a>=e}else if(s){const e=be(t.before);if(null===e)return!1;r=a<e}if(r&&o){const i=ue[e.getDay()];r=t.weekday.map(t=>String(t).toLowerCase().slice(0,3)).includes(i)}return r}(t);case"user":return function(t,e){const i=e?.user?.id;return!(!i||!Array.isArray(t.users))&&t.users.includes(i)}(t,e);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,i);case"and":return _e(t).every(t=>me(t,e,i));case"or":return _e(t).some(t=>me(t,e,i));case"not":return!_e(t).some(t=>me(t,e,i));default:return!1}}function fe(t,e,i){return!t||0===t.length||(!e||t.every(t=>me(t,e,i)))}function ge(t){return"tabdeck-card:"+t}function ye(t,e,i){return t>=0&&t<e?t:i}function ve(t){const{mode:e,cardKey:i,defaultIndex:s,tabCount:o}=t;if("entity"===e){const e=Number(t.entityValue);return void 0!==t.entityValue&&Number.isFinite(e)?ye(Math.trunc(e),o,s):ye(s,o,0)}if("url"===e){const e=function(t,e){const i=/(?:^|[#&])tab=([^&]+)/.exec(t||"");if(!i)return null;const s=decodeURIComponent(i[1]),o=e.indexOf(s);if(o>=0)return o;const a=Number(s);return Number.isInteger(a)&&a>=0?a:null}(t.hash??"",t.tabNames??[]);if(null!==e)return ye(e,o,s)}if("browser"===e){const e=(t.storage??globalThis.localStorage)?.getItem(ge(i));if(null!=e)return ye(Number(e),o,s)}return ye(s,o,0)}var xe=class extends EventTarget{constructor(t){super(),this._configs=[],this._elements=[],this._create=t}async build(t){this._configs=t.slice(),this._elements=t.map((t,e)=>this._make(t,e))}_make(t,e){const i=this._create(t);return this._hass&&(i.hass=this._hass),i.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._rebuild(e)}),i}get(t){return this._elements[t]}all(){return this._elements}setHass(t){this._hass=t;for(const e of this._elements)e&&(e.hass=t)}notifyVisible(t){const e=this._elements[t];e&&e.dispatchEvent(new Event("resize"))}async _rebuild(t){const e=this._make(this._configs[t],t);this._hass&&(e.hass=this._hass),this._elements[t]=e,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:t}}))}};function $e(t){return!!t&&(t.includes("{{")||t.includes("{%"))}var we,ke=class extends EventTarget{constructor(t){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[i,s]of this._entries)e.has(i)||(s.unsub(),this._entries.delete(i));for(const i of e){if(this._entries.has(i))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(i,t),t.unsub=this._subscribe(i,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(i=e.result)?i:"number"==typeof i?0!==i:"string"==typeof i&&["1","true","yes","on","enable"].includes(i.trim().toLowerCase()));var i}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}};var Ae=ct(()=>{we=3});function Se(t,e,i,s){var o,a=arguments.length,r=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(a<3?o(r):a>3?o(e,i,r):o(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r}var Te,Ce,Ee=ct(()=>{});function ze(t){return null!=t&&!Te.has(String(t).trim().toLowerCase())}var He,Pe,Me,Oe,Le,Ne,Re=ct(()=>{Ee(),Te=/* @__PURE__ */new Set(["","0","off","false","no","none","unavailable","unknown","closed"]),Ce=class extends mt{constructor(...t){super(...t),this.badgeAction=!1,this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}updated(){this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color")}render(){const t=!!this.icon,e="label"!==this.display&&t,i="icon"!==this.display||!t;return W`
      <div class="inner">
        ${e?W`<ha-icon icon=${this.icon}></ha-icon>`:J}
        ${i&&this.label?W`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?W`<span class="subtitle">${this.subtitle}</span>`:J}
            </span>`:J}
        ${this._renderBadge()}
      </div>
    `}_onBadgeClick(t){this.badgeAction&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("badge-click",{bubbles:!0,composed:!0})))}_renderBadge(){const t=this.badgeColor?`background:${this.badgeColor}`:"",e=this.badgeAction?" clickable":"";return"dot"===this.badgeDisplay?ze(this.badge)?W`<span class="badge-dot${e}" part="badge-dot" style=${t} @click=${this._onBadgeClick}></span>`:J:this.badge?W`<span
          class="badge${e}"
          part="badge"
          style=${t}
          aria-label=${`badge: ${this.badge}`}
          @click=${this._onBadgeClick}
          >${this.badge}</span>`:J}static{this.styles=r`
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
  `}},Se([St()],Ce.prototype,"label",void 0),Se([St()],Ce.prototype,"subtitle",void 0),Se([St()],Ce.prototype,"icon",void 0),Se([St()],Ce.prototype,"badge",void 0),Se([St()],Ce.prototype,"badgeColor",void 0),Se([St({type:Boolean})],Ce.prototype,"badgeAction",void 0),Se([St()],Ce.prototype,"badgeDisplay",void 0),Se([St()],Ce.prototype,"accent",void 0),Se([St()],Ce.prototype,"color",void 0),Se([St()],Ce.prototype,"display",void 0),Se([St({type:Boolean,reflect:!0})],Ce.prototype,"selected",void 0),Se([St({type:Boolean,reflect:!0})],Ce.prototype,"disabled",void 0),Ce=Se([gt("tabdeck-tab")],Ce)}),Be=ct(()=>{kt(),Wt(),Ae(),Re(),Ee(),He=class extends mt{constructor(...t){super(...t),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this.scrollButtons=!1,this.overflowMenu=!1,this._menuOpen=!1,this.barLabel="Tabs",this._ready=!1,this._overflow=!1,this._resizeRaf=0,this._suppressClick=!1,this._onKeydown=t=>{const e="left"===this.position||"right"===this.position,i=e?"ArrowDown":"ArrowRight",s=e?"ArrowUp":"ArrowLeft";let o=null;t.key===i?o=this._step(this.selected,1):t.key===s?o=this._step(this.selected,-1):"Home"===t.key?o=this._firstEnabled():"End"===t.key&&(o=this._firstEnabled(!0)),null!==o&&(t.preventDefault(),this._select(o))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.setAttribute("aria-label",this.barLabel||"Tabs"),this.addEventListener("keydown",this._onKeydown),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0,this._position()}))}))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),this._resizeObserver?.disconnect(),super.disconnectedCallback()}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_emitAction(t,e){this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:t,kind:e},bubbles:!0,composed:!0}))}_onPointerDown(t){this._suppressClick=!1,this.items[t]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._suppressClick=!0,this._emitAction(t,"hold")},500))}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(t){this._cancelHold(),this._suppressClick?this._suppressClick=!1:this._select(t)}_step(t,e){const i=this.items.length;for(let s=1;s<=i;s++){const o=(t+e*s+i*s)%i;if(!this.items[o]?.disabled)return o}return t}_firstEnabled(t=!1){const e=this.items.length;for(let i=0;i<e;i++){const s=t?e-1-i:i;if(!this.items[s]?.disabled)return s}return 0}_position(){const t=this.renderRoot,e=t?.querySelector(".indicator");if(!e)return;const i=(t?.querySelectorAll("tabdeck-tab"))?.[this.selected],s=i?function(t,e,i,s=we){if(!t||t.offsetWidth<=0)return null;const o=s>0?s:we;if("text"===i)return null;if("pill"===i||"segmented"===i||"boxed"===i||"rail"===i)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-o,width:t.offsetWidth,height:o};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:o};case"left":return{left:t.offsetLeft+t.offsetWidth-o,top:t.offsetTop,width:o,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:o,height:t.offsetHeight}}}({offsetLeft:i.offsetLeft,offsetTop:i.offsetTop,offsetWidth:i.offsetWidth,offsetHeight:i.offsetHeight},this.position,this.tabStyle,this.indicatorSize):null;s?(e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`,e.style.height=`${s.height}px`,e.style.opacity="1"):e.style.opacity="0"}_applyAccent(){const t=this.accentIndicator?this.items[this.selected]?.accent:void 0;t?this.style.setProperty("--tabdeck-accent",t):this.style.removeProperty("--tabdeck-accent"),null!=this.indicatorRadius?this.style.setProperty("--tabdeck-indicator-radius",`${this.indicatorRadius}px`):this.style.removeProperty("--tabdeck-indicator-radius")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background="var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.top="0",this.style.bottom="");else for(const t of["position","zIndex","background","top","bottom"])this.style.removeProperty(t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()))}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(){this.setAttribute("aria-label",this.barLabel||"Tabs"),this._applyAccent(),this._applySticky(),this._position(),this._updateOverflow(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}get _horizontal(){return"top"===this.position||"bottom"===this.position}_updateOverflow(){if(!this.scrollButtons&&!this.overflowMenu||!this._horizontal)return void(this._overflow&&(this._overflow=!1));const t=this.renderRoot.querySelector(".bar"),e=!!t&&t.scrollWidth-t.clientWidth>1;e!==this._overflow&&(this._overflow=e)}_scrollBy(t){const e=this.renderRoot.querySelector(".bar");e&&e.scrollBy({left:t*e.clientWidth*.8,behavior:"smooth"})}_pickFromMenu(t){this._menuOpen=!1,this.items[t]?.disabled||this._select(t)}render(){const t=this._ready&&this.animated?" animate":"",e=this.scrollButtons&&this._horizontal&&this._overflow,i=this.overflowMenu&&this._horizontal&&this._overflow;return W`
      <div class="bar-wrap ${e||i?"has-arrows":""}">
      ${e?W`<button class="scroll-btn left" aria-label="Scroll left" @click=${()=>this._scrollBy(-1)}>‹</button>`:""}
      <div
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation?"elevated":""}"
        part="bar"
        style=${this.barBackground?`background:${this.barBackground}`:""}
      >
        <div class="indicator${t}" part="indicator"></div>
        ${this.items.map((t,e)=>W`
            <tabdeck-tab
              .label=${t.name}
              .subtitle=${t.subtitle}
              .icon=${t.icon}
              .badge=${t.badge}
              .badgeColor=${t.badgeColor}
              .badgeAction=${!!t.badgeAction}
              .badgeDisplay=${this.badgeDisplay}
              @badge-click=${()=>this._emitAction(e,"badge")}
              .accent=${t.accent}
              .color=${t.color}
              .disabled=${!!t.disabled}
              .display=${this.display}
              .selected=${e===this.selected}
              aria-controls="tabdeck-panel"
              @click=${()=>this._onTabClick(e)}
              @pointerdown=${()=>this._onPointerDown(e)}
              @pointerup=${()=>this._cancelHold()}
              @pointerleave=${()=>this._cancelHold()}
              @pointercancel=${()=>this._cancelHold()}
            ></tabdeck-tab>
          `)}
      </div>
      ${e?W`<button class="scroll-btn right" aria-label="Scroll right" @click=${()=>this._scrollBy(1)}>›</button>`:""}
      ${i?W`<button
              class="overflow-btn"
              aria-label="All tabs"
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${()=>this._menuOpen=!this._menuOpen}
            >
              ⋯
            </button>
            ${this._menuOpen?W`<div class="overflow-menu" role="menu">
                  ${this.items.map((t,e)=>W`<button
                      class="overflow-item ${e===this.selected?"current":""}"
                      role="menuitem"
                      ?disabled=${t.disabled}
                      @click=${()=>this._pickFromMenu(e)}
                    >
                      ${t.name??`Tab ${e+1}`}
                    </button>`)}
                </div>`:""}`:""}
      </div>
    `}static{this.styles=r`
    :host {
      display: block;
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
  `}},Se([St({attribute:!1})],He.prototype,"items",void 0),Se([St({type:Number})],He.prototype,"selected",void 0),Se([St()],He.prototype,"position",void 0),Se([St()],He.prototype,"tabStyle",void 0),Se([St()],He.prototype,"display",void 0),Se([St()],He.prototype,"align",void 0),Se([St()],He.prototype,"badgeDisplay",void 0),Se([St()],He.prototype,"scrollable",void 0),Se([St({type:Boolean})],He.prototype,"animated",void 0),Se([St({type:Boolean})],He.prototype,"accentIndicator",void 0),Se([St({type:Number})],He.prototype,"indicatorSize",void 0),Se([St({type:Number})],He.prototype,"indicatorRadius",void 0),Se([St({type:Boolean})],He.prototype,"sticky",void 0),Se([St({type:Boolean})],He.prototype,"elevation",void 0),Se([St({type:Boolean})],He.prototype,"scrollButtons",void 0),Se([St({type:Boolean})],He.prototype,"overflowMenu",void 0),Se([Ct()],He.prototype,"_menuOpen",void 0),Se([St()],He.prototype,"barLabel",void 0),Se([St()],He.prototype,"barBackground",void 0),Se([Ct()],He.prototype,"_ready",void 0),Se([Ct()],He.prototype,"_overflow",void 0),He=Se([gt("tabdeck-tabbar")],He)}),Ve=/* @__PURE__ */dt({TabdeckCardEditor:()=>Ne,pickCardEditorTag:()=>Ue});function Ue(t){return t("hui-card-element-editor")?"hui-card-element-editor":t("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var De=ct(()=>{kt(),Wt(),Be(),Ee(),Pe=[{name:"name",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"accent",selector:{text:{}}},{name:"color",selector:{text:{}}},{name:"badge",selector:{text:{}}},{name:"badge_color",selector:{text:{}}},{name:"disabled",selector:{boolean:{}}},{name:"card_size",selector:{number:{min:1,max:20,step:1,mode:"box"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"badge_action",selector:{ui_action:{}}}],Me=[{name:"type",selector:{select:{mode:"dropdown",custom_value:!0,options:["entities","tile","button","light","thermostat","humidifier","weather-forecast","markdown","picture","picture-entity","picture-glance","glance","gauge","sensor","history-graph","statistics-graph","media-control","map","area","alarm-panel","calendar","todo-list","iframe","entity","conditional","vertical-stack","horizontal-stack","grid","custom:mushroom-template-card","custom:mushroom-entity-card","custom:button-card","custom:mini-graph-card","custom:apexcharts-card","custom:auto-entities","custom:bubble-card","custom:layout-card"].map(t=>({value:t,label:t}))}}}],Oe={name:"Tab name",subtitle:"Subtitle",icon:"Icon",accent:"Accent colour",color:"Text/icon colour",badge:"Badge (entity id or template)",badge_color:"Badge colour",disabled:"Disable tab (greyed, not selectable)",card_size:"Card size hint (rows)",hold_action:"Long-press action",badge_action:"Badge tap action"},Le={position:"Position",style:"Style",tab_display:"Tab display",align:"Tab alignment",badge_display:"Badge display",hide_inactive_badge:"Hide inactive badges (0/off)",transition:"Panel transition",indicator_size:"Indicator thickness (px)",indicator_radius:"Indicator corner radius (px)",remember:"Remember selected tab",remember_entity:"Remember entity (input_number/input_text)",storage_key:"Storage key (browser mode)",default_tab:"Default tab",scrollable:"Scrollable",lazy:"Lazy-mount inactive tabs",unmount_hidden:"Unmount hidden tabs (save memory)",swipe_wrap:"Swipe wraps around ends",animated:"Animate indicator",accent_indicator:"Colour indicator by tab accent",header:"Show header (active tab title above content)",aria_label:"Accessible name for the tab bar",sticky:"Sticky tab bar",elevation:"Raise bar with shadow",scroll_buttons:"Scroll buttons when bar overflows",overflow_menu:"Overflow ⋯ menu when bar overflows",bar_background:"Tab bar background colour",swipe:"Swipe to change tabs (mobile)",swipe_mouse:"Mouse drag to change tabs (desktop)"},Ne=class extends mt{constructor(...t){super(...t),this._editingTab=null,this._cardError=null,this._expanded=/* @__PURE__ */new Set,this._computeGlobalLabel=t=>Le[t.name]??t.name,this._computeTabLabel=t=>Oe[t.name]??t.name}setConfig(t){this._config=ae(t)}_emit(t){this._config=t,Pt(this,"config-changed",{config:t}),this.requestUpdate()}_patch(t){this._config&&this._emit({...this._config,...t})}_patchTab(t,e){if(!this._config)return;const i=this._config.tabs.map((i,s)=>s===t?{...i,...e}:i);this._emit({...this._config,tabs:i})}_addTab(){if(!this._config)return;const t=[...this._config.tabs,{name:`Tab ${this._config.tabs.length+1}`,card:{}}],e=this._config.tabs.length;this._expanded=new Set(this._expanded).add(e),this._emit({...this._config,tabs:t})}_expandAll(){this._config&&(this._expanded=new Set(this._config.tabs.map((t,e)=>e)))}_collapseAll(){this._expanded=/* @__PURE__ */new Set}_deleteTab(t){if(!this._config)return;const e=this._config.tabs.filter((e,i)=>i!==t);this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:e})}_duplicateTab(t){if(!this._config)return;const e=this._config.tabs[t];if(!e)return;const i=JSON.parse(JSON.stringify(e));i.name=`${e.name??`Tab ${t+1}`} copy`;const s=this._config.tabs.slice();s.splice(t+1,0,i),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:s})}_toggleExpanded(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onHeaderKeydown(t,e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleExpanded(t))}_editCardJson(t,e){let i;try{i=JSON.parse(e)}catch{return void(this._cardError=t)}this._cardError=null,this._patchTab(t,{card:i})}_onItemMoved(t){if(!this._config)return;const{oldIndex:e,newIndex:i}=t.detail??{};if(null==e||null==i||e===i||e<0||i<0||e>=this._config.tabs.length||i>=this._config.tabs.length)return;const s=this._config.tabs.slice(),[o]=s.splice(e,1);s.splice(i,0,o),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:s})}_warnings(){const t=this._config;if(!t)return[];const e=[],i=t.tabs.map(t=>t.name??"").filter(t=>t),s=i.filter((t,e)=>i.indexOf(t)!==e);return s.length>0&&e.push(`Duplicate tab names (${[...new Set(s)].join(", ")}). "Remember: url" and default-tab-by-name may be ambiguous.`),e}_move(t,e){if(!this._config)return;const i=t+e;if(i<0||i>=this._config.tabs.length)return;const s=this._config.tabs.slice();[s[t],s[i]]=[s[i],s[t]],this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:s})}_openCard(t){this._cardError=null,this._editingTab=t}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(t,e){e.stopPropagation();const i=e.detail?.config;i&&this._patchTab(t,{card:i})}_onTypeChosen(t,e){e.stopPropagation();const i=e.detail?.value?.type;i&&this._patchTab(t,{card:{type:i}})}_changeCardType(t){this._patchTab(t,{card:{}})}_onYamlCardChanged(t,e){e.stopPropagation();const i=e.detail;!1!==i?.isValid&&void 0!==i?.value&&this._patchTab(t,{card:i.value})}get _currentDefaultTab(){const t=this._config;for(let e=0;e<t.tabs.length;e++){const i=t.tabs[e].name??String(e);if(String(t.default_tab)===i||t.default_tab===e)return i}}_globalSchema(){const t=t=>t.map(t=>({value:t,label:t})),e=this._config.tabs.map((t,e)=>({value:t.name??String(e),label:t.name||`Tab ${e+1}`}));return[{name:"position",selector:{select:{mode:"dropdown",options:t(["top","bottom","left","right"])}}},{name:"style",selector:{select:{mode:"dropdown",options:t(["underline","pill","segmented","boxed","text","rail"])}}},{name:"tab_display",selector:{select:{mode:"dropdown",options:t(["both","icon","label"])}}},{name:"align",selector:{select:{mode:"dropdown",options:t(["start","center","end","justify"])}}},{name:"badge_display",selector:{select:{mode:"dropdown",options:t(["text","dot"])}}},{name:"hide_inactive_badge",selector:{boolean:{}}},{name:"transition",selector:{select:{mode:"dropdown",options:t(["none","fade","slide"])}}},{name:"indicator_size",selector:{number:{min:1,max:16,step:1,mode:"slider"}}},{name:"indicator_radius",selector:{number:{min:0,max:30,step:1,mode:"slider"}}},{name:"remember",selector:{select:{mode:"dropdown",options:t(["none","browser","url","entity"])}}},{name:"remember_entity",selector:{text:{}}},{name:"storage_key",selector:{text:{}}},{name:"default_tab",selector:{select:{mode:"dropdown",options:e}}},{name:"scrollable",selector:{select:{mode:"dropdown",options:t(["auto","true","false"])}}},{name:"lazy",selector:{boolean:{}}},{name:"unmount_hidden",selector:{boolean:{}}},{name:"swipe_wrap",selector:{boolean:{}}},{name:"animated",selector:{boolean:{}}},{name:"accent_indicator",selector:{boolean:{}}},{name:"header",selector:{boolean:{}}},{name:"aria_label",selector:{text:{}}},{name:"sticky",selector:{boolean:{}}},{name:"elevation",selector:{boolean:{}}},{name:"scroll_buttons",selector:{boolean:{}}},{name:"overflow_menu",selector:{boolean:{}}},{name:"bar_background",selector:{text:{}}},{name:"swipe",selector:{boolean:{}}},{name:"swipe_mouse",selector:{boolean:{}}}]}get _globalData(){const t=this._config;return{position:t.position,style:t.style,tab_display:t.tab_display,align:t.align,badge_display:t.badge_display,hide_inactive_badge:t.hide_inactive_badge,transition:t.transition,indicator_size:t.indicator_size,indicator_radius:t.indicator_radius,remember:t.remember,remember_entity:t.remember_entity??"",storage_key:t.storage_key??"",default_tab:this._currentDefaultTab,scrollable:String(t.scrollable),lazy:t.lazy,unmount_hidden:t.unmount_hidden,swipe_wrap:t.swipe_wrap,animated:t.animated,accent_indicator:t.accent_indicator,header:t.header,aria_label:t.aria_label??"",sticky:t.sticky,elevation:t.elevation,scroll_buttons:t.scroll_buttons,overflow_menu:t.overflow_menu,bar_background:t.bar_background??"",swipe:t.swipe,swipe_mouse:t.swipe_mouse}}_onGlobalChanged(t){t.stopPropagation();const e=t.detail.value??{},i="auto"===e.scrollable?"auto":"true"===e.scrollable||!0===e.scrollable;this._patch({position:e.position,style:e.style,tab_display:e.tab_display,align:e.align,badge_display:e.badge_display,hide_inactive_badge:!!e.hide_inactive_badge,transition:e.transition,indicator_size:e.indicator_size,indicator_radius:e.indicator_radius,remember:e.remember,remember_entity:e.remember_entity||void 0,storage_key:e.storage_key||void 0,default_tab:e.default_tab,scrollable:i,lazy:!!e.lazy,unmount_hidden:!!e.unmount_hidden,swipe_wrap:!!e.swipe_wrap,animated:!!e.animated,accent_indicator:!!e.accent_indicator,header:!!e.header,aria_label:e.aria_label||void 0,sticky:!!e.sticky,elevation:!!e.elevation,scroll_buttons:!!e.scroll_buttons,overflow_menu:!!e.overflow_menu,bar_background:e.bar_background||void 0,swipe:!!e.swipe,swipe_mouse:!!e.swipe_mouse})}_onTabFieldsChanged(t,e){e.stopPropagation();const i=e.detail.value??{};this._patchTab(t,{name:i.name??"",subtitle:i.subtitle||void 0,icon:i.icon||void 0,accent:i.accent||void 0,color:i.color||void 0,badge:i.badge||void 0,badge_color:i.badge_color||void 0,disabled:!!i.disabled||void 0,card_size:"number"==typeof i.card_size?i.card_size:void 0,hold_action:i.hold_action??void 0,badge_action:i.badge_action??void 0})}render(){return this._config?null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView():W``}_renderCardView(t){const e=this._config.tabs[t];if(!e)return this._editingTab=null,this._renderListView();const i=!!e.card?.type;return W`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← Back</button>
          <span class="card-editor-title">${e.name||`Tab ${t+1}`}</span>
          ${i?W`<button class="change-card-type" @click=${()=>this._changeCardType(t)}>
                Change card type
              </button>`:J}
        </div>
        ${i?this._renderCardEditor(t,e):this._renderCardTypeChooser(t)}
      </div>
    `}_renderCardTypeChooser(t){return W`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${Me}
          .computeLabel=${()=>"Card type"}
          @value-changed=${e=>this._onTypeChosen(t,e)}
        ></ha-form>
        <p class="card-type-hint">
          Choose a card type to configure it. Enter a custom type (e.g.
          <code>custom:my-card</code>) for cards not in the list.
        </p>
      </div>
    `}_renderCardEditor(t,e){const i=Ue(t=>!!customElements.get(t));return"hui-card-element-editor"===i?W`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${e.card??{}}
          @config-changed=${e=>this._onNativeCardChanged(t,e)}
        ></hui-card-element-editor>
      `:"ha-yaml-editor"===i?W`
        <ha-yaml-editor
          .defaultValue=${e.card??{}}
          @value-changed=${e=>this._onYamlCardChanged(t,e)}
        ></ha-yaml-editor>
      `:W`
      <label class="card-label"
        >Card (JSON)
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(e.card??{},null,2)}
          @change=${e=>this._editCardJson(t,e.target.value)}
        ></textarea>
      </label>
      ${this._cardError===t?W`<div class="tab-card-error">Invalid JSON — not saved.</div>`:J}
    `}_renderListView(){const t=this._config;return W`
      <div class="editor">
        <div class="preview" aria-hidden="true">
          <tabdeck-tabbar
            class="preview-bar"
            .items=${t.tabs.map((t,e)=>({name:t.name||`Tab ${e+1}`,icon:t.icon,accent:t.accent,color:t.color,disabled:t.disabled}))}
            .selected=${0}
            .position=${"top"}
            .tabStyle=${t.style}
            .display=${t.tab_display}
            .align=${t.align}
            .indicatorSize=${t.indicator_size}
            .indicatorRadius=${t.indicator_radius}
            .accentIndicator=${t.accent_indicator}
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

        ${this._warnings().map(t=>W`<div class="editor-warning" role="alert">⚠️ ${t}</div>`)}

        ${t.tabs.length>1?W`<div class="bulk-controls">
              <button class="expand-all" @click=${this._expandAll}>Expand all</button>
              <button class="collapse-all" @click=${this._collapseAll}>Collapse all</button>
            </div>`:J}

        <ha-sortable
          handle-selector=".drag-handle"
          @item-moved=${this._onItemMoved}
        >
        <div class="tabs">
          ${t.tabs.map((e,i)=>{const s=this._expanded.has(i);return W`
              <div class="tab ${s?"expanded":"collapsed"}">
                <div
                  class="tab-header"
                  role="button"
                  tabindex="0"
                  aria-expanded=${s?"true":"false"}
                  @click=${()=>this._toggleExpanded(i)}
                  @keydown=${t=>this._onHeaderKeydown(i,t)}
                >
                  <div class="tab-summary">
                    <ha-svg-icon
                      class="drag-handle"
                      .path=${"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"}
                      title="Drag to reorder"
                      @click=${t=>t.stopPropagation()}
                    ></ha-svg-icon>
                    <ha-svg-icon
                      class="expand-chevron"
                      .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                    ></ha-svg-icon>
                    <ha-icon
                      class="tab-icon"
                      .icon=${e.icon||"mdi:tab"}
                    ></ha-icon>
                    <span class="tab-title">${e.name||`Tab ${i+1}`}</span>
                    <span class="tab-type">${e.card?.type??"—"}</span>
                  </div>
                  <div class="tab-controls">
                    <ha-icon-button
                      class="move-up"
                      label="Move up"
                      .path=${"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"}
                      .disabled=${0===i}
                      @click=${t=>{t.stopPropagation(),this._move(i,-1)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="move-down"
                      label="Move down"
                      .path=${"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"}
                      .disabled=${i===t.tabs.length-1}
                      @click=${t=>{t.stopPropagation(),this._move(i,1)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="duplicate-tab"
                      label="Duplicate tab"
                      .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                      @click=${t=>{t.stopPropagation(),this._duplicateTab(i)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="delete-tab"
                      label="Delete tab"
                      .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                      @click=${t=>{t.stopPropagation(),this._deleteTab(i)}}
                    ></ha-icon-button>
                  </div>
                </div>
                ${s?W`
                      <ha-form
                        class="tab-form"
                        .hass=${this.hass}
                        .data=${{name:e.name??"",subtitle:e.subtitle??"",icon:e.icon??"",accent:e.accent??"",color:e.color??"",badge:e.badge??"",badge_color:e.badge_color??"",disabled:!!e.disabled,card_size:e.card_size,hold_action:e.hold_action,badge_action:e.badge_action}}
                        .schema=${Pe}
                        .computeLabel=${this._computeTabLabel}
                        @value-changed=${t=>this._onTabFieldsChanged(i,t)}
                      ></ha-form>
                      <button class="edit-card" @click=${()=>this._openCard(i)}>
                        <span class="edit-card-label">Edit card</span>
                        <span class="edit-card-type">${e.card?.type??"—"}</span>
                        <span class="edit-card-arrow">→</span>
                      </button>
                    `:J}
              </div>
            `})}
        </div>
        </ha-sortable>
        <ha-button class="add-tab" @click=${this._addTab}>
          <ha-svg-icon slot="icon" .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
          Add tab
        </ha-button>
      </div>
    `}static{this.styles=r`
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
    .preview::before {
      content: "Preview";
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
      font-weight: 500;
      font-size: 15px;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-type {
      flex-shrink: 0;
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
  `}},Se([Ct()],Ne.prototype,"_config",void 0),Se([Ct()],Ne.prototype,"_editingTab",void 0),Se([Ct()],Ne.prototype,"_cardError",void 0),Se([Ct()],Ne.prototype,"_expanded",void 0),Ne=Se([gt("tabdeck-card-editor")],Ne)});kt(),Wt(),te(),ne(),Be(),Re(),Ee();var Ie=class extends mt{constructor(...t){super(...t),this._selected=0,this._built=!1,this._cardKey="",this._genTabs=[],this._genKey="",this._templateResolver=t=>this._templates?.boolean(t),this._onTouchStart=t=>{if(!this._config?.swipe||1!==t.touches.length)return void(this._touchStart=void 0);const e=t.touches[0];this._touchStart={x:e.clientX,y:e.clientY,t:t.timeStamp}},this._onTouchEnd=t=>{const e=this._touchStart;if(this._touchStart=void 0,!e||!this._config?.swipe)return;const i=t.changedTouches[0];i&&this._applySwipe(e,{x:i.clientX,y:i.clientY,t:t.timeStamp})},this._onPointerDown=t=>{this._config?.swipe_mouse&&"touch"!==t.pointerType?this._touchStart={x:t.clientX,y:t.clientY,t:t.timeStamp}:this._touchStart=void 0},this._onPointerUp=t=>{const e=this._touchStart;this._touchStart=void 0,e&&this._config?.swipe_mouse&&"touch"!==t.pointerType&&this._applySwipe(e,{x:t.clientX,y:t.clientY,t:t.timeStamp})},this._appliedStyleKeys=[]}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(De(),Ve)),document.createElement("tabdeck-card-editor")}setConfig(t){this._config=ae(t),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=re(this._config),this._autoPrev=void 0,this._genTabs=[],this._genKey="",this._templates?.destroy(),this._templates=void 0,this._build()}disconnectedCallback(){super.disconnectedCallback(),this._templates?.destroy(),this._templates=void 0}_computeCardKey(t){return t.storage_key?t.storage_key:`${"undefined"!=typeof location?location.pathname:""}#${t.tabs.map(t=>t.name??"").join("|")}`}async _build(){if(!this._config)return;const t=await async function(){const t=await window.loadCardHelpers();return e=>t.createCardElement(e)}();this._manager=new xe(t),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._allTabs().map(t=>t.card)),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this._selected=ve({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:this._computeDefaultIndex(),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(t=>t.name??""),entityValue:this._config.remember_entity?this._hass?.states?.[this._config.remember_entity]?.state:void 0}),this._built=!0,this.requestUpdate()}set hass(t){this._hass=t,this._manager?.setHass(t),this._syncTemplates(),this._runAutoSelect(),this.requestUpdate()}_runAutoSelect(){if(!this._config)return;const t=this._allTabs();if(!t.some(t=>t.auto_select))return;const e=t=>{const e=this._hass?.states?.[t.entity]?.state;return void 0!==e&&(void 0!==t.state?e===t.state:ze(e))},i=t.map(t=>!!t.auto_select&&e(t.auto_select)),s=this._autoPrev;if(this._autoPrev=i,s)for(let o=0;o<t.length;o++)if(i[o]&&!s[o]){const e=this._visibleTabs().indexOf(t[o]);if(e>=0){this._selectIndex(e);break}}}get hass(){return this._hass}_allTabs(){return this._config?this._genTabs.length?[...this._config.tabs,...this._genTabs]:this._config.tabs:[]}_visibleTabs(){return this._config?this._allTabs().filter(t=>fe(t.visibility,this._hass,this._templateResolver)):[]}_collectTemplates(){if(!this._config)return[];const t=[];this._config.auto_tabs?.template&&t.push(this._config.auto_tabs.template);const e=i=>{for(const s of i??[])"template"===s?.condition&&s.value_template&&t.push(s.value_template),Array.isArray(s?.conditions)&&e(s.conditions)};for(const i of this._allTabs())$e(i.badge)&&t.push(i.badge),e(i.visibility),e(i.default_if);return t}_makeSubscribe(){if(this._hass?.connection?.subscribeMessage)return(t,e,i)=>{const s=this._hass?.connection;if(!s?.subscribeMessage)return i(),()=>{};let o,a=!1;return Promise.resolve(s.subscribeMessage(t=>{t&&void 0!==t.error?i():e(t?.result)},{type:"render_template",template:t,report_errors:!0})).then(t=>{o=t,a&&t?.()}).catch(()=>i()),()=>{a=!0,o?.()}}}_syncTemplates(){const t=this._collectTemplates();if(0===t.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const t=this._makeSubscribe();if(!t)return;this._templates=new ke(t),this._templates.addEventListener("change",()=>{this._syncGeneratedTabs(),this.requestUpdate()})}this._templates.track(t)}async _syncGeneratedTabs(){const t=this._config?.auto_tabs;if(!t||!this._manager)return;const e=this._templates?.result(t.template),i=pe(e,t),s=JSON.stringify(i);if(s===this._genKey)return;const o=this._visibleTabs()[this._selected]?.name;this._genKey=s,this._genTabs=i.map(oe),this._restoreSelection(o),await this._manager.build(this._allTabs().map(t=>t.card)),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this.requestUpdate()}_restoreSelection(t){const e=this._visibleTabs();if(t){const i=e.findIndex(e=>e.name===t);if(i>=0)return void(this._selected=i)}this._selected>e.length-1&&(this._selected=Math.min(this._computeDefaultIndex(),Math.max(0,e.length-1)))}getCardSize(){const t=this._visibleTabs()[this._selected];if(t&&"number"==typeof t.card_size)return t.card_size;const e=this._manager?.get(this._activeOriginalIndex());return e&&"function"==typeof e.getCardSize?e.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_computeDefaultIndex(){const t=this._visibleTabs();for(let s=0;s<t.length;s++){const e=t[s].default_if;if(Array.isArray(e)&&e.length>0&&fe(e,this._hass,this._templateResolver))return s}const e=re(this._config),i=t.indexOf(this._allTabs()[e]??this._config.tabs[e]);return i>=0?i:0}_activeOriginalIndex(){const t=this._visibleTabs()[this._selected];return this._allTabs().indexOf(t)}_onSelect(t){this._selectIndex(t.detail.index)}_onTabAction(t){const e=this._visibleTabs()[t.detail.index];if(!e||!this._hass)return;const i="badge"===t.detail.kind?e.badge_action:e.hold_action;if(!i)return;const s="badge"===t.detail.kind?"tap":"hold",o={entity:i?.entity,[`${s}_action`]:i};Bt(this,this._hass,o,s)}_selectIndex(t){this._selected=t;const e=this._visibleTabs()[this._selected];if(this._config){const t="browser"===(i={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:e?.name}).mode?((i.storage??globalThis.localStorage)?.setItem(ge(i.cardKey),String(i.index)),{}):"url"===i.mode?{hash:"#tab="+(i.tabName?i.tabName:String(i.index))}:{};t.hash&&"undefined"!=typeof location&&history.replaceState(null,"",t.hash),"entity"===this._config.remember&&this._writeRememberEntity(this._selected)}var i;this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}_writeRememberEntity(t){const e=this._config?.remember_entity,i=this._hass;if(!e||!i?.callService||!i.states?.[e])return;const s=e.split(".")[0];"input_number"===s?i.callService("input_number","set_value",{entity_id:e,value:t}):"input_text"===s&&i.callService("input_text","set_value",{entity_id:e,value:String(t)})}_applySwipe(t,e){const i=function(t,e,i={}){const s=i.minDistance??50,o=i.maxDuration??800,a=i.ratio??1.5,r=e.x-t.x,n=e.y-t.y;return e.t-t.t>o||Math.abs(r)<s||Math.abs(r)<Math.abs(n)*a?null:r<0?"next":"prev"}(t,e);if(!i||!this._config)return;const s=this._visibleTabs().length,o=s-1,a="next"===i?this._selected+1:this._selected-1,r=this._config.swipe_wrap?(a+s)%s:Math.max(0,Math.min(o,a));r!==this._selected&&this._selectIndex(r)}updated(t){super.updated(t);const e=this._visibleTabs();this._selected>e.length-1&&(this._selected=0),t.has("_selected")&&void 0!==t.get("_selected")&&this._animatePanel(),this._applyStyles()}_applyStyles(){for(const e of this._appliedStyleKeys)this.style.removeProperty(e);const t=this._config?.styles??{};this._appliedStyleKeys=Object.keys(t);for(const[e,i]of Object.entries(t))this.style.setProperty(e,String(i))}_animatePanel(){const t=this._config?.transition;if(!t||"none"===t)return;if("function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=this.renderRoot?.querySelector?.(".panel:not([hidden])");if(!e||"function"!=typeof e.animate)return;const i="slide"===t?[{opacity:0,transform:"translateX(12px)"},{opacity:1,transform:"translateX(0)"}]:[{opacity:0},{opacity:1}];e.animate(i,{duration:180,easing:"ease"})}render(){if(!this._config||!this._built)return J;const t=this._visibleTabs();if(0===t.length)return W`<div class="empty"></div>`;const e=this._config,i=W`
      <tabdeck-tabbar
        .items=${t.map(t=>({name:t.name,subtitle:t.subtitle,icon:t.icon,accent:t.accent,color:t.color,disabled:t.disabled,badgeColor:t.badge_color,holdAction:!!t.hold_action,badgeAction:!!t.badge_action,badge:this._resolveBadgeFinal(t.badge)}))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${e.position}
        .tabStyle=${e.style}
        .display=${e.tab_display}
        .align=${e.align}
        .badgeDisplay=${e.badge_display}
        .scrollable=${e.scrollable}
        .animated=${e.animated}
        .accentIndicator=${e.accent_indicator}
        .indicatorSize=${e.indicator_size}
        .indicatorRadius=${e.indicator_radius}
        .sticky=${e.sticky}
        .elevation=${e.elevation}
        .scrollButtons=${e.scroll_buttons}
        .overflowMenu=${e.overflow_menu}
        .barLabel=${e.aria_label??"Tabs"}
        .barBackground=${e.bar_background}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `,s=W`
      <div
        class="content"
        id="tabdeck-panel"
        role="tabpanel"
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
      >
        ${e.header&&t[this._selected]?W`<div class="content-header">
              <span class="content-title">${t[this._selected].name??""}</span>
              ${t[this._selected].subtitle?W`<span class="content-subtitle">${t[this._selected].subtitle}</span>`:J}
            </div>`:J}
        ${t.map((t,i)=>{const s=this._allTabs().indexOf(t),o=i===this._selected;return W`
            <div class="panel" ?hidden=${!o}>
              ${!e.unmount_hidden||o?this._manager?.get(s):J}
            </div>
          `})}
      </div>
    `;return W`
      <div class="root pos-${e.position}">
        ${"bottom"===e.position?W`${s}${i}`:W`${i}${s}`}
      </div>
    `}_resolveBadgeFinal(t){const e=this._resolveBadge(t);if(!this._config?.hide_inactive_badge||ze(e))return e}_resolveBadge(t){if(!t)return;if($e(t)){const e=this._templates?.result(t);return null==e?void 0:String(e)}if(!this._hass)return;const e=this._hass.states[t];return e?e.state:t}static{this.styles=r`
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
    .panel[hidden] {
      display: none;
    }
    .empty {
      min-height: 8px;
    }
  `}};Se([Ct()],Ie.prototype,"_config",void 0),Se([Ct()],Ie.prototype,"_selected",void 0),Se([Ct()],Ie.prototype,"_built",void 0),Se([Ct()],Ie.prototype,"_genTabs",void 0),Ie=Se([gt("tabdeck-card")],Ie),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{Ie as TabdeckCard};