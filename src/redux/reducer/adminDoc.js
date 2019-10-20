import actions from '../action/index';
const {
     GET_DOCUMENT_SUCCESS,
     GET_DOCUMENT_FAILURE,
     //修改文档(AdminDoc)
     GET_DOCUMENT_UPDATE_SUCCESS,
     GET_DOCUMENT_UPDATA_FAILURE,
     //删除文档(AdminDoc)
     GET_DOCUMENT_DELETE_SUCCESS,
     GET_DOCUMENT_DELETE_FAILURE,
     GET_DOCUMENT_ADD_SUCCESS,
     GET_DOCUMENT_ADD_FAILURE,
     SEND_DATA
}=actions

export default (state={},action)=>{
    switch(action.type){
        case  GET_DOCUMENT_SUCCESS:
            return{
                ...state,
                document: action.data
            }
        case GET_DOCUMENT_UPDATE_SUCCESS:
            return{
                ...state,
                updatadocument: action.data
            }
        case  GET_DOCUMENT_DELETE_SUCCESS:
            return{
                ...state,
                deletedocument:action.data
            }
        case GET_DOCUMENT_ADD_SUCCESS:
            return{
                ...state,
                adddocument:action.data
            }
        case SEND_DATA:
            return{
                ...state,
                doctext:action.data
            }
        
            default:
                return state;
       
    }
}