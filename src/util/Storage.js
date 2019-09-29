export default Storage={
    /**
     * 添加设置localStorage键值
     * @param {*} name 
     * @param {*} data 
     */
    setStorage(name,data){
        let dataType=typeof data;
        //json对象
        if(dataType==='object')
        {
            window.localStorage.setItem(name,JSON.stringify(data));
        }
        //其他类型
        else
        {
            window.localStorage.setItem(name,data);
        }
    },
    /**
     * 通过键名获取localStorage值
     * @param {*} name 
     */
    getStorage(name){
        let data=window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    },
    /**
     * 通过键名删除localStorage中的键值
     * @param {*} name 
     */
    removeStorage(name){
        window.localStorage.removeItem(name); 
    }
}
