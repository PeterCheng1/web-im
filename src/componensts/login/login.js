import React, { Component } from 'react';
import '../../assets/iconfonts/iconfont.css';
import './login.css';
class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loginVal:'',
            password:''
        }
    }

    render () {
        return (
            <div className="webim-login-wrapper" i="webim-login-wrapper">
                <div className="webim-loginName-wrapper">
                    <input type="text" placeHolder="登陆账号" autoFocus/>
                </div>
                <div className="webim-password-wrapper">
                    <input type="password"  placeHolder="登陆密码"/>
                </div>
                <div className="webim-login-btn">
                    <i className="iconfont loginBtn">&#xe62e;</i>
                </div>
            </div>
        )
    }
}

export default Login;