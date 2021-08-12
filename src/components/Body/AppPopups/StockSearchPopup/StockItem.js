import React from 'react';

export class StockItem extends React.PureComponent {


    render() {

        let {code,name,symbol,nse_code,bse_code,company,exchange} = this.props.config;

        // console.log(this.props.config);

        let stocksymbol = exchange.exchange === 'NSE' ? nse_code : bse_code;

        stocksymbol = stocksymbol ? stocksymbol : symbol;

        symbol = exchange.exchange === 'NSE' ? symbol : code;


        return (
            <div className="Stock__item" onClick={e=> {this.props.selectedStock(this.props.config);this.props.handleSelection()}}>
                <div>
                    <p className="Stock__name">{stocksymbol}</p>
                    <p className="Stock__fullname">{company}</p>
                </div>
                <div className="Stock__exchange__section">
                    <p className="Stock__exchange">{exchange.exchange}</p>
                </div>
            </div>
        )
    }
}

export default StockItem;
