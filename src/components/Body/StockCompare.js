import React from 'react';

export class StockCompare extends React.PureComponent {
    render() {

        const {Name,AddStock} = this.props;

        return (
            <div className="Compare__stock__block">
                <p>{Name}</p>
                <div>
                    <button onClick={()=>{AddStock(Name)}}>Add Symbol</button>
                </div>
            </div>
        )
    }
}

export default StockCompare;
