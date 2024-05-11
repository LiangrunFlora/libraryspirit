import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined} from '@ant-design/icons';
import './BookHistory.scss'

const tableData: BookHistoryType[] = [
    {
      id:1,
      book_id: 1,
      cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
      book_name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      press: "Scribner",
      borrow_date: "2024-05-09"
    },
    {
      id:2,
      book_id: 2,
      cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
      book_name: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      press: "J. B. Lippincott & Co.",
      borrow_date: "2024-04-25"
    },
    {
      id:3,
      book_id: 3,
      cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
      book_name: "1984",
      author: "George Orwell",
      category: "Science Fiction",
      press: "Secker & Warburg",
      borrow_date: "2024-05-02"
    },
    {
      id:4,
      book_id: 4,
      cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
      book_name: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Classic",
      press: "T. Egerton, Whitehall",
      borrow_date: "2024-04-20"
    },
    {
      id:5,
      book_id: 5,
      cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
      book_name: "The Catcher in the Rye",
      author: "J. D. Salinger",
      category: "Fiction",
      press: "Little, Brown and Company",
      borrow_date: "2024-04-15"
    }
  ];

const BookHistory:React.FC = () => {

  const [historyData, setHistoryData] = useState<BookHistoryType[]>(tableData);

  const columns = [
     {
        title: '书号',
        dataIndex: 'book_id'
      },
      {
        title:'封面',
        dataIndex:'cover',
        render: (coverUrl: string) => <img src={coverUrl} alt="封面" style={{ width: '100px', height: 'auto' }} />
      },
      {
        title: '书名',
        dataIndex: 'book_name'
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
        dataIndex: 'borrow_date'
      },
      {
        title: '操作',
        render: (record: BookHistoryType) => (
          <Space size="middle">
              <Popconfirm
                title="删除记录"
                description="确认删除记录？"
                onConfirm={() => handleDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  type="primary" 
                  style={{ backgroundColor: 'lemonchiffon' }}
                >
                删除记录
                </Button>
              </Popconfirm>
          </Space>
        )
      }
  ]

  const handleDelete = (record:BookHistoryType) => {
    const updatedData = tableData.filter(order => {
        return order.book_id !== record.book_id;
    });
    setHistoryData(updatedData)
  };


  return (
    <div>
      <Card title={`您截止现在已经借阅了${tableData.length}本书`}>
        <Table rowKey={'id'} columns={columns} dataSource={historyData} />
      </Card>
    </div>
  );
};

export default BookHistory