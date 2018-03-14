import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import classnames from 'classnames';
import {safeRender} from '@assets/js/safeRender.js';

@safeRender
class LoginHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottomLineName :null
        }
    }
    
    componentWillMount () {
        let bottomLine = classnames("webim-bottomLine",{'webim-sign':false})
        this.setState({
            bottomLineName:bottomLine
        })
    }

    loginState = () =>{
        let bottomLine = classnames("webim-bottomLine",{'webim-sign':false})
        this.setState({
            bottomLineName:bottomLine
        })
        this.props.onLoginStateChange('login')
    }

    signState = () =>{
        let bottomLine = classnames("webim-bottomLine",{'webim-sign':true})
        this.setState({
            bottomLineName:bottomLine
        })        
        this.props.onLoginStateChange('sign')
    }
    render() {
        return (
            <div i="webim-LoginHeader" className="webim-LoginHeader">
                <div className="webim-header-item">
                    <span className="webim-login" onClick={this.loginState}>登陆</span>
                    <span className="webim-sign" onClick={this.signState}>注册</span>
                </div>
                <div className={this.state.bottomLineName}></div>
            </div>
        )
    }

}

LoginHeader.propTypes = {
    onLoginStateChange:PropTypes.func.isRequired
}

export default LoginHeader;