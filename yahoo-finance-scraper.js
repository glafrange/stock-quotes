const cheerio = require('cheerio');
const needle = require('needle');

var url = 'https://finance.yahoo.com/quote/';

function getStockInfo(ticker, callback) {
  var stocks = {};
  needle.get(url + ticker, function(err, res){
    if(err) throw err;
    var $ = cheerio.load(res.body, {decodeEntities: false});
    stocks.lastPrice = $('[data-reactid="34"]').find('[data-reactid="35"]').first().html();
    stocks.yestPrice = $("table").find("[data-reactid='41']").text();
    let lastPrice = parseFloat(stocks.lastPrice.replace(",", "")).toFixed(2);
    let yestPrice = parseFloat(stocks.yestPrice.replace(",", "")).toFixed(2);
    stocks.change = (lastPrice - yestPrice).toFixed(2);
    stocks.changePct = (((yestPrice - lastPrice) / lastPrice) * 100).toFixed(2);
    stocks.marketCap = $("table").find('[data-reactid="82"]').html();
    stocks.vol = $("table").find('[data-reactid="69"]').html();
    stocks.avgVol = $("table").find('[data-reactid="74"]').html();
    stocks.marketTime = $('#quote-market-notice').find('[data-reactid="38"]').text().substr(7,11);
    stocks.currency = $('#quote-header-info').find('[data-reactid="5"]').find('[data-reactid="8"]').find('[data-reactid="9"]').text().substr(-3);
    callback(stocks);
  });
}

module.exports.getStockInfo = getStockInfo;