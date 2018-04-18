import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender';
import EmojiPicker from '@components/emojiPicker/index.js'
import './index.css';
import { Icon } from 'antd';
import {connect} from 'react-redux';
import {MESSAGE_LISTS_UPDATE,MESSAGE_LISTS_STATE_UPDATE} from '@data/actions/actionTypes.js';
import {mergeProps} from '@assets/js/mergeProps.js';
import {createAction} from '@assets/js/create.js';
import { message as andMessage } from 'antd';
@safeRender
@connect(state=>{
    return {
        currentChatUser:state.get('current'),
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
},mergeProps,{withRef:true})
class InputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emojiPickerState : false
        }
    }

    dowmEnter = (e)=>{
        if(e.key === 'Enter') {
            this.passMessage(e)
            e.target.innerText = ''
        }
    }

    componentDidMount() {
        this.input.focus()
    }

    passMessage=(e)=>{
        if(e.target.innerText.trim().length === 0) return
        let currentUser = this.props.currentChatUser.get('single')
        var id = window.conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: e.target.innerText,                  // 消息内容
            to: currentUser,                          // 接收消息对象（用户id）
            roomType: false,
            success :(id, serverMsgId) =>{
                this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{msgId:serverMsgId,id,state:1,singleRoom:msg.body.to})
            },
            fail: function(e){
                console.log("Send private text error");
            }
        });
        msg.body.chatType = 'singleChat';
        window.conn.send(msg.body);
        this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,this.createMsgObj(msg,'text'))
    }

    openImageUpload = ()=> {
        this.imageUpload.click()
    }

    openSoundUpload = ()=> {
        this.soundUpload.click();
    }

    sendPrivateImg () {
        let currentUser = this.props.currentChatUser.get('single')
        let id = window.conn.getUniqueId();// 生成本地消息id
        let msg = new WebIM.message('img', id);// 创建图片消息
        let file = WebIM.utils.getFileUrl(this.imageUpload);  // 将图片转化为二进制文件
        let allowType = {
            'jpg': true,
            'gif': true,
            'png': true,
            'bmp': true,
            'jpeg':true
        };
        if (file.filetype.toLowerCase() in allowType) {
            let option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: currentUser,                       // 接收消息对象
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError:  (data)=> {      // 消息上传失败
                    andMessage.error('图片上传失败')
                    this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id:msg.id,state:-1,singleRoom:msg.body.to})
                },
                onFileUploadComplete:  (data)=> {   // 消息上传成功
                    let url = ((window.location.protocol != 'https:' && WebIM.config.isHttpDNS) ? 
                        (window.conn.apiUrl + data.uri.substr(data.uri.indexOf("/", 9))) 
                        : data.uri) + '/' + data.entities[0].uuid;
                    this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id,url:url,singleRoom:msg.body.to})
                },
                success:(id,serverMsgId)=> {                // 消息发送成功
                    this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{msgId:serverMsgId,id,state:1,singleRoom:msg.body.to})
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,this.createMsgObj(msg,'image'))
            window.conn.send(msg.body);
        }
    }

    sendPrivateSound = (e)=>{
        let currentUser = this.props.currentChatUser.get('single')
        let id = window.conn.getUniqueId();                   // 生成本地消息id
        let msg = new WebIM.message('audio', id);      // 创建视频消息
        let file = WebIM.utils.getFileUrl(this.soundUpload);      // 将视频转化为二进制文件
        let allowType = {
            'mp3': true,
            'amr': true,
            'wmv': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            let option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: currentUser,                       // 接收消息对象
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError: (error)=> {      // 消息上传失败
                    this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id:msg.id,state:-1,singleRoom:msg.body.to})
                    andMessage.error('可能从音乐软件下载的音频，会导致上传失败!!w.w')
                },
                onFileUploadComplete: (data)=> {   // 消息上传成功
                    let url = ((window.location.protocol != 'https:' && WebIM.config.isHttpDNS) ? 
                        (window.conn.apiUrl + data.uri.substr(data.uri.indexOf("/", 9))) 
                        : data.uri) + '/' + data.entities[0].uuid;
                        this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{id,url:url,singleRoom:msg.body.to})
                    },
                success: (id,serverMsgId)=> {                // 消息发送成功
                    this.props.singleMessageStateUpdate(MESSAGE_LISTS_STATE_UPDATE,{msgId:serverMsgId,id,state:1,singleRoom:msg.body.to})
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            this.props.singleMessageListsUpdate(MESSAGE_LISTS_UPDATE,this.createMsgObj(msg,'audio'))
            window.conn.send(msg.body);
        }
    }

    createMsgObj (msg,type) {
        let msgObj = {} 
        msgObj.type = type
        msgObj.sourceMsg = msgObj.data = msg.body.msg;
        msgObj.singleRoom = msgObj.to = msg.body.to;
        msgObj.id = msg.id;
        msgObj.from =  (this.props.user.get('loginUser')['username']);
        msgObj.state = 0;
        msgObj.url = null;
        msgObj.date = Date.now();
        msgObj.fromMe = true; 
        return msgObj
    }

    changeEmojiPickerState = (e) =>{
        if(e&&e.stopPropagation) {
            e.stopPropagation()
        }
        this.emojiPicker.changeEmojiPickerState();
        this.setState((preState,preProps)=>{
            return {
                emojiPickerState : !preState.emojiPickerState
            }
        })
        window.EventEmitter3.emit('emojiClick')
    }

    selectEmoji = (emoji) =>{
        this.changeEmojiPickerState()
        this.insertEmojiToInput(emoji)
    }

    insertEmojiToInput (emoji) {
        let sel, range;
        if (window.getSelection) {
            // IE9 and non-IE  
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                if(!this.checkRangeIsInput(range))return;
                let el = document.createElement("span");
                el.innerText = emoji;
                let frag = document.createDocumentFragment(),
                    node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                };
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9  
            document.selection.createRange().pasteHTML(emoji);
        }
    }

    checkRangeIsInput(range) {
        if(range.startContainer.className == 'input-wrapper' || range.endContainer.className == 'input-wrapper') {
            return true;
        }else if(range.startContainer.wholeText == this.input.innerText || range.endContainer.wholeText == this.input.innerText){
            return true;
        }else{
            return false;
        }
    }
    render () {
        let {emojiPickerState} = this.state;
        return (
            <div i="input_panel_wrapper">
                <div className="input-button">
                    <input type="file" id="image" ref={imageUpload => this.imageUpload = imageUpload}
                        onChange={e => this.sendPrivateImg(e)}
                    /> 
                    <input type="file" id="video" ref={soundUpload => this.soundUpload = soundUpload}
                        onChange={e => this.sendPrivateSound(e)}
                    />
                </div>
                <div className="input-header">
                    <button className="smile-iconfont-wrapper" onClick={this.changeEmojiPickerState}>
                        <Icon type="smile-o" style={emojiPickerState ?  { fontSize: 25,color:'#0581a278' } :{ fontSize: 25 } }/>   
                    </button>
                    <button  className="picture-iconfont-wrapper" onClick={this.openImageUpload}>
                        <Icon type="picture" style={{ fontSize: 25 }}/> 
                    </button>
                    <button  className="sound-iconfont-wrapper" onClick={this.openSoundUpload}>
                        <Icon type="sound" style={{ fontSize: 25 }}/> 
                    </button>
                </div>
                <EmojiPicker ref={emojiPicker => this.emojiPicker = emojiPicker} 
                    onSelectEmoji = {this.selectEmoji}
                />
                <div ref={inputWrapper => this.input = inputWrapper} className="input-wrapper" contentEditable="true" onKeyUp={this.dowmEnter}></div>
            </div>
        )
    }
}

export default InputPanel