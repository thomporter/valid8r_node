var Valid8r = require("../lib/valid8r.js")
var assert = require("assert")

var v = new Valid8r({
	_globalConditions: {
		do_validation: {
			'field' : 'doGlobalConditionalTest',
			'is': '1'
		},
		do_not_do_validation: {
			'field' : 'doNotDoGlobalConditionalTest',
			'is': '1'
		}
	},
	_rules: {
		do_conditional_test: {
			rules: [
				{rule:"required",when:"do_validation"}
			]
		},
		do_not_do_conditional_test: {
			rules: [
				{rule:"required",when:"do_not_do_validation"}
			]
		}
	}, data: {"doGlobalConditionalTest":"1","doNotDoGlobalConditionalTest":"0"}
});

describe('Valid8r Global Conditionals', function(){
	describe('positive conditional', function(){
		it('should return an error when condition is met and error exists', function(){
			v.validate("do_conditional_test", '', function(field, err) {
				if (!err) throw new Error('Conditional Validation Failed');
			})

		});
	});
	describe('negative condition', function(){
		it('should not return an error when condition is not met and error exists', function(){
			v.validate("do_not_do_conditional_test", '', function(field, err) {
				if (err) throw new Error('Conditional Validation Failed: ' + err);
			})

		});

	});
	
	
})
