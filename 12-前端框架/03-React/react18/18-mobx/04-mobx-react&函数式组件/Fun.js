import React, { useEffect } from 'react';

import store from "./store";
// import { autorun } from 'mobx';

import { Observer } from 'mobx-react';

// 不必再操作订阅/取消订阅
export default function Fun(Props) {

  // const [list, setList] = useState([])

  useEffect(() => {

    if (store.list.length === 0) {
      store.getList();
    }

    // var unsubscribe = autorun(() => {
    //   console.log(store.list)
    //   setList(store.list)
    // })

    return () => {
      // // 取消订阅
      // unsubscribe()
    }
  }, [])

  return (
    <div>
      <Observer>
      {
        () => {
          return store.list.map(item => <div>item</div>)
        }
      }
      </Observer>
    </div>
  )
}