'use strict';

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _config2 = require('./config');

var config = _interopRequireWildcard(_config2);

var _legacy = require('./legacy');

var legacy = _interopRequireWildcard(_legacy);

var _parser = require('./parser');

var _util = require('./util');

var _weexVueLoader = require('weex-vue-loader');

var _weexVueLoader2 = _interopRequireDefault(_weexVueLoader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaderPath = __dirname;
var defaultLoaders = {
  none: '',
  main: _path2.default.resolve(loaderPath, 'loader.js'),
  extract: _path2.default.resolve(loaderPath, 'extract.js'),
  template: _path2.default.resolve(loaderPath, 'template.js'),
  style: _path2.default.resolve(loaderPath, 'style.js'),
  script: _path2.default.resolve(loaderPath, 'script.js'),
  json: _path2.default.resolve(loaderPath, 'json.js'),
  babel: loadBabelModule('babel-loader')
};

function loadBabelModule(moduleName) {
  try {
    var filePath = require.resolve(moduleName);
    return filePath.slice(0, filePath.lastIndexOf(moduleName) + moduleName.length);
  } catch (e) {
    return moduleName;
  }
}

function getLoaderString(type, config) {
  config = config || {};
  var customLoader = void 0;
  var loaders = void 0;

  if (config.lang && config.customLang[config.lang]) {
    customLoader = config.customLang[config.lang];
  }

  if (type === 'main') {
    loaders = [{
      name: defaultLoaders.main
    }];
    return (0, _util.stringifyLoaders)(loaders);
  }

  if (type === 'element') {
    loaders = [{
      name: defaultLoaders.main,
      query: {
        element: config.source ? undefined : true
      }
    }];
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.name,
          type: 'elements'
        }
      });
    }
    return (0, _util.stringifyLoaders)(loaders);
  }

  if (type === 'template') {
    loaders = [{
      name: defaultLoaders.json
    }, {
      name: defaultLoaders.template
    }];
    if (customLoader) {
      loaders = loaders.concat(customLoader);
    }
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          type: 'template'
        }
      });
    }
    if (config.element) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.elementName,
          type: 'elements'
        }
      });
    }
    return (0, _util.stringifyLoaders)(loaders);
  }

  if (type === 'style') {
    loaders = [{
      name: defaultLoaders.json
    }, {
      name: defaultLoaders.style
    }];
    if (customLoader) {
      loaders = loaders.concat(customLoader);
    }
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: 0,
          type: 'styles'
        }
      });
    }
    if (config.element) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.elementName,
          type: 'elements'
        }
      });
    }
    return (0, _util.stringifyLoaders)(loaders);
  }

  if (type === 'script') {
    loaders = [{
      name: defaultLoaders.script
    }];
    if (customLoader) {
      loaders = loaders.concat(customLoader);
    } else {
      loaders.push({
        name: defaultLoaders.babel,
        query: {
          presets: [loadBabelModule('babel-preset-es2015')],
          plugins: [loadBabelModule('babel-plugin-transform-runtime')],
          comments: 'false'
        }
      });
    }
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: 0,
          type: 'scripts'
        }
      });
    }
    if (config.element) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.elementName,
          type: 'elements'
        }
      });
    }
    return (0, _util.stringifyLoaders)(loaders);
  }

  if (type === 'config') {
    loaders = [{
      name: defaultLoaders.json
    }];
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          type: 'config'
        }
      });
    }
    return (0, _util.stringifyLoaders)(loaders);
  }

  if (type === 'data') {
    loaders = [{
      name: defaultLoaders.json
    }];
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          type: 'data'
        }
      });
    }
    return (0, _util.stringifyLoaders)(loaders);
  }
}

