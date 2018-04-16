import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux';
import logo from '@assets/images/logo/logo.png';
import {createAction} from '@assets/js/create.js';
import {avatarLists} from '@assets/js/avatar.js';
import BubbleItem from '@components/bubbleItem/index.js'
import InputPanel from '@components/inputPanel/index.js'
import Lightbox from 'react-image-lightbox';
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
            scrolltTimer : null,
            photoIndex: 0,
            isImageLightBobOpen: false,
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
        if(this.props.message.get(this.props.currentChatUser.get('single')) 
        && this.props.message.get(this.props.currentChatUser.get('single')).size
        && this.props.message.get(this.props.currentChatUser.get('single')).size ===0) return
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
            if( this.bubble[i] &&  this.bubble[i].getWrappedInstance && typeof this.bubble[i].getWrappedInstance === 'function'){
                let BubbleItem = this.bubble[i].getWrappedInstance()
                if( BubbleItem && BubbleItem.itemStateCheck) {
                    BubbleItem.itemStateCheck(scrollVal)
                }
            } 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.currentChatUser.get('single') === this.props.currentChatUser.get('single')){
            if(!this.scrollLock && (this.messageScroll.scrollHeight > this.messageScroll.clientHeight)){
                this.scrollAdjust()
            }
        }else{
            clearTimeout(this.scrollLockTimer)
            this.scrollLock = false;
            this.scroll_top_val = this.messageScroll.scrollTop = ( this.messageScroll.scrollHeight -  this.messageScroll.clientHeight)
        }
    }

    openImageLightBox = (data)=> {
        let {id} = data;
        let currentPassUser = this.props.currentChatUser.get('single');
        let currentMsgLists = this.props.message.get(currentPassUser);
        let photoIndex = this.currentMessageImageArr(currentMsgLists).findIndex((image,idx)=>{
            return image.id === id;
        })
        this.setState({
            isImageLightBobOpen: true,
            photoIndex
        })
    }

    currentMessageImageArr = (currentMsgLists)=>{
        if(currentMsgLists) {
            return currentMsgLists.filter((message,idx)=>{
                return message.type === 'image'
            })
        }else{
            return []
        }
    }
    render() {
        let avatar = avatarLists[parseInt(Math.random())]
        let currentPassUser = this.props.currentChatUser.get('single');
        let currentMsgLists = this.props.message.get(currentPassUser);
        let {isImageLightBobOpen,photoIndex} = this.state;
        let currentMessageImageArr = this.currentMessageImageArr(currentMsgLists)
        return (<div i="message_panel">
                    <div className="message-header">
                        <span className="title">{currentPassUser}</span>
                        <span className="iconfont icon-xiaoxi"></span>
                    </div>
                    {isImageLightBobOpen && <Lightbox 
                        mainSrc={currentMessageImageArr[photoIndex].url}
                        nextSrc={(currentMessageImageArr[(photoIndex + 1) % currentMessageImageArr.length]).url}
                        prevSrc={currentMessageImageArr.length >0 ? (currentMessageImageArr[(photoIndex + currentMessageImageArr.length - 1) % currentMessageImageArr.length]).url : ''}
                        onCloseRequest={() => this.setState({ isImageLightBobOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + currentMessageImageArr.length - 1) % currentMessageImageArr.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % currentMessageImageArr.length,
                            })
                        }
                    />}
                    
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
                                    <BubbleItem onOpenImageLightBox={this.openImageLightBox} ref={item => {if(!this.bubble){
                                        this.bubble={}
                                    } this.bubble[dataObj.id] = item}} className="message-item" showTime={showTime} key={dataObj.id} {...dataObj}/>
                                )
                            })
                            :null
                        }
                    </ul>
                    <InputPanel />
                </div>)
    }
}


export default MessagePanel;