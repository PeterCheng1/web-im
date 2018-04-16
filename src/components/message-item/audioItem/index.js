import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import { Icon } from 'antd';
import AudioPIc from '@assets/images/music/owl-music.jpg';
@safeRender 
class AudioItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioState:false
        }
    }

    openAudio = (e,type)=>{
        let audioArr = document.querySelectorAll('.message-audio');
        audioArr.forEach((audio,idx)=>{
            audio.pause()
        })
        if(type) this.messageAuido.currentTime = 0
        this.messageAuido.play()
    }

    pauseAudio = (e)=>{
        this.messageAuido.pause()
    }

    onPauseMusic = (e)=>{
        this.setState({
            audioState : false
        })
    }

    onPlayMusic = (e)=>{
        this.setState({
            audioState : true
        })        
    }

    auidoDownLoad = (audioUrl)=> {
        window.location.href = audioUrl
    }

    render () {
        let {audioUrl} = this.props;
        let {audioState} = this.state;
        return (
            <div className="sound_item_wrapper">
                {
                    audioUrl
                    ?
                    <div className="icon-wrapper">
                        <div className="audio-btn-wrapper">
                            {
                                audioState 
                                    ? 
                                <div className="pause-wraper" onClick={this.pauseAudio}>
                                    <Icon type="pause-circle-o" style={{fontSize:'40px'}}/>
                                </div>
                                    :
                                <div className="play-wraper" onClick={this.openAudio}>
                                    <Icon type="play-circle-o" style={{fontSize:'40px'}}/>
                                </div>
                            }
                        </div>
                        <audio preload="auto" className="message-audio" onPlay={this.onPlayMusic} onPause={this.onPauseMusic} src={audioUrl} ref={audio => this.messageAuido = audio}/>
                        <img src={AudioPIc} alt="音乐图片" />
                        <span className="iconfont icon-xiazai" onClick={e => this.auidoDownLoad(audioUrl)}></span>
                        <span className="iconfont icon-zhongfubofang" onClick={e => this.openAudio(e,'reset')}></span>
                    </div>
                    :
                    <div className="no-icon-wrapper">
                        <Icon type="sound" />
                    </div>
                }
            </div>
        )
    }
}

export default AudioItem