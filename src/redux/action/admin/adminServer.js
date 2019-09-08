import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
import {message} from 'antd';
import Qs from 'qs';
const {
    GET_ADMIN_SERVER_SUCCESS,
    GET_SERVER_SUBJECT_SUCCESS,
}=actions;

const baseUrl=configs.baseUrl;

// 获取服务
export function getServe(page,pageSize)
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}`+"server.do?page="+page+"&rows="+pageSize)).data;
            const res=data.data;
            
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
    query={...query}
    return async(dispatch) => {
        try {
            console.log(`${Qs.stringify(query)}`);
            axios({
                method: 'post',
                url: `${baseUrl}server.do`,
                headers: {"Content-Type":"application/json"},
                data: query
                
              });
           
            message.success('添加成功');
        } catch (error) {
            alert('sever err');
        }
    };

}

// 删除服务

export function deteleServer(query=""){
    let _ids=query.ids;
    
    return async(dispatch) => {
        try {
          //  const data = (await axios.delete(`${baseUrl}server.do?ids=`+_ids)).data;
          axios
          .delete(`${baseUrl}server.do`, {params: query});
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