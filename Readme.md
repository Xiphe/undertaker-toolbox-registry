undertaker-task-provider-registry
---------------------------------

[![Build Status](https://img.shields.io/travis/Xiphe/undertaker-task-provider-registry/master.svg?style=flat-square)](https://travis-ci.org/Xiphe/undertaker-task-provider-registry)

extendible [undertaker](https://github.com/gulpjs/undertaker) registry for task containers


Install
-------

`npm install undertaker-task-provider-registry`


Use Providers
-------------

 - A task Provider must implement a `getTask` method
 - The `getTask` method must return a function
 - This function is then registered as an undertaker task

_This alone is simply over-engineering and misuse of the factory pattern.
The power comes from combining this with [plugins](#use-plugins)_

```js
const TaksProviderRegistry = require('undertaker-task-provider-registry');

undertaker.registry(new TaksProviderRegistry({
  plugins: [],
  providers: [{
    getTask() {
      return function foo() {
        console.log('bar');
      };
    }
  }]
}));

const task = undertaker.task('foo');

task();
// logs "bar"
```


Use plugins
-----------

 - A plugin may implement any of the following hooks
   - init
   - validate
   - decorateProvider
   - decorateHelper
   - decorateTask
   - get
 - A plugin hook must return its argument
 - A plugin hook may mutate its argument

```js
const TaksProviderRegistry = require('undertaker-task-provider-registry');

undertaker.registry(new TaksProviderRegistry({
  plugins: [{
    decorateHelper(args) {
      args.helper.logMe = 'Hello World';

      return args;
    }
  }],
  providers: [{
    getTask(helper) {
      return function foo() {
        console.log(helper.logMe || 'bar');
      };
    }
  }]
}));

const task = undertaker.task('foo');

task();
// logs "bar"
```


Plugin Hooks
------------

### `init(store)`

 - first hook available
 - the store contains:
   - `tasks:Array<Function>` future list of all provided tasks
   - `takerInst`

use for setup and keeping a reference to the store

### `validate(provider)`

 - supposed to throw if provider is invalid

### `decorateProvider(provider)`

use for provider specific preparations

### `decorateHelper({helper, provider})`

 - helper holds `takerInst.series` and `takerInst.parallel` by default
 - helper will be passed into the providers getTask method

use to expose methods that should be available inside every task factory 

### `decorateTask(task)`
 
 - `task.provider` holds a reference of the tasks creator

use to add meta information to the task or wrap it somehow

### `get({name, arguments, task})`
 
 - `name` the original task name that was inquired
 - `arguments` all arguments from the call on registries get method
 - `task` the located task or undefined

use to manipulate or compose tasks



License
-------

> The MIT License
> 
> Copyright (C) 2016 Hannes Diercks
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
