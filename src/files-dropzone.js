import { isValidFile } from './utils/is-valid-file.js';

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
      --dropzone-border-color-focus: var(--accent);
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

    .dropzone {
      display: flex;
      align-items: center;
      justify-content: center;
      border: var(--dropzone-border-width) var(--dropzone-border-style) var(--dropzone-border-color);
      border-radius: var(--dropzone-border-radius);
      width: 100%;
      min-height: 150px;
      padding: 1rem;
      overflow: hidden;
      background-color: var(--dropzone-background-color);
      color: var(--dropzone-text-color);
      text-align: center;
      font-size: 1rem;
      cursor: pointer;
      transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    :host(:not([disabled]):focus) .dropzone {
      border-color: var(--dropzone-border-color-focus);
    }

    :host([no-click]) .dropzone {
      cursor: default;
    }

    :host([disabled]) .dropzone {
      opacity: 0.8;
      cursor: not-allowed;
    }

    :host(:not([disabled], [no-click])) .dropzone:hover {
      border-color: var(--dropzone-border-color-hover);
      background-color: var(--dropzone-background-color-hover);
    }

    :host(:not([disabled])) .dropzone--dragover {
      border-color: var(--dropzone-border-color-dragover);
      background-color: var(--dropzone-background-color-dragover);
    }
  </style>

  <input type="file" id="fileInput" hidden>

  <div part="dropzone" class="dropzone" id="dropzoneEl" tabindex="0" role="presentation">
    Drag 'n' drop files here, or click to select files
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
    return ['accept', 'disabled', 'no-keyboard', 'multiple'];
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

    if (name === 'no-keyboard' && oldValue !== newValue && this.#dropzoneEl) {
      if (this.noKeyboard) {
        this.#dropzoneEl.removeAttribute('tabindex');
      } else {
        this.#dropzoneEl.setAttribute('tabindex', '0');
      }
    }

    if (name === 'multiple' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.multiple = this.multiple;
    }
  }

  connectedCallback() {
    this.#upgradeProperty('accept');
    this.#upgradeProperty('disabled');
    this.#upgradeProperty('noClick');
    this.#upgradeProperty('noKeyboard');
    this.#upgradeProperty('noDrag');
    this.#upgradeProperty('multiple');

    this.#fileInput.addEventListener('change', this.#handleFileChange);
    this.#dropzoneEl.addEventListener('dragover', this.#handleDragOver);
    this.#dropzoneEl.addEventListener('dragleave', this.#handleDragLeave);
    this.#dropzoneEl.addEventListener('drop', this.#handleDrop);
    this.#dropzoneEl.addEventListener('click', this.#handleClick);
    this.#dropzoneEl.addEventListener('keyup', this.#handleKeyUp);
  }

  disconnectedCallback() {
    this.#fileInput.removeEventListener('change', this.#handleFileChange);
    this.#dropzoneEl.removeEventListener('dragover', this.#handleDragOver);
    this.#dropzoneEl.removeEventListener('dragleave', this.#handleDragLeave);
    this.#dropzoneEl.removeEventListener('drop', this.#handleDrop);
    this.#dropzoneEl.removeEventListener('click', this.#handleClick);
    this.#dropzoneEl.removeEventListener('keyup', this.#handleKeyUp);
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

  #handleFileChange = evt => {
    this.#handleFilesSelect(evt.target.files);
  };

  #handleDragOver = evt => {
    evt.preventDefault();

    if (this.disabled || this.noDrag) {
      return;
    }

    evt.dataTransfer.dropEffect = 'copy';
    evt.target.classList.add('dropzone--dragover');
    evt.target.part.add('dropzone--dragover');
  };

  #handleDragLeave = evt => {
    evt.target.classList.remove('dropzone--dragover');
    evt.target.part.remove('dropzone--dragover');
  };

  #handleDrop = evt => {
    if (this.disabled || this.noDrag) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    evt.target.classList.remove('dropzone--dragover');
    evt.target.part.remove('dropzone--dragover');

    this.#handleFilesSelect(evt.dataTransfer.files);
  };

  #handleClick = () => {
    if (this.disabled || this.noClick) {
      return;
    }

    this.#fileInput.click();
  };

  #handleKeyUp = evt => {
    if (this.disabled || this.noKeyboard) {
      return;
    }

    if (evt.key === ' ' || evt.key === 'Enter') {
      this.#fileInput.click();
    }
  };

  #handleFilesSelect(files) {
    const acceptedFiles = [];
    const rejectedFiles = [];
    const filesLength = files.length;

    for (let i = 0; i < filesLength; i += 1) {
      const file = files[i];

      if (!this.multiple && filesLength > 1) {
        rejectedFiles.push({
          file,
          errors: [{
            code: TOO_MANY_FILES,
            message: `Too many files selected. Only one file is allowed.`
          }]
        });
      } else {
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

    console.log('acceptedFiles', acceptedFiles);
    console.log('rejectedFiles', rejectedFiles);
    console.log('--------------');
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

  static defineCustomElement(elementName = 'files-dropzone') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, FilesDropzone);
    }
  }
}

export { FilesDropzone };
