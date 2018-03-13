export const USER_HAD_LOGIN = 'USER_HAD_LOGIN'

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