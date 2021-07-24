import React from 'react';
import DeleteIcon from '../../../../assets/icons/delete.svg';

export class StockCompare extends React.PureComponent {
    render() {

        // console.log(this.props);
        const {code,name,symbol,company,exchange} = this.props;


        if(this.props.added)
        {
            console.log(this.props);
            return (
                <div className="Compare__stock__item">
                    <div>
                        <p className="Compare__stock__name">{symbol}</p>
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
                    this.props.compareStock(code,name,symbol,company,exchange);
                    this.props.handleSelection();
                }}>
                    <div>
                        <p className="Compare__stock__name">{symbol}</p>
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
