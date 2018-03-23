import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import SinglePanel from '@components/singlePanel/singlePanel.js'
import GroupPanel from '@components/groupPanel/groupPanel.js'
import PersonalPanel from '@components/personalPanel/personalPanel.js'
import './panelContent.css'
import classnames from 'classnames'
@safeRender
class PanelContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {pathname} = this.props.location
        return(
            <div i="panel_content_wrapper">
              {pathname === '/chat/single/' ? <SinglePanel /> : null}
              {pathname === '/chat/group/' ? <GroupPanel /> : null}    
              {pathname === '/chat/personal/' ? <PersonalPanel /> : null}                        
            </div>
        )
    }
}


export default PanelContent