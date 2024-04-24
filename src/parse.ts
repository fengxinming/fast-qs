import parseQuery from './_parse';

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

  const { start } = options;
  const searchIndex = start === 0
    ? 0
    : start as number < 0
      ? Math.max(0, str.length + (start as number))
      : start as number > 0
        ? Math.min(start as number, str.length - 1)
        : str.indexOf(start as string || '?') + 1;

  return parseQuery(
    str,
    searchIndex,
    options.sep,
    options.eq,
    options.decodeURIComponent,
    options.filter
  );
}
