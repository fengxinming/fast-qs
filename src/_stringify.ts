import escape from './escape';
import { forOwn } from 'celia';

function convert(
  value: any,
  encode: (val: string) => string
): any {
  switch (typeof value) {
    case 'string':
      return value === '' ? value : encode(value);
    case 'number':
      // 判断 NaN
      // eslint-disable-next-line no-self-compare
      if (value !== value) {
        return '';
      }
    // break omitted
    case 'bigint':
    case 'boolean':
      return value;
    case 'object':
      return value === null ? '' : encode(JSON.stringify(value));
    default:
      return '';
  }
}

/**
 * @hidden
 */
export default function _stringifyQuery(
  obj: any,
  sep?: string,
  eq?: string,
  encode?: ((val: string) => string),
  filter?: (key: string, val: any) => any
): string {
  if (!sep) {
    sep = '&';
  }
  if (!eq) {
    eq = '=';
  }
  if (!encode) {
    encode = escape;
  }

  let ret = '';
  const push = filter
    ? (key: string, val: any, joinSep: boolean) => {
      if ((filter as (key: string, val: any) => any)(key, val)) {
        if (joinSep) {
          ret += sep;
        }
        ret += key;
        ret += eq;
        ret += val;
      }
    }
    : (key: string, val: any, joinSep: boolean) => {
      if (joinSep) {
        ret += sep;
      }
      ret += key;
      ret += eq;
      ret += val;
    };

  forOwn(obj, (value, key) => {
    if (Array.isArray(value)) {
      for (let j = 0, len = value.length; j < len; j++) {
        push(key, convert(value[j], encode as any), !!ret || j > 0);
      }
    }
    else {
      push(key, convert(value, encode as any), !!ret);
    }
  });

  return ret;
}
