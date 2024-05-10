import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined } from '@ant-design/icons';
import './OtherResources.scss'

type TableData ={
  bookId:number,
  bookName:string,
  rentTime:string,
  isAgree:number
}

const tableData = [
    {
      "bookId": 6,
      "bookName": "The Catcher in the Rye",
      "rentTime": "2024-05-04",
      "isAgree": 0
    },
    {
      "bookId": 7,
      "bookName": "To Kill a Mockingbird",
      "rentTime": "2024-05-03",
      "isAgree": 1
    },
    {
      "bookId": 8,
      "bookName": "The Hobbit",
      "rentTime": "2024-05-02",
      "isAgree": 0
    },
    {
      "bookId": 9,
      "bookName": "The Lord of the Rings",
      "rentTime": "2024-05-01",
      "isAgree": 1
    },
    {
      "bookId": 10,
      "bookName": "The Da Vinci Code",
      "rentTime": "2024-04-30",
      "isAgree": 0
    }
  ]

const OtherResources:React.FC = () => {

const [circulateData, setCirculateData] = useState<TableData[]>(tableData);

  const status = {
    0: <Tag color='volcano'>等待中！</Tag>,
    1: <Tag color='green'>借阅中~</Tag>
  } as Record<string, JSX.Element>;

  const columns = [
     {
        title: '书号',
        dataIndex: 'bookId'
      },
      {
        title: '书名',
        dataIndex: 'bookName'
      },
      {
        title: '借出时间',
        dataIndex: 'rentTime'
      },
      {
        title: '状态',
        dataIndex: 'isAgree',
        render: (data:string) => status[data]
      },
      {
        title: '操作',
        render: (record: TableData) => (
          <Space size="middle">
          {record.isAgree == 0 && (<Popconfirm
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
        {record.isAgree == 1 && (<Popconfirm
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
      {record.isAgree == 1 && ( 
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

  const handleReturn = (record:TableData) => {

  };

  const handleExtention = (record:TableData) => {

  };

  const handleCancle = (record:TableData)=>{

  }


  return (
    <div>
      <Card title={`您目前还有他人的${ tableData.filter(item => item.isAgree !== 0).length}本书未归还`}>
        <Table rowKey={'bookId'} columns={columns} dataSource={circulateData} />
      </Card>
    </div>
  );
};

export default OtherResources