function loader(source) {
  this.cacheable && this.cacheable();

  // Support *.vue files.
  // If file extname is vue then go to `weex-vue-loader`.
  if (_path2.default.extname(this.resourcePath).match(/\.vue/)) {
    return _weexVueLoader2.default.call(this, source);
  }

  var options = this.options.weex || {};
  var customLang = options.lang || {};

  var loaderQuery = _loaderUtils2.default.parseQuery(this.query);
  var resourceQuery = _loaderUtils2.default.parseQuery(this.resourceQuery);
  var resourcePath = this.resourcePath;
  var isElement = loaderQuery.element;
  var isEntry = resourceQuery.entry;
  var filename = _path2.default.relative('.', resourcePath);
  var name = isEntry ? (0, _md2.default)(_fs2.default.readFileSync(filename)) : resourceQuery.name || (0, _util.getNameByPath)(resourcePath);

  var output = '';

  var frag = (0, _parser.parseFragment)(source);

  var elementNames = [];
  if (frag.element.length) {
    for (var i = 0; i < frag.element.length; i++) {
      var element = frag.element[i];
      if (!element.name) {
        this.emitError('Element block need a name attribute');
        return '';
      }
      elementNames.push(element.name);

      var src = resourcePath;
      if (element.src) {
        src = element.src;
      }

      output += (0, _util.getRequireString)(this, getLoaderString('element', {
        customLang: customLang,
        name: element.name,
        source: element.src
      }), src + '?name=' + element.name);
    }
  }

  if (frag.deps.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = frag.deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var dep = _step.value;

        var filepath = _path2.default.resolve(_path2.default.dirname(resourcePath), dep + '.we');
        if (elementNames.indexOf(dep) < 0 && _fs2.default.existsSync(filepath)) {
          output += (0, _util.getRequireString)(this, getLoaderString('none'), './' + dep + '.we');
        }
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
  }

  if (!frag.template.length) {
    this.emitError('Template block is required');
    return '';
  } else {
    var template = frag.template[0];
    var _src = resourcePath;
    if (template.src) {
      _src = template.src;
    }
    output += 'var __weex_template__ = ' + (0, _util.getRequireString)(this, getLoaderString('template', {
      customLang: customLang,
      lang: template.lang,
      element: isElement,
      elementName: isElement ? name : undefined,
      source: template.src
    }), _src);
  }

  if (frag.style.length) {
    var style = frag.style[0];
    var _src2 = resourcePath;
    if (style.src) {
      _src2 = style.src;
    }
    output += 'var __weex_style__ = ' + (0, _util.getRequireString)(this, getLoaderString('style', {
      customLang: customLang,
      lang: style.lang,
      element: isElement,
      elementName: isElement ? name : undefined,
      source: style.src
    }), _src2);
  }

  if (frag.script.length) {
    var script = frag.script[0];
    var _src3 = resourcePath;
    if (script.src) {
      _src3 = script.src;
    }
    output += 'var __weex_script__ = ' + (0, _util.getRequireString)(this, getLoaderString('script', {
      customLang: customLang,
      lang: script.lang,
      element: isElement,
      elementName: isElement ? name : undefined,
      source: script.src
    }), _src3);
  }

  if (isEntry && frag.data.length) {
    var data = frag.data[0];
    var _src4 = resourcePath;
    if (data.src) {
      _src4 = data.src;
    }
    output += 'var __weex_data__ = ' + (0, _util.getRequireString)(this, getLoaderString('data', {
      source: data.src
    }), _src4);
  }

  if (isEntry && frag.config.length) {
    var _config = frag.config[0];
    var _src5 = resourcePath;
    if (_config.src) {
      _src5 = _config.src;
    }
    output += 'var __weex_config__ = ' + (0, _util.getRequireString)(this, getLoaderString('config', {
      source: _config.src
    }), _src5);
  }

  output += '\n__weex_define__(\'@weex-component/' + name + '\', [], function(__weex_require__, __weex_exports__, __weex_module__) {\n' + (frag.script.length > 0 ? '\n    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)\n    if (__weex_exports__.__esModule && __weex_exports__.default) {\n      __weex_module__.exports = __weex_exports__.default\n    }\n' : '') + '\n    __weex_module__.exports.template = __weex_template__\n' + (frag.style.length > 0 ? '\n    __weex_module__.exports.style = __weex_style__\n' : '') + '\n})\n';
  if (isEntry) {
    output += '\n__weex_bootstrap__(\'@weex-component/' + name + '\'' + (frag.config.length > 0 ? ',__weex_config__' : ',undefined') + (frag.data.length > 0 ? ',__weex_data__' : ',undefined') + ')';
  }

  return output;
}

loader.setLogLevel = function (level) {
  config.logLevel = level;
};

for (var key in legacy) {
  loader[key] = legacy[key];
}

module.exports = loader;