import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';

@safeRender
class SinglePanel extends Component {

    render() {
        return (<div i="single_panel_wrapper">single_panel_wrapper</div>)
    }
}

export default SinglePanel