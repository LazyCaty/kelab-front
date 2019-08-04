import React,{Component} from 'react';
import './AccountInfo.less'
import UserHead from '../common/UserHead';
import Footer from '../common/Footer';
import NavMenu from './NavMenu';
import './Goods.less'


class Goods extends Component{
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){

        return(
            <div className="goods">
                <div className="goods-header">
                    <UserHead />
                </div>
                <div className="goods-content">
                    <NavMenu />
                    <div>写点啥呀。。。</div>
                </div>
                <div className="goods-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Goods;