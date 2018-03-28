
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

const reducers = {
}

const _reducers = combineReducers(reducers)

const middlewares = [thunk];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);

const store = finalCreateStore(_reducers)

export default store;

