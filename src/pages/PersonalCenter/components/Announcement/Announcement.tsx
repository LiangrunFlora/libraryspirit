import React, { useState ,useEffect} from 'react';
import './Announcement.scss';
import { Button,Modal,message,Input } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { getAnnouncements } from '../../../../apis/queryfn/announcements';
import { postConsult } from '../../../../apis/queryfn/consults';

const Announcement: React.FC = () => {

  const [announcesmentData,setAnnouncementsData] =useState<announcementType[]>();

  const fetchData = async () => {
    const res = getAnnouncements();
    return res;
  };

  useEffect(() => {
    fetchData()
    .then(res => {
       console.log(res.data); 
       setAnnouncementsData(res.data)
    })
    .catch(error => {
       message.error("获取失败~")
    });
  }, []);

  const [modelVisible,setModelVisible] = useState(false);
  const [confirmLoading,setConfirmLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const showModal = () => {
    setModelVisible(true);
  };

  const handleOk =  async () => {
    if(title==='')
    {
        message.error("请至少输入标题！")
        return;
    }
    setConfirmLoading(true);
    const res = await postConsult(title,content)
    console.log(res)
    if(res.code==20071)
      {
      setTimeout(() => {
      setConfirmLoading(false)
      setModelVisible(false)
      setTitle('');
      setContent('');
      message.success('提交成功~');
      }, 2000);
      }
    else{
      setConfirmLoading(false)
      setModelVisible(false)
      message.error("提交失败~")
    }

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
        {announcesmentData?.map(announcement => (
          <li key={announcement.id} className="announcement-item">
            <div className="announcement-title">{announcement.title}</div>
            <div className="announcement-content">{announcement.content}</div>
            <div className="announcement-time">{announcement.publish_time}</div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>

  );
}

export default Announcement;