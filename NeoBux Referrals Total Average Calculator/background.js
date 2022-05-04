//function sort(){
//    window.location = '/c/rl/?vl=0E67B9D2FDAB3C88&sp=1&ss1=7&ss3=2&ss2=2';
//	//document.location.href='/c/rl/?vl=0E67B9D2FDAB3C88&sp=1&ss1=7&ss3=2&ss2=2'
//}
//
//window.onload = function() {
//    var hash = window.location.hash;
//    if (hash.length > 0)
//    {
//    var id = hash.replace('#id=','');
//	showReferralsAverageAndSort();
//    return document.id.outerHTML;
//    }  
//}
//
//function showReferralsSummary() {
//	
//	const getReferralsData = function() {
//		var table = document.getElementById("mnTb");
//		var sum = 0.0;
//		var referrals = 0;
//		var lastRow;
//		var totalProfit = 0.0;
//		var estimatedProfit = 0.0;
//		for (var i = 0, row; row = table.rows[i]; i++) {
//			if ( row.className.includes("t") ){
//				var clicks = parseFloat(row.cells[6].innerText)
//				var averageClicks = parseFloat(row.cells[7].innerText);
//				var daysRegex = /[^\s]*(?=\sdays)/g;
//				var days = parseFloat(row.cells[4].innerText.match(daysRegex)[0]);
//				sum += averageClicks;
//				console.log("i: " + i + "clicks: " + clicks + " days: " + days);
//				totalProfit += 0.005 * clicks;
//				estimatedProfit += days * 0.005 * averageClicks;
//				referrals++;
//			} 
//			lastRow = row;
//		}
//		var totalAverage = sum / referrals;
//	
//		return { referrals: referrals, totalAverage: totalAverage, dataRow: lastRow, totalProfit: totalProfit, estimatedProfit: estimatedProfit};
//	}
//	
//	const paintRow = function(lastRow, totalAverage) {
//		var min = document.getElementById("out1").value;
//		var max = document.getElementById("out2").value;
//		lastRow.cells[0].className = '';
//		
//		if ( totalAverage < min ) {
//			lastRow.cells[0].bgColor = 'red';
//		} else if ( totalAverage > max ) {
//			lastRow.cells[0].bgColor = 'green';
//		} else {
//		lastRow.cells[0].bgColor = 'yellow';
//		}
//	}
//	
//	
//	var refData = getReferralsData();
//	var outputText = "The total average for " + refData.referrals + " referrals Is: " + refData.totalAverage.toFixed(2) + "\nCurrent profit: " + refData.totalProfit.toFixed(2) + "$ estimated additional profit till end of lease: " + refData.estimatedProfit.toFixed(2) + "$";
//	refData.dataRow.cells[0].innerText = outputText;
//	
//	paintRow(refData.dataRow, refData.totalAverage);
//
//}
//
//chrome.action.onClicked.addListener((tab) => {
//  if(!tab.url.includes("chrome://")) {
//    chrome.scripting.executeScript({
//      target: { tabId: tab.id },
//      function: showReferralsSummary
//    });
//  }
//});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  if (tab.url.indexOf("https://www.neobux.com/c/rl/") > -1 && 
      changeInfo.url === undefined){
	//showReferralsSummary();
    chrome.tabs.executeScript(tabId, {file: "program.js"} );
  }
});

