/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@lit/reactive-element/css-tag.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const css_tag_t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,css_tag_e=Symbol(),n=new Map;class s{constructor(t,n){if(this._$cssResult$=!0,n!==css_tag_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=n.get(this.cssText);return css_tag_t&&void 0===e&&(n.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=t=>new s("string"==typeof t?t:t+"",css_tag_e),r=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s(o,css_tag_e)},i=(e,n)=>{css_tag_t?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n)}))},S=css_tag_t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o(e)})(t):t;
//# sourceMappingURL=css-tag.js.map

;// CONCATENATED MODULE: ./node_modules/@lit/reactive-element/reactive-element.js

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var reactive_element_s;const reactive_element_e=window.trustedTypes,reactive_element_r=reactive_element_e?reactive_element_e.emptyScript:"",h=window.reactiveElementPolyfillSupport,reactive_element_o={toAttribute(t,i){switch(i){case Boolean:t=t?reactive_element_r:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},reactive_element_n=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:reactive_element_o,reflect:!1,hasChanged:reactive_element_n};class a extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e))})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i))}else void 0!==i&&s.push(S(i));return s}static _$Eh(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ES(t,i,s=l){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:reactive_element_o.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:reactive_element_o.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||reactive_element_n)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU()}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:a}),(null!==(reactive_element_s=globalThis.reactiveElementVersions)&&void 0!==reactive_element_s?reactive_element_s:globalThis.reactiveElementVersions=[]).push("1.2.1");
//# sourceMappingURL=reactive-element.js.map

;// CONCATENATED MODULE: ./node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var lit_html_t;const lit_html_i=globalThis.trustedTypes,lit_html_s=lit_html_i?lit_html_i.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_e=`lit$${(Math.random()+"").slice(9)}$`,lit_html_o="?"+lit_html_e,lit_html_n=`<${lit_html_o}>`,lit_html_l=document,lit_html_h=(t="")=>lit_html_l.createComment(t),lit_html_r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,lit_html_a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),y=p(2),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(lit_html_h(),t),t,void 0,null!=s?s:{})}return l._$AI(t),l},A=lit_html_l.createTreeWalker(lit_html_l,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=lit_html_a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===lit_html_a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+lit_html_n:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+lit_html_e+y):s+lit_html_e+(-2===p?(l.push(void 0),i):y)}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==lit_html_s?lit_html_s.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(lit_html_e)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(lit_html_e),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:lit_html_S})}else c.push({type:6,index:r})}for(const i of t)l.removeAttribute(i)}if(g.test(l.tagName)){const t=l.textContent.split(lit_html_e),s=t.length-1;if(s>0){l.textContent=lit_html_i?lit_html_i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],lit_html_h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],lit_html_h())}}}else if(8===l.nodeType)if(l.data===lit_html_o)c.push({type:2,index:r});else{let t=-1;for(;-1!==(t=l.data.indexOf(lit_html_e,t+1));)c.push({type:7,index:r}),t+=lit_html_e.length-1}r++}}static createElement(t,i){const s=lit_html_l.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=lit_html_r(i)?void 0:i._$litDirective$;return(null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:lit_html_l).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r]}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++)}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),lit_html_r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):u(t)?this.A(t):this.$(t)}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==w&&lit_html_r(this._$AH)?this._$AA.nextSibling.data=t:this.S(lit_html_l.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else{const t=new V(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}A(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(lit_html_h()),this.M(lit_html_h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class lit_html_S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!lit_html_r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!lit_html_r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h}n&&!e&&this.k(t)}k(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class M extends lit_html_S{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===w?void 0:t}}const k=lit_html_i?lit_html_i.emptyScript:"";class H extends lit_html_S{constructor(){super(...arguments),this.type=4}k(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class I extends lit_html_S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const R={P:"$lit$",V:lit_html_e,L:lit_html_o,I:1,N:C,R:V,D:u,j:P,H:N,O:lit_html_S,F:H,B:I,W:M,Z:L},z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(lit_html_t=globalThis.litHtmlVersions)&&void 0!==lit_html_t?lit_html_t:globalThis.litHtmlVersions=[]).push("2.1.2");
//# sourceMappingURL=lit-html.js.map

;// CONCATENATED MODULE: ./node_modules/lit-element/lit-element.js

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var lit_element_l,lit_element_o;const lit_element_r=(/* unused pure expression or super */ null && (t));class lit_element_s extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return b}}lit_element_s.finalized=!0,lit_element_s._$litElement$=!0,null===(lit_element_l=globalThis.litElementHydrateSupport)||void 0===lit_element_l||lit_element_l.call(globalThis,{LitElement:lit_element_s});const lit_element_n=globalThis.litElementPolyfillSupport;null==lit_element_n||lit_element_n({LitElement:lit_element_s});const lit_element_h={_$AK:(t,e,i)=>{t._$AK(e,i)},_$AL:t=>t._$AL};(null!==(lit_element_o=globalThis.litElementVersions)&&void 0!==lit_element_o?lit_element_o:globalThis.litElementVersions=[]).push("3.1.2");
//# sourceMappingURL=lit-element.js.map

;// CONCATENATED MODULE: ./node_modules/lit/index.js

