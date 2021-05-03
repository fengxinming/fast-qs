# fast-qs

[![npm package](https://nodei.co/npm/fast-qs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/fast-qs)

> A tiny query string parsing and stringifying library.

[![NPM version](https://img.shields.io/npm/v/fast-qs.svg?style=flat)](https://npmjs.org/package/fast-qs)
[![NPM Downloads](https://img.shields.io/npm/dm/fast-qs.svg?style=flat)](https://npmjs.org/package/fast-qs)
[![](https://data.jsdelivr.com/v1/package/npm/fast-qs/badge)](https://www.jsdelivr.com/package/npm/fast-qs)

## Installation

### In a browser

```html
<script src="https://cdn.jsdelivr.net/npm/fast-qs/umd.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/fast-qs/iife.min.js"></script> -->
<script>
  // window.fastClassnames
  fastClassnames('foo', 'bar'); // => 'foo bar'
  fastClassnames('foo', { bar: true }); // => 'foo bar'
  fastClassnames({ 'foo-bar': true }); // => 'foo-bar'
  fastClassnames({ 'foo-bar': false }); // => ''
  fastClassnames({ foo: true }, { bar: true }); // => 'foo bar'
  fastClassnames({ foo: true, bar: true }); // => 'foo bar'

  // lots of arguments of various types
  fastClassnames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

  // other falsy values are just ignored
  fastClassnames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
</script>

```

### Using npm

```bash
npm install fast-qs --save
```

```javascript
var fastClassnames = require('classnames');
fastClassnames('foo', 'bar'); // => 'foo bar'
fastClassnames('foo', { bar: true }); // => 'foo bar'
fastClassnames({ 'foo-bar': true }); // => 'foo-bar'
fastClassnames({ 'foo-bar': false }); // => ''
fastClassnames({ foo: true }, { bar: true }); // => 'foo bar'
fastClassnames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
fastClassnames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
fastClassnames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

```

## Benchmark

### parse

【querystring.parse】 x 89,068 ops/sec ±0.36% (94 runs sampled)

【querystringify.parse】 x 70,472 ops/sec ±0.41% (93 runs sampled)

【query-string.parse】 x 40,702 ops/sec ±0.54% (95 runs sampled)

【qs.parse】 x 38,423 ops/sec ±0.20% (92 runs sampled)

【parse】 x 201,042 ops/sec ±0.32% (93 runs sampled)

The fastest is 【parse】

### stringify

【querystring.stringify】 x 113,896 ops/sec ±0.26% (92 runs sampled)

【querystringify.stringify】 x 47,602 ops/sec ±0.37% (92 runs sampled)

【query-string.stringify】: // what?

【qs.stringify】 x 75,845 ops/sec ±0.61% (91 runs sampled)

【stringify】 x 143,289 ops/sec ±0.50% (95 runs sampled)

The fastest is 【stringify】


