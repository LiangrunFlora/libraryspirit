import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined} from '@ant-design/icons';
import './MyResources.scss'
import { getUserInfoFromSession } from '../../../../util/userInfo';
import {deleteMyResources, getMyResources} from "../../../../apis/queryFn/myResources";

// const tableData: myResourcesType[] = [
// { book_id: 1, book_name: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", press: "Scribner", status: 0 },
// { book_id: 2, book_name: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", press: "J. B. Lippincott & Co.", status: 1 },
// { book_id: 3, book_name: "1984", author: "George Orwell", category: "Fiction", press: "Secker & Warburg", status: 1 },
// { book_id: 4, book_name: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", press: "T. Egerton, Whitehall", status: 0 },
// { book_id: 5, book_name: "The Catcher in the Rye", author: "J. D. Salinger", category: "Fiction", press: "Little, Brown and Company", status: 1 }
// ];

const MyResources:React.FC = () => {

    const [myResources, setMyResources] = useState<myResourcesType[]>();

    const fetchData = async () => {
      const userId = getUserInfoFromSession()?.user_id || 1;
      const res = await getMyResources(userId)
      return res;
    };
    
    useEffect(() => {
      fetchData()
      .then(res => {
         console.log(res.data); 
         setMyResources(res.data)
      })
      .catch(error => {
         message.error("获取失败~")
      });
    }, []);

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
          title: '状态',
          dataIndex: 'status',
          render: (data:number) => status[data]
        },
        {
          title: '操作',
          render: (record: myResourcesType) => (
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

    const handleTakeDown = async (record:myResourcesType) => {
      const res = await deleteMyResources(record.book_id);
      if(res.code===20052)
        {
        const updatedData = myResources?.filter(order => {
        return order.book_id !== record.book_id;
        });
        setMyResources(updatedData)
        message.success("下架成功~")
        }
      else {
        message.error("下架失败~")
      }

    };
  

    return (
      <div>
        <Card title={`您截止现在已经与大家分享了${myResources?.length}本书`}>
          <Table rowKey={'book_id'} columns={columns} dataSource={myResources} />
        </Card>
      </div>
    );
  };
  
  export default MyResources