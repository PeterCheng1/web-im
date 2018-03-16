import React, { Component } from 'react';
import SelectBar from '@components/selectBar/SelectBar.js';
import MessageList from '@components/messageList/MessageList.js'
import ChatContent from '@components/chatContent/ChatContent.js'
import './chat.css';

class Chat extends Component {
    render() {
        return (
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"> 
                </div>
                <div className="chat-panel">
                    <SelectBar />
                    {/* <MessageList />
                    <ChatContent /> */}
                </div>
            </div>
        )
    }
}


export default Chat;