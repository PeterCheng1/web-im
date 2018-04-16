import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import './index.css';
import emojione from 'emojione';

@safeRender
class EmojiPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmojiPicker : false,
            emojiSwiper : null
        }
    }

    selectEmoji=(e)=>{
        let emoji = e.target.getAttribute('title');
        if(emoji) {
            this.props.onSelectEmoji(emoji)
            this.changeEmojiPickerState()
        }
    }

    changeEmojiPickerState = ()=>{
        if(this.state.showEmojiPicker) {
            this.closeEmojiPicker()
        }else{
            this.openEmojiPicker()
        }
    }

    openEmojiPicker = ()=>{
        this.setState({
            showEmojiPicker : true
        })
    }

    closeEmojiPicker = () =>{
        this.setState({
            showEmojiPicker : false 
        })
    }

    componentDidMount() {
        this.initEmojiSwiper()
    }

    initEmojiSwiper() {
        if(!this.state.emojiSwiper) {
            let emojiSwiper = new window.Swiper ('.swiper-container', {
                direction: 'horizontal',
                setWrapperSize :true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                      },
                   /* renderBullet: function (index, className) {
                        switch(index){
                          case 0:text='壹';break;
                          case 1:text='贰';break;
                          case 2:text='叁';break;
                          case 3:text='肆';break;
                          case 4:text='伍';break;
                        }
                        return '<span class="' + className + '">' + text + '</span>';
                      },*/
                },
            })
            this.setState({
                emojiSwiper
            })
        }
    }
    render() {
        let {showEmojiPicker} = this.state;
        return (
            <div i="emoji_picker_wrapper" className={showEmojiPicker ? 'active' : ''} onClick={this.selectEmoji}>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <img className="emojione" alt="😀" title=":grinning:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f600.png" />
                            <img className="emojione" alt="😃" title=":smiley:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f603.png" />
                            <img className="emojione" alt="😄" title=":smile:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f604.png" />
                            <img className="emojione" alt="😁" title=":grin:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f601.png" />
                            <img className="emojione" alt="😆" title=":laughing:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f606.png" />
                            <img className="emojione" alt="😅" title=":sweat_smile:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f605.png" />
                            <img className="emojione" alt="😂" title=":joy:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f602.png" />
                            <img className="emojione" alt="☺️" title=":relaxed:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/263a.png" />
                            <img className="emojione" alt="😊" title=":blush:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60a.png" />
                            <img className="emojione" alt="😇" title=":innocent:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f607.png" />
                            <img className="emojione" alt="😉" title=":wink:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f609.png" />
                            <img className="emojione" alt="😌" title=":relieved:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60c.png" />
                            <img className="emojione" alt="😍" title=":heart_eyes:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60d.png" />
                            <img className="emojione" alt="😘" title=":kissing_heart:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f618.png" />
                            <img className="emojione" alt="😗" title=":kissing:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f617.png" />
                            <img className="emojione" alt="😙" title=":kissing_smiling_eyes:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f619.png" />            
                            <img className="emojione" alt="😚" title=":kissing_closed_eyes:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61a.png" />
                            <img className="emojione" alt="😋" title=":yum:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60b.png" />
                            <img className="emojione" alt="😛" title=":stuck_out_tongue:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61b.png" />
                            <img className="emojione" alt="😝" title=":stuck_out_tongue_closed_eyes:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61d.png" />
                            <img className="emojione" alt="😜" title=":stuck_out_tongue_winking_eye:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61c.png" />
                            <img className="emojione" alt="🤨" title=":face_with_raised_eyebrow:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f928.png" />
                            <img className="emojione" alt="🤪" title=":crazy_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92a.png" />
                            <img className="emojione" alt="🙂" title=":slight_smile:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f642.png" />
                            <img className="emojione" alt="🙃" title=":upside_down:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f643.png" />
                            <img className="emojione" alt="🧐" title=":face_with_monocle:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f9d0.png" />
                            <img className="emojione" alt="🤓" title=":nerd:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f913.png" />
                            <img className="emojione" alt="😎" title=":sunglasses:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60e.png" />
                            <img className="emojione" alt="🤩" title=":star_struck:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f929.png" />
                            <img className="emojione" alt="😏" title=":smirk:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60f.png" />
                        </div>
                        <div className="swiper-slide">
                            <img className="emojione" alt="😒" title=":unamused:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f612.png" />
                            <img className="emojione" alt="😞" title=":disappointed:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61e.png" />
                            <img className="emojione" alt="😔" title=":pensive:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f614.png" />
                            <img className="emojione" alt="😟" title=":worried:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61f.png" />
                            <img className="emojione" alt="😕" title=":confused:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f615.png" />
                            <img className="emojione" alt="🙁" title=":slight_frown:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f641.png" />
                            <img className="emojione" alt="☹️" title=":frowning2:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/2639.png" />
                            <img className="emojione" alt="😣" title=":persevere:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f623.png" />
                            <img className="emojione" alt="😖" title=":confounded:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f616.png" />
                            <img className="emojione" alt="😫" title=":tired_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62b.png" />
                            <img className="emojione" alt="😩" title=":weary:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f629.png" />
                            <img className="emojione" alt="😢" title=":cry:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f622.png" />
                            <img className="emojione" alt="😭" title=":sob:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62d.png" />
                            <img className="emojione" alt="😤" title=":triumph:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f624.png" />
                            <img className="emojione" alt="😠" title=":angry:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f620.png" />
                            <img className="emojione" alt="😡" title=":rage:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f621.png" />
                            <img className="emojione" alt="🤬" title=":face_with_symbols_over_mouth:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92c.png" />
                            <img className="emojione" alt="🤯" title=":exploding_head:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92f.png" />
                            <img className="emojione" alt="😳" title=":flushed:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f633.png" />
                            <img className="emojione" alt="😱" title=":scream:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f631.png" />
                            <img className="emojione" alt="😨" title=":fearful:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f628.png" />
                            <img className="emojione" alt="😰" title=":cold_sweat:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f630.png" />
                            <img className="emojione" alt="😥" title=":disappointed_relieved:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f625.png" />
                            <img className="emojione" alt="😓" title=":sweat:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f613.png" />
                            <img className="emojione" alt="🤗" title=":hugging:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f917.png" />
                            <img className="emojione" alt="🤔" title=":thinking:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f914.png" />
                            <img className="emojione" alt="🤭" title=":face_with_hand_over_mouth:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92d.png" />
                            <img className="emojione" alt="🤫" title=":shushing_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92b.png" />
                            <img className="emojione" alt="🤥" title=":lying_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f925.png" />
                            <img className="emojione" alt="😶" title=":no_mouth:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f636.png" />
                        </div>
                        <div className="swiper-slide">
                            <img className="emojione" alt="😐" title=":neutral_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f610.png" />
                            <img className="emojione" alt="😑" title=":expressionless:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f611.png" />
                            <img className="emojione" alt="😬" title=":grimacing:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62c.png" />
                            <img className="emojione" alt="🙄" title=":rolling_eyes:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f644.png" />
                            <img className="emojione" alt="😯" title=":hushed:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62f.png" />
                            <img className="emojione" alt="😦" title=":frowning:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f626.png" />
                            <img className="emojione" alt="😧" title=":anguished:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f627.png" />
                            <img className="emojione" alt="😮" title=":open_mouth:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62e.png"/>
                            <img className="emojione" alt="😲" title=":astonished:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f632.png" />
                            <img className="emojione" alt="😴" title=":sleeping:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f634.png" />
                            <img className="emojione" alt="🤤" title=":drooling_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f924.png" />
                            <img className="emojione" alt="😪" title=":sleepy:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62a.png" />
                            <img className="emojione" alt="😵" title=":dizzy_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f635.png"/>
                            <img className="emojione" alt="🤐" title=":zipper_mouth:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f910.png" />
                            <img className="emojione" alt="🤢" title=":nauseated_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f922.png" />
                            <img className="emojione" alt="🤮" title=":face_vomiting:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92e.png" />
                            <img className="emojione" alt="🤧" title=":sneezing_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f927.png" />
                            <img className="emojione" alt="😷" title=":mask:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f637.png" />
                            <img className="emojione" alt="🤒" title=":thermometer_face:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f912.png" />
                            <img className="emojione" alt="🤕" title=":head_bandage:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f915.png" />
                            <img className="emojione" alt="🤑" title=":money_mouth:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f911.png" />
                            <img className="emojione" alt="🤠" title=":cowboy:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f920.png" />
                            <img className="emojione" alt="😈" title=":smiling_imp:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f608.png" />
                            <img className="emojione" alt="👿" title=":imp:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f47f.png" />
                            <img className="emojione" alt="👹" title=":japanese_ogre:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f479.png" />
                            <img className="emojione" alt="👺" title=":japanese_goblin:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f47a.png" />
                            <img className="emojione" alt="🤡" title=":clown:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f921.png" />
                            <img className="emojione" alt="💩" title=":poop:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f4a9.png" />
                            <img className="emojione" alt="👻" title=":ghost:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f47b.png" />
                            <img className="emojione" alt="💀" title=":skull:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f480.png" />
                        </div>
                        <div className="swiper-slide">
                            <img className="emojione" alt="☠️" title=":skull_crossbones:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/2620.png" />
                            <img className="emojione" alt="👽" title=":alien:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f47d.png" />
                            <img className="emojione" alt="👾" title=":space_invader:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f47e.png" />
                            <img className="emojione" alt="🤖" title=":robot:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f916.png" />
                            <img className="emojione" alt="🎃" title=":jack_o_lantern:" src="https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f383.png" />
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="triangle-down"></div>
            </div>
        )
    }
}


export default EmojiPicker;