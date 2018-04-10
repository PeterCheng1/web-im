import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import { Spin, Icon } from 'antd';
import {connect} from 'react-redux';
import {MESSAGE_LISTS_UPDATE,MESSAGE_LISTS_STATE_UPDATE} from '@data/actions/actionTypes.js';
import {mergeProps} from '@assets/js/mergeProps.js';
import {createAction} from '@assets/js/create.js';
import regexMarkdown  from 'gfm-code-block-regex';
@safeRender
@connect(state=>{
    return {
        currentChatUser:state.get('current'),
        user:state.get('login')
    }
},dispatch=>{
    return {
        singleMessageListsUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        },
        singleMessageStateUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        }
    }
},mergeProps,{withRef:true})
class InputPanel extends Component {

    dowmEnter = (e)=>{
        if(e.key === 'Enter') {
            this.passMessage(e)
            e.target.innerText = ''
        }
    }

    passMessage=(e)=>{
        let currentUser = this.props.currentChatUser.get('single')
        var id = window.conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.message('txt', id);      // 创建文本消息
        // console.log(regexMarkdown().exec( e.target.innerText.trim()))
        msg.set({
            msg: e.target.innerText,                  // 消息内容
            to: currentUser,                          // 接收消息对象（用户id）
            roomType: false,
            success :(id, serverMsgId) =>{
                this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{msgId:serverMsgId,id,state:1,singleRoom:msg.body.to})
            },
            fail: function(e){
                console.log("Send private text error");
            }
        });
        msg.body.chatType = 'singleChat';
        window.conn.send(msg.body);
        this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,this.createMsgObj(msg))
    }

    createMsgObj (msg) {
        let msgObj = {} 
        msgObj.sourceMsg = msgObj.data = msg.body.msg;
        msgObj.singleRoom = msgObj.to = msg.body.to;
        msgObj.id = msg.id;
        msgObj.from =  (this.props.user.get('loginUser')['username']);
        msgObj.state = 0;
        msgObj.date = Date.now();
        msgObj.fromMe = true; 
        return msgObj
    }
    render () {

        return (
            <div i="input_panel_wrapper">
                <div className="input-header">
                    <Icon type="smile-o" style={{ fontSize: 25 }}/>   
                    <Icon type="picture" style={{ fontSize: 25 }}/>             
                </div>
                <div className="input-wrapper" contentEditable="true" onKeyUp={this.dowmEnter}></div>
            </div>
        )
    }
}

export default InputPanel