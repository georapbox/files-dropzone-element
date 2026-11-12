[![npm version](https://img.shields.io/npm/v/@georapbox/files-dropzone-element.svg)](https://www.npmjs.com/package/@georapbox/files-dropzone-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/files-dropzone-element.svg)](https://www.npmjs.com/package/@georapbox/files-dropzone-element)

[demo]: https://georapbox.github.io/files-dropzone-element/
[license]: https://github.com/georapbox/files-dropzone-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/files-dropzone-element/blob/main/CHANGELOG.md

# &lt;files-dropzone&gt;

A custom element that creates a drag and drop zone for files.

> [!NOTE]
> The element does not provide any functionality for uploading files.
> Once files are dropped, you are free to process them however you like. 

[API documentation](#api) &bull; [Demo][demo]

## Installation

```sh
$ npm install --save @georapbox/files-dropzone-element
```

## Registration

By default, the package exports the element class without registering it.
This lets the application decide when the custom element is defined.

### Manual registration

Import the `FilesDropzone` class and call its static `define()` method:

```js
import { FilesDropzone } from '@georapbox/files-dropzone-element';

FilesDropzone.define();
```

### Automatic registration

If you don't need control over registration, import the convenience entry point:

```js
import '@georapbox/files-dropzone-element/define';
```

## Usage

Once registered, use the custom element in your HTML:

```html
<files-dropzone accept="image/*,.txt,application/pdf" multiple></files-dropzone>
```

## Styling

The component comes with default styling that can be customized using [CSS parts](#css-parts) and [CSS custom properties](#css-custom-properties).

### Complete example

This example demonstrates how to customize the dropzone's appearance and handle accepted and rejected files.

#### HTML

```html
<files-dropzone accept="image/png,image/jpeg" multiple>
  <span>Drag 'n' drop files here, or click to select files</span>
  <small>Accepted file types: <code>png</code>, <code>jpg</code></small>
</files-dropzone>

<h3>Accepted files</h3>
<ul id="accepted-files"></ul>

<h3>Rejected files</h3>
<ul id="rejected-files"></ul>
```

#### CSS

Customize the component using CSS custom properties and the `dropzone` CSS part.

```css
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
```

#### JavaScript

Listen for the `dropzone-drop` event to access accepted and rejected files.

```js
import { FilesDropzone } from 'https://unpkg.com/@georapbox/files-dropzone-element';

FilesDropzone.define();

const drozone = document.querySelector('files-dropzone');
const acceptedFilesList = document.getElementById('accepted-files');
const rejectedFilesList = document.getElementById('rejected-files');

dropzone.addEventListener('dropzone-drop', evt => {
  const { acceptedFiles, rejectedFiles } = evt.detail;

  acceptedFilesList.replaceChildren();
  rejectedFilesList.replaceChildren();

  acceptedFiles.forEach(file => {
    const li = document.createElement('li');
    li.textContent = `${file.name} - ${file.size} bytes`;
    acceptedFilesList.appendChild(li);
  });

  rejectedFiles.forEach(({ file, errors }) => {
    const li = document.createElement('li');
    li.textContent = `${file.name} - ${file.size} bytes (${errors.map(error => error.message).join(', ')})`;
    rejectedFilesList.appendChild(li);
  });
});
```

## API

### Properties and attributes

| Property / Attribute | Type | Default | Description |
| -------------------- | ---- | ------- | ----------- |
| `accept`<sup>1</sup> | String | `null` | A string containing one or more of unique file type specifiers, separated by commas. Files that do not match one of the accepted file type specifiers, will be rejected. |
| `disabled` | Boolean | `false` | Determines whether the dropzone is disabled. If `true`, the dropzone will be disabled and the user will not be able to select files. |
| `maxFiles` / `max-files` | Number | `Infinity` | Maximum accepted number of files. Note that this property has effect only when `multiple` is `true`. If its value is set to `0` or any negative number, it will allow any number of files. If the number of dropped files is greater than the value set, all of the files will be rejected to avoid making unsafe assumptions on which files to accept. |
| `maxSize` / `max-size` | Number | `Infinity` | Maximum file size (in bytes). |
| `minSize` / `min-size` | Number | `0` | Minimum file size (in bytes). |
| `multiple` | Boolean | `false` | If `true`, allows drag 'n' drop (or selection from the file dialog) of multiple files. If set to `false` and many files are dropped, all of them will be rejected to avoid making unsafe assumptions on which files to accept. |
| `autoFocus` / `auto-focus` | Boolean | `false` | If `true`, the dropzone will be focused when the component is rendered. It has no effect if `disabled` property is set to `true`. |
| `noStyle` / `no-style` | Boolean | `false` | If `true`, it will remove all default styling. It can be useful in cases you want to style the component's parts from scratch. Note that the available [CSS Custom Properties](#css-custom-properties) can still be used. |

<sup>1</sup> Each unique file type specifier may take one of the following forms:
- A valid case-insensitive filename extension, starting with a period (".") character. For example: `.jpg`, `.pdf`, or `.doc`.
- A valid MIME type string, with no extensions.
- A string to match any file of a specific type. For example: `image/*` for image files, `audio/*` for audio files, etc.
- Any comination of the above. For example: `image/*,.docx,application/pdf`

All properties are reflected through their corresponding HTML attributes. When only one name is listed, the property and attribute share the same name.

### Slots

| Name | Description |
| ---- | ----------- |
| (default) | Un-named slot to override the default content of the dropzone area. |

### CSS parts

| Name | Description |
| ---- | ----------- |
| `dropzone` | The dropzone area. |
| `dropzone--dragover` | The state of the dropzone when dragging over it. |

### CSS custom properties

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
| `define` | Static | Registers the custom element with the browser's CustomElementRegistry unless it has already been defined. | `tagName='files-dropzone'` |
| `openFileDialog` | Instance | Opens the native file dialog programmatically. The method will fail silently if the dropzone is disabled. Note that most browsers require a direct user interaction with the document, to open the file dialog, for security reasons. Therefore, if you are trying to call this method asynchronously, there's a good chance it's going to be blocked by the browser. For example in Safari 15.x, invoking this method inside a `setTimeout` with more that 1000ms delay, the dialog will not open. | - |

Instance methods are only available after the custom element has been defined. Use [`customElements.whenDefined()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/whenDefined) to ensure the element is registered before calling these methods.

### Static properties

Below are static properties exposed on the `FilesDropzone` class for consumer reference.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `ERROR_CODES` | Object | Static object of stable identifiers used in drop error event. Properties: `FILE_DIALOG_OPEN_FAILED`, `FILE_INPUT_CHANGE_FAILED`, `DROP_EVENT_PROCESSING_FAILED`, `UNKNOWN_ERROR`. |
| `REJECTION_CODES` | Object | Static object of stable identifiers used for file rejection reasons. Properties : `TOO_MANY_FILES`, `FILE_TOO_LARGE`, `FILE_TOO_SMALL`, `INVALID_MIME_TYPE`. |

### Events

| Name | Type | Description | Event Detail |
| ---- | ---- | ----------- | ------------ |
| `dropzone-drop` | CustomEvent | Dispatched when one or more files are selected, either by using the native file dialog or dropping files in the dropzone area. The event is emitted regardless if the dropped files are accepted or rejected. Files are accepted or rejected based on the `accept`, `max-files`, `max-size`, `min-size` and `multiple` attributes. | `{acceptedFiles: Array<File>, rejectedFiles: Array<{file: File, errors: Array<{code: FilesDropzoneRejectionCode, message: string}>}>}` |
| `dropzone-drop-accepted` | CustomEvent | Dispatched when one or more dropped files are accepted. If no files are accepted, the event is not emitted at all. | `{acceptedFiles: Array<File>}` |
| `dropzone-drop-rejected` | CustomEvent | Dispatched when one or more dropped files are rejected. If no files are rejected, the event is not emitted at all. | `{rejectedFiles: Array<{file: File, errors: Array<{code: FilesDropzoneRejectionCode, message: string}>}>}` |
| `dropzone-dragenter` | Event | Dispatched on `dragenter` event. The event is not emitted if `disabled` attribute is set. | - |
| `dropzone-dragover` | Event | Dispatched on `dragover` event. The event is not emitted if `disabled` attribute is set. | - |
| `dropzone-dragleave` | Event | Dispatched on `dragleave` event. The event is not emitted if `disabled` attribute is set. | - |
| `dropzone-error` | CustomEvent | Dispatched if there is any error in the process of reading dropped files or directories. | `{error: unknown, code: FilesDropzoneErrorCode}` |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

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

### Git hooks

This repository includes a pre-commit hook that runs linting and formatting checks before each commit.

To enable the hook, run the following command from the repository root:

```sh
git config --local core.hooksPath .githooks
```

This configuration only needs to be applied once per clone and does not affect other repositories.

To disable the hook, run:

```sh
git config --local --unset core.hooksPath
```

## License

[The MIT License (MIT)][license]
