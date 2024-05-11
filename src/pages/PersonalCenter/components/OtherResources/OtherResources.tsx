import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined } from '@ant-design/icons';
import './OtherResources.scss'

type TableData ={
  book_id:number,
  book_name:string,
  borrow_date:string,
  is_agree:number
}

const tableData = [
    {
      "book_id": 6,
      "book_name": "The Catcher in the Rye",
      "borrow_date": "2024-05-04",
      "is_agree": 0
    },
    {
      "book_id": 7,
      "book_name": "To Kill a Mockingbird",
      "borrow_date": "2024-05-03",
      "is_agree": 1
    },
    {
      "book_id": 8,
      "book_name": "The Hobbit",
      "borrow_date": "2024-05-02",
      "is_agree": 0
    },
    {
      "book_id": 9,
      "book_name": "The Lord of the Rings",
      "borrow_date": "2024-05-01",
      "is_agree": 1
    },
    {
      "book_id": 10,
      "book_name": "The Da Vinci Code",
      "borrow_date": "2024-04-30",
      "is_agree": 0
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
        dataIndex: 'book_id'
      },
      {
        title: '书名',
        dataIndex: 'book_name'
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
        render: (record: TableData) => (
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

  const handleReturn = (record:TableData) => {

  };

  const handleExtention = (record:TableData) => {

  };

  const handleCancle = (record:TableData)=>{

  }


  return (
    <div>
      <Card title={`您目前还有他人的${ tableData.filter(item => item.is_agree !== 0).length}本书未归还`}>
        <Table rowKey={'book_id'} columns={columns} dataSource={circulateData} />
      </Card>
    </div>
  );
};

export default OtherResources