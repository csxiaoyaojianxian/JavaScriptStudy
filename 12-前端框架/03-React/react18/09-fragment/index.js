import ReactDOM from "react-dom/client";
import { Fragment } from "react";

const Demo = () => {
  return (
    <Fragment>
      <div>fragment不渲染外层  <>也可以这么处理</></div>
    </Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Demo/>);