import React, { Component } from 'react';
import { Router, Route,hashHistory } from 'react-router'
import {safeRender} from '@assets/js/safeRender'
import LoginContainer from './containers/loginContainer/index'
import ChatContainer from './containers/chatContainer/index'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import {Provider} from 'react-redux';
import store from './data/create'
import './App.css';

/*
  路由:
  / ==> 登陆注册页面
  /chat ==> 聊天页面
  /chat/single/:uid ==> 单聊
  /chat/group/:uid ==> 群聊
  /chat/personal/:uid ==> 个人信息处理(如添加好友等等)
*/

@safeRender
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory} >
          <Route path="/" component={LoginContainer} />
          <Route path="/chat/single/" component={ChatContainer} />
        </Router>
      </Provider>
    );
  }
}

export default App;
