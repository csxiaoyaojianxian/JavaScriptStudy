import {createSlice} from "@reduxjs/toolkit";

// createSlice 创建 reducer 切片
const stuSlice = createSlice({
    name:'stu', // 对应 action 中的 type
    initialState:{ // state的初始值
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    },
    reducers:{ // 指定state的操作
        setName(state, action){
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        }
    }
});

// actions中存储切片自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const {setName, setAge} = stuSlice.actions;
export const {reducer:stuReducer} = stuSlice;
