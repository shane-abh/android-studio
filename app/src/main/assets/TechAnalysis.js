function init(symbol){
    charts(symbol);
    tech_analysis(symbol);
}



function charts(symbol){
var dps = [];

var xhr = new XMLHttpRequest();
var url = 'https://www.alphavantage.co/query?function=SMA&symbol='+symbol+'&interval=weekly&time_period=100&series_type=open&apikey=OOEPKQDKWRUGS4HV';
  xhr.open('GET', url, true);
  xhr.onload = function() {
    var d = JSON.parse(this.response);
    // console.log(new Date(Object.keys(d['Technical Analysis: SMA'])[0]));

    for(let i=0;i<Object.keys(d['Technical Analysis: SMA']).length;i++){
      // console.log((Object.values(d['Technical Analysis: SMA'])[i]['SMA']));
      dps.push({x:new Date(Object.keys(d['Technical Analysis: SMA'])[i]),y:parseFloat(Object.values(d['Technical Analysis: SMA'])[i]['SMA'])});

    }





var chart = new CanvasJS.Chart("chartContainer3",
    {
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Simple Moving Average"
        },
        axisX: {
            valueFormatString: "DDDD YYYY MMMM",
            interval: 1,

        },
        axisY: {
            includeZero: false
        },
        data: [
        {
          type: "line",
          name: "Simple Moving Average",
          showInLegend: true,
          dataPoints: dps
        }]
    });
chart.render();
// console.log(dps);
 }
  xhr.send();

//.........................EMA chart.................................................

var dps2 = [];

var xhr2 = new XMLHttpRequest();
var url2 = 'https://www.alphavantage.co/query?function=EMA&symbol='+symbol+'&interval=weekly&time_period=10&series_type=open&apikey=OOEPKQDKWRUGS4HV';
  xhr2.open('GET', url2, true);
  xhr2.onload = function() {
    var d = JSON.parse(this.response);
    // console.log(new Date(Object.keys(d['Technical Analysis: EMA'])[0]));

    for(let i=0;i<Object.keys(d['Technical Analysis: EMA']).length;i++){
      // console.log((Object.values(d['Technical Analysis: EMA'])[i]['EMA']));
      dps2.push({x:new Date(Object.keys(d['Technical Analysis: EMA'])[i]),y:parseFloat(Object.values(d['Technical Analysis: EMA'])[i]['EMA'])});

    }





var chart = new CanvasJS.Chart("chartContainer4",
    {
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Exponential Moving Average (EMA)"
        },
        axisX: {
            valueFormatString: "YYYY MMMM",
            interval: 1,

        },
        axisY: {
            includeZero: false
        },
        data: [
        {
          type: "line",
          name: "Exponential Moving Average (EMA)",
          showInLegend: true,
          dataPoints: dps2
        }]
    });
chart.render();
// console.log(dps2);
 }
  xhr2.send();

//..................................RSI chart..............................................
var dps3 = [];

var xhr3 = new XMLHttpRequest();
var url3 = 'https://www.alphavantage.co/query?function=RSI&symbol='+symbol+'&interval=weekly&time_period=10&series_type=open&apikey=OOEPKQDKWRUGS4HV';
  xhr3.open('GET', url3, true);
  xhr3.onload = function() {
    var d = JSON.parse(this.response);
    // console.log(new Date(Object.keys(d['Technical Analysis: RSI'])[0]));

    for(let i=0;i<Object.keys(d['Technical Analysis: RSI']).length;i++){
      // console.log((Object.values(d['Technical Analysis: RSI'])[i]['RSI']));
      dps3.push({x:new Date(Object.keys(d['Technical Analysis: RSI'])[i]),y:parseFloat(Object.values(d['Technical Analysis: RSI'])[i]['RSI'])});

    }





var chart = new CanvasJS.Chart("chartContainer5",
    {
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Relative Strength Index (RSI)"
        },
        axisX: {
            valueFormatString: "DD YYYY MMMM",
            interval: 1,

        },
        axisY: {
            includeZero: false
        },
        data: [
        {
          type: "line",
          name: "Relative Strength Index (RSI)",
          showInLegend: true,
          dataPoints: dps3
        }]
    });
chart.render();
// console.log(dps3);
 }
  xhr3.send();

}


function tech_analysis(str){
    url = 'https://yfapi.net/ws/insights/v1/finance/insights?symbol='+str;

      var tech_analysis = new XMLHttpRequest();
      tech_analysis.open('GET', url, true);
      tech_analysis.setRequestHeader('accept', 'application/json');
      tech_analysis.setRequestHeader('x-api-key', 'SCLhLZhDdK17GDErlpRhbn71KQugt6a868Z5LPB0');
      tech_analysis.onload = function(){
        var d = JSON.parse(this.response);
        console.log(d.finance.result.instrumentInfo.technicalEvents.provider);

        var provider = d.finance.result.instrumentInfo.technicalEvents.provider;
        var shortTerm = d.finance.result.instrumentInfo.technicalEvents.shortTerm;
        var midTerm = d.finance.result.instrumentInfo.technicalEvents.midTerm;
        var longTerm = d.finance.result.instrumentInfo.technicalEvents.longTerm;
        var support = d.finance.result.instrumentInfo.keyTechnicals.support;
        var resistance = d.finance.result.instrumentInfo.keyTechnicals.resistance;
        var stopLoss = d.finance.result.instrumentInfo.keyTechnicals.stopLoss;


        document.getElementById('provider').innerHTML = provider;

        document.getElementById('shortTerm').innerHTML = capitalizeFirstLetter(shortTerm);
        document.getElementById('midTerm').innerHTML = capitalizeFirstLetter(midTerm);
        document.getElementById('longTerm').innerHTML = capitalizeFirstLetter(longTerm);

        document.getElementById('support').innerHTML = support;
        document.getElementById('resistance').innerHTML = resistance;
        document.getElementById('stopLoss').innerHTML = stopLoss;


      }
      tech_analysis.send();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

