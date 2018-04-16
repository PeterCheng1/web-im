import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux';
import {createAction} from '@assets/js/create.js'
import NoneMsgPic from '@assets/images/noneMsg/subscrbei.jpeg'
import { Button } from 'antd';
import {GROUP_INVITE_MESSAGE_ADD,GROUP_INVITE_MESSAGE_REMOVE} from '@data/actions/actionTypes.js';
import {Map,List,fromJS} from 'immutable';

@safeRender
@connect(state=>{
    return {
        groupIniveLists:state.get('groupInvite')
    }
},
(dispatch)=>{
    return {
        handleGroupInviteMsg:(type,playload)=>{
            return dispatch(createAction(type,'inviteMessage',playload))
        }
    }
}
)
class GroupInvitePanel extends Component {
    constructor(props) {
        super(props);
    }

    agree = (user,e)=>{
        /*同意添加好友操作的实现方法*/
        window.conn.subscribed({
            to: user.get('from'),
            message : '对方同意添加你为好友哦！！'
        });
        window.conn.subscribe({//需要反向添加对方好友
            to: user.get('from'),
            message : '对方同意添加你为好友哦！！'
        });
        this.props.handleGroupInviteMsg(GROUP_INVITE_MESSAGE_REMOVE,user);
    }

    disagree = (user,e)=>{
        /*拒绝添加好友的方法处理*/
        window.conn.unsubscribed({
            to: user.get('from'),
            message : 'rejectAddFriend'
        });
        this.props.handleGroupInviteMsg(GROUP_INVITE_MESSAGE_REMOVE,user);
    }
    render () {
        return (<div>GroupInvitePanel</div>)
    }
}

export default GroupInvitePanel