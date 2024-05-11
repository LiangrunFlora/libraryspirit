import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined} from '@ant-design/icons';
import './MyResources.scss'

type TableData ={
  book_id:number,
  bookName:string,
  author:string,
  category:string,
  press:string,
  status:number
}

const tableData: TableData[] = [
{ book_id: 1, bookName: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", press: "Scribner", status: 0 },
{ book_id: 2, bookName: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", press: "J. B. Lippincott & Co.", status: 1 },
{ book_id: 3, bookName: "1984", author: "George Orwell", category: "Fiction", press: "Secker & Warburg", status: 1 },
{ book_id: 4, bookName: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", press: "T. Egerton, Whitehall", status: 0 },
{ book_id: 5, bookName: "The Catcher in the Rye", author: "J. D. Salinger", category: "Fiction", press: "Little, Brown and Company", status: 1 }
];

const MyResources:React.FC = () => {

    const [myResources, setMyResources] = useState<TableData[]>(tableData);

    const status = {
        0: <Tag color='green'>待发现~</Tag>,
        1: <Tag color='geekblue'>已借出~</Tag>
      } as Record<string, JSX.Element>;
  
    const columns = [
       {
          title: '书号',
          dataIndex: 'book_id'
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
          title: '状态',
          dataIndex: 'status',
          render: (data:number) => status[data]
        },
        {
          title: '操作',
          render: (record: TableData) => (
            <Space size="middle">
            {record.status === 0 && (
              <Popconfirm
                title="申请下架"
                description="确认申请下架？"
                onConfirm={() => handleTakeDown(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  type="primary" 
                  style={{ backgroundColor: 'lemonchiffon' }}
                >
                下架
                </Button>
              </Popconfirm>
            )}
          </Space>
          )
        }
    ]

    const handleTakeDown = (record:TableData) => {
      const updatedData = tableData.filter(order => {
        return order.book_id !== record.book_id;
    });
    setMyResources(updatedData)
    };
  

    return (
      <div>
        <Card title={`您截止现在已经与大家分享了${tableData.length}本书`}>
          <Table rowKey={'book_id'} columns={columns} dataSource={myResources} />
        </Card>
      </div>
    );
  };
  
  export default MyResources