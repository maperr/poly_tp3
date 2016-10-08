function displayStatistics() {
	$(document).ready(function() 
	{
		var testCorrect = window.localStorage['stats.quicktests.correct'];
		var testTotal = window.localStorage['stats.quicktests.total'];
		$('#stats-quicktests').text(testCorrect + '/' + testTotal);

		var examCount = window.localStorage['stats.exams.count'];
		var examAverage = window.localStorage['stats.exams.average'];

		// var examTable = $('#stats-exams-table');
		var examTable = document.getElementById('stats-exams-table');
		for(var i = 0; i < examCount; i++) {
			var examCorrect = window.localStorage['stats.exams.' + i + '.correct'];
			var examTotal = window.localStorage['stats.exams.' + i + '.total'];

			var row = examTable.insertRow();

	        var examTitle = row.insertCell(0);
	        var examResult = row.insertCell(1);

	        examTitle.innerHTML = 'Examen #' + i;
	        examResult.innerHTML = examCorrect + '/' + examTotal;
		}

		var averageRow = examTable.insertRow();
		averageRow.setAttribute("class", "total");
		var averageTitle = averageRow.insertCell(0);
		var averageValue = averageRow.insertCell(1);

	    averageTitle.innerHTML = 'Moyenne';
	    averageValue.innerHTML = parseFloat(examAverage).toFixed(2) + '%';
	});
}

function saveResults(correct, total, domaine) {
	$(document).ready(function() 
	{
		if(window.localStorage['stats.exams.count'] == null) {
			initResults();
		}
		var percentage = correct / total;
		var count = window.localStorage['stats.exams.count'];
		var domainCount = window.localStorage['stats.exams.domain. ' + domaine + '.count'];

		window.localStorage['stats.exams.' + count + '.correct'] = correct;
		window.localStorage['stats.exams.' + count + '.total'] = total;
		window.localStorage['stats.exams.' + count + '.percentage'] = percentage;
		window.localStorage['stats.exams.' + count + '.domain'] = domaine;
		window.localStorage['stats.exams.count'] = ++count;
		window.localStorage['stats.exams.domain. ' + domaine + '.total'] = ++domainCount;
		
		if(percentage >= 0.5) {
			var domainPassed = window.localStorage['stats.exams.domain. ' + domaine + '.passed'];
			window.localStorage['stats.exams.domain. ' + domaine + '.passed'] = ++domainPassed;
		} 

		var percentageSum = 0;
		for(var i = 0; i < count; i++) {
			percentageSum += parseFloat(window.localStorage['stats.exams.' + i + '.percentage']);
		}
		var average = percentageSum / count;
		window.localStorage['stats.exams.average'] = average;
	});
}

function initResults() {
	window.localStorage['stats.exams.count'] = 0;
	window.localStorage['stats.exams.domain.css.total'] = 0;
	window.localStorage['stats.exams.domain.html.total'] = 0;
	window.localStorage['stats.exams.domain.js.total'] = 0;
	window.localStorage['stats.exams.domain.css.passed'] = 0;
	window.localStorage['stats.exams.domain.html.passed'] = 0;
	window.localStorage['stats.exams.domain.js.passed'] = 0;
}