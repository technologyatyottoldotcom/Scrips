import React from 'react';
import Axios from 'axios';
import AnimatedDigit from '../AnimatedDigit';
import SettingIcon from '../../../assets/icons/settings.svg';
import PlusIcon from '../../../assets/icons/plus.svg';
import MinusIcon from '../../../assets/icons/minus.svg';
import { QuoteNav } from './QuoteNav';
import { Overview } from './Overview';
import { Financials } from './Financials/Financials';
import { Technicals } from "./Technicals";
import {Valuation} from './Valuation';
import { Feed } from "./Feed";
import Pulse from '../../Loader/Pulse';

const REQUEST_BASE_URL = process.env.REACT_APP_REQUEST_BASE_URL;

class BusinessNews extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            field: 'overview',
            technicals : {
                loading : true,
                warning : false,
                targets : {}
            }
        }
    }

    componentDidMount()
    {
        const stock = this.props.stockDetails;
        let exchange = stock.stockExchange.exchange;
        let code = exchange === 'NSE' ? stock.stockNSECode : stock.stockBSECode;
        this.getTargets(exchange,code);
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.stockDetails.stockSymbol !== this.props.stockDetails.stockSymbol)
        {
            this.setState({
                technicals : {
                    loading : true,
                }
            })
            const stock = this.props.stockDetails;
            let exchange = stock.stockExchange.exchange;
            let code = exchange === 'NSE' ? stock.stockNSECode : stock.stockBSECode;
            this.getTargets(exchange,code);
        }
    }

    getTargets(exchange,code)
    {
        Axios.get(`${REQUEST_BASE_URL}/detailed_view/technical/${exchange}/${code}`)
        .then((res)=>{

            let data = res.data;
            if(data.status === 'success')
            {
                this.setState({
                    technicals : {
                        targets : data.targets,
                        loading : false,
                        warning : false,
                    }
                });
            }
            else if(data.status === 'warning')
            {
                this.setState({
                    technicals : {
                        warning : true,
                        loading : false
                    }
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {

        var field = this.state.field
        // console.log('type = ', field);

        let stockData = this.props.stockData;

        let TradePrice = stockData.last_traded_price;
        let dPrice = (TradePrice+'').split('.')[0];
        let fPrice = (TradePrice+'').split('.')[1];

        let change_price = parseFloat(stockData.change_price);
        let change_percentage = parseFloat(stockData.change_percentage);

        // console.log(change_price,change_percentage)

        let priceClass = change_price >= 0 ? 'positive' : 'negative';
        
        // console.log(this.props.isLoaded)
        
        if(this.props.stockData)
        {
            return (
                <>
                    <div className="business__container">
    
                            <div className="container__header">
                                <div className="stock__info">
                                    <div className="stock__details">
                                        <p className="stock__name__code">
                                            <span id="stock__code">{this.props.stockDetails.stockSymbol}</span>
                                        </p>
                                        <div className="stock__type">
                                            <img src={SettingIcon} alt="s"/>
                                            <p>Oil & Gas</p>
                                        </div>
                                    </div>
                                    <div id="stock__full__name">
                                        <span>{this.props.stockDetails.stockName}</span>
                                    </div>
                                    <div className="stock__price__purchase">
                                        <div className="price__decimals" style={{display : 'flex'}}>
                                            {dPrice &&
                                            dPrice.split('').map((n,i) => {
                                                return <AnimatedDigit 
                                                digit={n} 
                                                size={30} 
                                                key={i}
                                            />
                                            })}
                                        </div>
                                        <div className="price__fraction" style={{display : 'flex'}}>
                                            {fPrice &&
                                            fPrice.split('').map((n,i) => {
                                                return <AnimatedDigit 
                                                    digit={n} 
                                                    size={20} 
                                                    key={i}    
                                                />
                                            })}
                                        </div>
                                        <div className="stock__purchase">
                                            <div className="buy__stock"><img src={PlusIcon} alt=""/></div>
                                            <div className="sell__stock"><img src={MinusIcon} alt=""/></div>
                                        </div>
                                    </div>
                                    <div className="stock__price__change">
                                        <div className={priceClass +' stock__performance__amount'} style={{display : 'flex'}}>
                                            {stockData.change_price &&
                                                stockData.change_price.split('').map((n,i) => {
                                                    return <AnimatedDigit 
                                                        digit={n} 
                                                        size={18} 
                                                        key={i}    
                                                        digitMargin={-0.8}
                                                    />
                                            })}
                                        </div>
                                        <div className={priceClass +' stock__performance__percentage'} style={{display : 'flex'}}>
                                            ({stockData.change_percentage &&
                                                stockData.change_percentage.split('').map((n,i) => {
                                                    return <AnimatedDigit 
                                                        digit={n} 
                                                        size={18} 
                                                        key={i}
                                                        digitMargin={-0.8}
                                                    />
                                            })})
                                        </div>
                                    </div>
                                </div>
                                <div className="business__news__menu">
                                    <QuoteNav menuClass="business__menu" onClick={(i, e) => this.setState({ field: e.target.dataset.field?.toLowerCase()?.replace(/ /g, '') })} activeClassName="active-nav-0">
                                        <div active={field === 'overview'} data-field="overview">Overview</div>
                                        <div active={field === 'financials'} data-field="financials">Financials</div>
                                        <div data-field="valuation">Valuation</div>
                                        <div active={field === 'technicals'} data-field="technicals">Technicals<span style={{fontSize:"12px"}}> (AI & ML)</span></div>
                                        <div data-field="feed">Feed</div>
                                    </QuoteNav>
                                </div>
                            </div>
    
                            {this.props.snapdata ? 
                                
                                <div className="business__news__box">
                                    {field === 'overview' && <Overview 
                                        stockDetails={this.props.stockDetails}
                                        snapdata={this.props.snapdata}
                                    />}
                                    {field === 'financials' && <Financials stockDetails={this.props.stockDetails}/>}
                                    {field === 'valuation' && <Valuation />}
                                    {field === 'technicals' && <Technicals 
                                        technicals = {this.state.technicals}
                                    />}
                                    {field === 'feed' && <Feed />}
                                </div>
                                :
                                <div className="business__news__box__loader">
                                    <Pulse />
                                    <p>Loading Business News...</p>
                                </div>
                            
                            }
    
                    </div>
                </>
            )
        }
        else
        {
            return <div className="business__container__loader">
                <Pulse />
                <p>Loading Business News...</p>
            </div>;
        }
    }
}

export { BusinessNews }