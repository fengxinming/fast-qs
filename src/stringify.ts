
import { isObject } from 'celia';
import stringifyQuery from './_stringify';
import { StringifyOptions } from './declaring';

/**
 * 通过遍历对象的自身属性从给定的 obj 生成 URL 查询字符串
 *
 * stringify({ a: [1, 2, 3, 4], b: 'test' })
 *
 * // 'a=1&a=2&a=3&a=4&b=test'
 *
 */
export default function stringify(
  obj: Record<string, any>,
  options?: StringifyOptions
): string {
  if (!isObject(obj)) {
    return '';
  }
  if (!options) {
    options = {};
  }

  return stringifyQuery(
    obj,
    options.sep,
    options.eq,
    options.encodeURIComponent,
    options.filter
  );
}
