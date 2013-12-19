var Valid8r = require("../lib/valid8r.js")
var assert = require("assert")

var v = new Valid8r({
	rules: {
		email_test: {
			rules:[
				{rule:"email"}
			]
		},
		email_rfc5322_test: {
			rules:[
				{rule:"email", validator: 'rfc5322'}
			]
		},
		url_test: {
			rules:[
				{rule:"url"}
			]
		}
	}
});

describe('Valid8r Special Validators', function(){

	describe('email', function(){
		it('should return an error when email is: bob@no.c', function(){
			var err = v.validate("email_test", 'bob@no.c');
			if (!err) throw new Error('Email Rule Failed');
		});
		it('should return an error when email is: .bob@no.com', function(){
			var err = v.validate("email_test", '.bob@no.com')
			if (!err) throw new Error('Email Rule Failed');
		});
		
		it('should return a blank string when a valid email is given', function(){
			var err = v.validate("email_test", 'elvis@presley.com');
			if (err) throw new Error(err);
		});
		it('should return a blank string when email is: JohnDoe@gmail.com', function(){
			var err = v.validate("email_test", 'JohnDoe@gmail.com')
			if (err) throw new Error(err);
		});
	});
	
	
	describe('url', function(){
		it('should return an error when an invalid URL is given', function(){
			var err = v.validate('url_test', 'abc.com')
			if (!err) throw new Error('Url Rule Failed');
		});
		
		it('should return a blank string when a valid url is given', function(){
			var err = v.validate("url_test", 'http://thomporter.com')
			if (err) throw new Error(err);
		});
	});
	
});
