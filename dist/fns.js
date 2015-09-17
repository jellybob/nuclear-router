
/**
 * @param {RouterHandler[]} handlers
 * @param {Context} ctx
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function runHandlers(handlers, ctx, callback) {
  var len = handlers.length;
  var i = 0;

  function next() {
    var fn = handlers[i];
    if (i < len) {
      var nextFn = i < len - 1 ? next : function () {};
      i++;
      fn(ctx, nextFn);
    } else {
      callback();
    }
  }

  next();
}

/**
 * @param {String} path
 * @return {String}
 */
function extractQueryString(path) {
  var i = path.indexOf('?');
  var isFound = i > -1;

  return isFound ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
}

/**
 * @param {String} path
 * @return {Object<String, String[]|String>}
 */
function extractQueryParams(path) {}
// TODO

/**
 * @param {String} base
 * @param {String} canonicalPath
 * @return {String}
 */
function extractPath(base, canonicalPath) {
  var path = canonicalPath.replace(base, '') || '/';
  var qsIndex = path.indexOf('?');
  return qsIndex > -1 ? path.slice(0, qsIndex) : path;
}

/**
 * @param {Route[]} routes
 * @param {String} path
 * @return {{ route: Route, params: Object }}
 */
function matchRoute(routes, path) {
  var result = {
    params: {},
    route: null
  };

  var decodedPath = decodeURIComponent(path);
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    var matches = route.matchRegexp.exec(decodedPath);

    if (matches) {
      var params = {};

      for (var _i = 1; _i < matches.length; ++_i) {
        var key = route.keys[_i - 1];
        var val = decodeURLEncodedURIComponent(matches[_i]);
        if (val !== undefined || !hasOwnProperty.call(params, key.name)) {
          params[key.name] = val;
        }
      }

      result = { route: route, params: params };
    }
  }

  return result;
}

/**
 * Remove URL encoding from the given `str`.
 * Accommodates whitespace in both x-www-form-urlencoded
 * and regular percent-encoded form.
 *
 * @param {String} val
 * @return {String}
 */
function decodeURLEncodedURIComponent(val) {
  if (typeof val !== 'string') {
    return val;
  }
  return decodeURIComponent(val.replace(/\+/g, ' '));
}

exports['default'] = {
  runHandlers: runHandlers,
  extractQueryString: extractQueryString,
  extractQueryParams: extractQueryParams,
  extractPath: extractPath,
  matchRoute: matchRoute
};
module.exports = exports['default'];