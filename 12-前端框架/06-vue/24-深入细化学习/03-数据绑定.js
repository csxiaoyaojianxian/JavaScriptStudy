import Vue from 'vue'

var globalVar = 'sunshine' // eslint-disable-line
new Vue({
  el: '#root',
  // template: `
  //   <div >
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div
      v-bind:id="eleId" // :id
      v-on:click="handleClick" // @click
      :class="[{ active: isActive }]"
      :style="[styles, styles2]"
    >
      {{globalVar}} // 报错，不能访问外部变量
      <p v-html="html"></p>
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    eleId: 'main',
    styles: {
      color: 'red',
      appearance: 'none' // 消除浏览器默认样式，浏览器需要前缀，自动添加前缀
    },
    styles2: {
      color: 'black'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
