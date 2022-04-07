//window.onload = function () {


function init(symbol){
    console.log(symbol);

    CashFlow(symbol);
}

  function datesplitter(date){
    const split = date.split("-");
    return parseInt(split[0]);
  }




function CashFlow(symbol){
  var cashflow_chart = new XMLHttpRequest();
  // var name = document.getElementById('search').value;
  var url = 'https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+symbol+'&apikey=OOEPKQDKWRUGS4HV';
  cashflow_chart.open('GET', url, true);
  cashflow_chart.onload = function() {
    // Begin accessing JSON data here
    var d = JSON.parse(this.response);


    //operatingCashflow for graphs
    let operatingCashflow0 = parseFloat(d.quarterlyReports[0].operatingCashflow);
    let operatingCashflow1 = parseFloat(d.quarterlyReports[1].operatingCashflow);
    let operatingCashflow2 = parseFloat(d.quarterlyReports[2].operatingCashflow);
    let operatingCashflow3 = parseFloat(d.quarterlyReports[3].operatingCashflow);
    let operatingCashflow4 = parseFloat(d.quarterlyReports[4].operatingCashflow);
    console.log(operatingCashflow0);

    //Total Liabilitiess for graphs
    let cashflowFromInvestment0 = parseFloat(d.quarterlyReports[0].cashflowFromInvestment);
    let cashflowFromInvestment1 = parseFloat(d.quarterlyReports[1].cashflowFromInvestment);
    let cashflowFromInvestment2 = parseFloat(d.quarterlyReports[2].cashflowFromInvestment);
    let cashflowFromInvestment3 = parseFloat(d.quarterlyReports[3].cashflowFromInvestment);
    let cashflowFromInvestment4 = parseFloat(d.quarterlyReports[4].cashflowFromInvestment);
    console.log(cashflowFromInvestment0);

    //cashflowFromFinancing for graphs
    let cashflowFromFinancing0 = parseFloat(d.quarterlyReports[0].cashflowFromFinancing);
    let cashflowFromFinancing1 = parseFloat(d.quarterlyReports[1].cashflowFromFinancing);
    let cashflowFromFinancing2 = parseFloat(d.quarterlyReports[2].cashflowFromFinancing);
    let cashflowFromFinancing3 = parseFloat(d.quarterlyReports[3].cashflowFromFinancing);
    let cashflowFromFinancing4 = parseFloat(d.quarterlyReports[4].cashflowFromFinancing);
    console.log(cashflowFromFinancing0);

    var chart = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: d.symbol
      },
      axisY: {
        title: "Cash Flow Operations"
      },
      data: [{
        type: "column",
        showInLegend: true,
        // legendMarkerColor: "blue",
        legendText: "Operating Cash flow",
        dataPoints: [
          { x:new Date(datesplitter(d.quarterlyReports[4].fiscalDateEnding),11,31),y: operatingCashflow4 },
          { x:new Date(datesplitter(d.quarterlyReports[3].fiscalDateEnding),11,31),y: operatingCashflow3 },
          { x:new Date(datesplitter(d.quarterlyReports[2].fiscalDateEnding),11,31),y: operatingCashflow2 },
          { x:new Date(datesplitter(d.quarterlyReports[1].fiscalDateEnding),11,31),y: operatingCashflow1 },
          { x:new Date(datesplitter(d.quarterlyReports[0].fiscalDateEnding),11,31),y: operatingCashflow0 }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        // legendMarkerColor: "blue",
        legendText: "Cash Flow from Investments",
        dataPoints: [
          { x:new Date(datesplitter(d.quarterlyReports[4].fiscalDateEnding),11,31),y: cashflowFromInvestment4 },
          { x:new Date(datesplitter(d.quarterlyReports[3].fiscalDateEnding),11,31),y: cashflowFromInvestment3 },
          { x:new Date(datesplitter(d.quarterlyReports[2].fiscalDateEnding),11,31),y: cashflowFromInvestment2 },
          { x:new Date(datesplitter(d.quarterlyReports[1].fiscalDateEnding),11,31),y: cashflowFromInvestment1 },
          { x:new Date(datesplitter(d.quarterlyReports[0].fiscalDateEnding),11,31),y: cashflowFromInvestment0 }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        // legendMarkerColor: "blue",
        legendText: "Cash Flow from financing",
        dataPoints: [
          { x:new Date(datesplitter(d.quarterlyReports[4].fiscalDateEnding),11,31),y: cashflowFromFinancing4 },
          { x:new Date(datesplitter(d.quarterlyReports[3].fiscalDateEnding),11,31),y: cashflowFromFinancing3 },
          { x:new Date(datesplitter(d.quarterlyReports[2].fiscalDateEnding),11,31),y: cashflowFromFinancing2 },
          { x:new Date(datesplitter(d.quarterlyReports[1].fiscalDateEnding),11,31),y: cashflowFromFinancing1 },
          { x:new Date(datesplitter(d.quarterlyReports[0].fiscalDateEnding),11,31),y: cashflowFromFinancing0 }
        ]
      }]
    });
    chart.render();

    var date1 = d.quarterlyReports[0].fiscalDateEnding;
    var date2 = d.quarterlyReports[1].fiscalDateEnding;
    var date3 = d.quarterlyReports[2].fiscalDateEnding;
    var date4 = d.quarterlyReports[3].fiscalDateEnding;
    var date5 = d.quarterlyReports[4].fiscalDateEnding;

    document.getElementById('fiscalDateEnding_cash0').innerHTML = date1;
    document.getElementById('fiscalDateEnding_cash1').innerHTML = date2;
    document.getElementById('fiscalDateEnding_cash2').innerHTML = date3;
    document.getElementById('fiscalDateEnding_cash3').innerHTML = date4;
    document.getElementById('fiscalDateEnding_cash4').innerHTML = date5;


    // var operatingCashflow0 = commaseparator(d.quarterlyReports[0].operatingCashflow);
    // var operatingCashflow1 = commaseparator(d.quarterlyReports[1].operatingCashflow);
    // var operatingCashflow2 = commaseparator(d.quarterlyReports[2].operatingCashflow);
    // var operatingCashflow3 = commaseparator(d.quarterlyReports[3].operatingCashflow);
    // var operatingCashflow4 = commaseparator(d.quarterlyReports[4].operatingCashflow);

    document.getElementById('operatingCashflow0').innerHTML = operatingCashflow0;
    document.getElementById('operatingCashflow1').innerHTML = operatingCashflow1;
    document.getElementById('operatingCashflow2').innerHTML = operatingCashflow2;
    document.getElementById('operatingCashflow3').innerHTML = operatingCashflow3;
    document.getElementById('operatingCashflow4').innerHTML = operatingCashflow4;


    var paymentsForOperatingActivities0 = commaseparator(d.quarterlyReports[0].paymentsForOperatingActivities);
    var paymentsForOperatingActivities1 = commaseparator(d.quarterlyReports[1].paymentsForOperatingActivities);
    var paymentsForOperatingActivities2 = commaseparator(d.quarterlyReports[2].paymentsForOperatingActivities);
    var paymentsForOperatingActivities3 = commaseparator(d.quarterlyReports[3].paymentsForOperatingActivities);
    var paymentsForOperatingActivities4 = commaseparator(d.quarterlyReports[4].paymentsForOperatingActivities);

    document.getElementById('paymentsForOperatingActivities0').innerHTML = paymentsForOperatingActivities0;
    document.getElementById('paymentsForOperatingActivities1').innerHTML = paymentsForOperatingActivities1;
    document.getElementById('paymentsForOperatingActivities2').innerHTML = paymentsForOperatingActivities2;
    document.getElementById('paymentsForOperatingActivities3').innerHTML = paymentsForOperatingActivities3;
    document.getElementById('paymentsForOperatingActivities4').innerHTML = paymentsForOperatingActivities4;


    var proceedsFromOperatingActivities0 = commaseparator(d.quarterlyReports[0].proceedsFromOperatingActivities);
    var proceedsFromOperatingActivities1 = commaseparator(d.quarterlyReports[1].proceedsFromOperatingActivities);
    var proceedsFromOperatingActivities2 = commaseparator(d.quarterlyReports[2].proceedsFromOperatingActivities);
    var proceedsFromOperatingActivities3 = commaseparator(d.quarterlyReports[3].proceedsFromOperatingActivities);
    var proceedsFromOperatingActivities4 = commaseparator(d.quarterlyReports[4].proceedsFromOperatingActivities);

    document.getElementById('proceedsFromOperatingActivities0').innerHTML = proceedsFromOperatingActivities0;
    document.getElementById('proceedsFromOperatingActivities1').innerHTML = proceedsFromOperatingActivities1;
    document.getElementById('proceedsFromOperatingActivities2').innerHTML = proceedsFromOperatingActivities2;
    document.getElementById('proceedsFromOperatingActivities3').innerHTML = proceedsFromOperatingActivities3;
    document.getElementById('proceedsFromOperatingActivities4').innerHTML = proceedsFromOperatingActivities4;


    var changeInOperatingLiabilities0 = commaseparator(d.quarterlyReports[0].changeInOperatingLiabilities);
    var changeInOperatingLiabilities1 = commaseparator(d.quarterlyReports[1].changeInOperatingLiabilities);
    var changeInOperatingLiabilities2 = commaseparator(d.quarterlyReports[2].changeInOperatingLiabilities);
    var changeInOperatingLiabilities3 = commaseparator(d.quarterlyReports[3].changeInOperatingLiabilities);
    var changeInOperatingLiabilities4 = commaseparator(d.quarterlyReports[4].changeInOperatingLiabilities);

    document.getElementById('changeInOperatingLiabilities0').innerHTML = changeInOperatingLiabilities0;
    document.getElementById('changeInOperatingLiabilities1').innerHTML = changeInOperatingLiabilities1;
    document.getElementById('changeInOperatingLiabilities2').innerHTML = changeInOperatingLiabilities2;
    document.getElementById('changeInOperatingLiabilities3').innerHTML = changeInOperatingLiabilities3;
    document.getElementById('changeInOperatingLiabilities4').innerHTML = changeInOperatingLiabilities4;

    var changeInOperatingAssets0 = commaseparator(d.quarterlyReports[0].changeInOperatingAssets);
    var changeInOperatingAssets1 = commaseparator(d.quarterlyReports[1].changeInOperatingAssets);
    var changeInOperatingAssets2 = commaseparator(d.quarterlyReports[2].changeInOperatingAssets);
    var changeInOperatingAssets3 = commaseparator(d.quarterlyReports[3].changeInOperatingAssets);
    var changeInOperatingAssets4 = commaseparator(d.quarterlyReports[4].changeInOperatingAssets);

    document.getElementById('changeInOperatingAssets0').innerHTML = changeInOperatingAssets0;
    document.getElementById('changeInOperatingAssets1').innerHTML = changeInOperatingAssets1;
    document.getElementById('changeInOperatingAssets2').innerHTML = changeInOperatingAssets2;
    document.getElementById('changeInOperatingAssets3').innerHTML = changeInOperatingAssets3;
    document.getElementById('changeInOperatingAssets4').innerHTML = changeInOperatingAssets4;


    var depreciationDepletionAndAmortization0 = commaseparator(d.quarterlyReports[0].depreciationDepletionAndAmortization);
    var depreciationDepletionAndAmortization1 = commaseparator(d.quarterlyReports[1].depreciationDepletionAndAmortization);
    var depreciationDepletionAndAmortization2 = commaseparator(d.quarterlyReports[2].depreciationDepletionAndAmortization);
    var depreciationDepletionAndAmortization3 = commaseparator(d.quarterlyReports[3].depreciationDepletionAndAmortization);
    var depreciationDepletionAndAmortization4 = commaseparator(d.quarterlyReports[4].depreciationDepletionAndAmortization);

    document.getElementById('depreciationDepletionAndAmortization0').innerHTML = depreciationDepletionAndAmortization0;
    document.getElementById('depreciationDepletionAndAmortization1').innerHTML = depreciationDepletionAndAmortization1;
    document.getElementById('depreciationDepletionAndAmortization2').innerHTML = depreciationDepletionAndAmortization2;
    document.getElementById('depreciationDepletionAndAmortization3').innerHTML = depreciationDepletionAndAmortization3;
    document.getElementById('depreciationDepletionAndAmortization4').innerHTML = depreciationDepletionAndAmortization4;


    var capitalExpenditures0 = commaseparator(d.quarterlyReports[0].capitalExpenditures);
    var capitalExpenditures1 = commaseparator(d.quarterlyReports[1].capitalExpenditures);
    var capitalExpenditures2 = commaseparator(d.quarterlyReports[2].capitalExpenditures);
    var capitalExpenditures3 = commaseparator(d.quarterlyReports[3].capitalExpenditures);
    var capitalExpenditures4 = commaseparator(d.quarterlyReports[4].capitalExpenditures);

    document.getElementById('capitalExpenditures0').innerHTML = capitalExpenditures0;
    document.getElementById('capitalExpenditures1').innerHTML = capitalExpenditures1;
    document.getElementById('capitalExpenditures2').innerHTML = capitalExpenditures2;
    document.getElementById('capitalExpenditures3').innerHTML = capitalExpenditures3;
    document.getElementById('capitalExpenditures4').innerHTML = capitalExpenditures4;


    var changeInReceivables0 = commaseparator(d.quarterlyReports[0].changeInReceivables);
    var changeInReceivables1 = commaseparator(d.quarterlyReports[1].changeInReceivables);
    var changeInReceivables2 = commaseparator(d.quarterlyReports[2].changeInReceivables);
    var changeInReceivables3 = commaseparator(d.quarterlyReports[3].changeInReceivables);
    var changeInReceivables4 = commaseparator(d.quarterlyReports[4].changeInReceivables);

    document.getElementById('changeInReceivables0').innerHTML = changeInReceivables0;
    document.getElementById('changeInReceivables1').innerHTML = changeInReceivables1;
    document.getElementById('changeInReceivables2').innerHTML = changeInReceivables2;
    document.getElementById('changeInReceivables3').innerHTML = changeInReceivables3;
    document.getElementById('changeInReceivables4').innerHTML = changeInReceivables4;

    var changeInInventory0 = commaseparator(d.quarterlyReports[0].changeInInventory);
    var changeInInventory1 = commaseparator(d.quarterlyReports[1].changeInInventory);
    var changeInInventory2 = commaseparator(d.quarterlyReports[2].changeInInventory);
    var changeInInventory3 = commaseparator(d.quarterlyReports[3].changeInInventory);
    var changeInInventory4 = commaseparator(d.quarterlyReports[4].changeInInventory);

    document.getElementById('changeInInventory0').innerHTML = changeInInventory0;
    document.getElementById('changeInInventory1').innerHTML = changeInInventory1;
    document.getElementById('changeInInventory2').innerHTML = changeInInventory2;
    document.getElementById('changeInInventory3').innerHTML = changeInInventory3;
    document.getElementById('changeInInventory4').innerHTML = changeInInventory4;


    var profitLoss0 = commaseparator(d.quarterlyReports[0].profitLoss);
    var profitLoss1 = commaseparator(d.quarterlyReports[1].profitLoss);
    var profitLoss2 = commaseparator(d.quarterlyReports[2].profitLoss);
    var profitLoss3 = commaseparator(d.quarterlyReports[3].profitLoss);
    var profitLoss4 = commaseparator(d.quarterlyReports[4].profitLoss);

    document.getElementById('profitLoss0').innerHTML = profitLoss0;
    document.getElementById('profitLoss1').innerHTML = profitLoss1;
    document.getElementById('profitLoss2').innerHTML = profitLoss2;
    document.getElementById('profitLoss3').innerHTML = profitLoss3;
    document.getElementById('profitLoss4').innerHTML = profitLoss4;


    // var cashflowFromInvestment0 = commaseparator(d.quarterlyReports[0].cashflowFromInvestment);
    // var cashflowFromInvestment1 = commaseparator(d.quarterlyReports[1].cashflowFromInvestment);
    // var cashflowFromInvestment2 = commaseparator(d.quarterlyReports[2].cashflowFromInvestment);
    // var cashflowFromInvestment3 = commaseparator(d.quarterlyReports[3].cashflowFromInvestment);
    // var cashflowFromInvestment4 = commaseparator(d.quarterlyReports[4].cashflowFromInvestment);

    document.getElementById('cashflowFromInvestment0').innerHTML = cashflowFromInvestment0;
    document.getElementById('cashflowFromInvestment1').innerHTML = cashflowFromInvestment1;
    document.getElementById('cashflowFromInvestment2').innerHTML = cashflowFromInvestment2;
    document.getElementById('cashflowFromInvestment3').innerHTML = cashflowFromInvestment3;
    document.getElementById('cashflowFromInvestment4').innerHTML = cashflowFromInvestment4;


    // var cashflowFromFinancing0 = commaseparator(d.quarterlyReports[0].cashflowFromFinancing);
    // var cashflowFromFinancing1 = commaseparator(d.quarterlyReports[1].cashflowFromFinancing);
    // var cashflowFromFinancing2 = commaseparator(d.quarterlyReports[2].cashflowFromFinancing);
    // var cashflowFromFinancing3 = commaseparator(d.quarterlyReports[3].cashflowFromFinancing);
    // var cashflowFromFinancing4 = commaseparator(d.quarterlyReports[4].cashflowFromFinancing);

    document.getElementById('cashflowFromFinancing0').innerHTML = cashflowFromFinancing0;
    document.getElementById('cashflowFromFinancing1').innerHTML = cashflowFromFinancing1;
    document.getElementById('cashflowFromFinancing2').innerHTML = cashflowFromFinancing2;
    document.getElementById('cashflowFromFinancing3').innerHTML = cashflowFromFinancing3;
    document.getElementById('cashflowFromFinancing4').innerHTML = cashflowFromFinancing4;

    var proceedsFromRepaymentsOfShortTermDebt0 = commaseparator(d.quarterlyReports[0].proceedsFromRepaymentsOfShortTermDebt);
    var proceedsFromRepaymentsOfShortTermDebt1 = commaseparator(d.quarterlyReports[1].proceedsFromRepaymentsOfShortTermDebt);
    var proceedsFromRepaymentsOfShortTermDebt2 = commaseparator(d.quarterlyReports[2].proceedsFromRepaymentsOfShortTermDebt);
    var proceedsFromRepaymentsOfShortTermDebt3 = commaseparator(d.quarterlyReports[3].proceedsFromRepaymentsOfShortTermDebt);
    var proceedsFromRepaymentsOfShortTermDebt4 = commaseparator(d.quarterlyReports[4].proceedsFromRepaymentsOfShortTermDebt);

    document.getElementById('proceedsFromRepaymentsOfShortTermDebt0').innerHTML = proceedsFromRepaymentsOfShortTermDebt0;
    document.getElementById('proceedsFromRepaymentsOfShortTermDebt1').innerHTML = proceedsFromRepaymentsOfShortTermDebt1;
    document.getElementById('proceedsFromRepaymentsOfShortTermDebt2').innerHTML = proceedsFromRepaymentsOfShortTermDebt2;
    document.getElementById('proceedsFromRepaymentsOfShortTermDebt3').innerHTML = proceedsFromRepaymentsOfShortTermDebt3;
    document.getElementById('proceedsFromRepaymentsOfShortTermDebt4').innerHTML = proceedsFromRepaymentsOfShortTermDebt4;


    var paymentsForRepurchaseOfCommonStock0 = commaseparator(d.quarterlyReports[0].paymentsForRepurchaseOfCommonStock);
    var paymentsForRepurchaseOfCommonStock1 = commaseparator(d.quarterlyReports[1].paymentsForRepurchaseOfCommonStock);
    var paymentsForRepurchaseOfCommonStock2 = commaseparator(d.quarterlyReports[2].paymentsForRepurchaseOfCommonStock);
    var paymentsForRepurchaseOfCommonStock3 = commaseparator(d.quarterlyReports[3].paymentsForRepurchaseOfCommonStock);
    var paymentsForRepurchaseOfCommonStock4 = commaseparator(d.quarterlyReports[4].paymentsForRepurchaseOfCommonStock);

    document.getElementById('paymentsForRepurchaseOfCommonStock0').innerHTML = paymentsForRepurchaseOfCommonStock0;
    document.getElementById('paymentsForRepurchaseOfCommonStock1').innerHTML = paymentsForRepurchaseOfCommonStock1;
    document.getElementById('paymentsForRepurchaseOfCommonStock2').innerHTML = paymentsForRepurchaseOfCommonStock2;
    document.getElementById('paymentsForRepurchaseOfCommonStock3').innerHTML = paymentsForRepurchaseOfCommonStock3;
    document.getElementById('paymentsForRepurchaseOfCommonStock4').innerHTML = paymentsForRepurchaseOfCommonStock4;


    var paymentsForRepurchaseOfEquity0 = commaseparator(d.quarterlyReports[0].paymentsForRepurchaseOfEquity);
    var paymentsForRepurchaseOfEquity1 = commaseparator(d.quarterlyReports[1].paymentsForRepurchaseOfEquity);
    var paymentsForRepurchaseOfEquity2 = commaseparator(d.quarterlyReports[2].paymentsForRepurchaseOfEquity);
    var paymentsForRepurchaseOfEquity3 = commaseparator(d.quarterlyReports[3].paymentsForRepurchaseOfEquity);
    var paymentsForRepurchaseOfEquity4 = commaseparator(d.quarterlyReports[4].paymentsForRepurchaseOfEquity);

    document.getElementById('paymentsForRepurchaseOfEquity0').innerHTML = paymentsForRepurchaseOfEquity0;
    document.getElementById('paymentsForRepurchaseOfEquity1').innerHTML = paymentsForRepurchaseOfEquity1;
    document.getElementById('paymentsForRepurchaseOfEquity2').innerHTML = paymentsForRepurchaseOfEquity2;
    document.getElementById('paymentsForRepurchaseOfEquity3').innerHTML = paymentsForRepurchaseOfEquity3;
    document.getElementById('paymentsForRepurchaseOfEquity4').innerHTML = paymentsForRepurchaseOfEquity4;


    var paymentsForRepurchaseOfPreferredStock0 = commaseparator(d.quarterlyReports[0].paymentsForRepurchaseOfPreferredStock);
    var paymentsForRepurchaseOfPreferredStock1 = commaseparator(d.quarterlyReports[1].paymentsForRepurchaseOfPreferredStock);
    var paymentsForRepurchaseOfPreferredStock2 = commaseparator(d.quarterlyReports[2].paymentsForRepurchaseOfPreferredStock);
    var paymentsForRepurchaseOfPreferredStock3 = commaseparator(d.quarterlyReports[3].paymentsForRepurchaseOfPreferredStock);
    var paymentsForRepurchaseOfPreferredStock4 = commaseparator(d.quarterlyReports[4].paymentsForRepurchaseOfPreferredStock);

    document.getElementById('paymentsForRepurchaseOfPreferredStock0').innerHTML = paymentsForRepurchaseOfPreferredStock0;
    document.getElementById('paymentsForRepurchaseOfPreferredStock1').innerHTML = paymentsForRepurchaseOfPreferredStock1;
    document.getElementById('paymentsForRepurchaseOfPreferredStock2').innerHTML = paymentsForRepurchaseOfPreferredStock2;
    document.getElementById('paymentsForRepurchaseOfPreferredStock3').innerHTML = paymentsForRepurchaseOfPreferredStock3;
    document.getElementById('paymentsForRepurchaseOfPreferredStock4').innerHTML = paymentsForRepurchaseOfPreferredStock4;

    var dividendPayout0 = commaseparator(d.quarterlyReports[0].dividendPayout);
    var dividendPayout1 = commaseparator(d.quarterlyReports[1].dividendPayout);
    var dividendPayout2 = commaseparator(d.quarterlyReports[2].dividendPayout);
    var dividendPayout3 = commaseparator(d.quarterlyReports[3].dividendPayout);
    var dividendPayout4 = commaseparator(d.quarterlyReports[4].dividendPayout);

    document.getElementById('dividendPayout0').innerHTML = dividendPayout0;
    document.getElementById('dividendPayout1').innerHTML = dividendPayout1;
    document.getElementById('dividendPayout2').innerHTML = dividendPayout2;
    document.getElementById('dividendPayout3').innerHTML = dividendPayout3;
    document.getElementById('dividendPayout4').innerHTML = dividendPayout4;


    var dividendPayoutCommonStock0 = commaseparator(d.quarterlyReports[0].dividendPayoutCommonStock);
    var dividendPayoutCommonStock1 = commaseparator(d.quarterlyReports[1].dividendPayoutCommonStock);
    var dividendPayoutCommonStock2 = commaseparator(d.quarterlyReports[2].dividendPayoutCommonStock);
    var dividendPayoutCommonStock3 = commaseparator(d.quarterlyReports[3].dividendPayoutCommonStock);
    var dividendPayoutCommonStock4 = commaseparator(d.quarterlyReports[4].dividendPayoutCommonStock);

    document.getElementById('dividendPayoutCommonStock0').innerHTML = dividendPayoutCommonStock0;
    document.getElementById('dividendPayoutCommonStock1').innerHTML = dividendPayoutCommonStock1;
    document.getElementById('dividendPayoutCommonStock2').innerHTML = dividendPayoutCommonStock2;
    document.getElementById('dividendPayoutCommonStock3').innerHTML = dividendPayoutCommonStock3;
    document.getElementById('dividendPayoutCommonStock4').innerHTML = dividendPayoutCommonStock4;


    var dividendPayoutPreferredStock0 = commaseparator(d.quarterlyReports[0].dividendPayoutPreferredStock);
    var dividendPayoutPreferredStock1 = commaseparator(d.quarterlyReports[1].dividendPayoutPreferredStock);
    var dividendPayoutPreferredStock2 = commaseparator(d.quarterlyReports[2].dividendPayoutPreferredStock);
    var dividendPayoutPreferredStock3 = commaseparator(d.quarterlyReports[3].dividendPayoutPreferredStock);
    var dividendPayoutPreferredStock4 = commaseparator(d.quarterlyReports[4].dividendPayoutPreferredStock);

    document.getElementById('dividendPayoutPreferredStock0').innerHTML = dividendPayoutPreferredStock0;
    document.getElementById('dividendPayoutPreferredStock1').innerHTML = dividendPayoutPreferredStock1;
    document.getElementById('dividendPayoutPreferredStock2').innerHTML = dividendPayoutPreferredStock2;
    document.getElementById('dividendPayoutPreferredStock3').innerHTML = dividendPayoutPreferredStock3;
    document.getElementById('dividendPayoutPreferredStock4').innerHTML = dividendPayoutPreferredStock4;


    var proceedsFromIssuanceOfCommonStock0 = commaseparator(d.quarterlyReports[0].proceedsFromIssuanceOfCommonStock);
    var proceedsFromIssuanceOfCommonStock1 = commaseparator(d.quarterlyReports[1].proceedsFromIssuanceOfCommonStock);
    var proceedsFromIssuanceOfCommonStock2 = commaseparator(d.quarterlyReports[2].proceedsFromIssuanceOfCommonStock);
    var proceedsFromIssuanceOfCommonStock3 = commaseparator(d.quarterlyReports[3].proceedsFromIssuanceOfCommonStock);
    var proceedsFromIssuanceOfCommonStock4 = commaseparator(d.quarterlyReports[4].proceedsFromIssuanceOfCommonStock);

    document.getElementById('proceedsFromIssuanceOfCommonStock0').innerHTML = proceedsFromIssuanceOfCommonStock0;
    document.getElementById('proceedsFromIssuanceOfCommonStock1').innerHTML = proceedsFromIssuanceOfCommonStock1;
    document.getElementById('proceedsFromIssuanceOfCommonStock2').innerHTML = proceedsFromIssuanceOfCommonStock2;
    document.getElementById('proceedsFromIssuanceOfCommonStock3').innerHTML = proceedsFromIssuanceOfCommonStock3;
    document.getElementById('proceedsFromIssuanceOfCommonStock4').innerHTML = proceedsFromIssuanceOfCommonStock4;

    var proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet0 = commaseparator(d.quarterlyReports[0].proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet);
    var proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet1 = commaseparator(d.quarterlyReports[1].proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet);
    var proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet2 = commaseparator(d.quarterlyReports[2].proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet);
    var proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet3 = commaseparator(d.quarterlyReports[3].proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet);
    var proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet4 = commaseparator(d.quarterlyReports[4].proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet);

    document.getElementById('proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet0').innerHTML = proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet0;
    document.getElementById('proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet1').innerHTML = proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet1;
    document.getElementById('proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet2').innerHTML = proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet2;
    document.getElementById('proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet3').innerHTML = proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet3;
    document.getElementById('proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet4').innerHTML = proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet4;


    var proceedsFromIssuanceOfPreferredStock0 = commaseparator(d.quarterlyReports[0].proceedsFromIssuanceOfPreferredStock);
    var proceedsFromIssuanceOfPreferredStock1 = commaseparator(d.quarterlyReports[1].proceedsFromIssuanceOfPreferredStock);
    var proceedsFromIssuanceOfPreferredStock2 = commaseparator(d.quarterlyReports[2].proceedsFromIssuanceOfPreferredStock);
    var proceedsFromIssuanceOfPreferredStock3 = commaseparator(d.quarterlyReports[3].proceedsFromIssuanceOfPreferredStock);
    var proceedsFromIssuanceOfPreferredStock4 = commaseparator(d.quarterlyReports[4].proceedsFromIssuanceOfPreferredStock);

    document.getElementById('proceedsFromIssuanceOfPreferredStock0').innerHTML = proceedsFromIssuanceOfPreferredStock0;
    document.getElementById('proceedsFromIssuanceOfPreferredStock1').innerHTML = proceedsFromIssuanceOfPreferredStock1;
    document.getElementById('proceedsFromIssuanceOfPreferredStock2').innerHTML = proceedsFromIssuanceOfPreferredStock2;
    document.getElementById('proceedsFromIssuanceOfPreferredStock3').innerHTML = proceedsFromIssuanceOfPreferredStock3;
    document.getElementById('proceedsFromIssuanceOfPreferredStock4').innerHTML = proceedsFromIssuanceOfPreferredStock4;


    var proceedsFromRepurchaseOfEquity0 = commaseparator(d.quarterlyReports[0].proceedsFromRepurchaseOfEquity);
    var proceedsFromRepurchaseOfEquity1 = commaseparator(d.quarterlyReports[1].proceedsFromRepurchaseOfEquity);
    var proceedsFromRepurchaseOfEquity2 = commaseparator(d.quarterlyReports[2].proceedsFromRepurchaseOfEquity);
    var proceedsFromRepurchaseOfEquity3 = commaseparator(d.quarterlyReports[3].proceedsFromRepurchaseOfEquity);
    var proceedsFromRepurchaseOfEquity4 = commaseparator(d.quarterlyReports[4].proceedsFromRepurchaseOfEquity);

    document.getElementById('proceedsFromRepurchaseOfEquity0').innerHTML = proceedsFromRepurchaseOfEquity0;
    document.getElementById('proceedsFromRepurchaseOfEquity1').innerHTML = proceedsFromRepurchaseOfEquity1;
    document.getElementById('proceedsFromRepurchaseOfEquity2').innerHTML = proceedsFromRepurchaseOfEquity2;
    document.getElementById('proceedsFromRepurchaseOfEquity3').innerHTML = proceedsFromRepurchaseOfEquity3;
    document.getElementById('proceedsFromRepurchaseOfEquity4').innerHTML = proceedsFromRepurchaseOfEquity4;


    var proceedsFromSaleOfTreasuryStock0 = commaseparator(d.quarterlyReports[0].proceedsFromSaleOfTreasuryStock);
    var proceedsFromSaleOfTreasuryStock1 = commaseparator(d.quarterlyReports[1].proceedsFromSaleOfTreasuryStock);
    var proceedsFromSaleOfTreasuryStock2 = commaseparator(d.quarterlyReports[2].proceedsFromSaleOfTreasuryStock);
    var proceedsFromSaleOfTreasuryStock3 = commaseparator(d.quarterlyReports[3].proceedsFromSaleOfTreasuryStock);
    var proceedsFromSaleOfTreasuryStock4 = commaseparator(d.quarterlyReports[4].proceedsFromSaleOfTreasuryStock);

    document.getElementById('proceedsFromSaleOfTreasuryStock0').innerHTML = proceedsFromSaleOfTreasuryStock0;
    document.getElementById('proceedsFromSaleOfTreasuryStock1').innerHTML = proceedsFromSaleOfTreasuryStock1;
    document.getElementById('proceedsFromSaleOfTreasuryStock2').innerHTML = proceedsFromSaleOfTreasuryStock2;
    document.getElementById('proceedsFromSaleOfTreasuryStock3').innerHTML = proceedsFromSaleOfTreasuryStock3;
    document.getElementById('proceedsFromSaleOfTreasuryStock4').innerHTML = proceedsFromSaleOfTreasuryStock4;

    var changeInCashAndCashEquivalents0 = commaseparator(d.quarterlyReports[0].changeInCashAndCashEquivalents);
    var changeInCashAndCashEquivalents1 = commaseparator(d.quarterlyReports[1].changeInCashAndCashEquivalents);
    var changeInCashAndCashEquivalents2 = commaseparator(d.quarterlyReports[2].changeInCashAndCashEquivalents);
    var changeInCashAndCashEquivalents3 = commaseparator(d.quarterlyReports[3].changeInCashAndCashEquivalents);
    var changeInCashAndCashEquivalents4 = commaseparator(d.quarterlyReports[4].changeInCashAndCashEquivalents);

    document.getElementById('changeInCashAndCashEquivalents0').innerHTML = changeInCashAndCashEquivalents0;
    document.getElementById('changeInCashAndCashEquivalents1').innerHTML = changeInCashAndCashEquivalents1;
    document.getElementById('changeInCashAndCashEquivalents2').innerHTML = changeInCashAndCashEquivalents2;
    document.getElementById('changeInCashAndCashEquivalents3').innerHTML = changeInCashAndCashEquivalents3;
    document.getElementById('changeInCashAndCashEquivalents4').innerHTML = changeInCashAndCashEquivalents4;


    var changeInExchangeRate0 = commaseparator(d.quarterlyReports[0].changeInExchangeRate);
    var changeInExchangeRate1 = commaseparator(d.quarterlyReports[1].changeInExchangeRate);
    var changeInExchangeRate2 = commaseparator(d.quarterlyReports[2].changeInExchangeRate);
    var changeInExchangeRate3 = commaseparator(d.quarterlyReports[3].changeInExchangeRate);
    var changeInExchangeRate4 = commaseparator(d.quarterlyReports[4].changeInExchangeRate);

    document.getElementById('changeInExchangeRate0').innerHTML = changeInExchangeRate0;
    document.getElementById('changeInExchangeRate1').innerHTML = changeInExchangeRate1;
    document.getElementById('changeInExchangeRate2').innerHTML = changeInExchangeRate2;
    document.getElementById('changeInExchangeRate3').innerHTML = changeInExchangeRate3;
    document.getElementById('changeInExchangeRate4').innerHTML = changeInExchangeRate4;


    var netIncome_cash0 = commaseparator(d.quarterlyReports[0].netIncome);
    var netIncome_cash1 = commaseparator(d.quarterlyReports[1].netIncome);
    var netIncome_cash2 = commaseparator(d.quarterlyReports[2].netIncome);
    var netIncome_cash3 = commaseparator(d.quarterlyReports[3].netIncome);
    var netIncome_cash4 = commaseparator(d.quarterlyReports[4].netIncome);

    document.getElementById('netIncome_cash0').innerHTML = netIncome_cash0;
    document.getElementById('netIncome_cash1').innerHTML = netIncome_cash1;
    document.getElementById('netIncome_cash2').innerHTML = netIncome_cash2;
    document.getElementById('netIncome_cash3').innerHTML = netIncome_cash3;
    document.getElementById('netIncome_cash4').innerHTML = netIncome_cash4;

    }
cashflow_chart.send();
}

  function commaseparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//}