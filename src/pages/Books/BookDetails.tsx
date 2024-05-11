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
import getUserBorrows from "../../apis/queryFn/getUserBorrows";
import {getUserInfoFromSession} from "../../util/userInfo";
import { styled } from '@mui/material/styles';
import QRCodeComponent from "../../components/Header/QRCode";
import postBorrows from "../../apis/queryFn/postBorrows";
import {ImageButton} from "../SmartService/MenuService";
import audioBookService from "../../resources/HomeImage/audioBookService.png";

const image = {
  url: audioBookService,
  title: '有声书',
  width: '33%',
}

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});
const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

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

// const commentInfoTest: CommentInfo[] = [
//   {
//     user_cover: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     user_name: 'User 1',
//     content: '这是第一条评论。',
//     comment_date: new Date('2024-05-10T08:30:00'),
//   },
//   {
//     user_cover: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     user_name: 'User 2',
//     content: '这是第二条评论。',
//     comment_date: new Date('2024-05-09T12:45:00'),
//   },
//   {
//     user_cover: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     user_name: 'User 3',
//     content: '这是第三条评论。',
//     comment_date: new Date('2024-05-08T18:20:00'),
//   },
// ];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const BookDetails = () => {
  const location = useLocation()
  //注意这里的对象层次
  const bookDetailData = location.state.bookDetailData
  const navigate = useNavigate()

  //借书确认窗口操作
  const [open, setOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false)
  const [commentInfo, setCommentInfo] = useState<CommentInfo[]>([])
  const [isBorrowAvailable, setIsBorrowAvailable] = useState(true)
  const [isLogin, setIsLogin] = useState(true)
  const [QRCodeOpen, setQRCodeOpen] = useState(false)

  const {mutate:getBookComments} = useMutation({
    mutationFn:getCommentInfoByBookId,
    onSuccess: (data) => {
      if(data.code === 20084){
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

  const {mutate:handleUserBorrowPermissions
  } = useMutation({
    mutationFn:getUserBorrows,
    onSuccess: (data) => {
      if(data.code === 20064){
        const borrowList = data.data as Borrow[]
        const borrowNum = borrowList.length
        // 判断借阅书籍数量是否在限制内且是否借阅过
        if(borrowNum < 6){
          let isBorrowed = false;
          for (const borrow of borrowList){
            if(borrow.book_id === bookDetailData.book_id){
              setIsBorrowAvailable(false)
              isBorrowed = true
            }
          }
          if(!isBorrowed){
            setIsBorrowAvailable(true)
          }
        }else{
          setIsBorrowAvailable(false)
        }
      }
    }
  })
  const {mutate:postBorrowData} = useMutation({
    mutationFn:postBorrows,
    onSuccess: (data) => {
      if(data.code === 20061){
        console.log("postBorrows success")
      }
    },
    onError: () => {
      console.log("postBorrows error")
    }
  })

  const handleMenuClick = (bookDetailData:Books) => {
    return () => {
      navigate('/smartServices/audioBooks',{ state: { currentBookData: bookDetailData } })
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleQRClickOpen = () => {
    setQRCodeOpen(true);
  };
  const handleQRClose = () => {
    setQRCodeOpen(false);
  };

  //界面借阅提示框之后的处理
  const handleConfirm = () => {
    // 如果用户已登录
    const currentUser = getUserInfoFromSession()
    if(currentUser){
      //获取user信息
      //第二步验证借阅书籍数目是否在范围内并且没有借过此书
      handleUserBorrowPermissions(currentUser.user_id)
      if(isBorrowAvailable){
        //在范围内，借阅申请发送成功先提示用户，保证界面响应
        toast.dismiss()
        toast.success(<b>借阅申请发送成功！即将发送二维码给您</b>)
        setOpen(false)
        setTimeout(() => {
          setQRCodeOpen(true);
        }, 500); // 1s
        //设置借阅信息
        const borrowData:Borrow = {} as Borrow
        //获取当前时间和到期时间
        const rowBorrowDate = new Date()
        //  获取 ISO 8601 格式的日期时间字符串,传递给 MySQL 查询时，MySQL 会自动将其转换为 DATE 类型。
        const borrowDate = rowBorrowDate.toISOString().slice(0, 10)
        const rowExpiredDate = new Date()
        rowExpiredDate.setDate(rowExpiredDate.getDate() + 15);
        const expiredDate = rowExpiredDate.toISOString().slice(0, 10)
        borrowData.user_id = currentUser.user_id
        borrowData.user_name = currentUser.user_name
        borrowData.book_id = bookDetailData.book_id
        borrowData.book_name = bookDetailData.book_name
        borrowData.borrow_date = borrowDate
        borrowData.expired_date = expiredDate
        borrowData.is_agree = false
        borrowData.is_return = 0
        // 借阅信息写入数据库borrow
        postBorrowData(borrowData)
      }else{
        // 不在范围内，借阅失败，向用户提示
        toast.dismiss()
        toast.error(<b>借阅失败！您已经超过借阅数目上限</b>)
        setOpen(false)
      }
    }else{
      //如果用户未登录，跳转登录界面
      toast.dismiss()
      toast.error(<b>您还未登录，请先登录</b>)
      navigate('/login')
    }
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
              <Grid item xs={4}>
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
                  sx={{ mb: 1.5, fontSize: 20, margin: 3,display: 'flex',
                    justifyContent: 'center',}}
                  color="rgb(27, 69, 169)">
                  想试试有声书？点击这里
                </Typography>
                <ImageButton
                  focusRipple
                  key={image.title}
                  style={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                  onClick={handleMenuClick(bookDetailData)}
                >
                  <ImageSrc style={{backgroundImage: `url(${image.url})`}}/>
                  <ImageBackdrop className="MuiImageBackdrop-root"/>
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      {image.title}
                      <ImageMarked className="MuiImageMarked-root"/>
                    </Typography>
                  </Image>
                </ImageButton>
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

                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={QRCodeOpen}
                    >
                      <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        您的借书二维码
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon/>
                      </IconButton>
                      <DialogContent dividers>
                        {/*二维码界面*/}
                        <QRCodeComponent/>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleQRClose}>
                          OK
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>


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