import { expect } from '@open-wc/testing';
import { isValidFile } from '../src/utils/is-valid-file.js';

describe('files-dropzone/utils/is-valid-file', () => {
  it('file is valid if no file type specifiers are provided', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file)).to.be.true;
  });

  it('file is valid if MIME type matches accepted MIME types', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, 'text/plain')).to.be.true;
    expect(isValidFile(file, 'text/*')).to.be.true;
  });

  it('file is valid if MIME type matches accepted MIME types (multiple)', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, 'text/plain, text/html')).to.be.true;
    expect(isValidFile(file, 'text/plain, text/*')).to.be.true;
  });

  it('file is valid if file\'s extension matches accepted extension', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, '.txt')).to.be.true;
  });

  it('file is valid if file\'s extension matches accepted extension (multiple)', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, '.txt, .html')).to.be.true;
  });

  it('file is invalid if MIME type does not match accepted MIME types', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, 'image/*')).to.be.false;
  });

  it('file is invalid if MIME type does not match accepted MIME types (multiple)', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, 'image/*, text/html')).to.be.false;
  });

  it('file is invalid if file\'s extension does not match accepted extension', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, '.html')).to.be.false;
  });

  it('file is invalid if accepted file type specifiers is an invalid value', async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });

    expect(isValidFile(file, 'invalid-mime-type')).to.be.false;
  });
});
