var t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=/* @__PURE__ */new WeakMap,r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}},o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,b=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,m=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=/* @__PURE__ */new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...l(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=/* @__PURE__ */new Map,x[m("finalized")]=/* @__PURE__ */new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");var k=globalThis,w=t=>t,$=k.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,E=`<${C}>`,z=document,O=()=>z.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,j=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,D=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=q(1),F=(q(2),q(3),Symbol.for("lit-noChange")),V=Symbol.for("lit-nothing"),K=/* @__PURE__ */new WeakMap,W=z.createTreeWalker(z,129);function X(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}var Y=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let a=0;a<i;a++){const e=t[a];let i,c,d=-1,l=0;for(;l<e.length&&(n.lastIndex=l,c=n.exec(e),null!==c);)l=n.lastIndex,n===N?"!--"===c[1]?n=I:void 0!==c[1]?n=R:void 0!==c[2]?(D.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=r??N,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,i=c[1],n=void 0===c[3]?j:'"'===c[3]?H:B):n===H||n===B?n=j:n===I||n===R?n=N:(n=j,r=void 0);const h=n===j&&t[a+1].startsWith("/>")?" ":"";o+=n===N?e+E:d>=0?(s.push(i),e.slice(0,d)+T+e.slice(d)+A+h):e+A+(-2===d?a:h)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]},G=class t{constructor({strings:e,_$litType$:i},s){let r;this.parts=[];let o=0,n=0;const a=e.length-1,c=this.parts,[d,l]=Y(e,i);if(this.el=t.createElement(d,s),W.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=W.nextNode())&&c.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(T)){const e=l[n++],i=r.getAttribute(t).split(A),s=/([.?@])?(.*)/.exec(e);c.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?st:tt}),r.removeAttribute(t)}else t.startsWith(A)&&(c.push({type:6,index:o}),r.removeAttribute(t));if(D.test(r.tagName)){const t=r.textContent.split(A),e=t.length-1;if(e>0){r.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],O()),W.nextNode(),c.push({type:2,index:++o});r.append(t[e],O())}}}else if(8===r.nodeType)if(r.data===C)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(A,t+1));)c.push({type:7,index:o}),t+=A.length-1}o++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}};function Q(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}var J=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=W.nextNode(),o++)}return W.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new G(t)),e}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const o of e)r===i.length?i.push(s=new t(this.O(O()),this.O(O()),this,this.options)):s=i[r],s._$AI(o),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),o||=!M(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}},it=class extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}},st=class extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}},ot=k.litHtmlPolyfillSupport;ot?.(G,Z),(k.litHtmlVersions??=[]).push("3.3.3");var nt=globalThis,at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});var ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");var dt,lt,ht={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:v},pt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=/* @__PURE__ */new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return ut({...t,state:!0,attribute:!1})}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(dt||(dt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(lt||(lt={}));var bt=["closed","locked","off"],ft=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r},mt=t=>{ft(window,"haptic",t)},gt=(t,e,i,s)=>{if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(t=>t.user===e.user.id)||(mt("warning"),confirm(s.confirmation.text||`Are you sure you want to ${s.action}?`)))switch(s.action){case"more-info":(i.entity||i.camera_image)&&ft(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&((t,e,i=!1)=>{i?history.replaceState(null,"",e):history.pushState(null,"",e),ft(window,"location-changed",{replace:i})})(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(((t,e)=>{((t,e,i=!0)=>{const s=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===s?"homeassistant":s;let o;switch(s){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(r,o,{entity_id:e})})(t,e,bt.includes(t.states[e].state))})(e,i.entity),mt("success"));break;case"call-service":{if(!s.service)return void mt("failure");const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target),mt("success");break}case"fire-dom-event":ft(t,"ll-custom",s)}},vt=class{constructor(){this._since=0,this._running=!1,this._ms=/* @__PURE__ */new Map}switchTo(t,e){this._bank(e),this._tab=t}setRunning(t,e){this._bank(e),this._running=t}_bank(t){this._running&&void 0!==this._tab&&t>this._since&&this._ms.set(this._tab,(this._ms.get(this._tab)??0)+(t-this._since)),this._since=t}take(t){this._bank(t);const e={};for(const[i,s]of this._ms){const t=Math.floor(s/600)/100;if(t<=0)continue;e[i]=t;const r=s-6e4*t;r>.5?this._ms.set(i,r):this._ms.delete(i)}return e}};function yt(t){if(!0===t)return 10;const e=Number(t);return("number"==typeof t||"string"==typeof t&&""!==t.trim())&&Number.isFinite(e)&&e>0?Math.min(60,Math.max(1,Math.round(e))):void 0}function xt(t){if(!t||"object"!=typeof t)return;const e={},i=Number(t.precision);void 0!==t.precision&&Number.isInteger(i)&&i>=0&&i<=6&&(e.precision=i);const s=Number(t.max);return void 0!==t.max&&Number.isFinite(s)&&(e.max=s),"string"==typeof t.unit&&(e.unit=t.unit),e}function kt(t,e){if(void 0===t||!e||!function(t){return""!==t.trim()&&Number.isFinite(Number(t))}(t))return t;const i=Number(t);let s;return s=void 0!==e.max&&i>e.max?`${e.max}+`:void 0!==e.precision?i.toFixed(e.precision):t.trim(),e.unit?s+e.unit:s}var wt=/^[a-z_]+\.[a-z0-9_]+$/;function $t(t){const e="string"==typeof t?{entity:t}:t,i="string"==typeof e?.entity?e.entity.trim():"";if(!wt.test(i))return;const s=Number(e.hours),r={entity:i,hours:Number.isFinite(s)&&s>0?s:24};return"string"==typeof e.color&&e.color&&(r.color=e.color),r}var St=t=>Math.round(10*t)/10;var Tt=class{constructor(t){this._changed=t,this._data=/* @__PURE__ */new Map}points(t){return this._data.get(t)?.points}sync(t,e,i=Date.now()){const s=/* @__PURE__ */new Map;for(const r of e)s.set(r.entity,Math.max(s.get(r.entity)??0,r.hours));for(const r of[...this._data.keys()])s.has(r)||this._data.delete(r);for(const[r,o]of s){const e=this._data.get(r);!e||o>e.hours||i-e.fetchedAt>=9e5?this._fetch(t,r,o,i):e.points&&this._append(e,t?.states?.[r],i)}}_append(t,e,i){const s=Number(e?.state),r=Date.parse(e?.last_updated??"")/1e3;if(!Number.isFinite(s)||!Number.isFinite(r)||""===e.state)return;const o=t.points.at(-1);if(o&&r<=o[0])return;t.points.push([r,s]);const n=i/1e3-3600*t.hours;for(;t.points.length>2&&t.points[1][0]<=n;)t.points.shift()}_fetch(t,e,i,s){const r={points:this._data.get(e)?.points,fetchedAt:s,hours:i};this._data.set(e,r),"function"==typeof t?.callWS&&t.callWS({type:"history/history_during_period",start_time:/* @__PURE__ */new Date(s-36e5*i).toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}).then(t=>{if(this._data.get(e)!==r)return;const s=[];for(const i of t?.[e]??[]){const t=Number(i?.s??i?.state),e=Number(i?.lu??i?.lc??Date.parse(i?.last_updated??i?.last_changed??"")/1e3);""!==(i?.s??i?.state)&&Number.isFinite(t)&&Number.isFinite(e)&&s.push([e,t])}r.points=function(t,e){if(t.length<=240)return t;const i=3600*e/240,s=[];for(const r of t){const t=s[s.length-1];t&&Math.floor(t[0]/i)===Math.floor(r[0]/i)?s[s.length-1]=r:s.push(r)}return s}(s,i),this._changed()}).catch(()=>{})}},At=["default","ios","material","glass","minimal","rail","neumorphic","ha-tile","mushroom","bubble","fluent","material-you","material-expressive","liquid-glass","accessible"],Ct={position:"top",style:"underline",align:"start",tab_display:"both",badge_display:"text",indicator_size:3,indicator_radius:void 0,elevation:!1,sticky:!1,bar_background:void 0,glass:void 0,liquid_indicator:!1,styles:{}},Et={default:{},ios:{style:"segmented",align:"justify",indicator_radius:8,bar_background:"var(--secondary-background-color, #efefef)",styles:{"--tabdeck-tab-height":"36px"}},material:{style:"underline",align:"justify",elevation:!0},glass:{style:"pill",sticky:!0,bar_background:"color-mix(in srgb, var(--card-background-color, #fff) 60%, transparent)",styles:{"--tabdeck-bar-backdrop":"blur(12px)"}},minimal:{style:"text",tab_display:"label",badge_display:"dot"},rail:{position:"left",style:"rail",tab_display:"icon"},neumorphic:{style:"pill",align:"justify",indicator_radius:14,bar_background:"var(--card-background-color, #e0e5ec)",styles:{"--tabdeck-bar-shadow":"inset 3px 3px 7px rgba(0, 0, 0, 0.18), inset -3px -3px 7px rgba(255, 255, 255, 0.06)","--tabdeck-indicator-color":"var(--card-background-color, #e0e5ec)","--tabdeck-selected-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-indicator-shadow":"3px 3px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px rgba(255, 255, 255, 0.06)","--tabdeck-tab-height":"44px"}},"ha-tile":{style:"boxed",indicator_radius:12,styles:{"--tabdeck-tab-height":"52px","--tabdeck-tab-font-weight":"500"}},mushroom:{style:"pill",indicator_radius:12,styles:{"--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"500","--tabdeck-tab-radius":"12px"}},bubble:{style:"pill",indicator_radius:999,bar_background:"var(--secondary-background-color, rgba(127, 127, 127, 0.12))",styles:{"--tabdeck-indicator-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-selected-badge-background":"var(--card-background-color, #fff)","--tabdeck-selected-badge-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-tab-height":"46px","--tabdeck-tab-font-weight":"500"}},fluent:{style:"underline",indicator_size:3,indicator_radius:2,styles:{"--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"600"}},"material-you":{style:"pill",align:"justify",indicator_radius:20,styles:{"--tabdeck-indicator-color":"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 26%, transparent)","--tabdeck-selected-color":"var(--primary-text-color)","--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"500"}},"material-expressive":{style:"pill",align:"justify",indicator_radius:999,liquid_indicator:!0,bar_background:"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 8%, var(--card-background-color, #fff))",styles:{"--tabdeck-bar-radius":"28px","--tabdeck-indicator-color":"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 30%, transparent)","--tabdeck-selected-color":"var(--primary-text-color)","--tabdeck-tab-height":"56px","--tabdeck-tab-font-weight":"700"}},"liquid-glass":{style:"pill",align:"justify",indicator_radius:999,glass:20,liquid_indicator:!0,styles:{"--tabdeck-bar-radius":"999px","--tabdeck-glass-tint":"color-mix(in srgb, var(--card-background-color, #fff) 40%, transparent)","--tabdeck-indicator-color":"color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent)","--tabdeck-indicator-shadow":"inset 0 1px 1px rgba(255, 255, 255, 0.7), 0 2px 10px rgba(0, 0, 0, 0.14)","--tabdeck-tab-height":"48px","--tabdeck-tab-font-weight":"600"}},accessible:{style:"boxed",align:"justify",tab_display:"both",indicator_radius:10,styles:{"--tabdeck-tab-height":"64px","--tabdeck-tab-padding":"0 14px","--tabdeck-tab-font-size":"16px","--tabdeck-tab-font-weight":"700","--tabdeck-tab-color":"var(--primary-text-color)","--tabdeck-tab-border":"2px solid var(--primary-text-color)","--tabdeck-indicator-color":"#ffd400","--tabdeck-icon-size":"28px","--tabdeck-focus-width":"4px","--tabdeck-focus-color":"var(--primary-text-color)"}}};function zt(t){return At.includes(t)}new Set(Object.values(Et).flatMap(t=>Object.keys(t.styles??{})));function Ot(t){if(!t||!zt(t.preset))return t;const e=function(t){const e=Et[t];return{...Ct,...e,styles:{...e.styles??{}}}}(t.preset),i={...e};for(const[s,r]of Object.entries(t))void 0!==r&&(i[s]=r);return i.styles={...e.styles,...t.styles??{}},i}function Mt(t){if("number"==typeof t)return Number.isFinite(t)&&t>0?`${t}px`:void 0;if("string"!=typeof t)return;const e=t.trim();return""===e||/[;{}"<>]/.test(e)||!/^[\d.]/.test(e)&&!/^(calc|min|max|clamp|var)\(/.test(e)?void 0:e}function Lt(t){if("string"!=typeof t)return;const e=t.trim();return""===e||/[;{}"<>\\]/.test(e)?void 0:/^(\/|https?:\/\/)/.test(e)?`center / cover no-repeat url("${e}")`:e}function Pt(t,e){const i=Array.from({length:Math.max(1,e)},()=>[]),s=i.map(()=>0);return t.forEach((t,e)=>{let r=0;for(let o=1;o<i.length;o++)s[o]<s[r]&&(r=o);i[r].push(e),s[r]+=Math.max(1,Number(t)||1)}),i}function Nt(t){if(!0===t)return.5;const e=Number(t);return"number"==typeof t&&Number.isFinite(e)&&e>0&&e<=1?e:void 0}function It(t,e,i){if(void 0===i)return!1;const s=function(t,e){if(!t.length||!e||0===Object.keys(e).length)return;let i=0;for(const s of t){const t=e[s];t&&"unavailable"!==t.state||i++}return i/t.length}(t,e);return void 0!==s&&s>=i}var Rt=["dim","black","clock"];function jt(t){const e="object"==typeof t&&null!==t?t:{after:t},i=Number(e.after);if(!Number.isFinite(i)||i<=0)return;const s=Number(e.opacity);return{after:Math.max(.5,i),mode:Rt.includes(e.mode)?e.mode:"dim",opacity:Number.isFinite(s)&&s>0&&s<=1?s:.7}}var Bt=/\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g,Ht=/^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;function Dt(t,e){if("item"===e)return t;const i=e.split(".");let s=t;for(let r=1;r<i.length;r++)s=null==s?void 0:s[i[r]];return s}function qt(t,e,i){if("string"==typeof t){const s=t.match(Ht);if(s){const t=s[1];if("index"===t)return i;const r=Dt(e,t);return void 0===r?"":r}return t.replace(Bt,(t,s)=>String("index"===s?i:Dt(e,s)??""))}if(Array.isArray(t))return t.map(t=>qt(t,e,i));if(t&&"object"==typeof t){const s={};for(const r of Object.keys(t))s[r]=qt(t[r],e,i);return s}return t}var Ut="tabdeck-sync",Ft=/* @__PURE__ */new Map;function Vt(t){return"number"==typeof t&&Number.isFinite(t)?String(t):"string"==typeof t&&t.trim()?t.trim():void 0}function Kt(t){return"hidden"===t?"hidden":!0===t||"on"===t||void 0}function Wt(t){if(!0===t)return{};if(!t||"object"!=typeof t||Array.isArray(t))return;const e=t.finish_action;return e&&"object"==typeof e&&e.action&&"none"!==e.action?{finish_action:e}:{}}function Xt(t){return"tabdeck-card:"+t}function Yt(t,e,i){return t>=0&&t<e?t:i}function Gt(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Qt(t,e){const i=/(?:^|[#&])tab=([^&]+)/.exec(t||"");if(!i)return null;const s=decodeURIComponent(i[1]),r=e.indexOf(s);if(r>=0)return r;const o=Gt(s),n=o?e.findIndex(t=>Gt(t)===o):-1;if(n>=0)return n;const a=Number(s);return Number.isInteger(a)&&a>=0?a:null}function Jt(t){return!0===t?"link":"qr"===t||t&&"object"==typeof t&&t.qr?"qr":void 0}var Zt=["top","bottom","left","right"],te=(t,e)=>Zt.includes(t)?t:e;function ee(t){return!0===t?{portrait:"bottom",landscape:"left"}:t&&"object"==typeof t?{portrait:te(t.portrait,"bottom"),landscape:te(t.landscape,"left")}:void 0}function ie(t){if(t&&"object"==typeof t&&"string"==typeof t.dashboard&&t.dashboard)return{dashboard:t.dashboard,view:void 0===t.view?"":String(t.view)};if("string"!=typeof t)return;const e=t.trim().replace(/^\/+/,"").split("/");return e[0]?{dashboard:e[0],view:e.slice(1).join("/")}:void 0}function se(t,e){const i=Array.isArray(t?.views)?t.views:[];if(!i.length)return;if(""===e)return i[0];const s=i.find(t=>t?.path===e);if(s)return s;if(/^\d+$/.test(e))return i[Number(e)];const r=e.toLowerCase();return i.find(t=>"string"==typeof t?.title&&t.title.toLowerCase()===r)}var re=/* @__PURE__ */new Map;function oe(t,e){const i=re.get(e);if(i)return i;const s=t.callWS({type:"lovelace/config",url_path:"lovelace"===e?null:e});return re.set(e,s),s}var ne=t=>"string"==typeof t&&t.trim()?t:void 0;function ae(t){if(!0===t)return{};if("string"==typeof t)return t.trim()?{text:t}:void 0;if(!t||"object"!=typeof t)return;const e={};for(const i of["title","text","icon"])ne(t[i])&&(e[i]=t[i]);return e}function ce(t){const e=Number(t);if(null!=t&&""!==t&&Number.isFinite(e)&&!(e<=0)&&1!==e)return Math.min(3,Math.max(.25,e))}function de(t){return 0===t||"0"===t?"0px":Mt(t)}function le(t,e,i){if(!(i>0)||t<=i)return[0,t];const s=Math.min(Math.max(0,e),t-1),r=Math.min(Math.floor(s/i)*i,t-i);return[r,r+i]}function he(t){const e=Math.round(Number(t));return Number.isFinite(e)&&e>0?Math.max(3,e):void 0}var pe={winter:{from:"12-01",to:"01-06",accent:"#ff5d5d",bar_background:"#14361f",bar_text:"light"},autumn:{from:"10-25",to:"10-31",accent:"#ff9a2e",bar_background:"#2b1a0e",bar_text:"light"}};function ue(t){const e=/^(\d{1,2})-(\d{1,2})$/.exec(String(t??"").trim());if(!(!e||+e[1]<1||+e[1]>12||+e[2]<1||+e[2]>31))return`${e[1].padStart(2,"0")}-${e[2].padStart(2,"0")}`}function _e(t){if(!Array.isArray(t))return;const e=[];for(const i of t){const t="string"==typeof i?{theme:i}:i;if(!t||"object"!=typeof t)continue;const s="string"==typeof t.theme?pe[t.theme]:void 0;if(void 0!==t.theme&&!s)continue;const r=ue(t.from)??s?.from,o=ue(t.to)??s?.to;if(!r||!o||void 0!==t.from&&!ue(t.from)||void 0!==t.to&&!ue(t.to))continue;const n={...s,from:r,to:o};s&&(n.name=t.theme),"string"==typeof t.name&&(n.name=t.name);for(const e of["accent","bar_background"])"string"==typeof t[e]&&t[e]&&(n[e]=t[e]);["auto","light","dark"].includes(t.bar_text)&&(n.bar_text=t.bar_text),t.styles&&"object"==typeof t.styles&&(n.styles={...s?.styles??{},...t.styles}),e.push(n)}return e.length?e:void 0}function be(t,e=30){const i=Number(t);return Number.isFinite(i)&&i>0?Math.min(3600,Math.max(5,Math.round(i))):e}function fe(t){const e=(Array.isArray(t)?t:t?[t]:[]).filter(t=>t&&"object"==typeof t&&"string"==typeof t.entity&&t.entity&&("string"==typeof t.tab||"number"==typeof t.tab)).map(t=>{const e={entity:t.entity,tab:t.tab,duration:be(t.duration)};return void 0!==t.state&&null!==t.state&&""!==t.state&&(e.state=String(t.state)),"string"==typeof t.message&&t.message&&(e.message=t.message),"string"==typeof t.icon&&t.icon&&(e.icon=t.icon),e});return e.length?e:void 0}var me=["event","button","input_button"];function ge(t,e,i){return void 0!==e&&void 0!==i&&i!==e&&(void 0!==t.state?i===t.state:me.includes(String(t.entity).split(".")[0])?"unavailable"!==i&&"unknown"!==i&&"unavailable"!==e:"on"===i)}var ve,ye=/^([01]?\d|2[0-3]):([0-5]\d)$/,xe=t=>{const e=ye.exec(t.trim());return 60*Number(e[1])+Number(e[2])};function ke(t){let e,i,s;"string"==typeof t?[e,i]=t.split(/[-–]/).map(t=>t.trim()):t&&"object"==typeof t&&({from:e,to:i,entity:s}=t);const r={};return"string"==typeof e&&"string"==typeof i&&ye.test(e.trim())&&ye.test(i.trim())&&(r.from=e.trim(),r.to=i.trim()),"string"==typeof s&&s.trim()&&(r.entity=s.trim()),r.from||r.entity?r:void 0}function we(t){if(!0===t)return.3;const e=Number(t);return"number"==typeof t&&Number.isFinite(e)&&e>0?Math.min(1,Math.round(100*e)/100):void 0}var $e=["areas","labels","floors","domains","devices","todo","calendars","cameras","zones","updates","repairs","notifications","taskmate","z2m_tracker"],Se=["repairs","notifications"],Te={areas:"area",floors:"floor",labels:"label"},Ae={name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"entities",entities:"{{ item.entities }}"}},Ce=new WeakSet([Ae]),Ee=t=>(Ce.add(t),t),ze={todo:Ee({name:"{{ item.name }}",icon:"mdi:clipboard-list-outline",badge:"{{ item.id }}",card:{type:"todo-list",entity:"{{ item.id }}"}}),calendars:Ee({name:"{{ item.name }}",icon:"mdi:calendar",card:{type:"calendar",entities:["{{ item.id }}"],initial_view:"listWeek"}}),cameras:Ee({name:"{{ item.name }}",icon:"mdi:cctv",card:{type:"picture-entity",entity:"{{ item.id }}",camera_view:"auto",show_state:!1}}),updates:Ee({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.version }}",card:{type:"entities",entities:["{{ item.id }}"]}}),repairs:Ee({name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"vertical-stack",cards:[{type:"markdown",content:"{{ item.description }}"},{type:"entities",entities:[{type:"button",icon:"mdi:tools",name:"{{ item.open }}",action_name:"{{ item.open }}",tap_action:{action:"navigate",navigation_path:"/config/repairs"}}]}]}}),notifications:Ee({name:"{{ item.name }}",icon:"mdi:bell-outline",card:{type:"vertical-stack",cards:[{type:"markdown",content:"{{ item.message }}"},{type:"entities",entities:[{type:"button",icon:"mdi:bell-check-outline",name:"{{ item.dismiss }}",action_name:"{{ item.dismiss }}",tap_action:{action:"perform-action",perform_action:"persistent_notification.dismiss",data:{notification_id:"{{ item.id }}"}}}]}]}}),taskmate:Ee({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.left }}",card:"{{ item.card }}"}),z2m_tracker:Ee({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.count }}",card:{type:"markdown",content:"{{ item.text }}"}}),zones:Ee({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.count }}",card:{type:"map",entities:"{{ item.entities }}"}})};function Oe(t){const e=Te[t.source];return"tiles"===t.content&&e?Ee({name:"{{ item.name }}",icon:"{{ item.icon }}",[e]:"{{ item.id }}",...t.domains?.length?{domains:t.domains}:{}}):ze[t.source]??Ae}var Me={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",media_player:"mdi:television",lock:"mdi:lock",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-blank-circle-outline",person:"mdi:account",scene:"mdi:palette",script:"mdi:script-text",automation:"mdi:robot"},Le={offline:"mdi:lan-disconnect","low battery":"mdi:battery-alert-variant-outline","weak signal":"mdi:signal-cellular-1","chatty device":"mdi:message-flash-outline","frozen reading":"mdi:snowflake-alert",unidentified:"mdi:help-circle-outline","coordinator backup":"mdi:content-save-alert-outline"},Pe=["light","switch","climate","cover","fan","media_player","lock","camera","vacuum"],Ne=/^[a-z0-9_]+$/,Ie=/^[a-z0-9_]+(\.[a-z0-9_]+)?$/;function Re(t){return"["+t.map(t=>`'${t}'`).join(", ")+"]"}function je(t){return"{"+Object.entries(t).map(([t,e])=>`'${t}': '${e}'`).join(", ")+"}"}var Be=["{%- set ns = namespace(out=[]) -%}"],He=["{{ ns.out | tojson }}"];function De(t){const e=(t.domains??[]).map(String).filter(t=>Ne.test(t)),i=Re((t.exclude??[]).map(String).filter(t=>Ie.test(t))),s=e.length?` | select('match', '^(${e.join("|")})\\\\.')`:"",r=t=>`{%- set ns.out = ns.out + [{${t}}] -%}`,o=t=>["{%- if ents | count > 0 -%}",r(t),"{%- endif -%}"];switch(t.source){case"areas":case"labels":{const e="areas"===t.source,r=e?"mdi:texture-box":"mdi:label-outline";return[...Be,`{%- for id in ${e?"areas()":"labels()"} if id not in ${i} -%}`,`{%- set ents = ${e?"area_entities":"label_entities"}(id)${s} | list -%}`,...o(`'id': id, 'name': ${e?"area_name":"label_name"}(id), 'icon': '${r}', 'entities': ents`),"{%- endfor -%}",...He].join("\n")}case"floors":return[...Be,`{%- for id in floors() if id not in ${i} -%}`,"{%- set acc = namespace(l=[]) -%}","{%- for a in floor_areas(id) -%}{%- set acc.l = acc.l + (area_entities(a) | list) -%}{%- endfor -%}",`{%- set ents = acc.l${s} | list -%}`,...o("'id': id, 'name': floor_name(id), 'icon': 'mdi:home-floor-1', 'entities': ents"),"{%- endfor -%}",...He].join("\n");case"domains":{const t=e.length?e:Pe;return[...Be,`{%- set icons = ${je(Me)} -%}`,`{%- for id in ${Re(t)} if id not in ${i} -%}`,"{%- set ents = states[id] | map(attribute='entity_id') | list -%}",...o("'id': id, 'name': id | replace('_', ' ') | capitalize, 'icon': icons.get(id, 'mdi:shape'), 'entities': ents"),"{%- endfor -%}",...He].join("\n")}case"devices":return[...Be,"{%- for id in states | map(attribute='entity_id') | map('device_id') | reject('none') | unique | list -%}",`{%- if id not in ${i} -%}`,`{%- set ents = device_entities(id)${s} | list -%}`,...o("'id': id, 'name': device_attr(id, 'name_by_user') or device_attr(id, 'name'), 'icon': 'mdi:devices', 'entities': ents"),"{%- endif -%}","{%- endfor -%}","{{ ns.out | sort(attribute='name') | tojson }}"].join("\n");case"todo":case"calendars":case"cameras":{const e={todo:"todo",calendars:"calendar",cameras:"camera"}[t.source];return[...Be,`{%- for s in states.${e} if s.entity_id not in ${i} -%}`,r("'id': s.entity_id, 'name': s.name"),"{%- endfor -%}",...He].join("\n")}case"updates":return[...Be,`{%- for s in states.update | selectattr('state', 'eq', 'on') if s.entity_id not in ${i} -%}`,r("'id': s.entity_id, 'name': s.attributes.title or s.name, 'icon': s.attributes.icon or 'mdi:package-up', 'version': s.attributes.latest_version or ''"),"{%- endfor -%}",...He].join("\n");case"repairs":case"notifications":return"";case"taskmate":return["{%- set ns = namespace(out=[], seen=[]) -%}","{%- set ents = expand(integration_entities('taskmate') | select('match', '^sensor\\.') | list) -%}","{%- set overview = ents | selectattr('attributes.children', 'defined') | map(attribute='entity_id') | first | default('') -%}","{%- set watches = ents | selectattr('attributes.left', 'defined') | selectattr('attributes.child_id', 'defined') | list -%}","{%- for s in ents | selectattr('attributes.child_name', 'defined') | selectattr('attributes.total_points_earned', 'defined') -%}","{%- set id = s.attributes.child_id | default('') -%}",`{%- if id and id not in ns.seen and id not in ${i} -%}`,"{%- set ns.seen = ns.seen + [id] -%}","{%- set w = watches | selectattr('attributes.child_id', 'eq', id) | first | default(none) -%}","{%- set avatar = s.attributes.avatar | default('') | string -%}","{%- set card = {'type': 'custom:taskmate-child-card', 'entity': overview, 'child_id': id} if overview else {'type': 'entities', 'entities': [s.entity_id] + ([w.entity_id] if w else [])} -%}",r("'id': id, 'name': s.attributes.child_name, 'icon': avatar if avatar.startswith('mdi:') else 'mdi:account', 'left': (w.attributes.left | string) if w and w.attributes.left else '', 'points': s.state, 'entity': overview, 'card': card"),"{%- endif -%}","{%- endfor -%}","{{ ns.out | sort(attribute='name') | tojson }}"].join("\n");case"z2m_tracker":return["{%- set ns = namespace(out=[], kinds=[]) -%}",`{%- set icons = ${je(Le)} -%}`,"{%- set src = expand(integration_entities('z2m_tracker') | select('match', '^sensor\\.') | list) | selectattr('attributes.warnings', 'defined') | first | default(none) -%}","{%- set warnings = src.attributes.warnings | list if src else [] -%}","{%- for w in warnings if w.issue is defined -%}","{%- if w.issue not in ns.kinds and (w.issue | lower | replace(' ', '_')) not in "+i+" -%}{%- set ns.kinds = ns.kinds + [w.issue] -%}{%- endif -%}","{%- endfor -%}","{%- for kind in ns.kinds -%}","{%- set rows = warnings | selectattr('issue', 'eq', kind) | list -%}","{%- set t = namespace(text='') -%}","{%- for w in rows -%}{%- set t.text = t.text ~ '- **' ~ w.device ~ '**' ~ ((' · ' ~ w.detail) if w.detail else '') ~ '\\n' -%}{%- endfor -%}",r("'id': kind | lower | replace(' ', '_'), 'name': kind, 'icon': icons.get(kind | lower, 'mdi:alert-circle-outline'), 'count': rows | count | string, 'critical': rows | selectattr('critical') | list | count > 0, 'devices': rows | map(attribute='device') | list, 'text': t.text"),"{%- endfor -%}",...He].join("\n");case"zones":return[...Be,`{%- for z in states.zone if z.entity_id not in ${i} -%}`,"{%- set key = 'home' if z.entity_id == 'zone.home' else z.name -%}","{%- set people = states.person | selectattr('state', 'eq', key) | map(attribute='entity_id') | list -%}",r("'id': z.entity_id, 'name': z.name, 'icon': z.attributes.icon or 'mdi:map-marker-radius', 'entities': [z.entity_id] + people, 'count': people | count | string"),"{%- endfor -%}",...He].join("\n")}}var qe=["selection","light","medium","heavy","success","warning","failure"],Ue={style:"text",align:"start",styles:{"--tabdeck-tab-height":"36px","--tabdeck-tab-font-size":"13px"}},Fe=["top","bottom","left","right"],Ve=["underline","pill","segmented","boxed","text","rail"],Ke=["none","browser","url","entity"],We=["both","icon","label","active","dots"],Xe=["start","center","end","justify"],Ye=["text","dot"],Ge=["none","fade","slide","scale","flip","rise"];function Qe(t,e,i){return e.includes(t)?t:i}function Je(t,e,i,s){const r=Number(t);return Number.isFinite(r)?Math.min(i,Math.max(e,r)):s}function Ze(t){if(t)return"string"==typeof t?{entity:t}:"object"==typeof t&&"string"==typeof t.entity?void 0===t.state?{entity:t.entity}:{entity:t.entity,state:String(t.state)}:void 0}function ti(t){return t&&"object"==typeof t&&t.action&&"none"!==t.action?t:void 0}function ei(t){if(!0===t)return!0;const e=Number(t);return!1!==t&&null!==t&&""!==t&&Number.isFinite(e)&&e>0?Math.min(e,60):void 0}function ii(t){if(!0===t)return!0;const e="string"==typeof t?{text:t}:t;if(!e||"object"!=typeof e||"string"!=typeof e.text&&void 0!==e.text)return;const i={};return e.text?.trim()&&(i.text=e.text),"string"==typeof e.icon&&e.icon&&(i.icon=e.icon),"string"==typeof e.color&&e.color&&(i.color=e.color),i}function si(t){if(!Array.isArray(t))return;const e=t.filter(t=>t&&"object"==typeof t&&(t.badge||t.icon)).map(t=>{const e={};return void 0!==t.badge&&null!==t.badge&&""!==t.badge&&(e.badge="object"==typeof t.badge?t.badge:String(t.badge)),"string"==typeof t.icon&&t.icon&&(e.icon=t.icon),"string"==typeof t.color&&t.color&&(e.color=t.color),e});return e.length?e:void 0}function ri(t){const e=t?.attributes??{};let i,s=t?.card??{};if(Array.isArray(t?.children)&&t.children.length>0){const e="menu"===t.children_display?"menu":"row",r=t.children_options&&"object"==typeof t.children_options?t.children_options:{};s={type:"custom:tabdeck-card",...Ue,...r,hide_bar:"menu"===e,tabs:t.children},i={display:e,items:t.children.map(t=>({name:t?.name??t?.attributes?.label,icon:t?.icon}))}}else if("sections"===t?.layout&&Array.isArray(t?.sections)&&t.sections.length>0){const e=Number(t?.max_columns);s={type:"custom:tabdeck-sections-card",max_columns:Number.isFinite(e)&&e>=1?Math.round(e):4,sections:t.sections}}else if(Array.isArray(t?.cards)&&t.cards.length>0){const e=Number(t?.columns),i=Number(t?.min_column_width);s="masonry"===t?.layout?{type:"custom:tabdeck-masonry-card",...Number.isFinite(i)&&i>0?{min_column_width:i}:{columns:Number.isFinite(e)&&e>=1?Math.round(e):2},cards:t.cards}:Number.isFinite(e)&&e>1?{type:"grid",columns:e,square:!1,cards:t.cards}:{type:"vertical-stack",cards:t.cards}}else t?.card||(s=function(t){if(t&&"object"==typeof t){if(ie(t.view))return{type:"custom:tabdeck-view-card",view:t.view};if("string"==typeof t.url&&t.url.trim()){const e="string"==typeof t.aspect_ratio||"number"==typeof t.aspect_ratio?String(t.aspect_ratio).trim():"";return{type:"iframe",url:t.url.trim(),...e?{aspect_ratio:e}:{}}}return"string"==typeof t.markdown&&t.markdown.trim()?{type:"markdown",content:t.markdown}:void 0}}(t)??s);return{name:t?.name??e.label??void 0,subtitle:t?.subtitle??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,color:t?.color??void 0,badge:t?.badge??void 0,badge_color:t?.badge_color??void 0,badge_icon:"string"==typeof t?.badge_icon&&t.badge_icon?t.badge_icon:void 0,ring:void 0===t?.ring||null===t.ring||""===t.ring?void 0:String(t.ring),ring_max:Number(t?.ring_max)>0?Number(t.ring_max):void 0,ring_color:"string"==typeof t?.ring_color&&t.ring_color?t.ring_color:void 0,ring_style:"bar"===t?.ring_style?"bar":void 0,graph:$t(t?.graph)?t.graph:void 0,badges:si(t?.badges),tooltip:"string"==typeof t?.tooltip&&t.tooltip.trim()?t.tooltip:void 0,countdown:"string"==typeof t?.countdown&&t.countdown.trim()?t.countdown.trim():void 0,pin:void 0===t?.pin||null===t.pin||""===t.pin?void 0:String(t.pin),pin_timeout:Number(t?.pin_timeout)>0?Number(t.pin_timeout):void 0,area:"string"==typeof t?.area&&t.area?t.area:void 0,floor:"string"==typeof t?.floor&&t.floor?t.floor:void 0,label:"string"==typeof t?.label&&t.label?t.label:void 0,domains:Array.isArray(t?.domains)&&t.domains.length?t.domains.map(String):void 0,badge_format:xt(t?.badge_format),disabled:!!t?.disabled||void 0,fab:!!t?.fab||void 0,card_size:"number"==typeof t?.card_size?t.card_size:void 0,hold_action:t?.hold_action??void 0,badge_action:t?.badge_action??void 0,double_tap_action:ti(t?.double_tap_action),tap_action:t?.tap_action&&"object"==typeof t.tap_action&&"none"!==t.tap_action.action?t.tap_action:void 0,enter_action:ti(t?.enter_action),leave_action:ti(t?.leave_action),auto_select:Ze(t?.auto_select),default_if:t?.default_if??void 0,visibility:t?.visibility??void 0,alert:Array.isArray(t?.alert)&&t.alert.length>0?t.alert:void 0,background:"string"==typeof t?.background&&t.background.trim()?t.background:void 0,page_background:"string"==typeof t?.page_background&&t.page_background.trim()?t.page_background:void 0,layout:"masonry"===t?.layout&&Array.isArray(t?.cards)&&t.cards.length>0?"masonry":"sections"===t?.layout&&Array.isArray(t?.sections)&&t.sections.length>0&&!i?"sections":void 0,styles:t?.styles&&"object"==typeof t.styles&&!Array.isArray(t.styles)?t.styles:void 0,icon_animation:"string"==typeof t?.icon_animation&&t.icon_animation?t.icon_animation:void 0,picture:"string"==typeof t?.picture&&t.picture.trim()?t.picture.trim():void 0,font_size:Mt(t?.font_size),font_weight:ai(t?.font_weight),font_family:ai(t?.font_family),pip:!!t?.pip||void 0,keep_awake:!!t?.keep_awake||void 0,watch:Array.isArray(t?.watch)?t.watch.map(String):"string"==typeof t?.watch&&t.watch?[t.watch]:void 0,separator:"line"===t?.separator||"space"===t?.separator?t.separator:void 0,tab_ref:"string"==typeof t?.tab_ref&&t.tab_ref.trim()?t.tab_ref.trim():void 0,use:"string"==typeof t?.use&&t.use?t.use:void 0,vars:t?.vars&&"object"==typeof t.vars&&!Array.isArray(t.vars)?t.vars:void 0,view:"string"==typeof t?.view?t.view.trim()||void 0:t?.view&&"object"==typeof t.view?t.view:void 0,url:"string"==typeof t?.url&&t.url.trim()?t.url.trim():void 0,aspect_ratio:("string"==typeof t?.aspect_ratio||"number"==typeof t?.aspect_ratio)&&String(t.aspect_ratio).trim()||void 0,markdown:"string"==typeof t?.markdown&&t.markdown.trim()?t.markdown:void 0,empty_message:ae(t?.empty_message)?t.empty_message:void 0,zoom:ce(t?.zoom),padding:de(t?.padding),spacing:de(t?.spacing),auto_refresh:Number(t?.auto_refresh)>0?Math.max(.1,Number(t.auto_refresh)):void 0,group:i,children:i?t.children:void 0,children_display:i?i.display:void 0,children_options:i&&t.children_options&&"object"==typeof t.children_options?t.children_options:void 0,card:s}}function oi(t){return!!t?.tap_action}function ni(t){const e="object"==typeof t&&null!==t?t:{interval:t},i=Number(e.interval);if(Number.isFinite(i)&&!(i<=0))return{interval:Math.max(2,i),resume_after:Je(e.resume_after,0,86400,60)}}function ai(t){return"number"==typeof t&&Number.isFinite(t)?String(t):"string"==typeof t&&t.trim()&&!/[;{}<>]/.test(t)?t.trim():void 0}function ci(t){return t&&"object"==typeof t&&!Array.isArray(t)&&Object.keys(t).length?t:void 0}function di(t){return Array.isArray(t)&&t.length>0?t:void 0}function li(t){return"tallest"===t?"tallest":Mt(t)??"auto"}function hi(t){const e="object"==typeof t&&null!==t?t:{min_width:t},i=Number(e.min_width);if(Number.isFinite(i)&&!(i<=0))return{min_width:i,columns:Math.round(Je(e.columns,2,4,2))}}function pi(t,e){const i={...t,...e};return(t.styles||e.styles)&&(i.styles={...t.styles??{},...e.styles??{}}),i}function ui(t,e,i){if(!t||"object"!=typeof t)return t;let s=t;const r="string"==typeof t.use?e?.[t.use]:void 0;if(r&&"object"==typeof r&&(s=pi(qt(r,t.vars??{},0),t)),i){const{name:t,card:e,cards:r,...o}=i;s=pi(o,s)}return s}function _i(t,e={}){t=Ot(t);const i=ci(t?.tab_defaults),s=ci(t?.tab_templates),r=Array.isArray(t?.tabs)?t.tabs:[],o=!1===e.expand?r:r.map(t=>ui(t,s,i)),n=function(t){if(t&&"object"==typeof t){if($e.includes(t.source)){const e=Array.isArray(t.domains)?t.domains.map(String):void 0,i=Array.isArray(t.exclude)?t.exclude.map(String):void 0,s="tiles"===t.content?"tiles":void 0;return{source:t.source,domains:e,exclude:i,content:s,template:De({source:t.source,domains:e,exclude:i}),tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:Oe({source:t.source,content:s,domains:e})}}if("string"==typeof t.template&&""!==t.template.trim())return{template:t.template,tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:void 0}}}(t?.auto_tabs);if(0===o.length&&!n)throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");const a=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:a,position:Qe(t?.position,Fe,"top"),style:Qe(t?.style,Ve,"underline"),tab_display:Qe(t?.tab_display,We,"both"),align:Qe(t?.align,Xe,"start"),badge_display:Qe(t?.badge_display,Ye,"text"),hide_inactive_badge:Boolean(t?.hide_inactive_badge),badge_bounce:Boolean(t?.badge_bounce),badge_format:xt(t?.badge_format),transition:Qe(t?.transition,Ge,"none"),indicator_size:Je(t?.indicator_size,1,16,3),indicator_radius:void 0===t?.indicator_radius?void 0:Je(t?.indicator_radius,0,999,0),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:Qe(t?.remember,Ke,"none"),remember_entity:t?.remember_entity??void 0,storage_key:t?.storage_key??void 0,lazy:Boolean(t?.lazy),preload:!0===t?.preload||"idle"===t?.preload?"idle":"all"===t?.preload?"all":void 0,unmount_hidden:Boolean(t?.unmount_hidden),swipe_wrap:Boolean(t?.swipe_wrap),swipe_mouse:Boolean(t?.swipe_mouse),wheel_switch:Boolean(t?.wheel_switch),swipe_lock:Boolean(t?.swipe_lock),swipe_edge:!0===t?.swipe_edge?40:"number"==typeof t?.swipe_edge?Je(t.swipe_edge,8,400,40):void 0,animated:void 0===t?.animated||Boolean(t.animated),liquid_indicator:Boolean(t?.liquid_indicator),accent_indicator:void 0===t?.accent_indicator||Boolean(t.accent_indicator),picture_accent:Boolean(t?.picture_accent),header:Boolean(t?.header),aria_label:t?.aria_label??void 0,sticky:Boolean(t?.sticky),bar_autohide:Boolean(t?.bar_autohide),elevation:Boolean(t?.elevation),scroll_buttons:Boolean(t?.scroll_buttons),bar_fade:!1!==t?.bar_fade,overflow_menu:Boolean(t?.overflow_menu),hidden_alerts:Boolean(t?.hidden_alerts),summary_chip:ii(t?.summary_chip),bar_background:t?.bar_background??void 0,glass:ei(t?.glass),seasons:_e(t?.seasons),direction:"rtl"===t?.direction||"ltr"===t?.direction?t.direction:void 0,bar_text:!0===t?.bar_text?"auto":["auto","light","dark"].includes(t?.bar_text)?t.bar_text:void 0,swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:o.map(ri),auto_tabs:n,auto_rotate:ni(t?.auto_rotate),scroll_spy:Boolean(t?.scroll_spy),split:hi(t?.split),tab_display_narrow:We.includes(t?.tab_display_narrow)?t.tab_display_narrow:void 0,narrow_width:Je(t?.narrow_width,100,4e3,450),preset:zt(t?.preset)?t.preset:void 0,collapsible:Boolean(t?.collapsible),start_collapsed:Boolean(t?.collapsible&&t?.start_collapsed),idle_return:Number(t?.idle_return)>0?Math.max(5,Number(t.idle_return)):void 0,idle_dim:jt(t?.idle_dim),dock:Boolean(t?.dock),content_arrows:Boolean(t?.content_arrows),hide_bar:Boolean(t?.hide_bar),search:Boolean(t?.search),hotkeys:Boolean(t?.hotkeys),history:Boolean(t?.history),customize:Boolean(t?.customize),rail_expand:Boolean(t?.rail_expand),edit_mode_reveal:void 0===t?.edit_mode_reveal||Boolean(t.edit_mode_reveal),transition_duration:Je(t?.transition_duration,0,2e3,180),transition_narrow:Ge.includes(t?.transition_narrow)?t.transition_narrow:void 0,transition_easing:"string"==typeof t?.transition_easing&&t.transition_easing.trim()&&!/[;{}"<>]/.test(t.transition_easing)?t.transition_easing.trim():"ease",content_height:li(t?.content_height),content_max_height:Mt(t?.content_max_height),header_cards:di(t?.header_cards),footer_cards:di(t?.footer_cards),fullscreen:Boolean(t?.fullscreen),swipe_peek:Boolean(t?.swipe_peek),hold_peek:Boolean(t?.hold_peek),changed_dot:Boolean(t?.changed_dot),sort_by_usage:Boolean(t?.sort_by_usage),health_dim:Nt(t?.health_dim),alert_first:Boolean(t?.alert_first),alert_snooze:Number(t?.alert_snooze)>0?Number(t.alert_snooze):void 0,default_by_time:ci(t?.default_by_time),default_by_device:ci(t?.default_by_device),learned_default:fi(t?.learned_default),fire_event:Boolean(t?.fire_event),event_id:"string"==typeof t?.event_id&&t.event_id?t.event_id:void 0,remote_entity:"string"==typeof t?.remote_entity&&t.remote_entity?t.remote_entity:void 0,remote_event:Boolean(t?.remote_event),follow_room:bi(t?.follow_room),takeover:fe(t?.takeover),quiet_hours:ke(t?.quiet_hours),tab_defaults:i,tab_templates:s,companion:!0===t?.companion,companion_id:"string"==typeof t?.companion_id&&t.companion_id.trim()?t.companion_id.trim():void 0,usage_stats:yt(t?.usage_stats),offline_banner:!0===t?.offline_banner||void 0,debug:"speed"===t?.debug?"speed":Boolean(t?.debug),haptic:!0===t?.haptic?"selection":qe.includes(t?.haptic)?t.haptic:void 0,click_sound:we(t?.click_sound),breadcrumbs:!0===t?.breadcrumbs?{}:t?.breadcrumbs&&"object"==typeof t.breadcrumbs?{root:"string"==typeof t.breadcrumbs.root&&t.breadcrumbs.root?t.breadcrumbs.root:void 0}:void 0,density:"compact"===t?.density||"comfortable"===t?.density?t.density:"default",unload_after:Number(t?.unload_after)>0?Math.max(1,Number(t.unload_after)):void 0,overview:Boolean(t?.overview),entity_search:Boolean(t?.entity_search),sync_group:Vt(t?.sync_group),popup:Kt(t?.popup),wizard:Wt(t?.wizard),last_tab_button:Boolean(t?.last_tab_button),drag_reorder:Boolean(t?.drag_reorder),compare:Boolean(t?.compare),share_button:Jt(t?.share_button),orientation_layout:ee(t?.orientation_layout),loading_placeholder:Boolean(t?.loading_placeholder),friendly_errors:Boolean(t?.friendly_errors),scroll_memory:Boolean(t?.scroll_memory),bar_limit:he(t?.bar_limit)}}function bi(t){const e="string"==typeof t?t:t?.entity;if("string"!=typeof e||!e.trim())return;const i="object"==typeof t?ci(t.map):void 0;return i?{entity:e.trim(),map:i}:{entity:e.trim()}}function fi(t){if(!t)return;const e="object"!=typeof t||Array.isArray(t)?{}:t,i=Number(e.min_uses);return{min_uses:Number.isFinite(i)&&i>=1?Math.min(100,Math.round(i)):3,notice:void 0===e.notice||Boolean(e.notice)}}function mi(t){const e=t.default_tab;if("string"==typeof e){const i=t.tabs.findIndex(t=>t.name===e);return i>=0?i:0}return"number"==typeof e&&e>=0&&e<t.tabs.length?e:0}function gi(t){const e=t?.entity_id||t?.entity;return Array.isArray(e)?e.filter(t=>"string"==typeof t&&t):"string"==typeof e&&e?[e]:[]}function vi(t,e,i){const s=gi(t);return s.length>0&&s.every(t=>void 0!==e.states[t]&&i(e.states[t].state))}var yi=["sun","mon","tue","wed","thu","fri","sat"];function xi(t){const e=/^(\d{1,2}):(\d{2})/.exec(String(t));return e?60*Number(e[1])+Number(e[2]):null}function ki(t){return Array.isArray(t?.conditions)?t.conditions:[]}function wi(t,e,i){switch(t?.condition){case"state":return function(t,e){return vi(t,e,e=>Array.isArray(t.state)?t.state.includes(e):void 0!==t.state?e===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(e):e!==t.state_not))}(t,e);case"numeric_state":return function(t,e){return vi(t,e,e=>{const i=Number(e);return!Number.isNaN(i)&&(void 0===t.above||i>Number(t.above))&&(void 0===t.below||i<Number(t.below))&&(void 0!==t.above||void 0!==t.below)})}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"time":return function(t,e=/* @__PURE__ */new Date){const i=void 0!==t.after,s=void 0!==t.before,r=Array.isArray(t.weekday)&&t.weekday.length>0;if(!i&&!s&&!r)return!1;const o=60*e.getHours()+e.getMinutes();let n=!0;if(i&&s){const e=xi(t.after),i=xi(t.before);if(null===e||null===i)return!1;n=e<=i?o>=e&&o<i:o>=e||o<i}else if(i){const e=xi(t.after);if(null===e)return!1;n=o>=e}else if(s){const e=xi(t.before);if(null===e)return!1;n=o<e}if(n&&r){const i=yi[e.getDay()];n=t.weekday.map(t=>String(t).toLowerCase().slice(0,3)).includes(i)}return n}(t);case"user":return function(t,e){const i=e?.user?.id;return!(!i||!Array.isArray(t.users))&&t.users.includes(i)}(t,e);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,i);case"and":return ki(t).every(t=>wi(t,e,i));case"or":return ki(t).some(t=>wi(t,e,i));case"not":return!ki(t).some(t=>wi(t,e,i));default:return!1}}function $i(t,e,i){return!t||0===t.length||(!e||t.every(t=>wi(t,e,i)))}var Si={L:0,M:1,Q:2,H:3},Ti={L:1,M:0,Q:3,H:2},Ai=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],Ci=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],Ei=(t,e)=>!!(t>>>e&1);function zi(t){let e=(16*t+128)*t+64;if(t>=2){const i=Math.floor(t/7)+2;e-=(25*i-10)*i-55,t>=7&&(e-=36)}return e}function Oi(t,e){return Math.floor(zi(t)/8)-Ai[e][t]*Ci[e][t]}function Mi(t,e){let i=0;for(let s=7;s>=0;s--)i=i<<1^285*(i>>>7),i^=(e>>>s&1)*t;return 255&i}function Li(t,e){const i=new Array(e.length).fill(0);for(const s of t){const t=s^i.shift();i.push(0),e.forEach((e,s)=>i[s]^=Mi(e,t))}return i}function Pi(t,e="M"){const i=Si[e],s=function(t){return Array.from((new TextEncoder).encode(t))}(t);let r=1;for(;;r++){if(r>40)throw new Error("QR: text too long");if(4+(r<10?8:16)+8*s.length<=8*Oi(r,i))break}const o=[],n=(t,e)=>{for(let i=e-1;i>=0;i--)o.push(t>>>i&1)};n(4,4),n(s.length,r<10?8:16);for(const C of s)n(C,8);const a=8*Oi(r,i);n(0,Math.min(4,a-o.length)),n(0,(8-o.length%8)%8);for(let C=236;o.length<a;C^=253)n(C,8);const c=[];for(let C=0;C<o.length;C+=8)c.push(parseInt(o.slice(C,C+8).join(""),2));const d=Ci[i][r],l=Ai[i][r],h=Math.floor(zi(r)/8),p=d-h%d,u=Math.floor(h/d),_=function(t){const e=new Array(t).fill(0);e[t-1]=1;let i=1;for(let s=0;s<t;s++){for(let s=0;s<t;s++)e[s]=Mi(e[s],i),s+1<t&&(e[s]^=e[s+1]);i=Mi(i,2)}return e}(l),b=[];for(let C=0,E=0;C<d;C++){const t=c.slice(E,E+u-l+(C<p?0:1));E+=t.length;const e=Li(t,_);C<p&&t.push(0),b.push(t.concat(e))}const f=[];for(let C=0;C<b[0].length;C++)b.forEach((t,e)=>{(C!==u-l||e>=p)&&f.push(t[C])});const m=4*r+17,g=Array.from({length:m},()=>new Array(m).fill(!1)),v=Array.from({length:m},()=>new Array(m).fill(!1)),y=(t,e,i)=>{g[e][t]=i,v[e][t]=!0};for(let C=0;C<m;C++)y(6,C,C%2==0),y(C,6,C%2==0);for(const[C,E]of[[3,3],[m-4,3],[3,m-4]])for(let t=-4;t<=4;t++)for(let e=-4;e<=4;e++){const i=C+e,s=E+t,r=Math.max(Math.abs(e),Math.abs(t));i>=0&&i<m&&s>=0&&s<m&&y(i,s,2!==r&&4!==r)}const x=function(t){if(1===t)return[];const e=Math.floor(t/7)+2,i=2*Math.floor((8*t+3*e+5)/(4*e-4)),s=[6];for(let r=4*t+17-7;s.length<e;r-=i)s.splice(1,0,r);return s}(r),k=x.length-1;x.forEach((t,e)=>x.forEach((i,s)=>{if(!(0===e&&0===s||0===e&&s===k||e===k&&0===s))for(let e=-2;e<=2;e++)for(let s=-2;s<=2;s++)y(i+s,t+e,1!==Math.max(Math.abs(s),Math.abs(e)))}));const w=t=>{const i=function(t,e){const i=Ti[t]<<3|e;let s=i;for(let r=0;r<10;r++)s=s<<1^1335*(s>>>9);return 21522^(i<<10|s)}(e,t);for(let e=0;e<=5;e++)y(8,e,Ei(i,e));y(8,7,Ei(i,6)),y(8,8,Ei(i,7)),y(7,8,Ei(i,8));for(let e=9;e<15;e++)y(14-e,8,Ei(i,e));for(let e=0;e<8;e++)y(m-1-e,8,Ei(i,e));for(let e=8;e<15;e++)y(8,m-15+e,Ei(i,e));y(8,m-8,!0)};if(w(0),r>=7){let t=r;for(let i=0;i<12;i++)t=t<<1^7973*(t>>>11);const e=r<<12|t;for(let i=0;i<18;i++){const t=m-11+i%3,s=Math.floor(i/3);y(t,s,Ei(e,i)),y(s,t,Ei(e,i))}}let $=0;for(let C=m-1;C>=1;C-=2){6===C&&(C=5);for(let t=0;t<m;t++)for(let e=0;e<2;e++){const i=C-e,s=C+1&2?t:m-1-t;!v[s][i]&&$<8*f.length&&(g[s][i]=Ei(f[$>>>3],7-(7&$)),$++)}}const S=t=>g.map((e,i)=>e.map((e,s)=>v[i][s]?e:e!==function(t,e,i){switch(t){case 0:return(e+i)%2==0;case 1:return i%2==0;case 2:return e%3==0;case 3:return(e+i)%3==0;case 4:return(Math.floor(e/3)+Math.floor(i/2))%2==0;case 5:return e*i%2+e*i%3==0;case 6:return(e*i%2+e*i%3)%2==0;default:return((e+i)%2+e*i%3)%2==0}}(t,s,i)));let T=0,A=1/0;for(let C=0;C<8;C++){w(C);const t=Ni(S(C));t<A&&(A=t,T=C)}return w(T),{version:r,size:m,modules:S(T)}}function Ni(t){const e=t.length;let i=0;const s=t=>{let s=1;for(let r=1;r<=e;r++)r<e&&t(r)===t(r-1)?s++:(s>=5&&(i+=s-2),s=1);for(let r=0;r+11<=e;r++){const e=Array.from({length:11},(e,i)=>t(r+i)?1:0).join("");"10111010000"!==e&&"00001011101"!==e||(i+=40)}};for(let n=0;n<e;n++)s(e=>t[n][e]);for(let n=0;n<e;n++)s(e=>t[e][n]);let r=0;for(let n=0;n<e;n++)for(let s=0;s<e;s++)if(t[n][s]&&r++,s+1<e&&n+1<e){const e=t[n][s];t[n][s+1]===e&&t[n+1][s]===e&&t[n+1][s+1]===e&&(i+=3)}const o=e*e;return i+=10*Math.floor(Math.abs(20*r-10*o)/o),i}function Ii(t,e=4){const i=[];return t.modules.forEach((t,s)=>t.forEach((t,r)=>{t&&i.push(`M${r+e} ${s+e}h1v1h-1z`)})),i.join("")}async function Ri(){const t=await window.loadCardHelpers();return e=>t.createCardElement(e)}var ji=class extends EventTarget{constructor(t){super(),this._configs=[],this._elements=[],this.createMs=[],this._create=t}async build(t,e={}){this._configs=t.slice(),this._elements=t.map((t,i)=>e.lazy?void 0:this._make(t,i))}_make(t,e){if(!t)return;const i=performance.now(),s=this._create(t);return this.createMs[e]=performance.now()-i,this._hass&&(s.hass=this._hass),s.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._rebuild(e)}),s}get(t){return this._elements[t]}all(){return this._elements}replace(t,e){this._configs[t]=e,this._elements[t]=this._make(e,t)}refresh(t){this._configs[t]&&(this._elements[t]=this._make(this._configs[t],t))}unload(t){this._elements[t]=void 0}isLoaded(t){return!!this._elements[t]}ensure(t){return!this._elements[t]&&this._configs[t]&&(this._elements[t]=this._make(this._configs[t],t)),this._elements[t]}setHass(t){this._hass=t;for(const e of this._elements)e&&(e.hass=t)}notifyVisible(t){const e=this._elements[t];e&&e.dispatchEvent(new Event("resize"))}async _rebuild(t){const e=this._make(this._configs[t],t);e&&(this._hass&&(e.hass=this._hass),this._elements[t]=e,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:t}})))}};function Bi(t){return"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}var Hi=class extends EventTarget{constructor(t){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[i,s]of this._entries)e.has(i)||(s.unsub(),this._entries.delete(i));for(const i of e){if(this._entries.has(i))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(i,t),t.unsub=this._subscribe(i,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(i=e.result)?i:"number"==typeof i?0!==i:"string"==typeof i&&["1","true","yes","on","enable"].includes(i.trim().toLowerCase()));var i}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}},Di="en",qi={[Di]:{"card.tab_n":"Tab {n}","card.tabs":"Tabs","card.scroll_left":"Scroll left","card.scroll_right":"Scroll right","card.all_tabs":"All tabs","card.badge":"badge: {value}","card.ghost":"Hidden: its visibility conditions aren't met (shown while editing)","card.prev_tab":"Previous tab","card.next_tab":"Next tab","card.search":"Find a tab","card.search_placeholder":"Type to filter…","card.search_none":"No matching tabs","card.customize":"Arrange tabs","card.move_up":"Move {name} up","card.move_down":"Move {name} down","card.hide_tab":"Hide {name}","card.show_tab":"Show {name}","card.reset":"Reset","card.done":"Done","card.fullscreen":"Full screen","card.exit_fullscreen":"Exit full screen","card.no_entities":"No entities here.","card.pin_title":"Enter the code for {tab}","card.pin_label":"Code","card.pin_wrong":"Wrong code","card.cancel":"Cancel","card.open":"Open","card.changed":"Changed since you last looked","card.unhealthy":"Most of this tab's devices are unavailable","card.notification":"Notification","card.dismiss":"Dismiss","card.open_repairs":"Open Repairs","card.close":"Close","card.wake":"Tap to wake","card.breadcrumbs":"Breadcrumb","card.overview":"Show all tabs","card.entity_search":"Search the dashboard","card.entity_search_placeholder":"Type an entity name…","card.entity_search_none":"No tab shows a matching entity","card.wizard_step":"Step {n} of {total}","card.back":"Back","card.next":"Next","card.finish":"Finish","card.last_tab":"Back to {name}","card.share":"Share a link to this tab","card.link_copied":"Link copied","card.copy_link":"Copy this link","card.scan_qr":"Scan to open this tab","card.view_missing_dashboard":"There's no dashboard “{dashboard}” to show here","card.view_missing_view":"The dashboard “{dashboard}” has no view “{view}”","card.view_generated":"“{dashboard}” is generated automatically, so its views can't be shown in a tab","card.view_empty":"The view “{view}” on “{dashboard}” has no cards","card.view_loop":"This tab is on the view it would show, so it can't show it","card.empty_title":"Nothing to show right now","card.loading":"Loading…","card.error_title":"Part of this tab couldn't load","card.error_not_installed":"{type} isn't installed","card.error_unknown_type":"There's no card type “{type}”","card.error_no_type":"A card has no type","card.error_hint":"Edit the dashboard to fix it","card.n_alerts":"one:{n} alert|other:{n} alerts","card.learned":"Opened {tab}: you often use it at this time","card.takeover_back":"Back to {tab} in {time}","card.tab_ref_bad_ref":"Shared tab: write {ref} as dashboard/tab.","card.tab_ref_missing_dashboard":"Shared tab: no dashboard {dashboard}.","card.tab_ref_missing_tab":"Shared tab: no tab {tab} on {dashboard}.","card.tab_ref_loop":"Shared tab: {ref} leads back to itself.","card.offline":"Connection lost · reconnecting…","card.pin_enter":"Enter PIN"}},Ui={},Fi=/* @__PURE__ */new Map,Vi=/* @__PURE__ */new Map,Ki="tabdeck-language-loaded";function Wi(t){const e=[t],i=t.split(/[-_]/)[0].toLowerCase();return i!==t&&e.push(i),e}function Xi(t){const e=Wi(t).find(t=>void 0!==Ui[t]);if(!e)return Promise.resolve();const i=Ui[e];if(Fi.get(e)===i)return Promise.resolve();let s=Vi.get(i);return s||(s=i().then(t=>{Fi.set(e,i),function(t,e){qi[t]=e,"undefined"!=typeof window&&window.dispatchEvent(new Event(Ki))}(e,{...qi[e]??{},...t})}).catch(()=>{}).finally(()=>Vi.delete(i)),Vi.set(i,s)),s}function Yi(t){return String(t?.locale?.language??t?.language??Di)}function Gi(t){return Xi(t),Wi(t).find(t=>void 0!==qi[t])??Di}function Qi(t,e,i){let s=qi[Gi(t)][e]??qi[Di][e]??e;if(i)for(const[r,o]of Object.entries(i))s=s.split(`{${r}}`).join(String(o));return s}var Ji,Zi=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){var t;this.stop=(t=()=>this.host.requestUpdate(),"undefined"==typeof window?()=>{}:(window.addEventListener(Ki,t),()=>window.removeEventListener(Ki,t)))}hostDisconnected(){this.stop?.(),this.stop=void 0}},ts=t=>()=>t().then(t=>t.default);Ji={ar:ts(()=>import("./tabdeck-card.ar-CD3hnb_P.js")),bn:ts(()=>import("./tabdeck-card.bn-DH8uKO2L.js")),de:ts(()=>import("./tabdeck-card.de-CwopWCQo.js")),es:ts(()=>import("./tabdeck-card.es-n00pTMTy.js")),fr:ts(()=>import("./tabdeck-card.fr-DpegX8Wl.js")),hi:ts(()=>import("./tabdeck-card.hi-bRNTv_zs.js")),id:ts(()=>import("./tabdeck-card.id-7pefNsMH.js")),it:ts(()=>import("./tabdeck-card.it-Bev4uWGe.js")),ja:ts(()=>import("./tabdeck-card.ja-BnVajCH8.js")),ko:ts(()=>import("./tabdeck-card.ko-DgAXZnln.js")),nl:ts(()=>import("./tabdeck-card.nl-C5M6ag30.js")),pl:ts(()=>import("./tabdeck-card.pl-C4F1SXUg.js")),pt:ts(()=>import("./tabdeck-card.pt-0vVEGYly.js")),ru:ts(()=>import("./tabdeck-card.ru-CJh7tGnC.js")),tr:ts(()=>import("./tabdeck-card.tr-C49ODfeb.js")),uk:ts(()=>import("./tabdeck-card.uk-CSv0S_jE.js")),vi:ts(()=>import("./tabdeck-card.vi-DInb7_WU.js")),"zh-Hans":ts(()=>import("./tabdeck-card.zh-Hans-BwRnIwBR.js")),"zh-Hant":ts(()=>import("./tabdeck-card.zh-Hant-DVdsXvSJ.js")),"zh-HK":ts(()=>import("./tabdeck-card.zh-Hant-DVdsXvSJ.js"))},Object.assign(Ui,Ji),function(){const t=function(){if("undefined"!=typeof document){const t=document.querySelector("home-assistant")?.hass,e=t?.locale?.language??t?.language;if(e)return String(e)}try{const t=JSON.parse(globalThis.localStorage?.getItem("selectedLanguage")??"null");if("string"==typeof t&&t)return t}catch{}}();t&&Xi(t)}();var es={order:[],hidden:[]},is=t=>`tabdeck-layout:${t}`;function ss(t,e){try{!e||0===e.order.length&&0===e.hidden.length?localStorage.removeItem(is(t)):localStorage.setItem(is(t),JSON.stringify(e))}catch{}}function rs(t,e){if(0===e.order.length)return t;const i=t=>{const i=void 0===t.name?-1:e.order.indexOf(t.name);return i<0?Number.MAX_SAFE_INTEGER:i};return t.map((t,e)=>({t:t,i:e})).sort((t,e)=>i(t.t)-i(e.t)||t.i-e.i).map(t=>t.t)}function os(t,e,i,s){if(e===i||!t.includes(e)||!t.includes(i))return t;const r=t.filter(t=>t!==e),o=r.indexOf(i)+(s?1:0);return[...r.slice(0,o),e,...r.slice(o)]}var ns=/* @__PURE__ */new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]),as=/* @__PURE__ */new Set(["primary-text","secondary-text","disabled"]),cs=/* @__PURE__ */new Set(["red","pink","purple","indigo","blue","cyan","teal","green","lime","yellow","orange","brown","grey","black","white"]);function ds(t){if("string"!=typeof t||""===t.trim())return;const e=t.trim();return ns.has(e)||as.has(e)?cs.has(e)?`var(--${e}-color, ${e})`:`var(--${e}-color)`:e}function ls(t){const e=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(t?.trim()??"");return e?[Number(e[1]),Number(e[2]),Number(e[3])]:void 0}function hs([t,e,i]){const s=t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4};return.2126*s(t)+.7152*s(e)+.0722*s(i)}function ps(t,e){const[i,s]=[hs(t),hs(e)].sort((t,e)=>e-t);return(i+.05)/(s+.05)}function us(t){const e=ls(t);if(e)return ps(e,[0,0,0])>=ps(e,[255,255,255])?"#000":"#fff"}var _s=class{constructor(){this._want=!1,this._pending=!1}get held(){return!!this._sentinel}set(t){if(this._want=t,!t){const t=this._sentinel;return this._sentinel=void 0,void t?.release?.()?.catch?.(()=>{})}if(this._sentinel||this._pending||"undefined"!=typeof document&&"hidden"===document.visibilityState)return;const e="undefined"!=typeof navigator?navigator.wakeLock:void 0;e?.request?(this._pending=!0,Promise.resolve().then(()=>e.request("screen")).then(t=>{this._want?(this._sentinel=t,t.addEventListener?.("release",()=>{this._sentinel===t&&(this._sentinel=void 0)})):t.release?.()}).catch(t=>console.debug("tabdeck-card: keep_awake refused:",t?.message??t)).finally(()=>{this._pending=!1})):console.debug("tabdeck-card: keep_awake needs the Screen Wake Lock API (https or localhost)")}},bs=t=>`tabdeck-usage:${t}`;function fs(t,e){return{...t,[e]:(t[e]??0)+1}}function ms(t,e){const i=t=>void 0===t.name?0:e[t.name]??0;return t.map((t,e)=>({t:t,i:e})).sort((t,e)=>i(e.t)-i(t.t)||t.i-e.i).map(t=>t.t)}var gs=t=>`tabdeck-learned:${t}`;function vs(t,e){return Math.hypot(t.clientX-e.clientX,t.clientY-e.clientY)}var ys={next:"next",forward:"next",previous:"previous",prev:"previous",back:"back",last:"back",default:"default",start:"default"};function xs(t){if("string"==typeof t)return ys[t.trim().toLowerCase()]}function ks(t,e,i){if(void 0===e)return-1;const s=t.indexOf(e);return s>=0&&i(e)?s:-1}function ws(t,e){e&&"hidden"!==t.dataset.tabdeckError?(t.dataset.tabdeckError="hidden",t.style.display="none"):e||"hidden"!==t.dataset.tabdeckError||(delete t.dataset.tabdeckError,t.style.display="")}var $s=/* @__PURE__ */new WeakMap;var Ss=/* @__PURE__ */new Map;function Ts(t,e,i,s=3,r=250){e(i),Math.abs(t()-i)<=2||s<=1||setTimeout(()=>Ts(t,e,i,s-1,r),r)}var As=1,Cs=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},Es="important",zs=" !"+Es,Os=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Cs{constructor(t){if(super(t),t.type!==As||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const s of this.ft)e[s]??(this.ft.delete(s),s.includes("-")?i.removeProperty(s):i[s]=null);for(const s in e){const t=e[s];if(null!=t){this.ft.add(s);const e="string"==typeof t&&t.endsWith(zs);s.includes("-")||e?i.setProperty(s,e?t.slice(0,-11):t,e?Es:""):i[s]=t}}return F}});var Ms=/* @__PURE__ */new Set(["entity","entity_id","entities","camera_image","camera_entity"]),Ls=/^[a-z_]+\.[a-z0-9_]+$/;function Ps(t){const e=/* @__PURE__ */new Set,i=t=>{"string"==typeof t&&Ls.test(t)?e.add(t):Array.isArray(t)?t.forEach(i):t&&"object"==typeof t&&"string"==typeof t.entity&&i(t.entity)},s=t=>{if(Array.isArray(t))t.forEach(s);else if(t&&"object"==typeof t)for(const[e,r]of Object.entries(t))Ms.has(e)&&i(r),r&&"object"==typeof r&&s(r)};return s(t),[...e]}var Ns=t=>`tabdeck-seen:${t}`;var Is=t=>t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function Rs(t){return/\{[{%#]/.test(t)?`{% raw %}${t}{% endraw %}`:t}var js={critical:"mdi:alert-octagon",error:"mdi:alert-circle",warning:"mdi:alert"},Bs={critical:0,error:1,warning:2};function Hs(t,e){if(!t)return;const i=t.attributes??{};if(String(t.entity_id??"").startsWith("timer.")){if("active"===t.state){const t=Date.parse(i.finishes_at??"");if(Number.isFinite(t))return{seconds:Math.max(0,(t-e)/1e3),ticking:!0}}if("active"!==t.state&&"paused"!==t.state)return;const s=function(t){const e=/^(\d+):(\d{1,2}):(\d{1,2})(?:\.\d+)?$/.exec(String(t??"").trim());return e?3600*Number(e[1])+60*Number(e[2])+Number(e[3]):void 0}(i.remaining);return void 0===s?void 0:{seconds:s,ticking:!1}}if(!/^\d{4}-\d\d-\d\dT/.test(String(t.state)))return;const s=Date.parse(t.state);return Number.isFinite(s)&&s>e?{seconds:(s-e)/1e3,ticking:!0}:void 0}function Ds(t){const e=Math.ceil(t),i=Math.floor(e/3600),s=Math.floor(e%3600/60),r=String(e%60).padStart(2,"0");return i?`${i}:${String(s).padStart(2,"0")}:${r}`:`${s}:${r}`}var qs={y:-1,run:0,hidden:!1};var Us=t=>e=>{customElements.get(t)||customElements.define(t,e)};function Fs(){return"function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches}var Vs=o`
  @media (prefers-reduced-motion: reduce) {
    :host,
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;function Ks(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}var Ws=/* @__PURE__ */new Set(["","0","off","false","no","none","unavailable","unknown","closed"]);function Xs(t){if(null==t)return!1;const e=String(t).trim().toLowerCase();return(""===e||0!==Number(e))&&!Ws.has(e)}var Ys=class extends at{constructor(...t){super(...t),this.badgeAction=!1,this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1,this.alert=!1,this.action=!1,this.ghost=!1,this.stacked=!1,this.fab=!1,this.hasMenu=!1,this.ghostLabel="Hidden: its visibility conditions aren't met (shown while editing)",this.changed=!1,this.changedLabel="Changed since you last looked",this.unhealthy=!1,this.unhealthyLabel="Most of this tab's devices are unavailable",this.bounce=!1,this._bounceFrom=0,this._onKeydown=t=>{!this.action||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback(),this._bounceFrom=Date.now()+1500,this.setAttribute("role","tab"),this.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),super.disconnectedCallback()}updated(t){this._applyFont(t),this.bounce&&t.has("badge")&&!t.has("bounce")&&Date.now()>=this._bounceFrom&&this._bounceBadge(),this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected||this.action?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color"),this.ghost?this.title=this.ghostLabel:this.removeAttribute("title"),"dots"===this.display&&this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"),this._applyReadableText()}render(){if("dots"===this.display)return U`<span class="dot" part="dot"></span>`;const t="active"===this.display?this.selected?"both":"icon":this.display,e=!!this.icon||!!this.picture,i="icon"!==t||!e;return U`
      <div class="inner">
        ${"label"!==t&&e?this._renderIcon():V}
        ${i&&this.label?U`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?U`<span class="subtitle">${this.subtitle}</span>`:V}
            </span>`:V}
        ${this.graph?U`<svg class="graph" part="graph" viewBox="0 0 44 12" aria-hidden="true"
              ><polyline points=${this.graph} style=${this.graphColor?`stroke:${this.graphColor}`:""}></polyline
            ></svg>`:V}
        ${this.extraBadges?.length?U`<span class="badges">${this._renderBadge()}${this.extraBadges.map(t=>this._renderExtra(t))}</span>`:this._renderBadge()}
        ${this.changed&&!this.selected?U`<span class="changed-dot" part="changed-dot" role="img" aria-label=${this.changedLabel} title=${this.changedLabel}></span>`:V}
        ${this.unhealthy?U`<ha-icon class="health-mark" icon="mdi:alert-circle-outline" role="img" aria-label=${this.unhealthyLabel} title=${this.unhealthyLabel}></ha-icon>`:V}
        ${this.hasMenu?U`<span class="caret" aria-hidden="true">▾</span>`:V}
        ${this.ghost?U`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`:V}
      </div>
      ${this._renderProgress()}
      ${void 0!==this.speed?U`<span class="speed ${s=this.speed,s<100?"ok":s<300?"slow":"bad"}" part="speed">${Math.round(this.speed)} ms</span>`:V}
    `;var s}_renderIcon(){const t=this.picture?U`<img class="picture icon" src=${this.picture} alt="" loading="lazy" />`:U`<ha-icon class="icon" icon=${this.icon}></ha-icon>`;return"bar"!==this.ringStyle&&this._hasRing()?U`<span class="icon-wrap">
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
      ${t}
    </span>`:t}_bounceBadge(){const t=this.renderRoot.querySelector(".badges, .badge, .badge-dot");t&&"function"==typeof t.animate&&(Fs()||t.animate([{transform:"scale(1)"},{transform:"scale(1.4)"},{transform:"scale(0.9)"},{transform:"scale(1)"}],{duration:450,easing:"ease-out"}))}_hasRing(){return void 0!==this.ring&&null!==this.ring&&Number.isFinite(this.ring)}_renderProgress(){if("bar"!==this.ringStyle||!this._hasRing())return V;const t=Math.round(this.ring);return U`<span class="progress" part="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${t}
      ><span class="progress-value" style="width:${t}%${this.ringColor?`;background:${this.ringColor}`:""}"></span
    ></span>`}_applyFont(t){if(t.has("font")){const t=this.font??{};for(const[e,i]of[["size",t.size],["weight",t.weight],["family",t.family]])i?this.style.setProperty(`--tabdeck-tab-font-${e}`,i):this.style.removeProperty(`--tabdeck-tab-font-${e}`)}}_applyReadableText(){for(const t of this.renderRoot.querySelectorAll(".badge:not(.icon-badge)")){const e=t.style.background?us(getComputedStyle(t).backgroundColor):void 0;t.style.color=e??""}this.fab&&!this.color&&(this.style.color=us(getComputedStyle(this).backgroundColor)??"")}_renderExtra(t){const e=t.color?`background:${t.color}`:"";return"dot"===this.badgeDisplay?t.icon||Xs(t.text)?U`<span class="badge-dot" part="badge-dot" style=${e}></span>`:V:U`<span class="badge${t.icon?" icon-badge":""}" part="badge" style=${e} aria-label=${t.label??""}
      >${t.icon?U`<ha-icon icon=${t.icon}></ha-icon>`:t.text}</span
    >`}_onBadgeClick(t){this.badgeAction&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("badge-click",{bubbles:!0,composed:!0})))}_renderBadge(){const t=this.badgeColor?`background:${this.badgeColor}`:"",e=this.badgeAction?" clickable":"";return this.badgeIcon&&(void 0===this.badge||Xs(this.badge))?U`<span
        class="badge icon-badge${e}"
        part="badge"
        style=${t}
        aria-label=${this.badgeLabel??`badge: ${this.badge??""}`}
        @click=${this._onBadgeClick}
        ><ha-icon icon=${this.badgeIcon}></ha-icon
      ></span>`:"dot"===this.badgeDisplay?Xs(this.badge)?U`<span class="badge-dot${e}" part="badge-dot" style=${t} @click=${this._onBadgeClick}></span>`:V:this.badge?U`<span
          class="badge${e}"
          part="badge"
          style=${t}
          aria-label=${this.badgeLabel??`badge: ${this.badge}`}
          @click=${this._onBadgeClick}
          >${this.badge}</span>`:V}static{this.styles=o`
    ${Vs}
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: var(--tabdeck-tab-padding, var(--tabdeck-density-padding, 0 16px));
      height: var(--tabdeck-tab-height, var(--tabdeck-density-height, 48px));
      cursor: pointer;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      font-size: var(--tabdeck-tab-font-size, var(--tabdeck-density-font-size, 14px));
      font-weight: var(--tabdeck-tab-font-weight, normal);
      font-family: var(--tabdeck-tab-font-family, var(--paper-font-body1_-_font-family, inherit));
      border-radius: var(--tabdeck-tab-radius, 0);
      user-select: none;
      white-space: nowrap;
      outline: none;
      transition: color 120ms ease;
    }
    :host([selected]) {
      color: var(--tabdeck-selected-color, var(--tabdeck-selected-auto, var(--tabdeck-accent, var(--primary-color))));
    }
    /* icon_animation */
    :host([icon-animation="spin"]) .icon {
      animation: tabdeck-spin 1.6s linear infinite;
    }
    :host([icon-animation="pulse"]) .icon {
      animation: tabdeck-pulse 1.4s ease-in-out infinite;
    }
    :host([icon-animation="bounce"]) .icon {
      animation: tabdeck-bounce 1s ease-in-out infinite;
    }
    :host([icon-animation="shake"]) .icon {
      animation: tabdeck-shake 0.9s ease-in-out infinite;
    }
    :host([icon-animation="beat"]) .icon {
      animation: tabdeck-beat 1.2s ease-in-out infinite;
    }
    @keyframes tabdeck-spin {
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes tabdeck-pulse {
      50% {
        transform: scale(1.18);
        opacity: 0.7;
      }
    }
    @keyframes tabdeck-bounce {
      50% {
        transform: translateY(-3px);
      }
    }
    @keyframes tabdeck-shake {
      20%,
      60% {
        transform: rotate(-12deg);
      }
      40%,
      80% {
        transform: rotate(12deg);
      }
    }
    @keyframes tabdeck-beat {
      15%,
      45% {
        transform: scale(1.2);
      }
      30% {
        transform: scale(1);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([icon-animation]) .icon {
        animation: none;
      }
    }
    .picture {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    .icon-wrap .picture {
      width: 22px;
      height: 22px;
    }
    /* alert: a gentle pulsing tint + alert-coloured label/icon. */
    :host([alert]) {
      color: var(--tabdeck-alert-color, var(--error-color, #db4437));
      border-radius: var(--tabdeck-alert-radius, 8px);
      /* quiet_hours sets none: the label stays red, without the pulse. */
      animation: var(--tabdeck-alert-animation, tabdeck-alert-pulse 1.6s ease-in-out infinite);
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
    :host([stacked]) .badge-dot,
    :host([stacked]) .badges {
      position: absolute;
      top: -4px;
      inset-inline-start: calc(50% + 6px);
    }
    .badges {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    :host([stacked]) .badges > * {
      position: static;
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
      margin-inline-start: -2px;
    }
    .ghost-mark {
      --mdc-icon-size: 14px;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 var(--tabdeck-focus-width, 2px) var(--tabdeck-focus-color, var(--tabdeck-accent, var(--primary-color)));
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
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      opacity: 0.9;
    }
    ha-icon {
      --mdc-icon-size: var(--tabdeck-icon-size, 22px);
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
    .graph {
      width: var(--tabdeck-graph-width, 44px);
      height: var(--tabdeck-graph-height, 12px);
      flex-shrink: 0;
      overflow: visible;
    }
    .graph polyline {
      fill: none;
      stroke: var(--tabdeck-graph-color, currentColor);
      stroke-width: 1.5;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    /* ring_style: bar */
    :host([ring-style="bar"]) {
      position: relative;
    }
    .progress {
      position: absolute;
      inset-inline: 12%;
      bottom: var(--tabdeck-progress-offset, 5px);
      height: var(--tabdeck-progress-height, 3px);
      border-radius: 3px;
      overflow: hidden;
      background: var(--tabdeck-ring-track, rgba(127, 127, 127, 0.25));
    }
    .progress-value {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--tabdeck-ring-color, var(--tabdeck-accent, var(--primary-color)));
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
      background: var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)));
      color: var(--tabdeck-badge-color, var(--text-primary-color, #fff));
      font-size: 11px;
      line-height: 18px;
      text-align: center;
    }
    :host([selected]) .badge {
      background: var(
        --tabdeck-selected-badge-background,
        var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)))
      );
      color: var(--tabdeck-selected-badge-color, var(--tabdeck-badge-color, var(--text-primary-color, #fff)));
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tabdeck-accent, var(--primary-color));
      flex-shrink: 0;
    }
    :host([unhealthy]) .icon,
    :host([unhealthy]) .icon-wrap,
    :host([unhealthy]) .text {
      opacity: var(--tabdeck-unhealthy-opacity, 0.45);
    }
    .health-mark {
      --mdc-icon-size: 16px;
      color: var(--tabdeck-unhealthy-color, var(--warning-color, #ff9800));
      flex-shrink: 0;
    }
    :host([stacked]) .health-mark {
      position: absolute;
      top: 0;
      inset-inline-start: calc(50% + 6px);
    }
    :host([speed]) {
      position: relative;
    }
    .speed {
      position: absolute;
      top: 1px;
      inset-inline-end: 2px;
      padding: 0 4px;
      border-radius: 6px;
      font: 600 9px/14px ui-monospace, monospace;
      color: #fff;
      background: var(--success-color, #43a047);
      pointer-events: none;
    }
    .speed.slow {
      background: var(--warning-color, #ff9800);
    }
    .speed.bad {
      background: var(--error-color, #db4437);
    }
    .changed-dot {
      width: var(--tabdeck-changed-size, 7px);
      height: var(--tabdeck-changed-size, 7px);
      border-radius: 50%;
      background: var(--tabdeck-changed-color, var(--accent-color, #ff9800));
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: 2px;
    }
    :host([stacked]) .changed-dot {
      position: absolute;
      top: 2px;
      inset-inline-end: calc(50% - 18px);
    }
    .badge.clickable,
    .badge-dot.clickable {
      cursor: pointer;
    }
  `}};Ks([ut()],Ys.prototype,"label",void 0),Ks([ut()],Ys.prototype,"subtitle",void 0),Ks([ut()],Ys.prototype,"icon",void 0),Ks([ut()],Ys.prototype,"badge",void 0),Ks([ut()],Ys.prototype,"badgeColor",void 0),Ks([ut({type:Boolean})],Ys.prototype,"badgeAction",void 0),Ks([ut()],Ys.prototype,"badgeDisplay",void 0),Ks([ut()],Ys.prototype,"accent",void 0),Ks([ut()],Ys.prototype,"color",void 0),Ks([ut({reflect:!0})],Ys.prototype,"display",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"selected",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"disabled",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"alert",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"action",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"ghost",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"stacked",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"fab",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"hasMenu",void 0),Ks([ut()],Ys.prototype,"ghostLabel",void 0),Ks([ut()],Ys.prototype,"badgeLabel",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"changed",void 0),Ks([ut()],Ys.prototype,"changedLabel",void 0),Ks([ut({type:Boolean,reflect:!0})],Ys.prototype,"unhealthy",void 0),Ks([ut()],Ys.prototype,"unhealthyLabel",void 0),Ks([ut({type:Number,reflect:!0})],Ys.prototype,"speed",void 0),Ks([ut({type:Number})],Ys.prototype,"ring",void 0),Ks([ut()],Ys.prototype,"ringColor",void 0),Ks([ut({reflect:!0,attribute:"ring-style"})],Ys.prototype,"ringStyle",void 0),Ks([ut()],Ys.prototype,"graph",void 0),Ks([ut()],Ys.prototype,"graphColor",void 0),Ks([ut()],Ys.prototype,"badgeIcon",void 0),Ks([ut({attribute:!1})],Ys.prototype,"extraBadges",void 0),Ks([ut({type:Boolean})],Ys.prototype,"bounce",void 0),Ks([ut()],Ys.prototype,"picture",void 0),Ks([ut({reflect:!0,attribute:"icon-animation"})],Ys.prototype,"iconAnimation",void 0),Ks([ut({attribute:!1})],Ys.prototype,"font",void 0),Ys=Ks([Us("tabdeck-tab")],Ys);var Gs=t=>void 0===t?void 0:(Array.isArray(t)?t:[t]).map(String).filter(t=>""!==t);function Qs(t,e){const i=t?.entities?.[e];if(i)return i.area_id||t?.devices?.[i.device_id]?.area_id||void 0}var Js=/^([01]?\d|2[0-3]):([0-5]\d)$/;var Zs="tabdeck-device";function tr(t=("undefined"!=typeof location?location.search:"")){try{const e=new URLSearchParams(t).get("tabdeck_device");return e?(localStorage.setItem(Zs,e),e):localStorage.getItem(Zs)||localStorage.getItem("browser_mod-browser-id")||void 0}catch{return}}var er=(t,e)=>`tabdeck-snooze:${t}:${e}`;var ir=(t,e)=>`tabdeck-pin:${t}:${e}`;function sr(t,e,i){if(void 0!==i)try{const s=Number(sessionStorage.getItem(ir(t,e)));return Number.isFinite(s)&&s>0?s+6e4*i:void 0}catch{return}}function rr(t){let e=0,i=0,s=0,r=0;for(let o=0;o<t.length;o+=4){const n=t[o+3]/255;n<.1||(e+=t[o]*n,i+=t[o+1]*n,s+=t[o+2]*n,r+=n)}return r?[Math.round(e/r),Math.round(i/r),Math.round(s/r)]:void 0}var or=/* @__PURE__ */new Map;function nr(t,e="average"){const i=`${e} ${t}`;let s=or.get(i);return s||(s=function(t){return"undefined"==typeof OffscreenCanvas||"undefined"==typeof Image?Promise.resolve(void 0):new Promise(e=>{const i=new Image;let s;const r=t=>{clearTimeout(s),i.onload=i.onerror=null,e(t)};try{new URL(t,location.href).origin!==location.origin&&(i.crossOrigin="anonymous")}catch{return r()}i.onload=()=>{try{const t=new OffscreenCanvas(24,24).getContext("2d");t.drawImage(i,0,0,24,24),r(t.getImageData(0,0,24,24).data)}catch{r()}},i.onerror=()=>r(),s=setTimeout(()=>r(),1e4),i.src=t})}(t).then(t=>t?"dominant"===e?function(t){const e=Array.from({length:12},()=>({w:0,r:0,g:0,b:0}));for(let s=0;s<t.length;s+=4){if(t[s+3]<128)continue;const[i,r,o]=[t[s],t[s+1],t[s+2]],n=Math.max(i,r,o),a=Math.min(i,r,o),c=n?(n-a)/n:0;if(c<.25||n<40||a>235)continue;const d=n-a;let l=n===i?(r-o)/d%6:n===r?(o-i)/d+2:(i-r)/d+4;l<0&&(l+=6);const h=e[Math.floor(2*l)%12];h.w+=c,h.r+=i*c,h.g+=r*c,h.b+=o*c}const i=e.reduce((t,e)=>e.w>t.w?e:t);return 0===i.w?rr(t):[Math.round(i.r/i.w),Math.round(i.g/i.w),Math.round(i.b/i.w)]}(t):rr(t):void 0),or.set(i,s)),s}var ar=class extends at{constructor(...t){super(...t),this._language=new Zi(this),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this.scrollButtons=!1,this.overflowMenu=!1,this.fade=!1,this.limit=0,this._menuOpen=!1,this.hiddenAlerts=!1,this._hiddenCount=0,this._groupOpen=-1,this._groupLeft=0,this.collapsed=!1,this.language="en",this.rtl=!1,this.liquid=!1,this._lastSel=-1,this.density="default",this.railExpand=!1,this._railOpen=!1,this.customizable=!1,this.customItems=[],this._customOpen=!1,this.searchable=!1,this.expandable=!1,this.overviewable=!1,this.entitySearchable=!1,this.shareable=!1,this.reorderable=!1,this._searchOpen=!1,this._query="",this._active=0,this.dock=!1,this.autohide=!1,this.autohidden=!1,this._ready=!1,this._overflow=!1,this._resizeRaf=0,this._tipEnd=()=>{clearTimeout(this._tipTimer),this._tip&&(this._tip=void 0,window.removeEventListener("keydown",this._tipKey),window.removeEventListener("scroll",this._tipEnd,{capture:!0}))},this._tipKey=t=>{"Escape"===t.key&&this._tipEnd()},this._railEnter=()=>{this._railActive&&(this._railOpen=!0)},this._railLeave=()=>{this._railActive&&!this.matches(":focus-within")&&(this._railOpen=!1)},this._railFocusOut=t=>{if(!this._railActive)return;const e=t.relatedTarget;e&&this.contains(e)||this.matches(":hover")||(this._railOpen=!1)},this._suppressClick=!1,this._dragTouchMove=t=>{this._drag?.held&&t.cancelable&&t.preventDefault()},this._dragMove=t=>{const e=this._drag;if(!e)return;const i=t.clientX-e.x,s=t.clientY-e.y;if(!e.active){if(Math.hypot(i,s)<8)return;if(!e.held)return this._dragEnd();e.active=!0,this._cancelHold(),e.el.classList.add("dragging")}t.preventDefault();const r=this._horizontal,o=r&&this.rtl?-1:1;e.el.style.transform=(r?`translateX(${i}px)`:`translateY(${s}px)`)+" rotate(-2deg)";const n=[...this.renderRoot.querySelectorAll("tabdeck-tab")].map(t=>{const n=t.getBoundingClientRect(),a=t===e.el?r?i:s:0;return r?o<0?{start:-(n.right-a),end:-(n.left-a)}:{start:n.left-a,end:n.right-a}:{start:n.top-a,end:n.bottom-a}}),a=function(t,e){if(!t.length)return;if(e<t[0].start)return{index:0,after:!1};for(let s=0;s<t.length;s++){const i=t[s];if(e>=i.start&&e<i.end)return{index:s,after:e>=(i.start+i.end)/2}}let i=t.length-1;for(;i>0&&t[i].start>e;)i--;return{index:i,after:!0}}(n,r?t.clientX*o:t.clientY);this._dropAt=a&&{...a,index:a.index+this._window[0]}},this._dragUp=()=>{const t=this._drag,e=this._dropAt;t?.active&&(this._suppressClick=!0,e&&e.index!==t.index&&this.dispatchEvent(new CustomEvent("tabdeck-reorder",{detail:{from:t.index,to:e.index,after:e.after},bubbles:!0,composed:!0}))),this._dragEnd()},this._dragCancel=()=>this._dragEnd(),this._dragKey=t=>{"Escape"===t.key&&this._drag?.active&&(t.preventDefault(),t.stopPropagation(),this._suppressClick=!0,this._dragEnd())},this._tapIndex=-1,this._onCustomOutside=t=>{const e=this.renderRoot.querySelector(".custom-panel"),i=this.renderRoot.querySelector(".custom-btn"),s=t.composedPath();e&&s.includes(e)||i&&s.includes(i)||this._closeCustom()},this._onShareOutside=t=>{const e=this.renderRoot,i=t.composedPath(),s=e.querySelector(".share-panel"),r=e.querySelector(".share-btn");s&&i.includes(s)||r&&i.includes(r)||this.dispatchEvent(new CustomEvent("tabdeck-share-close",{bubbles:!0,composed:!0}))},this._onSearchOutside=t=>{const e=this.renderRoot.querySelector(".search-panel"),i=this.renderRoot.querySelector(".search-btn"),s=t.composedPath();e&&s.includes(e)||i&&s.includes(i)||this._closeSearch()},this._onOutside=t=>{const e=this.renderRoot.querySelector(".group-menu");if(e&&t.composedPath().includes(e))return;const i=this._tabEl(this._groupOpen);i&&t.composedPath().includes(i)||this._closeGroup()},this._onKeydown=t=>{const e="left"===this.position||"right"===this.position,i=e?"ArrowDown":this.rtl?"ArrowLeft":"ArrowRight",s=e?"ArrowUp":this.rtl?"ArrowRight":"ArrowLeft";let r=null;if(t.key===i?r=this._step(this.selected,1):t.key===s?r=this._step(this.selected,-1):"Home"===t.key?r=this._firstEnabled():"End"===t.key&&(r=this._firstEnabled(!0)),null!==r){t.preventDefault(),this._select(r);const e=r;this.limit>0&&setTimeout(()=>this._tabEl(e)?.focus(),0)}},this._fadeMask="",this._onBarScroll=()=>{this.hiddenAlerts&&this._countHidden(),this._updateFade()},this._countHidden=()=>{let t=0;if(this.hiddenAlerts){const[e,i]=this._window,s=this.renderRoot.querySelector(".bar")?.getBoundingClientRect();this.items.forEach((r,o)=>{if(!this._needsAttention(r))return;if(o<e||o>=i)return void t++;const n=this._tabEl(o)?.getBoundingClientRect();s&&n&&n.width&&(n.left<s.left-1||n.right>s.right+1)&&t++})}t!==this._hiddenCount&&(this._hiddenCount=t)}}get _window(){return le(this.items.length,this.selected,this.limit)}_tabEl(t){const[e,i]=this._window;if(!(t<e||t>=i))return this.renderRoot.querySelectorAll("tabdeck-tab")[t-e]}_tipStart(t,e,i=500){this._tipEnd();const s=this.items[t]?.tooltip;if(!s||"touch"===e.pointerType)return;const r=e.currentTarget;this._tipTimer=setTimeout(()=>{const t=r.getBoundingClientRect(),e="left"===this.position||"right"===this.position?"left"===this.position!==this.rtl?"right":"left":void 0,i=this.dock||"bottom"===this.position?"above":e??"below";this._tip={text:s,place:i,x:"right"===i?t.right+6:"left"===i?t.left-6:t.left+t.width/2,y:"below"===i?t.bottom+6:"above"===i?t.top-6:t.top+t.height/2},window.addEventListener("keydown",this._tipKey),window.addEventListener("scroll",this._tipEnd,{capture:!0,once:!0})},i)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.setAttribute("aria-label",this.barLabel||Qi(this.language,"card.tabs")),"auto"===this.barText&&requestAnimationFrame(()=>this._applyBarText()),this.addEventListener("keydown",this._onKeydown),this.addEventListener("mouseenter",this._railEnter),this.addEventListener("mouseleave",this._railLeave),this.addEventListener("focusin",this._railEnter),this.addEventListener("focusout",this._railFocusOut),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0,this._position()}))}))}disconnectedCallback(){this._dragEnd(),this._tipEnd(),window.removeEventListener("pointerdown",this._onShareOutside,!0),this.removeEventListener("keydown",this._onKeydown),window.removeEventListener("pointerdown",this._onOutside,!0),window.removeEventListener("pointerdown",this._onSearchOutside,!0),window.removeEventListener("pointerdown",this._onCustomOutside,!0),this._resizeObserver?.disconnect(),super.disconnectedCallback()}get _railActive(){return this.railExpand&&!this._horizontal}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_emitAction(t,e){this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:t,kind:e},bubbles:!0,composed:!0}))}_onPointerDown(t,e){this._suppressClick=!1,this.reorderable&&e&&this._dragStart(t,e),this.items[t]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._drag&&!this._drag.active&&this._dragEnd(),this._suppressClick=!0,this._emitAction(t,"hold")},500))}_dragStart(t,e){if(e.button>0)return;const i="touch"===e.pointerType||"pen"===e.pointerType,s=e.currentTarget;this._dragEnd();const r={index:t,x:e.clientX,y:e.clientY,touch:i,held:!i,active:!1,el:s};i&&(r.timer=setTimeout(()=>r.held=!0,300)),this._drag=r,window.addEventListener("pointermove",this._dragMove,!0),window.addEventListener("pointerup",this._dragUp,!0),window.addEventListener("pointercancel",this._dragCancel,!0),window.addEventListener("keydown",this._dragKey,!0),window.addEventListener("touchmove",this._dragTouchMove,{passive:!1,capture:!0})}_dragEnd(){const t=this._drag;this._drag=void 0,this._dropAt=void 0,window.removeEventListener("pointermove",this._dragMove,!0),window.removeEventListener("pointerup",this._dragUp,!0),window.removeEventListener("pointercancel",this._dragCancel,!0),window.removeEventListener("keydown",this._dragKey,!0),window.removeEventListener("touchmove",this._dragTouchMove,!0),t&&(t.timer&&clearTimeout(t.timer),t.el.classList.remove("dragging"),t.el.style.transform="")}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(t,e){if(this._cancelHold(),this._suppressClick)this._suppressClick=!1;else{if(this.items[t]?.doubleTap){if(this._tapTimer&&this._tapIndex===t)return clearTimeout(this._tapTimer),this._tapTimer=void 0,void this._emitAction(t,"double_tap");this._tapTimer&&clearTimeout(this._tapTimer),this._tapIndex=t;const i=e?.currentTarget;return void(this._tapTimer=setTimeout(()=>{this._tapTimer=void 0,this._activate(t,i)},250))}this._activate(t,e?.currentTarget)}}_activate(t,e){this.items[t]?.menu?.length?this._toggleGroup(t,e):this._select(t)}_emitCustomize(t){this.dispatchEvent(new CustomEvent("tabdeck-customize",{detail:t,bubbles:!0,composed:!0}))}_customLayout(t=this.customItems){return{order:t.map(t=>t.key).filter(t=>void 0!==t),hidden:t.filter(t=>t.hidden&&void 0!==t.key).map(t=>t.key)}}_moveCustom(t,e){const i=this.customItems.slice(),s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._emitCustomize(this._customLayout(i)))}_toggleCustomHidden(t){const e=this.customItems.map((e,i)=>i===t?{...e,hidden:!e.hidden}:e);e.every(t=>t.hidden)||this._emitCustomize(this._customLayout(e))}_openCustom(){this._customOpen=!0,window.addEventListener("pointerdown",this._onCustomOutside,!0)}_closeCustom(){this._customOpen=!1,window.removeEventListener("pointerdown",this._onCustomOutside,!0)}_renderCustom(){const t=this.language,e=(e,i)=>Qi(t,e,i),i=this.customItems.length;return U`<div
      class="custom-panel"
      role="dialog"
      aria-label=${e("card.customize")}
      @keydown=${t=>{t.stopPropagation(),"Escape"===t.key&&this._closeCustom()}}
    >
      <div class="custom-title">${e("card.customize")}</div>
      ${this.customItems.map((t,s)=>U`<div class="custom-row ${t.hidden?"is-hidden":""}">
          ${t.icon?U`<ha-icon .icon=${t.icon}></ha-icon>`:U`<span class="custom-noicon"></span>`}
          <span class="custom-name">${t.name??""}</span>
          <button class="custom-up" ?disabled=${0===s} aria-label=${e("card.move_up",{name:t.name??""})} @click=${()=>this._moveCustom(s,-1)}>↑</button>
          <button class="custom-down" ?disabled=${s===i-1} aria-label=${e("card.move_down",{name:t.name??""})} @click=${()=>this._moveCustom(s,1)}>↓</button>
          <button
            class="custom-eye"
            aria-pressed=${t.hidden?"false":"true"}
            aria-label=${e(t.hidden?"card.show_tab":"card.hide_tab",{name:t.name??""})}
            @click=${()=>this._toggleCustomHidden(s)}
          >
            <ha-icon .icon=${t.hidden?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
          </button>
        </div>`)}
      <div class="custom-actions">
        <button class="custom-reset" @click=${()=>this._emitCustomize({reset:!0})}>${e("card.reset")}</button>
        <button class="custom-done" @click=${()=>this._closeCustom()}>${e("card.done")}</button>
      </div>
    </div>`}_matches(t){const e=t=>(t??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),i=e(t).trim();return this.items.map((t,e)=>({index:e,item:t})).filter(({item:t})=>!t.disabled).filter(({item:t})=>!i||e(t.name).includes(i)||e(t.subtitle).includes(i))}openSearch(){this._query="",this._active=0,this._searchOpen=!0,window.addEventListener("pointerdown",this._onSearchOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeSearch(){this._searchOpen=!1,window.removeEventListener("pointerdown",this._onSearchOutside,!0)}_renderShare(t){const e=t=>Qi(this.language,t);return U`<div class="share-panel" role="dialog" aria-label=${e("card.share")}>
      <div class="share-status ${t.copied?"ok":""}">
        ${t.copied?U`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>`:""}
        ${e(t.copied?"card.link_copied":"card.copy_link")}
      </div>
      <input class="share-url" readonly .value=${t.url} @focus=${t=>t.target.select()} />
      ${t.qrPath?U`<svg class="share-qr" viewBox="0 0 ${t.qrSize} ${t.qrSize}" role="img" aria-label=${e("card.scan_qr")} shape-rendering="crispEdges">
              <rect width="100%" height="100%" fill="#fff"></rect>
              <path d=${t.qrPath} fill="#000"></path>
            </svg>
            <div class="share-caption">${e("card.scan_qr")}</div>`:""}
    </div>`}willUpdate(t){super.willUpdate(t),t.has("shareInfo")&&(window.removeEventListener("pointerdown",this._onShareOutside,!0),this.shareInfo&&window.addEventListener("pointerdown",this._onShareOutside,!0))}_pickSearch(t){this._closeSearch(),this._select(t)}_onSearchKeydown(t){t.stopPropagation();const e=this._matches(this._query);if("Escape"===t.key)this._closeSearch();else if("Enter"===t.key){t.preventDefault();const i=e[this._active]??e[0];i&&this._pickSearch(i.index)}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault();const i=e.length||1;this._active=(this._active+("ArrowDown"===t.key?1:-1)+i)%i}}_renderSearch(){const t=this._matches(this._query),e=this.language;return U`<div class="search-panel" role="dialog" aria-label=${Qi(e,"card.search")}>
      <input
        class="search-input"
        type="search"
        placeholder=${Qi(e,"card.search_placeholder")}
        aria-label=${Qi(e,"card.search")}
        .value=${this._query}
        @input=${t=>{this._query=t.target.value,this._active=0}}
        @keydown=${t=>this._onSearchKeydown(t)}
      />
      <div class="search-results" role="listbox">
        ${t.length?t.map((t,e)=>U`<button
                class="group-item ${e===this._active?"active":""}"
                role="option"
                aria-selected=${e===this._active?"true":"false"}
                @click=${()=>this._pickSearch(t.index)}
              >
                ${t.item.icon?U`<ha-icon .icon=${t.item.icon}></ha-icon>`:""}<span>${t.item.name??""}</span>
              </button>`):U`<div class="search-empty">${Qi(e,"card.search_none")}</div>`}
      </div>
    </div>`}_toggleGroup(t,e){if(this._groupOpen===t)return void this._closeGroup();const i=this.renderRoot.querySelector(".bar");this._groupLeft=e?e.offsetLeft-(i?.scrollLeft??0):0,this._groupOpen=t,window.addEventListener("pointerdown",this._onOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".group-item")?.focus())}_closeGroup(){this._groupOpen=-1,window.removeEventListener("pointerdown",this._onOutside,!0)}_pickChild(t,e){this._closeGroup(),this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t,child:e},bubbles:!0,composed:!0}))}_onGroupKeydown(t){const e=[...this.renderRoot.querySelectorAll(".group-item")],i=e.indexOf(t.composedPath()[0]);if("Escape"===t.key){t.stopPropagation();const e=this._tabEl(this._groupOpen);this._closeGroup(),e?.focus()}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault(),t.stopPropagation();const s=e.length;e[(i+("ArrowDown"===t.key?1:-1)+s)%s]?.focus()}}_renderGroupMenu(){const t=this.items[this._groupOpen];if(!t?.menu)return"";const e=this._groupOpen;return U`<div
      class="group-menu"
      role="menu"
      style="left:${this._groupLeft}px"
      @keydown=${t=>this._onGroupKeydown(t)}
    >
      ${t.menu.map(t=>U`<button class="group-item" role="menuitem" @click=${()=>this._pickChild(e,t.name)}>
          ${t.icon?U`<ha-icon .icon=${t.icon}></ha-icon>`:""}<span>${t.name??""}</span>
        </button>`)}
    </div>`}_selectable(t){const e=this.items[t];return!!e&&!e.disabled&&!e.action}_step(t,e){const i=this.items.length;for(let s=1;s<=i;s++){const r=(t+e*s+i*s)%i;if(this._selectable(r))return r}return t}_firstEnabled(t=!1){const e=this.items.length;for(let i=0;i<e;i++){const s=t?e-1-i:i;if(this._selectable(s))return s}return 0}_updateFade(){const t=this.renderRoot?.querySelector(".bar");if(!t)return;const e=this.fade&&this._horizontal&&!this.dock?function(t,e,i){if(i-e<=1)return{start:!1,end:!1};const s=Math.abs(t);return{start:s>1,end:s+e<i-1}}(t.scrollLeft,t.clientWidth,t.scrollWidth):{start:!1,end:!1},i=function(t,e){return t.start||t.end?`linear-gradient(to ${e?"left":"right"}, ${t.start?"transparent, #000 32px":"#000"}, ${t.end?"#000 calc(100% - 32px), transparent":"#000"})`:""}(e,this.rtl),s=[e.start&&"start",e.end&&"end"].filter(Boolean).join(" ");i===this._fadeMask&&(t.dataset.fade??"")===s&&t.style.cssText.includes("mask-image")===!!i||(this._fadeMask=i,s?t.dataset.fade=s:delete t.dataset.fade,i?(t.style.setProperty("mask-image",i),t.style.setProperty("-webkit-mask-image",i)):(t.style.removeProperty("mask-image"),t.style.removeProperty("-webkit-mask-image")))}_position(){this._updateFade();const t=this.renderRoot?.querySelector(".indicator");if(!t)return;const e=this._tabEl(this.selected),i=e?function(t,e,i,s=3,r=!1){if(!t||t.offsetWidth<=0)return null;const o=s>0?s:3;if("text"===i)return null;if("pill"===i||"segmented"===i||"boxed"===i||"rail"===i)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(!r||"left"!==e&&"right"!==e||(e="left"===e?"right":"left"),e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-o,width:t.offsetWidth,height:o};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:o};case"left":return{left:t.offsetLeft+t.offsetWidth-o,top:t.offsetTop,width:o,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:o,height:t.offsetHeight}}}({offsetLeft:e.offsetLeft,offsetTop:e.offsetTop,offsetWidth:e.offsetWidth,offsetHeight:e.offsetHeight},this.position,this.tabStyle,this.indicatorSize,this.rtl):null;i?(this._liquidMove(t,i),t.style.left=`${i.left}px`,t.style.top=`${i.top}px`,t.style.width=`${i.width}px`,t.style.height=`${i.height}px`,t.style.opacity="1"):t.style.opacity="0"}_liquidMove(t,e){const i=this._lastRect,s=this._lastSel>=0&&this._lastSel!==this.selected;if(this._lastRect=e,this._lastSel=this.selected,!(this.liquid&&s&&i&&this.animated&&this._ready&&"function"==typeof t.animate))return;if(Fs())return;const r="underline"===this.tabStyle?.6:.85;t.animate(function(t,e,i,s=.6){const r=t=>({left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`}),o=Math.min(i?t.top:t.left,i?e.top:e.left),n=Math.max(i?t.top+t.height:t.left+t.width,i?e.top+e.height:e.left+e.width),a=i?{...r(e),left:`${e.left}px`,top:`${o}px`,height:n-o+"px"}:{...r(e),top:`${e.top}px`,left:`${o}px`,width:n-o+"px"},c=i?`scaleX(${s})`:`scaleY(${s})`;return[{...r(t),transform:"none",offset:0},{...a,transform:c,offset:.45},{...r(e),transform:"none",offset:1}]}(i,e,!this._horizontal,r),{duration:420,easing:"cubic-bezier(0.3, 0.7, 0.2, 1)"})}_applyReadableSelected(){const t=this.renderRoot?.querySelector?.(".indicator"),e=t&&["pill","boxed"].includes(this.tabStyle)?getComputedStyle(t).backgroundColor:"",i=/^rgb\(/.test(e)||/^rgba\(.*,\s*1\)$/.test(e)?us(e):void 0;i?this.style.setProperty("--tabdeck-selected-auto",i):this.style.removeProperty("--tabdeck-selected-auto")}_applyAccent(){const t=this.accentIndicator?this.items[this.selected]?.accent:void 0;t?this.style.setProperty("--tabdeck-accent",t):this.style.removeProperty("--tabdeck-accent"),null!=this.indicatorRadius?this.style.setProperty("--tabdeck-indicator-radius",`${this.indicatorRadius}px`):this.style.removeProperty("--tabdeck-indicator-radius")}_barRgb(){if("light"===this.barText)return[24,24,24];if("dark"===this.barText)return[240,240,240];if("auto"!==this.barText)return;const t=function(t){if("string"!=typeof t)return;const e=/url\(\s*(['"]?)(.*?)\1\s*\)/.exec(t);if(e)return e[2]||void 0;const i=t.trim();return/^(\/|https?:\/\/)\S/.test(i)&&!/\s/.test(i)?i:void 0}(this.barBackground);if(t)return t!==this._picUrl&&(this._picUrl=t,this._picRgb=void 0,nr(t).then(e=>{this._picUrl===t&&(this._picRgb=e)})),this._picRgb;this._picUrl=void 0;const e=this.renderRoot?.querySelector?.(".bar");if(!e||!this.barBackground)return;const i=getComputedStyle(e),s=((i.backgroundImage||"").match(/rgba?\([^)]*\)/g)??[]).map(t=>ls(t)).filter(Boolean);if(s.length)return[0,1,2].map(t=>s.reduce((e,i)=>e+i[t],0)/s.length);const r=i.backgroundColor||"";return/,\s*0(\.0+)?\)$/.test(r)?void 0:ls(r)}_applyBarText(){if(!this.isConnected)return;const t=this._barRgb(),e=t?us(`rgb(${t.join(",")})`):void 0;if(!e)return void this.style.removeProperty("--tabdeck-tab-color");if(this.style.setProperty("--tabdeck-tab-color","#fff"===e?"rgba(255, 255, 255, 0.88)":"rgba(0, 0, 0, 0.72)"),this.style.getPropertyValue("--tabdeck-selected-auto"))return;const i=this._tabEl(this.selected),s=i&&!i.style.color?ls(getComputedStyle(i).color):void 0;s&&ps(s,t)<3&&this.style.setProperty("--tabdeck-selected-auto",e)}_applyGlass(){this.toggleAttribute("glass",!!this.glass),this.glass?this.style.setProperty("--tabdeck-glass-blur",`${this.glass}px`):this.style.removeProperty("--tabdeck-glass-blur")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background=this.barBackground||this.glass?"transparent":"var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.setProperty("top","var(--tabdeck-sticky-top, var(--header-height, 0px))"),this.style.bottom="");else for(const t of["position","zIndex","background","top","bottom"])this.style.removeProperty(t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()))}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(t){this.setAttribute("aria-label",this.barLabel||Qi(this.language,"card.tabs")),this.toggleAttribute("rail-expand",this._railActive),this.toggleAttribute("expanded",this._railActive&&this._railOpen),this.toggleAttribute("rtl",this.rtl),this._applyAccent(),this._applyGlass(),this._applyReadableSelected(),this._applyBarText(),this._applySticky();const e=this._searchOpen||this._customOpen||this._menuOpen||this._groupOpen>=0;this.toggleAttribute("autohidden",this.autohide&&this.autohidden&&!e),this.toggleAttribute("autohide-down",this.dock||"bottom"===this.position),this._position();const i=[...this.renderRoot.querySelectorAll("tabdeck-tab")];if(this.fade&&this._horizontal)for(const s of i)this._resizeObserver?.observe(s);Promise.all(i.map(t=>t.updateComplete)).then(()=>{this._position(),this.limit>0&&this._revealLimited(t)}),this._updateOverflow(),this._countHidden(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}_revealLimited(t){const e=this.renderRoot;if(t.has("selected")||t.has("items")){const t=e.querySelector(".bar"),i=this._tabEl(this.selected);if(t&&i&&this._horizontal){const e=t.getBoundingClientRect(),s=i.getBoundingClientRect();s.left<e.left?t.scrollLeft-=e.left-s.left:s.right>e.right&&(t.scrollLeft+=s.right-e.right)}}if(t.has("_menuOpen")&&this._menuOpen){const t=e.querySelector(".overflow-item.current"),i=e.querySelector(".overflow-menu");t&&i&&(i.scrollTop=t.offsetTop-i.clientHeight/2+t.offsetHeight/2)}}get _horizontal(){return"top"===this.position||"bottom"===this.position}_needsAttention(t){return!!t.alert||Xs(t.badge)}_updateOverflow(){if(!this.scrollButtons&&!this.overflowMenu||!this._horizontal)return void(this._overflow&&(this._overflow=!1));const t=this.renderRoot.querySelector(".bar"),e=!!t&&t.scrollWidth-t.clientWidth>1;e!==this._overflow&&(this._overflow=e)}_scrollBy(t){const e=this.renderRoot.querySelector(".bar");e&&e.scrollBy({left:t*(this.rtl?-1:1)*e.clientWidth*.8,behavior:Fs()?"auto":"smooth"})}_pickFromMenu(t){this._menuOpen=!1,this.items[t]?.disabled||this._select(t)}render(){const t=this._ready&&this.animated&&!this.liquid?" animate":"",e=this.scrollButtons&&this._horizontal&&this._overflow,[i,s]=this._window,r=s-i<this.items.length,o=this.overflowMenu&&this._horizontal&&this._overflow||r;return U`
      <div class="bar-wrap ${e||o||this.searchable||this.customizable||this.expandable||this.overviewable||this.entitySearchable||this.lastTab||this.shareable||void 0!==this.summary?"has-arrows":""}">
      ${e?U`<button class="scroll-btn left" aria-label=${Qi(this.language,this.rtl?"card.scroll_right":"card.scroll_left")} @click=${()=>this._scrollBy(-1)}>${this.rtl?"›":"‹"}</button>`:""}
      <div
        @scroll=${this.hiddenAlerts||this.fade?this._onBarScroll:V}
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation?"elevated":""} ${"dots"===this.display?"dots":""}"
        part="bar"
        style=${this.barBackground?`background:${this.barBackground}`:""}
      >
        <div class="indicator${t}" part="indicator"></div>
        ${this.items.slice(i,s).map((t,e,s,r=i+e)=>U`
            ${t.separator&&"dots"!==this.display?U`<span class="sep sep-${t.separator}" aria-hidden="true"></span>`:""}
            <tabdeck-tab
              .label=${t.name}
              .subtitle=${t.subtitle}
              .icon=${t.icon}
              .badge=${t.badge}
              .badgeColor=${t.badgeColor}
              .badgeAction=${!!t.badgeAction}
              .changed=${!!t.changed}
              .changedLabel=${Qi(this.language,"card.changed")}
              .unhealthy=${!!t.unhealthy}
              .speed=${t.speed}
              .unhealthyLabel=${Qi(this.language,"card.unhealthy")}
              .badgeDisplay=${this.badgeDisplay}
              @badge-click=${()=>this._emitAction(r,"badge")}
              .accent=${t.accent}
              .color=${t.color}
              .disabled=${!!t.disabled}
              .alert=${!!t.alert}
              .action=${!!t.action}
              .ghost=${!!t.ghost}
              .fab=${!!t.fab}
              .ring=${t.ring}
              .ringColor=${t.ringColor}
              .ringStyle=${t.ringStyle}
              .graph=${t.graph}
              .graphColor=${t.graphColor}
              .badgeIcon=${t.badgeIcon}
              .bounce=${!!t.bounce}
              .extraBadges=${t.badges?.map(t=>({...t,label:Qi(this.language,"card.badge",{value:t.text??t.icon??""})}))}
              .picture=${t.picture}
              .iconAnimation=${t.iconAnimation}
              .font=${t.font}
              .hasMenu=${!!t.menu?.length}
              aria-haspopup=${t.menu?.length?"menu":"false"}
              aria-expanded=${t.menu?.length?String(this._groupOpen===r):"false"}
              .stacked=${this.dock}
              .ghostLabel=${Qi(this.language,"card.ghost")}
              .badgeLabel=${Qi(this.language,"card.badge",{value:t.badge??""})}
              .display=${this._railActive?this._railOpen?"both":"icon":this.display}
              .selected=${r===this.selected}
              aria-controls="tabdeck-panel"
              @click=${t=>this._onTabClick(r,t)}
              data-drop=${this._dropAt?.index===r?this._dropAt.after?"after":"before":""}
              @pointerdown=${t=>{this._tipEnd(),this._onPointerDown(r,t)}}
              @pointerup=${()=>this._cancelHold()}
              aria-description=${t.tooltip||V}
              @pointerenter=${t.tooltip?t=>this._tipStart(r,t):V}
              @focusin=${t.tooltip?t=>t.currentTarget.matches?.(":focus-visible")&&this._tipStart(r,t,0):V}
              @focusout=${t.tooltip?this._tipEnd:V}
              @pointerleave=${()=>{this._tipEnd(),this._cancelHold()}}
              @pointercancel=${()=>this._cancelHold()}
            ></tabdeck-tab>
          `)}
      </div>
      ${this._tip?U`<div class="tip tip-${this._tip.place}" role="tooltip" style="left:${this._tip.x}px;top:${this._tip.y}px">${this._tip.text}</div>`:""}
      ${this.summary?U`<button
            class="summary-chip"
            part="summary-chip"
            style=${this.summary.color?`background:${this.summary.color}`:""}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-summary",{bubbles:!0,composed:!0}))}
          >
            ${this.summary.icon?U`<ha-icon icon=${this.summary.icon}></ha-icon>`:""}<span>${this.summary.text}</span>
          </button>`:""}
      ${this._groupOpen>=0?this._renderGroupMenu():""}
      ${this.searchable?U`<button
            class="search-btn"
            aria-label=${Qi(this.language,"card.search")}
            aria-expanded=${this._searchOpen?"true":"false"}
            @click=${()=>this._searchOpen?this._closeSearch():this.openSearch()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
          </button>`:""}
      ${this._searchOpen?this._renderSearch():""}
      ${this.customizable?U`<button
            class="custom-btn search-btn"
            aria-label=${Qi(this.language,"card.customize")}
            aria-expanded=${this._customOpen?"true":"false"}
            @click=${()=>this._customOpen?this._closeCustom():this._openCustom()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"></path></svg>
          </button>`:""}
      ${this._customOpen?this._renderCustom():""}
      ${this.lastTab?U`<button
            class="last-btn search-btn"
            aria-label=${Qi(this.language,"card.last_tab",{name:this.lastTab.name??""})}
            title=${Qi(this.language,"card.last_tab",{name:this.lastTab.name??""})}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-last",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z"></path></svg>
            ${"icon"!==this.display&&"dots"!==this.display&&this.lastTab.name?U`<span class="last-name">${this.lastTab.name}</span>`:""}
          </button>`:""}
      ${this.shareable?U`<button
            class="share-btn search-btn"
            aria-label=${Qi(this.language,"card.share")}
            title=${Qi(this.language,"card.share")}
            aria-expanded=${this.shareInfo?"true":"false"}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-share",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"></path></svg>
          </button>`:""}
      ${this.shareable&&this.shareInfo?this._renderShare(this.shareInfo):""}
      ${this.entitySearchable?U`<button
            class="es-btn search-btn"
            aria-label=${Qi(this.language,"card.entity_search")}
            title=${Qi(this.language,"card.entity_search")+" (Ctrl K)"}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-entity-search",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,4H21V6H3V4M3,9H11V11H3V9M3,14H9V16H3V14M15.5,10A4.5,4.5 0 0,1 20,14.5C20,15.38 19.75,16.21 19.31,16.9L22.39,20L21,21.39L17.88,18.32C17.19,18.75 16.37,19 15.5,19A4.5,4.5 0 0,1 11,14.5A4.5,4.5 0 0,1 15.5,10M15.5,12A2.5,2.5 0 0,0 13,14.5A2.5,2.5 0 0,0 15.5,17A2.5,2.5 0 0,0 18,14.5A2.5,2.5 0 0,0 15.5,12Z"></path></svg>
          </button>`:""}
      ${this.overviewable?U`<button
            class="ov-btn search-btn"
            aria-label=${Qi(this.language,"card.overview")}
            title=${Qi(this.language,"card.overview")}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-overview",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3"></path></svg>
          </button>`:""}
      ${this.expandable?U`<button
            class="fs-btn search-btn"
            aria-label=${Qi(this.language,"card.fullscreen")}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-fullscreen",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"></path></svg>
          </button>`:""}
      ${e?U`<button class="scroll-btn right" aria-label=${Qi(this.language,this.rtl?"card.scroll_left":"card.scroll_right")} @click=${()=>this._scrollBy(1)}>${this.rtl?"‹":"›"}</button>`:""}
      ${o?U`<button
              class="overflow-btn"
              aria-label=${Qi(this.language,"card.all_tabs")+(this._hiddenCount?` (${Qi(this.language,"card.badge",{value:this._hiddenCount})})`:"")}
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${()=>this._menuOpen=!this._menuOpen}
            >
              ⋯${this._hiddenCount?U`<span class="ov-count">${this._hiddenCount}</span>`:""}
            </button>
            ${this._menuOpen?U`<div class="overflow-menu" role="menu">
                  ${this.items.map((t,e)=>U`<button
                      class="overflow-item ${e===this.selected?"current":""}"
                      role="menuitem"
                      ?disabled=${t.disabled}
                      @click=${()=>this._pickFromMenu(e)}
                    >
                      ${t.name??Qi(this.language,"card.tab_n",{n:e+1})}
                      ${this.hiddenAlerts&&this._needsAttention(t)?U`<span class="ov-badge ${Xs(t.badge)?"":"alert"}">${Xs(t.badge)?t.badge:"!"}</span>`:""}
                    </button>`)}
                </div>`:""}`:""}
      </div>
    `}static{this.styles=o`
    ${Vs}
    :host {
      display: block;
    }
    .tip {
      position: fixed;
      z-index: 9;
      max-width: 240px;
      padding: 6px 9px;
      border-radius: 6px;
      background: var(--tabdeck-tooltip-background, rgba(40, 44, 52, 0.95));
      color: var(--tabdeck-tooltip-color, #fff);
      font-size: 12px;
      line-height: 1.35;
      white-space: pre-line;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      transform: translateX(-50%);
    }
    .tip-above {
      transform: translate(-50%, -100%);
    }
    .tip-right {
      transform: translateY(-50%);
    }
    .tip-left {
      transform: translate(-100%, -50%);
    }
    /* bar_autohide: slide out past the pinned edge (HA's header for a top bar). */
    :host([autohide]) {
      transition: transform 200ms ease;
    }
    :host([autohidden]) {
      transform: translateY(calc(-100% - var(--tabdeck-sticky-top, var(--header-height, 0px))));
      pointer-events: none;
    }
    :host([autohidden][autohide-down]) {
      transform: translateY(calc(100% + 8px));
    }
    @media (prefers-reduced-motion: reduce) {
      :host([autohide]) {
        transition: none;
      }
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
      inset-inline-start: 0;
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
      border-start-end-radius: 12px;
      border-end-end-radius: 12px;
    }
    :host([rail-expand][expanded][rtl]) .bar-wrap {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
    }
    :host([rail-expand][expanded]) .bar {
      align-items: stretch;
    }
    :host([rail-expand][expanded]) tabdeck-tab {
      justify-content: flex-start;
      padding-inline-end: 20px;
    }
    /* A right-hand rail grows leftwards. */
    :host([rail-expand]) .bar-wrap:has(.bar.right) {
      inset-inline-start: auto;
      inset-inline-end: 0;
    }
    :host([rail-expand][expanded]) .bar-wrap:has(.bar.right) {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
      border-radius: 0;
      border-start-start-radius: 12px;
      border-end-start-radius: 12px;
    }
    :host([rail-expand][expanded][rtl]) .bar-wrap:has(.bar.right) {
      box-shadow: 4px 0 14px rgba(0, 0, 0, 0.25);
    }
    /* separator: a thin line, or a space that pushes later tabs to the end. */
    .sep {
      flex: none;
      align-self: center;
    }
    .sep-line {
      width: 1px;
      height: 60%;
      min-height: 16px;
      margin: 0 4px;
      background: var(--tabdeck-separator-color, var(--divider-color, rgba(127, 127, 127, 0.4)));
    }
    .bar.left .sep-line,
    .bar.right .sep-line {
      width: 60%;
      height: 1px;
      min-height: 0;
      margin: 4px auto;
    }
    .sep-space {
      flex: 1 1 0;
      min-width: 12px;
      min-height: 12px;
      align-self: stretch;
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
      text-align: start;
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
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      display: inline-flex;
      align-items: center;
    }
    .search-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .last-btn {
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      max-width: 88px;
      color: var(--tabdeck-accent, var(--primary-color));
    }
    .last-name {
      font-size: 11px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(320px, 100%);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 6px;
      box-sizing: border-box;
    }
    .share-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(260px, 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 10px;
      box-sizing: border-box;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      color: var(--primary-text-color);
    }
    :host([dock]) .share-panel {
      top: auto;
      bottom: 100%;
    }
    .share-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .share-status.ok {
      color: var(--success-color, #2e7d32);
      background: color-mix(in srgb, var(--success-color, #2e7d32) 14%, transparent);
    }
    .share-status svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    .share-url {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      font: inherit;
      font-size: 12px;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, transparent);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
    }
    .share-qr {
      width: 168px;
      height: 168px;
      border-radius: 6px;
    }
    .share-caption {
      font-size: 12px;
      color: var(--secondary-text-color);
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
      inset-inline-end: 0;
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
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
    }
    .overflow-menu {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
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
      text-align: start;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .summary-chip {
      flex-shrink: 0;
      align-self: center;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin: 0 6px;
      padding: 3px 10px 3px 8px;
      border: none;
      border-radius: 999px;
      background: var(--tabdeck-summary-background, var(--tabdeck-alert-color, var(--error-color, #db4437)));
      color: var(--tabdeck-summary-color, #fff);
      font: inherit;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
    }
    .summary-chip ha-icon {
      --mdc-icon-size: 16px;
    }
    .ov-count,
    .ov-badge {
      display: inline-block;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      box-sizing: border-box;
      border-radius: 8px;
      background: var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)));
      color: var(--tabdeck-badge-color, var(--text-primary-color, #fff));
      font-size: 10px;
      line-height: 16px;
      text-align: center;
      vertical-align: top;
    }
    .ov-count,
    .ov-badge.alert {
      background: var(--tabdeck-alert-color, var(--error-color, #db4437));
      color: #fff;
    }
    .ov-count {
      margin-inline-start: 2px;
    }
    .ov-badge {
      float: inline-end;
      margin-inline-start: 12px;
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
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      border-radius: var(--tabdeck-bar-radius, 0);
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
      border-inline-end: 1px solid var(--divider-color);
    }
    .bar.right {
      border-inline-start: 1px solid var(--divider-color);
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
      border-radius: var(--tabdeck-bar-radius, 10px);
      padding: 4px;
    }
    /* boxed: each tab is its own bordered chip; selected gets a tinted fill. */
    .bar.style-boxed {
      gap: 8px;
      border: none;
      padding: 4px 0;
    }
    .bar.style-boxed tabdeck-tab {
      border: var(--tabdeck-tab-border, 1px solid var(--divider-color));
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
    /* glass: a frosted, translucent bar (and its menus) over whatever is
       behind the card. A bar_background becomes the tint. */
    :host([glass]) .bar {
      background: var(--tabdeck-glass-tint, color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent));
      backdrop-filter: var(--tabdeck-bar-backdrop, blur(var(--tabdeck-glass-blur, 14px)) saturate(160%));
      -webkit-backdrop-filter: var(--tabdeck-bar-backdrop, blur(var(--tabdeck-glass-blur, 14px)) saturate(160%));
      border: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
      border-radius: var(--tabdeck-bar-radius, var(--tabdeck-glass-radius, 16px));
      box-shadow: var(--tabdeck-glass-shadow, 0 4px 18px rgba(0, 0, 0, 0.12));
    }
    :host([glass]) .overflow-menu,
    :host([glass]) .group-menu,
    :host([glass]) .search-panel,
    :host([glass]) .custom-panel,
    :host([glass]) .share-panel,
    :host([glass]) .tip {
      background: var(--tabdeck-glass-tint, color-mix(in srgb, var(--card-background-color, #fff) 70%, transparent));
      backdrop-filter: blur(var(--tabdeck-glass-blur, 14px)) saturate(160%);
      -webkit-backdrop-filter: blur(var(--tabdeck-glass-blur, 14px)) saturate(160%);
      border: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
      color: var(--primary-text-color);
    }
    /* A glass dock floats above the page instead of a solid strip. */
    :host([glass][dock]) {
      background: transparent;
      box-shadow: none;
      padding: 0 8px calc(8px + env(safe-area-inset-bottom, 0px));
    }
    :host([glass][dock]) .bar {
      border-top: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
    }
    :host([glass][rail-expand]) .bar-wrap {
      background: transparent;
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
      box-shadow: var(--tabdeck-indicator-shadow, none);
    }
    :host([density="compact"]) {
      --tabdeck-density-height: 36px;
      --tabdeck-density-padding: 0 10px;
      --tabdeck-density-font-size: 13px;
    }
    :host([density="comfortable"]) {
      --tabdeck-density-height: 56px;
      --tabdeck-density-padding: 0 20px;
      --tabdeck-density-font-size: 15px;
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
    /* drag_reorder: the lifted tab follows the pointer; a line marks the drop. */
    tabdeck-tab.dragging {
      z-index: 3;
      cursor: grabbing;
      background: var(--card-background-color, #fff);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }
    tabdeck-tab[data-drop="before"] {
      box-shadow: inset 3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    tabdeck-tab[data-drop="after"] {
      box-shadow: inset -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    :host([rtl]) tabdeck-tab[data-drop="before"] {
      box-shadow: inset -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    :host([rtl]) tabdeck-tab[data-drop="after"] {
      box-shadow: inset 3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left tabdeck-tab[data-drop="before"],
    .bar.right tabdeck-tab[data-drop="before"] {
      box-shadow: inset 0 3px 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left tabdeck-tab[data-drop="after"],
    .bar.right tabdeck-tab[data-drop="after"] {
      box-shadow: inset 0 -3px 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-underline .indicator {
      background: var(--tabdeck-indicator-color, var(--tabdeck-accent, var(--primary-color)));
    }
    .bar.style-pill .indicator {
      background: var(
        --tabdeck-indicator-color,
        color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 18%, transparent)
      );
      border-radius: var(--tabdeck-indicator-radius, 999px);
    }
    .bar.style-segmented .indicator {
      background: var(--tabdeck-indicator-color, var(--card-background-color));
      border-radius: var(--tabdeck-indicator-radius, 7px);
    }
    .bar.style-boxed .indicator {
      background: var(
        --tabdeck-indicator-color,
        color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 20%, transparent)
      );
      border-radius: var(--tabdeck-indicator-radius, 10px);
    }
  `}};Ks([ut({attribute:!1})],ar.prototype,"items",void 0),Ks([ut({type:Number})],ar.prototype,"selected",void 0),Ks([ut()],ar.prototype,"position",void 0),Ks([ut()],ar.prototype,"tabStyle",void 0),Ks([ut()],ar.prototype,"display",void 0),Ks([ut()],ar.prototype,"align",void 0),Ks([ut()],ar.prototype,"badgeDisplay",void 0),Ks([ut()],ar.prototype,"scrollable",void 0),Ks([ut({type:Boolean})],ar.prototype,"animated",void 0),Ks([ut({type:Boolean})],ar.prototype,"accentIndicator",void 0),Ks([ut({type:Number})],ar.prototype,"indicatorSize",void 0),Ks([ut({type:Number})],ar.prototype,"indicatorRadius",void 0),Ks([ut({type:Boolean})],ar.prototype,"sticky",void 0),Ks([ut({type:Boolean})],ar.prototype,"elevation",void 0),Ks([ut({type:Boolean})],ar.prototype,"scrollButtons",void 0),Ks([ut({type:Boolean})],ar.prototype,"overflowMenu",void 0),Ks([ut({type:Boolean})],ar.prototype,"fade",void 0),Ks([ut({type:Number})],ar.prototype,"limit",void 0),Ks([_t()],ar.prototype,"_menuOpen",void 0),Ks([ut({type:Boolean})],ar.prototype,"hiddenAlerts",void 0),Ks([_t()],ar.prototype,"_hiddenCount",void 0),Ks([ut({attribute:!1})],ar.prototype,"summary",void 0),Ks([_t()],ar.prototype,"_groupOpen",void 0),Ks([ut({type:Boolean,reflect:!0})],ar.prototype,"collapsed",void 0),Ks([ut()],ar.prototype,"barLabel",void 0),Ks([ut()],ar.prototype,"language",void 0),Ks([ut()],ar.prototype,"barBackground",void 0),Ks([ut({attribute:!1})],ar.prototype,"rtl",void 0),Ks([ut({type:Boolean})],ar.prototype,"liquid",void 0),Ks([ut()],ar.prototype,"barText",void 0),Ks([_t()],ar.prototype,"_picRgb",void 0),Ks([ut({attribute:!1})],ar.prototype,"glass",void 0),Ks([ut({reflect:!0})],ar.prototype,"density",void 0),Ks([ut({type:Boolean})],ar.prototype,"railExpand",void 0),Ks([_t()],ar.prototype,"_railOpen",void 0),Ks([ut({type:Boolean})],ar.prototype,"customizable",void 0),Ks([ut({attribute:!1})],ar.prototype,"customItems",void 0),Ks([_t()],ar.prototype,"_customOpen",void 0),Ks([ut({type:Boolean})],ar.prototype,"searchable",void 0),Ks([ut({type:Boolean})],ar.prototype,"expandable",void 0),Ks([ut({type:Boolean})],ar.prototype,"overviewable",void 0),Ks([ut({type:Boolean})],ar.prototype,"entitySearchable",void 0),Ks([ut({attribute:!1})],ar.prototype,"lastTab",void 0),Ks([ut({type:Boolean})],ar.prototype,"shareable",void 0),Ks([ut({attribute:!1})],ar.prototype,"shareInfo",void 0),Ks([ut({type:Boolean})],ar.prototype,"reorderable",void 0),Ks([_t()],ar.prototype,"_dropAt",void 0),Ks([_t()],ar.prototype,"_searchOpen",void 0),Ks([_t()],ar.prototype,"_query",void 0),Ks([_t()],ar.prototype,"_active",void 0),Ks([ut({type:Boolean,reflect:!0})],ar.prototype,"dock",void 0),Ks([ut({type:Boolean,reflect:!0})],ar.prototype,"autohide",void 0),Ks([ut({type:Boolean})],ar.prototype,"autohidden",void 0),Ks([_t()],ar.prototype,"_ready",void 0),Ks([_t()],ar.prototype,"_overflow",void 0),Ks([_t()],ar.prototype,"_tip",void 0),ar=Ks([Us("tabdeck-tabbar")],ar);var cr=class extends at{constructor(...t){super(...t),this._cards=[],this._width=0,this._sizes=[]}setConfig(t){if(!Array.isArray(t?.cards)||0===t.cards.length)throw new Error("tabdeck-masonry-card: cards is required.");this._config=t,this._build()}async _build(){const t=await Ri();this._cards=this._config.cards.map(e=>{const i=t(e);return this._hass&&(i.hass=this._hass),i}),this._sizes=this._cards.map(()=>1),await this._measure()}async _measure(){const t=this._cards,e=await Promise.all(t.map(t=>this._sizeOf(t)));t===this._cards&&(this._sizes=e)}async _sizeOf(t){try{const e=t?.localName??"";"function"!=typeof t?.getCardSize&&e.includes("-")&&await Promise.race([customElements.whenDefined(e),new Promise(t=>setTimeout(t,2e3))]);const i="function"==typeof t?.getCardSize?await t.getCardSize():1;return"number"==typeof i&&i>0?i:1}catch{return 1}}set hass(t){const e=!this._hass;this._hass=t;for(const i of this._cards)i.hass=t;e&&this._cards.length&&this._measure()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._config?.min_column_width&&"undefined"!=typeof ResizeObserver&&(this._observer=new ResizeObserver(t=>this._setWidth(t[0]?.contentRect?.width??0)),this._observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0}_setWidth(t){const e=Math.round(t);e!==this._width&&(this._width=e)}get _columnCount(){const t=this._config;return t?t.min_column_width?this._width<=0?1:Math.max(1,Math.min(this._cards.length||1,Math.floor(this._width/t.min_column_width))):Math.max(1,Math.round(t.columns??2)):1}_size(t){return this._sizes[t]??1}getCardSize(){const t=Pt(this._cards.map((t,e)=>this._size(e)),this._columnCount);return Math.max(1,...t.map(t=>t.reduce((t,e)=>t+this._size(e),0)))}render(){if(0===this._cards.length)return V;const t=this._columnCount,e=Pt(this._cards.map((t,e)=>this._size(e)),t);return U`
      <div class="masonry" style="--tabdeck-masonry-columns:${t}">
        ${e.map(t=>U`<div class="column">${t.map(t=>this._cards[t])}</div>`)}
      </div>
    `}static{this.styles=o`
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
  `}};Ks([_t()],cr.prototype,"_cards",void 0),Ks([_t()],cr.prototype,"_width",void 0),Ks([_t()],cr.prototype,"_sizes",void 0),cr=Ks([Us("tabdeck-masonry-card")],cr);var dr,lr=class extends at{constructor(...t){super(...t),this._sections=[],this._width=0,this._sized=0}setConfig(t){if(!Array.isArray(t?.sections)||0===t.sections.length)throw new Error("tabdeck-sections-card: sections is required.");this._config={max_columns:Math.max(1,Number(t.max_columns)||4),sections:t.sections},this._build()}async _build(){const t=await Ri(),e=e=>{const i=t(e);return this._hass&&(i.hass=this._hass),i};this._sections=this._config.sections.map(t=>({span:Math.max(1,Math.round(Number(t?.column_span)||1)),heading:t?.title?e({type:"heading",heading:t.title,...t.icon?{icon:t.icon}:{},heading_style:"title",...Array.isArray(t.badges)?{badges:t.badges}:{}}):void 0,cards:(Array.isArray(t?.cards)?t.cards:[]).map(t=>({el:e(t),config:t}))}));const i=new Set(this._sections.flatMap(t=>t.cards.map(t=>t.el?.localName??"")).filter(t=>t.includes("-")));await Promise.race([Promise.all([...i].map(t=>customElements.whenDefined(t))),new Promise(t=>setTimeout(t,2e3))]),this._sized++}set hass(t){this._hass=t;for(const e of this._sections){e.heading&&(e.heading.hass=t);for(const i of e.cards)i.el&&(i.el.hass=t)}}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),"undefined"!=typeof ResizeObserver&&(this._observer=new ResizeObserver(t=>this._setWidth(t[0]?.contentRect?.width??0)),this._observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0}_setWidth(t){const e=Math.round(t);e!==this._width&&(this._width=e)}_cardColumns(t){let e;try{e="function"==typeof t.el?.getGridOptions?t.el.getGridOptions():void 0}catch{e=void 0}return function(t,e){const i=t=>{if("full"===t)return 12;const e=Number(t);return Number.isFinite(e)&&e>0?Math.min(12,Math.round(e)):void 0},s=Number(t?.layout_options?.grid_columns);return i(t?.grid_options?.columns)??(Number.isFinite(s)&&s>0?Math.min(12,Math.round(3*s)):void 0)??i(e?.columns)??12}(t.config,e)}getCardSize(){return Math.max(1,...this._sections.map(t=>2*t.cards.length+(t.heading?1:0)))}render(){if(!this._config||0===this._sections.length)return V;const t=function(t,e,i=320,s=16){return t>0?Math.max(1,Math.min(e,Math.floor((t+s)/(i+s)))):1}(this._width,this._config.max_columns);return U`
      <div class="sections" style="--tabdeck-section-columns:${t}">
        ${this._sections.map(e=>U`
            <div class="section" style="grid-column:span ${Math.min(e.span,t)}">
              ${e.heading??V}
              <div class="cards">
                ${e.cards.map(t=>U`<div class="cell" style="grid-column:span ${this._cardColumns(t)}">${t.el}</div>`)}
              </div>
            </div>
          `)}
      </div>
    `}static{this.styles=o`
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
  `}};Ks([_t()],lr.prototype,"_sections",void 0),Ks([_t()],lr.prototype,"_width",void 0),Ks([_t()],lr.prototype,"_sized",void 0),lr=Ks([Us("tabdeck-sections-card")],lr);var hr=class extends at{static{dr=this}constructor(...t){super(...t),this._started=!1}setConfig(t){const e=ie(t?.view);if(!e)throw new Error("tabdeck-view-card: view is required (/dashboard/view).");this._ref=e,this._started=!1,this._card=void 0,this._error=void 0,this._maybeLoad()}set hass(t){this._hass=t,this._card&&(this._card.hass=t),this._maybeLoad()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._maybeLoad()}_insideSameView(){const t=this._key();let e=this.parentNode??this.getRootNode().host??null;for(;e;){if(e instanceof dr&&e._key()===t)return!0;e=e.parentNode??e.host??null}if("undefined"==typeof location)return!1;const[i,s]=location.pathname.replace(/^\/+/,"").split("/");return i===this._ref.dashboard&&(s??"")===this._ref.view}_key(){return`${this._ref?.dashboard}/${this._ref?.view}`}_maybeLoad(){!this._started&&this._ref&&this._hass&&this.isConnected&&(this._started=!0,this._insideSameView()?this._error="loop":this._load(this._ref))}async _load(t){let e;try{e=await oe(this._hass,t.dashboard)}catch{return void(t===this._ref&&(this._error="missing_dashboard"))}if(t!==this._ref)return;if(e?.strategy)return void(this._error="generated");const i=se(e,t.view);if(!i)return void(this._error="missing_view");const{card:s,error:r}=function(t){if(t?.strategy)return{error:"generated"};const e=Array.isArray(t?.sections)?t.sections.filter(t=>Array.isArray(t?.cards)&&t.cards.length):[];if(e.length){const i=Number(t.max_columns);return{card:{type:"custom:tabdeck-sections-card",max_columns:i>=1?Math.round(i):4,sections:e}}}const i=Array.isArray(t?.cards)?t.cards:[];return i.length?"panel"===t.type?{card:i[0]}:{card:{type:"custom:tabdeck-masonry-card",min_column_width:320,cards:i}}:{error:"empty"}}(i);if(r||!s)return void(this._error=r??"empty");const o=await Ri();if(t!==this._ref)return;const n=o(s);this._hass&&(n.hass=this._hass),this._card=n}getCardSize(){return"function"==typeof this._card?.getCardSize?this._card.getCardSize():3}render(){if(this._card)return this._card;if(!this._error)return V;const t=Yi(this._hass);return U`<div class="msg" role="note">
      <ha-icon icon="mdi:view-dashboard-outline"></ha-icon>
      <span>${Qi(t,`card.view_${this._error}`,{dashboard:this._ref.dashboard,view:this._ref.view||"1"})}</span>
    </div>`}static{this.styles=o`
    :host {
      display: block;
    }
    .msg {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px;
      color: var(--secondary-text-color);
      border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: var(--ha-card-border-radius, 12px);
    }
  `}};Ks([_t()],hr.prototype,"_card",void 0),Ks([_t()],hr.prototype,"_error",void 0),hr=dr=Ks([Us("tabdeck-view-card")],hr);var pr="__tabdeckRegistry";var ur,_r=class extends EventTarget{constructor(t){super(),this[pr]=1,this._decks=/* @__PURE__ */new Set,this.version=t}_register(t){return this._decks.has(t)||(this._decks.add(t),this._emit("added",{id:t.deckId})),()=>{this._decks.delete(t)&&this._emit("removed",{id:t.deckId})}}_changed(t,e,i,s){this._decks.has(t)&&this._emit("tab-changed",{id:t.deckId,index:e,name:i,previous:s})}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e}))}_info(t){const e=t.names(),i=t.current();return{id:t.deckId,tab:i.name,index:i.index,tabs:e.length,names:e}}list(){return[...this._decks].filter(t=>t.element.isConnected).map(t=>this._info(t))}get(t){const e=[...this._decks].filter(e=>e.element.isConnected&&(void 0===t||e.deckId===t)),i=e.find(t=>function(t){const e=t.checkVisibility;return t.isConnected&&("function"!=typeof e||e.call(t))}(t.element))??e[0];if(!i)return;const s=this._info(i),r=t=>i.select(t);return{...s,element:i.element,select:r,next:()=>r("next"),previous:()=>r("previous"),back:()=>r("back"),default:()=>r("default")}}select(t,e){return this.get(t)?.select(e)??!1}on(t,e){const i=t=>e(t.detail);return this.addEventListener(t,i),()=>this.removeEventListener(t,i)}};function br(t,e=("undefined"!=typeof window?window:void 0)){const i=e?.tabdeck;if(i&&i[pr])return i;if(e&&void 0===i){const i=new _r(t);return Object.defineProperty(e,"tabdeck",{value:i,configurable:!0,enumerable:!1,writable:!1}),i}return ur??=new _r(t)}var fr,mr="tabdeck-companion-id";function gr(t){return function(t,e){let i=0,s=t.length;for(;i<s&&t[i]===e;)i++;for(;s>i&&t[s-1]===e;)s--;return t.slice(i,s)}(String(t??"").trim().replace(/[^A-Za-z0-9_.-]+/g,"_"),"_").slice(0,64)||void 0}function vr(t,e=tr()){const i=gr(t)??gr(e);if(i)return i;try{const t=gr(localStorage.getItem(mr));if(t)return t;const e=yr();return localStorage.setItem(mr,e),e}catch{return fr??=yr()}}function yr(){const t=/* @__PURE__ */new Uint8Array(4);if("undefined"!=typeof crypto&&crypto.getRandomValues)crypto.getRandomValues(t);else for(let e=0;e<t.length;e++)t[e]=Math.floor(256*Math.random());return"browser_"+[...t].map(t=>t.toString(16).padStart(2,"0")).join("")}function xr(t){if("string"!=typeof t)return;const e=function(t,e){let i=0,s=t.length;for(;i<s&&t[i]===e;)i++;for(;s>i&&t[s-1]===e;)s--;return t.slice(i,s)}(t.trim(),"/").split("/").map(t=>t.trim());return e.length<2||e.length>3||e.some(t=>!t)?void 0:2===e.length?{dashboard:e[0],tab:e[1]}:{dashboard:e[0],view:e[1],tab:e[2]}}var kr=t=>t.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function wr(t,e,i=0){if(t&&"object"==typeof t&&!(i>30))if(Array.isArray(t))for(const s of t)wr(s,e,i+1);else{"custom:tabdeck-card"===t.type&&Array.isArray(t.tabs)&&e.push(t);for(const s of Object.values(t))s&&"object"==typeof s&&wr(s,e,i+1)}}function $r(t,e){for(const i of t)i&&"object"==typeof i&&(e.push(i),Array.isArray(i.children)&&$r(i.children,e))}function Sr(t,e,i=0){if(t&&"object"==typeof t&&!(i>30))if(Array.isArray(t))for(const s of t)Sr(s,e,i+1);else{"string"==typeof t.tab_ref&&i>0&&e.push(t.tab_ref);for(const s of Object.values(t))s&&"object"==typeof s&&Sr(s,e,i+1)}}async function Tr(t,e,i=[]){const s=xr(t);if(!s)return{error:"bad_ref"};const r=(t=>`${t.dashboard}/${t.view??"*"}/${kr(t.tab)}`.toLowerCase())(s);if(i.includes(r)||i.length>=5)return{error:"loop"};let o;try{o=await e(s.dashboard)}catch{return{error:"missing_dashboard"}}const n=function(t,e){const i=void 0!==e.view?[se(t,e.view)].filter(Boolean):Array.isArray(t?.views)?t.views:[],s=[];for(const o of i){const t=[];wr(o,t);for(const e of t){const t=[];$r(e.tabs,t);for(const i of t)s.push({tab:i,deck:e})}}const r=t=>"string"==typeof t.tab.name?t.tab.name:"";return s.find(t=>r(t)===e.tab)??s.find(t=>r(t).toLowerCase()===e.tab.toLowerCase())??s.find(t=>r(t)&&kr(r(t))===kr(e.tab))}(o,s);if(!n)return{error:"missing_tab"};const a=[...i,r];let c=ui(n.tab,Ar(n.deck.tab_templates),Ar(n.deck.tab_defaults));if("string"==typeof c.tab_ref){const t=await Tr(c.tab_ref,e,a);if(t.error)return t;const{tab_ref:i,...s}=c;c={...t.tab,...s}}const d=[];Sr(c,d);for(const p of d){const t=await Tr(p,e,a);if("loop"===t.error)return t}const{tab_ref:l,...h}=c;return{tab:h}}function Ar(t){return t&&"object"==typeof t&&!Array.isArray(t)?t:void 0}var Cr=t=>t.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[t]));var Er="1.6.0",zr=["pointerdown","keydown","touchstart","wheel"],Or=["name","subtitle","icon","color","accent","background","page_background","icon_animation","picture","tooltip"],Mr=/* @__PURE__ */new Set,Lr=!1;function Pr(t){if(!function(t){return!("k"!==t.key&&"K"!==t.key||!t.ctrlKey&&!t.metaKey||t.altKey||t.shiftKey)}(t)||t.defaultPrevented)return;const e=[...Mr].filter(t=>t.isConnected),i=e.find(t=>"function"!=typeof t.checkVisibility||t.checkVisibility())??e[0];i&&(t.preventDefault(),t.stopPropagation(),i.openEntitySearch())}var Nr=class extends at{constructor(...t){super(...t),this._language=new Zi(this),this._selected=0,this._built=!1,this._width=0,this._collapsed=!1,this._fullscreen=!1,this._cardKey="",this._genTabs=[],this._genKey="",this._entityWriteGuard=0,this._editModeFlag=!1,this._previewFlag=!1,this._portrait=!1,this._onOrientation=t=>{this._portrait=t.matches},this._registered=(()=>{const t=this;return{get deckId(){return t._deckId},element:t,names:()=>t._visibleTabs().map(e=>t._text(e.name)??""),current:()=>({index:t._selected,name:t._built?t.selectedTab:void 0}),select:e=>{if(!t._built)return!1;const i="string"==typeof e&&t._indexOf(e)<0?xs(e):void 0;if(!i)return t.selectTab(e);const s=t._stepTarget(i);return!(s<0||!t._isContentTab(t._visibleTabs()[s]))&&t.selectTab(s)}}})(),this._barHidden=!1,this._autoHide=qs,this._onPageScroll=()=>{this._config?.bar_autohide&&this._barPinned&&this._applyScroll("number"==typeof window.scrollY?window.scrollY:0)},this._fromPop=!1,this._onPopState=t=>{if(!this._config?.history||!this._built)return;const e=t.state?.tabdeck?.[this._cardKey];if("number"==typeof e&&e!==this._selected&&this._isContentTab(this._visibleTabs()[e]))if(this._isLocked(this._visibleTabs()[e]))this._pinFor={index:e,error:!1};else{this._fromPop=!0;try{this._collapsed=!1,this._selectIndex(e)}finally{this._fromPop=!1}}},this._onHotkey=t=>{const e=this._config;if(!e?.hotkeys||!this._built||t.ctrlKey||t.metaKey||t.altKey||t.defaultPrevented)return;const i=t.composedPath()[0];if((!i||!i.isContentEditable&&!/^(INPUT|TEXTAREA|SELECT)$/.test(i.tagName??""))&&("function"!=typeof this.checkVisibility||this.checkVisibility()))if("/"===t.key&&e.search)t.preventDefault(),this.renderRoot.querySelector("tabdeck-tabbar")?.openSearch?.();else if("l"===t.key&&e.last_tab_button)this.selectLast()&&t.preventDefault();else if("o"===t.key&&e.overview)t.preventDefault(),this._overview?this.closeOverview():this.openOverview();else if(/^[1-9]$/.test(t.key))this.selectTab(Number(t.key)-1)&&t.preventDefault();else if("["===t.key||"]"===t.key){const i=this._stepContent(this._selected,"]"===t.key?1:-1,e.swipe_wrap);i!==this._selected&&this._userSelect(i)}},this._lastInteraction=Date.now(),this._lastRotate=Date.now(),this._rotatePausedUntil=0,this._onInteraction=()=>this._noteInteraction(Date.now()),this._lastActivity=Date.now(),this._dimmed=!1,this._onPageActivity=t=>{this._config?.idle_dim&&(this._dimmed?"keydown"===t.type&&this._wake(t):this._lastActivity=Date.now())},this._wake=t=>{t.preventDefault(),t.stopPropagation(),this._lastActivity=Date.now(),this._dimmed=!1},this._pointerHeld=!1,this._onCardPointerDown=()=>{this._pointerHeld=!0},this._onPointerRelease=()=>{this._pointerHeld&&(this._pointerHeld=!1,this._flushPendingSoon())},this._onFocusOut=()=>this._flushPendingSoon(),this._graphs=new Tt(()=>this.requestUpdate()),this._graphsOn=!1,this._syncCountdown=()=>{const t=Date.now(),e=this.isConnected&&"hidden"!==document.visibilityState&&this._barTabs().some(e=>e.countdown&&Hs(this._hass?.states?.[e.countdown],t)?.ticking);e&&!this._countdownTimer?this._countdownTimer=setInterval(()=>{this.requestUpdate(),this._syncCountdown()},1e3):!e&&this._countdownTimer&&(clearInterval(this._countdownTimer),this._countdownTimer=void 0)},this._autoSigs=[],this._alertOrder=/* @__PURE__ */new Set,this._takeoverStates=/* @__PURE__ */new Map,this._takeoverMove=!1,this._offline=!1,this._onConnDown=()=>{this._offline||this._offlineTimer||(this._offlineTimer=setTimeout(()=>{this._offlineTimer=void 0,this._offline=!0,this.toggleAttribute("offline",!0)},2e3))},this._onConnUp=()=>{this._offlineTimer&&clearTimeout(this._offlineTimer),this._offlineTimer=void 0,this._offline&&(this._offline=!1),this.toggleAttribute("offline",!1)},this._wakeLock=new _s,this._syncWakeLock=()=>{const t=this._built?this._visibleTabs()[this._selected]:void 0;this._wakeLock.set(this.isConnected&&!this._editing&&"hidden"!==document.visibilityState&&!!t?.keep_awake)},this._companionMissing=!1,this._companionSent="",this._companionIndex=[],this._onCompanionReady=()=>{this._companionSent="",this._sendCompanion()},this._refToken=0,this._refLoading=0,this._applyingRefs=!1,this._usageMeter=new vt,this._usageWarned=!1,this._syncUsage=()=>{const t=this._config?.usage_stats,e=Date.now(),i="undefined"==typeof document||"hidden"!==document.visibilityState,s=!!t&&this._built&&this.isConnected&&i&&!this._editing,r=this._built?this._visibleTabs()[this._selected]:void 0;this._usageMeter.switchTo(r?this._text(r.name):void 0,e),this._usageMeter.setRunning(s,e);const o=!!t&&this.isConnected;o&&!this._usageTimer?(this._usageTimer=setInterval(()=>this._flushUsage(),6e4*t),document.addEventListener("visibilitychange",this._syncUsage),window.addEventListener("pagehide",this._flushUsageNow)):!o&&this._usageTimer&&(clearInterval(this._usageTimer),this._usageTimer=void 0,document.removeEventListener("visibilitychange",this._syncUsage),window.removeEventListener("pagehide",this._flushUsageNow),this._flushUsage())},this._flushUsageNow=()=>this._flushUsage(),this._cancelPin=()=>{this._pinFor=void 0},this._templateResolver=t=>this._templates?.boolean(t),this._usage={},this._usageOrder={},this._layout={order:[],hidden:[]},this._notifications={},this._spyObserved=[],this._spyInView=/* @__PURE__ */new Set,this._spySuppressUntil=0,this._spyDriven=!1,this._seen={},this._seenSaved=0,this._watchCache=/* @__PURE__ */new WeakMap,this._onShare=async()=>{const t=this._config?.share_button;if(!t)return;if(this._share)return void(this._share=void 0);const e=this._visibleTabs()[this._selected],i=function(t,e,i){const s=e?Gt(e):"";return`${t.origin}${t.pathname}${t.search}#tab=${s||i}`}(location,e?.name,this._selected),s=await async function(t,e={clipboard:"undefined"!=typeof navigator?navigator.clipboard:void 0,secure:"undefined"!=typeof window&&window.isSecureContext}){if(e.secure&&e.clipboard?.writeText)try{return await e.clipboard.writeText(t),!0}catch{}const i=document.createElement("textarea");i.value=t,i.setAttribute("readonly",""),i.style.cssText="position:fixed;top:0;left:-9999px;opacity:0",document.body.appendChild(i),i.select();let s=!1;try{s=document.execCommand("copy")}catch{s=!1}return i.remove(),s}(i);let r={};if("qr"===t)try{const t=Pi(i,"M");r={qrPath:Ii(t,4),qrSize:t.size+8}}catch{}this._share={url:i,copied:s,...r}},this._previewIndex=-1,this._endPreview=()=>{window.removeEventListener("pointerup",this._endPreview,!0),window.removeEventListener("pointercancel",this._endPreview,!0),window.removeEventListener("blur",this._endPreview),-1!==this._previewIndex&&(this._previewIndex=-1)},this._groupChild=/* @__PURE__ */new WeakMap,this._onNestedChanged=t=>{const e=t.detail;if(!e||e.deck===this)return;this._config?.breadcrumbs&&this.requestUpdate();const i=this._allTabs().find(t=>this._manager?.get(this._allTabs().indexOf(t))===e.deck);"menu"===i?.group?.display&&e.name&&(this._groupChild.set(i,e.name),this.requestUpdate())},this._hourly={},this._dismissLearned=()=>{this._learnedNotice=void 0;try{localStorage.setItem(`tabdeck-learned-notice:${this._cardKey}`,"off")}catch{}},this._seenAt=/* @__PURE__ */new Map,this._builtAt=Date.now(),this._refreshedAt=/* @__PURE__ */new Map,this._toggleFullscreen=()=>{this._fullscreen=!this._fullscreen,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))},this._onFullscreenKey=t=>{"Escape"===t.key&&this._share?this._share=void 0:"Escape"===t.key&&this._compareShown()>=0?this.closeCompare():"Escape"===t.key&&this._popupTab?this.closePopup():"Escape"===t.key&&this._overview?this.closeOverview():"Escape"===t.key&&this._fullscreen&&(this._fullscreen=!1,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex())))},this._overview=!1,this._toggleOverview=()=>{this._overview?this.closeOverview():this.openOverview()},this._onPopupEvent=t=>{if(!this._config?.popup||!this._built||t.__tabdeckPopup)return;const e=function(t){const e=t?.tabdeck_popup;if("string"==typeof e||"number"==typeof e){const t=String(e).trim();return t?{tab:t}:void 0}if(e&&"object"==typeof e&&("string"==typeof e.tab||"number"==typeof e.tab)){const t=String(e.tab).trim();if(!t)return;const i="string"==typeof e.deck&&e.deck.trim()?e.deck.trim():void 0;return i?{tab:t,deck:i}:{tab:t}}}(t.detail);!e||void 0!==e.deck&&e.deck!==this._deckId||(this.openPopup(e.tab)||"popup"===this._pinFor?.then)&&(t.__tabdeckPopup=!0)},this._fromSync=!1,this._esOpen=!1,this._esQuery="",this._esActive=0,this._closeEntitySearch=()=>{this._esOpen=!1},this._peekSettling=!1,this._onTouchMove=t=>{if(void 0!==this._pinchStart&&2===t.touches.length)return e=this._pinchStart,i=vs(t.touches[0],t.touches[1]),void(e>=40&&i<.7*e&&(this._pinchStart=void 0,this.openOverview()));var e,i;const s=this._peek,r=t.touches[0];if(!s||!r||!this._config?.swipe_peek)return;const o=(r.clientX-s.x)*(this._rtl?-1:1),n=r.clientY-s.y;if(!s.axis){if(Math.abs(o)<10&&Math.abs(n)<10)return;s.axis=Math.abs(o)>Math.abs(n)?"x":"y"}"x"===s.axis&&this._peekMove(o)},this._eventWarned=!1,this._onTouchStart=t=>{if(this._pinchStart=this._config?.overview&&2===t.touches.length?vs(t.touches[0],t.touches[1]):void 0,!this._config?.swipe||1!==t.touches.length)return void(this._touchStart=void 0);const e=t.touches[0];this._swipeMayStart(t,e.clientX)?(this._touchStart={x:e.clientX,y:e.clientY,t:t.timeStamp},this._config.swipe_peek&&this._peekStart(e.clientX,e.clientY)):this._touchStart=void 0},this._onTouchEnd=t=>{const e=this._touchStart;if(this._touchStart=void 0,!e||!this._config?.swipe)return;if(this._config.swipe_peek)return this._peekEnd();const i=t.changedTouches[0];i&&this._applySwipe(e,{x:i.clientX,y:i.clientY,t:t.timeStamp})},this._onPointerDown=t=>{this._config?.swipe_mouse&&"touch"!==t.pointerType&&this._swipeMayStart(t,t.clientX)?this._touchStart={x:t.clientX,y:t.clientY,t:t.timeStamp}:this._touchStart=void 0},this._onPointerUp=t=>{const e=this._touchStart;this._touchStart=void 0,e&&this._config?.swipe_mouse&&"touch"!==t.pointerType&&this._applySwipe(e,{x:t.clientX,y:t.clientY,t:t.timeStamp})},this._wheelStep=function(){let t=0,e=-1/0,i=!1;return s=>{if(s.timeStamp-e>250&&(t=0,i=!1),e=s.timeStamp,i)return 0;const r=1===s.deltaMode?16:2===s.deltaMode?400:1,o=Math.abs(s.deltaY)>=Math.abs(s.deltaX)?s.deltaY:s.deltaX;if(t+=o*r,Math.abs(t)<40)return 0;const n=t>0?1:-1;return t=0,i=!0,n}}(),this._onBarWheel=t=>{const e=this._config;if(!e?.wheel_switch||t.ctrlKey||this._editing)return;const i=Math.abs(t.deltaY)>=Math.abs(t.deltaX)?t.deltaY:t.deltaX*(this._rtl?-1:1);if(!i)return;const s=this._stepContent(this._selected,i>0?1:-1,e.swipe_wrap);s!==this._selected&&(t.preventDefault(),0!==this._wheelStep(t)&&this._userSelect(s))},this._loadedCards=/* @__PURE__ */new WeakSet,this._errors=/* @__PURE__ */new Map,this._errorSig="",this._errorTimers=[],this._appliedStyleKeys=[],this._defaultReason="default_tab",this._startReason="",this._buildMs=0,this._renderStart=0,this._renderMs=0,this._drawMs=/* @__PURE__ */new Map,this._switchAt=0,this._picAccents=/* @__PURE__ */new Map,this._nextAlert=()=>{const t=this._visibleTabs();for(let e=1;e<=t.length;e++){const i=(this._selected+e)%t.length;if(this._isAlerting(t[i]))return void(i!==this._selected&&this._userSelect(i))}}}set editMode(t){this._setEditFlags(!!t,this._previewFlag)}get editMode(){return this._editModeFlag}set preview(t){this._setEditFlags(this._editModeFlag,!!t)}get preview(){return this._previewFlag}_setEditFlags(t,e){if(t===this._editModeFlag&&e===this._previewFlag)return;const i=this._config&&this._built?this._visibleTabs()[this._selected]?.name:void 0;this._editModeFlag=t,this._previewFlag=e,void 0!==i&&this._restoreSelection(i),this._scheduleErrorScan(),this._syncWakeLock(),this._syncUsage(),this.requestUpdate()}get _editing(){return(this._editModeFlag||this._previewFlag)&&!1!==this._config?.edit_mode_reveal}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await(import(new URL("./tabdeck-card-editor-B_yfV6Z_.js",import.meta.url).href)),document.createElement("tabdeck-card-editor")}setConfig(t){this._flushUsage(),this._applyingRefs||(this._refToken++,this._refRaw=function(t){return Array.isArray(t?.tabs)&&t.tabs.some(t=>t&&"object"==typeof t&&void 0!==t.tab_ref)}(t)?t:void 0,this._refKeep=void 0,this._refRaw&&(t=function(t){return{...t,tabs:t.tabs.map(t=>t&&"object"==typeof t&&void 0!==t.tab_ref?{name:xr(t.tab_ref)?.tab??String(t.tab_ref),icon:"mdi:link-variant",...t,card:{type:"vertical-stack",cards:[]}}:t)}}(t))),this._config=_i(t),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=mi(this._config),this._collapsed=this._config.start_collapsed,this._fullscreen=!1,this._overview=!1,this._pinchStart=void 0,this._esOpen=!1,this._popupTab=void 0,this._takeover=void 0,this._takeoverStates.clear(),this._syncTakeoverTimer(),this._syncSearchRegistry(),this._syncLinked(),this._seenAt.clear(),this._autoHide=qs,this._barHidden=!1,this._alertOrder=/* @__PURE__ */new Set,this._autoSigs=[],this._lastRemote=void 0,this._lastTab=void 0,this._pinFor=void 0,this._previewIndex=-1,this._pipTab=void 0,this._pendingAuto=void 0,this._unsubscribeRemote(),this._stopCompanion(),this._companionMissing=!1,this._stopClientSource(),this._clientItems=void 0,this._autoPrev=void 0,this._lastEntityValue=void 0,this._genTabs=[],this._genKey="",this._templates?.destroy(),this._templates=void 0,this._syncTimer(),this._syncUnloadTimer(),this._syncWidthObserver(),this._syncOrientation(),this._refreshedAt=/* @__PURE__ */new Map,this._drawMs.clear(),this._build(),this._syncTabRefs(),this._syncOffline()}_syncWidthObserver(){const t=!!(this._config?.split||this._config?.tab_display_narrow||this._config?.transition_narrow)&&this.isConnected&&"undefined"!=typeof ResizeObserver;t&&!this._widthObserver?(this._widthObserver=new ResizeObserver(t=>{const e=Math.round(t[0]?.contentRect?.width??0);e!==this._width&&(this._width=e)}),this._widthObserver.observe(this)):!t&&this._widthObserver&&(this._widthObserver.disconnect(),this._widthObserver=void 0)}_syncOrientation(){const t=!!this._config?.orientation_layout&&this.isConnected&&"function"==typeof window.matchMedia;t&&!this._orientationQuery?(this._orientationQuery=window.matchMedia("(orientation: portrait)"),this._portrait=this._orientationQuery.matches,this._orientationQuery.addEventListener("change",this._onOrientation)):!t&&this._orientationQuery&&(this._orientationQuery.removeEventListener("change",this._onOrientation),this._orientationQuery=void 0)}get _position(){return t=this._config.position,e=this._config.orientation_layout,i=this._portrait,e?i?e.portrait:e.landscape:t;var t,e,i}get _isSplit(){const t=this._config?.split;return!!t&&this._width>=t.min_width}get _isNarrow(){return this._width>0&&this._width<this._config.narrow_width}get _effectiveDisplay(){const t=this._config;return t.tab_display_narrow&&this._isNarrow?t.tab_display_narrow:t.tab_display}_renderSplit(t){const e=t.filter(t=>!oi(t));return U`
      <div class="split" style="--tabdeck-split-columns:${this._config.split.columns}">
        ${e.map(t=>{const e=this._text(t.icon);return U`
            <div class="split-col">
              <div class="split-title">
                ${e?U`<ha-icon .icon=${e}></ha-icon>`:V}
                <span>${this._text(t.name)??""}</span>
              </div>
              ${this._isLocked(t)?this._renderLocked(t):this._manager?.ensure(this._allTabs().indexOf(t))}
            </div>
          `})}
      </div>
    `}connectedCallback(){super.connectedCallback();for(const t of zr)this.addEventListener(t,this._onInteraction);this.addEventListener("pointerdown",this._onCardPointerDown),this.addEventListener("focusout",this._onFocusOut),window.addEventListener("pointerup",this._onPointerRelease,!0),window.addEventListener("pointercancel",this._onPointerRelease,!0),document.addEventListener("visibilitychange",this._syncCountdown),document.addEventListener("visibilitychange",this._syncWakeLock),this._syncCountdown(),this._syncWakeLock(),this._syncUsage(),this._syncTimer(),this._syncTakeoverTimer(),this._syncUnloadTimer(),this._syncRefreshTimer(),this._syncWidthObserver(),this._syncOrientation(),this._hass&&(this._syncTemplates(),this._syncRemoteEvent(),this._syncCompanion()),this._config?.scroll_spy&&this.updateComplete.then(()=>this._syncSpyObserver()),this._config?.dock&&this.updateComplete.then(()=>this._syncDock()),this.updateComplete.then(()=>{this._syncPanelWatch(),this._syncPageBackground()}),this._built&&this._scheduleErrorScan(),document.addEventListener("keydown",this._onHotkey),document.addEventListener("keydown",this._onFullscreenKey),window.addEventListener("popstate",this._onPopState),window.addEventListener("scroll",this._onPageScroll,{passive:!0});for(const t of zr)window.addEventListener(t,this._onPageActivity,{capture:!0,passive:"keydown"!==t});this._lastActivity=Date.now(),this._syncClientSource(),this._syncSearchRegistry(),this._syncLinked(),window.addEventListener("ll-custom",this._onPopupEvent),this._built&&this._schedulePreload(),this._unregister??=br(Er)._register(this._registered),this._syncOffline()}get _barPinned(){const t=this._config;return!!t&&(t.sticky||t.scroll_spy||t.dock&&!this._editing)}_applyScroll(t){this._autoHide=function(t,e,i=24){if(t.y<0)return{y:e,run:0,hidden:!1};const s=e-t.y;if(e<=64)return{y:e,run:0,hidden:!1};if(0===s)return t;const r=Math.sign(s)===Math.sign(t.run)?t.run+s:s;let o=t.hidden;return r>=i?o=!0:r<=-i&&(o=!1),{y:e,run:r,hidden:o}}(this._autoHide,t);const e=this._autoHide.hidden&&!this._editing;e!==this._barHidden&&(this._barHidden=e)}_historyState(t){const e=history.state&&"object"==typeof history.state?history.state:{};return{...e,tabdeck:{...e.tabdeck??{},[this._cardKey]:t}}}disconnectedCallback(){super.disconnectedCallback();for(const t of zr)this.removeEventListener(t,this._onInteraction);if(this.removeEventListener("pointerdown",this._onCardPointerDown),this.removeEventListener("focusout",this._onFocusOut),Mr.delete(this),this._syncUsage(),this._syncOffline(),this._unregister?.(),this._unregister=void 0,this._esOpen=!1,this._unlink?.(),this._unlink=void 0,window.removeEventListener("ll-custom",this._onPopupEvent),window.removeEventListener("pointerup",this._onPointerRelease,!0),window.removeEventListener("pointercancel",this._onPointerRelease,!0),document.removeEventListener("visibilitychange",this._syncCountdown),document.removeEventListener("visibilitychange",this._syncWakeLock),this._syncCountdown(),this._syncWakeLock(),this._syncUsage(),this._pendingTimer&&clearTimeout(this._pendingTimer),this._pendingTimer=void 0,this._pinTimer&&clearTimeout(this._pinTimer),this._pinTimer=void 0,this._pointerHeld=!1,document.removeEventListener("keydown",this._onHotkey),document.removeEventListener("keydown",this._onFullscreenKey),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("scroll",this._onPageScroll),void 0!==this._preloadHandle){const t=window;"function"==typeof t.cancelIdleCallback&&t.cancelIdleCallback(this._preloadHandle),clearTimeout(this._preloadHandle),this._preloadHandle=void 0}for(const t of zr)window.removeEventListener(t,this._onPageActivity,{capture:!0});this._dimmed=!1,this._endPreview(),this._stopClientSource(),this._built&&this._markSeen(this._visibleTabs()[this._selected],Date.now(),!0),this._stopTimer(),this._syncTakeoverTimer(),this._unloadTimer&&clearInterval(this._unloadTimer),this._unloadTimer=void 0,this._spyObserver?.disconnect(),this._spyObserver=void 0,this._spyObserved=[],this._widthObserver?.disconnect(),this._widthObserver=void 0,this._orientationQuery?.removeEventListener("change",this._onOrientation),this._orientationQuery=void 0,this._stopPanelWatch(),this._clearPageBackground(),this._errorTimers.forEach(clearTimeout),this._errorTimers=[],this._refreshTimer&&clearInterval(this._refreshTimer),this._refreshTimer=void 0,this._dockObserver?.disconnect(),this._dockObserver=void 0,this._templates?.destroy(),this._templates=void 0,this._stopCompanion(),this._unsubscribeRemote()}_noteInteraction(t){this._lastInteraction=t;const e=this._config?.auto_rotate?.resume_after??0;this._rotatePausedUntil=t+1e3*e}_syncTimer(){const t=!!(this._config?.auto_rotate||this._config?.idle_return||this._config?.idle_dim)&&this.isConnected;t&&!this._timer?(this._lastInteraction=this._lastRotate=Date.now(),this._timer=setInterval(()=>this._tick(Date.now()),1e3)):t||this._stopTimer()}_stopTimer(){this._timer&&clearInterval(this._timer),this._timer=void 0}_tick(t){const e=this._config;if(!e||!this._built)return;if(this._tickDim(t),this._editing)return void(this._lastInteraction=this._lastRotate=t);if(this._takeover)return void(this._lastInteraction=this._lastRotate=t);if(this._isQuiet())return void(this._lastRotate=t);const i=t-this._lastInteraction,s=e.auto_rotate;if(s){if(t<this._rotatePausedUntil)return void(this._lastRotate=t);if(t-this._lastRotate>=1e3*s.interval){this._lastRotate=t;const e=this._nextRotatable(this._selected);e===this._selected||this._isBusy()||this._selectIndex(e,!1)}}else if(e.idle_return&&i>=1e3*e.idle_return){const e=this._computeDefaultIndex();e===this._selected||this._autoLocked(e,"idle_return")||this._selectIndex(e,!1),this._lastInteraction=t}}_tickDim(t){const e=this._config;if(!e.idle_dim||this._editing)return this._dimmed&&(this._dimmed=!1),void(this._lastActivity=t);!this._dimmed&&function(t,e,i){return!!t&&e-i>=6e4*t.after}(e.idle_dim,t,this._lastActivity)?this._dimmed=!0:this._dimmed&&"clock"===e.idle_dim.mode&&this.requestUpdate()}_renderDim(){const t=this._config?.idle_dim;if(!this._dimmed||!t)return V;const e="clock"===t.mode?function(t,e,i){const s="12"===i||"24"!==i&&void 0,r=(t,e)=>{try{return t()}catch{return e}};return{time:r(()=>new Intl.DateTimeFormat(e,{hour:"numeric",minute:"2-digit",...void 0===s?{}:{hour12:s}}).format(t),t.toTimeString().slice(0,5)),date:r(()=>new Intl.DateTimeFormat(e,{weekday:"long",day:"numeric",month:"long"}).format(t),t.toDateString())}}(/* @__PURE__ */new Date,this._hass?.locale?.language??Yi(this._hass),(this._hass?.locale)?.time_format):void 0;return U`<div
      class="screensaver mode-${t.mode}"
      style=${"dim"===t.mode?`background:rgba(0,0,0,${t.opacity})`:""}
      role="button"
      tabindex="0"
      aria-label=${Qi(Yi(this._hass),"card.wake")}
      @pointerdown=${t=>t.stopPropagation()}
      @click=${this._wake}
    >
      ${e?U`<div class="saver-clock"><div class="saver-time">${e.time}</div><div class="saver-date">${e.date}</div></div>`:V}
    </div>`}_isBusy(){if(this._pointerHeld)return!0;let t=document.activeElement;for(;t?.shadowRoot?.activeElement;)t=t.shadowRoot.activeElement;if(!t||!this._containsDeep(t))return!1;const e=t.tagName;return!(!t.isContentEditable&&"TEXTAREA"!==e&&"SELECT"!==e)||"INPUT"===e&&!/^(checkbox|radio|button|submit|reset|range|color|file|image)$/i.test(t.type)}_containsDeep(t){let e=t;for(;e;){if(e===this)return!0;e=e.parentNode??e.host??null}return!1}_autoSwitch(t,e,i){const s=this._visibleTabs()[t];s&&!this._autoLocked(t,i)&&(this._isBusy()?this._pendingAuto={tab:s,persist:e}:(this._pendingAuto=void 0,this._selectIndex(t,e)))}_flushPendingSoon(){this._pendingAuto&&(this._pendingTimer&&clearTimeout(this._pendingTimer),this._pendingTimer=setTimeout(()=>this._flushPending(),400))}_flushPending(){this._pendingTimer=void 0;const t=this._pendingAuto;if(!t||this._isBusy())return;this._pendingAuto=void 0;const e=this._visibleTabs().indexOf(t.tab);e>=0&&e!==this._selected&&this._isContentTab(t.tab)&&!this._autoLocked(e,"a waiting switch")&&this._selectIndex(e,t.persist)}_nextRotatable(t,e=1){const i=this._visibleTabs();let s=t;for(let r=0;r<i.length;r++)if(s=this._stepContent(s,e,!0),s===t||!this._isLocked(i[s]))return s;return t}_computeCardKey(t){return t.storage_key?t.storage_key:`${"undefined"!=typeof location?location.pathname:""}#${t.tabs.map(t=>t.name??"").join("|")}`}async _build(){if(!this._config)return;const t=performance.now();this._layout=this._config.customize||this._config.drag_reorder?function(t){try{const e=JSON.parse(localStorage.getItem(is(t))??"null");if(!e||"object"!=typeof e)return es;const i=t=>Array.isArray(t)?t.filter(t=>"string"==typeof t):[];return{order:i(e.order),hidden:i(e.hidden)}}catch{return es}}(this._cardKey):{order:[],hidden:[]},this._usage=this._config.sort_by_usage?function(t){try{const e=JSON.parse(localStorage.getItem(bs(t))??"{}");if(!e||"object"!=typeof e||Array.isArray(e))return{};const i={};for(const[t,s]of Object.entries(e))"number"==typeof s&&s>0&&(i[t]=s);return i}catch{return{}}}(this._cardKey):{},this._usageOrder={...this._usage};const e=await Ri();this._manager=new ji(e),this._manager.addEventListener("ll-rebuild-done",()=>{this.requestUpdate(),this._scheduleErrorScan()}),await this._manager.build(this._cardConfigs(),{lazy:this._config.lazy}),this._hass&&this._manager.setHass(this._hass);const i=[...this._config.header_cards??[],...this._config.footer_cards??[]];i.length?(this._extras=new ji(e),this._extras.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._extras.build(i),this._hass&&this._extras.setHass(this._hass)):this._extras=void 0,this._builtAt=Date.now(),this._seen=this._config.changed_dot?function(t){try{const e=JSON.parse(localStorage.getItem(Ns(t))??"{}");return e&&"object"==typeof e&&!Array.isArray(e)?e:{}}catch{return{}}}(this._cardKey):{},this._watchCache=/* @__PURE__ */new WeakMap,this._syncTemplates(),this._selected=function(t){const{mode:e,cardKey:i,defaultIndex:s,tabCount:r}=t;if("entity"===e){const e=Number(t.entityValue);return void 0!==t.entityValue&&Number.isFinite(e)?Yt(Math.trunc(e),r,s):Yt(s,r,0)}if("url"===e){const e=Qt(t.hash??"",t.tabNames??[]);if(null!==e)return Yt(e,r,s)}if("browser"===e){const e=(t.storage??globalThis.localStorage)?.getItem(Xt(i));if(null!=e){if(e.startsWith("name:")){const i=(t.tabNames??[]).indexOf(e.slice(5));return i>=0?i:Yt(s,r,0)}return Yt(Number(e),r,s)}}return Yt(s,r,0)}({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:this._computeDefaultIndex(),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(t=>t.name??""),entityValue:this._config.remember_entity?this._hass?.states?.[this._config.remember_entity]?.state:void 0});let s=!1;if(this._config.share_button&&"url"!==this._config.remember&&"undefined"!=typeof location){const t=Qt(location.hash,this._visibleTabs().map(t=>t.name??""));null!==t&&t<this._visibleTabs().length&&(this._selected=t,s=!0)}const r=this._computeDefaultIndex();this._startReason=this._selected!==r&&"none"!==this._config.remember?`remembered (remember: ${this._config.remember})`:this._defaultReason,this._hourly=this._config.learned_default?function(t){try{const e=JSON.parse(localStorage.getItem(gs(t))??"{}");if(!e||"object"!=typeof e||Array.isArray(e))return{};const i={};for(const[t,s]of Object.entries(e)){if(!/^(1?\d|2[0-3])$/.test(t)||!s||"object"!=typeof s)continue;const e={};for(const[t,i]of Object.entries(s))"number"==typeof i&&i>0&&(e[t]=i);i[t]=e}return i}catch{return{}}}(this._cardKey):{},this._learnedNotice=void 0,!s&&this._applyLearned()&&(this._startReason="learned_default"),this._selected=this._unlockedStart(this._ensureContentTab(this._selected));const o=this._config.sync_group?(n=this._config.sync_group,Ft.get(n)):void 0;var n;const a=void 0!==o?this._syncTarget(o):-1;if(a>=0&&(this._selected=a,this._learnedNotice=void 0,this._startReason=`sync_group ${this._config.sync_group}`),this._config.history&&"undefined"!=typeof history&&history.replaceState(this._historyState(this._selected),"",location.href),void 0!==this._refKeep){const t=this._visibleTabs().findIndex(t=>t.name===this._refKeep);t>=0&&(this._selected=t),this._refKeep=void 0}this._lastEntityValue=this._rememberEntityState(),this._built=!0,this._syncGraphs(),this._syncCountdown(),this._syncWakeLock(),this._syncUsage(),this._schedulePreload(),this._baselineSeen(),this._markSeen(this._visibleTabs()[this._selected],Date.now(),!0),this._buildMs=performance.now()-t,this._refreshAlertOrder(),this._hass&&(this._syncRemoteEvent(),this._syncClientSource(),this._syncCompanion()),this._clientItems&&this._syncGeneratedTabs(),this._scheduleErrorScan(),this.requestUpdate()}set hass(t){this._hass=t,this._syncOffline(),this._syncTabRefs(),this._manager?.setHass(t),this._extras?.setHass(t),this._syncTemplates(),this._runAutoSelect(),this._syncRememberEntity(),this._syncAutoContent(),this._refreshAlertOrder(),this._syncRemoteEntity(),this._syncFollowRoom(),this._syncTakeover(),this._syncRemoteEvent(),this._syncClientSource(),this._syncCompanion(),this._syncGraphs(),this._syncCountdown(),this._built&&this._markSeen(this._visibleTabs()[this._selected],Date.now(),!1),this.requestUpdate()}_syncGraphs(){if(!this._hass)return;const t=this._barTabs().map(t=>$t(t.graph)).filter(t=>void 0!==t);(t.length||this._graphsOn)&&this._graphs.sync(this._hass,t),this._graphsOn=t.length>0}_barTabs(){const t=this._config;if(!t||!this._built||t.hide_bar||t.wizard||"dots"===this._effectiveDisplay||"hidden"===t.popup)return[];const e=this._visibleTabs(),[i,s]=le(e.length,this._selected,t.bar_limit??0);return e.slice(i,s)}_graphLine(t){const e=$t(t.graph),i=e&&this._graphs.points(e.entity);return i?function(t,e,i,s,r){if(!t.length)return;const o=e-3600*i;let n=0;for(let b=0;b<t.length;b++)t[b][0]<=o&&(n=b);const a=t.slice(n),c=a.map(t=>t[1]),d=Math.min(...c),l=Math.max(...c),h=t=>St(Math.max(0,t-o)/(e-o)*s),p=t=>St(l===d?r/2:r-1-(t-d)/(l-d)*(r-2)),u=[];for(const[b,f]of a){const t=h(b);u.length&&u[u.length-1][0]===t?u[u.length-1][1]=p(f):u.push([t,p(f)])}const _=[];return u.forEach(([t,e],i)=>{i>0&&_.push(`${t},${u[i-1][1]}`),_.push(`${t},${e}`)}),_.push(`${s},${u[u.length-1][1]}`),_.filter((t,e)=>t!==_[e-1]).join(" ")}(i,Date.now()/1e3,e.hours,44,12):void 0}_autoCard(t){if(!t.card?.type&&(t.area||t.floor||t.label))return function(t,e,i="No entities here.",s=2){if(!t.area&&!t.floor&&!t.label)return;const r=Object.keys(e?.entities??{}).filter(i=>{const s=e.entities[i];if(s.hidden||s.entity_category||!e.states?.[i])return!1;if(t.domains?.length&&!t.domains.includes(i.split(".")[0]))return!1;if(t.label)return Array.isArray(s.labels)&&s.labels.includes(t.label);const r=Qs(e,i);return t.area?r===t.area:!!r&&e.areas?.[r]?.floor_id===t.floor}).sort();return r.length?{type:"grid",columns:s,square:!1,cards:r.map(t=>({type:"tile",entity:t}))}:{type:"markdown",content:i}}(t,this._hass,Qi(Yi(this._hass),"card.no_entities"))}_syncAutoContent(){this._manager&&this._built&&this._allTabs().forEach((t,e)=>{const i=this._autoCard(t);if(!i)return;const s=JSON.stringify(i);s!==this._autoSigs[e]&&(this._autoSigs[e]=s,this._manager.replace(e,i))})}_refreshAlertOrder(){if(!this._config?.alert_first||!this._built)return;const t=new Set(this._allTabs().filter(t=>this._isAlerting(t)));if(t.size===this._alertOrder.size&&[...t].every(t=>this._alertOrder.has(t)))return;const e=this._visibleTabs()[this._selected]?.name;this._alertOrder=t,this._restoreSelection(e)}_snoozeKey(t){return this._text(t.name)??String(this._allTabs().indexOf(t))}get _deckId(){return this._config?.event_id??this._config?.storage_key??this._cardKey}_indexOf(t){const e=this._visibleTabs();if("number"==typeof t)return t;const i=String(t??"").trim();if(/^\d+(\.0+)?$/.test(i)&&!e.some(t=>t.name===i))return Number(i);const s=t=>t.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),r=e.findIndex(t=>t.name===i);return r>=0?r:e.findIndex(t=>void 0!==t.name&&s(t.name)===s(i))}_remoteSelect(t,e){if(this._isQuiet())return;let i=this._indexOf(t);const s=i<0?xs(t):void 0;s&&(i=this._stepTarget(s)),this._isContentTab(this._visibleTabs()[i])&&(this._collapsed=!1,i!==this._selected&&this._autoSwitch(i,!1,e))}_stepTarget(t){switch(t){case"next":return this._nextRotatable(this._selected,1);case"previous":return this._nextRotatable(this._selected,-1);case"back":return ks(this._visibleTabs(),this._lastTab,t=>this._isContentTab(t));case"default":return this._ensureContentTab(this._computeDefaultIndex())}}selectLast(){if(!this._built)return!1;const t=ks(this._visibleTabs(),this._lastTab,t=>this._isContentTab(t));return!(t<0)&&(this._userSelect(t),!0)}_lastTabItem(){const t=this._lastTab;if(!(ks(this._visibleTabs(),t,t=>this._isContentTab(t))<0))return{name:this._text(t.name),icon:this._text(t.icon)}}_syncRemoteEntity(){const t=this._config?.remote_entity;if(!t)return;const e=this._hass?.states?.[t]?.state;if(void 0===e||e===this._lastRemote)return;const i=void 0===this._lastRemote;this._lastRemote=e,i||!this._built||["","unknown","unavailable"].includes(e)||this._remoteSelect(e,"remote_entity")}_syncFollowRoom(){const t=this._config?.follow_room;if(!t)return;const e=this._hass?.states?.[t.entity]?.state;if(void 0===e||e===this._lastRoom)return;const i=void 0===this._lastRoom;if(this._lastRoom=e,i||!this._built||this._isQuiet())return;const s=this._roomTab(e),r=this._visibleTabs()[s];s<0||s===this._selected||!this._isContentTab(r)||this._autoSwitch(s,!1,"follow_room")}_roomTab(t){const e=t=>String(t??"").toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu,"_").replace(/^_|_$/g,""),i=e(t);if(!i||/^(unknown|unavailable|none|not_home|away|off)$/.test(i))return-1;const s=this._config.follow_room.map,r=s&&Object.keys(s).find(t=>e(t)===i);if(void 0!==r)return this._indexOf(s[r]);const o=this._visibleTabs(),n=this._hass?.areas??{},a=o.findIndex(t=>t.area&&(e(t.area)===i||e(n[t.area]?.name)===i));return a>=0?a:o.findIndex(t=>void 0!==t.name&&e(t.name)===i)}_syncTakeover(){for(const t of this._config?.takeover??[]){const e=this._hass?.states?.[t.entity]?.state,i=this._takeoverStates.has(t.entity),s=this._takeoverStates.get(t.entity);this._takeoverStates.set(t.entity,e),i&&this._built&&ge(t,s,e)&&this._startTakeover(t.tab,t.duration,t.message,t.icon)}}_startTakeover(t,e,i,s){if(!this._built||this._isQuiet())return;const r=this._visibleTabs(),o=this._indexOf(t),n=r[o];if(!this._isContentTab(n))return;if(o!==this._selected&&this._autoLocked(o,"takeover"))return;const a=this._takeover?.from??r[this._selected];this._takeover={tab:n,from:a,until:Date.now()+1e3*e,message:i,icon:s},this._collapsed=!1,this._moveTakeover(o),this._syncTakeoverTimer()}_moveTakeover(t){if(!(t<0||t===this._selected)){this._takeoverMove=!0;try{this._selectIndex(t,!1)}finally{this._takeoverMove=!1}}}_endTakeover(t){const e=this._takeover;if(!e)return;this._takeover=void 0,this._syncTakeoverTimer();const i=this._visibleTabs();t&&e.from&&i[this._selected]===e.tab&&this._moveTakeover(i.indexOf(e.from))}_syncTakeoverTimer(){const t=!!this._takeover&&this.isConnected;t&&!this._takeoverTimer?this._takeoverTimer=setInterval(()=>{this._takeover&&Date.now()>=this._takeover.until?this._endTakeover(!0):this.requestUpdate()},1e3):!t&&this._takeoverTimer&&(clearInterval(this._takeoverTimer),this._takeoverTimer=void 0)}_syncOffline(){const t=this._config?.offline_banner&&this.isConnected?this._hass?.connection:void 0;if(t!==this._offlineConn){for(const t of["disconnected","reconnect-error"])this._offlineConn?.removeEventListener?.(t,this._onConnDown);this._offlineConn?.removeEventListener?.("ready",this._onConnUp),this._offlineConn=t;for(const e of["disconnected","reconnect-error"])t?.addEventListener?.(e,this._onConnDown);t?.addEventListener?.("ready",this._onConnUp)}t?!1===this._hass?.connected?this._onConnDown():!0===this._hass?.connected&&!1!==t.connected&&this._onConnUp():this._onConnUp()}_renderOffline(t){return this._offline?U`<div class="deck-notice offline" role="alert">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${"M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z"}></path></svg>
      <span>${Qi(t,"card.offline")}</span>
    </div>`:V}_renderTakeover(t){const e=this._takeover;if(!e)return V;const i=Ds(Math.max(0,(e.until-Date.now())/1e3)),s=e.from&&e.from!==e.tab?this._text(e.from.name):void 0,r=Qi(t,"card.dismiss");return U`<div class="deck-notice takeover" role="alert">
      <ha-icon .icon=${e.icon??"mdi:bell-ring"}></ha-icon>
      <span>${e.message??this._text(e.tab.name)??""}</span>
      <span class="takeover-count">${s?Qi(t,"card.takeover_back",{tab:s,time:i}):i}</span>
      <button class="notice-close" aria-label=${r} title=${r} @click=${()=>this._endTakeover(!0)}><ha-icon icon="mdi:close"></ha-icon></button>
    </div>`}_isQuiet(){return function(t,e,i){if(!t)return!1;if(t.entity&&"on"===i?.[t.entity]?.state)return!0;if(!t.from||!t.to)return!1;const s=xe(t.from),r=xe(t.to),o=60*e.getHours()+e.getMinutes();return s<=r?o>=s&&o<r:o>=s||o<r}(this._config?.quiet_hours,/* @__PURE__ */new Date,this._hass?.states)}_syncRemoteEvent(){const t=this._hass?.connection;this._config?.remote_event&&!this._remoteSub&&this.isConnected&&t?.subscribeEvents&&(this._remoteSub=Promise.resolve(t.subscribeEvents(t=>{const e=t?.data??{};void 0!==e.deck&&null!==e.deck&&""!==e.deck&&e.deck!==this._deckId||void 0!==e.device&&null!==e.device&&""!==e.device&&e.device!==tr()||(e.takeover?this._startTakeover(e.tab,be(e.takeover),"string"==typeof e.message?e.message:void 0,"string"==typeof e.icon?e.icon:void 0):this._remoteSelect(e.tab,"remote_event"))},"tabdeck_select")).catch(t=>{console.warn("tabdeck-card: remote_event needs an admin user",t?.message??t)}))}_companionIds(){const t=gr(this._deckId);return t?{browser_id:vr(this._config?.companion_id),deck_id:t}:void 0}_companionState(){const t=this._visibleTabs(),e=[];this._companionIndex=[],t.forEach((t,i)=>{const s=this._text(t.name);s&&this._isContentTab(t)&&!e.includes(s)&&(e.push(s),this._companionIndex.push(i))});const i=t[this._selected];return{tabs:e,tab:i?this._text(i.name):void 0}}_syncCompanion(){const t=this._hass?.connection;if(!(this._config?.companion&&this._built&&this.isConnected)||this._previewFlag||this._companionMissing||!t?.subscribeMessage)return void(this._companionSub&&this._stopCompanion());if(this._companionSub)return;const e=this._companionIds();if(!e)return;const i=this._companionState();this._companionSent=JSON.stringify([i.tabs,i.tab]),this._companionConn=t,t.addEventListener?.("ready",this._onCompanionReady),this._companionSub=Promise.resolve(t.subscribeMessage(t=>this._onCompanionCommand(t),{type:"tabdeck/register",...e,tabs:i.tabs,...i.tab?{tab:i.tab}:{}})).catch(()=>{this._companionMissing=!0,this._stopCompanion()})}_sendCompanion(){const t=this._companionConn;if(!this._companionSub||!t?.sendMessagePromise)return;const e=this._companionState(),i=JSON.stringify([e.tabs,e.tab]);if(i===this._companionSent)return;this._companionSent=i;const s=this._companionIds();if(s)try{Promise.resolve(t.sendMessagePromise({type:"tabdeck/update",...s,tabs:e.tabs,tab:e.tab??null})).catch(()=>{})}catch{}}_onCompanionCommand(t){const e=function(t){const e=t;return e&&"select"===e.command&&"string"==typeof e.tab?e.tab:void 0}(t);if(void 0===e)return;const i=this._companionState().tabs.indexOf(e);this._remoteSelect(i>=0?this._companionIndex[i]:e,"companion")}_stopCompanion(){const t=this._companionSub;this._companionSub=void 0,this._companionConn?.removeEventListener?.("ready",this._onCompanionReady),this._companionConn=void 0,this._companionSent="",t?.then(t=>t?.()).catch(()=>{})}_syncTabRefs(){if(!this._refRaw||!this._hass||this._refLoading===this._refToken)return;const t=this._refLoading=this._refToken,e=this._refRaw,i=this._hass,s=Yi(i);(async function(t,e,i){const s=await Promise.all(t.tabs.map(async t=>{if(!t||"object"!=typeof t||void 0===t.tab_ref)return t;const{tab_ref:s,...r}=t,o=await Tr(String(s),e);if(o.tab)return{...o.tab,...r,tab_ref:s};const n=xr(s);return{name:n?.tab??String(s),icon:"mdi:link-variant-off",...r,tab_ref:s,card:{type:"markdown",content:`<ha-alert alert-type="warning">${Cr(i(o.error,{ref:String(s),dashboard:n?.dashboard??"",tab:n?.tab??""}))}</ha-alert>`}}}));return{...t,tabs:s}})(e,t=>oe(i,t),(t,e)=>Qi(s,`card.tab_ref_${t}`,e)).then(e=>{if(t===this._refToken){this._refKeep=this._built?this.selectedTab:void 0,this._applyingRefs=!0;try{this.setConfig(e)}finally{this._applyingRefs=!1}}}).catch(t=>console.warn("tabdeck-card: tab_ref",t?.message??t))}_flushUsage(){if(!this._config?.usage_stats)return;const t=this._usageMeter.take(Date.now());if(!Object.keys(t).length)return;const e=this._hass?.connection;if(!e?.sendMessagePromise)return;const i=this._companionIds(),s=this._companionSub&&i?{type:"tabdeck/usage",...i,minutes:t}:{type:"fire_event",event_type:"tabdeck_usage",event_data:{deck:this._deckId,device:tr()??null,minutes:t}};try{Promise.resolve(e.sendMessagePromise(s)).catch(t=>{this._usageWarned||(this._usageWarned=!0,console.warn("tabdeck-card: usage_stats needs the companion integration or an admin user",t?.message??t))})}catch{}}_unsubscribeRemote(){const t=this._remoteSub;this._remoteSub=void 0,t?.then(t=>t?.())}_isLocked(t){return!(!t?.pin||this._editing)&&!function(t,e,i,s){try{const r=Number(sessionStorage.getItem(ir(t,e)));return!(!Number.isFinite(r)||r<=0)&&(void 0===s||i-r<=6e4*s)}catch{return!1}}(this._deckId,t.name??"",Date.now(),t.pin_timeout)}_autoLocked(t,e){const i=this._visibleTabs()[t];return!!this._isLocked(i)&&(this._config?.debug&&console.info(`tabdeck-card: ${e} didn't open "${this._text(i.name)??t}": it has a PIN and isn't unlocked`),!0)}_unlockedStart(t){if(!this._isLocked(this._visibleTabs()[t]))return t;const e=this._visibleTabs().findIndex(t=>this._isContentTab(t)&&!this._isLocked(t));return e>=0?e:t}_userSelect(t,e=!0){this._isLocked(this._visibleTabs()[t])?this._pinFor={index:t,error:!1}:(this._collapsed=!1,t!==this._selected&&this._selectIndex(t,e))}_onPinSubmit(t){t.preventDefault();const e=this._pinFor;if(!e)return;const i=this._visibleTabs()[e.index],s=this.renderRoot.querySelector(".pin-dialog input");if(!i||(s?.value??"")!==i.pin)return s&&(s.value=""),void(this._pinFor={...e,error:!0});if(function(t,e,i){try{sessionStorage.setItem(ir(t,e),String(i))}catch{}}(this._deckId,i.name??"",Date.now()),this._pinFor=void 0,"popup"===e.then)return void this.openPopup(e.index);const r=this._allTabs().indexOf(i);this.updateComplete.then(()=>this._manager?.notifyVisible(r)),"stay"!==e.then&&(this._collapsed=!1,e.index!==this._selected&&this._selectIndex(e.index))}_renderLocked(t){const e=Yi(this._hass),i=this._visibleTabs().indexOf(t);return U`<div class="locked-tab">
      <ha-icon icon="mdi:lock"></ha-icon>
      <span class="locked-name">${this._text(t.name)??""}</span>
      <button type="button" class="locked-unlock" @click=${()=>this._pinFor={index:i,error:!1,then:"stay"}}>
        ${Qi(e,"card.pin_enter")}
      </button>
    </div>`}_syncPinTimer(){if(this._pinTimer&&clearTimeout(this._pinTimer),this._pinTimer=void 0,!this.isConnected||this._editing)return;const t=Date.now();let e=1/0;for(const i of this._allTabs()){if(!i.pin||!i.pin_timeout)continue;const s=sr(this._deckId,i.name??"",i.pin_timeout);void 0!==s&&s>=t&&s<e&&(e=s)}e!==1/0&&(this._pinTimer=setTimeout(()=>{this._pinTimer=void 0,this.requestUpdate()},Math.min(e-t+50,2**31-1)))}_renderPin(){const t=this._pinFor,e=t?this._visibleTabs()[t.index]:void 0;if(!t||!e)return V;const i=Yi(this._hass);return U`
      <div class="pin-backdrop ${this._popupTab?"over-popup":""}" @click=${this._cancelPin}>
        <div
          class="pin-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tabdeck-pin-title"
          @click=${t=>t.stopPropagation()}
        >
          <form @submit=${this._onPinSubmit}>
            <div class="pin-title" id="tabdeck-pin-title">
              ${Qi(i,"card.pin_title",{tab:this._text(e.name)??""})}
            </div>
            <input
              type="password"
              inputmode="numeric"
              autocomplete="off"
              aria-label=${Qi(i,"card.pin_label")}
              @keydown=${t=>"Escape"===t.key&&this._cancelPin()}
            />
            ${t.error?U`<div class="pin-error" role="alert">${Qi(i,"card.pin_wrong")}</div>`:V}
            <div class="pin-actions">
              <button type="button" class="pin-cancel" @click=${this._cancelPin}>${Qi(i,"card.cancel")}</button>
              <button type="submit" class="pin-ok">${Qi(i,"card.open")}</button>
            </div>
          </form>
        </div>
      </div>
    `}_rememberEntityState(){const t="entity"===this._config?.remember?this._config.remember_entity:void 0;return t?this._hass?.states?.[t]?.state:void 0}_syncRememberEntity(){if(!this._built)return;const t=this._rememberEntityState();if(void 0===t||t===this._lastEntityValue)return;if(this._lastEntityValue=t,Date.now()<this._entityWriteGuard)return;const e=Math.trunc(Number(t));!Number.isFinite(e)||e<0||e>=this._visibleTabs().length||e!==this._selected&&this._autoSwitch(e,!1,"remember_entity")}_runAutoSelect(){if(!this._config)return;const t=this._allTabs();if(!t.some(t=>t.auto_select))return;const e=t=>{const e=this._hass?.states?.[t.entity]?.state;return void 0!==e&&(void 0!==t.state?e===t.state:Xs(e))},i=t.map(t=>!!t.auto_select&&e(t.auto_select)),s=this._autoPrev;if(this._autoPrev=i,s&&!this._isQuiet())for(let r=0;r<t.length;r++)if(i[r]&&!s[r]){const e=this._visibleTabs().indexOf(t[r]);if(e>=0){this._autoSwitch(e,!0,"auto_select");break}}}get hass(){return this._hass}_cardConfigs(){return this._allTabs().map((t,e)=>{if(oi(t)&&!t.card?.type)return null;const i=this._autoCard(t);return this._autoSigs[e]=i?JSON.stringify(i):void 0,i??t.card})}_isContentTab(t){return!!t&&!t.disabled&&!oi(t)}_ensureContentTab(t){const e=this._visibleTabs();if(!e[t]||!oi(e[t]))return t;const i=e.findIndex(t=>!oi(t));return i>=0?i:t}_stepContent(t,e,i){const s=this._visibleTabs(),r=s.length;for(let o=1;o<r;o++){let n=t+e*o;if(i)n=(n%r+r)%r;else if(n<0||n>=r)return t;if(this._isContentTab(s[n]))return n}return t}_allTabs(){return this._config?this._genTabs.length?[...this._config.tabs,...this._genTabs]:this._config.tabs:[]}_visibleTabs(){if(!this._config)return[];if(this._editing)return this._allTabs();const t=this._allTabs().filter(t=>!this._isHidden(t)),e=this._config.customize||this._config.drag_reorder,i=!this._config.sort_by_usage||e&&this._layout.order.length?t:ms(t,this._usageOrder),s=e?rs(i,this._layout):i,r=this._config.customize?function(t,e){if(0===e.hidden.length)return t;const i=t.filter(t=>void 0===t.name||!e.hidden.includes(t.name));return i.length?i:t}(s,this._layout):s;return this._config.alert_first?(n=t=>this._alertOrder.has(t),[...(o=r).filter(n),...o.filter(t=>!n(t))]):r;var o,n}_customItems(){const t=this._allTabs().filter(t=>!this._isHidden(t));return rs(this._config?.sort_by_usage?ms(t,this._usageOrder):t,this._layout).map(t=>({name:this._text(t.name),icon:this._text(t.icon),key:t.name,hidden:void 0!==t.name&&this._layout.hidden.includes(t.name)}))}_onCustomize(t){const e=this._visibleTabs()[this._selected]?.name,i=t.detail??{};this._layout=i.reset?{order:[],hidden:[]}:{order:i.order??[],hidden:i.hidden??[]},ss(this._cardKey,i.reset?null:this._layout),this._restoreSelection(e),this._isContentTab(this._visibleTabs()[this._selected])||(this._selected=this._unlockedStart(this._ensureContentTab(this._computeDefaultIndex()))),this.requestUpdate()}_onReorder(t){const e=this._visibleTabs(),i=e[t.detail.from]?.name,s=e[t.detail.to]?.name;if(!this._config?.drag_reorder||this._editing||void 0===i||void 0===s)return;const r=this._allTabs(),o=rs(this._config.sort_by_usage&&!this._layout.order.length?ms(r,this._usageOrder):r,this._layout).map(t=>t.name).filter(t=>void 0!==t),n=e[this._selected]?.name;this._layout={order:os(o,i,s,t.detail.after),hidden:this._layout.hidden},ss(this._cardKey,this._layout),this._restoreSelection(n),this.requestUpdate()}_isHidden(t){return!$i(t.visibility,this._hass,this._templateResolver)}_collectTemplates(){if(!this._config)return[];const t=[];this._config.auto_tabs?.template&&t.push(this._config.auto_tabs.template);const e=this._config.summary_chip;!0!==e&&Bi(e?.text)&&t.push(e.text);const i=e=>{for(const s of e??[])"template"===s?.condition&&s.value_template&&t.push(s.value_template),Array.isArray(s?.conditions)&&i(s.conditions)};for(const s of this._allTabs()){Bi(s.badge)&&t.push(s.badge);for(const i of s.badges??[])Bi(i.badge)&&t.push(i.badge);Bi(s.ring)&&t.push(s.ring);for(const i of Or)Bi(s[i])&&t.push(s[i]);const e=ae(s.empty_message);for(const i of[e?.title,e?.text])Bi(i)&&t.push(i);i(s.visibility),i(s.default_if),i(s.alert)}return t}_makeSubscribe(){var t;if(this._hass?.connection?.subscribeMessage)return t=()=>this._hass,(e,i,s)=>{const r=t()?.connection;if(!r?.subscribeMessage)return s(),()=>{};let o,n=!1;return Promise.resolve(r.subscribeMessage(t=>{t&&void 0!==t.error?s():i(t?.result)},{type:"render_template",template:e,report_errors:!0})).then(t=>{o=t,n&&t?.()}).catch(()=>s()),()=>{n=!0,o?.()}}}_syncTemplates(){const t=this._collectTemplates();if(0===t.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const t=this._makeSubscribe();if(!t)return;this._templates=new Hi(t),this._templates.addEventListener("change",()=>{this._syncGeneratedTabs(),this._refreshAlertOrder(),this.requestUpdate()})}this._templates.track(t)}async _syncGeneratedTabs(){const t=this._config?.auto_tabs;if(!t||!this._manager)return;let e=t.source&&Se.includes(t.source)?this._clientItems:this._templates?.result(t.template);const i=this._hass?.areas;"areas"===t.source&&Array.isArray(e)&&i&&(e=e.map(t=>t&&"object"==typeof t?{...t,icon:i[t.id]?.icon||t.icon}:t));const s=function(t,e){if("string"==typeof t&&t.trim().startsWith("["))try{t=JSON.parse(t)}catch{return[]}if(!Array.isArray(t))return[];const i=e.tab_template,s=[];return t.forEach((t,e)=>{i?s.push(qt(i,t,e)):t&&"object"==typeof t&&!Array.isArray(t)&&s.push(t)}),s}(e,t),r=JSON.stringify(s);if(r===this._genKey)return;const o=this._visibleTabs()[this._selected]?.name;this._genKey=r;const n=this._config;this._genTabs=s.map(t=>ri(ui(t,n.tab_templates,n.tab_defaults))),this._baselineSeen(),this._restoreSelection(o),await this._manager.build(this._cardConfigs(),{lazy:n.lazy}),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this.requestUpdate()}_syncClientSource(){const t=this._config?.auto_tabs?.source,e=t&&Se.includes(t)&&this.isConnected&&this._hass?.connection?t:void 0;if(e!==this._clientSource)if(this._stopClientSource(),this._clientSource=e,"notifications"===e){this._notifications={};const t=this._hass.connection.subscribeMessage(t=>this._onNotifications(t),{type:"persistent_notification/subscribe"});let e,i=!1;t.then(t=>{i?t():e=t}).catch(()=>this._setClientItems([])),this._clientUnsub=()=>{i=!0,e?.()}}else"repairs"===e&&(this._fetchRepairs(),this._clientTimer=setInterval(()=>{this._fetchRepairs()},6e4))}_stopClientSource(){this._clientUnsub?.(),this._clientUnsub=void 0,this._clientTimer&&clearInterval(this._clientTimer),this._clientTimer=void 0,this._clientSource=void 0}_onNotifications(t){if("current"===t.type)this._notifications={...t.notifications};else if("removed"===t.type){const e={...this._notifications};for(const i of Object.keys(t.notifications??{}))delete e[i];this._notifications=e}else this._notifications={...this._notifications,...t.notifications};const e=Yi(this._hass);var i,s;this._setClientItems((i=this._notifications,s={untitled:Qi(e,"card.notification"),dismiss:Qi(e,"card.dismiss")},Object.values(i).sort((t,e)=>Date.parse(e.created_at??"")-Date.parse(t.created_at??"")||0).map(t=>({id:t.notification_id,name:t.title?.trim()||s.untitled,message:Rs(t.message??""),created:t.created_at??"",dismiss:s.dismiss}))))}async _fetchRepairs(){const t=this._hass;if(!t?.callWS)return;let e=[];try{e=(await t.callWS({type:"repairs/list_issues"}))?.issues??[]}catch{}const i=[...new Set(e.map(t=>t.domain))];await Promise.all(i.map(e=>t.loadBackendTranslation?.("issues",e)?.catch?.(()=>{})));const s=this._hass;this._setClientItems(function(t,e,i){return t.filter(t=>!t.ignored&&!t.dismissed_version).map((t,e)=>({i:t,n:e})).sort((t,e)=>(Bs[t.i.severity??""]??3)-(Bs[e.i.severity??""]??3)||t.n-e.n).map(({i:t})=>({id:t.issue_id,domain:t.domain,severity:t.severity??"warning",icon:js[t.severity??""]??"mdi:wrench",name:e(t,"title")||`${t.domain}: ${(t.translation_key??t.issue_id).replace(/_/g," ")}`,description:Rs(e(t,"description")??""),open:i.open}))}(e,(t,e)=>{if(!t.translation_key||"function"!=typeof s?.localize)return;const i=s.localize(`component.${t.domain}.issues.${t.translation_key}.${e}`,t.translation_placeholders??{});return"string"==typeof i&&i?i:void 0},{open:Qi(Yi(this._hass),"card.open_repairs")}))}_setClientItems(t){this._clientItems=t,this._syncGeneratedTabs()}_restoreSelection(t){const e=this._visibleTabs();if(t){const i=e.findIndex(e=>e.name===t);if(i>=0)return void(this._selected=i)}this._selected>e.length-1&&(this._selected=this._unlockedStart(Math.min(this._computeDefaultIndex(),Math.max(0,e.length-1))))}getCardSize(){if("hidden"===this._config?.popup&&!this._editing)return 0;if(this._collapsed)return 1;const t=this._visibleTabs()[this._selected];if(t&&"number"==typeof t.card_size)return t.card_size;const e=this._manager?.ensure(this._activeOriginalIndex());return e&&"function"==typeof e.getCardSize?e.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_computeDefaultIndex(){const t=this._visibleTabs();for(let n=0;n<t.length;n++){const e=t[n].default_if;if(Array.isArray(e)&&e.length>0&&$i(e,this._hass,this._templateResolver))return this._defaultReason=`default_if of ${t[n].name??n}`,n}const e=this._config,i=function(t,e){if(t&&"object"==typeof t&&e)return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0}(e.default_by_device,tr()),s=i??function(t,e){if(!t||"object"!=typeof t)return;const i=Object.entries(t).map(([t,e])=>{const i=Js.exec(t.trim());return i?{at:60*Number(i[1])+Number(i[2]),tab:e}:void 0}).filter(t=>!!t).sort((t,e)=>t.at-e.at);if(!i.length)return;const s=60*e.getHours()+e.getMinutes(),r=i.filter(t=>t.at<=s);return(r.length?r[r.length-1]:i[i.length-1]).tab}(e.default_by_time,/* @__PURE__ */new Date);if(void 0!==s){const e=this._indexOf(s);if(this._isContentTab(t[e]))return this._defaultReason=void 0!==i?`default_by_device (${tr()})`:"default_by_time",e}this._defaultReason="default_tab";const r=mi(e),o=t.indexOf(this._allTabs()[r]??e.tabs[r]);return o>=0?o:0}_activeOriginalIndex(){const t=this._visibleTabs()[this._selected];return this._allTabs().indexOf(t)}_onSelect(t){const e=this._visibleTabs()[t.detail.index];if((this._editModeFlag||this._previewFlag)&&this._config&&e){const t=this._config.tabs.indexOf(e);t>=0&&this.dispatchEvent(new CustomEvent("tabdeck-edit-tab",{detail:{index:t,names:this._config.tabs.map(t=>t.name??"")},bubbles:!0,composed:!0}))}if(void 0!==t.detail.child){if(this._isLocked(e))return void(this._pinFor={index:t.detail.index,error:!1});this._collapsed=!1,t.detail.index!==this._selected&&this._selectIndex(t.detail.index);const i=this._manager?.get(this._allTabs().indexOf(e));return void this.updateComplete.then(()=>i?.selectTab?.(t.detail.child))}oi(e)?this._runAction(e.tap_action,"tap"):this._config?.collapsible&&t.detail.index===this._selected?this._collapsed=!this._collapsed:this._userSelect(t.detail.index)}_scrollToSection(t){this._spySuppressUntil=Date.now()+900,this.updateComplete.then(()=>{(this.renderRoot?.querySelector?.(`.panel[data-index="${t}"]`))?.scrollIntoView?.({behavior:Fs()?"auto":"smooth",block:"start"})})}_syncSpyObserver(){if(!this._config?.scroll_spy||"undefined"==typeof IntersectionObserver)return this._spyObserver?.disconnect(),this._spyObserver=void 0,void(this._spyObserved=[]);const t=[...this.renderRoot?.querySelectorAll?.(".panel")??[]];if(t.length!==this._spyObserved.length||!t.every((t,e)=>t===this._spyObserved[e])||!this._spyObserver){this._spyObserver?.disconnect(),this._spyInView.clear(),this._spyObserver=new IntersectionObserver(t=>this._onSpyEntries(t),{rootMargin:"-120px 0px -55% 0px"});for(const e of t)this._spyObserver.observe(e);this._spyObserved=t}}_onSpyEntries(t){for(const i of t){const t=Number(i.target.dataset?.index);Number.isInteger(t)&&(i.isIntersecting?this._spyInView.add(t):this._spyInView.delete(t))}if(Date.now()<this._spySuppressUntil||0===this._spyInView.size)return;const e=Math.min(...this._spyInView);if(e!==this._selected){this._spyDriven=!0;try{this._selectIndex(e,!1)}finally{this._spyDriven=!1}}}_runAction(t,e){if(!t||!this._hass)return;"perform-action"===t.action&&"string"==typeof t.perform_action&&(t={...t,action:"call-service",service:t.perform_action,service_data:t.data??t.service_data});const i={entity:t?.entity,[`${e}_action`]:t};((t,e,i,s)=>{let r;"double_tap"===s&&i.double_tap_action?r=i.double_tap_action:"hold"===s&&i.hold_action?r=i.hold_action:"tap"===s&&i.tap_action&&(r=i.tap_action),gt(t,e,i,r)})(this,this._hass,i,e)}_onTabAction(t){const e=this._visibleTabs()[t.detail.index];if(!e||!this._hass)return;if("hold"===t.detail.kind&&this._config?.alert_snooze&&this._isAlerting(e))return function(t,e,i,s){try{localStorage.setItem(er(t,e),String(i+6e4*s))}catch{}}(this._deckId,this._snoozeKey(e),Date.now(),this._config.alert_snooze),this._refreshAlertOrder(),void this.requestUpdate();if("hold"===t.detail.kind&&!e.hold_action&&this._canCompare(e))return void(e===this._compareTab?this.closeCompare():this.compareTab(t.detail.index));if("hold"===t.detail.kind&&!e.hold_action&&this._canPreview(e))return void this._startPreview(t.detail.index);if("hold"===t.detail.kind&&!e.hold_action&&this._holdAsksPin(e))return void(this._pinFor={index:t.detail.index,error:!1,then:"stay"});if("double_tap"===t.detail.kind)return void this._runAction(e.double_tap_action,"double_tap");const i="badge"===t.detail.kind?e.badge_action:e.hold_action;this._runAction(i,"badge"===t.detail.kind?"tap":"hold")}_seenKey(t){return t.name??`#${this._allTabs().indexOf(t)}`}_watchList(t){let e=this._watchCache.get(t);return e||(e=t.watch??Ps(this._autoCard(t)??t.card),this._watchCache.set(t,e)),e}_baselineSeen(){if(!this._config?.changed_dot)return;const t=Date.now();for(const e of this._allTabs())this._seen[this._seenKey(e)]??=t}_isChanged(t){if(!this._config?.changed_dot||this._editing)return!1;if(t===this._visibleTabs()[this._selected])return!1;const e=this._seen[this._seenKey(t)]??this._builtAt;return function(t,e,i){if(!e)return!1;for(const s of t){const t=Date.parse(e[s]?.last_changed??"");if(Number.isFinite(t)&&t>i)return!0}return!1}(this._watchList(t),this._hass?.states,e)}_markSeen(t,e,i){this._config?.changed_dot&&t&&!this._editing&&(this._seen[this._seenKey(t)]=e,(i||e-this._seenSaved>3e4)&&(this._seenSaved=e,function(t,e){try{localStorage.setItem(Ns(t),JSON.stringify(e))}catch{}}(this._cardKey,this._seen)))}_pipShown(){const t=this._pipTab,e=this._config;if(!t||!e||this._editing||e.scroll_spy||this._isSplit||this._fullscreen)return;const i=this._visibleTabs();return i.includes(t)&&i[this._selected]!==t&&!this._isLocked(t)?t:void 0}_closePip(t){t.stopPropagation(),this._pipTab=void 0}_openPip(){const t=this._pipTab;if(!t)return;const e=this._visibleTabs().indexOf(t);e>=0&&this._userSelect(e)}_canCompare(t){const e=this._config;return!!e?.compare&&!e.scroll_spy&&!e.wizard&&this._isContentTab(t)&&!this._isLocked(t)}_compareShown(){return!this._compareTab||this._isSplit||this._overview||this._collapsed?-1:function(t,e,i,s){if(void 0===e)return-1;const r=t.indexOf(e);return r>=0&&r!==i&&s(e)?r:-1}(this._visibleTabs(),this._compareTab,this._selected,t=>this._canCompare(t))}compareTab(t){if(!this._config?.compare||!this._built)return!1;const e=this._visibleTabs(),i="number"==typeof t?t:this._indexOf(t),s=e[i];return!(!s||i===this._selected||!this._canCompare(s))&&(this._manager?.ensure(this._allTabs().indexOf(s)),this._compareTab=s,this.updateComplete.then(()=>this._manager?.notifyVisible(this._allTabs().indexOf(s))),!0)}closeCompare(){this._compareTab=void 0}_canPreview(t){return!!this._config?.hold_peek&&!this._config.scroll_spy&&this._isContentTab(t)&&!this._isLocked(t)}_holdAsksPin(t){const e=this._config;return!!e&&(!!e.compare||!!e.hold_peek)&&!e.scroll_spy&&!e.wizard&&this._isContentTab(t)&&this._isLocked(t)}_startPreview(t){if(t===this._selected||this._collapsed)return;const e=this._visibleTabs()[t];e&&(this._manager?.ensure(this._allTabs().indexOf(e)),this._previewIndex=t,window.addEventListener("pointerup",this._endPreview,!0),window.addEventListener("pointercancel",this._endPreview,!0),window.addEventListener("blur",this._endPreview))}selectTab(t){const e=this._visibleTabs(),i="number"==typeof t?t:this._indexOf(t);return!!this._isContentTab(e[i])&&(this._isLocked(e[i])?(this._pinFor={index:i,error:!1},!1):(this._collapsed=!1,i!==this._selected&&this._selectIndex(i),!0))}selectDefault(){if(!this._built)return!1;const t=this._ensureContentTab(this._computeDefaultIndex());return t!==this._selected&&this._isLocked(this._visibleTabs()[t])?(this._pinFor={index:t,error:!1},!1):(this._collapsed=!1,t!==this._selected&&this._selectIndex(t),!0)}breadcrumbPath(){const t=this._visibleTabs()[this._selected];if(!this._built||!t)return[];const e={name:this._text(t.name)??"",deck:this},i=this._manager?.get(this._allTabs().indexOf(t));return[e,..."function"==typeof i?.breadcrumbPath?i.breadcrumbPath():[]]}_renderBreadcrumbs(){const t=this._config,e=this.breadcrumbPath(),i=[...t.breadcrumbs.root?[{name:t.breadcrumbs.root,deck:void 0}]:[],...e];if(i.length<2)return V;const s=i=>{(t.breadcrumbs.root?0===i?this:e[i]?.deck:e[i+1]?.deck)?.selectDefault()};return U`<nav class="breadcrumbs" aria-label=${Qi(Yi(this._hass),"card.breadcrumbs")}>
      <ol>
        ${i.map((t,e)=>e===i.length-1?U`<li><span aria-current="page">${t.name}</span></li>`:U`<li><button @click=${()=>s(e)}>${t.name}</button><span class="crumb-sep" aria-hidden="true">${this._rtl?"‹":"›"}</span></li>`)}
      </ol>
    </nav>`}get selectedTab(){return this._visibleTabs()[this._selected]?.name}_selectIndex(t,e=!0){const i=this._visibleTabs();this._share=void 0,this._compareTab&&i[t]===this._compareTab&&(this._compareTab=void 0);const s=i[this._selected],r=t!==this._selected;r&&this._config?.debug&&(this._switchAt=performance.now()),r&&this._takeover&&!this._takeoverMove&&this._endTakeover(!1);const o=Date.now();if(s&&this._seenAt.set(this._allTabs().indexOf(s),o),this._markSeen(s,o,!1),this._markSeen(i[t],o,!0),i[t]){const e=this._allTabs().indexOf(i[t]);this._seenAt.set(e,o),this._manager&&!this._manager.isLoaded(e)&&this._refreshedAt.set(e,o),this._manager?.ensure(e)}r&&s&&this._config?.scroll_memory&&!this._config.scroll_spy&&this._rememberScroll(s,i[t]),this._selected=t,r&&s&&(this._lastTab=s),r&&s?.pip?this._pipTab=s:r&&i[t]===this._pipTab&&(this._pipTab=void 0),r&&(this._runAction(s?.leave_action,"tap"),this._runAction(i[t]?.enter_action,"tap"));const n=i[this._selected];var a,c,d;r&&this._config?.fire_event&&this._fireTabEvent(t,n?.name,s?.name),r&&this._config?.sync_group&&!this._fromSync&&!this._editing&&void 0!==n?.name&&(a=this._config.sync_group,c=n.name,d=this,Ft.set(a,c),window.dispatchEvent(new CustomEvent(Ut,{detail:{group:a,name:c,source:d}}))),r&&e&&this._config?.haptic&&!this._editing&&window.dispatchEvent(new CustomEvent("haptic",{detail:this._config.haptic}));const l=navigator.userActivation;if(!(r&&e&&this._config?.click_sound)||this._editing||l&&!l.isActive||this._isQuiet()||function(t){const e=window,i=e.AudioContext??e.webkitAudioContext;if(!(i&&t>0))return!1;try{ve??=new i,"suspended"===ve.state&&ve.resume();const e=ve.currentTime,s=ve.createOscillator(),r=ve.createGain();return s.type="triangle",s.frequency.setValueAtTime(1800,e),s.frequency.exponentialRampToValueAtTime(900,e+.03),r.gain.setValueAtTime(1e-4,e),r.gain.exponentialRampToValueAtTime(Math.min(1,t),e+.003),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),s.connect(r),r.connect(ve.destination),s.start(e),s.stop(e+.06),!0}catch{return!1}}(this._config.click_sound),r&&(this.dispatchEvent(new CustomEvent("tabdeck-tab-changed",{detail:{index:t,name:n?.name,deck:this},bubbles:!0,composed:!0})),br(Er)._changed(this._registered,t,n?.name,s?.name)),r&&e&&!this._editing&&this._config?.sort_by_usage&&void 0!==n?.name&&(this._usage=fs(this._usage,n.name),function(t,e){try{localStorage.setItem(bs(t),JSON.stringify(e))}catch{}}(this._cardKey,this._usage)),r&&(this._learnedNotice=void 0),r&&e&&!this._editing&&this._config?.learned_default&&void 0!==n?.name&&(this._hourly=function(t,e,i){let s=fs(t[i]??{},e);if(s[e]>100){const t={};for(const[e,i]of Object.entries(s))Math.floor(i/2)>0&&(t[e]=Math.floor(i/2));s=t}return{...t,[i]:s}}(this._hourly,n.name,/* @__PURE__ */(new Date).getHours()),function(t,e){try{localStorage.setItem(gs(t),JSON.stringify(e))}catch{}}(this._cardKey,this._hourly)),this._config&&e&&!this._editing){const t="browser"===(h={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:n?.name}).mode?((h.storage??globalThis.localStorage)?.setItem(Xt(h.cardKey),h.tabName?`name:${h.tabName}`:String(h.index)),{}):"url"===h.mode?{hash:"#tab="+(h.tabName?h.tabName:String(h.index))}:{};this._config.history&&!this._fromPop?history.pushState(this._historyState(this._selected),"",t.hash??location.href):t.hash&&"undefined"!=typeof location&&history.replaceState(this._config.history?this._historyState(this._selected):null,"",t.hash),"entity"===this._config.remember&&this._writeRememberEntity(this._selected)}var h;r&&this._schedulePreload(),r&&this._scheduleErrorScan(),r&&(this._syncWakeLock(),this._syncUsage()),this._config?.scroll_spy&&!this._spyDriven&&this._scrollToSection(t),this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}_applyLearned(){const t=this._config,e=t.learned_default;if(!e||"default_tab"!==this._defaultReason)return!1;const i=this._visibleTabs(),s=i.map(t=>t.name??"");if(null!==function(t){const e=e=>Number.isInteger(e)&&e>=0&&e<t.tabCount?e:null;if("entity"===t.mode){const i=Number(t.entityValue);return void 0!==t.entityValue&&""!==t.entityValue&&Number.isFinite(i)?e(Math.trunc(i)):null}if("url"===t.mode){const i=Qt(t.hash??"",t.tabNames??[]);return null===i?null:e(i)}if("browser"===t.mode)try{const i=(t.storage??globalThis.localStorage)?.getItem(Xt(t.cardKey));return null==i?null:i.startsWith("name:")?e((t.tabNames??[]).indexOf(i.slice(5))):e(Number(i))}catch{return null}return null}({mode:t.remember,cardKey:this._cardKey,tabCount:i.length,hash:"undefined"!=typeof location?location.hash:"",tabNames:s,entityValue:t.remember_entity?this._hass?.states?.[t.remember_entity]?.state:void 0}))return!1;const r=function(t,e,i){const s={};for(const[o,n]of[[e,2],[(e+23)%24,1],[(e+1)%24,1]])for(const[e,i]of Object.entries(t[o]??{}))s[e]=(s[e]??0)+i*n;const r=Object.entries(s).sort((t,e)=>e[1]-t[1]);if(r.length&&!(r[0][1]<2*i)&&!(r.length>1&&r[1][1]===r[0][1]))return r[0][0]}(this._hourly,/* @__PURE__ */(new Date).getHours(),e.min_uses),o=void 0===r?-1:s.indexOf(r);if(o<0||!this._isContentTab(i[o])||this._isLocked(i[o]))return!1;this._selected=o;let n=!1;try{n="off"===localStorage.getItem(`tabdeck-learned-notice:${this._cardKey}`)}catch{}return e.notice&&!n&&(this._learnedNotice=r),!0}_renderLearned(t){const e=this._learnedNotice;if(!e)return V;const i=Qi(t,"card.dismiss");return U`<div class="deck-notice learned" role="status">
      <ha-icon icon="mdi:brain"></ha-icon>
      <span>${Qi(t,"card.learned",{tab:this._text(e)??e})}</span>
      <button class="notice-close" aria-label=${i} title=${i} @click=${this._dismissLearned}><ha-icon icon="mdi:close"></ha-icon></button>
    </div>`}_schedulePreload(){const t=this._config;if(!t?.lazy||!t.preload||void 0!==this._preloadHandle)return;const e=()=>{this._preloadHandle=void 0,this._preloadStep()&&this._schedulePreload()},i=window;this._preloadHandle="function"==typeof i.requestIdleCallback?i.requestIdleCallback(e,{timeout:2e3}):setTimeout(e,200)}_preloadStep(){const t=this._config;if(!t||!this._manager||!this.isConnected)return!1;const e=this._visibleTabs(),i="all"===t.preload?e.map((t,e)=>e):[this._stepContent(this._selected,1,!0),this._stepContent(this._selected,-1,!0)],s=this._cardConfigs(),r=i.filter(t=>this._isContentTab(e[t])&&!this._isLocked(e[t])).map(t=>this._allTabs().indexOf(e[t])).filter((t,e,i)=>t>=0&&i.indexOf(t)===e&&!this._manager.isLoaded(t)&&!!s[t]);return!!r.length&&(this._manager.ensure(r[0]),this.requestUpdate(),r.length>1)}_syncUnloadTimer(){const t=!!this._config?.unload_after&&this.isConnected;t&&!this._unloadTimer?this._unloadTimer=setInterval(()=>this._sweepUnloaded(Date.now()),3e4):!t&&this._unloadTimer&&(clearInterval(this._unloadTimer),this._unloadTimer=void 0)}_sweepUnloaded(t){const e=this._config?.unload_after;if(!e||!this._manager||!this._built||this._config.scroll_spy||this._isSplit)return;const i=this._activeOriginalIndex();let s=!1;this._allTabs().forEach((r,o)=>{o!==i&&this._manager.isLoaded(o)&&(this._compareShown()>=0&&this._allTabs()[o]===this._compareTab||t-(this._seenAt.get(o)??this._builtAt)>=6e4*e&&(this._manager.unload(o),s=!0))}),s&&this.requestUpdate()}_scrollKey(t){return t.name??String(this._allTabs().indexOf(t))}_rememberScroll(t,e){const i=()=>this.renderRoot?.querySelector?.(".content");var s,r,o;s=this._cardKey,r=this._scrollKey(t),o={page:window.scrollY,inner:i()?.scrollTop??0},Ss.set(`${s}\n${r}`,o);const n=e?function(t,e){return Ss.get(`${t}\n${e}`)}(this._cardKey,this._scrollKey(e)):void 0;n&&this.updateComplete.then(()=>requestAnimationFrame(()=>{Ts(()=>window.scrollY,t=>window.scrollTo({top:t,behavior:"instant"}),n.page);const t=i();t&&(t.scrollTop=n.inner)}))}_syncRefreshTimer(){const t=!!this._config&&this._allTabs().some(t=>t.auto_refresh)&&this.isConnected;t&&!this._refreshTimer?this._refreshTimer=setInterval(()=>this._refreshTick(Date.now()),1e4):!t&&this._refreshTimer&&(clearInterval(this._refreshTimer),this._refreshTimer=void 0)}_refreshTick(t){if(!this._manager||!this._built||this._editing)return;const e=this._config,i=this._activeOriginalIndex(),s=this._compareShown()>=0&&this._compareTab?this._allTabs().indexOf(this._compareTab):-1;let r=!1;this._allTabs().forEach((o,n)=>{if(o.auto_refresh&&this._manager.isLoaded(n)&&!(t-(this._refreshedAt.get(n)??this._builtAt)<6e4*o.auto_refresh)){if(n===i||n===s||e.scroll_spy||this._isSplit){if(this._isBusy())return;this._manager.refresh(n)}else this._manager.unload(n);this._refreshedAt.set(n,t),r=!0}}),r&&this.requestUpdate()}openOverview(){return!(!this._config?.overview||!this._built)&&(this._overview=!0,this.updateComplete.then(()=>this.renderRoot.querySelector(".ov-tile.current, .ov-tile")?.focus?.()),!0)}closeOverview(){this._overview&&(this._overview=!1,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex())))}_pickOverview(t){this._overview=!1,this._userSelect(t),this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}_renderOverview(t){const e=Yi(this._hass),i=function(t,e){return t.map((t,e)=>({index:e,tab:t,locked:!1})).filter(({tab:t})=>!t.disabled&&!oi(t)).map(t=>({...t,locked:e(t.tab)}))}(t,t=>this._isLocked(t));return U`
      <div class="overview" role="dialog" aria-label=${Qi(e,"card.all_tabs")}>
        <div class="ov-head">
          <span class="ov-title">${Qi(e,"card.all_tabs")}</span>
          <button class="ov-close" aria-label=${Qi(e,"card.close")} title=${Qi(e,"card.close")} @click=${()=>this.closeOverview()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="ov-grid">
          ${i.map(({index:t,tab:i,locked:s})=>{const r=this._text(i.icon),o=this._text(i.name)??Qi(e,"card.tab_n",{n:t+1});return U`<button
              class="ov-tile ${t===this._selected?"current":""}"
              aria-current=${t===this._selected?"true":"false"}
              aria-label=${o}
              @click=${()=>this._pickOverview(t)}
            >
              <div class="ov-frame">
                ${s?U`<ha-icon class="ov-lock" icon="mdi:lock"></ha-icon>`:U`<div class="ov-live" inert>${this._manager?.ensure(this._allTabs().indexOf(i))}</div>`}
              </div>
              <span class="ov-label">${r?U`<ha-icon .icon=${r}></ha-icon>`:V}<span>${o}</span></span>
            </button>`})}
        </div>
      </div>
    `}openPopup(t){if(!this._built)return!1;const e=this._visibleTabs(),i=this._indexOf(t),s=e[i];if(!this._isContentTab(s))return!1;if(this._isLocked(s))return this._pinFor={index:i,error:!1,then:"popup"},!1;this._popupTab=s;const r=this._allTabs().indexOf(s);return this._manager?.ensure(r),this.updateComplete.then(()=>{this._manager?.notifyVisible(r),this.renderRoot.querySelector(".popup-close")?.focus()}),!0}closePopup(){this._popupTab&&(this._popupTab=void 0,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex())))}_renderPopup(){const t=this._popupTab;if(!t)return V;const e=Yi(this._hass),i=this._text(t.icon),s=this._text(t.name)??"";return U`<div class="popup-backdrop" @click=${t=>t.target===t.currentTarget&&this.closePopup()}>
      <div class="popup-dialog" role="dialog" aria-modal="true" aria-label=${s}>
        <div class="popup-head">
          ${i?U`<ha-icon .icon=${i}></ha-icon>`:V}
          <span class="popup-title">${s}</span>
          <button class="popup-close" aria-label=${Qi(e,"card.close")} title=${Qi(e,"card.close")} @click=${()=>this.closePopup()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="popup-body">${this._isLocked(t)?this._renderLocked(t):this._manager?.ensure(this._allTabs().indexOf(t))}</div>
      </div>
    </div>`}_finishWizard(t){this._runAction(this._config?.wizard?.finish_action,"tap"),t>=0&&this._userSelect(t)}_renderWizard(t,e){const i=Yi(this._hass),s=t.map((t,e)=>e).filter(e=>this._isContentTab(t[e])),r=function(t,e){const i=t.length,s=Math.max(0,t.indexOf(e));return{step:i?s+1:0,total:i,prev:s>0?t[s-1]:-1,next:s<i-1?t[s+1]:-1,last:s>=i-1,percent:i?Math.round((s+1)/i*100):0}}(s,this._selected),o=t[this._selected],n=o?this._text(o.subtitle):void 0;return U`
      <div class="wizard-head">
        <div class="wizard-row">
          <span class="wizard-title">${o?this._text(o.name)??"":""}</span>
          <span class="wizard-count">${Qi(i,"card.wizard_step",{n:r.step,total:r.total})}</span>
        </div>
        ${n?U`<div class="wizard-subtitle">${n}</div>`:V}
        <div
          class="wizard-progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax=${r.total}
          aria-valuenow=${r.step}
          aria-label=${Qi(i,"card.wizard_step",{n:r.step,total:r.total})}
        >
          <div style="width:${r.percent}%"></div>
        </div>
      </div>
      ${e}
      <div class="wizard-foot">
        <button class="wizard-back" ?disabled=${r.prev<0} @click=${()=>r.prev>=0&&this._userSelect(r.prev)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon><span>${Qi(i,"card.back")}</span>
        </button>
        ${r.last?U`<button class="wizard-next wizard-finish" @click=${()=>this._finishWizard(s[0]??-1)}>
              <span>${Qi(i,"card.finish")}</span><ha-icon icon="mdi:check"></ha-icon>
            </button>`:U`<button class="wizard-next" @click=${()=>this._userSelect(r.next)}>
              <span>${Qi(i,"card.next")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>`}
      </div>
    `}_syncLinked(){const t=this.isConnected?this._config?.sync_group:void 0;(t!==this._linkedTo||!this._unlink&&t)&&(this._unlink?.(),this._unlink=t?function(t,e,i){const s=s=>{const r=s.detail;r&&r.group===t&&r.source!==e&&i(r.name)};return window.addEventListener(Ut,s),()=>window.removeEventListener(Ut,s)}(t,this,t=>this._followSync(t)):void 0,this._linkedTo=t)}_syncTarget(t,e){const i=this._visibleTabs(),s=function(t,e){const i=t.indexOf(e);if(i>=0)return i;const s=t=>t.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,""),r=s(e);return r?t.findIndex(t=>void 0!==t&&s(t)===r):-1}(i.map(t=>t.name),t);return this._isContentTab(i[s])?(e?this._autoLocked(s,e):this._isLocked(i[s]))?-1:s:-1}_followSync(t){if(!this._built||this._editing)return;const e=this._syncTarget(t,"sync_group");if(!(e<0||e===this._selected)){this._fromSync=!0;try{this._collapsed=!1,this._selectIndex(e,!1)}finally{this._fromSync=!1}}}_syncSearchRegistry(){this._config?.entity_search&&this.isConnected?(Mr.add(this),Lr||(window.addEventListener("keydown",Pr,!0),Lr=!0)):Mr.delete(this)}entityPlaces(){if(!this._built)return[];return function(t){const e=[];return t.forEach((t,i)=>{const s=t.name??String(i+1),r=t.card;if(r&&"custom:tabdeck-card"===r.type&&Array.isArray(r.tabs)){const t=/* @__PURE__ */new Set;for(const o of r.tabs){const r="string"==typeof o?.name?o.name:void 0;for(const n of Ps(o))t.has(n)||(t.add(n),e.push({entity:n,index:i,tab:s,child:r}))}return}for(const o of Ps(r))e.push({entity:o,index:i,tab:s})}),e}(this._visibleTabs().map(t=>({name:t.name,card:this._isContentTab(t)?this._autoCard(t)??t.card:void 0})))}openEntitySearch(){return!(!this._config?.entity_search||!this._built)&&(this._esQuery="",this._esActive=0,this._esOpen=!0,this.updateComplete.then(()=>this.renderRoot.querySelector(".es-input")?.focus()),!0)}_esMatches(){const t=[...Mr].filter(t=>t.isConnected).flatMap(t=>t.entityPlaces().map(e=>({...e,deck:t})));return Mr.has(this)||t.push(...this.entityPlaces().map(t=>({...t,deck:this}))),function(t,e,i,s=8){const r=Is(i).trim();if(!r)return[];const o=r.split(/\s+/),n=[];for(const a of t){const t=String(e?.[a.entity]?.attributes?.friendly_name??a.entity),i=Is(t),s=Is(a.entity);if(!o.every(t=>i.includes(t)||s.includes(t)))continue;const c=i.startsWith(r)?0:i.includes(r)?1:o.every(t=>i.includes(t))?2:3;n.push({place:a,name:t,score:c})}return n.sort((t,e)=>t.score-e.score||t.name.localeCompare(e.name)).slice(0,s)}(t,this._hass?.states,this._esQuery)}_pickEntity(t){this._esOpen=!1;const e=t.deck;if(e.selectTab(t.index)){if(void 0!==t.child){const i=e._manager?.get(e._allTabs().indexOf(e._visibleTabs()[t.index]));e.updateComplete.then(()=>i?.selectTab?.(t.child))}e.updateComplete.then(()=>e.scrollIntoView?.({block:"nearest",behavior:Fs()?"auto":"smooth"}))}}_onEsKeydown(t){t.stopPropagation();const e=this._esMatches();if("Escape"===t.key)t.preventDefault(),this._esOpen=!1;else if("Enter"===t.key){t.preventDefault();const i=e[this._esActive]??e[0];i&&this._pickEntity(i.place)}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault();const i=e.length||1;this._esActive=(this._esActive+("ArrowDown"===t.key?1:-1)+i)%i}}_renderEntitySearch(){if(!this._esOpen)return V;const t=Yi(this._hass),e=this._esMatches(),i=Qi(t,"card.entity_search");return U`<div class="es-backdrop" @click=${t=>t.target===t.currentTarget&&this._closeEntitySearch()}>
      <div class="es-panel" role="dialog" aria-label=${i}>
        <div class="es-field">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            class="es-input"
            type="search"
            placeholder=${Qi(t,"card.entity_search_placeholder")}
            aria-label=${i}
            .value=${this._esQuery}
            @input=${t=>{this._esQuery=t.target.value,this._esActive=0}}
            @keydown=${t=>this._onEsKeydown(t)}
          />
          <kbd>Ctrl K</kbd>
        </div>
        ${this._esQuery.trim()?U`<div class="es-results" role="listbox">
              ${e.length?e.map((t,e)=>{const i=this._hass?.states?.[t.place.entity];return U`<button
                      class="es-item ${e===this._esActive?"active":""}"
                      role="option"
                      aria-selected=${e===this._esActive?"true":"false"}
                      @click=${()=>this._pickEntity(t.place)}
                    >
                      ${customElements.get("ha-state-icon")&&i?U`<ha-state-icon .hass=${this._hass} .stateObj=${i}></ha-state-icon>`:U`<ha-icon .icon=${i?.attributes?.icon??"mdi:shape"}></ha-icon>`}
                      <span class="es-name">${t.name}<small>${t.place.entity}</small></span>
                      <span class="es-tab">${t.place.child?`${t.place.tab} ${this._rtl?"‹":"›"} ${t.place.child}`:t.place.tab}</span>
                    </button>`}):U`<div class="es-empty">${Qi(t,"card.entity_search_none")}</div>`}
            </div>`:V}
      </div>
    </div>`}_panelEl(t){return this.renderRoot?.querySelector?.(`.panel[data-index="${t}"]`)}_peekStart(t,e){this._peek={x:t,y:e,t:performance.now(),dx:0}}_peekMove(t){const e=this._peek,i=this.renderRoot.querySelector(".content"),s=this._panelEl(this._selected);if(!i||!s)return;const r=t<0?1:-1,o=this._stepContent(this._selected,r,!!this._config?.swipe_wrap),n=o!==this._selected?this._panelEl(o):null,a=n?t:t/3;e.dx=t,i.classList.add("dragging");const c=this._rtl?-1:1;s.style.transform=`translateX(${a*c}px)`,e.neighbour&&e.neighbour!==n&&this._clearPeekPanel(e.neighbour),e.neighbour=n??void 0,n&&(n.classList.add("peek"),n.style.top=`${s.offsetTop}px`,n.style.transform=`translateX(calc(${r*c>0?"100%":"-100%"} + ${a*c}px))`)}_clearPeekPanel(t){t.classList.remove("peek"),t.style.transform="",t.style.top=""}_peekEnd(){const t=this._peek;if(this._peek=void 0,!t||"x"!==t.axis)return;const e=this.renderRoot.querySelector(".content"),i=this._panelEl(this._selected),s=e?.clientWidth||1,r=t.dx/Math.max(1,performance.now()-t.t),o=t.neighbour?function(t,e,i){return Math.abs(t)>e/3||Math.abs(t)>=30&&Math.abs(i)>.5?t<0?"next":"prev":null}(t.dx,s,r):null,n=i?.style.transform??"";if(i&&(i.style.transform=""),t.neighbour&&this._clearPeekPanel(t.neighbour),e?.classList.remove("dragging"),o){const e="next"===o?1:-1,i=this._stepContent(this._selected,e,!!this._config?.swipe_wrap);if(this._isLocked(this._visibleTabs()[i]))return void(this._pinFor={index:i,error:!1});this._peekSettling=!0,this._selectIndex(i);const s=this._rtl?-1:1,r=`translateX(calc(${e*s>0?"100%":"-100%"} + ${t.dx*s}px))`;this.updateComplete.then(()=>{const t=this._panelEl(i);t&&"function"==typeof t.animate&&!this._reducedMotion()&&t.animate([{transform:r},{transform:"translateX(0)"}],{duration:200,easing:"ease-out"})})}else i&&n&&"function"==typeof i.animate&&!this._reducedMotion()&&i.animate([{transform:n},{transform:"translateX(0)"}],{duration:180,easing:"ease-out"})}_reducedMotion(){return Fs()}_fireTabEvent(t,e,i){const s=this._hass;s?.callApi&&Promise.resolve(s.callApi("POST","events/tabdeck_tab_changed",{deck:this._deckId,tab:e,index:t,previous:i,device:tr()})).catch(t=>{this._eventWarned||(this._eventWarned=!0,console.warn("tabdeck-card: fire_event needs an admin user",t?.message??t))})}_writeRememberEntity(t){const e=this._config?.remember_entity,i=this._hass;if(!e||!i?.callService||!i.states?.[e])return;this._entityWriteGuard=Date.now()+1500;const s=e.split(".")[0];"input_number"===s?i.callService("input_number","set_value",{entity_id:e,value:t}):"input_text"===s&&i.callService("input_text","set_value",{entity_id:e,value:String(t)})}_swipeMayStart(t,e){if(this._config?.swipe_lock&&function(t){for(const e of t){const t=e;if(!t||"function"!=typeof t.getAttribute)continue;const i=t.tagName.toLowerCase();if(i.includes("slider")||"ha-map"===i)return!0;if("slider"===t.getAttribute("role"))return!0;if("input"===i&&"range"===(t.getAttribute("type")??"").toLowerCase())return!0;if(t.classList?.contains("leaflet-container"))return!0}return!1}(t.composedPath()))return!1;const i=this._config?.swipe_edge;if(void 0===i)return!0;const s=t.currentTarget;return!s?.getBoundingClientRect||function(t,e,i){return t-e.left<=i||e.right-t<=i}(e,s.getBoundingClientRect(),i)}_applySwipe(t,e){const i=this._rtl?-1:1,s=function(t,e,i={}){const s=i.minDistance??50,r=i.maxDuration??800,o=i.ratio??1.5,n=e.x-t.x,a=e.y-t.y;return e.t-t.t>r||Math.abs(n)<s||Math.abs(n)<Math.abs(a)*o?null:n<0?"next":"prev"}({...t,x:t.x*i},{...e,x:e.x*i});if(!s||!this._config)return;const r=this._stepContent(this._selected,"next"===s?1:-1,this._config.swipe_wrap);r!==this._selected&&this._userSelect(r)}willUpdate(t){super.willUpdate(t),this._config?.debug&&(this._renderStart=performance.now())}updated(t){super.updated(t),this._companionSub&&this._sendCompanion(),this._config?.debug&&this._renderStart&&(this._renderMs=performance.now()-this._renderStart),this._config?.debug&&this._built&&(t.has("_selected")||t.has("_built"))&&this._measureDraw();const e=this._visibleTabs();this._selected>e.length-1&&(this._selected=0),t.has("_selected")&&void 0!==t.get("_selected")&&!this._config?.scroll_spy&&(this._peekSettling?this._peekSettling=!1:this._animatePanel(this._selected>=t.get("_selected")?1:-1)),this._applyStyles(),t.has("_pinFor")&&this._pinFor&&!t.get("_pinFor")&&this.renderRoot.querySelector(".pin-dialog input")?.focus(),this._syncSpyObserver(),this._syncDock(),this._syncPanelWatch(),this._syncRefreshTimer(),this._syncPageBackground(),this._syncPinTimer()}_syncPageBackground(){const t=this._visibleTabs()[this._selected],e=t?.page_background&&this.isConnected&&!this._config?.scroll_spy?Lt(this._text(t.page_background)):void 0;if(!e)return this._clearPageBackground();const i=this._pageBg??function(t){let e=t;for(;e;){if(e instanceof HTMLElement&&"hui-view-container"===e.localName){const t=Array.from(e.children).find(t=>"hui-view-background"===t.localName);return t?{el:t,prop:"--view-background"}:{el:e,prop:"--lovelace-background"}}e=e.parentNode??e.host??null}}(this);i&&(this._pageBg=i,function(t,e,i){const{el:s,prop:r}=t,o=$s.get(s);o?o.owner!==e&&(o.owner=e):$s.set(s,{owner:e,prev:s.style.getPropertyValue(r),priority:s.style.getPropertyPriority(r)}),s.style.setProperty(r,i,"important")}(i,this,e))}_clearPageBackground(){this._pageBg&&(!function(t,e){const{el:i,prop:s}=t,r=$s.get(i);r&&r.owner===e&&($s.delete(i),r.prev?i.style.setProperty(s,r.prev,r.priority):i.style.removeProperty(s))}(this._pageBg,this),this._pageBg=void 0)}_syncPanelWatch(){const t=this._visibleTabs()[this._selected],e=t?this._allTabs().indexOf(t):-1,i=!!this._config?.loading_placeholder,s=t&&(t.empty_message||i)&&!this._config?.scroll_spy?this._manager?.get(e):void 0,r=s&&"undefined"!=typeof ResizeObserver?this._panelEl(this._selected):null;if(r&&this._panelWatch?.panel===r&&this._panelWatch.card===s)return;if(this._stopPanelWatch(),!r)return;const o=function(t,e,i){let s,r,o="none",n=!!e.loaded||!e.loading,a=-1;const c=e=>{e!==o&&t(o=e)},d=()=>{n||(n=!0,i?.()),void 0!==r&&clearTimeout(r),r=void 0};return{size:t=>(a=t,t>0?(d(),void 0!==s&&clearTimeout(s),s=void 0,void c("none")):n?void(e.empty&&"empty"!==o&&("loading"===o&&c("none"),s??=setTimeout(()=>{s=void 0,c("empty")},e.emptyDelay??800))):(c("loading"),void(r??=setTimeout(()=>{d(),a<=0&&c(e.empty?"empty":"none")},e.loadMax??4e3)))),stop:()=>{void 0!==s&&clearTimeout(s),void 0!==r&&clearTimeout(r),s=r=void 0}}}(e=>this._panelState="none"===e?void 0:{tab:t,state:e},{loading:i,empty:!!t.empty_message,loaded:this._loadedCards.has(s)},()=>this._loadedCards.add(s)),n=new ResizeObserver(()=>o.size(s.isConnected?s.getBoundingClientRect().height:1));n.observe(r),this._panelWatch={panel:r,card:s,observer:n,stop:o.stop}}_stopPanelWatch(){this._panelWatch?.observer.disconnect(),this._panelWatch?.stop(),this._panelWatch=void 0,this._panelState&&(this._panelState=void 0)}_renderPanelState(t){const e=this._panelState;return e?.tab!==t?V:"loading"===e.state?U`<div class="loading-boxes" role="progressbar" aria-label=${Qi(Yi(this._hass),"card.loading")}>
        <span></span><span></span><span class="wide"></span>
      </div>`:this._renderEmpty(t)}_scheduleErrorScan(){this._config?.friendly_errors&&(this._errorTimers.forEach(clearTimeout),this._errorTimers=[300,2500,6e3].map(t=>setTimeout(()=>this._scanErrors(),t)))}_scanErrors(){if(!this._manager||!this._config?.friendly_errors)return;const t=this._editModeFlag||this._previewFlag,e=/* @__PURE__ */new Map;this._allTabs().forEach((i,s)=>{const r=function(t){const e=[],i=t=>{if(t instanceof HTMLElement&&"hui-error-card"===t.localName)("hidden"===(s=t).dataset.tabdeckError||"none"!==s.style.display.toLowerCase())&&e.push(t);else{var s;t instanceof Element&&t.shadowRoot&&i(t.shadowRoot);for(const e of Array.from(t.children))i(e)}};return t&&i(t),e}(this._manager.get(s));if(r.length){for(const e of r)ws(e,!t);e.set(i,r.map(t=>function(t){const e=t?.message??t?.error,i="string"==typeof e?e:"",s="string"==typeof t?.origConfig?.type?t.origConfig.type:"",r=i.match(/Custom element (?:doesn't exist|not found):\s*([\w-]+)/i);if(r)return{key:"card.error_not_installed",vars:{type:`custom:${r[1]}`}};const o=i.match(/Unknown type(?: encountered)?:\s*([\w:-]+)/i);return o?{key:"card.error_unknown_type",vars:{type:s||o[1]}}:/no (card )?type/i.test(i)?{key:"card.error_no_type"}:{text:(i||s||"?").slice(0,160)}}(t._config)))}});const i=JSON.stringify([...e].map(([t,e])=>[this._allTabs().indexOf(t),e]));i!==this._errorSig&&(this._errorSig=i,this._errors=e)}_renderErrors(t){const e=Yi(this._hass);return U`<div class="card-errors" role="alert">
      <div class="card-errors-title"><ha-icon icon="mdi:alert-circle"></ha-icon>${Qi(e,"card.error_title")}</div>
      <ul>
        ${t.map(t=>U`<li>${t.key?Qi(e,t.key,t.vars):t.text}</li>`)}
      </ul>
      <div class="card-errors-hint"><ha-icon icon="mdi:pencil"></ha-icon>${Qi(e,"card.error_hint")}</div>
    </div>`}_renderEmpty(t){const e=ae(t.empty_message)??{};return U`<div class="empty-msg" role="status">
      <ha-icon .icon=${e.icon??"mdi:eye-off-outline"}></ha-icon>
      <span class="empty-title">${this._text(e.title)??Qi(Yi(this._hass),"card.empty_title")}</span>
      ${e.text?U`<span class="empty-text">${this._text(e.text)}</span>`:V}
    </div>`}_syncDock(){if(!this._config?.dock||this._editing||!this.isConnected)return this._dockObserver?.disconnect(),void(this._dockObserver=void 0);if(this._dockObserver||"undefined"==typeof ResizeObserver)return;const t=this._dashboardPanel();t&&(this._dockObserver=new ResizeObserver(()=>this._measureDock(t)),this._dockObserver.observe(t),this._measureDock(t))}_dashboardPanel(){let t=this;for(;t;){if(t instanceof Element&&/^(HUI-ROOT|HA-PANEL-LOVELACE)$/.test(t.tagName))return t;t=t.parentNode??t.host??null}}_measureDock(t){const e=t.getBoundingClientRect();0!==e.width&&(this.style.setProperty("--tabdeck-dock-left",`${Math.max(0,Math.round(e.left))}px`),this.style.setProperty("--tabdeck-dock-right",`${Math.max(0,Math.round(window.innerWidth-e.right))}px`))}get _rtl(){return function(t,e,i){if("rtl"===t||"ltr"===t)return"rtl"===t;const s=e?.translationMetadata?.translations?.[e?.language];return s&&"boolean"==typeof s.isRTL?s.isRTL:"rtl"===i}(this._config?.direction,this._hass,"undefined"!=typeof document?document.documentElement.dir:void 0)}_season(){return function(t,e){if(!t)return;const i=`${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return t.find(t=>t.from<=t.to?i>=t.from&&i<=t.to:i>=t.from||i<=t.to)}(this._config?.seasons,/* @__PURE__ */new Date)}_applyStyles(){for(const r of this._appliedStyleKeys)this.style.removeProperty(r);const t=this._visibleTabs()[this._selected],e=this._season(),i={...e?.styles??{},...e?.accent?{"--tabdeck-accent":ds(e.accent)}:{}},s={...this._config?.styles??{},...i,...t?.styles??{}};this._config?.direction||this._rtl?this.setAttribute("dir",this._rtl?"rtl":"ltr"):this.removeAttribute("dir"),e?this.setAttribute("season",e.name??`${e.from}..${e.to}`):this.removeAttribute("season"),this.toggleAttribute("quiet",this._isQuiet()),this._appliedStyleKeys=Object.keys(s);for(const[r,o]of Object.entries(s))this.style.setProperty(r,String(o))}_animatePanel(t){const e=this._config;if(!e)return;const i=e.transition_narrow&&this._isNarrow?e.transition_narrow:e.transition;if("none"===i||e.transition_duration<=0)return;if(this._reducedMotion())return;const s=this._panelEl(this._selected);s&&"function"==typeof s.animate&&s.animate(function(t,e){switch(t){case"fade":return[{opacity:0},{opacity:1}];case"slide":return[{opacity:0,transform:`translateX(${12*e}px)`},{opacity:1,transform:"translateX(0)"}];case"scale":return[{opacity:0,transform:"scale(0.96)"},{opacity:1,transform:"scale(1)"}];case"flip":return[{opacity:0,transform:`perspective(1200px) rotateY(${20*e}deg)`},{opacity:1,transform:"perspective(1200px) rotateY(0deg)"}];case"rise":return[{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}];default:return[]}}(i,this._rtl?-t:t),{duration:e.transition_duration,easing:e.transition_easing})}render(){if(!this._config||!this._built)return V;const t=this._visibleTabs();if(0===t.length)return U`<div class="empty"></div>`;const e=this._config;if(this._isSplit)return this._wrapExtras(U`${this._renderSplit(t)}${this._renderPin()}`);if(this._overview)return this._wrapExtras(this._renderOverview(t));if("hidden"===e.popup&&!this._editing)return U`${this._renderPopup()}${this._renderPin()}`;const i=e.dock&&!this._editing&&!e.wizard,s=this._isQuiet(),r=U`
      <tabdeck-tabbar
        .items=${t.map(t=>({name:this._text(t.name),subtitle:this._text(t.subtitle)??("menu"===t.group?.display?this._groupChild.get(t):void 0),icon:this._text(t.icon),accent:ds(this._text(t.accent))??(e.picture_accent?this._pictureAccent(t):void 0),color:ds(this._text(t.color)),disabled:t.disabled,badgeColor:ds(t.badge_color)??(this._errors.has(t)&&void 0===t.badge&&!t.badge_icon?"var(--error-color, #db4437)":void 0),holdAction:!!t.hold_action||!!e.alert_snooze&&!!t.alert||this._canCompare(t)||this._canPreview(t)||this._holdAsksPin(t),badgeAction:!!t.badge_action,doubleTap:!!t.double_tap_action,action:oi(t),badge:this._resolveBadgeFinal(t),alert:this._isAlerting(t),ghost:this._editing&&this._isHidden(t),fab:t.fab,ring:this._ring(t),ringColor:ds(t.ring_color),ringStyle:t.ring_style,graph:t.graph?this._graphLine(t):void 0,graphColor:t.graph?ds($t(t.graph)?.color):void 0,badges:t.badges?this._extraBadges(t):void 0,tooltip:this._text(t.tooltip),bounce:e.badge_bounce&&!s&&!(t.countdown&&Hs(this._hass?.states?.[t.countdown],Date.now())),badgeIcon:t.badge_icon??(this._errors.has(t)&&void 0===t.badge?"mdi:alert-circle":void 0),picture:this._picture(t),iconAnimation:this._text(t.icon_animation),font:t.font_size||t.font_weight||t.font_family?{size:t.font_size,weight:t.font_weight,family:t.font_family}:void 0,menu:"menu"===t.group?.display?t.group.items:void 0,separator:t.separator,changed:this._isChanged(t),unhealthy:!!e.health_dim&&It(this._watchList(t),this._hass?.states,e.health_dim),speed:"speed"===e.debug?this._drawMs.get(this._allTabs().indexOf(t)):void 0}))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${i?"bottom":this._position}
        .dock=${i}
        .tabStyle=${e.style}
        .display=${this._effectiveDisplay}
        .align=${e.align}
        .badgeDisplay=${e.badge_display}
        .scrollable=${e.scrollable}
        .animated=${e.animated}
        .rtl=${this._rtl}
        .liquid=${e.liquid_indicator}
        .accentIndicator=${e.accent_indicator}
        .indicatorSize=${e.indicator_size}
        .indicatorRadius=${e.indicator_radius}
        .sticky=${e.sticky||e.scroll_spy}
        .autohide=${e.bar_autohide&&this._barPinned}
        .autohidden=${this._barHidden}
        .collapsed=${this._collapsed}
        .elevation=${e.elevation}
        .scrollButtons=${e.scroll_buttons}
        .fade=${e.bar_fade}
        .searchable=${e.search}
        .expandable=${e.fullscreen}
        .overviewable=${e.overview}
        .entitySearchable=${e.entity_search}
        .lastTab=${e.last_tab_button?this._lastTabItem():void 0}
        @tabdeck-last=${()=>this.selectLast()}
        @tabdeck-entity-search=${()=>this.openEntitySearch()}
        @tabdeck-overview=${this._toggleOverview}
        @tabdeck-fullscreen=${this._toggleFullscreen}
        .railExpand=${e.rail_expand}
        .customizable=${e.customize&&!this._editing}
        .customItems=${e.customize?this._customItems():[]}
        @tabdeck-customize=${this._onCustomize}
        .reorderable=${e.drag_reorder&&!this._editing}
        .shareable=${!!e.share_button}
        .shareInfo=${this._share}
        @tabdeck-share=${this._onShare}
        @tabdeck-share-close=${()=>this._share=void 0}
        @tabdeck-reorder=${this._onReorder}
        .overflowMenu=${e.overflow_menu||e.hidden_alerts}
        .hiddenAlerts=${e.hidden_alerts}
        .summary=${e.summary_chip?this._summary()??null:void 0}
        @tabdeck-summary=${this._nextAlert}
        .limit=${e.bar_limit??0}
        .barLabel=${e.aria_label}
        .language=${Yi(this._hass)}
        .barBackground=${ds(this._season()?.bar_background??e.bar_background)}
        .glass=${!0===e.glass?14:e.glass}
        .barText=${this._season()?.bar_text??e.bar_text}
        .density=${e.density}
        @tabdeck-select=${this._onSelect}
        @wheel=${this._onBarWheel}
      ></tabdeck-tabbar>
    `,o=t[this._selected],n=o&&!e.scroll_spy?Lt(this._text(o.background)):void 0,a="auto"!==e.content_height&&"tallest"!==e.content_height?e.content_height:void 0,c=!(this._fullscreen||!a&&!e.content_max_height),d=[n?`background:${n}`:"",c&&a?`height:${a}`:"",c&&e.content_max_height?`max-height:${e.content_max_height}`:""].filter(Boolean).join(";"),l=this._compareShown(),h=["content",e.content_arrows&&!e.scroll_spy?"with-arrows":"","tallest"===e.content_height&&!e.scroll_spy&&l<0?"tallest":"",l>=0?"comparing":"",c?"scrolls":"",n||!e.scroll_spy&&t.some(t=>t.background)?"has-bg":"",this._fullscreen?"fullscreen":"",e.fullscreen&&e.hide_bar?"with-fs":""].filter(Boolean).join(" "),p=Yi(this._hass),u=this._pipShown(),_=(t,e)=>U`<div class="compare-title ${e?"":"main"}">
      ${this._text(t.icon)?U`<ha-icon .icon=${this._text(t.icon)}></ha-icon>`:V}
      <span>${this._text(t.name)??""}</span>
      ${e?U`<button class="compare-close" aria-label=${Qi(p,"card.close")} title=${Qi(p,"card.close")} @click=${()=>this.closeCompare()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>`:V}
    </div>`,b=U`
      <div
        class=${h}
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
        ${e.breadcrumbs&&!e.scroll_spy?this._renderBreadcrumbs():V}
        ${this._renderOffline(p)}${this._renderTakeover(p)}${this._renderLearned(p)}
        ${e.content_arrows&&!e.scroll_spy?this._renderArrows():V}
        ${e.fullscreen&&(this._fullscreen||e.hide_bar)?U`<button
              class="fs-toggle"
              aria-label=${Qi(p,this._fullscreen?"card.exit_fullscreen":"card.fullscreen")}
              title=${Qi(p,this._fullscreen?"card.exit_fullscreen":"card.fullscreen")}
              @click=${this._toggleFullscreen}
            >
              <ha-icon .icon=${this._fullscreen?"mdi:fullscreen-exit":"mdi:fullscreen"}></ha-icon>
            </button>`:V}
        ${e.header&&!e.scroll_spy&&t[this._selected]?U`<div class="content-header">
              <span class="content-title">${this._text(t[this._selected].name)??""}</span>
              ${this._text(t[this._selected].subtitle)?U`<span class="content-subtitle"
                    >${this._text(t[this._selected].subtitle)}</span
                  >`:V}
            </div>`:V}
        ${t.map((t,i)=>{const s=this._allTabs().indexOf(t),r=i===this._selected,o=i===l,n=i===this._previewIndex&&!r&&!o,a=!r&&!n&&!o&&t===u,c=t===this._popupTab,d=e.scroll_spy,h=this._isLocked(t);return U`
            <div
              class="panel ${d?"section":""} ${n?"preview":""} ${a?"pip":""} ${o?"compare":""}"
              data-index=${i}
              style=${Os(t.zoom||t.padding||t.spacing?function(t){const e={};if(t.zoom&&(e.zoom=String(t.zoom)),t.padding&&(e.padding=t.padding),t.spacing)for(const i of["--vertical-stack-card-gap","--horizontal-stack-card-gap","--stack-card-gap","--grid-card-gap","--tabdeck-masonry-gap","--tabdeck-section-gap"])e[i]=t.spacing;return e}(t):{})}
              ?hidden=${!(d||r||n||a||o)}
              role=${a?"dialog":V}
              aria-label=${a?this._text(t.name)??V:V}
              @click=${a?this._openPip:V}
            >
              ${a?U`<div class="pip-bar">
                    <span class="pip-title">${this._text(t.name)??""}</span>
                    <button class="pip-close" aria-label=${Qi(p,"card.close")} title=${Qi(p,"card.close")} @click=${this._closePip}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>`:V}
              ${d&&e.header&&!oi(t)?U`<div class="section-title">${this._text(t.name)??""}</div>`:V}
              ${n?U`<div class="preview-title">${this._text(t.name)??""}</div>`:V}
              ${r&&!h&&this._errors.has(t)?this._renderErrors(this._errors.get(t)):V}
              ${r&&!h?this._renderPanelState(t):V}
              ${l>=0&&(r||o)?_(t,o):V}
              ${c?V:r||n||a||d||o?h?this._renderLocked(t):this._manager?.ensure(s):e.unmount_hidden?V:this._manager?.get(s)}
            </div>
          `})}
      </div>
    `;return this._wrapExtras(U`
      <div class="root pos-${e.wizard?"top":i?"bottom":this._position} ${i?"docked":""} ${e.hide_bar||e.wizard?"no-bar":""} ${e.wizard?"wizard":""}">
        ${e.wizard?this._renderWizard(t,b):e.hide_bar?b:i||"bottom"===this._position?U`${b}${r}`:U`${r}${b}`}
      </div>
      ${this._renderPin()}
    `)}_wrapExtras(t){const e=U`${this._config?.debug?this._renderDebug():V}${this._renderPopup()}${this._renderEntitySearch()}${this._renderDim()}`;if(!this._extras)return U`${t}${e}`;const i=this._config.header_cards?.length??0,s=this._extras.all(),r=s.slice(0,i),o=s.slice(i);return U`
      ${r.length?U`<div class="deck-header">${r}</div>`:V}
      ${t}
      ${o.length?U`<div class="deck-footer">${o}</div>`:V}
      ${e}
    `}_measureDraw(){const t=this._visibleTabs()[this._selected];if(!t||!this._manager||oi(t))return;const e=this._allTabs().indexOf(t),i=this._switchAt||this._renderStart||performance.now();this._switchAt=0;const s=this._manager.get(e);Promise.resolve(s?.updateComplete).catch(()=>{}).then(()=>requestAnimationFrame(()=>{this._drawMs.set(e,performance.now()-i),this.requestUpdate()}))}_describeCondition(t){if(!t||"object"!=typeof t)return String(t);const e=t.condition??(t.entity||t.entity_id?"state":"?"),i=gi(t).join(", ");if(Array.isArray(t.conditions))return`${e}(${t.conditions.map(t=>this._describeCondition(t)).join(", ")})`;switch(e){case"state":return`state ${i} ${void 0!==t.state_not?"≠ "+[].concat(t.state_not).join("|"):"= "+[].concat(t.state).join("|")}`;case"numeric_state":return`numeric ${i}${void 0!==t.above?" > "+t.above:""}${void 0!==t.below?" < "+t.below:""}`;case"screen":return`screen ${t.media_query}`;case"template":return"template";default:return String(e)}}_conditionsText(t){return Array.isArray(t)&&t.length?t.map(t=>`${this._describeCondition(t)} ${$i([t],this._hass,this._templateResolver)?"✓":"✗"}`).join("; "):""}_renderDebug(){const t=this._visibleTabs(),e=t[this._selected],i=this._collectTemplates(),s=t=>{const e="string"==typeof t?t:JSON.stringify(t);return void 0===e?"…":e.length>70?e.slice(0,70)+"…":e};return U`
      <details class="debug" open>
        <summary>tabdeck debug</summary>
        <div class="debug-facts">
          <span>selected ${this._selected} (${e?.name??"—"})</span>
          <span>start: ${this._startReason}</span>
          <span>deck ${this._deckId}</span>
          <span>device ${tr()??"—"}</span>
          ${this._editing?U`<span>editing</span>`:V}
          <span>build ${this._buildMs.toFixed(1)} ms</span>
          <span>render ${this._renderMs.toFixed(1)} ms</span>
        </div>
        <table>
          <tbody>
            ${this._allTabs().map((i,s)=>{const r=t.includes(i),o=this._resolveBadgeFinal(i),n=this._ring(i),a=[r?"visible":"hidden",this._conditionsText(i.visibility),i.alert?"alert "+(this._isAlerting(i)?"on":"off"):"",void 0!==o?`badge ${o}`:"",void 0!==n?`ring ${Math.round(n)}%`:"",this._isLocked(i)?"locked":"",oi(i)?"action tab":this._manager?.isLoaded(s)?"":"card not built",void 0!==this._manager?.createMs[s]?`card ${this._manager.createMs[s].toFixed(1)} ms`:"",this._drawMs.has(s)?`drawn ${Math.round(this._drawMs.get(s))} ms`:""].filter(Boolean);return U`<tr class="tab-row ${i===e?"current":""}">
                <td>${this._text(i.name)??s}</td>
                <td>${a.join(" · ")}</td>
              </tr>`})}
          </tbody>
        </table>
        ${i.length?U`<div class="debug-templates">
              ${i.map(t=>U`<div><code>${s(t)}</code> → <code>${s(this._templates?.result(t))}</code></div>`)}
            </div>`:V}
      </details>
    `}_renderArrows(){const t=!!this._config?.swipe_wrap,e=this._stepContent(this._selected,-1,t),i=this._stepContent(this._selected,1,t),s=Yi(this._hass);return U`
      ${e!==this._selected?U`<button class="nav-arrow prev" aria-label=${Qi(s,"card.prev_tab")} @click=${()=>this._userSelect(e)}>${this._rtl?"›":"‹"}</button>`:V}
      ${i!==this._selected?U`<button class="nav-arrow next" aria-label=${Qi(s,"card.next_tab")} @click=${()=>this._userSelect(i)}>${this._rtl?"‹":"›"}</button>`:V}
    `}_isAlerting(t){if(!t.alert||!this._hass)return!1;const e=$i(t.alert,this._hass,this._templateResolver);if(!this._config?.alert_snooze)return e;const i=this._snoozeKey(t),s=void 0!==function(t,e,i){try{const s=Number(localStorage.getItem(er(t,e)));return Number.isFinite(s)&&s>i?s:void 0}catch{return}}(this._deckId,i,Date.now());return!e&&s&&function(t,e){try{localStorage.removeItem(er(t,e))}catch{}}(this._deckId,i),e&&!s}_pictureAccent(t){const e=this._picture(t);if(e)return this._picAccents.has(e)||(this._picAccents.set(e,null),nr(e,"dominant").then(t=>{t&&(this._picAccents.set(e,`rgb(${t.join(", ")})`),this.requestUpdate())})),this._picAccents.get(e)??void 0}_picture(t){const e=this._text(t.picture);if(e)return/^[a-z_]+\.[a-z0-9_]+$/.test(e)?this._hass?.states?.[e]?.attributes?.entity_picture||void 0:e}_summary(){const t=this._config.summary_chip,e=!0===t?{}:t,i=this._visibleTabs().filter(t=>this._isAlerting(t)).length,s=void 0===e.text?i?function(t,e,i){const s=Qi(t,e,{n:i});if(!s.includes("|"))return s;const r=Object.fromEntries(s.split("|").map(t=>[t.slice(0,t.indexOf(":")),t.slice(t.indexOf(":")+1)]));let o="other";try{o=new Intl.PluralRules(Gi(t)).select(i)}catch{}return r[o]??r.other??s}(Yi(this._hass),"card.n_alerts",i):void 0:this._text(e.text);if(s&&(!s.includes("{n}")||i))return{text:s.split("{n}").join(String(i)),icon:e.icon??"mdi:alert",color:ds(e.color)}}_ring(t){if(void 0!==t.ring)return function(t,e){if(void 0===t||""===String(t).trim())return;const i=Number(t);return Number.isFinite(i)&&e>0?Math.min(100,Math.max(0,i/e*100)):void 0}(this._resolveBadge(t.ring),t.ring_max??100)}_text(t){if(!Bi(t))return t;const e=this._templates?.result(t);return null==e||""===String(e).trim()?void 0:String(e).trim()}_resolveBadgeFinal(t){if(t.countdown){const e=Hs(this._hass?.states?.[t.countdown],Date.now());if(e)return Ds(e.seconds)}const e=this._resolveBadge(t.badge);if(!this._config?.hide_inactive_badge||Xs(e))return"dot"===this._config?.badge_display?e:kt(e,t.badge_format??this._config?.badge_format)}_extraBadges(t){const e=[];for(const i of t.badges??[]){const s=ds(i.color),r=void 0===i.badge?void 0:this._resolveBadge(i.badge);i.icon?(void 0===i.badge||Xs(r))&&e.push({icon:i.icon,color:s}):void 0===r||""===r||this._config?.hide_inactive_badge&&!Xs(r)||e.push({text:"dot"===this._config?.badge_display?r:kt(r,t.badge_format??this._config?.badge_format),color:s})}return e}_resolveBadge(t){if(!t)return;if("object"==typeof t){const e=function(t){if(!t||"object"!=typeof t||Array.isArray(t))return;const e=Gs(t.count);if(!e?.length)return;const i={count:e},s=Gs(t.state);return s?.length&&(i.state=s),"string"==typeof t.area&&t.area&&(i.area=t.area),i}(t);return e&&this._hass?function(t,e){let i=0;for(const[s,r]of Object.entries(e?.states??{})){if(!t.count.some(t=>{return e=s,(i=t).includes("*")?new RegExp("^"+i.split("*").map(t=>t.replace(/[.+?^${}()|[\]\\]/g,"\\$&")).join(".*")+"$").test(e):e===i;var e,i}))continue;if(t.area&&Qs(e,s)!==t.area)continue;const o=r?.state;(t.state?t.state.includes(o):Xs(o))&&i++}return String(i)}(e,this._hass):void 0}if(Bi(t)){const e=this._templates?.result(t);return null==e?void 0:String(e)}if(!this._hass)return;const e=this._hass.states[t];return e?e.state:t}static{this.styles=o`
    ${Vs}
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
      padding-inline: var(--tabdeck-arrow-gutter, 40px);
    }
    .nav-arrow.prev {
      inset-inline-start: 2px;
    }
    .nav-arrow.next {
      inset-inline-end: 2px;
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
    .card-errors {
      margin-bottom: 8px;
      padding: 10px 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 45%, transparent);
      background: color-mix(in srgb, var(--error-color, #db4437) 8%, var(--card-background-color, transparent));
      font-size: 14px;
    }
    .card-errors-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      color: var(--error-color, #db4437);
    }
    .card-errors ul {
      margin: 6px 0;
      padding-inline-start: 26px;
      color: var(--primary-text-color);
    }
    .card-errors-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .card-errors ha-icon {
      --mdc-icon-size: 18px;
    }
    .loading-boxes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--tabdeck-placeholder-gap, 8px);
    }
    .loading-boxes span {
      height: 56px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--tabdeck-placeholder-color, rgba(127, 127, 127, 0.16));
      animation: tabdeck-placeholder 1.4s ease-in-out infinite;
    }
    .loading-boxes .wide {
      grid-column: 1 / -1;
      height: 96px;
    }
    @keyframes tabdeck-placeholder {
      50% {
        opacity: 0.45;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .loading-boxes span {
        animation: none;
      }
    }
    .empty-msg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: var(--tabdeck-empty-height, 140px);
      padding: 16px;
      box-sizing: border-box;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .empty-msg ha-icon {
      --mdc-icon-size: 36px;
      opacity: 0.7;
    }
    .empty-title {
      font-size: 15px;
    }
    .empty-text {
      font-size: 13px;
      opacity: 0.8;
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
      inset-inline-end: 6px;
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
      inset-inline-end: 12px;
    }
    /* debug panel */
    .debug {
      margin-top: 8px;
      padding: 8px 10px;
      border: 1px dashed var(--divider-color, #888);
      border-radius: 8px;
      font: 12px/1.5 var(--code-font-family, ui-monospace, monospace);
      color: var(--secondary-text-color);
    }
    .debug summary {
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .debug-facts {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      margin: 6px 0;
    }
    .debug table {
      width: 100%;
      border-collapse: collapse;
    }
    .debug td {
      padding: 2px 6px 2px 0;
      vertical-align: top;
    }
    .debug tr.current td:first-child {
      color: var(--primary-color);
    }
    .debug-templates {
      margin-top: 6px;
      word-break: break-all;
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
    .pin-backdrop.over-popup {
      z-index: 2147481001;
    }
    /* A PIN-locked tab where its content would show. */
    .locked-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px 16px;
      color: var(--secondary-text-color);
      text-align: center;
    }
    .locked-tab ha-icon {
      --mdc-icon-size: 32px;
    }
    .locked-name {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .locked-unlock {
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font: inherit;
      cursor: pointer;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
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
    /* quiet_hours: alerts keep their colour but stop pulsing. */
    :host([quiet]) {
      --tabdeck-alert-animation: none;
    }
    /* A one-line note over the content (learned_default). */
    .deck-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 8px;
      padding-block: 6px;
      padding-inline: 10px 6px;
      border-radius: 8px;
      font-size: 13px;
      background: color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 12%, transparent);
      color: var(--primary-text-color);
      --mdc-icon-size: 18px;
    }
    .deck-notice > ha-icon {
      color: var(--tabdeck-accent, var(--primary-color));
      flex: none;
    }
    .deck-notice.offline {
      background: var(--tabdeck-offline-background, var(--error-color, #db4437));
      color: var(--tabdeck-offline-color, #fff);
      font-weight: 500;
    }
    .deck-notice.offline > svg {
      width: 18px;
      height: 18px;
      flex: none;
      fill: currentColor;
    }
    .deck-notice.takeover {
      background: var(--tabdeck-takeover-background, var(--warning-color, #ffa600));
      color: var(--tabdeck-takeover-color, #fff);
      font-weight: 500;
    }
    .deck-notice.takeover > ha-icon {
      color: inherit;
    }
    .takeover-count {
      margin-inline-start: auto;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .takeover .notice-close {
      margin-inline-start: 0;
    }
    .notice-close {
      margin-inline-start: auto;
      flex: none;
      display: inline-flex;
      border: none;
      background: none;
      padding: 2px;
      border-radius: 50%;
      color: inherit;
      cursor: pointer;
    }
    /* breadcrumbs: the open tab at every level of nested decks. */
    .breadcrumbs ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2px;
      list-style: none;
      margin: 0;
      padding: 0 4px 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .breadcrumbs li {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }
    .breadcrumbs button {
      border: none;
      background: none;
      padding: 2px 4px;
      border-radius: 4px;
      font: inherit;
      color: var(--tabdeck-accent, var(--primary-color));
      cursor: pointer;
    }
    .breadcrumbs button:hover,
    .breadcrumbs button:focus-visible {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    .breadcrumbs [aria-current] {
      padding: 2px 4px;
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .crumb-sep {
      opacity: 0.6;
    }
    /* wizard: step counter, progress bar, Back / Next. */
    .wizard-head {
      padding: 12px 16px 4px;
    }
    .wizard-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }
    .wizard-title {
      font-size: 16px;
      font-weight: 500;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .wizard-count {
      flex-shrink: 0;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .wizard-subtitle {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .wizard-progress {
      margin-top: 8px;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color, rgba(127, 127, 127, 0.25));
      overflow: hidden;
    }
    .wizard-progress > div {
      height: 100%;
      border-radius: 3px;
      background: var(--tabdeck-accent, var(--primary-color));
      transition: width 0.25s ease;
    }
    .wizard-foot {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 4px 16px 12px;
    }
    .wizard-foot button {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      border: none;
      border-radius: 18px;
      padding: 8px 14px;
      min-height: 36px;
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .wizard-back {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      color: var(--primary-text-color);
    }
    .wizard-back[disabled] {
      visibility: hidden;
    }
    .wizard-next {
      background: var(--tabdeck-accent, var(--primary-color));
      color: var(--text-primary-color, #fff);
    }
    @media (prefers-reduced-motion: reduce) {
      .wizard-progress > div {
        transition: none;
      }
    }
    /* popup: one tab in a dialog over the page. */
    .popup-backdrop {
      position: fixed;
      inset: 0;
      z-index: 2147481000;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    }
    .popup-dialog {
      width: min(var(--tabdeck-popup-width, 640px), 100%);
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      overflow: hidden;
    }
    .popup-head {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 8px 8px 16px;
      min-height: 48px;
      box-sizing: border-box;
    }
    .popup-title {
      flex: 1;
      font-size: 17px;
      font-weight: 500;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .popup-close {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 8px;
      border-radius: 50%;
      display: inline-flex;
    }
    .popup-body {
      overflow-y: auto;
      padding: 0 8px 8px;
    }
    /* entity_search: a command palette over the page. */
    .es-backdrop {
      position: fixed;
      inset: 0;
      z-index: 2147482000;
      background: rgba(0, 0, 0, 0.32);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 12vh;
    }
    .es-panel {
      width: min(560px, calc(100vw - 32px));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 14px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      overflow: hidden;
    }
    .es-field {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      color: var(--secondary-text-color);
    }
    .es-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 16px;
    }
    .es-field kbd {
      font: 11px var(--code-font-family, monospace);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
    }
    .es-results {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding: 6px;
      max-height: 50vh;
      overflow-y: auto;
    }
    .es-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      text-align: start;
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
    }
    .es-item.active,
    .es-item:hover {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
    }
    .es-name {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .es-name small {
      color: var(--secondary-text-color);
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .es-tab {
      flex-shrink: 0;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 99px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .es-empty {
      padding: 12px;
      color: var(--secondary-text-color);
    }
    /* overview: every tab as a live thumbnail. */
    .overview {
      padding: 8px 12px 12px;
    }
    .ov-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
    }
    .ov-title {
      font-weight: 500;
      font-size: 15px;
    }
    .ov-close {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 6px;
      border-radius: 50%;
      display: inline-flex;
    }
    .ov-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--tabdeck-overview-min, 140px), 1fr));
      gap: 12px;
    }
    .ov-tile {
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
      min-width: 0;
      width: 100%;
    }
    .ov-frame {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      outline: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ov-tile.current .ov-frame {
      outline: 2px solid var(--tabdeck-accent, var(--primary-color));
    }
    .ov-tile:focus-visible {
      outline: none;
    }
    .ov-tile:focus-visible .ov-frame {
      outline: 3px solid var(--primary-color);
    }
    .ov-live {
      position: absolute;
      top: 0;
      left: 0;
      width: 300%;
      transform: scale(calc(1 / 3));
      transform-origin: 0 0;
      pointer-events: none;
    }
    .ov-lock {
      --mdc-icon-size: 32px;
      color: var(--secondary-text-color);
    }
    .ov-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      min-width: 0;
      --mdc-icon-size: 18px;
    }
    .ov-label span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* idle_dim: a full-screen layer over the whole dashboard. */
    .screensaver {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: none;
      touch-action: none;
      animation: tabdeck-saver-in 1.2s ease;
    }
    .screensaver.mode-black,
    .screensaver.mode-clock {
      background: #000;
    }
    .saver-clock {
      color: rgba(255, 255, 255, 0.85);
      text-align: center;
      font-variant-numeric: tabular-nums;
      user-select: none;
    }
    .saver-time {
      font-size: clamp(64px, 18vw, 220px);
      font-weight: 200;
      line-height: 1;
    }
    .saver-date {
      margin-top: 12px;
      font-size: clamp(16px, 3vw, 32px);
      opacity: 0.7;
    }
    @keyframes tabdeck-saver-in {
      from {
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .screensaver {
        animation: none;
      }
    }
    /* pip: a tab switched away from keeps its card in a corner window. */
    .panel.pip {
      position: fixed;
      inset-inline-end: var(--tabdeck-pip-right, 16px);
      bottom: calc(var(--tabdeck-pip-bottom, 16px) + env(safe-area-inset-bottom, 0px));
      z-index: 7;
      width: var(--tabdeck-pip-width, min(320px, 45vw));
      max-height: var(--tabdeck-pip-max-height, 40vh);
      overflow: hidden;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      animation: tabdeck-preview-in 150ms ease-out;
    }
    .root.docked .panel.pip {
      bottom: calc(var(--tabdeck-pip-bottom, 16px) + 72px + env(safe-area-inset-bottom, 0px));
    }
    /* The card inside is for looking at; a tap opens the tab. */
    .panel.pip > :not(.pip-bar) {
      pointer-events: none;
    }
    .pip-bar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .pip-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pip-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: none;
      color: inherit;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .pip-close:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    @media (prefers-reduced-motion: reduce) {
      .panel.pip {
        animation: none;
      }
    }
    /* compare: the open tab and the compared one side by side (stacked when
       narrow); the open tab first, everything else in the content full width. */
    .content.comparing {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--tabdeck-compare-min, 200px)), 1fr));
      gap: var(--tabdeck-compare-gap, 12px);
      align-items: start;
    }
    .content.comparing > :not(.panel) {
      grid-column: 1 / -1;
    }
    .content.comparing > .panel {
      order: 1;
      min-width: 0;
    }
    .content.comparing > .panel.compare {
      order: 2;
    }
    .compare-title {
      display: flex;
      align-items: center;
      gap: 6px;
      align-self: flex-start;
      width: fit-content;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0 0 8px;
      padding: 2px 4px 2px 10px;
      min-height: 28px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .compare-title.main {
      padding-inline-end: 10px;
      color: var(--tabdeck-accent, var(--primary-color));
      background: color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 14%, transparent);
    }
    .compare-title ha-icon {
      --mdc-icon-size: 16px;
    }
    .compare-title span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .compare-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: none;
      color: inherit;
      cursor: pointer;
    }
    .compare-close ha-icon {
      --mdc-icon-size: 16px;
    }
    .compare-close:hover {
      background: rgba(127, 127, 127, 0.2);
    }
    /* hold_peek: the held tab's content floats over the active one. */
    .panel.preview {
      position: absolute;
      top: 8px;
      inset-inline: 8px;
      z-index: 6;
      max-height: 70vh;
      overflow: hidden;
      padding: 8px;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      animation: tabdeck-preview-in 150ms ease-out;
    }
    .preview-title {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      padding: 0 4px 6px;
    }
    @keyframes tabdeck-preview-in {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .panel.preview {
        animation: none;
      }
    }
    /* swipe_peek: the neighbour panel shown beside the dragged one. */
    .content.dragging {
      overflow: hidden;
      touch-action: pan-y;
    }
    .panel.peek[hidden] {
      display: block;
      position: absolute;
      inset-inline: 0;
      pointer-events: none;
    }
    .content.has-bg > .panel.peek {
      inset-inline: 12px;
    }
    .content.with-arrows > .panel.peek {
      inset-inline: var(--tabdeck-arrow-gutter, 40px);
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
  `}};Ks([_t()],Nr.prototype,"_config",void 0),Ks([_t()],Nr.prototype,"_selected",void 0),Ks([_t()],Nr.prototype,"_built",void 0),Ks([_t()],Nr.prototype,"_width",void 0),Ks([_t()],Nr.prototype,"_collapsed",void 0),Ks([_t()],Nr.prototype,"_fullscreen",void 0),Ks([_t()],Nr.prototype,"_genTabs",void 0),Ks([_t()],Nr.prototype,"_portrait",void 0),Ks([_t()],Nr.prototype,"_barHidden",void 0),Ks([_t()],Nr.prototype,"_dimmed",void 0),Ks([_t()],Nr.prototype,"_takeover",void 0),Ks([_t()],Nr.prototype,"_offline",void 0),Ks([_t()],Nr.prototype,"_pinFor",void 0),Ks([_t()],Nr.prototype,"_layout",void 0),Ks([_t()],Nr.prototype,"_pipTab",void 0),Ks([_t()],Nr.prototype,"_share",void 0),Ks([_t()],Nr.prototype,"_compareTab",void 0),Ks([_t()],Nr.prototype,"_previewIndex",void 0),Ks([_t()],Nr.prototype,"_learnedNotice",void 0),Ks([_t()],Nr.prototype,"_overview",void 0),Ks([_t()],Nr.prototype,"_popupTab",void 0),Ks([_t()],Nr.prototype,"_esOpen",void 0),Ks([_t()],Nr.prototype,"_esQuery",void 0),Ks([_t()],Nr.prototype,"_esActive",void 0),Ks([_t()],Nr.prototype,"_panelState",void 0),Ks([_t()],Nr.prototype,"_errors",void 0),Nr=Ks([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("tabdeck-card")],Nr),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{Nr as TabdeckCard};