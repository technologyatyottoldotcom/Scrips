
import React, { Component } from 'react';

class TableRow extends Component {

    constructor(props) {
        super(props);
    }
    

    Tbody({ td = [], style }) {
        return (
            <tr style={{ margin: 15, ...style }}>
                {
                    td.map((v, i) => {
                        return <td key={i} style={{ padding: 5 }}>{v}</td>
                    })
                }
            </tr>
        )
    }

    Name({ name, fullName }) {
        return (
            <>
                <div className="portfolio__stock__code">
                    <div className="stock__status"></div>
                    <div className="stock__code">{name}</div>
                </div>
                <div className="portfolio__stock__name">{fullName}</div>
            </>)
    }

    Symbol({ type, onClickOrder }) {
        return <button className="increase-circle" type={type} onClick={onClickOrder}
                    style={{ backgroundColor: (type === '+' ? '#00a0e3' : '#E51A4B'),
                            borderRadius: '50%',
                            width: 20, height: 20, color: 'white',  
                            textAlign: 'center'}}>{type}</button>
    }

    onClickOrder = (e) =>{
        this.props.addOrderArr(this.props.index, e.target.innerHTML);
    }


    render() {
        const {data, newWeight, orderArr, index} = this.props;
        const curr = (num) => parseFloat(num).toLocaleString('en-IN', {style: 'currency',currency: 'INR'});

        return (
            <this.Tbody td={[
                <this.Name name={data.StockCode} fullName={data.StockName} />
                ,
                data.Quantity,
                curr(data.AverageCost),
                curr(data.CurrentPrice),
                curr(data.CostValue),
                curr(data.CurrentValue),
                <span style={{ fontWeight: 'bold', color: "#19E683" }}>{data.TotalReturn}%</span>,
                <span style={{ fontWeight: 'bold', color: "#19E683" }}>1.2%</span>,
                data.PortfolioWeight+'%'+((newWeight!=0)?('('+newWeight+'%)'):''),
                curr(orderArr[index]*data.CurrentPrice),
                orderArr[index],
                <this.Symbol type="+" onClickOrder={this.onClickOrder} />,
                <this.Symbol type="-" onClickOrder={this.onClickOrder} />

            ]} />
        );
    }
}

export default TableRow;