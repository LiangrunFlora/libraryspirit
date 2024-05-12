import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Grid, ListItemAvatar} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React, {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {itemData} from "../Books/PublicBooks";
import {useMutation} from "@tanstack/react-query";
import getAllBooks from "../../apis/queryFn/getAllBooks";
import toast from "react-hot-toast";
import getULibrary from "../../apis/queryFn/getULibrary";
import ULibraryCover from "../../resources/HomeImage/uLibraryCover.png"

interface rankingProps {
  bookList: Books[]|ULibrary[]; // 使用 User 类型的数组
}


const BookList: React.FC<rankingProps> = ({ bookList }) => {

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360 }}
      color='color.secondary'
    >
      {bookList.map((book, value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={book.book_name}
                  src={book.hasOwnProperty('cover') ? (book as Books).cover : ULibraryCover}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={book.book_name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
const RankingList = () => {
  const [bookListData, setBookListData] = useState<Books[]>([])
  const [uBookListData, setUBookListData] = useState<ULibrary[]>([])
  function compareStars(book1:Books, book2:Books){
    return book1.stars - book2.stars
  }
  const {mutate:getBookRank} = useMutation({
    mutationFn:getAllBooks,
    onSuccess: (data) => {
      toast.dismiss()
      toast.success(<b>获取图书排名成功！</b>)
      setBookListData(data.data as Books[])
      bookListData.sort(compareStars)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const {mutate:getUBook} = useMutation({
    mutationFn:getULibrary,
    onSuccess: (data) => {
      toast.dismiss()
      toast.success(<b>个性化图书推荐列表获取成功！</b>)
      setUBookListData(data.data as ULibrary[])
    },
    onError: (error) => {
      console.log(error)
    }
  })
  // 在进入界面时候即加载
  useEffect(()=>{
    getBookRank()
    getUBook()
  },[])

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 6,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          sx={{ marginBottom: 3, fontWeight: "bold" }}
        >
          排行榜
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: 3, fontWeight: "bold" }}
            >
              图书人气排行榜
            </Typography>
            <BookList bookList={bookListData} />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: 3, fontWeight: "bold" }}
            >
              个性推荐排行榜
            </Typography>
            <BookList bookList={uBookListData} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RankingList