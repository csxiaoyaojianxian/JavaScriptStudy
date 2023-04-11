import React, {useEffect} from 'react';
import useFetch from "./hooks/useFetch";

const App = () => {

    const { data: stuData, loading, error, fetchData } = useFetch();

    // 初始化fetch
    useEffect(() => {
        fetchData();
    }, []);

    const loadDataHandler = () => {
        fetchData();
    };

    return (
        <div className="app">
            <button onClick={loadDataHandler}>加载数据</button>
            {/* {(!loading && !error) && <StudentList stus={stuData}/>} */}
            {loading && <p>数据正在加载中...</p>}
            {error && <p>数据加载异常！</p>}
        </div>
    );
};

export default App;
