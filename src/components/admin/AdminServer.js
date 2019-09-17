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
        this.props.dispatch(getServe(1,5)).then(()=>{
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

    getCurrPage=(page, pageSize)=>{
        this.props.dispatch(getServe(page,pageSize)).then(()=>{
             // 为每条数据添加Key值
             this.props.adminServer.server.pagingList.map((item)=>{
                item.key=item.id;
            })
            this.setState({
                dataSource:this.props.adminServer.server.pagingList
            })
        })
    }

    // 删除服务
    DeleteDates=()=>{
        if(this.state.deleteData)
        {
            this.props.dispatch(deteleServer({ids:this.state.deleteData})).then(()=>{ })
        }else{
            message.error("请选择您要删除的删除");
        }
    }

    changeButton=()=>{
        this.setState({
            buttonState:!this.state.buttonState
        })
    }

    //提交添加服务
    SubmitForm=()=>{
        let formInformation=this.props.form.getFieldsValue();
        console.log("formInformation:",formInformation);
        if(this.state.editFlag!=-1)
        {
            formInformation={...formInformation,id:this.state.editFlag};
        }
        this.props.dispatch(addServe(formInformation)).then(()=>{
                this.setState({
                    nowEdit:{},
                    editFlag:-1,
                    editTitle:'添加'
                })
            });
        
        
        this.handleOk();

    }

    //弹出框控制
    showModal = () => {
        this.setState({
          visible: true,
        });
        
      };
    
      handleOk =(f)=> {
        this.setState({
         visible: false,
        });
      };
    
      handleCancel = (f) => {
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
                <Tabs defaultActiveKey="1" type="card">
                    {
                        category.map((item,index)=>{
                            return  <TabPane tab={item.name} key={index} color='black'>
                                <header className="admin-server-head">
                                    <Button onClick={this.showModal} type="primary" style={{background:'rgb(92, 184, 92)'}}>添加产品</Button>
                                    <Popconfirm placement="top" title={this.state.deleteData?`您确定删除选中的产品吗？`:
                                    `请选择要删除的产品`} onConfirm={this.DeleteDates} okText="确定" cancelText="取消">
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
                                    <Pagination total= {50} defaultCurrent={1} onChange={this.getCurrPage} />
                                </footer>                                
                            </TabPane>})
                    }
                </Tabs>
            </div>
            </Card>

             <Modal
                title={this.state.editTitle+"产品"}
                visible={this.state.visible}
                onOk={this.SubmitForm}
                onCancel={this.handleCancel}
                okText="提交"
                cancelText="取消"
                >
                    <Card>

                    <Form layout="horizontal">
                    <FormItem label="产品名称：">
                        {
                            getFieldDecorator('name',{
                                initialValue:this.state.nowEdit.name,
                            })(<Input placeholder={"请输入产品名"}/>)
                        }
                    </FormItem>

                    <FormItem label="产品描述：">
                        {
                            getFieldDecorator('description',{
                                initialValue:this.state.nowEdit.description,
                            })(<Input placeholder={"请输入对产品的描述"}/>)
                        }
                    </FormItem>


                    <FormItem label="产品状态">
                        {
                            getFieldDecorator('status',{
                                initialValue:"2",
                            })(<Select style={{ width: 120 }}>
                                <Option value="1">close</Option>
                                <Option value="2">opened</Option>
                                <Option value="3">pending</Option>
                            </Select>)
                        }
                    </FormItem>
                    <FormItem label="产品标签">
                        {
                            getFieldDecorator('categoryId',{
                                initialValue:"1",
                            })(<Select style={{ width: 120 }}>
                                {
                                    category.map((item,index)=>{
                                        return  <Option value={item.id} key={index}>
                                        {item.name}
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