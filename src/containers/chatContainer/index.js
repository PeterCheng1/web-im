import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';

@safeRender
class ChatContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>chat</div>
    }   
}

export default ChatContainer;