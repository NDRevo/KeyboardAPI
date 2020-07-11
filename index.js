var express     = require('express');
var favicon     = require('serve-favicon');
var path        = require('path');
const fs        = require('fs');
const switches  = require('/home/ubuntu/Documents/keyboardapi/data/switches.json')
const keebdataFiles = fs.readdirSync('./methods').filter(file => file.endsWith('.js'));

//Initiation
var bodyParser = require('body-parser');
var app = express();
const router = express.Router();

//Sets favicon and json
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

//Redirects to readme 
router.get('/', function (req, res) {
    res.redirect('https://keyboardapi.readme.io/reference');
});

//Allows to navigate to other data points
app.use('/', router);
app.listen(port); //Listening on port
console.log("Keyboard API Online")


//Finds file and runs the file given the name of the data the user wants (Ex. Switches)
router.use(function (req, res, next) {

    var dataFile = keebdataFiles.find(data => data.includes(req.url.substr(1, 3)))

    var runKeebFile = require("./methods/" + dataFile); //Gets the correct data file path 


    runKeebFile.execute(router); // Executes code in file and passes router
    next() //calls next middleware in the application.
});