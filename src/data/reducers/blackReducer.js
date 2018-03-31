import {BLACK_LISTS_UPDATE} from '@data/actions/actionTypes.js';
import {List} from 'immutable';

const initialState = List([]);

export default function blackReducer (state=initialState,action){
    switch (action.type) {
        case BLACK_LISTS_UPDATE:
            let newblackLists = [];
            for(let i in action.playload.blackLists) {
                newblackLists.push(action.playload.blackLists[i])
            }
            return List(newblackLists);
        default:
            return state;
    }
}