# sqlstring

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Simple SQL escape and format for MySQL

## Install

```bash
$ npm install sqlstring
```

## Usage

```js
var SqlString = require('sqlstring');
```

### Escaping query values

In order to avoid SQL Injection attacks, you should always escape any user
provided data before using it inside a SQL query. You can do so using the
`SqlString.escape()` method:

```js
var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + SqlString.escape(userId);
```

Alternatively, you can use `?` characters as placeholders for values you would
like to have escaped like this:

```js
var sql = SqlString.format('SELECT * FROM users WHERE id = ?', [userId]);
```

Multiple placeholders are mapped to values in the same order as passed. For example,
in the following query `foo` equals `a`, `bar` equals `b`, `baz` equals `c`, and
`id` will be `userId`:

```js
var sql = SqlString.format('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId]);
```

This looks similar to prepared statements in MySQL, however it really just uses
the same `SqlString.escape()` method internally.

**Caution** This also differs from prepared statements in that all `?` are
replaced, even those contained in comments and strings.

Different value types are escaped differently, here is how:

* Numbers are left untouched
* Booleans are converted to `true` / `false`
* Date objects are converted to `'YYYY-mm-dd HH:ii:ss'` strings
* Buffers are converted to hex strings, e.g. `X'0fa5'`
* Strings are safely escaped
* Arrays are turned into list, e.g. `['a', 'b']` turns into `'a', 'b'`
* Nested arrays are turned into grouped lists (for bulk inserts), e.g. `[['a',
  'b'], ['c', 'd']]` turns into `('a', 'b'), ('c', 'd')`
* Objects are turned into `key = 'val'` pairs for each enumerable property on
  the object. If the property's value is a function, it is skipped; if the
  property's value is an object, toString() is called on it and the returned
  value is used.
* `undefined` / `null` are converted to `NULL`
* `NaN` / `Infinity` are left as-is. MySQL does not support these, and trying
  to insert them as values will trigger MySQL errors until they implement
  support.

If you paid attention, you may have noticed that this escaping allows you
to do neat things like this:

```js
var post  = {id: 1, title: 'Hello MySQL'};
var sql = SqlString.format('INSERT INTO posts SET ?', post);
console.log(sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
```

If you feel the need to escape queries by yourself, you can also use the escaping
function directly:

```js
var sql = 'SELECT * FROM posts WHERE title=' + SqlString.escape("Hello MySQL");
console.log(sql); // SELECT * FROM posts WHERE title='Hello MySQL'
```

### Escaping query identifiers

If you can't trust an SQL identifier (database / table / column name) because it is
provided by a user, you should escape it with `SqlString.escapeId(identifier)` like this:

```js
var sorter = 'date';
var sql    = 'SELECT * FROM posts ORDER BY ' + SqlString.escapeId(sorter);
// -> SELECT * FROM posts ORDER BY `date`
```

It also supports adding qualified identifiers. It will escape both parts.

```js
var sorter = 'date';
var sql    = 'SELECT * FROM posts ORDER BY ' + SqlString.escapeId('posts.' + sorter);
// -> SELECT * FROM posts ORDER BY `posts`.`date`
```

If you do not want to treat `.` as qualified identifiers, you can set the second
argument to `true` in order to keep the string as a literal identifier:

```js
var sorter = 'date.2';
var sql    = 'SELECT * FROM posts ORDER BY ' + connection.escapeId(sorter, true);
// -> SELECT * FROM posts ORDER BY `date.2`
```

Alternatively, you can use `??` characters as placeholders for identifiers you would
like to have escaped like this:

```js
var userId = 1;
var columns = ['username', 'email'];
var sql     = SqlString.format('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId]);
console.log(sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
```
**Please note that this last character sequence is experimental and syntax might change**

When you pass an Object to `.escape()` or `.format()`, `.escapeId()` is used to avoid SQL injection in object keys.

### Formatting queries

You can use `SqlString.format` to prepare a query with multiple insertion points,
utilizing the proper escaping for ids and values. A simple example of this follows:

```js
var inserts = ['users', 'id', userId];
var sql     = SqlString.format('SELECT * FROM ?? WHERE ?? = ?', inserts);
```

Following this you then have a valid, escaped query that you can then send to the database safely.
This is useful if you are looking to prepare the query before actually sending it to the database.
You also have the option (but are not required) to pass in `stringifyObject` and `timeZone`,
allowing you provide a custom means of turning objects into strings, as well as a
location-specific/timezone-aware `Date`.

## License

[MIT](LICENSE)

[npm-version-image]: https://img.shields.io/npm/v/sqlstring.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/sqlstring.svg
[npm-url]: https://npmjs.org/package/sqlstring
[travis-image]: https://img.shields.io/travis/mysqljs/sqlstring/master.svg
[travis-url]: https://travis-ci.org/mysqljs/sqlstring
[coveralls-image]: https://img.shields.io/coveralls/mysqljs/sqlstring/master.svg
[coveralls-url]: https://coveralls.io/r/mysqljs/sqlstring?branch=master
[node-image]: https://img.shields.io/node/v/sqlstring.svg
[node-url]: https://nodejs.org/en/download
