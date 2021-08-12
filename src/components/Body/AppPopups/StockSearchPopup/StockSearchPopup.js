import React from 'react';
import axios from 'axios';
import Spinner from '../../../Loader/Spinner';
import SearchIcon from '../../../../assets/icons/searchCompare.svg'
import CrossIcon from '../../../../assets/icons/crossicon.svg';
import StockItem from './StockItem';
import Pulse from '../../../Loader/Pulse';

const REQUEST_BASE_URL = process.env.REACT_APP_REQUEST_BASE_URL;

export class StockSearchPopup extends React.PureComponent {

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
            stocks : [],
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
            console.log(response.data.suggestions);
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
        });
        this.props.CloseStockPopup();
    }

    render() {

        return (
            <>
                <div className="Stock__popup">
                    <div className="Stock__title__name">
                        <p>Search Symbol</p>
                        <span id="Stock__close" onClick={()=> {this.props.CloseStockPopup(); this.handleSelection()}}>
                            <img src={CrossIcon} alt="X"/>
                        </span>
                    </div>
                    <div className="Stock__search">
                        <div className="Stock__search__icon">
                            <img src={SearchIcon} alt=""/>
                        </div>
                        <div className="Stock__search__input">
                            <input placeholder="Search" value={this.state.search} onChange={e => this.handleSearchChange(e)}/>
                        </div>
                    </div>
                    <div className="Stock__container">

                        {this.state.search.length > 0 ? 
                            this.state.suggestionsLoaded ? 
                                <div className="Stock__searched">
                                    <p className="Stock__section">Symbol & Discription</p>
                                    {this.state.suggestions.map((s,indx)=>{
                                        return (
                                            <StockItem 
                                                key={indx}
                                                config={s}
                                                selectedStock={this.props.selectedStock}
                                                handleSelection={this.handleSelection}

                                            />
                                        )
                                    })}
                                </div>
                                :
                                <>
                                    <div className="Stock__searched__loader">
                                        <Pulse />
                                    </div>
                                </>
                            
                            :
                            <>
                                
                                    {this.state.isLoading ? 

                                        <div className="Stock__suggessted__loader">
                                            <Pulse />
                                        </div>

                                        :

                                        <>
                                        <div className="Stock__suggessted">
                                            <p className="Stock__section">Similar Symbols</p>
                                                {this.state.stocks && this.state.stocks.map((s,indx)=>{

                                                   
                                                    return <>
                                                        <StockItem 
                                                            key={indx} 
                                                            config={s}
                                                            selectedStock={this.props.selectedStock}
                                                            handleSelection={this.handleSelection}

                                                        />
                                                    </>
                                                })}
                                            </div>
                                        </>

                                    }
                            </>    
                        }

                    </div>
                </div>
            </>
        )
    }
}

export default StockSearchPopup;
