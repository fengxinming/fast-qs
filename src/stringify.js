import isObject from 'celia/es/isObject';
import _stringify from './_stringify';
import escape from './escape';

export default function stringifyQuery(obj, sep, eq, options) {
  if (!isObject(obj)) {
    return '';
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

  const ret = [];
  _stringify(obj, (options && options.encodeURIComponent) || escape, (key, val) => {
    ret[ret.length] = key + eq + val;
  });

  return ret.join(sep);
}
