'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FUNC_END_REG = exports.FUNC_END = exports.FUNC_START_REG = exports.FUNC_START = undefined;
exports.getNameByPath = getNameByPath;
exports.getFileNameWithHash = getFileNameWithHash;
exports.getFilenameByPath = getFilenameByPath;
exports.stringifyFunction = stringifyFunction;
exports.logWarn = logWarn;
exports.getRequireString = getRequireString;
exports.stringifyLoaders = stringifyLoaders;
exports.generateMap = generateMap;
exports.consumeMap = consumeMap;
exports.splitSourceLine = splitSourceLine;
exports.printSourceWithLine = printSourceWithLine;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _hashSum = require('hash-sum');

var _hashSum2 = _interopRequireDefault(_hashSum);

var _sourceMap = require('source-map');

var _config = require('./config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNameByPath(resourcePath) {
  return _path2.default.basename(resourcePath).replace(/\..*$/, '');
}

function getFileNameWithHash(resourcePath, content) {
  var filename = _path2.default.relative('.', resourcePath);
  var cacheKey = (0, _hashSum2.default)(filename + content);
  return './' + filename + '?' + cacheKey;
}

function getFilenameByPath(filepath) {
  return _path2.default.relative('.', filepath);
}

var FUNC_START = exports.FUNC_START = '#####FUN_S#####';
var FUNC_START_REG = exports.FUNC_START_REG = new RegExp('["\']' + FUNC_START, 'g');
var FUNC_END = exports.FUNC_END = '#####FUN_E#####';
var FUNC_END_REG = exports.FUNC_END_REG = new RegExp(FUNC_END + '["\']', 'g');

function stringifyFunction(key, value) {
  if (typeof value === 'function') {
    return FUNC_START + value.toString() + FUNC_END;
  }
  return value;
}

function logWarn(loader, logs) {
  if (config.logLevel && logs && logs.length) {
    logs.forEach(function (log) {
      loader.emitWarning(log.reason + '\t@' + log.line + ':' + log.column);
    });
  }
}

function getRequireString(loaderContext, loader, filepath) {
  return 'require(' + _loaderUtils2.default.stringifyRequest(loaderContext, loader ? '!!' + loader + '!' + filepath : '' + filepath) + ')\n';
}

function stringifyLoaders(loaders) {
  return loaders.map(function (loader) {
    if (typeof loader === 'string') {
      return loader;
    } else {
      var name = loader.name;
      var query = [];
      if (loader.query) {
        for (var k in loader.query) {
          var v = loader.query[k];
          if (v != null) {
            if (v === true) {
              query.push(k);
            } else {
              if (v instanceof Array) {
                query.push(k + '[]=' + v.join(','));
              }
              query.push(k + '=' + v);
            }
          }
        }
      }
      return '' + name + (query.length ? '?' + query.join('&') : '');
    }
  }).join('!');
}

function generateMap(loader, source, iterator) {
  var filePath = loader.resourcePath;

  var fileNameWithHash = getFileNameWithHash(filePath);
  var sourceRoot = _path2.default.resolve('.');

  var map = new _sourceMap.SourceMapGenerator({
    sourceRoot: sourceRoot,
    skipValidation: true
  });
  map.setSourceContent(fileNameWithHash, source);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          original = _step$value.original,
          generated = _step$value.generated;

      map.addMapping({
        source: fileNameWithHash,
        original: original,
        generated: generated
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return map;
}

function consumeMap(loader, target, map) {
  var smc = new _sourceMap.SourceMapConsumer(map);
  var source = void 0;
  var original = [];
  var generated = [];
  var mapping = {};

  splitSourceLine(target).forEach(function (input, line) {
    var column = 0;
    line = line + 1;

    var pos = smc.originalPositionFor({
      line: line,
      column: column
    });

    if (pos.source) {
      source = pos.source;
      original.push({
        line: pos.line,
        column: pos.column
      });
      generated.push({
        line: line,
        column: column
      });
      mapping['line-' + line + '-column-' + column] = {
        line: pos.line,
        column: pos.column
      };
    }
  });

  return {
    source: source,
    original: original,
    generated: generated,
    mapping: mapping,
    sourcesContent: smc.sourcesContent
  };
}

var LINE_REG = /\r?\n/g;
function splitSourceLine(source) {
  return source.split(LINE_REG);
}

function printSourceWithLine(source) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  source = splitSourceLine(source).map(function (input, line) {
    console.log(line + 1 + ':', input);
  });
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
}