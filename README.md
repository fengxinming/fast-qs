# fast-qs

[![NPM version](https://img.shields.io/npm/v/fast-qs.svg?style=flat)](https://npmjs.org/package/fast-qs)
[![NPM Downloads](https://img.shields.io/npm/dm/fast-qs.svg?style=flat)](https://npmjs.org/package/fast-qs)
[![](https://data.jsdelivr.com/v1/package/npm/fast-qs/badge)](https://www.jsdelivr.com/package/npm/fast-qs)

> A tiny URL or URL query string parsing and stringifying library.

---

## Installation

### Install via npm

```bash
$ npm install fast-qs --save
```

### Load `fast-qs` via classical `<script>` tag

```html
<script src="https://cdn.jsdelivr.net/npm/fast-qs/dist/index.umd.js"></script>
```

or
```html
<script src="https://cdn.jsdelivr.net/npm/fast-qs@2.0.1/dist/index.umd.js"></script>
```

use in window
```js
// window.fastQs
fastQs.append
fastQs.escape
fastQs.parse
fastQs.stringify
fastQs.unescape
```

## API

### parse(str[, options])

The `parse()` method parses a URL query string (str) into a collection of key and value pairs.

```ts
interface ParseOptions {
  sep?: string;
  eq?: string;
  decodeURIComponent?: (str: string) => string;
  filter?: (key: string, val: any) => any;
  start?: number | string;
}

function parse(
  str: string,
  options?: ParseOptions
): Record<string, string | string[]>;
```

- `str` `<string>` The URL or URL query string to parse.
- `options` `[ParseOptions]`
  - `sep` The substring used to delimit key and value pairs in the query string. <strong>Default</strong>: `'&'`.
  - `eq` The substring used to delimit keys and values in the query string. <strong>Default</strong>: '='.
  - `decodeURIComponent` The function to use when decoding percent-encoded characters in the query string. Default: `unescape()`.
  - `filter` The function to use when filtering keys and values from the query string.
  - `start` The index or substring of the `str` to start searching for the query string. <strong>Default</strong>: `'?'`.

For example: 

```js
import { parse } from 'fast-qs';

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

parse('http://demo.com?a=1&a=2&b=1&c=1&hideTopbar=1&hideSidebar=1', {
  filter(key) {
    return key !== 'hideTopbar' && key !== 'hideSidebar';
  }
})
// => { a: ['1', '2'],  b: '1', c: '1' }
```

### stringify(obj[, options])

The `stringify()` method produces a URL query string from a given obj by iterating through the object's "own properties".

```ts
export interface StringifyOptions {
  sep?: string;
  eq?: string;
  encodeURIComponent?: (str: string) => string;
  filter?: (key: string, val: any) => any;
}

function stringify(
  obj: Record<string, any>, 
  options?: StringifyOptions
): string;
```

- `obj` `<Object>` The object to serialize into a URL query string.
- `options` `<StringifyOptions>`
  - `sep` `<string>` The substring used to delimit key and value pairs in the query string. <strong>Default</strong>: `'&'`.
  - `eq` `<string>`. The substring used to delimit keys and values in the query string. <strong>Default</strong>: `'='`.
  - `decodeURIComponent` The function to use when decoding percent-encoded characters in the query string. Default: `unescape()`.
  - `encodeURIComponent` `<Function>` The function to use when converting URL-unsafe characters to percent-encoding in the query string. <strong>Default</strong>: `escape()`.
  - `filter` `<Function>` The function to use when filtering keys and values before adding them to the query string.

For example: 

```js
import { stringify } from 'fast-qs';

stringify(null)
// => {}
    
stringify({ a: 1, b: null, c: undefined, d: NaN, e: '' })
// => 'a=1&b=&c=&d=&e='

stringify({ a: '', c: ['\'1\'', '2', '3', NaN, undefined], f: null, '': 'null' })
// => 'a=&c=%271%27&c=2&c=3&c=&c=&f='

stringify({ a: { key: 'value', 'key2': 'value2' }, d: undefined, f: '' })
// => 'a=%7B%22key%22%3A%22value%22%2C%22key2%22%3A%22value2%22%7D&d=&f='

stringify({ a: () => { } })
// => 'a='

stringify({ a: [1, 2, 3, 4], b: 'test' }, {
  filter(key) {
    return key === 'a';
  }
})
// => 'a=1&a=2&a=3&a=4'
```

### append(url, query[, options])

The `append()` method appends a URL query string or object(query) to the `url`.

```ts
export interface AppendOptions {
  sep?: string;
  eq?: string;
  encodeURIComponent?: (str: string) => string;
  filter?: (key: string, val: any) => any;
}

function append(
  url: string,
  query: string | object,
  opts?: AppendOptions
): string 
```

- `url` `<string>` The url to append the given query.
- `query` `<string|object>` The query to be appended to the `url`.
- `options` `<StringifyOptions>`
  - `sep` `<string>` The substring used to delimit key and value pairs in the query string. <strong>Default</strong>: `'&'`.
  - `eq` `<string>`. The substring used to delimit keys and values in the query string. <strong>Default</strong>: `'='`.
  - `encodeURIComponent` `<Function>` The function to use when converting URL-unsafe characters to percent-encoding in the query string. <strong>Default</strong>: `escape()`.
  - `filter` `<Function>` The function to use when filtering keys and values before adding them to the query string.

For example: 

```js
import { append } from 'fast-qs';

append('http://demo.com', 'a=1&b=1&c=1');
// 'http://demo.com?a=1&b=1&c=1'

append('http://demo.com?test=1#hash', 'a=1&b=1&c=1');
// 'http://demo.com?test=1&a=1&b=1&c=1#hash'

append('http://demo.com', { a: 1, b: 1, c: 1 });
// 'http://demo.com?a=1&b=1&c=1'

append('http://demo.com?test=1#hash', { a: 1, b: 1, c: 1 });
// 'http://demo.com?test=1&a=1&b=1&c=1#hash'

append('http://demo.com', 'a=1&b=1&c=1&hideTopbar=1&hideSidebar=1', {
  filter(key) {
    return key !== 'hideTopbar' && key !== 'hideSidebar';
  },
})
// 'http://demo.com?a=1&b=1&c=1'

append('http://demo.com', { a: 1, b: 1, c: 1, hideTopbar: 1, hideSidebar: 1 }, {
  filter(key) {
    return key !== 'hideTopbar' && key !== 'hideSidebar';
  },
})
// 'http://demo.com?a=1&b=1&c=1'
```

### escape(str)

- `str` `<string>`: The `escape()` method performs URL percent-encoding on the given str in a manner that is optimized for the specific requirements of URL query strings.

The `escape()` method is used by `stringify()` and is generally not expected to be used directly. It is exported primarily to allow application code to provide a replacement percent-encoding implementation if necessary by assigning `escape()` to an alternative function.

### unescape(str)

- `str` `<string>`: `unescape()` method performs decoding of URL percent-encoded characters on the given str.

The `unescape()` method is used by `parse()` and is generally not expected to be used directly. It is exported primarily to allow application code to provide a replacement decoding implementation if necessary by assigning `unescape()` to an alternative function.

## Test

```bash
$ npm test
```

## Benchmark

```bash
$ npm run benchmark
```