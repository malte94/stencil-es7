class Tooltip extends HTMLElement {
    constructor() {
        super();
        
        this._tooltipContainer; // Globale Variable

        console.log('<udemy-tooltip> created.');
    }

    connectedCallback() {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = '(?) ';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)); // Wird nur an die Klasse gebunden
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)); // Wird nur an die Klasse gebunden
        this.appendChild(tooltipIcon);
    }

    _showTooltip() { // _ indiziert für JS eine private Methode
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = 'This is the tooltip text!';
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('udemy-tooltip', Tooltip);