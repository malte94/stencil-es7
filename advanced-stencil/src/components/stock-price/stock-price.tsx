import { Element, Component, h, State, Prop, Watch} from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'uc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice {
    stockInput: HTMLInputElement;
    initialStockSymbol: string;
    @Element() html: HTMLElement; // Access to HTML DOM Elements from Shadow DOM
    @State() price: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() error: string;
    
    @Prop({mutable: true, reflect: true}) stockSymbol: string;

    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
        if(newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.fetchStockPrice(newValue);
        }
    }

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if(this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        } else {
            this.stockInputValid = false;
        }
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        this.stockSymbol = this.stockInput.value;
    }

    fetchStockPrice(DOMStockSymbol: string) {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${DOMStockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
            return res.json();
          })
        .then (parsedStocks => {
            console.log(parsedStocks);

            if(parsedStocks['Global Quote']['05. price']) {
            this.price = +parsedStocks['Global Quote']['05. price'];
            this.error = null;
            } else {
                throw new Error('Data not available');
            }
        })
        .catch(err => {
            console.log(err);
            this.error = err.message;
        })
    }

    componentWillLoad() {
        this.stockUserInput = this.stockSymbol;
        this.stockInputValid = true;
    }

    componentDidLoad() {
        this.initialStockSymbol = this.stockSymbol;
        if(this.stockSymbol) {
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    componentWillUpdate() {
        console.log('Component will update ...');
    }

    componentDidUpdate() {
        // Update the component if HTML stock-symbol changed
        if(this.stockSymbol !== this.initialStockSymbol) {
            this.fetchStockPrice(this.stockSymbol);
            this.stockUserInput = this.stockSymbol;
        }
        console.log('Component updated.');
    }

    render() {
        let dataContent = <p>Price: {this.price} $</p>;
        if(this.error) {
            dataContent = <p>{this.error}</p>
        }
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input 
                id="stock-symbol" 
                ref={html => (this.stockInput = html)}
                value={this.stockUserInput}
                onInput={this.onUserInput.bind(this)}
                />
                <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}