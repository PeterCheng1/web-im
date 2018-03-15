
export const loginUser = (opt) =>{
    let onSuccess = opt.success
    let onError = opt.error
    return new Promise((resolve,reject) => {
        opt.success = (token) =>{
            onSuccess && onSuccess()
            let Atoken = token.access_token;
            WebIM.utils.setCookie('webim_owlWebIM', Atoken, 1);
            resolve(token);
        }
        opt.error = (error) => {
            onError && onError()
            reject(error)
        }
        window.conn.open(opt);
    })
}