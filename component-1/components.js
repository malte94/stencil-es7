class Tooltip extends HTMLElement {
    constructor() {
        super();
        
        /* Private Klassenvariablen werden hier bloß gesetzt oder defaulted. Der constructor ist unabhängig des DOMs,
        daher der connectedCallback() */
        
        this._tooltipText = 'The default text';
        this._tooltipIcon;

        /* Shadow DOM & Template */

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `

        <style>
            div {
              font-weight: normal;
              background-color: black;
              color: white;
              position: absolute;
              top: 1.5rem;
              left: 0.75rem;
              z-index: 10;
              padding: 0.15rem;
              border-radius: 3px;
              box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
            }

            :host {
              display: block;
              position: relative;
              padding: 10px;
            }

                ::slotted(.highlight) {
                  box-shadow: 1px 1px 5px red;
                }

            :host(.important) {
              background: red !important;
              padding: 0.15rem;
            }

            :host-context(p) {
              font-weight: bold;
            }

            .icon {
              background: black;
              color: white;
              padding: 0.15rem 0.5rem;
              text-align: center;
              border-radius: 50%;
            }
        </style>

        <slot>Some default</slot>
        <span class="icon">?</span>
    `;
        console.log('<udemy-tooltip> created.');
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
          this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener(
          'mouseenter',
          this._showTooltip.bind(this)
        );
        this._tooltipIcon.addEventListener(
          'mouseleave',
          this._hideTooltip.bind(this)
        );
        this.style.position = 'relative';
        this._render();
      }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback() { // Cleanup, wenn Klasse entfernt wird
        console.log('Disconnceted');
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
            this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
      }
    
    _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
    }
}

customElements.define('udemy-tooltip', Tooltip);

class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm('Do you really want to leave?')) {
                event.preventDefault();
            }
        });
    }
}


customElements.define('udemy-confirm-link', ConfirmLink, { extends: 'a' });