import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux'
import { HashLoader } from 'react-spinners';
import {mergeProps} from '@assets/js/mergeProps.js'
@safeRender
@connect(state=>{
    return {
        friendLists:state.get('friend'),
        blackLists:state.get('black')
    }
},undefined,mergeProps)
class SinglePanel extends Component {

    render() {
        let {friendLists,blackLists,hadGetFriendLists} = this.props;
        console.log(hadGetFriendLists)
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
                    return <li className="friend-item" key={frined.name}>
                                <div className="user-avatar">
                                {/* <img className="user-avatar" src={firend.avatar} alt="用户头像"/> */}
                                </div>
                                <span className="user-name">{frined.name}</span>
                                <span className="user-tag-wrapper">
                                    {Buser.size !== 0 ? <i className="iconfont icon-jinzhi"></i> : null}
                                </span>
                            </li>
                    })}
                
                </ul>
            </div>)
    }
}

export default SinglePanel