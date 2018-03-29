
/**
 * Created by sheldonyee
 * github petercheng1 
 * 构造redux
 * 
 * combineReducer ==> applyMiddlers ==> createStore === store
 */

import {/*compose,combineReducers*/createStore, applyMiddleware} from 'redux';

import {combineReducers} from 'redux-immutable';

import thunk from 'redux-thunk';

import loginReducer from '@data/reducers/loginReducer.js'

import subscribeReducer from '@data/reducers/subscribeReducer.js'

const reducers = {
    login:loginReducer,
    subscribe:subscribeReducer
}

const _reducers = combineReducers(reducers)

const middlewares = [thunk];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);

const store = finalCreateStore(_reducers)

export default store;

