'use strict';

var resolve = require('resolve');
var gulp = require(resolve.sync('gulp', { basedir: process.cwd() }));

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function (config) {

  var src = config.src;
  var test = config.test;

  gulp.task(config.name + ':src/jshint', function () {
    return gulp.src([src.scripts, '!' + test.tests], { cwd: src.cwd })
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

};
