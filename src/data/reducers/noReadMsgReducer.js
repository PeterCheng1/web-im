import {SINGLE_NO_READ_MESSAGE_NUM,GROUP_NO_READ_MESSAGE_NUM} from '@data/actions/actionTypes.js';
import {fromJS} from 'immutable';

const initialState = fromJS({
    single:{},
    group:{}
});

export default function noReadMsgReducer(state = initialState,action){

    switch (action.type) {
        case SINGLE_NO_READ_MESSAGE_NUM:
            var {username,num} = action.playload.noReadData;
            return state.setIn(['single',username],num)
        case GROUP_NO_READ_MESSAGE_NUM :
            var {groupname,num} =  action.playload.noReadData;
            return state.setIn(['group',groupname],num)
        default:
            return state;
    }
}

/**
 * new的特性
 * new 的结果是一个新对象
 * 结果会具有构造函数里的属性
 * 我们知道实例的 __proto__ 属性会指向构造函数的 prototype，也正是因为建立起这样的关系，实例可以访问原型上的属性
 *  objectFactory(Otaku, ……) 调用
*/

const objectFactory = function() {
    let obj = new Object();
    let Constructor = [].shift.call(arguments);
    obj.Constructor = Constructor;
    obj.__proto__ = Constructor.prototype;
    const ret = Constructor.apply(obj,Array.from(arguments));
    return typeof ret === 'object' ? ret : obj;
}




