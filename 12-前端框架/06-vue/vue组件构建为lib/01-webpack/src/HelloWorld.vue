<template>
  <div>
    <span class="name" @click="click">
      {{ name }}
    </span>
    <test :data="name"></test>
  </div>
</template>

<script>
import test from './test.vue'
import style from './style.css'
export default {
  components: {
    test
  },
  data() {
    return {
      name: 'csxiaoyao'
    }
  },
  methods: {
    click () {
      this.name = 'sunshine'
      console.log(this.name)
    }
  },
}
</script>

<style>
.name {
  color: red;
}
</style>