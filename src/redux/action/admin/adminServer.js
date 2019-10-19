import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
import {message} from 'antd';
import Qs from 'qs';
const {
    GET_ADMIN_SERVER_SUCCESS,
    GET_SERVER_SUBJECT_SUCCESS,
    GET_CATEGORY_SUCCESS,
    GET_SERVER_ADD_SUCCESS,
    GET_SERVER_DELETE_SUCCESS,
    GET_SERVER_UPDATE_SUCCESS,
    GET_SERVER_UPDATE_FAILURE,
    GET_SERVER_SUBJECT_ADD_SUCCESS,
    GET_SERVER_SUBJECT_ADD_FAILURE,
    GET_SERVER_ENTITY_SUCCESS,
    GET_SERVER_ENTITY_FAILURE,  
    GET_SERVER_ENTITY_ADD_SUCCESS,
    GET_SERVER_ENTITY_ADD_FAILURE,
    GET_SERVER_ENTITY_DELETE_SUCCESS,
    GET_SERVER_ENTITY_DELETE_FAILURE,
    GET_SERVER_ENTITY_UPDATE_SUCCESS,
    GET_SERVER_ENTITY_UPDATE_FAILURE,
    GET_SERVER_SUBJECT_DELETE_SUCCESS,
    GET_SERVER_SUBJECT_DELETE_FAILURE,
    GET_SERVER_SUBJECT_UPDATE_SUCCESS,
    GET_SERVER_SUBJECT_UPDATE_FAILURE,
}=actions;

const baseUrl=configs.baseUrl;

// 获取产品

export function getServe(page,pageSize,categoryId)
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = ((await axios.get(`${baseUrl}`+"server.do?page="+page+"&rows="+pageSize+"&categoryId="+categoryId)).data).data;

            dispatch({
                type: GET_ADMIN_SERVER_SUCCESS,
                data: data
            })
        } catch (error) {
            alert('sever err');
        }
    };

}

// 添加产品
export function addServe(query='')
{
    return async(dispatch) => {
        try {
            const data = (await axios({
                                method: 'post',
                                url: `${baseUrl}server.do`,
                                headers: {"Content-Type":"application/json"},
                                data: query     
                            })).data;
            dispatch({
                type: GET_SERVER_ADD_SUCCESS,
                data: data,
            })

        } catch (error) {
            alert('sever err');
        }
    };

}

// 删除产品
export function deteleServer(query=""){    
    return async(dispatch) => {
        try {
          //  const data = (await axios.delete(`${baseUrl}server.do?ids=`+_ids)).data;
          const data = (await axios.delete(`${baseUrl}server.do`, {params: query})).data;
            dispatch({
                type: GET_SERVER_DELETE_SUCCESS,
                data: data,
            })
        } catch (error) {
            dispatch({
                type: GET_SERVER_ENTITY_DELETE_FAILURE,
                data: new Error('删除服务失败')
            })
        }
    };
}

//修改产品
export function updateServer(query = ''){
    return async (dispatch) => {
        try{
            const data = (await axios({
                                        method:'put',
                                        url:`${baseUrl}server.do`,
                                        headers:{"Content-Type":"application/json"},
                                        data:query})).data
            dispatch({
                type: GET_SERVER_UPDATE_SUCCESS,
                data: data
            })
        } 
        catch(error){
            dispatch({
                type: GET_SERVER_UPDATE_FAILURE,
                error: new Error('修改产品失败')
            })
        }
    }
}

// 获取微服务分类
export function getSubject(page,rows,serverId ){
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            let id = '';
            serverId === undefined ? id = '&serverId=' : id = '&serverId=' + serverId;
            const data = ((await axios.get(`${baseUrl}`+"serverSubject.do?page="+page+"&rows="+rows+id)).data).data;
            dispatch({
                type:GET_SERVER_SUBJECT_SUCCESS,
                data:data
            })

        } catch (error) {
            alert(error);
        }
    };
}

