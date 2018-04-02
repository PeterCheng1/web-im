import {MESSAGE_LISTS_UPDATE} from '@data/actions/actionTypes.js';
import {Map} from 'immutable';
/**
 * {
 *  sheldon2001:[],
 *  sheldon2002:[]
 * }
*/
const initialState = Map({})
export default function singleReducer (state,action) {
    switch (action.type) {
        case MESSAGE_LISTS_UPDATE:
            let passUser = action.playload.massage.from; 
            if(state.get(passUser)){
                return state.setIn(passUser,[...state.get(passUser),action.playload.massage])
            }else{
                return state.setIn(passUser,[action.playload.massage])
            }
        default:
            return state;
    }
}