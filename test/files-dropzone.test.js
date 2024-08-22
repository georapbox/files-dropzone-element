import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import sinon from 'sinon';
import { FilesDropzone } from '../src/files-dropzone.js';

FilesDropzone.defineCustomElement();

describe('files-dropzone', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  describe('accessibility', () => {
    it('passes accessibility test if enabled', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      await expect(el).to.be.accessible();
    });

    it('passes accessibility test if disabled', async () => {
      const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
      await expect(el).to.be.accessible();
    });

    it('dropzone should have attribute role="button"', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      expect(dropzone).to.have.attribute('role', 'button');
    });

    it('dropzone should have attribute tabindex="0" if enabled', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      expect(dropzone).to.have.attribute('tabindex', '0');
    });

    it('dropzone should have attribute tabindex="0" if enabled', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      expect(dropzone).to.have.attribute('tabindex', '0');
    });

    it('dropzone should not have attribute tabindex if disabled', async () => {
      const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      expect(dropzone).to.not.have.attribute('tabindex');
    });

    it('dropzone should have aria-disabled="false" if enabled', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      expect(dropzone).to.have.attribute('aria-disabled', 'false');
    });

    it('dropzone should have aria-disabled="true" if disabled', async () => {
      const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      expect(dropzone).to.have.attribute('aria-disabled', 'true');
    });
  });

  describe('slots', () => {
    it('has a default slot', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const slot = el.shadowRoot.querySelector('slot');
      expect(slot).to.exist;
    });

    it('has a default slot with text', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const slot = el.shadowRoot.querySelector('slot');
      expect(slot.assignedNodes({ flatten: true })[0].textContent).to.contain(
        "Drag 'n' drop files here, or click to select files"
      );
    });

    it('changes content of the default slot', async () => {
      const el = await fixture(html`<files-dropzone>foo</files-dropzone>`);
      const slot = el.shadowRoot.querySelector('slot');
      expect(slot.assignedNodes({ flatten: true })[0].textContent).to.contain('foo');
    });
  });

  describe('attributes/properties', () => {
    // accept property
    it('property accept is "image/*" when attribute accept is "image/*"', async () => {
      const el = await fixture(html`<files-dropzone accept="image/*"></files-dropzone>`);
      expect(el.accept).to.equal('image/*');
    });

    it('property accept is empty string when attribute accept is not set', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      expect(el.accept).to.equal('');
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

    // autoFocus property
    it('property autoFocus is true when attribute auto-focus is set', async () => {
      const el = await fixture(html`<files-dropzone auto-focus></files-dropzone>`);
      expect(el.autoFocus).to.be.true;
    });

    it('property autoFocus is false when attribute auto-focus is not set', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      expect(el.autoFocus).to.be.false;
    });

    it('attribute auto-focus is set when property autoFocus is set', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      el.autoFocus = true;
      await elementUpdated(el);
      expect(el.hasAttribute('auto-focus')).to.be.true;
    });

    it('attribute auto-focus is removed when property autoFocus is false', async () => {
      const el = await fixture(html`<files-dropzone auto-focus></files-dropzone>`);
      el.autoFocus = false;
      await elementUpdated(el);
      expect(el.hasAttribute('auto-focus')).to.be.false;
    });

    it('should be focused when property autoFocus is true', async () => {
      const el = await fixture(html`<files-dropzone auto-focus></files-dropzone>`);
      expect(el.matches(':focus')).to.be.true;
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
  });

  describe('Events', () => {
    // files-dropzone-dragenter
    it('fires files-dropzone-dragenter event when dragenter event is fired', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      const spy = sinon.spy();
      el.addEventListener('files-dropzone-dragenter', spy);
      dropzone.dispatchEvent(new DragEvent('dragenter'));
      expect(spy).to.have.been.calledOnce;
    });

    it('it does not fire files-dropzone-dragenter event when dragenter event is fired and disabled is set', async () => {
      const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      const spy = sinon.spy();
      el.addEventListener('files-dropzone-dragenter', spy);
      dropzone.dispatchEvent(new DragEvent('dragenter'));
      expect(spy).to.not.have.been.called;
    });

    // files-dropzone-dragover
    it('fires files-dropzone-dragover event when dragover event is fired', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      const spy = sinon.spy();
      el.addEventListener('files-dropzone-dragover', spy);
      dropzone.dispatchEvent(new DragEvent('dragover', { dataTransfer: new DataTransfer() }));
      expect(spy).to.have.been.calledOnce;
    });

    it('it does not fire files-dropzone-dragover event when dragover event is fired and disabled is set', async () => {
      const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      const spy = sinon.spy();
      el.addEventListener('files-dropzone-dragover', spy);
      dropzone.dispatchEvent(new DragEvent('dragover', { dataTransfer: new DataTransfer() }));
      expect(spy).to.not.have.been.called;
    });

    // files-dropzone-dragleave
    it('fires files-dropzone-dragleave event when dragleave event is fired', async () => {
      const el = await fixture(html`<files-dropzone></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      const spy = sinon.spy();
      el.addEventListener('files-dropzone-dragleave', spy);
      dropzone.dispatchEvent(new DragEvent('dragleave'));
      expect(spy).to.have.been.calledOnce;
    });

    it('it does not fire files-dropzone-dragleave event when dragleave event is fired and disabled is set', async () => {
      const el = await fixture(html`<files-dropzone disabled></files-dropzone>`);
      const dropzone = el.shadowRoot.querySelector('[part="dropzone"]');
      const spy = sinon.spy();
      el.addEventListener('files-dropzone-dragleave', spy);
      dropzone.dispatchEvent(new DragEvent('dragleave'));
      expect(spy).to.not.have.been.called;
    });
  });
});
