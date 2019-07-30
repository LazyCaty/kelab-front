import React,{Component} from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import {getSubject} from '../../redux/action/admin/adminServer';
@connect(state=>({
    severSubject:state.adminServer
    })
)

class AdminSubject extends Component{
    state={
        dataSource:[],
        page:1,
        total:0
    }
    componentDidMount() {

        this.props.dispatch(getSubject(this.state.page,4,this.props.serverid)).then(()=>{
            console.log("sever",this.props.severSubject.severSubject.total);
            this.setState({
                dataSource:this.props.severSubject.severSubject.pagingList,
                total:this.props.severSubject.severSubject.total
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
                title:'name',
                dataIndex:'name',
                key:'name',
            },
            {
                title:'Action',
                dataIndex:'',
                key:'action',
                render: () => <a href="javascript:;">Delete</a>,
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