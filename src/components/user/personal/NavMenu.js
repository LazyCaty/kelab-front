/*个人中心概览*/
import React,{Component} from 'react';
import './NavMenu.less';
import { Layout, Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom'

const { Sider } = Layout;

class NavMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render(){
        return(
            <div className="personal-navMenu">
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="logo" />
                            <h3 style={{color:'white',marginLeft:'30%'}}>个人中心</h3>
                            <Menu
                                theme="dark"
                                selectedKeys={[window.location.pathname]}
                                mode="inline">
                                <Menu.Item key="/personal">
                                    <NavLink to='/personal'>
                                        <Icon type="pie-chart" />
                                        <span>概览</span>
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/personal/account">
                                    <NavLink to='/personal/account'>
                                        <Icon type="user" />
                                        <span>账号信息</span>
                                    </NavLink>
                                </Menu.Item>
                                    <Menu.Item key="/personal/goods">
                                        <NavLink to='/personal/goods'>
                                            <Icon type="shop" /><span>已购产品</span></NavLink></Menu.Item>
                            </Menu>
                        </Sider>
                    </Layout>
            </div>
        )
    }

}

export default NavMenu;