import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LiveFromSpace from '../../resources/HomeImage/liveFronSpace.png'
import {Grid} from "@mui/material";

// 测试数据
const songs = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "https://example.com/songs/shape_of_you.mp3"
  },
  {
    title: "Someone Like You",
    artist: "Adele",
    url: "https://example.com/songs/someone_like_you.mp3"
  },
  {
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    url: "https://example.com/songs/despacito.mp3"
  },
  {
    title: "Closer",
    artist: "The Chainsmokers ft. Halsey",
    url: "https://example.com/songs/closer.mp3"
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    url: "https://example.com/songs/uptown_funk.mp3"
  },
  {
    title: "Old Town Road",
    artist: "Lil Nas X ft. Billy Ray Cyrus",
    url: "https://example.com/songs/old_town_road.mp3"
  },
  {
    title: "Havana",
    artist: "Camila Cabello ft. Young Thug",
    url: "https://example.com/songs/havana.mp3"
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    url: "https://example.com/songs/thinking_out_loud.mp3"
  },
  {
    title: "Hello",
    artist: "Adele",
    url: "https://example.com/songs/hello.mp3"
  },
  {
    title: "Love Yourself",
    artist: "Justin Bieber",
    url: "https://example.com/songs/love_yourself.mp3"
  },
  // 可以继续添加更多的歌曲数据
];

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <>
      <Grid container xs={12}>
        {songs.map((song, index) => (
          <Grid xs={4}>
            <Card sx={{display: 'flex',width:400, margin:3}}>
              <Box sx={{display: 'flex', flexDirection: 'column', flex: '1 0 auto'}}>
                <CardContent>
                  <Typography component="div" variant="h5">
                    {song.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {song.artist}
                  </Typography>
                </CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{height: 38, width: 38}}/>
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                  </IconButton>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{width: 151, alignSelf: 'flex-end'}}
                image={LiveFromSpace}
                alt="Live from space album cover"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
