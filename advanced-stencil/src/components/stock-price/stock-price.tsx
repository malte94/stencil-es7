import { Element, Component, h, State} from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'uc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice {
    stockInput: HTMLInputElement;
    @Element() html: HTMLElement; // Access to HTML DOM Elements from Shadow DOM
    @State() price: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() error: string;

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
        const DOMStockSymbol = this.stockInput.value;
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