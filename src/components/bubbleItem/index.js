import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux';
import {avatarLists} from '@assets/js/avatar.js';
import { Spin, Icon } from 'antd';
import ImageItem from '@components/message-item/imageItem/index.js'
import AudioItem from '@components/message-item/audioItem/index.js'
import {mergeProps} from '@assets/js/mergeProps.js';
import {createAction} from '@assets/js/create.js';
import {MESSAGE_LISTS_DIFFTIME_UPDATE,MESSAGE_LISTS_STATE_UPDATE} from '@data/actions/actionTypes.js';
import classnames from 'classnames';
import Highlight from 'react-highlight'
import regexMarkdown  from 'gfm-code-block-regex';
import emojione from 'emojione';
const loadingIcon = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;
const successIcon = <Icon type="check-circle" style={{ fontSize: 20 }}/>
const failIcon = <Icon type="close-circle" style={{ fontSize: 20,color: '#ff3600e3' }}/>
/** 
 * 
 <li className="message-item" key={dataObj.id}>
    <img className="message-avatar" src={avatar} alt="头像"/>
    <span className="message-content">{dataObj.data}</span>
    {dataObj.state === 1 ? '未送达' : <span>送达</span>}
</li>
*/
@safeRender
@connect(state=>({
    friendLists : state.get('friend')
}),dispatch=>{
    return {
        singleMessageTimeDiffUpdate:(type,playload)=>{
            return dispatch(createAction(type,'msgObj',playload))
        },
        singleMessageStateUpdate:(type,playload)=>{
            return dispatch(createAction(type,'message',playload))
        }
    }
},mergeProps,{ withRef: true})
class BubbleItem extends Component {
    constructor(props) {
        super(props);
    }   

    componentWillMount() {
        this.getTime();
    }

    componentDidMount() {
        let wrapper = document.querySelector('.message-content-wrapper');
        let {fromMe} = this.props;
        if( !fromMe && wrapper.scrollHeight === wrapper.clientHeight) {
            this.changeMsgItemState()
        }
    }

    getTime = ()=> {
        if(!this.props.diffTime && this.props.showTime) {
            let {id,singleRoom} = this.props;
            let msgObj = {
                id,
                singleRoom,
                diffTime:new Date().toLocaleString().split(' ')[1]
            }
            this.props.singleMessageTimeDiffUpdate(MESSAGE_LISTS_DIFFTIME_UPDATE,msgObj)
        }
    }

    itemStateCheck(valObj) {
        let BubbleItemOffsetTop = this.bubbleItemWrapper.offsetTop
        let {state,fromMe} = this.props;
        let {scrollTop,clientHeight,scrollHeight} = valObj
        if(state !==3 && !fromMe){
            if(scrollHeight < clientHeight || ( scrollTop<BubbleItemOffsetTop && BubbleItemOffsetTop < (scrollTop + clientHeight))) {
                this.changeMsgItemState()
            }
        }
    }

    changeMsgItemState() {
        let {id,from} = this.props;
        this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id,state:3,singleRoom:from})
        this.createReceipt();
    }

    createReceipt() {
        const bodyId = this.props.id;         // 需要发送已读回执的消息id
        const msgId = window.conn.getUniqueId();// 生成本地消息id
        const msg = new WebIM.message('read', msgId);
        msg.set({
            id: bodyId
            ,to: this.props.from
        });
        window.conn.send(msg.body);
    }

    friendAvatar = (f)=> {
        let {friendLists} = this.props;
        return friendLists.get(friendLists.findIndex((friend,idx)=>{
            return friend.name === f;
        })).avatar;
    }

    openImageLightBox = (message)=>{
        this.props.onOpenImageLightBox(message)
    }
    render () {
        let {fromMe,from,date,data,to,state,showTime,diffTime,type,url} = this.props;
        let avatar = avatarLists[parseInt(Math.random())]
        let itemClass = classnames({
            'is-FromMe-wrapper' : fromMe,
            'is-no-FromMe-wrapper':!fromMe
        })
        return (<div i="bubble_item_wrapper" ref={wrapper => this.bubbleItemWrapper = wrapper}>
                    {showTime ? <div className="item-time"> <span className= "time">{diffTime}</span></div> : null}
                    <div className={itemClass}>
                        {
                            fromMe 
                            ? 
                            <img className="message-avatar" src={avatar} alt="头像"/>
                            :
                            <img className="message-avatar" src={this.friendAvatar(from)} alt="头像"/>
                        }
                        {type === 'text' ? 
                            (
                            regexMarkdown().exec(data) ? 
                            <span className="message-content">
                                <Highlight className='javascript'>
                                    {data}
                                </Highlight>
                            </span>
                            :
                            <span className="message-content" dangerouslySetInnerHTML={{__html:emojione.shortnameToImage(data)}}></span>
                            ) : null
                        }
                        {
                            type === 'image' ?
                            (<span className="message-content" onClick={e => this.openImageLightBox(this.props)}>
                                <ImageItem imageUrl={url}/>
                            </span>)
                            :
                            null
                        }
                        {
                            type === 'audio' ?
                            (<span  className="message-content">
                                <AudioItem audioUrl={url}/>
                            </span>):
                            null
                        }
                        {state === -1 ? failIcon : null}
                        {state === 0 ? <Spin indicator={loadingIcon} /> : null}
                        {(state === 1|| state === 2) ? successIcon :null}
                        {state === 3 ? <span className="iconfont icon-read"></span> : null}
                    </div>                     
                </div>)
    }
}

export default BubbleItem;