// import G6 from "@antv/g6/build/g6";
import G6 from "@antv/g6";
import { uniqueId } from '@/utils'
// import Shape from '@antv/g/src/shapes'
const customEllipse = {
  init() {
    G6.registerNode("customEllipse", {
      draw(cfg, group) {
        let size = cfg.size;
        if(!size){
          size=[100,50]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'customEllipse' + uniqueId()
        const shape = group.addShape("ellipse", {
          attrs: {
            id: mainId,
            x: width / 2,
            y: height / 2,
            rx: width / 2,
            ry: height / 2,
            fill: '#b7eb8f',
            stroke: '#b7eb8f',
          }
        });

        group.addShape("ellipse", {
          attrs: {
            x: width / 2,
            y: height / 2,
            rx: width / 2,
            ry: height / 2,
            fill: '#b7eb8f',
            stroke: '#b7eb8f',
            parent: mainId,
          }
        });

        if (cfg.label) {
           group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: width / 2,
              y: height / 2,
              textAlign: "center",
              textBaseline: "middle",
              text: cfg.label,
              parent: mainId,
              fill: "#565758"
            }
          });
        }

        // draw points
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            x = width * cfg.inPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: width / 2,
                y: y,
                r: 10,
                isInPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: width / 2,
                y: y,
                r: 3,
                isInPoint: true,
                fill: "#fff",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            x = width * cfg.outPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x ,
                y: y ,
                r: 10,
                isOutPointOut: true,
                // fill: "#1890ff",
                fill:"#f00",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x ,
                y: y ,
                r: 3,
                isOutPoint: true,
                fill: "#f00",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          }
        }
        //group.sort()
        // 添加文本、更多图形
        return shape;
      },
      //设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        });
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("fill", "#f3f9ff");
          shape.attr("stroke", "#6ab7ff");
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 0.5)
          })
        };
        const unSelectStyles = () => {
          shape.attr("fill", "#f00");
          shape.attr("stroke", "#ced4dd");
          circles.forEach(circle => {
            circle.attr('opacity', 0.5)
          })
        };
        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
        }
      }
    });
  }
}

export default customEllipse
