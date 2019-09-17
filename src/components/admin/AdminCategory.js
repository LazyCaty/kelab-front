import React from 'react'
import { Table,Card,Button,Icon,Input ,message,Modal} from 'antd';
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
      visible: false,
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
    let _catename=this.objRef.current.state.value;
    console.log(_catename);
    this.props.dispatch(addCategory({name:_catename})).then(
 
    
    )
    
}
checkDelete(ids)
{
  this.setState({
    deteleDatas:ids
  })
  this.showModal();
}
//删除分类
  deleteCates=()=>{
    this.hideModal();
  if(this.state.deteleDatas)
        {
           this.props.dispatch(deteleCate({ids:this.state.deteleDatas})).then() 
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
  this.hideModal1();
  
  let _catename=this.objRefSet.current.state.value;

    console.log(_catename,this.state.setData);
    this.props.dispatch(changeCategory({name:_catename,id:this.state.setData})).then(
 
    
    )
}

showModal = () => {
  this.setState({
    visible: true,
  });
};

hideModal = () => {
  this.setState({
    visible: false,
  });
};

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
      const {categoryList,totalData,deteleDatas}=this.state;
        const columns = [
            {
              title: 'ID',
              dataIndex: 'id',
            
            },
            {
              title: 'name',
              dataIndex: 'name',
            },
            {
              title: 'actiom',
              render: (record)=>(
              <div>
               <span onClick={()=>this.checkDelete(record.id)}><Icon type="delete" style={{ fontSize: '20px', color: '#D94A38' }}  /></span> <span className={{marginLeft:20}} onClick={()=>this.setCate(record.id)}><Icon type="edit" style={{ fontSize: '20px', color: '#08c' }}/></span>
              </div>)
            },
          ];
          
         
          

        return (
            <div className="admin-category-home">
                <Card title="分类管理">
                    <div className="admin-categroy-head">
                    <Input style={{width:200,marginTop:5,marginRight:10}} ref={this.objRef}/><Button type="primary" style={{background:'green'}} onClick={this.submitCate}><Icon type="plus" />添加</Button>  <em/>
                     
                        <div className="categroy-head-right">共有 {totalData} 条数据</div>
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
                    <Input ref={this.objRefSet} />
                    </Card>
                  </div>
                </Modal>
                <Modal
                  visible={this.state.visible}
                  onOk={this.deleteCates}
                  onCancel={this.hideModal}
                  okText="确认"
                  cancelText="取消"
                >
                  <p>您确认删除{deteleDatas}</p>
        </Modal>
            </div>
        )

    }

}

export default AdminCategory;