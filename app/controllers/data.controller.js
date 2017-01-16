var express = require('express');
var router = express.Router();
var data = require('../data/data.json');

module.exports = function (app) {
  app.use('/data', router);
};

router.get('/', function (req, res, next) {
  res.send(200, data);
});