import React, { Component } from 'react';
import Routers from './routers';
import {connect} from 'react-redux';
import './App.less';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Routers/>
            </div>
        );
    }
}

export default App;
