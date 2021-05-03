const encodeReserveRE = /[!'()*]/g;
const encodeReserveReplacer = (c) => `%${c.charCodeAt(0).toString(16)}`;

/**
 * fixed encodeURIComponent which is more conformant to RFC3986:
 * - escapes [!'()*]
 *
 * @param {string} str
 * @returns {string}
 */
export default function escape(str) {
  return encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer);
}
