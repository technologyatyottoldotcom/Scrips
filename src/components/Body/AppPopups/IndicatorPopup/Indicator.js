import React from 'react';

export class Indicator extends React.PureComponent {
    render() {

        const {IndicatorName,IndicatorInfo,ChangeIndicatorType,InfoType} = this.props;

        return (
            <div className="Indicator__option__block" onClick={()=>{
                ChangeIndicatorType(InfoType);
            }}>
                <p>{IndicatorName}</p>
                <div>
                    {/* <button onClick={()=>ChangeIndicatorType(InfoType)}>Add Indicator</button> */}
                    <span onClick={()=>IndicatorInfo(InfoType)} data-info={InfoType}>?</span>
                </div>
            </div>
        )
    }
}

export default Indicator;
