'use strict';

const DefaultRegistry = require('undertaker-registry');
const Plugins = require('./Plugins');
const toTask = require('./toTask');

module.exports = class UndertakerToolboxRegistry extends DefaultRegistry {
  constructor(opt) {
    super();

    const store = {};

    store.plugins = new Plugins(opt.plugins || []);
    store.toolboxes = opt.toolboxes || [];
    store.tasks = [];

    this._toolboxStore = store;
  }
  init(takerInst) {
    super.init();

    const store = this._toolboxStore;

    store.takerInst = takerInst;
    store.plugins.init({takerInst, store, registry: this});
    store.tasks = store.toolboxes
      .filter(store.plugins.validate)
      .map(store.plugins.decorateToolbox)
      .map(toTask(store))
      .map(store.plugins.decorateTask);

    store.tasks.forEach(takerInst.task);
  }
  get(name) {
    const store = this._toolboxStore;

    return store.plugins.get({
      name,
      arguments,
      task: super.get(name)
    });
  }
};
