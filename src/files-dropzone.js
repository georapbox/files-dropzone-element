import { isValidFile } from './utils/is-valid-file.js';

const COMPONENT_NAME = 'files-dropzone';
const TOO_MANY_FILES = 'TOO_MANY_FILES';
const INVALID_MIME_TYPE = 'INVALID_MIME_TYPE';
const template = document.createElement('template');

template.innerHTML = /* html */`
  <style>
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
      --dark: #3f3f46;
      --light: #f9f9f9;
      --accent: #0ea5e9;

      --dropzone-border-width: 2px;
      --dropzone-border-style: dashed;
      --dropzone-border-radius: 0.25rem;
      --dropzone-border-color: #71717a;
      --dropzone-border-color-hover: var(--accent);
      --dropzone-border-color-dragover: var(--accent);
      --dropzone-background-color: #ffffff;
      --dropzone-background-color-hover: var(--light);
      --dropzone-background-color-dragover: var(--light);
      --dropzone-text-color: var(--dark);
      --dropzone-text-color-hover: var(--dark);
      --dropzone-text-color-dragover: var(--dark);
      --dropzone-focus-ring-color: rgba(14, 165, 233, 0.4);
      --dropzone-focus-ring-width: 3px;

      display: block;
    }

    :host(:not([no-style])) .dropzone {
      border: var(--dropzone-border-width) var(--dropzone-border-style) var(--dropzone-border-color);
      border-radius: var(--dropzone-border-radius);
      padding: 3rem 1rem;
      overflow: hidden;
      background-color: var(--dropzone-background-color);
      color: var(--dropzone-text-color);
      text-align: center;
      cursor: pointer;
      transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    :host(:not([no-style])[no-click]) .dropzone {
      cursor: default;
    }

    :host(:not([no-style])[disabled]) .dropzone {
      opacity: 0.8;
      cursor: not-allowed;
    }

    :host(:not([no-style]):not([disabled], [no-click])) .dropzone:hover {
      border-color: var(--dropzone-border-color-hover);
      background-color: var(--dropzone-background-color-hover);
    }

    :host(:not([no-style]):not([disabled])) .dropzone--dragover {
      border-color: var(--dropzone-border-color-dragover);
      background-color: var(--dropzone-background-color-dragover);
    }
  </style>

  <input type="file" id="fileInput" hidden>

  <div part="dropzone" class="dropzone" id="dropzoneEl" tabindex="0" role="presentation">
    <slot>Drag 'n' drop files here, or click to select files</slot>
  </div>
`;

