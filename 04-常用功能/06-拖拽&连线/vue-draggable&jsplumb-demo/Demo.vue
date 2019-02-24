<template>
  <div class="container flowchart">
    <draggable class="group1" v-model="list" element="ul" :options="dragOptions1" :move="onMove">
      <li v-for="(element, index) in list" :key="index">
        <div class="draggable">
          <span class="handler">拖动手柄</span><br/>
          <span class="handler">内容：{{element}}</span><br>
          <span class="filter">不可拖动</span>
        </div>
      </li>
    </draggable>
    <draggable class="group2" v-model="list2" element="ul" :options="dragOptions2" :move="onMove" :clone="onClone"
                 :component-data="getComponentData()" @start="onStart" @add="onAdd" @remove="onRemove" @update="onUpdate" @end="onEnd" @choose="onChoose" @sort="onSort" @filter="onFilter">
      <li v-for="(element, index) in list2" :key="index">
        <div class="draggable">
          <span class="handler">拖动手柄</span><br/>
          <span class="handler">内容：{{element}}</span><br>
          <span class="filter">不可拖动</span>
        </div>
      </li>
    </draggable>
    <draggable class="group2" v-model="list3" element="ul" :options="dragOptions3" :move="onMove">
      <li v-for="element in list3" :key="element.id">
        <div class="draggable" :id="element.id">
          <span class="handler">拖动手柄</span><br/>
          <span class="handler">内容：{{element.name}}</span><br>
          <span class="filter">不可拖动</span>
        </div>
      </li>
    </draggable>
    <draggable class="group3" v-model="list4" element="ul" :options="dragOptions4" :move="onMove">
      <li v-for="(element, index) in list4" :key="index">
        <div class="draggable">
          <span class="handler">拖动手柄</span><br/>
          <span class="handler">内容：{{element}}</span><br>
          <span class="filter">不可拖动</span>
        </div>
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import jsplumb from 'jsplumb'

