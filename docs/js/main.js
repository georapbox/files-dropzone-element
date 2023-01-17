const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/files-dropzone.js' : 'https://unpkg.com/@georapbox/files-dropzone-element';

import(componentUrl).then(res => {
  const { FilesDropzone } = res;

  const $console = document.getElementById('console');

  FilesDropzone.defineCustomElement();
}).catch(err => {
  console.error(err);
});
