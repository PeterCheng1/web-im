import React from 'react';
import ReactDOM from 'react-dom';
import {conn} from './sdk/init';
import App from './App';
import './assets/css/reset.css';
import registerServiceWorker from './registerServiceWorker';

window.conn = conn;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
