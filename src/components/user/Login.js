/*登录界面*/
import  React,{Component}   from 'react';
import  storage             from '../../util/Storage';
import  crypto              from 'crypto';
import  axios               from 'axios';
import  configs             from '../../redux/action/common/configs';
import  {changePage}        from '../../redux/action/common/userhead';
import  {connect}           from 'react-redux';
import  { 
        Input,
        Icon,
        Form, 
        Button,
        Card,
        message}            from 'antd';
import  {sendLogin,
        getVerification,
        sendRes}            from "../../redux/action/common/userhead";
import  "./Login.less";


const   FormItem  =Form.Item;
const   md5       = crypto.createHash('md5');
const   baseUrl   =configs.baseUrl;
let     jwtDecode = require('jwt-decode');
let     timer;

@connect(state=>({
        header:state.userHeader
    })
)

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            page:0 ,// 判断是否显示页面
            pageRl:false ,//判断是否为登录
            t:0,
            uuid:"",
         
        }
    }

    componentDidMount(){
       this.getCaptcha(null);
       //设置定时器
       //setTimer();
       this.setState({
           page:this.props.header.displaying
       })
       
    }

    /**
     * 获取验证码
     * @param {string} uuid
     */
    getCaptcha=(uuid)=>{
        this.props.dispatch(
            getVerification(uuid)
            )
            .then(()=>{
            this.setState({
                picSource :this.props.header.Captcha.data,
                uuid      :this.props.header.Captcha.uuid
            })
            storage.setStorage('token',this.props.header.Captcha.token);

        })
    }

    /**
     * 注册
     */
    toRegister=()=>{
        let apply=this.props.form.getFieldsValue();//获取表单信息
        if(apply.username   ===''
         &&apply.password   ===''
         &&apply.validation ===''
         &&apply.email      ==='')
        {
            message.warning('信息不能为空')
        }
        else
        {
            this.props.dispatch(sendRes({
                username :apply.username,
                password :apply.password,
                email    :apply.email
            }))
            
            //window.location.href="/";

        }
    
    }

    /**
     * 登录
     */
    toLogin=()=>{
        let apply=this.props.form.getFieldsValue();
        if(apply.usernameL===''&&apply.passwordL===''&&apply.validationL==='')
        {
            message.warning('信息不能为空')
        }
        else{
            //md5加密
            md5.update(apply.passwordL);
            console.log(md5.update('hex'));
            this.props.dispatch(sendLogin({
                username    :apply.userNameL,
                password    :md5.update('hex'),
                uuid        :this.state.uuid,
                verifycode  :apply.validationL
            })).then(()=>{
               
            }
            );
        }
          
    }



       // 检查注册
       checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['passwords'], {
                force: true,
            });
        }
        callback();
        }

        checkPass2(rule, value, callback) {
            const { getFieldValue } = this.props.form;
            if (value && value !== getFieldValue('password')) {
                callback('两次输入密码不一致！');
            } else {
                callback();
            }
        }

        /**
         * 设置定时器
         */
        setTimer() {
            // 清除旧定时器
            if (timer) {
                clearTimeout(timer);
            }
            //设置定时器
            if (localStorage.token) {
                try {
                    //得到过期时间
                    let token = jwtDecode(localStorage.token);
                    let time =token.exp * 1000 - 7 * 60 * 1000 - Date.parse(new Date());
    
                    timer = setTimeout(() => {
                        //请求新token
                        //this.reGetToken();
                        
                    }, time);
                } catch (error) {
                    console.log('timer err');
                }
            }
        }
        
        /**
         * 刷新token
         */
        reGetToken=()=>{
            //刷新token
            try{
                const data=axios.get(`${baseUrl}`).data;
                //检查是否会出现错误
                // if(有错)
                // {
                //   message.info('用户认证已过期，请重新登录。');  
                //   this.loginOut();
                // }else{
                //     storage.setStorage('token',data.token);
                // }

            }
            catch(err){
                message.info('用户认证已过期，请重新登录。');
                this.loginOut();
            }
        }
       /**
        * 退出登录
        */
        loginOut() {
            // 如果存在定时器，则使用clearTimeout清空。
            timer && clearTimeout(timer);
            localStorage.clear();
            window.location.reload();
        }


    render(){
        const {getFieldDecorator}=this.props.form;//getFieldDecorator属性，要用Form.create创建
        const {picSource,uuid,notEmpL,notEmp,page} = this.state;
        const styleImg={ 
            cursor: 'pointer',
            width:100,
            height:30,
            paddingBottom:5
        }
        return(
            <div className={this.props.header.displaying==0?"login-display":""}>
                <div className="login-content">
                    {


            this.props.header.displaying===1?<Card>
                            <Form style={{width:350}}>
                                <div className="login-content-close" onClick={()=>this.props.dispatch(changePage(0))}><Icon type="close" /></div>
                                <div className="login-content-head">欢迎登录语义分析平台</div>


                                <FormItem>
                                    {
                                        getFieldDecorator('userNameL',{//初始化
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
                                        getFieldDecorator('passwordL',{
                                            initialValue:'',
                                            rules:[{
                                                pattern:new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'),
                                                message:'密码至少包含 数字和英文，长度6-20'
                                            }]
                                        })( <Input prefix={<Icon type="lock"/>} placeholder="请输入密码"/>)
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('validationL',{
                                            initialValue:'',
                                            rules:[]
                                        })( <Input style={{width:220}} placeholder="请输入验证码"/>)

                                    }
                                    <div style={{float:'right',marginRight:30} }>
                                        <img 
                                            src={`data:image/png;base64,${picSource}`}
                                            style={styleImg}
                                            onClick={()=>this.getCaptcha(uuid)}
                                        />
                                        </div>
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
                                        getFieldDecorator('username',{//初始化
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
                                        getFieldDecorator('password',{
                                            initialValue:'',
                                            rules:[{
                                                pattern:new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'),
                                                message:'密码至少包含 数字和英文，长度6-20'
                                            },
                                            {
                                                validator: this.checkPass.bind(this),
                                            },]
                                        })( <Input prefix={<Icon type="lock"/>} placeholder="请输入密码"/>)
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('passwords',{
                                            initialValue:'',
                                            rules:[{
                                                validator: this.checkPass2.bind(this),
                                            },
                                            {
                                                pattern:new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'),
                                                message:'密码至少包含 数字和英文，长度6-20'
                                            },
                                        ]
                                        })( <Input prefix={<Icon type="lock"/>} placeholder="请确认密码"/>)
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('email',{
                                            initialValue:'',
                                            rules:[]
                                        })( <Input prefix={<Icon type="email"/>} placeholder="请填写邮箱"/>)
                                    }
                                </FormItem>
                                
                                <FormItem>
                                    {
                                        getFieldDecorator('validation',{
                                            initialValue:'',
                                            rules:[]
                                        })( <Input style={{width:200,float:'left'}} placeholder="请输入验证码"/>)

                                    }
                                    <div style={{float:'right',marginRight:30} }>
                                        <img 
                                            src={`data:image/png;base64,${picSource}`} 
                                            style={styleImg}
                                            onClick={()=>this.getCaptcha(uuid)}
                                        />
                                        </div>
                                </FormItem>
                                <Button style={{width:300,marginLeft:25}} onClick={this.toRegister}  type="primary">注册</Button>

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