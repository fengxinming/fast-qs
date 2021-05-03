const _className = require('../dist/cjs');
const classnames = require('classnames');

// 测试 className

module.exports = {
  '【classnames】': function () {
    classnames();
    classnames(null);
    classnames('one', 'two', 'three');
    classnames(['one', 'two', 'three']);
    classnames({ one: true, two: true, three: false });
    classnames('one', 'two', { four: true, three: false });
    classnames('one', { two: true, three: false }, { four: 'four', five: true }, 6, {});
    classnames(['one', 'two'], ['three'], ['four', ['five']], [{ six: true }, { seven: false }]);
  },

  '【className】': function () {
    _className();
    _className(null);
    _className('one', 'two', 'three');
    _className(['one', 'two', 'three']);
    _className({ one: true, two: true, three: false });
    _className('one', 'two', { four: true, three: false });
    _className('one', { two: true, three: false }, { four: 'four', five: true }, 6, {});
    _className(['one', 'two'], ['three'], ['four', ['five']], [{ six: true }, { seven: false }]);
  }
};
