import actions from '../action/index';

const {
    GET_CATEGORY_SUCCESS,
    GET_ADMIN_SERVER_SUCCESS,
} = actions;

export default (state = {},action) => {
    switch (action.type) {
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                getServiceClass: action.data,
            };
        case GET_ADMIN_SERVER_SUCCESS:
            return {
                ...state,
                getService: action.data,
            };
        default:
            return state;
    }
};