// export function login(state) {
//     return {
//         type: 'LOGIN_START',
//         payload: {
//             state: state
//         }
//     }
// }

import {USER_HAD_LOGIN,createAction} from './actionTypes';

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