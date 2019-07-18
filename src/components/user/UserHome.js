import React, {Component} from 'react';
import './UserHome.less';
import {Col, Input} from 'antd';
import {NavLink} from 'react-router-dom';
/**
 * 首页中间部分
 */
const Search = Input.Search;

class UserHome extends Component {
    render(){
        return(
            <div className="home">
                <div className="homeTop">
                    <div className="Search">
                        <Search
                            placeholder="请输入关键词进行搜索"
                            enterButton="搜索"
                            size="large"
                            onSearch={value => console.log(value)}
                        />
                    </div></div>
                <div className="homeContent"></div>
            </div>
        )
    }

}

export default UserHome;