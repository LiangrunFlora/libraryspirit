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
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import PauseIcon from '@mui/icons-material/Pause';
import {useMutation} from "@tanstack/react-query";
import postTTS, {playAudio} from "../../apis/queryFn/tts";
import toast from "react-hot-toast";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("")
  // const [isPlayClicked, setIsPlayClicked] = useState(false)
  const [isSelectCurrentBook, setIsSelectCurrentBook] = useState(false)
  const [isAudioLoadOver, setIsAudioLoadOver] = useState(false)
  const location = useLocation()
  const currentBook = location?.state?.currentBookData

  // useEffect(() => {
  //   if(location.state){
  //     setIsSelectCurrentBook(true)
  //     // setCurrentBook(location.state.currentBookData as Books)
  //     console.log(isSelectCurrentBook)
  //     console.log(currentBook)
  //     //进入界面如果是选择了书籍则立即请求语音
  //     if(location.state.currentBookData){
  //       const ttsInfo = {} as TTS_Info
  //       const book_name = location.state.currentBookData.book_name
  //       const text = currentBook.introduction
  //       ttsInfo.book_name = book_name
  //       ttsInfo.text = text
  //       postTTSInfo(ttsInfo)
  //     }
  //   }else{
  //     setIsSelectCurrentBook(false)
  //   }
  // },[location.state])

  const {mutate:postTTSInfo} = useMutation({
    mutationFn:postTTS,
    onSuccess: (data) => {
      if(data.code === 200101){
        toast.dismiss()
        toast.success(<b>歌曲加载成功！</b>)
        setIsAudioLoadOver(true)
        console.log("TTS post success")
      }
    },
    onError: (error) => {
      console.log("TTS post error")
    }
  })
  // todo 这里要双击才能播放
  const firstTogglePlayHandle = async () => {
    if(!isAudioLoadOver){
      if(location.state){
        setIsSelectCurrentBook(true)
        // setCurrentBook(location.state.currentBookData as Books)
        console.log(isSelectCurrentBook)
        console.log(currentBook)
        //进入界面如果是选择了书籍则立即请求语音
        if(location.state.currentBookData){
          const ttsInfo = {} as TTS_Info
          const book_name = location.state.currentBookData.book_name
          const text = currentBook.introduction
          ttsInfo.book_name = book_name
          ttsInfo.text = text
          postTTSInfo(ttsInfo)
        }
      }else {
        setIsSelectCurrentBook(false)
      }
    }
    if (isAudioLoadOver) {
      setIsPlaying(!isPlaying)
      if (currentBook && isPlaying) {
        const filename = `${currentBook.book_name}.wav`
        const url = await playAudio(filename)
        setAudioUrl(url)
      }
    } else {
      //歌曲没有加载好
      toast.dismiss()
      toast.error(<b>有声书还在加载中，请稍等</b>)
    }
  }
  return (
    <>
      {/*如果选择了当前播放就显示*/}
      {currentBook&&(
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Card sx={{display: 'flex', width: 500, margin: 3}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: '1 0 auto'}}>
              <Typography sx={{color:"text.secondary"}}>
                当前播放：
              </Typography>
              <CardContent>
                <Typography component="div" variant="h5">
                  {currentBook.book_name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {currentBook.author}
                </Typography>
              </CardContent>
              <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                </IconButton>
                <IconButton aria-label="play/pause" onClick={firstTogglePlayHandle}>
                  {!isPlaying ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
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
            {isPlaying && (
              <audio controls autoPlay>
                <source src={audioUrl} type="audio/mp3" />
              </audio>
            )}
          </Card>
        </Box>
      )}

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

