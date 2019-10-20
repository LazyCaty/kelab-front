import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
const {
    GET_DOCUMENT_SUCCESS,
    GET_DOCUMENT_FAILURE,
    GET_DOCUMENT_UPDATE_SUCCESS,
    GET_DOCUMENT_UPDATA_FAILURE,
    GET_DOCUMENT_DELETE_SUCCESS,
    GET_DOCUMENT_DELETE_FAILURE,
    GET_DOCUMENT_ADD_SUCCESS,
    GET_DOCUMENT_ADD_FAILURE
}=actions
const baseUrl=configs.baseUrl;
export function getDocument(serverId,page,rows) {
    return async(dispatch)=> {
        try{
            const data=(await axios.get(`${baseUrl}`+"doc.do?serverId="+serverId+"&page="+page+"&rows="+rows)).data.data;
            console.log(data);
            dispatch({
                type: GET_DOCUMENT_SUCCESS,
                data:data
            })

        }
        catch (error) {
            alert('sever err');
        }
    }
}
export function upDocument(query){
    return async(dispatch)=>{
        try{
            const data=(await axios({
                                method:'put',
                                url:`${baseUrl}doc.do`,
                                headers:{"Content-Type":"application/json"},
                                data:query})).data;
            dispatch({
                type:GET_DOCUMENT_UPDATE_SUCCESS,
                data:data
            })
        }   
        catch(error){
            dispatch({
                type: GET_DOCUMENT_UPDATA_FAILURE,
                error: new Error('修改产品失败')
            })
        }
    }
}
export function delDocument(query){
    return async(dispatch)=>{
        try {
            const data=(await axios({
                                method:'delete',
                                url:`${baseUrl}doc.do`,
                                headers:{"Content-Type":"application/json"},
                                data:query}))
            console.log(data)
            dispatch({
                type:GET_DOCUMENT_DELETE_SUCCESS,
                data:data
            }) 
            
        } catch (error) {
            alert('错误')
        }
    }
}
export function addDocument(query){
    return async(dispatch)=>{
        try{
            const data=(await axios({
                method:'post',
                url:`${baseUrl}doc.do`,
                headers:{"Content-Type":"application/json"},
                data:query})).data;
            console.log(data);
        dispatch({
            type:GET_DOCUMENT_ADD_SUCCESS,
            data:data
        })
        }catch(error){
            alert('错误')
        }
    }
}