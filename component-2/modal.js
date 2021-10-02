class Modal extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isOpen = false;
      this.shadowRoot.innerHTML = `
          <style>
              #backdrop {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100vh;
                  background: rgba(0,0,0,0.75);
                  z-index: 10;
                  opacity: 0;
                  pointer-events: none;
              }
  
              :host([opened]) #backdrop,
              :host([opened]) #modal {
                  opacity: 1;
                  pointer-events: all;
              }
  
              #modal {
                  position: fixed;
                  top: 15vh;
                  left: 25%;
                  width: 50%;
                  z-index: 100;
                  background: white;
                  border-radius: 3px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  opacity: 0;
                  pointer-events: none;
              }
  
              header {
                  padding: 1rem;
              }
  
              header h1 {
                  font-size: 1.25rem;
              }
  
              #main {
                  padding: 1rem;
              }
  
              #actions {
                  border-top: 1px solid #ccc;
                  padding: 1rem;
                  display: flex;
                  justify-content: flex-end;
              }
  
              #actions button {
                  margin: 0 0.25rem;
              }
          </style>
          <div id="backdrop"></div>
          <div id="modal">
              <header>
                  <slot name="slot-title">This would be the default text.</slot>
              </header>
              <section id="main">
                  <slot name="slot-content">This would be the default text.</slot>
              </section>
              <section id="actions">
                  <button id="btn-cancel">Cancel</button>
                  <button id="btn-confirm">Okay</button>
              </section>
          </div>
      `;

      const slots = this.shadowRoot.querySelectorAll('slot');
      slots[1].addEventListener('slotchange', event => {
        console.dir(slots[1]);
      });

      const btnCancel = this.shadowRoot.querySelector('#btn-cancel');
      const btnConfirm = this.shadowRoot.querySelector('#btn-confirm');

      btnCancel.addEventListener('click', this._cancel.bind(this));
      btnConfirm.addEventListener('click', this._confirm.bind(this));
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (this.hasAttribute('opened')) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    }
  
    static get observedAttributes() {
      return ['opened'];
    }
  
    open() {
      this.setAttribute('opened', '');
      this.isOpen = true;
    }

    hide() {
        this.removeAttribute('opened');
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event('cancel', {
            bubbles: true,
            composed: true // Outside the Shadow DOM accessible
        });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm(event) {
        this.hide();
        const confirmEvent = new Event('confirm', {
            bubbles: true,
            composed: true // Outside the Shadow DOM accessible
        });
        event.target.dispatchEvent(confirmEvent);
    }

  }
  
  customElements.define('uc-modal', Modal);
  