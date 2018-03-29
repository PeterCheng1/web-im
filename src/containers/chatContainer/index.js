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
import {connect} from 'react-redux';
@safeRender
@connect(state=>{
    return {
        subscribe:state.get('subscribe')
    }
},
(dispatch)=>{
    return{
        addSubscribeMsg:(type,playload)=>{
            return dispatch(createAction(type,'subscribeMessage',playload))
        },
        removeSubscribeMsg:(type,playload)=>{
            return dispatch(createAction(type,'subscribeMessage',playload))
        }
    }
},
mergeProps
)
class ChatContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.bindSdkEvent()
    }
    bindSdkEvent() {
        window.conn.listen({
            onOpened:(message)=>{

            },
            onPresence:(message)=>{
                // console.log(message)
                this.handlePresence(message)
            },
            onRoster:(message)=>{
                
            },
            onInviteMessage:(message)=>{

            },
            onBlacklistUpdate:(message)=>{
                // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息


            },
            onError:(error)=>{
                console.log(error);
            }
        })
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
        // console.log(this.props.test)
        return(
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"></div>
                <div className="chat-panel">
                    <PanelTab {...this.props} />
                    <div className={personalPanelClass}>
                        <PersonalPanel/>
                    </div>
                    <div className={singlePanelClass}>
                        <SinglePanel/>
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