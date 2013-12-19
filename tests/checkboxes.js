var Valid8r = require("../lib/valid8r.js")
var assert = require("assert")

var v = new Valid8r({
	rules: {
		checks_test: {
			rules:[
				{rule:"checks", min: 2, max:4}
			]
		}
	}
});

describe('Valid8r Checkboxes & Radios', function(){

	describe('min checked', function(){
		it('should return an error when less than rule.min options are checked.', function(){
			var err = v.validate("checks_test", Array('1'));
			if (!err) throw new Error('Min Checked Rule Failed');
			
			
		})
		it('should return a blank string when rule.min options are checked', function(){
			var err = v.validate("checks_test", Array('1','2'));
			if (err) throw new Error(err);
		});
	});

	describe('max checked', function(){
		it('should return an error when more than rule.max options are checked', function(){
			var err = v.validate("checks_test", Array('1','2','3','4','5'));
			if (!err) throw new Error('Max Val Rule Failed');
		});
		it('should return a blank string when rule.max options are checked', function(){
			var err = v.validate("checks_test", Array('1','2','3','3')); 
			if (err) throw new Error(err);
			
		});
	});
	describe('min/max checked', function(){
		it('should return a blank string when between rule.min and rule.max options are checked', function(){
			var err = v.validate("checks_test", Array('1','2','3'))
			if (err) throw new Error(err);
		});
	});
});
