import React, { Component } from 'react';
import './singPanel.css'
import {safeRender} from '@assets/js/safeRender'
import DefalutPanel from '@components/panel/defalutPanel/defalutPanel.js'
import { Spin } from 'antd';
import classnames from 'classnames';
import {connect} from 'react-redux'
import {mergeProps} from '@assets/js/mergeProps.js'

@safeRender
@connect(state=>{
    return {friendLists:state.friend.friendMsg}
},
  undefined,
  mergeProps
)
class SingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGetRoster:false
        };
    }

    componentDidMount() { 
 
    }
  
    render () {
        let {friendLists} = this.props;
        let {hideSiglePanel} = this.props.classGroup
        let single = classnames('single_panel_wrapper',{
            hidePanel:hideSiglePanel
        })
        return (
            <div i="single_panel_wrapper" className={single}>
                <ul className="single-message-lists-wrapper">
                    {friendLists.length>0  ?  friendLists.map((firend,index)=>{
                        return  <li className="single-message" key={firend.name}>
                                <img className="user-avatar" src={firend.avatar} alt="用户头像"/>
                                <span className="user-name">{firend.name}</span>
                            </li>                    
                    }) : <Spin />}
                </ul>
                <div i="chat_content_wrapper">
                    <DefalutPanel/>
                </div>
            </div>
        )
    }
}

export default SingPanel