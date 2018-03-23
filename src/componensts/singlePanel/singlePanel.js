import React, { Component } from 'react';
import './singPanel.css'
import {safeRender} from '@assets/js/safeRender'
import DefalutPanel from '@components/panel/defalutPanel/defalutPanel.js'
import {avatarLists} from '@assets/js/avatar.js'

@safeRender
class SingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firends:[]
        };
    }

    getAvatar() {
        let length = avatarLists.length;
        let index = window.parseInt(Math.random()*length);
        let avatar = avatarLists[index]
        return avatar;
    }
  
    render () {
        return (
            <div i="single_panel_wrapper">
                <ul className="single-message-lists-wrapper">
                    <li className="single-message">
                        <img className="user-avatar" src={this.getAvatar()} alt="用户头像"/>
                        <span className="user-name">sheldonyee</span>
                        {/* {subscribeMsg.length > 0 ? <span className="num">{subscribeMsg.length}</span> : null} */}
                    </li>                    
                </ul>
                <div i="chat_content_wrapper">
                    <DefalutPanel/>
                </div>
            </div>
        )
    }
}

export default SingPanel