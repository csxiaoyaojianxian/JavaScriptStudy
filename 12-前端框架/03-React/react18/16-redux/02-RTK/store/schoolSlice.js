// 创建学校的slice
import {createSlice} from "@reduxjs/toolkit";

const schoolSlice = createSlice({
    name: 'school',
    initialState:{
        name:'花果山一小',
        address:'花果山大街28号'
    },
    reducers:{
        setName(state, action){
            state.name = action.payload;
        },
        setAddress(state, action){
            state.address = action.payload;
        }
    }
});

export const {setName, setAddress} = schoolSlice.actions;
export const {reducer:schoolReducer} = schoolSlice;
