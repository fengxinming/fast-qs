import unescape from './unescape';

const hashChar = '#';
const percentageChar = '%';

/**
 * 给返回结果设置新的key和value
 */
function set(
  result: Record<string, string | string[]>,
  key: string,
  needDecodeK: boolean,
  value: string,
  needDecodeV: boolean,
  decode: (val: string) => string,
): void {
  if (needDecodeK) {
    key = decode(key);
  }
  if (needDecodeV) {
    value = decode(value);
  }

  const current = result[key] as any;
  // 没有相同的key值
  if (current === void 0) {
    result[key] = value;
  }
  else if ((current as string[]).push) { // 判断是数组
    (current as string[]).push(value);
  }
  else { // 已存在key
    result[key] = [current as string, value];
  }
}

/**
 * @hidden
 */
export default function _parseQuery(
  str: string,
  start: number,
  sep?: string,
  eq?: string,
  decode?: (val: string) => string,
  filter?: (key: string, val: any) => any,
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

  const push = filter
    ? (
      result: Record<string, string | string[]>,
      key: string,
      needDecodeK: boolean,
      value: string,
      needDecodeV: boolean,
      decode: (val: string) => string,
    ): void => {
      if (filter(key, value)) {
        set(result, key, needDecodeK, value, needDecodeV, decode);
      }
    }
    : set;

  const eqLen = eq.length;
  const sepLen = sep.length;

  let len = str.length;
  let matchedKey = '';
  let matchedValue = '';
  let needDecodeKey = false;
  let needDecodeValue = false;
  let startIndex = start;
  let hasEq = false;

  for (let c = ''; start < len; start++) {
    c = str[start];

    switch (c) {
      case sep: // '&'
        // 获取 xx=xxx 中的 xxx
        if (hasEq) {
          matchedValue = str.substring(startIndex, start);
        }
        // 可能是 &a=b&c=d or &xxxx or xxxxx&
        else {
          matchedKey = str.substring(startIndex, start);
        }

        if (matchedKey || hasEq) {
          push(result, matchedKey, needDecodeKey, matchedValue, needDecodeValue, decode);
        }

        // 重置变量
        matchedKey = '';
        matchedValue = '';
        needDecodeKey = false;
        needDecodeValue = false;
        hasEq = false;
        startIndex = start + sepLen;
        break;
      case eq: // '='
        if (hasEq) { // =foo=bar
          needDecodeValue = true;
        }
        else {
          hasEq = true;
          matchedKey = str.substring(startIndex, start);
          startIndex = start + eqLen;
        }
        break;
      case percentageChar: // '%'
        if (hasEq) {
          if (needDecodeValue === false) {
            needDecodeValue = true;
          }
        }
        else if (needDecodeKey === false) {
          needDecodeKey = true;
        }
        break;
      case hashChar: // 不解析hash
        len = start;
        break;
    }
  }

  if (hasEq) { // foo=bar / foo=
    push(result, matchedKey, needDecodeKey, str.substring(startIndex, len), needDecodeValue, decode);
  }
  else if (startIndex < len) { // &foo
    push(result, str.substring(startIndex, len), needDecodeKey, matchedValue, needDecodeValue, decode);
  }

  return result;
}
