import {CURRENT_SIGNLE_USER_UPDATE,CURRENT_GROUP_UPDATE,CURRENT_SINGLE_NONE} from '@data/actions/actionTypes.js';
import {Map} from 'immutable'


const initialState = Map({
    single:null,
    group:null
})
export default function (state=initialState,action) {
    switch (action.type) {
        case CURRENT_SIGNLE_USER_UPDATE:
            return state.set('single',action.playload.username);
        case CURRENT_GROUP_UPDATE:
            return state.set('group',action.playload.username);
        case CURRENT_SINGLE_NONE:
            return state.set('single',null);
        default:
            return state;
    }
}