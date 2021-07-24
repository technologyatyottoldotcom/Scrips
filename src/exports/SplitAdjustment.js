
function splitFactor(data,prices)
{

    let splitFactors = [];
    prices.forEach((p,i) => {
        if(i!== 0)
        {
            let DR = Math.round(Math.abs((prices[i]/prices[i-1]-1))*100,2);
            if(DR >= 40)
            {
                // console.log(prices[i],'R',i,' -----> ',Math.abs((prices[i]/prices[i-1]-1))*100);
                // console.log(parseFloat((prices[i]/prices[i-1]).toFixed(2)));

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

    // console.log(splitFactors.length);
    // console.log(prices.length);

    return ModifiedPrice(data,prices,splitFactors);
}

function ModifiedPrice(data,prices,splitFactors)
{

    let modifiedPrices = [];
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

    let prices = [];
    console.log(prices.length);
    // console.log(data.length);
    data.forEach((d)=>{
        if(d.open)
        {
            prices.push(d.open);
        }
    });

    // console.log(prices.length);

    return splitFactor(data,prices);
}

