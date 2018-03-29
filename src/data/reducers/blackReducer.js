import {BLACK_LISTS_UPDATE} from '@data/actions/actionTypes.js';
import {List} from 'immutable';

const initialState = List([]);

export default function blackReducer (state=initialState,action){
    switch (action.type) {
        case BLACK_LISTS_UPDATE:
            return List(action.playload.blackLists);
        default:
            return state;
    }
}