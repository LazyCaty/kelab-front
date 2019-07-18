import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Homepage from '../components/user/Homepage'
import Nlp from "../components/user/Nlp"
import Chm from "../components/user/reproduction/Chm"
import MenuNav from "../components/user/reproduction/MenuNav"
import NlpRepro from "../components/user/reproduction/NlpRepro"
import {Layout} from 'antd';
import Login from '../components/user/login';
import Registered from '../components/user/registered';

class Routes extends Component{
    render(){
        return(
        <Router>
            <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/nlp" exact component={Nlp}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/registered" exact component={Registered}/>
                    <Route path='/reproduction/' render={
                        () => <Layout style={{backgroundColor:"white"}}>
                            <MenuNav/>
                                <Switch>
                                    <Route path='/reproduction/chm'  component={Chm}/>
                                    <Route path='/reproduction/nlp'  component={NlpRepro}/>
                                </Switch>
                        </Layout>
                    }
                    />
            </Switch>
        </Router>
      
        )
    }
}

export default Routes;