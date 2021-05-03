import React from 'react';

export class Interactive extends React.PureComponent {
    render() {

        const {IImage,Name,Itype,Stype,changeInteractive} = this.props;
        return (
            <div className="Interactive__tool" onClick={()=>{changeInteractive(Itype,Stype)}}>
                <img src={IImage} alt="I"/>
                <p>{Name}</p>
            </div>
        )
    }
}

export default Interactive;
