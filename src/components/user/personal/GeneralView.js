import React,{Component} from 'react';
import './GeneralView.less'
import UserHead from '../common/UserHead';
import Footer from '../common/Footer';
import NavMenu from './NavMenu';
import {Input, Collapse, List, Card, Avatar} from 'antd';

const { Search } = Input;
const { Panel } = Collapse;

class GeneralView extends Component{
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        const data = [
            {
                id:1,
                children:[
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>中文分析</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>词性标注</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>命名实体识别</a></div>,
                    <div className="repIndex-linkList"><a href='http://www.baidu.com'>依存句法分析</a></div>,
                ]
            }
        ];
        return(
            <div className="general-view">
                <div className="general-view-header">
                    <UserHead />
                </div>
                <div className="general-view-content">
                    <NavMenu />
                    <div className="general-view-left">
                        <div className="general-view-product">
                            <h4>kalab产品</h4>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                            <h4>最新访问</h4>
                            <div className='resent-visited'><a>some product</a></div>
                            <div className='resent-visited'><a>some product</a></div>
                            <Collapse defaultActiveKey={['1']} >
                                <Panel header="使用中的产品" key="1">
                                    <p>hello</p>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className="general-view-document">
                            <h4>常用文档</h4>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item id={item.id}>
                                        <List.Item.Meta
                                        />
                                            {item.children}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div className="general-view-right">
                        <div className="general-view-user"></div>
                        <div className="general-view-summary"></div>
                        <div className="general-view-notice"></div>
                    </div>
                </div>
                <div className="general-view-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default GeneralView;