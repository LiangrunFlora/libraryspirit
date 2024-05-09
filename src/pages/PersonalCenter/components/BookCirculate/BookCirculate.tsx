import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './BookCirculate.scss'

type TableData ={
  bookId:number,
  bookName:string,
  rentTime:string,
  expiredTime:string,
  residueTime:number
}

const tableData = [
    {
      bookId: 1,
      bookName: "The Great Gatsby",
      rentTime: "2024-05-09",
      expiredTime: "2024-06-09",
      residueTime:0
    },
    {
      bookId: 2,
      bookName: "To Kill a Mockingbird",
      rentTime: "2024-04-25",
      expiredTime: "2024-05-25",
      residueTime:2
    },
    {
      bookId: 3,
      bookName: "1984",
      rentTime: "2024-05-02",
      expiredTime: "2024-06-02",
      residueTime:0
    },
    {
      bookId: 4,
      bookName: "Pride and Prejudice",
      rentTime: "2024-04-20",
      expiredTime: "2024-05-20",
      residueTime:0
    },
    {
      bookId: 5,
      bookName: "The Catcher in the Rye",
      rentTime: "2024-04-15",
      expiredTime: "2024-05-15",
      residueTime:1
    }
  ];

const BookCirculate:React.FC = () => {

const [circulateData, setCirculateData] = useState<TableData[]>(tableData);

  const status = {
    0: <Tag color='volcano'>速归还！</Tag>,
    1: <Tag color='geekblue'>还不急#</Tag>,
    2: <Tag color='green'>慢慢看~</Tag>
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
        title: '归还截止时间',
        dataIndex: 'expiredTime'
      },
      {
        title: '状态',
        dataIndex: 'residueTime',
        render: (data:string) => status[data]
      },
      {
        title: '操作',
        render: (record: TableData) => (
          <Space size="middle">
            <Popconfirm
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
            </Popconfirm>
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
          </Space>
        )
      }
  ]

  const handleReturn = (record:TableData) => {
};

  const handleExtention = (record:TableData) => {

  };


  return (
    <div>
      <Card title={`您目前还有${tableData.length}本书未归还`}>
        <Table rowKey={'bookId'} columns={columns} dataSource={circulateData} />
      </Card>
    </div>
  );
};

export default BookCirculate