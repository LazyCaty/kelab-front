import React,{Component} from 'react';
import { Table,Button ,Icon,Pagination,Card,Form,Input,Select,Modal} from 'antd';
import {connect} from 'react-redux'
import {getServe,addServe} from "../../redux/action/admin/adminServer";
import AdminSubject from './AdminSubject';
import EditorDemo from './BraftEditors';
import './AdminServer.less';

const FormItem=Form.Item;

const {Option} = Select;
@connect(state=>({
        adminServer:state.adminServer
    })
)


class AdminServer extends Component{
    state={
        dataSource:[],
        buttonState:false, // 添加按钮是否点击
        visible: false
    }
    componentDidMount() {
        this.props.dispatch(getServe(1,4)).then(()=>{
            this.setState({
                dataSource:this.props.adminServer.server
            })
        })
    }
    getCurrPage=(page, pageSize)=>{
        console.log(page, pageSize);
        this.props.dispatch(getServe(page,pageSize)).then(()=>{
            this.setState({
                dataSource:this.props.adminServer.server
            })
        })
    }

    changeButton=()=>{
        this.setState({
            buttonState:!this.state.buttonState
        })
    }

    SubmitForm=()=>{
        let formInformation=this.props.form.getFieldsValue();
        console.log(formInformation);
        this.props.dispatch(addServe(formInformation)).then(()=>{

        })

    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    render(){

        const {getFieldDecorator}=this.props.form;

        const columns=[
            {
                title:'产品',
                dataIndex:'name',
                key:'name',

            },
            {
                title:'描述',
                dataIndex:'description',
                key:'description'
            },
            {
                title:'操作',
                dataIndex:'',
                key:'',
                render:()=>{
                    return <div><Icon type="form" /></div>
                }
            }
        ]

        return <div>
            <Card title="微服务管理"  >
                <header className="admin-server-head">
                    <Button onClick={this.showModal}>添加服务</Button>
                </header>
                <article className="admin-server-content">
                    <Table dataSource={this.state.dataSource} expandedRowRender={record => <AdminSubject serverid={record.id} /> }  columns={columns} pagination={false} />

                </article>
                <footer>
                    <Pagination total={6}  defaultPageSize={4}   defaultCurrent={1} onChange={this.getCurrPage} />
                </footer>
            </Card>
             <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.SubmitForm}
          onCancel={this.handleCancel}
          okText="提交"
          cancelText="取消"
        >
           <Card title={'添加微服务'} >

<Form layout="horizontal">
<FormItem label="服务名称：">
    {
        getFieldDecorator('name')(<Input placeholder={"请输入服务名"}/>)
    }
</FormItem>

<FormItem label="服务描述：">
    {
        getFieldDecorator('description')(<Input placeholder={"请输入对微服务的描述"}/>)
    }
</FormItem>


<FormItem label="服务状态">
    {
        getFieldDecorator('status',{
            initialValue:'2',
        })(<Select style={{ width: 120 }}>
            <Option value="1">close</Option>
            <Option value="2">opened</Option>
            <Option value="3">pending</Option>
        </Select>)
    }
</FormItem>
    <FormItem>
       <EditorDemo />

    </FormItem>

</Form>

</Card>
        </Modal>
        </div>

    }
}
export default Form.create()(AdminServer);