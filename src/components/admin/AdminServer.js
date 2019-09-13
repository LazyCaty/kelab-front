// 微服务管理页面
import React,{Component} from 'react';
import { Table,Button ,Popconfirm,Pagination,Card,Form,Input,Select,Modal,message,Tag} from 'antd';
import {connect} from 'react-redux'
import {getServe,addServe,deteleServer,getCategory,addCategory,deteleCate} from "../../redux/action/admin/adminServer";
import AdminSubject from './AdminSubject';
import EditorDemo from './BraftEditors';
import './AdminServer.less';
import {Link} from 'react-router-dom';

const FormItem=Form.Item;
const {Option} = Select;

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
            categroyShow:false,
        }
        this.objRef=React.createRef();
        this.cateArr=[]
    }
    
    componentWillMount(){
        this.props.dispatch(getCategory()).then(()=>{
            this.setState({
                category:this.props.adminServer.serverCatrgory.pagingList
            })
        })
    }
    
    componentDidMount() {

        this.props.dispatch(getCategory()).then(()=>{
            this.setState({
                category:this.props.adminServer.serverCatrgory.pagingList
            })    
            
            
        })
        // 获得分页
        this.props.dispatch(getServe(1,4)).then(()=>{
            // 为每条数据添加Key值
            this.props.adminServer.server.pagingList.map((item)=>{
                item.key=item.id;
            })
            this.setState({
                total:this.props.adminServer.server.total
            })
        
            this.setState({
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
            message.info("请选择您要删除的部分");
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

      changeCategory=()=>{
          this.setState({
              categroyShow:!this.state.categroyShow
          })
      }

      //提交分类
      submitCate=()=>{
          let _catename=this.objRef.current.state.value;
          console.log(_catename);
          this.props.dispatch(addCategory({name:_catename})).then(
            this.props.dispatch(getCategory()).then(()=>{
                this.setState({
                    category:this.props.adminServer.serverCatrgory.pagingList
                })
            })
          )
          this.changeCategory();
      }

      //删除分类
      DeleteCate=(ids)=>{
      
            this.props.dispatch(deteleCate({ids:ids})).then(
                this.props.dispatch(getCategory()).then(()=>{
                this.setState({
                    category:this.props.adminServer.serverCatrgory.pagingList
                })
            }))
            
      }

render(){
       
        const {getFieldDecorator}=this.props.form;
        const color=['magenta','orange','gold','lime','green','cyan','blue','geekblue','purple']
       const {category}=this.state;
        const columns=[
            {
                title:'产品',
                dataIndex:'name',
            },
            {
                title:'描述',
                dataIndex:'description',
            },
            {
                title: 'Tags',
                key: 'categoryId',
                dataIndex: 'categoryId',
                render: categoryId => (
                   
                  <span>
                      {
                          category.map((item,index)=>{
                              if(item.id==categoryId)
                              {
                                  console.log(item.id)
                                return <Tag color={color[(item.id-1)%9]} key={index}>
                                {item.name}
                              </Tag>
                              }
                          })
                      }
                  </span>
                ),
              },
            {
                title:'操作',
                dataIndex:'',
                render:(record)=>{
                    return <div ><Button onClick={()=>this.editorServer(record)}>编辑</Button> <Button>添加微服务</Button></div>
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
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

        return <div>
            <Card title="微服务管理"  >
                <header className="admin-server-head">
                    <Button onClick={this.changeCategory}>添加分类</Button>
                    <div className={this.state.categroyShow?'admin-categroy-block':'admin-categroy-hidden'}>  
                        <Input style={{width:200,marginTop:5,marginRight:10}} ref={this.objRef}/> <button onClick={this.submitCate}>提交</button>
                    </div>
                    <div className="admin-categroy">
                        {
                            category.map((item,index)=>{
                                return   <Popconfirm placement="top" title={`您确定删除${item.name}号服务吗？`}  key={index} onConfirm={()=>this.DeleteCate(item.id)} okText="Yes" cancelText="No">
                                <Tag color={color[(item.id-1)%9]}>
                                {item.name}
                              </Tag>
                              </Popconfirm>
                            })
                           
                    
                   
                        }
                    </div>
                    <hr />
                    <Button onClick={this.showModal}>添加服务</Button>
                    <Popconfirm placement="top" title={this.state.deleteData?`您确定删除${this.state.deleteData}号服务吗？`:`请选择要删除的服务`} onConfirm={this.DeleteDates} okText="Yes" cancelText="No">
                    <Button >删除</Button> 
                    </Popconfirm>
                   
                </header>
                <article className="admin-server-content">
                    <Table dataSource={this.state.dataSource}
                            expandedRowRender={record => <AdminSubject serverid={record.id} /> } 
                             columns={columns} pagination={false}
                             rowSelection={rowSelection} />

                </article>
                <footer>
                    <Pagination total={this.state.total}  defaultPageSize={4}   defaultCurrent={1} onChange={this.getCurrPage} />
                </footer>
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