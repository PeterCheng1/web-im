import React, { Component } from 'react';
import './header.css';
import classnames from 'classnames';
class LoginHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div i="webim-LoginHeader" className="webim-LoginHeader">
                <div className="webim-header-item">
                    <span class="webim-login">登陆</span>
                    <span class="webim-sign">注册</span>
                </div>
                <div className="webim-bottomLine"></div>
            </div>
        )
    }

}

export default LoginHeader;