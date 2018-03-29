import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';

@safeRender
class PersonalPanel extends Component {

    render() {
        return (<div i="personal_panel_wrapper">
                    <ul className="personal-messageLists">
                        <li className="subscribe-msg-item">
                            <span className="iconfont icon-friendadd"></span>
                            <span className="item-title">新的朋友</span>
                            <span className="msg-num">3</span> 
                        </li>
                        <li className="black-lists-item">
                            <span className="iconfont icon-heimingdan1"></span>
                            <span className="item-title">黑名单</span>
                        </li>
                    </ul>
                    <div className="personal-panel-content">
                        
                    </div>
                </div>)
    }
}

export default PersonalPanel