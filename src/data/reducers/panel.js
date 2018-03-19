import {PANEL_TO_GROUP,PANEL_TO_SINGLE,PANEL_TO_BLACKLIST
    ,PANEL_TO_SUBSCRIBE} from '../actions/actionTypes'

export default function panelReducer (state={panelType:'defalut'},action) {
    switch (action.type) {
        case PANEL_TO_SUBSCRIBE:
            return Object.assign({},state,action.playload)
        case PANEL_TO_BLACKLIST:
            return Object.assign({},state,action.playload)
        case PANEL_TO_SINGLE:
            return Object.assign({},state,action.playload)
        case PANEL_TO_GROUP:
            return Object.assign({},state,action.playload)
        default:
            return state;
    }
}