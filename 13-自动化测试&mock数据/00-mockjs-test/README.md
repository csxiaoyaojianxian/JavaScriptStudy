mockjs.com

1. yarn
$ yarn add axios mockjs

2. mock
data/apiMock.js

3. main
main.js
if (process.env.NODE_ENV === 'development') {
  require('@/data/apiMock')
}