import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './subscribePanel.css';
import {connect} from 'react-redux';
import { Button } from 'antd';
import {REMOVE_SUBSCRIBE_MESSAGE} from '@data/actions/actionTypes.js'

const createAction = (type,subscribeMsg) =>{
    let action = {
        type:type,
        playload:{
            subscribeMsg
        }
    }
    return action;
}
@safeRender
@connect(
    (state)=>{
        return {subscribeMsg : state.subscribe.subscribeMsg}
    },
    (dispatch)=>{
        return {
            DealSubscribeMsg : (type,subscribeMsg)=>{
                return dispatch(createAction(type,subscribeMsg))
            }
        }
    }
)
class SubscribePanel extends Component {
    constructor(props) {
        super(props)
    }

    argee=(msg,e)=>{
        window.conn.subscribed({
            to: msg.from,
            message : '[resp:true]'
          });
        window.conn.subscribe({//需要反向添加对方好友
            to: msg.from,
            message : '[resp:true]'
        });          
        this.props.DealSubscribeMsg(REMOVE_SUBSCRIBE_MESSAGE,msg)
    }

    disagree = (msg,e)=>{
        window.conn.unsubscribed({
            to: msg.from,
            message : 'rejectAddFriend'
        });
        this.props.DealSubscribeMsg(REMOVE_SUBSCRIBE_MESSAGE,msg)            
    }
    render () {
        let {subscribeMsg} = this.props;
        return (
            <div i="subscribePanel_wrapper">
                <div className="panel-header">
                    <span className="title">新的朋友</span>
                    <span className="iconfont icon-yidiandiantubiao08"></span>
                </div>
                <div className="panel-content">
                    <ul className="msgList-content">
                        {subscribeMsg.map((msg,idx)=>{
                            return  <li className="list-content" key={msg.from}>
                                        <p className="username-wrapper">
                                            <span className="username">{msg.from}</span>
                                            <span className="desc">想加你为好友!</span>
                                        </p>
                                        <p className="username-msg">他的留言：{msg.status}</p>
                                        <div className="button-wrapper">
                                            <Button type="primary" onClick={e=>this.argee(msg,e)}>接受</Button>
                                            <Button type="ghost" onClick={(e)=>this.disagree(msg,e)}>拒绝</Button>
                                        </div>
                                    </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SubscribePanel;