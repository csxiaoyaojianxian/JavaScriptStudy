'use strict';

var resolveBin = require('../');

// package.json: "bin": "bin/tap.js"
resolveBin('tap', function (err, bin) {
  if (err) return console.error(err);
  console.log(bin);  
});

// => [..]/resolve-bin/node_modules/tap/bin/tap.js
