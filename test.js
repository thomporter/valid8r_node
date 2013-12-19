Valid8r = require('./../dist/node/valid8r.js');


v = new Valid8r({
	rules: {
		min_len_test: {
			rules:[
				{rule:"len", min:5}
			]
		},
		max_len_test: {
			rules:[
				{rule:"len", max:5}
			]
		},
		min_max_len_test: {
			rules:[
				{rule:"len", min: 3, max:5}
			]
		},
		alpha_test: {
			rules:[
				{rule:"isAlpha"}
			]
		},
		num_test: {
			rules:[
				{rule:"isNum"}
			]
		},
		nonneg_num_test: {
			rules:[
				{rule:"isNum", nonNeg: true}
			]
		},
		alnum_test: {
			rules:[
				{rule:"isAlnum"}
			]
		},
		format_test: {
			rules:[
				{ rule:"formattedAs", "format":"DD/DD/DDDD" }
			]
		},
		checks_test: {
			rules:[
				{rule:"checks", min: 2, max:4}
			]
		}
	}
});


v.validate("checks_test", Array('1','2','3','3','3','3','3'), function(field, err) {
	console.log(field, err)
})