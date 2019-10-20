import actions from '../action/index';
const {GET_DOCUMENT_ADD_SUCCESS} = actions
export default ((state={},action)=>{
    switch(action.type){
        case GET_DOCUMENT_ADD_SUCCESS:
            return{
                ...state,
                adddoctext:action.data
            }
        default:
            return state
    }
})