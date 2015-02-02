'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var resolve = require('resolve');

var karma = require('karma').server;
var gulp = require(resolve.sync('gulp', { basedir: process.cwd() }));

module.exports = function (config) {

  // HACKS
  gulp.task('test', [config.name + ':test']);

  ////

  var test = config.test;
  gulp.task(config.name + ':test', function (cb) {
    karma.start({
      configFile: test.unit
    }, cb);
  });

/*
  gulp.task(options.name + ':karma', function (cb) {
    var argv = argv || [];
    var command = path.join(options.dirname, 'node_modules', 'karma', 'bin', 'karma');
    command += argv.length ? ' ' + argv.join(' ') : '';
    return spawn('sh', ['-c', command], { stdio: 'inherit' })
      .on('exit', cb) // TODO enhance error message here
      ;
  });
*/

};
