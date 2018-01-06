<template>
    <div>
        v-for  2.2.0+版本，key是必须的
        in 可以用 of 替代，v-for="item of items"
        <ul>

          操作数组 (item,index)

          <li v-for="(stu,index) in stus" v-bind:key="index">
            index:{{index}}
            stu:{{stu}}
          </li>
          <hr/>

          操作对象 (value,key,index)

          <li v-for="(value,key,index) in person" :key="index">
            value:{{value}}
            key:{{key}}
            index:{{index}}
          </li>

        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                stus:[{name:'jack',score:'A'},{name:'rose',score:'B'}],
                person:{name:'mick',alise:'迈克'}
            }
        },
        methods:{

        }
    }
</script>
<style>
.red{
    background-color: red;
}
.green{
    background-color: green;
}
.big{
    font-size: 30px;
}
</style>