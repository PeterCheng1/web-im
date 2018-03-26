import React, { Component } from 'react';
import './singPanel.css'
import {safeRender} from '@assets/js/safeRender'
import DefalutPanel from '@components/panel/defalutPanel/defalutPanel.js'
import {avatarLists} from '@assets/js/avatar.js'
import { Spin } from 'antd';
import classnames from 'classnames';
import {connect} from 'react-redux'
import {mergeProps} from '@assets/js/mergeProps.js'

@safeRender
@connect(state=>{
    return {friendLists:state.friend}
},undefined,
mergeProps
)
class SingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firendLists:[],
            hasGetRoster:false
        };
    }

    componentDidMount() {
        setTimeout(()=>{
            this.getRosterLists()
        },1000)
    }

    getRosterLists=()=> {
        window.conn.getRoster({
            success : ( roster )=> {
              //获取好友列表，并进行好友列表渲染，roster格式为：
              /** [
                    {
                      jid:'asemoemo#chatdemoui_test1@easemob.com',
                      name:'test1',
                      subscription: 'both'
                    }
                  ]
              */
                let firendLists = []
                for(let ros of roster) {
                    ros.avatar = this.getAvatar()
                    if(ros.subscription === 'both') {
                        firendLists.push(ros);
                    }
                }
                this.setState({
                    firendLists,
                    hasGetRoster:true
                })
            },    
            error: (err)=> {
                if(err)console.log(err)
                this.setState({
                    hasGetRoster:true
                })
            }
          });
    }

    getAvatar() {
        let length = avatarLists.length;
        let index = window.parseInt(Math.random()*length);
        let avatar = avatarLists[index]
        return avatar;
    }
  
    render () {
        let {firendLists,hasGetRoster} = this.state;
        let {hideSiglePanel} = this.props.classGroup
        let single = classnames('single_panel_wrapper',{
            hidePanel:hideSiglePanel
        })
        return (
            <div i="single_panel_wrapper" className={single}>
                <ul className="single-message-lists-wrapper">
                    {hasGetRoster  ?  firendLists.map((firend,index)=>{
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