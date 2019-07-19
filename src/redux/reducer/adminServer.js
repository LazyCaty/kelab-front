import actions from '../action/index';
const{
    GET_ADMIN_SERVER_SUCCESS,
    GET_ADMIN_SERVER_FAILURE,

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
    }
    return state;
}