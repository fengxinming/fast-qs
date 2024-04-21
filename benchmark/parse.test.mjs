import { parse } from 'node:querystring';
import { parse as parse1 } from 'fast-querystring';
import { parse as parse2 } from 'querystringify';
import queryString from 'query-string';
import { parse as parse4 } from 'qs';
import parseQuery from '../dist/parse.mjs';

const testData1 = '12342343';
const testData2 = 'a=1&b=2&c=3&d=&f=';
const testData3 = '&a=1&b=2&c=3&d=&f=';
const testData4 = 'abcd1234&a=1&b=2&c=3&d=&f=';
const testData5 = '?a=1&a=2&a=3&d=&f=';

const opts = { searchChar: false };

// 测试 parseQuery
export default {
  '【querystring.parse】': function () {
    parse(null);
    parse(testData1);
    parse(testData2);
    parse(testData3);
    parse(testData4);
    parse(testData5);
  },

  '【fast-querystring.parse】': function () {
    parse1(null);
    parse1(testData1);
    parse1(testData2);
    parse1(testData3);
    parse1(testData4);
    parse1(testData5);
  },

  '【querystringify.parse】': function () {
    parse2(null);
    parse2(testData1);
    parse2(testData2);
    parse2(testData3);
    parse2(testData4);
    parse2(testData5);
  },

  '【query-string.parse】': function () {
    queryString.parse(null);
    queryString.parse(testData1);
    queryString.parse(testData2);
    queryString.parse(testData3);
    queryString.parse(testData4);
    queryString.parse(testData5);
  },

  '【qs.parse】': function () {
    parse4(null);
    parse4(testData1);
    parse4(testData2);
    parse4(testData3);
    parse4(testData4);
    parse4(testData5.slice(1));
  },

  '【fast-qs.parse】': function () {
    parseQuery(null);
    parseQuery(testData1, opts);
    parseQuery(testData2, opts);
    parseQuery(testData3, opts);
    parseQuery(testData4, opts);
    parseQuery(testData5, opts);
  }
};
