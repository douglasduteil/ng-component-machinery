'use strict';

var resolve = require('resolve');
var gulp = require(resolve.sync('gulp', { basedir: process.cwd() }));

var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');
var ngAnnotate = require('gulp-ng-annotate');

module.exports = function(config) {

  // HACKS
  gulp.task('ng:src/scripts', [config.name + ':src/scripts']);
  gulp.task('ng:dist/scripts', [config.name + ':dist/scripts']);

  var src = config.src;
  gulp.task(config.name + ':src/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.scripts.src(config))
      ;
  });

  gulp.task(config.name + ':dist/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.scripts.dist(config));
  });

};