export default {
  components: {
    draggable
  },
  data() {
    // https://github.com/SortableJS/Vue.Draggable
    return {
      // list: [], // vuex computed
      list2: ['ele4', 'ele5'],
      list3: [{
        id: 'dragEle1',
        name: 'ele6'
      }, {
        id: 'dragEle2',
        name: 'ele7'
      }, {
        id: 'dragEle3',
        name: 'ele8'
      }],
      list4: ['ele9', 'ele10'],

      dragOptions1: {
        animation: 300,
        group: 'group1', // 同一个组可以拖拽
        pull: 'clone'
      },
      // Options详解 https://github.com/SortableJS/Sortable#options
      dragOptions2: {
        // 分组
        group: { // string / array 用于分组
          name: 'group2', // 同一组的不同list可以相互拖动
          // pull: function (to, from) { // true|false|["foo", "bar"]|'clone'|function
          //   // to / from 分别指向对应的 <draggable> 此处实际tag为ul
          //   return from.el.children.length < 2 || 'clone'
          // },

          // pull: 'clone',
          put: ['group2'],
          revertClone: true // clone后其他元素归位
        },

        // 状态
        sort: true, // 是否可以拖拽排序
        disabled: false, // 禁用
        // draggable: '.draggable', // selector 可拖动元素
        // handle: '.handler', // selector 拖动手柄元素
        filter: '.filter', // selector 不能拖动元素

        // 动作
        preventOnFilter: true, // event.preventDefault()

        // 动画
        animation: 300, // ms 动画时间
        easing: 'cubic-bezier(1, 0, 0, 1)', // easing，默认null
        // delay: 100, // ms 拖动延迟时间s
        touchStartThreshold: 100, // 在多少像素移动范围内可取消延迟拖动事件

        // css
        ghostClass: 'ghost', // 辅助元素
        chosenClass: 'chosen', // 目标被选中时添加
        dragClass: 'drag', // 目标拖动过程中添加

        // fallback
        forceFallback: false, // true将不使用原生html5拖放，可以用来修改一些拖放中元素的样式等
        fallbackClass: 'forceFallback', // forceFallback=true时，拖放过程中鼠标附着单元的样式
        fallbackOnBody: false,  // clone元素添加到body
        fallbackTolerance: 0, // 以像素为单位指定鼠标在被视为拖动之前应移动多远

        // scroll
        scroll: false, // 拖放可以引起区域滚动
        // scrollFn: '', // function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) { … } 自定义滚动条的适配
        scrollSensitivity: 30, // 鼠标靠近边缘多远开始滚动，默认30
        scrollSpeed: 10, // 滚动速度
        bubbleScroll: true, // 对父元素都启动scroll，使更方便滚动

        swapThreshold: 1, // 0～1，触发sort的范围，http://sortablejs.github.io/Sortable/#thresholds
        invertSwap: false, // 触发另一边
        invertedSwapThreshold: 1, // ...
        direction: 'horizontal', // vertical，触发区域的方向
        // dragoverBubble: false,
        // removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
        // emptyInsertThreshold: 5,
        // store: null,  // @see Store
        // dataIdAttr: '', // data-id
      },
      dragOptions3: {
        animation: 300,
        group: 'group2'
      },
      dragOptions4: {
        animation: 300,
        group: {
          name: 'group3',
          pull: ['group2'],
          put: ['group2'],
          revertClone: true
        },
      },
      isDragging: false,
      activeNames: '' // test getComponentData()
    };
  },
  computed: {
    // vuex
    list: {
      get () {
        console.log('get list', this.$store.state.list)
        return this.$store.state.list
      },
      set (value) {
        console.log('set list', value)
        this.$store.commit('updateList', value)
      }
    }
  },
  mounted () {
    jsPlumb.ready(function() {
      var j = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { stroke: 'red', strokeWidth: 3 }, // 配置拖拽小点时连接线默认样式
        Endpoint: ['Dot', {radius: 5}], // 连线终端小点的半径
        EndpointStyle : { fill : 'red' },
        EndpointHoverStyle  : { fill : 'blue' },
        Connector: ['Flowchart',{curviness:70}],
        ConnectionOverlays: [
          [ 'Arrow', { location: 1 } ],
          [ 'Label', {
            location: 0.5,
            label: 'test',
            id: 'label',
            cssClass: 'aLabel'
          }]
        ],
        Container:'flowchart'
      })
      window.jsplumb = j
      j.draggable(document.getElementsByClassName('dragEle'));
      j.addEndpoint('dragEle1',{uuid:'dragEle1', anchor: "TopCenter",  isSource:true});
      j.addEndpoint('dragEle2',{uuid:'dragEle2', anchor:'Right', isTarget:true});
      // j.addEndpoint('dragEle2',{anthors:'Right', isTarget:true});
      // let line = j.connect({uuids: ["1", "2"], editable: true})
      j.connect({
        uuids:['dragEle1','dragEle2'], // 根据uuid进行连接
        paintStyle: { stroke: 'red', strokeWidth: 3 }, // 线的样式
        endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 }, // 点的样式
        overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ] // 覆盖物 箭头 及 样式
      })
    })
  },
  methods: {
    onMove ({ relatedContext, draggedContext }, originalEvent) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      // console.log(reslatedElement, draggedElement)
      console.log('onMove')
      this.$nextTick(() => {
        window.jsplumb.repaintEverything()
      })
    },
    // 指定克隆出来的元素
    onClone (original) {
      console.log(original)
      return original;
    },
    // ???
    getComponentData() {
      return {
        on: {
          change: (value) => {
            // console.log('changed', value)
          },
          input: (value) => {
            // console.log(value)
            this.activeNames = value;
          }
        },
        props: {
          value: this.activeNames
        }
      };
    },
    onStart (evt) {
      console.log('onStart')
      // console.log(evt)
    },
    onAdd (evt) {
      console.log('onAdd')
      // console.log(evt)
    },
    onRemove (evt) {
      console.log('onRemove')
      // console.log(evt)
    },
    onUpdate (evt) {
      console.log('onUpdate')
      // console.log(evt)
    },
    onEnd (evt) {
      console.log('onEnd')
      // console.log(evt)
    },
    onChoose (evt) {
      console.log('onChoose')
      // console.log(evt)
    },
    onSort (evt) {
      console.log('onSort')
      // console.log(evt)
    },
    onFilter (evt) {
      console.log('onFilter')
      // console.log(evt)
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
.container {
  .group1 {
    background-color: rgb(206, 252, 236);
  }
  .group2 {
    background-color: #a3bcff;
  }
  .group3 {
    background-color: rgb(224, 255, 188);
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
      width: 33.3%;
      height: 100px;
      padding: 5px;
      box-sizing: border-box;
      .draggable {
        width: 100%;
        height: 100%;
        background-color: aquamarine;
      }
    }
  }
}
/**
 * 额外样式
 */
.ghost {
  opacity: 0.5;
}
.chosen {
  opacity: 0.5;
  background-color: #fa74ff;
}
.drag {
  background-color: #00aeff;
}
</style>
