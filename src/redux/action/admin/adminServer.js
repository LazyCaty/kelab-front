import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
import {message} from 'antd';
import Qs from 'qs';
const {
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,
    GET_SERVER_ADD_SUCCESS,
    GET_SERVER_ADD_FAILURE,
    GET_SERVER_DELETE_SUCCESS,
    GET_SERVER_DELETE_FAILURE,
    GET_SERVER_UPDATA_SUCCESS,
    GET_SERVER_UPDATA__FAILURE,
    GET_SERVER_SUBJECT_SUCCESS,
    GET_SERVER_SUBJECT_FAILURE,
}=actions;

const baseUrl=configs.baseUrl;

// 获取服务
export function getServe(page,pageSize)
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}`+"server.do?page="+page+"&rows="+pageSize)).data;
            const res=data.data.pagingList;
            dispatch({
                type:GET_ADMIN_SERVER_SUCCESS,
                data:res
            })
        } catch (error) {
            alert('sever err');
        }
    };

}

// 添加修改服务
export function addServe(query='')
{
    alert(`${Qs.stringify(query)}`);
    return async(dispatch) => {
        try {
            console.log(`${Qs.stringify(query)}`);
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}server.do?${Qs.stringify(query)}`)).data;
            message.success('添加成功');
        } catch (error) {
            alert('sever err');
        }
    };

}

// 删除服务

export function deteleServer(query=""){
    return async(dispatch) => {
        try {
            const data = (await axios.get(`${baseUrl}server.do?${Qs.stringify(query)}`)).data;
            message.success('删除成功');
        } catch (error) {
            alert('sever err');
        }
    };
}



// 获取服务主体
export function getSubject(page,rows,serverId ){
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}`+"serverSubject.do?page="+page+"&rows="+rows+"&serverId="+serverId)).data;


            const res=data.data;console.log("res",res);
            dispatch({
                type:GET_SERVER_SUBJECT_SUCCESS,
                data:res
            })

        } catch (error) {
            alert(error);
        }
    };
}