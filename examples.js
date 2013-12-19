var express = require('express'),
	Valid8r = require('./lib/valid8r.js'), 
	port = 3737,
	app;

app = express();

// so we can read POST vars
app.use(express.bodyParser()); 

// serve static resources
app.use(express["static"](__dirname + '/static'));

// set our views path
app.set('views', __dirname + '/views');

// setup the view engine to use jade
app.set('view engine','jade');

// render the kitchen sink page for GET requests
app.get('/kitchen-sink', function(req, res){
	res.render('index', {data:{}})
});

// handle POST requests for the kitchen sink
app.post('/kitchen-sink', function(req, res){
	
	// We will output to the console here for example's sake 
	// you may want to watch your console as you post test data.
	
	// read in the config 
	var rules = require('./form_configs/kitchen-sink.json');
	
	var errors = {}
	var num_errors = 0;
	
	// instantiate a new validator
	v = new Valid8r({
		rules: rules,
		data: req.body,
		customValidators: {
			customValidator: require('./customValidator'),
			anotherCustomValidator: function(field, error) {
				return (field != 'someCustomValue') ? 'Please enter ...' : ''
			}
		}
	})
	errors = v.validateAll()
	console.log(errors)

	res.render('kitchen-sink', {data:req.body, errors:errors})
	
});

app.listen(port);
console.log('Listening on port %s', port);
