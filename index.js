'use strict';

const NO_TASK = require('./lib/constants').NO_TASK;
const TaskProviderRegistry = require('./lib/TaskProviderRegistry');

TaskProviderRegistry.NO_TASK = NO_TASK;

module.exports = TaskProviderRegistry;
