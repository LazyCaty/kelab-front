import actions from '../action/index';
const{
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,
    GET_SERVER_SUBJECT_SUCCESS,
    GET_SERVER_SUBJECT_FAILURE,

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
    }
    return state;
}