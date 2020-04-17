import React from "react";
import './index.scss'

const TextItem = ({detail}) => <>{detail}</>;
const LinkItem = ({ detail }) => (
  <a href={detail} rel="noopener noreferrer" target="_blank">
    {detail}
  </a>
); 

export default function MessageItem({role, detail, type}) {

  const getItem = () => {
    let item = null;
    switch (type) {
      case "link":
        item = <LinkItem detail={detail} />;
        break;
      default:
        item = <TextItem detail={detail} />;
        break;
    }

    return item;
  }
  return (
    <div className={`message ${role === 1 ? 'left' : 'right'}`}>
      <div className="message-text">{getItem()}</div>
    </div>
  );
}
 // <div className="message right">
      //   <div className="message-text">Hi!</div>
      //   <div className="message-text">Where are you now?</div>
      // </div>