var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 600,
  height: 300,
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
});

var candleSeries = chart.addCandlestickSeries();

var data = LOG;

candleSeries.setData(data);

let field = document.getElementById('lt');
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');
    let dateplug = 100;
    ws.onmessage = event => {
        let data = JSON.parse(event.data);
        if(data.k.x === true){
            console.log(data)
            let updateData = {time: `20${dateplug}-01-01`, open: data.k.o, high: data.k.h, low: data.k.l, close: data.k.c}
            LOG.push(updateData)
            candleSeries.update(updateData);
            dateplug++;
        } else {
        }
    }