/**
 * @module
 */

/**
 * Input to Client Decision Engine
 *
 * @typedef Route
 * @property {String|RegExp} match
 * @property {RouterHandler[]} handlers
 */

/**
 * @callback RouteHandler
 * @param {Context} ctx
 * @param {Function} nextFn
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

var _fns = require('./fns');

var _fns2 = _interopRequireDefault(_fns);

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

var _WindowEnv = require('./WindowEnv');

var _WindowEnv2 = _interopRequireDefault(_WindowEnv);

var _HistoryEnv = require('./HistoryEnv');

var _HistoryEnv2 = _interopRequireDefault(_HistoryEnv);

var _DocumentEnv = require('./DocumentEnv');

var _DocumentEnv2 = _interopRequireDefault(_DocumentEnv);

var Router = (function () {
  function Router(opts) {
    var _this = this;

    _classCallCheck(this, Router);

    this.opts = (0, _objectAssign2['default'])({
      pushstate: true,
      base: ''
    }, // NOT IMPLEMENTED
    // hashbang: false,
    opts);

    this.__routes = [];

    this.__currentCanonicalPath = null;

    _WindowEnv2['default'].addEventListener('popstate', function (e) {
      if (e.state) {
        _this.replace(e.state.canonicalPath);
      } else {
        _this.go(_this.getCanonicalPath());
      }
    });
  }

  /**
   * Registers Routes for the application
   *
   * ```
   * var router = new Router(reactor)
   * router.registerRoutes([
   *   {
   *     match: '/foo',
   *     handlers: [
   *       (ctx, next) => {
   *         fetchDataForFoo()
   *         next()
   *       }
   *     ]
   *   }
   * ```
   *
   * @param {Route[]} routes
   */

  _createClass(Router, [{
    key: 'registerRoutes',
    value: function registerRoutes(routes) {
      var _this2 = this;

      if (!Array.isArray(routes)) {
        throw new Error('Router#registerRoutes must be passed an array of Routes');
      }
      routes.map(function (route) {
        _this2.__routes.push(new _Route2['default'](route));
      });
    }

    /**
     * @param {String} canonicalPath
     */
  }, {
    key: 'go',
    value: function go(canonicalPath) {
      this.__dispatch(canonicalPath, true);
    }

    /**
     * @param {String} canonicalPath
     */
  }, {
    key: 'replace',
    value: function replace(canonicalPath) {
      this.__dispatch(canonicalPath, false);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.__routes = [];
    }

    /**
     * @param {String} canonicalPath
     * @param {Context} ctx
     */
  }, {
    key: 'catchall',
    value: function catchall(ctx) {
      _WindowEnv2['default'].navigate(ctx.canonicalPath);
    }

    /**
     * @param {String} canonicalPath
     * @param {Boolean} replace use replaceState instead of pushState
     */
  }, {
    key: '__dispatch',
    value: function __dispatch(canonicalPath, replace) {
      if (canonicalPath === this.__currentCanonicalPath) {
        return;
      }
      // TODO Hashbang support
      var title = _DocumentEnv2['default'].getTitle();
      var path = _fns2['default'].extractPath(this.opts.base, canonicalPath);

      var _fns$matchRoute = _fns2['default'].matchRoute(this.__routes, path);

      var params = _fns$matchRoute.params;
      var route = _fns$matchRoute.route;

      // TODO pass useHashbang to Context constructor
      var ctx = new _Context2['default']({ canonicalPath: canonicalPath, path: path, title: title, params: params });

      if (route) {
        replace ? _HistoryEnv2['default'].replaceState.apply(null, ctx.getHistoryArgs()) : _HistoryEnv2['default'].pushState.apply(null, ctx.getHistoryArgs());

        this.__currentCanonicalPath = canonicalPath;

        _fns2['default'].runHandlers(route.handlers, ctx);
      } else {
        this.catchAllHandler(ctx);
      }
    }
  }]);

  return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];