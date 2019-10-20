import React,{Component} from 'react';
import {Table,Modal,Form,Popconfirm,Icon,message,Card,Input,Select} from 'antd';
import {connect} from 'react-redux';
import {getEntity,deteleEntity,updateEntity} from '../../redux/action/admin/adminServer';

const FormItem=Form.Item;
const {Option} = Select;
@connect(state=>({
    adminServer:state.adminServer
    })
)


class AdminSubject extends Component{
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            page: 1,
            total:0,
            visible:false //更新微服务弹框
        }
    }


    componentDidMount() {
        this.props.dispatch(getEntity(this.props.serverid)).then(()=>{
            if(this.props.adminServer.Entity !== null){
                this.setState({
                    dataSource:this.props.adminServer.Entity.pagingList,
                    total:this.props.adminServer.Entity.total
                })
            }
        })
    }

    /**
    * 更新微服务
    */
    updateMicroServer = () => {
        let data = this.props.form.getFieldsValue();
        this.props.dispatch(updateEntity({
            id: data._server_id,
            serverSubjectId: data._subject_id,
            name: data._server_name,
            status: data._server_status,
            url: data._server_url,
            version: data._server_version,
            description: data._server_desc
        })).then(() => {
            if(this.props.adminServer.updateEntity.code === 'SUCCESS'){
                message.success('修改微服务成功')
                setTimeout(()=>window.location.reload(),1000);
            }else{
                message.error('修改微服务失败')
            }
        })
    }
    /**
     * 显示更新微服务对话框
     */
    showUpdateMicroServerModal = (e) => {
        this.props.form.setFieldsValue({
            _server_id: e.id,
            _subject_id: e.serverSubjectId,
            _server_name: e.name,
            _server_status: e.status,
            _server_url: e.url,
            _server_version: e.version,
            _server_desc: e.description,
        })
        this.setState({
        visible: true,
        });
        
    };
    /**
     * 关闭更新微服务对话框
     */
    handleUpdateMicroServerModal = () => {
        this.setState({
        visible: false,
        });
    }; 

    /**
     * 删除微服务实例
     */
    deleteServer = (e) =>{
        this.props.dispatch(deteleEntity({
            ids: parseInt(e.id)
        })).then(() => {
            if(this.props.adminServer.deleteEntity.code === 'SUCCESS'){
                message.success('删除微服务成功')
                setTimeout(()=>window.location.reload(),1000);
            }else{
                message.error('删除微服务失败')
            }
        })
    }

    render(){
        const {getFieldDecorator}=this.props.form;
        /**table数据格式 */
        const columns=[
            {
                title:'ID',
                dataIndex:'index',
                key:'id',
            },
            {
                title:'微服务分类ID',
                dataIndex:'serverSubjectId',
                key:'serverSubjectId',
            },
            {
                title:'微服务',
                dataIndex:'name',
                key:'name',
            },
            {
                title:'状态',
                dataIndex:'status',
                key:'status',
            },
            {
                title:'版本',
                dataIndex:'version',
                key:'version',
            },
            {
                title: '更多操作',
                render: (item,record)=>(
                <div>
                  <span onClick={() => {this.showUpdateMicroServerModal(record)}} style={{cursor:"pointer"}}>
                    <Icon type="edit" style={{ fontSize: '20px', color: '#08c' }}/></span>
                 <span>
                 <Popconfirm placement="rightBottom" title={"你确定要删除么"} okText="确定" cancelText="取消" onConfirm={() => {this.deleteServer(record)}}>
                   <Icon type="delete" style={{ fontSize: '20px', color: '#D94A38', marginLeft:'10%'}}  /></Popconfirm></span> 
                </div>)
              },
        ]
        /**微服务列表 */
        let microServerData = this.state.dataSource;
        let len = this.state.dataSource.length;
        if(len > 0){
            for(let i = 0;i < len;i++){
                    microServerData[i].index = i + 1;
            }
        }
   

    return(
        <div>
        <Table
            columns={columns}
            dataSource={microServerData}
        />
                    {/** 修改微服务对话框 */}
            <Modal
                title={"修改微服务"}
                visible={this.state.visible}
                onOk={this.updateMicroServer}
                onCancel={this.handleUpdateMicroServerModal}
                okText="提交"
                cancelText="取消"
                >
                    <Card>
                    <Form layout="horizontal">
                    <FormItem>
                        {
                            getFieldDecorator('_server_id')
                        }
                    </FormItem>

                    <FormItem label="微服务分类id：">
                        {
                            getFieldDecorator('_subject_id')
                            (<Input placeholder={"请输入微服务分类id"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务名称：">
                        {
                            getFieldDecorator('_server_name')
                            (<Input placeholder={"请输入微服务名称"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务接口地址：">
                        {
                            getFieldDecorator('_server_url')
                            (<Input placeholder={"请输入微服务接口地址"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务版本：">
                        {
                            getFieldDecorator('_server_version')
                            (<Input placeholder={"请输入微服务版本"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务状态：">
                    {
                            getFieldDecorator('_server_status',{
                                initialValue:"2",
                            })(<Select style={{ width: 120 }}>
                                <Option value="1">close</Option>
                                <Option value="2">opened</Option>
                                <Option value="3">pending</Option>
                            </Select>)
                        }
                    </FormItem>

                    <FormItem label="微服务描述：">
                        {
                            getFieldDecorator('_server_desc')
                            (<Input placeholder={"请输入微服务描述"}/>)
                        }
                    </FormItem>                    
                    </Form>
                    </Card>
        </Modal>  
        </div>
    )


    }
}
export default Form.create()(AdminSubject);