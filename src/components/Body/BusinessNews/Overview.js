import React from 'react';
import Website from '../../../assets/icons/website.svg';
import '../../../scss/Overview.scss';
import Axios from 'axios';
import Pulse from '../../Loader/Pulse';

const REQUEST_BASE_URL = process.env.REACT_APP_REQUEST_BASE_URL;

function NoAnyDataFound({ text }) {
    return <div style={{ color: '#ccc', textAlign: 'center' }}>{text ? text : '-- No any data found --'}</div>
}

class AnnualReports extends React.PureComponent {
    render() {
        return (
            <>
                <p>Annual Reports</p>
                <div>
                    {!this.props.data.length && <NoAnyDataFound />}
                    {
                        this.props.data.map((v, i) =>
                            v.link ? <button onClick={_ => window.open(v.link, "_blank")} key={v.year}>{v.year}</button> : <span key={v.year}></span>
                        )
                    }
                </div>
            </>
        )
    }
}

class Snapshot extends React.PureComponent {
    render() {

        // console.log(this.props.snapdata);

        return (
            <>
                <div className="bn__stock__navigation">
                    {
                        this.props.data.screener_web_link && <>
                            <img src={Website} alt="w" />
                            <a target="_blank" href={this.props.data.screener_web_link}>
                                <p>Website</p>
                            </a>
                        </>
                    }

                    {
                        this.props.data.screener_nse_link && <>
                            <a target="_blank" href={this.props.data.screener_nse_link}>
                                <p>NSE</p>
                            </a>
                        </>
                    }
                    {
                        this.props.data.screener_bse_link && <>
                            <a target="_blank" href={this.props.data.screener_bse_link}>
                                <p>BSE</p>
                            </a>
                        </>
                    }

                </div>
                <div className="bn__stock__snapbox">
                    <p>Snapshot</p>
                    <div className="bn__stock__data">

                        <div className='snap__box'>
                            <div className="snap__data">
                                <div>Market Cap</div>
                                <div>{this.props.snapdata.MarketCap}</div>
                            </div>
                            <div className="snap__data">
                                <div>Price to Earnings</div>
                                <div>{this.props.snapdata.PriceToEarnings}</div>
                            </div>
                            <div className="snap__data">
                                <div>Price to Book</div>
                                <div>{this.props.snapdata.PriceToBook}</div>
                            </div>
                            <div className="snap__data">
                                <div>Dividend Yield</div>
                                <div>{this.props.snapdata.DividendYield}</div>
                            </div>
                            <div className="snap__data">
                                <div>Face Value</div>
                                <div>Rs. {this.props.snapdata.FaceValue}</div>
                            </div>
                            <div className="snap__data">
                                <div>EPS</div>
                                <div>Rs. {this.props.snapdata.EPS}</div>
                            </div>
                            <div className="snap__data">
                                <div>Debt to Equity</div>
                                <div>{this.props.snapdata.DebtToEquity}</div>
                            </div>
                            <div className="snap__data">
                                <div>Promoter Holding</div>
                                <div>{this.props.snapdata.PromoterHolding}</div>
                            </div>


                        </div>
                        <div className='snap__box'>
                            <div className="snap__data">
                                <div>ROE (TTM)</div>
                                <div>{this.props.snapdata.ROE_TTM}</div>
                            </div>
                            <div className="snap__data">
                                <div>ROE (3 Yr)</div>
                                <div>{this.props.snapdata.ROE_3YR}</div>
                            </div>
                            <div className="snap__data">
                                <div>ROA (TTM)</div>
                                <div>{this.props.snapdata.ROA_TTM}</div>
                            </div>
                            <div className="snap__data">
                                <div>ROA (3Yr)</div>
                                <div>{this.props.snapdata.ROA_3YR}</div>
                            </div>
                            <div className="snap__data">
                                <div>ROCE (TTM)</div>
                                <div>{this.props.snapdata.ROCE_TTM}</div>
                            </div>
                            <div className="snap__data">
                                <div>ROCE (3 Yr)</div>
                                <div>{this.props.snapdata.ROCE_3YR}</div>
                            </div>
                            <div className="snap__data">
                                <div>Current Ratio</div>
                                <div>{this.props.snapdata.CurrentRatio}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class About extends React.PureComponent {
    render() {
        return (
            <>
                <p>About</p>
                <div>
                    {!this.props.data && <NoAnyDataFound />}
                    {this.props.data}
                </div>
            </>
        )
    }
}

class ExecutiveLeadership extends React.PureComponent {
    render() {
        return (
            <div className="GlobalScrollBar" style={{ maxHeight: 180 }}>
                <p>Executive Leadership</p>
                {!this.props.data.length ? <NoAnyDataFound />
                    :
                    this.props.data.map((v, i) =>
                        <div key={i + Math.random() + 50}>
                            <span style={{ textTransform: 'capitalize' }}>{v.name}</span>
                            <span>{v.type}</span>
                        </div>
                    )
                }
            </div>
        )
    }
}

class Address extends React.PureComponent {
    render() {
        return (
            <>
                <div className="GlobalScrollBar" style={{ maxHeight: 180 }}>
                    <p>Address</p>
                    <div style={{ fontSize: "12px" }}>
                        {!this.props.data ? <NoAnyDataFound /> :
                            this.props.data.split(/, |  /gi).map((v, i) => (
                                <span key={i + v}>
                                    {v}, <br />
                                </span>
                            ))
                        }
                     <div style={{fontWeight : 800}}>
                        {this.props.phoneNumber}
                    </div>
                    </div>
                </div>
            </>
        )
    }
}


class Overview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            stockDetails : this.props.stockDetails,
            loading : true,
            error: null,
            data: null,
        }
        this.DataRequest = this.DataRequest.bind(this);
    }

