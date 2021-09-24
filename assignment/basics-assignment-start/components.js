class UdemyInfoButton extends HTMLElement {
    constructor() {
        super();        

        this.container = document.querySelector("udemy-info-button");
        this.attachShadow({ mode: 'open' });   

        this.shadowRoot.innerHTML = `
        <button>{default}</button>
      `;
    }

    connectedCallback() {
        let button = this.shadowRoot.querySelector("button");
        let p = document.createElement('p');
        let content = this.getAttribute('content');

        if (this.hasAttribute('text')) {
            button.innerHTML = this.getAttribute('text');
        }

        button.addEventListener('click', event => {

            if (this.hasAttribute("visible")) {
                p.innerHTML = content;
                this.shadowRoot.appendChild(p);
                this.removeAttribute("visible");
            } 
            
            else {
                this.shadowRoot.removeChild(p);
                this.setAttribute("visible", "");
            }

        });
    }

}

customElements.define('udemy-info-button', UdemyInfoButton);