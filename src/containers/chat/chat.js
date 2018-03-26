import React, { Component } from 'react';
import SelectBar from '@components/selectBar/SelectBar.js';
import MessageList from '@components/messageList/MessageList.js'
import ChatContent from '@components/chatContent/ChatContent.js'
import './chat.css';
import {connect} from 'react-redux';
import {ADD_SUBSCRIBE_MESSAGE} from '@data/actions/actionTypes'
import PanelContent from '@components/panelContent/panelContent.js'
import {REMOVE_FRIEND_MESSAGE,ADD_FRIEND_MESSAGE} from '@data/actions/actionTypes'
import {avatarLists} from '@assets/js/avatar.js'

const createSubscribeMsgAction = (type,subscribeMsg) =>{
    let action = {
        type:type,
        playload:{
            subscribeMsg
        }
    }
    return action;
}

const createFriendAction = (type,friendLists) =>{
    let action = {
        type:type,
        playload:{
            friendLists
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
                return dispatch(createSubscribeMsgAction(type,message))
            },
            addFriends:(type,playload)=>{
                return dispatch(createFriendAction(type,playload))
            },
            removeFriends:(type,playload)=>{
              return dispatch(createFriendAction(type,playload))
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
        this.bindSdkEvent()
    }

    componentDidMount() {
    }

    getRosterLists=()=> {
        window.conn.getRoster({
            success : ( roster )=> {
              //获取好友列表，并进行好友列表渲染，roster格式为：
              /** [
                    {
                      jid:'asemoemo#chatdemoui_test1@easemob.com',
                      name:'test1',
                      subscription: 'both'
                    }
                  ]
              */
               let friendLists = []
                for(let ros of roster) {
                    ros.avatar = this.getAvatar()
                    if(ros.subscription === 'both') {
                        friendLists.push(ros);
                    }
                }
                this.props.addFriends(ADD_FRIEND_MESSAGE,friendLists)
            },    
            error: (err)=> {
                if(err)console.log(err,'err')
            }
          }); 
    }

    getAvatar() {
        let length = avatarLists.length;
        let index = window.parseInt(Math.random()*length);
        let avatar = avatarLists[index]
        return avatar;
    }

    bindSdkEvent() {
        window.conn.listen({
            onOpened:(message) =>{
                this.getRosterLists();
            },
            onRoster:(message)=>{
                this.getRosterLists();
            },
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
                let index = this.props.subscribeMsg.find((val,index)=>{
                    return val.from = message.from
                })
                if(!index)this.props.addSubscribeMsge(ADD_SUBSCRIBE_MESSAGE,message)
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
                    <SelectBar {...this.props} />
                    <PanelContent {...this.props}/>
                    {/* <MessageList />
                    <ChatContent /> */}
                </div>
            </div>
        )
    }
}


export default Chat;