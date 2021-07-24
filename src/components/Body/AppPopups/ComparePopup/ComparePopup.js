import React from 'react';
import axios from 'axios';
import Spinner from '../../../Loader/Spinner';
import StockCompare from './StockCompare';
import SearchIcon from '../../../../assets/icons/searchCompare.svg'
import CrossIcon from '../../../../assets/icons/crossicon.svg';

const REQUEST_BASE_URL = process.env.REACT_APP_REQUEST_BASE_URL;

export class ComparePopup extends React.PureComponent {

    constructor(props)
    {
        super(props);

        this.state = {
            search : '',
            suggestions : [],
            suggestionsLoaded : true,
            stockISIN : this.props.stockDetails.stockISIN,
            stockIndustry : this.props.stockDetails.stockIndustry,
            isLoading : true,
            stocks : null,
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.getStocksToWatch = this.getStocksToWatch.bind(this);
    }

    componentDidMount()
    {
        console.log('MOUNT')
        this.getStocksToWatch(this.state.stockIndustry,this.state.stockISIN);
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.stockDetails.stockISIN !== prevProps.stockDetails.stockISIN)
        {
            this.setState({
                stockISIN : this.props.stockDetails.stockISIN,
                stockIndustry : this.props.stockDetails.stockIndustry,
                isLoading : true
            },()=>{
                this.getStocksToWatch(this.state.stockIndustry,this.state.stockISIN);
            })
        }
    }

    getStocksToWatch(industry,isin) {

        console.log('GET')
        axios.get(`${REQUEST_BASE_URL}/stockstowatch/${industry}/${isin}/15`)
        .then(res=>{
            const data = res.data;
            console.log(data.stocks);
            this.setState({
                isLoading : false,
                stocks : data.stocks
            })
        })
    }

    handleSearchChange(e)
    {
        // console.log(e.target.value);
        this.setState({
            search : e.target.value
        },()=>{
            if(this.state.search && this.state.search.length > 0)
            {
                this.setState({
                    suggestionsLoaded : false
                })
                this.getSuggestions();
            }
            else
            {
                console.log('empty');
                this.handleSelection();
            }
        });
    }

    getSuggestions()
    {
        axios.get(`${REQUEST_BASE_URL}/stock/${this.state.search}`)
        .then((response) => {
            // console.log(response.data);
            this.setState({
                suggestions : response.data.suggestions,
                suggestionsLoaded : true
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    handleSelection()
    {
        this.setState({
            suggestions : [],
            search : ''
        })
    }

    render() {


        const CompareStockConfig = this.props.CompareStockConfig;

        console.log(CompareStockConfig);

        return (
            <>
                <div className="Compare__popup">
                    <div className="Compare__title__name">
                        <p>Compare Symbol</p>
                        <span id="Compare__close" onClick={()=> {this.props.CloseComparePopup(); this.handleSelection()}}>
                            <img src={CrossIcon} alt="X"/>
                        </span>
                    </div>
                    <div className="Compare__stock__search">
                        <div className="Compare__stock__search__icon">
                            <img src={SearchIcon} alt=""/>
                        </div>
                        <div className="Compare__stock__search__input">
                            <input placeholder="Search" value={this.state.search} onChange={e => this.handleSearchChange(e)}/>
                        </div>
                    </div>
                    <div className="Compare__stock__container">

                        {this.state.search.length > 0 ? 
                            this.state.suggestionsLoaded ? 
                                <div className="Compare__stock__searched">
                                    <p className="Compare__stock__section">Symbol & Discription</p>
                                    {this.state.suggestions.map((s,indx)=>{
                                        return (
                                            <StockCompare 
                                                key={indx}
                                                compareStock={this.props.compareStock} 
                                                {...s}
                                                handleSelection={this.handleSelection}
                                                added={false}
                                            />
                                        )
                                    })}
                                </div>
                                :
                                <>
                                    <Spinner size={30} />
                                </>
                            
                            :
                            <>
                                
                                {CompareStockConfig.length > 0 && 
                                    <div className="Compare__stock__added">
                                    <p className="Compare__stock__section">Added Symbols</p>
                                    {
                                        CompareStockConfig.map((c,i)=>{
                                        return (
                                                <StockCompare key={i} {...c} added={true} removeStock={this.props.removeStock}/>
                                            )
                                        })
                                    }
                                    </div>

                                }
                                
                                <div className="Compare__stock__suggessted">
                                    {this.state.isLoading ? 

                                        <p>Load</p>

                                        :

                                        <>
                                        <p className="Compare__stock__section">Similar Symbols</p>
                                        {this.state.stocks.map((s,indx)=>{

                                            const exchange=
                                            {
                                                exchange : s.exchange,
                                                exchange_code : s.exchange_code
                                            }
                                            return <>
                                                <StockCompare 
                                                    key={indx} 
                                                    added={false}
                                                    code={s.code}
                                                    name={s.Name}
                                                    symbol={s.Symbol}
                                                    company={s.company}
                                                    exchange={exchange}
                                                    compareStock={this.props.compareStock}
                                                    handleSelection={this.handleSelection}
                                                />
                                            </>
                                        })}
                                        </>

                                    }
                                </div>
                            </>    
                        }

                    </div>
                </div>
            </>
        )
    }
}

export default ComparePopup;
