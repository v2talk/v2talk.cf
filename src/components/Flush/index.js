import React, { useState } from "react";
import _ from "lodash";
import "./index.scss";
const TYPE = {
  ord: {
    name: "🍎",
    val: 1,
    weight: 7,
  },
  col: {
    name: "🔥",
    val: 2,
    weight: 1,
  },
  row: {
    name: "💥",
    val: 3,
    weight: 1,
  },
  squ: {
    name: "💣",
    val: 4,
    weight: 1,
  },
};

const types = Object.keys(TYPE);
// 两种方式：
// 1.按权重比例填充数组，数组长度直接取random，缺点是构造数组空间复杂度不佳
// 2.按权重给每一项定义区间，取总权重的random，然后根据落到的区间取项
// 实现第二种，第一步：取总权重,第二步：给每一项定义区间,为降低时间复杂度，一个循环解决两件事
const weightSums = types.reduce((acc, i) => {
  const min = acc,
    max = acc + TYPE[i].weight;
  TYPE[i].weightMin = min;
  TYPE[i].weightMax = max;
  return max;
}, 0);

const calcSelected = (items, start, end) => {
  const abs = Math.abs(start.id - end.id);
  if (abs === 0) {
    return [start];
  }

  const maxRow = Math.max(start.row, end.row);
  const minRow = Math.min(start.row, end.row);

  const maxCol = Math.max(start.col, end.col);
  const minCol = Math.min(start.col, end.col);

  return _.filter(
    items,
    item =>
      item.col <= maxCol &&
      item.row <= maxRow &&
      item.col >= minCol &&
      item.row >= minRow
  );
};

const generateItem = (i) => {
  const curWeight = Math.floor(Math.random() * weightSums);

  const type = _.find(
    types,
    (key) =>
      curWeight >= TYPE[key].weightMin && curWeight <= TYPE[key].weightMax
  );

  return {
    ...TYPE[type],
    row: Math.floor(i / 8),
    col: i % 8,
    id: i
  };
};

const generateItems = () => {
  const items = new Array(64);
  let i = 0;
  while (i < 64) {
    items[i] = generateItem(i);
    i++;
  }

  return items;
};

const isArround = (item, target) => {
  const absRow = Math.abs(target.row - item.row);
  const absCol = Math.abs(target.col - item.col);

  return absRow <= 1 && absCol <= 1;
};

export default function Test() {
  const [items, setItems] = useState(generateItems());
  const [isDrawing, setIsDraw] = useState(false);
  const [start, setStart] = useState(null);
  const [point, setPoint] = useState(0);

  const handleMove = e => {
    setStart(e.target.id);
    setIsDraw(true);
  };

  const handleUp = e => {
    if (isDrawing) {
      let selected = calcSelected(items, items[start], items[e.target.id]);
      const task = new Promise((resolve, reject) => {
        // 先将区域内的变为isSelection，有背景变化
        const newItems = [...items];
        selected.forEach(i => {
          if(i.val === 1) {
            setPoint(point+1);
          }
          newItems[i.id] = {
            ...i,
            isSelecting: true
          };
        });
        setItems(newItems);
        setTimeout(() => {
          // 消除掉选中的正常元素
          const currentItems = [...newItems];
          var newStack = [];
          // 以初始为圆心，找出所有受影响的元素，直至所有都被压到栈里
          selected.forEach(item => {
            if (item.val !== 1) {
              const getEffected = item => {
                const isExist = y => !!_.find(newStack, { id: y.id });
                if (isExist(item)) {
                  return;
                }

                if (item.val === 1) {
                  setPoint(point + 1);
                }

                newStack.push(item);

                switch (item.val) {
                  case 2:
                    currentItems
                      .filter(t => t.col === item.col)
                      .forEach(tem => {
                        getEffected(tem);
                      });
                    break;
                  case 3:
                    currentItems
                      .filter(t => t.row === item.row)
                      .forEach(tem => {
                        getEffected(tem);
                      });
                    break;
                  case 4:
                    currentItems
                      .filter(t => isArround(t, item))
                      .forEach(tem => {
                        getEffected(tem);
                      });
                    break;
                }
              };

              getEffected(item);
            }
          });

          resolve({ newStack, currentItems });
        }, 50);
      });

      task
        .then(({ newStack, currentItems }) => {
          // 大扫除
          const newItems = [...currentItems];
          let addPoint = 0;
          newItems.forEach(item => {
            if (_.find(newStack, { id: item.id })) {
              item.isSelecting = true;
              if (item.val === 1) {
                ++addPoint;
              }
            }
          });
          setPoint(point + addPoint);
          setItems(newItems);
          // 往下移, 生成新的
          setTimeout(() => {
            const tempData = new Array(64);
            for (let i = 0; i < 8; i++) {
              const colData = newItems
                .filter(x => x.col === i && !x.isSelecting)
                .sort((a, b) => b.id - a.id);

              colData.forEach(
                (a, x) =>
                  (tempData[8 * (7 - x) + i] = {
                    ...a,
                    col: i,
                    row: 7-x,
                    id: 8 * (7 - x) + i
                  })
              );
              for (let j = 0; j < 8 - colData.length; j++) {
                tempData[8 * j + i] = generateItem(8 * j + i);
              }
            }

            setItems(tempData);
            return tempData;
          }, 500);
        })
        .then(items => {
          setStart(null);
          setIsDraw(false);
        });
    }
  };

  return (
    <div className="Flush">
      <div className="preview-area">
        {items.map((item, index) => {
          return (
            <div
              onTouchStart={(e) => handleMove(e)}
              onTouchEnd={(e) => handleUp(e)}
              onMouseDown={(e) => handleMove(e)}
              onMouseUp={(e) => handleUp(e)}
              className={`item ${item.isSelecting ? "item--selecting" : ""}`}
              id={item.id}
              key={item.id}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      <div className="point">⭐️得分⭐️：{point}</div>

      <ul className="additional">
        <li>
          符号含义：
          <ul>
            <li>
              🍎：点击被炸后得到相应个数的分数，自己被炸后所在列列会往下移
            </li>
            <li>🔥：竖炸弹，点击后所在列都被炸</li>
            <li>💥：横炸弹，点击后所在行都被炸</li>
            <li>💣：方炸弹，点击后已它为中心，周围 3*3 区域的格子都被炸</li>
          </ul>
        </li>
        <li>炸弹会引起关联效果</li>
        <li>PC 上可以通过鼠标选择区域</li>
        <li>TODO：控制每个出现的权重</li>
      </ul>
    </div>
  );
}
