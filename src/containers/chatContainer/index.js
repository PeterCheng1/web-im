import React, { Component } from 'react';
import {Map,List,fromJS} from 'immutable'
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import PanelTab from '@components/panelTab/index.js'

@safeRender
class ChatContainer extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return(
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"></div>
                <div className="chat-panel">
                    <PanelTab {...this.props} />
                </div>
            </div>
        )
    }   
}

export default ChatContainer;