import actions from '../action/index';
const{
    GET_ADMIN_SERVER_SUCCESS,
    GET_SERVER_ADD_SUCCESS,
    GET_SERVER_DELETE_SUCCESS,
    GET_SERVER_SUBJECT_SUCCESS,
    GET_CATEGORY_SUCCESS,
    GET_SERVER_UPDATE_SUCCESS,
    GET_SERVER_SUBJECT_ADD_SUCCESS,
}=actions

export default (state={},action)=>
{
    switch(action.type)
    {
        case GET_ADMIN_SERVER_SUCCESS:
            return{
                ...state,
                server: action.data
            }
        case GET_SERVER_SUBJECT_SUCCESS:
            return{
                ...state,
                severSubject: action.data
            }
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                serverCatrgory: action.data
            }
        case GET_SERVER_ADD_SUCCESS:
            return{
                ...state,
                addServer: action.data
            }
        case GET_SERVER_DELETE_SUCCESS:
            return{
                ...state,
                deleteServer: action.data
            }
        case GET_SERVER_UPDATE_SUCCESS:
            return{
                ...state,
                updateServer: action.data
            }
        case GET_SERVER_SUBJECT_ADD_SUCCESS:
            return{
                ...state,
                addSubject: action.data
            }
        default:
            return state;
    }
}