/* eslint-disable @typescript-eslint/ban-ts-comment */
import { stringify, parse } from 'node:querystring';
import stringifyQuery from '../src/stringify';
import parseQuery from '../src/parse';
import appendQuery from '../src/append';
import { expect, it } from 'vitest';

it('测试 stringify', () => {
  const testData1 = { a: 1, b: null, c: undefined, d: NaN, e: '', f: true, g: false, h: Infinity };
  const testData2 = { a: '', b: undefined, c: ['\'1\'', '2', '3', NaN, undefined], f: null, '': 'null' };
  const testData3 = { a: { key: 'value', key2: 'value2' }, d: undefined, f: '' };
  const testData4 = { a: () => (1), b: Symbol('test') };
  const testData5 = { a: [1, 2, 3, 4], b: 'test' };

  expect(stringifyQuery(null as any)).toBe('');
  expect(stringifyQuery('null' as any)).toBe('');
  expect(stringifyQuery(testData1, {})).toBe('a=1&b=&c=&d=NaN&e=&f=true&g=false&h=Infinity');
  expect(stringifyQuery(testData2, { sep: '&' })).toBe('a=&b=&c=%271%27&c=2&c=3&c=NaN&c=&f=');
  expect(stringifyQuery(testData3, { sep: '&', eq: '=' }))
    .toBe('a=%7B%22key%22%3A%22value%22%2C%22key2%22%3A%22value2%22%7D&d=&f=');
  expect(stringifyQuery(testData4)).toBe('a=&b=');
  expect(stringifyQuery(testData5)).toBe('a=1&a=2&a=3&a=4&b=test');
  expect(stringifyQuery(testData5, {
    filter(key) {
      return key === 'a';
    },
    encodeURIComponent
  })).toBe('a=1&a=2&a=3&a=4');

  // 不同
  expect(stringify(testData1)).toBe('a=1&b=&c=&d=&e=&f=true&g=false&h=');
  expect(stringify(testData2 as any)).toBe("a=&b=&c='1'&c=2&c=3&c=&c=&f=&=null");
  expect(stringify(testData3 as any)).toBe('a=&d=&f=');

  // 相同
  expect(stringifyQuery(null as any)).toBe(stringify(null as any));
  expect(stringifyQuery(testData4)).toBe(stringify(testData4 as any));
  expect(stringifyQuery(testData5)).toBe(stringify(testData5));
});

it('测试 parse', () => {
  const qs1 = '12342343';
  const qs2 = 'a=1&b=2&c=3&d=%&f=';
  const qs3 = '&a=1&b=2&c=3&d=&f=';
  const qs4 = 'abcd1234&a=1&b=2&c=3&d=&f=';
  const qs5 = '?a=1&a=2&a=3&d=&f=';
  const url1 = 'https://www.npmjs.com/search?q=qs#hash';
  const qs6 = '&=&';
  const url2 = 'https://iotx-vision-vod-vpc-hz-pre.aliyun-inc.com/vod/device/localrecord/flv/play/L3Byb2dzL3JlYy8wMC8yMDIxMTIwMS9OMTIyMTIxLkgyNjQ=.flv?token=64c12e95f0e347ccac246a0916d530e3&session=f39b3f80639c4ca18a62ab7a9d77215a';
  const url3 = 'http://demo.com?a=1&a=2&b=1&c=1&hideTopbar=1&hideSidebar=1';

  expect(parseQuery(null as any)).toEqual({});
  expect(parseQuery(qs1, {})).toEqual({ 12342343: '' });
  expect(parseQuery(qs2, { sep: '&' })).toEqual({ a: '1', b: '2', c: '3', d: '%', f: '' });
  expect(parseQuery(qs3, { sep: '&', eq: '=' })).toEqual({ a: '1', b: '2', c: '3', d: '', f: '' });
  expect(parseQuery(qs4, { searchChar: false })).toEqual({ abcd1234: '', a: '1', b: '2', c: '3', d: '', f: '' });
  expect(parseQuery(qs5, { searchIndex: 1 })).toEqual({ a: ['1', '2', '3'], d: '', f: '' });
  expect(parseQuery(url1)).toEqual({ q: 'qs' });
  expect(parseQuery(qs6)).toEqual({});
  expect(parseQuery(url2, {
    decodeURIComponent
  })).toEqual({
    token: '64c12e95f0e347ccac246a0916d530e3',
    session: 'f39b3f80639c4ca18a62ab7a9d77215a'
  });
  expect(parseQuery(url3, {
    filter(key) {
      return key !== 'hideTopbar' && key !== 'hideSidebar';
    }
  })).toEqual({
    a: ['1', '2'],
    b: '1',
    c: '1'
  });

  expect(parseQuery(null as any)).toEqual(parse(null as any));
  expect(parseQuery(qs1)).toEqual(parse(qs1));
  expect(parseQuery(qs2)).toEqual(parse(qs2));
  expect(parseQuery(qs3)).toEqual(parse(qs3));
  expect(parseQuery(qs4, { searchChar: false })).toEqual(parse(qs4));
  expect(parseQuery(qs5)).toEqual(parse(qs5.slice(1)));

  // 不同
  expect(parse(url1.slice(url1.indexOf('?') + 1))).toEqual({ q: 'qs#hash' });
  expect(parse(qs6)).toEqual({ '': '' });
});

