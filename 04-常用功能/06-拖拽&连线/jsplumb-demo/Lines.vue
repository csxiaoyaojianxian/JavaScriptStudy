<template>
  <div>
    <div class="flowchart-demo">
      <div class="dragEle" id="flowchartWindow1">1</div>
      <div class="dragEle" id="flowchartWindow2">2</div>
      <div class="dragEle" id="flowchartWindow3">3</div>
      <div class="dragEle" id="flowchartWindow4">4</div>
    </div>
  </div>
</template>
<script>
import jsplumb from 'jsplumb'
export default {
  mounted(){
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
        Container:'flowchart-demo'
      })

      j.draggable(document.getElementsByClassName('dragEle'));
      j.addEndpoint('flowchartWindow1',{uuid:1 , anchor: "TopCenter",  isSource:true});
      j.addEndpoint('flowchartWindow2',{uuid:2 ,anchor:'Right', isTarget:true});
      j.addEndpoint('flowchartWindow3',{anthors:'Right', isTarget:true});
      // let line = j.connect({uuids: ["1", "2"], editable: true})
      j.connect({
        uuids:[1,2], // 根据uuid进行连接
        paintStyle: { stroke: 'red', strokeWidth: 3 }, // 线的样式
        endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 }, // 点的样式
        overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ] // 覆盖物 箭头 及 样式
      })
    });
  }
}
</script>

<style scoped lang="scss">
.flowchart-demo {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
  position: relative;
  .dragEle {
    position: absolute;
    border: 1px solid #15a1ff;
    width: 60px;
    height: 60px;
  }
}

#flowchartWindow1 {
    top: 34em;
    left: 5em;
}
#flowchartWindow2 {
    top: 7em;
    left: 36em;
}
#flowchartWindow3 {
    top: 27em;
    left: 48em;
}
#flowchartWindow4 {
    top: 23em;
    left: 22em;
}

</style>
