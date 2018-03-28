import {USER_LOGIN_SUCCESS} from '@data/actions/actionTypes.js';
import {fromJS} from 'immutable';


const initialState = fromJS({loginUser:{}})
export default function loginReducer(state=initialState,action){
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return state.set('loginUser',action.playload.user);
        default:
            return state;
    }
}