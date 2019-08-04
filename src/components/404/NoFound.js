import React from 'react'
import './NoFound.less'
import {Link } from 'react-router-dom'
export default class NoFound extends React.Component {

    state = {

    }

    render () {

        return (
            <div className="noFound-box">
                <div className="noFound-pic"></div>
                <div className="noFound-back">
                    <h2> sorry，痞老板都找不到页面了呢。</h2>
                    <br />
                       <h2> 如果需要返回请点击</h2>
                    <Link to={'/'}><h1>Back Home</h1></Link>
                </div>
            </div>
        )

    }

}