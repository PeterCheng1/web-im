
/*
    为组件的生命周期函数添加try catch 处理，防止组件由于错误无法正常渲染
*/
import {is} from 'immutable';

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
        let oldCricle = target.prototype[cricle] || (cricle === 'shouldComponentUpdate' ? shouldComponentUpdate : defalutFun);
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


/**
 * 使用ES7的decorator配合上immutable来改造组件shouldComponentUpdate的
 * 生命周期函数，以达到提高性能的目的
 */
function shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    nextState = nextState || {};
    nextProps = nextProps || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        Object.keys(thisState).length !== Object.keys(nextState).length) {
        return true;
    }

    for (const key in nextProps) {
        if (!is(thisProps[key], nextProps[key])) {
            return true;
        }
    }

    for (const key in nextState) {
        if (!is(thisState[key], nextState[key])) {
            return true;
        }
    }
    return false;
}