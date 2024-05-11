import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Grid, ListItemAvatar} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {itemData} from "../Books/PublicBooks";

interface rankingProps {
  bookList: Books[]; // 使用 User 类型的数组
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
                  src={book.cover}
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
            {/*todo 这里itemData使用的是图书的测试数据，需要实际排行逻辑*/}
            <BookList bookList={itemData} />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: 3, fontWeight: "bold" }}
            >
              个性推荐排行榜
            </Typography>
            <BookList bookList={itemData} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RankingList