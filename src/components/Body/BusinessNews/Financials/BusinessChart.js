import React from 'react';
import Axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  ResponsiveContainer } from 'recharts';
import Pulse from '../../../Loader/Pulse';

const REQUEST_BASE_URL = process.env.REACT_APP_REQUEST_BASE_URL;


class BusinessChart extends React.PureComponent {

  constructor(props)
  {
    super(props);
    this.state = {
      data : {},
      chartcolors : ['#00a0e3','#e51a4b'],
      loading : true
    }
  }

  componentDidMount()
  {
    this.axiosRequest();
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.stockcode !== this.props.stockcode)
    {
      this.setState({
        data : {},
        loading : true
      });
      this.axiosRequest();
    }
  }

  formatValue(value)
  {
    value = value.split('%');
    return parseFloat(value[0].replace(',',''));
  }

  formatField(field)
  {
    field = field?.replace(/_/g, " ")?.replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, "-")
    let s = field.split('-'), l = s.length;
    if (l >= 2) {
        let k = s[l - 1]
        field = field.replace(k, k?.toString().substr(-2))
    }

    return field;
  }

  axiosRequest(){

    // console.log(this.props.field)
    Axios({
        method: 'GET',
        url: `${REQUEST_BASE_URL}/createcharts/${this.props.field}/${this.props.type}/${this.props.stockcode}`,
        responseType: 'json',
        onDownloadProgress: (pEvnt) => {
            this.setState({loading: Math.round((pEvnt.loaded * 100) / pEvnt.total)})
        },
    })
    .then(
        (response) => {

            // console.log(response.data);
            let res = response.data;
            let data = [];
            let xvalues = [];

            let fields = res.fields;
            let values = res.values;


            fields.forEach(f => {
                let obj = {};
                obj[f.title] = this.formatField(f.value);
                data.push(obj);
            });
            // console.log(data);

            values.forEach(val=>{
              val.forEach((v,indx)=>{
                if(!xvalues.includes(v.title))
                {
                  xvalues.push(v.title);
                }
                data[indx][String(v.title)] = this.formatValue(v.value);
              });
            });

            // console.log(data,xvalues);


            this.setState({
                data: data,
                xvalues : xvalues,
                loading : false,
            })  
        }
    )
    .catch(
        (error) => {
            this.setState({
                loading : null
            })
            console.log("AxiosRequest_error = ",error)
        }
    );
  }

  render() {

    if(!this.state.loading)
    {

      const data = this.state.data;
      const xvalues = this.state.xvalues;
      const chartcolors = this.state.chartcolors;

      return (
        <>
           {xvalues.length > 0 && 
            
              <div className="bn__stock__financial__chart">
                <LineChart width={290} height={180} data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="date" tick={{fontSize : '10px'}}/>
                  <CartesianGrid strokeDasharray="2 2" />
                  <Tooltip labelStyle={{fontSize : '9px'}} contentStyle={{fontSize : '10px'}} />
                  <Legend verticalAlign="top" height={26} iconSize={8} iconType="circle" align="left"/>
                  {
                    xvalues.map((xv,i)=>{
                      
                      return (
                          <Line key={i} name={xv} type="monotone" dataKey={xv} stroke={chartcolors[i%2]} />
                      )
                    })
                  }
                </LineChart>
              </div>
            
           }

           

        </>
      )
    }
    else
    {

      // console.log(data);
      return (
        <>
           
           <div className="bn__stock__financial__chart">
              <Pulse />
           </div>
           
        </>
      )
    }
    
  }
}

export { BusinessChart };