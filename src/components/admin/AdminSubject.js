import React,{Component} from 'react';
import {Table,Button,Popover} from 'antd';
import {connect} from 'react-redux';
import {getSubject} from '../../redux/action/admin/adminServer';
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
            total:0
        }
    }


    componentDidMount() {
        this.props.dispatch(getSubject(this.state.page,4,this.props.serverid)).then(()=>{
            console.log(this.props)
            this.setState({
                dataSource:this.props.adminServer.severSubject.pagingList,
                total:this.props.adminServer.severSubject.total
            })
        })
    }

    render(){
     
        const columns=[
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
            },
            {
                title:'微服务',
                dataIndex:'name',
                key:'name',
            },
            {
                title:'Action',
                dataIndex:'',
                key:'action',
                render: () => <div><Button>编辑</Button>  <Button>删除</Button>  <Button>添加版本</Button></div>,
            }
        ]

        const pagination = {
            total: this.state.total|| 0,
            onChange: function(cur) {
                this.setState({
                    page: cur,
                });
                //pageConfig['page'] = cur;
                this.props.dispatch(getSubject(this.state.page,2,6)).then(()=>{
                    this.setState({
                        dataSource:this.props.severSubject.severSubject.pagingList
                    })
                })
            }.bind(this),
        };

        return  <Table
            columns={columns}
            pagination={pagination}
            dataSource={this.state.dataSource}
        />


    }
}
export default AdminSubject;