function showReferralsSummary() {
	
	const getReferralsData = function() {
		var table = document.getElementById("mnTb");
		var sum = 0.0;
		var referrals = 0;
		var lastRow;
		var totalProfit = 0.0;
		var estimatedProfit = 0.0;
		for (var i = 0, row; row = table.rows[i]; i++) {
			if ( row.className.includes("t") ){
				var clicks = parseFloat(row.cells[6].innerText)
				var averageClicks = parseFloat(row.cells[7].innerText);
				var daysRegex = /[^\s]*(?=\sdays)/g;
				var days = parseFloat(row.cells[4].innerText.match(daysRegex)[0]);
				if (!Number.isNaN(averageClicks)) {
					sum += averageClicks;
					
					if (!Number.isNaN(days)) {
						estimatedProfit += days * 0.005 * averageClicks;
					}
				}
				
				if (!Number.isNaN(clicks)) {
					totalProfit += 0.005 * clicks;
				}
				referrals++;
			} 
			lastRow = row;
		}
		var totalAverage = sum / referrals;
		var referralsCost = referrals * 0.2;
	
		return { referrals: referrals, referralsCost: referralsCost, totalAverage: totalAverage, dataRow: lastRow, totalProfit: totalProfit, estimatedProfit: estimatedProfit};
	}
	
	const paintRow = function(lastRow, totalAverage) {
		var min = document.getElementById("out1").value;
		var max = document.getElementById("out2").value;
		lastRow.cells[0].className = '';
		
		if ( totalAverage < min ) {
			lastRow.cells[0].bgColor = 'red';
		} else if ( totalAverage > max ) {
			lastRow.cells[0].bgColor = 'green';
		} else {
		lastRow.cells[0].bgColor = 'yellow';
		}
	}
	
	
	var refData = getReferralsData();
	var outputText = "The total average for " + refData.referrals + " referrals Is: " + refData.totalAverage.toFixed(2) + " clicks." + 
	"\nCurrent profit: " + refData.totalProfit.toFixed(2) + "$, estimated additional profit till end of lease: " + refData.estimatedProfit.toFixed(2) + "$" +
	"\nThe base cost for " + refData.referrals + " referrals Is: " + refData.referralsCost.toFixed(2) + "$";
	refData.dataRow.cells[0].innerText = outputText;
	
	paintRow(refData.dataRow, refData.totalAverage);

}

showReferralsSummary();