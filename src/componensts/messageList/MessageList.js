import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import PersonalMsg from  '@components/personalMsg/personalMsg.js'

@safeRender
class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div i="message_list_warpper">
                    <PersonalMsg/>
                </div>)
    }
}

export default MessageList;