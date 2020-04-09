var express = require("express");
var bodyParser = require("body-parser");
const ngrok = require('ngrok');
var request = require('request');
var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    if (req.body.queryResult.action == "suma") {
        let num1 = parseFloat(req.body.queryResult.parameters.num1);
        let num2 = parseFloat(req.body.queryResult.parameters.num2);
        let f = new Date();
        var options = {
        uri: 'http://localhost:1337/noticias',
        method: 'POST',
        json: {
        "titulo": num1,
        "fecha": f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
        "Noticia": num2
            }
        };

        resultado = request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(body.id) // Print the shortened url.
        
         }
        return body.id;
        }

        );

        console.log(resultado.body);

        let sum = num1 + num2;
        response = num1 + " + " + num2 + " el resultado es : " + sum + " ";
        res.json({
           "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    response + "datos de la operación " +resultado.body
                  ]
                }
              }
            ]
        });
    }
});

var server = require('http').Server(app);
 
//var port = process.env.port || 3000;
//server.listen(port, function (req, res) {
 //   console.log('Listening on port %d', server.address().port);
//});
app.listen(port, ip);

(async function () {
    const url = await ngrok.connect(port);
    console.log(url);
})();