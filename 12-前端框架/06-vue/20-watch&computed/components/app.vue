<template>
    <div>
      <pre>
watch(监视)：可以对单个变量进行监视，也可以深度监视
computed(计算属性)：可以监视多个this相关属性值的改变，并且指定返回数据或对象，如果和原值一样，不会触发函数的调用
二者都是options中的根属性
      </pre>
      watch:<br/>
      <input type="text" name="" v-model="text">
      {{text}}
      <button @click="changeValue">改变值</button>
      <hr />

      computed:<br/>
      单价:<input type="text" name="" v-model="price"> * 
      件数:<input type="text" name="" v-model="num"> *
      折扣:<input type="text" name="" v-model="rate"> =
      {{sum.name}}:{{sum.price}}

      <div>{{ fullName }}</div>   
    </div>
</template>
<script>
    export default {
      data(){
        return {
          text:'',
          persons:[{name:'jack'},{name:'rose'}],

          price:0,num:0,rate:100,

          firstName: 'Foo',
          lastName: 'Bar'
        }
      },
      created(){},
      methods:{
        changeValue(){
          this.text = 'abc';
          this.persons[0].name = 'mick';
        }
      },
      // watch 对单个变量进行监视
      watch:{
        text:function(newV,oldV){
          console.log('text值改变了')
        },
        persons:{
          handler: function (val, oldVal) { 
            console.log('person改变了')
          },
          deep: true
        }
      },
      // computed 监视多个this相关属性值的改变
      computed:{
        sum(){
          console.log('computed触发了');
          //如果当函数内涉及到的this.相关属性发生改变以后触发，并返回一个值(可以是对象)
          return {
            name:'商品价格',
            price:this.price * this.num * (this.rate/100)
          }
        },
        fullName: {
          // getter
          get: function () {
            return this.firstName + ' ' + this.lastName
          },
          // setter
          set: function (newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
          }
          // vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新(vm是当前vue实例)

        }
      }
    }
</script>
<style scoped>

</style>