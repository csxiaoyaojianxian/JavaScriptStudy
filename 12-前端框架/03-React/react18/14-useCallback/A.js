import React from 'react';

const A = (props) => {
    console.log('A渲染');

    return (
        <div>
            <h2>组件A</h2>
            <button onClick={props.onAdd}>App.onAdd</button>
        </div>
    );
};

export default React.memo(A);
