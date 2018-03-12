import React, { Component } from 'react';
import '../../assets/iconfonts/iconfont.css';
import './sign.css';
import {registerUser} from '@assets/js/registerUser';
import { message } from 'antd';
import PropTypes from 'prop-types';

class Sign extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            nickname:''
        }
    }

    accountChange = (ele) =>{
        this.setState({
            username:ele.target.value
        })
    }

    passwordChange = (ele) =>{
        this.setState({
            password:ele.target.value
        })        
    }
    
    nameChange = (ele) =>{
        this.setState({
            nickname:ele.target.value
        })
    }

    register = () =>{
        let {username,password,nickname} = this.state;
        let options = { 
            username: username,
            password: password,
            nickname: nickname,
            appKey: WebIM.config.appkey,
            apiUrl: WebIM.config.apiURL
          };  
          registerUser(options).then(r=>{
              message.success('注册成功',1200) 
              this.props.onRegisterSuccess()
          }).catch(e=>{
              let {error} = JSON.parse(e.data)
              switch(error){
                case 'duplicate_unique_property_exists':
                    message.error('此用户名已被其他用户使用！！',1200);
                    break;
                default:
                    message.error('注册出现错误',1200);
              }
          })
    }
    render () {
        let {state} = this;
        return (
            <div className="webim-Sign-wrapper" i="webim-Sign-wrapper">
                <div className="webim-SignName-wrapper">
                    <input type="text" value={state.username} onChange={this.accountChange}  placeholder="注册账号" autoFocus/>
                </div>
                <div className="webim-password-wrapper">
                    <input type="password" value={state.password} onChange={this.passwordChange} placeholder="注册密码"/>
                </div>
                <div className="webim-name-wrapper">
                    <input type="text" value={state.nickname} onChange={this.nameChange}  placeholder="登陆昵称"/>
                </div>
                <div className="webim-Sign-btn" onClick={this.register}>
                    <i className="iconfont SignBtn">&#xe62e;</i>
                </div>
            </div>
        )
    }
}

Sign.propTypes = {
    onRegisterSuccess:PropTypes.func.isRequired
}

export default Sign;