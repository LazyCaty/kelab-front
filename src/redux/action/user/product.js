import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
import Qs from 'qs';
import {getTokenHeader} from '../common/configs';

const {
    GET_SERVICE_CLASSIFICATION_SUCCESS,
    GET_SERVICE_CLASSIFICATION_FAILURE,
    GET_SERVICE_SUBJECT_SUCCESS,
    GET_SERVICE_SUBJECT_FAILURE,
} = actions;

const baseUrl = configs.baseUrl;

export function getServiceClass(query='') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}server.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_SERVICE_CLASSIFICATION_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: GET_SERVICE_CLASSIFICATION_FAILURE,
                error: new Error('获取服务分类失败')
            })
        }
    }
}

export function getServiceSubject(query='') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}serverSubject.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_SERVICE_SUBJECT_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: GET_SERVICE_SUBJECT_FAILURE,
                error: new Error("获取微服务失败")
            })
        }
    }
}
