import React, { useState, useEffect } from 'react';

import store from "./store";
import { autorun } from 'mobx';

export default function Fun(Props) {

  const [list, setList] = useState([])

  useEffect(() => {

    if (store.list.length === 0) {
      store.getList();
    }

    var unsubscribe = autorun(() => {
      console.log(store.list)
      setList(store.list)
    })

    return () => {
      // 取消订阅
      unsubscribe()
    }
  }, [])

  return (
    <div>
      {
        list.map(item => <div>item</div>)
      }
    </div>
  )
}