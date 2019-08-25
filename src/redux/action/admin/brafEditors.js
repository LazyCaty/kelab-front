import axios from 'axios';
import Qs from 'qs';
import {message } from 'antd';
import configs from '../common/configs';
const baseUrl=configs.baseUrl;
// export function getServerDoc(query=""){
//     return async (dispatch)=>{
//         try{
//             const data = (await axios.get(`${baseUrl}/doc.do?${Qs.stringify(query)}`)).data;
//             var id=query.serverid;
//             console.log(data.data.docSubVos[2].docEntities[id]);

//         }catch{

//         }
//     }
// }