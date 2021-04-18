import createHasOwn from './_createHasOwn';

const jsonStringify = JSON.stringify;

function convert(value, encode) {
  switch (typeof value) {
    case 'string':
      return value && encode(value);
    case 'number':
    case 'boolean':
      return value;
    case 'object':
      return value === null ? '' : encode(jsonStringify(value));
    default:
      return '';
  }
}

const { isArray } = Array;

export default function _stringifyQuery(obj, encode, callback) {
  const hasOwn = createHasOwn(obj);
  for (const key in obj) {
    if (key && hasOwn(obj, key)) {
      const value = obj[key];
      if (isArray(value)) {
        for (let i = 0, len = value.length; i < len; i++) {
          callback(key, convert(value[i], encode));
        }
      } else {
        callback(key, convert(value, encode));
      }
    }
  }
}

import isObject from '@ali/iot-cloud-loose-is/es/isObject';
import _stringifyQuery from './_stringifyQuery';
import escape from './encode';

export default function stringifyQuery(obj, sep, eq, options) {
  if (!isObject(obj)) {
    return '';
  }

  if (isObject(sep)) {
    options = sep;
    sep = '&';
    eq = '=';
  } else if (isObject(eq)) {
    options = eq;
    eq = '=';
  }

  sep || (sep = '&');
  eq || (eq = '=');

  const ret = [];
  _stringifyQuery(obj, (options && options.encodeURIComponent) || escape, (key, val) => {
    ret[ret.length] = key + eq + val;
  });
  return ret.join(sep);
}
