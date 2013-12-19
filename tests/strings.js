var Valid8r = require("../lib/valid8r.js")
var assert = require("assert")

v = new Valid8r({
	rules: {
		len_test: {
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
		regex_test: {
			rules: [
				{"rule":"regex", pattern:"[A-z0-9.-]{2,7}", modifiers:"i"}
			]
		}
	}
});

describe('Valid8r Strings', function(){

	describe('len', function(){
		it('should return an error when the length of value is less than rule.min', function(){
			var err = v.validate("len_test", "a");
			if (!err) throw new Error('Min Length Rule Failed');

		})
		it('should return an error when the length of value is greater than rule.max', function(){
			var err = v.validate("len_test", "aaaaaa");
			if (!err) throw new Error('Max Length Rule Failed');
		});
		it('should return a blank string when the length of value is between rule.min and rule.max', function(){
			var err = v.validate("len_test", "aaaaa");
			if (err) throw new Error(err);
		});
	})
	describe('alpha', function(){
		it('should return an error when value contains non alphabetic characters.', function(){
			var err = v.validate("alpha_test", ".");
			if (!err) throw new Error('Alpha Rule Failed');

		})
		it('should return a blank string when value contains only alphabetic characters', function(){
			var err = v.validate("alpha_test", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
			if (err) throw new Error(err);
		});
	})
	describe('num', function(){
		it('should return an error when value contains non numeric characters', function(){
			var err = v.validate("num_test", "z");
			if (!err) throw new Error('Num Rule Failed');
		})
		it('should return a blank string when value contains only numeric characters', function(){
			var err = v.validate("num_test", "-1234567890");
				if (err) throw new Error(err);
		});
		it('should return an error when negative numbers given with rule.nonNeg=true', function(){
			var err = v.validate("nonneg_num_test", "-5");
				if (!err) throw new Error('Non-Negative Num Failed');
		});
		it('should return a blank string when a non-negative number is given with rule.nonNeg=true', function(){
			var err = v.validate("nonneg_num_test", "5");
				if (err) throw new Error(err);
		});

	})

	describe('alnum', function(){
		it('should return an error when value contains non alpha-numeric characters', function(){
			var err = v.validate("alnum_test", ".");
				if (!err) throw new Error('Alnum Rule Failed');

		})
		it('should return a blank string when value contains only alpha-numeric characters', function(){
			var err = v.validate("alnum_test", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
				if (err) throw new Error(err);
		});
	})

	describe('formatted_as', function(){
		it('should return an error when value does not match rule.format', function(){
			var err = v.validate("format_test", "99/99/999");
				if (!err) throw new Error('Formatted As DD/DD/DDDD Rule Failed');

		})
		it('should return a blank string when value matches rule.format', function(){
			var err = v.validate("format_test", "12/12/2012");
				if (err) throw new Error(err);
		});
	})
	describe('regex', function(){
		it('should return an error when value does not match rule.regex', function(){
			var err = v.validate("regex_test", "****");
				if (!err) throw new Error('Regex Rule Failed');

		})
		it('should return a blank string when value matches rule.regex', function(){
			var err = v.validate("regex_test", "abc");
				if (err) throw new Error(err);
		});
	})


})
