import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './containers/login/index'
import {Provider} from 'react-redux';
import store from './data/create'
class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

export default Main;
