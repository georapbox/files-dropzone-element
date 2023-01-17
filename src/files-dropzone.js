import { isValidFile } from './utils/is-valid-file.js';

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
      --gray: #71717a;
      --blue: #38bdf8;

      --dropzone-border-width: 2px;
      --dropzone-border-style: dashed;
      --dropzone-border-radius: 0.25rem;
      --dropzone-border-color: var(--gray);
      --dropzone-border-color-hover: var(--blue);
      --dropzone-border-color-dragover: var(--blue);
      --dropzone-background-color: #ffffff;
      --dropzone-background-color-hover: #f9f9f9;
      --dropzone-background-color-dragover: #f9f9f9;
      --dropzone-text-color: var(--gray);
      --dropzone-text-color-hover: var(--gray);
      --dropzone-text-color-dragover: var(--gray);

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

    :host([disabled]) .dropzone {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host(:not([disabled])) .dropzone:hover {
      border-color: var(--dropzone-border-color-hover);
      background-color: var(--dropzone-background-color-hover);
    }

    :host(:not([disabled])) .dropzone--dragover {
      border-color: var(--dropzone-border-color-dragover);
      background-color: var(--dropzone-background-color-dragover);
    }
  </style>

  <input type="file" id="fileInput" multiple hidden>

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
  }

  static get observedAttributes() {
    return ['accept', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'accept' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.accept = this.accept;
    }

    if (name === 'disabled' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.disabled = this.disabled;
    }
  }

  connectedCallback() {
    this.#upgradeProperty('accept');

    this.#fileInput = this.shadowRoot.getElementById('fileInput');
    this.#dropzoneEl = this.shadowRoot.getElementById('dropzoneEl');

    this.#fileInput.accept = this.accept;
    this.#fileInput.disabled = this.disabled;

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

  #handleFileChange = evt => {
    this.#handleFilesSelect(evt.target.files);
  };

  #handleDragOver = evt => {
    evt.preventDefault();

    if (this.disabled) {
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
    evt.preventDefault();
    evt.stopPropagation();

    evt.target.classList.remove('dropzone--dragover');
    evt.target.part.remove('dropzone--dragover');

    this.#handleFilesSelect(evt.dataTransfer.files);
  };

  #handleClick = () => {
    if (this.disabled) {
      return;
    }

    this.#fileInput.click();
  };

  #handleKeyUp = evt => {
    if (this.disabled) {
      return;
    }

    if (evt.key === ' ' || evt.key === 'Enter') {
      this.#fileInput.click();
    }
  };

  #handleFilesSelect(files) {
    const acceptedFiles = [];
    const rejectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (isValidFile(file, this.accept)) {
        acceptedFiles.push(file);
      } else {
        rejectedFiles.push({
          file,
          reason: {
            code: 'INVALID_MIME_TYPE',
            message: `File type ${file.type} is not accepted.`
          }
        });
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
