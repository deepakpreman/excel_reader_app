let express = require('express')
let bodyParser = require('body-parser');
let app = express();
var port = process.env.PORT || 7000;
let api_routes = require("./router/api.router")
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to excel reader backend'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running node server on port " + port);
});
// Use Api routes in the App
app.use('/', api_routes)
