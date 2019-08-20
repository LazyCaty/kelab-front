import actions from '../action/index';

const {
    GET_SERVICE_CLASSIFICATION_SUCCESS,
    GET_SERVICE_SUCCESS,
} = actions;

export default (state = {},action) => {
    switch (action.type) {
        case GET_SERVICE_CLASSIFICATION_SUCCESS:
            return {
                ...state,
                getServiceClass: action.data,
            };
        case GET_SERVICE_SUCCESS:
            return {
                ...state,
                getService: action.data,
            };
        default:
            return state;
    }
};