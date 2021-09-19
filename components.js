class Tooltip extends HTMLElement {
    constructor() {
        super();
        
        /* Global Variablen werden hier bloß gesetzt oder defaulted. Der constructor ist unabhängig des DOMs,
        daher der connectedCallback() */
        
        this._tooltipContainer;
        this._tooltipText = 'The default text';

        /* Shadow DOM */

        this.attachShadow({ mode: 'open' });

        console.log('<udemy-tooltip> created.');
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = '(?) ';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)); // Wird nur an die Klasse gebunden
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)); // Wird nur an die Klasse gebunden
         
        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip() { // _ indiziert für JS eine private Methode
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;

        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('udemy-tooltip', Tooltip);