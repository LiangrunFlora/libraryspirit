import React, { useState } from 'react';
import './Announcement.scss';
import { Button,Modal,message,Input } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
type AnnouncementData = {
  id: number,
  title: string,
  content: string,
  time: string
}

const Announcement: React.FC = () => {
  const announcementData: AnnouncementData[] = [
    {
      id: 1,
      title: "重要通知",
      content: "本周五将举行公司年度会议，请务必准时参加。",
      time: "2024-05-10 09:00"
    },
    {
      id: 2,
      title: "系统维护公告",
      content: "系统将于本周末进行维护，维护期间可能会有短暂的服务中断，请留意。",
      time: "2024-05-12 23:00"
    },
    {
      id: 3,
      title: "招聘信息",
      content: "欢迎有经验的前端工程师加入我们的团队，详情请查看公司官网招聘栏目。",
      time: "2024-05-15 10:00"
    }
  ];

  const [modelVisible,setModelVisible] = useState(false);
  const [confirmLoading,setConfirmLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const showModal = () => {
    setModelVisible(true);
  };

  const handleOk = () => {
    if(title==='')
    {
        message.error("请至少输入标题！")
        return;
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false)
      setModelVisible(false)
      setTitle('');
      setContent('');
      message.success('提交成功~');
    }, 2000);
  };

  const handleCancel = () => {
    setModelVisible(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className='container'>
    <div className='model'>
    <Modal
          title="请输入你宝贵的意见"
          visible={modelVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="submit" style={{ backgroundColor: 'bisque' }} loading={confirmLoading} onClick={handleOk}>
              提交
            </Button>,
          ]}
        >
        <div className='inputText'>
          <Input placeholder="请输入标题" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='inputText'>
          <Input.TextArea rows={8} placeholder="请输入具体内容" value={content} onChange={e => setContent(e.target.value)} />
        </div>
    </Modal>
    </div>
    <div className='box'>
    <div className="announcement-container">
      <div className='title'>
        <h2>公告栏</h2>
        <div className='consult'> <Button onClick={showModal} type="primary" icon={<CommentOutlined />} style={{backgroundColor:'bisque', fontSize:'16px'}}>咨询反馈</Button></div>
      </div>
      <ul className="announcement-list">
        {announcementData.map(announcement => (
          <li key={announcement.id} className="announcement-item">
            <div className="announcement-title">{announcement.title}</div>
            <div className="announcement-content">{announcement.content}</div>
            <div className="announcement-time">{announcement.time}</div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>

  );
}

export default Announcement;