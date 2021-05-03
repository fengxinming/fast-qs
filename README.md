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

【classnames】 x 319,625 ops/sec ±18.60% (76 runs sampled)

【fastClassnames】 x 520,426 ops/sec ±0.31% (92 runs sampled)

The fastest is 【fastClassnames】
