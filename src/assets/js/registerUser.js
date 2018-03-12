export const registerUser = (opt) => {
    let onSuccess = opt.success;
    let onError = opt.error;
    return new Promise((resolve,reject)=>{
        opt.success = (suc) => {
            onSuccess && onSuccess()
            resolve()
        }
        opt.error = (err) =>{
            onError && onError()
            reject(err)
        }
        console.log(opt)
        window.conn.registerUser(opt);
    })
}