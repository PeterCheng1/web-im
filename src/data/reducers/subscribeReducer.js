import {FRIEND_SUBSCRIBE_ADD,FRIEND_SUBSCRIBE_REMOVE} from '@data/actions/actionTypes.js';
import {List,Map} from 'immutable';


const initialState = List([])
export default function loginReducer(state=initialState,action){
    switch (action.type) {
        case FRIEND_SUBSCRIBE_ADD:
            let newMsg = Map(action.playload.subscribeMessage);
            if(state.includes(newMsg)){
                return state
            }else{
                return state.push(newMsg);
            }
        case FRIEND_SUBSCRIBE_REMOVE:
            let from = action.playload.subscribeMessage.get('from')
            return state.filter((msg,index)=>{
                return msg.get('from') !== from;
            })       
        default:
            return state;
    }
}