import actions from '../action/index'
import {getDocMenu} from "../action/user/product";

const {
    GET_PRODUCT_DOCUMENT_SUCCESS
} = actions;

export default (state = {},action) =>{
    switch (action.type) {
        case GET_PRODUCT_DOCUMENT_SUCCESS:
            return{
                ...state,
                getDocMenu: action.data,
            }
        default:
            return state;
    }
}