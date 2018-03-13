import {USER_HAD_LOGIN} from '../actions/actionTypes';

export default function loginReducer(state={},action){
    switch (action.type) {
        case USER_HAD_LOGIN:
            return Object.assign({},state,{user:action.playload.user})
        default:
            return state;
    }
}