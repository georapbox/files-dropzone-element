// @ts-check

/**
 * A map of common file extensions and their associated MIME types.
 */
const COMMON_MIME_TYPES = new Map([
  // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  ['aac', 'audio/aac'],
  ['abw', 'application/x-abiword'],
  ['arc', 'application/x-freearc'],
  ['avif', 'image/avif'],
  ['avi', 'video/x-msvideo'],
  ['azw', 'application/vnd.amazon.ebook'],
  ['bin', 'application/octet-stream'],
  ['bmp', 'image/bmp'],
  ['bz', 'application/x-bzip'],
  ['bz2', 'application/x-bzip2'],
  ['cda', 'application/x-cdf'],
  ['csh', 'application/x-csh'],
  ['css', 'text/css'],
  ['csv', 'text/csv'],
  ['doc', 'application/msword'],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['epub', 'application/epub+zip'],
  ['gz', 'application/gzip'],
  ['gif', 'image/gif'],
  ['heic', 'image/heic'],
  ['heif', 'image/heif'],
  ['htm', 'text/html'],
  ['html', 'text/html'],
  ['ico', 'image/vnd.microsoft.icon'],
  ['ics', 'text/calendar'],
  ['jar', 'application/java-archive'],
  ['jpeg', 'image/jpeg'],
  ['jpg', 'image/jpeg'],
  ['jxl', 'image/jxl'],
  ['js', 'text/javascript'],
  ['json', 'application/json'],
  ['jsonld', 'application/ld+json'],
  ['markdown', 'text/markdown'],
  ['md', 'text/markdown'],
  ['mid', 'audio/midi'],
  ['midi', 'audio/midi'],
  ['mjs', 'text/javascript'],
  ['mp3', 'audio/mpeg'],
  ['mp4', 'video/mp4'],
  ['mpeg', 'video/mpeg'],
  ['mpkg', 'application/vnd.apple.installer+xml'],
  ['odp', 'application/vnd.oasis.opendocument.presentation'],
  ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],
  ['odt', 'application/vnd.oasis.opendocument.text'],
  ['oga', 'audio/ogg'],
  ['ogv', 'video/ogg'],
  ['ogx', 'application/ogg'],
  ['opus', 'audio/opus'],
  ['otf', 'font/otf'],
  ['png', 'image/png'],
  ['pdf', 'application/pdf'],
  ['php', 'application/x-httpd-php'],
  ['ppt', 'application/vnd.ms-powerpoint'],
  ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  ['rar', 'application/vnd.rar'],
  ['rtf', 'application/rtf'],
  ['sh', 'application/x-sh'],
  ['svg', 'image/svg+xml'],
  ['swf', 'application/x-shockwave-flash'],
  ['tar', 'application/x-tar'],
  ['tif', 'image/tiff'],
  ['tiff', 'image/tiff'],
  ['ts', 'video/mp2t'],
  ['ttf', 'font/ttf'],
  ['txt', 'text/plain'],
  ['vsd', 'application/vnd.visio'],
  ['wav', 'audio/wav'],
  ['weba', 'audio/webm'],
  ['webm', 'video/webm'],
  ['webp', 'image/webp'],
  ['woff', 'font/woff'],
  ['woff2', 'font/woff2'],
  ['xhtml', 'application/xhtml+xml'],
  ['xls', 'application/vnd.ms-excel'],
  ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ['xml', 'application/xml'],
  ['xul', 'application/vnd.mozilla.xul+xml'],
  ['zip', 'application/zip'],
  ['7z', 'application/x-7z-compressed'],

  // Others
  ['mkv', 'video/x-matroska'],
  ['mov', 'video/quicktime'],
  ['msg', 'application/vnd.ms-outlook']
]);

const FILES_TO_IGNORE = [
  // Thumbnail cache files for macOS and Windows
  '.DS_Store', // macOs
  'Thumbs.db' // Windows
];

/**
 * Adds a `type` property to the file object if it doesn't have one and the file has an extension.
 * This is needed because Firefox doesn't add a type property to files dragged from the desktop.
 * @bug https://bugzilla.mozilla.org/show_bug.cgi?id=1424689
 *
 * @param {File} file - The file object to add the type property to.
 * @returns {File} - The file object with the type property added.
 */
