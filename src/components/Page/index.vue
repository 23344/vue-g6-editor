<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6/build/g6";
import { initBehavors } from "@/behavior";
// my add
import datajson from "@/mock/data.json"
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    initBehavors();
  },
  mounted() {
    this.$nextTick(() => {
      this.init(); //under 'this' bind to top 'this'
    });
  },
  methods: {
    init() {
      const height =  this.height - 42 
      const width =  this.width - 400

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          // default: [
          default:[
            "drag-canvas",
            "zoom-canvas",  //bigger or smaller
            "hover-node",
            "select-node",  //here
            "hover-edge",
            "keyboard",
            "customer-events",  //how about here
            "add-menu"
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode:[ "drag-item"]
        }
      });
      const { editor, command } = this.$parent;
      editor.emit("afterAddPage", { graph: this.graph, command });

      // 读取数据 render():渲染图
      this.readData();
    },
    readData() {
      let data = this.data;

      // my add
      if(datajson){
        this.graph.read(datajson);
      }

      if (data) {
        this.graph.read(data);
      }
    }
  }
};
</script>

<style scoped>
.page{
  margin-left:200px;
  margin-right: 200px;
}
</style>