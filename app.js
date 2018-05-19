const express = require('express');
const scraper = require('./yahoo-finance-scraper');

const app = express();

//get stock info
app.get('/api/:ticker', function(req, res){
  const ticker = req.params.ticker.toUpperCase();
  scraper.getStockInfo(ticker, function(stockInfo){
    res.end(JSON.stringify(stockInfo));
  });
});

//listen to port
app.listen(1337);
console.log('now listening to port 1337');