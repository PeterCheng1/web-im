import React, { Component } from 'react';
import './singPanel.css'
import {safeRender} from '@assets/js/safeRender'

@safeRender
class SingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div i="single_panel_wrapper">
                <ul></ul>
            </div>
        )
    }
}

export default SingPanel