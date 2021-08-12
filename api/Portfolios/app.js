
const express = require('express');
const {conn} = require('../../server/connection');
var path = require('path');
var bodyParser = require('body-parser');


//var displayData = require('./controller/displayData');
var Portfolio = require('./controller/Portfolio');
var Sector = require('./controller/Sector');
//var displayValuation = require('./controller/displayValuation');
var Compare = require('./controller/Compare');
//var Rebalance = require('./controller/Rebalance');
//var BackTest = require('./controller/BackTest');
var FetchCurrentPrice = require('./controller/FetchCurrentPrice');


//initializing app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({extended: false});


//run app (make sure to run it after database connection is made)
//everything inside this will fire upon the emition on ready
app.on('ready', async () => {

    //ok(app, conn);
    FetchCurrentPrice(app, conn)
    //displayData(app, conn);
    Portfolio(app, conn);
    Sector(app, conn);
    //displayValuation(app, conn);

    Compare(app, conn, urlencodedParser);
    //Rebalance(app, conn);
    //BackTest(app, conn, urlencodedParser);

    app.listen(4000, (err)=>{
        if(err) throw(err);
        console.log('Listening in port 4000....');
    })
})


//database connection to yottol database from localhost

conn.connect((err) => {
    if(err) throw(err);

    console.log('Database connected...');
    //emit ready to start listening
    app.emit('ready');
});



