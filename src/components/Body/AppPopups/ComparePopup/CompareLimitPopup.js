import React from 'react';
import $ from 'jquery';
import Close from '../../../../assets/icons/crossicon.svg';

export class CompareLimitPopup extends React.PureComponent {

    closePopup()
    {
        $('.compare__limit__popup').removeClass('active');
        $('.app__back__blur').removeClass('active');
    }

    render() {
        return (
            <div className="compare__limit__popup">
                <div className="compare__limit__sideline"></div>
                <div className="compare__limit__content">
                    <div className="compare__limit__text">
                        <h6>Warning</h6>
                        <p>Max number of securities to compared reaches.</p>
                    </div>
                    <div className="compare__limit__close" onClick={()=> {this.closePopup()}}>
                        <img src={Close} alt="X" />
                    </div>
                </div>
               
            </div>
        )
    }
}

export default CompareLimitPopup;
