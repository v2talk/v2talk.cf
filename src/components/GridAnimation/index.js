import React, { useState, useEffect } from "react";
import './index.css';
import _ from 'lodash';
import classnames from 'classnames'

const indexArray = [];
const initData = () => {
  const arr = [];
  for(let i=1;i<10;i++) {
    arr.push({
      index: i,
      text: i
    })
    indexArray[i-1] = i;
  }

  return arr;
};

const W = 100;
const getPosition = i => {
  const row = Math.floor((i-1) / 3)
  const col = (i-1)%3;
  
  let x = W*col;
  let y = row*W;
  return {
    left:x,
    top:y
  }
};


export default function Animation() {
  const [data, setData] = useState(initData());

  useEffect(() => {
    const interval = setTimeout(() => {
      _.shuffle(indexArray).forEach(
        (item, index) => (data[index].index = item)
      );
      setData([...data]);
    }, 800);

    return () => clearTimeout(interval)
  },[data])
  

  return (
    <div className="GridAnimation">
      <div className="container">
        {data.map(({ text, index }) => {
          return (
            <div
              className={classnames("card", {
                top_card: text === 1,
                middle_card: text === 5,
                bottom_card: text === 9,
              })}
              style={{ order: index }}
              key={text}
            >
              {text}
            </div>
          );
        })}
      </div>

      <div className="container container-1">
        <div className="card top_card">1</div>
        <div className="card">2</div>
        <div className="card">3</div>

        <div className="card">4</div>
        <div className="card middle_card">5</div>
        <div className="card ">6</div>

        <div className="card">7</div>
        <div className="card">8</div>
        <div className="card bottom_card">9</div>
      </div>

      <div className="container container-2">
        {data.map(({ text, index }) => {
          return (
            <div
              className={classnames("card", {
                top_card: text === 1,
                middle_card: text === 5,
                bottom_card: text === 9,
              })}
              style={{ order: index }}
              key={text}
            >
              {text}
            </div>
          );
        })}
      </div>
      <div className="container container-3">
        {data.map(({ text, index }) => {
          return (
            <div
              className={classnames("card", {
                top_card: text === 1,
                middle_card: text === 5,
                bottom_card: text === 9,
              })}
              key={text}
              style={getPosition(index)}
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}