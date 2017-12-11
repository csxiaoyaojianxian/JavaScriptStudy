# httpurl

basic url methods.

## usage

### demo

```javascript
var url = new lib.httpurl('//m.taobao.com?ttid=201301@taobao_iphone_3.4.5');
console.log(url.toString());
// http://m.taobao.com?ttid=201301@taobao_iphone_3.4.5
```

### attributes and methods.

- protocol
- username
- password
- hostname
- port
- pathname
- search
- hash
- params

### params demo

```javascript
url.params.ttid;
// 201301@taobao_iphone_3.4.5

url.params.ttid = '12tx0065';
// 12tx0065

url.params = {ttid:'12tx0065', refid:'qwer'};
console.log(url.search)
// ttid=12tx0065&refid=qwer
```
