import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Homepage from '../components/user/Homepage'
import Product from "../components/user/product/Product"
import ProIndex from "../components/user/product/ProIndex"
import MenuNav from "../components/user/reproduction/MenuNav"
import RepIndex from "../components/user/reproduction/RepIndex"
import NlpRepro from "../components/user/reproduction/NlpRepro"
import Admin from '../components/admin/AdminHome'
import AdminServer from '../components/admin/AdminServer'
import AdminMenber from '../components/admin/AdminMenber'
import {Layout} from 'antd';

class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" exact component={Homepage}/>


                    <Route path='/product/' render={
                        () => <Layout style={{backgroundColor:"white"}}>
                            <Switch>
                                <Route path='/product/' exact component={ProIndex}/>
                                <Route path='/product/document' exact  component={Product}/>
                            </Switch>
                        </Layout>
                    }
                    />


                    <Route path='/reproduction/' render={
                        () => <Layout style={{backgroundColor:"white"}}>
                            <MenuNav/>
                            <Switch>
                                <Route path='/reproduction' exact component={RepIndex}/>
                                <Route path='/reproduction/nlp' exact  component={NlpRepro}/>
                            </Switch>
                        </Layout>
                    }
                    />

                    <Route path="/admin" render={()=><Admin>
                        <Switch>
                            <Route path="/admin/menbers" exact component={AdminMenber} />
                            <Route path="/admin/server" exact component={AdminServer} />

                        </Switch>
                    </Admin>
                    } />
            </Switch>
            </Router>

        )
    }
}

export default Routes;