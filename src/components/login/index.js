import React, { Component } from 'react';
import {safeRender} from '@assets/js/safeRender'
import {loginUser} from '@assets/js/loginUser'
import {hashHistory} from 'react-router'
import { message } from 'antd';
import './index.css';
import {connect} from 'react-redux'
import {createAction} from '@assets/js/create.js'
import {USER_LOGIN_SUCCESS} from '@data/actions/actionTypes.js'
@safeRender
@connect(state=>{
        return {user:state.get('login')}
    },
    (dispatch)=>{
        return {
            loginSuccess:(actionType,playload)=>{
                return dispatch(createAction(actionType,'user',playload))
            }
        }
    }
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            loginning:false
        }
    }

    accountChange = (ele) =>{
        this.setState({
            name:ele.target.value.trim()
        })
    }

    passwordChange = (ele) =>{
        this.setState({
            password:ele.target.value.trim()
        })        
    }

    loginAccount = () => {
        let {name,password} = this.state;
        const options = {
            apiUrl: WebIM.config.apiURL,
            user:name,
            pwd:password,
            appKey: WebIM.config.appkey
        }
        this.setState({
            loginning:true
        })
        loginUser(options)
        .then(r=>{
            let {user} = r;
            this.setState({
                loginning:false
            })
            this.props.loginSuccess(USER_LOGIN_SUCCESS,user);
            hashHistory.push({
                pathname:'/chat/single/',
                query:{
                    uid:btoa(this.props.user.username) //atob
                }
            })
        })
        .catch(e=>{
            message.error('可能账号或者密码填写错误！－。－');
            this.setState({
                loginning:false
            })
        })
    }
    render () {
        let {state} = this;
        return (
            <div className="webim-login-wrapper" i="webim-login-wrapper">
                <div className="webim-loginName-wrapper">
                    <input type="text" value={state.name} onChange={this.accountChange} placeholder="登陆账号" autoFocus/>
                </div>
                <div className="webim-password-wrapper">
                    <input type="password" value={state.password} onChange={this.passwordChange}  placeholder="登陆密码"/>
                </div>
                {!state.loginning ?                 
                    <div className="webim-login-btn" onClick={this.loginAccount}>
                        <i className="iconfont loginBtn">&#xe62e;</i>
                    </div>
                        :
                    <div className="webim-login-btn" >
                        <i className="iconfont loginBtn loginning">&#xe615;</i>
                    </div>
                }
            </div>
        )
    }
}

export default Login