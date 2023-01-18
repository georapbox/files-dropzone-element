[![npm version](https://img.shields.io/npm/v/@georapbox/files-dropzone-element.svg)](https://www.npmjs.com/package/@georapbox/files-dropzone-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/files-dropzone-element.svg)](https://www.npmjs.com/package/@georapbox/files-dropzone-element)

[demo]: https://georapbox.github.io/files-dropzone-element/
[getUserMedia]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
[MediaDevices]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
[constraints]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#parameters
[license]: https://georapbox.mit-license.org/@2023
[changelog]: https://github.com/georapbox/files-dropzone-element/blob/main/CHANGELOG.md

# &lt;files-dropzone&gt;

A custom element that creates a drag and drop zone for files.

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
<files-dropzone accept="image/*,.docx,application/pdf" multiple></files-dropzone>
```

### Style

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `accept`<sup>1</sup> | ✓ | String | - | `null` | A string containing one or more of unique file type specifiers, separated by commas. |
| `disabled` | ✓ | Boolean | - | `false` | Disables the dropzone. |
| `noClick`<br>*`no-click`* | ✓ | Boolean | - | `false` | If set, disables the ability to select files by clicking on the dropzone area, using the native file dialog. |
|`noDrag`<br>*`no-drag`*| ✓ | Boolean | - | `false` | If set, disables drag 'n' drop. |
| `noKeyboard`<br>*`no-keyboard`* | ✓ | Boolean | - | `false` | If set, disables the ability to select files using the SPACE/ENTER keys and also disables the ability to focus on the element using the keyboard. |
| `multiple` | ✓ | Boolean | - | `false` | If set, allows drag 'n' drop (or selection from the file dialog) of multiple files. If not set, dropping multiple files in the dropzone area, will reject all of them to avoid undesired effects. |

<sup>1</sup> Each unique file type specifier may take one of the following forms:
- A valid case-insensitive filename extension, starting with a period (".") character. For example: `.jpg`, `.pdf`, or `.doc`.
- A valid MIME type string, with no extensions.
- A string to match any file of a specific type. For example: `image/*` for image files, `audio/*` for audio files, etc.
- Any comination of the above. For example: `image/*,.docx,application/pdf`

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `dropzone` | The dropzone area. |
| `dropzone--dragover` | The state of the dropzone when dragging over it. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--dropzone-border-radius` | The border radius of the dropzone area. | `0.25rem` |
| `--dropzone-border-width` | The border width of the dropzone area. | `2px` |
| `--dropzone-border-style` | The border style of the dropzone area. | `dashed` |
| `--dropzone-border-color` | The border color of the dropzone area. | `#71717a` |
| `--dropzone-border-color-hover` | The border color of the dropzone area in hover state. | `#38bdf8` |
| `--dropzone-border-color-dragover` | The border color of the dropzone area in dragover state. | `#38bdf8` |
| `--dropzone-background-color` | The background color of the dropzone area. | `#ffffff` |
| `--dropzone-background-color-hover` | The background color of the dropzone area in hover state. | `#f9f9f9` |
| `--dropzone-background-color-dragover` | The background color of the dropzone area in dragover state. | `#f9f9f9` |
| `--dropzone-text-color` | The text color of the dropzone area. | `#3f3f46` |
| `--dropzone-text-color-hover` | The text color of the dropzone area in hover state. | `#3f3f46` |
| `--dropzone-text-color-dragover` | The text color of the dropzone area in dragover state. | `#3f3f46` |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
<!-- TODO -->

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
