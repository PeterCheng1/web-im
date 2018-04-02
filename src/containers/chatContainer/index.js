import React, { Component } from 'react';
import {Map,List,fromJS} from 'immutable'
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
import {connect} from 'react-redux';
@safeRender
@connect(state=>{
    return {
        subscribe:state.get('subscribe'),
        blackLists:state.get('black')
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
                this.getBlackList();
                this.getFriendLists();
            },
            onPresence:(message)=>{
                this.handlePresence(message)
            },
            onRoster:(message)=>{
                this.getFriendLists();
            },
            onInviteMessage:(message)=>{

            },
            onBlacklistUpdate:(message)=>{
                // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                this.props.blackListsUpdate(BLACK_LISTS_UPDATE,message)
            },
            onTextMessage:(message)=>{
                console.log(message,'text')
            },
            onEmojiMessage:(messgae)=>{
                console.log(messgae,'emoji')
            },
            onPictureMessage:(message)=>{
                console.log(message,'pic')
            },
            onError:(error)=>{
                console.log(error);
            }
        })
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

    getBlackList() {
        window.conn.getBlacklist();
    }

    handlePresence(e) {
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