
export const loginUser = (opt) =>{
    let onSuccess = opt.success
    let onError = opt.error
    return new Promise((resolve,reject) => {
        opt.success = (token) =>{
            onSuccess && onSuccess()
            let Atoken = token.access_token;
            let encryptUsername = btoa(opt.user).replace(/=*$/g, "");
            WebIM.utils.setCookie('webim_' + encryptUsername, Atoken, 1);
            window.conn.token = Atoken;
            resolve(token);
        }
        opt.error = (error) => {
            onError && onError()
            reject(error)
        }
        window.conn.open(opt);
    })
}