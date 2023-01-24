const FILES_TO_IGNORE = [
  // Thumbnail cache files for macOS and Windows
  '.DS_Store', // macOs
  'Thumbs.db' // Windows
];

/**
 * Wrap `FileSystemDirectoryReader.readEntries` in a promise to make working with read entries easier.
 * https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryReader/readEntries
 *
 * @param {FileSystemDirectoryReader} directoryReader The directory reader to read entries from.
 * @returns {Promise<FileSystemFileEntry[]>} A promise that resolves with an array of `FileSystemFileEntry` objects.
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
 * @param {FileSystemDirectoryReader} directoryReader The directory reader to read entries from.
 * @returns {Promise<FileSystemFileEntry[]>} A promise that resolves with an array of `FileSystemFileEntry` objects.
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
 * @param {FileSystemFileEntry} fileEntry The file entry to get a `File` object from.
 * @returns {Promise<File>} A promise that resolves with a `File` object.
 */
const getFileFromFileEntry = fileEntry => {
  return new Promise((resolve, reject) => {
    fileEntry.file(resolve, reject);
  });
};

/**
 * Get an array of `File` objects from a `DataTransferItemList` object.
 *
 * @param {DataTransferItemList} dataTransferItemList The item list to get an array of `File` objects from.
 * @returns {Promise<File[]>} A promise that resolves with an array of `File` objects.
 */
export const getFilesFromDataTransferItemList = async dataTransferItemList => {
  const files = [];

  // Use BFS to traverse entire directory/file structure
  const queue = [];

  for (const item of dataTransferItemList) {
    if (item.kind !== 'file') {
      // Ignore non-file items such as links.
      continue;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
    // This function is implemented as `webkitGetAsEntry()` in non-WebKit browsers
    // including Firefox at this time but it may be renamed to `getAsEntry()` in the future.
    const entry = item.getAsEntry ? item.getAsEntry() : item.webkitGetAsEntry();

    queue.push(entry);
  }

  while (queue.length > 0) {
    const entry = queue.shift();

    if (entry.isFile) {
      let file;

      try {
        file = await getFileFromFileEntry(entry);
      } catch (err) {
        continue;
      }

      if (FILES_TO_IGNORE.indexOf(file.name) === -1) {
        files.push(file);
      }
    } else if (entry.isDirectory) {
      try {
        queue.push(...await readAllDirectoryEntries(entry.createReader()));
      } catch (err) {
        console.error(err);
      }
    }
  }

  return files;
};

/**
 * Get an array of `File` objects from a `DataTransferFileList` object.
 *
 * @param {DataTransferFileList} dataTransferFileList The file list to get an array of `File` objects from.
 * @returns {Promise<File[]>} A promise that resolves with an array of `File` objects.
 */
export const getFilesFromDataTransferFileList = async dataTransferFileList => {
  const files = [];

  for (const file of dataTransferFileList) {
    if (FILES_TO_IGNORE.indexOf(file.name) === -1) {
      files.push(file);
    }
  }

  return files;
};
