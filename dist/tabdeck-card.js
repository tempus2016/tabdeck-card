var t,e,i,s,o,a,n,r,c,l,d,h,p,u,b,_,f,m,g,y,v,$,x,w,k,A,S,C,E,T,P,H,z,O,L,M,N,U,R,D,B,j,I,V,q,K,W,J,Z,F,G,X,Y,Q,tt,et,it,st,ot,at,nt,rt,ct=Object.defineProperty,lt=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(C){throw i=[C],C}},dt=(t,e)=>{let i={};for(var s in t)ct(i,s,{get:t[s],enumerable:!0});return e||ct(i,Symbol.toStringTag,{value:"Module"}),i},ht=lt(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=/* @__PURE__ */new WeakMap,o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}},a=t=>new o("string"==typeof t?t:t+"",void 0,i),n=(t,...e)=>new o(1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]),t,i),r=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),pt=lt(()=>{ht(),({is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:b}=Object),_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$},Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=/* @__PURE__ */new WeakMap,w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);o?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const a=o.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const a=this.constructor;if(!1===s&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=/* @__PURE__ */new Map,w[y("finalized")]=/* @__PURE__ */new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2")});function ut(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}function bt(t,e,i=t,s){if(e===J)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const a=L(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=bt(t,o._$AS(t,e.values),o,s)),e}var _t,ft,mt,gt,yt,vt,$t=lt(()=>{k=globalThis,A=t=>t,S=k.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,H=`<${P="?"+T}>`,z=document,O=()=>z.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N=t=>M(t)||"function"==typeof t?.[Symbol.iterator],U="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,B=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,V=/"/g,q=/^(?:script|style|textarea|title)$/i,K=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=K(1),K(2),K(3),J=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),F=/* @__PURE__ */new WeakMap,G=z.createTreeWalker(z,129),X=(t,e)=>{const i=t.length-1,s=[];let o,a=2===e?"<svg>":3===e?"<math>":"",n=R;for(let r=0;r<i;r++){const e=t[r];let i,c,l=-1,d=0;for(;d<e.length&&(n.lastIndex=d,c=n.exec(e),null!==c);)d=n.lastIndex,n===R?"!--"===c[1]?n=D:void 0!==c[1]?n=B:void 0!==c[2]?(q.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=o??R,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,i=c[1],n=void 0===c[3]?j:'"'===c[3]?V:I):n===V||n===I?n=j:n===D||n===B?n=R:(n=j,o=void 0);const h=n===j&&t[r+1].startsWith("/>")?" ":"";a+=n===R?e+H:l>=0?(s.push(i),e.slice(0,l)+E+e.slice(l)+T+h):e+T+(-2===l?r:h)}return[ut(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]},Y=class t{constructor({strings:e,_$litType$:i},s){let o;this.parts=[];let a=0,n=0;const r=e.length-1,c=this.parts,[l,d]=X(e,i);if(this.el=t.createElement(l,s),G.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&c.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=d[n++],i=o.getAttribute(t).split(T),s=/([.?@])?(.*)/.exec(e);c.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?it:"?"===s[1]?st:"@"===s[1]?ot:et}),o.removeAttribute(t)}else t.startsWith(T)&&(c.push({type:6,index:a}),o.removeAttribute(t));if(q.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],O()),G.nextNode(),c.push({type:2,index:++a});o.append(t[e],O())}}}else if(8===o.nodeType)if(o.data===P)c.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)c.push({type:7,index:a}),t+=T.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}},Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),a=0,n=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new tt(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new at(o,this,t)),this._$AV.push(e),r=i[++n]}a!==r?.index&&(o=G.nextNode(),a++)}return G.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},tt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=bt(this,t,e),L(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):N(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(ut(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Y(t)),e}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const a of e)o===i.length?i.push(s=new t(this.O(O()),this.O(O()),this,this.options)):s=i[o],s._$AI(a),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const o=this.strings;let a=!1;if(void 0===o)t=bt(this,t,e,0),a=!L(t)||t!==this._$AH&&t!==J,a&&(this._$AH=t);else{const s=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=bt(this,s[i+n],e,n),r===J&&(r=this._$AH[n]),a||=!L(r)||r!==this._$AH[n],r===Z?t=Z:t!==Z&&(t+=(r??"")+o[n+1]),this._$AH[n]=r}a&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},it=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}},st=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}},ot=class extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=bt(this,t,e,0)??Z)===J)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){bt(this,t)}},nt=k.litHtmlPolyfillSupport,nt?.(Y,tt),(k.litHtmlVersions??=[]).push("3.3.3"),rt=(t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o}}),xt=lt(()=>{pt(),pt(),$t(),$t(),_t=globalThis,ft=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}},ft._$litElement$=!0,ft.finalized=!0,_t.litElementHydrateSupport?.({LitElement:ft}),mt=_t.litElementPolyfillSupport,mt?.({LitElement:ft}),(_t.litElementVersions??=[]).push("4.2.2")}),wt=lt(()=>{}),kt=lt(()=>{pt(),$t(),xt(),wt()}),At=lt(()=>{gt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,i)=>"object"==typeof i?vt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var Ct=lt(()=>{pt(),yt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},vt=(t=yt,e,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=/* @__PURE__ */new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)}});function Et(t){return St({...t,state:!0,attribute:!1})}var Tt,Pt,Ht,zt,Ot,Lt,Mt,Nt,Ut,Rt,Dt=lt(()=>{Ct()}),Bt=lt(()=>{}),jt=lt(()=>{}),It=lt(()=>{}),Vt=lt(()=>{}),qt=lt(()=>{}),Kt=lt(()=>{}),Wt=lt(()=>{At(),Ct(),Dt(),Bt(),jt(),It(),Vt(),qt(),Kt()});var Jt,Zt,Ft,Gt,Xt,Yt,Qt,te=lt(()=>{!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Tt||(Tt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Pt||(Pt={})),Ht=["closed","locked","off"],zt=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o},Ot=t=>{zt(window,"haptic",t)},Lt=(t,e,i=!1)=>{i?history.replaceState(null,"",e):history.pushState(null,"",e),zt(window,"location-changed",{replace:i})},Mt=(t,e,i=!0)=>{const s=function(t){return t.substr(0,t.indexOf("."))}(e),o="group"===s?"homeassistant":s;let a;switch(s){case"lock":a=i?"unlock":"lock";break;case"cover":a=i?"open_cover":"close_cover";break;default:a=i?"turn_on":"turn_off"}return t.callService(o,a,{entity_id:e})},Nt=(t,e)=>Mt(t,e,Ht.includes(t.states[e].state)),Ut=(t,e,i,s)=>{if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(t=>t.user===e.user.id)||(Ot("warning"),confirm(s.confirmation.text||`Are you sure you want to ${s.action}?`)))switch(s.action){case"more-info":(i.entity||i.camera_image)&&zt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&Lt(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(Nt(e,i.entity),Ot("success"));break;case"call-service":{if(!s.service)return void Ot("failure");const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target),Ot("success");break}case"fire-dom-event":zt(t,"ll-custom",s)}},Rt=(t,e,i,s)=>{let o;"double_tap"===s&&i.double_tap_action?o=i.double_tap_action:"hold"===s&&i.hold_action?o=i.hold_action:"tap"===s&&i.tap_action&&(o=i.tap_action),Ut(t,e,i,o)}});function ee(t,e,i){return e.includes(t)?t:i}function ie(t,e,i,s){const o=Number(t);return Number.isFinite(o)?Math.min(i,Math.max(e,o)):s}function se(t){if(t)return"string"==typeof t?{entity:t}:"object"==typeof t&&"string"==typeof t.entity?void 0===t.state?{entity:t.entity}:{entity:t.entity,state:String(t.state)}:void 0}function oe(t){const e=t?.attributes??{};let i=t?.card??{};return Array.isArray(t?.cards)&&t.cards.length>0&&(i={type:"vertical-stack",cards:t.cards}),{name:t?.name??e.label??void 0,subtitle:t?.subtitle??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,color:t?.color??void 0,badge:t?.badge??void 0,badge_color:t?.badge_color??void 0,disabled:!!t?.disabled||void 0,hold_action:t?.hold_action??void 0,auto_select:se(t?.auto_select),visibility:t?.visibility??void 0,card:i}}function ae(t){const e=Array.isArray(t?.tabs)?t.tabs:[];if(0===e.length)throw new Error("tabdeck-card: you must define at least one tab.");const i=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:i,position:ee(t?.position,Jt,"top"),style:ee(t?.style,Zt,"underline"),tab_display:ee(t?.tab_display,Gt,"both"),align:ee(t?.align,Xt,"start"),badge_display:ee(t?.badge_display,Yt,"text"),hide_inactive_badge:Boolean(t?.hide_inactive_badge),transition:ee(t?.transition,Qt,"none"),indicator_size:ie(t?.indicator_size,1,16,3),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:ee(t?.remember,Ft,"none"),lazy:Boolean(t?.lazy),animated:void 0===t?.animated||Boolean(t.animated),accent_indicator:void 0===t?.accent_indicator||Boolean(t.accent_indicator),sticky:Boolean(t?.sticky),elevation:Boolean(t?.elevation),bar_background:t?.bar_background??void 0,swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:e.map(oe)}}function ne(t){const e=t.default_tab;if("string"==typeof e){const i=t.tabs.findIndex(t=>t.name===e);return i>=0?i:0}return"number"==typeof e&&e>=0&&e<t.tabs.length?e:0}var re=lt(()=>{Jt=["top","bottom","left","right"],Zt=["underline","pill","segmented","boxed","text"],Ft=["none","browser","url"],Gt=["both","icon","label"],Xt=["start","center","end","justify"],Yt=["text","dot"],Qt=["none","fade","slide"]});function ce(t){return Array.isArray(t?.conditions)?t.conditions:[]}function le(t,e,i){switch(t?.condition){case"state":return function(t,e){const i=e.states[t.entity];if(!i)return!1;const s=i.state;return Array.isArray(t.state)?t.state.includes(s):void 0!==t.state?s===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(s):s!==t.state_not)}(t,e);case"numeric_state":return function(t,e){const i=e.states[t.entity];if(!i)return!1;const s=Number(i.state);return!Number.isNaN(s)&&(void 0===t.above||s>Number(t.above))&&(void 0===t.below||s<Number(t.below))&&(void 0!==t.above||void 0!==t.below)}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,i);case"and":return ce(t).every(t=>le(t,e,i));case"or":return ce(t).some(t=>le(t,e,i));case"not":return!ce(t).some(t=>le(t,e,i));default:return!1}}function de(t){return"tabdeck-card:"+t}function he(t,e,i){return t>=0&&t<e?t:i}function pe(t){const{mode:e,cardKey:i,defaultIndex:s,tabCount:o}=t;if("url"===e){const e=function(t,e){const i=/(?:^|[#&])tab=([^&]+)/.exec(t||"");if(!i)return null;const s=decodeURIComponent(i[1]),o=e.indexOf(s);if(o>=0)return o;const a=Number(s);return Number.isInteger(a)&&a>=0?a:null}(t.hash??"",t.tabNames??[]);if(null!==e)return he(e,o,s)}if("browser"===e){const e=(t.storage??globalThis.localStorage)?.getItem(de(i));if(null!=e)return he(Number(e),o,s)}return he(s,o,0)}kt(),Wt(),te(),re();var ue=class extends EventTarget{constructor(t){super(),this._configs=[],this._elements=[],this._create=t}async build(t){this._configs=t.slice(),this._elements=t.map((t,e)=>this._make(t,e))}_make(t,e){const i=this._create(t);return this._hass&&(i.hass=this._hass),i.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._rebuild(e)}),i}get(t){return this._elements[t]}all(){return this._elements}setHass(t){this._hass=t;for(const e of this._elements)e&&(e.hass=t)}notifyVisible(t){const e=this._elements[t];e&&e.dispatchEvent(new Event("resize"))}async _rebuild(t){const e=this._make(this._configs[t],t);this._hass&&(e.hass=this._hass),this._elements[t]=e,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:t}}))}};function be(t){return!!t&&(t.includes("{{")||t.includes("{%"))}var _e=class extends EventTarget{constructor(t){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[i,s]of this._entries)e.has(i)||(s.unsub(),this._entries.delete(i));for(const i of e){if(this._entries.has(i))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(i,t),t.unsub=this._subscribe(i,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(i=e.result)?i:"number"==typeof i?0!==i:"string"==typeof i&&["1","true","yes","on","enable"].includes(i.trim().toLowerCase()));var i}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}};function fe(t,e,i,s){var o,a=arguments.length,n=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}var me=lt(()=>{});me();var ge=/* @__PURE__ */new Set(["","0","off","false","no","none","unavailable","unknown","closed"]);function ye(t){return null!=t&&!ge.has(String(t).trim().toLowerCase())}var ve=class extends ft{constructor(...t){super(...t),this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}updated(){this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color")}render(){const t=!!this.icon,e="label"!==this.display&&t,i="icon"!==this.display||!t;return W`
      <div class="inner">
        ${e?W`<ha-icon icon=${this.icon}></ha-icon>`:Z}
        ${i&&this.label?W`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?W`<span class="subtitle">${this.subtitle}</span>`:Z}
            </span>`:Z}
        ${this._renderBadge()}
      </div>
    `}_renderBadge(){const t=this.badgeColor?`background:${this.badgeColor}`:"";return"dot"===this.badgeDisplay?ye(this.badge)?W`<span class="badge-dot" part="badge-dot" style=${t}></span>`:Z:this.badge?W`<span class="badge" part="badge" style=${t}>${this.badge}</span>`:Z}static{this.styles=n`
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
  `}};fe([St()],ve.prototype,"label",void 0),fe([St()],ve.prototype,"subtitle",void 0),fe([St()],ve.prototype,"icon",void 0),fe([St()],ve.prototype,"badge",void 0),fe([St()],ve.prototype,"badgeColor",void 0),fe([St()],ve.prototype,"badgeDisplay",void 0),fe([St()],ve.prototype,"accent",void 0),fe([St()],ve.prototype,"color",void 0),fe([St()],ve.prototype,"display",void 0),fe([St({type:Boolean,reflect:!0})],ve.prototype,"selected",void 0),fe([St({type:Boolean,reflect:!0})],ve.prototype,"disabled",void 0),ve=fe([gt("tabdeck-tab")],ve),kt(),Wt(),me();var $e=class extends ft{constructor(...t){super(...t),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this._ready=!1,this._suppressClick=!1,this._onKeydown=t=>{const e="left"===this.position||"right"===this.position,i=e?"ArrowDown":"ArrowRight",s=e?"ArrowUp":"ArrowLeft";let o=null;t.key===i?o=this._step(this.selected,1):t.key===s?o=this._step(this.selected,-1):"Home"===t.key?o=this._firstEnabled():"End"===t.key&&(o=this._firstEnabled(!0)),null!==o&&(t.preventDefault(),this._select(o))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.addEventListener("keydown",this._onKeydown),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>this._position()))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),this._resizeObserver?.disconnect(),super.disconnectedCallback()}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_onPointerDown(t){this._suppressClick=!1,this.items[t]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._suppressClick=!0,this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:t},bubbles:!0,composed:!0}))},500))}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(t){this._cancelHold(),this._suppressClick?this._suppressClick=!1:this._select(t)}_step(t,e){const i=this.items.length;for(let s=1;s<=i;s++){const o=(t+e*s+i*s)%i;if(!this.items[o]?.disabled)return o}return t}_firstEnabled(t=!1){const e=this.items.length;for(let i=0;i<e;i++){const s=t?e-1-i:i;if(!this.items[s]?.disabled)return s}return 0}_position(){const t=this.renderRoot,e=t?.querySelector(".indicator");if(!e)return;const i=(t?.querySelectorAll("tabdeck-tab"))?.[this.selected],s=i?function(t,e,i,s=3){if(!t||t.offsetWidth<=0)return null;const o=s>0?s:3;if("text"===i)return null;if("pill"===i||"segmented"===i||"boxed"===i)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-o,width:t.offsetWidth,height:o};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:o};case"left":return{left:t.offsetLeft+t.offsetWidth-o,top:t.offsetTop,width:o,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:o,height:t.offsetHeight}}}({offsetLeft:i.offsetLeft,offsetTop:i.offsetTop,offsetWidth:i.offsetWidth,offsetHeight:i.offsetHeight},this.position,this.tabStyle,this.indicatorSize):null;s?(e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`,e.style.height=`${s.height}px`,e.style.opacity="1"):e.style.opacity="0"}_applyAccent(){const t=this.accentIndicator?this.items[this.selected]?.accent:void 0;t?this.style.setProperty("--tabdeck-accent",t):this.style.removeProperty("--tabdeck-accent")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background="var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.top="0",this.style.bottom="");else for(const t of["position","zIndex","background","top","bottom"])this.style.removeProperty(t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()))}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(){this._applyAccent(),this._applySticky(),this._position(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}render(){const t=this._ready&&this.animated?" animate":"";return W`
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
              .badgeDisplay=${this.badgeDisplay}
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
    `}static{this.styles=n`
    :host {
      display: block;
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
      border-radius: 999px;
    }
    .bar.style-segmented .indicator {
      background: var(--card-background-color);
      border-radius: 7px;
    }
    .bar.style-boxed .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 20%,
        transparent
      );
      border-radius: 10px;
    }
  `}};fe([St({attribute:!1})],$e.prototype,"items",void 0),fe([St({type:Number})],$e.prototype,"selected",void 0),fe([St()],$e.prototype,"position",void 0),fe([St()],$e.prototype,"tabStyle",void 0),fe([St()],$e.prototype,"display",void 0),fe([St()],$e.prototype,"align",void 0),fe([St()],$e.prototype,"badgeDisplay",void 0),fe([St()],$e.prototype,"scrollable",void 0),fe([St({type:Boolean})],$e.prototype,"animated",void 0),fe([St({type:Boolean})],$e.prototype,"accentIndicator",void 0),fe([St({type:Number})],$e.prototype,"indicatorSize",void 0),fe([St({type:Boolean})],$e.prototype,"sticky",void 0),fe([St({type:Boolean})],$e.prototype,"elevation",void 0),fe([St()],$e.prototype,"barBackground",void 0),fe([Et()],$e.prototype,"_ready",void 0),$e=fe([gt("tabdeck-tabbar")],$e);var xe,we,ke,Ae,Se,Ce=/* @__PURE__ */dt({TabdeckCardEditor:()=>Se,pickCardEditorTag:()=>Ee});function Ee(t){return t("hui-card-element-editor")?"hui-card-element-editor":t("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var Te=lt(()=>{kt(),Wt(),me(),xe=[{name:"name",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"accent",selector:{text:{}}},{name:"color",selector:{text:{}}},{name:"badge",selector:{text:{}}},{name:"badge_color",selector:{text:{}}},{name:"disabled",selector:{boolean:{}}},{name:"hold_action",selector:{ui_action:{}}}],we=[{name:"type",selector:{select:{mode:"dropdown",custom_value:!0,options:["entities","tile","button","light","thermostat","humidifier","weather-forecast","markdown","picture","picture-entity","picture-glance","glance","gauge","sensor","history-graph","statistics-graph","media-control","map","area","alarm-panel","calendar","todo-list","iframe","entity","conditional","vertical-stack","horizontal-stack","grid"].map(t=>({value:t,label:t}))}}}],ke={name:"Tab name",subtitle:"Subtitle",icon:"Icon",accent:"Accent colour",color:"Text/icon colour",badge:"Badge (entity id or template)",badge_color:"Badge colour",disabled:"Disable tab (greyed, not selectable)",hold_action:"Long-press action"},Ae={position:"Position",style:"Style",tab_display:"Tab display",align:"Tab alignment",badge_display:"Badge display",hide_inactive_badge:"Hide inactive badges (0/off)",transition:"Panel transition",indicator_size:"Indicator thickness (px)",remember:"Remember selected tab",default_tab:"Default tab",scrollable:"Scrollable",lazy:"Lazy-mount inactive tabs",animated:"Animate indicator",accent_indicator:"Colour indicator by tab accent",sticky:"Sticky tab bar",elevation:"Raise bar with shadow",bar_background:"Tab bar background colour",swipe:"Swipe to change tabs (mobile)"},Se=class extends ft{constructor(...t){super(...t),this._editingTab=null,this._cardError=null,this._expanded=/* @__PURE__ */new Set,this._computeGlobalLabel=t=>Ae[t.name]??t.name,this._computeTabLabel=t=>ke[t.name]??t.name}setConfig(t){this._config=ae(t)}_emit(t){this._config=t,zt(this,"config-changed",{config:t}),this.requestUpdate()}_patch(t){this._config&&this._emit({...this._config,...t})}_patchTab(t,e){if(!this._config)return;const i=this._config.tabs.map((i,s)=>s===t?{...i,...e}:i);this._emit({...this._config,tabs:i})}_addTab(){if(!this._config)return;const t=[...this._config.tabs,{name:`Tab ${this._config.tabs.length+1}`,card:{}}],e=this._config.tabs.length;this._expanded=new Set(this._expanded).add(e),this._emit({...this._config,tabs:t})}_expandAll(){this._config&&(this._expanded=new Set(this._config.tabs.map((t,e)=>e)))}_collapseAll(){this._expanded=/* @__PURE__ */new Set}_deleteTab(t){if(!this._config)return;const e=this._config.tabs.filter((e,i)=>i!==t);this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:e})}_duplicateTab(t){if(!this._config)return;const e=this._config.tabs[t];if(!e)return;const i=JSON.parse(JSON.stringify(e));i.name=`${e.name??`Tab ${t+1}`} copy`;const s=this._config.tabs.slice();s.splice(t+1,0,i),this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:s})}_toggleExpanded(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onHeaderKeydown(t,e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleExpanded(t))}_editCardJson(t,e){let i;try{i=JSON.parse(e)}catch{return void(this._cardError=t)}this._cardError=null,this._patchTab(t,{card:i})}_move(t,e){if(!this._config)return;const i=t+e;if(i<0||i>=this._config.tabs.length)return;const s=this._config.tabs.slice();[s[t],s[i]]=[s[i],s[t]],this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:s})}_openCard(t){this._cardError=null,this._editingTab=t}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(t,e){e.stopPropagation();const i=e.detail?.config;i&&this._patchTab(t,{card:i})}_onTypeChosen(t,e){e.stopPropagation();const i=e.detail?.value?.type;i&&this._patchTab(t,{card:{type:i}})}_changeCardType(t){this._patchTab(t,{card:{}})}_onYamlCardChanged(t,e){e.stopPropagation();const i=e.detail;!1!==i?.isValid&&void 0!==i?.value&&this._patchTab(t,{card:i.value})}get _currentDefaultTab(){const t=this._config;for(let e=0;e<t.tabs.length;e++){const i=t.tabs[e].name??String(e);if(String(t.default_tab)===i||t.default_tab===e)return i}}_globalSchema(){const t=t=>t.map(t=>({value:t,label:t})),e=this._config.tabs.map((t,e)=>({value:t.name??String(e),label:t.name||`Tab ${e+1}`}));return[{name:"position",selector:{select:{mode:"dropdown",options:t(["top","bottom","left","right"])}}},{name:"style",selector:{select:{mode:"dropdown",options:t(["underline","pill","segmented","boxed","text"])}}},{name:"tab_display",selector:{select:{mode:"dropdown",options:t(["both","icon","label"])}}},{name:"align",selector:{select:{mode:"dropdown",options:t(["start","center","end","justify"])}}},{name:"badge_display",selector:{select:{mode:"dropdown",options:t(["text","dot"])}}},{name:"hide_inactive_badge",selector:{boolean:{}}},{name:"transition",selector:{select:{mode:"dropdown",options:t(["none","fade","slide"])}}},{name:"indicator_size",selector:{number:{min:1,max:16,step:1,mode:"slider"}}},{name:"remember",selector:{select:{mode:"dropdown",options:t(["none","browser","url"])}}},{name:"default_tab",selector:{select:{mode:"dropdown",options:e}}},{name:"scrollable",selector:{select:{mode:"dropdown",options:t(["auto","true","false"])}}},{name:"lazy",selector:{boolean:{}}},{name:"animated",selector:{boolean:{}}},{name:"accent_indicator",selector:{boolean:{}}},{name:"sticky",selector:{boolean:{}}},{name:"elevation",selector:{boolean:{}}},{name:"bar_background",selector:{text:{}}},{name:"swipe",selector:{boolean:{}}}]}get _globalData(){const t=this._config;return{position:t.position,style:t.style,tab_display:t.tab_display,align:t.align,badge_display:t.badge_display,hide_inactive_badge:t.hide_inactive_badge,transition:t.transition,indicator_size:t.indicator_size,remember:t.remember,default_tab:this._currentDefaultTab,scrollable:String(t.scrollable),lazy:t.lazy,animated:t.animated,accent_indicator:t.accent_indicator,sticky:t.sticky,elevation:t.elevation,bar_background:t.bar_background??"",swipe:t.swipe}}_onGlobalChanged(t){t.stopPropagation();const e=t.detail.value??{},i="auto"===e.scrollable?"auto":"true"===e.scrollable||!0===e.scrollable;this._patch({position:e.position,style:e.style,tab_display:e.tab_display,align:e.align,badge_display:e.badge_display,hide_inactive_badge:!!e.hide_inactive_badge,transition:e.transition,indicator_size:e.indicator_size,remember:e.remember,default_tab:e.default_tab,scrollable:i,lazy:!!e.lazy,animated:!!e.animated,accent_indicator:!!e.accent_indicator,sticky:!!e.sticky,elevation:!!e.elevation,bar_background:e.bar_background||void 0,swipe:!!e.swipe})}_onTabFieldsChanged(t,e){e.stopPropagation();const i=e.detail.value??{};this._patchTab(t,{name:i.name??"",subtitle:i.subtitle||void 0,icon:i.icon||void 0,accent:i.accent||void 0,color:i.color||void 0,badge:i.badge||void 0,badge_color:i.badge_color||void 0,disabled:!!i.disabled||void 0,hold_action:i.hold_action??void 0})}render(){return this._config?null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView():W``}_renderCardView(t){const e=this._config.tabs[t];if(!e)return this._editingTab=null,this._renderListView();const i=!!e.card?.type;return W`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← Back</button>
          <span class="card-editor-title">${e.name||`Tab ${t+1}`}</span>
          ${i?W`<button class="change-card-type" @click=${()=>this._changeCardType(t)}>
                Change card type
              </button>`:Z}
        </div>
        ${i?this._renderCardEditor(t,e):this._renderCardTypeChooser(t)}
      </div>
    `}_renderCardTypeChooser(t){return W`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${we}
          .computeLabel=${()=>"Card type"}
          @value-changed=${e=>this._onTypeChosen(t,e)}
        ></ha-form>
        <p class="card-type-hint">
          Choose a card type to configure it. Enter a custom type (e.g.
          <code>custom:my-card</code>) for cards not in the list.
        </p>
      </div>
    `}_renderCardEditor(t,e){const i=Ee(t=>!!customElements.get(t));return"hui-card-element-editor"===i?W`
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
      ${this._cardError===t?W`<div class="tab-card-error">Invalid JSON — not saved.</div>`:Z}
    `}_renderListView(){const t=this._config;return W`
      <div class="editor">
        <ha-form
          class="globals-form"
          .hass=${this.hass}
          .data=${this._globalData}
          .schema=${this._globalSchema()}
          .computeLabel=${this._computeGlobalLabel}
          @value-changed=${this._onGlobalChanged}
        ></ha-form>

        ${t.tabs.length>1?W`<div class="bulk-controls">
              <button class="expand-all" @click=${this._expandAll}>Expand all</button>
              <button class="collapse-all" @click=${this._collapseAll}>Collapse all</button>
            </div>`:Z}

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
                        .data=${{name:e.name??"",subtitle:e.subtitle??"",icon:e.icon??"",accent:e.accent??"",color:e.color??"",badge:e.badge??"",badge_color:e.badge_color??"",disabled:!!e.disabled,hold_action:e.hold_action}}
                        .schema=${xe}
                        .computeLabel=${this._computeTabLabel}
                        @value-changed=${t=>this._onTabFieldsChanged(i,t)}
                      ></ha-form>
                      <button class="edit-card" @click=${()=>this._openCard(i)}>
                        <span class="edit-card-label">Edit card</span>
                        <span class="edit-card-type">${e.card?.type??"—"}</span>
                        <span class="edit-card-arrow">→</span>
                      </button>
                    `:Z}
              </div>
            `})}
          <ha-button class="add-tab" @click=${this._addTab}>
            <ha-svg-icon slot="icon" .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
            Add tab
          </ha-button>
        </div>
      </div>
    `}static{this.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .globals-form {
      display: block;
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
  `}},fe([Et()],Se.prototype,"_config",void 0),fe([Et()],Se.prototype,"_editingTab",void 0),fe([Et()],Se.prototype,"_cardError",void 0),fe([Et()],Se.prototype,"_expanded",void 0),Se=fe([gt("tabdeck-card-editor")],Se)});kt(),Wt(),te(),re(),me();var Pe=class extends ft{constructor(...t){super(...t),this._selected=0,this._built=!1,this._cardKey="",this._templateResolver=t=>this._templates?.boolean(t),this._onTouchStart=t=>{if(!this._config?.swipe||1!==t.touches.length)return void(this._touchStart=void 0);const e=t.touches[0];this._touchStart={x:e.clientX,y:e.clientY,t:t.timeStamp}},this._onTouchEnd=t=>{const e=this._touchStart;if(this._touchStart=void 0,!e||!this._config?.swipe)return;const i=t.changedTouches[0];if(!i)return;const s=function(t,e,i={}){const s=i.minDistance??50,o=i.maxDuration??800,a=i.ratio??1.5,n=e.x-t.x,r=e.y-t.y;return e.t-t.t>o||Math.abs(n)<s||Math.abs(n)<Math.abs(r)*a?null:n<0?"next":"prev"}(e,{x:i.clientX,y:i.clientY,t:t.timeStamp});if(!s)return;const o=this._visibleTabs().length-1,a="next"===s?this._selected+1:this._selected-1,n=Math.max(0,Math.min(o,a));n!==this._selected&&this._selectIndex(n)},this._appliedStyleKeys=[]}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(Te(),Ce)),document.createElement("tabdeck-card-editor")}setConfig(t){this._config=ae(t),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=ne(this._config),this._autoPrev=void 0,this._templates?.destroy(),this._templates=void 0,this._build()}disconnectedCallback(){super.disconnectedCallback(),this._templates?.destroy(),this._templates=void 0}_computeCardKey(t){return`${"undefined"!=typeof location?location.pathname:""}#${t.tabs.map(t=>t.name??"").join("|")}`}async _build(){if(!this._config)return;const t=await async function(){const t=await window.loadCardHelpers();return e=>t.createCardElement(e)}();this._manager=new ue(t),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._config.tabs.map(t=>t.card)),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this._selected=pe({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:ne(this._config),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(t=>t.name??"")}),this._built=!0,this.requestUpdate()}set hass(t){this._hass=t,this._manager?.setHass(t),this._syncTemplates(),this._runAutoSelect(),this.requestUpdate()}_runAutoSelect(){const t=this._config;if(!t)return;if(!t.tabs.some(t=>t.auto_select))return;const e=t=>{const e=this._hass?.states?.[t.entity]?.state;return void 0!==e&&(void 0!==t.state?e===t.state:ye(e))},i=t.tabs.map(t=>!!t.auto_select&&e(t.auto_select)),s=this._autoPrev;if(this._autoPrev=i,s)for(let o=0;o<t.tabs.length;o++)if(i[o]&&!s[o]){const e=this._visibleTabs().indexOf(t.tabs[o]);if(e>=0){this._selectIndex(e);break}}}get hass(){return this._hass}_visibleTabs(){return this._config?this._config.tabs.filter(t=>{return e=t.visibility,i=this._hass,s=this._templateResolver,!e||0===e.length||!i||e.every(t=>le(t,i,s));var e,i,s}):[]}_collectTemplates(){if(!this._config)return[];const t=[],e=i=>{for(const s of i??[])"template"===s?.condition&&s.value_template&&t.push(s.value_template),Array.isArray(s?.conditions)&&e(s.conditions)};for(const i of this._config.tabs)be(i.badge)&&t.push(i.badge),e(i.visibility);return t}_makeSubscribe(){if(this._hass?.connection?.subscribeMessage)return(t,e,i)=>{const s=this._hass?.connection;if(!s?.subscribeMessage)return i(),()=>{};let o,a=!1;return Promise.resolve(s.subscribeMessage(t=>{t&&void 0!==t.error?i():e(t?.result)},{type:"render_template",template:t,report_errors:!0})).then(t=>{o=t,a&&t?.()}).catch(()=>i()),()=>{a=!0,o?.()}}}_syncTemplates(){const t=this._collectTemplates();if(0===t.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const t=this._makeSubscribe();if(!t)return;this._templates=new _e(t),this._templates.addEventListener("change",()=>this.requestUpdate())}this._templates.track(t)}getCardSize(){const t=this._manager?.get(this._activeOriginalIndex());return t&&"function"==typeof t.getCardSize?t.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_activeOriginalIndex(){const t=this._visibleTabs()[this._selected];return this._config?this._config.tabs.indexOf(t):0}_onSelect(t){this._selectIndex(t.detail.index)}_onTabAction(t){const e=this._visibleTabs()[t.detail.index];if(!e?.hold_action||!this._hass)return;const i={entity:e.hold_action?.entity,hold_action:e.hold_action};Rt(this,this._hass,i,"hold")}_selectIndex(t){this._selected=t;const e=this._visibleTabs()[this._selected];if(this._config){const t="browser"===(i={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:e?.name}).mode?((i.storage??globalThis.localStorage)?.setItem(de(i.cardKey),String(i.index)),{}):"url"===i.mode?{hash:"#tab="+(i.tabName?i.tabName:String(i.index))}:{};t.hash&&"undefined"!=typeof location&&history.replaceState(null,"",t.hash)}var i;this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}updated(t){super.updated(t);const e=this._visibleTabs();this._selected>e.length-1&&(this._selected=0),t.has("_selected")&&void 0!==t.get("_selected")&&this._animatePanel(),this._applyStyles()}_applyStyles(){for(const e of this._appliedStyleKeys)this.style.removeProperty(e);const t=this._config?.styles??{};this._appliedStyleKeys=Object.keys(t);for(const[e,i]of Object.entries(t))this.style.setProperty(e,String(i))}_animatePanel(){const t=this._config?.transition;if(!t||"none"===t)return;if("function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=this.renderRoot?.querySelector?.(".panel:not([hidden])");if(!e||"function"!=typeof e.animate)return;const i="slide"===t?[{opacity:0,transform:"translateX(12px)"},{opacity:1,transform:"translateX(0)"}]:[{opacity:0},{opacity:1}];e.animate(i,{duration:180,easing:"ease"})}render(){if(!this._config||!this._built)return Z;const t=this._visibleTabs(),e=this._config,i=W`
      <tabdeck-tabbar
        .items=${t.map(t=>({name:t.name,subtitle:t.subtitle,icon:t.icon,accent:t.accent,color:t.color,disabled:t.disabled,badgeColor:t.badge_color,holdAction:!!t.hold_action,badge:this._resolveBadgeFinal(t.badge)}))}
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
        .sticky=${e.sticky}
        .elevation=${e.elevation}
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
      >
        ${t.map((t,i)=>{const s=e.tabs.indexOf(t);return W`
            <div class="panel" ?hidden=${i!==this._selected}>
              ${this._manager?.get(s)}
            </div>
          `})}
      </div>
    `;return W`
      <div class="root pos-${e.position}">
        ${"bottom"===e.position?W`${s}${i}`:W`${i}${s}`}
      </div>
    `}_resolveBadgeFinal(t){const e=this._resolveBadge(t);if(!this._config?.hide_inactive_badge||ye(e))return e}_resolveBadge(t){if(!t)return;if(be(t)){const e=this._templates?.result(t);return null==e?void 0:String(e)}if(!this._hass)return;const e=this._hass.states[t];return e?e.state:t}static{this.styles=n`
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
    .panel[hidden] {
      display: none;
    }
  `}};fe([Et()],Pe.prototype,"_config",void 0),fe([Et()],Pe.prototype,"_selected",void 0),fe([Et()],Pe.prototype,"_built",void 0),Pe=fe([gt("tabdeck-card")],Pe),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{Pe as TabdeckCard};