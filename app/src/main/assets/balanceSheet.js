
var str = "";

function init(symbol){
    console.log(symbol);
    str = symbol;
    Balance_sheet(symbol);
}



//window.onload = function () {

  function datesplitter(date){
    const split = date.split("-");
    return parseInt(split[0]);
  }

function Balance_sheet(symbol){
    console.log('Symbol inside fn: '+ symbol);

  var balance_chart = new XMLHttpRequest();
  // var name = document.getElementById('search').value;
  var url = 'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol='+symbol+'&apikey=OOEPKQDKWRUGS4HV';
  balance_chart.open('GET', url, true);


  balance_chart.onload = function() {
    // Begin accessing JSON data here
    var d = JSON.parse(this.response);
    // console.log(d.annualReports[1].fiscalDateEnding);

    //totalAsset for graphs
    let totalAsset0 = parseFloat(d.annualReports[0].totalAssets);
    let totalAsset1 = parseFloat(d.annualReports[1].totalAssets);
    let totalAsset2 = parseFloat(d.annualReports[2].totalAssets);
    let totalAsset3 = parseFloat(d.annualReports[3].totalAssets);
    let totalAsset4 = parseFloat(d.annualReports[4].totalAssets);

    //Total Liabilitiess for graphs
    let totalLiabilities0 = parseFloat(d.annualReports[0].totalLiabilities);
    let totalLiabilities1 = parseFloat(d.annualReports[1].totalLiabilities);
    let totalLiabilities2 = parseFloat(d.annualReports[2].totalLiabilities);
    let totalLiabilities3 = parseFloat(d.annualReports[3].totalLiabilities);
    let totalLiabilities4 = parseFloat(d.annualReports[4].totalLiabilities);



  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: d.symbol
    },
    axisY: {
      title: "Total Assets",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      valueFormatString: " "

    },
    axisY2: {
      title: "Total Liabilities",
      titleFontColor: "#C0504E",
      lineColor: "#C0504E",
      labelFontColor: "#C0504E",
      tickColor: "#C0504E",
      valueFormatString: " "
    },
    legend: {
      cursor:"pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      type: "column",
      color:"green",
      name: "Total Asset",
      legendText: "Total Asset",
      showInLegend: true,
      valueFormatString: "#,###,,.##M",
      dataPoints:[
        { x: new Date(datesplitter(d.annualReports[4].fiscalDateEnding),11,31), y: totalAsset4},
        { x: new Date(datesplitter(d.annualReports[3].fiscalDateEnding),11,31), y: totalAsset3 },
        { x: new Date(datesplitter(d.annualReports[2].fiscalDateEnding),11,31), y: totalAsset2 },
        { x: new Date(datesplitter(d.annualReports[1].fiscalDateEnding),11,31), y: totalAsset1 },
        { x: new Date(datesplitter(d.annualReports[0].fiscalDateEnding),11,31), y: totalAsset0 }
      ]
    },
    {
      type: "column",
      name: "Total Liabilities",
      color:"red",
      legendText: "Total Liabilities",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints:[
        { x: new Date(datesplitter(d.annualReports[4].fiscalDateEnding),11,31), y: totalLiabilities4},
        { x: new Date(datesplitter(d.annualReports[3].fiscalDateEnding),11,31), y: totalLiabilities3 },
        { x: new Date(datesplitter(d.annualReports[2].fiscalDateEnding),11,31), y: totalLiabilities2 },
        { x: new Date(datesplitter(d.annualReports[1].fiscalDateEnding),11,31), y: totalLiabilities1 },
        { x: new Date(datesplitter(d.annualReports[0].fiscalDateEnding),11,31), y: totalLiabilities0 }
      ]
    }]
  });
  chart.render();

