import React from 'react';
import Axios from 'axios';
import Search from '../../../../assets/icons/search.svg';
import Plus from '../../../../assets/icons/plus.svg'

const REQUEST_BASE_URL = process.env.REACT_APP_REQUEST_BASE_URL || `http://localhost:9000`;


class StockSuggestion extends React.PureComponent{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const {addTableRow} = this.props;

        if(this.props.suggestions.length > 0)
        {

            return (
                <>
                    {this.props.suggestions.map((s,index)=>{
                        return <p style={{fontSize: 10, padding: 0, alignItems:'center'}}
                            key={s.code} 
                            onClick={e => {addTableRow(this.props.suggestions[index])}}>
                                <span style={{paddingLeft: 10}}>{s.symbol}</span> 
                                <span>{s.company}</span> 
                                <span>{s.exchange.exchange}</span>
                                <span style={{fontSize: 15, color: '#00a0e3', fontWeight: 'bold', paddingRight: 10}}>+</span>
                        </p>
                    })}
                </>
            )
        }
        else
        {
            return null
        }
    }
}


class PortfolioSearchBar extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            search : '',
            suggestions : []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.setComponentRef = this.setComponentRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    setComponentRef(node)
    {
        this.ComponentRef = node;
    }


    handleClickOutside(event) {
        if (this.ComponentRef && !this.ComponentRef.contains(event.target)) {
            this.setState({
                search : '',
                suggestions : [],
            })
        }
    }

    handleSearchChange(e)
    {
        this.setState({
            search : e.target.value
        },()=>{
            if(this.state.search && this.state.search.length > 0)
            {
                this.setState({
                    suggestions : [],
                },()=>{
                    this.getSuggestions();
                });
                
            }
            else
            {
                this.setState({
                    suggestions : [],
                    loading : false,
                })
            }
        });
    }

    getSuggestions()
    {
        Axios.get(`${REQUEST_BASE_URL}/stock/${this.state.search}`)
        .then((response) => {
            let suggestions = response.data.suggestions;
            this.setState({
                loading : false,
                suggestions : suggestions
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

    

    render()
    {
        const {addTableRow} = this.props;

        return <div className="app__header" style={{padding: 0 }}>
            <div className="stock__search" ref={this.setComponentRef} style={{boxShadow: 'none', borderBottom: 'solid 1px #ccc', borderRadius: 0}} >
                <div className="stock__search__icon" style={{marginLeft: 0}}>
                    <img src={Search} alt=""/>
                </div>
                <input placeholder='Add Symbol' value={this.state.search} onChange={e => this.handleSearchChange(e)}/>

                <div className="stock__suggestions">
                    <StockSuggestion suggestions={this.state.suggestions} handleSelection={this.handleSelection} addTableRow={addTableRow}/>
                </div>
            </div>
        </div>
    }
}

export default PortfolioSearchBar;
