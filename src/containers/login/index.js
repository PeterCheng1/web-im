import React ,{Component} from 'react';
import Particles from 'react-particles-js';
import {particlesStyle,ParticlesConfig} from './Particles'
class LoginPage extends Component {
    constructor (props) {
        super(props);
    }
    initParticleBg() {

    }
    render () {
        return (<div> 
                    <Particles style={particlesStyle} params={ParticlesConfig}/>
                </div>
            )
    }
}


export default LoginPage;