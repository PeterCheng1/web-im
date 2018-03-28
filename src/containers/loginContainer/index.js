import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import {Map} from 'immutable';
import pageLogo from '@assets/images/logo/logo.png'
import './index.css';
import classnames from 'classnames';

@safeRender
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            data : Map({
                login:true,
                bottomLineName:'webim-bottomLine'
            })
        }
    }

    LoginStateChange = (val) =>{
        let {data} = this.state;
        let newData = val === 'login' ? data.set('login',true) : data.set('login',false);
        this.setState({
            data:newData
        })
    }

    BLStateChange = (val) =>{
        let {data} = this.state;
        let newClassName = val === 'login'  
        ? classnames("webim-bottomLine",{'webim-sign':false})
        :classnames("webim-bottomLine",{'webim-sign':true})
        let newData = data.set('bottomLineName',newClassName);
        this.setState({
            data:newData
        })
    }
    render() {
        let {data} = this.state;
        return (
        <div i="login-container">
            <div className = "webim-login-bg"></div>
            <div className="webim-login-msg">
                <div className="logo-wrapper" onClick={e=>this.LoginStateChange('avb',e)}>
                    <img className="webim-logo" src={pageLogo} alt="OWL-IM-LOGO" />
                    <span className="webim-logoName">OWL-WebIM</span>
                </div>
                <div className="webim-btn-wrapper">
                    <div  className="webim-LoginHeader webim-LoginHeader">
                        <div className="webim-header-item">
                            <span className="webim-login" onClick={e=>this.BLStateChange('login',e)}>登陆</span>
                            <span className="webim-sign" onClick={e=>this.BLStateChange('sign',e)}>注册</span>
                        </div>
                        <div className={data.get('bottomLineName')}></div>
                    </div>
                </div>                        
            </div>
        </div>
        )
    }
}


export default LoginContainer