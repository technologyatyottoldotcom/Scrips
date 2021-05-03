import React from 'react';

class ChartClock extends React.PureComponent
{

    constructor(props)
    {
        super(props);

        let currentTime = new Date();
        let currentOffset = currentTime.getTimezoneOffset();
        let ISTOffset = 330; 
        let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
        let hoursIST = ISTTime.getHours();
        if(hoursIST < 10){
            hoursIST = '0'+hoursIST;
        }
        let minutesIST = ISTTime.getMinutes();
        if(minutesIST < 10){
            minutesIST = '0'+minutesIST;
        }
        let secondsIST = ISTTime.getSeconds();
        if(secondsIST < 10){
            secondsIST = '0'+secondsIST;
        }

        this.state = {
            hh : hoursIST,
            mm : minutesIST,
            ss : secondsIST
        }
    }

    componentDidMount()
    {
        this.intervalID = setInterval(()=>{
            let currentTime = new Date();
            let currentOffset = currentTime.getTimezoneOffset();
            let ISTOffset = 330; 
            let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
            let hoursIST = ISTTime.getHours();
            if(hoursIST < 10){
                hoursIST = '0'+hoursIST;
            }
            let minutesIST = ISTTime.getMinutes();
            if(minutesIST < 10){
                minutesIST = '0'+minutesIST;
            }
            let secondsIST = ISTTime.getSeconds();
            if(secondsIST < 10){
                secondsIST = '0'+secondsIST;
            }

            this.setState({
                hh : hoursIST,
                mm : minutesIST,
                ss : secondsIST
            });

        },1000);
    }

    componentWillUnmount()
    {
        clearInterval(this.intervalID);
    }

    render()
    {
        return <span className="clock">{this.state.hh + ':' + this.state.mm + ':' + this.state.ss}</span>
    }
}

export default ChartClock;
