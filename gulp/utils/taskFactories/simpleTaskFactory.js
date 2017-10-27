const gutil = require('gulp-util');

const objectValidator = require('../validators/objectValidator');

/**
 * Factory method for simple gulp tasks
 * @param {string} namespace
 * @param {function} task
 * @param {function} configValidator
 */
module.exports = (namespace, task, {
  configValidator = objectValidator,
} = {}) => (config) => {
  if (config) {
    if (!configValidator(config)) {
      gutil.log(gutil.colors.red(`[${namespace}] invalid config, please fix and retry.`));
    } else {
      return task(config, namespace);
    }
  } else {
    gutil.log(gutil.colors.yellow(`[${namespace}] missing config, skipped.`));
  }

  return {};
};