//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/custom-card-helpers/dist/index.m.js
var index_m_t,index_m_r,index_m_n=function(e,t){return index_m_i(t).format(e)},index_m_i=function(e){return new Intl.DateTimeFormat(e.language,{weekday:"long",month:"long",day:"numeric"})},index_m_a=function(e,t){return index_m_o(t).format(e)},index_m_o=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"})},index_m_u=function(e,t){return index_m_c(t).format(e)},index_m_c=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric"})},index_m_m=function(e,t){return index_m_s(t).format(e)},index_m_s=function(e){return new Intl.DateTimeFormat(e.language,{day:"numeric",month:"short"})},index_m_l=function(e,t){return index_m_d(t).format(e)},index_m_d=function(e){return new Intl.DateTimeFormat(e.language,{month:"long",year:"numeric"})},index_m_f=function(e,t){return index_m_g(t).format(e)},index_m_g=function(e){return new Intl.DateTimeFormat(e.language,{month:"long"})},index_m_p=function(e,t){return index_m_h(t).format(e)},index_m_h=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric"})};!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(index_m_t||(index_m_t={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(index_m_r||(index_m_r={}));var index_m_b=function(e){if(e.time_format===index_m_r.language||e.time_format===index_m_r.system){var t=e.time_format===index_m_r.language?e.language:void 0,n=(new Date).toLocaleString(t);return n.includes("AM")||n.includes("PM")}return e.time_format===index_m_r.am_pm},index_m_v=function(e,t){return index_m_(t).format(e)},index_m_=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:index_m_b(e)?"numeric":"2-digit",minute:"2-digit",hour12:index_m_b(e)})},index_m_y=function(e,t){return index_m_w(t).format(e)},index_m_w=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:index_m_b(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:index_m_b(e)})},index_m_k=function(e,t){return index_m_x(t).format(e)},index_m_x=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:index_m_b(e)})},D=function(e,t){return index_m_S(t).format(e)},index_m_S=function(e){return new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:index_m_b(e)})},F=function(e,t){return index_m_T(t).format(e)},index_m_T=function(e){return new Intl.DateTimeFormat(e.language,{hour:index_m_b(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:index_m_b(e)})},index_m_I=function(e,t){return index_m_N(t).format(e)},index_m_N=function(e){return new Intl.DateTimeFormat(e.language,{hour:index_m_b(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:index_m_b(e)})},index_m_M=function(t,r,n,i){void 0===i&&(i=!0);var a=e(t,n);return i?function(e){return new Intl.RelativeTimeFormat(e.language,{numeric:"auto"})}(r).format(a.value,a.unit):Intl.NumberFormat(r.language,{style:"unit",unit:a.unit,unitDisplay:"long"}).format(Math.abs(a.value))};function index_m_C(e){var t,r=3600*(t=e.attributes.remaining.split(":").map(Number))[0]+60*t[1]+t[2];if("active"===e.state){var n=(new Date).getTime(),i=new Date(e.last_changed).getTime();r=Math.max(r-(n-i)/1e3,0)}return r}function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var q=function(e,t,r,n){void 0===n&&(n=!1),e._themes||(e._themes={});var i=t.default_theme;("default"===r||r&&t.themes[r])&&(i=r);var a=O({},e._themes);if("default"!==i){var o=t.themes[i];Object.keys(o).forEach(function(t){var r="--"+t;e._themes[r]="",a[r]=o[t]})}if(e.updateStyles?e.updateStyles(a):window.ShadyCSS&&window.ShadyCSS.styleSubtree(e,a),n){var u=document.querySelector("meta[name=theme-color]");if(u){u.hasAttribute("default-content")||u.setAttribute("default-content",u.getAttribute("content"));var c=a["--primary-color"]||u.getAttribute("default-content");u.setAttribute("content",c)}}},index_m_A=function(e){return"function"==typeof e.getCardSize?e.getCardSize():4};function index_m_E(e){return e.substr(0,e.indexOf("."))}function j(e){return e.substr(e.indexOf(".")+1)}function index_m_R(e){var t,r=(null==e||null==(t=e.locale)?void 0:t.language)||"en";return e.translationMetadata.translations[r]&&e.translationMetadata.translations[r].isRTL||!1}function index_m_z(e){return index_m_R(e)?"rtl":"ltr"}function index_m_L(e){return index_m_E(e.entity_id)}var index_m_P=function(e){return!!e.attributes.unit_of_measurement||!!e.attributes.state_class},U=function(e){switch(e.number_format){case index_m_t.comma_decimal:return["en-US","en"];case index_m_t.decimal_comma:return["de","es","it"];case index_m_t.space_comma:return["fr","sv","cs"];case index_m_t.system:return;default:return e.language}},B=function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)},index_m_H=function(e,r,n){var i=r?U(r):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==r?void 0:r.number_format)!==index_m_t.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(i,index_m_V(e,n)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,index_m_V(e,n)).format(Number(e))}return"string"==typeof e?e:B(e,null==n?void 0:n.maximumFractionDigits).toString()+("currency"===(null==n?void 0:n.style)?" "+n.currency:"")},index_m_V=function(e,t){var r=O({maximumFractionDigits:2},t);if("string"!=typeof e)return r;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var n=e.indexOf(".")>-1?e.split(".")[1].length:0;r.minimumFractionDigits=n,r.maximumFractionDigits=n}return r},W=function(e,t,r,n){var i=void 0!==n?n:t.state;if("unknown"===i||"unavailable"===i)return e("state.default."+i);if(index_m_P(t)){if("monetary"===t.attributes.device_class)try{return index_m_H(i,r,{style:"currency",currency:t.attributes.unit_of_measurement})}catch(e){}return index_m_H(i,r)+(t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:"")}var o=index_m_L(t);if("input_datetime"===o){var u;if(void 0===n)return t.attributes.has_date&&t.attributes.has_time?(u=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),index_m_v(u,r)):t.attributes.has_date?(u=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),index_m_a(u,r)):t.attributes.has_time?((u=new Date).setHours(t.attributes.hour,t.attributes.minute),D(u,r)):t.state;try{var c=n.split(" ");if(2===c.length)return index_m_v(new Date(c.join("T")),r);if(1===c.length){if(n.includes("-"))return index_m_a(new Date(n+"T00:00"),r);if(n.includes(":")){var m=new Date;return D(new Date(m.toISOString().split("T")[0]+"T"+n),r)}}return n}catch(e){return n}}return"humidifier"===o&&"on"===i&&t.attributes.humidity?t.attributes.humidity+" %":"counter"===o||"number"===o||"input_number"===o?index_m_H(i,r):t.attributes.device_class&&e("component."+o+".state."+t.attributes.device_class+"."+i)||e("component."+o+".state._."+i)||i},G="mdi:bookmark",J="lovelace",K=(/* unused pure expression or super */ null && (["climate","cover","configurator","input_select","input_number","input_text","lock","media_player","scene","script","timer","vacuum","water_heater","weblink"])),Q=(/* unused pure expression or super */ null && (["alarm_control_panel","automation","camera","climate","configurator","cover","fan","group","history_graph","input_datetime","light","lock","media_player","script","sun","updater","vacuum","water_heater","weather"])),X=(/* unused pure expression or super */ null && (["input_number","input_select","input_text","scene","weblink"])),Y=(/* unused pure expression or super */ null && (["camera","configurator","history_graph","scene"])),Z=["closed","locked","off"],index_m_$=new Set(["fan","input_boolean","light","switch","group","automation"]),ee="°C",te="°F",re="group.default_view",ne=function(e,t,r,n){n=n||{},r=null==r?{}:r;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=r,e.dispatchEvent(i),i},ie=new Set(["call-service","divider","section","weblink","cast","select"]),ae={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},oe=function(e,t){void 0===t&&(t=!1);var r=function(e,t){return n("hui-error-card",{type:"error",error:e,config:t})},n=function(e,t){var n=window.document.createElement(e);try{if(!n.setConfig)return;n.setConfig(t)}catch(n){return console.error(e,n),r(n.message,t)}return n};if(!e||"object"!=typeof e||!t&&!e.type)return r("No type defined",e);var i=e.type;if(i&&i.startsWith("custom:"))i=i.substr("custom:".length);else if(t)if(ie.has(i))i="hui-"+i+"-row";else{if(!e.entity)return r("Invalid config given.",e);var a=e.entity.split(".",1)[0];i="hui-"+(ae[a]||"text")+"-entity-row"}else i="hui-"+i+"-card";if(customElements.get(i))return n(i,e);var o=r("Custom element doesn't exist: "+e.type+".",e);o.style.display="None";var u=setTimeout(function(){o.style.display=""},2e3);return customElements.whenDefined(e.type).then(function(){clearTimeout(u),ne(o,"ll-rebuild",{},o)}),o},ue=function(e,t,r){var n;return void 0===r&&(r=!1),function(){var i=[].slice.call(arguments),a=this,o=function(){n=null,r||e.apply(a,i)},u=r&&!n;clearTimeout(n),n=setTimeout(o,t),u&&e.apply(a,i)}},ce={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function me(e,t){if(e in ce)return ce[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var se=function(e,t){var r=t.value||t,n=t.attribute?e.attributes[t.attribute]:e.state;switch(t.operator||"=="){case"==":return n===r;case"<=":return n<=r;case"<":return n<r;case">=":return n>=r;case">":return n>r;case"!=":return n!==r;case"regex":return n.match(r);default:return!1}},le=function(e){ne(window,"haptic",e)},de=function(e,t,r){void 0===r&&(r=!1),r?history.replaceState(null,"",t):history.pushState(null,"",t),ne(window,"location-changed",{replace:r})},fe=function(e,t,r){void 0===r&&(r=!0);var n,i=index_m_E(t),a="group"===i?"homeassistant":i;switch(i){case"lock":n=r?"unlock":"lock";break;case"cover":n=r?"open_cover":"close_cover";break;default:n=r?"turn_on":"turn_off"}return e.callService(a,n,{entity_id:t})},ge=function(e,t){var r=Z.includes(e.states[t].state);return fe(e,t,r)},pe=function(e,t,r,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(le("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(r.entity||r.camera_image)&&ne(e,"hass-more-info",{entityId:r.entity?r.entity:r.camera_image});break;case"navigate":n.navigation_path&&de(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":r.entity&&(ge(t,r.entity),le("success"));break;case"call-service":if(!n.service)return void le("failure");var i=n.service.split(".",2);t.callService(i[0],i[1],n.service_data,n.target),le("success");break;case"fire-dom-event":ne(e,"ll-custom",n)}},he=function(e,t,r,n){var i;"double_tap"===n&&r.double_tap_action?i=r.double_tap_action:"hold"===n&&r.hold_action?i=r.hold_action:"tap"===n&&r.tap_action&&(i=r.tap_action),pe(e,t,r,i)},be=function(e,t,r,n,i){var a;if(i&&r.double_tap_action?a=r.double_tap_action:n&&r.hold_action?a=r.hold_action:!n&&r.tap_action&&(a=r.tap_action),a||(a={action:"more-info"}),!a.confirmation||a.confirmation.exemptions&&a.confirmation.exemptions.some(function(e){return e.user===t.user.id})||confirm(a.confirmation.text||"Are you sure you want to "+a.action+"?"))switch(a.action){case"more-info":(a.entity||r.entity||r.camera_image)&&(ne(e,"hass-more-info",{entityId:a.entity?a.entity:r.entity?r.entity:r.camera_image}),a.haptic&&le(a.haptic));break;case"navigate":a.navigation_path&&(de(0,a.navigation_path),a.haptic&&le(a.haptic));break;case"url":a.url_path&&window.open(a.url_path),a.haptic&&le(a.haptic);break;case"toggle":r.entity&&(ge(t,r.entity),a.haptic&&le(a.haptic));break;case"call-service":if(!a.service)return;var o=a.service.split(".",2),u=o[0],c=o[1],m=O({},a.service_data);"entity"===m.entity_id&&(m.entity_id=r.entity),t.callService(u,c,m,a.target),a.haptic&&le(a.haptic);break;case"fire-dom-event":ne(e,"ll-custom",a),a.haptic&&le(a.haptic)}};function ve(e){return void 0!==e&&"none"!==e.action}function _e(e,t,r){if(t.has("config")||r)return!0;if(e.config.entity){var n=t.get("hass");return!n||n.states[e.config.entity]!==e.hass.states[e.config.entity]}return!1}function ye(e){return void 0!==e&&"none"!==e.action}var we=function(e,t,r){void 0===r&&(r=!0);var n={};t.forEach(function(t){if(Z.includes(e.states[t].state)===r){var i=index_m_E(t),a=["cover","lock"].includes(i)?i:"homeassistant";a in n||(n[a]=[]),n[a].push(t)}}),Object.keys(n).forEach(function(t){var i;switch(t){case"lock":i=r?"unlock":"lock";break;case"cover":i=r?"open_cover":"close_cover";break;default:i=r?"turn_on":"turn_off"}e.callService(t,i,{entity_id:n[t]})})},ke=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null},xe={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},De={binary_sensor:function(e,t){var r="off"===e;switch(null==t?void 0:t.attributes.device_class){case"battery":return r?"mdi:battery":"mdi:battery-outline";case"battery_charging":return r?"mdi:battery":"mdi:battery-charging";case"cold":return r?"mdi:thermometer":"mdi:snowflake";case"connectivity":return r?"mdi:server-network-off":"mdi:server-network";case"door":return r?"mdi:door-closed":"mdi:door-open";case"garage_door":return r?"mdi:garage":"mdi:garage-open";case"power":return r?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return r?"mdi:check-circle":"mdi:alert-circle";case"smoke":return r?"mdi:check-circle":"mdi:smoke";case"heat":return r?"mdi:thermometer":"mdi:fire";case"light":return r?"mdi:brightness-5":"mdi:brightness-7";case"lock":return r?"mdi:lock":"mdi:lock-open";case"moisture":return r?"mdi:water-off":"mdi:water";case"motion":return r?"mdi:walk":"mdi:run";case"occupancy":return r?"mdi:home-outline":"mdi:home";case"opening":return r?"mdi:square":"mdi:square-outline";case"plug":return r?"mdi:power-plug-off":"mdi:power-plug";case"presence":return r?"mdi:home-outline":"mdi:home";case"running":return r?"mdi:stop":"mdi:play";case"sound":return r?"mdi:music-note-off":"mdi:music-note";case"update":return r?"mdi:package":"mdi:package-up";case"vibration":return r?"mdi:crop-portrait":"mdi:vibrate";case"window":return r?"mdi:window-closed":"mdi:window-open";default:return r?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"mdi:garage-open":"mdi:garage";case"door":return t?"mdi:door-open":"mdi:door-closed";case"shutter":return t?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return t?"mdi:blinds-open":"mdi:blinds";case"window":return t?"mdi:window-open":"mdi:window-closed";default:return me("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in xe)return xe[t];if("battery"===t){var r=Number(e.state);if(isNaN(r))return"mdi:battery-unknown";var n=10*Math.round(r/10);return n>=100?"mdi:battery":n<=0?"mdi:battery-alert":"hass:battery-"+n}var i=e.attributes.unit_of_measurement;return"°C"===i||"°F"===i?"mdi:thermometer":me("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?me("input_datetime"):"mdi:calendar":"mdi:clock"}},Se=function(e){if(!e)return"mdi:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=index_m_E(e.entity_id);return t in De?De[t](e):me(t,e.state)};
//# sourceMappingURL=index.m.js.map

