import React, { useState,useEffect } from 'react';
import './MyAsk.scss';
import { Button,Modal,message,Input } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { getUserInfoFromSession } from '../../../../util/userInfo';
import {agreeAsks, getAsks, refuseAsks} from "../../../../apis/queryFn/ask";

// 测试用例
// const data: AskInf[] = [
//     {
//       id:1,
//       user_name: "Alice",
//       book_name: "The Great Gatsby",
//       time: "2024-05-09 14:00"
//     },
//     {
//       id:2,
//       user_name: "Bob",
//       book_name: "To Kill a Mockingbird",
//       time: "2024-05-09 15:30"
//     },
//     {
//       id:3,
//       user_name: "Charlie",
//       book_name: "1984",
//       time: "2024-05-09 16:45"
//     }
//   ];

  const MyAsk: React.FC = () => {
    const [askData, setAskData] = useState<AskInf[]>();

    const fetchData = async () => {
      const userId = getUserInfoFromSession()?.user_id || 1;
      const res = await getAsks(userId);
      return res;
   };

   useEffect(() => {
    fetchData()
    .then(res => {
       console.log(res.data); 
       setAskData(res.data)
    })
    .catch(error => {
       message.error("获取失败~")
    });
 }, []);

    const handleAgree = async (id: number) => {
      const res = await agreeAsks(id)
      if(res.msg==='success'){
        setAskData(askData?.filter(item => item.id!=id))
        message.success("借出成功~")
      }
    };

    const handleReject = async (id: number) => {
      const res = await refuseAsks(id)
      if(res.msg==='success'){
        setAskData(askData?.filter(item => item.id!=id))
        message.warning("狠心拒绝~")
      }
    };

    return (
        <div className='box'>
            <div className='askContainer'>
            <h1>他人申请</h1>
            {askData?.map((item) => (
                <div key={item.id} className='request'>
                    <p>
                        <strong className='user_name'>{item.user_name}</strong> 想向你借《<em className='book_name'>{item.book_name}</em> 》——— {item.time}
                    </p>
                    <div className='buttonGroup'>
                    <Button onClick={() => handleAgree(item.id)}>同意</Button>
                    <Button onClick={() => handleReject(item.id)}>拒绝</Button>
                    </div>  
                </div>
            ))}
            </div>
        </div>
    );
};

export default MyAsk;