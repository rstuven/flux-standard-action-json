Flux Standard Action JSON serialization
=======================================

[Flux Standard Action](https://github.com/acdlite/flux-standard-action) JSON serialization utilities.

```
npm install --save flux-standard-action-json
```

### `fsaToJSON(action)`

Returns a JSON string if `action` is FSA compliant. Otherwise, throws an error.

**NOTE:** `Symbol` action types should have a [key](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor). For example:

```js
  fsaToJSON({type: Symbol()});
  // throws an error
```

```js
  fsaToJSON({type: Symbol('ACTION_TYPE')});
  // returns '{"type":"Symbol(ACTION_TYPE)"}'
```

### `fsaFromJSON(json)`

Returns an FSA compliant action parsed from a JSON string,
parsing `Symbol` type and `Error` payload where applies.

Examples:

```js
  fsaFromJSON('{}');
  // throws an error
```

```js
  fsaFromJSON('{"type":"Symbol(ACTION_TYPE)"}');
  // returns {type: Symbol.for('ACTION_TYPE')}
```

```js
  fsaFromJSON('{"type":"TYPE","error":true,"payload":"Invalid something"}');
  // returns {type: 'TYPE', error: true, payload: new Error('Invalid something')}
```

**NOTE:** `Symbol` action types should have a [key](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor). For example:

```js
  fsaFromJSON('{"type":"Symbol()"}');
  // throws an error
```
