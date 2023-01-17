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
<!-- TODO -->
<files-dropzone></files-dropzone>
```

### Style

By default, the component comes with basic styling. However, You can customise the styles of the various elements of the component using the `::part()` CSS pseudo-elements provided for this purpose.

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
<!-- TODO -->

<sup>1</sup> Changing any of these properties/attributes may not always guarantee the desired result, because they all depend on the camera hardware support. For example, `zoom=3` might not result to the camera to zoom if the camera hardware does not support zooming. Using `getTrackCapabilities()` and `getTrackSettings()` can prove helpful to check the campera hardware support.

### Slots

| Name | Description |
| ---- | ----------- |
<!-- TODO -->

#### Slots usage examples

<!-- TODO -->

### CSS Parts

| Name | Description |
| ---- | ----------- |
<!-- TODO -->

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
<!-- TODO -->

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
<!-- TODO -->

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
