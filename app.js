var express = require('express');
var app = express();
var glob = require('glob');

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

var controllers = glob.sync('./app/controllers/*.js');
controllers.forEach(function (controller) {
    require(controller)(app);
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});