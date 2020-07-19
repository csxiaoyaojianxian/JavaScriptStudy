# egg-demo-csxiaoyao

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:2048/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

## Other
Need to start `mysql` & `redis`
```
$ brew services start mysql
$ redis-server
```

## TODO
1. docs
2. whistle & domain
3. login & passport & auth
4. husky
5. lint-staged
6. prettier
7. password organization

## Docs
**validate**

https://github.com/node-modules/parameter#rule

**mocha**

https://mochajs.cn/

**sequelize**

https://sequelize.org/master/manual/query-interface.html
https://sequelize.org/master/variable/index.html#static-variable-DataTypes

**factory-girl**
https://www.npmjs.com/package/factory-girl