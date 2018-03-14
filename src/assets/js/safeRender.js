
export function safeRender(target) {
    let lifeCricle = [
        'componentWillMount',
        'render',
        'componentDidMount',
        'componentWillReceiveProps',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount',
        'shouldComponentUpdate'
    ]
    let defalutFun = ()=>{
        return null
    }
    lifeCricle.forEach((cricle,index)=>{
        let oldCricle = target.prototype[cricle] || (cricle === 'shouldComponentUpdate' ? safeComponentShouldUpdate : defalutFun);
        target.prototype[cricle] = function(){
            try {
                return oldCricle.call(this,arguments)
            } catch (error) {
                let reports = {
                    name : target.name,
                    method : cricle,
                    error 
                }
                console.log(reports)
            }
        }
    })
}

const safeComponentShouldUpdate = function() {
    return true;
}