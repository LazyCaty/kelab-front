import axios from 'axios';
import actions from '../index';
import configs from '../common/configs';
import {message} from 'antd';
import Qs from 'qs';
const {
    GET_CATEGORY_SUCCESS
}=actions;

const baseUrl=configs.baseUrl;

//获取分类
export function getCategory(){
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}server/category.do`)).data;


            const res=data.data;
            dispatch({
                type:GET_CATEGORY_SUCCESS,
                data:res
            })

        } catch (error) {
            alert(error);
        }
    };
}


// 添加分类
export function addCategory(query='')
{
    query={...query}
    return async(dispatch) => {
        try {
            axios({
                method: 'post',
                url: `${baseUrl}server/category.do`,
                headers: {"Content-Type":"application/json"},
                data: query
                
              });
           
            message.success('添加成功');
        } catch (error) {
            alert('sever err');
        }
    };

}

//删除分类
export function deteleCate(query=""){
    let _ids=query.ids;
    
    return async(dispatch) => {
        try {
          axios
          .delete(`${baseUrl}server/category.do`, {params: query});
            message.success('删除成功');
        } catch (error) {
            alert('sever err');
        }
    };
}

export function changeCategory(query='')
{
    query={...query}
    return async(dispatch) => {
        try {
            axios({
                method: 'put',
                url: `${baseUrl}server/category.do`,
                headers: {"Content-Type":"application/json"},
                data: query
                
              });
           
            message.success('添加成功');
        } catch (error) {
            alert('sever err');
        }
    };

}






