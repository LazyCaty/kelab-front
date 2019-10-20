import axios from 'axios';
import configs from './configs';
import actions from '../index';
import { async } from 'rsvp';
import Storage from '../../../util/Storage'
import {message} from 'antd';
import Qs from 'qs';
let  jwtDecode = require('jwt-decode');
/* import { applyPatches } from '_immer@1.10.0@immer'; */
const {

    GET_USER_MENU_SUCCESS,
    GET_USER_MENU_FAILURE,
    CHANGE_PAGE_SUCCSEE,

    GET_USERS_LOGIN_SUCCESS,
    GET_USERS_LOGIN_FAILURE,

    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILURE,
    GET_VERIFICATION_SUCCESS,
}=actions;

const baseUrl=configs.baseUrl;

export function sendRes(apply,num)
{
    return async(dispatch)=>{
        let dat={...apply,roleId:1}
        axios({
            method: 'POST',
            url: `${baseUrl}user.do/register`,
            data: JSON.stringify(dat),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        dataType:'json',
          
        }).then((res)=>{
            console.log(res.data);
            if(res.data.code==='user_is_exist')
            {
                message.warning('用户已存在');
            }
            else if(res.data.code==='SUCCESS')
            {
                message.success('注册成功');
                dispatch({
                    type:CHANGE_PAGE_SUCCSEE,
                    data:1
        
                })
                dispatch({
                    type:GET_REGISTER_SUCCESS,
                    data:res.data,
                    
                })
                //this.changePage(1);
            }
            else
            {
                message.warning("注册失败");
            }
            dispatch({
                type:GET_REGISTER_FAILURE,
                data:res.data,
            })
        }).catch((err)=>{
            dispatch({
                type:GET_USERS_LOGIN_FAILURE,
                data:false
            })
            alert('注册出错了');
        })
    }

}

export function sendLogin(query='')
{
   Storage.setStorage("username",query.username);
    return async(dispatch) => {
        try {
            const data = (await axios.post(`${baseUrl}user.do/login?${Qs.stringify(query)}`)).data;
            console.log("login",data);
            if(data.code==='SUCCESS'){
                Storage.setStorage("token",data.token);
                let token = jwtDecode(localStorage.token);
                console.log("token:",token.exp);
                dispatch({
                    type: GET_USERS_LOGIN_SUCCESS,
                    data:true
                })
                window.location.href="/";
            }
        } catch (error) {
            alert('login sever err');
        }
    };

}
export function getVerification(uuid)
{
   // console.log
    return async(dispatch) => {
        try {
           const data = (await axios.get(`${baseUrl}user.do/getverifycode?uuid=`+uuid)).data;
           console.log("dataV:",data);
            dispatch({
                type:GET_VERIFICATION_SUCCESS,
                data:data
            })
        
        } catch (error) {
            message.info("验证码获取失败");
        }
    };

}
/**
 * 改变登录注册页面，1为登录，2为注册
 * @param {*} num 
 */
export const changePage=(num)=>
{
    return (dispatch)=>{
        dispatch({
            type:CHANGE_PAGE_SUCCSEE,
            data:num

        })
    }
}




