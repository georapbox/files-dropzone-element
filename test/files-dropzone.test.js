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
  it('property accept is set when attribute accept is set', async () => {
    const el = await fixture(html`<files-dropzone accept="image/*"></files-dropzone>`);
    expect(el.accept).to.equal('image/*');
  });

  it('property accept is null when attribute accept is not set', async () => {
    const el = await fixture(html`<files-dropzone></files-dropzone>`);
    expect(el.accept).to.be.null;
  });

  it('attribute accept is set when property accept is set', async () => {
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

  it('attribute disabled is removed when property disabled is set to false', async () => {
    const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
    el.disabled = false;
    await elementUpdated(el);
    expect(el.hasAttribute('disabled')).to.be.false;
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

  it('attribute multiple is removed when property multiple is set to false', async () => {
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

  it('attribute no-click is removed when property noClick is set to false', async () => {
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

  it('attribute no-drag is removed when property noDrag is set to false', async () => {
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

  it('attribute no-keyboard is removed when property noKeyboard is set to false', async () => {
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

  it('attribute no-style is removed when property noStyle is set to false', async () => {
    const el = await fixture(html`<files-dropzone no-style></files-dropzone>`);
    el.noStyle = false;
    await elementUpdated(el);
    expect(el.hasAttribute('no-style')).to.be.false;
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
