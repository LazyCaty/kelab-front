/*登录界面*/
import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { Input,Icon,Form, Button,message, Checkbox ,Card} from 'antd';
import "./login.less";

const FormItem=Form.Item;
const Search = Input.Search;
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
           
        }
    }

  



    render(){
        const {getFieldDecorator}=this.props.form;//getFieldDecorator属性，要用Form.create创建
        return(
            <div>
                <div className="login-content">
                    <Card>
                        <Form style={{width:350}}>
                            <div className="login-content-head">欢迎登录语义分析平台</div>
                    
                            <FormItem>
                                {
                                    getFieldDecorator('userName',{//初始化
                                        initialValue:'',
                                        rules:[{
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            //判断范围
                                            min:5,max:10,
                                            message:'长度不在范围内'
                                        },{
                                            // pattern:/^\w+$/g,//正则//这种也行
                                                pattern:new RegExp('^\\w+$','g'),
                                                message:'用户名必须是数字或字母'
                                        }
                                        ]
                                    })(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />)
                                }    
                            </FormItem>
                            <FormItem>
                                {
                                getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[]
                                })( <Input prefix={<Icon type="lock"/>} placeholder="请输入密码"/>)
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('validation',{
                                        initialValue:'',
                                        rules:[]
                                    })( <Input style={{width:200}} placeholder="请输入验证码"/>)
                                
                                }
                                <div style={{width:50,float:'right'} }>验证码</div>
                            </FormItem>
                            <FormItem>
                                {/*{
                                    getFieldDecorator('remmber',{
                                        valuePropName:'checked',//默认打钩
                                            initialValue:false,//可以控制打钩
                                            rules:[]
                                    })( <Checkbox>记住密码</Checkbox>)
                                    
                                }*/}
                                <a href="#" style={{float:'left'}}>忘记密码</a>
                                <NavLink to={'/registered'} style={{float:'right'}}>注册</NavLink>
                                        
                            
                            </FormItem>
                            <Button style={{width:300,marginLeft:25}}  type="primary">登录</Button>
                            <FormItem>
                                <div></div>
                                <div></div>
                                <div></div>
                            </FormItem>
                        </Form>
                     </Card>
               </div>
            </div>
        )
    }
}

//组件关联
const mapStateToProps = state => {
    return {questionRecord: state.questionRecord};
};
Login = (connect(mapStateToProps)(Login));
export default Form.create()( Login);