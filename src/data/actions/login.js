// export function login(state) {
//     return {
//         type: 'LOGIN_START',
//         payload: {
//             state: state
//         }
//     }
// }

import {USER_HAD_LOGIN} from './actionTypes';

export const createAction = function(actionType,...state){
    return (...stateVal)=>{
        let action = {
            type : actionType,
            payload : {}
        };
        state.forEach((item,index)=>{
            action.payload[item] = stateVal[index];
        })
        return action;
    }
}


export function LoginUser(opts) {
    return (dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            let onSuccess = opts.success;
            let onError = opts.error;
            opts.success = (token) =>{
                onSuccess && onSuccess();
                let Atoken = token.access_token;
                WebIM.utils.setCookie('webim_owlWebIM', Atoken, 1);
                resolve(token);
            }
            opts.error = () => {
                reject();
            }
            window.conn.open(opts);
        })
    }
} 