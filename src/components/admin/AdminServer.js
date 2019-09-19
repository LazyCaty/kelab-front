// 微服务管理页面
import React,{Component} from 'react';
import { Table,Button ,Popconfirm,Pagination,Card,Form,Input,Select,Modal,message,Tag,Tabs} from 'antd';
import {connect} from 'react-redux'
import {getServe,addServe,deteleServer,getCategory,addCategory,deteleCate} from "../../redux/action/admin/adminServer";
import AdminSubject from './AdminSubject';
import EditorDemo from './BraftEditors';
import './AdminServer.less';
import {Link} from 'react-router-dom';

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
            dataSource:[],
            total:0,
            visible:false, // 添加微服务版本弹框
            nowEdit:{},
            editFlag:-1, //判断是添加服务还是修改服务
            editTitle:"添加",
            category:[],
            deleteData:'',
            cateChShow:false,
            categoryId: 1,
        }
        this.objRef=React.createRef();
        this.cateArr=[]
    }
    
    componentDidMount() {

        this.props.dispatch(getCategory()).then(()=>{
            this.setState({
                category:this.props.adminServer.serverCatrgory.pagingList
            })    
            
            
        })
        // 获得分页
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
     * 获取当前分类页
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
    getCurrPage=(page)=>{
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
    deleteProduct=()=>{
        if(this.state.deleteData)
        {
            this.props.dispatch(deteleServer({ids:this.state.deleteData}))
            message.success('删除产品成功');
            setTimeout(()=>window.location.reload(),1000);
        }else{
            message.error("请选择您要删除的删除");
        }
    }

    /**
     * 提交添加服务
     */
    addProduct = () =>{
        let data = this.props.form.getFieldsValue();
        console.log(data)
        this.props.dispatch(addServe({
            name: data.pro_name,
            description: data.pro_description,
            status: data.pro_status,
            categoryId: data.pro_categoryId,
        }))        
        this.handleAddProModal();
        message.success('添加产品成功');
        setTimeout(()=>window.location.reload(),1000);
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
    handleAddProModal =(f)=> {
        this.setState({
         visible: false,
        });
      };

    editorServer=(record)=>{
          this.setState({
            nowEdit:record,
            editFlag:record.id,
            editTitle:'修改'
          })
          this.showModal();    
      }

    addServe=()=>{
        this.setState({
            nowEdit:{},
            editFlag:-1,
            editTitle:'添加'
          })
          this.showModal();
      }

    catechShow=()=>{
        this.setState({
            cateChShow:!this.state.cateChShow
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
                    render:(record)=>{
                        return <div><Button onClick={()=>this.editorServer(record)}>修改</Button></div>
                    }
                },
                {
                    title:'微服务管理',
                    key: 'subjectManage',
                    render:(record)=>{
                        return <div><Button>添加微服务</Button></div>
                    }
                }
            ]
            /**表格数据来源 */
            let categoryData = [];
            for(let i = 1;i <= category.length;i++){
                categoryData[i] = [];
                for(let j = 0;j < dataSource.length;j++){
                    if(dataSource[j].categoryId === i){
                            categoryData[i].push(dataSource[j])
                    }
                }
            }
/*             console.log(categoryData) */

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

        return <div>
            <Card title="微服务管理"  >
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
                                    <Table dataSource={categoryData[index + 1]}
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
                title={this.state.editTitle+"产品"}
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


        </div>

    }
}
export default Form.create()(AdminServer);