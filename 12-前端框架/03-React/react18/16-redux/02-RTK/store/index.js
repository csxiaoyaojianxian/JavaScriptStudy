// 使用RTK构建store
import {configureStore} from "@reduxjs/toolkit";

import {stuReducer} from "./stuSlice";
import {schoolReducer} from "./schoolSlice";

const store = configureStore({
    reducer:{
        student: stuReducer,
        school: schoolReducer,
    }
});

export default store;
