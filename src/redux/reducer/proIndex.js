import actions from '../action/index';

const {
    GET_SERVICE_CLASSIFICATION_SUCCESS,
    GET_SERVICE_SUBJECT_SUCCESS,
} = actions;

export default (state = {},action) => {
    switch (action.type) {
        case GET_SERVICE_CLASSIFICATION_SUCCESS:
            return {
                ...state,
                getServiceClass: action.data,
            };
        case GET_SERVICE_SUBJECT_SUCCESS:
            return {
                ...state,
                getServiceSubject: action.data,
            };
        default:
            return state;
    }
};