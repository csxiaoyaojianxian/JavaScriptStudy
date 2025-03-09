/**
 * Portal 将子节点渲染到存在于父组件以外的 DOM 节点
 * ReactDOM.createPortal(child, container)
 */
import ReactDOM from "react-dom";

const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = (props) => {
  // props.children 用于获取元素体
  return ReactDOM.createPortal(<div className="backdrop">
    {props.children}
  </div>, backdropRoot);
};

export default Backdrop;
