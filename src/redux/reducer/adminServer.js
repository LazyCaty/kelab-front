import actions from '../action/index';
const{
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,
    GET_SERVER_SUBJECT_SUCCESS,
    GET_SERVER_SUBJECT_FAILURE,
    GET_CATEGORY_SUCCESS

}=actions

export default (state={},action)=>
{
    switch(action.type)
    {
        case GET_ADMIN_SERVER_SUCCESS:
            return{
                ...state,
                server:action.data
            }
        case GET_SERVER_SUBJECT_SUCCESS:
            return{
                ...state,
                severSubject:action.data
            }
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                serverCatrgory:action.data
            }
    }
    return state;
}