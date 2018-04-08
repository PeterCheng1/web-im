import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import {connect} from 'react-redux';
import {avatarLists} from '@assets/js/avatar.js';
import { Spin, Icon } from 'antd';
import {mergeProps} from '@assets/js/mergeProps.js';
import {createAction} from '@assets/js/create.js';
import {MESSAGE_LISTS_DIFFTIME_UPDATE} from '@data/actions/actionTypes.js';
import classnames from 'classnames';
const loadingIcon = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;
const successIcon = <Icon type="check-circle" style={{ fontSize: 20 }}/>
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
}),dispatch=>{
    return {
        singleMessageTimeDiffUpdate:(type,playload)=>{
            return dispatch(createAction(type,'msgObj',playload))
        }
    }
},mergeProps)
class BubbleItem extends Component {
    constructor(props) {
        super(props);
    }   

    componentWillMount() {
        this.getTime();
    }

    getTime = ()=> {
        if(!this.props.diffTime && this.props.showTime) {
            let {id,singleRoom} = this.props;
            let date = new Date();
            let msgObj = {
                id,
                singleRoom,
                diffTime:`${(date.getHours())}:${(date.getMinutes())}`
            }
            this.props.singleMessageTimeDiffUpdate(MESSAGE_LISTS_DIFFTIME_UPDATE,msgObj)
        }
    }
    render () {
        let {fromMe,from,date,data,to,state,showTime,diffTime} = this.props;
        let avatar = avatarLists[parseInt(Math.random())]
        let itemClass = classnames({
            'is-FromMe-wrapper' : fromMe,
            'is-no-FromMe-wrapper':!fromMe
        })
        return (<div i="bubble_item_wrapper">
                    {showTime ? <div className="item-time"> <span className= "time">{diffTime}</span></div> : null}
                    <div className={itemClass}>
                        <img className="message-avatar" src={avatar} alt="头像"/>
                        <span className="message-content">{data}</span>
                        {state === 0 ? <Spin indicator={loadingIcon} /> : null}
                        {(state === 1|| state === 2) ? successIcon :null}
                    </div>                     
                </div>)
    }
}

export default BubbleItem;