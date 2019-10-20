// 进行路由判断
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const code=1;


class AuthRoute extends React.Component {



    componentDidMount(){
        const publicList=['/admin'];
        const pathname=this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1)
        {
            //如果在不用跳转的页面
            return null
            //window.location.href='/';
        }
        if(localStorage.token!=null)
        {
            //验证
            
            if(code==0)
            {
                //登录成功了
            }
            else
            {
                //跳转
                console.log("pathname:",pathname);
                //window.location.href='/';
                
            }
        }
        else
        {
            //未登录
        }
       
    }
    render () {

        return (
            <div >

            </div>
        )

    }

}

export default withRouter(AuthRoute);