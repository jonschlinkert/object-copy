'use strict';

require('mocha');
var assert = require('assert');
var App = require('./fixtures/app');
var copy = require('./');

describe('object-copy', function() {
  it('should export a function', function() {
    assert.equal(typeof copy, 'function');
  });

  it('should copy a descriptor from the provider to receiver:', function() {
    var proto = App.prototype;
    var obj = {};
    copy(obj, proto, 'count');
    assert(!('count' in obj));
    assert('get' in obj);
    assert('set' in obj);
  });

  it('should do nothing when the descriptor does not exist:', function() {
    var proto = App.prototype;
    var obj = {};
    copy(obj, proto, 'foo');
    assert.deepEqual(obj, {});
  });

  it('should throw an error when receiver is not an object:', function(cb) {
    try {
      copy('foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected receiving object to be an object.');
      cb();
    }
  });

  it('should throw an error when provider is not an object:', function(cb) {
    try {
      copy({}, 'foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected providing object to be an object.');
      cb();
    }
  });
});
