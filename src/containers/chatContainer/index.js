import React, { Component } from 'react';
import {Map,List,fromJS} from 'immutable'
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import PanelTab from '@components/panelTab/index.js'
import PersonalPanel from '@components/panel/personalPanel/index.js'
import SinglePanel from '@components/panel/singlePanel/index.js'
import GroupPanel from '@components/panel/groupPanel/index.js'
import classnames from 'classnames';
@safeRender
class ChatContainer extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        let {pathname} = this.props.location;
        let personalPanelClass = classnames({
            hidePanel : pathname !== '/chat/personal/' ? true : false
        })
        let singlePanelClass = classnames({
            hidePanel : pathname !== '/chat/single/' ? true : false
        })
        let groupPanelClass = classnames({
            hidePanel : pathname !== '/chat/group/' ? true : false
        })
        return(
            <div className="chat" i="chat-wrapper">
                <div className = "webim-chat-bg"></div>
                <div className="chat-panel">
                    <PanelTab {...this.props} />
                    <div className={personalPanelClass}>
                        <PersonalPanel/>
                    </div>
                    <div className={singlePanelClass}>
                        <SinglePanel/>
                    </div>
                    <div className={groupPanelClass}>
                        <GroupPanel/>
                    </div>
                </div>
            </div>
        )
    }   
}

export default ChatContainer;