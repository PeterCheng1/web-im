/*
    就设计内容:<
        <h1 className="webim-title">⚡️闪电狼即时通信(IM)</h1>
        <div className="webim-login-msg-wrapper">123123</div>
        <Particles style={particlesStyle} params={ParticlesConfig}/>
    >
*/

import React ,{Component} from 'react';
import WebIMLogin from '@components/login/login'
import WebIMSign from '@components/sign/sign'
import LoginHeader from '@components/loginHeader/header'
import pageLogo from '@assets/images/logo/logo.png'
import './index.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
class LoginPage extends Component {
    constructor (props) { 
        super(props);
        this.state = {
            login:true
        }
    }

    LoginStateChange = (val) =>{
        this.setState({
            login : (val === 'login'? true: false)
        })
    }

    registerSuccess = () =>{
        this.setState({
            login:true
        })
        this.loginHeader.loginState()
    }
    render () {
        return (
                <div>
                    <div className = "webim-login-bg"> 
                    </div>
                    <div className="webim-login-msg">
                        <div className="logo-wrapper">
                            <img className="webim-logo" src={pageLogo} />
                            <span className="webim-logoName">OWL-WebIM</span>
                        </div>
                        
                        <div className="webim-btn-wrapper">
                            <LoginHeader ref={header => this.loginHeader = header} onLoginStateChange={this.LoginStateChange} />
                            {this.state.login ? <WebIMLogin /> : <WebIMSign onRegisterSuccess={this.registerSuccess}/>}
                        </div>
                    </div>
                </div>
            )
    }
}


export default LoginPage;