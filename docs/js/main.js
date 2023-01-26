const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/files-dropzone.js' : 'https://unpkg.com/@georapbox/files-dropzone-element';

import(componentUrl).then(res => {
  const { FilesDropzone } = res;

  FilesDropzone.defineCustomElement();

  const droppedFilesList = document.querySelector('#droppedFiles');
  const codePreview = document.querySelector('#code-preview');
  const form = document.querySelector('form');
  const dropzone = document.querySelector('files-dropzone');

  codePreview.textContent = '<files-dropzone></files-dropzone>';

  window.hljs.highlightElement(codePreview);

  function createCodePreview(dropzone) {
    return dropzone.outerHTML.replace(/=""/g, '');
  }

  function createFilesList(files, status = 'accepted') {
    if (!files.length) {
      return;
    }

    const container = document.createElement('div');
    const title = document.createElement('h4');
    const ul = document.createElement('ul');

    container.classList.add(status);
    title.textContent = status === 'accepted' ? 'Accepted files' : 'Rejected files';

    const items = files.map(item => {
      const file = status === 'accepted' ? item : item.file;

      return /* html */`
        <li>
          <code>${file.name}</code><code style="color: var(--text-main);">- ${file.size} bytes</code>
        </li>
      `;
    }).join('');

    container.appendChild(title);
    container.appendChild(ul);
    ul.innerHTML = items;

    return container;
  }

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

  document.addEventListener('files-dropzone-drop', evt => {
    console.log('files-dropzone-drop ->', evt.detail);

    const { acceptedFiles, rejectedFiles } = evt.detail;
    const acceptedFilesList = createFilesList(acceptedFiles, 'accepted');
    const rejectedFilesList = createFilesList(rejectedFiles, 'rejected');

    droppedFilesList.replaceChildren();

    droppedFilesList.innerHTML = /* html */`
      <details open>
        <summary>Dropped files</summary>
        <blockquote>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-lg" viewBox="0 0 16 16">
            <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
          </svg>
          <em>Open the browser's console to watch emitted events with more info of the dropped files.</em>
        </blockquote>
      </details>
    `;

    if (acceptedFilesList) {
      droppedFilesList.querySelector('details').appendChild(acceptedFilesList);
    }

    if (rejectedFilesList) {
      droppedFilesList.querySelector('details').appendChild(rejectedFilesList);
    }
  });
}).catch(err => {
  console.error(err);
});
