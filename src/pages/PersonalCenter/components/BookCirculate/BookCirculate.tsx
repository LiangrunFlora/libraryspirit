import React,{ useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card,message } from 'antd';
import { EditOutlined, ClockCircleOutlined,CloseOutlined } from '@ant-design/icons';
import './BookCirculate.scss'
import { getUserInfoFromSession } from '../../../../util/userInfo';
import { getBorrows, returnBorrows,deleteBorrows } from '../../../../apis/queryfn/borrows';

// 测试数据
// const BookCirculateTypeExample = [
//     {
//       id:1,
//       book_id: 1,
//       cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
//       book_name: "The Great Gatsby",
//       borrow_date: "",
//       expired_date: "",
//       is_agree:0
//     },
//     {
//       id:1,
//       book_id: 2,
//       cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
//       book_name: "To Kill a Mockingbird",
//       borrow_date: "",
//       expired_date: "",
//       is_agree:0
//     },
//     {
//       id:1,
//       book_id: 3,
//       cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
//       book_name: "1984",
//       borrow_date: "2024-05-02",
//       expired_date: "2024-06-02",
//       is_agree:1
//     },
//     {
//       id:1,
//       book_id: 4,
//       cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
//       book_name: "Pride and Prejudice",
//       borrow_date: "2024-04-20",
//       expired_date: "2024-05-20",
//       is_agree:1
//     },
//     {
//       id:1,
//       book_id: 5,
//       cover:"https://img0.baidu.com/it/u=4085765120,772646386&fm=253&fmt=auto&app=138&f=JPEG?w=809&h=500",
//       book_name: "The Catcher in the Rye",
//       borrow_date: "",
//       expired_date: "",
//       is_agree:0
//     }
//   ];

const BookCirculate:React.FC = () => {

const [circulateData, setCirculateData] = useState<BookCirculateType[]>();

const fetchData = async () => {
  const userId = getUserInfoFromSession()?.user_id || 1;
  const res = await getBorrows(userId)
  return res;
};

useEffect(() => {
  fetchData()
  .then(res => {
     console.log(res.data); 
     setCirculateData(res.data)
  })
  .catch(error => {
     message.error("获取失败~")
  });
}, []);

  const status = {
    0: <Tag color='volcano'>审核中！</Tag>,
    1: <Tag color='green'>借阅中~</Tag>
  } as Record<string, JSX.Element>;

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
        title: '借出时间',
        dataIndex: 'borrow_date'
      },
      {
        title: '归还截止时间',
        dataIndex: 'expired_date'
      },
      {
        title: '状态',
        dataIndex: 'is_agree',
        render: (data:string) => status[data]
      },
      {
        title: '操作',
        render: (record: BookCirculateType) => (
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

  const handleReturn = async (record:BookCirculateType) => {
    const res = await returnBorrows(record.id)
    if(res.code===20063){
      setCirculateData(circulateData?.filter(item => item.id!=record.id))
      message.success("还书成功~")
    }
    else{
      message.error("出错了~")
    }
  };

  const handleExtention = (record:BookCirculateType) => {
    message.success("申请延时发送成功~")
  };

  const handleCancle = async (record:BookCirculateType)=>{
    const res = await deleteBorrows(record.id)
    if(res.code===20062){
      setCirculateData(circulateData?.filter(item => item.id!=record.id))
      message.success("取消成功~")
    }
    else{
      message.error("出错了~")
    }
  }


  return (
    <div>
      <Card title={`您目前还有${ circulateData?.filter(item => item.is_agree !== 0).length}本书未归还`}>
        <Table rowKey={'id'} columns={columns} dataSource={circulateData} />
      </Card>
    </div>
  );
};

export default BookCirculate