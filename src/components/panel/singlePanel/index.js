import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux'
import { HashLoader } from 'react-spinners';
import {mergeProps} from '@assets/js/mergeProps.js'
import DefalutPanel from '@components/panel/defalutPanel/index.js';
import MessagePanel from '@components/panel/messagePanel/index.js';
import {createAction} from '@assets/js/create.js';
import {CURRENT_SIGNLE_USER_UPDATE} from '@data/actions/actionTypes.js';
@safeRender
@connect(state=>{
    return {
        friendLists:state.get('friend'),
        blackLists:state.get('black'),
        current:state.get('current')
    }
},dispatch=>{
    return {
        currentChatUpdate:(type,playoad)=>{
            return dispatch(createAction(type,'username',playoad))
        }
    }
},mergeProps)
class SinglePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassUser : 'sheldon2222'
        }
    }

    currentChatUserUpdate=(username,e)=>{
        this.props.currentChatUpdate(CURRENT_SIGNLE_USER_UPDATE,username)
    }   
    render() {
        let {friendLists,blackLists,hadGetFriendLists,current} = this.props;
        let {currentPassUser} = this.state;
        let currentChatUser = this.props.current.get('single');
        console.log(currentChatUser,'current')
        return (<div i="single_panel_wrapper">
                    <ul className="friend-list-wrapper">
                        <div className='sweet-loading'>
                            <HashLoader
                            size={80}
                            margin="5px"
                            color={'#0BA4D6'} 
                            loading={!hadGetFriendLists} 
                            />
                        </div>
                        {friendLists.map((frined,idx)=>{
                            let Buser = blackLists.filter((u,idx)=>{
                                return u.name === frined.name
                            })
                            return Buser.size === 0 
                                    ? 
                                 <li className={currentChatUser === frined.name ? 'friend-item active' : 'friend-item'} key={frined.name} onClick={e=>this.currentChatUserUpdate(frined.name,e)}>
                                    <div className="user-avatar">
                                    {/* <img className="user-avatar" src={firend.avatar} alt="用户头像"/> */}
                                    </div>
                                    <span className="user-name">{frined.name}</span>
                                    <span className="user-tag-wrapper">
                                        {Buser.size !== 0 ? <i className="iconfont icon-jinzhi"></i> : null}
                                    </span>
                                </li>
                                    :
                                    null
                        })}
                    
                    </ul>
                    <div className="personal-panel-content">
                        <div className="common-panel">
                        {
                            current.get('single') 
                            ? 
                            <MessagePanel/>
                            :
                            <DefalutPanel/>
                        }
                        </div>
                    </div>
                </div>)
    }
}

export default SinglePanel