// @ts-check

/**
 * Represents a value that may be of type T, or null.
 *
 * @template T
 * @typedef {T | null} Nullable
 */

import { isValidFile } from './utils/is-valid-file.js';
import { getFilesFromEvent } from './utils/files-selector.js';

const COMPONENT_NAME = 'files-dropzone';
const TOO_MANY_FILES = 'TOO_MANY_FILES';
const FILE_TOO_LARGE = 'FILE_TOO_LARGE';
const FILE_TOO_SMALL = 'FILE_TOO_SMALL';
const INVALID_MIME_TYPE = 'INVALID_MIME_TYPE';
const template = document.createElement('template');

const styles = /* css */ `
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
`;

template.innerHTML = /* html */ `
  <style>
    ${styles}
  </style>

  <input type="file" id="file-input" hidden>

  <div part="dropzone" class="dropzone" id="dropzone" tabindex="0" role="button" aria-disabled="false">
    <slot>Drag 'n' drop files here, or click to select files</slot>
  </div>
`;

/**
 * @summary A custom element that allows users to drag and drop files into it.
 * @documentation https://github.com/georapbox/files-dropzone-element
 *
 * @tagname files-dropzone - This is the default tag name, unless overridden by the `defineCustomElement` method.
 *
 * @property {string} accept - A comma-separated list of unique file type specifiers describing file types to allow.
 * @property {boolean} disabled - Determines whether the dropzone is disabled.
 * @property {number} maxFiles - The maximum number of files allowed to be dropped.
 * @property {number} maxSize - The maximum file size allowed in bytes.
 * @property {number} minSize - The minimum file size allowed in bytes.
 * @property {boolean} multiple - Allows multiple files to be dropped.
 * @property {boolean} autoFocus - Automatically focuses the dropzone when it's connected to the DOM.
 * @property {boolean} noStyle - Prevents the dropzone from applying any styling.
 *
 * @attribute {string} accept - Reflects the accept property.
 * @attribute {boolean} disabled - Reflects the disabled property.
 * @attribute {number} max-files - Reflects the maxFiles property.
 * @attribute {number} max-size - Reflects the maxSize property.
 * @attribute {number} min-size - Reflects the minSize property.
 * @attribute {boolean} multiple - Reflects the multiple property.
 * @attribute {boolean} auto-focus - Reflects the autoFocus property.
 * @attribute {boolean} no-style - Reflects the noStyle property.
 *
 * @slot - The default slot content of the dropzone.
 *
 * @csspart dropzone - The dropzone element.
 * @csspart dropzone--dragover - The state of the dropzone when dragging over it.
 *
 * @cssproperty --dropzone-border-width - The border width of the dropzone.
 * @cssproperty --dropzone-border-style - The border style of the dropzone.
 * @cssproperty --dropzone-border-radius - The border radius of the dropzone.
 * @cssproperty --dropzone-border-color - The border color of the dropzone.
 * @cssproperty --dropzone-border-color-dragover - The border color of the dropzone when dragging over it.
 * @cssproperty --dropzone-border-color-hover - The border color of the dropzone when hovering over it.
 * @cssproperty --dropzone-background-color - The background color of the dropzone.
 * @cssproperty --dropzone-background-color-dragover - The background color of the dropzone when dragging over it.
 * @cssproperty --dropzone-background-color-hover - The background color of the dropzone when hovering over it.
 * @cssproperty --dropzone-body-color - The text color of the dropzone.
 * @cssproperty --dropzone-body-color-dragover - The text color of the dropzone when dragging over it.
 * @cssproperty --dropzone-body-color-hover - The text color of the dropzone when hovering over it.
 * @cssproperty --dropzone-focus-shadow-rgb - The RGB value of the dropzone's focus shadow.
 * @cssproperty --dropzone-focus-box-shadow - The box shadow of the dropzone when focused.
 * @cssproperty --dropzone-transition-duration - The transition's duration for the dropzone area.
 *
 * @event files-dropzone-drop - Fired when files are dropped.
 * @event files-dropzone-drop-accepted - Fired when files dropped files are accepted.
 * @event files-dropzone-drop-rejected - Fired when files dropped files are rejected.
 * @event files-dropzone-dragenter - Fired when files are dragged into the dropzone.
 * @event files-dropzone-dragover - Fired when files are dragged over the dropzone.
 * @event files-dropzone-dragleave - Fired when files are dragged out of the dropzone.
 * @event files-dropzone-error - Fired when there is any error in the process of reading dropped files or directories.
 *
 * @method defineCustomElement - Static method. Defines a custom element with the given name.
 * @method openFileDialog - Instance method. Opens the file dialog programmatically.
 */
