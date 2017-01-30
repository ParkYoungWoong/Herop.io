var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/curriculum', router);
};

router.get('/basic', function (req, res, next) {
  res.render('curriculum_basic', {
    title: 'BASIC CURRICULUM'
  });
});

router.get('/advanced', function (req, res, next) {
  res.render('curriculum_basic', {
    title: 'ADVANCED CURRICULUM'
  });
});