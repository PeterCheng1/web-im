import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux';
import {createAction} from '@assets/js/create.js'
import {FRIEND_SUBSCRIBE_ADD,FRIEND_SUBSCRIBE_REMOVE} from '@data/actions/actionTypes.js';
import {Map,List,fromJS} from 'immutable';
import { Button } from 'antd';

@safeRender
@connect(state=>{
    return {
        subscribeMessage:state.get('subscribe')
    }
},
(dispatch)=>{
    return {
        handleSubscribeMsg:(type,playload)=>{
            return dispatch(createAction(type,'subscribeMessage',playload))
        }
    }
}
)
class SubscribePanel extends Component {
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
        this.props.handleSubscribeMsg(FRIEND_SUBSCRIBE_REMOVE,user);
    }

    disagree = (user,e)=>{
        /*拒绝添加好友的方法处理*/
        window.conn.unsubscribed({
            to: user.get('from'),
            message : 'rejectAddFriend'
        });
        this.props.handleSubscribeMsg(FRIEND_SUBSCRIBE_REMOVE,user);
    }
    render () {
        let {subscribeMessage} = this.props
        return (<div i="subscribe_panel">
                <div className="panel-header">
                    <span className="title">新的朋友</span>
                    <span className="iconfont icon-yidiandiantubiao08"></span>
                </div>
                <div className="panel-content">
                    <ul className="msgList-content">
                        {
                            subscribeMessage.map((msg,idx)=>{
                                return<li className="list-content" key={msg.get('from')}>
                                    <p className="username-wrapper">
                                        <span className="username">{msg.get('from')}</span>
                                        <span className="desc">好友申请!</span>
                                    </p>
                                    <p className="username-msg">他的留言：{msg.get('status')}</p>
                                    <div className="button-wrapper">
                                        <Button type="primary" onClick={e=>this.agree(msg,e)}>接受</Button>
                                        <Button type="ghost" onClick={e=>this.disagree(msg,e)}>拒绝</Button>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>)
    }
}

export default SubscribePanel;