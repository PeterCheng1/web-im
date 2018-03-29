import {FRIEND_SUBSCRIBE_ADD,FRIEND_SUBSCRIBE_REMOVE} from '@data/actions/actionTypes.js';
import {fromJS} from 'immutable';


const initialState = fromJS([])
export default function loginReducer(state=initialState,action){
    switch (action.type) {
        case FRIEND_SUBSCRIBE_ADD:
            let newMsg = fromJS(action.playload.subscribeMessage);
            if(state.includes(newMsg)){
                return state
            }else{
                return state.push(newMsg);
            }
        case FRIEND_SUBSCRIBE_REMOVE:
            let {from} = action.playload.subscribeMessage
            return state.filter((msg,index)=>{
                return msg.from !== from;
            })       
        default:
            return state;
    }
}