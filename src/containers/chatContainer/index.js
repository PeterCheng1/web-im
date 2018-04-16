import React, { Component } from 'react';
import { message } from 'antd';
import {avatarLists} from '@assets/js/avatar.js';
import {safeRender} from '@assets/js/safeRender'
import {mergeProps} from '@assets/js/mergeProps.js';
import './index.css';
import PanelTab from '@components/panelTab/index.js'
import PersonalPanel from '@components/panel/personalPanel/index.js'
import SinglePanel from '@components/panel/singlePanel/index.js'
import GroupPanel from '@components/panel/groupPanel/index.js'
import classnames from 'classnames';
import {createAction} from '@assets/js/create.js';
import {FRIEND_SUBSCRIBE_ADD,FRIEND_SUBSCRIBE_REMOVE} from '@data/actions/actionTypes.js';
import {BLACK_LISTS_UPDATE} from '@data/actions/actionTypes.js';
import {FRIEND_LISTS_ADD,FRIEND_LISTS_REMOVE,FRIEND_LISTS_UPDATE} from '@data/actions/actionTypes.js';
import {MESSAGE_LISTS_UPDATE,MESSAGE_LISTS_STATE_UPDATE} from '@data/actions/actionTypes.js';
import {connect} from 'react-redux';
@safeRender
@connect(state=>{
    return {
        subscribe:state.get('subscribe'),
        blackLists:state.get('black'),
        currentChatUser:state.get('current'),
    }
},
(dispatch)=>{
    return{
        addSubscribeMsg:(type,playload)=>{
            return dispatch(createAction(type,'subscribeMessage',playload))
        },
        removeSubscribeMsg:(type,playload)=>{
            return dispatch(createAction(type,'subscribeMessage',playload))
        },
        blackListsUpdate:(type,playload)=>{
            return dispatch(createAction(type,'blackLists',playload))
        },
        addFriendList:(type,playload)=>{
            return dispatch(createAction(type,'friendLists',playload))
        },
        singleMessageListsUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        },
        singleMessageStateUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        }
    }
},
mergeProps
)
class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hadGetFriendLists:false
        }
    }

    componentDidMount() {
        this.bindSdkEvent()
    }
    bindSdkEvent() {
        window.conn.listen({
            onOpened:(message)=>{
                console.log('opened ok')
                this.getBlackList();
                this.getFriendLists();
                this.getGroupLists();
            },
            onPresence:(message)=>{
                this.handlePresence(message)
            },
            onRoster:(message)=>{
                this.getFriendLists();
            },
            onBlacklistUpdate:(message)=>{
                // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                this.props.blackListsUpdate(BLACK_LISTS_UPDATE,message)
            },
            onTextMessage:(message)=>{//state :0未送达服务器(即是否发送成功) 1送达(送达服务器) 2已送达(已送达想发送的人,担未查看) 3已查看
                message.state = 2      
                message.fromMe = false;
                message.singleRoom = message.from;     
                message.date = Date.now();  
                message.type = 'text'
                this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,message)
                this.messageHadDelivered(message);
                // console.log(message)
            },
            onEmojiMessage:(message)=>{
                message.state = 2       
                message.fromMe = false;       
                message.singleRoom = message.from; 
                message.date = Date.now();        
                this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,message);
                this.messageHadDelivered(message);
                // console.log(message,'emoji')
            },
            onPictureMessage:(message)=>{
                // console.log(message)
                message.state = 2    
                message.fromMe = false;    
                message.singleRoom = message.from; 
                message.date = Date.now();    
                message.type = 'image'                  
                this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,message);
                this.messageHadDelivered(message);
                // console.log(message,'pic')
            },
            onAudioMessage:(message)=>{
                // console.log(message)
                message.state = 2    
                message.fromMe = false;    
                message.singleRoom = message.from; 
                message.date = Date.now();    
                message.type = 'audio'                  
                this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,message);
                this.messageHadDelivered(message);
                // console.log(message,'audio')
            },
            onError:(error)=>{
                message.error('链接失败，请等候，或者重新登陆！！')
                console.log(error);
            },
            onReceivedMessage:(message)=>{
                // message.state = 2               
                // this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,message);
                // console.log(message)
            },
            onDeliveredMessage:(message)=>{
                // message.state = 2               
                // this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,message);
                //对方收到已送达回执的回调函数是onReadMessage
            },
            onReadMessage:(message)=>{
                let id = message.mid
                let singleRoom = this.props.currentChatUser.get('single');
                this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id,state:3,singleRoom:singleRoom});
            },
            onCreateGroup:(message)=>{
                // console.log(message,'onMutedMessage')
            },
            onInviteMessage:(message)=>{
                // console.log(message,'onInviteMessage')
            }
        })
    }

    /**
     * 消息回执处理 delivery是否发送成功
    */
    messageHadDelivered(message) {
        const bodyId = message.id;         // 需要发送已读回执的消息id
        const msgId = window.conn.getUniqueId();// 生成本地消息id
        const msg = new WebIM.message('delivery', msgId);
        msg.set({
            id: bodyId
            ,to: message.from
        });
        window.conn.send(msg.body);
    }
    getFriendLists() {
        window.conn.getRoster({
            success:  ( roster ) =>{
                //获取好友列表，并进行好友列表渲染，roster格式为：
                /** [
                        {
                        jid:'asemoemo#chatdemoui_test1@easemob.com',
                        name:'test1',
                        subscription: 'both'
                        }
                    ]
                */
                let friendLists = roster.filter((friend,idx)=>{
                    return friend.subscription === 'both'
                }).map((friend,idx)=>{
                     friend.avatar = avatarLists[parseInt(Math.random()*avatarLists.length-1)]
                     return friend;
                })
                this.props.addFriendList(FRIEND_LISTS_ADD,friendLists)
                this.setState({
                    hadGetFriendLists:true
                })
            },  
            error:(err) =>{
                console.log(err)
            }  
          });
    }

    getGroupLists() {
        // 列出当前登录用户加入的所有群组
        let options = {
            success:(groupLists)=>{
                // console.log(groupLists,'groupLists')
            },
            error :(err)=>{
                if(err){
                    console.log(err)
                }
            }
        }
        window.conn.getGroup(options);
    }

    getBlackList() {
        window.conn.getBlacklist();
    }

    handlePresence(e) {
        // console.log(e,'handlePresence')
        switch (e.type) {
            case 'subscribe':
                this.props.addSubscribeMsg(FRIEND_SUBSCRIBE_ADD,e)
                break;
            case 'subscribed':
                
                break;
            case 'unsubscribe':

                break;
            case 'unsubscribed':

                break;
            default:
                break;
        }
    }
    
    render() {
        let {hadGetFriendLists} = this.state;
        let {pathname} = this.props.location;
        let personalPanelClass = classnames({
            hidePanel : pathname !== '/chat/personal/' ? true : false
        })
        let singlePanelClass = classnames({
            hidePanel : pathname !== '/chat/single/' ? true : false
        })
        let groupPanelClass = classnames({
            hidePanel : pathname !== '/chat/group/' ? true : false
        })
        return(
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"></div>
                <div className="chat-panel">
                    <PanelTab {...this.props} />
                    <div className={personalPanelClass}>
                        <PersonalPanel/>
                    </div>
                    <div className={singlePanelClass}>
                        <SinglePanel hadGetFriendLists={hadGetFriendLists}/>
                    </div>
                    <div className={groupPanelClass}>
                        <GroupPanel/>
                    </div>
                </div>
            </div>
        )
    }   
}

export default ChatContainer;