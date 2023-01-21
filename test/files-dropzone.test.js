import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
// import sinon from 'sinon';
import { FilesDropzone } from '../src/files-dropzone.js';

FilesDropzone.defineCustomElement();

describe('files-dropzone', () => {
  /**
   * Accessibility
   */

  it('passes accessibility test when enabled without attributes', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility test when disabled', async () => {
    const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility test when no-keyboard', async () => {
    const el = await fixture(html`<files-dropzone no-keyboard></files-dropzone>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility test when no-click', async () => {
    const el = await fixture(html`<files-dropzone no-click></files-dropzone>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility test when no-drag', async () => {
    const el = await fixture(html`<files-dropzone no-drag></files-dropzone>`);
    await expect(el).to.be.accessible();
  });

  it('dropzone has tabindex when no-keyboard is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
    expect(dropzone.hasAttribute('tabindex')).to.be.true;
  });

  it('dropzone does not have tabindex when no-keyboard is set', async () => {
    const el = await fixture(html`<files-dropzone no-keyboard></files-dropzone>`);
    const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
    expect(dropzone.hasAttribute('tabindex')).to.be.false;
  });

  /**
   * Slots
   */

  it('has a default slot', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    const slot = el.shadowRoot.querySelector('slot');
    expect(slot).to.exist;
  });

  it('has a default slot with text', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    const slot = el.shadowRoot.querySelector('slot');
    expect(slot.assignedNodes({ flatten: true })[0].textContent).to.contain('Drag \'n\' drop files here, or click to select files');
  });

  it('changes content of the default slot', async () => {
    const el = await fixture(html`<files-dropzone>foo</files-dropzone>`);
    const slot = el.shadowRoot.querySelector('slot');
    expect(slot.assignedNodes({ flatten: true })[0].textContent).to.contain('foo');
  });

  /**
   * Attributes/properties
   */

  // accept property
  it('property accept is "image/*" when attribute accept is "image/*"', async () => {
    const el = await fixture(html`<files-dropzone accept="image/*"></files-dropzone>`);
    expect(el.accept).to.equal('image/*');
  });

  it('property accept is null when attribute accept is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.accept).to.be.null;
  });

  it('attribute accept is "image/*" when property accept is "image/*"', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.accept = 'image/*';
    await elementUpdated(el);
    expect(el.getAttribute('accept')).to.equal('image/*');
  });

  // disabled property
  it('property disabled is true when attribute disabled is set', async () => {
    const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
    expect(el.disabled).to.be.true;
  });

  it('property disabled is false when attribute disabled is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.disabled).to.be.false;
  });

  it('attribute disabled is set when property disabled is set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.disabled = true;
    await elementUpdated(el);
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('attribute disabled is removed when property disabled is false', async () => {
    const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
    el.disabled = false;
    await elementUpdated(el);
    expect(el.hasAttribute('disabled')).to.be.false;
  });

  // maxFiles property
  it('property maxFiles is 5 when attribute max-files is "5"', async () => {
    const el = await fixture(html`<files-dropzone max-files="5"></files-dropzone>`);
    expect(el.maxFiles).to.equal(5);
  });

  it('property maxFiles is Infinity when attribute max-files is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.maxFiles).to.equal(Infinity);
  });

  it('property maxFiles is Infinity when attribute max-files is "0"', async () => {
    const el = await fixture(html`<files-dropzone max-files="0"></files-dropzone>`);
    expect(el.maxFiles).to.equal(Infinity);
  });

  it('property maxFiles is Infinity when attribute max-files is "-1"', async () => {
    const el = await fixture(html`<files-dropzone max-files="-1"></files-dropzone>`);
    expect(el.maxFiles).to.equal(Infinity);
  });

  it('property maxFiles is Infinity when attribute max-files is "foo"', async () => {
    const el = await fixture(html`<files-dropzone max-files="foo"></files-dropzone>`);
    expect(el.maxFiles).to.equal(Infinity);
  });

  it('attribute max-files is "5" when property maxFiles is 5', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.maxFiles = 5;
    await elementUpdated(el);
    expect(el.getAttribute('max-files')).to.equal('5');
  });

  it('attribute max-files is "-1" when property maxFiles is -1', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.maxFiles = -1;
    await elementUpdated(el);
    expect(el.getAttribute('max-files')).to.equal('-1');
  });

  it('attribute max-files is "undefined" when property maxFiles is undefined', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.maxFiles = void 0;
    await elementUpdated(el);
    expect(el.getAttribute('max-files')).to.equal('undefined');
  });

  // maxSize property
  it('property maxSize is Infinity when attribute max-size is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.maxSize).to.equal(Infinity);
  });

  it('property maxSize is 1024 when attribute max-size is "1024"', async () => {
    const el = await fixture(html`<files-dropzone max-size="1024"></files-dropzone>`);
    expect(el.maxSize).to.equal(1024);
  });

  it('property maxSize is 0 when attribute max-size is "0"', async () => {
    const el = await fixture(html`<files-dropzone max-size="0"></files-dropzone>`);
    expect(el.maxSize).to.equal(0);
  });

  it('property maxSize is -1 when attribute max-size is "-1"', async () => {
    const el = await fixture(html`<files-dropzone max-size="-1"></files-dropzone>`);
    expect(el.maxSize).to.equal(-1);
  });

  it('attribute max-size is "1024" when property maxSize is 1024', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.maxSize = 1024;
    await elementUpdated(el);
    expect(el.getAttribute('max-size')).to.equal('1024');
  });

  it('attribute max-size is "undefined" when property maxSize is undefined', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.maxSize = void 0;
    await elementUpdated(el);
    expect(el.getAttribute('max-size')).to.equal('undefined');
  });

  it('attribute max-size is "null" when property maxSize is null', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.maxSize = null;
    await elementUpdated(el);
    expect(el.getAttribute('max-size')).to.equal('null');
  });

  // minSize property
  it('property minSize is 0 when attribute min-size is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.minSize).to.equal(0);
  });

  it('property minSize is 1024 when attribute min-size is "1024"', async () => {
    const el = await fixture(html`<files-dropzone min-size="1024"></files-dropzone>`);
    expect(el.minSize).to.equal(1024);
  });

  it('property minSize is 0 when attribute min-size is "0"', async () => {
    const el = await fixture(html`<files-dropzone min-size="0"></files-dropzone>`);
    expect(el.minSize).to.equal(0);
  });

  it('property minSize is -1 when attribute min-size is "-1"', async () => {
    const el = await fixture(html`<files-dropzone min-size="-1"></files-dropzone>`);
    expect(el.minSize).to.equal(-1);
  });

  it('attribute min-size is "1024" when property minSize is 1024', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.minSize = 1024;
    await elementUpdated(el);
    expect(el.getAttribute('min-size')).to.equal('1024');
  });

  it('attribute min-size is "undefined" when property minSize is undefined', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.minSize = void 0;
    await elementUpdated(el);
    expect(el.getAttribute('min-size')).to.equal('undefined');
  });

  it('attribute min-size is "null" when property minSize is null', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.minSize = null;
    await elementUpdated(el);
    expect(el.getAttribute('min-size')).to.equal('null');
  });

  // multiple property
  it('property multiple is true when attribute multiple is set', async () => {
    const el = await fixture(html`<files-dropzone multiple></files-dropzone>`);
    expect(el.multiple).to.be.true;
  });

  it('property multiple is false when attribute multiple is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.multiple).to.be.false;
  });

  it('attribute multiple is set when property multiple is set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.multiple = true;
    await elementUpdated(el);
    expect(el.hasAttribute('multiple')).to.be.true;
  });

  it('attribute multiple is removed when property multiple is false', async () => {
    const el = await fixture(html`<files-dropzone multiple></files-dropzone>`);
    el.multiple = false;
    await elementUpdated(el);
    expect(el.hasAttribute('multiple')).to.be.false;
  });

  // noClick property
  it('property noClick is true when attribute no-click is set', async () => {
    const el = await fixture(html`<files-dropzone no-click></files-dropzone>`);
    expect(el.noClick).to.be.true;
  });

  it('property noClick is false when attribute no-click is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.noClick).to.be.false;
  });

  it('attribute no-click is set when property noClick is set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.noClick = true;
    await elementUpdated(el);
    expect(el.hasAttribute('no-click')).to.be.true;
  });

  it('attribute no-click is removed when property noClick is false', async () => {
    const el = await fixture(html`<files-dropzone no-click></files-dropzone>`);
    el.noClick = false;
    await elementUpdated(el);
    expect(el.hasAttribute('no-click')).to.be.false;
  });

  // noDrag property
  it('property noDrag is true when attribute no-drag is set', async () => {
    const el = await fixture(html`<files-dropzone no-drag></files-dropzone>`);
    expect(el.noDrag).to.be.true;
  });

  it('property noDrag is false when attribute no-drag is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.noDrag).to.be.false;
  });

  it('attribute no-drag is set when property noDrag is set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.noDrag = true;
    await elementUpdated(el);
    expect(el.hasAttribute('no-drag')).to.be.true;
  });

  it('attribute no-drag is removed when property noDrag is false', async () => {
    const el = await fixture(html`<files-dropzone no-drag></files-dropzone>`);
    el.noDrag = false;
    await elementUpdated(el);
    expect(el.hasAttribute('no-drag')).to.be.false;
  });

  // noKeyboard property
  it('property noKeyboard is true when attribute no-keyboard is set', async () => {
    const el = await fixture(html`<files-dropzone no-keyboard></files-dropzone>`);
    expect(el.noKeyboard).to.be.true;
  });

  it('property noKeyboard is false when attribute no-keyboard is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.noKeyboard).to.be.false;
  });

  it('attribute no-keyboard is set when property noKeyboard is set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.noKeyboard = true;
    await elementUpdated(el);
    expect(el.hasAttribute('no-keyboard')).to.be.true;
  });

  it('attribute no-keyboard is removed when property noKeyboard is false', async () => {
    const el = await fixture(html`<files-dropzone no-keyboard></files-dropzone>`);
    el.noKeyboard = false;
    await elementUpdated(el);
    expect(el.hasAttribute('no-keyboard')).to.be.false;
  });

  // noStyle property
  it('property noStyle is true when attribute no-style is set', async () => {
    const el = await fixture(html`<files-dropzone no-style></files-dropzone>`);
    expect(el.noStyle).to.be.true;
  });

  it('property noStyle is false when attribute no-style is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.noStyle).to.be.false;
  });

  it('attribute no-style is set when property noStyle is set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    el.noStyle = true;
    await elementUpdated(el);
    expect(el.hasAttribute('no-style')).to.be.true;
  });

  it('attribute no-style is removed when property noStyle is false', async () => {
    const el = await fixture(html`<files-dropzone no-style></files-dropzone>`);
    el.noStyle = false;
    await elementUpdated(el);
    expect(el.hasAttribute('no-style')).to.be.false;
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
