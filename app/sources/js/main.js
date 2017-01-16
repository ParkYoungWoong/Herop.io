'use strict';
$(function () {
  $.ajax({
    url: '/data/',
    dataType: 'json',
    success: function (data) {
      var questionNum = 1;
      $('.question-num').text(questionNum);
      $('p').text(data[questionNum].question);
      $('ol li').each(function (index) {
        $(this).text(index + 1 + ') ' + data[questionNum].examples[index]);
      });
      $('.answer span').text(data[questionNum].correctAnswer);
    }
  });
});