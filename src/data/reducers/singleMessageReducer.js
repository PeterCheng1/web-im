import {MESSAGE_LISTS_UPDATE,MESSAGE_LISTS_STATE_UPDATE,MESSAGE_LISTS_DIFFTIME_UPDATE} from '@data/actions/actionTypes.js';
import {Map} from 'immutable';
import Item from '_antd@3.3.3@antd/lib/list/Item';
/**
 * {
 *  sheldon2001:[],
 *  sheldon2002:[]
 * }
*/
const initialState = Map({})
export default function singleReducer (state=initialState,action) {
    switch (action.type) {
        case MESSAGE_LISTS_UPDATE:
            var singlecharRoom =action.playload.message.singleRoom;
            if(state.has(singlecharRoom)){
                return state.set(singlecharRoom,[...state.get(singlecharRoom),action.playload.message])
            }else{
                return state.set(singlecharRoom,[action.playload.message])
            }
        case MESSAGE_LISTS_STATE_UPDATE:
            var singleRoom =action.playload.message.singleRoom;
            
            return state.update(singleRoom,(msgLists)=>{
                return msgLists.map((msg,idx)=>{
                    if(msg.id === action.playload.message.id) {
                        msg.state = action.playload.message.state
                        if(action.playload.message.msgId) {
                            msg.id = action.playload.message.msgId
                        }
                    }
                    return msg;
                })
            })
        case MESSAGE_LISTS_DIFFTIME_UPDATE:
             var {diffTime,id,singleRoom} = action.playload.msgObj;
            return state.update(singleRoom,(msgLists)=>{
                return msgLists.map((msg,idx)=>{
                    if(msg.id === id) {
                        msg.diffTime = diffTime
                    }
                    return msg;                    
                })
            })
        default:
            return state;
    }
}