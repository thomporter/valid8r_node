![Valid8r - Validation for multiple programming languages.](https://raw.github.com/thomporter/valid8r/master/logo.png)

# Valid8r for Node

Valid8r is a validation library for multiple programming languages using a common
JSON configuration file. Learn more about Valid8r and the configuration file
at:

https://github.com/thomporter/valid8r

## Installation

Either add the module as a dependency to your project or install it manually:

	 npm install valid8r_node

## Examples

There is an Express app that will serve up the Kitchen Sink using a Jade 
template.  You can check them out by cloning this repo and running the npm 
commands:

	git clone https://github.com/thomporter/valid8r_node
	cd valid8r_node
	npm install
	npm start

Here's a quick idea of how it works in node:

	var Valid8r = require('./lib/valid8r.js');
	config = {
	  rules: require('./form_configs/kitchen-sink.json'),
	  data: req.body
	}
	v = new Valid8r(config)
    errors = v.validateAll()
    // errors looks like: { field: error, field2: error }
    // fields w/ no errors do not exist in the object.
    

## Custom Validators

Custom validators must be placed on the special `customValidators` property
of the Valid8r configuration object.  You can define functions inline, 
or use require statements: 

	config = {
	  rules: require('./form_configs/kitchen-sink.json'),
	  data: req.body,
	  customValidators: {
	    customValidator: require('./customValidator'),
	    anotherCustomValidator: function(field, error) {
	    return (field != 'someCustomValue') ? 'Please try again.' : ''
	    }
	  }
	}

## Tests

Mocha tests are included in the repo.  You can run them with `npm test`.