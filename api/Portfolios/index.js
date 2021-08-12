const Portfolios = require('express').Router();
const getPortfolio = require('./controller/Portfolio');
const getSector = require('./controller/Sector');
const getCurrentPrice = require('./controller/FetchCurrentPrice');
const getCompare = require('./controller/Compare');


//Portfolio details
Portfolios.get('/portfolio', getPortfolio);


//Sector details
Portfolios.get('/sector', getSector);


//Latest price details
Portfolios.get('/stock_price/:type/:code', getCurrentPrice);


Portfolios.post('/compare/:index', async(req, res, next) => {
    var compareTo = req.params.index;
    getCompare(req, res, next, compareTo);
});

Portfolios.get('/compare', async(req, res, next) => {
    var compareTo = '';
    getCompare(req, res, next, compareTo);
});


exports.Portfolios = Portfolios;