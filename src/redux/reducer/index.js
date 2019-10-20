import {combineReducers} from 'redux';
import userHeader from './userhead.js';
import adminHome from './adminhome';
import adminServer from './adminServer';
import proIndex from './proIndex';
import product from './product';
import category from './admincategory';
import adminDoc from './adminDoc';
import docEditor from './docEditor'
export default combineReducers({
    userHeader,
    adminHome,
    adminServer,
    proIndex,
    product,
    category,
    adminDoc,
    docEditor
});