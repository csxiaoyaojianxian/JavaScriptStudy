import React, {useState} from 'react';

const App = () => {
    // 存储表单中的数据
    const [formData, setFormData] = useState({
      inputDesc:'',
    });

    // 监听内容变化
    const descChangeHandler = (e) => {
      setFormData({
        ...formData,
        inputDesc: e.target.value
      });
    };

    const formSubmitHandler = (e) => {
      // 取消表单的默认提交行为
      e.preventDefault();

      console.log(formData);

      setFormData({
        inputDesc: '',
      });
    };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-item">
          {
            /* htmlFor 聚焦 */
          }
          <label htmlFor="desc">内容</label>
          <input onChange={descChangeHandler} value={formData.inputDesc} id="desc" type="text"/>
      </div>
      <div className="form-btn">
          <button>submit</button>
      </div>
    </form>
  );
};

export default App;
