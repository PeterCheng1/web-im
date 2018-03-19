import React, { Component } from 'react';
import SelectBar from '@components/selectBar/SelectBar.js';
import MessageList from '@components/messageList/MessageList.js'
import ChatContent from '@components/chatContent/ChatContent.js'
import './chat.css';
import {connect} from 'react-redux';
import {ADD_SUBSCRIBE_MESSAGE} from '@data/actions/actionTypes'

const createUserAction = (type,subscribeMsg) =>{
    let action = {
        type:type,
        playload:{
            subscribeMsg
        }
    }
    return action;
}
@connect(
    state=>{
        return {
            subscribeMsg : state.subscribe.subscribeMsg
        } 
    },
    (dispatch)=>{
        return {
            addSubscribeMsge : (type,message)=>{
                return dispatch(createUserAction(type,message))
            }           
        }
    }
)
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
                // this.setState((preState,props)=>{
                //     let {subscribeFriend} = preState
                //     return {subscribeFriend:[...subscribeFriend,message]}
                // })
                this.props.addSubscribeMsge(ADD_SUBSCRIBE_MESSAGE,message)
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
                    <MessageList />
                    <ChatContent />
                </div>
            </div>
        )
    }
}


export default Chat;