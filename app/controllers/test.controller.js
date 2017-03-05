var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  _id: String,
  title: String,
  contents: String
}, {
  collection: 'test_collection'
});
var Test = mongoose.model('Test', Schema);



var asciidoctor = require('asciidoctor.js')();
var opal = asciidoctor.Opal;
var processor = null;
var useExtensions = true;
if (useExtensions) {
  processor = asciidoctor.Asciidoctor(true);
}
else {
  processor = asciidoctor.Asciidoctor();
}
var options = opal.hash2(
  ['doctype', 'attributes'],
  {doctype: 'inline', attributes: ['showtitle']});
// var html = processor.$convert(content, options);
// console.log(html);



module.exports = function (app) {
  app.use('/test', router);
};


var fileData = null;
fs.readFile('./app/controllers/bbc.adoc', { encoding: 'utf-8' }, function (err, data) {
  fileData = data;
});


router.get('/', function (req, res, next) {
  var save = new Test();
  save._id = 7;
  save.title = 'herop.io';
  save.contents = fileData;
  save.save(function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
});


router.get('/:id', function (req, res, next) {
  Test.findOne({_id: req.params.id}, function (err, row) {
    if (err) {
      return next(err);
    }
    if (row === null) {
      res.render('error');
    } else {
      res.render('test', {
        row: row
      });
    }
  });
});