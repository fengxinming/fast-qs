import unescape from './unescape';

export default function _parse(str, sep, eq, decode, cb) {
  if (!decode) {
    decode = unescape;
  }

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
        }
        else {
          matchedKey += c;
        }
    }
  }

  if (matchedKey) {
    cb(matchedKey, decode(matchedValue));
  }
}
