function displayStatistics(modal) {
	$(document).ready(function() 
	{
		if(window.localStorage['stats.exams.count'] == null) {
			initResults();
		}

		var testCorrect = window.localStorage['stats.quicktests.correct'];
		var testTotal = window.localStorage['stats.quicktests.total'];

		var examCount = window.localStorage['stats.exams.count'];
		var examAverage = window.localStorage['stats.exams.average'];

		var examCssTotal = window.localStorage['stats.exams.domain.css.total'];
		var examCssPassed = window.localStorage['stats.exams.domain.css.passed'];

		var examJsTotal = window.localStorage['stats.exams.domain.js.total'];
		var examJsPassed = window.localStorage['stats.exams.domain.js.passed'];

		var examHtmlTotal = window.localStorage['stats.exams.domain.html.total'];
		var examHtmlPassed = window.localStorage['stats.exams.domain.html.passed'];

		$('#stats-quicktests').text(testCorrect + '/' + testTotal);
		$('#stats-exams-average').text(parseFloat(examAverage).toFixed(2) * 100 + '%');
		$('#stats-exams-css').text(examCssPassed + '/' + examCssTotal);
		$('#stats-exams-js').text(examJsPassed + '/' + examJsTotal);
		$('#stats-exams-html').text(examHtmlPassed + '/' + examHtmlTotal);

		if (modal) {
			$('#modal-quicktests').text(testCorrect + '/' + testTotal);
			$('#modal-exams-average').text(parseFloat(examAverage).toFixed(2) * 100 + '%');
			$('#modal-exams-css').text(examCssPassed + '/' + examCssTotal);
			$('#modal-exams-js').text(examJsPassed + '/' + examJsTotal);
			$('#modal-exams-html').text(examHtmlPassed + '/' + examHtmlTotal);
		}
	});
}

function displayDetails() {
	$(document).ready(function() 
	{
		var examCount = window.localStorage['stats.exams.count'];

		var examTable = document.getElementById('details-exams-table');
		for(var i = 0; i < examCount; i++) {
			var examCorrect = window.localStorage['stats.exams.' + i + '.correct'];
			var examTotal = window.localStorage['stats.exams.' + i + '.total'];
			var examDomain = window.localStorage['stats.exams.' + i + '.domain'];
			var row = examTable.insertRow();

	        var examTitle = row.insertCell(0);
	        var examResult = row.insertCell(1);

	        examTitle.innerHTML = 'Examen #' + i + ' - ' + examDomain;
	        examResult.innerHTML = examCorrect + '/' + examTotal;
		}
	});
}

function saveResults(correct, total, domaine) {
	$(document).ready(function() 
	{
		var percentage = correct / total;
		var count = window.localStorage['stats.exams.count'];
		var domainTotal = window.localStorage['stats.exams.domain.' + domaine + '.total'];

		window.localStorage['stats.exams.' + count + '.correct'] = correct;
		window.localStorage['stats.exams.' + count + '.total'] = total;
		window.localStorage['stats.exams.' + count + '.percentage'] = percentage;
		window.localStorage['stats.exams.' + count + '.domain'] = domaine;
		window.localStorage['stats.exams.count'] = ++count;
		window.localStorage['stats.exams.domain.' + domaine + '.total'] = ++domainTotal;
		
		if(percentage >= 0.5) {
			var domainPassed = window.localStorage['stats.exams.domain.' + domaine + '.passed'];
			window.localStorage['stats.exams.domain.' + domaine + '.passed'] = ++domainPassed;
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
	window.localStorage['stats.quicktests.correct'] = 0;
	window.localStorage['stats.quicktests.total'] = 0;
	window.localStorage['stats.exams.average'] = 0;
}