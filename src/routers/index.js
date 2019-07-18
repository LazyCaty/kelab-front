import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Homepage from '../components/user/Homepage'
import Product from "../components/user/Product"
import Chm from "../components/user/reproduction/Chm"
import MenuNav from "../components/user/reproduction/MenuNav"
import NlpRepro from "../components/user/reproduction/NlpRepro"
import Admin from '../components/admin/AdminHome'
import AdminServer from '../components/admin/AdminServer'
import {Layout} from 'antd';

class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/product" exact component={Product}/>



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

                    <Route path="/admin" render={()=><Admin>
                        <Switch>
                            <Route Path="/admin/server" exact component={AdminServer}></Route>
                        </Switch>
                    </Admin>
                    }></Route>
                </Switch>
            </Router>

        )
    }
}

export default Routes;