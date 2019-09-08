// 微服务管理页面
import React,{Component} from 'react';
import { Table,Button ,Popconfirm,Pagination,Card,Form,Input,Select,Modal,message,Tag} from 'antd';
import {connect} from 'react-redux'
import {getServe,addServe,deteleServer} from "../../redux/action/admin/adminServer";
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
  state={
            dataSource:[],
            total:0,
            buttonState:false, // 添加按钮是否点击
            visibleSer: false, // 添加产品弹框
            visibleSub:false, // 添加微服务弹框
            visibleV:false, // 添加微服务版本弹框
            nowEdit:{},
            editFlag:-1, //判断是添加服务还是修改服务
            editTitle:"添加",
        }
    
    
    componentDidMount() {
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
    // 获得分页
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
        //console.log(this.state.deleteData);

        if(this.state.deleteData)
        {
         
            

            this.props.dispatch(deteleServer({ids:this.state.deleteData})).then(()=>{
                
            })
        }else{
            message.info("请选择您要删除的部分");
        }
       
    }

    changeButton=()=>{
        this.setState({
            buttonState:!this.state.buttonState
        })
    }
    //提交
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
        
        
        this.handleOk("Ser");

    }
    //弹出框控制
    showModal = (f) => {
        let _visible="visible"+f;
        this.setState({
          [_visible]: true,
        });
        
      };
    
      handleOk =(f)=> {
      
        let _visible="visible"+f;
        this.setState({
         [_visible]: false,
        });
      };
    
      handleCancel = (f) => {
        
       let _visible="visible"+f;
        this.setState({
          [_visible]: false,
        });
      };
      editorServer=(record)=>{
          this.setState({
            nowEdit:record,
            editFlag:record.id,
            editTitle:'修改'
          })
          this.showModal("Ser");
            
      }
      addServe=()=>{
        this.setState({
            nowEdit:{},
            editFlag:-1,
            editTitle:'添加'
          })
          this.showModal("Ser");
      }

    render(){
        const {getFieldDecorator}=this.props.form;
        const color=['语言分析','自然语言',"没有分类"];
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
                        <Tag color={"geekblue"} key={categoryId}>
                          {color[categoryId]}
                        </Tag>
                   
                  </span>
                ),
              },
            {
                title:'操作',
                dataIndex:'',
                render:(record)=>{
                    return <div ><Button onClick={()=>this.editorServer(record)}>编辑</Button> <Button onClick={()=>this.showModal("Sub")}>添加微服务</Button></div>
                }
            }
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                
                this.setState({
                    deleteData:`${selectedRowKeys}`
                })
                   
                
             // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
             
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

        return <div>
            <Card title="微服务管理"  >
                <header className="admin-server-head">
                    <Button onClick={()=>this.showModal("Ser")}>添加服务</Button>
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
                visible={this.state.visibleSer}
                onOk={()=>this.SubmitForm("Ser")}
                onCancel={()=>this.handleCancel("Ser")}
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
                                <Option value="1">自然语言</Option>
                                <Option value="2">自然语言</Option>
                                <Option value="3">没有分类</Option>
                            </Select>)
                        }
                    </FormItem>
                    </Form>

                    </Card>
        </Modal>

        <Modal
                title={this.state.editTitle+"微服务"}
                visible={this.state.visibleSub}
                onOk={()=>this.handleOk("Sub")}
                onCancel={()=>this.handleCancel("Sub")}
                okText="提交"
                cancelText="取消"
                >
                    <Card>

                    <Form layout="horizontal">
                    <FormItem label="微服务名称：">
                        {
                            getFieldDecorator('name',{
                                initialValue:"",
                            })(<Input placeholder={"请输入微服务名"}/>)
                        }
                    </FormItem>
                    <FormItem label="服务状态">
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
                    </Form>

                    </Card>
        </Modal>
        </div>

    }
}
export default Form.create()(AdminServer);