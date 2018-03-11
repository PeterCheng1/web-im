/*
    就设计内容:<
        <h1 className="webim-title">⚡️闪电狼即时通信(IM)</h1>
        <div className="webim-login-msg-wrapper">123123</div>
        <Particles style={particlesStyle} params={ParticlesConfig}/>
    >
*/

import React ,{Component} from 'react';
import WebIMLogin from '../../componensts/login/login'
import pageLogo from '../../assets/images/logo/logo.png'
import './index.css';
class LoginPage extends Component {
    constructor (props) { 
        super(props);
        this.state = {
            login:true
        }
    }
    initParticleBg() {

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
                            <WebIMLogin />
                        </div>
                    </div>
                </div>
            )
    }
}


export default LoginPage;