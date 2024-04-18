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
  encodeURIComponent?: ((val: string) => string),
  filter?: (key: string, val: any) => any
): string {
  if (!sep) {
    sep = '&';
  }
  if (!eq) {
    eq = '=';
  }
  if (!encodeURIComponent) {
    encodeURIComponent = escape;
  }

  const ret: string[] = [];
  const callback = filter
    ? (key: string, val: any) => {
      if ((filter as (key: string, val: any) => any)(key, val)) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        ret[ret.length] = key + eq + val;
      }
    }
    : (key: string, val: any) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      ret[ret.length] = key + eq + val;
    };

  forOwn(obj, (value, key) => {
    if (!key) {
      return;
    }
    if (Array.isArray(value)) {
      for (let i = 0, len = value.length; i < len; i++) {
        callback(key, convert(value[i], encodeURIComponent as any));
      }
    }
    else {
      callback(key, convert(value, encodeURIComponent as any));
    }
  });

  return ret.join(sep);
}
