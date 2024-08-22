/*!
 * @georapbox/files-dropzone-element
 * A custom element that creates a drag and drop zone for files
 *
 * @version 2.0.1
 * @homepage https://github.com/georapbox/files-dropzone-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
function h(o,e=""){if(!e)return!0;let t=[...new Set(e.split(",").map(r=>r.trim()).filter(Boolean))],i=o.type,s=i.replace(/\/.*$/,"");for(let r of t)if(r.charAt(0)==="."){if(o.name.toLowerCase().indexOf(r.toLowerCase(),o.name.length-r.length)!==-1)return!0}else if(/\/\*$/.test(r)){if(s===r.replace(/\/.*$/,""))return!0}else if(i===r)return!0;return!1}var x=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["jxl","image/jxl"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["markdown","text/markdown"],["md","text/markdown"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]),f=[".DS_Store","Thumbs.db"],y=o=>{let{name:e}=o;if(e&&e.lastIndexOf(".")!==-1&&!o.type){let i=(e.split(".").pop()||"").toLowerCase(),s=x.get(i);s&&Object.defineProperty(o,"type",{value:s,writable:!1,configurable:!1,enumerable:!0})}return o},b=(o,e)=>{let t=y(o);if(typeof t.path!="string"){let{webkitRelativePath:i}=o;Object.defineProperty(t,"path",{value:typeof e=="string"?e:i||o.name,writable:!1,configurable:!1,enumerable:!0})}return t},u=async o=>await new Promise((e,t)=>{o.readEntries(e,t)}),w=async o=>{let e=[],t=await u(o);for(;t.length>0;)e.push(...t),t=await u(o);return e},E=o=>new Promise((e,t)=>{o.file(i=>e(b(i,o.fullPath)),t)}),F=async o=>{let e=[],t=[];for(let i of o){if(i.kind!=="file")continue;let s=i.getAsEntry?i.getAsEntry():i.webkitGetAsEntry();t.push(s)}for(;t.length>0;){let i=t.shift();if(i)if(i.isFile){let s=await E(i);f.indexOf(s.name)===-1&&e.push(s)}else i.isDirectory&&t.push(...await w(i.createReader()));else continue}return e},m=async o=>{let e=[];for(let t of o)f.indexOf(t.name)===-1&&e.push(b(t));return e},d=async o=>o.dataTransfer?o.dataTransfer.items?await F(o.dataTransfer.items):await m(o.dataTransfer.files):await m(o.target.files);var n="files-dropzone",g="TOO_MANY_FILES",L="FILE_TOO_LARGE",k="FILE_TOO_SMALL",A="INVALID_MIME_TYPE",z=document.createElement("template"),S=`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  :host {
    --dropzone-border-width: 2px;
    --dropzone-border-style: dashed;
    --dropzone-border-radius: 0.25rem;
    --dropzone-border-color: #6c757d;
    --dropzone-border-color-dragover: #0d6efd;
    --dropzone-border-color-hover: var(--dropzone-border-color-dragover);
    --dropzone-background-color: #ffffff;
    --dropzone-background-color-dragover: #f4f4f5;
    --dropzone-background-color-hover: var(--dropzone-background-color-dragover);
    --dropzone-body-color: #3f3f46;
    --dropzone-body-color-dragover: var(--dropzone-body-color);
    --dropzone-body-color-hover: var(--dropzone-body-color-dragover);
    --dropzone-focus-shadow-rgb: 49,132,253;
    --dropzone-focus-box-shadow: 0 0 0 0.25rem rgba(var(--dropzone-focus-shadow-rgb), 0.5);
    --transition-duration: 0.2s; /* for backwards compatibility */
    --dropzone-transition-duration: var(--transition-duration);

    display: block;
  }

  :host(:not([no-style])) .dropzone {
    border: var(--dropzone-border-width) var(--dropzone-border-style) var(--dropzone-border-color);
    border-radius: var(--dropzone-border-radius);
    padding: 3rem 1rem;
    overflow: hidden;
    background-color: var(--dropzone-background-color);
    color: var(--dropzone-body-color);
    text-align: center;
    cursor: pointer;
    transition: border var(--dropzone-transition-duration) ease-in-out, background-color var(--dropzone-transition-duration) ease-in-out, color var(--dropzone-transition-duration) ease-in-out, box-shadow var(--dropzone-transition-duration) ease-in-out;
  }

  :host(:not([no-style])[disabled]) .dropzone {
    opacity: 0.8;
    cursor: not-allowed;
    user-select: none;
  }

  :host(:not([no-style]):not([disabled])) .dropzone--dragover {
    border-color: var(--dropzone-border-color-dragover);
    background-color: var(--dropzone-background-color-dragover);
    color: var(--dropzone-body-color-dragover);
  }

  :host(:not([no-style]):not([disabled])) .dropzone:focus-visible {
    outline: none;
    box-shadow: var(--dropzone-focus-box-shadow);
  }

  @media (hover: hover) {
    :host(:not([no-style]):not([disabled])) .dropzone:not(.dropzone--dragover):hover {
      border-color: var(--dropzone-border-color-hover);
      background-color: var(--dropzone-background-color-hover);
      color: var(--dropzone-body-color-hover);
    }
  }
