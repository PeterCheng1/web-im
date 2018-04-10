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
import InputPanel from '@components/inputPanel/index.js'
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
        if(this.props.message.get(this.props.currentChatUser.get('single')).size ===0) return
        let cHeight = this.messageScroll.clientHeight;
        let sHeight = this.messageScroll.scrollHeight;
        let sTop = this.messageScroll.scrollTop;
        this.checkBubbleItemLook({scrollTop:sTop,clientHeight:cHeight,scrollHeight:sHeight})
        if(this.scroll_top_val > this.messageScroll.scrollTop){//向上
            this.scrollLock = true;
            clearTimeout(this.scrollLockTimer)
            this.scrollLockTimer = setTimeout(()=>{
                this.scrollLock = false;
            },60000)
        }else if(this.scroll_top_val < this.messageScroll.scrollTop){//向下
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

    checkBubbleItemLook(scrollVal) {
        for(let i in this.bubble) {
            let BubbleItem = this.bubble[i].getWrappedInstance()
            if( BubbleItem && BubbleItem.itemStateCheck) {
                BubbleItem.itemStateCheck(scrollVal)
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.scrollLock && (this.messageScroll.scrollHeight > this.messageScroll.clientHeight)){
            this.scrollAdjust()
        }
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
                                    <BubbleItem ref={item => {if(!this.bubble){
                                        this.bubble={}
                                    } this.bubble[dataObj.id] = item}} className="message-item" showTime={showTime} key={dataObj.id} {...dataObj}/>
                                )
                            })
                            :null
                        }
                    </ul>
                    <InputPanel />
                    {/* <TextArea placeholder="Autosize height based on content lines" autosize /> */}
                    {/* <Button type="primary" onClick={this.testEnter}>提交</Button> */}
                </div>)
    }
}


export default MessagePanel;