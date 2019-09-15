import axios from 'axios';

export function getpic(query='')
{
    return async(dispatch) => {
        try {
            const data = (await axios.get(`http://192.168.3.83:8088/api/user.do/getverifycode?uuid=null`)).data;
           
            message.success('添加成功');
        } catch (error) {
            alert('sever err');
        }
    };

}