import actions from '../../constants/action';
const{
    GET_ADMIN_MENU_SUCCESS,
    GET_ADMIN_MENU_FAILUER

}=actions

export default (state={},action)=>
{
    switch(action.type)
    {
        case GET_ADMIN_MENU_SUCCESS:
            return{
                ...state,
                menu:action.data
            }
    }
    return state;
}