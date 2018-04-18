import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import { Spin, Icon } from 'antd';

@safeRender 
class ImageItem extends Component {
    render () {
        let {imageUrl} = this.props;
        return (
            <div className="image_item_wrapper">
                {
                    imageUrl
                    ?
                    <img className="image-item" src={imageUrl} alt="聊天图片" />
                    :
                    <div className="no-icon-wrapper">
                        <Icon type="picture" style={{fontSize:'20px'}} />
                    </div>
                }
            </div>
        )
    }
}

export default ImageItem