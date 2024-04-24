import parseQuery from './_parse';
import unescape from './unescape';

import { ParseOptions } from './declaring';

/**
 * 将 URL 查询字符串 str 解析为键值对的集合
 *
 * parse('http://demo.com?a=1&a=2&a=3&d=&f=')
 *
 * // { a: ['1', '2', '3'], d: '', f: '' }
 *
 * @param str 要解析的 URL 查询字符串
 * @param options 可选
 * @returns object对象
 */
export default function parse(
  str: string,
  options?: ParseOptions
): Record<string, string | string[]> {
  if (!str || typeof str !== 'string') {
    return {};
  }

  if (!options) {
    options = {};
  }

  const decode = options.decodeURIComponent || unescape;
  const sep = options.sep || '&';
  const eq = options.eq || '=';

  const { start, filter } = options;
  const searchIndex = start === 0
    ? 0
    : start as number < 0
      ? Math.max(0, str.length + (start as number))
      : start as number > 0
        ? Math.min(start as number, str.length - 1)
        : str.indexOf(start as string || '?') + 1;

  const result: Record<string, string | string[]> = {};

  let current;
  const set = (
    key: string,
    needDecodeK: boolean,
    value: string,
    needDecodeV: boolean
  ): void => {
    if (needDecodeK) {
      key = decode(key);
    }
    if (needDecodeV) {
      value = decode(value);
    }

    current = result[key] as any;
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
  };

  parseQuery(
    str,
    searchIndex,
    sep,
    eq,
    filter
      ? (key, needDecodeK, value, needDecodeV) => {
        if (filter(key, value)) {
          set(key, needDecodeK, value, needDecodeV);
        }
      }
      : set
  );

  return result;
}
