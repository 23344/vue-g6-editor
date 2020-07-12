<template>
  <div />
</template>

<script>
import customNode from "./customNode";
import customEdge from "./customEdge";
// my add
import customRect from "./customRect";
import customDiamond from "./Diamond";
import customEllipse from "./customEllipse"
import customHexagon from "./customHexagon"
import customParallel from "./customParallel"
import customRectdown from "./customRectdown"
import customRectsides from "./customRectsides"
import customRectleft from "./customRectleft"

import teamNode from './teamNode'
export default {
  name:'Flow',
  data() {
    return {
      page: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      customNode.init();
      customEdge.init();
      // my add
      customRect.init();
      customDiamond.init();
      customEllipse.init();
      customHexagon.init();
      customParallel.init();
      customRectdown.init();
      customRectsides.init();
      customRectleft.init();

      teamNode.init();
    }
  }
};
</script>


