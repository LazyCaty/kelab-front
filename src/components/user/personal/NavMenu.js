/*个人中心概览*/
import React,{Component} from 'react';
import './NavMenu.less';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

class NavMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render(){
        return(
            <div className="personal-navMenu">
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="logo" />
                            <h3 style={{color:'white'}}>个人中心</h3>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <Menu.Item key="1">
                                    <Icon type="pie-chart" />
                                    <span>Option 1</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="desktop" />
                                    <span>Option 2</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="pie-chart" />
                                    <span>Option 1</span>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Icon type="desktop" />
                                    <span>Option 2</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    </Layout>
            </div>
        )
    }

}

export default NavMenu;