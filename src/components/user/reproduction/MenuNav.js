import React,{Component} from 'react';
import "./MenuNav.less"
import {NavLink} from 'react-router-dom';
import { Menu } from 'antd';


class MenuNav extends Component{
    constructor(props){
        super(props);
        this.state={
            menuState:"1",
        }
    }

    /**
     * 点击menu引起组件的重新渲染
     * @return {*}
     */
    changeMenuState = (e) =>{
        console.log(e);
        this.setState({
           menuState:e.key,
        });
    }
    render(){
        return(
            <div>
                <div className="reproduction-header">
                    <div className="reproduction-menuNav">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[this.state.menuState]}
                            style={{ lineHeight: '64px' }}
                            onSelect={this.changeMenuState}
                        >
                            <Menu.Item key="1"><NavLink to='/reproduction/chm'>首页</NavLink></Menu.Item>
                            <Menu.Item key="2"><NavLink to='/reproduction/nlp'>语言处理</NavLink></Menu.Item>
                            <Menu.Item key="3"><NavLink to=''>语言分析</NavLink></Menu.Item>
                            <Menu.Item key="4"><NavLink to=''>云平台API</NavLink></Menu.Item>
                            <Menu.Item key="5"><NavLink to=''>算法演示</NavLink></Menu.Item>
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

export default MenuNav;