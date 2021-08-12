export function ReCalculateWeight(data, order){

    const findsum = (array)=> array.reduce((a,b) => a+b);

    const orderSum = findsum(order);

    var newWeight = []; var tradeVal = []; var tradeVolume =0;
    if(orderSum != 0){
        var currentValSum = 0;

        order.forEach((elem, i) => {
            tradeVal.push(elem * data[i].CurrentPrice);
            currentValSum += parseFloat(data[i].CurrentValue);
        })

        tradeVolume = findsum(tradeVal);

        for(let i=0; i<data.length; i++)    newWeight.push(parseFloat((parseFloat(data[i].CurrentValue)+tradeVal[i])/(currentValSum+tradeVolume)*100).toFixed(2));

    }else   for(let i=0; i<order.length; i++)   newWeight.push(0) && tradeVal.push(0);

    return {newWeight, tradeVolume};
}