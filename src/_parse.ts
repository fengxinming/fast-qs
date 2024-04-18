import unescape from './unescape';

/**
 * @hidden
 */
export default function _parseQuery(
  str: string,
  sep?: string,
  eq?: string,
  decode?: (val: string) => string,
  filter?: (key: string, val: any) => any,
  searchIndex?: number
): Record<string, string | string[]> {
  if (!sep) {
    sep = '&';
  }
  if (!eq) {
    eq = '=';
  }
  if (!decode) {
    decode = unescape;
  }

  let i = searchIndex === void 0 ? 0 : searchIndex;

  let matchedKey = '';
  let matchedValue = '';

  const result: Record<string, string | string[]> = {};
  let last: string = '';
  const set = (key: string, value: string) => {
    last = result[key] as any;
    // 没有相同的key值
    if (last === undefined) {
      result[key] = value;
    }
    else if (Array.isArray(last)) { // 继续追加
      last[last.length] = value;
    }
    else { // 已存在key
      result[key] = [last, value];
    }
  };
  const cb = filter
    ? (key: string, value: string): void => {
      if (filter(key, value)) {
        set(key, value);
      }
    }
    : set;

  for (let c = '', hasEq = false, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
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
        }
        else {
          matchedKey += c;
        }
    }
  }

  // ? or xx=xxx
  if (matchedKey) {
    cb(matchedKey, decode(matchedValue));
  }

  return result;
}
