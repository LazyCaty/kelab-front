import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Homepage from '../components/user/Homepage'
import Product from "../components/user/product/Product"
import ProIndex from "../components/user/product/ProIndex"
import NavMenu from "../components/user/reproduction/NavMenu"
import RepIndex from "../components/user/reproduction/RepIndex"
import NlpRepro from "../components/user/reproduction/NlpRepro"
import Admin from '../components/admin/AdminHome'
import AdminServer from '../components/admin/AdminServer'
import AdminMenber from '../components/admin/AdminMenber'
import GeneralView from '../components/user/personal/GeneralView'
import NoFound from '../components/404/NoFound'
import AccountInfo from '../components/user/personal/AccountInfo'
import Goods from '../components/user/personal/Goods'
import AdminDoc from '../components/admin/AdminDoc'

class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path='/' exact component = {Homepage}/>
                    <Route path='/personal/' render = { () =>
                            <Switch>
                                <Route path = '/personal/' exact component = {GeneralView}/>
                                <Route path = '/personal/account' exact component = {AccountInfo}/>
                                <Route path = '/personal/goods' exact component = {Goods}/>
                            </Switch>
                    }
                    />

                    <Route path='/product/' render = { () =>
                            <Switch>
                                <Route path='/product' exact component = {ProIndex}/>
                                <Route path='/product/document' exact component = {Product}/>
                            </Switch>
                    }
                    />


                    <Route path='/reproduction/' render = {() =>
                        <NavMenu>
                            <Switch>
                                <Route path='/reproduction' exact component = {RepIndex}/>
                                <Route path='/reproduction/nlp' exact  component = {NlpRepro}/>
                            </Switch>
                        </NavMenu>
                    }
                    />


             <Route path="/admin" render={()=><Admin>
                        <Switch>
                            <Route path="/admin/menbers" exact component={AdminMenber} />
                            <Route path="/admin/server" exact component={AdminServer} />
                            <Route path='/admin/document' exact component={AdminDoc} />

                        </Switch>
                    </Admin>
                    } />
                    <Route component={NoFound} path="*" />
            </Switch>
            
            </Router>

        )
    }
}

export default Routes;