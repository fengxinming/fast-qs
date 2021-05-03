import className from '../src/index';

it('测试 className 方法', () => {
  expect(className('one')).toBe('one');
  expect(className([])).toBe('');
  expect(className()).toBe('');
  expect(className(null)).toBe('');
  expect(className(true)).toBe('');
  expect(className('one', 'two', 'three')).toBe('one two three');
  expect(className(['one', 'two', 'three'])).toBe('one two three');
  expect(className({ one: true, two: true, three: false })).toBe('one two');
  expect(className('one', 'two', { four: true, three: false })).toBe('one two four');
  expect(
    className(
      'one', { two: true, three: false },
      { four: 'four', five: true }, 6, {}
    )
  ).toBe('one two four five 6');
  expect(
    className(
      ['one', 'two'], ['three'], ['four', ['five']], [{ six: true }, { seven: false }]
    )
  ).toBe('one two three four five six');
});
