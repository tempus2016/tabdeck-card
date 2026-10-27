var t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=/* @__PURE__ */new WeakMap,r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}},o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,b=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!n(t,e),v={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=/* @__PURE__ */new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=/* @__PURE__ */new Map,x[f("finalized")]=/* @__PURE__ */new Map,m?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");var k=globalThis,w=t=>t,$=k.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,E=`<${z}>`,O=document,T=()=>O.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,j=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,D=/^(?:script|style|textarea|title)$/i,U=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=U(1),q=(U(2),U(3),Symbol.for("lit-noChange")),V=Symbol.for("lit-nothing"),K=/* @__PURE__ */new WeakMap,W=O.createTreeWalker(O,129);function G(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}var X=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=R;for(let n=0;n<i;n++){const e=t[n];let i,c,d=-1,l=0;for(;l<e.length&&(a.lastIndex=l,c=a.exec(e),null!==c);)l=a.lastIndex,a===R?"!--"===c[1]?a=I:void 0!==c[1]?a=j:void 0!==c[2]?(D.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=L):void 0!==c[3]&&(a=L):a===L?">"===c[0]?(a=r??R,d=-1):void 0===c[1]?d=-2:(d=a.lastIndex-c[2].length,i=c[1],a=void 0===c[3]?L:'"'===c[3]?H:B):a===H||a===B?a=L:a===I||a===j?a=R:(a=L,r=void 0);const h=a===L&&t[n+1].startsWith("/>")?" ":"";o+=a===R?e+E:d>=0?(s.push(i),e.slice(0,d)+A+e.slice(d)+C+h):e+C+(-2===d?n:h)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]},Y=class t{constructor({strings:e,_$litType$:i},s){let r;this.parts=[];let o=0,a=0;const n=e.length-1,c=this.parts,[d,l]=X(e,i);if(this.el=t.createElement(d,s),W.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=W.nextNode())&&c.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(A)){const e=l[a++],i=r.getAttribute(t).split(C),s=/([.?@])?(.*)/.exec(e);c.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?st:tt}),r.removeAttribute(t)}else t.startsWith(C)&&(c.push({type:6,index:o}),r.removeAttribute(t));if(D.test(r.tagName)){const t=r.textContent.split(C),e=t.length-1;if(e>0){r.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),W.nextNode(),c.push({type:2,index:++o});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===z)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(C,t+1));)c.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}};function Z(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}var J=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new rt(r,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(r=W.nextNode(),o++)}return W.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Q=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Y(t)),e}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const o of e)r===i.length?i.push(s=new t(this.O(T()),this.O(T()),this,this.options)):s=i[r],s._$AI(o),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=Z(this,s[i+a],e,a),n===q&&(n=this._$AH[a]),o||=!M(n)||n!==this._$AH[a],n===V?t=V:t!==V&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}},it=class extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}},st=class extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===q)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}},ot=k.litHtmlPolyfillSupport;ot?.(Y,Q),(k.litHtmlVersions??=[]).push("3.3.3");var at=globalThis,nt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};nt._$litElement$=!0,nt.finalized=!0,at.litElementHydrateSupport?.({LitElement:nt});var ct=at.litElementPolyfillSupport;ct?.({LitElement:nt}),(at.litElementVersions??=[]).push("4.2.2");var dt,lt,ht={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:y},pt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=/* @__PURE__ */new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return ut({...t,state:!0,attribute:!1})}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(dt||(dt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(lt||(lt={}));var bt=["closed","locked","off"],mt=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r},ft=t=>{mt(window,"haptic",t)},gt=(t,e,i,s)=>{if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(t=>t.user===e.user.id)||(ft("warning"),confirm(s.confirmation.text||`Are you sure you want to ${s.action}?`)))switch(s.action){case"more-info":(i.entity||i.camera_image)&&mt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&((t,e,i=!1)=>{i?history.replaceState(null,"",e):history.pushState(null,"",e),mt(window,"location-changed",{replace:i})})(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(((t,e)=>{((t,e,i=!0)=>{const s=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===s?"homeassistant":s;let o;switch(s){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(r,o,{entity_id:e})})(t,e,bt.includes(t.states[e].state))})(e,i.entity),ft("success"));break;case"call-service":{if(!s.service)return void ft("failure");const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target),ft("success");break}case"fire-dom-event":mt(t,"ll-custom",s)}};function yt(t){if(!t||"object"!=typeof t)return;const e={},i=Number(t.precision);void 0!==t.precision&&Number.isInteger(i)&&i>=0&&i<=6&&(e.precision=i);const s=Number(t.max);return void 0!==t.max&&Number.isFinite(s)&&(e.max=s),"string"==typeof t.unit&&(e.unit=t.unit),e}function vt(t,e){if(void 0===t||!e||!function(t){return""!==t.trim()&&Number.isFinite(Number(t))}(t))return t;const i=Number(t);let s;return s=void 0!==e.max&&i>e.max?`${e.max}+`:void 0!==e.precision?i.toFixed(e.precision):t.trim(),e.unit?s+e.unit:s}var xt=["default","ios","material","glass","minimal","rail","neumorphic","ha-tile","mushroom","bubble","fluent","material-you"],kt={position:"top",style:"underline",align:"start",tab_display:"both",badge_display:"text",indicator_size:3,indicator_radius:void 0,elevation:!1,sticky:!1,bar_background:void 0,styles:{}},wt={default:{},ios:{style:"segmented",align:"justify",indicator_radius:8,bar_background:"var(--secondary-background-color, #efefef)",styles:{"--tabdeck-tab-height":"36px"}},material:{style:"underline",align:"justify",elevation:!0},glass:{style:"pill",sticky:!0,bar_background:"color-mix(in srgb, var(--card-background-color, #fff) 60%, transparent)",styles:{"--tabdeck-bar-backdrop":"blur(12px)"}},minimal:{style:"text",tab_display:"label",badge_display:"dot"},rail:{position:"left",style:"rail",tab_display:"icon"},neumorphic:{style:"pill",align:"justify",indicator_radius:14,bar_background:"var(--card-background-color, #e0e5ec)",styles:{"--tabdeck-bar-shadow":"inset 3px 3px 7px rgba(0, 0, 0, 0.18), inset -3px -3px 7px rgba(255, 255, 255, 0.06)","--tabdeck-indicator-color":"var(--card-background-color, #e0e5ec)","--tabdeck-selected-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-indicator-shadow":"3px 3px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px rgba(255, 255, 255, 0.06)","--tabdeck-tab-height":"44px"}},"ha-tile":{style:"boxed",indicator_radius:12,styles:{"--tabdeck-tab-height":"52px","--tabdeck-tab-font-weight":"500"}},mushroom:{style:"pill",indicator_radius:12,styles:{"--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"500","--tabdeck-tab-radius":"12px"}},bubble:{style:"pill",indicator_radius:999,bar_background:"var(--secondary-background-color, rgba(127, 127, 127, 0.12))",styles:{"--tabdeck-indicator-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-selected-badge-background":"var(--card-background-color, #fff)","--tabdeck-selected-badge-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-tab-height":"46px","--tabdeck-tab-font-weight":"500"}},fluent:{style:"underline",indicator_size:3,indicator_radius:2,styles:{"--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"600"}},"material-you":{style:"pill",align:"justify",indicator_radius:20,styles:{"--tabdeck-indicator-color":"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 26%, transparent)","--tabdeck-selected-color":"var(--primary-text-color)","--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"500"}}};function $t(t){return xt.includes(t)}new Set(Object.values(wt).flatMap(t=>Object.keys(t.styles??{})));function St(t){if(!t||!$t(t.preset))return t;const e=function(t){const e=wt[t];return{...kt,...e,styles:{...e.styles??{}}}}(t.preset),i={...e};for(const[s,r]of Object.entries(t))void 0!==r&&(i[s]=r);return i.styles={...e.styles,...t.styles??{}},i}function At(t){if("number"==typeof t)return Number.isFinite(t)&&t>0?`${t}px`:void 0;if("string"!=typeof t)return;const e=t.trim();return""===e||/[;{}"<>]/.test(e)||!/^[\d.]/.test(e)&&!/^(calc|min|max|clamp|var)\(/.test(e)?void 0:e}function Ct(t,e){const i=Array.from({length:Math.max(1,e)},()=>[]),s=i.map(()=>0);return t.forEach((t,e)=>{let r=0;for(let o=1;o<i.length;o++)s[o]<s[r]&&(r=o);i[r].push(e),s[r]+=Math.max(1,Number(t)||1)}),i}var zt=/\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g,Et=/^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;function Ot(t,e){if("item"===e)return t;const i=e.split(".");let s=t;for(let r=1;r<i.length;r++)s=null==s?void 0:s[i[r]];return s}function Tt(t,e,i){if("string"==typeof t){const s=t.match(Et);if(s){const t=s[1];if("index"===t)return i;const r=Ot(e,t);return void 0===r?"":r}return t.replace(zt,(t,s)=>String("index"===s?i:Ot(e,s)??""))}if(Array.isArray(t))return t.map(t=>Tt(t,e,i));if(t&&"object"==typeof t){const s={};for(const r of Object.keys(t))s[r]=Tt(t[r],e,i);return s}return t}var Mt=["areas","labels","floors","domains","devices","todo","calendars","cameras","zones"],Pt={areas:"area",floors:"floor",labels:"label"},Nt={name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"entities",entities:"{{ item.entities }}"}},Rt=new WeakSet([Nt]),It=t=>(Rt.add(t),t),jt={todo:It({name:"{{ item.name }}",icon:"mdi:clipboard-list-outline",badge:"{{ item.id }}",card:{type:"todo-list",entity:"{{ item.id }}"}}),calendars:It({name:"{{ item.name }}",icon:"mdi:calendar",card:{type:"calendar",entities:["{{ item.id }}"],initial_view:"listWeek"}}),cameras:It({name:"{{ item.name }}",icon:"mdi:cctv",card:{type:"picture-entity",entity:"{{ item.id }}",camera_view:"auto",show_state:!1}}),zones:It({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.count }}",card:{type:"map",entities:"{{ item.entities }}"}})};function Lt(t){const e=Pt[t.source];return"tiles"===t.content&&e?It({name:"{{ item.name }}",icon:"{{ item.icon }}",[e]:"{{ item.id }}",...t.domains?.length?{domains:t.domains}:{}}):jt[t.source]??Nt}var Bt={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",media_player:"mdi:television",lock:"mdi:lock",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-blank-circle-outline",person:"mdi:account",scene:"mdi:palette",script:"mdi:script-text",automation:"mdi:robot"},Ht=["light","switch","climate","cover","fan","media_player","lock","camera","vacuum"],Dt=/^[a-z0-9_]+$/,Ut=/^[a-z0-9_]+(\.[a-z0-9_]+)?$/;function Ft(t){return"["+t.map(t=>`'${t}'`).join(", ")+"]"}var qt=["{%- set ns = namespace(out=[]) -%}"],Vt=["{{ ns.out | tojson }}"];function Kt(t){const e=(t.domains??[]).map(String).filter(t=>Dt.test(t)),i=Ft((t.exclude??[]).map(String).filter(t=>Ut.test(t))),s=e.length?` | select('match', '^(${e.join("|")})\\\\.')`:"",r=t=>`{%- set ns.out = ns.out + [{${t}}] -%}`,o=t=>["{%- if ents | count > 0 -%}",r(t),"{%- endif -%}"];switch(t.source){case"areas":case"labels":{const e="areas"===t.source,r=e?"mdi:texture-box":"mdi:label-outline";return[...qt,`{%- for id in ${e?"areas()":"labels()"} if id not in ${i} -%}`,`{%- set ents = ${e?"area_entities":"label_entities"}(id)${s} | list -%}`,...o(`'id': id, 'name': ${e?"area_name":"label_name"}(id), 'icon': '${r}', 'entities': ents`),"{%- endfor -%}",...Vt].join("\n")}case"floors":return[...qt,`{%- for id in floors() if id not in ${i} -%}`,"{%- set acc = namespace(l=[]) -%}","{%- for a in floor_areas(id) -%}{%- set acc.l = acc.l + (area_entities(a) | list) -%}{%- endfor -%}",`{%- set ents = acc.l${s} | list -%}`,...o("'id': id, 'name': floor_name(id), 'icon': 'mdi:home-floor-1', 'entities': ents"),"{%- endfor -%}",...Vt].join("\n");case"domains":{const t=e.length?e:Ht;return[...qt,`{%- set icons = ${a=Bt,"{"+Object.entries(a).map(([t,e])=>`'${t}': '${e}'`).join(", ")+"}"} -%}`,`{%- for id in ${Ft(t)} if id not in ${i} -%}`,"{%- set ents = states[id] | map(attribute='entity_id') | list -%}",...o("'id': id, 'name': id | replace('_', ' ') | capitalize, 'icon': icons.get(id, 'mdi:shape'), 'entities': ents"),"{%- endfor -%}",...Vt].join("\n")}case"devices":return[...qt,"{%- for id in states | map(attribute='entity_id') | map('device_id') | reject('none') | unique | list -%}",`{%- if id not in ${i} -%}`,`{%- set ents = device_entities(id)${s} | list -%}`,...o("'id': id, 'name': device_attr(id, 'name_by_user') or device_attr(id, 'name'), 'icon': 'mdi:devices', 'entities': ents"),"{%- endif -%}","{%- endfor -%}","{{ ns.out | sort(attribute='name') | tojson }}"].join("\n");case"todo":case"calendars":case"cameras":{const e={todo:"todo",calendars:"calendar",cameras:"camera"}[t.source];return[...qt,`{%- for s in states.${e} if s.entity_id not in ${i} -%}`,r("'id': s.entity_id, 'name': s.name"),"{%- endfor -%}",...Vt].join("\n")}case"zones":return[...qt,`{%- for z in states.zone if z.entity_id not in ${i} -%}`,"{%- set key = 'home' if z.entity_id == 'zone.home' else z.name -%}","{%- set people = states.person | selectattr('state', 'eq', key) | map(attribute='entity_id') | list -%}",r("'id': z.entity_id, 'name': z.name, 'icon': z.attributes.icon or 'mdi:map-marker-radius', 'entities': [z.entity_id] + people, 'count': people | count | string"),"{%- endfor -%}",...Vt].join("\n")}var a}var Wt=["selection","light","medium","heavy","success","warning","failure"],Gt={style:"text",align:"start",styles:{"--tabdeck-tab-height":"36px","--tabdeck-tab-font-size":"13px"}},Xt=["top","bottom","left","right"],Yt=["underline","pill","segmented","boxed","text","rail"],Zt=["none","browser","url","entity"],Jt=["both","icon","label","active","dots"],Qt=["start","center","end","justify"],te=["text","dot"],ee=["none","fade","slide","scale","flip","rise"];function ie(t,e,i){return e.includes(t)?t:i}function se(t,e,i,s){const r=Number(t);return Number.isFinite(r)?Math.min(i,Math.max(e,r)):s}function re(t){if(t)return"string"==typeof t?{entity:t}:"object"==typeof t&&"string"==typeof t.entity?void 0===t.state?{entity:t.entity}:{entity:t.entity,state:String(t.state)}:void 0}function oe(t){return t&&"object"==typeof t&&t.action&&"none"!==t.action?t:void 0}function ae(t){const e=t?.attributes??{};let i,s=t?.card??{};if(Array.isArray(t?.children)&&t.children.length>0){const e="menu"===t.children_display?"menu":"row",r=t.children_options&&"object"==typeof t.children_options?t.children_options:{};s={type:"custom:tabdeck-card",...Gt,...r,hide_bar:"menu"===e,tabs:t.children},i={display:e,items:t.children.map(t=>({name:t?.name??t?.attributes?.label,icon:t?.icon}))}}else if("sections"===t?.layout&&Array.isArray(t?.sections)&&t.sections.length>0){const e=Number(t?.max_columns);s={type:"custom:tabdeck-sections-card",max_columns:Number.isFinite(e)&&e>=1?Math.round(e):4,sections:t.sections}}else if(Array.isArray(t?.cards)&&t.cards.length>0){const e=Number(t?.columns),i=Number(t?.min_column_width);s="masonry"===t?.layout?{type:"custom:tabdeck-masonry-card",...Number.isFinite(i)&&i>0?{min_column_width:i}:{columns:Number.isFinite(e)&&e>=1?Math.round(e):2},cards:t.cards}:Number.isFinite(e)&&e>1?{type:"grid",columns:e,square:!1,cards:t.cards}:{type:"vertical-stack",cards:t.cards}}return{name:t?.name??e.label??void 0,subtitle:t?.subtitle??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,color:t?.color??void 0,badge:t?.badge??void 0,badge_color:t?.badge_color??void 0,badge_icon:"string"==typeof t?.badge_icon&&t.badge_icon?t.badge_icon:void 0,ring:void 0===t?.ring||null===t.ring||""===t.ring?void 0:String(t.ring),ring_max:Number(t?.ring_max)>0?Number(t.ring_max):void 0,ring_color:"string"==typeof t?.ring_color&&t.ring_color?t.ring_color:void 0,pin:void 0===t?.pin||null===t.pin||""===t.pin?void 0:String(t.pin),pin_timeout:Number(t?.pin_timeout)>0?Number(t.pin_timeout):void 0,area:"string"==typeof t?.area&&t.area?t.area:void 0,floor:"string"==typeof t?.floor&&t.floor?t.floor:void 0,label:"string"==typeof t?.label&&t.label?t.label:void 0,domains:Array.isArray(t?.domains)&&t.domains.length?t.domains.map(String):void 0,badge_format:yt(t?.badge_format),disabled:!!t?.disabled||void 0,fab:!!t?.fab||void 0,card_size:"number"==typeof t?.card_size?t.card_size:void 0,hold_action:t?.hold_action??void 0,badge_action:t?.badge_action??void 0,tap_action:t?.tap_action&&"object"==typeof t.tap_action&&"none"!==t.tap_action.action?t.tap_action:void 0,enter_action:oe(t?.enter_action),leave_action:oe(t?.leave_action),auto_select:re(t?.auto_select),default_if:t?.default_if??void 0,visibility:t?.visibility??void 0,alert:Array.isArray(t?.alert)&&t.alert.length>0?t.alert:void 0,background:"string"==typeof t?.background&&t.background.trim()?t.background:void 0,layout:"masonry"===t?.layout&&Array.isArray(t?.cards)&&t.cards.length>0?"masonry":"sections"===t?.layout&&Array.isArray(t?.sections)&&t.sections.length>0&&!i?"sections":void 0,styles:t?.styles&&"object"==typeof t.styles&&!Array.isArray(t.styles)?t.styles:void 0,icon_animation:"string"==typeof t?.icon_animation&&t.icon_animation?t.icon_animation:void 0,picture:"string"==typeof t?.picture&&t.picture.trim()?t.picture.trim():void 0,font_size:At(t?.font_size),font_weight:de(t?.font_weight),font_family:de(t?.font_family),use:"string"==typeof t?.use&&t.use?t.use:void 0,vars:t?.vars&&"object"==typeof t.vars&&!Array.isArray(t.vars)?t.vars:void 0,group:i,children:i?t.children:void 0,children_display:i?i.display:void 0,children_options:i&&t.children_options&&"object"==typeof t.children_options?t.children_options:void 0,card:s}}function ne(t){return!!t?.tap_action}function ce(t){const e="object"==typeof t&&null!==t?t:{interval:t},i=Number(e.interval);if(Number.isFinite(i)&&!(i<=0))return{interval:Math.max(2,i),resume_after:se(e.resume_after,0,86400,60)}}function de(t){return"number"==typeof t&&Number.isFinite(t)?String(t):"string"==typeof t&&t.trim()&&!/[;{}<>]/.test(t)?t.trim():void 0}function le(t){return t&&"object"==typeof t&&!Array.isArray(t)&&Object.keys(t).length?t:void 0}function he(t){return Array.isArray(t)&&t.length>0?t:void 0}function pe(t){return"tallest"===t?"tallest":At(t)??"auto"}function ue(t){const e="object"==typeof t&&null!==t?t:{min_width:t},i=Number(e.min_width);if(Number.isFinite(i)&&!(i<=0))return{min_width:i,columns:Math.round(se(e.columns,2,4,2))}}function _e(t,e){const i={...t,...e};return(t.styles||e.styles)&&(i.styles={...t.styles??{},...e.styles??{}}),i}function be(t,e,i){if(!t||"object"!=typeof t)return t;let s=t;const r="string"==typeof t.use?e?.[t.use]:void 0;if(r&&"object"==typeof r&&(s=_e(Tt(r,t.vars??{},0),t)),i){const{name:t,card:e,cards:r,...o}=i;s=_e(o,s)}return s}function me(t,e={}){t=St(t);const i=le(t?.tab_defaults),s=le(t?.tab_templates),r=Array.isArray(t?.tabs)?t.tabs:[],o=!1===e.expand?r:r.map(t=>be(t,s,i)),a=function(t){if(t&&"object"==typeof t){if(Mt.includes(t.source)){const e=Array.isArray(t.domains)?t.domains.map(String):void 0,i=Array.isArray(t.exclude)?t.exclude.map(String):void 0,s="tiles"===t.content?"tiles":void 0;return{source:t.source,domains:e,exclude:i,content:s,template:Kt({source:t.source,domains:e,exclude:i}),tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:Lt({source:t.source,content:s,domains:e})}}if("string"==typeof t.template&&""!==t.template.trim())return{template:t.template,tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:void 0}}}(t?.auto_tabs);if(0===o.length&&!a)throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");const n=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:n,position:ie(t?.position,Xt,"top"),style:ie(t?.style,Yt,"underline"),tab_display:ie(t?.tab_display,Jt,"both"),align:ie(t?.align,Qt,"start"),badge_display:ie(t?.badge_display,te,"text"),hide_inactive_badge:Boolean(t?.hide_inactive_badge),badge_format:yt(t?.badge_format),transition:ie(t?.transition,ee,"none"),indicator_size:se(t?.indicator_size,1,16,3),indicator_radius:void 0===t?.indicator_radius?void 0:se(t?.indicator_radius,0,999,0),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:ie(t?.remember,Zt,"none"),remember_entity:t?.remember_entity??void 0,storage_key:t?.storage_key??void 0,lazy:Boolean(t?.lazy),unmount_hidden:Boolean(t?.unmount_hidden),swipe_wrap:Boolean(t?.swipe_wrap),swipe_mouse:Boolean(t?.swipe_mouse),animated:void 0===t?.animated||Boolean(t.animated),accent_indicator:void 0===t?.accent_indicator||Boolean(t.accent_indicator),header:Boolean(t?.header),aria_label:t?.aria_label??void 0,sticky:Boolean(t?.sticky),elevation:Boolean(t?.elevation),scroll_buttons:Boolean(t?.scroll_buttons),overflow_menu:Boolean(t?.overflow_menu),bar_background:t?.bar_background??void 0,swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:o.map(ae),auto_tabs:a,auto_rotate:ce(t?.auto_rotate),scroll_spy:Boolean(t?.scroll_spy),split:ue(t?.split),tab_display_narrow:Jt.includes(t?.tab_display_narrow)?t.tab_display_narrow:void 0,narrow_width:se(t?.narrow_width,100,4e3,450),preset:$t(t?.preset)?t.preset:void 0,collapsible:Boolean(t?.collapsible),start_collapsed:Boolean(t?.collapsible&&t?.start_collapsed),idle_return:Number(t?.idle_return)>0?Math.max(5,Number(t.idle_return)):void 0,dock:Boolean(t?.dock),content_arrows:Boolean(t?.content_arrows),hide_bar:Boolean(t?.hide_bar),search:Boolean(t?.search),hotkeys:Boolean(t?.hotkeys),history:Boolean(t?.history),customize:Boolean(t?.customize),rail_expand:Boolean(t?.rail_expand),edit_mode_reveal:void 0===t?.edit_mode_reveal||Boolean(t.edit_mode_reveal),transition_duration:se(t?.transition_duration,0,2e3,180),transition_narrow:ee.includes(t?.transition_narrow)?t.transition_narrow:void 0,transition_easing:"string"==typeof t?.transition_easing&&t.transition_easing.trim()&&!/[;{}"<>]/.test(t.transition_easing)?t.transition_easing.trim():"ease",content_height:pe(t?.content_height),content_max_height:At(t?.content_max_height),header_cards:he(t?.header_cards),footer_cards:he(t?.footer_cards),fullscreen:Boolean(t?.fullscreen),swipe_peek:Boolean(t?.swipe_peek),alert_first:Boolean(t?.alert_first),alert_snooze:Number(t?.alert_snooze)>0?Number(t.alert_snooze):void 0,default_by_time:le(t?.default_by_time),default_by_device:le(t?.default_by_device),fire_event:Boolean(t?.fire_event),event_id:"string"==typeof t?.event_id&&t.event_id?t.event_id:void 0,remote_entity:"string"==typeof t?.remote_entity&&t.remote_entity?t.remote_entity:void 0,remote_event:Boolean(t?.remote_event),tab_defaults:i,tab_templates:s,debug:Boolean(t?.debug),haptic:!0===t?.haptic?"selection":Wt.includes(t?.haptic)?t.haptic:void 0,density:"compact"===t?.density||"comfortable"===t?.density?t.density:"default",unload_after:Number(t?.unload_after)>0?Math.max(1,Number(t.unload_after)):void 0}}function fe(t){const e=t.default_tab;if("string"==typeof e){const i=t.tabs.findIndex(t=>t.name===e);return i>=0?i:0}return"number"==typeof e&&e>=0&&e<t.tabs.length?e:0}function ge(t){const e=t?.entity_id||t?.entity;return Array.isArray(e)?e.filter(t=>"string"==typeof t&&t):"string"==typeof e&&e?[e]:[]}function ye(t,e,i){const s=ge(t);return s.length>0&&s.every(t=>void 0!==e.states[t]&&i(e.states[t].state))}var ve=["sun","mon","tue","wed","thu","fri","sat"];function xe(t){const e=/^(\d{1,2}):(\d{2})/.exec(String(t));return e?60*Number(e[1])+Number(e[2]):null}function ke(t){return Array.isArray(t?.conditions)?t.conditions:[]}function we(t,e,i){switch(t?.condition){case"state":return function(t,e){return ye(t,e,e=>Array.isArray(t.state)?t.state.includes(e):void 0!==t.state?e===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(e):e!==t.state_not))}(t,e);case"numeric_state":return function(t,e){return ye(t,e,e=>{const i=Number(e);return!Number.isNaN(i)&&(void 0===t.above||i>Number(t.above))&&(void 0===t.below||i<Number(t.below))&&(void 0!==t.above||void 0!==t.below)})}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"time":return function(t,e=/* @__PURE__ */new Date){const i=void 0!==t.after,s=void 0!==t.before,r=Array.isArray(t.weekday)&&t.weekday.length>0;if(!i&&!s&&!r)return!1;const o=60*e.getHours()+e.getMinutes();let a=!0;if(i&&s){const e=xe(t.after),i=xe(t.before);if(null===e||null===i)return!1;a=e<=i?o>=e&&o<i:o>=e||o<i}else if(i){const e=xe(t.after);if(null===e)return!1;a=o>=e}else if(s){const e=xe(t.before);if(null===e)return!1;a=o<e}if(a&&r){const i=ve[e.getDay()];a=t.weekday.map(t=>String(t).toLowerCase().slice(0,3)).includes(i)}return a}(t);case"user":return function(t,e){const i=e?.user?.id;return!(!i||!Array.isArray(t.users))&&t.users.includes(i)}(t,e);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,i);case"and":return ke(t).every(t=>we(t,e,i));case"or":return ke(t).some(t=>we(t,e,i));case"not":return!ke(t).some(t=>we(t,e,i));default:return!1}}function $e(t,e,i){return!t||0===t.length||(!e||t.every(t=>we(t,e,i)))}function Se(t){return"tabdeck-card:"+t}function Ae(t,e,i){return t>=0&&t<e?t:i}function Ce(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ze(t){const{mode:e,cardKey:i,defaultIndex:s,tabCount:r}=t;if("entity"===e){const e=Number(t.entityValue);return void 0!==t.entityValue&&Number.isFinite(e)?Ae(Math.trunc(e),r,s):Ae(s,r,0)}if("url"===e){const e=function(t,e){const i=/(?:^|[#&])tab=([^&]+)/.exec(t||"");if(!i)return null;const s=decodeURIComponent(i[1]),r=e.indexOf(s);if(r>=0)return r;const o=Ce(s),a=o?e.findIndex(t=>Ce(t)===o):-1;if(a>=0)return a;const n=Number(s);return Number.isInteger(n)&&n>=0?n:null}(t.hash??"",t.tabNames??[]);if(null!==e)return Ae(e,r,s)}if("browser"===e){const e=(t.storage??globalThis.localStorage)?.getItem(Se(i));if(null!=e)return Ae(Number(e),r,s)}return Ae(s,r,0)}async function Ee(){const t=await window.loadCardHelpers();return e=>t.createCardElement(e)}var Oe=class extends EventTarget{constructor(t){super(),this._configs=[],this._elements=[],this._create=t}async build(t){this._configs=t.slice(),this._elements=t.map((t,e)=>this._make(t,e))}_make(t,e){if(!t)return;const i=this._create(t);return this._hass&&(i.hass=this._hass),i.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._rebuild(e)}),i}get(t){return this._elements[t]}all(){return this._elements}replace(t,e){this._configs[t]=e,this._elements[t]=this._make(e,t)}unload(t){this._elements[t]=void 0}isLoaded(t){return!!this._elements[t]}ensure(t){return!this._elements[t]&&this._configs[t]&&(this._elements[t]=this._make(this._configs[t],t)),this._elements[t]}setHass(t){this._hass=t;for(const e of this._elements)e&&(e.hass=t)}notifyVisible(t){const e=this._elements[t];e&&e.dispatchEvent(new Event("resize"))}async _rebuild(t){const e=this._make(this._configs[t],t);e&&(this._hass&&(e.hass=this._hass),this._elements[t]=e,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:t}})))}};function Te(t){return"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}var Me=class extends EventTarget{constructor(t){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[i,s]of this._entries)e.has(i)||(s.unsub(),this._entries.delete(i));for(const i of e){if(this._entries.has(i))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(i,t),t.unsub=this._subscribe(i,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:i}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(i=e.result)?i:"number"==typeof i?0!==i:"string"==typeof i&&["1","true","yes","on","enable"].includes(i.trim().toLowerCase()));var i}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}},Pe={en:{"card.tab_n":"Tab {n}","card.tabs":"Tabs","card.scroll_left":"Scroll left","card.scroll_right":"Scroll right","card.all_tabs":"All tabs","card.badge":"badge: {value}","card.ghost":"Hidden: its visibility conditions aren't met (shown while editing)","card.prev_tab":"Previous tab","card.next_tab":"Next tab","card.search":"Find a tab","card.search_placeholder":"Type to filter…","card.search_none":"No matching tabs","card.customize":"Arrange tabs","card.move_up":"Move {name} up","card.move_down":"Move {name} down","card.hide_tab":"Hide {name}","card.show_tab":"Show {name}","card.reset":"Reset","card.done":"Done","card.fullscreen":"Full screen","card.exit_fullscreen":"Exit full screen","card.no_entities":"No entities here.","card.pin_title":"Enter the code for {tab}","card.pin_label":"Code","card.pin_wrong":"Wrong code","card.cancel":"Cancel","card.open":"Open"},de:{"card.tab_n":"Tab {n}","card.tabs":"Tabs","card.scroll_left":"Nach links scrollen","card.scroll_right":"Nach rechts scrollen","card.all_tabs":"Alle Tabs","card.badge":"Badge: {value}","card.ghost":"Ausgeblendet: Sichtbarkeitsbedingungen nicht erfüllt (beim Bearbeiten sichtbar)","card.prev_tab":"Vorheriger Tab","card.next_tab":"Nächster Tab","card.search":"Tab suchen","card.search_placeholder":"Zum Filtern tippen…","card.search_none":"Keine passenden Tabs","card.customize":"Tabs anordnen","card.move_up":"{name} nach oben","card.move_down":"{name} nach unten","card.hide_tab":"{name} ausblenden","card.show_tab":"{name} einblenden","card.reset":"Zurücksetzen","card.done":"Fertig","card.fullscreen":"Vollbild","card.exit_fullscreen":"Vollbild beenden","card.no_entities":"Hier gibt es keine Entitäten.","card.pin_title":"Code für {tab} eingeben","card.pin_label":"Code","card.pin_wrong":"Falscher Code","card.cancel":"Abbrechen","card.open":"Öffnen"},es:{"card.tab_n":"Pestaña {n}","card.tabs":"Pestañas","card.scroll_left":"Desplazar a la izquierda","card.scroll_right":"Desplazar a la derecha","card.all_tabs":"Todas las pestañas","card.badge":"distintivo: {value}","card.ghost":"Oculta: no se cumplen sus condiciones de visibilidad (se muestra al editar)","card.prev_tab":"Pestaña anterior","card.next_tab":"Pestaña siguiente","card.search":"Buscar una pestaña","card.search_placeholder":"Escribe para filtrar…","card.search_none":"No hay pestañas que coincidan","card.customize":"Organizar pestañas","card.move_up":"Subir {name}","card.move_down":"Bajar {name}","card.hide_tab":"Ocultar {name}","card.show_tab":"Mostrar {name}","card.reset":"Restablecer","card.done":"Listo","card.fullscreen":"Pantalla completa","card.exit_fullscreen":"Salir de pantalla completa","card.no_entities":"No hay entidades aquí.","card.pin_title":"Introduce el código de {tab}","card.pin_label":"Código","card.pin_wrong":"Código incorrecto","card.cancel":"Cancelar","card.open":"Abrir"},fr:{"card.tab_n":"Onglet {n}","card.tabs":"Onglets","card.scroll_left":"Défiler vers la gauche","card.scroll_right":"Défiler vers la droite","card.all_tabs":"Tous les onglets","card.badge":"badge : {value}","card.ghost":"Masqué : ses conditions de visibilité ne sont pas remplies (affiché pendant la modification)","card.prev_tab":"Onglet précédent","card.next_tab":"Onglet suivant","card.search":"Rechercher un onglet","card.search_placeholder":"Tapez pour filtrer…","card.search_none":"Aucun onglet correspondant","card.customize":"Organiser les onglets","card.move_up":"Monter {name}","card.move_down":"Descendre {name}","card.hide_tab":"Masquer {name}","card.show_tab":"Afficher {name}","card.reset":"Réinitialiser","card.done":"Terminé","card.fullscreen":"Plein écran","card.exit_fullscreen":"Quitter le plein écran","card.no_entities":"Aucune entité ici.","card.pin_title":"Saisissez le code pour {tab}","card.pin_label":"Code","card.pin_wrong":"Code incorrect","card.cancel":"Annuler","card.open":"Ouvrir"},it:{"card.tab_n":"Tab {n}","card.tabs":"Tab","card.scroll_left":"Scorri a sinistra","card.scroll_right":"Scorri a destra","card.all_tabs":"Tutte le tab","card.badge":"badge: {value}","card.ghost":"Nascosta: le condizioni di visibilità non sono soddisfatte (mostrata durante la modifica)","card.prev_tab":"Tab precedente","card.next_tab":"Tab successiva","card.search":"Cerca una tab","card.search_placeholder":"Digita per filtrare…","card.search_none":"Nessuna tab corrispondente","card.customize":"Organizza le tab","card.move_up":"Sposta su {name}","card.move_down":"Sposta giù {name}","card.hide_tab":"Nascondi {name}","card.show_tab":"Mostra {name}","card.reset":"Ripristina","card.done":"Fatto","card.fullscreen":"Schermo intero","card.exit_fullscreen":"Esci da schermo intero","card.no_entities":"Nessuna entità qui.","card.pin_title":"Inserisci il codice per {tab}","card.pin_label":"Codice","card.pin_wrong":"Codice errato","card.cancel":"Annulla","card.open":"Apri"},nl:{"card.tab_n":"Tab {n}","card.tabs":"Tabs","card.scroll_left":"Naar links scrollen","card.scroll_right":"Naar rechts scrollen","card.all_tabs":"Alle tabs","card.badge":"badge: {value}","card.ghost":"Verborgen: niet aan de zichtbaarheidsvoorwaarden voldaan (getoond tijdens bewerken)","card.prev_tab":"Vorige tab","card.next_tab":"Volgende tab","card.search":"Tab zoeken","card.search_placeholder":"Typ om te filteren…","card.search_none":"Geen overeenkomende tabs","card.customize":"Tabs ordenen","card.move_up":"{name} omhoog","card.move_down":"{name} omlaag","card.hide_tab":"{name} verbergen","card.show_tab":"{name} tonen","card.reset":"Herstellen","card.done":"Klaar","card.fullscreen":"Volledig scherm","card.exit_fullscreen":"Volledig scherm sluiten","card.no_entities":"Hier zijn geen entiteiten.","card.pin_title":"Voer de code voor {tab} in","card.pin_label":"Code","card.pin_wrong":"Onjuiste code","card.cancel":"Annuleren","card.open":"Openen"},pl:{"card.tab_n":"Zakładka {n}","card.tabs":"Zakładki","card.scroll_left":"Przewiń w lewo","card.scroll_right":"Przewiń w prawo","card.all_tabs":"Wszystkie zakładki","card.badge":"plakietka: {value}","card.ghost":"Ukryta: warunki widoczności nie są spełnione (widoczna podczas edycji)","card.prev_tab":"Poprzednia zakładka","card.next_tab":"Następna zakładka","card.search":"Znajdź zakładkę","card.search_placeholder":"Wpisz, aby filtrować…","card.search_none":"Brak pasujących zakładek","card.customize":"Ułóż zakładki","card.move_up":"Przesuń {name} w górę","card.move_down":"Przesuń {name} w dół","card.hide_tab":"Ukryj {name}","card.show_tab":"Pokaż {name}","card.reset":"Resetuj","card.done":"Gotowe","card.fullscreen":"Pełny ekran","card.exit_fullscreen":"Zamknij pełny ekran","card.no_entities":"Brak encji.","card.pin_title":"Wpisz kod dla {tab}","card.pin_label":"Kod","card.pin_wrong":"Nieprawidłowy kod","card.cancel":"Anuluj","card.open":"Otwórz"},pt:{"card.tab_n":"Separador {n}","card.tabs":"Separadores","card.scroll_left":"Deslocar para a esquerda","card.scroll_right":"Deslocar para a direita","card.all_tabs":"Todos os separadores","card.badge":"distintivo: {value}","card.ghost":"Oculto: as condições de visibilidade não são cumpridas (visível ao editar)","card.prev_tab":"Separador anterior","card.next_tab":"Separador seguinte","card.search":"Procurar um separador","card.search_placeholder":"Escreva para filtrar…","card.search_none":"Nenhum separador corresponde","card.customize":"Organizar separadores","card.move_up":"Mover {name} para cima","card.move_down":"Mover {name} para baixo","card.hide_tab":"Ocultar {name}","card.show_tab":"Mostrar {name}","card.reset":"Repor","card.done":"Concluído","card.fullscreen":"Ecrã inteiro","card.exit_fullscreen":"Sair do ecrã inteiro","card.no_entities":"Não há entidades aqui.","card.pin_title":"Introduza o código de {tab}","card.pin_label":"Código","card.pin_wrong":"Código errado","card.cancel":"Cancelar","card.open":"Abrir"}};function Ne(t){return String(t?.locale?.language??t?.language??"en")}function Re(t,e,i){let s=Pe[function(t){if(Pe[t])return t;const e=t.split(/[-_]/)[0].toLowerCase();return Pe[e]?e:"en"}(t)][e]??Pe.en[e]??e;if(i)for(const[r,o]of Object.entries(i))s=s.split(`{${r}}`).join(String(o));return s}var Ie={order:[],hidden:[]},je=t=>`tabdeck-layout:${t}`;function Le(t,e){if(0===e.order.length)return t;const i=t=>{const i=void 0===t.name?-1:e.order.indexOf(t.name);return i<0?Number.MAX_SAFE_INTEGER:i};return t.map((t,e)=>({t:t,i:e})).sort((t,e)=>i(t.t)-i(e.t)||t.i-e.i).map(t=>t.t)}var Be=/* @__PURE__ */new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]),He=/* @__PURE__ */new Set(["primary-text","secondary-text","disabled"]),De=/* @__PURE__ */new Set(["red","pink","purple","indigo","blue","cyan","teal","green","lime","yellow","orange","brown","grey","black","white"]);function Ue(t){if("string"!=typeof t||""===t.trim())return;const e=t.trim();return Be.has(e)||He.has(e)?De.has(e)?`var(--${e}-color, ${e})`:`var(--${e}-color)`:e}function Fe([t,e,i]){const s=t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4};return.2126*s(t)+.7152*s(e)+.0722*s(i)}function qe(t,e){const[i,s]=[Fe(t),Fe(e)].sort((t,e)=>e-t);return(i+.05)/(s+.05)}function Ve(t){const e=function(t){const e=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(t?.trim()??"");return e?[Number(e[1]),Number(e[2]),Number(e[3])]:void 0}(t);if(e)return qe(e,[0,0,0])>=qe(e,[255,255,255])?"#000":"#fff"}var Ke=t=>e=>{customElements.get(t)||customElements.define(t,e)};function We(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}var Ge=/* @__PURE__ */new Set(["","0","off","false","no","none","unavailable","unknown","closed"]);function Xe(t){if(null==t)return!1;const e=String(t).trim().toLowerCase();return(""===e||0!==Number(e))&&!Ge.has(e)}var Ye=class extends nt{constructor(...t){super(...t),this.badgeAction=!1,this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1,this.alert=!1,this.action=!1,this.ghost=!1,this.stacked=!1,this.fab=!1,this.hasMenu=!1,this.ghostLabel="Hidden: its visibility conditions aren't met (shown while editing)",this._onKeydown=t=>{!this.action||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab"),this.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),super.disconnectedCallback()}updated(t){this._applyFont(t),this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected||this.action?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color"),this.ghost?this.title=this.ghostLabel:this.removeAttribute("title"),"dots"===this.display&&this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"),this._applyReadableText()}render(){if("dots"===this.display)return F`<span class="dot" part="dot"></span>`;const t="active"===this.display?this.selected?"both":"icon":this.display,e=!!this.icon||!!this.picture,i="icon"!==t||!e;return F`
      <div class="inner">
        ${"label"!==t&&e?this._renderIcon():V}
        ${i&&this.label?F`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?F`<span class="subtitle">${this.subtitle}</span>`:V}
            </span>`:V}
        ${this._renderBadge()}
        ${this.hasMenu?F`<span class="caret" aria-hidden="true">▾</span>`:V}
        ${this.ghost?F`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`:V}
      </div>
    `}_renderIcon(){const t=this.picture?F`<img class="picture icon" src=${this.picture} alt="" loading="lazy" />`:F`<ha-icon class="icon" icon=${this.icon}></ha-icon>`;return void 0!==this.ring&&null!==this.ring&&Number.isFinite(this.ring)?F`<span class="icon-wrap">
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
    </span>`:t}_applyFont(t){if(t.has("font")){const t=this.font??{};for(const[e,i]of[["size",t.size],["weight",t.weight],["family",t.family]])i?this.style.setProperty(`--tabdeck-tab-font-${e}`,i):this.style.removeProperty(`--tabdeck-tab-font-${e}`)}}_applyReadableText(){const t=this.renderRoot.querySelector(".badge:not(.icon-badge)");if(t){const e=this.badgeColor?Ve(getComputedStyle(t).backgroundColor):void 0;t.style.color=e??""}this.fab&&!this.color&&(this.style.color=Ve(getComputedStyle(this).backgroundColor)??"")}_onBadgeClick(t){this.badgeAction&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("badge-click",{bubbles:!0,composed:!0})))}_renderBadge(){const t=this.badgeColor?`background:${this.badgeColor}`:"",e=this.badgeAction?" clickable":"";return this.badgeIcon&&(void 0===this.badge||Xe(this.badge))?F`<span
        class="badge icon-badge${e}"
        part="badge"
        style=${t}
        aria-label=${this.badgeLabel??`badge: ${this.badge??""}`}
        @click=${this._onBadgeClick}
        ><ha-icon icon=${this.badgeIcon}></ha-icon
      ></span>`:"dot"===this.badgeDisplay?Xe(this.badge)?F`<span class="badge-dot${e}" part="badge-dot" style=${t} @click=${this._onBadgeClick}></span>`:V:this.badge?F`<span
          class="badge${e}"
          part="badge"
          style=${t}
          aria-label=${this.badgeLabel??`badge: ${this.badge}`}
          @click=${this._onBadgeClick}
          >${this.badge}</span>`:V}static{this.styles=o`
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: var(--tabdeck-tab-padding, var(--tabdeck-density-padding, 0 16px));
      height: var(--tabdeck-tab-height, var(--tabdeck-density-height, 48px));
      cursor: pointer;
      color: var(--secondary-text-color);
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
    .badge.clickable,
    .badge-dot.clickable {
      cursor: pointer;
    }
  `}};We([ut()],Ye.prototype,"label",void 0),We([ut()],Ye.prototype,"subtitle",void 0),We([ut()],Ye.prototype,"icon",void 0),We([ut()],Ye.prototype,"badge",void 0),We([ut()],Ye.prototype,"badgeColor",void 0),We([ut({type:Boolean})],Ye.prototype,"badgeAction",void 0),We([ut()],Ye.prototype,"badgeDisplay",void 0),We([ut()],Ye.prototype,"accent",void 0),We([ut()],Ye.prototype,"color",void 0),We([ut({reflect:!0})],Ye.prototype,"display",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"selected",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"disabled",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"alert",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"action",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"ghost",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"stacked",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"fab",void 0),We([ut({type:Boolean,reflect:!0})],Ye.prototype,"hasMenu",void 0),We([ut()],Ye.prototype,"ghostLabel",void 0),We([ut()],Ye.prototype,"badgeLabel",void 0),We([ut({type:Number})],Ye.prototype,"ring",void 0),We([ut()],Ye.prototype,"ringColor",void 0),We([ut()],Ye.prototype,"badgeIcon",void 0),We([ut()],Ye.prototype,"picture",void 0),We([ut({reflect:!0,attribute:"icon-animation"})],Ye.prototype,"iconAnimation",void 0),We([ut({attribute:!1})],Ye.prototype,"font",void 0),Ye=We([Ke("tabdeck-tab")],Ye);var Ze=t=>void 0===t?void 0:(Array.isArray(t)?t:[t]).map(String).filter(t=>""!==t);function Je(t,e){const i=t?.entities?.[e];if(i)return i.area_id||t?.devices?.[i.device_id]?.area_id||void 0}var Qe=/^([01]?\d|2[0-3]):([0-5]\d)$/;var ti="tabdeck-device";function ei(t=("undefined"!=typeof location?location.search:"")){try{const e=new URLSearchParams(t).get("tabdeck_device");return e?(localStorage.setItem(ti,e),e):localStorage.getItem(ti)||localStorage.getItem("browser_mod-browser-id")||void 0}catch{return}}var ii=(t,e)=>`tabdeck-snooze:${t}:${e}`;var si=(t,e)=>`tabdeck-pin:${t}:${e}`;var ri=class extends nt{constructor(...t){super(...t),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this.scrollButtons=!1,this.overflowMenu=!1,this._menuOpen=!1,this._groupOpen=-1,this._groupLeft=0,this.collapsed=!1,this.language="en",this.density="default",this.railExpand=!1,this._railOpen=!1,this.customizable=!1,this.customItems=[],this._customOpen=!1,this.searchable=!1,this.expandable=!1,this._searchOpen=!1,this._query="",this._active=0,this.dock=!1,this._ready=!1,this._overflow=!1,this._resizeRaf=0,this._railEnter=()=>{this._railActive&&(this._railOpen=!0)},this._railLeave=()=>{this._railActive&&!this.matches(":focus-within")&&(this._railOpen=!1)},this._railFocusOut=t=>{if(!this._railActive)return;const e=t.relatedTarget;e&&this.contains(e)||this.matches(":hover")||(this._railOpen=!1)},this._suppressClick=!1,this._onCustomOutside=t=>{const e=this.renderRoot.querySelector(".custom-panel"),i=this.renderRoot.querySelector(".custom-btn"),s=t.composedPath();e&&s.includes(e)||i&&s.includes(i)||this._closeCustom()},this._onSearchOutside=t=>{const e=this.renderRoot.querySelector(".search-panel"),i=this.renderRoot.querySelector(".search-btn"),s=t.composedPath();e&&s.includes(e)||i&&s.includes(i)||this._closeSearch()},this._onOutside=t=>{const e=this.renderRoot.querySelector(".group-menu");if(e&&t.composedPath().includes(e))return;const i=this.renderRoot.querySelectorAll("tabdeck-tab");t.composedPath().includes(i[this._groupOpen])||this._closeGroup()},this._onKeydown=t=>{const e="left"===this.position||"right"===this.position,i=e?"ArrowDown":"ArrowRight",s=e?"ArrowUp":"ArrowLeft";let r=null;t.key===i?r=this._step(this.selected,1):t.key===s?r=this._step(this.selected,-1):"Home"===t.key?r=this._firstEnabled():"End"===t.key&&(r=this._firstEnabled(!0)),null!==r&&(t.preventDefault(),this._select(r))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.setAttribute("aria-label",this.barLabel||Re(this.language,"card.tabs")),this.addEventListener("keydown",this._onKeydown),this.addEventListener("mouseenter",this._railEnter),this.addEventListener("mouseleave",this._railLeave),this.addEventListener("focusin",this._railEnter),this.addEventListener("focusout",this._railFocusOut),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0,this._position()}))}))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),window.removeEventListener("pointerdown",this._onOutside,!0),window.removeEventListener("pointerdown",this._onSearchOutside,!0),window.removeEventListener("pointerdown",this._onCustomOutside,!0),this._resizeObserver?.disconnect(),super.disconnectedCallback()}get _railActive(){return this.railExpand&&!this._horizontal}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_emitAction(t,e){this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:t,kind:e},bubbles:!0,composed:!0}))}_onPointerDown(t){this._suppressClick=!1,this.items[t]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._suppressClick=!0,this._emitAction(t,"hold")},500))}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(t,e){this._cancelHold(),this._suppressClick?this._suppressClick=!1:this.items[t]?.menu?.length?this._toggleGroup(t,e?.currentTarget):this._select(t)}_emitCustomize(t){this.dispatchEvent(new CustomEvent("tabdeck-customize",{detail:t,bubbles:!0,composed:!0}))}_customLayout(t=this.customItems){return{order:t.map(t=>t.key).filter(t=>void 0!==t),hidden:t.filter(t=>t.hidden&&void 0!==t.key).map(t=>t.key)}}_moveCustom(t,e){const i=this.customItems.slice(),s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._emitCustomize(this._customLayout(i)))}_toggleCustomHidden(t){const e=this.customItems.map((e,i)=>i===t?{...e,hidden:!e.hidden}:e);e.every(t=>t.hidden)||this._emitCustomize(this._customLayout(e))}_openCustom(){this._customOpen=!0,window.addEventListener("pointerdown",this._onCustomOutside,!0)}_closeCustom(){this._customOpen=!1,window.removeEventListener("pointerdown",this._onCustomOutside,!0)}_renderCustom(){const t=this.language,e=(e,i)=>Re(t,e,i),i=this.customItems.length;return F`<div
      class="custom-panel"
      role="dialog"
      aria-label=${e("card.customize")}
      @keydown=${t=>{t.stopPropagation(),"Escape"===t.key&&this._closeCustom()}}
    >
      <div class="custom-title">${e("card.customize")}</div>
      ${this.customItems.map((t,s)=>F`<div class="custom-row ${t.hidden?"is-hidden":""}">
          ${t.icon?F`<ha-icon .icon=${t.icon}></ha-icon>`:F`<span class="custom-noicon"></span>`}
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
    </div>`}_matches(t){const e=t=>(t??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),i=e(t).trim();return this.items.map((t,e)=>({index:e,item:t})).filter(({item:t})=>!t.disabled).filter(({item:t})=>!i||e(t.name).includes(i)||e(t.subtitle).includes(i))}openSearch(){this._query="",this._active=0,this._searchOpen=!0,window.addEventListener("pointerdown",this._onSearchOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeSearch(){this._searchOpen=!1,window.removeEventListener("pointerdown",this._onSearchOutside,!0)}_pickSearch(t){this._closeSearch(),this._select(t)}_onSearchKeydown(t){t.stopPropagation();const e=this._matches(this._query);if("Escape"===t.key)this._closeSearch();else if("Enter"===t.key){t.preventDefault();const i=e[this._active]??e[0];i&&this._pickSearch(i.index)}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault();const i=e.length||1;this._active=(this._active+("ArrowDown"===t.key?1:-1)+i)%i}}_renderSearch(){const t=this._matches(this._query),e=this.language;return F`<div class="search-panel" role="dialog" aria-label=${Re(e,"card.search")}>
      <input
        class="search-input"
        type="search"
        placeholder=${Re(e,"card.search_placeholder")}
        aria-label=${Re(e,"card.search")}
        .value=${this._query}
        @input=${t=>{this._query=t.target.value,this._active=0}}
        @keydown=${t=>this._onSearchKeydown(t)}
      />
      <div class="search-results" role="listbox">
        ${t.length?t.map((t,e)=>F`<button
                class="group-item ${e===this._active?"active":""}"
                role="option"
                aria-selected=${e===this._active?"true":"false"}
                @click=${()=>this._pickSearch(t.index)}
              >
                ${t.item.icon?F`<ha-icon .icon=${t.item.icon}></ha-icon>`:""}<span>${t.item.name??""}</span>
              </button>`):F`<div class="search-empty">${Re(e,"card.search_none")}</div>`}
      </div>
    </div>`}_toggleGroup(t,e){if(this._groupOpen===t)return void this._closeGroup();const i=this.renderRoot.querySelector(".bar");this._groupLeft=e?e.offsetLeft-(i?.scrollLeft??0):0,this._groupOpen=t,window.addEventListener("pointerdown",this._onOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".group-item")?.focus())}_closeGroup(){this._groupOpen=-1,window.removeEventListener("pointerdown",this._onOutside,!0)}_pickChild(t,e){this._closeGroup(),this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t,child:e},bubbles:!0,composed:!0}))}_onGroupKeydown(t){const e=[...this.renderRoot.querySelectorAll(".group-item")],i=e.indexOf(t.composedPath()[0]);if("Escape"===t.key){t.stopPropagation();const e=this.renderRoot.querySelectorAll("tabdeck-tab")[this._groupOpen];this._closeGroup(),e?.focus()}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault(),t.stopPropagation();const s=e.length;e[(i+("ArrowDown"===t.key?1:-1)+s)%s]?.focus()}}_renderGroupMenu(){const t=this.items[this._groupOpen];if(!t?.menu)return"";const e=this._groupOpen;return F`<div
      class="group-menu"
      role="menu"
      style="left:${this._groupLeft}px"
      @keydown=${t=>this._onGroupKeydown(t)}
    >
      ${t.menu.map(t=>F`<button class="group-item" role="menuitem" @click=${()=>this._pickChild(e,t.name)}>
          ${t.icon?F`<ha-icon .icon=${t.icon}></ha-icon>`:""}<span>${t.name??""}</span>
        </button>`)}
    </div>`}_selectable(t){const e=this.items[t];return!!e&&!e.disabled&&!e.action}_step(t,e){const i=this.items.length;for(let s=1;s<=i;s++){const r=(t+e*s+i*s)%i;if(this._selectable(r))return r}return t}_firstEnabled(t=!1){const e=this.items.length;for(let i=0;i<e;i++){const s=t?e-1-i:i;if(this._selectable(s))return s}return 0}_position(){const t=this.renderRoot,e=t?.querySelector(".indicator");if(!e)return;const i=(t?.querySelectorAll("tabdeck-tab"))?.[this.selected],s=i?function(t,e,i,s=3){if(!t||t.offsetWidth<=0)return null;const r=s>0?s:3;if("text"===i)return null;if("pill"===i||"segmented"===i||"boxed"===i||"rail"===i)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-r,width:t.offsetWidth,height:r};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:r};case"left":return{left:t.offsetLeft+t.offsetWidth-r,top:t.offsetTop,width:r,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:r,height:t.offsetHeight}}}({offsetLeft:i.offsetLeft,offsetTop:i.offsetTop,offsetWidth:i.offsetWidth,offsetHeight:i.offsetHeight},this.position,this.tabStyle,this.indicatorSize):null;s?(e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`,e.style.height=`${s.height}px`,e.style.opacity="1"):e.style.opacity="0"}_applyReadableSelected(){const t=this.renderRoot?.querySelector?.(".indicator"),e=t&&["pill","boxed"].includes(this.tabStyle)?getComputedStyle(t).backgroundColor:"",i=/^rgb\(/.test(e)||/^rgba\(.*,\s*1\)$/.test(e)?Ve(e):void 0;i?this.style.setProperty("--tabdeck-selected-auto",i):this.style.removeProperty("--tabdeck-selected-auto")}_applyAccent(){const t=this.accentIndicator?this.items[this.selected]?.accent:void 0;t?this.style.setProperty("--tabdeck-accent",t):this.style.removeProperty("--tabdeck-accent"),null!=this.indicatorRadius?this.style.setProperty("--tabdeck-indicator-radius",`${this.indicatorRadius}px`):this.style.removeProperty("--tabdeck-indicator-radius")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background=this.barBackground?"transparent":"var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.setProperty("top","var(--tabdeck-sticky-top, var(--header-height, 0px))"),this.style.bottom="");else for(const t of["position","zIndex","background","top","bottom"])this.style.removeProperty(t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()))}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(){this.setAttribute("aria-label",this.barLabel||Re(this.language,"card.tabs")),this.toggleAttribute("rail-expand",this._railActive),this.toggleAttribute("expanded",this._railActive&&this._railOpen),this._applyAccent(),this._applyReadableSelected(),this._applySticky(),this._position();const t=[...this.renderRoot.querySelectorAll("tabdeck-tab")];Promise.all(t.map(t=>t.updateComplete)).then(()=>this._position()),this._updateOverflow(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}get _horizontal(){return"top"===this.position||"bottom"===this.position}_updateOverflow(){if(!this.scrollButtons&&!this.overflowMenu||!this._horizontal)return void(this._overflow&&(this._overflow=!1));const t=this.renderRoot.querySelector(".bar"),e=!!t&&t.scrollWidth-t.clientWidth>1;e!==this._overflow&&(this._overflow=e)}_scrollBy(t){const e=this.renderRoot.querySelector(".bar");e&&e.scrollBy({left:t*e.clientWidth*.8,behavior:"smooth"})}_pickFromMenu(t){this._menuOpen=!1,this.items[t]?.disabled||this._select(t)}render(){const t=this._ready&&this.animated?" animate":"",e=this.scrollButtons&&this._horizontal&&this._overflow,i=this.overflowMenu&&this._horizontal&&this._overflow;return F`
      <div class="bar-wrap ${e||i||this.searchable||this.customizable||this.expandable?"has-arrows":""}">
      ${e?F`<button class="scroll-btn left" aria-label=${Re(this.language,"card.scroll_left")} @click=${()=>this._scrollBy(-1)}>‹</button>`:""}
      <div
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation?"elevated":""} ${"dots"===this.display?"dots":""}"
        part="bar"
        style=${this.barBackground?`background:${this.barBackground}`:""}
      >
        <div class="indicator${t}" part="indicator"></div>
        ${this.items.map((t,e)=>F`
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
              .alert=${!!t.alert}
              .action=${!!t.action}
              .ghost=${!!t.ghost}
              .fab=${!!t.fab}
              .ring=${t.ring}
              .ringColor=${t.ringColor}
              .badgeIcon=${t.badgeIcon}
              .picture=${t.picture}
              .iconAnimation=${t.iconAnimation}
              .font=${t.font}
              .hasMenu=${!!t.menu?.length}
              aria-haspopup=${t.menu?.length?"menu":"false"}
              aria-expanded=${t.menu?.length?String(this._groupOpen===e):"false"}
              .stacked=${this.dock}
              .ghostLabel=${Re(this.language,"card.ghost")}
              .badgeLabel=${Re(this.language,"card.badge",{value:t.badge??""})}
              .display=${this._railActive?this._railOpen?"both":"icon":this.display}
              .selected=${e===this.selected}
              aria-controls="tabdeck-panel"
              @click=${t=>this._onTabClick(e,t)}
              @pointerdown=${()=>this._onPointerDown(e)}
              @pointerup=${()=>this._cancelHold()}
              @pointerleave=${()=>this._cancelHold()}
              @pointercancel=${()=>this._cancelHold()}
            ></tabdeck-tab>
          `)}
      </div>
      ${this._groupOpen>=0?this._renderGroupMenu():""}
      ${this.searchable?F`<button
            class="search-btn"
            aria-label=${Re(this.language,"card.search")}
            aria-expanded=${this._searchOpen?"true":"false"}
            @click=${()=>this._searchOpen?this._closeSearch():this.openSearch()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
          </button>`:""}
      ${this._searchOpen?this._renderSearch():""}
      ${this.customizable?F`<button
            class="custom-btn search-btn"
            aria-label=${Re(this.language,"card.customize")}
            aria-expanded=${this._customOpen?"true":"false"}
            @click=${()=>this._customOpen?this._closeCustom():this._openCustom()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"></path></svg>
          </button>`:""}
      ${this._customOpen?this._renderCustom():""}
      ${this.expandable?F`<button
            class="fs-btn search-btn"
            aria-label=${Re(this.language,"card.fullscreen")}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-fullscreen",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"></path></svg>
          </button>`:""}
      ${e?F`<button class="scroll-btn right" aria-label=${Re(this.language,"card.scroll_right")} @click=${()=>this._scrollBy(1)}>›</button>`:""}
      ${i?F`<button
              class="overflow-btn"
              aria-label=${Re(this.language,"card.all_tabs")}
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${()=>this._menuOpen=!this._menuOpen}
            >
              ⋯
            </button>
            ${this._menuOpen?F`<div class="overflow-menu" role="menu">
                  ${this.items.map((t,e)=>F`<button
                      class="overflow-item ${e===this.selected?"current":""}"
                      role="menuitem"
                      ?disabled=${t.disabled}
                      @click=${()=>this._pickFromMenu(e)}
                    >
                      ${t.name??Re(this.language,"card.tab_n",{n:e+1})}
                    </button>`)}
                </div>`:""}`:""}
      </div>
    `}static{this.styles=o`
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
  `}};We([ut({attribute:!1})],ri.prototype,"items",void 0),We([ut({type:Number})],ri.prototype,"selected",void 0),We([ut()],ri.prototype,"position",void 0),We([ut()],ri.prototype,"tabStyle",void 0),We([ut()],ri.prototype,"display",void 0),We([ut()],ri.prototype,"align",void 0),We([ut()],ri.prototype,"badgeDisplay",void 0),We([ut()],ri.prototype,"scrollable",void 0),We([ut({type:Boolean})],ri.prototype,"animated",void 0),We([ut({type:Boolean})],ri.prototype,"accentIndicator",void 0),We([ut({type:Number})],ri.prototype,"indicatorSize",void 0),We([ut({type:Number})],ri.prototype,"indicatorRadius",void 0),We([ut({type:Boolean})],ri.prototype,"sticky",void 0),We([ut({type:Boolean})],ri.prototype,"elevation",void 0),We([ut({type:Boolean})],ri.prototype,"scrollButtons",void 0),We([ut({type:Boolean})],ri.prototype,"overflowMenu",void 0),We([_t()],ri.prototype,"_menuOpen",void 0),We([_t()],ri.prototype,"_groupOpen",void 0),We([ut({type:Boolean,reflect:!0})],ri.prototype,"collapsed",void 0),We([ut()],ri.prototype,"barLabel",void 0),We([ut()],ri.prototype,"language",void 0),We([ut()],ri.prototype,"barBackground",void 0),We([ut({reflect:!0})],ri.prototype,"density",void 0),We([ut({type:Boolean})],ri.prototype,"railExpand",void 0),We([_t()],ri.prototype,"_railOpen",void 0),We([ut({type:Boolean})],ri.prototype,"customizable",void 0),We([ut({attribute:!1})],ri.prototype,"customItems",void 0),We([_t()],ri.prototype,"_customOpen",void 0),We([ut({type:Boolean})],ri.prototype,"searchable",void 0),We([ut({type:Boolean})],ri.prototype,"expandable",void 0),We([_t()],ri.prototype,"_searchOpen",void 0),We([_t()],ri.prototype,"_query",void 0),We([_t()],ri.prototype,"_active",void 0),We([ut({type:Boolean,reflect:!0})],ri.prototype,"dock",void 0),We([_t()],ri.prototype,"_ready",void 0),We([_t()],ri.prototype,"_overflow",void 0),ri=We([Ke("tabdeck-tabbar")],ri);var oi=class extends nt{constructor(...t){super(...t),this._cards=[],this._width=0,this._sizes=[]}setConfig(t){if(!Array.isArray(t?.cards)||0===t.cards.length)throw new Error("tabdeck-masonry-card: cards is required.");this._config=t,this._build()}async _build(){const t=await Ee();this._cards=this._config.cards.map(e=>{const i=t(e);return this._hass&&(i.hass=this._hass),i}),this._sizes=this._cards.map(()=>1),await this._measure()}async _measure(){const t=this._cards,e=await Promise.all(t.map(t=>this._sizeOf(t)));t===this._cards&&(this._sizes=e)}async _sizeOf(t){try{const e=t?.localName??"";"function"!=typeof t?.getCardSize&&e.includes("-")&&await Promise.race([customElements.whenDefined(e),new Promise(t=>setTimeout(t,2e3))]);const i="function"==typeof t?.getCardSize?await t.getCardSize():1;return"number"==typeof i&&i>0?i:1}catch{return 1}}set hass(t){const e=!this._hass;this._hass=t;for(const i of this._cards)i.hass=t;e&&this._cards.length&&this._measure()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._config?.min_column_width&&"undefined"!=typeof ResizeObserver&&(this._observer=new ResizeObserver(t=>this._setWidth(t[0]?.contentRect?.width??0)),this._observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0}_setWidth(t){const e=Math.round(t);e!==this._width&&(this._width=e)}get _columnCount(){const t=this._config;return t?t.min_column_width?this._width<=0?1:Math.max(1,Math.min(this._cards.length||1,Math.floor(this._width/t.min_column_width))):Math.max(1,Math.round(t.columns??2)):1}_size(t){return this._sizes[t]??1}getCardSize(){const t=Ct(this._cards.map((t,e)=>this._size(e)),this._columnCount);return Math.max(1,...t.map(t=>t.reduce((t,e)=>t+this._size(e),0)))}render(){if(0===this._cards.length)return V;const t=this._columnCount,e=Ct(this._cards.map((t,e)=>this._size(e)),t);return F`
      <div class="masonry" style="--tabdeck-masonry-columns:${t}">
        ${e.map(t=>F`<div class="column">${t.map(t=>this._cards[t])}</div>`)}
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
  `}};We([_t()],oi.prototype,"_cards",void 0),We([_t()],oi.prototype,"_width",void 0),We([_t()],oi.prototype,"_sizes",void 0),oi=We([Ke("tabdeck-masonry-card")],oi);var ai=class extends nt{constructor(...t){super(...t),this._sections=[],this._width=0,this._sized=0}setConfig(t){if(!Array.isArray(t?.sections)||0===t.sections.length)throw new Error("tabdeck-sections-card: sections is required.");this._config={max_columns:Math.max(1,Number(t.max_columns)||4),sections:t.sections},this._build()}async _build(){const t=await Ee(),e=e=>{const i=t(e);return this._hass&&(i.hass=this._hass),i};this._sections=this._config.sections.map(t=>({span:Math.max(1,Math.round(Number(t?.column_span)||1)),heading:t?.title?e({type:"heading",heading:t.title,...t.icon?{icon:t.icon}:{},heading_style:"title",...Array.isArray(t.badges)?{badges:t.badges}:{}}):void 0,cards:(Array.isArray(t?.cards)?t.cards:[]).map(t=>({el:e(t),config:t}))}));const i=new Set(this._sections.flatMap(t=>t.cards.map(t=>t.el?.localName??"")).filter(t=>t.includes("-")));await Promise.race([Promise.all([...i].map(t=>customElements.whenDefined(t))),new Promise(t=>setTimeout(t,2e3))]),this._sized++}set hass(t){this._hass=t;for(const e of this._sections){e.heading&&(e.heading.hass=t);for(const i of e.cards)i.el&&(i.el.hass=t)}}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),"undefined"!=typeof ResizeObserver&&(this._observer=new ResizeObserver(t=>this._setWidth(t[0]?.contentRect?.width??0)),this._observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0}_setWidth(t){const e=Math.round(t);e!==this._width&&(this._width=e)}_cardColumns(t){let e;try{e="function"==typeof t.el?.getGridOptions?t.el.getGridOptions():void 0}catch{e=void 0}return function(t,e){const i=t=>{if("full"===t)return 12;const e=Number(t);return Number.isFinite(e)&&e>0?Math.min(12,Math.round(e)):void 0},s=Number(t?.layout_options?.grid_columns);return i(t?.grid_options?.columns)??(Number.isFinite(s)&&s>0?Math.min(12,Math.round(3*s)):void 0)??i(e?.columns)??12}(t.config,e)}getCardSize(){return Math.max(1,...this._sections.map(t=>2*t.cards.length+(t.heading?1:0)))}render(){if(!this._config||0===this._sections.length)return V;const t=function(t,e,i=320,s=16){return t>0?Math.max(1,Math.min(e,Math.floor((t+s)/(i+s)))):1}(this._width,this._config.max_columns);return F`
      <div class="sections" style="--tabdeck-section-columns:${t}">
        ${this._sections.map(e=>F`
            <div class="section" style="grid-column:span ${Math.min(e.span,t)}">
              ${e.heading??V}
              <div class="cards">
                ${e.cards.map(t=>F`<div class="cell" style="grid-column:span ${this._cardColumns(t)}">${t.el}</div>`)}
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
  `}};We([_t()],ai.prototype,"_sections",void 0),We([_t()],ai.prototype,"_width",void 0),We([_t()],ai.prototype,"_sized",void 0),ai=We([Ke("tabdeck-sections-card")],ai);var ni=["pointerdown","keydown","touchstart","wheel"],ci=["name","subtitle","icon","color","accent","background","icon_animation","picture"],di=class extends nt{constructor(...t){super(...t),this._selected=0,this._built=!1,this._width=0,this._collapsed=!1,this._fullscreen=!1,this._cardKey="",this._genTabs=[],this._genKey="",this._entityWriteGuard=0,this._editModeFlag=!1,this._previewFlag=!1,this._fromPop=!1,this._onPopState=t=>{if(!this._config?.history||!this._built)return;const e=t.state?.tabdeck?.[this._cardKey];if("number"==typeof e&&e!==this._selected&&this._isContentTab(this._visibleTabs()[e]))if(this._isLocked(this._visibleTabs()[e]))this._pinFor={index:e,error:!1};else{this._fromPop=!0;try{this._collapsed=!1,this._selectIndex(e)}finally{this._fromPop=!1}}},this._onHotkey=t=>{const e=this._config;if(!e?.hotkeys||!this._built||t.ctrlKey||t.metaKey||t.altKey||t.defaultPrevented)return;const i=t.composedPath()[0];if((!i||!i.isContentEditable&&!/^(INPUT|TEXTAREA|SELECT)$/.test(i.tagName??""))&&("function"!=typeof this.checkVisibility||this.checkVisibility()))if("/"===t.key&&e.search)t.preventDefault(),this.renderRoot.querySelector("tabdeck-tabbar")?.openSearch?.();else if(/^[1-9]$/.test(t.key))this.selectTab(Number(t.key)-1)&&t.preventDefault();else if("["===t.key||"]"===t.key){const i=this._stepContent(this._selected,"]"===t.key?1:-1,e.swipe_wrap);i!==this._selected&&this._userSelect(i)}},this._lastInteraction=Date.now(),this._lastRotate=Date.now(),this._rotatePausedUntil=0,this._onInteraction=()=>this._noteInteraction(Date.now()),this._autoSigs=[],this._alertOrder=/* @__PURE__ */new Set,this._cancelPin=()=>{this._pinFor=void 0},this._templateResolver=t=>this._templates?.boolean(t),this._layout={order:[],hidden:[]},this._spyObserved=[],this._spyInView=/* @__PURE__ */new Set,this._spySuppressUntil=0,this._spyDriven=!1,this._groupChild=/* @__PURE__ */new WeakMap,this._onNestedChanged=t=>{const e=t.detail;if(!e||e.deck===this)return;const i=this._allTabs().find(t=>this._manager?.get(this._allTabs().indexOf(t))===e.deck);"menu"===i?.group?.display&&e.name&&(this._groupChild.set(i,e.name),this.requestUpdate())},this._seenAt=/* @__PURE__ */new Map,this._builtAt=Date.now(),this._toggleFullscreen=()=>{this._fullscreen=!this._fullscreen,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))},this._onFullscreenKey=t=>{"Escape"===t.key&&this._fullscreen&&(this._fullscreen=!1,this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex())))},this._peekSettling=!1,this._onTouchMove=t=>{const e=this._peek,i=t.touches[0];if(!e||!i||!this._config?.swipe_peek)return;const s=i.clientX-e.x,r=i.clientY-e.y;if(!e.axis){if(Math.abs(s)<10&&Math.abs(r)<10)return;e.axis=Math.abs(s)>Math.abs(r)?"x":"y"}"x"===e.axis&&this._peekMove(s)},this._eventWarned=!1,this._onTouchStart=t=>{if(!this._config?.swipe||1!==t.touches.length)return void(this._touchStart=void 0);const e=t.touches[0];this._touchStart={x:e.clientX,y:e.clientY,t:t.timeStamp},this._config.swipe_peek&&this._peekStart(e.clientX,e.clientY)},this._onTouchEnd=t=>{const e=this._touchStart;if(this._touchStart=void 0,!e||!this._config?.swipe)return;if(this._config.swipe_peek)return this._peekEnd();const i=t.changedTouches[0];i&&this._applySwipe(e,{x:i.clientX,y:i.clientY,t:t.timeStamp})},this._onPointerDown=t=>{this._config?.swipe_mouse&&"touch"!==t.pointerType?this._touchStart={x:t.clientX,y:t.clientY,t:t.timeStamp}:this._touchStart=void 0},this._onPointerUp=t=>{const e=this._touchStart;this._touchStart=void 0,e&&this._config?.swipe_mouse&&"touch"!==t.pointerType&&this._applySwipe(e,{x:t.clientX,y:t.clientY,t:t.timeStamp})},this._appliedStyleKeys=[],this._defaultReason="default_tab",this._startReason="",this._buildMs=0,this._renderStart=0,this._renderMs=0}set editMode(t){this._setEditFlags(!!t,this._previewFlag)}get editMode(){return this._editModeFlag}set preview(t){this._setEditFlags(this._editModeFlag,!!t)}get preview(){return this._previewFlag}_setEditFlags(t,e){if(t===this._editModeFlag&&e===this._previewFlag)return;const i=this._config&&this._built?this._visibleTabs()[this._selected]?.name:void 0;this._editModeFlag=t,this._previewFlag=e,void 0!==i&&this._restoreSelection(i),this.requestUpdate()}get _editing(){return(this._editModeFlag||this._previewFlag)&&!1!==this._config?.edit_mode_reveal}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await(import(new URL("./tabdeck-card-editor-Bk4KA5s7.js",import.meta.url).href)),document.createElement("tabdeck-card-editor")}setConfig(t){this._config=me(t),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=fe(this._config),this._collapsed=this._config.start_collapsed,this._fullscreen=!1,this._seenAt.clear(),this._alertOrder=/* @__PURE__ */new Set,this._autoSigs=[],this._lastRemote=void 0,this._pinFor=void 0,this._unsubscribeRemote(),this._autoPrev=void 0,this._lastEntityValue=void 0,this._genTabs=[],this._genKey="",this._templates?.destroy(),this._templates=void 0,this._syncTimer(),this._syncUnloadTimer(),this._syncWidthObserver(),this._build()}_syncWidthObserver(){const t=!!(this._config?.split||this._config?.tab_display_narrow||this._config?.transition_narrow)&&this.isConnected&&"undefined"!=typeof ResizeObserver;t&&!this._widthObserver?(this._widthObserver=new ResizeObserver(t=>{const e=Math.round(t[0]?.contentRect?.width??0);e!==this._width&&(this._width=e)}),this._widthObserver.observe(this)):!t&&this._widthObserver&&(this._widthObserver.disconnect(),this._widthObserver=void 0)}get _isSplit(){const t=this._config?.split;return!!t&&this._width>=t.min_width}get _isNarrow(){return this._width>0&&this._width<this._config.narrow_width}get _effectiveDisplay(){const t=this._config;return t.tab_display_narrow&&this._isNarrow?t.tab_display_narrow:t.tab_display}_renderSplit(t){const e=t.filter(t=>!ne(t));return F`
      <div class="split" style="--tabdeck-split-columns:${this._config.split.columns}">
        ${e.map(t=>{const e=this._text(t.icon);return F`
            <div class="split-col">
              <div class="split-title">
                ${e?F`<ha-icon .icon=${e}></ha-icon>`:V}
                <span>${this._text(t.name)??""}</span>
              </div>
              ${this._manager?.get(this._allTabs().indexOf(t))}
            </div>
          `})}
      </div>
    `}connectedCallback(){super.connectedCallback();for(const t of ni)this.addEventListener(t,this._onInteraction);this._syncTimer(),this._syncUnloadTimer(),this._syncWidthObserver(),this._hass&&this._syncTemplates(),this._config?.scroll_spy&&this.updateComplete.then(()=>this._syncSpyObserver()),this._config?.dock&&this.updateComplete.then(()=>this._syncDock()),document.addEventListener("keydown",this._onHotkey),document.addEventListener("keydown",this._onFullscreenKey),window.addEventListener("popstate",this._onPopState)}_historyState(t){const e=history.state&&"object"==typeof history.state?history.state:{};return{...e,tabdeck:{...e.tabdeck??{},[this._cardKey]:t}}}disconnectedCallback(){super.disconnectedCallback();for(const t of ni)this.removeEventListener(t,this._onInteraction);document.removeEventListener("keydown",this._onHotkey),document.removeEventListener("keydown",this._onFullscreenKey),window.removeEventListener("popstate",this._onPopState),this._stopTimer(),this._unloadTimer&&clearInterval(this._unloadTimer),this._unloadTimer=void 0,this._spyObserver?.disconnect(),this._spyObserver=void 0,this._spyObserved=[],this._widthObserver?.disconnect(),this._widthObserver=void 0,this._dockObserver?.disconnect(),this._dockObserver=void 0,this._templates?.destroy(),this._templates=void 0,this._unsubscribeRemote()}_noteInteraction(t){this._lastInteraction=t;const e=this._config?.auto_rotate?.resume_after??0;this._rotatePausedUntil=t+1e3*e}_syncTimer(){const t=!(!this._config?.auto_rotate&&!this._config?.idle_return)&&this.isConnected;t&&!this._timer?(this._lastInteraction=this._lastRotate=Date.now(),this._timer=setInterval(()=>this._tick(Date.now()),1e3)):t||this._stopTimer()}_stopTimer(){this._timer&&clearInterval(this._timer),this._timer=void 0}_tick(t){const e=this._config;if(!e||!this._built)return;if(this._editing)return void(this._lastInteraction=this._lastRotate=t);const i=t-this._lastInteraction,s=e.auto_rotate;if(s){if(t<this._rotatePausedUntil)return void(this._lastRotate=t);if(t-this._lastRotate>=1e3*s.interval){this._lastRotate=t;const e=this._nextRotatable(this._selected);e!==this._selected&&this._selectIndex(e,!1)}}else if(e.idle_return&&i>=1e3*e.idle_return){const e=this._computeDefaultIndex();e===this._selected||this._isLocked(this._visibleTabs()[e])||this._selectIndex(e,!1),this._lastInteraction=t}}_nextRotatable(t){const e=this._visibleTabs();let i=t;for(let s=0;s<e.length;s++)if(i=this._stepContent(i,1,!0),i===t||!this._isLocked(e[i]))return i;return t}_computeCardKey(t){return t.storage_key?t.storage_key:`${"undefined"!=typeof location?location.pathname:""}#${t.tabs.map(t=>t.name??"").join("|")}`}async _build(){if(!this._config)return;const t=performance.now();this._layout=this._config.customize?function(t){try{const e=JSON.parse(localStorage.getItem(je(t))??"null");if(!e||"object"!=typeof e)return Ie;const i=t=>Array.isArray(t)?t.filter(t=>"string"==typeof t):[];return{order:i(e.order),hidden:i(e.hidden)}}catch{return Ie}}(this._cardKey):{order:[],hidden:[]};const e=await Ee();this._manager=new Oe(e),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._cardConfigs()),this._hass&&this._manager.setHass(this._hass);const i=[...this._config.header_cards??[],...this._config.footer_cards??[]];i.length?(this._extras=new Oe(e),this._extras.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._extras.build(i),this._hass&&this._extras.setHass(this._hass)):this._extras=void 0,this._builtAt=Date.now(),this._syncTemplates(),this._selected=ze({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:this._computeDefaultIndex(),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(t=>t.name??""),entityValue:this._config.remember_entity?this._hass?.states?.[this._config.remember_entity]?.state:void 0});const s=this._computeDefaultIndex();if(this._startReason=this._selected!==s&&"none"!==this._config.remember?`remembered (remember: ${this._config.remember})`:this._defaultReason,this._selected=this._ensureContentTab(this._selected),this._isLocked(this._visibleTabs()[this._selected])){const t=this._visibleTabs().findIndex(t=>this._isContentTab(t)&&!this._isLocked(t));t>=0&&(this._selected=t)}this._config.history&&"undefined"!=typeof history&&history.replaceState(this._historyState(this._selected),"",location.href),this._lastEntityValue=this._rememberEntityState(),this._built=!0,this._buildMs=performance.now()-t,this._refreshAlertOrder(),this.requestUpdate()}set hass(t){this._hass=t,this._manager?.setHass(t),this._extras?.setHass(t),this._syncTemplates(),this._runAutoSelect(),this._syncRememberEntity(),this._syncAutoContent(),this._refreshAlertOrder(),this._syncRemoteEntity(),this._syncRemoteEvent(),this.requestUpdate()}_autoCard(t){if(!t.card?.type&&(t.area||t.floor||t.label))return function(t,e,i="No entities here.",s=2){if(!t.area&&!t.floor&&!t.label)return;const r=Object.keys(e?.entities??{}).filter(i=>{const s=e.entities[i];if(s.hidden||s.entity_category||!e.states?.[i])return!1;if(t.domains?.length&&!t.domains.includes(i.split(".")[0]))return!1;if(t.label)return Array.isArray(s.labels)&&s.labels.includes(t.label);const r=Je(e,i);return t.area?r===t.area:!!r&&e.areas?.[r]?.floor_id===t.floor}).sort();return r.length?{type:"grid",columns:s,square:!1,cards:r.map(t=>({type:"tile",entity:t}))}:{type:"markdown",content:i}}(t,this._hass,Re(Ne(this._hass),"card.no_entities"))}_syncAutoContent(){this._manager&&this._built&&this._allTabs().forEach((t,e)=>{const i=this._autoCard(t);if(!i)return;const s=JSON.stringify(i);s!==this._autoSigs[e]&&(this._autoSigs[e]=s,this._manager.replace(e,i))})}_refreshAlertOrder(){if(!this._config?.alert_first||!this._built)return;const t=new Set(this._allTabs().filter(t=>this._isAlerting(t)));if(t.size===this._alertOrder.size&&[...t].every(t=>this._alertOrder.has(t)))return;const e=this._visibleTabs()[this._selected]?.name;this._alertOrder=t,this._restoreSelection(e)}_snoozeKey(t){return this._text(t.name)??String(this._allTabs().indexOf(t))}get _deckId(){return this._config?.event_id??this._config?.storage_key??this._cardKey}_indexOf(t){const e=this._visibleTabs();if("number"==typeof t)return t;const i=String(t??"").trim();if(/^\d+(\.0+)?$/.test(i)&&!e.some(t=>t.name===i))return Number(i);const s=t=>t.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),r=e.findIndex(t=>t.name===i);return r>=0?r:e.findIndex(t=>void 0!==t.name&&s(t.name)===s(i))}_remoteSelect(t){const e=this._indexOf(t);this._isContentTab(this._visibleTabs()[e])&&(this._collapsed=!1,e!==this._selected&&this._selectIndex(e,!1))}_syncRemoteEntity(){const t=this._config?.remote_entity;if(!t)return;const e=this._hass?.states?.[t]?.state;if(void 0===e||e===this._lastRemote)return;const i=void 0===this._lastRemote;this._lastRemote=e,i||!this._built||["","unknown","unavailable"].includes(e)||this._remoteSelect(e)}_syncRemoteEvent(){const t=this._hass?.connection;this._config?.remote_event&&!this._remoteSub&&this.isConnected&&t?.subscribeEvents&&(this._remoteSub=Promise.resolve(t.subscribeEvents(t=>{const e=t?.data??{};void 0!==e.deck&&e.deck!==this._deckId||void 0!==e.device&&e.device!==ei()||this._remoteSelect(e.tab)},"tabdeck_select")).catch(t=>{console.warn("tabdeck-card: remote_event needs an admin user",t?.message??t)}))}_unsubscribeRemote(){const t=this._remoteSub;this._remoteSub=void 0,t?.then(t=>t?.())}_isLocked(t){return!(!t?.pin||this._editing)&&!function(t,e,i,s){try{const r=Number(sessionStorage.getItem(si(t,e)));return!(!Number.isFinite(r)||r<=0)&&(void 0===s||i-r<=6e4*s)}catch{return!1}}(this._deckId,t.name??"",Date.now(),t.pin_timeout)}_userSelect(t,e=!0){this._isLocked(this._visibleTabs()[t])?this._pinFor={index:t,error:!1}:(this._collapsed=!1,t!==this._selected&&this._selectIndex(t,e))}_onPinSubmit(t){t.preventDefault();const e=this._pinFor;if(!e)return;const i=this._visibleTabs()[e.index],s=this.renderRoot.querySelector(".pin-dialog input");if(!i||(s?.value??"")!==i.pin)return s&&(s.value=""),void(this._pinFor={...e,error:!0});!function(t,e,i){try{sessionStorage.setItem(si(t,e),String(i))}catch{}}(this._deckId,i.name??"",Date.now()),this._pinFor=void 0,this._collapsed=!1,e.index!==this._selected&&this._selectIndex(e.index)}_renderPin(){const t=this._pinFor,e=t?this._visibleTabs()[t.index]:void 0;if(!t||!e)return V;const i=Ne(this._hass);return F`
      <div class="pin-backdrop" @click=${this._cancelPin}>
        <div
          class="pin-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tabdeck-pin-title"
          @click=${t=>t.stopPropagation()}
        >
          <form @submit=${this._onPinSubmit}>
            <div class="pin-title" id="tabdeck-pin-title">
              ${Re(i,"card.pin_title",{tab:this._text(e.name)??""})}
            </div>
            <input
              type="password"
              inputmode="numeric"
              autocomplete="off"
              aria-label=${Re(i,"card.pin_label")}
              @keydown=${t=>"Escape"===t.key&&this._cancelPin()}
            />
            ${t.error?F`<div class="pin-error" role="alert">${Re(i,"card.pin_wrong")}</div>`:V}
            <div class="pin-actions">
              <button type="button" class="pin-cancel" @click=${this._cancelPin}>${Re(i,"card.cancel")}</button>
              <button type="submit" class="pin-ok">${Re(i,"card.open")}</button>
            </div>
          </form>
        </div>
      </div>
    `}_rememberEntityState(){const t="entity"===this._config?.remember?this._config.remember_entity:void 0;return t?this._hass?.states?.[t]?.state:void 0}_syncRememberEntity(){if(!this._built)return;const t=this._rememberEntityState();if(void 0===t||t===this._lastEntityValue)return;if(this._lastEntityValue=t,Date.now()<this._entityWriteGuard)return;const e=Math.trunc(Number(t));!Number.isFinite(e)||e<0||e>=this._visibleTabs().length||e!==this._selected&&this._selectIndex(e,!1)}_runAutoSelect(){if(!this._config)return;const t=this._allTabs();if(!t.some(t=>t.auto_select))return;const e=t=>{const e=this._hass?.states?.[t.entity]?.state;return void 0!==e&&(void 0!==t.state?e===t.state:Xe(e))},i=t.map(t=>!!t.auto_select&&e(t.auto_select)),s=this._autoPrev;if(this._autoPrev=i,s)for(let r=0;r<t.length;r++)if(i[r]&&!s[r]){const e=this._visibleTabs().indexOf(t[r]);if(e>=0){this._selectIndex(e);break}}}get hass(){return this._hass}_cardConfigs(){return this._allTabs().map((t,e)=>{if(ne(t)&&!t.card?.type)return null;const i=this._autoCard(t);return this._autoSigs[e]=i?JSON.stringify(i):void 0,i??t.card})}_isContentTab(t){return!!t&&!t.disabled&&!ne(t)}_ensureContentTab(t){const e=this._visibleTabs();if(!e[t]||!ne(e[t]))return t;const i=e.findIndex(t=>!ne(t));return i>=0?i:t}_stepContent(t,e,i){const s=this._visibleTabs(),r=s.length;for(let o=1;o<r;o++){let a=t+e*o;if(i)a=(a%r+r)%r;else if(a<0||a>=r)return t;if(this._isContentTab(s[a]))return a}return t}_allTabs(){return this._config?this._genTabs.length?[...this._config.tabs,...this._genTabs]:this._config.tabs:[]}_visibleTabs(){if(!this._config)return[];if(this._editing)return this._allTabs();const t=this._allTabs().filter(t=>!this._isHidden(t)),e=this._config.customize?function(t,e){if(0===e.hidden.length)return t;const i=t.filter(t=>void 0===t.name||!e.hidden.includes(t.name));return i.length?i:t}(Le(t,this._layout),this._layout):t;return this._config.alert_first?(s=t=>this._alertOrder.has(t),[...(i=e).filter(s),...i.filter(t=>!s(t))]):e;var i,s}_customItems(){const t=this._allTabs().filter(t=>!this._isHidden(t));return Le(t,this._layout).map(t=>({name:this._text(t.name),icon:this._text(t.icon),key:t.name,hidden:void 0!==t.name&&this._layout.hidden.includes(t.name)}))}_onCustomize(t){const e=this._visibleTabs()[this._selected]?.name,i=t.detail??{};this._layout=i.reset?{order:[],hidden:[]}:{order:i.order??[],hidden:i.hidden??[]},function(t,e){try{!e||0===e.order.length&&0===e.hidden.length?localStorage.removeItem(je(t)):localStorage.setItem(je(t),JSON.stringify(e))}catch{}}(this._cardKey,i.reset?null:this._layout),this._restoreSelection(e),this._isContentTab(this._visibleTabs()[this._selected])||(this._selected=this._ensureContentTab(this._computeDefaultIndex())),this.requestUpdate()}_isHidden(t){return!$e(t.visibility,this._hass,this._templateResolver)}_collectTemplates(){if(!this._config)return[];const t=[];this._config.auto_tabs?.template&&t.push(this._config.auto_tabs.template);const e=i=>{for(const s of i??[])"template"===s?.condition&&s.value_template&&t.push(s.value_template),Array.isArray(s?.conditions)&&e(s.conditions)};for(const i of this._allTabs()){Te(i.badge)&&t.push(i.badge),Te(i.ring)&&t.push(i.ring);for(const e of ci)Te(i[e])&&t.push(i[e]);e(i.visibility),e(i.default_if),e(i.alert)}return t}_makeSubscribe(){var t;if(this._hass?.connection?.subscribeMessage)return t=()=>this._hass,(e,i,s)=>{const r=t()?.connection;if(!r?.subscribeMessage)return s(),()=>{};let o,a=!1;return Promise.resolve(r.subscribeMessage(t=>{t&&void 0!==t.error?s():i(t?.result)},{type:"render_template",template:e,report_errors:!0})).then(t=>{o=t,a&&t?.()}).catch(()=>s()),()=>{a=!0,o?.()}}}_syncTemplates(){const t=this._collectTemplates();if(0===t.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const t=this._makeSubscribe();if(!t)return;this._templates=new Me(t),this._templates.addEventListener("change",()=>{this._syncGeneratedTabs(),this._refreshAlertOrder(),this.requestUpdate()})}this._templates.track(t)}async _syncGeneratedTabs(){const t=this._config?.auto_tabs;if(!t||!this._manager)return;let e=this._templates?.result(t.template);const i=this._hass?.areas;"areas"===t.source&&Array.isArray(e)&&i&&(e=e.map(t=>t&&"object"==typeof t?{...t,icon:i[t.id]?.icon||t.icon}:t));const s=function(t,e){if(!Array.isArray(t))return[];const i=e.tab_template,s=[];return t.forEach((t,e)=>{i?s.push(Tt(i,t,e)):t&&"object"==typeof t&&!Array.isArray(t)&&s.push(t)}),s}(e,t),r=JSON.stringify(s);if(r===this._genKey)return;const o=this._visibleTabs()[this._selected]?.name;this._genKey=r;const a=this._config;this._genTabs=s.map(t=>ae(be(t,a.tab_templates,a.tab_defaults))),this._restoreSelection(o),await this._manager.build(this._cardConfigs()),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this.requestUpdate()}_restoreSelection(t){const e=this._visibleTabs();if(t){const i=e.findIndex(e=>e.name===t);if(i>=0)return void(this._selected=i)}this._selected>e.length-1&&(this._selected=Math.min(this._computeDefaultIndex(),Math.max(0,e.length-1)))}getCardSize(){if(this._collapsed)return 1;const t=this._visibleTabs()[this._selected];if(t&&"number"==typeof t.card_size)return t.card_size;const e=this._manager?.get(this._activeOriginalIndex());return e&&"function"==typeof e.getCardSize?e.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_computeDefaultIndex(){const t=this._visibleTabs();for(let a=0;a<t.length;a++){const e=t[a].default_if;if(Array.isArray(e)&&e.length>0&&$e(e,this._hass,this._templateResolver))return this._defaultReason=`default_if of ${t[a].name??a}`,a}const e=this._config,i=function(t,e){if(t&&"object"==typeof t&&e)return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0}(e.default_by_device,ei()),s=i??function(t,e){if(!t||"object"!=typeof t)return;const i=Object.entries(t).map(([t,e])=>{const i=Qe.exec(t.trim());return i?{at:60*Number(i[1])+Number(i[2]),tab:e}:void 0}).filter(t=>!!t).sort((t,e)=>t.at-e.at);if(!i.length)return;const s=60*e.getHours()+e.getMinutes(),r=i.filter(t=>t.at<=s);return(r.length?r[r.length-1]:i[i.length-1]).tab}(e.default_by_time,/* @__PURE__ */new Date);if(void 0!==s){const e=this._indexOf(s);if(this._isContentTab(t[e]))return this._defaultReason=void 0!==i?`default_by_device (${ei()})`:"default_by_time",e}this._defaultReason="default_tab";const r=fe(e),o=t.indexOf(this._allTabs()[r]??e.tabs[r]);return o>=0?o:0}_activeOriginalIndex(){const t=this._visibleTabs()[this._selected];return this._allTabs().indexOf(t)}_onSelect(t){const e=this._visibleTabs()[t.detail.index];if(void 0!==t.detail.child){if(this._isLocked(e))return void(this._pinFor={index:t.detail.index,error:!1});this._collapsed=!1,t.detail.index!==this._selected&&this._selectIndex(t.detail.index);const i=this._manager?.get(this._allTabs().indexOf(e));return void this.updateComplete.then(()=>i?.selectTab?.(t.detail.child))}ne(e)?this._runAction(e.tap_action,"tap"):this._config?.collapsible&&t.detail.index===this._selected?this._collapsed=!this._collapsed:this._userSelect(t.detail.index)}_scrollToSection(t){this._spySuppressUntil=Date.now()+900,this.updateComplete.then(()=>{(this.renderRoot?.querySelector?.(`.panel[data-index="${t}"]`))?.scrollIntoView?.({behavior:"smooth",block:"start"})})}_syncSpyObserver(){if(!this._config?.scroll_spy||"undefined"==typeof IntersectionObserver)return this._spyObserver?.disconnect(),this._spyObserver=void 0,void(this._spyObserved=[]);const t=[...this.renderRoot?.querySelectorAll?.(".panel")??[]];if(t.length!==this._spyObserved.length||!t.every((t,e)=>t===this._spyObserved[e])||!this._spyObserver){this._spyObserver?.disconnect(),this._spyInView.clear(),this._spyObserver=new IntersectionObserver(t=>this._onSpyEntries(t),{rootMargin:"-120px 0px -55% 0px"});for(const e of t)this._spyObserver.observe(e);this._spyObserved=t}}_onSpyEntries(t){for(const i of t){const t=Number(i.target.dataset?.index);Number.isInteger(t)&&(i.isIntersecting?this._spyInView.add(t):this._spyInView.delete(t))}if(Date.now()<this._spySuppressUntil||0===this._spyInView.size)return;const e=Math.min(...this._spyInView);if(e!==this._selected){this._spyDriven=!0;try{this._selectIndex(e,!1)}finally{this._spyDriven=!1}}}_runAction(t,e){if(!t||!this._hass)return;"perform-action"===t.action&&"string"==typeof t.perform_action&&(t={...t,action:"call-service",service:t.perform_action,service_data:t.data??t.service_data});const i={entity:t?.entity,[`${e}_action`]:t};((t,e,i,s)=>{let r;"double_tap"===s&&i.double_tap_action?r=i.double_tap_action:"hold"===s&&i.hold_action?r=i.hold_action:"tap"===s&&i.tap_action&&(r=i.tap_action),gt(t,e,i,r)})(this,this._hass,i,e)}_onTabAction(t){const e=this._visibleTabs()[t.detail.index];if(!e||!this._hass)return;if("hold"===t.detail.kind&&this._config?.alert_snooze&&this._isAlerting(e))return function(t,e,i,s){try{localStorage.setItem(ii(t,e),String(i+6e4*s))}catch{}}(this._deckId,this._snoozeKey(e),Date.now(),this._config.alert_snooze),this._refreshAlertOrder(),void this.requestUpdate();const i="badge"===t.detail.kind?e.badge_action:e.hold_action;this._runAction(i,"badge"===t.detail.kind?"tap":"hold")}selectTab(t){const e=this._visibleTabs(),i="number"==typeof t?t:this._indexOf(t);return!!this._isContentTab(e[i])&&(this._isLocked(e[i])?(this._pinFor={index:i,error:!1},!1):(this._collapsed=!1,i!==this._selected&&this._selectIndex(i),!0))}get selectedTab(){return this._visibleTabs()[this._selected]?.name}_selectIndex(t,e=!0){const i=this._visibleTabs(),s=i[this._selected],r=t!==this._selected,o=Date.now();if(s&&this._seenAt.set(this._allTabs().indexOf(s),o),i[t]){const e=this._allTabs().indexOf(i[t]);this._seenAt.set(e,o),this._manager?.ensure(e)}this._selected=t,r&&(this._runAction(s?.leave_action,"tap"),this._runAction(i[t]?.enter_action,"tap"));const a=i[this._selected];if(r&&this._config?.fire_event&&this._fireTabEvent(t,a?.name,s?.name),r&&e&&this._config?.haptic&&!this._editing&&window.dispatchEvent(new CustomEvent("haptic",{detail:this._config.haptic})),r&&this.dispatchEvent(new CustomEvent("tabdeck-tab-changed",{detail:{index:t,name:a?.name,deck:this},bubbles:!0,composed:!0})),this._config&&e&&!this._editing){const t="browser"===(n={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:a?.name}).mode?((n.storage??globalThis.localStorage)?.setItem(Se(n.cardKey),String(n.index)),{}):"url"===n.mode?{hash:"#tab="+(n.tabName?n.tabName:String(n.index))}:{};this._config.history&&!this._fromPop?history.pushState(this._historyState(this._selected),"",t.hash??location.href):t.hash&&"undefined"!=typeof location&&history.replaceState(this._config.history?this._historyState(this._selected):null,"",t.hash),"entity"===this._config.remember&&this._writeRememberEntity(this._selected)}var n;this._config?.scroll_spy&&!this._spyDriven&&this._scrollToSection(t),this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}_syncUnloadTimer(){const t=!!this._config?.unload_after&&this.isConnected;t&&!this._unloadTimer?this._unloadTimer=setInterval(()=>this._sweepUnloaded(Date.now()),3e4):!t&&this._unloadTimer&&(clearInterval(this._unloadTimer),this._unloadTimer=void 0)}_sweepUnloaded(t){const e=this._config?.unload_after;if(!e||!this._manager||!this._built||this._config.scroll_spy||this._isSplit)return;const i=this._activeOriginalIndex();let s=!1;this._allTabs().forEach((r,o)=>{o!==i&&this._manager.isLoaded(o)&&t-(this._seenAt.get(o)??this._builtAt)>=6e4*e&&(this._manager.unload(o),s=!0)}),s&&this.requestUpdate()}_panelEl(t){return this.renderRoot?.querySelector?.(`.panel[data-index="${t}"]`)}_peekStart(t,e){this._peek={x:t,y:e,t:performance.now(),dx:0}}_peekMove(t){const e=this._peek,i=this.renderRoot.querySelector(".content"),s=this._panelEl(this._selected);if(!i||!s)return;const r=t<0?1:-1,o=this._stepContent(this._selected,r,!!this._config?.swipe_wrap),a=o!==this._selected?this._panelEl(o):null,n=a?t:t/3;e.dx=t,i.classList.add("dragging"),s.style.transform=`translateX(${n}px)`,e.neighbour&&e.neighbour!==a&&this._clearPeekPanel(e.neighbour),e.neighbour=a??void 0,a&&(a.classList.add("peek"),a.style.top=`${s.offsetTop}px`,a.style.transform=`translateX(calc(${r>0?"100%":"-100%"} + ${n}px))`)}_clearPeekPanel(t){t.classList.remove("peek"),t.style.transform="",t.style.top=""}_peekEnd(){const t=this._peek;if(this._peek=void 0,!t||"x"!==t.axis)return;const e=this.renderRoot.querySelector(".content"),i=this._panelEl(this._selected),s=e?.clientWidth||1,r=t.dx/Math.max(1,performance.now()-t.t),o=t.neighbour?function(t,e,i){return Math.abs(t)>e/3||Math.abs(t)>=30&&Math.abs(i)>.5?t<0?"next":"prev":null}(t.dx,s,r):null,a=i?.style.transform??"";if(i&&(i.style.transform=""),t.neighbour&&this._clearPeekPanel(t.neighbour),e?.classList.remove("dragging"),o){const e="next"===o?1:-1,i=this._stepContent(this._selected,e,!!this._config?.swipe_wrap);if(this._isLocked(this._visibleTabs()[i]))return void(this._pinFor={index:i,error:!1});this._peekSettling=!0,this._selectIndex(i);const s=`translateX(calc(${e>0?"100%":"-100%"} + ${t.dx}px))`;this.updateComplete.then(()=>{const t=this._panelEl(i);t&&"function"==typeof t.animate&&!this._reducedMotion()&&t.animate([{transform:s},{transform:"translateX(0)"}],{duration:200,easing:"ease-out"})})}else i&&a&&"function"==typeof i.animate&&!this._reducedMotion()&&i.animate([{transform:a},{transform:"translateX(0)"}],{duration:180,easing:"ease-out"})}_reducedMotion(){return"function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches}_fireTabEvent(t,e,i){const s=this._hass;s?.callApi&&Promise.resolve(s.callApi("POST","events/tabdeck_tab_changed",{deck:this._deckId,tab:e,index:t,previous:i,device:ei()})).catch(t=>{this._eventWarned||(this._eventWarned=!0,console.warn("tabdeck-card: fire_event needs an admin user",t?.message??t))})}_writeRememberEntity(t){const e=this._config?.remember_entity,i=this._hass;if(!e||!i?.callService||!i.states?.[e])return;this._entityWriteGuard=Date.now()+1500;const s=e.split(".")[0];"input_number"===s?i.callService("input_number","set_value",{entity_id:e,value:t}):"input_text"===s&&i.callService("input_text","set_value",{entity_id:e,value:String(t)})}_applySwipe(t,e){const i=function(t,e,i={}){const s=i.minDistance??50,r=i.maxDuration??800,o=i.ratio??1.5,a=e.x-t.x,n=e.y-t.y;return e.t-t.t>r||Math.abs(a)<s||Math.abs(a)<Math.abs(n)*o?null:a<0?"next":"prev"}(t,e);if(!i||!this._config)return;const s=this._stepContent(this._selected,"next"===i?1:-1,this._config.swipe_wrap);s!==this._selected&&this._userSelect(s)}willUpdate(t){super.willUpdate(t),this._config?.debug&&(this._renderStart=performance.now())}updated(t){super.updated(t),this._config?.debug&&this._renderStart&&(this._renderMs=performance.now()-this._renderStart);const e=this._visibleTabs();this._selected>e.length-1&&(this._selected=0),t.has("_selected")&&void 0!==t.get("_selected")&&!this._config?.scroll_spy&&(this._peekSettling?this._peekSettling=!1:this._animatePanel(this._selected>=t.get("_selected")?1:-1)),this._applyStyles(),t.has("_pinFor")&&this._pinFor&&!t.get("_pinFor")&&this.renderRoot.querySelector(".pin-dialog input")?.focus(),this._syncSpyObserver(),this._syncDock()}_syncDock(){if(!this._config?.dock||this._editing||!this.isConnected)return this._dockObserver?.disconnect(),void(this._dockObserver=void 0);if(this._dockObserver||"undefined"==typeof ResizeObserver)return;const t=this._dashboardPanel();t&&(this._dockObserver=new ResizeObserver(()=>this._measureDock(t)),this._dockObserver.observe(t),this._measureDock(t))}_dashboardPanel(){let t=this;for(;t;){if(t instanceof Element&&/^(HUI-ROOT|HA-PANEL-LOVELACE)$/.test(t.tagName))return t;t=t.parentNode??t.host??null}}_measureDock(t){const e=t.getBoundingClientRect();0!==e.width&&(this.style.setProperty("--tabdeck-dock-left",`${Math.max(0,Math.round(e.left))}px`),this.style.setProperty("--tabdeck-dock-right",`${Math.max(0,Math.round(window.innerWidth-e.right))}px`))}_applyStyles(){for(const i of this._appliedStyleKeys)this.style.removeProperty(i);const t=this._visibleTabs()[this._selected],e={...this._config?.styles??{},...t?.styles??{}};this._appliedStyleKeys=Object.keys(e);for(const[i,s]of Object.entries(e))this.style.setProperty(i,String(s))}_animatePanel(t){const e=this._config;if(!e)return;const i=e.transition_narrow&&this._isNarrow?e.transition_narrow:e.transition;if("none"===i||e.transition_duration<=0)return;if(this._reducedMotion())return;const s=this._panelEl(this._selected);s&&"function"==typeof s.animate&&s.animate(function(t,e){switch(t){case"fade":return[{opacity:0},{opacity:1}];case"slide":return[{opacity:0,transform:`translateX(${12*e}px)`},{opacity:1,transform:"translateX(0)"}];case"scale":return[{opacity:0,transform:"scale(0.96)"},{opacity:1,transform:"scale(1)"}];case"flip":return[{opacity:0,transform:`perspective(1200px) rotateY(${20*e}deg)`},{opacity:1,transform:"perspective(1200px) rotateY(0deg)"}];case"rise":return[{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}];default:return[]}}(i,t),{duration:e.transition_duration,easing:e.transition_easing})}render(){if(!this._config||!this._built)return V;const t=this._visibleTabs();if(0===t.length)return F`<div class="empty"></div>`;const e=this._config;if(this._isSplit)return this._wrapExtras(this._renderSplit(t));const i=e.dock&&!this._editing,s=F`
      <tabdeck-tabbar
        .items=${t.map(t=>({name:this._text(t.name),subtitle:this._text(t.subtitle)??("menu"===t.group?.display?this._groupChild.get(t):void 0),icon:this._text(t.icon),accent:Ue(this._text(t.accent)),color:Ue(this._text(t.color)),disabled:t.disabled,badgeColor:Ue(t.badge_color),holdAction:!!t.hold_action||!!e.alert_snooze&&!!t.alert,badgeAction:!!t.badge_action,action:ne(t),badge:this._resolveBadgeFinal(t),alert:this._isAlerting(t),ghost:this._editing&&this._isHidden(t),fab:t.fab,ring:this._ring(t),ringColor:Ue(t.ring_color),badgeIcon:t.badge_icon,picture:this._picture(t),iconAnimation:this._text(t.icon_animation),font:t.font_size||t.font_weight||t.font_family?{size:t.font_size,weight:t.font_weight,family:t.font_family}:void 0,menu:"menu"===t.group?.display?t.group.items:void 0}))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${i?"bottom":e.position}
        .dock=${i}
        .tabStyle=${e.style}
        .display=${this._effectiveDisplay}
        .align=${e.align}
        .badgeDisplay=${e.badge_display}
        .scrollable=${e.scrollable}
        .animated=${e.animated}
        .accentIndicator=${e.accent_indicator}
        .indicatorSize=${e.indicator_size}
        .indicatorRadius=${e.indicator_radius}
        .sticky=${e.sticky||e.scroll_spy}
        .collapsed=${this._collapsed}
        .elevation=${e.elevation}
        .scrollButtons=${e.scroll_buttons}
        .searchable=${e.search}
        .expandable=${e.fullscreen}
        @tabdeck-fullscreen=${this._toggleFullscreen}
        .railExpand=${e.rail_expand}
        .customizable=${e.customize&&!this._editing}
        .customItems=${e.customize?this._customItems():[]}
        @tabdeck-customize=${this._onCustomize}
        .overflowMenu=${e.overflow_menu}
        .barLabel=${e.aria_label}
        .language=${Ne(this._hass)}
        .barBackground=${Ue(e.bar_background)}
        .density=${e.density}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `,r=t[this._selected],o=r&&!e.scroll_spy?function(t){if("string"!=typeof t)return;const e=t.trim();return""===e||/[;{}"<>\\]/.test(e)?void 0:/^(\/|https?:\/\/)/.test(e)?`center / cover no-repeat url("${e}")`:e}(this._text(r.background)):void 0,a="auto"!==e.content_height&&"tallest"!==e.content_height?e.content_height:void 0,n=!(this._fullscreen||!a&&!e.content_max_height),c=[o?`background:${o}`:"",n&&a?`height:${a}`:"",n&&e.content_max_height?`max-height:${e.content_max_height}`:""].filter(Boolean).join(";"),d=["content",e.content_arrows&&!e.scroll_spy?"with-arrows":"","tallest"!==e.content_height||e.scroll_spy?"":"tallest",n?"scrolls":"",o||!e.scroll_spy&&t.some(t=>t.background)?"has-bg":"",this._fullscreen?"fullscreen":"",e.fullscreen&&e.hide_bar?"with-fs":""].filter(Boolean).join(" "),l=Ne(this._hass),h=F`
      <div
        class=${d}
        style=${c}
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
        ${e.content_arrows&&!e.scroll_spy?this._renderArrows():V}
        ${e.fullscreen&&(this._fullscreen||e.hide_bar)?F`<button
              class="fs-toggle"
              aria-label=${Re(l,this._fullscreen?"card.exit_fullscreen":"card.fullscreen")}
              title=${Re(l,this._fullscreen?"card.exit_fullscreen":"card.fullscreen")}
              @click=${this._toggleFullscreen}
            >
              <ha-icon .icon=${this._fullscreen?"mdi:fullscreen-exit":"mdi:fullscreen"}></ha-icon>
            </button>`:V}
        ${e.header&&!e.scroll_spy&&t[this._selected]?F`<div class="content-header">
              <span class="content-title">${this._text(t[this._selected].name)??""}</span>
              ${this._text(t[this._selected].subtitle)?F`<span class="content-subtitle"
                    >${this._text(t[this._selected].subtitle)}</span
                  >`:V}
            </div>`:V}
        ${t.map((t,i)=>{const s=this._allTabs().indexOf(t),r=i===this._selected,o=e.scroll_spy;return F`
            <div class="panel ${o?"section":""}" data-index=${i} ?hidden=${!o&&!r}>
              ${o&&e.header&&!ne(t)?F`<div class="section-title">${this._text(t.name)??""}</div>`:V}
              ${r?this._manager?.ensure(s):o||!e.unmount_hidden?this._manager?.get(s):V}
            </div>
          `})}
      </div>
    `;return this._wrapExtras(F`
      <div class="root pos-${i?"bottom":e.position} ${i?"docked":""} ${e.hide_bar?"no-bar":""}">
        ${e.hide_bar?h:i||"bottom"===e.position?F`${h}${s}`:F`${s}${h}`}
      </div>
      ${this._renderPin()}
    `)}_wrapExtras(t){const e=this._config?.debug?this._renderDebug():V;if(!this._extras)return F`${t}${e}`;const i=this._config.header_cards?.length??0,s=this._extras.all(),r=s.slice(0,i),o=s.slice(i);return F`
      ${r.length?F`<div class="deck-header">${r}</div>`:V}
      ${t}
      ${o.length?F`<div class="deck-footer">${o}</div>`:V}
      ${e}
    `}_describeCondition(t){if(!t||"object"!=typeof t)return String(t);const e=t.condition??(t.entity||t.entity_id?"state":"?"),i=ge(t).join(", ");if(Array.isArray(t.conditions))return`${e}(${t.conditions.map(t=>this._describeCondition(t)).join(", ")})`;switch(e){case"state":return`state ${i} ${void 0!==t.state_not?"≠ "+[].concat(t.state_not).join("|"):"= "+[].concat(t.state).join("|")}`;case"numeric_state":return`numeric ${i}${void 0!==t.above?" > "+t.above:""}${void 0!==t.below?" < "+t.below:""}`;case"screen":return`screen ${t.media_query}`;case"template":return"template";default:return String(e)}}_conditionsText(t){return Array.isArray(t)&&t.length?t.map(t=>`${this._describeCondition(t)} ${$e([t],this._hass,this._templateResolver)?"✓":"✗"}`).join("; "):""}_renderDebug(){const t=this._visibleTabs(),e=t[this._selected],i=this._collectTemplates(),s=t=>{const e="string"==typeof t?t:JSON.stringify(t);return void 0===e?"…":e.length>70?e.slice(0,70)+"…":e};return F`
      <details class="debug" open>
        <summary>tabdeck debug</summary>
        <div class="debug-facts">
          <span>selected ${this._selected} (${e?.name??"—"})</span>
          <span>start: ${this._startReason}</span>
          <span>deck ${this._deckId}</span>
          <span>device ${ei()??"—"}</span>
          ${this._editing?F`<span>editing</span>`:V}
          <span>build ${this._buildMs.toFixed(1)} ms</span>
          <span>render ${this._renderMs.toFixed(1)} ms</span>
        </div>
        <table>
          <tbody>
            ${this._allTabs().map((i,s)=>{const r=t.includes(i),o=this._resolveBadgeFinal(i),a=this._ring(i),n=[r?"visible":"hidden",this._conditionsText(i.visibility),i.alert?"alert "+(this._isAlerting(i)?"on":"off"):"",void 0!==o?`badge ${o}`:"",void 0!==a?`ring ${Math.round(a)}%`:"",this._isLocked(i)?"locked":"",ne(i)?"action tab":this._manager?.isLoaded(s)?"":"card not built"].filter(Boolean);return F`<tr class="tab-row ${i===e?"current":""}">
                <td>${this._text(i.name)??s}</td>
                <td>${n.join(" · ")}</td>
              </tr>`})}
          </tbody>
        </table>
        ${i.length?F`<div class="debug-templates">
              ${i.map(t=>F`<div><code>${s(t)}</code> → <code>${s(this._templates?.result(t))}</code></div>`)}
            </div>`:V}
      </details>
    `}_renderArrows(){const t=!!this._config?.swipe_wrap,e=this._stepContent(this._selected,-1,t),i=this._stepContent(this._selected,1,t),s=Ne(this._hass);return F`
      ${e!==this._selected?F`<button class="nav-arrow prev" aria-label=${Re(s,"card.prev_tab")} @click=${()=>this._userSelect(e)}>‹</button>`:V}
      ${i!==this._selected?F`<button class="nav-arrow next" aria-label=${Re(s,"card.next_tab")} @click=${()=>this._userSelect(i)}>›</button>`:V}
    `}_isAlerting(t){if(!t.alert||!this._hass)return!1;const e=$e(t.alert,this._hass,this._templateResolver);if(!this._config?.alert_snooze)return e;const i=this._snoozeKey(t),s=void 0!==function(t,e,i){try{const s=Number(localStorage.getItem(ii(t,e)));return Number.isFinite(s)&&s>i?s:void 0}catch{return}}(this._deckId,i,Date.now());return!e&&s&&function(t,e){try{localStorage.removeItem(ii(t,e))}catch{}}(this._deckId,i),e&&!s}_picture(t){const e=this._text(t.picture);if(e)return/^[a-z_]+\.[a-z0-9_]+$/.test(e)?this._hass?.states?.[e]?.attributes?.entity_picture||void 0:e}_ring(t){if(void 0!==t.ring)return function(t,e){if(void 0===t||""===String(t).trim())return;const i=Number(t);return Number.isFinite(i)&&e>0?Math.min(100,Math.max(0,i/e*100)):void 0}(this._resolveBadge(t.ring),t.ring_max??100)}_text(t){if(!Te(t))return t;const e=this._templates?.result(t);return null==e||""===String(e).trim()?void 0:String(e).trim()}_resolveBadgeFinal(t){const e=this._resolveBadge(t.badge);if(!this._config?.hide_inactive_badge||Xe(e))return"dot"===this._config?.badge_display?e:vt(e,t.badge_format??this._config?.badge_format)}_resolveBadge(t){if(!t)return;if("object"==typeof t){const e=function(t){if(!t||"object"!=typeof t||Array.isArray(t))return;const e=Ze(t.count);if(!e?.length)return;const i={count:e},s=Ze(t.state);return s?.length&&(i.state=s),"string"==typeof t.area&&t.area&&(i.area=t.area),i}(t);return e&&this._hass?function(t,e){let i=0;for(const[s,r]of Object.entries(e?.states??{})){if(!t.count.some(t=>{return e=s,(i=t).includes("*")?new RegExp("^"+i.split("*").map(t=>t.replace(/[.+?^${}()|[\]\\]/g,"\\$&")).join(".*")+"$").test(e):e===i;var e,i}))continue;if(t.area&&Je(e,s)!==t.area)continue;const o=r?.state;(t.state?t.state.includes(o):Xe(o))&&i++}return String(i)}(e,this._hass):void 0}if(Te(t)){const e=this._templates?.result(t);return null==e?void 0:String(e)}if(!this._hass)return;const e=this._hass.states[t];return e?e.state:t}static{this.styles=o`
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
  `}};We([_t()],di.prototype,"_config",void 0),We([_t()],di.prototype,"_selected",void 0),We([_t()],di.prototype,"_built",void 0),We([_t()],di.prototype,"_width",void 0),We([_t()],di.prototype,"_collapsed",void 0),We([_t()],di.prototype,"_fullscreen",void 0),We([_t()],di.prototype,"_genTabs",void 0),We([_t()],di.prototype,"_pinFor",void 0),We([_t()],di.prototype,"_layout",void 0),di=We([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("tabdeck-card")],di),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{di as TabdeckCard};