'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fns = require('./fns');

var _fns2 = _interopRequireDefault(_fns);

var Context = (function () {
  /**
   * @param {Object} opts
   * @param {String} opts.path
   * @param {String} opts.canonicalPath
   * @param {String} opts.title
   * @param {Object} opts.params
   * @param {Boolean?} opts.useHashbang
   */

  function Context(_ref) {
    var path = _ref.path;
    var canonicalPath = _ref.canonicalPath;
    var title = _ref.title;
    var params = _ref.params;
    var useHashbang = _ref.useHashbang;

    _classCallCheck(this, Context);

    // hashbang currently isnt supported
    this.useHashbang = !!useHashbang;
    this.path = path;
    this.canonicalPath = canonicalPath;
    this.title = title;
    this.params = params;

    // computeds
    this.queryString = _fns2['default'].extractQueryString(path);
    this.queryParams = _fns2['default'].extractQueryParams(path);
  }

  /**
   * Gets arguments that can be applied to history.pushState / history.replaceState
   * @return {String[]}
   */

  _createClass(Context, [{
    key: 'getHistoryArgs',
    value: function getHistoryArgs() {
      var state = {
        canonicalPath: this.canonicalPath
      };
      var url = this.useHashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath;

      return [state, this.title, url];
    }
  }]);

  return Context;
})();

exports['default'] = Context;
module.exports = exports['default'];