import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store/stuSlice';
import {setName as setSchoolName, setAddress as setSchoolAddress} from "./store/schoolSlice";

const App = () => {
    // useSelector() 加载state中的数据
    // const student = useSelector(state => state.student);
    // const school = useSelector(state => state.school);
    const {student, school} = useSelector(state => state);

    // useDispatch() 获取派发器对象
    const dispatch = useDispatch();

    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };
    const setAgeHandler = () => {
        dispatch(setAge(30));
    };

    return (
        <div>
            <p>
                {student.name} | 
                {student.age} | 
                {student.gender} | 
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>

            <hr/>
            <p>
                {school.name} | 
                {school.address}
            </p>
            <button onClick={()=>dispatch(setSchoolName('高老庄中小'))}>修改学校名字</button>
            <button onClick={()=>dispatch(setSchoolAddress('高老庄府前街19号'))}>修改学校地址</button>
        </div>
    );
};

export default App;
