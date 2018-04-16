
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

import blackReducer from '@data/reducers/blackReducer.js'

import friendReducer from '@data/reducers/friendReducer.js'

import singleReucer from '@data/reducers/singleMessageReducer.js'

import currentReucer from '@data/reducers/currentChat.js'

import noReadMsgReducer from '@data/reducers/noReadMsgReducer.js'

import groupInviteReducer from  '@data/reducers/groupInviteReducer.js'

const reducers = {
    login:loginReducer,
    subscribe:subscribeReducer,
    black:blackReducer,
    friend:friendReducer,
    singleMessage:singleReucer,
    current:currentReucer,
    noRead:noReadMsgReducer,
    groupInvite:groupInviteReducer
}

const _reducers = combineReducers(reducers)

const middlewares = [thunk];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);

const store = finalCreateStore(_reducers)

export default store;

