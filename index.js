var express = require("express");
var bodyParser = require("body-parser");
const ngrok = require('ngrok');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || "localhost";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    if (req.body.queryResult.action == "suma") {
        let num1 = parseFloat(req.body.queryResult.parameters.num1);
        let num2 = parseFloat(req.body.queryResult.parameters.num2);
        let sum = num1 + num2;
        response = num1 + " + " + num2 + " el resultado es" + sum;
        res.json({
            "fulfillmentText": response
        });
    }
});

var server = require('http').Server(app);
 
var port = process.env.port || 3000;
server.listen(port, function (req, res) {
    console.log('Listening on port %d', server.address().port);
});

//app.listen(port, ip);

//(async function () {
//    const url = await ngrok.connect(port);
//    console.log(url);
//})();