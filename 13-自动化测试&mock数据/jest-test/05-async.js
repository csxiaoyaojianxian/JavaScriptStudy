/**
 * 异步处理
 * 
 * 1. 安装 axios
 * $ npm install axios --save
 * 
 * 2. 测试用例分别处理 callback 和 promise
 * 见 test 文件
 * 
 */
import axios from 'axios';

// 传入 callback 函数
export const fetchData = (fn) => {
    axios.get('http://www.csxiaoyao.com/api/temp/data.json').then((response) => {
        fn(response.data);
    })
}

// 返回 promise
export const fetchData2 = () => {
    return axios.get('http://www.csxiaoyao.com/api/temp/data.json')
}

// export {fetchData, fetchData2}