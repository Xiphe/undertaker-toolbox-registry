'use strict';

const NO_TASK = require('./constants').NO_TASK;

module.exports = function toTaskFactory(store) {
  return function toTask(provider) {
    const helper = store._plugins.decorateHelper({
      helper: {
        NO_TASK,
        series: store.takerInst.series,
        parallel: store.takerInst.parallel
      },
      provider
    }).helper;
    const task = provider.get(helper);

    if (task === NO_TASK) {
      return NO_TASK;
    }

    if (typeof task !== 'function') {
      throw new Error(`got invalid task for ${JSON.stringify(provider)}`);
    }

    task.provider = provider;

    return task;
  };
};
