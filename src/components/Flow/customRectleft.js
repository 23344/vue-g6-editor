import G6 from "@antv/g6/build/g6";
import { uniqueId } from '@/utils'
import Shape from '@antv/g/src/shapes'
const customRectleft = {
  init() {
    G6.registerNode("customRectleft", {
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
        const mainId = 'customRectleft' + uniqueId()
        const shape = group.addShape("rect", {
          attrs: {
            id: mainId,
            x: 0 + offsetX,
            y: 0 + offsetY,
            width: width,
            height: height,
            fill: color,//此处必须有fill 不然不能触发事件
            opacity: 1,
            radius: 0
          }
        });

        group.addShape("circle", {
          attrs: {
            x: 0 + offsetX,
            y: 0 ,
            r: height/2,
            fill: color,
            opacity: 1,
            parent: mainId,
          }
        });

        group.addShape("circle", {
            attrs: {
              x: width + offsetX,
              y: 0 ,
              r: height/2,
              fill: '#fff',
              opacity: 1,
              parent: mainId,
            }
          });

        if (cfg.label) {
           group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: -width/4,
              y: 0,
              textAlign: "center",
              textBaseline: "middle",
              text: cfg.label,
              parent: mainId,
              fill: "#fff"
            }
          });
        }

        // draw points  ,no inpoint
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
                  // my add
                  idType: 0,
                  // my add
                  parent: id,
                  x: x + offsetX,
                  y: y + offsetY,
                  r: 10,
                  isInPointOut: true,
                  fill: "#1890ff",
                  opacity: 0
                }
              });
              group.addShape("circle", {
                attrs: {
                  id: id,
                  x: x + offsetX,
                  y: y + offsetY,
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
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
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
          shape.attr("fill", color);
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          shape.attr("fill", color);
          circles.forEach(circle => {
            circle.attr('opacity', 0)
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

export default customRectleft
