import React,{Component} from 'react';
import './AccountInfo.less'
import UserHead from '../common/UserHead';
import Footer from '../common/Footer';
import NavMenu from './NavMenu';
import { Descriptions,Avatar } from 'antd';


class AccountInfo extends Component{
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){

        return(
            <div className="account-info">
                <div className="account-info-header">
                    <UserHead />
                </div>
                <div className="account-info-content">
                    <NavMenu />
                    <div className="account-message">
                        <div className="account-message-title"><h2>账号信息</h2></div>
                        <div className="account-message-info">
                            <Descriptions title="基本信息" >
                                <Descriptions.Item label="头像"><Avatar shape="square" size={54} icon="user" /></Descriptions.Item>
                                <Descriptions.Item label="昵称">lazycat</Descriptions.Item>
                                <Descriptions.Item label="用户名">lazycat</Descriptions.Item>
                                <Descriptions.Item label="邮箱">1782445722@gamil.com</Descriptions.Item>
                                <Descriptions.Item label="手机号">
                                    1810000000
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="account-message-login">
                            <Descriptions title="登录方式" >
                                <Descriptions.Item label="账号">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="QQ">1810000000</Descriptions.Item>
                                <Descriptions.Item label="微信">Hangzhou, Zhejiang</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="account-message-root">
                            <Descriptions title="安全管理" >
                                <Descriptions.Item label="绑定手机">1810000000</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>

                </div>
                <div className="account-info-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default AccountInfo;