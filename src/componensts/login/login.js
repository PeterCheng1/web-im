import React, { Component } from 'react';
import '@assets/iconfonts/iconfont.css';
import './login.css';
import { message } from 'antd';
import {loginUser} from '@assets/js/loginUser'
import { Spin } from 'antd';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            loginning:false
        }
    }

    accountChange = (ele) =>{
        this.setState({
            name:ele.target.value
        })
    }

    passwordChange = (ele) =>{
        this.setState({
            password:ele.target.value
        })        
    }

    loginAccount = () => {
        let {name,password} = this.state;
        const options = {
            apiUrl: WebIM.config.apiURL,
            user:name,
            pwd:password,
            appKey: WebIM.config.appkey
        }
        this.setState({
            loginning:true
        })
        loginUser(options)
        .then(r=>{
            console.log(r);
            this.setState({
                loginning:false
            })
        })
        .catch(e=>{
            message.error('可能账号或者密码填写错误！－。－');
            this.setState({
                loginning:false
            })
        })
    }
    render () {
        let {state} = this;
        return (
            <div className="webim-login-wrapper" i="webim-login-wrapper">
                <div className="webim-loginName-wrapper">
                    <input type="text" value={state.name} onChange={this.accountChange} placeholder="登陆账号" autoFocus/>
                </div>
                <div className="webim-password-wrapper">
                    <input type="password" value={state.password} onChange={this.passwordChange}  placeholder="登陆密码"/>
                </div>
                {!state.loginning ?                 
                    <div className="webim-login-btn" onClick={this.loginAccount}>
                        <i className="iconfont loginBtn">&#xe62e;</i>
                    </div>
                        :
                    <div className="webim-login-btn" >
                        <i className="iconfont loginBtn loginning">&#xe615;</i>
                    </div>
                }
            </div>
        )
    }
}

export default Login;