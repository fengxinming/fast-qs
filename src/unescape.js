import warn from 'celia/es/warn';

export default function unescape(str) {
  try {
    return decodeURIComponent(str);
  }
  catch (err) {
    warn(false, `Error decoding "${str}". Leaving it intact.`);
  }
  return str;
}
