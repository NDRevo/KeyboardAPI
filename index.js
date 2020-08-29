var express     = require('express');
var favicon     = require('serve-favicon');
var path        = require('path');

const fs        = require('fs');
const keebdataFiles = fs.readdirSync('./methods').filter(file => file.endsWith('.js'));

//Initiation
var bodyParser = require('body-parser');
var app = express();
const router = express.Router();
var path = require('path');

//Sets favicon and json
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

//Allows to navigate to other data points
app.use('/', router);
app.listen(port); //Listening on port
console.log("Keyboard API Online")

router.get('/', function (req, res) {
    //Path.join because sendFile requires an absolute path and/or set root in config object
    res.sendFile(path.join(__dirname + '/website/homepage.html'))
 
});


//Redirects to readme 
router.get('/kbapi/doc', function (req, res) {
    res.redirect('https://keyboardapi.readme.io/reference');
});
router.get('/commissions', function (req, res) {
    res.redirect('https://docs.google.com/forms/d/e/1FAIpQLScJGyq6MxgXIDrVbWpyUHE9CgbuhzAOAMlErIKI1cWptXwsbQ/viewform?usp=sf_link');
});

//Finds file and runs the file given the name of the data the user wants (Ex. Switches)
router.use(function (req, res, next) {
    app.use('/kbapi', router);
    var dataFile = keebdataFiles.find(data => data.includes(req.url.substr(7, 10)))
    console.log(dataFile)
    console.log(req.url.substr(7, 8))
    var runKeebFile = require("./methods/" + dataFile); //Gets the correct data file path 
    
    runKeebFile.execute(router); // Executes code in file and passes router
    next() //calls next middleware in the application.
});