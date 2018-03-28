export const mergeProps  = (stateProps,dispatchProps,ownProps)=>{
    let propsObj = {}
    if(ownProps[0]) {
        propsObj = Object.assign({}, ownProps[0], stateProps, dispatchProps);
    }else{
        propsObj = Object.assign({}, ownProps, stateProps, dispatchProps);
    }
    return propsObj;
}