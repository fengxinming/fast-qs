import unescape from './unescape';

const hashChar = '#';
const percentageChar = '%';

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

  const result: Record<string, string | string[]> = {};
  let current: string | string[] = '';
  const set = (key: string, decodeKey: boolean, value: string, decodeValue: boolean) => {
    if (decodeKey) {
      key = (decode as any)(key);
    }
    if (decodeValue) {
      value = (decode as any)(value);
    }

    current = result[key] as any;
    // 没有相同的key值
    if (current === undefined) {
      result[key] = value;
    }
    else if ((current as string[]).push) { // 判断是数组
      (current as string[]).push(value);
    }
    else { // 已存在key
      result[key] = [current as string, value];
    }
  };
  const cb = filter
    ? (key: string, decodeKey: boolean, value: string, decodeValue: boolean): void => {
      if (filter(key, value)) {
        set(key, decodeKey, value, decodeValue);
      }
    }
    : set;

  let i = searchIndex === void 0 ? 0 : searchIndex;

  let matchedKey = '';
  let matchedValue = '';
  let needDecodeKey = false;
  let needDecodeValue = false;

  for (let c = '', hasEq = false, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
      case sep: // '&'
        if (matchedKey) {
          cb(matchedKey, needDecodeKey, matchedValue, needDecodeValue);
          hasEq = false;
          matchedKey = '';
          matchedValue = '';
        }
        break;
      case eq: // '='
        hasEq = true;
        matchedValue = '';
        break;
      case hashChar: // 不解析hash
        i = len;
        break;
      default:
        if (hasEq) {
          matchedValue += c;
          needDecodeValue = needDecodeValue || c === percentageChar;
        }
        else {
          matchedKey += c;
          needDecodeKey = needDecodeKey || c === percentageChar;
        }
    }
  }

  // ? or xx=xxx
  if (matchedKey) {
    cb(matchedKey, needDecodeKey, matchedValue, needDecodeValue);
  }

  return result;
}
