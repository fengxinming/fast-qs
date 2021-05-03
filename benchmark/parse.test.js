const { parse } = require('../node_modules/querystring');
const { parse: parse2 } = require('querystringify');
const { parse: parse3 } = require('query-string');
const { parse: parse4 } = require('qs');
const parseQuery = require('../dist/parse');

const testData1 = '12342343';
const testData2 = 'a=1&b=2&c=3&d=&f=';
const testData3 = '&a=1&b=2&c=3&d=&f=';
const testData4 = 'abcd1234&a=1&b=2&c=3&d=&f=';
const testData5 = '?a=1&a=2&a=3&d=&f=';

// 测试 parseQuery
module.exports = {
  '【querystring.parse】': function () {
    parse(null);
    parse(testData1);
    parse(testData2);
    parse(testData3);
    parse(testData4);
    parse(testData5.slice(1));
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
    parse3(null);
    parse3(testData1);
    parse3(testData2);
    parse3(testData3);
    parse3(testData4);
    parse3(testData5);
  },

  '【qs.parse】': function () {
    parse4(null);
    parse4(testData1);
    parse4(testData2);
    parse4(testData3);
    parse4(testData4);
    parse4(testData5.slice(1));
  },

  '【parse】': function () {
    parseQuery(null);
    parseQuery(testData1);
    parseQuery(testData2);
    parseQuery(testData3);
    parseQuery(testData4);
    parseQuery(testData5);
  }
};
