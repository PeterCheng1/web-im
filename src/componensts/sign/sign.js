import React, { Component } from 'react';
import '../../assets/iconfonts/iconfont.css';
import './sign.css';
class Sign extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loginVal:'',
            password:''
        }
    }

    render () {
        return (
            <div className="webim-Sign-wrapper" i="webim-Sign-wrapper">
                <div className="webim-SignName-wrapper">
                    <input type="text" placeHolder="账号" autoFocus/>
                </div>
                <div className="webim-password-wrapper">
                    <input type="password"  placeHolder="密码"/>
                </div>
                <div className="webim-Sign-btn">
                    <i className="iconfont SignBtn">&#xe62e;</i>
                </div>
            </div>
        )
    }
}

export default Sign;