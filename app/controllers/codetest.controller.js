var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  _id: String,
  language: String,
  level: String,
  question: String,
  example1: String,
  example2: String,
  example3: String,
  correctAnswer: Number
}, {
  collection: 'html_css'
});
var HtmlCss = mongoose.model('HTML_CSS', Schema);


module.exports = function (app) {
  app.use('/codetest', router);
};


// router.get('/', function (req, res, next) {
//   var save = new Test();
//   save._id = 7;
//   save.title = 'herop.io';
//   save.contents = fileData;
//   save.save(function (err) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });
// });


router.get('/:id', function (req, res, next) {
  var length = null;

  HtmlCss
    .find()
    .where('language')
    .equals('css')
    .exec(function (err, data) {
      console.log(data.length);
      length = data.length;
    });

  HtmlCss.findOne({_id: req.params.id}, function (err, document) {
    if (err) return next(err);

    if (document === null) {
      res.render('error');
    } else {
      res.render('codetest', {
        title: 'CODE TEST',
        row: document,
        length: length
      });
    }
  });
});