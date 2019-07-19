import axios from 'axios';
import configs from './configs';
import actions from '../index';
import { async } from 'rsvp';
const {

    GET_USER_MENU_SUCCESS,
    GET_USER_MENU_FAILURE,
    CHANGE_PAGE_SUCCSEE,

    GET_USERS_LOGIN_SUCCESS,
    GET_USERS_LOGIN_FAILURE,

    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILURE,
}=actions;

const baseUrln=configs.baseUrln;

export function getMenu()
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrln}user/menu`)).data;
            dispatch({
                type:  GET_USER_MENU_SUCCESS,
                data: data.data
            });
        } catch (error) {
            dispatch({
                type: GET_USER_MENU_FAILURE,
                error: new Error('获取导航信息失败')
            });
        }
    };

}

export function sendLogin(apply,num)
{
    return (dispatch)=>{

        axios({
            method: 'GET',
            url: `${baseUrln}user/login`,
            //data: JSON.stringify(apply),

            /*
                        xhrFields: {
                            withCredentials: true
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        dataType:'json',
            */
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
            //alert('登录出错了');
        })
    }

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
