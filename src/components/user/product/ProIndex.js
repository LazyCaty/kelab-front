/*文档页面的索引*/
import React,{ Component } from 'react';
import './ProIndex.less';
import Footer from "../common/Footer";
import UserHead from "../common/UserHead"
import { Menu,  List, Avatar,Card,} from 'antd';
import {getServiceClass,getServiceSubject} from "../../../redux/action/user/product";
import {connect} from 'react-redux';


class ProIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            //导航栏index
            current: '6',
            //服务分类
            serviceClass: [],
            serviceSubject: [],
        }
    }

    /**
     * 组件加载完用于ajax请求
     */
    componentDidMount(){
        //获取服务分类
        this.props.dispatch(getServiceClass({
            page: 1,
            rows: 1
        })).then(() => {
            if(!!this.props.product.getServiceClass){
                console.log(this.props.product)
                if(this.props.product.getServiceClass.code === 'SUCCESS') {
                    this.setState({
                        serviceClass:this.props.product.getServiceClass.data.pagingList
                    })
                }
            }
        });

        //获取微服务项
        this.props.dispatch(getServiceSubject({
            page: 1,
            rows: 1,
        })).then(()=>{
            if(!!this.props.product.getServiceSubject){
                if(this.props.product.getServiceSubject.code === 'SUCCESS') {
                    this.setState({
                        serviceSubject:this.props.product.getServiceSubject.data.pagingList
                    })
                    console.log(this.state.serviceSubject)
                }
            }
        })
    }

    /**
     * 导航栏索引切换
     * @param e
     */
    navChange = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render(){
/*        const data = [
            {
                id:1,
                avatar:'https://i.loli.net/2019/05/01/5cc9a551c68a3.png',
                title: '语言处理',
                children:[
                    <div className="proIndex-linkList"><a>中文分析</a></div>,
                    <div className="proIndex-linkList"><a>词性标注</a></div>,
                    <div className="proIndex-linkList"><a>命名实体识别</a></div>,
                    <div className="proIndex-linkList"><a>依存句法分析</a></div>,
                ]
            },
            {
                id:2,
                avatar:'https://i.loli.net/2019/05/01/5cc9a7552dfde.png',
                title: '语言分析',
                children:[
                    <div className="proIndex-linkList"><a>关键词抽取</a></div>,
                    <div className="proIndex-linkList"><a>自动摘要</a></div>,
                    <div className="proIndex-linkList"><a>主题检测</a></div>,
                    <div className="proIndex-linkList"><a>情感分析</a></div>,
                    <div className="proIndex-linkList"><a>词法相似度分析</a></div>,
                    <div className="proIndex-linkList"><a>文本相似度计算</a></div>,
                    <div className="proIndex-linkList"><a>word2vect语言表示模型</a></div>,
                    <div className="proIndex-linkList"><a>BERT语言表示模型</a></div>,
                ]
            },
            {
                id:3,
                avatar:'https://i.loli.net/2019/05/01/5cc9a7fb80b5f.png',
                title: '云平台API',
                children:[
                    <div className="proIndex-linkList"><a>讯飞</a></div>,
                    <div className="proIndex-linkList"><a>腾讯文智</a></div>,
                    <div className="proIndex-linkList"><a>阿里云</a></div>,
                    <div className="proIndex-linkList"><a>百度云</a></div>,
                ]
            },
            {
                id:4,
                avatar:'https://i.loli.net/2019/05/01/5cc9a8bf3129c.png',
                title: '算法资源',
                children:[
                    <div className="proIndex-linkList"><a>分类</a></div>,
                    <div className="proIndex-linkList"><a>回归</a></div>,
                    <div className="proIndex-linkList"><a>聚类</a></div>,
                    <div className="proIndex-linkList"><a>降维</a></div>,
                    <div className="proIndex-linkList"><a>概率图模型</a></div>,
                    <div className="proIndex-linkList"><a>文本挖掘</a></div>,
                    <div className="proIndex-linkList"><a>优化</a></div>,
                    <div className="proIndex-linkList"><a>深度学习</a></div>
                ]
            },
        ];*/
        //生成具体微服务项信息
        let listInfo = [];
        for(let i = 0;i < this.state.serviceSubject.length;i++)
        {
            listInfo.push({
                id: this.state.serviceSubject[i].id.toString(),
                serverId: this.state.serviceSubject[i].serverId.toString(),
                //！！！可能导致分类和服务不匹配的bug
                serverName: this.state.serviceClass[i].name,
            })
        }
        //生成具体微服务项数据
        let listData = [];
        for(let i = 0;i < this.state.serviceSubject.length;i++)
        {
            listData.push(
                <div className="proIndex-linkList"><a>{this.state.serviceSubject[i].name}</a></div>
            )
        }
        //生成导航栏数据
        let menuData = [];
        for(let i = 0;i < this.state.serviceClass.length;i++)
        {
            let key = this.state.serviceClass[i].id.toString();
            let href = '#' + key;
            let name = this.state.serviceClass[i].name;
            menuData.push(
                <Menu.Item key={key}><a href={href}>{name}</a></Menu.Item>
            )
        }
        return(

            <div className="proIndex">
                <div className="proIndex-header">
                    <UserHead />
                </div>
                <div className="proIndex-content">
                    <Menu
                        theme={this.state.theme}
                        onClick={this.navChange}
                        style={{ width: 256 }}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                        className="proIndex-menuNav"
                    >
                        {menuData}
{/*                        <Menu.Item key="1"><a href="#1">语言处理</a></Menu.Item>
                        <Menu.Item key="2"><a href="#2">语言分析</a></Menu.Item>
                        <Menu.Item key="3"><a href="#3">云平台API</a></Menu.Item>
                        <Menu.Item key="4"><a href="#4">算法资源演示</a></Menu.Item>*/}
                    </Menu>
                    <div className="proIndex-dataList">
                        <List
                            itemLayout="horizontal"
                            dataSource={listInfo}
                            renderItem={item => (
                                <List.Item id={item.serverId}>
                                    <List.Item.Meta
/*                                        avatar={<Avatar src={item.avatar} alt={"图片加载失败"}/>}*/
                                        title={<strong>{item.serverName}</strong>}
                                        description=""
                                    />
                                    <Card style={{ width: 850 }}>
                                        {listData}
                                    </Card>,
                                </List.Item>
                            )}
                        />
                    </div>
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
   return {product:state.product};
};
ProIndex = connect(mapStateToProps)(ProIndex);
export default ProIndex;
