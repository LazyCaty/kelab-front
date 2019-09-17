import actions from '../action/index';
const{
    GET_CATEGORY_SUCCESS

}=actions

export default (state={},action)=>
{
    switch(action.type)
    {
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                serverCatrgory:action.data
            }
    }
    return state;
}