# CHANGELOG

## v2.1.0 (2025-08-24)

### Changed

- Switch file dialog invocation to `HTMLInputElement.showPicker()` (replaces `.click()`).

### Added

- Emit `files-dropzone-error` when opening the file dialog fails (e.g., without a user activation gesture).
- Include a code field (stable error identifier) in the `files-dropzone-error` event detail.
- Expose `ERROR_CODES` and `REJECTION_CODES` as static properties on `FilesDropzone` class for consumer reference.

### Fixed

- On Firefox Android, clicking directly on default slotted text did not open the file dialog (`NotAllowedError`). The default slot content is now wrapped in a `<span>` element to ensure consistent user activation across browsers.

### Maintenance

- Centralize custom event dispatch in a helper method to reduce code duplication.
- Update development dependencies.

## v2.0.1 (2024-08-22)

- Replace parcel with esbuild for bundling.
- Update ESLint to use flat configuration.
- Use Prettier for code formatting.
- Update dev dependencies.

## v2.0.0 (2024-02-12)

### Breaking changes

- Remove `no-click`, `no-keyboard` and `no-drag` attributes as they are not recommended for accessibility or usability. See issue [#4](https://github.com/georapbox/files-dropzone-element/issues/4).

### Other changes

- Set `delegateFocus` property to `true` when attaching the shadow root to the host element to delegate focus to the first focusable element in the shadow root.
- Improve component's accessibility for screen readers.
- Update dev dependencies.

## v1.2.1 (2023-12-12)

- Add `.md` and `.markdown` file extensions to common mime types.

## v1.2.0 (2023-12-11)

- Added `--dropzone-transition-duration` CSS Custom Property to change the transition duration for the dropzone. For backward compatibility, `--transition-duration` is still supported.
- Added `----dropzone-border-color-hover`, `--dropzone-background-color-hover` and `--dropzone-body-color-hover` CSS Custom Properties to change the dropzone border, background and body colors when the dropzone is hovered.
- Added `--dropzone-focus-box-shadow` CSS Custom Property to change the focus box shadow for the dropzone.
- Added Typescript types declaration file.
- Updated dev dependencies.

## v1.1.1 (2023-06-12)

- Added `image/jxl` mime type to common mime types.
- Update dev dependencies.

## v1.1.0 (2023-04-03)

- Added `auto-focus` attribute to dropzone element to focus on it when the component is rendered.
- Added `--dropzone-focus-shadow-rgb` CSS Custom Property to change the focus shadow color.
- Added `--transition-duration` CSS Custom Property to change the transition duration for the dropzone.
- Changed `--dropzone-border-color` default value.
- Changed `--dropzone-border-color-dragover` default value.

## v1.0.0 (2023-02-01)

- Initial release
