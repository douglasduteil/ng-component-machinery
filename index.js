'use strict';

var extend = require('util')._extend;
var resolve = require('resolve');
var pkg = require(resolve.sync('./package.json'));

module.exports = function () {

  var tasks = require('require-dir')('./tasks', { recurse: true });

  var machineryName = pkg.name;

  var config = extend({
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
    }
  }, this, this.config && this.config[machineryName]);

  var env = extend({
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
