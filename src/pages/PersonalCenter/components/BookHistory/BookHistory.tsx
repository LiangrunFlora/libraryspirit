import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined} from '@ant-design/icons';
import './BookHistory.scss'

type TableData ={
  bookId:number,
  bookName:string,
  author:string,
  category:string,
  press:string,
  rentTime:string
}

const tableData: TableData[] = [
    {
      bookId: 1,
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      press: "Scribner",
      rentTime: "2024-05-09"
    },
    {
      bookId: 2,
      bookName: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      press: "J. B. Lippincott & Co.",
      rentTime: "2024-04-25"
    },
    {
      bookId: 3,
      bookName: "1984",
      author: "George Orwell",
      category: "Science Fiction",
      press: "Secker & Warburg",
      rentTime: "2024-05-02"
    },
    {
      bookId: 4,
      bookName: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Classic",
      press: "T. Egerton, Whitehall",
      rentTime: "2024-04-20"
    },
    {
      bookId: 5,
      bookName: "The Catcher in the Rye",
      author: "J. D. Salinger",
      category: "Fiction",
      press: "Little, Brown and Company",
      rentTime: "2024-04-15"
    }
  ];

const BookHistory:React.FC = () => {

  const [historyData, setHistoryData] = useState<TableData[]>(tableData);

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
        title:'作者',
        dataIndex: 'author'
      },
      {
        title: '类型',
        dataIndex: 'category'
      },
      {
        title: '出版社',
        dataIndex: 'press'
      },
      {
        title: '借阅时间',
        dataIndex: 'rentTime'
      },
      {
        title: '操作',
        render: (record: TableData) => (
          <Space size="middle">
            <Popconfirm
              title="删除记录"
              description="确认删除？"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
            <Button 
              type="primary" 
              shape="circle" 
              size='large'
              style={{ backgroundColor: 'bisque' }}
              icon={<CloseOutlined />} 
            />
            </Popconfirm>
          </Space>
        )
      }
  ]

  const handleDelete = (record:TableData) => {
    const updatedData = tableData.filter(order => {
        return order.bookId !== record.bookId;
    });
    setHistoryData(updatedData)
  };


  return (
    <div>
      <Card title={`您截止现在已经借阅了${tableData.length}本书`}>
        <Table rowKey={'bookId'} columns={columns} dataSource={historyData} />
      </Card>
    </div>
  );
};

export default BookHistory