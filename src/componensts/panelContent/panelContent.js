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
        let {pathname} = this.props.location;
        let classGroup = {
            hideSiglePanel : pathname !== '/chat/single/',
            hideGroupPanel : pathname !== '/chat/group/',
            hidePersonalPanel : pathname !== '/chat/personal/',
        }
        return(
            <div i="panel_content_wrapper">
                <SinglePanel classGroup={classGroup} />
                <GroupPanel classGroup={classGroup} />   
                <PersonalPanel classGroup={classGroup} num={'123'}/>                      
            </div>
        )
    }
}


export default PanelContent