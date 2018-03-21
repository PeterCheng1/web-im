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
            subscribeMsg : state.subscribe.subscribeMsg
        } 
    },
    (dispatch)=>{
        return {
            panelTypeChange : (type,panelType)=>{
                return dispatch(createAction(type,panelType))
            }           
        }
    }
)
class PersonalPanel extends Component {
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
        return (
            <div i="personal_panel_wrapper">
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