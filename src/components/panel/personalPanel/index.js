import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import DefalutPanel from '@components/panel/defalutPanel/index.js';
import SubscribePanel from '@components/panel/subscribePanel/index.js'
import classnames from 'classnames';
import {connect} from 'react-redux'
@safeRender
@connect(state=>{
    return {
        subscribeMessage:state.get('subscribe')
    }
})
class PersonalPanel extends Component {
    constructor(props) {
        super(props);
        this.state={
            rightPanelType:'defalut'//defalut,subscribe,black
        }
    }

    rightPanelChange = (type)=>{
        this.setState({
            rightPanelType:type
        })
    }
    render() {
        let {rightPanelType} = this.state;
        let hideStyle = {display:'none'};
        let subscribeClass = classnames('subscribe-msg-item',{
            active:(rightPanelType === 'subscribe' ? true : false)
        })
        let blackClass = classnames('black-lists-item',{
            active:(rightPanelType === 'black' ? true : false)
        })
        let subscribeMsgSize = this.props.subscribeMessage.size;
        return (<div i="personal_panel_wrapper">
                    <ul className="personal-messageLists">
                        <li className={subscribeClass} onClick={e=>this.rightPanelChange('subscribe')}>
                            <span className="iconfont icon-friendadd"></span>
                            <span className="item-title">新的朋友</span>
                            <span className="msg-num" style={subscribeMsgSize === 0 ? hideStyle : {}}>{subscribeMsgSize}</span> 
                        </li>
                        <li className= {blackClass} onClick={e=>this.rightPanelChange('black')}>
                            <span className="iconfont icon-heimingdan1"></span>
                            <span className="item-title">黑名单</span>
                        </li>
                    </ul>
                    <div className="personal-panel-content">
                        <div className="common-panel" style={rightPanelType === 'defalut' ? {} : hideStyle}>
                            <DefalutPanel/>
                        </div>
                        <div className="common-panel" style={rightPanelType === 'subscribe' ? {} : hideStyle}>
                            <SubscribePanel/>
                        </div>
                    </div>
                </div>)
    }
}

export default PersonalPanel