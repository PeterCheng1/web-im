import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './chatContent.css';
import DefalutPanel from '@components/panel/defalutPanel/defalutPanel.js'
import SubscribePanel from '@components/panel/subscribePanel/subscribePanel.js'
import {connect} from 'react-redux'

const createUserAction = (type,panelType) =>{
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
            panelType : state.panel.panelType
        } 
    },
    (dispatch,getState)=>{
        return {
            panelTypeChange : (type,playload)=>{
                return dispatch(createUserAction(type,playload))
            }           
        }
    }
)
class ChatContent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let {panelType} =  this.props;
        return (<div i="chat_content_wrapper">
                  {panelType === 'defalut' ? <DefalutPanel/> : null}
                  {panelType === 'subscribe' ? <SubscribePanel/> : null}
                </div>)
    }
}

export default ChatContent;