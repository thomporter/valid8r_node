var Valid8r = require("../lib/valid8r.js")
var assert = require("assert")

var v = new Valid8r({
	rules: {
		val_test: {
			rules:[
				{rule:"val", min: 3, max:5}
			]
		},
		val_outside_test: {
			rules:[
				{rule:"val", outside:[10,20]}
			]
		}
	}
});

describe('Valid8r Numbers', function(){

	describe('min val', function(){
		it('should return an error when value is less than rule.min', function(){
			var err = v.validate("val_test", "2");
			if (!err) throw new Error('Min Val Rule Failed');
		});
		it('should return a blank string if value is greater than or equal to rule.min', function(){
			var err = v.validate("val_test", "3");
			if (err) throw new Error(err);

		});
	});

	describe('max val', function(){
		it('should return an error when value is greater than rule.max', function(){
			var err = v.validate("val_test", "6");
			if (!err) throw new Error('Max Val Rule Failed');
		});
		it('should return a blank string if value is less than or equal to rule.max', function(){
			var err = v.validate("val_test", "4");
			if (err) throw new Error(err);
		});
	});

	describe('min/max val', function(){

		it('should return a blank string when the value is within rule.min and rule.max', function(){
			var err = v.validate("val_test", "4");
			if (err) throw new Error(err);
		});
	});

	describe('val outside', function(){

		it('should return an error when a number between 10 and 20', function(){
			var err = v.validate("val_outside_test", "15");
			if (!err) throw new Error('Val Outside Rule Failed');
		})

		it('should return blank when a number outside 10 and 20 is given.', function(){
			var err = v.validate("val_outside_test", "21");
			if (err) throw new Error(err);
		})

	})
})
