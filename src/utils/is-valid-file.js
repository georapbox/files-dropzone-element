/**
 * Checks if a file is valid based on the accepted mime types.
 *
 * @param {File} file The File object to validate.
 * @param {String} [acceptedMimeTypes=''] The accepted mime types.
 * @returns {Boolean} True if the file is valid, false otherwise.
 */
export function isValidFile(file, acceptedMimeTypes = '') {
  if (!acceptedMimeTypes) {
    return true;
  }

  const acceptedMimeTypesList = [
    ...new Set(acceptedMimeTypes.split(',').map(v => v.trim()).filter(Boolean))
  ];

  const mimeType = file.type;
  const baseMimeType = mimeType.replace(/\/.*$/, '');

  for (const validType of acceptedMimeTypesList) {
    if (validType.charAt(0) === '.') {
      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
        return true;
      }
    } else if (/\/\*$/.test(validType)) {
      // Check for mime type that looks like "image/*" or similar.
      if (baseMimeType === validType.replace(/\/.*$/, '')) {
        return true;
      }
    } else {
      if (mimeType === validType) {
        return true;
      }
    }
  }

  return false;
}
