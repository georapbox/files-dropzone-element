/*!
 * @georapbox/files-dropzone-element
 * A custom element that creates a drag and drop zone for files
 *
 * @version 2.1.1
 * @homepage https://github.com/georapbox/files-dropzone-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
function p(o,e=""){if(!e)return!0;let t=[...new Set(e.split(",").map(r=>r.trim()).filter(Boolean))],i=o.type,s=i.replace(/\/.*$/,"");for(let r of t)if(r.charAt(0)==="."){if(o.name.toLowerCase().indexOf(r.toLowerCase(),o.name.length-r.length)!==-1)return!0}else if(/\/\*$/.test(r)){if(s===r.replace(/\/.*$/,""))return!0}else if(i===r)return!0;return!1}var E=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["jxl","image/jxl"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["markdown","text/markdown"],["md","text/markdown"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]),m=[".DS_Store","Thumbs.db"],z=o=>{let{name:e}=o;if(e&&e.lastIndexOf(".")!==-1&&!o.type){let i=(e.split(".").pop()||"").toLowerCase(),s=E.get(i);s&&Object.defineProperty(o,"type",{value:s,writable:!1,configurable:!1,enumerable:!0})}return o},f=(o,e)=>{let t=z(o);if(typeof t.path!="string"){let{webkitRelativePath:i}=o;Object.defineProperty(t,"path",{value:typeof e=="string"?e:i||o.name,writable:!1,configurable:!1,enumerable:!0})}return t},h=async o=>await new Promise((e,t)=>{o.readEntries(e,t)}),x=async o=>{let e=[],t=await h(o);for(;t.length>0;)e.push(...t),t=await h(o);return e},y=o=>new Promise((e,t)=>{o.file(i=>e(f(i,o.fullPath)),t)}),w=async o=>{let e=[],t=[];for(let i of o){if(i.kind!=="file")continue;let s=i.getAsEntry?i.getAsEntry():i.webkitGetAsEntry();t.push(s)}for(;t.length>0;){let i=t.shift();if(i)if(i.isFile){let s=await y(i);m.indexOf(s.name)===-1&&e.push(s)}else i.isDirectory&&t.push(...await x(i.createReader()));else continue}return e},u=async o=>{let e=[];for(let t of o)m.indexOf(t.name)===-1&&e.push(f(t));return e},a=async o=>o.dataTransfer?o.dataTransfer.items?await w(o.dataTransfer.items):await u(o.dataTransfer.files):await u(o.target.files);var O=String.raw,L=String.raw,g="files-dropzone",v=document.createElement("template"),F=O`
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
    --dropzone-focus-shadow-rgb: 49, 132, 253;
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
    transition:
      border var(--dropzone-transition-duration) ease-in-out,
      background-color var(--dropzone-transition-duration) ease-in-out,
      color var(--dropzone-transition-duration) ease-in-out,
      box-shadow var(--dropzone-transition-duration) ease-in-out;
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
`;v.innerHTML=L`
  <style>
    ${F}
  </style>

  <input type="file" id="file-input" hidden />

  <div part="dropzone" class="dropzone" id="dropzone" tabindex="0" role="button" aria-disabled="false">
    <slot><span>Drag 'n' drop files here, or click to select files</span></slot>
  </div>
`;var b=class o extends HTMLElement{static ERROR_CODES={FILE_DIALOG_OPEN_FAILED:"FILE_DIALOG_OPEN_FAILED",FILE_INPUT_CHANGE_FAILED:"FILE_INPUT_CHANGE_FAILED",DROP_EVENT_PROCESSING_FAILED:"DROP_EVENT_PROCESSING_FAILED",UNKNOWN_ERROR:"UNKNOWN_ERROR"};static REJECTION_CODES={TOO_MANY_FILES:"TOO_MANY_FILES",FILE_TOO_LARGE:"FILE_TOO_LARGE",FILE_TOO_SMALL:"FILE_TOO_SMALL",INVALID_MIME_TYPE:"INVALID_MIME_TYPE"};#t=null;#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open",delegatesFocus:!0}).appendChild(v.content.cloneNode(!0)),this.shadowRoot&&(this.#t=this.shadowRoot.getElementById("file-input"),this.#e=this.shadowRoot.getElementById("dropzone"))}static get observedAttributes(){return["accept","disabled","multiple"]}attributeChangedCallback(e,t,i){e==="accept"&&t!==i&&this.#t&&(this.#t.accept=this.accept),e==="disabled"&&t!==i&&this.#t&&(this.#t.disabled=this.disabled,this.disabled?(this.#e?.removeAttribute("tabindex"),this.#e?.setAttribute("aria-disabled","true")):(this.#e?.setAttribute("tabindex","0"),this.#e?.setAttribute("aria-disabled","false"))),e==="multiple"&&t!==i&&this.#t&&(this.#t.multiple=this.multiple)}connectedCallback(){this.#o("accept"),this.#o("disabled"),this.#o("maxFiles"),this.#o("maxSize"),this.#o("minSize"),this.#o("multiple"),this.#o("autoFocus"),this.#o("noStyle"),this.#t?.addEventListener("change",this.#s),this.#e?.addEventListener("dragenter",this.#n),this.#e?.addEventListener("dragover",this.#a),this.#e?.addEventListener("dragleave",this.#d),this.#e?.addEventListener("drop",this.#l),this.#e?.addEventListener("click",this.#c),this.#e?.addEventListener("keyup",this.#p),this.autoFocus&&this.#e?.focus()}disconnectedCallback(){this.#t?.removeEventListener("change",this.#s),this.#e?.removeEventListener("dragenter",this.#n),this.#e?.removeEventListener("dragover",this.#a),this.#e?.removeEventListener("dragleave",this.#d),this.#e?.removeEventListener("drop",this.#l),this.#e?.removeEventListener("click",this.#c),this.#e?.removeEventListener("keyup",this.#p)}get accept(){return this.getAttribute("accept")||""}set accept(e){this.setAttribute("accept",e!=null?e.toString():e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",!!e)}get maxFiles(){let e=Number(this.getAttribute("max-files"))||0;return e<=0?1/0:Math.floor(Math.abs(e))}set maxFiles(e){this.setAttribute("max-files",e!=null?e.toString():e)}get maxSize(){let e=this.getAttribute("max-size");if(e===null)return 1/0;let t=Number(e);return Number.isNaN(t)?1/0:t}set maxSize(e){this.setAttribute("max-size",e!=null?e.toString():e)}get minSize(){let e=this.getAttribute("min-size");if(e===null)return 0;let t=Number(e);return Number.isNaN(t)?0:t}set minSize(e){this.setAttribute("min-size",e!=null?e.toString():e)}get multiple(){return this.hasAttribute("multiple")}set multiple(e){this.toggleAttribute("multiple",!!e)}get autoFocus(){return this.hasAttribute("auto-focus")}set autoFocus(e){this.toggleAttribute("auto-focus",!!e)}get noStyle(){return this.hasAttribute("no-style")}set noStyle(e){this.toggleAttribute("no-style",!!e)}#i(e,t,i){let s={bubbles:!0,composed:!0,cancelable:!1,...i,detail:t},r=new CustomEvent(`${g}-${e}`,s);return this.dispatchEvent(r)}#r(e,t){let i={code:e,error:t};this.#i("error",i)}#s=async e=>{try{this.#h(await a(e))}catch(t){this.#r(o.ERROR_CODES.FILE_INPUT_CHANGE_FAILED,t)}};#n=()=>{this.disabled||this.#i("dragenter")};#a=e=>{if(e.preventDefault(),this.disabled){e.dataTransfer.dropEffect="none";return}e.dataTransfer.dropEffect="copy",this.#e&&(this.#e.classList.add("dropzone--dragover"),this.#e.part.add("dropzone--dragover")),this.#i("dragover")};#d=()=>{this.disabled||(this.#e&&(this.#e.classList.remove("dropzone--dragover"),this.#e.part.remove("dropzone--dragover")),this.#i("dragleave"))};#l=async e=>{if(!this.disabled){e.preventDefault(),this.#e&&(this.#e.classList.remove("dropzone--dragover"),this.#e.part.remove("dropzone--dragover"));try{this.#h(await a(e))}catch(t){this.#r(o.ERROR_CODES.DROP_EVENT_PROCESSING_FAILED,t)}}};#c=()=>{this.disabled||this.openFileDialog()};#p=e=>{this.disabled||(e.key===" "||e.key==="Enter")&&this.openFileDialog()};#h(e){if(!Array.isArray(e)||!e.length)return;let t=[],i=[],s=e.length;if(!this.multiple&&s>1)for(let r of e)i.push({file:r,errors:[{code:o.REJECTION_CODES.TOO_MANY_FILES,message:"Too many files selected. Only 1 file is allowed."}]});else if(this.multiple&&s>this.maxFiles)for(let r of e)i.push({file:r,errors:[{code:o.REJECTION_CODES.TOO_MANY_FILES,message:`Too many files selected. Only ${this.maxFiles} ${this.maxFiles>1?"files are":"file is"} allowed.`}]});else for(let r of e){let d=p(r,this.accept),l=r.size>this.maxSize,c=r.size<this.minSize;if(d&&!l&&!c)t.push(r);else{let n=[];d||n.push({code:o.REJECTION_CODES.INVALID_MIME_TYPE,message:`File type "${r.type}" is not accepted.`}),l&&n.push({code:o.REJECTION_CODES.FILE_TOO_LARGE,message:`File size ${r.size} exceeds the maximum size of ${this.maxSize}.`}),c&&n.push({code:o.REJECTION_CODES.FILE_TOO_SMALL,message:`File size ${r.size} is smaller than the minimum size of ${this.minSize}.`}),i.push({file:r,errors:n})}}this.#i("drop",{acceptedFiles:t,rejectedFiles:i}),t.length>0&&this.#i("drop-accepted",{acceptedFiles:t}),i.length>0&&this.#i("drop-rejected",{rejectedFiles:i}),this.#t&&(this.#t.value=this.#t.defaultValue)}openFileDialog(){if(!(this.disabled||!this.#t)){if("showPicker"in HTMLInputElement.prototype&&typeof this.#t.showPicker=="function"){try{this.#t.showPicker()}catch(e){this.#r(o.ERROR_CODES.FILE_DIALOG_OPEN_FAILED,e)}return}this.#t.click()}}#o(e){let t=this;if(Object.prototype.hasOwnProperty.call(t,e)){let i=t[e];delete t[e],t[e]=i}}static defineCustomElement(e=g){typeof window<"u"&&!window.customElements.get(e)&&window.customElements.define(e,o)}};export{b as FilesDropzone};
