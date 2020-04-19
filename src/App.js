import React, {useState, useEffect, useLayoutEffect} from 'react';
import './App.scss';

import messages from './data';
import MessageItem from './components/MessageItem';

function App() {
  const [current, setCurrent] = useState(1);
  const [ending, setEnnding] = useState(false);

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
        {ending ? '对方已离开，Bye！' : '对方正在输入中...'}
      </div>
    </div>
  );
}

export default App;
