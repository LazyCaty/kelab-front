/*自然语言处理产品界面*/
import React,{Component} from 'react';
import UserHead from "../common/UserHead"
import Footer from '../common/Footer';
import { Input,Menu,  Breadcrumb,message } from 'antd';
import "./Product.less";

const SubMenu = Menu.SubMenu;
const Search = Input.Search;
class Product extends Component{
    constructor(props){
        super(props);
        this.state={
            current:'1',
        }
    }

    /**
     * 更新menu的key
     * @param e
     */
    handleClick = (e) => {
        console.log('click ', e);
        console.log(this.state.text)
        this.setState({
            current: e.key,
        });
    }


    render(){
        return(
            <div>
                <div className="product-header">
                    <UserHead />
                </div>
                <div className="product-content">
                    <div className="product-menuNav">
                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <h2>中文词性分析</h2>
                        <hr />
                        <SubMenu key="sub1" title={<span>产品简介</span>}>
                            <Menu.Item key="1"><a href="#1">more detail</a></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span>快速开始</span>}>
                            <Menu.Item key="2"><a href="#2">more detail</a></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span>开发指南</span>}>
                            <Menu.Item key="3"><a href="#3">more detail</a></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span>产品定价</span>}>
                            <Menu.Item key="4"><a href="#4">more detail</a></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span>常见问题</span>}>
                            <Menu.Item key="5"><a href="#5">more detail</a></Menu.Item>
                        </SubMenu>
                    </Menu>
                    </div>
                    <div className="product-dataList">
                        <Breadcrumb>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">语言处理</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">中文词性分析</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>产品简介</Breadcrumb.Item>
                        </Breadcrumb>
                        <Search
                            placeholder="请输入关键词"
                            onSearch={value => console.log(value)}
                            style={{ width: 200}}
                        />
                        <p>some article</p>
                    </div>
                </div>
                <div className="product-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}


export default Product;