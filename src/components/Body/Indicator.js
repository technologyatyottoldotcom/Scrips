import React from 'react';

export class Indicator extends React.PureComponent {
    render() {

        const {IndicatorName,IndicatorInfo,IndicatorType,InfoType} = this.props;

        return (
            <div className="Indicator__option__block">
                <p>{IndicatorName}</p>
                <div>
                    <button onClick={()=>IndicatorType(InfoType)}>Add Indicator</button>
                    <span onClick={()=>IndicatorInfo(InfoType)} data-info={InfoType}>?</span>
                </div>
            </div>
        )
    }
}

export default Indicator;
