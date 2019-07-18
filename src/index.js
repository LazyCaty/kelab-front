import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import {Provider} from 'react-redux';
import reducer from './redux/reducer'
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import * as serviceWorker from './serviceWorker';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];
const composeEnhancers = composeWithDevTools({
});

// 数据仓库
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(...middleware)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
