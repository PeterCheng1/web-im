import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender';
import './index.css';
import Lightbox from 'react-image-lightbox';
import {connect} from 'react-redux'

@safeRender
class ImageLightBox extends Component {
    render() {
        return (<div i="image_light_box_wrapper">
                {/* <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                    }
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                    })
                    }
                 /> */}
                </div>)
    }
}