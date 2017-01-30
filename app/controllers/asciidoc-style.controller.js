var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/asciidoc', router);
};

router.get('/', function (req, res, next) {
  res.render('asciidoc_style', {
    title: 'asciidoc'
  });
});