import React, { useState, useCallback } from "react";
import './index.scss';
import {Button} from 'antd-mobile';

function ShowObject({object}) {
  const [isShow, toggleShow] = useState(false);
  const keys = Object.keys(object);

  return (
    <>
      {keys.map(k => {
        if (typeof object[k] !== "object") {
          return (
            <div className="obj-result" key={k}>
              {k} : {object[k]}
            </div>
          );
        }

        return (
          <div key={k} className="obj-result">
            {k} :
            {!isShow ? (
              <>
                <span>{`{`}</span>
                <Button
                  className="action-button"
                  inline
                  size="small"
                  onClick={() => toggleShow(!isShow)}
                >
                  {Object.keys(object[k]).length}
                </Button>
                ...
                <span>{`}`}</span>
              </>
            ) : (
              <>
                <span>{`{`}</span>
                <Button
                  className="action-button"
                  inline
                  size="small"
                  onClick={() => toggleShow(!isShow)}
                >
                  -
                </Button>
                <ShowObject object={object[k]}></ShowObject>
                <span>{`}`}</span>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function Test() {
  const [object, setObj] = useState({});
  const [text, setText] = useState(JSON.stringify({"text": {"a": {"b": 1, "c": 3}}}));

  function handler() {
    let obj = {};
    try {
      obj = JSON.parse(text);
    } catch (e) {
      alert('请检查输入是否为 JSON string！')
    }
    setObj(obj);
  }

  return (
    <div className="JSON-parser">
      <div className="input-area">
        <textarea
          name="json-input"
          onChange={(e) => setText(e.target.value)}
          value={text}
          id="input"
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <Button
        inline
        size="small"
        type="primary"
        className="button"
        onClick={handler}
      >
        转JSON
      </Button>

      <code className="preview-area">
        <p>{`{`}</p>

        <ShowObject object={object}></ShowObject>

        <p>{`}`}</p>
      </code>

      <ol className="tips">
        <li>输入为待解析的 JSON 字符串</li>
        <li>输出结果数字表示所包含的 key 的个数</li>
        <li>点击数字可展开，点击减号可收起</li>
      </ol>
    </div>
  );
}