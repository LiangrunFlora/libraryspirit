import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useLocation} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Stack} from "@mui/material";
import Stars from "./Stars";
import Button from "@mui/material/Button";
import CommandList from "./CommandList";
import React, {useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import toast from "react-hot-toast";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";


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


const BookDetails = () => {
  const location = useLocation()
  //注意这里的对象层次
  const bookDetailData = location.state.bookDetailData

  //借书确认窗口操作
  const [open, setOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false)

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

  return (
    <>
      <React.Fragment>
        <Box sx={{paddingTop: 3, paddingLeft: 3}}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                首页
              </Link>
              <Link
                underline="hover"
                color="inherit"
              >
                {bookDetailData.category}
              </Link>
              <Typography color="text.primary">{bookDetailData.bookName}</Typography>
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
                  alt={bookDetailData.bookName}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{margin: 3, fontWeight: "bold"}}
                >
                  {bookDetailData.bookName}
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
                          {bookDetailData.bookName}
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
                  <Button color="secondary"> 查看位置</Button>
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
          <CommandList/>
        </Card>
      </React.Fragment>
    </>
  )
}

export default BookDetails