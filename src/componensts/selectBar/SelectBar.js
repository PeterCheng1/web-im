import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './selectBar.css';
import {avatarLists} from '@assets/js/avatar.js'
import classnames from 'classnames';
import { Modal ,Input} from 'antd';
import {hashHistory} from 'react-router'

@safeRender
class SelectBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAvatar:this.getAvatar(),
            openSetPanel: false,
            addFriendModel:false,
            friendName:''
        }
    }

    getAvatar() {
        let length = avatarLists.length;
        let index = window.parseInt(Math.random()*length);
        let avatar = avatarLists[index]
        return avatar;
    }

    openModel = (type)=>{
        switch (type) {
            case 'add':
                this.setState({
                    openSetPanel:false,
                    addFriendModel : true
                })
                break;
            default:
                break;
        }
    }

    changeChatModel = (type) =>{
        let {uid}= this.props.location.query;
        hashHistory.push({
            pathname:`/chat/${type}/`,
            query:{
                uid:uid
            }
        })
    }

    openPanel = () =>{
        this.setState((prevState,props)=>{
            return {
                openSetPanel: !prevState.openSetPanel
            }
        })
    }
    
    addFriendComfirm = ()=>{
        let {friendName} = this.state;
        window.conn.subscribe({
            to: friendName.trim(),
            message: '可以加个好友吗?'
        });
        this.setState({
            addFriendModel:false
        })
    }

    cancelAddFriendModel = () =>{
        this.setState({
            friendName:'',
            addFriendModel:false
        })
    }

    inputChange = (type,ele) =>{
        switch (type) {
            case 'add':
                this.setState({
                    friendName :ele.target.value.trim()
                })
                break;
        
            default:
                break;
        }
    }
    render() {
        let {state} = this;
        let singleClassName = classnames('iconfont','icon-chat',{
            active:this.props.location.pathname === '/chat/single/' ? true : false
        })
        let groupClassName = classnames('iconfont','icon-LC_icon_chat_fill',{
            active:this.props.location.pathname === '/chat/group/' ? true : false            
        })
        let personalName = classnames('iconfont','icon-information',{
            active:this.props.location.pathname === '/chat/personal/' ? true : false            
        })
        let settingPanelClassName = classnames('setting-btn-wrapper',{
            active:state.openSetPanel
        })
        return (<div i="SelectBar-wrapper">
                    <div className="avatar-wrapper">
                        <img src={state.userAvatar} alt="avatar" />
                    </div>
                    <div className="single-chat">
                        <span className={singleClassName} onClick={(e)=>this.changeChatModel('single',e)}></span>
                    </div>
                    <div className="group-chat">
                        <span className={groupClassName} onClick={e=>this.changeChatModel('group',e)}></span>     
                    </div>
                    <div className="personal-message">
                        <span className={personalName} onClick={e=>this.changeChatModel('personal',e)}></span>     
                    </div>
                    <div className="setting-container"> 
                        <span className="iconfont icon-set1"  onClick={this.openPanel}></span>                         
                    </div>
                    <div className={settingPanelClassName}>
                        <div className="add-friends" onClick={e=>this.openModel('add',e)}>
                            <span className="iconfont icon-icon-"></span>                         
                            <span className="title">添加好友</span>                         
                        </div>
                        <div className="del-friends">
                            <span className="iconfont icon-shanchu1"></span>                         
                            <span className="title">移除好友</span>                                                     
                        </div>
                        <div className="logout">
                            <span className="iconfont icon-tuichu1"></span>                         
                            <span className="title">退出登陆</span>                                                     
                        </div>
                    </div>
                    <Modal title="添加好友" visible={state.addFriendModel} okText="添加" cancelText="取消"
                        onOk={this.addFriendComfirm} onCancel={this.cancelAddFriendModel}>
                        <Input placeholder="好友名称" onChange={ele=>this.inputChange('add',ele)} value={state.friendName}/>
                    </Modal>
                </div>)
    }
}

export default SelectBar;