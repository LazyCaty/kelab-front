import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
import Qs from 'qs';
import {getTokenHeader} from '../common/setTokenHead';

const {
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE,
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,
} = actions;

const baseUrl = configs.baseUrl;

export function getServiceClass(query='') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}server/category.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: GET_CATEGORY_FAILURE,
                error: new Error('获取服务分类失败')
            })
        }
    }
}

export function getService(query='') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}server.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_ADMIN_SERVER_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: GET_ADMIN_SERVER_FAILURE,
                error: new Error("获取微服务失败")
            })
        }
    }
}
