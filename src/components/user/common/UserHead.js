/* 这里是首页导航栏 */
import React, {Component}  from 'react';
import './UserHead.less';
import {Link}              from 'react-router-dom';
import {Col,
    Dropdown,
    Menu,
    Icon,
    message
}               from 'antd';
import {connect}           from 'react-redux';
import Login               from '../Login';
import {changePage}        from '../../../redux/action/common/userhead';

let    jwtDecode = require('jwt-decode');
const { SubMenu } = Menu;
@connect(state=>({
        header:state.userHeader
    })
)


class UserHead extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            itembox0:false, // itembox判断鼠标是否停留在导航菜单上
            itembox1:false ,
            itembox3:false ,
            itembox4:false ,
            itembox2:false ,
            loading: false, // 对话框
            logins:true, // 判定是否已登录
            menu:false, // 菜单


        }
    }

    componentWillMount(){
        if (localStorage.username && localStorage.token) {
            let token = jwtDecode(localStorage.token);
            this.setState({
                logins:true
            })
            if (
                token.exp * 1000 - 7* 60 * 1000 - 2000 >
                Date.parse(new Date())
            ) {
                this.setState({
                   
                });
            } else {
                //退出
            }
        }else{
            this.setState({
                logins:false
            })
          // this.props.dispatch(loginOut());
        }
    }
    componentDidMount()
    {
        this.props.dispatch(changePage(0))

    }
    // 停留在菜单上
    handleItem=(num)=>{
        this.setState({
            [num]:true
        })
    }
    // 未停留在菜单上
    leaveItem=(num)=>{
        this.setState({
            [num]:false
        })
    }
    //登录或注册
    changeDisplay=(num)=> {
        this.props.dispatch(changePage(num));
    }

   changeMenu=()=>{
       this.setState({
           menu:!this.state.menu
       })
   }

   logout=()=>{
    Storage.removeStorage("username");
    Storage.removeStorage("token");
    Storage.removeStorage("uuid");
    message.success("退出");
    window.location.href="/";
   }
      
      

    render()
    {
        const menuStyle={
            width:100,
        }
        const menu = (
            <Menu>
              <Menu.Item key="1"><div style={menuStyle}>个人中心</div></Menu.Item>
                    {
                        true?<Menu.Item key="2"><div style={menuStyle}><Link to={'/admin/menbers'}>后台</Link></div></Menu.Item>:""
                    }
                <Menu.Item key="3"><div style={menuStyle} onClick={this.logout}>退出登录</div></Menu.Item>
            </Menu>
          );
          
        return(
            <div className="userhead-wrap">
                <div className="userhead-content">

                    <Col span={13}>
                        <div className="userhead-logo">语义分析平台Logo</div>

                    </Col>

                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem(this.state.itembox0)} onMouseLeave={()=>this.leaveItem(this.state.itembox0)}>
                                <div><Link to={'/'}>首页</Link></div>

                            </Col>
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem(this.state.itembox1)} onMouseLeave={()=>this.leaveItem(this.state.itembox1)}>
                        <div><Link to={'/product'}>产品</Link></div>

                    </Col>
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem(this.state.itembox2)} onMouseLeave={()=>this.leaveItem(this.state.itembox2)}>
                        <div><Link to={'/reproduction/nlp'}>演示</Link></div>

                    </Col>
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem(this.state.itembox3)} onMouseLeave={()=>this.leaveItem(this.state.itembox3)}>
                        <div><Link to={'/cantact'}>联系我们</Link></div>

                    </Col>


                    {
                        this.state.logins?<Col  onMouseOver={this.changeMenu} onMouseLeave={this.changeMenu} span={3} className="userhead-login" >
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#">
                                欢迎,{localStorage.username}
                                </a>
                            </Dropdown>
                        </Col>:<Col span={3} className="userhead-login" ><span onClick={()=>this.changeDisplay(1)}>登录</span> | <span onClick={()=>this.changeDisplay(2)}>注册</span>
                        </Col>
                    }
                    <div ><Login/></div>

                </div>
            </div>
        )
    }
}



export default UserHead;