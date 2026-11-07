# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-11-07

### Breaking Changes

- **Explicit Package Exports**: Added a formal `exports` map to `package.json`.
  - **Supported entry points**: `@georapbox/files-dropzone-element`, `@georapbox/files-dropzone-element/define`, and `@georapbox/files-dropzone-element/custom-elements.json`.
  - **Impact**: Direct imports from internal paths (e.g., `@georapbox/files-dropzone-element/dist/...`) are no longer part of the supported public API and may fail in environments that enforce package exports.
- **Method Renaming**: Renamed the static `defineCustomElement()` method to `define()`.
  - **Action Required**: Replace calls to `FilesDropzone.defineCustomElement()` with `FilesDropzone.define()`.
- **Event Changes**:
  - **Event Renaming**: Renamed all events from `files-dropzone-*` to `dropzone-*` (e.g., `files-dropzone-drop` to `dropzone-drop`).
  - **Event Type Changes**: The `dropzone-dragenter`, `dropzone-dragover`, and `dropzone-dragleave` events are now dispatched as native `Event` instances instead of `CustomEvent` instances.
  - **Action Required**: Update event listeners to use the new event names. Event handlers for drag events should no longer rely on `CustomEvent` or access `event.detail`.

## [2.2.0] - 2026-02-16

### Added

- **Custom Elements Manifest Support**: Added support for generating a Custom Elements Manifest (CEM) using `@custom-elements-manifest/analyzer`.
  - **Script**: Added the `analyze` script for generating the manifest.
  - **Configuration**: Added `custom-elements-manifest.config.js`.
  - **Package Metadata**: Added the `customElements` field to `package.json`.

### Changed

- **Node.js Version**: Updated `.nvmrc` to Node.js 24.
- **JSDoc Documentation**: Refined attribute documentation for improved tooling and editor support.

## [2.1.1] - 2025-08-26

### Fixed

- **File Dialog Compatibility**: Restored compatibility with browsers that do not support `HTMLInputElement.showPicker()` by falling back to programmatically clicking the hidden file input element.

## [2.1.0] - 2025-08-24

### Added

- **File Dialog Error Event**: Added the `files-dropzone-error` event when opening the file dialog fails (e.g., without a user activation gesture).
- **Error Codes**: Added a `code` field (stable error identifier) to the `files-dropzone-error` event detail.
- **Static Constants**: Exposed `ERROR_CODES` and `REJECTION_CODES` as static properties on the `FilesDropzone` class for consumer reference.

### Changed

- **File Dialog Invocation**: Switched from `.click()` to `HTMLInputElement.showPicker()` for opening the file dialog.

### Fixed

- **Firefox Android Compatibility**: Fixed an issue where clicking directly on the default slotted text did not open the file dialog (`NotAllowedError`).
  - **Solution**: Wrapped the default slot content in a `<span>` element to ensure consistent user activation across browsers.

### Maintenance

- **Event Dispatching**: Centralized custom event dispatch in a helper method to reduce code duplication.
- **Dependencies**: Updated development dependencies.

## [2.0.1] - 2024-08-22

### Changed

- **Build Tooling**: Replaced Parcel with esbuild for bundling.
- **Linting**: Updated ESLint to use flat configuration.
- **Formatting**: Switched to Prettier for code formatting.
- **Dependencies**: Updated development dependencies.

## [2.0.0] - 2024-02-12

### Breaking Changes

- **Removed Attributes**: Removed the `no-click`, `no-keyboard`, and `no-drag` attributes, as they are not recommended for accessibility or usability.
  - **Reference**: See issue [#4](https://github.com/georapbox/files-dropzone-element/issues/4).

### Changed

- **Focus Delegation**: Set `delegatesFocus` to `true` when attaching the shadow root to the host element, allowing focus to be delegated to the first focusable element in the shadow root.
- **Accessibility**: Improved the component's accessibility for screen readers.
- **Dependencies**: Updated development dependencies.

## [1.2.1] - 2023-12-12

### Added

- **MIME Type Support**: Added `.md` and `.markdown` file extensions to common MIME types.

## [1.2.0] - 2023-12-11

### Added

- **Transition Duration**: Added the `--dropzone-transition-duration` CSS custom property to control the dropzone's transition duration.
  - **Backward Compatibility**: The existing `--transition-duration` property remains supported.
- **Hover Styling**: Added `--dropzone-border-color-hover`, `--dropzone-background-color-hover`, and `--dropzone-body-color-hover` CSS custom properties to customize the dropzone's hover state.
- **Focus Styling**: Added the `--dropzone-focus-box-shadow` CSS custom property to customize the dropzone's focus box shadow.
- **TypeScript Declarations**: Added a TypeScript declaration file.

### Maintenance

- **Dependencies**: Updated development dependencies.

## 1.1.1 - 2023-06-12

### Added

- **MIME Type Support**: Added support for the `image/jxl` MIME type.

### Maintenance

- **Dependencies**: Updated development dependencies.

## 1.1.0 - 2023-04-03

### Added

- **Auto Focus**: Added the `auto-focus` attribute to focus the dropzone when rendered.
- **Focus Styling**: Added the `--dropzone-focus-shadow-rgb` CSS custom property to customize the focus shadow color.
- **Transition Duration**: Added the `--transition-duration` CSS custom property to customize the dropzone's transition duration.

### Changed

- **Default Border Colors**: Updated the default values of `--dropzone-border-color` and `--dropzone-border-color-dragover`.

## 1.0.0 - 2023-02-01

### Added

- **Initial Release**: First release of the project.

[Unreleased]: https://github.com/georapbox/files-dropzone-element/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/georapbox/files-dropzone-element/compare/v2.2.0...v3.0.0
[2.2.0]: https://github.com/georapbox/files-dropzone-element/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/georapbox/files-dropzone-element/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/georapbox/files-dropzone-element/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/georapbox/files-dropzone-element/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/georapbox/files-dropzone-element/compare/v1.2.1...v2.0.0
[1.2.1]: https://github.com/georapbox/files-dropzone-element/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/georapbox/files-dropzone-element/releases/tag/v1.2.0
