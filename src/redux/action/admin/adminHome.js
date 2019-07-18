import axios from 'axios';
import configs from '../../../constants/configs';
import actions from '../../../constants/action';
import { async } from 'rsvp';
const {

    GET_ADMIN_MENU_SUCCESS,
    GET_ADMIN_MENU_FAILURE,
}=actions;

const baseUrln=configs.baseUrln;
const baseUrl=configs.baseUrl;

export function getMenu()
{
    return async(dispatch) => {
        try {
            //let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrln}admin/menu`)).data;
            //console.log(data.data);
            dispatch({
                type:  GET_ADMIN_MENU_SUCCESS,
                data: data.data
            });
        } catch (error) {
            dispatch({
                type: GET_ADMIN_MENU_FAILURE,
                error: new Error('获取导航信息失败')
            });
        }
    };

}


