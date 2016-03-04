'use strict';

const DefaultRegistry = require('undertaker-registry');
const getPluginExecutor = require('./getPluginExecutor');
const toTask = require('./toTask');
const storeKey = '_taskProviderStore';
const NO_TASK = require('./constants').NO_TASK;

module.exports = class TaksProviderRegistry extends DefaultRegistry {
  constructor(opt) {
    super();

    const store = {};

    store._plugins = getPluginExecutor(opt.plugins || []);
    store._providers = opt.providers || [];
    store.tasks = [];

    this[storeKey] = store;
  }
  init(takerInst) {
    super.init();

    const store = this[storeKey];

    store.takerInst = takerInst;

    store._plugins.init(store);
    store.tasks = store._providers
      .filter((provider) => {
        const valid = store._plugins.validate(provider);

        return typeof valid === 'undefined' ? true : Boolean(valid);
      })
      .map(store._plugins.decorateProvider)
      .map(toTask(store))
      .filter((task) => task !== NO_TASK)
      .map(store._plugins.decorateTask);

    store.tasks.forEach(takerInst.task.bind(takerInst));
  }
  get(name) {
    const store = this[storeKey];

    return store._plugins.get({
      name,
      arguments,
      task: super.get(name),
    }).task;
  }
};
