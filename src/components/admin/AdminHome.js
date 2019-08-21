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
        this.props.dispatch(getMenu()).then(()=>{
            this.setState({
                menu:this.props.adminhome.menu
            })
        })

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
                            <Icon type="user" /><span ><Link className="admin-aside-link" to='/admin/menbers' >用户管理</Link></span>
                        </Menu.Item>
                        <Menu.Item key='1' >
                            <Icon type="user" /><span ><Link className="admin-aside-link" to='/admin/server' >微服务管理</Link></span>
                        </Menu.Item>
                        <Menu.Item key='2' >
                            <Icon type="user" /><span ><Link className="admin-aside-link" to='/admin/document' >文档管理</Link></span>
                        </Menu.Item>
                        <Menu.Item key='3' >
                            <Icon type="user" /><span ><Link className="admin-aside-link" to='/4' >平台管理</Link></span>
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