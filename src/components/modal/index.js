import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import { Modal,Input } from 'antd';
import {connect} from 'react-redux';
import {mergeProps} from '@assets/js/mergeProps.js'
import {CURRENT_SINGLE_NONE} from '@data/actions/actionTypes.js';
import {createAction} from '@assets/js/create.js';
import { Select, Radio } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
@safeRender
@connect(state=>{
    return {
            friendLists:state.get('friend'),
            blackLists:state.get('black'),
            currentChatUser:state.get('current'),
        }
},dispatch=>{
    return {
        noneCurrentSession:(type)=>{
            return dispatch(createAction(type,'none',{}))
        }
    }
},mergeProps,{ withRef: true })
class QModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            title:'QModal',
            type:'none',
            groupFrom:{
                groupname:'',
                desc:'',
                members:[],
                public:true,
                approval:true,
                allowinvites:true
            }
        }
    }

    setFriendSelectOpt =()=> {
        let {friendLists} = this.props;
        return friendLists.map((friend,idx)=>{
            return  (<Option key={friend.name}>{friend.name}</Option>)
        })
    }

    handleType (type) {
        switch (type) {
            case 'black':
                return '黑名单';
            case 'remove' :
                return '删除好友';
            case 'add' : 
                return '添加好友';
            case 'createGroup':
                return '创建群组';
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
            case 'createGroup':
                this.handleCreateGroup()
                break;
            default:
                break;
        } 
        this.closeModal()
    }

    handleCreateGroup () {
        let {groupFrom} = this.state;
        let options = {
            data:groupFrom,
            success:(respData)=>{
                this.getGroupLists()
            },
            error:(err)=>{
                if(err){
                    console.log(err,'创建群组失败!!')
                }
            }
        }
        window.conn.createGroupNew(options);
    }

    getGroupLists() {
        // 列出当前登录用户加入的所有群组
        let options = {
            success:(groupLists)=>{
            },
            error :(err)=>{
                if(err){
                    console.log(err)
                }
            }
        }
        window.conn.getGroup(options);
    }

    closeModal() {
        if(this.ModalInput) {
            this.ModalInput.value = ''
        }
        this.setState({
            visible:false,
            groupFrom:{
                groupname:'',
                desc:'',
                members:[],
                public:true,
                approval:true,
                allowinvites:true
            }
        })
    }

    handleBlackLists() {
        let currentPassUser = this.props.currentChatUser.get('single');
        let blackUser = {};
        let inputBlackUserName = this.ModalInput.value.trim();
        if(inputBlackUserName === currentPassUser) {
            this.props.noneCurrentSession(CURRENT_SINGLE_NONE )
        }
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

    groupInputChange =(type,e)=> {
        switch (type) {
            case 'name':
                let newName = e.target.value
               this.setState((preState,preProps)=>{
                   return {groupFrom :Object.assign(preState.groupFrom,{groupname:newName})}
               })
            break;
            case 'desc':
                let newDesc = e.target.value
                this.setState((preState,preProps)=>{
                    return {groupFrom :Object.assign(preState.groupFrom,{desc:newDesc})}
                })               
             break;        
            default:
                break;
        }
    }

    selectOptChange = (value)=>{
        this.setState((preState,preProps)=>{
            return {groupFrom:Object.assign(preState.groupFrom,{members:value})}
        })
    }

    handlePublicChange = (e)=>{
        this.setState((preState,preProps)=>{
            return {groupFrom:Object.assign(preState.groupFrom,{public:e.target.value})}
        })
    }

    handleApprovalChange = (e)=>{
        this.setState((preState,preProps)=>{
            return {groupFrom:Object.assign(preState.groupFrom,{approval:e.target.value})}
        })
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
                {
                    title === '创建群组'
                    ?
                    <div className="group-msg-wrapper">
                        <div className="group-name-wrapper">
                            <span className="title">群组名称:</span>
                            <Input placeholder="请输入群组名称" value={this.state.groupFrom.groupname} onChange={e => this.groupInputChange('name',e)} ref={name=> this.groupName = name}/>
                        </div>
                        <div className="group-desc-wrapper">
                            <span className="title">群组描述:</span>
                            <TextArea placeholder="请输入群组描述" value={this.state.groupFrom.desc} onChange={e => this.groupInputChange('desc',e)} ref={desc=> this.groupDec = desc} autosize={{ minRows: 6, maxRows: 12 }} />
                        </div>     
                        <div className="group-member-wrapper">
                            <span className="title">群组成员:</span>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择用户成员"
                                defaultValue={[]}
                                onChange={this.selectOptChange}
                            >
                                {this.setFriendSelectOpt()}
                            </Select>
                        </div>   
                        <div className="group-public-wrapper">
                            <span className="title">是否公开:</span>
                            <Radio.Group value={this.state.groupFrom.public} onChange={this.handlePublicChange}>
                                <Radio.Button value={true}>公开</Radio.Button>
                                <Radio.Button value={false}>不公开</Radio.Button>
                            </Radio.Group>
                        </div>      
                        <div className="group-approval-wrapper">
                            <span className="title">是否审批:</span>
                            <Radio.Group value={this.state.groupFrom.approval} onChange={this.handleApprovalChange}>
                                <Radio.Button value={true}>审批</Radio.Button>
                                <Radio.Button value={false}>不审批</Radio.Button>
                            </Radio.Group>
                        </div>                                    
                    </div>
                    :
                    <input className="ModalInput" placeholder="请输入用户名" autoFocus ref={input => this.ModalInput = input} />
                }
            </Modal>
        </div>)
    }
}

export default QModal;