import React, { Component } from 'react';
import './index.css';
import {safeRender} from '@assets/js/safeRender'
import { Button } from 'antd';
import {connect} from 'react-redux';
import {avatarLists} from '@assets/js/avatar.js';

@safeRender
@connect(state=>{
    return {blackLists:state.get('black')}
})
class BlackPanel extends Component {
    constructor(props) {
        super(props)
    }

    removeBlackList = (user)=>{
        let newBlackLists = {}
        this.props.blackLists.map((u,idx)=>{
            if(u.name !== user.name){
                newBlackLists[u.name] = u;
            }
        })
        window.conn.removeFromBlackList({
            list: newBlackLists,
            type: 'jid',
            success: function () {
                console.log('Remove from black list success.');
                window.conn.getBlacklist();
            },
            error: function () {
                console.log('Remove from black list error.')
            }
        });
    }
    render() {
        return (<div i="black_panel_container">
                    <div className="panel-header">
                        <span className="title">黑名单</span>
                        <span className="iconfont icon-heimingdan1"></span>
                    </div>
                    <div className="panel-content">
                        <ul className="blackLists-content">
                            {this.props.blackLists.map((user,idx)=>{
                                return <li className="list-content" key={user.name}>
                                        <div className="user-avatar">
                                            <img src={avatarLists[parseInt(Math.random()*avatarLists.length-1)]} alt="用户头像" />
                                        </div>
                                        <span className="user-name">{user.name}</span>
                                        <span className="button-wrapper" onClick={e=>this.removeBlackList(user)}>
                                            <i className="iconfont icon-shanchuhang"></i>
                                        </span>
                                    </li>
                            })}
                        </ul>
                    </div>
                </div>)
    }
}

export default BlackPanel;