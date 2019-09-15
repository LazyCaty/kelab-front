import actions from '../action/index';
const{
    GET_USER_MENU_SUCCESS,
    GET_USER_MENU_FAILURE,
    CHANGE_PAGE_SUCCSEE,
    GET_USERS_LOGIN_SUCCESS,
    GET_USERS_LOGIN_FAILURE,

    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILURE,

    GET_VERIFICATION_SUCCESS
}=actions

const defaultState={
    displaying:0,
    logins:false
}

export default (state=defaultState,action)=>
{
    switch(action.type)
    {
        case GET_USER_MENU_SUCCESS:
            return{
                ...state,
                menu:action.data
            }
        case CHANGE_PAGE_SUCCSEE:
            return{
                ...state,
                displaying:action.data
            }
        case GET_USERS_LOGIN_SUCCESS:
            return{
                ...state,
                logins: action.data
            }
        case GET_USERS_LOGIN_FAILURE:
            return{
                ...state,
                logins: action.data
            }
        case GET_VERIFICATION_SUCCESS:
            return{
                ...state,
                pic:action.data
            }

    }
    return state;
}