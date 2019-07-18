/* 这里是首页 */
import React,{ Component } from 'react';
import {Carousel, Input } from 'antd';
import UserHead from './common/UserHead';
import Footer from './common/Footer';
import {connect} from 'react-redux';
import './Homepage.less';

const Search = Input.Search;
class Homepage extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div className="homepage-header">
                    <UserHead  />
                    <Carousel effect="fade">
                        <div className="homepage-header-text">
                            <div>这是一个微服务平台</div>
                        </div>
                    </Carousel>

                </div>
                <div className="homepage-content">
                    <div className="userTitle">主要功能</div>
                    <div className="userApi">
                        <div className="apiNav"><div className="div1"></div><span><h2>语言处理</h2><p>这是一段没有什么用的话通过提炼知识的关联结构，构建内容之间深度联系，提供更智能的检索方式，辅助决策意见</p></span></div>
                        <div className="apiNav"><div className="div2"></div><span><h2>语言分析</h2><p>这是一段没有什么用的话通过提炼知识的关联结构，构建内容之间深度联系，提供更智能的检索方式，辅助决策意见</p></span></div>
                        <div className="apiNav"><div className="div3"></div><span><h2>语言资源</h2><p>这是一段没有什么用的话通过提炼知识的关联结构，构建内容之间深度联系，提供更智能的检索方式，辅助决策意见</p></span></div>
                        <div className="apiNav"><div className="div4"></div><span><h2>算法资源</h2><p>这是一段没有什么用的话通过提炼知识的关联结构，构建内容之间深度联系，提供更智能的检索方式，辅助决策意见</p></span></div>

                    </div>

                </div>
                <div className="homepage-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Homepage;