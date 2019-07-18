/* 这里是首页导航栏 */
import React, {Component} from 'react';
import './UserHead.less';
import {Input,Modal,Col, Form, Button,message, Icon, Checkbox} from 'antd';
import  {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMenu,} from '../../../redux/action/common/userhead';

const FormItem=Form.Item;
class UserHead extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            itembox1:false, // itembox判断鼠标是否停留在导航菜单上
            itembox2:false ,
            itembox3:false ,
            itembox4:false ,
            itembox5:false ,
            loading: false, // 对话框
        }
    }
    componentDidMount()
    {
        this.props.dispatch(getMenu()).then(()=>{
            console.log("进入");
        })

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

    render()
    {
      
        return(
            <div className="userhead-wrap">
                <div className="userhead-content">
                  
                    <Col span={5}>
                        <span className="userhead-logo">语义分析平台</span>

                    </Col>
                    <Col span={4}></Col>
               
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem('itembox1')} onMouseLeave={()=>this.leaveItem('itembox1')}>
                    <div>语言处理</div>
                
                    </Col>
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem('itembox2')} onMouseLeave={()=>this.leaveItem('itembox2')}>
                    <div>
                    语言分析
                    </div>
                
                    </Col>
                    <Col span={2} className="userhead-bottomItem" onMouseOver={()=>this.handleItem('itembox3')} onMouseLeave={()=>this.leaveItem('itembox3')}>
                    <div>
                    云平台API
                    </div>
                
                    </Col>
                    <Col span={2} className="userhead-bottomItem"  onMouseOver={()=>this.handleItem('itembox4')} onMouseLeave={()=>this.leaveItem('itembox4')}>
                    <div>语言资源</div>
                    
                    </Col>
                    <Col span={2} className="userhead-bottomItem"  onMouseOver={()=>this.handleItem('itembox5')} onMouseLeave={()=>this.leaveItem('itembox5')}>
                    <div>算法资源</div>
                    
                    </Col>
                    <Col span={2} className="userhead-bottomItem"  onMouseOver={()=>this.handleItem('itembox6')} onMouseLeave={()=>this.leaveItem('itembox6')}>
                        <div><Link to="/reproduction/chm">演示</Link></div>
                    </Col>     
            <Col span={3} className="userhead-login" ><span ><NavLink to={'./login'}>登录</NavLink></span>
            </Col>
                    
                </div>  
            </div>
        )
    }
}

export default connect()(UserHead);