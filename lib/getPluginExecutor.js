'use strict';

const hooks = [
  'init',
  'validate',
  'decorateProvider',
  'decorateHelper',
  'decorateTask',
  'get'
];

module.exports = function getPluginExecutor(plugins) {
  return hooks.reduce((executor, hook) => {
    executor[hook] = (args) => {
      return plugins.reduce((arg, plugin) => {
        if (typeof plugin[hook] === 'function') {
          return plugin[hook](arg) || arg;
        }

        return arg;
      }, args);
    };

    return executor;
  }, {});
};
