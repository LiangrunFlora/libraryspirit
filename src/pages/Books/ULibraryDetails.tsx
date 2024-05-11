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
import postUBorrow from "../../apis/queryFn/postUBorrow";
import ULibraryCover from "../../resources/HomeImage/uLibraryCover.png"


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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const ULibraryDetails = () => {
  const location = useLocation()
  //注意这里的对象层次
  const uLibraryDetailData = location.state.uLibraryDetailData
  const navigate = useNavigate()

  //借书确认窗口操作
  const [open, setOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false)
  const [isBorrowAvailable, setIsBorrowAvailable] = useState(true)
  const [isLogin, setIsLogin] = useState(true)


  const {mutate:postUBorrowData} = useMutation({
    mutationFn:postUBorrow,
    onSuccess: (data) => {
      if(data.code === 20051){
        console.log("postBorrows success")
      }
    },
    onError: () => {
      console.log("postBorrows error")
    }
  })


  const handleClickOpen = () => {
    setOpen(true);
  };

  //界面借阅提示框之后的处理
  const handleConfirm = () => {
    // 如果用户已登录
    const currentUser = getUserInfoFromSession()
    if (currentUser) {
      //如果用户已经登录
      toast.dismiss()
      toast.success(<b>借阅申请发送成功！等待对方同意中</b>)
      setOpen(false)
      //设置借阅信息
      const uBorrowData: UBorrow = {} as UBorrow
      const rowBorrowDate = new Date()
      const borrowDate = rowBorrowDate.toISOString().slice(0, 10)
      uBorrowData.borrower_id = currentUser.user_id
      uBorrowData.lender_id = uLibraryDetailData.user_id
      uBorrowData.book_id = uLibraryDetailData.id
      uBorrowData.borrow_date = borrowDate
      uBorrowData.is_agree = 0
      uBorrowData.is_return = 0
      uBorrowData.book_name = uLibraryDetailData.book_name
      // 借阅信息写入数据库borrow
      postUBorrowData(uBorrowData)
    } else {
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
                {uLibraryDetailData.category}
              </Link>
              <Typography color="text.primary">{uLibraryDetailData.book_name}</Typography>
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
                  srcSet={`${ULibraryCover}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${ULibraryCover}?w=164&h=164&fit=crop&auto=format`}
                  alt={uLibraryDetailData.book_name}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{margin: 3, fontWeight: "bold"}}
                >
                  {uLibraryDetailData.book_name}
                </Typography>

                <Typography
                  sx={{mb: 1.5, margin: 3}}
                  color='text.secondary'
                >
                  {uLibraryDetailData.author}
                </Typography>
                {/*todo 添加图书所有者信息*/}
                <Typography
                  sx={{mb: 1.5, margin: 3}}
                  color='text.secondary'
                >
                  {uLibraryDetailData.press}
                </Typography>
                <Typography
                  sx={{mb: 1.5, margin: 3}}
                  color='text.secondary'
                >
                  {uLibraryDetailData.introduction}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{mb: 1.5}}
                  color='text.secondary'
                >
                  给分享的这部作品评分吧！
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
                          {uLibraryDetailData.book_name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                          save
                        </Button>
                      </Toolbar>
                    </AppBar>
                    <List>
                      <Typography color="color.secondary">
                        {uLibraryDetailData.introduction}
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
                        借阅本书需要您的读者资格以及图书所有者的同意，且需要支付少量费用
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
      </React.Fragment>
    </>
  )
}

export default ULibraryDetails