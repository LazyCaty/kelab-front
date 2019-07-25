/*演示页面的索引*/
import React,{ Component } from 'react';
import './RepIndex.less';
import Footer from "../common/Footer";
import {  List, Avatar,Card,} from 'antd';



class RepIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            current: '1',
        }
    }

    render(){
        const data = [
            {
                id:1,
                avatar:'https://i.loli.net/2019/05/01/5cc9a551c68a3.png',
                title: '语言处理',
                children:[
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>中文分析</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>词性标注</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>命名实体识别</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>依存句法分析</a></div>,
                ]
            },
            {
                id:2,
                avatar:'https://i.loli.net/2019/05/01/5cc9a7552dfde.png',
                title: '语言分析',
                children:[
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>关键词抽取</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>自动摘要</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>主题检测</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>情感分析</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>词法相似度分析</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>文本相似度计算</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>word2vect语言表示模型</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>BERT语言表示模型</a></div>,
                ]
            },
            {
                id:3,
                avatar:'https://i.loli.net/2019/05/01/5cc9a7fb80b5f.png',
                title: '云平台API',
                children:[
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>讯飞</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>腾讯文智</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>阿里云</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>百度云</a></div>,
                ]
            },
            {
                id:4,
                avatar:'https://i.loli.net/2019/05/01/5cc9a8bf3129c.png',
                title: '算法资源',
                children:[
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>分类</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>回归</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>聚类</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>降维</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>概率图模型</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>文本挖掘</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>优化</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>深度学习</a></div>
                ]
            },
        ];
        return(

            <div className="repIndex">
                <div className="repIndex-header">
                </div>
                <div className="repIndex-content">
                    <div className="repIndex-image">
                        <img src={require("../../../resource/images/RepIndex.png")} alt="载入失败"/>
                    </div>
                    <div className="repIndex-dataList">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item id={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} alt={"图片加载失败"}/>}
                                        title={<strong>{item.title}</strong>}
                                        description=""
                                    />
                                    <Card style={{ width: 400 ,height:150 }}>
                                        {item.children}
                                    </Card>,
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className="repIndex-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default RepIndex;
