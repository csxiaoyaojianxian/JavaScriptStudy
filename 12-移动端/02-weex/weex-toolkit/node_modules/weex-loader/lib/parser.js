'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFragment = parseFragment;
exports.extractBlocks = extractBlocks;
exports.parseTemplate = parseTemplate;
exports.parseStyle = parseStyle;
exports.parseScript = parseScript;

var _parse = require('parse5');

var _parse2 = _interopRequireDefault(_parse);

var _blocker = require('weex-transformer/lib/blocker');

var _blocker2 = _interopRequireDefault(_blocker);

var _weexTemplater = require('weex-templater');

var _weexTemplater2 = _interopRequireDefault(_weexTemplater);

var _weexStyler = require('weex-styler');

var _weexStyler2 = _interopRequireDefault(_weexStyler);

var _weexScripter = require('weex-scripter');

var _weexScripter2 = _interopRequireDefault(_weexScripter);

var _validator = require('weex-templater/lib/validator');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAttribute(node, name) {
  if (node.attrs) {
    var i = node.attrs.length;
    var attr = void 0;
    while (i--) {
      attr = node.attrs[i];
      if (attr.name === name) {
        return attr.value;
      }
    }
  }
}

function extractDependencies(node, deps) {
  if (node.childNodes) {
    node.childNodes.forEach(function (child) {
      (0, _validator.checkTagName)(child, {
        result: {},
        deps: deps,
        log: []
      });
      extractDependencies(child, deps);
    });
  }
}

function parseFragment(source) {
  var fragment = _parse2.default.parseFragment(source, {
    locationInfo: true
  });

  var output = {
    deps: [],
    element: [],
    template: [],
    style: [],
    script: [],
    data: [],
    config: []
  };

  fragment.childNodes.forEach(function (node) {
    var type = void 0;

    if (node.tagName === 'script') {
      type = getAttribute(node, 'type');
      if (type !== 'data' && type !== 'config') {
        type = 'script';
      }
    } else {
      type = node.tagName;
    }
    if (type === 'we-element') {
      console.warn('<we-element name="' + getAttribute(node, 'name') + '"> is deprecated, please use <element> instead.');
      type = 'element';
    }

    if (!output[type]) {
      return;
    }

    var name = getAttribute(node, 'name');
    var src = getAttribute(node, 'src');
    var lang = getAttribute(node, 'lang');

    output[type].push({
      name: name,
      src: src,
      lang: lang,
      node: node
    });

    if (type === 'template') {
      var deps = [];
      extractDependencies(node.content, deps);
      output.deps = deps;
    }
  });

  return output;
}

function extractBlocks(source, type) {
  return new Promise(function (resolve, reject) {
    _blocker2.default.format(source, function (err, ret) {
      if (err) {
        reject(err);
      } else {
        resolve(ret[type]);
      }
    });
  });
}

function parseTemplate(source) {
  return new Promise(function (resolve, reject) {
    _weexTemplater2.default.parse(source, function (err, obj) {
      if (err) {
        reject(err);
      } else {
        // parse json to string and treat function specially
        var parsed = JSON.stringify(obj.jsonTemplate, _util.stringifyFunction, '  ');
        parsed = parsed.replace(_util.FUNC_START_REG, '').replace(_util.FUNC_END_REG, '');
        resolve({ parsed: parsed, log: obj.log });
      }
    });
  });
}

function parseStyle(source) {
  return new Promise(function (resolve, reject) {
    _weexStyler2.default.parse(source, function (err, obj) {
      if (err) {
        reject(err);
      } else {
        var parsed = JSON.stringify(obj.jsonStyle, null, 2);
        resolve({ parsed: parsed, log: obj.log });
      }
    });
  });
}

function parseScript(source) {
  return new Promise(function (resolve, reject) {
    var parsed = _weexScripter2.default.fix(source);
    resolve({ parsed: parsed });
  });
}