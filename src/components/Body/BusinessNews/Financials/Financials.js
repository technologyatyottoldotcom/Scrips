import React from 'react';
import {FinanceLeft} from './FinanceLeft';
import {FinanceRight} from './FinanceRight';
import '../../../../scss/Financials.scss';

class Financials extends React.PureComponent {

    render() {
        return (
            
            <div className="bn__stock__financials">
                <div className="financials__left">
                    <FinanceLeft stockDetails={this.props.stockDetails}/>
                </div>
                <div className="financials__right">
                    <FinanceRight stockDetails={this.props.stockDetails}/>
                </div>
        </div>

        )
    }
}

export { Financials }