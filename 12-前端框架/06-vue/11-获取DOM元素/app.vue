<template>
    <div>
    <pre>
* 在指定的元素上，添加ref="名称A"
* 在获取的地方加入 this.$refs.名称A  
    - 如果ref在原生DOM元素上，获取的数据是原生DOM对象
    - 如果ref在组件对象上，获取的是组件对象
        + 获取到DOM对象,通过this.$refs.sub.$el,进行操作
    - 对应的事件
        + created 完成了数据的初始化，此时还未生成DOM，无法操作DOM
        + mounted 将数据已经装载到了DOM之上,可以操作DOM
    </pre>
        <sub-vue ref="sub"></sub-vue>

        <div ref="myDiv">
            {{text}}
        </div>
    </div>
</template>
<script>
    import SubVue from './sub.vue';
    export default {
        data(){
            return {
                text:'123'
            }
        },
        components:{
            subVue:SubVue
        },
        //组件创建,数据已完成初始化,但是DOM还未生成
        created(){
            console.log('created myDiv:',this.$refs.myDiv);// 获取不到 undefined

            // console.log('created sub:',this.$refs.sub.$el); // error
        },
        //数据完成装载到DOM上，DOM已经生成
        mounted(){
            console.log('mounted myDiv:',this.$refs.myDiv);
            // DOM操作
            this.$refs.myDiv.innerHTML = 'sunshine';
            // 双向数据绑定，修改DOM后，双向绑定失效
            this.text = 'csxiaoyao';            

            console.log('mounted sub:',this.$refs.sub.$el);
            //获取组件对象，并获取到其的DOM对象
            this.$refs.sub.$el.innerHTML = 'sunshine';
        }
    }
</script>
<style>
    
</style>