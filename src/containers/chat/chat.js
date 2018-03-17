import React, { Component } from 'react';
import SelectBar from '@components/selectBar/SelectBar.js';
import MessageList from '@components/messageList/MessageList.js'
import ChatContent from '@components/chatContent/ChatContent.js'
import PersonalPanel from  '@components/personalPanel/panel.js'
import './chat.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.ListenPresenceEvent()
    }

    ListenPresenceEvent() {
        window.conn.listen({
            onPresence:(message) =>{
                this.handlePresence(message)
            }
        })
    }

    handlePresence(message) {
        console.log(message)
    }
    render() {
        return (
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"> 
                </div>
                <div className="chat-panel">
                    <SelectBar />
                    <PersonalPanel/>
                    {/* <MessageList />
                    <ChatContent /> */}
                </div>
            </div>
        )
    }
}


export default Chat;