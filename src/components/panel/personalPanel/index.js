import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';

@safeRender
class PersonalPanel extends Component {

    render() {
        return (<div i="personal_panel_wrapper">personal_panel_wrapper</div>)
    }
}

export default PersonalPanel