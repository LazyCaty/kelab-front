/*注册界面*/
import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { Input,Icon,Form, Button,message, Checkbox ,Card} from 'antd';
import "./registered.less";

const FormItem=Form.Item;
const Search = Input.Search;
class Registered extends Component{
    constructor(props){
        super(props);
        this.state={
           
        }
    }

    render(){
        const {getFieldDecorator}=this.props.form;//getFieldDecorator属性，要用Form.create创建
        return(
            <div>
                <div className="registered-content">
                    <Card>
                        <Form style={{width:350}}>
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
                        <Button style={{width:300,marginLeft:25}}  type="primary">提交</Button>
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
Registered = (connect(mapStateToProps)(Registered));
export default Form.create()( Registered);