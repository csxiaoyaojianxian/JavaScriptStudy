var fixer = require('./lib/fix')
var requireParse = require('./lib/require-parse')
var requireBundle = require('./lib/require-bundle')

exports.fix = fixer.fix
exports.formatWhenFix = fixer.formatWhenFix
exports.parseAndReplaceRequire = requireParse.parseAndReplaceRequire
exports.getBundle = requireBundle.getBundle
