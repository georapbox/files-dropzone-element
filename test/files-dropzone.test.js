import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import sinon from 'sinon';
import { FilesDropzone } from '../src/files-dropzone.js';

FilesDropzone.defineCustomElement();

describe('<files-dropzone>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);

    await expect(el).to.be.accessible();
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
