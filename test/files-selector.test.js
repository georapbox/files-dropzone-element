import { expect } from '@open-wc/testing';
import { getFilesFromEvent } from '../src/utils/files-selector.js';

function createFile(name, size, type) {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get() {
      return size;
    }
  });
  return file;
}

function createDataTransferWithFiles(files = []) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        size: file.size,
        type: file.type,
        getAsFile: () => file,
        webkitGetAsEntry: () => ({
          isFile: true,
          isDirectory: false,
          file: (callback) => callback(file),
          createReader: () => ({
            readEntries: (callback) => callback([])
          }),
          fullPath: file.name,
          name: file.name
        })
      })),
      types: ['Files']
    }
  };
}

function createFileList(files = []) {
  return {
    target: {
      files
    }
  };
}

describe('files-dropzone/utils/files-selector', () => {
  it('should return an empty array if no files are selected', async () => {
    const event = createDataTransferWithFiles([]);
    expect(await getFilesFromEvent(event)).to.be.empty;
  });

  it('shoule return an array of files if files are selected', async () => {
    const files = [
      createFile('foo.txt', 1024, 'text/plain'),
      createFile('bar.png', 2048, 'text/png')
    ];
    const event = createDataTransferWithFiles(files);
    expect(await getFilesFromEvent(event)).to.deep.equal(files);
  });

  it('should add a `path` property to the file', async () => {
    const files = [
      createFile('foo.txt', 1024, 'text/plain'),
      createFile('bar.png', 2048, 'text/png')
    ];
    const event = createDataTransferWithFiles(files);
    for (const file of await getFilesFromEvent(event)) {
      expect(file).to.have.property('path');
      expect(file.path).to.equal(file.name);
    }
  });

  it('should add `type` property to the file if not present but file extension exists', async () => {
    const files = [
      createFile('foo.txt', 1024, ''),
      createFile('bar.png', 2048, '')
    ];
    const event = createDataTransferWithFiles(files);
    const filesFromEvent = await getFilesFromEvent(event);
    expect(filesFromEvent[0]).to.have.property('type', 'text/plain');
    expect(filesFromEvent[1]).to.have.property('type', 'image/png');
  });

  it('should ignore thumbnail cache files for macOS and Windows', async () => {
    const files = [
      createFile('.DS_Store', 1024, ''),
      createFile('Thumbs.db', 2048, '')
    ];
    const event = createDataTransferWithFiles(files);
    expect(await getFilesFromEvent(event)).to.be.empty;
  });

  it('should ignore non files', async () => {
    const event = {
      dataTransfer: {
        items: [{ kind: 'string', type: 'text/plain' }]
      }
    };
    expect(await getFilesFromEvent(event)).to.be.empty;
  });

  it('should get files from a FileList', async () => {
    const files = [
      createFile('foo.txt', 1024, 'text/plain'),
      createFile('bar.png', 2048, 'text/png')
    ];
    const event = createFileList(files);
    expect(await getFilesFromEvent(event)).to.deep.equal(files);
  });
});
