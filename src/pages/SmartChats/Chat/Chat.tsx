// import React, { useState } from 'react';
// import './Chat.css';
//
// interface msg {
//   message:string;
//   sender:string;
// }
// const ChatMessage:React.FC<msg> = ({ message, sender }) => {
//   return (
//     <div className={`message ${sender === 'user' ? 'user' : 'bot'}`}>
//       {message}
//     </div>
//   );
// };
//
// const Chat = () => {
//   const [messages, setMessages] = useState<msg[]>([] );
//   const [input, setInput] = useState('');
//
//   const handleMessageSubmit = () => {
//     if (input.trim() !== '') {
//       setMessages([...messages, { message: input, sender: 'user' }]);
//       setInput('');
//       // 在此处向 ChatGPT 发送消息并处理响应
//     }
//   };
//
//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <ChatMessage key={index} message={msg.message} sender={msg.sender} />
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button onClick={handleMessageSubmit}>Send</button>
//       </div>
//     </div>
//   );
// };
//
// export default Chat;

import React, { useState } from 'react';
import './Chat.css';
import userAvatar from '../../../resources/HomeImage/user.png';
import botAvatar from '../../../resources/HomeImage/gpt.png';
import axios from "axios";

const AK = "MD8Yqq2yYA0ox52Hu8WvpWPY";
const SK = "12QK4F9C6TKtwT0diqKQkylcBnypNcsZ";

interface Message {
  message: string;
  sender: string;
}

const ChatMessage = ({ message, sender }: Message) => {
  return (
    <div className={`message-container ${sender === 'You' ? 'You' : 'bot'}`}>
      <img className="avatar" src={sender === 'You' ? userAvatar : botAvatar} alt={`${sender}'s avatar`} />
      <div className="message-content">
        <div className="sender">{sender}</div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};


const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const getAccessToken = async () => {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `grant_type=client_credentials&client_id=${AK}&client_secret=${SK}`
    // };
    //
    // const response = await fetch('https://aip.baidubce.com/oauth/2.0/token', requestOptions);
    // const data = await response.json();
    // console.log(data)
    // return data.access_token;
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', AK);
    formData.append('client_secret', SK);

    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      headers: {'Content-Type': 'application/json'},
      body: formData
    };

    const response = await fetch('https://aip.baidubce.com/oauth/2.0/token', requestOptions);
    const data = await response.json();
    console.log(data);
    // return data.access_token;
  };

  const sendMessage = async () => {
    const accessToken = await getAccessToken();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "query": input, // 将消息作为查询参数发送到 API
        "disable_search": false,
        "enable_citation": false
      })
    };

    fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-4.0-8k-preview?access_token=${accessToken}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // 在这里处理 API 响应的数据
        console.log('Response:', data);
        setMessages([...messages, {message: data, sender: 'Spirit'}]);
        // 可以将响应数据存储到状态中，或者进行其他操作
      })
      .catch(error => console.error('Error:', error));
  };

  const handleMessageSubmit = () => {
    if (input.trim() !== '') {
      setMessages([...messages, {message: input, sender: 'You'}]);
      setInput('');
      try {
      // const response = await axios.post('your-api-endpoint', {
      //   message: input,
      //   sender: 'You'
      // });
        // 处理响应
        // const responseData = response.data;
        // setMessages([...messages, responseData]);
        sendMessage()
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    }
      // 在此处向 ChatGPT 发送消息并处理响应

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
