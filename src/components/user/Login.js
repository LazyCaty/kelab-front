/*登录界面*/
import React,{Component} from 'react';
import  {changePage} from '../../redux/action/common/userhead';
import {connect} from 'react-redux';
import { Input,Icon,Form, Button,Card} from 'antd';
import {sendLogin} from "../../redux/action/common/userhead";
import "./Login.less";
const FormItem=Form.Item;
@connect(state=>({
        header:state.userHeader
    })
)


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            page:false ,// 判断是否显示页面
            pageRl:false ,//判断是否为登录
            t:0
        }
    }


    toLogin=()=>{
        let apply=this.props.form.getFieldsValue();//获取表单信息
        this.props.dispatch(sendLogin(apply,1));
    }



    render(){
        const {getFieldDecorator}=this.props.form;//getFieldDecorator属性，要用Form.create创建
        return(
            <div className={this.props.header.displaying==0?"login-display":""}>
                <div className="login-content">
                    {


                        this.props.header.displaying==1?<Card>
                            <Form style={{width:350}}>
                                <div className="login-content-close" onClick={()=>this.props.dispatch(changePage(0))}><Icon type="close" /></div>
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
                                    <a href="#" style={{float:'left'}}>忘记密码?</a>
                                    <div  style={{float:'right',color:"#1890FF",cursor:"pointer"}} onClick={()=>this.props.dispatch(changePage(2))}>去注册</div>


                                </FormItem>
                                <Button style={{width:300,marginLeft:25}}  type="primary" onClick={this.toLogin}>登录</Button>
                                <FormItem>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </FormItem>
                            </Form>
                        </Card>:<Card>
                            <Form style={{width:350}}>
                                <div className="login-content-close" onClick={()=>this.props.dispatch(changePage(0))}><Icon type="close" /></div>
                                <div className="registered-content-head">欢迎注册语义分析平台</div>
                                <FormItem>
                                    {
                                        getFieldDecorator('userName',{//初始化
                                            initialValue:'',
                                            rules:[{
                                                required:true,
                                                message:'账号不能为空'
                                            },
                                                {
                                                    //判断范围
                                                    min:5,max:10,
                                                    message:'长度不在范围内'
                                                },{
                                                    // pattern:/^\w+$/g,//正则//这种也行
                                                    pattern:new RegExp('^\\w+$','g'),
                                                    message:'账号必须是数字或字母'
                                                }
                                            ]
                                        })(<Input prefix={<Icon type="user"/>} placeholder="学号或手机号" />)
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('passwordf',{
                                            initialValue:'',
                                            rules:[]
                                        })( <Input prefix={<Icon type="lock"/>} placeholder="请输入密码"/>)
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('passwords',{
                                            initialValue:'',
                                            rules:[]
                                        })( <Input prefix={<Icon type="lock"/>} placeholder="请确认密码"/>)
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('email',{
                                            initialValue:'',
                                            rules:[]
                                        })( <Input prefix={<Icon type="mail" />} placeholder="请输入邮箱号"/>)

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
                                <Button style={{width:300,marginLeft:25}} onClick={this.toLogin}  type="primary">提交</Button>

                                <FormItem>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </FormItem>
                            </Form>
                        </Card>

                    }

                </div>
                <div className="login-content-mask"></div>
            </div>
        )
    }
}

export default Form.create()( Login);