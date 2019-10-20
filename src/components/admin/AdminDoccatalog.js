import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Button, Card, Table, Modal, Form, Input,Icon,Select,Popconfirm} from 'antd'

const FormItem=Form.Item;
const {Option} = Select;
@connect(state=>({
    
})
)
class AdminDoccatalog extends Component{
    render(){
        const {getFieldDecorator}=this.props.form;
        /**table数据格式 */
        const columns=[
            {
                title:'ID',
                dataIndex:'index',
                key:'id',
            },
             
            {
                title: '更多操作',
                render: (item,record)=>(
                <div>
                  <span  style={{cursor:"pointer"}}>
                    <Icon type="edit" style={{ fontSize: '20px', color: '#08c' }}/></span>
                 <span>
                 <Popconfirm placement="rightBottom" title={"你确定要删除么"} okText="确定" cancelText="取消" >
                   <Icon type="delete" style={{ fontSize: '20px', color: '#D94A38', marginLeft:'10%'}}  /></Popconfirm></span> 
                </div>)
              },
        ]
  

    return(
        <div>
        <Table
            columns={columns}
        
        />
        </div>
    )
    }
}
export default Form.create()(AdminDoccatalog)