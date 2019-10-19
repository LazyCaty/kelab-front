// 微服务管理页面
import React,{Component} from 'react';
import { Table,Button ,Popconfirm,Pagination,Card,Form,Input,Select,Modal,message,List,Tabs,Popover,Icon} from 'antd';
import {connect} from 'react-redux'
import {getServe,addServe,deteleServer,getCategory,updateServer,addSubject,addEntity,getSubject,deleteSubject,updateSubject} 
from "../../redux/action/admin/adminServer";
import AdminSubject from './AdminSubject';
import './AdminServer.less';


const FormItem=Form.Item;
const {Option} = Select;
const { TabPane } = Tabs;

@connect(state=>({
        adminServer:state.adminServer
    })
)

class AdminServer extends Component{
    constructor(){
        super();
        this.state={
            dataSource: [],
            total: 0,
            visible: false, //添加产品弹框
            visible1: false,  //更新产品弹框 
            visible2: false,  //添加微服务弹框
            visible3: false,  //微服务分类管理弹框
            category: [],
            deleteData: '',  //删除的数据
            categoryId: 1,
            subject: [] //微服务主体
        }
    }
    
    componentDidMount() {

        this.props.dispatch(getCategory({
            page: 1,
            rows: 50,
        })).then(()=>{
            this.setState({
                category:this.props.adminServer.serverCatrgory.pagingList
            })    
        })
        this.props.dispatch(getSubject(1,50)).then(() => {
            this.setState({
                subject:this.props.adminServer.severSubject.pagingList
            })
        })
        // 获得产品分页
        this.props.dispatch(getServe(1,5,this.state.categoryId)).then(()=>{       
            // 为每条数据添加Key值
            this.props.adminServer.server.pagingList.map((item)=>{
                item.key=item.id;
            })
            this.setState({
                total:this.props.adminServer.server.total,
                dataSource:this.props.adminServer.server.pagingList
            })
        })
        }
    /**
     * 获取当前分类页面的产品
     */
    getCurrCate = (e) => {
        let id = parseInt(e) + 1;
        this.props.dispatch(getServe(1,5,id)).then(()=>{
            // 为每条数据添加Key值
            this.props.adminServer.server.pagingList.map((item)=>{
               item.key=item.id;
           })
           this.setState({
            dataSource: this.props.adminServer.server.pagingList,
            total: this.props.adminServer.server.total,
            categoryId: id,
        })
       })
    }    
    /**
     * 获取当前分类下产品页
     */
    getCurrPage = (page) => {
        this.props.dispatch(getServe(page,5,this.state.categoryId)).then(()=>{
             // 为每条数据添加Key值
             this.props.adminServer.server.pagingList.map((item)=>{
                item.key=item.id;
            })
            this.setState({
                dataSource:this.props.adminServer.server.pagingList
            })
        })
    }
    /**
     * 删除产品
     */
    deleteProduct = () =>{
        if(this.state.deleteData)
        {
            this.props.dispatch(deteleServer({ids:this.state.deleteData}))
            .then(() =>{
                if(this.props.adminServer.deleteServer.code === 'SUCCESS'){
                    message.success('删除产品成功');
                    setTimeout(()=>window.location.reload(),1000);
                }else{
                    message.error('删除产品失败')
                }
            })

        }else{
            message.error("请选择您要删除的删除");
        }
    }

