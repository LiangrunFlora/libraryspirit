import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined } from '@ant-design/icons';
import './OtherResources.scss'
import { getUserInfoFromSession } from '../../../../util/userInfo';
import {deleteOtherResources, getOtherResources, returnOtherResources} from "../../../../apis/queryFn/otherResources";

const OtherResources:React.FC = () => {

const [otherResourcesData, setOtherResourcesData] = useState<otherResourcesType[]>();

const fetchData = async () => {
  const userId = getUserInfoFromSession()?.user_id || 1;
  const res = await getOtherResources(userId)
  return res;
};

useEffect(() => {
  fetchData()
  .then(res => {
     console.log(res.data); 
     setOtherResourcesData(res.data)
  })
  .catch(error => {
     message.error("获取失败~")
  });
}, []);


  const status = {
    0: <Tag color='volcano'>等待中！</Tag>,
    1: <Tag color='green'>借阅中~</Tag>
  } as Record<string, JSX.Element>;

  const columns = [
     {
        title: '书号',
        dataIndex: 'book_id'
      },
      {
        title: '书名',
        dataIndex: 'book_name'
      },
      {
        title:'借出人',
        dataIndex:'lender_name'
      },
      {
        title: '借出时间',
        dataIndex: 'borrow_date'
      },
      {
        title: '状态',
        dataIndex: 'is_agree',
        render: (data:string) => status[data]
      },
      {
        title: '操作',
        render: (record: otherResourcesType) => (
          <Space size="middle">
          {record.is_agree == 0 && (<Popconfirm
              title="取消申请"
              description="确认取消申请？"
              onConfirm={() => handleCancle(record)}
              okText="Yes"
              cancelText="No"
            >
            <Button 
              type="primary" 
              shape="circle" 
              size='large'
              style={{ backgroundColor: 'lemonchiffon' }}
              icon={<CloseOutlined />} 
            />
        </Popconfirm>)}
        {record.is_agree == 1 && (<Popconfirm
              title="申请延时"
              description="确认发起延期申请？"
              onConfirm={() => handleExtention(record)}
              okText="Yes"
              cancelText="No"
            >
            <Button 
              type="primary" 
              shape="circle" 
              size='large'
              style={{ backgroundColor: 'bisque' }}
              icon={<ClockCircleOutlined />} 
            />
        </Popconfirm>)}
      {record.is_agree == 1 && ( 
        <Popconfirm
          title="申请还书"
          description="确认发起还书申请？"
          onConfirm={() => handleReturn(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="primary" 
            shape="circle" 
            size='large'
            style={{ backgroundColor: 'aquamarine' }}
            icon={<EditOutlined />} 
          />
        </Popconfirm>
      )}
          </Space>
        )
      }
  ]

  const handleReturn = async (record:otherResourcesType) => {
    const res = await returnOtherResources(record.id)
    if(res.code===20053){
      setOtherResourcesData(otherResourcesData?.filter(item=>item.id!=record.id))
      message.success("还书成功~")
    }
    else{
      message.error("出错了~")
    }
  };

  const handleExtention = (record:otherResourcesType) => {
    message.success("申请延时发送成功~")
  };

  const handleCancle = async (record:otherResourcesType)=>{
    const res = await deleteOtherResources(record.id)
    if(res.code===20052){
      setOtherResourcesData(otherResourcesData?.filter(item => item.id!=record.id))
      message.success("取消成功~")
    }
    else{
      message.error("出错了~")
    }
  }


  return (
    <div>
      <Card title={`您目前还有${ otherResourcesData?.filter(item => item.is_agree !== 0).length}本书未归还`}>
        <Table rowKey={'id'} columns={columns} dataSource={otherResourcesData} />
      </Card>
    </div>
  );
};

export default OtherResources