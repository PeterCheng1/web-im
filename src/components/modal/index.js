import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import { Modal, Button,Input } from 'antd';
import {connect} from 'react-redux';
import {mergeProps} from '@assets/js/mergeProps.js'

@safeRender
@connect(state=>{
    return {
            friendLists:state.get('friend'),
            blackLists:state.get('black')
        }
},undefined,mergeProps,{ withRef: true })
class QModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            title:'QModal',
            type:'none'
        }
    }

    handleType (type) {
        switch (type) {
            case 'black':
                return '黑名单';
            case 'remove' :
                return '删除好友';
            case 'add' : 
                return '添加好友';
            default:
                return 'QModal';
        }
    }

    sdkEventTypeHandle () {
        let {type} = this.state;
        switch (type) {
            case 'black':
                this.handleBlackLists()
                break;
            case 'add':
                this.handleAddFriend()
                break;
            case 'remove':
                this.handleRemoveFriend()
                break;
            default:
                break;
        } 
        this.closeModal()
    }

    closeModal() {
        this.ModalInput.value = ''
        this.setState({
            visible:false,
            title:'QModal',
            type:'none'
        })
    }

    handleBlackLists() {
        let blackUser = {};
        let inputBlackUserName = this.ModalInput.value.trim();
        let inputBlackUser = this.props.friendLists.filter((user,idx)=>{
            return user.name === inputBlackUserName
        }).toJS()[0]
        blackUser[inputBlackUser.name] = inputBlackUser; 
        this.props.blackLists.forEach((user,idx)=>{
            blackUser[user.name] = user;
        })
        window.conn.addToBlackList({
            list: blackUser,
            type: 'jid',
            success: function () {
                console.log('Add friend to black list success');
                window.conn.getBlacklist();
            },
            error: function () {
                console.log('Add friend to black list error');
            }
        });
    }

    handleAddFriend() {
        window.conn.subscribe({
            to: this.ModalInput.value.trim(),
            message: '我们做个朋友吧!'   
        });
    }

    handleRemoveFriend() {
        window.conn.removeRoster({
            to:this.ModalInput.value.trim(),
            success:  ()=> {  // 删除成功
                window.conn.unsubscribed({
                    to: this.ModalInput.value.trim()
                });
            },
            error: (err)=> {    // 删除失败
                console.log(err)
            }
        });
    }

    openModal = (type)=>{
        this.setState({
            visible:true,
            title:this.handleType(type),
            type
        })
    }

    handleCancel = ()=>{
        this.closeModal()
    }

    handleOk = ()=>{
        this.sdkEventTypeHandle()
    }
    render () {
        let {title} = this.state
        return (<div i="modal_wrapper">
            <Modal
                okText="确定"
                cancelText="取消"
                title={title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <input className="ModalInput" placeholder="请输入用户名" autoFocus ref={input => this.ModalInput = input} />
            </Modal>
        </div>)
    }
}

export default QModal;