;// CONCATENATED MODULE: ./src/lib/constants.js
// Source:
// https://github.com/home-assistant/frontend/blob/dev/src/data/entity.ts
// https://github.com/home-assistant/frontend/blob/dev/src/data/translation.ts
// https://github.com/home-assistant/frontend/blob/dev/src/panels/lovelace/cards/types.ts
var UNAVAILABLE = 'unavailable';
var UNKNOWN = 'unknown';
var UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN];
var LAST_CHANGED = 'last-changed';
var LAST_UPDATED = 'last-updated';
var TIMESTAMP_FORMATS = ['relative', 'total', 'date', 'time', 'datetime'];
var SECONDARY_INFO_VALUES = (/* unused pure expression or super */ null && (['entity-id', 'last-changed', 'last-updated', 'last-triggered', 'position', 'tilt-position', 'brightness']));
var NumberFormat = {
  language: 'language',
  system: 'system',
  comma_decimal: 'comma_decimal',
  decimal_comma: 'decimal_comma',
  space_comma: 'space_comma',
  none: 'none'
};
var TimeFormat = {
  language: 'language',
  system: 'system',
  am_pm: '12',
  twenty_four: '24'
};
;// CONCATENATED MODULE: ./src/lib/seconds_to_duration.js
// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/seconds_to_duration.ts
var leftPad = function leftPad(num) {
  return num < 10 ? "0".concat(num) : num;
};

