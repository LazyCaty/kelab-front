/*演示页面的索引*/
import React,{ Component } from 'react';
import './NlpRepro.less';
import Footer from "../common/Footer";
import { Menu,Button,Input } from 'antd';

const { TextArea } = Input;
class NlpRepro extends Component{
    constructor(props){
        super(props);
        this.state={
            current: '1',
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render(){
        return(

            <div className="nlpRepro">
                <div className="nlpRepro-content">
                    <div className="nlpRepro-content-menu">
                        <Menu
                            theme={this.state.theme}
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                        >
                            <Menu.Item key="1"><a href="#1">中文分析</a></Menu.Item>
                            <Menu.Item key="2"><a href="#2">词性标注</a></Menu.Item>
                            <Menu.Item key="3"><a href="#3">命名实体识别</a></Menu.Item>
                            <Menu.Item key="4"><a href="#4">依存句法分析</a></Menu.Item>
                        </Menu>
                    </div>
                    <div className="nlpRepro-content-dataList">
                        <TextArea rows={4} defaultValue={"请输入您要测试的文本"}/>
                        <Button type="primary">提交文本</Button>
                            <h2>演示的结果</h2>
                    </div>
                </div>
                <div className="nlpRepro-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default NlpRepro;