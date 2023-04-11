/**
 * React中的钩子函数只能在函数组件或自定钩子中调用
 * 自定义钩子其实是一个名字为use开头的普通函数，可以将React中钩子函数提取到一个公共区域
 */
import {useCallback, useState} from "react";

export default function useFetch(reqObj, cb) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:8080/api/'+reqObj.url, {
                method:reqObj.method || 'get',
                headers:{
                    "Content-type":"application/json"
                },
                body:body?JSON.stringify({data:body}):null,

            });
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
                cb && cb();
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    // 设置返回
    return {
        loading,
        error,
        data,
        fetchData
    };
}