// 获取微服务实例
export function getEntity(query=''){
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            let id = '';
            query === undefined ? id = '&serverId=' : id = '&serverId=' + query;
            const data = ((await axios.get(`${baseUrl}`+"serverEntity.do?page="+id)).data).data;
            dispatch({
                type:GET_SERVER_ENTITY_SUCCESS,
                data:data
            })

        } catch (error) {
            alert(error);
        }
    };
}

//添加微服务分类
export function addSubject(query = ''){
    return async (dispatch) => {
        try{
            const data = (await axios({
                                        method:'post',
                                        url:`${baseUrl}serverSubject.do`,
                                        headers:{"Content-Type":"application/json"},
                                        data:query})).data
            dispatch({
                type: GET_SERVER_SUBJECT_ADD_SUCCESS,
                data: data
            })
        }
        catch(error){
            dispatch({
                type: GET_SERVER_SUBJECT_ADD_FAILURE,
                data: new Error('添加微服务失败')
            }) 
        }
    }
}

//删除微服务分类
export function deleteSubject(query=""){    
    return async(dispatch) => {
        try {
          const data = (await axios.delete(`${baseUrl}serverSubject.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_SERVER_SUBJECT_DELETE_SUCCESS,
                data: data,
            })
        } catch (error) {
            dispatch({
                type: GET_SERVER_SUBJECT_DELETE_FAILURE,
                data: new Error('删除微服务分类失败')
            })
        }
    };
}

//修改微服务分类
export function updateSubject(query = ''){
    return async (dispatch) => {
        try{
            console.log(query)
            const data = (await axios({
                                        method:'put',
                                        url:`${baseUrl}serverSubject.do`,
                                        headers:{"Content-Type":"application/json"},
                                        data:query})).data
            dispatch({
                type: GET_SERVER_SUBJECT_UPDATE_SUCCESS,
                data: data
            })
        } 
        catch(error){
            dispatch({
                type: GET_SERVER_SUBJECT_UPDATE_FAILURE,
                error: new Error('修改微服务分类失败')
            })
        }
    }
}

//添加微服务实例
export function addEntity(query = ''){
    return async (dispatch) => {
        try{
            const data = (await axios({
                                        method:'post',
                                        url:`${baseUrl}serverEntity.do`,
                                        headers:{"Content-Type":"application/json"},
                                        data:query})).data
            dispatch({
                type: GET_SERVER_ENTITY_ADD_SUCCESS,
                data: data
            })
        }
        catch(error){
            dispatch({
                type: GET_SERVER_ENTITY_ADD_FAILURE,
                data: new Error('添加微服务实例失败')
            }) 
        }
    }
}

// 删除微服务实例
export function deteleEntity(query=""){    
    return async(dispatch) => {
        try {
          const data = (await axios.delete(`${baseUrl}serverEntity.do?${Qs.stringify(query)}`)).data;
            dispatch({
                type: GET_SERVER_ENTITY_DELETE_SUCCESS,
                data: data,
            })
        } catch (error) {
            alert('sever err');
        }
    };
}

//修改微服务
export function updateEntity(query = ''){
    return async (dispatch) => {
        try{
            const data = (await axios({
                                        method:'put',
                                        url:`${baseUrl}serverEntity.do`,
                                        headers:{"Content-Type":"application/json"},
                                        data:query})).data
            dispatch({
                type: GET_SERVER_ENTITY_UPDATE_SUCCESS,
                data: data
            })
        } 
        catch(error){
            dispatch({
                type: GET_SERVER_ENTITY_UPDATE_FAILURE,
                error: new Error('修改产品失败')
            })
        }
    }
}

//获取分类
export function getCategory(query = ''){
    return async(dispatch) => {
        try {
            const data = ((await axios.get(`${baseUrl}server/category.do?${Qs.stringify(query)}`)).data).data;
            dispatch({
                type:GET_CATEGORY_SUCCESS,
                data:data
            })
        } catch (error) {
            alert(error);
        }
    };
}
