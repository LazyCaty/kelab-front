/* 管理主页 */
import React,{Component} from 'react';
import {Row,Col,Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import Footer from '../user/common/Footer';
import './AdminHome.less';
import {getMenu} from "../../redux/action/admin/adminHome";
import {connect} from 'react-redux';
const {SubMenu} =Menu;


@connect(state=>({
    adminhome:state.adminHome
}))
class AdminHome extends Component{
    state={
        theme:'dark', // 侧边栏主题色
        current:'1',
        menu:[] // 侧边菜单列表
    }

    componentDidMount() {
       

    }

    handleClick=(e)=> {

    }

    render()
    {
        return(
            <div className="admin-home">
            <div className="admin-head"><div className="admin-head-logo">后台管理</div><div className="admin-head-user">欢迎!{localStorage.username}</div></div>
            <Row>
                <Col span={3} className="admin-aside">
                  
                    <Menu style={{marginTop:'20px'}}
                     theme={this.state.theme}
                      onClick={this.handleClick}
                        mode="inline"
                        >
                    
                        <Menu.Item key='0' >
                            <Link className="admin-aside-link" to='/admin/menbers' ><Icon type="user" /><span >用户管理</span></Link>

                        </Menu.Item>
                        <SubMenu key="sub1" title={
                            <span>
                            <Icon type="mail" />
                            <span>服务管理</span>
                            </span>
                        }>
                        <Menu.Item key='1' >
                            <Link className="admin-aside-link" to='/admin/category' ><span >分类管理</span></Link>
                            
                        </Menu.Item>
                        <Menu.Item key='2' >
                        <Link className="admin-aside-link" to='/admin/server' ><span >产品管理</span></Link>
                        </Menu.Item>
                        </SubMenu>
                        
                        <Menu.Item key='3' >
                           <Link className="admin-aside-link" to='/admin/document' > <Icon type="file" /><span >文档管理</span></Link>
                        </Menu.Item>
                        
                        <Menu.Item key='4' >
                            <Link className="admin-aside-link" to='/4' ><Icon type="setting" /><span >平台管理</span></Link>
                        </Menu.Item>
                       
                  
         
                    
                    </Menu>
                </Col>
                <Col span={21}>

                    

                    <div className="admin-content">
                        {this.props.children}
                    </div>
                    
                </Col>
            </Row>
            </div>

        )
    }
}
export default AdminHome;