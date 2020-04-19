import React, {useState, useEffect, useLayoutEffect} from 'react';
import './App.scss';

import messages from '../../data';
import MessageItem from '../MessageItem';

import { Button, Icon, Modal, Card, List } from "antd-mobile";

import { Link } from "react-router-dom";

const Item = List.Item;
const Brief = Item.Brief;

const socialData = [
  {
    text: "Twitter",
    link: "https://twitter.com/chaofeis",
  },
  {
    text: "Instagram",
    link: "https://www.instagram.com/sunchaofei/",
  },
  {
    text: "豆瓣",
    link: "https://www.douban.com/people/chafel/",
  },
];

const SocialItem = ({ link, text }) => (
  <a href={link} rel="noopener noreferrer" target="_blank">
    {text}
  </a>
); 

function App(props) {
  const [current, setCurrent] = useState(1);
  const [ending, setEnnding] = useState(false);

  useEffect(() => {
    props.history.listen((location, action) => {
      console.log("on route change", location, action);
      document.getElementById("analytics").style.display =
        location.pathname === "/" ? "block" : "none";
    });
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (current === messages.length) {
        setEnnding(true);
      } else {
        setCurrent(current + 1);
      }
    }, Math.random()*5000);

    return () => clearInterval(timer);
  }, [current]);

  useLayoutEffect(() => {
    const contentArea = document.getElementsByClassName("phone")[0];
    
    if (contentArea.scrollHeight > contentArea.clientHeight) {
      contentArea.scrollTop =
        contentArea.scrollHeight - contentArea.clientHeight;
    }
  
  }, [current]);

  return (
    <div className="App">
      <div className="phone">
        {messages.slice(0, current).map((message, index) => (
          <MessageItem key={index} {...message} />
        ))}
      </div>

      <div className="bottom">
        {ending ? (
          <>
            <Icon type="cross-circle" size="sm" />
            对方已离开，Bye！
          </>
        ) : (
          <>
            <Icon type="loading" size="sm" />
            对方正在输入中...
          </>
        )}
        <Link to="/chaofeis">
          More
        </Link>
      </div>
    </div>
  );
}

export default App;
