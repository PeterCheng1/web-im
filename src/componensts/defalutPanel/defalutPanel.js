import React, { Component } from 'react';
import pageLogo from '@assets/images/logo/logo.png'
import {safeRender} from '@assets/js/safeRender'
import './defalutPanel.css'

@safeRender
class DefalutPanel extends Component {
    render () {
        return (
            <div className="defalut-panel">
                <img className="logo" src={pageLogo} alt="" />
                <div className="title">OWL-WEBIM</div>
            </div>
        )
    }
}

export default DefalutPanel;