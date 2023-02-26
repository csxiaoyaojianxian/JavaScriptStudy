import ReactDOM from "react-dom";

const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = (props) => {
  // props.children 用于获取元素体
  return ReactDOM.createPortal(<div className="backdrop">
    {props.children}
  </div>, backdropRoot);
};

export default Backdrop;
