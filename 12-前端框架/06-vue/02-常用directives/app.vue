<template>
  <!-- 只能有1个根节点 -->
  <div>   
    <pre>
      * v-text 是元素的innerText只能在双标签中使用
      * v-html 是元素的innerHTML，不能包含<!-- {{xxx}} -->
      * v-if 元素是否移除或者插入
      * v-show 元素是否显示或隐藏
      * v-model 双向数据绑定，v-bind是单向数据绑定(内存js改变影响页面)
    </pre>

    v-text:
    <span v-text="text"></span>
    <hr/>

    v-html:
    <span v-html="html"></span>
    <hr/>

    v-if:
    <div v-if="isShow" style="height:100px;background-color:red;"></div>

    <div v-if="Math.random() > 0.5">Yes</div>
    <div v-else>No</div>

    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else-if="type === 'C'">C</div>
    <div v-else>Not A/B/C</div>
    <hr/>

    v-show:
    <div v-show="isShow" style="height:100px;background-color:green;"></div>
    <hr/>

    v-model:
    <input type="text" name="" v-model="mTest">
    <input type="text" name="" v-bind:value="mTest">

    {{mTest}}
    <br/>

  </div>

</template>
<script>
    export default {
        data(){
            return {
                text:'csxiaoyao',
                html:`
                    <ul>
                        <li>cs1</li>
                        <li>cs2</li>
                    </ul>
                `,
                isShow:true,
                mTest:'sunshine'
            }
        }
    }
</script>

<style>

</style>
