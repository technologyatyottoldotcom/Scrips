const { conn } = require('../../server/connection');

function getQuery(options)
{

    let exchange = options.exchange;
    let code = options.code;
    let time = options.time;
    let type = options.type;
    // console.log('Get Query Exchange : ',exchange);
    // console.log('Get Query Code : ',code);
    // console.log('Get Query type : ',type);

    return new Promise((resolve,reject)=>{
        let preWord;
        let tempTable;
        if(exchange === 'NSE')
        {
            preWord = 'nse_bhav_';
            tempTable = 'nse_bhav_temp';
            dateFieldName = 'TIMESTAMP';
        }
        else if(exchange === 'BSE')
        {
            preWord = 'bse_bhav_';
            tempTable = 'bse_bhav_temp';
            dateFieldName = 'TRADING_DATE';
        }

        conn.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME LIKE '${preWord}%' AND TABLE_NAME!= '${tempTable}' `,(err,result)=>{
            if(!err && result.length > 0)
            {
                let tableYears = [],query='';
                result.forEach(row => {
                    tableYears.push(parseInt(row.TABLE_NAME.split(preWord)[1]));
                });
                tableYears.sort();
                // console.log(tableYears);

                if(exchange === 'NSE')
                {

                    query+='SELECT t.* FROM (';
                    tableYears.forEach((year,index) => {

                        
                        query+=`SELECT TIMESTAMP AS DATE , OPEN AS OPEN , HIGH AS HIGH , LOW AS LOW , CLOSE AS CLOSE , TOTTRDQTY AS VOLUME FROM ${preWord}${year} WHERE SYMBOL='${code}'`;
                        
                        if(index !== tableYears.length - 1)
                        {
                            query+= ' UNION ';
                        }
                    });

                    query+=` ) t`;
                    
                }
                else if(exchange === 'BSE')
                {
                    query+='SELECT t.* FROM (';
                    tableYears.forEach((year,index) => {
                        query+=`SELECT TRADING_DATE AS DATE , OPEN AS OPEN , HIGH AS HIGH , LOW AS LOW , CLOSE AS CLOSE , NO_TRADES AS VOLUME FROM ${preWord}${year} WHERE SC_CODE='${code}'`;
                        
                        if(index !== tableYears.length - 1)
                        {
                            query+= ' UNION ';
                        }
                    });

                    query+=` ) t`;

                }
                else
                {
                    query = false;
                }
                
                resolve({
                    query : query
                });

            }
            else
            {
                reject({
                    error : err
                })
            }
        });
    })

}


module.exports = getQuery;