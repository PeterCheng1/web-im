import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender';
import { Modal ,Input} from 'antd';
import './index.css';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {mergeProps} from '@assets/js/mergeProps.js';
import classnames from 'classnames';

@safeRender
class PanelTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smallPanel:false
        }
    }

    tabTransfrom = (type,e)=>{
        let {uid}= this.props.location.query;
        hashHistory.push({
            pathname:`/chat/${type}/`,
            query:{
                uid:uid
            }
        })
    }

    openSamllPanel = ()=>{
        this.setState((prevState,props)=>{
            return {smallPanel:!prevState.smallPanel}
        })
    }

    logoutAccount =(type,e)=>{
        window.conn.close();
        hashHistory.push({
            pathname:'/'
        })
    }
    render() {
        let {pathname} = this.props.location;
        let singleClass = classnames('iconfont','icon-chat',{
            active:(pathname === '/chat/single/' ? true : false)
        })
        let groupClass = classnames('iconfont','icon-LC_icon_chat_fill',{
            active:(pathname === '/chat/group/' ? true : false)            
        })
        let personalClass = classnames('iconfont',' icon-information',{
            active:(pathname === '/chat/personal/' ? true : false)            
        })
        let settingPanelClassName = classnames('setting-btn-wrapper',{
            active:this.state.smallPanel
        })
        return (<div i="panel_tab_wrapper">
                    <div className="avatar-wrapper">
                        {/* <img src={state.userAvatar} alt="avatar" /> */}
                    </div>
                    <div className="single-chat">
                        <span className={singleClass} onClick={(e)=>this.tabTransfrom('single',e)}></span>
                    </div>
                    <div className="group-chat">
                        <span className={groupClass} onClick={e=>this.tabTransfrom('group',e)}></span>     
                    </div>
                    <div className="personal-message">
                        <span className={personalClass} onClick={e=>this.tabTransfrom('personal',e)}></span>     
                    </div>
                    <div className="setting-container"> 
                        <span className="iconfont icon-set1"  onClick={this.openSamllPanel}></span>                         
                    </div>
                    <div className={settingPanelClassName}>
                        <div className="add-friends" onClick={e=>this.openModel('add',e)}>
                            <span className="iconfont icon-icon-"></span>                         
                            <span className="title">添加好友</span>                         
                        </div>
                        <div className="del-friends" onClick={e=>this.openModel('remove',e)}>
                            <span className="iconfont icon-shanchu1" ></span>                         
                            <span className="title">移除好友</span>                                                     
                        </div>
                        <div className="black-friends" onClick={e=>this.openModel('black',e)}>
                            <span className="iconfont icon-heimingdan1"></span>                         
                            <span className="title">添加黑名单</span>                                                     
                        </div>
                        <div className="logout" onClick={e=>this.logoutAccount('logout',e)}>
                            <span className="iconfont icon-tuichu1"></span>                         
                            <span className="title">退出登陆</span>                                                     
                        </div>
                    </div>
                </div>)
    }
}

export default PanelTab;