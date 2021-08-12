const {conn} = require('../../../server/connection');
const findIndex = require('./findIndex');
const findComparableIndex = require('./findComparableIndex');


async function sendValue(req, res, next, compareTo){

        const {allDates, index, diffDays} = await findIndex(conn);
        //findComparableIndex.findNIFTY_50Index(app, conn);

        if(compareTo=='' || compareTo==null || compareTo==undefined)    compareTo='NIFTY_50';

        //make sure await is used since only a promise is returned if await is not used
        const compareIndex = await findComparableIndex(compareTo, conn, allDates, diffDays);

        const {table1, table2, table3} = makeTable(allDates, diffDays, index, compareIndex);

        const indexObj = getIndexObject(index, compareIndex);

        res.send({indexObj, compareTo, table1, table2, table3});
        //res.render('compare', {allDates: allDates, index: index, compareIndex: compareIndex, diffDays: diffDays, compareTo: compareTo,
          //                      table1: table1, table2: table2, table3: table3});
}

function getIndexObject(index, compareIndex){
    var indexObj = [];
    for(let i=0; i<index.length; i++){
        const obj = new Object();
        obj.index = index[i];
        obj.compareIndex = compareIndex[i];
        indexObj.push(obj);
    }
    return indexObj;
}

//function to make table value
function makeTable(allDates, diffDays, index, compareIndex){
    //make table for short period
    const arr1 = [0, 1, 3, 6, 12, 'SI'];
    var table1 = [];
    for(let i=0; i<arr1.length; i++){
        const column = table1Column(allDates, diffDays, index, compareIndex, arr1[i]);
        table1.push(column);
    }
    //make table for annual period
    var table2 = [];
    for(let i=0; i<arr1.length; i++){
        const column = table2Column(allDates, diffDays, index, compareIndex, i);
        table2.push(column);
    }
    //make table for annul return, risk etc
    const table3 = table3Column(allDates, diffDays, index, compareIndex);

    return {table1, table2, table3};
}


function table3Column(allDates, diffDays, index, compareIndex){

    const indexChange = findChange(index);
    const compareIndexChange = findChange(compareIndex);

    var table3 = [];
    table3.push(findAnnualReturn(index, compareIndex));
    table3.push(findAnnualRisk(indexChange, compareIndexChange));
    table3.push(findSharpe(table3));
    table3.push(findBeta(compareIndexChange, indexChange));
    
    return table3;   
}


function findBeta(compareIndexChange, indexChange){
    const indexMean = indexChange.reduce((a, b) => a + b / indexChange.length);
    const compareIndexMean = compareIndexChange.reduce((a, b) => a + b / compareIndexChange.length);

    var slopeNumerator = 0, slopeDenominator = 0;
    for(let i=0; i< indexChange.length; i++){
        slopeNumerator += (compareIndexChange[i]-compareIndexMean)*(indexChange[i]-indexMean);
        slopeDenominator += Math.pow((compareIndexChange[i]-compareIndexMean), 2);
    }
    
    const obj = new Object();
    obj.portfolio = (isNaN(slopeNumerator/slopeDenominator))? '--' : parseFloat(slopeNumerator/slopeDenominator).toFixed(2);
    obj.compare = '';

    return obj; 
}


function findSharpe(data){
    const obj = new Object();
    obj.portfolio = (isNaN(data[0].portfolio/data[1].portfolio))? '--': parseFloat(data[0].portfolio/data[1].portfolio).toFixed(2);
    obj.compare = (isNaN(data[0].compare/data[1].compare))? '--': parseFloat(data[0].compare/data[1].compare).toFixed(2);

    return obj;
}

function findAnnualRisk(indexChange, compareIndexChange){
    
    const annualRisk1 = getStandardDeviation(indexChange)*Math.sqrt(365);
    const annualRisk2 = getStandardDeviation(compareIndexChange)*Math.sqrt(365);

    const obj = new Object();
    obj.portfolio = (isNaN(annualRisk1))? '--' : parseFloat(annualRisk1).toFixed(2);
    obj.compare = (isNaN(annualRisk2))? '--' : parseFloat(annualRisk2).toFixed(2);

    return obj;
}


function getStandardDeviation (array) {
    const mean = array.reduce((a, b) => a + b) / array.length;
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / array.length);
}

function findChange(array){
    var change = [];
    change[0] = 0;
    for(let i=1; i<array.length; i++)   change[i] = (array[i]/array[i-1] -1)*100;

    return change;
}


function findAnnualReturn(index, compareIndex){
    const annualReturn1 = Math.pow(index[index.length-1]/index[0], 365/(index.length))-1;
    const annualReturn2 = Math.pow(compareIndex[compareIndex.length-1]/index[0], 365/(compareIndex.length))-1;

    const obj = new Object();
    obj.portfolio = (isNaN(annualReturn1))? '--' : parseFloat(annualReturn1*100).toFixed(2);
    obj.compare = (isNaN(annualReturn2))? '--' : parseFloat(annualReturn2*100).toFixed(2);

    return obj;
}


function convertDate(temp){
    return temp.getFullYear()+"-"+("0"+(temp.getMonth()+1)).slice(-2)+"-"+("0"+(temp.getDate())).slice(-2);
}


function table2Column(allDates, diffDays, index, compareIndex, year){
    var start, end;

    if(year == 0){
        end = new Date();
        end = new Date(end.setDate(end.getDate()-1));
        end = convertDate(end);

        start = new Date();
        start = new Date(start.getFullYear(), 0, 0);
        start = convertDate(start);
    }else{
        start = new Date();
        start = new Date(start.getFullYear()-year, 0, 0);
        start = convertDate(start);

        end = new Date();
        end = new Date(end.getFullYear()-year+1, 0, 0);
        end = convertDate(end);
    }

    const obj = getObject(start, end, allDates, diffDays, index, compareIndex);
    return obj;
}


function table1Column(allDates, diffDays, index, compareIndex, month){
    var start, end;

    if(month == 0){
        end = new Date();
        end = new Date(end.setDate(end.getDate()-1));
        end = convertDate(end);

        start = new Date();
        start = new Date(start.getFullYear(), start.getMonth(), 0);
        start = convertDate(start);
    }else if(month == 'SI'){
        var start = allDates[0];
        
        end = new Date();
        end = new Date(end.setDate(end.getDate()-1));
        end = convertDate(end);
    }else{
        start = new Date();
        start = new Date(start.getFullYear(), start.getMonth()-month, 0);
        start = convertDate(start);

        end = new Date();
        end = new Date(end.getFullYear(), end.getMonth(), 0);
        end = convertDate(end);
    }

    const obj = getObject(start, end, allDates, diffDays, index, compareIndex);
    return obj;
}

function getObject(start, end, allDates, diffDays, index, compareIndex){

    let i=0; let j=0;
    for(i=0; i<diffDays; i++){
        if(allDates[i] == start) break;
    }
    for(j=0; j<diffDays; j++){
        if(allDates[j] == end) break;
    }


    const portfolio = index[j]/index[i]-1;
    const compare = compareIndex[j]/compareIndex[i]-1;

    const obj = new Object();
    obj.start = start;
    obj.end = end;
    obj.portfolio = (isNaN(portfolio))? '--' : parseFloat(portfolio*100).toFixed(2);
    obj.compare = (isNaN(compare))? '--' : parseFloat(compare*100).toFixed(2);

    return obj;

}


module.exports = sendValue;