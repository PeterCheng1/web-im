import {REMOVE_FRIEND_MESSAGE,ADD_FRIEND_MESSAGE} from '../actions/actionTypes'

export default function friendReducer(state={friendMsg:[]},action){
    switch (action.type) {
        case ADD_FRIEND_MESSAGE: 
            return {friendMsg:[action.playload.friendMsg,...state.friendMsg]}
        case REMOVE_FRIEND_MESSAGE:
            let {friendMsg} = state;
            let newMsgArr =  friendMsg.filter((msg,index)=>{
                return msg.from !== action.playload.friendMsg.from;
            })
            return {friendMsg:[...newMsgArr]}
        default:
            return state;
    }
}