function secondsToDuration(d) {
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  if (h > 0) {
    return "".concat(h, ":").concat(leftPad(m), ":").concat(leftPad(s));
  }

  if (m > 0) {
    return "".concat(m, ":").concat(leftPad(s));
  }

  if (s > 0) {
    return '' + s;
  }

  return null;
}
;// CONCATENATED MODULE: ./src/lib/format_number.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/number/format_number.ts

var round = function round(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
};
var isNumericState = function isNumericState(stateObj) {
  return !!stateObj.attributes.unit_of_measurement || !!stateObj.attributes.state_class;
};
var numberFormatToLocale = function numberFormatToLocale(localeOptions) {
  switch (localeOptions.number_format) {
    case NumberFormat.comma_decimal:
      return ['en-US', 'en'];
    // Use United States with fallback to English formatting 1,234,567.89

    case NumberFormat.decimal_comma:
      return ['de', 'es', 'it'];
    // Use German with fallback to Spanish then Italian formatting 1.234.567,89

    case NumberFormat.space_comma:
      return ['fr', 'sv', 'cs'];
    // Use French with fallback to Swedish and Czech formatting 1 234 567,89

    case NumberFormat.system:
      return undefined;

    default:
      return localeOptions.language;
  }
};
var formatNumber = function formatNumber(num, localeOptions, options) {
  var locale = localeOptions ? numberFormatToLocale(localeOptions) : undefined; // Polyfill for Number.isNaN, which is more reliable than the global isNaN()

  Number.isNaN = Number.isNaN || function isNaN(input) {
    return typeof input === 'number' && isNaN(input);
  };

  if ((localeOptions === null || localeOptions === void 0 ? void 0 : localeOptions.number_format) !== NumberFormat.none && !Number.isNaN(Number(num)) && Intl) {
    try {
      return new Intl.NumberFormat(locale, getDefaultFormatOptions(num, options)).format(Number(num));
    } catch (err) {
      // Don't fail when using "TEST" language
      // eslint-disable-next-line no-console
      console.error(err);
      return new Intl.NumberFormat(undefined, getDefaultFormatOptions(num, options)).format(Number(num));
    }
  }

  if (typeof num === 'string') {
    return num;
  }

  return "".concat(round(num, options === null || options === void 0 ? void 0 : options.maximumFractionDigits).toString()).concat((options === null || options === void 0 ? void 0 : options.style) === 'currency' ? " ".concat(options.currency) : '');
};

var getDefaultFormatOptions = function getDefaultFormatOptions(num, options) {
  var defaultOptions = _objectSpread({
    maximumFractionDigits: 2
  }, options);

  if (typeof num !== 'string') {
    return defaultOptions;
  } // Keep decimal trailing zeros if they are present in a string numeric value


  if (!options || !options.minimumFractionDigits && !options.maximumFractionDigits) {
    var digits = num.indexOf('.') > -1 ? num.split('.')[1].length : 0;
    defaultOptions.minimumFractionDigits = digits;
    defaultOptions.maximumFractionDigits = digits;
  }

  return defaultOptions;
};
;// CONCATENATED MODULE: ./node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}



;// CONCATENATED MODULE: ./src/lib/format_date.js
// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_date.ts

