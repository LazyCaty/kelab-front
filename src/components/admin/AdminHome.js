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
        console.log('click', e);
    }

    render()
    {
        return(

            <Row className="admin-home">
                <Col span={3} className="admin-aside">
                    <div className="admin-aside-logo" ><img src="http://www.cs.swust.edu.cn/assets/img/logo2.png"/></div>
                    <Menu style={{marginTop:'20px'}} theme={this.state.theme} onClick={this.handleClick}  mode="vertical">

                        {
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

                        }
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