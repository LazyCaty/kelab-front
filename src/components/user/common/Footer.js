import React, {Component} from 'react';
import './Footer.less';
import {Col, Input} from 'antd';
import {NavLink} from 'react-router-dom';
/**
 * 这是底部
 */
const Search = Input.Search;

class Footer extends Component {
    render(){
        return(
            <div className="footer-content">
                this if Footer
            </div>
        )
    }
  
}

export default Footer;