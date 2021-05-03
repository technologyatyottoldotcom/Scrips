import React from 'react'

export class ShareProfile extends React.PureComponent {
    render() {

        const {code,name,shares,value,change} = this.props;

        return (
            <div className="share__profile">
                <div className="sp__top sp__slot">
                    <span className="sp__status"></span>
                    <p className="sp__name">{code}</p>
                    <p className="sp__amount">Rs. {value}</p>
                </div>
                <div className="sp__middle sp__slot">
                    <p className="sp__fullname">{name}</p>
                    <p className={"sp__rate "+(parseFloat(change) > 0 ? 'increment' : 'decrement')}>{change}%</p>
                </div>
                <div className="sp__bottom sp__slot">
                    <p className="sp__shares">Position : {shares} Shares</p>
                </div>
            </div>
        )
    }
}

export default ShareProfile
