export const USER_HAD_LOGIN = 'USER_HAD_LOGIN'
export const PANEL_TO_SUBSCRIBE = 'PANEL_TO_SUBSCRIBE'
export const PANEL_TO_BLACKLIST = 'PANEL_TO_BLACKLIST'
export const PANEL_TO_SINGLE = 'PANEL_TO_SINGLE'
export const PANEL_TO_GROUP = 'PANEL_TO_GROUP'
export const ADD_SUBSCRIBE_MESSAGE = 'ADD_SUBSCRIBE_MESSAGE'
export const REMOVE_SUBSCRIBE_MESSAGE = 'REMOVE_SUBSCRIBE_MESSAGE'
export const createAction = (actionType,...state) =>{
    return (...stateVal) =>{
        let action = {
            type:actionType,
            playload:{}
        }
        state.forEach((item,index)=>{
            action.playload[item] = stateVal[index]
        })
        return action;
    }
}