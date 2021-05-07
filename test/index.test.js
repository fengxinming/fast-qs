import { stringify, parse } from 'querystring';
import stringifyQuery from '../src/stringify';
import parseQuery from '../src/parse';
import appendQuery from '../src/append';

it('测试 stringifyQuery', () => {
  const testData1 = { a: 1, b: null, c: undefined, d: NaN, e: '', f: true, g: false, h: Infinity };
  const testData2 = { a: '', b: undefined, c: ['\'1\'', '2', '3', NaN, undefined], f: null, '': 'null' };
  const testData3 = { a: { key: 'value', key2: 'value2' }, d: undefined, f: '' };
  const testData4 = { a: () => (1), b: Symbol('test') };
  const testData5 = { a: [1, 2, 3, 4], b: 'test' };

  expect(stringifyQuery(null)).toBe('');
  expect(stringifyQuery('null')).toBe('');
  expect(stringifyQuery(testData1, {})).toBe('a=1&b=&c=&d=NaN&e=&f=true&g=false&h=Infinity');
  expect(stringifyQuery(testData2, '&', {})).toBe('a=&b=&c=%271%27&c=2&c=3&c=NaN&c=&f=');
  expect(stringifyQuery(testData3, '&', '=')).toBe(
    'a=%7B%22key%22%3A%22value%22%2C%22key2%22%3A%22value2%22%7D&d=&f='
  );
  expect(stringifyQuery(testData4)).toBe('a=&b=');
  expect(stringifyQuery(testData5)).toBe('a=1&a=2&a=3&a=4&b=test');

  // 不同
  expect(stringify(testData1)).toBe('a=1&b=&c=&d=&e=&f=true&g=false&h=');
  expect(stringify(testData2)).toBe("a=&b=&c='1'&c=2&c=3&c=&c=&f=&=null");
  expect(stringify(testData3)).toBe('a=&d=&f=');

  // 相同
  expect(stringifyQuery(null)).toBe(stringify(null));
  expect(stringifyQuery(testData4)).toBe(stringify(testData4));
  expect(stringifyQuery(testData5)).toBe(stringify(testData5));
});

it('测试 parseQuery', () => {
  const testData1 = '12342343';
  const testData2 = 'a=1&b=2&c=3&d=%&f=';
  const testData3 = '&a=1&b=2&c=3&d=&f=';
  const testData4 = 'abcd1234&a=1&b=2&c=3&d=&f=';
  const testData5 = '?a=1&a=2&a=3&d=&f=';
  const testData6 = 'https://www.npmjs.com/search?q=qs-like#hash';
  const testData7 = '&=&';

  expect(parseQuery(null)).toEqual({});
  expect(parseQuery(testData1, {})).toEqual({ 12342343: '' });
  expect(parseQuery(testData2, '&', {})).toEqual({ a: '1', b: '2', c: '3', d: '%', f: '' });
  expect(parseQuery(testData3, '&', '=')).toEqual({ a: '1', b: '2', c: '3', d: '', f: '' });
  expect(parseQuery(testData4)).toEqual({ abcd1234: '', a: '1', b: '2', c: '3', d: '', f: '' });
  expect(parseQuery(testData5)).toEqual({ a: ['1', '2', '3'], d: '', f: '' });
  expect(parseQuery(testData6)).toEqual({ q: 'qs-like' });
  expect(parseQuery(testData7)).toEqual({});

  expect(parseQuery(null)).toEqual(parse(null));
  expect(parseQuery(testData1)).toEqual(parse(testData1));
  expect(parseQuery(testData2)).toEqual(parse(testData2));
  expect(parseQuery(testData3)).toEqual(parse(testData3));
  expect(parseQuery(testData4)).toEqual(parse(testData4));
  expect(parseQuery(testData5)).toEqual(parse(testData5.slice(1)));

  // 不同
  expect(parse(testData6.slice(testData6.indexOf('?') + 1))).toEqual({ q: 'qs-like#hash' });
  expect(parse(testData7)).toEqual({ '': '' });
});

it('测试 appendQuery', () => {
  expect(appendQuery(null)).toBe('');
  expect(appendQuery('http://demo.com')).toBe('http://demo.com');
  expect(appendQuery('http://demo.com', 123)).toBe('http://demo.com');
  expect(appendQuery('http://demo.com', 'a=1&b=1&c=1')).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('http://demo.com?test=1#hash', 'a=1&b=1&c=1')).toBe('http://demo.com?test=1&a=1&b=1&c=1#hash');
  expect(appendQuery('http://demo.com', { a: 1, b: 1, c: 1 })).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('http://demo.com?test=1#hash', { a: 1, b: 1, c: 1 })).toBe('http://demo.com?test=1&a=1&b=1&c=1#hash');
  expect(appendQuery('http://demo.com', 'a=1&b=1&c=1&hideTopbar=1&hideSidebar=1', {
    filter(key) {
      return key !== 'hideTopbar' && key !== 'hideSidebar';
    }
  })).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('http://demo.com', 'a=1&b=1&c=1&hideTopbar=1&hideSidebar=1', (key) => {
    return key !== 'hideTopbar' && key !== 'hideSidebar';
  })).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('http://demo.com', { a: 1, b: 1, c: 1, hideTopbar: 1, hideSidebar: 1 }, {
    filter(key) {
      return key !== 'hideTopbar' && key !== 'hideSidebar';
    }
  })).toBe('http://demo.com?a=1&b=1&c=1');
});
