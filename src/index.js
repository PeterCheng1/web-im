import React from 'react';
import ReactDOM from 'react-dom';
import {conn} from './sdk/init';
import App from './App';
import './assets/css/reset.css';
import registerServiceWorker from './registerServiceWorker';
import immutable from 'immutable';
import '@assets/iconfonts/iconfont.css'

window.im = immutable;
window.conn = conn;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
