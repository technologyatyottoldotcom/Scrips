import React from 'react';
import $ from 'jquery';
import Close from '../../../../assets/icons/crossicon.svg';

export class IndicatorLimitPopup extends React.PureComponent {

    closePopup()
    {
        $('.indicator__limit__popup').removeClass('active');
        $('.app__back__blur').removeClass('active');
    }

    render() {
        return (
            <div className="indicator__limit__popup">
                <div className="indicator__limit__sideline"></div>
                <div className="indicator__limit__content">
                    <div className="indicator__limit__text">
                        <h6>Warning</h6>
                        <p>Max number of indicators can be used reaches.</p>
                    </div>
                    <div className="indicator__limit__close" onClick={()=> {this.closePopup()}}>
                        <img src={Close} alt="X" />
                    </div>
                </div>
               
            </div>
        )
    }
}

export default IndicatorLimitPopup;
