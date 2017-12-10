# resolve-bin [![build status](https://secure.travis-ci.org/thlorenz/resolve-bin.png)](http://travis-ci.org/thlorenz/resolve-bin)

Resolves the full path to the bin file of a given package by inspecting the `"bin"` field in its package.json.

```js
var resolveBin = require('resolve-bin');

// package.json: "bin": "bin/tap.js"
resolveBin('tap', function (err, bin) {
  if (err) return console.error(err);
  console.log(bin);  
});

// => [..]/resolve-bin/node_modules/tap/bin/tap.js
```

## Installation

    npm install resolve-bin

## API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="resolveBin"><span class="type-signature"></span>resolveBin<span class="signature">(name, <span class="optional">opts</span>, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Resolves the full path to the bin file of a given package by inspecting the &quot;bin&quot; field in its package.json.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>name</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>module name, i.e. 'tap'</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>executable</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>(default: @name) executable name (e.g. 'buster-test')</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>called back with the full path to the bin file of the module or an error if it couldn't be resolved</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/resolve-bin/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/resolve-bin/blob/master/index.js#L6">lineno 6</a>
</li>
</ul></dd>
</dl>
</dd>

<dt>
<h4 class="name" id="resolveBin::sync"><span class="type-signature"></span>resolveBin::sync<span class="signature">(name, <span class="optional">opts</span>)</span><span class="type-signature"> &rarr; {string}</span></h4>
</dt>
<dd>
<div class="description">
<p>Synchronous version of resolveBin</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>name</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>module name, i.e. 'tap'</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>executable</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>(default: @name) executable name (e.g. 'buster-test')</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/resolve-bin/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/resolve-bin/blob/master/index.js#L55">lineno 55</a>
</li>
</ul></dd>
</dl>
</dd>

</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
