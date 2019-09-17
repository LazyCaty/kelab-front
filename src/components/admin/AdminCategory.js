import React from 'react'
import { Table,Card,Button,Icon,Input ,message,Modal,Popconfirm} from 'antd';
import './AdminCategory.less';
import { connect } from 'react-redux';
import {getCategory,addCategory,deteleCate,changeCategory} from '../../redux/action/admin/admincategory';

@connect((state)=>({
  category:state.category
}))

class AdminCategory extends React.Component {
  constructor()
  {
    super();
    this.state={
      categoryList:[],
      totalData:0,
      deteleDatas:"",
      visible1:false,
      setData:''
    }
    this.objRef=React.createRef();
    this.objRefSet=React.createRef();
  }
    
    componentDidMount(){
      this.props.dispatch(getCategory()).then(()=>{
          this.setState({
              categoryList:this.props.category.serverCatrgory.pagingList,
              totalData:this.props.category.serverCatrgory.total
          })
      })
    }

    //提交分类
    submitCate=()=>{
      let _catename = this.objRef.current.state.value;
      this.props.dispatch(addCategory({name:_catename}));
      if(_catename != undefined){
        message.success('添加分类成功');
        setTimeout(()=>window.location.reload(),1000);
      } else{
        message.error('输入内容不能为空')
      } 
    }

    checkDelete(ids){
        this.setState({
          deteleDatas:ids
        })
      }
    //删除分类
    deleteCates=()=>{
      if(this.state.deteleDatas){
        this.props.dispatch(deteleCate({ids:this.state.deteleDatas}))
          message.success('删除分类成功');
          setTimeout(()=>window.location.reload(),1000);
      }else{
          message.info("请选择您要删除的部分");
      }
    }

    setCate=(id)=>{
      this.setState({
        setData:id
      })
      this.showModal1();
    }
    //修改分类
    changeCate=()=>{
      let _catename=this.objRefSet.current.state.value;
      this.props.dispatch(changeCategory({name:_catename,id:this.state.setData}))
      if(_catename != undefined){
        message.success('修改分类成功');
        this.hideModal1();
        setTimeout(()=>window.location.reload(),1000);
      } else{
        message.error('输入内容不能为空')
      }
    }

    /**
     * 更改分类对话框
     */
    showModal1 = () => {
      this.setState({
        visible1: true,
      });
    };

    hideModal1 = () => {
      this.setState({
        visible1: false,
      });
    };

    render () {
        const columns = [
            {
              title: 'ID',
              dataIndex: 'key',            
            },
            {
              title: '分类名称',
              dataIndex: 'name',
            },
            {
              title: '更多操作',
              render: (record)=>(
              <div>
                <span className={{marginLeft:20}} onClick={()=>this.setCate(record.id)}>
                  <Icon type="edit" style={{ fontSize: '20px', color: '#08c' }}/></span>
               <span onClick={()=>this.checkDelete(record.id)}>
               <Popconfirm placement="rightBottom" title={"你确定要删除这个分类么"} onConfirm={this.deleteCates} okText="确定" cancelText="取消">
                 <Icon type="delete" style={{ fontSize: '20px', color: '#D94A38', marginLeft:'5%'}}  /></Popconfirm></span> 
              </div>)
            },
          ];  
        /**列表索引 */  
        const {categoryList} = this.state;
        if(categoryList.length != 0){
          for(let i = 0;i < categoryList.length;i++){
            categoryList[i].key = i + 1;
          }
        } 

        return (
            <div className="admin-category-home">
                <Card title="分类管理">
                    <div className="admin-categroy-head">
                      <Input style={{width:200,marginTop:5,marginRight:10}} ref={this.objRef} placeholder="请输入产品的名称"/>
                      <Button type="primary" style={{background:'green'}} onClick={this.submitCate}><Icon type="plus" />添加</Button>
                      <div className="categroy-head-right">共有 {this.state.totalData} 条数据</div>
                    </div>
                <Table  columns={columns} dataSource={categoryList} />
                </Card>
                <Modal
                  title="修改分类"
                  visible={this.state.visible1}
                  onOk={this.changeCate}
                  onCancel={this.hideModal1}
                  okText="提交"
                  cancelText="取消"
                >
                  <div>
                    <Card>
                    <Input ref={this.objRefSet} placeholder="请输入产品的新名称"/>
                    </Card>
                  </div>
                </Modal>
            </div>
        )

    }

}

export default AdminCategory;