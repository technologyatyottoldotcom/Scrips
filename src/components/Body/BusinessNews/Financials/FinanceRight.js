import React from 'react';
import { CreditRatings } from './CreditRatings';
import ChartContainer from './ChartContainer';

class FinanceRight extends React.PureComponent {
    render() {
        return (
            <>
                <div className="credit__ratings">
                    <CreditRatings stockcode={this.props.stockDetails.stockSymbol}/>
                </div>
                <div className="credit__charts GlobalScrollBar" style={{ top : 5, paddingBottom:15 , position: 'relative', height: 220, overflowY: 'scroll', scrollBehavior: 'smooth' }}>
                    <ChartContainer stockDetails={this.props.stockDetails}/>
                </div>
            </>
        )
    }
}

export { FinanceRight }