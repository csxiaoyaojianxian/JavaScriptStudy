const App = () => {

    /*
        原生DOM操作

        <button onclick="alert('test')">click</button>
        <button id="test">click</button>
        document.getElementById('test').onclick = function(){};
        document.getElementById('test').addEventListener('click', function(){}, false);
     */

    /*
        React中事件通过元素属性设置

        和原生JS不同，React中事件的属性需要使用驼峰命名法：
           onclick -> onClick
           onchange -> onChange

        属性值不能直接执行代码，而是需要一个回调函数：
           onclick="alert('test')"
           onClick={()=>{alert('test')}}
     */

    const clickHandler = (event) => {

        // return false; // 在React中，无法通过return false取消默认行为，原生也不推荐这样用
        event.preventDefault(); // 取消默认行为
        event.stopPropagation(); // 取消事件的冒泡

        // 注意：React中的事件对象 event 不是原生的事件对象，因此无需再考虑兼容问题
    };


    return <div
        {/* 事件的集中绑定方式 */}
        style={{width: 200, height: 200, margin: '100px auto', backgroundColor:'#aaa'}}>

        <button onClick={() => { alert('test'); }}>click</button>
        <a href="https://csxiaoyao.com" onClick={clickHandler}>取消默认跳转行为</a>
    </div>
};



// 导出App
export default App;
