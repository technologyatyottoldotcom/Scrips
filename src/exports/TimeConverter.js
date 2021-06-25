const moment = require('moment');

export function convertToUNIX(range)
{
    // console.log(range);
    let curr = moment();
    switch(range){
        case 'D' : 
            return curr.subtract(1,'months').clone().unix();
        case '1D' : 
            return curr.subtract(1,'months').clone().unix();
        case '5D' :
            return curr.subtract(3,'months').startOf('month').clone().unix();
        case '1M' :
            return curr.subtract(1,'year').startOf('year').clone().unix();
        case '3M' : 
            return curr.subtract(1,'year').startOf('year').clone().unix();
        case '6M' : 
            return curr.subtract(1,'year').startOf('year').clone().unix();
        case 'YTD' : 
            return curr.subtract(1,'year').startOf('year').clone().unix();
        case '1Y' : 
            return curr.subtract(3,'years').startOf('year').clone().unix();
        case '5Y' : 
            return curr.subtract(10,'years').startOf('year').clone().unix();
        case 'MAX' : 
            return curr.clone().unix();
        default : 
            return curr.subtract(1,'year').startOf('year').clone().unix();
    }   
}


export function dateToUNIX(date,range)
{
    if(date)
    {
        let curr = moment();
        // console.log('START ---> ',moment(date).add(1,'minute').clone().format('DD-MM-YYYY HH:mm:ss'));
        switch(range){
            case 'D' : 
                return moment(date).add(1,'minute').clone().unix();
            case '1D' : 
                return moment(date).add(1,'minute').clone().unix();
            case '5D' :
                return moment(date).add(5,'minute').clone().unix();
            case '1M' :
                return moment(date).add(30,'minute').clone().unix();
            case '3M' : 
                return moment(date).add(60,'minute').clone().unix();
            case '6M' : 
                return moment(date).add(120,'minute').clone().unix();
            case 'YTD' : 
                return curr.subtract(1,'year').startOf('year').clone().unix();
            case '1Y' : 
                return curr.subtract(3,'years').startOf('year').clone().unix();
            case '5Y' : 
                return curr.subtract(10,'years').startOf('year').clone().unix();
            case 'MAX' : 
                return curr.clone().unix();
            default : 
                return curr.subtract(1,'year').startOf('year').clone().unix();
        }  
    }
}

