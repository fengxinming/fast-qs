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
  // window.fastQs
  fastQs.append;
  fastQs.decode;
  fastQs.parse;
  fastQs.encode;
  fastQs.stringify;
  fastQs.escape;
  fastQs.unescape;
</script>

```

### Using npm

```bash
npm install fast-qs --save
```

```js
var append = require('fast-qs/append');
var decode = require('fast-qs/decode');
var encode = require('fast-qs/encode');
var escape = require('fast-qs/escape');
var parse = require('fast-qs/parse');
var stringify = require('fast-qs/stringify');
var unescape = require('fast-qs/unescape');
```

```js
import { 
  append,
  decode,
  encode,
  escape,
  parse,
  stringify,
  unescape,
} from 'fast-qs/es';
```


## API

### append(url, query[, opts])

- `url` `<string>` A string URL to append to.
- `query` `<string|object>` A string or object containing query params to append.
- `options` `[object|Function]` If `options` is a string, then it specifies the `filter`.
  - `encodeURIComponent` `[Function]` The function to use when converting URL-unsafe characters to percent-encoding in the query string. <strong>Default</strong>: `escape()`.
  - `decodeURIComponent` `[Function]` The function to use when decoding percent-encoded characters in the query string. Default: `unescape()`.
  - `filter` `[Function]` The function to use when filtering `query`.

For example: 

```js
append(null);
// ''

append('http://demo.com')
// 'http://demo.com'

append('http://demo.com', 123)
// 'http://demo.com'

append('http://demo.com', 'a=1&b=1&c=1')
// 'http://demo.com?a=1&b=1&c=1'

append('http://demo.com?test=1#hash', 'a=1&b=1&c=1')
// 'http://demo.com?test=1&a=1&b=1&c=1#hash'

append('http://demo.com', { a: 1, b: 1, c: 1 })
// 'http://demo.com?a=1&b=1&c=1'

append('http://demo.com?test=1#hash', { a: 1, b: 1, c: 1 })
// 'http://demo.com?test=1&a=1&b=1&c=1#hash'

append('http://demo.com', 'a=1&b=1&c=1&hideTopbar=1&hideSidebar=1', {
  filter(key) {
    return key !== 'hideTopbar' && key !== 'hideSidebar';
  }
})
// 'http://demo.com?a=1&b=1&c=1'

append('http://demo.com', { a: 1, b: 1, c: 1, hideTopbar: 1, hideSidebar: 1 }, {
  filter(key) {
    return key !== 'hideTopbar' && key !== 'hideSidebar';
  }
})
// 'http://demo.com?a=1&b=1&c=1'

```

### decode()

The `decode()` method is an alias for `parse()`.

### encode()

The `encode()` method is an alias for `stringify()`.

### escape(str)

The `escape()` method performs URL percent-encoding on the given str in a manner that is optimized for the specific requirements of URL query strings.

The `escape()` method is used by `stringify()` and is generally not expected to be used directly. It is exported primarily to allow application code to provide a replacement percent-encoding implementation if necessary by assigning `escape()` to an alternative function.

### parse(str[, sep[, eq[, options]]])

- `str` `<string>` The URL query string to parse.
- `sep` `[string]` The substring used to delimit key and value pairs in the query string. <strong>Default</strong>: `'&'`.
- `eq` `[string]` The substring used to delimit keys and values in the query string. <strong>Default</strong>: '='.
- `options` `[object]`
  - `decodeURIComponent` `[Function]` The function to use when decoding percent-encoded characters in the query string. Default: `unescape()`.

For example: 

```js
parse(null)
// => {}

parse('12342343')
// => {}

parse('a=1&b=2&c=3&d=&f=')
// => { a: '1', b: '2', c: '3', d: '', f: '' }

parse('&a=1&b=2&c=3&d=&f=')
// => { a: '1', b: '2', c: '3', d: '', f: '' }

parse('abcd1234&a=1&b=2&c=3&d=&f=')
// => { a: '1', b: '2', c: '3', d: '', f: '' }

parse('?a=1&a=2&a=3&d=&f=')
// => { a: ['1', '2', '3'], d: '', f: '' }

parse('https://www.npmjs.com/search?q=qs#hash')
// => { q: 'qs' }

```

### stringify(obj[, sep[, eq[, options]]])

- `obj` `<object>` The object to serialize into a URL query string.
- `sep` `[string]` The substring used to delimit key and value pairs in the query string. <strong>Default</strong>: `'&'`.
- `eq` `[string]`. The substring used to delimit keys and values in the query string. <strong>Default</strong>: `'='`.
- `options` `[object]`
  - `encodeURIComponent` `[Function]` The function to use when converting URL-unsafe characters to percent-encoding in the query string. <strong>Default</strong>: `escape()`.

The `stringify()` method produces a URL query string from a given obj by iterating through the object's "own properties".

For example: 

```js
stringify(null)
// => {}
    
stringify({ a: 1, b: null, c: undefined, d: NaN, e: '' })
// => 'a=1&b=&c=&d=&e='

stringify({ a: '', c: ['\'1\'', '2', '3', NaN, undefined], f: null, '': 'null' })
// => 'a=&c=%271%27&c=2&c=3&c=&c=&f='

stringify({ a: { key: 'value', 'key2': 'value2' }, d: undefined, f: '' })
// => 'a=%7B%22key%22%3A%22value%22%2C%22key2%22%3A%22value2%22%7D&d=&f='

stringify({ a: () => { } })
// => 'a=%28%29%20%3D%3E%20%7B%7D'

```

### unescape(str)

- `str` `<string>` The `unescape()` method performs decoding of URL percent-encoded characters on the given str.

The `unescape()` method is used by `parse()` and is generally not expected to be used directly. It is exported primarily to allow application code to provide a replacement decoding implementation if necessary by assigning querystring.unescape to an alternative function.

By default, the `unescape()` method will attempt to use the JavaScript built-in `decodeURIComponent()` method to decode. If that fails, a safer equivalent that does not throw on malformed URLs will be used.


## Benchmark

### parse

【querystringify.parse】 x 70,472 ops/sec ±0.41% (93 runs sampled)

【query-string.parse】 x 40,702 ops/sec ±0.54% (95 runs sampled)

【qs.parse】 x 38,423 ops/sec ±0.20% (92 runs sampled)

【parse】 x 201,042 ops/sec ±0.32% (93 runs sampled)

The fastest is 【parse】

### stringify

【querystringify.stringify】 x 47,602 ops/sec ±0.37% (92 runs sampled)

【query-string.stringify】: // what?

【qs.stringify】 x 75,845 ops/sec ±0.61% (91 runs sampled)

【stringify】 x 143,289 ops/sec ±0.50% (95 runs sampled)

The fastest is 【stringify】


