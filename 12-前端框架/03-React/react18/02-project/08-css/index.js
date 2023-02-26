import ReactDOM from "react-dom/client";

// [1] 外部样式表
import './index.css';
// [3] 推荐：CSS Module
import style from './index.module.css'

const StyleDemo = () => {

  const useBorder = true;

  // [2] 内联样式
  const innerStyle = {
    border: useBorder ? '1px solid blue' : 'none',
  };
  
  return (
    <div className={`demo ${useBorder?' global-style':''}`} style={useBorder ? innerStyle : ''}>
      <div className={style.moduleStyle} style={{color:'red', backgroundColor:'#aaa', fontSize:20, borderRadius:12}}>demo</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StyleDemo/>);