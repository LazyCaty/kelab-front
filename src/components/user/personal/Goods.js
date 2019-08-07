import React,{Component} from 'react';
import './AccountInfo.less'
import UserHead from '../common/UserHead';
import Footer from '../common/Footer';
import NavMenu from './NavMenu';
import './Goods.less'
import {Button, Card, Icon, Input, Modal, Table} from 'antd'
import {Form} from "antd/lib/form";
import EditorDemo from "../../admin/BraftEditors";


class Goods extends Component{
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        const data = [{
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
            }];

        const columns=[
            {title:'产品id',dataIndex:'id'},
            {title:"产品名",dataIndex:'name'},
            { title: '开始时间', dataIndex: 'startTime' },
            { title: '结束时间', dataIndex: 'endTime' },
            {title:'产品演示',dataIndex:'reproduction'},
            {title:'产品文档',dataIndex:'document'},
            {
                dataIndex: 'revise',
                render: (text, record) => {
                    return(
                        <Button>续费</Button>
                    )
                }
            },

        ];

        return(
            <div className="goods">
                <div className="goods-header">
                    <UserHead />
                </div>
                <div className="goods-content">
                    <NavMenu />
                    <div className="goods-list">
                        <Card title="已购产品">
                            <Table
                                bordered
                                columns={columns}
                                dataSource={data}
                                pagination={true} //是否要分页
                            >
                            </Table>
                        </Card>
                    </div>
                </div>
                <div className="goods-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Goods;