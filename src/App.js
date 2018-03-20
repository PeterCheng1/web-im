import React, { Component } from 'react';
import './App.css';
import LoginPage from './containers/login/index'
import ChatPage from './containers/chat/chat'
import {Provider} from 'react-redux';
import store from './data/create'
import {safeRender} from '@assets/js/safeRender'
import { Router, Route,hashHistory } from 'react-router'
/*
  路由:
  / ==> 登陆注册页面
  /chat ==> 聊天页面
  /chat/single/:uid ==> 单聊
  /chat/group/:uid ==> 群聊
  /chat/personal/:uid ==> 个人信息处理(如添加好友等等)
*/
@safeRender
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory} >
          <Route path="/" component={LoginPage} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/chat/single" component={ChatPage} />
          <Route path="/chat/group/" component={ChatPage} />
          <Route path="/chat/personal/" component={ChatPage} />
        </Router>
      </Provider>
    )
  }
}

export default Main;
