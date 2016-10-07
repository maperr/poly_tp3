var express = require('express');
var router = express.Router();

var data = require('../data/questions');

router.get('/exam', function(req, res, next) {
	res.json({"question": "une question?"});
});

router.get('/quicktest', function(req, res, next) {
	var index = Math.floor(Math.random() * 4) + 1;	
	
	// index [0,3] = CSS
	// index [4,7] = HTML
	// index [8,11] = JS
	if(req.query.domain == 'html') {
		index = index * 2;
	} else if (req.query.domain == 'js') {
		index = index * 3;
	}
	index = index - 1;

	res.json(data[index]);
});

module.exports = router;