import React, { Component } from 'react';
import loadable from '../util/loadable';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
/**公共路由最好不要按需引入 */
import Admin from '../components/admin/AdminHome'
/**按需加载组件 */
const Homepage = loadable(() => import('../components/user/Homepage'))
const Product = loadable(() => import('../components/user/product/Product'))
const ProIndex = loadable(() => import('../components/user/product/ProIndex'))
const NavMenu = loadable(() => import('../components/user/reproduction/NavMenu'))
const NlpRepro = loadable(() => import('../components/user/reproduction/NlpRepro'))
const AdminServer = loadable(() => import('../components/admin/AdminServer'))
const AdminMenber = loadable(() => import('../components/admin/AdminMenber'))
const GeneralView = loadable(() => import('../components/user/personal/GeneralView'))
const NoFound = loadable(() => import('../components/404/NoFound'))
const AccountInfo = loadable(() => import('../components/user/personal/AccountInfo'))
const Goods = loadable(() => import('../components/user/personal/Goods'))
const AdminDoc = loadable(() => import('../components/admin/AdminDoc'))
const ServerEdit = loadable(() => import('../components/admin/BraftEditors'))

/* import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import loadable from '../util/loadable'

const Home = loadable(()=>import('@pages/home'))

const Routes = () => (
    <BrowserRouter>
        <Route path="/home" component={Home}/>
    </BrowserRouter>
);

export default Routes */
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
                                    <Route path="/admin/serveredit/:data" exact component={ServerEdit} />

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