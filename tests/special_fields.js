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
		},
		ip_test: {
			rules: [
				{rule:"ip"}
			]
		},
		ipv4_test: {
			rules: [
				{rule:"ip",v:4}
			]
		},
		ipv6_test: {
			rules: [
				{rule:"ip",v:6}
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
	
	describe('ip', function(){
		
		it('should not return an error when a valid IPv4 or IPv6 is given', function(){
			var err = v.validate('ip_test', '5.5.5.5')
			if (err) throw new Error('IP Rule Failed - error given w/ valid IPv4');
			var err = v.validate('ip_test', 'fe80:0000:0000:0000:0204:61ff:fe9d:f156')
			if (err) throw new Error('IP Rule Failed - error given w/ valid IPv6');
		});
		it('should return an error when a invalid IPv4 or IPv6 is given', function(){
			var err = v.validate('ip_test', '256.5.5.5')
			if (!err) throw new Error('IP Rule Failed - no error given w/ invalid IPv4');
			var err = v.validate('ip_test', 'xe80:0000:0000:0000:0204:61ff:fe9d:f156')
			if (!err) throw new Error('IP Rule Failed - no error given w/ invalid IPv6');
		});
	});
	
	describe('ipv4', function(){
		it('should return an error when an invalid IPv4 is given', function(){
			var err = v.validate('ipv4_test', '256.5.5.5')
			if (!err) throw new Error('IPv4 Rule Failed');
		});
		it('should return an error when an IPv6 is given for IPv4', function(){
			var err = v.validate('ipv4_test', 'fe80:0000:0000:0000:0204:61ff:fe9d:f156')
			if (!err) throw new Error('IPv4 Rule Failed');
		});
		it('should not return an error when a valid IPv4 is given', function(){
			var err = v.validate('ipv4_test', '255.5.5.5')
			if (err) throw new Error('IPv4 Rule Failed - detected error in good IP');
		});


	});

	describe('ipv6', function(){
		it('should return an error when an IPv4 is given for IPv6', function(){
			var err = v.validate('ipv6_test', '5.5.5.5')
			if (!err) throw new Error('IPv6 Rule Failed');
		});
		it('should return an error when an invalid IPv6 is given', function(){
			var err = v.validate('ipv6_test', 'xe80:0000:0000:0000:0204:61ff:fe9d:f156')
			if (!err) throw new Error('IPv6 Rule Failed');
		});

		it('should not return an error when a valid IPv6 is given', function(){
			var err = v.validate('ipv6_test', 'fe80:0000:0000:0000:0204:61ff:fe9d:f156')
			if (err) throw new Error('IPv6 Rule Failed - detected error in good IPv6');
		});

	});
});
