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

