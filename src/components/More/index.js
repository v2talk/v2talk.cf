import React, {useState, useEffect, useLayoutEffect} from 'react';
import './App.scss';

import { WhiteSpace , Card, List } from "antd-mobile";

import { Link } from "react-router-dom";

import avatarImg from '../../images/normal.JPG';
import artsImg from '../../images/arts.jpg';
import v2talkImg from "../../images/v2talk.webp";
import v2talkIco from "../../images/v2talk.ico";
import ireadCat from "../../images/cheshire_cat.png";

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
    text: "语雀",
    link: "https://www.yuque.com/chaofeis/lifelog/",
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

function More(props) {

  return (
    <div className="More">
      <Card full>
        <Card.Header title="社交账号" thumb={avatarImg} />
        <Card.Body>
          <div className="social">
            {socialData.map((item, index) => (
              <SocialItem key={index} {...item} />
            ))}
          </div>
        </Card.Body>
        <Card.Footer content="欢迎关注" />
      </Card>

      <WhiteSpace />
      <WhiteSpace />

      <Card full>
        <Card.Header thumb={v2talkIco} title="公众号" />
        <Card.Body>
          <img src={v2talkImg} alt="v2talk: chaofeis 的微信公众号" />
        </Card.Body>
        <Card.Footer content="欢迎订阅" />
      </Card>

      <WhiteSpace />
      <WhiteSpace />

      <Card full>
        <Card.Header title="作品集" thumb={artsImg} />
        <Card.Body>
          <List renderHeader={() => "DONE"}>
            <Item
              arrow="horizontal"
              thumb={ireadCat}
              multipleLine
              onClick={() => { window.open("https://chafel.github.io/iRead/", '_blank');}}
            >
              iRead
              <Brief>
                功能类似稍后阅读软件 Pocket <br />
                的浏览器插件， 可以将想记录的网页
                <br />
                URL 收藏到 GitHub 制定的 Repo
              </Brief>
            </Item>
            <Item extra="去玩玩" arrow="horizontal" onClick={() => {
              props.history.push("/flush");
            }}>
              React 版消消乐
            </Item>
            <Item extra="去试试" arrow="horizontal" onClick={() => {
              props.history.push("json-parser");
            }}>
              JSON Parser
            </Item>
          </List>

          <WhiteSpace />

          <List renderHeader={() => "TODO"}>
            <Item extra="🤐">BuzzReading</Item>
          </List>
        </Card.Body>
        <Card.Footer content="更多作品酝酿中" />
        <WhiteSpace />
      </Card>
    </div>
  );
}

export default More;
