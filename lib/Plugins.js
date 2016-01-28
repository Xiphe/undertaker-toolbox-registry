'use strict';

module.exports = class Plugins {
  constructor(plugins) {
    this.plugins = plugins;

    this.validate = this.validate.bind(this);
    this.decorateToolbox = this.decorateToolbox.bind(this);
    this.decorateTask = this.decorateTask.bind(this);
    this.get = this.get.bind(this);
  }
  init(args) {
    this._reduce('init', args);
  }
  validate(toolbox) {
    return this._reduce('validate', toolbox) || true;
  }
  decorateToolbox(toolbox) {
    return this._reduce('decorateToolbox', toolbox);
  }
  decorateTaskHelper(args) {
    return this._reduce('decorateTaskHelper', args).taskHelper;
  }
  decorateTask(task) {
    return this._reduce('decorateTask', task);
  }
  get(args) {
    return this._reduce('get', args).task;
  }
  _reduce(method, initialArg) {
    return this.plugins.reduce((arg, plugin) => {
      if (typeof plugin[method] === 'function') {
        return plugin[method](arg) || arg;
      }

      return arg;
    }, initialArg);
  }
};
