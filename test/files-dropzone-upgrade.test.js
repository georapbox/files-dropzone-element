import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { FilesDropzone } from '../src/files-dropzone.js';

describe('files-dropzone upgrading', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should preserve properties set before the custom element is defined', async () => {
    const container = await fixture(html`<div></div>`);
    const el = document.createElement('files-dropzone');

    // Set properties before upgrading
    el.accept = 'image/*';
    el.disabled = true;
    el.maxFiles = 5;
    el.maxSize = 1024 * 1024;
    el.minSize = 1024;
    el.multiple = true;
    el.autoFocus = true;
    el.noStyle = true;

    // Define and explicitly upgrade the custom element
    FilesDropzone.define();
    customElements.upgrade(el);

    // Connect the element so connectedCallback runs
    container.appendChild(el);

    expect(el.getAttribute('accept')).to.equal('image/*');
    expect(el.getAttribute('disabled')).to.equal('');
    expect(el.getAttribute('max-files')).to.equal('5');
    expect(el.getAttribute('max-size')).to.equal('1048576');
    expect(el.getAttribute('min-size')).to.equal('1024');
    expect(el.getAttribute('multiple')).to.equal('');
    expect(el.getAttribute('auto-focus')).to.equal('');
    expect(el.getAttribute('no-style')).to.equal('');
  });
});
