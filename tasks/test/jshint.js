'use strict';

var patch = require('path');

var resolve = require('resolve');
var gulp = require(resolve.sync('gulp', { basedir: process.cwd() }));

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function (config) {

  var test = config.test;
  var src = config.src;

  gulp.task(config.name + ':test/jshint', function () {
    return gulp.src(test.tests, { cwd: patch.join(src.cwd, test.cwd) })
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

};
