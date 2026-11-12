const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/files-dropzone.js' : '../lib/files-dropzone.js';

const { FilesDropzone } = await import(componentUrl);
FilesDropzone.define();

const droppedFilesList = document.getElementById('droppedFiles');
const codePreview = document.getElementById('codePreview');
const form = document.querySelector('form');
const dropzone = document.querySelector('files-dropzone');
const openFileDialogBtn = document.getElementById('openFileDialogBtn');

codePreview.textContent = '<files-dropzone></files-dropzone>';

window.hljs.highlightElement(codePreview);

function createCodePreview(dropzone) {
  return dropzone.outerHTML.replace(/=""/g, '');
}

function createFilesList(files, status) {
  if (!files.length) {
    return;
  }

  const INITIAL_FILES_COUNT = 50;

  const container = document.createElement('div');

  const title = Object.assign(document.createElement('h3'), {
    className: 'dropped-files__title',
    textContent: `${status === 'accepted' ? 'Accepted' : 'Rejected'} files (${files.length})`
  });

  const list = Object.assign(document.createElement('ul'), {
    className: 'dropped-files__list'
  });

  files.forEach((item, index) => {
    const file = status === 'accepted' ? item : item.file;

    const listItem = Object.assign(document.createElement('li'), {
      className: `dropped-files__list-item dropped-files__list-item--${status}`,
      hidden: index >= INITIAL_FILES_COUNT
    });

    const fileInfo = document.createElement('div');
    fileInfo.append(document.createTextNode(file.name));

    const fileSize = document.createElement('span');
    fileSize.className = 'dropped-files__file-size';
    fileSize.textContent = ` - ${file.size} bytes`;

    fileInfo.appendChild(fileSize);
    listItem.appendChild(fileInfo);

    if (status === 'rejected') {
      const errorsList = document.createElement('ul');
      errorsList.className = 'dropped-files__errors';

      item.errors.forEach(({ message }) => {
        const errorItem = document.createElement('li');
        errorItem.textContent = message;
        errorsList.appendChild(errorItem);
      });

      listItem.appendChild(errorsList);
    }

    list.appendChild(listItem);
  });

  const showAllBtn = Object.assign(document.createElement('button'), {
    type: 'button',
    className: 'dropped-files__show-all',
    textContent: 'Show all'
  });

  container.appendChild(title);
  container.appendChild(list);

  if (files.length > INITIAL_FILES_COUNT) {
    container.appendChild(showAllBtn);
  }

  return container;
}

droppedFilesList.addEventListener('click', evt => {
  const target = evt.target;

  if (target.matches('.dropped-files__show-all')) {
    target.previousElementSibling.querySelectorAll('li').forEach(item => (item.hidden = false));
    target.remove();
  }
});

form.addEventListener('input', evt => {
  const target = evt.target;
  const { name, value } = target;

  if (target.hasAttribute('data-slot')) {
    dropzone.textContent = value;
  }

  if (target.hasAttribute('data-attr')) {
    switch (target.type) {
      case 'checkbox':
        target.checked ? dropzone.setAttribute(name, '') : dropzone.removeAttribute(name);
        break;
      default:
        value ? dropzone.setAttribute(name, value) : dropzone.removeAttribute(name);
    }
  }

  codePreview.textContent = createCodePreview(dropzone);

  window.hljs.highlightElement(codePreview);
});

document.addEventListener('dropzone-drop', evt => {
  console.log('dropzone-drop ->', evt.detail);

  const { acceptedFiles, rejectedFiles } = evt.detail;
  const acceptedFilesList = createFilesList(acceptedFiles, 'accepted');
  const rejectedFilesList = createFilesList(rejectedFiles, 'rejected');

  droppedFilesList.replaceChildren();

  if (acceptedFilesList) {
    droppedFilesList.appendChild(acceptedFilesList);
  }

  if (rejectedFilesList) {
    droppedFilesList.appendChild(rejectedFilesList);
  }
});

document.addEventListener('dropzone-error', evt => {
  console.log('dropzone-error ->', evt.detail.error);
});

openFileDialogBtn.addEventListener('click', () => {
  dropzone.openFileDialog();

  if (dropzone.hasAttribute('disabled')) {
    alert('Dropzone is disabled. File dialog will not open programmatically.');
  }
});
