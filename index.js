'use strict';

var path = require('path');
var merge = require('merge');

var resolve = require('resolve');
var pkg = require(resolve.sync('./package.json'));

module.exports = function () {

  var tasks = require('require-dir')('./tasks', { recurse: true });

  var machineryName = pkg.name;

  var config = merge.recursive({
      name: machineryName,
      dirname: __dirname,
      plumberErrorHandler: function () {},

      src: {
        cwd: 'src',
        dest: 'dist',
        tmp: '.tmp', // @todo .tmp/src breaks
        styles: '{,*/}*.{css,less,sass,scss}',
        scripts: '{,*/}*.js',
        templates: '{,*/}*.tpl.{html,jade}',
        packageFiles: '{bower,package}.json'
      },

      test: {
        cwd: 'test',
        dest: 'test',
        tmp: '.tmp',
        unit: path.resolve(__dirname, 'karma.conf.js'),
        coverage: 'coverage',
        tests: '{,*/}*{.spec,Spec}.js'
      }
    },
    this.config[machineryName]
  );

  var env = merge({
    log: {
      debug: function () {
        // TODO Test if verbose mode first
        console.log.apply(console, [].slice.call(arguments));
      }
    }
  }, this);

  values(tasks)
    .reduce(function (memo, subtasks) {
      return memo.concat(values(subtasks));
    }, [])
    .forEach(function (taskFunction) {
      taskFunction.call(env, config);
    });

};

function values(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}
