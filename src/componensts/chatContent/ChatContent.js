import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './chatContent.css';
import DefalutPanel from '@components/defalutPanel/defalutPanel.js'

@safeRender
class ChatContent extends Component {
    render() {
        return (<div i="chat_content_wrapper">
                    <DefalutPanel/>
                </div>)
    }
}

export default ChatContent;