import unescape from './decode';

function _parseQuery(str, sep, eq, decode, cb) {
  let matchedKey = '';
  let matchedValue = '';

  for (let i = 0, c = null, hasEq = false, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
      case '?':
        matchedKey = '';
        matchedValue = '';
        break;
      case sep:
        if (matchedKey) {
          cb(matchedKey, decode(matchedValue));
          hasEq = false;
          matchedKey = '';
          matchedValue = '';
        }
        break;
      case eq:
        hasEq = true;
        matchedValue = '';
        break;
      case '#': // 不解析hash
        i = len;
        break;
      default:
        if (hasEq) {
          matchedValue += c;
        } else {
          matchedKey += c;
        }
    }
  }

  if (matchedKey) {
    cb(matchedKey, decode(matchedValue));
  }
}


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
  } else if (isObject(eq)) {
    options = eq;
    eq = '=';
  }

  sep || (sep = '&');
  eq || (eq = '=');

  let last;
  _parseQuery(str, sep, eq, (options && options.decodeURIComponent) || unescape, (key, value) => {
    last = result[key];
    // 没有相同的key值
    if (last === undefined) {
      result[key] = value;
    } else if (isArray(last)) { // 继续追加
      last[last.length] = value;
    } else { // 已存在key
      result[key] = [last, value];
    }
  });

  return result;
}

