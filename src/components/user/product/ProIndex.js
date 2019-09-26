/*文档页面的索引*/
import React,{ Component } from 'react';
import './ProIndex.less';
import Footer from "../common/Footer";
import UserHead from "../common/UserHead"
import { Menu,  List, Tabs,Card,Pagination} from 'antd';
import {getServiceClass,getService} from "../../../redux/action/user/proIndex";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

const { TabPane } = Tabs;

class ProIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            //产品分类
            serviceClass: [],
            //产品
            service: [],
            //产品数据数量
            total: 0,
            //产品分类id
            categoryId: 1,
            
        }
    }

    /**
     * 组件加载完用于ajax请求
     */
    componentDidMount(){
        //获取服务分类
        this.props.dispatch(getServiceClass({
            page: 1,
            rows: 10,
        })).then(() => {
            if(!!this.props.proIndex.getServiceClass){
                if(this.props.proIndex.getServiceClass.code === 'SUCCESS') {
                    this.setState({
                        serviceClass: this.props.proIndex.getServiceClass.data.pagingList
                    })
                }
            }
        });

        //获取微服务项
        this.props.dispatch(getService({
            page: 1,
            rows: 5,
            categoryId: this.state.categoryId,
        })).then(()=>{
            if(!!this.props.proIndex.getService){
                if(this.props.proIndex.getService.code === 'SUCCESS') {
                    this.setState({
                        service: this.props.proIndex.getService.data.pagingList,
                        total: this.props.proIndex.getService.data.total,
                    });
                }
            }
        })
    }
    /**
     * 获取新一页微服务项
     */
    updatePage = (page) => {
         this.props.dispatch(getService({
            page: page,
            rows: 5,
            categoryId: this.state.categoryId,
        })).then(()=>{
            if(!!this.props.proIndex.getService){
                if(this.props.proIndex.getService.code === 'SUCCESS') {
                    this.setState({
                        service: this.props.proIndex.getService.data.pagingList
                    });
                }
            }
        })           
    }
    /**
     * 获取当前分类页面的产品
     */
    getCurrCate = (e) => {
        this.props.dispatch(getService({
            page: 1,
            rows: 5,
            categoryId: e,
        })).then(()=>{
            if(!!this.props.proIndex.getService){
                if(this.props.proIndex.getService.code === 'SUCCESS') {
                    this.setState({
                        service: this.props.proIndex.getService.data.pagingList,
                        categoryId: e,
                        total: this.props.proIndex.getService.data.total,
                    });
                }
            }
        })          

    } 

    render(){
        //获取当前状态的值
        let serviceClass = this.state.serviceClass;
        let service = this.state.service;
        //生成具体微服务项信息
        let listInfo = [];
        for(let i = 0;i < service.length;i++)
        {
            listInfo.push({
                id: service[i].id.toString(),
                categoryId: service[i].categoryId.toString(),
                name: service[i].name,
                description: service[i].description,
                status: service[i].status,
                doc: '/product/document/#' + service[i].id.toString(),
                reproduction: 'reproduction/nlp/#' + service[i].categoryId.toString()
            })
        }
        console.log(listInfo)
        return(

            <div className="proIndex">
                <div className="proIndex-header">
                    <UserHead />
                </div>
                <div className="proIndex-content">
                <Tabs defaultActiveKey="1" tabPosition="left" onChange={this.getCurrCate}>
                    {
                        serviceClass.map((items,index) => {
                            return <TabPane tab={items.name} key={index + 1}>                          
                                        <div className="proIndex-dataList">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={listInfo}
                                            renderItem={item => (
                                                <List.Item id={item.categoryId}>
                                                    <List.Item.Meta
                                                        description=""
                                                    />
                                                    <Card style={{ width: 850 }} title={item.name}>
                                                        {item.description}
                                                        <div className="proIndex-dataList-link">
                                                        <span><Link to={item.doc}>产品文档</Link>&nbsp;&nbsp;&nbsp;
                                                        <Link to={item.reproduction}>产品演示</Link></span>
                                                        </div>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                    <Pagination defaultCurrent={1} total= {(this.state.total / 5) * 10} onChange={this.updatePage}/>
                                </TabPane>
                        })
                    }
                </Tabs>

                </div>
                <div className="proIndex-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}
//组件和状态关联
const mapStateToProps = state => {
   return {proIndex:state.proIndex};
};
ProIndex = connect(mapStateToProps)(ProIndex);
export default ProIndex;
