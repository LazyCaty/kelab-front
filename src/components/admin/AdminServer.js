import React,{Component} from 'react';
import { Table,Card,Button ,Icon,Pagination} from 'antd';
import {connect} from 'react-redux'
import {getServe} from "../../redux/action/admin/adminServer";
import './AdminServer.less';
@connect(state=>({
        adminServer:state.adminServer
    })
)


class AdminServer extends Component{
    state={
        dataSource:[]
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

    render(){

        const columns=[
            {
                title:'服务',
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
                    return <div><Icon type="delete" />|<Icon type="setting" /></div>
                }
            }
        ]

        return <div>
            <Card title="微服务管理">
                <header className="admin-server-head">
                    <Button>添加服务</Button>
                </header>
                <article className="admin-server-content">
                    <Table dataSource={this.state.dataSource} columns={columns} pagination={false} />
                </article>
                <footer>
                    <Pagination total={6}  defaultPageSize={4}   defaultCurrent={1} onChange={this.getCurrPage} />
                </footer>
            </Card>
            {/**
             <div>
             <div className="admin-server-set">

             </div>
             <div className="admin-server-set-mask"></div>
             </div>*/}
        </div>

    }
}
export default AdminServer;