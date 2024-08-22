[![npm version](https://img.shields.io/npm/v/@georapbox/files-dropzone-element.svg)](https://www.npmjs.com/package/@georapbox/files-dropzone-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/files-dropzone-element.svg)](https://www.npmjs.com/package/@georapbox/files-dropzone-element)

[demo]: https://georapbox.github.io/files-dropzone-element/
[license]: https://github.com/georapbox/files-dropzone-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/files-dropzone-element/blob/main/CHANGELOG.md

# &lt;files-dropzone&gt;

A custom element that creates a drag and drop zone for files.

Note that the element does not provide any functionality for uploading files. Once files are dropped, you are free to process them however you like. 

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/files-dropzone-element
```

## Usage

### Script

```js
import { FilesDropzone } from './node_modules/@georapbox/files-dropzone-element/dist/files-dropzone.js';

// Manually define the element.
FilesDropzone.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/files-dropzone-element/dist/files-dropzone-defined.js';
```

### Markup

```html
<files-dropzone accept="image/*,.txt,application/pdf" multiple></files-dropzone>
```

### Style

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `accept`<sup>1</sup> | ✓ | String | - | `null` | A string containing one or more of unique file type specifiers, separated by commas. Files that do not match one of the accepted file type specifiers, will be rejected. |
| `disabled` | ✓ | Boolean | - | `false` | Determines whether the dropzone is disabled. If `true`, the dropzone will be disabled and the user will not be able to select files. |
| `maxFiles`<br>*`max-files`* | ✓ | Number | - | `Infinity` | Maximum accepted number of files. Note that this property has effect only when `multiple` is `true`. If its value is set to `0` or any negative number, it will allow any number of files. If the number of dropped files is greater than the value set, all of the files will be rejected to avoid making unsafe assumptions on which files to accept. |
| `maxSize`<br>*`max-size`* | ✓ | Number | - | `Infinity` | Maximum file size (in bytes). |
| `minSize`<br>*`min-size`* | ✓ | Number | - | `0` | Minimum file size (in bytes). |
| `multiple` | ✓ | Boolean | - | `false` | If `true`, allows drag 'n' drop (or selection from the file dialog) of multiple files. If set to `false` and many files are dropped, all of them will be rejected to avoid making unsafe assumptions on which files to accept. |
| `autoFocus`<br>*`auto-focus`* | ✓ | Boolean | - | `false` | If `true`, the dropzone will be focused when the component is rendered. It has no effect if `disabled` property is set to `true`. |
| `noStyle`<br>*`no-style`* | ✓ | Boolean | - | `false` | If `true`, it will remove all default styling. It can be useful in cases you want to style the component's parts from scratch. Note that the available [CSS Custom Properties](#css-custom-properties) can still be used. |

<sup>1</sup> Each unique file type specifier may take one of the following forms:
- A valid case-insensitive filename extension, starting with a period (".") character. For example: `.jpg`, `.pdf`, or `.doc`.
- A valid MIME type string, with no extensions.
- A string to match any file of a specific type. For example: `image/*` for image files, `audio/*` for audio files, etc.
- Any comination of the above. For example: `image/*,.docx,application/pdf`

### Slots

| Name | Description |
| ---- | ----------- |
| (default) | Un-named slot to override the default content of the dropzone area. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `dropzone` | The dropzone area. |
| `dropzone--dragover` | The state of the dropzone when dragging over it. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--dropzone-border-width` | The border width of the dropzone area. | `2px` |
| `--dropzone-border-style` | The border style of the dropzone area. | `dashed` |
| `--dropzone-border-radius` | The border radius of the dropzone area. | `0.25rem` |
| `--dropzone-border-color` | The border color of the dropzone area. | `#6c757d` |
| `--dropzone-border-color-dragover` | The border color of the dropzone when dragging over it. | `#0d6efd` |
| `--dropzone-border-color-hover` | The border color of the dropzone when hovering over it. | `var(--dropzone-border-color-dragover)` |
| `--dropzone-background-color` | The background color of the dropzone area. | `#ffffff` |
| `--dropzone-background-color-dragover` | The background color of the dropzone when dragging over it. | `#f4f4f5` |
| `--dropzone-background-color-hover` | The background color of the dropzone when hovering over it. | `var(--dropzone-background-color-dragover)` |
| `--dropzone-body-color` | The text color of the dropzone area. | `#3f3f46` |
| `--dropzone-body-color-dragover` | The text color of the dropzone when dragging over it. | `var(--dropzone-body-color)` |
| `--dropzone-body-color-hover` | The text color of the dropzone when hovering over it. | `var(--dropzone-body-color-dragover)` |
| `--dropzone-focus-shadow-rgb` | The RGB color of the dropzone area focus shadow. | `49, 132, 253` |
| `--dropzone-focus-box-shadow` | The box shadow of the dropzone area focus. | `0 0 0 0.25rem rgba(var(--dropzone-focus-shadow-rgb), 0.5)` |
| `--dropzone-transition-duration` | The transition's duration for the dropzone area. | `0.2s` |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | elementName='files-dropzone' |
| `openFileDialog`<sup>1</sup> | Instance | Opens the native file dialog programmatically. The method will fail silently if the dropzone is disabled. Note that most browsers require a direct user interaction with the document, to open the file dialog, for security reasons. Therefore, if you are trying to call this method asynchronously, there's a good chance it's going to be blocked by the browser. For example in Safari 15.x, invoking this method inside a `setTimeout` with more that 1000ms delay, the dialog will not open. | - |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('files-dropzone').then(() => { /* call methods here */ });`

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `files-dropzone-drop` | Emitted when one or more files are selected, either by using the native file dialog or dropping files in the dropzone area. The event is emitted regardless if the dropped files are accepted or rejected. Files are accepted or rejected based on the `accept`, `max-files`, `max-size`, `min-size` and `multiple` attributes. | `{acceptedFiles: Array<File>, rejectedFiles: Array<{file: File, errors: Array<{code: 'TOO_MANY_FILES' \| 'FILE_TOO_LARGE' \| FILE_TOO_SMALL \| 'INVALID_MIME_TYPE', message: string}>}>}` |
| `files-dropzone-drop-accepted` | Emitted when one or more dropped files are accepted. If no files are accepted, the event is not emitted at all. | `{acceptedFiles: Array<File>}` |
| `files-dropzone-drop-rejected` | Emitted when one or more dropped files are rejected. If no files are rejected, the event is not emitted at all. | `{rejectedFiles: Array<{file: File, errors: Array<{code: 'TOO_MANY_FILES' \| 'FILE_TOO_LARGE' \| FILE_TOO_SMALL \| 'INVALID_MIME_TYPE', message: string}>}>}` |
| `files-dropzone-dragenter` | Emitted on `dragenter` event. The event is not emitted if `disabled` attribute is set. | - |
| `files-dropzone-dragover` | Emitted on `dragover` event. The event is not emitted if `disabled` attribute is set. | - |
| `files-dropzone-dragleave` | Emitted on `dragleave` event. The event is not emitted if `disabled` attribute is set. | - |
| `files-dropzone-error` | Emitted if there is any error in the process of reading dropped files or directories. | `{error: any}` |

## Usage example

Below is a basic usage example of the custom element that also demonstrates styles customization.

```html
<head>
  <style>
    files-dropzone {
      --dropzone-border-color: #dbdbdb;
      --dropzone-border-color-dragover: #0096bfab;
      --dropzone-background-color: #f7f7f7;
      --dropzone-background-color-dragover: #efefef;
      --dropzone-body-color: #363636;
      --dropzone-body-color-dragover: #363636;
    }

    files-dropzone::part(dropzone) {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    @media (prefers-color-scheme: dark) {
      files-dropzone {
        --dropzone-border-color: #526980;
        --dropzone-border-color-dragover: #0096bfab;
        --dropzone-background-color: #1a242f;
        --dropzone-background-color-dragover: #161f27;
        --dropzone-body-color: #dbdbdb;
        --dropzone-body-color-dragover: #dbdbdb;
      }
    }
  </style>
</head>

<body>
  <files-dropzone accept="image/png,image/jpg" multiple>
    <span>Drag 'n' drop files here, or click to select files</span>
    <small>Accepted file types: <code>png</code>, <code>jpg</code></small>
  </files-dropzone>

  <h3>Accepted files</h3>
  <ul id="accepted-files"></ul>

  <h3>Rejected files</h3>
  <ul id="rejected-files"></ul>

  <script type="module">
    import { FilesDropzone } from 'https://unpkg.com/@georapbox/files-dropzone-element';

    FilesDropzone.defineCustomElement();

    const drozone = document.querySelector('files-dropzone');
    const acceptedFilesList = document.getElementById('accepted-files');
    const rejectedFilesList = document.getElementById('rejected-files');

    dropzone.addEventListener('files-dropzone-drop', evt => {
      const { acceptedFiles, rejectedFiles } = evt.detail;

      acceptedFilesList.replaceChildren();
      rejectedFilesList.replaceChildren();

      acceptedFiles.forEach(file => {
        const li = document.createElement('li');
        li.textContent = `${file.name} - ${file.size} bytes`;
        acceptedFilesList.appendChild(li);
      });

      rejectedFiles.forEach(file => {
        const li = document.createElement('li');
        li.textContent = `${file.name} - ${file.size} bytes`;
        rejectedFilesList.appendChild(li);
      });
    });
  </script>
</body>  
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
