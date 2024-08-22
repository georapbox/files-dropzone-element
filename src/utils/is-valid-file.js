// @ts-check

/**
 * Checks if a file is valid based on the accepted file type specifiers.
 *
 * @param {File} file - The File object to validate.
 * @param {string} [acceptedTypeSpecifiers=''] - The accepted file type specifiers.
 * @returns {boolean} - True if the file is valid, false otherwise.
 */
export function isValidFile(file, acceptedTypeSpecifiers = '') {
  if (!acceptedTypeSpecifiers) {
    return true;
  }

  const acceptedMimeTypesList = [
    ...new Set(
      acceptedTypeSpecifiers
        .split(',')
        .map(v => v.trim())
        .filter(Boolean)
    )
  ];

  const fileMimeType = file.type;
  const baseMimeType = fileMimeType.replace(/\/.*$/, '');

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
      if (fileMimeType === validType) {
        return true;
      }
    }
  }

  return false;
}
