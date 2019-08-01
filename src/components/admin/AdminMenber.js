import React,{Component} from 'react';
import {connect} from 'react-redux';

import {Card,Icon,Table,Button ,Modal,message,Input,Select,Form} from 'antd';

const FormItem=Form.Item;
const Option = Select.Option;
@connect(state=>{

})
class AdminMenber extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource1: '',
            selectedRowKeys1:[],
            selectedRowKeys2:[],
            visible:false,
            selectedItem:{},



        }
    }
    componentWillMount(){

       //请求成员列表
    }
    //提交添加的成员信息
    handleSubmit=()=>{
        let apply=this.props.form.getFieldsValue();//获取当前表单


    }


    getBase64=(img, callback)=> {
        const reader = new FileReader();//读取文件对象
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }



    //多选执行删除动作
    handleDelete=(num)=>{
        let rows;

            rows=this.state.selectedRows1;

        if(rows){
            let ids=[];
            rows.map((item)=>{
                ids.push(item.id);
            })
            this.requset(num);//刷新数据
            Modal.confirm({
                title:'删除提示',
                content:`您确定要删除这些序号的数据吗？${ids}`,
                onOk:()=>{
                   //传递

                }
            })
        }else{
            message.warning("请选择要删除序号");
        }
        this.requset();

    }
    handleChangePassword=()=>{
        let rows;
            rows=this.state.selectedRows1;
        if(rows){
            let ids=[];
            rows.map((item)=>{
                ids.push(item.id);
            })

            Modal.confirm({
                title:'重置密码提示',
                content:`您确定要重置这些序号用户的密码吗？${ids}`,
                onOk:()=>{
                    //传递

                    message.success("重置成功")

                }
            })
        }else{
            message.warning("请选择要重置的序号");
        }

    }
    handleadd=()=>{

        this.setState({
            visible:true
        })
    }

    render(){
        const {getFieldDecorator}=this.props.form;
        const formItemLayout={
            labelCol:{//屏幕大小配比
                xs:24,//要小于24份
                sm:4,
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const columns=[
            {title:"序号",dataIndex:'id',key:'id'+'tnum'},
            { title: '姓名', dataIndex: 'name', key: 'id' },
            { title: '账号', dataIndex: 'username', key: 'id' },

            { title: '性别', dataIndex: 'sex', key: 'sex' },
            { title: '身份', dataIndex: 's', key: 's' },

        ];

        const selectedRowKeys1=this.state.selectedRowKeys1;//const {selectedRowKeys}=this.state;//es6的解构

        const rowCheckSelection1={
            type:'checkbox',
            selectedRowKeys1,
            onChange:(selectedRowKeys1,selectedRows1)=>{//selectedRowKeys选中哪一行，selectedRows选中哪些行
                let ids=[];//存下id方便做类似删除的处理
                selectedRows1.map((item)=>{

                    ids.push(item.id);
                })
                this.setState({
                    selectedRowKeys1,
                    // selsectIds:ids//这个不是必须的，是为了方便后续操作
                    selectedRows1
                })

            }
        }


        return(
            <div>
                <Card title="用户名单">
                    <div style={{margin:'10px 0'}}>
                        {/**/}


                        <Button onClick={()=>this.handleDelete()}>删除</Button>
                        <Button onClick={()=>this.handleChangePassword()}>重置密码</Button>
                        <Button onClick={()=>this.handleadd()}>添加用户</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection1}
                        columns={columns}
                        dataSource={this.state.dataSource1}
                        pagination={true} //是否要分页

                    >
                    </Table>
                </Card>


                <Modal
                    title="添加成员"
                    width={400}
                    height={700}
                    visible={this.state.visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                >
                    <FormItem label="学号" {...formItemLayout}>{/**lable是文本框前面的文字，文字后面不用打冒号，会自动添加 */}
                        {
                            getFieldDecorator('username',{//初始化
                                initialValue:'3',
                                rules:[{
                                    required:true,
                                    message:'学号不能为空'
                                },

                                ]
                            })(<Input prefix={<Icon type="user"/>} placeholder="请输入学号" />)
                        }

                    </FormItem>
                    <FormItem label="我向往的那个实验室" {...formItemLayout}>
                        {
                            getFieldDecorator('lab_id',{//初始化
                                    initialValue:'1',
                                    rules:[{
                                        required:true,
                                        message:'实验室不能为空'
                                    },]
                                },
                            )(
                                <Select>
                                    <Option value="1">计算机科学与技术学院</Option>
                                    <Option value="2">材料科学与工程学院</Option>
                                    <Option value="3">法学院</Option>
                                    <Option value="4">国防科技学院</Option>
                                    <Option value="5">环境与资源学院</Option>
                                    <Option value="6">计算机科学与技术学院</Option>
                                    <Option value="7">经济管理学院</Option>
                                    <Option value="8">理学院</Option>
                                    <Option value="9">马克思主义学院</Option>
                                    <Option value="10">生命科学与工程学院</Option>
                                    <Option value="11">体育学科部</Option>
                                    <Option value="12">土木工程与建筑学院</Option>
                                    <Option value="13">外国语学院</Option>
                                </Select>
                            )
                        }

                    </FormItem>
                </Modal>
            </div>
        );

    }
}

export default  Form.create()(AdminMenber);