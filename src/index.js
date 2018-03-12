import React from 'react';
import ReactDOM from 'react-dom';
import {conn} from './sdk/init';
import App from './App';
import LoginPage from './containers/login/index'
import registerServiceWorker from './registerServiceWorker';

window.conn = conn;

ReactDOM.render(<LoginPage />, document.getElementById('root'));
registerServiceWorker();
