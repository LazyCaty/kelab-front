import {combineReducers} from 'redux';
import userHeader from './userhead.js';
import adminHome from './adminhome';
import adminServer from './adminServer';
export default combineReducers({
    userHeader,
    adminHome,
    adminServer
});