class FilesDropzone extends HTMLElement {
  #fileInput;
  #dropzoneEl;

  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.#fileInput = this.shadowRoot.getElementById('fileInput');
    this.#dropzoneEl = this.shadowRoot.getElementById('dropzoneEl');
  }

  static get observedAttributes() {
    return ['accept', 'disabled', 'multiple', 'no-keyboard'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'accept' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.accept = this.accept;
    }

    if (name === 'disabled' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.disabled = this.disabled;

      if (this.disabled) {
        this.#dropzoneEl.removeAttribute('tabindex');
      } else {
        this.#dropzoneEl.setAttribute('tabindex', '0');
      }
    }

    if (name === 'multiple' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.multiple = this.multiple;
    }

    if (name === 'no-keyboard' && oldValue !== newValue && this.#dropzoneEl) {
      if (this.noKeyboard) {
        this.#dropzoneEl.removeAttribute('tabindex');
      } else {
        this.#dropzoneEl.setAttribute('tabindex', '0');
      }
    }
  }

  connectedCallback() {
    this.#upgradeProperty('accept');
    this.#upgradeProperty('disabled');
    this.#upgradeProperty('multiple');
    this.#upgradeProperty('noClick');
    this.#upgradeProperty('noDrag');
    this.#upgradeProperty('noKeyboard');
    this.#upgradeProperty('noStyle');

    this.#fileInput.addEventListener('change', this.#onFileInputChange);
    this.#dropzoneEl.addEventListener('dragenter', this.#onDragEnter);
    this.#dropzoneEl.addEventListener('dragover', this.#onDragOver);
    this.#dropzoneEl.addEventListener('dragleave', this.#onDragLeave);
    this.#dropzoneEl.addEventListener('drop', this.#onDrop);
    this.#dropzoneEl.addEventListener('click', this.#onClick);
    this.#dropzoneEl.addEventListener('keyup', this.#onKeyUp);
  }

  disconnectedCallback() {
    this.#fileInput.removeEventListener('change', this.#onFileInputChange);
    this.#dropzoneEl.removeEventListener('dragenter', this.#onDragEnter);
    this.#dropzoneEl.removeEventListener('dragover', this.#onDragOver);
    this.#dropzoneEl.removeEventListener('dragleave', this.#onDragLeave);
    this.#dropzoneEl.removeEventListener('drop', this.#onDrop);
    this.#dropzoneEl.removeEventListener('click', this.#onClick);
    this.#dropzoneEl.removeEventListener('keyup', this.#onKeyUp);
  }

  get accept() {
    return this.getAttribute('accept');
  }

  set accept(value) {
    this.setAttribute('accept', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get maxFiles() {
    const num = Number(this.getAttribute('max-files')) || 0;

    if (num <= 0) {
      return Infinity;
    }

    return Math.floor(Math.abs(num));
  }

  set maxFiles(value) {
    const num = Number(value) || 0;
    const newValue = num <= 0 ? Infinity : Math.floor(Math.abs(num));
    this.setAttribute('max-files', newValue);
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    if (value) {
      this.setAttribute('multiple', '');
    } else {
      this.removeAttribute('multiple');
    }
  }

  get noClick() {
    return this.hasAttribute('no-click');
  }

  set noClick(value) {
    if (value) {
      this.setAttribute('no-click', '');
    } else {
      this.removeAttribute('no-click');
    }
  }

  get noDrag() {
    return this.hasAttribute('no-drag');
  }

  set noDrag(value) {
    if (value) {
      this.setAttribute('no-drag', '');
    } else {
      this.removeAttribute('no-drag');
    }
  }

  get noKeyboard() {
    return this.hasAttribute('no-keyboard');
  }

  set noKeyboard(value) {
    if (value) {
      this.setAttribute('no-keyboard', '');
    } else {
      this.removeAttribute('no-keyboard');
    }
  }

  get noStyle() {
    return this.hasAttribute('no-style');
  }

  set noStyle(value) {
    if (value) {
      this.setAttribute('no-style', '');
    } else {
      this.removeAttribute('no-style');
    }
  }

  #onFileInputChange = evt => {
    this.#handleFilesSelect(evt.target.files);
  };

  #onDragEnter = () => {
    if (this.disabled || this.noDrag) {
      return;
    }

    this.dispatchEvent(new Event(`${COMPONENT_NAME}:dragenter`, {
      bubbles: true,
      composed: true
    }));
  };

  #onDragOver = evt => {
    evt.preventDefault();

    if (this.disabled || this.noDrag) {
      return;
    }

    evt.dataTransfer.dropEffect = 'copy';

    this.#dropzoneEl.classList.add('dropzone--dragover');
    this.#dropzoneEl.part.add('dropzone--dragover');

    this.dispatchEvent(new Event(`${COMPONENT_NAME}:dragover`, {
      bubbles: true,
      composed: true
    }));
  };

  #onDragLeave = () => {
    if (this.disabled || this.noDrag) {
      return;
    }

    this.#dropzoneEl.classList.remove('dropzone--dragover');
    this.#dropzoneEl.part.remove('dropzone--dragover');

    this.dispatchEvent(new Event(`${COMPONENT_NAME}:dragleave`, {
      bubbles: true,
      composed: true
    }));
  };

  #onDrop = evt => {
    if (this.disabled || this.noDrag) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    this.#dropzoneEl.classList.remove('dropzone--dragover');
    this.#dropzoneEl.part.remove('dropzone--dragover');

    this.#handleFilesSelect(evt.dataTransfer.files);
  };

  #onClick = () => {
    if (this.disabled || this.noClick) {
      return;
    }

    this.#fileInput.click();
  };

  #onKeyUp = evt => {
    if (this.disabled || this.noKeyboard) {
      return;
    }

    if (evt.key === ' ' || evt.key === 'Enter') {
      this.#fileInput.click();
    }
  };

  #handleFilesSelect(files) {
    if (!files || !files.length) {
      return;
    }

    const acceptedFiles = [];
    const rejectedFiles = [];
    const filesLength = files.length;

    // If the component is not in multiple mode, reject all files.
    if (!this.multiple && filesLength > 1) {
      for (let i = 0; i < filesLength; i += 1) {
        rejectedFiles.push({
          file: files[i],
          errors: [{
            code: TOO_MANY_FILES,
            message: `Too many files selected. Only one file is allowed.`
          }]
        });
      }
    } else if (this.multiple && filesLength > this.maxFiles) {
      // If the component is in multiple mode, but the number of files exceeds
      // the maxFiles attribute, reject all files.
      for (let i = 0; i < filesLength; i += 1) {
        rejectedFiles.push({
          file: files[i],
          errors: [{
            code: TOO_MANY_FILES,
            message: `Too many files selected. Only ${this.maxFiles} files are allowed.`
          }]
        });
      }
    } else {
      // Validate each file. If it's valid, add it to the accepted files array,
      // otherwise add it to the rejected files array.
      for (let i = 0; i < filesLength; i += 1) {
        const file = files[i];

        if (isValidFile(file, this.accept)) {
          acceptedFiles.push(file);
        } else {
          rejectedFiles.push({
            file,
            errors: [{
              code: INVALID_MIME_TYPE,
              message: `File type ${file.type} is not accepted.`
            }]
          });
        }
      }
    }

    this.dispatchEvent(new CustomEvent(`${COMPONENT_NAME}:drop`, {
      bubbles: true,
      composed: true,
      detail: {
        acceptedFiles,
        rejectedFiles
      }
    }));

    if (acceptedFiles.length > 0) {
      this.dispatchEvent(new CustomEvent(`${COMPONENT_NAME}:drop-accepted`, {
        bubbles: true,
        composed: true,
        detail: {
          acceptedFiles
        }
      }));
    }

    if (rejectedFiles.length > 0) {
      this.dispatchEvent(new CustomEvent(`${COMPONENT_NAME}:drop-rejected`, {
        bubbles: true,
        composed: true,
        detail: {
          rejectedFiles
        }
      }));
    }
  }

  openFileDialog() {
    if (this.disabled) {
      return;
    }

    this.#fileInput.click();
  }

  /**
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   */
  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  static defineCustomElement(elementName = COMPONENT_NAME) {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, FilesDropzone);
    }
  }
}

export { FilesDropzone };