const toFileWithMimeType = file => {
  const { name } = file;
  const hasExtension = name && name.lastIndexOf('.') !== -1;

  if (hasExtension && !file.type) {
    const extension = (name.split('.').pop() || '').toLowerCase();
    const type = COMMON_MIME_TYPES.get(extension);

    if (type) {
      Object.defineProperty(file, 'type', {
        value: type,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
  }

  return file;
};

/**
 * Adds a `path` property to the file object if it doesn't have one.
 * If `path` is not provided, the `webkitRelativePath` property of the file will be used
 * or the file's name if `webkitRelativePath` is not available.
 *
 * @param {File} file - The file object to add the path property to.
 * @param {string} [path] - The path to set on the file object.
 * @returns {File} - The file object with the path property added.
 */
const toFileWithPath = (file, path) => {
  const fileWithMimeType = toFileWithMimeType(file);

  // @ts-ignore
  if (typeof fileWithMimeType.path !== 'string') {
    const { webkitRelativePath } = file;

    Object.defineProperty(fileWithMimeType, 'path', {
      value: typeof path === 'string' ? path : webkitRelativePath || file.name,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }

  return fileWithMimeType;
};

/**
 * Wrap `FileSystemDirectoryReader.readEntries` in a promise to make working with read entries easier.
 * https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryReader/readEntries
 *
 * @param {FileSystemDirectoryReader} directoryReader - The directory reader to read entries from.
 * @returns {Promise<FileSystemEntry[]>} - A promise that resolves with an array of `FileSystemEntry` objects.
 */
const readEntriesPromise = async directoryReader => {
  return await new Promise((resolve, reject) => {
    directoryReader.readEntries(resolve, reject);
  });
};

/**
 * Read all entries in a directory or sub-directory
 * by calling `readEntries` until it returns an empty array.
 *
 * @param {FileSystemDirectoryReader} directoryReader - The directory reader to read entries from.
 * @returns {Promise<FileSystemEntry[]>} - A promise that resolves with an array of `FileSystemEntry` objects.
 */
const readAllDirectoryEntries = async directoryReader => {
  const entries = [];
  let readEntries = await readEntriesPromise(directoryReader);

  while (readEntries.length > 0) {
    entries.push(...readEntries);
    readEntries = await readEntriesPromise(directoryReader);
  }

  return entries;
};

/**
 * Get a `File` object from a `FileSystemFileEntry` object.
 *
 * @param {FileSystemFileEntry} fileEntry - The file entry to get a `File` object from.
 * @returns {Promise<File>} - A promise that resolves with a `File` object.
 */
const getFileFromFileEntry = fileEntry => {
  return new Promise((resolve, reject) => {
    fileEntry.file(file => resolve(toFileWithPath(file, fileEntry.fullPath)), reject);
  });
};

/**
 * Get an array of `File` objects from a `DataTransferItemList` object.
 *
 * @param {DataTransferItemList} dataTransferItemList - The item list to get an array of `File` objects from.
 * @returns {Promise<File[]>} - A promise that resolves with an array of `File` objects.
 */
const getFilesFromDataTransferItemList = async dataTransferItemList => {
  const files = [];

  // Chromium browsers read only 100 files at a time as per the spec, so we need to use
  // BFS (Breadth-first search) to traverse the entire directory/file structure.
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry#javascript_content
  const queue = [];

  for (const item of dataTransferItemList) {
    if (item.kind !== 'file') {
      // Ignore non-file items, such as links.
      continue;
    }

    // https://developer.mozilla.org/docs/Web/API/DataTransferItem/webkitGetAsEntry
    // This function is implemented as `webkitGetAsEntry()` in non-WebKit browsers
    // including Firefox at this time but it may be renamed to `getAsEntry()` in the future.
    // @ts-ignore
    const entry = item.getAsEntry ? item.getAsEntry() : item.webkitGetAsEntry();

    queue.push(entry);
  }

  while (queue.length > 0) {
    const entry = queue.shift();

    if (!entry) {
      continue;
    } else if (entry.isFile) {
      const file = await getFileFromFileEntry(entry);

      if (FILES_TO_IGNORE.indexOf(file.name) === -1) {
        files.push(file);
      }
    } else if (entry.isDirectory) {
      queue.push(...(await readAllDirectoryEntries(entry.createReader())));
    }
  }

  return files;
};

/**
 * Get an array of `File` objects from a `FileList` object.
 *
 * @param {FileList} fileList - The file list to get an array of `File` objects from.
 * @returns {Promise<File[]>} - A promise that resolves with an array of `File` objects.
 */
const getFilesFromFileList = async fileList => {
  const files = [];

  for (const file of fileList) {
    if (FILES_TO_IGNORE.indexOf(file.name) === -1) {
      files.push(toFileWithPath(file));
    }
  }

  return files;
};

/**
 * Get an array of `File` objects from an event.
 * This function supports both `drop` and `change` events.
 *
 * @param {*} evt - The event to get an array of `File` objects from.
 * @returns {Promise<File[]>} - A promise that resolves with an array of `File` objects.
 */
export const getFilesFromEvent = async evt => {
  if (evt.dataTransfer) {
    return evt.dataTransfer.items
      ? await getFilesFromDataTransferItemList(evt.dataTransfer.items)
      : await getFilesFromFileList(evt.dataTransfer.files);
  }

  return await getFilesFromFileList(evt.target.files);
};
