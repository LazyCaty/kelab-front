import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
const {
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,
    GET_SERVER_ADD_SUCCESS,
    GET_SERVER_ADD_FAILURE,
    GET_SERVER_DELETE_SUCCESS,
    GET_SERVER_DELETE_FAILURE,
    GET_SERVER_UPDATA_SUCCESS,
    GET_SERVER_UPDATA__FAILURE
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

// 添加服务
export function addServe(serverInformation)
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}`+"server.do?name="+serverInformation.name+"&description="+serverInformation.description+"&status="+serverInformation.status)).data;

            console.log("cg");
        } catch (error) {
            alert('sever err');
        }
    };

}

// 删除服务

export function deteleServer(){
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            //const data = (await axios.get(`${baseUrl}`+"server.do?name="+serverInformation.name+"&description="+serverInformation.description+"&status="+serverInformation.status)).data;

            //console.log("cg");
        } catch (error) {
            //alert('sever err');
        }
    };
}

// 更新服务
export function updataServer(){
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            //const data = (await axios.get(`${baseUrl}`+"server.do?name="+serverInformation.name+"&description="+serverInformation.description+"&status="+serverInformation.status)).data;

            //console.log("cg");
        } catch (error) {
            //alert('sever err');
        }
    };
}