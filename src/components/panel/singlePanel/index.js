import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux'
import { HashLoader } from 'react-spinners';
import {mergeProps} from '@assets/js/mergeProps.js'
import DefalutPanel from '@components/panel/defalutPanel/index.js';
import MessagePanel from '@components/panel/messagePanel/index.js';
import {createAction} from '@assets/js/create.js';
import {CURRENT_SIGNLE_USER_UPDATE} from '@data/actions/actionTypes.js';
import {SINGLE_NO_READ_MESSAGE_NUM} from '@data/actions/actionTypes.js';

@safeRender
@connect(state=>{
    return {
        friendLists:state.get('friend'),
        blackLists:state.get('black'),
        current:state.get('current'),
        message:state.get('singleMessage'),
    }
},dispatch=>{
    return {
        currentChatUpdate:(type,playoad)=>{
            return dispatch(createAction(type,'username',playoad))
        },
        noReadMsgChange:(type,playoad)=>{
            return dispatch(createAction(type,'noReadData' ,playoad ))
        }
    }
},mergeProps)
class SinglePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassUser : 'sheldon2222'
        }
    }

    checkNoReadMessage (message,user) {
        let newMessage = {};
        if(message.get(user)) {
            let messageNum = message.get(user).filter((msg,idx)=>{
                return (!msg.fromMe && (msg.state !== 3 && msg.state !== -1))
            })
            if(messageNum.length > 0){
                newMessage.num = messageNum.length
                newMessage.msg = messageNum[messageNum.length-1];
                if(newMessage.msg.type === 'text') {
                    newMessage.data = newMessage.msg.data;
                }else if(newMessage.msg.type === 'image') {
                    newMessage.data = '[一张图片]'
                }else if(newMessage.msg.type === 'audio') {
                    newMessage.data = '[一条音频]'
                }
            }
            setTimeout(()=>{
                this.props.noReadMsgChange(SINGLE_NO_READ_MESSAGE_NUM,{username:message.get(user)[0].singleRoom,num:messageNum.length})   
            },40)
        }
        return newMessage
    }

    currentChatUserUpdate=(username,e)=>{
        this.props.currentChatUpdate(CURRENT_SIGNLE_USER_UPDATE,username)
    }   
    render() {
        let {friendLists,blackLists,hadGetFriendLists,current,message} = this.props;
        let {currentPassUser} = this.state;
        let currentChatUser = this.props.current.get('single');
        return (<div i="single_panel_wrapper">
                    <ul className="friend-list-wrapper">
                        <div className='sweet-loading'>
                            <HashLoader
                            size={80}
                            margin="5px"
                            color={'#0BA4D6'} 
                            loading={!hadGetFriendLists} 
                            />
                        </div>
                        {friendLists.map((frined,idx)=>{
                            let Buser = blackLists.filter((u,idx)=>{
                                return u.name === frined.name
                            })
                            let noReadMsg = this.checkNoReadMessage(message,frined.name)
                            return Buser.size === 0 
                                    ? 
                                 <li className={currentChatUser === frined.name ? 'friend-item active' : 'friend-item'} key={frined.name} onClick={e=>this.currentChatUserUpdate(frined.name,e)}>
                                    <div className="user-avatar">
                                    <img className="user-avatar" src={frined.avatar} alt="用户头像"/>
                                    </div>
                                    <span className="user-name">{frined.name}</span>
                                    {/* <span className="user-tag-wrapper">
                                        {Buser.size !== 0 ? <i className="iconfont icon-jinzhi"></i> : null}
                                    </span> */}
                                    {
                                        (noReadMsg.num && noReadMsg.num !== 0) 
                                        ?
                                        <span className="noread-msg-num">{noReadMsg.num }</span>
                                        :
                                        null
                                    }
                                    {
                                        noReadMsg.msg 
                                        ?
                                        <span className="noread-msg-data">{noReadMsg.data}</span>
                                        :
                                        null
                                    }
                                </li>
                                    :
                                    null
                        })}
                    
                    </ul>
                    <div className="personal-panel-content">
                        <div className="common-panel">
                        {
                            current.get('single') 
                            ? 
                            <MessagePanel/>
                            :
                            <DefalutPanel/>
                        }
                        </div>
                    </div>
                </div>)
    }
}

export default SinglePanel