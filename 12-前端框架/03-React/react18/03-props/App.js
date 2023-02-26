// 类组件写法参考《函数组件和类组件》
// props.children 用于获取元素体，参考《portal》
const App = (props) => {
  // 注意class的处理
  return (
      <div className={`item ${props.className}`}>{props.item}</div>
  );
};

export default App;
