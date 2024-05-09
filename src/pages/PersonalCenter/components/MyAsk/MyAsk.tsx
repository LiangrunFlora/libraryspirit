import React, { useState } from 'react';
import './MyAsk.scss';
import { Button,Modal,message,Input } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

type  AskInformation = {
  id:number,
  username:string,
  bookName:string,
  time:string
}

const data: AskInformation[] = [
    {
      id:1,
      username: "Alice",
      bookName: "The Great Gatsby",
      time: "2024-05-09 14:00"
    },
    {
      id:2,
      username: "Bob",
      bookName: "To Kill a Mockingbird",
      time: "2024-05-09 15:30"
    },
    {
      id:3,
      username: "Charlie",
      bookName: "1984",
      time: "2024-05-09 16:45"
    }
  ];

  const MyAsk: React.FC = () => {
    const [askData, setAskData] = useState<AskInformation[]>(data);

    const handleAgree = (id: number) => {
        setAskData(askData.filter(item => item.id!=id))
        message.success("借出成功~")
    };

    const handleReject = (id: number) => {
        setAskData(askData.filter(item => item.id!=id))
        message.warning("狠心拒绝~")
    };

    return (
        <div className='box'>
            <div className='askContainer'>
            <h1>他人申请</h1>
            {askData.map((item) => (
                <div key={item.id} className='request'>
                    <p>
                        <strong className='username'>{item.username}</strong> 想向你借《<em className='bookName'>{item.bookName}</em> 》——— {item.time}
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