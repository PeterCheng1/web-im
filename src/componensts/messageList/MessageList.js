import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import PersonalPanel from  '@components/personalPanel/panel.js'

@safeRender
class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div i="message_list_warpper">
                    <PersonalPanel/>
                </div>)
    }
}

export default MessageList;