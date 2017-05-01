var path = require('path')
var glob = require('glob')
var express = require('express')
var exphbs = require('express-handlebars');
var app = express()

rootPath = path.normalize(__dirname + '/')

var hbs = exphbs.create({
  layoutsDir: rootPath + '/views/layouts/',
  defaultLayout: 'main',
  partialsDir: [rootPath + '/views/partials/']
});

app.engine('handlebars', hbs.engine);
app.set('views', rootPath + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(rootPath + '/public'));
var controllers = glob.sync(rootPath + '/controllers/*.js');
controllers.forEach(function (controller) {
  require(controller)(app);
});

app.listen(3000, function () {
  console.log('Express server listening on port 3000');
});

module.exports = app
