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

            <Row className="admin-home">
                <Col span={3} className="admin-aside">
                  
                    <Menu style={{marginTop:'20px'}} theme={this.state.theme} onClick={this.handleClick}  mode="vertical">
                    
                        <Menu.Item key='0' >
                            <Link className="admin-aside-link" to='/admin/menbers' ><Icon type="user" /><span >用户管理</span></Link>

                        </Menu.Item>
                        
                        <Menu.Item key='1' >
                            <Link className="admin-aside-link" to='/admin/server' ><Icon type="user" /><span >微服务管理</span></Link>
                        </Menu.Item>
                        
                        
                        <Menu.Item key='2' >
                           <Link className="admin-aside-link" to='/admin/document' > <Icon type="user" /><span >文档管理</span></Link>
                        </Menu.Item>
                        
                        <Menu.Item key='3' >
                            <Link className="admin-aside-link" to='/4' ><Icon type="user" /><span >平台管理</span></Link>
                        </Menu.Item>
                        
{/*                        {
                            this.state.menu.map((item,index)=>{
                                if(item.children)
                                {return  <SubMenu key={index} title={<span>
                                                <Icon type="user"></Icon>
                                                <span ><Link className="admin-aside-link"  to={"#"} >{item.title}</Link></span>
                                            </span>} >
                                    {
                                        item.children.map((i)=>{
                                            return <Menu.Item key={i.key}>
                                                <Icon type="user" /><span ><Link className="admin-aside-link" to={i.key} >{i.title}</Link></span>
                                            </Menu.Item>
                                        })
                                    }

                                </SubMenu>
                                }else
                                {
                                    return  <Menu.Item key={index} >
                                        <Icon type="user" /><span ><Link className="admin-aside-link" to={item.key} >{item.title}</Link></span>
                                    </Menu.Item>
                                }
                            })

                        }*/}
                    </Menu>
                </Col>
                <Col span={21}>

                    <div className="admin-head"><div className="admin-head-user">欢迎：xxx</div></div>

                    <div className="admin-content">
                        {this.props.children}
                    </div>
                    <div className="admin-footer">
                        <Footer />
                    </div>
                </Col>
            </Row>

        )
    }
}
export default AdminHome;