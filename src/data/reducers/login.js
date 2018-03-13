import {USER_HAD_LOGIN} from '../actions/actionTypes';

export default function loginReducer(state={},action){
    switch (action.type) {
        case USER_HAD_LOGIN:
            return Object.assign({},state,{user:state.playload.user})
        default:
            return state;
    }
}