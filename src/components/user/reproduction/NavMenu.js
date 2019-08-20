import React,{Component} from 'react';
import "./NavMenu.less"
import {NavLink} from 'react-router-dom';
import { Menu } from 'antd';


class NavMenu extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    /**
     * 点击menu引起组件的重新渲染
     * @return {*}
     */
    changeMenuState = (e) =>{
        this.setState({
           menuState:e.key,
        });
    }
    render(){
        return(
            <div>
                <div className="reproduction-header">
                    <div className="reproduction-navMenu">
                        <Menu
                            mode="horizontal"
                            selectedKeys={window.location.pathname}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="/reproduction/nlp"><NavLink to='/reproduction/nlp'>语言处理</NavLink></Menu.Item>
                            <Menu.Item key="3"><NavLink to=''>语言分析</NavLink></Menu.Item>
                            <Menu.Item key="4"><NavLink to=''>云平台API</NavLink></Menu.Item>
                            <Menu.Item key="5"><NavLink to=''>算法演示</NavLink></Menu.Item>
                            <Menu.Item key="6"><NavLink to='/product'>返回产品列表</NavLink></Menu.Item>
                            <Menu.Item key="7"><NavLink to='/'>返回主页</NavLink></Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="reproduction-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default NavMenu;