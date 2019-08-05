import React,{Component} from 'react';
import './AdminDoc.less' ;
import {Button, Card, Table, Modal, Form, Input,Icon} from 'antd'
import EditorDemo from './BraftEditors';

class AdminDoc extends Component{
    constructor(props){
        super(props);
        this.state = {
            addDocModal: false
        }
    }

    /**
     * 添加文档对话框
     */
    showModal = () => {
        this.setState({
            addDocModal: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            addDocModal: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            addDocModal: false,
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const columns=[
            {title:'id',dataIndex:'id'},
            {title:"文档名",dataIndex:'name'},
            { title: '简述', dataIndex: 'des' },
            { title: '时间', dataIndex: 'time' },
            {
                dataIndex: 'revise',
                render: () => <a href="javascript:;">修改</a>,
            },
            {
                dataIndex: 'delete',
                render: () => <a href="javascript:;">删除</a>,
            }

        ];

        const data = [
            {
                id: 1,
                name:'test',
                des:'some description',
                time:'2019/8/5',
            },
            {
                id: 2,
                name:'test2',
                des:'some description',
                time:'2019/8/5',
            },
            {
                id: 3,
                name:'test3',
                des:'some description',
                time:'2019/8/5',
            }
        ];
        return(
            <div className="admin-doc">
                <Card title="文档管理">
                    <div style={{margin:'10px 0'}}>
                        {/**/}
                        <Button  onClick={this.showModal}>添加文档</Button>
                        <Modal
                            title="添加文档"
                            visible={this.state.addDocModal}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText='确定'
                            cancelText='取消'
                        >
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('文档ID', {
                                        rules: [{ required: true, message: '请输入要添加的文档ID!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                               placeholder="ID" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('文档名称', {
                                        rules: [{ required: true, message: '请输入要添加的文档名称!' }],
                                    })(
                                        <Input prefix={<Icon type="robot" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                               placeholder="名称" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('文档简述', {
                                        rules: [{ required: true, message: '请输入要添加的文档简述!' }],
                                    })(
                                        <Input prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                               placeholder="简述" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>内容</label>
                                    <EditorDemo />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={data}
                        pagination={true} //是否要分页
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}

export default Form.create()(AdminDoc);
