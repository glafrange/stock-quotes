const express = require('express');

const app = express();

// temp static data
const stocks = {
  FB: {
    name: 'facebook',
    symbol: 'FB',
    lastPrice: '800',
    change: '+0.09',
    percentChange: '+1.65%',
    currency: 'USD',
    marketTime: '12:31 PM EDT',
    volume: '3.86M',
    avgVol: '14.92M',
    marketCap: '19.74B'
  },
  AMZN: {
    name: 'amazon',
    symbol: 'AMZN',
    lastPrice: '1400',
    change: '+1.80',
    percentChange: '+0.50%',
    currency: 'USD',
    marketTime: '12:31 PM EDT',
    volume: '5.24M',
    avgVol: '19.84M',
    marketCap: '30.22B'
  },
  AAPL: {
    name: 'apple',
    symbol: 'AAPL',
    lastPrice: '1000',
    change: '-1.40',
    percentChange: '-0.40%',
    currency: 'USD',
    marketTime: '12:31 PM EDT',
    volume: '2.48M',
    avgVol: '7.42M',
    marketCap: '14.93B'
  }
}

//get info for a stock
app.get('/api/:ticker', function(req, res){
  const ticker = req.params.ticker.toUpperCase();
  if (Object.keys(stocks).includes(ticker)){
    res.end(JSON.stringify(stocks[ticker]));
  } else {
    res.end('ticker not found');
  }
});

//listen to port
app.listen(1337);
console.log('now listening to port 1337');