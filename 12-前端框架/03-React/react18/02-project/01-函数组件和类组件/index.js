import ReactDOM from "react-dom/client";
import App1 from "./App1"; // 函数组件
import App2 from "./App2"; // 类组件

const root = ReactDOM.createRoot(document.getElementById('root'));

const propDatas = [1, 2, 3];
const app2 = propDatas.map(item => <App2 item={item} />);

root.render(<div><App1/>{app2}</div>);
