import {REMOVE_SUBSCRIBE_MESSAGE,ADD_SUBSCRIBE_MESSAGE} from '../actions/actionTypes'

export default function subscribeReducer(state={subscribeMsg:[]},action){
    switch (action.type) {
        case ADD_SUBSCRIBE_MESSAGE: 
            return {subscribeMsg:[action.playload.subscribeMsg,...state.subscribeMsg]}
        case REMOVE_SUBSCRIBE_MESSAGE:
            let {subscribeMsg} = state;
            let newMsgArr =  subscribeMsg.filter((msg,index)=>{
                return msg.from !== action.playload.subscribeMsg.from;
            })
            return {subscribeMsg:[...newMsgArr]}
        default:
            return state;
    }
}