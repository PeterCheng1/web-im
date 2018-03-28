export const createUserAction = (type,playladType,playload) =>{
    let action = {
        type:type,
        playload:{}
    }
    action[playladType] = playload;
    return action;
}