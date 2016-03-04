'use strict';

const hooks = [
  'init',
  'validate',
  'decorateProvider',
  'decorateHelper',
  'decorateTask',
  'get',
];

module.exports = function getPluginExecutor(plugins) {
  const executor = {};

  hooks.forEach((hook) => {
    function hookFn(args) {
      plugins.reduce((arg, plugin) => {
        if (typeof plugin[hook] === 'function') {
          return plugin[hook](arg) || arg;
        }

        return arg;
      }, args);
    }

    executor[hook] = hookFn;
  });

  return executor;
};
