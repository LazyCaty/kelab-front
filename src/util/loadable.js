import React from 'react';
import { Spin,  Skeleton} from 'antd';
import Loadable from 'react-loadable';

//通用的过场组件
const loadingComponent =()=>{
    return (
    <div>
        <Spin tip="页面加载中请稍等"></Spin>
        <Skeleton avatar paragraph={{ rows: 16 }} active/>
      </div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}