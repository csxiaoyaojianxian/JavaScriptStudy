let values = []
var val = ['baz', 'bar']
var val2 = [{ id: 1, name: 'val1' }, { id: 2, name: 'val2' }]
var key = ''
if (Array.isArray(val2)) {
  values = val2




} else {
  // 反之，直接放进入组里面
  // 为了下面进行处理为 日期或者对象 格式
  values = [val2]
}
console.log(values)
