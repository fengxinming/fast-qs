import _parse from './_parse';
import _stringify from './_stringify';
import escape from './escape';
import unescape from './unescape';

function _appendQuery(url, qs) {
  let questionMark = -1;
  let hashMark = -1;
  const len = url.length;

  loop: for (let i = 0; i < len; i++) {
    switch (url[i]) {
      case '?':
        questionMark = i;
        break;
      case '#':
        hashMark = i;
        break loop;
      default:
    }
  }

  return hashMark === -1
    ? concat(url, qs, questionMark !== -1)
    : concat(url.slice(0, hashMark), qs, questionMark !== -1) + url.slice(hashMark);
}

function concat(url, query, hasQM) {
  return url + (hasQM ? '&' : '?') + query;
}


/**
 * 拼接query参数
 *
 * @param {string} url
 * @param {string|object} query
 * @param {object} opts
 * @returns {string}
 */
export default function append(url, query, opts) {
  if (!url) {
    return '';
  }

  if (!query) {
    return url;
  }

  let qs = '';
  let filter;
  let sep;
  let eq;
  let decode;
  let encode;

  if (opts) {
    filter = opts.filter;
    decode = opts.decodeURIComponent;
    encode = opts.encodeURIComponent;
    sep = opts.sep || '&';
    eq = opts.eq || '=';
  }
  else {
    sep = '&';
    eq = '=';
  }

  switch (typeof query) {
    case 'object': {
      const ret = [];
      _stringify(query, encode || escape, filter
        ? (key, val) => {
          if (filter(key, val)) {
            ret[ret.length] = key + eq + val;
          }
        }
        : (key, val) => {
          ret[ret.length] = key + eq + val;
        });
      qs = ret.join(sep);
      break;
    }
    case 'string':
      if (filter) {
        const ret = [];
        _parse(query, sep, eq, decode || unescape, (key, val) => {
          if (filter(key, val)) {
            ret[ret.length] = key + eq + val;
          }
        });
        qs = ret.join(sep);
      }
      else {
        qs = query;
      }
      break;
    default:
      return url;
  }

  return _appendQuery(url, qs);
}