    componentDidMount() {
        this.DataRequest(this.state.stockDetails.stockSymbol)
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.stockDetails.stockSymbol !== this.props.stockDetails.stockSymbol)
        {
            console.log(this.props.snapdata);
            this.setState({
                stockDetails : this.props.stockDetails,
            },()=>{
                this.DataRequest(this.state.stockDetails.stockSymbol);
            })
        }
    }

    DataRequest(stockSymbol) {
        console.log(stockSymbol);
        Axios.get(`${REQUEST_BASE_URL}/detailed_view/overview/${stockSymbol}`)
        .then(({ data }) => {
            if (data.code === 900 || data.msg === 'success' && data.data) {
                // console.log('data = ', data)
                this.setState({ loading: false, error: null, data: data.data })
            } else this.setState({ loading: false, error: data.msg })
        }).catch(e => {
            this.setState({ loading: false, error: e.message})
        })
    }


    render() {

        // console.log(this.props.snapdata);
        const Filter = {
            AnnualReports: [],
            ExecutiveLeadership: []
        }
        if (this.state.data && 'object' === typeof this.state.data) {
            for (let k in this.state.data) {
                let repl = k.replaceAll(/\d+/g, '')
                // AnnualReports
                if ('screener_ar_year' === repl ) {
                    let link = this.state.data['screener_ar_link' + k.replace(/^\D+/g, '')]
                    if (link) {
                        Filter.AnnualReports.push({
                            year: this.state.data[k],
                            link: link
                        })
                    }
                }
                // ExecutiveLeadership
                if ('reuters_officer_name' === repl ) {
                    let name = this.state.data[k]
                    if (name) {
                        Filter.ExecutiveLeadership.push({
                            name: name,
                            type: this.state.data['reuters_officer_designation' + k.replace(/^\D+/g, '')]
                        })
                    }
                }
            }
        }

        return (
            this.state.loading ?
                
                <div className="bn__stock__overview__loader">
                    <Pulse />
                </div>
                : this.state.error ?
                    <div style={{ textAlign: 'center' }}>
                        {this.state.error}
                    </div>
                    : this.state.data &&
                    <>
                        <div className="bn__stock__overview">

                            <div className='bn__stock__price'>
                                <Snapshot data={this.state.data} snapdata={this.props.snapdata}/>
                            </div>

                            <div className="bn__stock__details" >
                                <div className="bn__stock__report">
                                    <AnnualReports data={Filter.AnnualReports} />
                                </div>
                                <div className="bn__stock__info">
                                    <div className="bn__stock__about">
                                        <About data={this.state.data.reuters_about} />
                                    </div>
                                    <div className="bn__stock__address">
                                        <Address data={this.state.data.reuters_contact_info} phoneNumber={this.state.data.reuters_phone_number}/>
                                        <ExecutiveLeadership data={Filter.ExecutiveLeadership} />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </>
        )
    }
}

export { Overview }