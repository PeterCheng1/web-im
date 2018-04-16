import {GROUP_INVITE_MESSAGE_ADD,GROUP_INVITE_MESSAGE_REMOVE} from '@data/actions/actionTypes.js';
import {List} from 'immutable'

const initialState = List([])
export default function groupInviteReducer(state=initialState,action) {
    switch (action.type) {
        case GROUP_INVITE_MESSAGE_ADD:
            let newMsg = Map(action.playload.inviteMessage);
            if(state.includes(newMsg)){
                return state
            }else{
                return state.push(newMsg);
            }
        case GROUP_INVITE_MESSAGE_REMOVE:
            let from = action.playload.subscribeMessage.get('from')
                return state.filter((msg,index)=>{
                    return msg.get('from') !== from;
            })       
        default:
            return state;
    }
}