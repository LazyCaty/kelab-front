import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';

const baseUrl=configs.baseUrl;
const {GET_DOCUMENT_ADD_SUCCESS,GET_DOCUMENT_ADD_FAILURE}=actions
export function addDocument(query) {
    return async(dispatch)=> {
        try{
            const data=(await axios({
                                method:'put',
                                url:`${baseUrl}docEntity.do`,
                                headers:{"Content-Type":"application/json"},
                                data:query}))
            console.log(data);
            dispatch({
                type: GET_DOCUMENT_ADD_SUCCESS,
                data:data
            })

        }
        catch (error) {
            alert('sever err');
        }
    }
}