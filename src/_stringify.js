import createHasOwn from 'celia/es/_createHasOwn';

const { isArray } = Array;
const jsonStringify = JSON.stringify;

function convert(value, encode) {
  switch (typeof value) {
    case 'string':
      return value && encode(value);
    case 'number':
    case 'boolean':
      return value;
    case 'object':
      return value === null ? '' : encode(jsonStringify(value));
    default:
      return '';
  }
}

export default function _stringify(obj, encode, callback) {
  const hasOwn = createHasOwn(obj);
  for (const key in obj) {
    if (key && hasOwn(obj, key)) {
      const value = obj[key];
      if (isArray(value)) {
        for (let i = 0, len = value.length; i < len; i++) {
          callback(key, convert(value[i], encode));
        }
      }
      else {
        callback(key, convert(value, encode));
      }
    }
  }
}
