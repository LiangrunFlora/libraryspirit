import React, {useState} from 'react';
import './Chat.css';
import userAvatar from '../../../resources/HomeImage/user.png';
import botAvatar from '../../../resources/HomeImage/gpt.png';
import {useMutation} from "@tanstack/react-query";
import getChatResponse from '../../../apis/queryfn/getChatResponse';


interface Message {
  message: string;
  sender: string;
}

const ChatMessage = ({message, sender}: Message) => {
  return (
    <div className={`message-container ${sender === 'You' ? 'You' : 'bot'}`}>
      <img className="avatar" src={sender === 'You' ? userAvatar : botAvatar} alt={`${sender}'s avatar`}/>
      <div className="message-content">
        <div className="sender">{sender}</div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

// todo 待测试
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatData, setChatData] = useState<ChatResponse[]>([])

  const {mutate: getChatResponseMsg} = useMutation({
    mutationFn: getChatResponse,
    onSuccess: (data) => {
      if (data.code === 20094) {
        setChatData(data.data as ChatResponse[])
        chatData.map((msg, index) => {
          setMessages([...messages, {message: msg.result, sender: 'Spirit'}])
        })
      }
    }
  })
  const handleMessageSubmit = () => {
    if (input.trim() !== '') {
      setMessages([...messages, {message: input, sender: 'You'}]);
      setInput('');
      try {
        getChatResponseMsg(input)
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender}/>
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
