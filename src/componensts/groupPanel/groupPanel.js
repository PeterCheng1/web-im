import React, { Component } from 'react';
import './groupPanel.css';
import classnames from 'classnames';
class GroupPanel extends Component {


    render () {
        let {hideGroupPanel} = this.props.classGroup
        let group = classnames('group_panel_wrapper',{
            hidePanel:hideGroupPanel
        })
        return (
            <div i="group_panel_wrapper" className={group}>
                group_panel_wrapper
            </div>
        )
    }
}

export default GroupPanel