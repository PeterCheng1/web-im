export const USER_HAD_LOGIN = 'USER_HAD_LOGIN'
export const PANEL_TO_SUBSCRIBE = 'PANEL_TO_SUBSCRIBE'
export const PANEL_TO_BLACKLIST = 'PANEL_TO_BLACKLIST'
export const PANEL_TO_SINGLE = 'PANEL_TO_SINGLE'
export const PANEL_TO_GROUP = 'PANEL_TO_GROUP'
export const ADD_SUBSCRIBE_MESSAGE = 'ADD_SUBSCRIBE_MESSAGE'
export const REMOVE_SUBSCRIBE_MESSAGE = 'REMOVE_SUBSCRIBE_MESSAGE'
export const ADD_FRIEND_MESSAGE = 'ADD_FRIEND_MESSAGE'
export const REMOVE_FRIEND_MESSAGE = 'REMOVE_FRIEND_MESSAGE'
export const ADD_BLACKUSER_MESSAGE = 'ADD_BLACKUSER_MESSAGE'
export const REMOVE_BLACKUSER_MESSAGE = 'REMOVE_BLACKUSER_MESSAGE'
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