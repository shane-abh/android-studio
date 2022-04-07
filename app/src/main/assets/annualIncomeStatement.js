var str = "IBM";
function init(symbol){
    console.log(symbol);
    str = symbol;
    Income_statement(symbol);
}


//window.onload = function () {

  function datesplitter(date){
    const split = date.split("-");
    return parseInt(split[0]);
  }



 function Income_statement(symbol){

 console.log('Symbol inside income: '+symbol);
  var income_st_chart = new XMLHttpRequest();

  var url = 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=' + symbol + '&apikey=OOEPKQDKWRUGS4HV';
  income_st_chart.open('GET', url, true);
  income_st_chart.onload = function() {
    // Begin accessing JSON data here
    var d = JSON.parse(this.response);
    console.log(d.annualReports[1].netIncome);

    //Revenue for graphs
    let revenue0 = parseFloat(d.annualReports[0].totalRevenue);
    let revenue1 = parseFloat(d.annualReports[1].totalRevenue);
    let revenue2 = parseFloat(d.annualReports[2].totalRevenue);
    let revenue3 = parseFloat(d.annualReports[3].totalRevenue);
    let revenue4 = parseFloat(d.annualReports[4].totalRevenue);

    //gross profits for graphs
    let gross_profit0 = parseFloat(d.annualReports[0].grossProfit);
    let gross_profit1 = parseFloat(d.annualReports[1].grossProfit);
    let gross_profit2 = parseFloat(d.annualReports[2].grossProfit);
    let gross_profit3 = parseFloat(d.annualReports[3].grossProfit);
    let gross_profit4 = parseFloat(d.annualReports[4].grossProfit);



  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: d.symbol
    },
    axisY: {
      title: "Revenue",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      valueFormatString: " "
    },
    axisY2: {
      title: "Gross Profit",
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
      name: "Total Revenue",
      legendText: "Total Revenue",
      showInLegend: true,
      dataPoints:[
        { x: new Date(datesplitter(d.annualReports[4].fiscalDateEnding),11,31), y: revenue4},
        { x: new Date(datesplitter(d.annualReports[3].fiscalDateEnding),11,31), y: revenue3 },
        { x: new Date(datesplitter(d.annualReports[2].fiscalDateEnding),11,31), y: revenue2 },
        { x: new Date(datesplitter(d.annualReports[1].fiscalDateEnding),11,31), y: revenue1 },
        { x: new Date(datesplitter(d.annualReports[0].fiscalDateEnding),11,31), y: revenue0 }
      ]
    },
    {
      type: "column",
      name: "Gross profit",
      legendText: "Gross profit",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints:[
        { x: new Date(datesplitter(d.annualReports[4].fiscalDateEnding),11,31), y: gross_profit4},
        { x: new Date(datesplitter(d.annualReports[3].fiscalDateEnding),11,31), y: gross_profit3 },
        { x: new Date(datesplitter(d.annualReports[2].fiscalDateEnding),11,31), y: gross_profit2 },
        { x: new Date(datesplitter(d.annualReports[1].fiscalDateEnding),11,31), y: gross_profit1 },
        { x: new Date(datesplitter(d.annualReports[0].fiscalDateEnding),11,31), y: gross_profit0 }
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



//For Table
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


    var grossProfit0 = commaseparator(d.annualReports[0].grossProfit);
    var grossProfit1 = commaseparator(d.annualReports[1].grossProfit);
    var grossProfit2 = commaseparator(d.annualReports[2].grossProfit);
    var grossProfit3 = commaseparator(d.annualReports[3].grossProfit);
    var grossProfit4 = commaseparator(d.annualReports[4].grossProfit);

    document.getElementById('grossProfit0').innerHTML = grossProfit0;
    document.getElementById('grossProfit1').innerHTML = grossProfit1;
    document.getElementById('grossProfit2').innerHTML = grossProfit2;
    document.getElementById('grossProfit3').innerHTML = grossProfit3;
    document.getElementById('grossProfit4').innerHTML = grossProfit4;


    var totalRevenue0 = commaseparator(d.annualReports[0].totalRevenue);
    var totalRevenue1 = commaseparator(d.annualReports[1].totalRevenue);
    var totalRevenue2 = commaseparator(d.annualReports[2].totalRevenue);
    var totalRevenue3 = commaseparator(d.annualReports[3].totalRevenue);
    var totalRevenue4 = commaseparator(d.annualReports[4].totalRevenue);

    document.getElementById('totalRevenue0').innerHTML = totalRevenue0;
    document.getElementById('totalRevenue1').innerHTML = totalRevenue1;
    document.getElementById('totalRevenue2').innerHTML = totalRevenue2;
    document.getElementById('totalRevenue3').innerHTML = totalRevenue3;
    document.getElementById('totalRevenue4').innerHTML = totalRevenue4;


    var costOfRevenue0 = commaseparator(d.annualReports[0].costOfRevenue);
    var costOfRevenue1 = commaseparator(d.annualReports[1].costOfRevenue);
    var costOfRevenue2 = commaseparator(d.annualReports[2].costOfRevenue);
    var costOfRevenue3 = commaseparator(d.annualReports[3].costOfRevenue);
    var costOfRevenue4 = commaseparator(d.annualReports[4].costOfRevenue);

    document.getElementById('costOfRevenue0').innerHTML = costOfRevenue0;
    document.getElementById('costOfRevenue1').innerHTML = costOfRevenue1;
    document.getElementById('costOfRevenue2').innerHTML = costOfRevenue2;
    document.getElementById('costOfRevenue3').innerHTML = costOfRevenue3;
    document.getElementById('costOfRevenue4').innerHTML = costOfRevenue4;


    var costofGoodsAndServicesSold0 = commaseparator(d.annualReports[0].costofGoodsAndServicesSold);
    var costofGoodsAndServicesSold1 = commaseparator(d.annualReports[1].costofGoodsAndServicesSold);
    var costofGoodsAndServicesSold2 = commaseparator(d.annualReports[2].costofGoodsAndServicesSold);
    var costofGoodsAndServicesSold3 = commaseparator(d.annualReports[3].costofGoodsAndServicesSold);
    var costofGoodsAndServicesSold4 = commaseparator(d.annualReports[4].costofGoodsAndServicesSold);

    document.getElementById('costofGoodsAndServicesSold0').innerHTML = costofGoodsAndServicesSold0;
    document.getElementById('costofGoodsAndServicesSold1').innerHTML = costofGoodsAndServicesSold1;
    document.getElementById('costofGoodsAndServicesSold2').innerHTML = costofGoodsAndServicesSold2;
    document.getElementById('costofGoodsAndServicesSold3').innerHTML = costofGoodsAndServicesSold3;
    document.getElementById('costofGoodsAndServicesSold4').innerHTML = costofGoodsAndServicesSold4;

    var operatingIncome0 = commaseparator(d.annualReports[0].operatingIncome);
    var operatingIncome1 = commaseparator(d.annualReports[1].operatingIncome);
    var operatingIncome2 = commaseparator(d.annualReports[2].operatingIncome);
    var operatingIncome3 = commaseparator(d.annualReports[3].operatingIncome);
    var operatingIncome4 = commaseparator(d.annualReports[4].operatingIncome);

    document.getElementById('operatingIncome0').innerHTML = operatingIncome0;
    document.getElementById('operatingIncome1').innerHTML = operatingIncome1;
    document.getElementById('operatingIncome2').innerHTML = operatingIncome2;
    document.getElementById('operatingIncome3').innerHTML = operatingIncome3;
    document.getElementById('operatingIncome4').innerHTML = operatingIncome4;

    var sellingGeneralAndAdministrative0 = commaseparator(d.annualReports[0].sellingGeneralAndAdministrative);
    var sellingGeneralAndAdministrative1 = commaseparator(d.annualReports[1].sellingGeneralAndAdministrative);
    var sellingGeneralAndAdministrative2 = commaseparator(d.annualReports[2].sellingGeneralAndAdministrative);
    var sellingGeneralAndAdministrative3 = commaseparator(d.annualReports[3].sellingGeneralAndAdministrative);
    var sellingGeneralAndAdministrative4 = commaseparator(d.annualReports[4].sellingGeneralAndAdministrative);

    document.getElementById('sellingGeneralAndAdministrative0').innerHTML = sellingGeneralAndAdministrative0;
    document.getElementById('sellingGeneralAndAdministrative1').innerHTML = sellingGeneralAndAdministrative1;
    document.getElementById('sellingGeneralAndAdministrative2').innerHTML = sellingGeneralAndAdministrative2;
    document.getElementById('sellingGeneralAndAdministrative3').innerHTML = sellingGeneralAndAdministrative3;
    document.getElementById('sellingGeneralAndAdministrative4').innerHTML = sellingGeneralAndAdministrative4;


    var researchAndDevelopment0 = commaseparator(d.annualReports[0].researchAndDevelopment);
    var researchAndDevelopment1 = commaseparator(d.annualReports[1].researchAndDevelopment);
    var researchAndDevelopment2 = commaseparator(d.annualReports[2].researchAndDevelopment);
    var researchAndDevelopment3 = commaseparator(d.annualReports[3].researchAndDevelopment);
    var researchAndDevelopment4 = commaseparator(d.annualReports[4].researchAndDevelopment);

    document.getElementById('researchAndDevelopment0').innerHTML = researchAndDevelopment0;
    document.getElementById('researchAndDevelopment1').innerHTML = researchAndDevelopment1;
    document.getElementById('researchAndDevelopment2').innerHTML = researchAndDevelopment2;
    document.getElementById('researchAndDevelopment3').innerHTML = researchAndDevelopment3;
    document.getElementById('researchAndDevelopment4').innerHTML = researchAndDevelopment4;

    var operatingExpenses0 = commaseparator(d.annualReports[0].operatingExpenses);
    var operatingExpenses1 = commaseparator(d.annualReports[1].operatingExpenses);
    var operatingExpenses2 = commaseparator(d.annualReports[2].operatingExpenses);
    var operatingExpenses3 = commaseparator(d.annualReports[3].operatingExpenses);
    var operatingExpenses4 = commaseparator(d.annualReports[4].operatingExpenses);

    document.getElementById('operatingExpenses0').innerHTML = operatingExpenses0;
    document.getElementById('operatingExpenses1').innerHTML = operatingExpenses1;
    document.getElementById('operatingExpenses2').innerHTML = operatingExpenses2;
    document.getElementById('operatingExpenses3').innerHTML = operatingExpenses3;
    document.getElementById('operatingExpenses4').innerHTML = operatingExpenses4;


    var interestExpense0 = commaseparator(d.annualReports[0].interestExpense);
    var interestExpense1 = commaseparator(d.annualReports[1].interestExpense);
    var interestExpense2 = commaseparator(d.annualReports[2].interestExpense);
    var interestExpense3 = commaseparator(d.annualReports[3].interestExpense);
    var interestExpense4 = commaseparator(d.annualReports[4].interestExpense);

    document.getElementById('interestExpense0').innerHTML = interestExpense0;
    document.getElementById('interestExpense1').innerHTML = interestExpense1;
    document.getElementById('interestExpense2').innerHTML = interestExpense2;
    document.getElementById('interestExpense3').innerHTML = interestExpense3;
    document.getElementById('interestExpense4').innerHTML = interestExpense4;


    var incomeBeforeTax0 = commaseparator(d.annualReports[0].incomeBeforeTax);
    var incomeBeforeTax1 = commaseparator(d.annualReports[1].incomeBeforeTax);
    var incomeBeforeTax2 = commaseparator(d.annualReports[2].incomeBeforeTax);
    var incomeBeforeTax3 = commaseparator(d.annualReports[3].incomeBeforeTax);
    var incomeBeforeTax4 = commaseparator(d.annualReports[4].incomeBeforeTax);

    document.getElementById('incomeBeforeTax0').innerHTML = incomeBeforeTax0;
    document.getElementById('incomeBeforeTax1').innerHTML = incomeBeforeTax1;
    document.getElementById('incomeBeforeTax2').innerHTML = incomeBeforeTax2;
    document.getElementById('incomeBeforeTax3').innerHTML = incomeBeforeTax3;
    document.getElementById('incomeBeforeTax4').innerHTML = incomeBeforeTax4;

    var interestAndDebtExpense0 = commaseparator(d.annualReports[0].interestAndDebtExpense);
    var interestAndDebtExpense1 = commaseparator(d.annualReports[1].interestAndDebtExpense);
    var interestAndDebtExpense2 = commaseparator(d.annualReports[2].interestAndDebtExpense);
    var interestAndDebtExpense3 = commaseparator(d.annualReports[3].interestAndDebtExpense);
    var interestAndDebtExpense4 = commaseparator(d.annualReports[4].interestAndDebtExpense);

    document.getElementById('interestAndDebtExpense0').innerHTML = interestAndDebtExpense0;
    document.getElementById('interestAndDebtExpense1').innerHTML = interestAndDebtExpense1;
    document.getElementById('interestAndDebtExpense2').innerHTML = interestAndDebtExpense2;
    document.getElementById('interestAndDebtExpense3').innerHTML = interestAndDebtExpense3;
    document.getElementById('interestAndDebtExpense4').innerHTML = interestAndDebtExpense4;


    var investmentIncomeNet0 = commaseparator(d.annualReports[0].investmentIncomeNet);
    var investmentIncomeNet1 = commaseparator(d.annualReports[1].investmentIncomeNet);
    var investmentIncomeNet2 = commaseparator(d.annualReports[2].investmentIncomeNet);
    var investmentIncomeNet3 = commaseparator(d.annualReports[3].investmentIncomeNet);
    var investmentIncomeNet4 = commaseparator(d.annualReports[4].investmentIncomeNet);

    document.getElementById('investmentIncomeNet0').innerHTML = investmentIncomeNet0;
    document.getElementById('investmentIncomeNet1').innerHTML = investmentIncomeNet1;
    document.getElementById('investmentIncomeNet2').innerHTML = investmentIncomeNet2;
    document.getElementById('investmentIncomeNet3').innerHTML = investmentIncomeNet3;
    document.getElementById('investmentIncomeNet4').innerHTML = investmentIncomeNet4;

    var interestIncome0 = commaseparator(d.annualReports[0].interestIncome);
    var interestIncome1 = commaseparator(d.annualReports[1].interestIncome);
    var interestIncome2 = commaseparator(d.annualReports[2].interestIncome);
    var interestIncome3 = commaseparator(d.annualReports[3].interestIncome);
    var interestIncome4 = commaseparator(d.annualReports[4].interestIncome);

    document.getElementById('interestIncome0').innerHTML = interestIncome0;
    document.getElementById('interestIncome1').innerHTML = interestIncome1;
    document.getElementById('interestIncome2').innerHTML = interestIncome2;
    document.getElementById('interestIncome3').innerHTML = interestIncome3;
    document.getElementById('interestIncome4').innerHTML = interestIncome4;

    var netInterestIncome0 = commaseparator(d.annualReports[0].netInterestIncome);
    var netInterestIncome1 = commaseparator(d.annualReports[1].netInterestIncome);
    var netInterestIncome2 = commaseparator(d.annualReports[2].netInterestIncome);
    var netInterestIncome3 = commaseparator(d.annualReports[3].netInterestIncome);
    var netInterestIncome4 = commaseparator(d.annualReports[4].netInterestIncome);

    document.getElementById('netInterestIncome0').innerHTML = netInterestIncome0;
    document.getElementById('netInterestIncome1').innerHTML = netInterestIncome1;
    document.getElementById('netInterestIncome2').innerHTML = netInterestIncome2;
    document.getElementById('netInterestIncome3').innerHTML = netInterestIncome3;
    document.getElementById('netInterestIncome4').innerHTML = netInterestIncome4;

    var otherNonOperatingIncome0 = commaseparator(d.annualReports[0].otherNonOperatingIncome);
    var otherNonOperatingIncome1 = commaseparator(d.annualReports[1].otherNonOperatingIncome);
    var otherNonOperatingIncome2 = commaseparator(d.annualReports[2].otherNonOperatingIncome);
    var otherNonOperatingIncome3 = commaseparator(d.annualReports[3].otherNonOperatingIncome);
    var otherNonOperatingIncome4 = commaseparator(d.annualReports[4].otherNonOperatingIncome);

    document.getElementById('otherNonOperatingIncome0').innerHTML = otherNonOperatingIncome0;
    document.getElementById('otherNonOperatingIncome1').innerHTML = otherNonOperatingIncome1;
    document.getElementById('otherNonOperatingIncome2').innerHTML = otherNonOperatingIncome2;
    document.getElementById('otherNonOperatingIncome3').innerHTML = otherNonOperatingIncome3;
    document.getElementById('otherNonOperatingIncome4').innerHTML = otherNonOperatingIncome4;


    var netIncomeFromContinuingOperations0 = commaseparator(d.annualReports[0].netIncomeFromContinuingOperations);
    var netIncomeFromContinuingOperations1 = commaseparator(d.annualReports[1].netIncomeFromContinuingOperations);
    var netIncomeFromContinuingOperations2 = commaseparator(d.annualReports[2].netIncomeFromContinuingOperations);
    var netIncomeFromContinuingOperations3 = commaseparator(d.annualReports[3].netIncomeFromContinuingOperations);
    var netIncomeFromContinuingOperations4 = commaseparator(d.annualReports[4].netIncomeFromContinuingOperations);

    document.getElementById('netIncomeFromContinuingOperations0').innerHTML = netIncomeFromContinuingOperations0;
    document.getElementById('netIncomeFromContinuingOperations1').innerHTML = netIncomeFromContinuingOperations1;
    document.getElementById('netIncomeFromContinuingOperations2').innerHTML = netIncomeFromContinuingOperations2;
    document.getElementById('netIncomeFromContinuingOperations3').innerHTML = netIncomeFromContinuingOperations3;
    document.getElementById('netIncomeFromContinuingOperations4').innerHTML = netIncomeFromContinuingOperations4;


    var comprehensiveIncomeNetOfTax0 = commaseparator(d.annualReports[0].comprehensiveIncomeNetOfTax);
    var comprehensiveIncomeNetOfTax1 = commaseparator(d.annualReports[1].comprehensiveIncomeNetOfTax);
    var comprehensiveIncomeNetOfTax2 = commaseparator(d.annualReports[2].comprehensiveIncomeNetOfTax);
    var comprehensiveIncomeNetOfTax3 = commaseparator(d.annualReports[3].comprehensiveIncomeNetOfTax);
    var comprehensiveIncomeNetOfTax4 = commaseparator(d.annualReports[4].comprehensiveIncomeNetOfTax);

    document.getElementById('comprehensiveIncomeNetOfTax0').innerHTML = comprehensiveIncomeNetOfTax0;
    document.getElementById('comprehensiveIncomeNetOfTax1').innerHTML = comprehensiveIncomeNetOfTax1;
    document.getElementById('comprehensiveIncomeNetOfTax2').innerHTML = comprehensiveIncomeNetOfTax2;
    document.getElementById('comprehensiveIncomeNetOfTax3').innerHTML = comprehensiveIncomeNetOfTax3;
    document.getElementById('comprehensiveIncomeNetOfTax4').innerHTML = comprehensiveIncomeNetOfTax4;

    var depreciation0 = commaseparator(d.annualReports[0].depreciation);
    var depreciation1 = commaseparator(d.annualReports[1].depreciation);
    var depreciation2 = commaseparator(d.annualReports[2].depreciation);
    var depreciation3 = commaseparator(d.annualReports[3].depreciation);
    var depreciation4 = commaseparator(d.annualReports[4].depreciation);

    document.getElementById('depreciation0').innerHTML = depreciation0;
    document.getElementById('depreciation1').innerHTML = depreciation1;
    document.getElementById('depreciation2').innerHTML = depreciation2;
    document.getElementById('depreciation3').innerHTML = depreciation3;
    document.getElementById('depreciation4').innerHTML = depreciation4;

    var depreciationAndAmortization0 = commaseparator(d.annualReports[0].depreciationAndAmortization);
    var depreciationAndAmortization1 = commaseparator(d.annualReports[1].depreciationAndAmortization);
    var depreciationAndAmortization2 = commaseparator(d.annualReports[2].depreciationAndAmortization);
    var depreciationAndAmortization3 = commaseparator(d.annualReports[3].depreciationAndAmortization);
    var depreciationAndAmortization4 = commaseparator(d.annualReports[4].depreciationAndAmortization);

    document.getElementById('depreciationAndAmortization0').innerHTML = depreciationAndAmortization0;
    document.getElementById('depreciationAndAmortization1').innerHTML = depreciationAndAmortization1;
    document.getElementById('depreciationAndAmortization2').innerHTML = depreciationAndAmortization2;
    document.getElementById('depreciationAndAmortization3').innerHTML = depreciationAndAmortization3;
    document.getElementById('depreciationAndAmortization4').innerHTML = depreciationAndAmortization4;

    var ebit0 = commaseparator(d.annualReports[0].ebit);
    var ebit1 = commaseparator(d.annualReports[1].ebit);
    var ebit2 = commaseparator(d.annualReports[2].ebit);
    var ebit3 = commaseparator(d.annualReports[3].ebit);
    var ebit4 = commaseparator(d.annualReports[4].ebit);

    document.getElementById('ebit0').innerHTML = ebit0;
    document.getElementById('ebit1').innerHTML = ebit1;
    document.getElementById('ebit2').innerHTML = ebit2;
    document.getElementById('ebit3').innerHTML = ebit3;
    document.getElementById('ebit4').innerHTML = ebit4;

    var ebitda0 = commaseparator(d.annualReports[0].ebitda);
    var ebitda1 = commaseparator(d.annualReports[1].ebitda);
    var ebitda2 = commaseparator(d.annualReports[2].ebitda);
    var ebitda3 = commaseparator(d.annualReports[3].ebitda);
    var ebitda4 = commaseparator(d.annualReports[4].ebitda);

    document.getElementById('ebitda0').innerHTML = ebitda0;
    document.getElementById('ebitda1').innerHTML = ebitda1;
    document.getElementById('ebitda2').innerHTML = ebitda2;
    document.getElementById('ebitda3').innerHTML = ebitda3;
    document.getElementById('ebitda4').innerHTML = ebitda4;

    var netIncome0 = commaseparator(d.annualReports[0].netIncome);
    var netIncome1 = commaseparator(d.annualReports[1].netIncome);
    var netIncome2 = commaseparator(d.annualReports[2].netIncome);
    var netIncome3 = commaseparator(d.annualReports[3].netIncome);
    var netIncome4 = commaseparator(d.annualReports[4].netIncome);

    document.getElementById('netIncome0').innerHTML = netIncome0;
    document.getElementById('netIncome1').innerHTML = netIncome1;
    document.getElementById('netIncome2').innerHTML = netIncome2;
    document.getElementById('netIncome3').innerHTML = netIncome3;
    document.getElementById('netIncome4').innerHTML = netIncome4;

};
    income_st_chart.send();

    }

//}



function commaseparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

