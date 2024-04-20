import { stringify } from 'fast-querystring';
import { stringify as stringify2 } from 'querystringify';
import queryString from 'query-string';
import { stringify as stringify4 } from 'qs';
import stringifyQuery from '../dist/stringify.mjs';

const testData1 = { a: 1, b: null, c: undefined, d: NaN, e: '', f: true, g: false, h: Infinity };
const testData2 = { a: '', b: undefined, c: ['\'1\'', '2', '3', NaN, undefined], f: null, '': 'null' };
const testData3 = { a: { key: 'value', key2: 'value2' }, d: undefined, f: '' };
// const testData4 = { a: () => (1), b: Symbol('test') };
const testData5 = { a: [1, 2, 3, 4], b: 'test' };

// 测试 stringifyQuery
export default {
  'fast-querystring.stringify】': function () {
    stringify(testData1);
    stringify(testData2);
    stringify(testData3);
    // stringify(testData4);
    stringify(testData5);
  },

  '【querystringify.stringify】': function () {
    stringify2(testData1);
    stringify2(testData2);
    stringify2(testData3);
    // stringify2(testData4);
    stringify2(testData5);
  },

  '【query-string.stringify】': function () {
    queryString.stringify(testData1);
    queryString.stringify(testData2);
    queryString.stringify(testData3);
    // queryString.stringify(testData4);
    queryString.stringify(testData5);
  },

  '【qs.stringify】': function () {
    stringify4(testData1);
    stringify4(testData2);
    stringify4(testData3);
    // stringify4(testData4);
    stringify4(testData5);
  },

  '【fast-qs.stringify】': function () {
    stringifyQuery(testData1);
    stringifyQuery(testData2);
    stringifyQuery(testData3);
    // stringifyQuery(testData4);
    stringifyQuery(testData5);
  }
};
