# exec-back

Execute commands and receive the output via callback. It uses `cross-spawn-async` behind the scenes to keep things safe and cross-platform.

[![Build status](https://travis-ci.org/michaelrhodes/exec-back.svg?branch=master)](https://travis-ci.org/michaelrhodes/exec-back)

## Install
```sh
$ npm install exec-back
```

### Usage

```js
var exec = require('exec-back')

exec('ls', { cwd: '../' }, function (err, stdout, stderr) {
  console.log(stdout)
  > 'the files in ../'
})
```

`cmd` is the only required argument and all can be specified in any order. `opts` will be directly passed through to `cross-spawn-async`.

Rather than providing them with every `exec` call, you can bind the `opts` object at the outset:

```js
var exec = require('exec-back')
var bound = exec({ cwd: '../' })

bound('ls', function (err, stdout, stderr) {
  console.log(stdout)
  > 'the files in ../'
})
```

### Errors

The `err` parameter will always be `null` unless the process returned an non-zero exit code. The buffered output of of `stdout` and `stderr` will always be provided, regardless of erroneous exit codes.

### License
[MIT](http://opensource.org/licenses/MIT)
