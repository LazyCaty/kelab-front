import React,{Component} from 'react';
import './GeneralView.less'
import UserHead from '../common/UserHead';
import Footer from '../common/Footer';
import NavMenu from './NavMenu';
import {Input, Collapse,Icon,Avatar,List,Card} from 'antd';

const { Search } = Input;
const { Panel } = Collapse;

class GeneralView extends Component{
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        const data = [
            '待支付订单.',
            '待续费项',
            '待处理工单数',
            '...',
            '...'
        ];
        const data1 = [
            {
                title: 'message 1',
                date:'2019/8/4'
            },
            {
                title: 'message 2',
                date:'2019/8/4'
            },
            {
                title: 'message 3',
                date:'2019/8/4'
            },
            {
                title: 'message 4',
                date:'2019/8/4'
            },
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
                            <Collapse defaultActiveKey={['']} >
                                <Panel header="使用中的产品" key="1">
                                    <p>hello</p>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className="general-view-document">
                            <h4>常用文档</h4>
                            <div className="commonly-used-doc">
                                <Icon type="diff" />
                                <a>some document</a>
                            </div>
                            <div className="commonly-used-doc">
                                <Icon type="diff" />
                                <a>some document</a>
                            </div>
                            <div className="commonly-used-doc">
                                <Icon type="diff" />
                                <a>some document</a>
                            </div>
                        </div>
                    </div>
                    <div className="general-view-right">
                        <div className="general-view-user">
                            <div className="user-head">
                            <div className='user-head-avatar'><Avatar shape="square" size={54} icon="user" /></div>
                                <h4><a>lazycat@gmail.com</a></h4>
                            <h5>账号ID：0001</h5>
                            </div>
                            <hr />
                            <div className='user-des'>
                                <a>0.0</a>
                                <p>余额(元)</p>
                            </div>
                            <div className='user-des'>
                                <a>0</a>
                                <p>待续费</p>
                            </div>
                            <div className='user-des'>
                                <a>0.0</a>
                                <p>代金券(元)</p>
                            </div>
                        </div>

                        <div className="general-view-summary">
                            <h4>关键事项</h4>
                            <List
                                size="small"
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item><div>{item}</div></List.Item>}
                            />
                        </div>
                        <div className="general-view-notice">
                            <h4>最新消息</h4>
                            <List
                                itemLayout="horizontal"
                                dataSource={data1}
                                split={false}
                                renderItem={item => (
                                    <List.Item>
                                        <a>{item.title}</a><span>{item.date}</span>
                                    </List.Item>
                                )}
                            />
                        </div>
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