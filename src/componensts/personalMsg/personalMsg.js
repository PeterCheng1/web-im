import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './personalMsg.css'
import {connect} from 'react-redux';
import {PANEL_TO_SUBSCRIBE} from '@data/actions/actionTypes'
const createUserAction = (type,panelType) =>{
    let action = {
        type:type,
        playload:{
            panelType
        }
    }
    return action;
}
@safeRender
@connect(
    state=>{
        return {
            subscribeMsg : state.subscribe.subscribeMsg
        } 
    },
    (dispatch)=>{
        return {
            panelTypeChange : (type,panelType)=>{
                return dispatch(createUserAction(type,panelType))
            }           
        }
    }
)
class PersonalPanel extends Component {
    static defaultProps = {
        subscribeMsg : []
    }

    constructor(props) {
        super(props)
        this.state={}
    }

    checkSubscribtPanel=()=>{
        this.props.panelTypeChange(PANEL_TO_SUBSCRIBE,'subscribe')
    }
    render() {
        let {subscribeMsg} = this.props
        return (
            <div i="pansonal_panel_wrapper">
                <ul className="personal-setting-panel">
                    <li className="subscribe-message" onClick={this.checkSubscribtPanel}>
                        <span className="iconfont icon-friendadd"></span>
                        <span className="title">新的朋友</span>
                        {subscribeMsg.length > 0 ? <span className="num">{subscribeMsg.length}</span> : null}
                    </li>
                </ul>
            </div>
        )
    }
}

export default PersonalPanel