export const createAction = (type,playladType,playload) =>{
    let action = {
        type:type,
        playload:{}
    }
    action.playload[playladType] = playload;
    return action;
}