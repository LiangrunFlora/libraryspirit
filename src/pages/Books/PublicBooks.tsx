import * as React from 'react';
import {useNavigate} from "react-router";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import {useMutation} from "@tanstack/react-query";
import getAllBooks from '../../apis/queryfn/getAllBooks';
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import getBooksByCategory from '../../apis/queryfn/getBooksByCategory';


const categoryList = ['文学类', '自然科学类', '工学类', '经济类', '历史地理类']
// 测试数据
const itemData: Books[] = [
  {
    book_id: 1,
    cover: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    book_name: "Book One",
    author: "Author One",
    category: "Fiction",
    introduction: "This is the introduction of Book One.",
    press: "Publisher One",
    stars: 4,
  },
  {
    book_id: 2,
    cover: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    book_name: "Book Two",
    author: "Author Two",
    category: "Science",
    introduction: "This is the introduction of Book Two.",
    press: "Publisher Two",
    stars: 5,
  },
  {
    book_id: 3,
    cover: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    book_name: "Book Three",
    author: "Author Three",
    category: "History",
    introduction: "This is the introduction of Book Three.",
    press: "Publisher Three",
    stars: 3,
  },
];

interface MediaCardProps {
  item: Books;
}

const PublicBooks = () => {

  const [bookData, setBookData] = useState<Books[]>([])

  const navigate = useNavigate()

  const onBookClickHandle = (item: Books) => {
    return () => {
      // 在这里处理点击事件，并访问传递的参数 item
      console.log("Clicked book:", item);
      // 使用编程式导航进行页面跳转，并将item作为参数传递
      navigate(`/bookDetails`, {state: {bookDetailData: item}});
    };
  };

  const {mutate: getPublicBooks} = useMutation({
    mutationFn: getAllBooks,
    onSuccess: (data) => {
      if (data.code === 20014) {
        toast.dismiss();
        toast.success(<b>获取全部图书成功！</b>)
        console.log(data.data)
        setBookData(data.data as Books[])
      }
    },
    onError: (error) => {
      toast.error(<b>获取图书列表失败</b>)
      // console.log(error)
    }
  })

  const {mutate: getCategoryBooks} = useMutation({
    mutationFn: getBooksByCategory,
    onSuccess: (data) => {
      if (data.code === 20014) {
        toast.dismiss();
        toast.success(<b>获取图书成功！</b>)
        console.log(data.data)
        setBookData(data.data as Books[])
      }
    },
    onError: (error) => {
      toast.error(<b>获取对应种类图书失败</b>)
    }
  })

  useEffect(() => {
    getPublicBooks();
  }, [])


  const handleCategoryClick = (category:string) => {
    return () => {
      console.log(category)
      getCategoryBooks(category);
    }
  }

  // 具体图书Card
  const MediaCard: React.FC<MediaCardProps> = ({item}) => {
    return (
      <Card sx={{maxWidth: 350, height:320}}>
        <CardMedia
          sx={{height: 140}}
          image={item.cover}
          title={item.book_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.book_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.introduction}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onBookClickHandle(item)}>borrow</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function bookchunk(array:Books[], size:number) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

  const DrawerList = (
    <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {categoryList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleCategoryClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="个人图书馆"/>
          </ListItemButton>
        </ListItem>
        {['学习笔记', '课程资料', '更多'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // 添加阴影效果
          padding: '16px', // 可根据需要调整内边距
        }}
      >
        <Card sx={{padding: 3}}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <h2>选择你喜爱的好书！</h2>
          </Box>

          <div>
            <Button onClick={toggleDrawer(true)}>选择书籍类别</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3
          }}>
            <Grid container spacing={2}>
              {bookchunk(bookData, 3).map((row, rowIndex) => (
                <Grid item xs={12} key={rowIndex}>
                  <Grid container spacing={2}>
                    {row.map((item, itemIndex) => (
                      <Grid item xs={4} key={itemIndex}>
                        <MediaCard item={item}/>
                      </Grid>
                    ))}
                    {row.length < 3 && (
                      <Grid item xs={4} key="placeholder">
                        {/* 这里可以放置一个占位的空白组件 */}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Box>
    </>
  )
}
export default PublicBooks
export {itemData}