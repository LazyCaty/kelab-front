/* 这里是首页导航栏 */
import React, {Component} from 'react';
import './UserHead.less';
import {Link} from 'react-router-dom';
import {Col, Form, Button,message, Icon, Checkbox} from 'antd';
import {connect} from 'react-redux';
import Login from '../Login';
import {getMenu,changePage} from '../../../redux/action/common/userhead';
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
            logins:false, // 判定是否已登录
            menu:[], // 菜单


        }
    }
    // 获取菜单
    componentDidMount()
    {/*
        this.props.dispatch(getMenu()).then(()=>{
            this.setState({
                menu:this.props.header.menu
            })
        })*/
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

    render()
    {


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
                        <div><Link to={'/reproduction/chm'}>演示</Link></div>

                    </Col>
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem(this.state.itembox3)} onMouseLeave={()=>this.leaveItem(this.state.itembox3)}>
                        <div><Link to={'/cantact'}>联系我们</Link></div>

                    </Col>


                    {
                        this.props.header.logins?<Col span={3} className="userhead-login" ><span >欢迎使用本平台</span>
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