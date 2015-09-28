Flux Standard Action JSON serialization
=======================================

[![build status](https://img.shields.io/travis/rstuven/flux-standard-action-json/master.svg?style=flat-square)](https://travis-ci.org/rstuven/flux-standard-action-json)
[![npm version](https://img.shields.io/npm/v/flux-standard-action-json.svg?style=flat-square)](https://www.npmjs.com/package/flux-standard-action-json)

[Flux Standard Action](https://github.com/acdlite/flux-standard-action) JSON serialization utilities.

```
npm install --save flux-standard-action-json
```

## Usage

```js
import fsaJSON from 'flux-standard-action-json';
```

### `stringify(action, ?options)`

Returns a JSON string if `action` is FSA compliant. Otherwise, throws an error.

**NOTE:** `Symbol` action types should have a [key](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor). For example:

```js
  fsaJSON.stringify({type: Symbol()});
  // throws an error
```

```js
  fsaJSON.stringify({type: Symbol('ACTION_TYPE')});
  // returns '{"type":"Symbol(ACTION_TYPE)"}'
```

#### ?options

* `error`: (Object) Error serialization options. Applies only if `payload` is an `Error` object. We depend on [Errio so the same options apply](https://github.com/programble/errio#options).

Example:
```js
  fsaJSON.stringify({
    type: 'ACTION_TYPE',
    error: true,
    new Error('Where?'))
  }, {error: {stack: true}});
  // returns '{"type":"ACTION_TYPE","error":true,"payload":{"name":"Error","message":"Where?","stack":"<a full error stack>"}}'
```

### `parse(json, ?options)`

Returns an FSA compliant action parsed from a JSON string,
parsing `Symbol` type and `Error` payload where applies.

Examples:

```js
  fsaJSON.parse('{}');
  // throws an error
```

```js
  fsaJSON.parse('{"type":"Symbol(ACTION_TYPE)"}');
  // returns {type: Symbol.for('ACTION_TYPE')}
```

```js
  fsaJSON.parse('{"type":"TYPE","error":true,"payload":"Invalid something"}');
  // returns {type: 'TYPE', error: true, payload: new Error('Invalid something')}
```

**NOTE:** `Symbol` action types should have a [key](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor). For example:

```js
  fsaJSON.parse('{"type":"Symbol()"}');
  // throws an error
```

#### ?options

* `error`: (Object) Error deserialization options. Applies only if `payload` is an `Error` object. We depend on [Errio so the same options apply](https://github.com/programble/errio#options).
