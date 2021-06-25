
let prices = [];
let splitFactors = [];
let modifiedPrices = [];


function splitFactor(data,prices)
{
    prices.forEach((p,i) => {
        if(i!== 0)
        {
            let DR = Math.round(Math.abs((prices[i]/prices[i-1]-1))*100,2);
            console.log(DR);
            if(DR >= 40)
            {
                console.log(prices[i],'R',i,' -----> ',Math.abs((prices[i]/prices[i-1]-1))*100);
                console.log(parseFloat((prices[i]/prices[i-1]).toFixed(2)));

                splitFactors.push(parseFloat((prices[i]/prices[i-1]).toFixed(2)));
            }
            else
            {
                splitFactors.push(1);
            }
        }
        else
        {
            splitFactors.push(1);
        }
    });

    console.log(splitFactors.length);
    console.log(prices.length);

    return ModifiedPrice(data,prices,splitFactors);
}

function ModifiedPrice(data,prices,splitFactors)
{
    if(prices.length === splitFactors.length)
    {
        prices.reverse();
        splitFactors.reverse();
        let SF = 1;
        prices.forEach((p,i)=>{
            // console.log((p*(SF)).toFixed(2));
            modifiedPrices.push(parseFloat((p*(SF)).toFixed(2)));
            SF = SF*splitFactors[i];
        });
    }
    else
    {
        console.log('Something Wrong...');
    }

    modifiedPrices.reverse();

    data.forEach((d,i)=>{
        d['open'] = modifiedPrices[i];
        // console.log(d['open']);
    });

    // console.log(data);

    return data;
}

export function splitAdjustment(data)
{
    console.log('--SPLIT ADJUSTMENT--');
    console.log(data.length);
    data.forEach((d)=>{
        if(d.open)
        {
            prices.push(d.open);
        }
    });

    return splitFactor(data,prices);
}

