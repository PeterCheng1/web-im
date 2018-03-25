import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender';
import {connect} from 'react-redux';
import './personalPanel.css';
import DefalutPanel from '@components/panel/defalutPanel/defalutPanel.js'
import SubscribePanel from '@components/panel/subscribePanel/subscribePanel.js'
import classnames from 'classnames';

const createAction = (type,panelType) =>{
    let action = {
        type:type,
        playload:{
            panelType
        }
    }
    return action;
}
@safeRender
@connect(
    state=>{
        return {
            subscribeMsg : state.subscribe.subscribeMsg,
            hidePersonalPanel:{hidePersonalPanel:false}
        } 
    },
    (dispatch)=>{
        return {
            panelTypeChange : (type,panelType)=>{
                return dispatch(createAction(type,panelType))
            }           
        }
    },
    (stateProps,dispatchProps,ownProps)=>{
        let propsObj = {}
        if(ownProps[0]) {
            propsObj = Object.assign({}, ownProps[0], stateProps, dispatchProps);
        }else{
            propsObj = Object.assign({}, ownProps, stateProps, dispatchProps);
        }
        return propsObj;
    }
)
class PersonalPanel extends Component {
    static defaultProps = {
        subscribeMsg:[],

    }
    constructor(props) {
        super(props);
        this.state = {
            rightPanelType:'defalut'
        };
    }

    rightPanelType = (type,e)=>{
        this.setState({
            rightPanelType:type
        })
    }

    render () {
        let {subscribeMsg} = this.props;
        let {rightPanelType} = this.state;
        let {hidePersonalPanel} = this.props.classGroup
        let personal = classnames({
            hidePanel:hidePersonalPanel
        })
        return (
            <div i="personal_panel_wrapper" className={personal}>
                <ul className="personal-message-lists-wrapper">
                    <li className="subscribe-message" onClick={(e)=>this.rightPanelType('subscribe',e)}>
                        <span className="iconfont icon-friendadd"></span>
                        <span className="title">新的朋友</span>
                        {subscribeMsg.length > 0 ? <span className="num">{subscribeMsg.length}</span> : null}
                    </li>                    
                </ul>
                (<div i="chat_content_wrapper">
                  {rightPanelType === 'defalut' ? <DefalutPanel/> : null}
                  {rightPanelType === 'subscribe' ? <SubscribePanel/> : null}
                </div>)
            </div>
        )
    }
}

export default PersonalPanel