import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './containers/login/index'
import ChatPage from './containers/chat/chat'
import {Provider} from 'react-redux';
import store from './data/create'
import {safeRender} from '@assets/js/safeRender'
import { Router, Route, Link,hashHistory } from 'react-router'
/*
  路由:
  / ==> 登陆注册页面
  /chat ==> 聊天页面
  /chat/single/:uid ==> 单聊
  /chat/group/:uid ==> 群聊
*/
@safeRender
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory} >
          <Route path="/" component={LoginPage} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/chat/single/:uid" component={ChatPage} />
          <Route path="/chat/group/:uid" component={ChatPage} />
        </Router>
      </Provider>
    )
  }
}

export default Main;
