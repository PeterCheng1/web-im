import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './selectBar.css';
import {avatarLists} from '@assets/js/avatar.js'
import classnames from 'classnames';
@safeRender
class SelectBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAvatar:this.getAvatar(),
            chatModel:'single'//group single
        }
    }

    getAvatar() {
        let length = avatarLists.length;
        let index = window.parseInt(Math.random()*length);
        let avatar = avatarLists[index]
        return avatar;
    }

    changeChatModel = (type) =>{
        this.setState({
            chatModel : type
        })
    }
    render() {
        let {state} = this;
        let singleClassName = classnames('iconfont','icon-chat',{
            active:state.chatModel === 'single' ? true : false
        })
        let groupClassNamr = classnames('iconfont','icon-LC_icon_chat_fill',{
            active:state.chatModel === 'group' ? true : false            
        })
        return (<div i="SelectBar-wrapper">
                    <div className="avatar-wrapper">
                        <img src={state.userAvatar} alt="avatar" />
                    </div>
                    <div className="single-chat">
                        <span className={singleClassName} onClick={(e)=>this.changeChatModel('single',e)}></span>
                    </div>
                    <div className="group-chat">
                        <span className={groupClassNamr} onClick={e=>this.changeChatModel('group',e)}></span>     
                    </div>
                    <div className="setting-container">
                        <span className="iconfont icon-set1"></span>                         
                    </div>
                </div>)
    }
}

export default SelectBar;