`;z.innerHTML=`
  <style>
    ${S}
  </style>

  <input type="file" id="file-input" hidden>

  <div part="dropzone" class="dropzone" id="dropzone" tabindex="0" role="button" aria-disabled="false">
    <slot>Drag 'n' drop files here, or click to select files</slot>
  </div>
`;var v=class o extends HTMLElement{#t=null;#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open",delegatesFocus:!0}).appendChild(z.content.cloneNode(!0)),this.shadowRoot&&(this.#t=this.shadowRoot.getElementById("file-input"),this.#e=this.shadowRoot.getElementById("dropzone"))}static get observedAttributes(){return["accept","disabled","multiple"]}attributeChangedCallback(e,t,i){e==="accept"&&t!==i&&this.#t&&(this.#t.accept=this.accept),e==="disabled"&&t!==i&&this.#t&&(this.#t.disabled=this.disabled,this.disabled?(this.#e?.removeAttribute("tabindex"),this.#e?.setAttribute("aria-disabled","true")):(this.#e?.setAttribute("tabindex","0"),this.#e?.setAttribute("aria-disabled","false"))),e==="multiple"&&t!==i&&this.#t&&(this.#t.multiple=this.multiple)}connectedCallback(){this.#o("accept"),this.#o("disabled"),this.#o("maxFiles"),this.#o("maxSize"),this.#o("minSize"),this.#o("multiple"),this.#o("autoFocus"),this.#o("noStyle"),this.#t?.addEventListener("change",this.#i),this.#e?.addEventListener("dragenter",this.#r),this.#e?.addEventListener("dragover",this.#s),this.#e?.addEventListener("dragleave",this.#n),this.#e?.addEventListener("drop",this.#a),this.#e?.addEventListener("click",this.#d),this.#e?.addEventListener("keyup",this.#l),this.autoFocus&&this.#e?.focus()}disconnectedCallback(){this.#t?.removeEventListener("change",this.#i),this.#e?.removeEventListener("dragenter",this.#r),this.#e?.removeEventListener("dragover",this.#s),this.#e?.removeEventListener("dragleave",this.#n),this.#e?.removeEventListener("drop",this.#a),this.#e?.removeEventListener("click",this.#d),this.#e?.removeEventListener("keyup",this.#l)}get accept(){return this.getAttribute("accept")||""}set accept(e){this.setAttribute("accept",e!=null?e.toString():e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",!!e)}get maxFiles(){let e=Number(this.getAttribute("max-files"))||0;return e<=0?1/0:Math.floor(Math.abs(e))}set maxFiles(e){this.setAttribute("max-files",e!=null?e.toString():e)}get maxSize(){let e=this.getAttribute("max-size");if(e===null)return 1/0;let t=Number(e);return Number.isNaN(t)?1/0:t}set maxSize(e){this.setAttribute("max-size",e!=null?e.toString():e)}get minSize(){let e=this.getAttribute("min-size");if(e===null)return 0;let t=Number(e);return Number.isNaN(t)?0:t}set minSize(e){this.setAttribute("min-size",e!=null?e.toString():e)}get multiple(){return this.hasAttribute("multiple")}set multiple(e){this.toggleAttribute("multiple",!!e)}get autoFocus(){return this.hasAttribute("auto-focus")}set autoFocus(e){this.toggleAttribute("auto-focus",!!e)}get noStyle(){return this.hasAttribute("no-style")}set noStyle(e){this.toggleAttribute("no-style",!!e)}#i=async e=>{try{this.#c(await d(e))}catch(t){this.dispatchEvent(new CustomEvent(`${n}-error`,{bubbles:!0,composed:!0,detail:{error:t}}))}};#r=()=>{this.disabled||this.dispatchEvent(new Event(`${n}-dragenter`,{bubbles:!0,composed:!0}))};#s=e=>{if(e.preventDefault(),this.disabled){e.dataTransfer.dropEffect="none";return}e.dataTransfer.dropEffect="copy",this.#e&&(this.#e.classList.add("dropzone--dragover"),this.#e.part.add("dropzone--dragover")),this.dispatchEvent(new Event(`${n}-dragover`,{bubbles:!0,composed:!0}))};#n=()=>{this.disabled||(this.#e&&(this.#e.classList.remove("dropzone--dragover"),this.#e.part.remove("dropzone--dragover")),this.dispatchEvent(new Event(`${n}-dragleave`,{bubbles:!0,composed:!0})))};#a=async e=>{if(!this.disabled){e.preventDefault(),this.#e&&(this.#e.classList.remove("dropzone--dragover"),this.#e.part.remove("dropzone--dragover"));try{this.#c(await d(e))}catch(t){this.dispatchEvent(new CustomEvent(`${n}-error`,{bubbles:!0,composed:!0,detail:{error:t}}))}}};#d=()=>{this.disabled||this.#t?.click()};#l=e=>{this.disabled||(e.key===" "||e.key==="Enter")&&this.#t?.click()};#c(e){if(!Array.isArray(e)||!e.length)return;let t=[],i=[],s=e.length;if(!this.multiple&&s>1)for(let r of e)i.push({file:r,errors:[{code:g,message:"Too many files selected. Only 1 file is allowed."}]});else if(this.multiple&&s>this.maxFiles)for(let r of e)i.push({file:r,errors:[{code:g,message:`Too many files selected. Only ${this.maxFiles} ${this.maxFiles>1?"files are":"file is"} allowed.`}]});else for(let r of e){let l=h(r,this.accept),c=r.size>this.maxSize,p=r.size<this.minSize;if(l&&!c&&!p)t.push(r);else{let a=[];l||a.push({code:A,message:`File type "${r.type}" is not accepted.`}),c&&a.push({code:L,message:`File size ${r.size} exceeds the maximum size of ${this.maxSize}.`}),p&&a.push({code:k,message:`File size ${r.size} is smaller than the minimum size of ${this.minSize}.`}),i.push({file:r,errors:a})}}this.dispatchEvent(new CustomEvent(`${n}-drop`,{bubbles:!0,composed:!0,detail:{acceptedFiles:t,rejectedFiles:i}})),t.length>0&&this.dispatchEvent(new CustomEvent(`${n}-drop-accepted`,{bubbles:!0,composed:!0,detail:{acceptedFiles:t}})),i.length>0&&this.dispatchEvent(new CustomEvent(`${n}-drop-rejected`,{bubbles:!0,composed:!0,detail:{rejectedFiles:i}})),this.#t&&(this.#t.value=this.#t.defaultValue)}openFileDialog(){this.disabled||this.#t?.click()}#o(e){let t=this;if(Object.prototype.hasOwnProperty.call(t,e)){let i=t[e];delete t[e],t[e]=i}}static defineCustomElement(e=n){typeof window<"u"&&!window.customElements.get(e)&&window.customElements.define(e,o)}};export{v as FilesDropzone};
