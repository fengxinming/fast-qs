const hashChar = '#';
const percentageChar = '%';

/**
 * @hidden
 */
export default function _parseQuery(
  str: string,
  start: number,
  sep: string,
  eq: string,
  callback: (
    key: string,
    needDecodeK: boolean,
    value: string,
    needDecodeV: boolean
  ) => void
): void {
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
          callback(matchedKey, needDecodeKey, matchedValue, needDecodeValue);
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
    callback(matchedKey, needDecodeKey, str.substring(startIndex, len), needDecodeValue);
  }
  else if (startIndex < len) { // &foo
    callback(str.substring(startIndex, len), needDecodeKey, matchedValue, needDecodeValue);
  }
}
