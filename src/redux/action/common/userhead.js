import axios from 'axios';
import configs from './configs';
import actions from '../index';
import { async } from 'rsvp';
import {message} from 'antd';
import Qs from 'qs';
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
    return (dispatch)=>{
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
            dispatch({
                type:GET_USERS_LOGIN_SUCCESS,
                data:true
            })
        }).catch((err)=>{
            dispatch({
                type:GET_USERS_LOGIN_FAILURE,
                data:false
            })
            alert('登录出错了');
        })
    }

}

export function sendLogin(query='')
{
    return async(dispatch) => {
        try {
            const data = (await axios.post(`${baseUrl}user.do/login?${Qs.stringify(query)}`)).data;
            console.log("hshs",data);
        } catch (error) {
            alert('sever err');
        }
    };

}
export function getVerification(uuid)
{
    return async(dispatch) => {
        try {
           const data = (await axios.get(`${baseUrl}user.do/getverifycode?uuid=`+uuid)).data;
            dispatch({
                type:GET_VERIFICATION_SUCCESS,
                data:data
            })
        
        } catch (error) {
            message.info("验证码获取失败");
        }
    };

}

export const changePage=(num)=>
{
    return (dispatch)=>{
        dispatch({
            type:CHANGE_PAGE_SUCCSEE,
            data:num

        })
    }
}