var formatDate = function formatDate(dateObj, locale) {
  return formatDateMem(locale).format(dateObj);
};
var formatDateMem = memoizeOne(function (locale) {
  return new Intl.DateTimeFormat(locale.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
;// CONCATENATED MODULE: ./src/lib/use_am_pm.js
// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/use_am_pm.ts


var useAmPm = memoizeOne(function (locale) {
  if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
    var testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
    var test = new Date().toLocaleString(testLanguage);
    return test.includes('AM') || test.includes('PM');
  }

  return locale.time_format === TimeFormat.am_pm;
});
;// CONCATENATED MODULE: ./src/lib/format_date_time.js
// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_date_time.ts


var formatDateTime = function formatDateTime(dateObj, locale) {
  return formatDateTimeMem(locale).format(dateObj);
};
var formatDateTimeMem = memoizeOne(function (locale) {
  return new Intl.DateTimeFormat(locale.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: useAmPm(locale)
  });
});
;// CONCATENATED MODULE: ./src/lib/format_time.js
// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_time.ts


var formatTime = function formatTime(dateObj, locale) {
  return formatTimeMem(locale).format(dateObj);
};
var formatTimeMem = memoizeOne(function (locale) {
  return new Intl.DateTimeFormat(locale.language, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: useAmPm(locale)
  });
});
;// CONCATENATED MODULE: ./src/lib/compute_state_display.js
// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/entity/compute_state_display.ts





var computeStateDomain = function computeStateDomain(stateObj) {
  return stateObj.entity_id.substr(0, stateObj.entity_id.indexOf('.'));
};
var computeStateDisplay = function computeStateDisplay(localize, stateObj, locale, state) {
  var compareState = state !== undefined ? state : stateObj.state;

  if (compareState === UNKNOWN || compareState === UNAVAILABLE) {
    return localize("state.default.".concat(compareState));
  } // Entities with a `unit_of_measurement` or `state_class` are numeric values and should use `formatNumber`


  if (isNumericState(stateObj)) {
    if (stateObj.attributes.device_class === 'monetary') {
      try {
        return formatNumber(compareState, locale, {
          style: 'currency',
          currency: stateObj.attributes.unit_of_measurement
        });
      } catch (_err) {// fallback to default
      }
    }

    return "".concat(formatNumber(compareState, locale)).concat(stateObj.attributes.unit_of_measurement ? ' ' + stateObj.attributes.unit_of_measurement : '');
  }

  var domain = computeStateDomain(stateObj);

  if (domain === 'input_datetime') {
    if (state !== undefined) {
      // If trying to display an explicit state, need to parse the explict state to `Date` then format.
      // Attributes aren't available, we have to use `state`.
      try {
        var components = state.split(' ');

        if (components.length === 2) {
          // Date and time.
          return formatDateTime(new Date(components.join('T')), locale);
        }

        if (components.length === 1) {
          if (state.includes('-')) {
            // Date only.
            return formatDate(new Date("".concat(state, "T00:00")), locale);
          }

          if (state.includes(':')) {
            // Time only.
            var now = new Date();
            return formatTime(new Date("".concat(now.toISOString().split('T')[0], "T").concat(state)), locale);
          }
        }

        return state;
      } catch (_e) {
        // Formatting methods may throw error if date parsing doesn't go well,
        // just return the state string in that case.
        return state;
      }
    } else {
      // If not trying to display an explicit state, create `Date` object from `stateObj`'s attributes then format.
      var date;

      if (stateObj.attributes.has_date && stateObj.attributes.has_time) {
        date = new Date(stateObj.attributes.year, stateObj.attributes.month - 1, stateObj.attributes.day, stateObj.attributes.hour, stateObj.attributes.minute);
        return formatDateTime(date, locale);
      }

      if (stateObj.attributes.has_date) {
        date = new Date(stateObj.attributes.year, stateObj.attributes.month - 1, stateObj.attributes.day);
        return formatDate(date, locale);
      }

      if (stateObj.attributes.has_time) {
        date = new Date();
        date.setHours(stateObj.attributes.hour, stateObj.attributes.minute);
        return formatTime(date, locale);
      }

      return stateObj.state;
    }
  }

  if (domain === 'humidifier') {
    if (compareState === 'on' && stateObj.attributes.humidity) {
      return "".concat(stateObj.attributes.humidity, " %");
    }
  } // `counter` `number` and `input_number` domains do not have a unit of measurement but should still use `formatNumber`


  if (domain === 'counter' || domain === 'number' || domain === 'input_number') {
    return formatNumber(compareState, locale);
  } // state of button is a timestamp


  if (domain === 'button' || domain === 'sensor' && stateObj.attributes.device_class === 'timestamp') {
    return formatDateTime(new Date(compareState), locale);
  }

  return (// Return device class translation
    stateObj.attributes.device_class && localize("component.".concat(domain, ".state.").concat(stateObj.attributes.device_class, ".").concat(compareState)) || // Return default translation
    localize("component.".concat(domain, ".state._.").concat(compareState)) || // We don't know! Return the raw state.
    compareState
  );
};
;// CONCATENATED MODULE: ./src/util.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


var isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && !!obj;
};
var isUnavailable = function isUnavailable(stateObj) {
  return !stateObj || UNAVAILABLE_STATES.includes(stateObj.state);
};
var hideUnavailable = function hideUnavailable(stateObj, config) {
  return config.hide_unavailable && (isUnavailable(stateObj) || config.attribute && stateObj.attributes[config.attribute] === undefined);
};
var getValue = function getValue(stateObj, config) {
  return config.attribute ? stateObj.attributes[config.attribute] : stateObj.state;
};
var hideIf = function hideIf(stateObj, config, hass) {
  if (hideUnavailable(stateObj, config)) {
    return true;
  }

  if (config.hide_if === undefined) {
    return false;
  }

  var value = getValue(stateObj, config);
  var hideValues = [];

  if (isObject(config.hide_if)) {
    if (config.hide_if.entity && config.hide_if.state) {
      return String(hass.states[config.hide_if.entity].state) === String(config.hide_if.state);
    }

    if (config.hide_if.below && value < config.hide_if.below) {
      return true;
    }

    if (config.hide_if.above && value > config.hide_if.above) {
      return true;
    }

    if (config.hide_if.value) {
      hideValues = hideValues.concat(config.hide_if.value);
    }
  } else {
    hideValues = hideValues.concat(config.hide_if);
  }

  return hideValues.some(function (hideValue) {
    return typeof hideValue === 'number' ? hideValue === +value : hideValue === value;
  });
};
var getEntityIds = function getEntityIds(config) {
  var _config$entities, _config$info_entities;

  return [config.entity, config.entities, config.info_entities].concat((_config$entities = config.entities) === null || _config$entities === void 0 ? void 0 : _config$entities.map(function (entity) {
    return typeof entity === 'string' ? entity : entity.entity;
  })).concat((_config$info_entities = config.info_entities) === null || _config$info_entities === void 0 ? void 0 : _config$info_entities.map(function (entity) {
    return typeof entity === 'string' ? entity : entity.entity;
  })).filter(function (entity) {
    return entity;
  });
};
var hasConfigOrEntitiesChanged = function hasConfigOrEntitiesChanged(node, changedProps) {
  if (changedProps.has('config')) {
    return true;
  }

  var oldHass = changedProps.get('_hass');

  if (oldHass) {
    return node.entityIds.some(function (entity) {
      return oldHass.states[entity] !== node._hass.states[entity];
    });
  }

  return false;
};
;// CONCATENATED MODULE: ./src/entity.js
function entity_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function entity_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? entity_ownKeys(Object(source), !0).forEach(function (key) { entity_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : entity_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function entity_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var checkEntity = function checkEntity(config) {
  if (isObject(config) && !(config.entity || config.attribute || config.icon)) {
    throw new Error("Entity object requires at least one 'entity', 'attribute' or 'icon'.");
  } else if (typeof config === 'string' && config === '') {
    throw new Error('Entity ID string must not be blank.');
  } else if (typeof config !== 'string' && !isObject(config)) {
    throw new Error('Entity config must be a valid entity ID string or entity object.');
  }
};
var computeEntity = function computeEntity(entityId) {
  return entityId.substr(entityId.indexOf('.') + 1);
};
var entityName = function entityName(stateObj, config) {
  if (config.name === false) return null;
  return config.name || (config.entity ? stateObj.attributes.friendly_name || computeEntity(stateObj.entity_id) : null) || null;
};
var entityIcon = function entityIcon(stateObj, config, hass) {
  if (!('icon' in config)) return stateObj.attributes.icon || null;
  if (typeof config.icon === 'string') return config.icon || null;
  if (config.icon.state_on) return renderCustomStateIcon(stateObj, config);
  if (config.icon.conditions) return renderConditionIcons(stateObj, config, hass);
};
var renderConditionIcons = function renderConditionIcons(stateObj, config, hass) {
  var entityValue = stateObj.state;
  var matchedConditions = config.icon.conditions.filter(function (item) {
    if (item.entity) {
      var entity = hass.states[item.entity];
      entityValue = config.attribute ? entity.attributes[item.attribute] : entity.state;
    }

    return checkConditionalValue(item, entityValue);
  });
  return matchedConditions.pop();
};
var checkConditionalValue = function checkConditionalValue(item, checkValue) {
  if (item.condition == 'equals' && checkValue == item.value) {
    return true;
  }

  if (item.condition == 'not_equals' && checkValue != item.value) {
    return true;
  }

  if (item.condition == 'above' && checkValue > item.value) {
    return true;
  }

  if (item.condition == 'below' && checkValue < item.value) {
    return true;
  }
};
var renderCustomStateIcon = function renderCustomStateIcon(stateObj, config) {
  var domain = computeStateDomain(stateObj);

  switch (domain) {
    case 'light':
    case 'switch':
    case 'binary_sensor':
      return stateObj.state === 'on' ? config.icon.state_on : config.icon.state_off;
  }
};
var entityStateDisplay = function entityStateDisplay(hass, stateObj, config) {
  if (isUnavailable(stateObj)) {
    return hass.localize("state.default.".concat(stateObj.state));
  }

  var value = getValue(stateObj, config);
  var unit = config.unit === false ? undefined : config.attribute !== undefined ? config.unit : config.unit || stateObj.attributes.unit_of_measurement;

  if (config.format) {
    if (isNaN(parseFloat(value)) || !isFinite(value)) {// do nothing if not a number
    } else if (config.format === 'brightness') {
      value = Math.round(value / 255 * 100);
      unit = '%';
    } else if (config.format.startsWith('duration')) {
      value = secondsToDuration(config.format === 'duration-m' ? value / 1000 : value);
      unit = undefined;
    } else if (config.format.startsWith('precision')) {
      var precision = parseInt(config.format.slice(-1), 10);
      value = formatNumber(parseFloat(value), hass.locale, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      });
    } else if (config.format === 'kilo') {
      value = formatNumber(value / 1000, hass.locale, {
        maximumFractionDigits: 2
      });
    } else if (config.format === 'invert') {
      value = formatNumber(value - value * 2, hass.locale);
    } else if (config.format === 'position') {
      value = formatNumber(100 - value, hass.locale);
    }

    return "".concat(value).concat(unit ? " ".concat(unit) : '');
  }

  if (config.attribute) {
    return "".concat(isNaN(value) ? value : formatNumber(value, hass.locale)).concat(unit ? " ".concat(unit) : '');
  }

  var modifiedStateObj = entity_objectSpread(entity_objectSpread({}, stateObj), {}, {
    attributes: entity_objectSpread(entity_objectSpread({}, stateObj.attributes), {}, {
      unit_of_measurement: unit
    })
  });

  return computeStateDisplay(hass.localize, modifiedStateObj, hass.locale);
};
var entityStyles = function entityStyles(config) {
  return isObject(config === null || config === void 0 ? void 0 : config.styles) ? Object.keys(config.styles).map(function (key) {
    return "".concat(key, ": ").concat(config.styles[key], ";");
  }).join('') : '';
};
;// CONCATENATED MODULE: ./src/styles.js
var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = function style(css) {
  return css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    ha-card .card-header {\n        padding-bottom: 0px;\n    }\n    .icon-small {\n        display: inline-block;\n    }\n    .entity {\n        text-align: center;\n        cursor: pointer;\n    }\n    .entity span {\n        font-size: 10px;\n    }\n    .entities-row {\n        flex-direction: row;\n        flex-wrap: wrap;\n        display: inline-flex;\n        justify-content: left;\n        align-items: center;\n        padding: 0 20px 10px 20px;\n    }\n    .entities-row .entity {\n        margin-right: 16px;\n    }    \n    .entities-row .entity:last-of-type,\n    .entities-info-row .entity:last-of-type {\n        margin-right: 0;\n    }\n    .entities-column {\n        flex-direction: column;\n        display: flex;\n        align-items: flex-end;\n        justify-content: space-evenly;\n    }\n    .entities-column .entity div {\n        display: inline-block;\n        vertical-align: middle;\n    }\n\n    .entities-info-row {\n        flex-direction: row;\n        flex-wrap: wrap;\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        padding: 0 20px 10px 20px;\n        font-size: 12px;\n        position: absolute;\n        right: 20px;\n        top: 15px;\n    }\n    .entities-info-row .entity {\n        margin-right: 16px;\n    }\n    .entities-info-row .entity.icon-entity {\n        margin-right: 0px;\n    }\n    .main-state {\n        float: left;\n        margin-right: 10px;\n    }\n    .main-state > ha-state-icon > ha-svg-icon {\n        vertical-align: baseline;\n    }\n    .main-icon {\n        vertical-align: baseline;\n        font-size: 30px;\n    }\n    .title {\n        min-height: 48px;\n    }\n"])));
};
;// CONCATENATED MODULE: ./src/index.js
function src_typeof(obj) { "@babel/helpers - typeof"; return src_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, src_typeof(obj); }

var src_templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;

function src_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function src_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function src_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? src_ownKeys(Object(source), !0).forEach(function (key) { src_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : src_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (src_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







console.info('%c ROOM-CARD %c 1.2.1', 'color: cyan; background: black; font-weight: bold;', 'color: darkblue; background: white; font-weight: bold;');

var RoomCard = /*#__PURE__*/function (_LitElement) {
  _inherits(RoomCard, _LitElement);

  var _super = _createSuper(RoomCard);

  function RoomCard() {
    _classCallCheck(this, RoomCard);

    return _super.apply(this, arguments);
  }

  _createClass(RoomCard, [{
    key: "setConfig",
    value: function setConfig(config) {
      if (!config || !config.entities && !config.entity && !config.info_entities) {
        throw new Error('Please define entities.');
      }

      if (config.entity) {
        checkEntity(config.entity);
      }

      if (config.entities) {
        config.entities.forEach(function (entity) {
          return checkEntity(entity);
        });
      }

      if (config.info_entities) {
        config.info_entities.forEach(function (entity) {
          return checkEntity(entity);
        });
      }

      this.entityIds = getEntityIds(config);
      this.config = src_objectSpread(src_objectSpread({}, config), {}, {
        name: config.name === false ? ' ' : config.name
      });
    }
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(changedProps) {
      return hasConfigOrEntitiesChanged(this, changedProps);
    }
  }, {
    key: "hass",
    set: function set(hass) {
      var _this = this;

      this._hass = hass;

      if (hass && this.config) {
        var _this$config$info_ent, _this$config$info_ent2, _this$config$entities, _this$config$entities2, _this$config$cards;

        if (this.config.entity) {
          this.stateObj = hass.states[this.config.entity];
          var conf = typeof config === 'string' ? {
            entity: this.config.entity
          } : this.config.entity;
          this.entity = src_objectSpread(src_objectSpread({}, conf), {}, {
            stateObj: conf.entity ? hass.states[conf.entity] : this.stateObj
          });
        }

        this.info_entities = (_this$config$info_ent = (_this$config$info_ent2 = this.config.info_entities) === null || _this$config$info_ent2 === void 0 ? void 0 : _this$config$info_ent2.map(function (config) {
          var conf = typeof config === 'string' ? {
            entity: config
          } : config;
          return src_objectSpread(src_objectSpread({}, conf), {}, {
            stateObj: conf.entity ? hass.states[conf.entity] : _this.stateObj
          });
        })) !== null && _this$config$info_ent !== void 0 ? _this$config$info_ent : [];
        this.entities = (_this$config$entities = (_this$config$entities2 = this.config.entities) === null || _this$config$entities2 === void 0 ? void 0 : _this$config$entities2.map(function (config) {
          var conf = typeof config === 'string' ? {
            entity: config
          } : config;
          return src_objectSpread(src_objectSpread({}, conf), {}, {
            stateObj: conf.entity ? hass.states[conf.entity] : _this.stateObj
          });
        })) !== null && _this$config$entities !== void 0 ? _this$config$entities : [];
        this._refCards = (_this$config$cards = this.config.cards) === null || _this$config$cards === void 0 ? void 0 : _this$config$cards.map(function (config) {
          return _this.createCardElement(config, hass);
        });
      }
    }
  }, {
    key: "createCardElement",
    value: function createCardElement(cardConfig, hass) {
      if (cardConfig.show_states && !cardConfig.show_states.includes(hass.states[cardConfig.entity].state)) {
        return;
      }

      var createError = function createError(error, origConfig) {
        return createThing('hui-error-card', {
          type: 'error',
          error: error,
          origConfig: origConfig
        });
      };

      var createThing = function createThing(tag, config) {
        var element = document.createElement(tag);

        try {
          element.setConfig(config);
        } catch (err) {
          console.error(tag, err);
          return createError(err.message, config);
        }

        return element;
      };

      var tag = cardConfig.type;

      if (tag.startsWith('divider')) {
        tag = "hui-divider-row";
      } else if (tag.startsWith('custom:')) {
        tag = tag.substr('custom:'.length);
      } else {
        tag = "hui-".concat(tag, "-card");
      }

      var element = createThing(tag, cardConfig);
      element.hass = hass;
      element.style.boxShadow = 'none';
      element.style.borderRadius = '0';
      return element;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this._hass || !this.config) return $(src_templateObject || (src_templateObject = src_taggedTemplateLiteral([""])));
      return $(_templateObject2 || (_templateObject2 = src_taggedTemplateLiteral(["\n            <ha-card elevation=\"2\" style=\"", "\">\n                <div class=\"card-header\">\n                    ", "\n                    <div class=\"entities-info-row\">\n                        ", "\n                    </div>\n                </div>\n                <div class=\"", "\">\n                    ", "\n                </div>\n                ", "\n            </ha-card>\n        "])), entityStyles(this.config), this.renderTitle(this.config), this.info_entities.map(function (entity) {
        return _this2.renderInfoEntity(entity.stateObj, entity);
      }), this.config.column ? 'entities-column' : 'entities-row', this.entities.map(function (entity) {
        return _this2.renderEntity(entity.stateObj, entity);
      }), this._refCards);
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(config) {
      return config.hide_title === true ? '' : $(_templateObject3 || (_templateObject3 = src_taggedTemplateLiteral(["<div class=\"title\">", " ", "</div>"])), this.renderMainEntity(), config.title);
    }
  }, {
    key: "renderInfoEntity",
    value: function renderInfoEntity(stateObj, config) {
      if (!stateObj || hideIf(stateObj, config, this._hass)) {
        return null;
      }

      var onClick = this.clickHandler(stateObj.entity_id, config.tap_action);
      return $(_templateObject4 || (_templateObject4 = src_taggedTemplateLiteral(["<div class=\"state entity ", "\" style=\"", "\" @click=\"", "\">", "</div>"])), config.show_icon === true ? 'icon-entity' : '', entityStyles(config), onClick, this.renderValue(stateObj, config));
    }
  }, {
    key: "renderEntity",
    value: function renderEntity(stateObj, config) {
      var _this3 = this;

      if (!stateObj || hideIf(stateObj, config, this._hass)) {
        return null;
      }

      var interval = false;
      var count = 1;
      var entityValue = getValue(stateObj, config);
      var onClick = this.clickHandler(stateObj.entity_id, config.tap_action);
      var onDblClick = this.dblClickHandler(stateObj.entity_id, config.double_tap_action);
      var hasHold = config.hold_action;

      var start = function start() {
        if (!interval && hasHold) {
          interval = window.setInterval(function () {
            return count++;
          }, 30);
        }
      };

      var stop = function stop() {
        if (hasHold && count > 200) {
          window.clearInterval(interval);

          _this3.holdHandler(stateObj.entity_id, config.hold_action);

          interval = false;
        }
      };

      return $(_templateObject5 || (_templateObject5 = src_taggedTemplateLiteral(["<div class=\"entity\" style=\"", "\" @click=\"", "\" @dblclick=\"", "\"\n        @mousedown=\"", "\"\n        @mouseup=\"", "\"\n        @touchstart=\"", "\"\n        @touchend=\"", "\"\n        @touchcancel=\"", "\">\n            <span>", "</span>\n            <div>", "</div>\n            ", "\n        </div>"])), entityStyles(config), onClick, onDblClick, start, stop, start, stop, stop, entityName(stateObj, config), this.renderIcon(stateObj, config), config.show_state ? $(_templateObject6 || (_templateObject6 = src_taggedTemplateLiteral(["<span>", "</span>"])), entityValue) : '');
    }
  }, {
    key: "renderMainEntity",
    value: function renderMainEntity() {
      if (!this.entity) {
        return null;
      }

      var onClick = this.clickHandler(this.stateObj.entity_id, this.config.tap_action);
      var onDblClick = this.dblClickHandler(this.stateObj.entity_id, this.config.double_tap_action);
      return $(_templateObject7 || (_templateObject7 = src_taggedTemplateLiteral(["<div\n            class=\"main-state entity\"\n            style=\"", "\"\n            @click=\"", "\"\n            @dblclick=\"", "\"\n        >\n            ", "\n        </div>"])), entityStyles(this.config), onClick, onDblClick, this.entities.length === 0 || this.config.icon ? this.renderIcon(this.stateObj, this.config, "main-icon") : this.renderValue(this.stateObj, this.config));
    }
  }, {
    key: "renderValue",
    value: function renderValue(stateObj, config) {
      if (config.toggle === true) {
        return $(_templateObject8 || (_templateObject8 = src_taggedTemplateLiteral(["<ha-entity-toggle .stateObj=\"", "\" .hass=\"", "\"></ha-entity-toggle>"])), stateObj, this._hass);
      }

      if (config.show_icon === true) {
        return this.renderIcon(stateObj, config, null);
      }

      if (config.attribute && [LAST_CHANGED, LAST_UPDATED].includes(config.attribute)) {
        var _config$attribute;

        return $(_templateObject9 || (_templateObject9 = src_taggedTemplateLiteral(["<ha-relative-time\n                .hass=", "\n                .datetime=", "\n                capitalize\n            ></ha-relative-time>"])), this._hass, stateObj[(_config$attribute = config.attribute) === null || _config$attribute === void 0 ? void 0 : _config$attribute.replace('-', '_')]);
      }

      if (config.format && TIMESTAMP_FORMATS.includes(config.format)) {
        var value = getValue(stateObj, config);
        var timestamp = new Date(value);

        if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
          return value;
        }

        return $(_templateObject10 || (_templateObject10 = src_taggedTemplateLiteral(["<hui-timestamp-display\n                .hass=", "\n                .ts=", "\n                .format=", "\n                capitalize\n            ></hui-timestamp-display>"])), this._hass, timestamp, config.format);
      }

      return entityStateDisplay(this._hass, stateObj, config);
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(stateObj, config, classes) {
      var customIcon = entityIcon(stateObj, config, this._hass);
      return $(_templateObject11 || (_templateObject11 = src_taggedTemplateLiteral(["<state-badge\n            class=\"icon-small ", "\"\n            .stateObj=\"", "\"\n            .overrideIcon=\"", "\"\n            .stateColor=\"", "\"\n            style=\"", "\"\n        ></state-badge>"])), classes, stateObj, isObject(customIcon) ? customIcon.icon : customIcon, config.state_color, entityStyles(customIcon));
    }
  }, {
    key: "renderWarning",
    value: function renderWarning() {
      return $(_templateObject12 || (_templateObject12 = src_taggedTemplateLiteral(["<hui-warning>\n            ", "\n        </hui-warning>"])), this._hass.localize('ui.panel.lovelace.warning.entity_not_found', 'entity', this.config.entity));
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(entity, actionConfig) {
      var _this4 = this;

      return function () {
        return be(_this4, _this4._hass, {
          entity: entity,
          tap_action: actionConfig
        }, false, false);
      };
    }
  }, {
    key: "dblClickHandler",
    value: function dblClickHandler(entity, actionConfig) {
      var _this5 = this;

      return function () {
        return be(_this5, _this5._hass, {
          entity: entity,
          double_tap_action: actionConfig
        }, false, true);
      };
    }
  }, {
    key: "holdHandler",
    value: function holdHandler(entity, actionConfig) {
      var _this6 = this;

      return function () {
        return be(_this6, _this6._hass, {
          entity: entity,
          hold_action: actionConfig
        }, true, false);
      };
    }
  }], [{
    key: "properties",
    get: function get() {
      return {
        _hass: Object,
        config: Object,
        stateObj: Object,
        _refCards: []
      };
    }
  }, {
    key: "styles",
    get: function get() {
      return style(r);
    }
  }]);

  return RoomCard;
}(lit_element_s);

customElements.define('room-card', RoomCard);
/******/ })()
;