    /**
     * 提交添加产品
     */
    addProduct = () =>{
        let data = this.props.form.getFieldsValue();
        this.props.dispatch(addServe({
            name: data.pro_name,
            description: data.pro_description,
            status: data.pro_status,
            categoryId: data.pro_categoryId,
        })).then(() => {
            if(this.props.adminServer.addServer.code === 'SUCCESS'){
                this.handleAddProModal();
                message.success('添加产品成功');
                setTimeout(()=>window.location.reload(),1000);
            }else{
                this.handleAddProModal();
                message.error('添加产品失败');               
            }

        })    
    }
    /**
     * 显示添加产品对话框
     */
    showAddProModal = () => {
        this.setState({
          visible: true,
        });
        
      };
    /**
     * 关闭添加产品对话框
     */
    handleAddProModal = (f) => {
        this.setState({
         visible: false,
        });
      };
    /**
     * 更新产品  
     */  
    updateProduct = () => {
        let data = this.props.form.getFieldsValue();
        this.props.dispatch(updateServer({
            id: data._pro_id,
            categoryId: data._pro_categoryId,
            name: data._pro_name,
            description: data._pro_description,
            status: parseInt(data._pro_status),
        })).then(() => {
            if(this.props.adminServer.updateServer.code === 'SUCCESS'){
                this.handleUpdateProModal();
                message.success('修改产品成功');
                setTimeout(()=>window.location.reload(),1000);
            }else{
                this.handleUpdateProModal();
                message.error('添加产品失败');               
            }
        })
    }
    /**
     * 显示更新产品对话框
     */
    showUpdateProModal = (e) => {
        this.props.form.setFieldsValue({
            _pro_id: e.id,
            _pro_categoryId: e.categoryId,
            _pro_name: e.name,
            _pro_description: e.description,
        })
        this.setState({
          visible1: true,
        });
        
      };
    /**
     * 关闭更新产品对话框
     */
    handleUpdateProModal = () => {
        this.setState({
         visible1: false,
        });
      };    
    /**
     * 添加微服务
    */
    addMicroServer = () => {
        let data = this.props.form.getFieldsValue();
        this.props.dispatch(addEntity({
            serverSubjectId: parseInt(data.subject_id),
            name: data.server_name,
            url: data.server_url,
            version: data.server_version,
            status: parseInt(data.server_status),
            description: data.server_desc
        })).then(() => {
            if(this.props.adminServer.addEntity.code === 'SUCCESS'){
                this.handleAddMicroServerModal();
                message.success('添加微服务成功');
                setTimeout(()=>window.location.reload(),1000);
            }else{
                this.handleAddMicroServerModal();
                console.log(data)
                message.error('添加微服务失败');             
            }
        })
    }
    /**
     * 显示添加微服务对话框
     */
    showAddMicroServerModal = (e) => {
        this.props.form.setFieldsValue({
            server_id: e.id
        })
        this.setState({
          visible2: true,
        });
        
      };
    /**
     * 关闭添加微服务对话框
     */
    handleAddMicroServerModal = () => {
        this.setState({
         visible2: false,
        });
      }; 

    /**
     * 显示微服务分类管理对话框
     */
    showSubjectModal = (e) => {
        this.setState({
          visible3: true,
          visible2:false,
        });
        
      };
    /**
     * 关闭微服务分类管理对话框
     */
    handleSubjectModal = () => {
        this.setState({
         visible3: false,
        });
      }; 
    /**
     * 添加微服务分类
     */
    addServerSubject = () => {
        let data = this.props.form.getFieldsValue();
        this.props.dispatch(addSubject({
            name: data.subject_name,
            serverId: data.server_id
        })).then(() => {
            if(this.props.adminServer.addSubject.code === 'SUCCESS'){
                message.success('添加微服务分类成功')
                setTimeout(()=>window.location.reload(),1000);
            }else{
                message.error('添加微服务分类失败');  
            }
        })
    }
    /**
     * 删除微服务分类
     */
    deleteServerSubject = (e) =>{
        this.props.dispatch(deleteSubject({
            ids: parseInt(e.id),
        })).then(() => {
            if(this.props.adminServer.deleteSubject.code === 'SUCCESS'){
                message.success('删除微服务分类成功')
                setTimeout(()=>window.location.reload(),1000);               
            }else{
                message.error('删除微服务分类失败');  
            }
        })
    }
    /**
     * 更新微服务分类
     */
    updateServerSubject = (e) =>{
        let data = this.props.form.getFieldsValue();
        this.props.dispatch(updateSubject({
            id: e.id,
            name: data._subject_name
        })).then(() => {
            if(this.props.adminServer.updateSubject.code){
                message.success('更新微服务分类成功')
                setTimeout(()=>window.location.reload(),1000);   
            }else{
                message.error('更新微服务分类失败');  
            }
        })
    }

    render(){
        
            const {getFieldDecorator}=this.props.form;
            const {category,dataSource}=this.state;
            const columns=[
                {
                    title:'产品',
                    key: 'name',
                    dataIndex:'name',
                },
                {
                    title:'描述',
                    key: 'description',
                    dataIndex:'description',
                },
                {
                    title: '产品编辑',
                    key: 'categoryId',
                    dataIndex: 'categoryId',
                    render:(text,record)=>{
                        return <div><Button onClick={()=>this.showUpdateProModal(record)}>修改</Button></div>
                    }
                },
                {
                    title:'微服务管理',
                    key: 'subjectManage',
                    render:(text,record)=>{
                        return <div><Button onClick = {() => this.showAddMicroServerModal(record)}>添加微服务</Button></div>
                    }
                }
            ]
            const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({
                        deleteData:`${selectedRowKeys}`
                    })
                
                },

                getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', 
                name: record.name,
                }),
            };
            /**微服务分类选框 */
            let subjectSelection = [];
            if(this.state.subject.length > 0){
                for(let i = 0;i < this.state.subject.length;i++){
                    subjectSelection.push(
                        <Option value={this.state.subject[i].id}>{this.state.subject[i].name}</Option>
                    )     
                }
            }

        return (
        <div>
            <Card title="产品管理"  >
            <div className="admin-categroy">
                <Tabs defaultActiveKey="1" type="card" onChange={this.getCurrCate}>
                    {
                        category.map((item,index)=>{
                            return  <TabPane tab={item.name} key={index} color='black'>
                                <header className="admin-server-head">
                                    <Button onClick={this.showAddProModal} type="primary" style={{background:'rgb(92, 184, 92)'}}>添加产品</Button>
                                    <Popconfirm placement="top" title={this.state.deleteData?`您确定删除选中的产品吗？`:
                                    `请选择要删除的产品`} onConfirm={this.deleteProduct} okText="确定" cancelText="取消">
                                    <Button type="primary" style={{marginLeft:'1%',backgroundColor:'rgb(217, 83, 79)'}}>删除</Button> 
                                    </Popconfirm>  
                                </header>
                                <article className="admin-server-content">
                                    <Table dataSource={this.state.dataSource}
                                            expandedRowRender={record => <AdminSubject serverid={record.id} /> } 
                                            columns={columns} pagination={false}
                                            rowSelection={rowSelection} />
                                </article>
                                <footer>
                                    <Pagination total= {(this.state.total / 5) * 10} defaultCurrent={1} onChange={this.getCurrPage} />
                                </footer>                                
                            </TabPane>})
                    }
                </Tabs>
            </div>
            </Card>
            {/** 添加产品对话框 */}
             <Modal
                title={"添加产品"}
                visible={this.state.visible}
                onOk={this.addProduct}
                onCancel={this.handleAddProModal}
                okText="提交"
                cancelText="取消"
                >
                    <Card>
                    <Form layout="horizontal">
                    <FormItem label="产品名称：">
                        {
                            getFieldDecorator('pro_name')
                            (<Input placeholder={"请输入产品名"}/>)
                        }
                    </FormItem>

                    <FormItem label="产品描述：">
                        {
                            getFieldDecorator('pro_description')
                            (<Input placeholder={"请输入对产品的描述"}/>)
                        }
                    </FormItem>

                    <FormItem label="产品状态">
                        {
                            getFieldDecorator('pro_status',{
                                initialValue:"2",
                            })(<Select style={{ width: 120 }}>
                                <Option value="1">close</Option>
                                <Option value="2">opened</Option>
                                <Option value="3">pending</Option>
                            </Select>)
                        }
                    </FormItem>
                    <FormItem label="产品分类id">
                        {
                            getFieldDecorator('pro_categoryId',{
                                initialValue:"1",
                            })(<Select style={{ width: 120 }}>
                                {
                                    category.map((item,index)=>{
                                        return  <Option value={index + 1} key={index}>
                                        {index + 1}
                                      </Option>
                                    })
                                }
                            </Select>)
                        }
                    </FormItem>
                    </Form>
                    </Card>
        </Modal>
            {/** 更新产品对话框 */}
            <Modal
                title={"修改产品"}
                visible={this.state.visible1}
                onOk={this.updateProduct}
                onCancel={this.handleUpdateProModal}
                okText="提交"
                cancelText="取消"
                >
                    <Card>
                    <Form layout="horizontal">
                    <FormItem label="产品id：">
                        {
                            getFieldDecorator('_pro_id')
                            (<Input placeholder={"请输入对产品的id"} disabled={true}/>)
                        }
                    </FormItem>

                    <FormItem label="产品名称：">
                        {
                            getFieldDecorator('_pro_name')
                            (<Input placeholder={"请输入产品名"}/>)
                        }
                    </FormItem>

                    <FormItem label="产品描述：">
                        {
                            getFieldDecorator('_pro_description')
                            (<Input placeholder={"请输入对产品的描述"}/>)
                        }
                    </FormItem>

                    <FormItem label="产品状态">
                        {
                            getFieldDecorator('_pro_status',{
                                initialValue:"2",
                            })(<Select style={{ width: 120 }}>
                                <Option value="1">close</Option>
                                <Option value="2">opened</Option>
                                <Option value="3">pending</Option>
                            </Select>)
                        }
                    </FormItem>

                    <FormItem label="产品分类id">
                        {
                            getFieldDecorator('_pro_categoryId',{
                                initialValue:"1",
                            })(<Select style={{ width: 120 }}>
                                {
                                    category.map((item,index)=>{
                                        return  <Option value={index + 1} key={index}>
                                        {index + 1}
                                      </Option>
                                    })
                                }
                            </Select>)
                        }
                    </FormItem>
                    </Form>
                    </Card>
        </Modal>  
            {/** 添加微服务对话框 */}
            <Modal
                title={"添加微服务"}
                visible={this.state.visible2}
                onOk={this.addMicroServer}
                onCancel={this.handleAddMicroServerModal}
                okText="提交"
                cancelText="取消"
                >
                    <Card>
                    <Form layout="horizontal">
                    <FormItem label="微服务产品分类：">
                        {
                            getFieldDecorator('subject_id')
                            (<Select style={{ width: 120 }}>
                                {subjectSelection}
                            </Select>
                            )
                        }
                            <Popover content='没找到想要的分类？试试微服务分类管理吧。'>
                            <Button style={{marginLeft:'50%'}} onClick={this.showSubjectModal}><Icon type="plus-circle" /></Button>
                            </Popover>
                    </FormItem>

                    <FormItem label="微服务名称：">
                        {
                            getFieldDecorator('server_name')
                            (<Input placeholder={"请输入微服务名称"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务接口地址：">
                        {
                            getFieldDecorator('server_url')
                            (<Input placeholder={"请输入微服务接口地址"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务版本：">
                        {
                            getFieldDecorator('server_version')
                            (<Input placeholder={"请输入微服务版本"}/>)
                        }
                    </FormItem>

                    <FormItem label="微服务状态：">
                    {
                            getFieldDecorator('server_status',{
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
                            getFieldDecorator('server_desc')
                            (<Input placeholder={"请输入微服务描述"}/>)
                        }
                    </FormItem>                    
                    </Form>
                    </Card>
        </Modal>    
            {/** 微服务分类管理对话框 */}
            <Modal
                title={"微服务分类管理"}
                visible={this.state.visible3}
                onCancel={this.handleSubjectModal}
                okText="提交"
                cancelText="取消"
                >
                    <Card>
                    <List
                        size="small"
                        bordered
                        dataSource={this.state.subject}
                        renderItem=
                        {item => 
                        <List.Item>
                            {item.name}
                            <span><Popconfirm placement="rightBottom" title={"你确定要删除这个分类么"} 
                            onConfirm={() => this.deleteServerSubject(item)} okText="确定" cancelText="取消">
                            <Icon type="delete" style={{ fontSize: '20px', color: '#D94A38', float:'right'}}  /></Popconfirm></span> 
                            
                            <span><Popconfirm placement="rightBottom" title={
                            <Form>
                            <FormItem>
                                {
                                    getFieldDecorator('_subject_name')
                                    (<Input placeholder={'请输入新的分类名称'}/>)
                                }
                            </FormItem>
                            </Form>
                            } 
                            onConfirm={() => this.updateServerSubject(item)} okText="确定" cancelText="取消">
                            <Icon type="edit" style={{ fontSize: '20px', color: '#08c',float:'right', marginRight:'5%'}}/></Popconfirm></span>
                        </List.Item>}
                        />
                        <Form style={{display:'inline-block'}}>
                        <FormItem>
                            {
                                getFieldDecorator('server_id')
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('subject_name')
                                (<Input style={{width:200,marginTop:5,marginRight:10}} placeholder="请输入要添加的分类名称"/>)
                            }
                        </FormItem>
                    </Form>
                      <Button type="primary" style={{background:'green'}} onClick={this.addServerSubject}><Icon type="plus"/>添加</Button>
                    </Card>
        </Modal>                    

        </div>)
    }
}
export default Form.create()(AdminServer);