function toggleDataSeries(e) {
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}

    var date1 = d.annualReports[0].fiscalDateEnding;
    var date2 = d.annualReports[1].fiscalDateEnding;
    var date3 = d.annualReports[2].fiscalDateEnding;
    var date4 = d.annualReports[3].fiscalDateEnding;
    var date5 = d.annualReports[4].fiscalDateEnding;

    document.getElementById('fiscalDateEnding0').innerHTML = date1;
    document.getElementById('fiscalDateEnding1').innerHTML = date2;
    document.getElementById('fiscalDateEnding2').innerHTML = date3;
    document.getElementById('fiscalDateEnding3').innerHTML = date4;
    document.getElementById('fiscalDateEnding4').innerHTML = date5;


     var totalAssets0 = commaseparator(d.annualReports[0].totalAssets);
    var totalAssets1 = commaseparator(d.annualReports[1].totalAssets);
    var totalAssets2 = commaseparator(d.annualReports[2].totalAssets);
    var totalAssets3 = commaseparator(d.annualReports[3].totalAssets);
    var totalAssets4 = commaseparator(d.annualReports[4].totalAssets);

    document.getElementById('totalAssets0').innerHTML = totalAssets0;
    document.getElementById('totalAssets1').innerHTML = totalAssets1;
    document.getElementById('totalAssets2').innerHTML = totalAssets2;
    document.getElementById('totalAssets3').innerHTML = totalAssets3;
    document.getElementById('totalAssets4').innerHTML = totalAssets4;

    var totalCurrentAssets0 = commaseparator(d.annualReports[0].totalCurrentAssets);
    var totalCurrentAssets1 = commaseparator(d.annualReports[1].totalCurrentAssets);
    var totalCurrentAssets2 = commaseparator(d.annualReports[2].totalCurrentAssets);
    var totalCurrentAssets3 = commaseparator(d.annualReports[3].totalCurrentAssets);
    var totalCurrentAssets4 = commaseparator(d.annualReports[4].totalCurrentAssets);

    document.getElementById('totalCurrentAssets0').innerHTML = totalCurrentAssets0;
    document.getElementById('totalCurrentAssets1').innerHTML = totalCurrentAssets1;
    document.getElementById('totalCurrentAssets2').innerHTML = totalCurrentAssets2;
    document.getElementById('totalCurrentAssets3').innerHTML = totalCurrentAssets3;
    document.getElementById('totalCurrentAssets4').innerHTML = totalCurrentAssets4;


    var cashAndCashEquivalentsAtCarryingValue0 = commaseparator(d.annualReports[0].cashAndCashEquivalentsAtCarryingValue);
    var cashAndCashEquivalentsAtCarryingValue1 = commaseparator(d.annualReports[1].cashAndCashEquivalentsAtCarryingValue);
    var cashAndCashEquivalentsAtCarryingValue2 = commaseparator(d.annualReports[2].cashAndCashEquivalentsAtCarryingValue);
    var cashAndCashEquivalentsAtCarryingValue3 = commaseparator(d.annualReports[3].cashAndCashEquivalentsAtCarryingValue);
    var cashAndCashEquivalentsAtCarryingValue4 = commaseparator(d.annualReports[4].cashAndCashEquivalentsAtCarryingValue);

    document.getElementById('cashAndCashEquivalentsAtCarryingValue0').innerHTML = cashAndCashEquivalentsAtCarryingValue0;
    document.getElementById('cashAndCashEquivalentsAtCarryingValue1').innerHTML = cashAndCashEquivalentsAtCarryingValue1;
    document.getElementById('cashAndCashEquivalentsAtCarryingValue2').innerHTML = cashAndCashEquivalentsAtCarryingValue2;
    document.getElementById('cashAndCashEquivalentsAtCarryingValue3').innerHTML = cashAndCashEquivalentsAtCarryingValue3;
    document.getElementById('cashAndCashEquivalentsAtCarryingValue4').innerHTML = cashAndCashEquivalentsAtCarryingValue4;

    var cashAndShortTermInvestments0 = commaseparator(parseFloat(d.annualReports[0].cashAndShortTermInvestments));
    var cashAndShortTermInvestments1 = commaseparator(parseFloat(d.annualReports[1].cashAndShortTermInvestments));
    var cashAndShortTermInvestments2 = commaseparator(parseFloat(d.annualReports[2].cashAndShortTermInvestments));
    var cashAndShortTermInvestments3 = commaseparator(parseFloat(d.annualReports[3].cashAndShortTermInvestments));
    var cashAndShortTermInvestments4 = commaseparator(parseFloat(d.annualReports[4].cashAndShortTermInvestments));


    console.log(d.annualReports[0].cashAndShortTermInvestments);

    document.getElementById('cashAndShortTermInvestments0').innerHTML = commaseparator(parseFloat(d.annualReports[0].cashAndShortTermInvestments));
    document.getElementById('cashAndShortTermInvestments1').innerHTML = cashAndShortTermInvestments1;
    document.getElementById('cashAndShortTermInvestments2').innerHTML = cashAndShortTermInvestments2;
    document.getElementById('cashAndShortTermInvestments3').innerHTML = cashAndShortTermInvestments3;
    document.getElementById('cashAndShortTermInvestments4').innerHTML = cashAndShortTermInvestments4;


    var inventory0 = commaseparator(d.annualReports[0].inventory);
    var inventory1 = commaseparator(d.annualReports[1].inventory);
    var inventory2 = commaseparator(d.annualReports[2].inventory);
    var inventory3 = commaseparator(d.annualReports[3].inventory);
    var inventory4 = commaseparator(d.annualReports[4].inventory);

    document.getElementById('inventory0').innerHTML = inventory0;
    document.getElementById('inventory1').innerHTML = inventory1;
    document.getElementById('inventory2').innerHTML = inventory2;
    document.getElementById('inventory3').innerHTML = inventory3;
    document.getElementById('inventory4').innerHTML = inventory4;

    var currentNetReceivables0 = commaseparator(d.annualReports[0].currentNetReceivables);
    var currentNetReceivables1 = commaseparator(d.annualReports[1].currentNetReceivables);
    var currentNetReceivables2 = commaseparator(d.annualReports[2].currentNetReceivables);
    var currentNetReceivables3 = commaseparator(d.annualReports[3].currentNetReceivables);
    var currentNetReceivables4 = commaseparator(d.annualReports[4].currentNetReceivables);

    document.getElementById('currentNetReceivables0').innerHTML = currentNetReceivables0;
    document.getElementById('currentNetReceivables1').innerHTML = currentNetReceivables1;
    document.getElementById('currentNetReceivables2').innerHTML = currentNetReceivables2;
    document.getElementById('currentNetReceivables3').innerHTML = currentNetReceivables3;
    document.getElementById('currentNetReceivables4').innerHTML = currentNetReceivables4;


    var totalNonCurrentAssets0 = commaseparator(d.annualReports[0].totalNonCurrentAssets);
    var totalNonCurrentAssets1 = commaseparator(d.annualReports[1].totalNonCurrentAssets);
    var totalNonCurrentAssets2 = commaseparator(d.annualReports[2].totalNonCurrentAssets);
    var totalNonCurrentAssets3 = commaseparator(d.annualReports[3].totalNonCurrentAssets);
    var totalNonCurrentAssets4 = commaseparator(d.annualReports[4].totalNonCurrentAssets);

    document.getElementById('totalNonCurrentAssets0').innerHTML = totalNonCurrentAssets0;
    document.getElementById('totalNonCurrentAssets1').innerHTML = totalNonCurrentAssets1;
    document.getElementById('totalNonCurrentAssets2').innerHTML = totalNonCurrentAssets2;
    document.getElementById('totalNonCurrentAssets3').innerHTML = totalNonCurrentAssets3;
    document.getElementById('totalNonCurrentAssets4').innerHTML = totalNonCurrentAssets4;


    var propertyPlantEquipment0 = commaseparator(d.annualReports[0].propertyPlantEquipment);
    var propertyPlantEquipment1 = commaseparator(d.annualReports[1].propertyPlantEquipment);
    var propertyPlantEquipment2 = commaseparator(d.annualReports[2].propertyPlantEquipment);
    var propertyPlantEquipment3 = commaseparator(d.annualReports[3].propertyPlantEquipment);
    var propertyPlantEquipment4 = commaseparator(d.annualReports[4].propertyPlantEquipment);

    document.getElementById('propertyPlantEquipment0').innerHTML = propertyPlantEquipment0;
    document.getElementById('propertyPlantEquipment1').innerHTML = propertyPlantEquipment1;
    document.getElementById('propertyPlantEquipment2').innerHTML = propertyPlantEquipment2;
    document.getElementById('propertyPlantEquipment3').innerHTML = propertyPlantEquipment3;
    document.getElementById('propertyPlantEquipment4').innerHTML = propertyPlantEquipment4;

    var accumulatedDepreciationAmortizationPPE0 = commaseparator(parseFloat(d.annualReports[0].accumulatedDepreciationAmortizationPPE));
    var accumulatedDepreciationAmortizationPPE1 = commaseparator(parseFloat(d.annualReports[1].accumulatedDepreciationAmortizationPPE));
    var accumulatedDepreciationAmortizationPPE2 = commaseparator(parseFloat(d.annualReports[2].accumulatedDepreciationAmortizationPPE));
    var accumulatedDepreciationAmortizationPPE3 = commaseparator(parseFloat(d.annualReports[3].accumulatedDepreciationAmortizationPPE));
    var accumulatedDepreciationAmortizationPPE4 = commaseparator(parseFloat(d.annualReports[4].accumulatedDepreciationAmortizationPPE));

    document.getElementById('accumulatedDepreciationAmortizationPPE0').innerHTML = accumulatedDepreciationAmortizationPPE0;
    document.getElementById('accumulatedDepreciationAmortizationPPE1').innerHTML = accumulatedDepreciationAmortizationPPE1;
    document.getElementById('accumulatedDepreciationAmortizationPPE2').innerHTML = accumulatedDepreciationAmortizationPPE2;
    document.getElementById('accumulatedDepreciationAmortizationPPE3').innerHTML = accumulatedDepreciationAmortizationPPE3;
    document.getElementById('accumulatedDepreciationAmortizationPPE4').innerHTML = accumulatedDepreciationAmortizationPPE4;

    var intangibleAssets0 = commaseparator(parseFloat(d.annualReports[0].intangibleAssets));
    var intangibleAssets1 = commaseparator(parseFloat(d.annualReports[1].intangibleAssets));
    var intangibleAssets2 = commaseparator(parseFloat(d.annualReports[2].intangibleAssets));
    var intangibleAssets3 = commaseparator(parseFloat(d.annualReports[3].intangibleAssets));
    var intangibleAssets4 = commaseparator(parseFloat(d.annualReports[4].intangibleAssets));

    document.getElementById('intangibleAssets0').innerHTML = intangibleAssets0;
    document.getElementById('intangibleAssets1').innerHTML = intangibleAssets1;
    document.getElementById('intangibleAssets2').innerHTML = intangibleAssets2;
    document.getElementById('intangibleAssets3').innerHTML = intangibleAssets3;
    document.getElementById('intangibleAssets4').innerHTML = intangibleAssets4;

    var intangibleAssetsExcludingGoodwill0 = commaseparator(parseFloat(d.annualReports[0].intangibleAssetsExcludingGoodwill));
    var intangibleAssetsExcludingGoodwill1 = commaseparator(parseFloat(d.annualReports[1].intangibleAssetsExcludingGoodwill));
    var intangibleAssetsExcludingGoodwill2 = commaseparator(parseFloat(d.annualReports[2].intangibleAssetsExcludingGoodwill));
    var intangibleAssetsExcludingGoodwill3 = commaseparator(parseFloat(d.annualReports[3].intangibleAssetsExcludingGoodwill));
    var intangibleAssetsExcludingGoodwill4 = commaseparator(parseFloat(d.annualReports[4].intangibleAssetsExcludingGoodwill));

    document.getElementById('intangibleAssetsExcludingGoodwill0').innerHTML = intangibleAssetsExcludingGoodwill0;
    document.getElementById('intangibleAssetsExcludingGoodwill1').innerHTML = intangibleAssetsExcludingGoodwill1;
    document.getElementById('intangibleAssetsExcludingGoodwill2').innerHTML = intangibleAssetsExcludingGoodwill2;
    document.getElementById('intangibleAssetsExcludingGoodwill3').innerHTML = intangibleAssetsExcludingGoodwill3;
    document.getElementById('intangibleAssetsExcludingGoodwill4').innerHTML = intangibleAssetsExcludingGoodwill4;


    var goodwill0 = commaseparator(parseFloat(d.annualReports[0].goodwill));
    var goodwill1 = commaseparator(parseFloat(d.annualReports[1].goodwill));
    var goodwill2 = commaseparator(parseFloat(d.annualReports[2].goodwill));
    var goodwill3 = commaseparator(parseFloat(d.annualReports[3].goodwill));
    var goodwill4 = commaseparator(parseFloat(d.annualReports[4].goodwill));

    document.getElementById('goodwill0').innerHTML = goodwill0;
    document.getElementById('goodwill1').innerHTML = goodwill1;
    document.getElementById('goodwill2').innerHTML = goodwill2;
    document.getElementById('goodwill3').innerHTML = goodwill3;
    document.getElementById('goodwill4').innerHTML = goodwill4;


    var investments0 = commaseparator(parseFloat(d.annualReports[0].investments));
    var investments1 = commaseparator(parseFloat(d.annualReports[1].investments));
    var investments2 = commaseparator(parseFloat(d.annualReports[2].investments));
    var investments3 = commaseparator(parseFloat(d.annualReports[3].investments));
    var investments4 = commaseparator(parseFloat(d.annualReports[4].investments));

    document.getElementById('investments0').innerHTML = investments0;
    document.getElementById('investments1').innerHTML = investments1;
    document.getElementById('investments2').innerHTML = investments2;
    document.getElementById('investments3').innerHTML = investments3;
    document.getElementById('investments4').innerHTML = investments4;


    var longTermInvestments0 = commaseparator(parseFloat(d.annualReports[0].longTermInvestments));
    var longTermInvestments1 = commaseparator(parseFloat(d.annualReports[1].longTermInvestments));
    var longTermInvestments2 = commaseparator(parseFloat(d.annualReports[2].longTermInvestments));
    var longTermInvestments3 = commaseparator(parseFloat(d.annualReports[3].longTermInvestments));
    var longTermInvestments4 = commaseparator(parseFloat(d.annualReports[4].longTermInvestments));

    document.getElementById('longTermInvestments0').innerHTML = longTermInvestments0;
    document.getElementById('longTermInvestments1').innerHTML = longTermInvestments1;
    document.getElementById('longTermInvestments2').innerHTML = longTermInvestments2;
    document.getElementById('longTermInvestments3').innerHTML = longTermInvestments3;
    document.getElementById('longTermInvestments4').innerHTML = longTermInvestments4;

    var shortTermInvestments0 = commaseparator(parseFloat(d.annualReports[0].shortTermInvestments));
    var shortTermInvestments1 = commaseparator(parseFloat(d.annualReports[1].shortTermInvestments));
    var shortTermInvestments2 = commaseparator(parseFloat(d.annualReports[2].shortTermInvestments));
    var shortTermInvestments3 = commaseparator(parseFloat(d.annualReports[3].shortTermInvestments));
    var shortTermInvestments4 = commaseparator(parseFloat(d.annualReports[4].shortTermInvestments));

    document.getElementById('shortTermInvestments0').innerHTML = shortTermInvestments0;
    document.getElementById('shortTermInvestments1').innerHTML = shortTermInvestments1;
    document.getElementById('shortTermInvestments2').innerHTML = shortTermInvestments2;
    document.getElementById('shortTermInvestments3').innerHTML = shortTermInvestments3;
    document.getElementById('shortTermInvestments4').innerHTML = shortTermInvestments4;

    var otherCurrentAssets0 = commaseparator(parseFloat(d.annualReports[0].otherCurrentAssets));
    var otherCurrentAssets1 = commaseparator(parseFloat(d.annualReports[1].otherCurrentAssets));
    var otherCurrentAssets2 = commaseparator(parseFloat(d.annualReports[2].otherCurrentAssets));
    var otherCurrentAssets3 = commaseparator(parseFloat(d.annualReports[3].otherCurrentAssets));
    var otherCurrentAssets4 = commaseparator(parseFloat(d.annualReports[4].otherCurrentAssets));

    document.getElementById('otherCurrentAssets0').innerHTML = otherCurrentAssets0;
    document.getElementById('otherCurrentAssets1').innerHTML = otherCurrentAssets1;
    document.getElementById('otherCurrentAssets2').innerHTML = otherCurrentAssets2;
    document.getElementById('otherCurrentAssets3').innerHTML = otherCurrentAssets3;
    document.getElementById('otherCurrentAssets4').innerHTML = otherCurrentAssets4;

    var otherNonCurrrentAssets0 = commaseparator(parseFloat(d.annualReports[0].otherNonCurrrentAssets));
    var otherNonCurrrentAssets1 = commaseparator(parseFloat(d.annualReports[1].otherNonCurrrentAssets));
    var otherNonCurrrentAssets2 = commaseparator(parseFloat(d.annualReports[2].otherNonCurrrentAssets));
    var otherNonCurrrentAssets3 = commaseparator(parseFloat(d.annualReports[3].otherNonCurrrentAssets));
    var otherNonCurrrentAssets4 = commaseparator(parseFloat(d.annualReports[4].otherNonCurrrentAssets));

    document.getElementById('otherNonCurrrentAssets0').innerHTML = otherNonCurrrentAssets0;
    document.getElementById('otherNonCurrrentAssets1').innerHTML = otherNonCurrrentAssets1;
    document.getElementById('otherNonCurrrentAssets2').innerHTML = otherNonCurrrentAssets2;
    document.getElementById('otherNonCurrrentAssets3').innerHTML = otherNonCurrrentAssets3;
    document.getElementById('otherNonCurrrentAssets4').innerHTML = otherNonCurrrentAssets4;



    document.getElementById('totalLiabilities0').innerHTML = totalLiabilities0;
    document.getElementById('totalLiabilities1').innerHTML = totalLiabilities1;
    document.getElementById('totalLiabilities2').innerHTML = totalLiabilities2;
    document.getElementById('totalLiabilities3').innerHTML = totalLiabilities3;
    document.getElementById('totalLiabilities4').innerHTML = totalLiabilities4;


    var totalCurrentLiabilities0 = commaseparator(parseFloat(d.annualReports[0].totalCurrentLiabilities));
    var totalCurrentLiabilities1 = commaseparator(parseFloat(d.annualReports[1].totalCurrentLiabilities));
    var totalCurrentLiabilities2 = commaseparator(parseFloat(d.annualReports[2].totalCurrentLiabilities));
    var totalCurrentLiabilities3 = commaseparator(parseFloat(d.annualReports[3].totalCurrentLiabilities));
    var totalCurrentLiabilities4 = commaseparator(parseFloat(d.annualReports[4].totalCurrentLiabilities));

    document.getElementById('totalCurrentLiabilities0').innerHTML = totalCurrentLiabilities0;
    document.getElementById('totalCurrentLiabilities1').innerHTML = totalCurrentLiabilities1;
    document.getElementById('totalCurrentLiabilities2').innerHTML = totalCurrentLiabilities2;
    document.getElementById('totalCurrentLiabilities3').innerHTML = totalCurrentLiabilities3;
    document.getElementById('totalCurrentLiabilities4').innerHTML = totalCurrentLiabilities4;

    var currentAccountsPayable0 = commaseparator(parseFloat(d.annualReports[0].currentAccountsPayable));
    var currentAccountsPayable1 = commaseparator(parseFloat(d.annualReports[1].currentAccountsPayable));
    var currentAccountsPayable2 = commaseparator(parseFloat(d.annualReports[2].currentAccountsPayable));
    var currentAccountsPayable3 = commaseparator(parseFloat(d.annualReports[3].currentAccountsPayable));
    var currentAccountsPayable4 = commaseparator(parseFloat(d.annualReports[4].currentAccountsPayable));

    document.getElementById('currentAccountsPayable0').innerHTML = currentAccountsPayable0;
    document.getElementById('currentAccountsPayable1').innerHTML = currentAccountsPayable1;
    document.getElementById('currentAccountsPayable2').innerHTML = currentAccountsPayable2;
    document.getElementById('currentAccountsPayable3').innerHTML = currentAccountsPayable3;
    document.getElementById('currentAccountsPayable4').innerHTML = currentAccountsPayable4;


    var deferredRevenue0 = commaseparator(parseFloat(d.annualReports[0].deferredRevenue));
    var deferredRevenue1 = commaseparator(parseFloat(d.annualReports[1].deferredRevenue));
    var deferredRevenue2 = commaseparator(parseFloat(d.annualReports[2].deferredRevenue));
    var deferredRevenue3 = commaseparator(parseFloat(d.annualReports[3].deferredRevenue));
    var deferredRevenue4 = commaseparator(parseFloat(d.annualReports[4].deferredRevenue));

    document.getElementById('deferredRevenue0').innerHTML = deferredRevenue0;
    document.getElementById('deferredRevenue1').innerHTML = deferredRevenue1;
    document.getElementById('deferredRevenue2').innerHTML = deferredRevenue2;
    document.getElementById('deferredRevenue3').innerHTML = deferredRevenue3;
    document.getElementById('deferredRevenue4').innerHTML = deferredRevenue4;

    var currentDebt0 = commaseparator(parseFloat(d.annualReports[0].currentDebt));
    var currentDebt1 = commaseparator(parseFloat(d.annualReports[1].currentDebt));
    var currentDebt2 = commaseparator(parseFloat(d.annualReports[2].currentDebt));
    var currentDebt3 = commaseparator(parseFloat(d.annualReports[3].currentDebt));
    var currentDebt4 = commaseparator(parseFloat(d.annualReports[4].currentDebt));

    document.getElementById('currentDebt0').innerHTML = currentDebt0;
    document.getElementById('currentDebt1').innerHTML = currentDebt1;
    document.getElementById('currentDebt2').innerHTML = currentDebt2;
    document.getElementById('currentDebt3').innerHTML = currentDebt3;
    document.getElementById('currentDebt4').innerHTML = currentDebt4;


    var shortTermDebt0 = commaseparator(parseFloat(d.annualReports[0].shortTermDebt));
    var shortTermDebt1 = commaseparator(parseFloat(d.annualReports[1].shortTermDebt));
    var shortTermDebt2 = commaseparator(parseFloat(d.annualReports[2].shortTermDebt));
    var shortTermDebt3 = commaseparator(parseFloat(d.annualReports[3].shortTermDebt));
    var shortTermDebt4 = commaseparator(parseFloat(d.annualReports[4].shortTermDebt));

    document.getElementById('shortTermDebt0').innerHTML = shortTermDebt0;
    document.getElementById('shortTermDebt1').innerHTML = shortTermDebt1;
    document.getElementById('shortTermDebt2').innerHTML = shortTermDebt2;
    document.getElementById('shortTermDebt3').innerHTML = shortTermDebt3;
    document.getElementById('shortTermDebt4').innerHTML = shortTermDebt4;

    var totalNonCurrentLiabilities0 = commaseparator(parseFloat(d.annualReports[0].totalNonCurrentLiabilities));
    var totalNonCurrentLiabilities1 = commaseparator(parseFloat(d.annualReports[1].totalNonCurrentLiabilities));
    var totalNonCurrentLiabilities2 = commaseparator(parseFloat(d.annualReports[2].totalNonCurrentLiabilities));
    var totalNonCurrentLiabilities3 = commaseparator(parseFloat(d.annualReports[3].totalNonCurrentLiabilities));
    var totalNonCurrentLiabilities4 = commaseparator(parseFloat(d.annualReports[4].totalNonCurrentLiabilities));

    document.getElementById('totalNonCurrentLiabilities0').innerHTML = totalNonCurrentLiabilities0;
    document.getElementById('totalNonCurrentLiabilities1').innerHTML = totalNonCurrentLiabilities1;
    document.getElementById('totalNonCurrentLiabilities2').innerHTML = totalNonCurrentLiabilities2;
    document.getElementById('totalNonCurrentLiabilities3').innerHTML = totalNonCurrentLiabilities3;
    document.getElementById('totalNonCurrentLiabilities4').innerHTML = totalNonCurrentLiabilities4;


    var capitalLeaseObligations0 = commaseparator(parseFloat(d.annualReports[0].capitalLeaseObligations));
    var capitalLeaseObligations1 = commaseparator(parseFloat(d.annualReports[1].capitalLeaseObligations));
    var capitalLeaseObligations2 = commaseparator(parseFloat(d.annualReports[2].capitalLeaseObligations));
    var capitalLeaseObligations3 = commaseparator(parseFloat(d.annualReports[3].capitalLeaseObligations));
    var capitalLeaseObligations4 = commaseparator(parseFloat(d.annualReports[4].capitalLeaseObligations));

    document.getElementById('capitalLeaseObligations0').innerHTML = capitalLeaseObligations0;
    document.getElementById('capitalLeaseObligations1').innerHTML = capitalLeaseObligations1;
    document.getElementById('capitalLeaseObligations2').innerHTML = capitalLeaseObligations2;
    document.getElementById('capitalLeaseObligations3').innerHTML = capitalLeaseObligations3;
    document.getElementById('capitalLeaseObligations4').innerHTML = capitalLeaseObligations4;

    var longTermDebt0 = commaseparator(parseFloat(d.annualReports[0].longTermDebt));
    var longTermDebt1 = commaseparator(parseFloat(d.annualReports[1].longTermDebt));
    var longTermDebt2 = commaseparator(parseFloat(d.annualReports[2].longTermDebt));
    var longTermDebt3 = commaseparator(parseFloat(d.annualReports[3].longTermDebt));
    var longTermDebt4 = commaseparator(parseFloat(d.annualReports[4].longTermDebt));

    document.getElementById('longTermDebt0').innerHTML = longTermDebt0;
    document.getElementById('longTermDebt1').innerHTML = longTermDebt1;
    document.getElementById('longTermDebt2').innerHTML = longTermDebt2;
    document.getElementById('longTermDebt3').innerHTML = longTermDebt3;
    document.getElementById('longTermDebt4').innerHTML = longTermDebt4;


    var currentLongTermDebt0 = commaseparator(parseFloat(d.annualReports[0].currentLongTermDebt));
    var currentLongTermDebt1 = commaseparator(parseFloat(d.annualReports[1].currentLongTermDebt));
    var currentLongTermDebt2 = commaseparator(parseFloat(d.annualReports[2].currentLongTermDebt));
    var currentLongTermDebt3 = commaseparator(parseFloat(d.annualReports[3].currentLongTermDebt));
    var currentLongTermDebt4 = commaseparator(parseFloat(d.annualReports[4].currentLongTermDebt));

    document.getElementById('currentLongTermDebt0').innerHTML = currentLongTermDebt0;
    document.getElementById('currentLongTermDebt1').innerHTML = currentLongTermDebt1;
    document.getElementById('currentLongTermDebt2').innerHTML = currentLongTermDebt2;
    document.getElementById('currentLongTermDebt3').innerHTML = currentLongTermDebt3;
    document.getElementById('currentLongTermDebt4').innerHTML = currentLongTermDebt4;

    var longTermDebtNoncurrent0 = commaseparator(parseFloat(d.annualReports[0].longTermDebtNoncurrent));
    var longTermDebtNoncurrent1 = commaseparator(parseFloat(d.annualReports[1].longTermDebtNoncurrent));
    var longTermDebtNoncurrent2 = commaseparator(parseFloat(d.annualReports[2].longTermDebtNoncurrent));
    var longTermDebtNoncurrent3 = commaseparator(parseFloat(d.annualReports[3].longTermDebtNoncurrent));
    var longTermDebtNoncurrent4 = commaseparator(parseFloat(d.annualReports[4].longTermDebtNoncurrent));

    document.getElementById('longTermDebtNoncurrent0').innerHTML = longTermDebtNoncurrent0;
    document.getElementById('longTermDebtNoncurrent1').innerHTML = longTermDebtNoncurrent1;
    document.getElementById('longTermDebtNoncurrent2').innerHTML = longTermDebtNoncurrent2;
    document.getElementById('longTermDebtNoncurrent3').innerHTML = longTermDebtNoncurrent3;
    document.getElementById('longTermDebtNoncurrent4').innerHTML = longTermDebtNoncurrent4;


    var shortLongTermDebtTotal0 = commaseparator(parseFloat(d.annualReports[0].shortLongTermDebtTotal));
    var shortLongTermDebtTotal1 = commaseparator(parseFloat(d.annualReports[1].shortLongTermDebtTotal));
    var shortLongTermDebtTotal2 = commaseparator(parseFloat(d.annualReports[2].shortLongTermDebtTotal));
    var shortLongTermDebtTotal3 = commaseparator(parseFloat(d.annualReports[3].shortLongTermDebtTotal));
    var shortLongTermDebtTotal4 = commaseparator(parseFloat(d.annualReports[4].shortLongTermDebtTotal));

    document.getElementById('shortLongTermDebtTotal0').innerHTML = shortLongTermDebtTotal0;
    document.getElementById('shortLongTermDebtTotal1').innerHTML = shortLongTermDebtTotal1;
    document.getElementById('shortLongTermDebtTotal2').innerHTML = shortLongTermDebtTotal2;
    document.getElementById('shortLongTermDebtTotal3').innerHTML = shortLongTermDebtTotal3;
    document.getElementById('shortLongTermDebtTotal4').innerHTML = shortLongTermDebtTotal4;

    var otherCurrentLiabilities0 = commaseparator(parseFloat(d.annualReports[0].otherCurrentLiabilities));
    var otherCurrentLiabilities1 = commaseparator(parseFloat(d.annualReports[1].otherCurrentLiabilities));
    var otherCurrentLiabilities2 = commaseparator(parseFloat(d.annualReports[2].otherCurrentLiabilities));
    var otherCurrentLiabilities3 = commaseparator(parseFloat(d.annualReports[3].otherCurrentLiabilities));
    var otherCurrentLiabilities4 = commaseparator(parseFloat(d.annualReports[4].otherCurrentLiabilities));

    document.getElementById('otherCurrentLiabilities0').innerHTML = otherCurrentLiabilities0;
    document.getElementById('otherCurrentLiabilities1').innerHTML = otherCurrentLiabilities1;
    document.getElementById('otherCurrentLiabilities2').innerHTML = otherCurrentLiabilities2;
    document.getElementById('otherCurrentLiabilities3').innerHTML = otherCurrentLiabilities3;
    document.getElementById('otherCurrentLiabilities4').innerHTML = otherCurrentLiabilities4;

    var otherNonCurrentLiabilities0 = commaseparator(parseFloat(d.annualReports[0].otherNonCurrentLiabilities));
    var otherNonCurrentLiabilities1 = commaseparator(parseFloat(d.annualReports[1].otherNonCurrentLiabilities));
    var otherNonCurrentLiabilities2 = commaseparator(parseFloat(d.annualReports[2].otherNonCurrentLiabilities));
    var otherNonCurrentLiabilities3 = commaseparator(parseFloat(d.annualReports[3].otherNonCurrentLiabilities));
    var otherNonCurrentLiabilities4 = commaseparator(parseFloat(d.annualReports[4].otherNonCurrentLiabilities));

    document.getElementById('otherNonCurrentLiabilities0').innerHTML = otherNonCurrentLiabilities0;
    document.getElementById('otherNonCurrentLiabilities1').innerHTML = otherNonCurrentLiabilities1;
    document.getElementById('otherNonCurrentLiabilities2').innerHTML = otherNonCurrentLiabilities2;
    document.getElementById('otherNonCurrentLiabilities3').innerHTML = otherNonCurrentLiabilities3;
    document.getElementById('otherNonCurrentLiabilities4').innerHTML = otherNonCurrentLiabilities4;

    var totalShareholderEquity0 = commaseparator(parseFloat(d.annualReports[0].totalShareholderEquity));
    var totalShareholderEquity1 = commaseparator(parseFloat(d.annualReports[1].totalShareholderEquity));
    var totalShareholderEquity2 = commaseparator(parseFloat(d.annualReports[2].totalShareholderEquity));
    var totalShareholderEquity3 = commaseparator(parseFloat(d.annualReports[3].totalShareholderEquity));
    var totalShareholderEquity4 = commaseparator(parseFloat(d.annualReports[4].totalShareholderEquity));

    document.getElementById('totalShareholderEquity0').innerHTML = totalShareholderEquity0;
    document.getElementById('totalShareholderEquity1').innerHTML = totalShareholderEquity1;
    document.getElementById('totalShareholderEquity2').innerHTML = totalShareholderEquity2;
    document.getElementById('totalShareholderEquity3').innerHTML = totalShareholderEquity3;
    document.getElementById('totalShareholderEquity4').innerHTML = totalShareholderEquity4;


    var treasuryStock0 = commaseparator(parseFloat(d.annualReports[0].treasuryStock));
    var treasuryStock1 = commaseparator(parseFloat(d.annualReports[1].treasuryStock));
    var treasuryStock2 = commaseparator(parseFloat(d.annualReports[2].treasuryStock));
    var treasuryStock3 = commaseparator(parseFloat(d.annualReports[3].treasuryStock));
    var treasuryStock4 = commaseparator(parseFloat(d.annualReports[4].treasuryStock));

    document.getElementById('treasuryStock0').innerHTML = treasuryStock0;
    document.getElementById('treasuryStock1').innerHTML = treasuryStock1;
    document.getElementById('treasuryStock2').innerHTML = treasuryStock2;
    document.getElementById('treasuryStock3').innerHTML = treasuryStock3;
    document.getElementById('treasuryStock4').innerHTML = treasuryStock4;

    var retainedEarnings0 = commaseparator(parseFloat(d.annualReports[0].retainedEarnings));
    var retainedEarnings1 = commaseparator(parseFloat(d.annualReports[1].retainedEarnings));
    var retainedEarnings2 = commaseparator(parseFloat(d.annualReports[2].retainedEarnings));
    var retainedEarnings3 = commaseparator(parseFloat(d.annualReports[3].retainedEarnings));
    var retainedEarnings4 = commaseparator(parseFloat(d.annualReports[4].retainedEarnings));

    document.getElementById('retainedEarnings0').innerHTML = retainedEarnings0;
    document.getElementById('retainedEarnings1').innerHTML = retainedEarnings1;
    document.getElementById('retainedEarnings2').innerHTML = retainedEarnings2;
    document.getElementById('retainedEarnings3').innerHTML = retainedEarnings3;
    document.getElementById('retainedEarnings4').innerHTML = retainedEarnings4;


    var commonStock0 = commaseparator(parseFloat(d.annualReports[0].commonStock));
    var commonStock1 = commaseparator(parseFloat(d.annualReports[1].commonStock));
    var commonStock2 = commaseparator(parseFloat(d.annualReports[2].commonStock));
    var commonStock3 = commaseparator(parseFloat(d.annualReports[3].commonStock));
    var commonStock4 = commaseparator(parseFloat(d.annualReports[4].commonStock));

    document.getElementById('commonStock0').innerHTML = commonStock0;
    document.getElementById('commonStock1').innerHTML = commonStock1;
    document.getElementById('commonStock2').innerHTML = commonStock2;
    document.getElementById('commonStock3').innerHTML = commonStock3;
    document.getElementById('commonStock4').innerHTML = commonStock4;


    var commonStockSharesOutstanding0 = commaseparator(parseFloat(d.annualReports[0].commonStockSharesOutstanding));
    var commonStockSharesOutstanding1 = commaseparator(parseFloat(d.annualReports[1].commonStockSharesOutstanding));
    var commonStockSharesOutstanding2 = commaseparator(parseFloat(d.annualReports[2].commonStockSharesOutstanding));
    var commonStockSharesOutstanding3 = commaseparator(parseFloat(d.annualReports[3].commonStockSharesOutstanding));
    var commonStockSharesOutstanding4 = commaseparator(parseFloat(d.annualReports[4].commonStockSharesOutstanding));

    document.getElementById('commonStockSharesOutstanding0').innerHTML = commonStockSharesOutstanding0;
    document.getElementById('commonStockSharesOutstanding1').innerHTML = commonStockSharesOutstanding1;
    document.getElementById('commonStockSharesOutstanding2').innerHTML = commonStockSharesOutstanding2;
    document.getElementById('commonStockSharesOutstanding3').innerHTML = commonStockSharesOutstanding3;
    document.getElementById('commonStockSharesOutstanding4').innerHTML = commonStockSharesOutstanding4;


};
    balance_chart.send();


}



  function commaseparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//}