import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './panel.css'
@safeRender
class PersonalPanel extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {
        let {subscribeFriend} = this.props
        return (
            <div i="pansonal_panel_wrapper">
                <ul className="personal-setting-panel">
                    <li className="subscribe-message">
                        <span className="iconfont icon-friendadd"></span>
                        <span className="title">新的朋友</span>
                        {subscribeFriend.length > 0 ? <span className="num">{subscribeFriend.length}</span> : null}
                    </li>
                </ul>
            </div>
        )
    }
}

export default PersonalPanel