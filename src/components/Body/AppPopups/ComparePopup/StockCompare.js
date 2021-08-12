import React from 'react';
import DeleteIcon from '../../../../assets/icons/delete.svg';

export class StockCompare extends React.PureComponent {
    render() {

        let {code,name,symbol,nse_code,bse_code,company,exchange} = this.props.config;

        // console.log(this.props.config);

        let stocksymbol = exchange.exchange === 'NSE' ? nse_code : bse_code;

        stocksymbol = stocksymbol ? stocksymbol : symbol;

        symbol = exchange.exchange === 'NSE' ? symbol : code;

        // console.log(exchange.exchange,stocksymbol)


        if(this.props.added)
        {
            // console.log(this.props);
            return (
                <div className="Compare__stock__item">
                    <div>
                        <p className="Compare__stock__name">{stocksymbol}</p>
                        <p className="Compare__stock__fullname">{company}</p>
                    </div>
                    <div className="Compare__stock__exchange__section">
                        <p className="Compare__stock__exchange">{exchange.exchange}</p>
                        <div onClick={(e)=> {this.props.removeStock(e,symbol)}}>
                            <img src={DeleteIcon} alt="X"/>
                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="Compare__stock__item" onClick={()=>{
                    this.props.compareStock(code,name,symbol,stocksymbol,company,exchange);
                    this.props.handleSelection();
                }}>
                    <div>
                        <p className="Compare__stock__name">{stocksymbol}</p>
                        <p className="Compare__stock__fullname">{company}</p>
                    </div>
                    <div className="Compare__stock__exchange__section">
                        <p className="Compare__stock__exchange">{exchange.exchange}</p>
                    </div>
                </div>
            )
        }
    }
}

export default StockCompare;
