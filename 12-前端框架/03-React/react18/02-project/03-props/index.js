import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
const data = 1;
root.render(<App item={data} className="content" />);
