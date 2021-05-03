import isString from 'celia/es/isString';
import isObject from 'celia/es/isObject';
import _parse from './_parse';
import unescape from './unescape';

const { isArray } = Array;

export default function parse(str, sep, eq, options) {
  const result = {};

  if (!str || !isString(str)) {
    return result;
  }

  if (isObject(sep)) {
    options = sep;
    sep = '&';
    eq = '=';
  }
  else if (isObject(eq)) {
    options = eq;
    eq = '=';
  }

  sep || (sep = '&');
  eq || (eq = '=');

  let last;
  _parse(str, sep, eq, (options && options.decodeURIComponent) || unescape, (key, value) => {
    last = result[key];
    // 没有相同的key值
    if (last === undefined) {
      result[key] = value;
    }
    else if (isArray(last)) { // 继续追加
      last[last.length] = value;
    }
    else { // 已存在key
      result[key] = [last, value];
    }
  });

  return result;
}

