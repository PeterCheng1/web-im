import React, { Component } from 'react';
import '@assets/iconfonts/iconfont.css';
import './login.css';
class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            account:'',
            password:''
        }
    }

    accountChange = (ele) =>{
        this.setState({
            account:ele.target.value
        })
    }

    passwordChange = (ele) =>{
        this.setState({
            password:ele.target.value
        })        
    }
    render () {
        let {state} = this;
        return (
            <div className="webim-login-wrapper" i="webim-login-wrapper">
                <div className="webim-loginName-wrapper">
                    <input type="text" value={state.account} onChange={this.accountChange} placeholder="登陆账号" autoFocus/>
                </div>
                <div className="webim-password-wrapper">
                    <input type="password" value={state.password} onChange={this.passwordChange}  placeholder="登陆密码"/>
                </div>
                <div className="webim-login-btn">
                    <i className="iconfont loginBtn">&#xe62e;</i>
                </div>
            </div>
        )
    }
}

export default Login;