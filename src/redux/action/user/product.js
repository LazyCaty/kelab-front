import axios from 'axios';
import actions from '../index';
import config from '../common/configs'
import Qs from 'qs';
import {getTokenHeader} from '../common/setTokenHead';

const {
    GET_PRODUCT_DOCUMENT_SUCCESS,
    GET_PRODUCT_DOCUMENT_FAILURE,
} = actions;

const baseUrl = config.baseUrl;

export function getDocMenu(query='') {
    return async(dispatch) => {
        try {
            const data = (await axios(`${baseUrl}doc.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_PRODUCT_DOCUMENT_SUCCESS,
                data: data
            })
        }
        catch(error){
            dispatch({
                type: GET_PRODUCT_DOCUMENT_FAILURE,
                error: new Error('获取文档菜单失败')
            })
        }
    }
}