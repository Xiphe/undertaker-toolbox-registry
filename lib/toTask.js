'use strict';

module.exports = function toTaskFactory(store) {
  return function toTask(provider) {
    const helper = store._plugins.decorateHelper({
      helper: {
        series: store.takerInst.series,
        parallel: store.takerInst.parallel
      },
      provider
    }).helper;
    const task = provider.getTask(helper);

    if (typeof task !== 'function') {
      throw new Error(`got invalid task for ${JSON.stringify(provider)}`);
    }

    task.provider = provider;

    return task;
  };
};
