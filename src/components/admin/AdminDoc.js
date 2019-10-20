import React,{Component} from 'react';
import './AdminDoc.less' ;
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Card, Table, Modal, Form, Input,Icon,message,Popconfirm,Tooltip} from 'antd'
import AdminDoccatalog from "./AdminDoccatalog"

import {getDocument,upDocument,delDocument} from '../../redux/action/admin/adminDoc'

@connect(state=>({
    adminDoc:state.adminDoc
})
)
class AdminDoc extends Component{
    constructor(props){
        super(props);
        this.state = {
            changeDocModal:false,
            sourseData:[],
            docurl:''
        }
    }
    componentDidMount(){
        this.props.dispatch(getDocument(46,1,50))
        .then(()=>{
            //为每条数据添加key值
            this.props.adminDoc.document.pagingList.map((item)=>{
                item.key=item.id
            })
            this.setState({
                sourseData:this.props.adminDoc.document.pagingList
            })
        })
    }

    // 确认删除文档
    deleteDoc = (record) => {
        console.log(record)
        this.props.dispatch(delDocument({
            ids:record.serverId+''
        }))
        .then(()=>{
            if(this.props.adminDoc.deletedocument.code === 'SUCCESS'){
                message.success('删除文档成功');
                setTimeout(()=>window.location.reload(),1000);
            }else{
                message.error('删除文档失败');               
            }
        })
    }

    changeDoc = (record) => {
        console.log(record);
        this.props.form.setFieldsValue({
            _doc_id:record.id,
            _doc_name:record.name
        })
        this.setState({
            changeDocModal: true,
            docurl:record.url
        })
    };
    /**
     * 修改文档对话框
     */

    changeDocHandleOk = () => {
        const data=this.props.form.getFieldsValue();
        this.props.dispatch(upDocument({
            id:data._doc_id,
            // url:this.state.docurl,
            name:data._doc_name
        }))
        .then(()=>{
            if(this.props.adminDoc.updatadocument.code === 'SUCCESS'){
                message.success('修改文档成功');
                setTimeout(()=>window.location.reload(),1000);
            }else{
                message.error('添加文档失败');               
            }
        })
        this.setState({
            changeDocModal: false,
        });
    };

    changeDocHandleCancel = e => {
        this.setState({
            changeDocModal: false,
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns=[
            {title:'id',dataIndex:'id'},
            {title:"文档名",dataIndex:'name'},
            {title: 'serverId', dataIndex: 'serverId' },
            //{title: 'URL', dataIndex: 'url' },
            {
                title: '更多操作',
                render: (record)=>(
                <div>
                    <Tooltip title="修改" placement="top">
                  <span  style={{cursor:"pointer"}} onClick={()=>{this.changeDoc(record)}} >
                    <Icon type="edit" style={{ fontSize: '20px', color: '#08c' }}/></span>
                    </Tooltip>
                 <span >{/* onClick={} */}
                 <Popconfirm placement="topLeft" title={"你确定要删除这个文档么"} onConfirm={this.deleteCates} okText="确定" cancelText="取消">
                   <Icon type="delete" style={{ fontSize: '20px', color: '#D94A38', marginLeft:'5%'}}  /></Popconfirm></span> 
                </div>)
            }

        ];

        return(
            <div className="admin-doc">
                <Card title="文档管理">
                    <div style={{margin:'10px 0'}}>
                        <Link to='/admin/docedit/:data'>
                            <Button  onClick={this.addDocShowModal}>添加文档</Button>
                        </Link>
                        <Modal
                            title="修改文档"
                            visible={this.state.changeDocModal}
                            onOk={this.changeDocHandleOk}
                            onCancel={this.changeDocHandleCancel}
                            okText='确定'
                            cancelText='取消'
                        >
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('_doc_id', {
                                        rules: [{ required: true, message: '请输入要添加的文档ID!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                               placeholder="ID" disabled={true}/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('_doc_name', {
                                        rules: [{ required: true, message: '请输入要添加的文档名称!' }],
                                    })(
                                        <Input prefix={<Icon type="robot" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                               placeholder="名称" />
                                    )}
                                </Form.Item>
                                {/* <Form.Item>
                                    {getFieldDecorator('_doc_sketch', {
                                        rules: [{ required: true, message: '请输入要添加的文档简述!' }],
                                    })(
                                        <Input prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                               placeholder="简述" />
                                    )}
                                </Form.Item> */}
                                <Form.Item>
                                    <label>内容</label>
                                   
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.sourseData}
                        pagination={true} //是否要分页
                        expandedRowRender={record => <AdminDoccatalog serverid={record.id} />}
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}

export default Form.create()(AdminDoc);
