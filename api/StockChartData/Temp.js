const {conn} = require('../../server/connection');

conn.query(`SELECT TIMESTAMP AS DATE , OPEN AS OPEN , HIGH AS HIGH , LOW AS LOW , CLOSE AS CLOSE , TOTTRDQTY AS VOLUME FROM nse_bhav WHERE SYMBOL='RELIANCE'`,(err,result)=>{
    if(!err)
    {
        console.log(result.length);
    }
})