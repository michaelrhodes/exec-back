var spawn = require('cross-spawn-async')
var concat = require('concat-stream')
var strip = require('strip-eof')
var find = require('arg-find')
var once = require('once')

module.exports = function () {
  var arg = find(arguments)
  var cmd = arg('string')
  var opt = arg('object') || {}
  var cb = arg('function')

  opt.cwd = opt.cwd || process.cwd()

  return cmd ? exec(cmd, cb) : exec

  function exec (cmd, cb) {
    cb = once(cb || function (){})

    var args = cmd.split(/\s+/).filter(content)
    var bin = args.shift()
    var proc = spawn(bin, args, opt)
    var stdout
    var stderr

    proc.once('close', function (code) {
      cb(check(code), stdout, stderr)
    })

    proc.stderr.pipe(concat(function (buf) {
      stderr = strip(buf.toString())
    }))

    proc.stdout.pipe(concat(function (buf) {
      stdout = strip(buf.toString())
    }))

    return proc
  }
}

function check (nonzero) {
  return nonzero ?
    new Error('Exited with code: ' + nonzero) :
    null
}

function content (part) {
  return !!part
}
