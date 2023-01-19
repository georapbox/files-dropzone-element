const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/files-dropzone.js' : 'https://unpkg.com/@georapbox/files-dropzone-element';

import(componentUrl).then(res => {
  const { FilesDropzone } = res;

  FilesDropzone.defineCustomElement();

  document.addEventListener('files-dropzone:drop', evt => {
    console.log('files-dropzone:drop ->', evt.detail);
  });

  document.addEventListener('files-dropzone:drop-accepted', evt => {
    console.log('files-dropzone:drop-accepted ->', evt.detail);
  });

  document.addEventListener('files-dropzone:drop-rejected', evt => {
    console.log('files-dropzone:drop-rejected ->', evt.detail);
  });
}).catch(err => {
  console.error(err);
});
