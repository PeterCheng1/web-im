
/**
 * Created by sheldonyee
 * github petercheng1 
 * 构造redux
 * 
 * combineReducer ==> applyMiddlers ==> createStore === store
 */

'use strict';

import {compose, createStore, combineReducers, applyMiddleware} from 'redux';

import loginReducer from './reducers/login'

const reducers = {
    login : loginReducer
}

const _reducers = combineReducers(reducers)

const middlewares = [];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);

const store = finalCreateStore(_reducers)

export default store;

