import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux';
import {MESSAGE_LISTS_UPDATE,MESSAGE_LISTS_STATE_UPDATE} from '@data/actions/actionTypes.js';
import {mergeProps} from '@assets/js/mergeProps.js';
import logo from '@assets/images/logo/logo.png';
import {createAction} from '@assets/js/create.js';
import {avatarLists} from '@assets/js/avatar.js';
import BubbleItem from '@components/bubbleItem/index.js'
import { Input ,Button} from 'antd';
const { TextArea } = Input;
@safeRender
@connect(state=>{
    return {
        currentChatUser:state.get('current'),
        message:state.get('singleMessage'),
        user:state.get('login')
    }
},dispatch=>{
    return {
        singleMessageListsUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        },
        singleMessageStateUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        }
    }
})
class MessagePanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            scrolltTimer : null
        }
        this.scroll_top_val = null;
        this.scrollLock = false;
        this.scrollLockTimer = null;
    }

    testEnter=()=>{
        let currentUser = this.props.currentChatUser.get('single')
        var id = window.conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: `message content ${Math.random()}`,                  // 消息内容
            to: currentUser,                          // 接收消息对象（用户id）
            roomType: false,
            success :(id, serverMsgId) =>{
                this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id,state:1,singleRoom:msg.body.to})
            },
            fail: function(e){
                console.log("Send private text error");
            }
        });
        msg.body.chatType = 'singleChat';
        window.conn.send(msg.body);
        this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,this.createMsgObj(msg))
    }

    scrollAdjust() {
        let cHeight = this.messageScroll.clientHeight;
        let sHeight = this.messageScroll.scrollHeight;
        let sTop = this.messageScroll.scrollTop;
        let {scrolltTimer} = this.state;
        if(cHeight === sHeight){
            return;
        }else if((sHeight > cHeight) && sTop < (sHeight - cHeight) && !scrolltTimer){
            let timer = setInterval(()=>{
                this.messageScroll.scrollTop += (this.messageScroll.scrollHeight - this.messageScroll.scrollTop)/80
            })
            this.setState({
                scrolltTimer:timer
            })
        }else{
            return;
        }
    }

    componentDidMount() {
        this.scroll_top_val = this.messageScroll.scrollTop = ( this.messageScroll.scrollHeight -  this.messageScroll.clientHeight)
    }

    calcuScrollHeight=()=> {
        let cHeight = this.messageScroll.clientHeight;
        let sHeight = this.messageScroll.scrollHeight;
        let sTop = this.messageScroll.scrollTop;
        if(this.scroll_top_val > this.messageScroll.scrollTop){//向上
            this.scrollLock = true;
            clearTimeout(this.scrollLockTimer)
            this.scrollLockTimer = setTimeout(()=>{
                this.scrollLock = false;
            },60000)
        }else if(this.scroll_top_val < this.messageScroll.scrollTop){//向下
            console.log(cHeight,sHeight,this.messageScroll.scrollTop)
            if(this.scrollLock && (cHeight >  (sHeight - this.messageScroll.scrollTop-120))) {
                this.scrollLock = false;
                clearTimeout(this.scrollLockTimer)
            }
            if(sTop ===  (sHeight - cHeight)) {
                clearInterval(this.state.scrolltTimer);
                this.setState({
                    scrolltTimer:null
                })
            }
        }
        this.scroll_top_val = this.messageScroll.scrollTop;
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.scrollLock && (this.messageScroll.scrollHeight > this.messageScroll.clientHeight)){
            this.scrollAdjust()
        }
    }

    createMsgObj (msg) {
        let msgObj = {} 
        msgObj.sourceMsg = msgObj.data = msg.body.msg;
        msgObj.singleRoom = msgObj.to = msg.body.to;
        msgObj.id = msg.id;
        msgObj.from =  (this.props.user.get('loginUser')['username']);
        msgObj.state = 0;
        msgObj.date = Date.now();
        msgObj.fromMe = true; 
        return msgObj
    }

    render() {
        let avatar = avatarLists[parseInt(Math.random())]
        let currentPassUser = this.props.currentChatUser.get('single');
        let currentMsgLists = this.props.message.get(currentPassUser);
        return (<div i="message_panel">
                    <div className="message-header">
                        <span className="title">{currentPassUser}</span>
                        <span className="iconfont icon-xiaoxi"></span>
                    </div>
                    <ul className="message-content-wrapper" ref={messageScroll => this.messageScroll = messageScroll}
                        onScroll={this.calcuScrollHeight}
                    >
                        {/* <img className="message-wrapper-logo" src={logo} alt="logo"/> */}
                        {
                            currentMsgLists
                            ?
                            currentMsgLists.map((dataObj,idx)=>{
                                let showTime;
                                if(idx === 0) {
                                    showTime  = true
                                }else if (dataObj.date - currentMsgLists[idx-1].date > 60000){
                                    showTime = true
                                }
                                return (
                                    <BubbleItem className="message-item" showTime={showTime} key={dataObj.id} {...dataObj}/>
                                )
                            })
                            :null
                        }
                    </ul>
                    <TextArea placeholder="Autosize height based on content lines" autosize />
                    <Button type="primary" onClick={this.testEnter}>提交</Button>
                </div>)
    }
}


export default MessagePanel;