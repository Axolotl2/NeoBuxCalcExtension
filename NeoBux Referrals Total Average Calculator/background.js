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

function showReferralsAverage() {
	var table = document.getElementById("mnTb");
	var sum = 0.0;
	var referrals = 0;
	var lastRow;
	for (var i = 0, row; row = table.rows[i]; i++) {
		if ( row.className.includes("t") ){
			sum += parseFloat(row.cells[7].innerText);
			referrals++;
		} 
		lastRow = row;
	}
	var totalAverage = (sum / referrals);
	var outputText = "The total average for " + referrals + " referrals Is: " + totalAverage.toFixed(2);
	lastRow.cells[0].innerText = outputText;
	
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

chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showReferralsAverage
    });
  }
});
