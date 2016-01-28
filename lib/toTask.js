'use strict';

module.exports = function toTaskFactory(store) {
  return function toTask(toolbox) {
    const taskHelper = store.plugins.decorateTaskHelper({
      taskHelper: {
        series: store.takerInst.series,
        parallel: store.takerInst.parallel
      },
      toolbox
    });
    const task = toolbox.getTask(taskHelper);

    if (typeof task !== 'function') {
      throw new Error(`got invalid task for ${JSON.stringify(toolbox)}`);
    }

    task.toolbox = toolbox;

    return task;
  };
};
