import axios from 'axios';
import actions from '../../../constants/action';
import configs from '../../../constants/configs';
const {
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,
    GET_SERVER_ADD_SUCCESS,
    GET_SERVER_ADD_FAILURE,
}=actions;

const baseUrl=configs.baseUrl;

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
export function addServe()
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            // const data = (await axios.get(`${baseUrl}`+"server.do?page="+page+"&rows="+pageSize)).data;


        } catch (error) {
            alert('sever err');
        }
    };

}
