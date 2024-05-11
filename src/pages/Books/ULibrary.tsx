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
import {Fab, Grid} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import {useMutation} from "@tanstack/react-query";
import getAllBooks from "../../apis/queryFn/getAllBooks";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import getBooksByCategory from "../../apis/queryFn/getBooksByCategory";
import AddIcon from "@mui/icons-material/Add";
import getULibrary from "../../apis/queryFn/getULibrary";
import ULibraryCover from "../../resources/HomeImage/uLibraryCover.png"

const categoryList = ['文学类', '自然科学类', '工学类', '经济类', '历史地理类']
const personalResourcesList = ['学习笔记','课程资料','更多']

interface MediaCardProps {
  item: ULibrary;
}

const ULibrary = () => {

  const [uLibraryData, setuLibraryData] = useState<ULibrary[]>([])

  const navigate = useNavigate()

  const onBookClickHandle = (item: ULibrary) => {
    return () => {
      // 在这里处理点击事件，并访问传递的参数 item
      console.log("Clicked uLibrary:", item);
      // 使用编程式导航进行页面跳转，并将item作为参数传递
      navigate(`/uLibraryDetails`, {state: {uLibraryDetailData: item}});
    };
  };

  const {mutate: getULibraryBooks} = useMutation({
    mutationFn: getULibrary,
    onSuccess: (data) => {
      if (data.code === 20044) {
        toast.dismiss();
        toast.success(<b>获取个人图书馆资源成功！</b>)
        console.log(data.data)
        setuLibraryData(data.data as ULibrary[])
      }
    },
    onError: (error) => {
      toast.error(<b>获取个人图书馆资源失败</b>)
    }
  })

  useEffect(() => {
    getULibraryBooks()
  }, [])


  //获取图书类别
  const handleCategoryClick = () => {
     navigate('/publicBooks')
  }

  //跳转个人图书馆
  const handlePersonalResClick = () => {
    return () => {
      navigate('/uLibrary')
    }
  }

  // 具体图书Card
  const MediaCard: React.FC<MediaCardProps> = ({item}) => {
    return (
      <Card sx={{maxWidth: 350, height:320}}>
        <CardMedia
          sx={{height: 140}}
          image={ULibraryCover}
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

  function bookchunk(array:ULibrary[], size:number) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

  const DrawerList = (
    <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {categoryList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleCategoryClick}>
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
        {personalResourcesList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handlePersonalResClick}>
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
              {bookchunk(uLibraryData, 3).map((row, rowIndex) => (
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
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000, // 确保 FAB 在其他内容之上
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </>
  )
}
export default ULibrary