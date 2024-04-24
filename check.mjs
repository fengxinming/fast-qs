import { parse, stringify } from 'node:querystring';
import parseQuery from './dist/parse.mjs';
import stringifyQuery from './dist/stringify.mjs';

const input = [
  '=',
  '&',
  '=&',
  '&=',
  '=&=',
  '=&=&',
  'xxx&',
  '&xxx',
  '=xxx',
  'a=%7B'
];

const input2 = [
  { a: 1, b: null, c: undefined, d: NaN, e: '', f: true, g: false, h: Infinity },
  { a: '', b: undefined, c: ['\'1\'', '2', '3', NaN, undefined], f: null, '': 'null' },
  { a: { key: 'value', key2: 'value2' }, d: undefined, f: '' },
  { a: () => (1), b: Symbol('test') },
  { a: [1, 2, 3, 4], b: 'test' }
];

input.forEach((str) => {
  console.info(parse(str));
});

console.info('===========');

input.forEach((str) => {
  console.info(parseQuery(str));
});

console.info('-----------');

input2.forEach((str) => {
  console.info(stringify(str));
});

console.info('-----------');

input2.forEach((str) => {
  console.info(stringifyQuery(str));
});
