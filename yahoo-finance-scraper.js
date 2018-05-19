const cheerio = require('cheerio');
const needle = require('needle');

var url = 'https://finance.yahoo.com/quote/';

function getStockInfo(ticker, callback) {
  var stocks = {};
  needle.get(url + ticker, function(err, res){
    if(err) throw err;
    var $ = cheerio.load(res.body, {decodeEntities: false});
    stocks.lastPrice = $('[data-reactid="34"]').find('[data-reactid="35"]').first().html();
    stocks.marketCap = $("table").find('[data-reactid="82"]').html();
    stocks.volume = $("table").find('[data-reactid="69"]').html();
    stocks.avgVol = $("table").find('[data-reactid="74"]').html();
    callback(stocks);
  });
}

module.exports.getStockInfo = getStockInfo;