it('测试 append', () => {
  // @ts-ignore
  expect(appendQuery(null as any)).toBe('');
  // @ts-ignore
  expect(appendQuery('http://demo.com')).toBe('http://demo.com');
  expect(appendQuery('http://demo.com', 123 as any)).toBe('http://demo.com');
  expect(appendQuery('http://demo.com', 'a=1&b=1&c=1', { sep: '&' })).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('http://demo.com?test=1#hash', 'a=1&a=2&b=1&c=1', { eq: '=' })).toBe('http://demo.com?test=1&a=1&a=2&b=1&c=1#hash');
  expect(appendQuery('http://demo.com', { a: 1, b: 1, c: 1 })).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('http://demo.com?test=1#hash', { a: 1, b: 1, c: 1 })).toBe('http://demo.com?test=1&a=1&b=1&c=1#hash');
  expect(appendQuery('http://demo.com', 'a=1&a=2&b=1&c=1&hideTopbar=1&hideSidebar=1', {
    filter(key) {
      return key !== 'hideTopbar' && key !== 'hideSidebar';
    }
  })).toBe('http://demo.com?a=1&a=2&b=1&c=1');
  expect(appendQuery('http://demo.com', { a: 1, b: 1, c: 1, hideTopbar: 1, hideSidebar: 1 }, {
    filter(key) {
      return key !== 'hideTopbar' && key !== 'hideSidebar';
    }
  })).toBe('http://demo.com?a=1&b=1&c=1');
  expect(appendQuery('https://iotx-vision-vod-vpc-hz-pre.aliyun-inc.com/vod/device/localrecord/flv/play/L3Byb2dzL3JlYy8wMC8yMDIxMTIwMS9OMTIyMTIxLkgyNjQ=.flv?token=64c12e95f0e347ccac246a0916d530e3&session=f39b3f80639c4ca18a62ab7a9d77215a', {
    speed: 1,
    keyIndex: 0,
    offset: 346000
  })).toBe('https://iotx-vision-vod-vpc-hz-pre.aliyun-inc.com/vod/device/localrecord/flv/play/L3Byb2dzL3JlYy8wMC8yMDIxMTIwMS9OMTIyMTIxLkgyNjQ=.flv?token=64c12e95f0e347ccac246a0916d530e3&session=f39b3f80639c4ca18a62ab7a9d77215a&speed=1&keyIndex=0&offset=346000');
});
