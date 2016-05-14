var test = require('tape')
var exec = require('../index')

test('it works', function (assert) {
  assert.plan(3)

  exec('echo hello', function (err, stdout, stderr) {
    assert.equal(err, null)
    assert.equal(stdout, 'hello')
    assert.equal(stderr, '')
  })
})

test('and the callback is optional', function (assert) {
  assert.plan(1)
  exec('echo hello')
  assert.equal(typeof 'it didn’t blow up', 'string')
})

test('it can be bound with spawn opts', function (assert) {
  assert.plan(4)

  var bexec = exec({ cwd: __dirname })
  assert.equal(typeof bexec, 'function')

  bexec('node zero.js', function (err, stdout, stderr) {
    assert.equal(err, null)
    assert.equal(stdout, 'hello from stdout')
    assert.equal(stderr, 'hello from stderr')
  })
})

test('but the opts can also be include with every call',
  function (assert) {
    assert.plan(10)

    exec('node zero.js', { cwd: __dirname },
      function (err, stdout, stderr) {
        assert.equal(err, null)
        assert.equal(stdout, 'hello from stdout')
        assert.equal(stderr, 'hello from stderr')
      })

    exec('node nonzero.js', function (err, stdout, stderr) {
      assert.equal(err instanceof Error, true)
      assert.equal(err.message, 'Exited with code: 1')
      assert.equal(stdout, 'hello from stdout')
      assert.equal(stderr, 'hello from stderr')
    }, { cwd: __dirname })

    exec({ cwd: __dirname }, 'node noexit.js',
      function (err, stdout, stderr) {
        assert.equal(err, null)
        assert.equal(stdout, 'hello from stdout')
        assert.equal(stderr, 'hello from stderr')
      })
})

test('it returns the child process', function (assert) {
  assert.plan(2)

  var a = exec('echo hello')
  var b = exec({ cwd: __dirname })('echo hello')

  assert.equal(a.constructor.name, 'ChildProcess')
  assert.equal(b.constructor.name, 'ChildProcess')
})
