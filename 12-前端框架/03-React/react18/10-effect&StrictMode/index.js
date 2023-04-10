import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* StrictMode 会在开发模式下通过重复调用等方式尽可能凸显问题逻辑，如死循环副作用检测等，如 useState, useMemo, useReducer */}
    <App/>
  </React.StrictMode>
);
