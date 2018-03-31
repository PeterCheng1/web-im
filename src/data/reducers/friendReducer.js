import {FRIEND_LISTS_ADD,FRIEND_LISTS_REMOVE,FRIEND_LISTS_UPDATE} from '@data/actions/actionTypes.js';
import {List} from 'immutable';


const initialState = List([])
export default function friendReducer (state=initialState,action) {
    switch (action.type) {
        case FRIEND_LISTS_ADD:
            return List(action.playload.friendLists);
        case FRIEND_LISTS_REMOVE:
            
            break;
        case FRIEND_LISTS_UPDATE:

            break;
        default:
            return state;
    }
}