import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender';
import './index.css';
import QModal from '@components/modal/index.js'
import {mergeProps} from '@assets/js/mergeProps.js'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import classnames from 'classnames';
import {avatarLists} from '@assets/js/avatar.js';
@safeRender
@connect(state=>{
    return {
        subscribeMessage:state.get('subscribe'),
        noReadSingleNum:state.get('noRead')
    }
},undefined,mergeProps)
class PanelTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smallPanel:false
        }
    }

    componentDidMount() {
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

    openModel=(type,e)=>{
        this.modal.getWrappedInstance().openModal(type);
    }
    render() {
        let noReadSingleTotalMsg = this.props.noReadSingleNum.get('single').reduce((pre,next)=>{
            return pre + next
        },0)
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
        let hideStyle = {display:'none'}
        return (<div i="panel_tab_wrapper">
                    <div className="avatar-wrapper">
                        <img src={avatarLists[parseInt(Math.random())]} alt="avatar" />
                    </div>
                    <div className="single-chat">
                        <span className={singleClass} onClick={(e)=>this.tabTransfrom('single',e)}></span>
                        <span className="msg-num" style={noReadSingleTotalMsg === 0 ? hideStyle : {}}>{noReadSingleTotalMsg}</span>
                    </div>
                    {/* <div className="group-chat">
                        <span className={groupClass} onClick={e=>this.tabTransfrom('group',e)}></span>     
                    </div> */}
                    <div className="personal-message">
                        <span className={personalClass} onClick={e=>this.tabTransfrom('personal',e)}></span>                                                   
                        <span className="msg-num" style={this.props.subscribeMessage.size === 0 ? hideStyle : {}}>{this.props.subscribeMessage.size}</span>
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
                        {/* <div className="create-group" onClick={e=>this.openModel('createGroup',e)}>
                            <span className="iconfont icon-people" ></span>                         
                            <span className="title">创建群组</span>                                                     
                        </div> */}
                        <div className="black-friends" onClick={e=>this.openModel('black',e)}>
                            <span className="iconfont icon-heimingdan1"></span>                         
                            <span className="title">添加黑名单</span>                                                     
                        </div>
                        <div className="logout" onClick={e=>this.logoutAccount('logout',e)}>
                            <span className="iconfont icon-tuichu1"></span>                         
                            <span className="title">退出登陆</span>                                                     
                        </div>
                    </div>
                    <QModal ref={modal => this.modal = modal}/>
                </div>)
    }
}

export default PanelTab;