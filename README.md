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
<files-dropzone accept="image/*,.docx,application/pdf"></files-dropzone>
```

### Style

By default, the component comes with basic styling. However, You can customise the styles of the various elements of the component using the `::part()` CSS pseudo-elements provided for this purpose. See the [CSS Parts](#css-parts) section.

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `accept`<sup>1</sup> | ✓ | String | - | `null` | A string containing one or more of unique file type specifiers, separated by commas. |
| `disabled` | ✓ | Boolean | - | `false` | Disables the dropzone. |

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
| `--dropzone-text-color` | The text color of the dropzone area. | `#71717a` |
| `--dropzone-text-color-hover` | The text color of the dropzone area in hover state. | `#71717a` |
| `--dropzone-text-color-dragover` | The text color of the dropzone area in dragover state. | `#71717a` |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
<!-- TODO -->

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
