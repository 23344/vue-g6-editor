<template>
  <ul>
    <li
      v-for="(item,index) in list"
      :key="index"
      class="getItem"
      :data-shape="item.shape"
      :data-type="item.type"
      :data-size="item.size"
      draggable
      @dragstart="handleDragstart"
      @dragend="handleDragEnd($event,item)"
    >
      <div class="pannel-type-icon">
        <el-image :src="item.image">
        </el-image>
      </div>

      <!-- <span class="pannel-type-icon" :style="{background:'url('+item.image+')'}"></span> -->
  
      {{item.name}}
    </li>
  </ul>
</template>

<script>
import eventBus from "@/utils/eventBus";
import okSvg from "@/assets/icons/ok.svg";
import bgImg from "@/assets/bg.jpg";
import rectdown from "@/assets/rectdown.png"

export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: [
        {
          name: "外部操作",
          label: "外部操作",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/H52d89669466149a5a7d2852d6365dbc19.jpg",
          rectdown: true,
          shape: "customRectdown",
          color: "#1890ff",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },

        {
          name: "变量值",
          label: "变量值",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/H28ed0a772db1446abc4a250a28de217fB.jpg",
          shape: "customParallel",
          color: "#1890ff",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },
        {
          name: "变量定义",
          label: "变量定义",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/Hd2fbba3bfdb34260a910b050db893418o.jpg",
          shape: "customHexagon",
          color: "#1890ff",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },
        {
          name: "变量引用",
          label: "变量引用",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/Hc3a12886495d4e36b746ff3adc72a81fd.jpg",
          shape: "customEllipse",
          color: "#1890ff",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },
        {
          name: "分支节点",
          label: "分支节点",
          size: "80*80",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/H791c91981a4943019e5a76df7ee30cc16.jpg",
          shape: "customDiamond",
          color: "#1890ff",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          // isDoingEnd: true
        },
        {
          name: "知识点",
          label: "知识点",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          shape: "customRect",
          color: "#409EFF",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "变量采集",
          label: "变量采集",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/H84bd7f92ca6a45888ebf22cc8ce03a4fB.jpg",
          shape: "customRectsides",
          color: "#409EFF",
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
        },
        {
          name: "答案定义",
          label: "答案定义",
          size: "100*50",
          type: "node",
          x: 0,
          y: 0,
          image: "https://ae01.alicdn.com/kf/H0e6b3260f5664faa90f31a889577220e2.jpg",
          shape: "customRectleft",
          color: "#409EFF",
          inPoints: [[0, 0.5]],
          isDoingEnd: true
        }
      ]
    };
  },
  created() {
    this.bindEvent();
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    },
    handleDragEnd(e, item) {
      let data = {};
      // typescript: assign(target,source1,source2,..)
      Object.assign(data, item);
      data.offsetX = this.offsetX;
      data.offsetY = this.offsetY;
      if (this.page) {
        const graph = this.page.graph;
        // const size = e.target.dataset.size.split("*");
        const xy = graph.getPointByClient(e.x, e.y);
        data.x = xy.x;
        data.y = xy.y;
        data.size = item.size.split("*");
        data.type = "node";
        this.command.executeCommand("add", [data]);
      }
    },
    bindEvent() {
      eventBus.$on("afterAddPage", page => {
        this.page = page;
        this.command = page.command;
      });
    }
  }
};
</script>

<style scoped>
.itempannel {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  padding-top: 8px;
  border-right: 1px solid #e6e9ed;
}
.itempannel ul {
  padding: 0px;
  /* padding-left: 16px; */
}
.itempannel li {
  color: rgba(0, 0, 0, 0.65);
  /* border-radius: 4px; */
  float: left;
  width: 50%;
  height: 50%;
  line-height: 26px;
  margin-left: -16px;
  margin-right: 14px;
  /* padding-left: 8px; */
  border: 1px solid rgba(0, 0, 0, 0);
  list-style-type: none;
  /* my add */
  display: block;
}
.itempannel li:hover {
  background: white;
  border: 1px solid #ced4d9;
  cursor: move;
}

.itempannel .pannel-type-icon {
  width: 78px;
  height: 78px;
  display: block;
  /* vertical-align: middle; */
  /* margin-right: 8px; */
}
</style>