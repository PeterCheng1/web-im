import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender';
import { Modal ,Input} from 'antd';
import './index.css';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {mergeProps} from '@assets/js/mergeProps.js';
import classnames from 'classnames';

@safeRender
class PanelTab extends Component {
    constructor(props) {
        super(props);
    }

    tabTransfrom = (type,e)=>{
        let {uid}= this.props.location.query;
        hashHistory.push({
            pathname:`/chat/${type}/`,
            query:{
                uid:uid
            }
        })
    }
    render() {
        let {pathname} = this.props.location;
        let singleClass = classnames('iconfont','icon-chat',{
            active:(pathname === '/chat/single/' ? true : false)
        })
        let groupClass = classnames('iconfont','icon-LC_icon_chat_fill',{
            active:(pathname === '/chat/group/' ? true : false)            
        })
        let personalClass = classnames('iconfont',' icon-information',{
            active:(pathname === '/chat/personal/' ? true : false)            
        })
        return (<div i="panel_tab_wrapper">
                    <div className="avatar-wrapper">
                        {/* <img src={state.userAvatar} alt="avatar" /> */}
                    </div>
                    <div className="single-chat">
                        <span className={singleClass} onClick={(e)=>this.tabTransfrom('single',e)}></span>
                    </div>
                    <div className="group-chat">
                        <span className={groupClass} onClick={e=>this.tabTransfrom('group',e)}></span>     
                    </div>
                    <div className="personal-message">
                        <span className={personalClass} onClick={e=>this.tabTransfrom('personal',e)}></span>     
                    </div>
                    <div className="setting-container"> 
                        <span className="iconfont icon-set1"  onClick={this.openPanel}></span>                         
                    </div>
                </div>)
    }
}

export default PanelTab;