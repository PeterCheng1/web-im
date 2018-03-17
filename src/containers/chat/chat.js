import React, { Component } from 'react';
import SelectBar from '@components/selectBar/SelectBar.js';
import MessageList from '@components/messageList/MessageList.js'
import ChatContent from '@components/chatContent/ChatContent.js'
import PersonalPanel from  '@components/personalPanel/panel.js'
import './chat.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribeFriend:[]
        }
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
        switch (message.type) {
            case "subscribe":
                this.setState((preState,props)=>{
                    let {subscribeFriend} = preState
                    return {subscribeFriend:[...subscribeFriend,message]}
                })
                break;
            default:
                break;
        }
    }
    render() {
        let {state} = this;
        return (
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"> 
                </div>
                <div className="chat-panel">
                    <SelectBar />
                    <PersonalPanel subscribeFriend={state.subscribeFriend}/>
                    {/* <MessageList />
                    <ChatContent /> */}
                </div>
            </div>
        )
    }
}


export default Chat;