class FilesDropzone extends HTMLElement {
  /** @type {Nullable<HTMLInputElement>} */
  #fileInput = null;

  /** @type {Nullable<HTMLElement>} */
  #dropzoneEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    if (this.shadowRoot) {
      this.#fileInput = /** @type {Nullable<HTMLInputElement>} */ (this.shadowRoot.getElementById('file-input'));
      this.#dropzoneEl = this.shadowRoot.getElementById('dropzone');
    }
  }

  static get observedAttributes() {
    return ['accept', 'disabled', 'multiple'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'accept' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.accept = this.accept;
    }

    if (name === 'disabled' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.disabled = this.disabled;

      if (this.disabled) {
        this.#dropzoneEl?.removeAttribute('tabindex');
        this.#dropzoneEl?.setAttribute('aria-disabled', 'true');
      } else {
        this.#dropzoneEl?.setAttribute('tabindex', '0');
        this.#dropzoneEl?.setAttribute('aria-disabled', 'false');
      }
    }

    if (name === 'multiple' && oldValue !== newValue && this.#fileInput) {
      this.#fileInput.multiple = this.multiple;
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('accept');
    this.#upgradeProperty('disabled');
    this.#upgradeProperty('maxFiles');
    this.#upgradeProperty('maxSize');
    this.#upgradeProperty('minSize');
    this.#upgradeProperty('multiple');
    this.#upgradeProperty('autoFocus');
    this.#upgradeProperty('noStyle');

    this.#fileInput?.addEventListener('change', this.#handleFileInputChange);
    this.#dropzoneEl?.addEventListener('dragenter', this.#handleDragEnter);
    this.#dropzoneEl?.addEventListener('dragover', this.#handleDragOver);
    this.#dropzoneEl?.addEventListener('dragleave', this.#handleDragLeave);
    this.#dropzoneEl?.addEventListener('drop', this.#handleDrop);
    this.#dropzoneEl?.addEventListener('click', this.#handleClick);
    this.#dropzoneEl?.addEventListener('keyup', this.#handleKeyUp);

    this.autoFocus && this.#dropzoneEl?.focus();
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#fileInput?.removeEventListener('change', this.#handleFileInputChange);
    this.#dropzoneEl?.removeEventListener('dragenter', this.#handleDragEnter);
    this.#dropzoneEl?.removeEventListener('dragover', this.#handleDragOver);
    this.#dropzoneEl?.removeEventListener('dragleave', this.#handleDragLeave);
    this.#dropzoneEl?.removeEventListener('drop', this.#handleDrop);
    this.#dropzoneEl?.removeEventListener('click', this.#handleClick);
    this.#dropzoneEl?.removeEventListener('keyup', this.#handleKeyUp);
  }

  /**
   * @type {string} - A comma-separated list of unique file type specifiers describing file types to allow.
   * @attribute accept - Reflects the accept property.
   */
  get accept() {
    return this.getAttribute('accept') || '';
  }

  set accept(value) {
    this.setAttribute('accept', value != null ? value.toString() : value);
  }

  /**
   * @type {boolean} - Determines whether the dropzone is disabled.
   * @default false
   * @attribute disabled - Reflects the disabled property.
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', !!value);
  }

  /**
   * @type {number} - The maximum number of files allowed to be dropped.
   * @default Infinity
   * @attribute max-files - Reflects the maxFiles property.
   */
  get maxFiles() {
    const num = Number(this.getAttribute('max-files')) || 0;

    if (num <= 0) {
      return Infinity;
    }

    return Math.floor(Math.abs(num));
  }

  set maxFiles(value) {
    this.setAttribute('max-files', value != null ? value.toString() : value);
  }

  /**
   * @type {number} - The maximum file size allowed in bytes.
   * @default Infinity
   * @attribute max-size - Reflects the maxSize property.
   */
  get maxSize() {
    const value = this.getAttribute('max-size');

    if (value === null) {
      return Infinity;
    }

    const num = Number(value);

    return Number.isNaN(num) ? Infinity : num;
  }

  set maxSize(value) {
    this.setAttribute('max-size', value != null ? value.toString() : value);
  }

  /**
   * @type {number} - The minimum file size allowed in bytes.
   * @default 0
   * @attribute min-size - Reflects the minSize property.
   */
  get minSize() {
    const value = this.getAttribute('min-size');

    if (value === null) {
      return 0;
    }

    const num = Number(value);

    return Number.isNaN(num) ? 0 : num;
  }

  set minSize(value) {
    this.setAttribute('min-size', value != null ? value.toString() : value);
  }

  /**
   * @type {boolean} - Allows multiple files to be dropped.
   * @default false
   * @attribute multiple - Reflects the multiple property.
   */
  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    this.toggleAttribute('multiple', !!value);
  }

  /**
   * @type {boolean} - Automatically focuses the dropzone when it's connected to the DOM.
   * @default false
   * @attribute auto-focus - Reflects the autoFocus property.
   */
  get autoFocus() {
    return this.hasAttribute('auto-focus');
  }

  set autoFocus(value) {
    this.toggleAttribute('auto-focus', !!value);
  }

  /**
   * @type {boolean} - Prevents the dropzone from applying any styling.
   * @default false
   * @attribute no-style - Reflects the noStyle property.
   */
  get noStyle() {
    return this.hasAttribute('no-style');
  }

  set noStyle(value) {
    this.toggleAttribute('no-style', !!value);
  }

  /**
   * Handles the change event of the file input.
   *
   * @param {*} evt - The event object.
   */
  #handleFileInputChange = async evt => {
    try {
      this.#handleFilesSelect(await getFilesFromEvent(evt));
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent(`${COMPONENT_NAME}-error`, {
          bubbles: true,
          composed: true,
          detail: { error }
        })
      );
    }
  };

  /**
   * Handles the dragenter event of the dropzone.
   */
  #handleDragEnter = () => {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new Event(`${COMPONENT_NAME}-dragenter`, {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handles the dragover event of the dropzone.
   *
   * @param {*} evt - The event object.
   */
  #handleDragOver = evt => {
    evt.preventDefault();

    if (this.disabled) {
      evt.dataTransfer.dropEffect = 'none';
      return;
    }

    evt.dataTransfer.dropEffect = 'copy';

    if (this.#dropzoneEl) {
      this.#dropzoneEl.classList.add('dropzone--dragover');
      this.#dropzoneEl.part.add('dropzone--dragover');
    }

    this.dispatchEvent(
      new Event(`${COMPONENT_NAME}-dragover`, {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handles the dragleave event of the dropzone.
   */
  #handleDragLeave = () => {
    if (this.disabled) {
      return;
    }

    if (this.#dropzoneEl) {
      this.#dropzoneEl.classList.remove('dropzone--dragover');
      this.#dropzoneEl.part.remove('dropzone--dragover');
    }

    this.dispatchEvent(
      new Event(`${COMPONENT_NAME}-dragleave`, {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handles the drop event of the dropzone.
   *
   * @param {*} evt - The event object.
   */
  #handleDrop = async evt => {
    if (this.disabled) {
      return;
    }

    evt.preventDefault();

    if (this.#dropzoneEl) {
      this.#dropzoneEl.classList.remove('dropzone--dragover');
      this.#dropzoneEl.part.remove('dropzone--dragover');
    }

    try {
      this.#handleFilesSelect(await getFilesFromEvent(evt));
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent(`${COMPONENT_NAME}-error`, {
          bubbles: true,
          composed: true,
          detail: { error }
        })
      );
    }
  };

  /**
   * Handles the click event of the dropzone.
   */
  #handleClick = () => {
    if (this.disabled) {
      return;
    }

    this.#fileInput?.click();
  };

  /**
   * Handles the keyup event of the dropzone.
   *
   * @param {*} evt - The event object.
   */
  #handleKeyUp = evt => {
    if (this.disabled) {
      return;
    }

    if (evt.key === ' ' || evt.key === 'Enter') {
      this.#fileInput?.click();
    }
  };

  /**
   * Handles the selection of files.
   *
   * @param {File[]} files - The files to handle.
   */
  #handleFilesSelect(files) {
    if (!Array.isArray(files) || !files.length) {
      return;
    }

    const acceptedFiles = [];
    const rejectedFiles = [];
    const filesLength = files.length;

    // If the component is not in multiple mode, reject all files.
    if (!this.multiple && filesLength > 1) {
      for (const file of files) {
        rejectedFiles.push({
          file,
          errors: [
            {
              code: TOO_MANY_FILES,
              message: `Too many files selected. Only 1 file is allowed.`
            }
          ]
        });
      }
    } else if (this.multiple && filesLength > this.maxFiles) {
      // If the component is in multiple mode, but the number of files exceeds
      // the maxFiles attribute, reject all files.
      for (const file of files) {
        rejectedFiles.push({
          file,
          errors: [
            {
              code: TOO_MANY_FILES,
              message: `Too many files selected. Only ${this.maxFiles} ${this.maxFiles > 1 ? 'files are' : 'file is'} allowed.`
            }
          ]
        });
      }
    } else {
      // Validate each file. If it's valid, add it to the accepted files array,
      // otherwise add it to the rejected files array.
      for (const file of files) {
        const fileHasValidType = isValidFile(file, this.accept);
        const fileExceedsMaxSize = file.size > this.maxSize;
        const fileIsSmallerThanMinSize = file.size < this.minSize;

        if (fileHasValidType && !fileExceedsMaxSize && !fileIsSmallerThanMinSize) {
          acceptedFiles.push(file);
        } else {
          const errors = [];

          if (!fileHasValidType) {
            errors.push({
              code: INVALID_MIME_TYPE,
              message: `File type "${file.type}" is not accepted.`
            });
          }

          if (fileExceedsMaxSize) {
            errors.push({
              code: FILE_TOO_LARGE,
              message: `File size ${file.size} exceeds the maximum size of ${this.maxSize}.`
            });
          }

          if (fileIsSmallerThanMinSize) {
            errors.push({
              code: FILE_TOO_SMALL,
              message: `File size ${file.size} is smaller than the minimum size of ${this.minSize}.`
            });
          }

          rejectedFiles.push({ file, errors });
        }
      }
    }

    this.dispatchEvent(
      new CustomEvent(`${COMPONENT_NAME}-drop`, {
        bubbles: true,
        composed: true,
        detail: {
          acceptedFiles,
          rejectedFiles
        }
      })
    );

    if (acceptedFiles.length > 0) {
      this.dispatchEvent(
        new CustomEvent(`${COMPONENT_NAME}-drop-accepted`, {
          bubbles: true,
          composed: true,
          detail: {
            acceptedFiles
          }
        })
      );
    }

    if (rejectedFiles.length > 0) {
      this.dispatchEvent(
        new CustomEvent(`${COMPONENT_NAME}-drop-rejected`, {
          bubbles: true,
          composed: true,
          detail: {
            rejectedFiles
          }
        })
      );
    }

    if (this.#fileInput) {
      this.#fileInput.value = this.#fileInput.defaultValue;
    }
  }

  /**
   * Opens the file dialog programmatically.
   */
  openFileDialog() {
    if (this.disabled) {
      return;
    }

    this.#fileInput?.click();
  }

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {'accept' | 'disabled' | 'maxFiles' | 'maxSize' | 'minSize' | 'multiple' | 'autoFocus' | 'noStyle'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='files-dropzone'] - The name of the custom element.
   * @example
   *
   * FilesDropzone.defineCustomElement('my-dropzone');
   */
  static defineCustomElement(elementName = COMPONENT_NAME) {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, FilesDropzone);
    }
  }
}

export { FilesDropzone };
