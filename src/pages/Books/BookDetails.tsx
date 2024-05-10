import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link, useLocation} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Stack} from "@mui/material";
import Stars from "./Stars";
import Button from "@mui/material/Button";
import CommandList from "./CommentList";
import React, {useEffect, useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import toast from "react-hot-toast";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import {useMutation} from "@tanstack/react-query";
import getCommentsByBookId from "../../apis/queryFn/getCommentsByBookId";
import CommentList from "./CommentList";
import getCommentInfoByBookId from "../../apis/queryFn/getCommentsByBookId";
import {useNavigate} from "react-router";


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const commentInfoTest: CommentInfo[] = [
  {
    user_cover: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    user_name: 'User 1',
    content: '这是第一条评论。',
    comment_date: new Date('2024-05-10T08:30:00'),
  },
  {
    user_cover: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    user_name: 'User 2',
    content: '这是第二条评论。',
    comment_date: new Date('2024-05-09T12:45:00'),
  },
  {
    user_cover: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    user_name: 'User 3',
    content: '这是第三条评论。',
    comment_date: new Date('2024-05-08T18:20:00'),
  },
];

const BookDetails = () => {
  const location = useLocation()
  //注意这里的对象层次
  const bookDetailData = location.state.bookDetailData

  //借书确认窗口操作
  const [open, setOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false)
  const [commentInfo, setCommentInfo] = useState<CommentInfo[]>([])

  const {mutate:getBookComments} = useMutation({
    mutationFn:getCommentInfoByBookId,
    onSuccess: (data) => {
      if(data.code === 20034){
        toast.dismiss()
        toast.success(<b>获取图书评论成功！</b>)
        setCommentInfo(data.data as CommentInfo[])
        console.log(data.data)
      }
    },
    onError: (error) => {
      toast.error(<b>获取图书评论失败！</b>)
    }
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    // todo 逻辑判断用户是否登录且借阅数目是否小于6本
    toast.success(<b>借阅成功！</b>)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleReadClickOpen = () => {
    setReadOpen(true)
  }

  const handleReadClickClose = () => {
    setReadOpen(false)
  }

  const navigate = useNavigate()
  // 获取位置信息
  const handleLocationClick = () => {
    navigate(`/smartServices`);
  }

  // 进入界面即加载评论，且只加载一次
  useEffect(() => {
    getBookComments(bookDetailData.book_id)
  },[])

  return (
    <>
      <React.Fragment>
        <Box sx={{paddingTop: 3, paddingLeft: 3}}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/home" style={{ color: 'grey' }}>
                首页
              </Link>
              <Link
                to="/publicBooks"
                style={{ color: 'grey' }}
              >
                {bookDetailData.category}
              </Link>
              <Typography color="text.primary">{bookDetailData.book_name}</Typography>
            </Breadcrumbs>
          </div>
        </Box>
        <Card
          sx={{
            minWidth: 275,
            margin: 6,
            backgroundColor: 'rgb(251, 250, 242)'
          }}
        >

          <CardContent>

            <Grid container rowSpacing={1} columnSpacing={{xs: 1}} sx={{padding: 3}}>
              <Grid item xs={4}>
                <img
                  srcSet={`${bookDetailData.cover}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${bookDetailData.cover}?w=164&h=164&fit=crop&auto=format`}
                  alt={bookDetailData.book_name}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{margin: 3, fontWeight: "bold"}}
                >
                  {bookDetailData.book_name}
                </Typography>

                <Typography
                  sx={{mb: 1.5, margin: 3}}
                  color='text.secondary'
                >
                  {bookDetailData.author}
                </Typography>
                <Typography
                  sx={{mb: 1.5, margin: 3}}
                  color='text.secondary'
                >
                  {bookDetailData.press}
                </Typography>
                <Typography
                  sx={{mb: 1.5, margin: 3}}
                  color='text.secondary'
                >
                  {bookDetailData.introduction}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{mb: 1.5}}
                  color='text.secondary'
                >
                  给这部作品评分吧！
                </Typography>
                <Stars/>
              </Grid>
              <Grid item xs={6} sx={{padding: 3}}>
                <Stack direction="row" spacing={3}>
                  <Button variant="outlined" color="error" onClick={handleReadClickOpen}>
                    试读本书
                  </Button>
                  {/*试读本书对话窗口*/}
                  <Dialog
                    fullScreen
                    open={readOpen}
                    onClose={handleReadClickClose}
                    TransitionComponent={Transition}
                  >
                    <AppBar sx={{position: 'relative'}}>
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleReadClickClose}
                          aria-label="close"
                        >
                          <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                          {bookDetailData.book_name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                          save
                        </Button>
                      </Toolbar>
                    </AppBar>
                    <List>
                      <Typography color="color.secondary">
                        {bookDetailData.introduction}
                      </Typography>
                    </List>
                  </Dialog>

                  <Button variant="contained" color="success" onClick={handleClickOpen}>
                    借阅本书
                  </Button>
                  {/*对话框*/}
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"确定借阅本书?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        借阅本书需要您的读者资格以及借阅限制书本数目，确认通过后将会给您发送二维码
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>退出</Button>
                      <Button onClick={handleConfirm}>确认</Button>
                    </DialogActions>
                  </Dialog>
                  <Button color="secondary" onClick={handleLocationClick}> 查看位置</Button>
                </Stack>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
        <Typography
          variant="h5"
          component="div"
          sx={{marginLeft: 6, fontWeight: "bold"}}
        >
          评论
        </Typography>
        <Card
          sx={{
            minWidth: 275,
            marginLeft: 6
          }}
        >
         <CommentList commentInfo={commentInfo}/>
        </Card>
      </React.Fragment>
    </>
  )
}

export default BookDetails