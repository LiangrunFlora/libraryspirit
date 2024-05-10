import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import bookShape from '../../resources/HomeImage/bookShape.png'
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
export const index = (props: any) => {
  const option = {
    series: [
      {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [20, 300],
        rotationRange: [-90, 90],
        shape: {
          image: {bookShape}, // 你的书本图片 URL
          width: 300, // 图片宽度
          height: 400, // 图片高度
        },
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
          }
        },
        emphasis: {
          // focus: 'self',
          textStyle: {
            textShadowBlur: 3,
            textShadowColor: '#333'
          }
        },
        data: [
          {
            name: 'Sam S Club',
            value: 10000,
          },
          {
            name: 'Macys',
            value: 6181,
          },
          {
            name: 'Amy Schumer',
            value: 4386,
          },
          {
            name: 'Jurassic World',
            value: 4055,
          },
          {
            name: 'Charter Communications',
            value: 2467,
          },
          {
            name: 'Chick Fil A',
            value: 2244,
          },
          {
            name: 'Planet Fitness',
            value: 1898,
          },
          {
            name: 'Pitch Perfect',
            value: 1484,
          },
          {
            name: 'Express',
            value: 1112,
          },
          {
            name: 'Home',
            value: 965,
          },
          {
            name: 'Johnny Depp',
            value: 847,
          },
          {
            name: 'Lena Dunham',
            value: 582,
          },
          {
            name: 'Lewis Hamilton',
            value: 555,
          },
          {
            name: 'KXAN',
            value: 550,
          },
          {
            name: 'Mary Ellen Mark',
            value: 462,
          },
          {
            name: 'Farrah Abraham',
            value: 366,
          },
          {
            name: 'Rita Ora',
            value: 360,
          },
          {
            name: 'Serena Williams',
            value: 282,
          },
          {
            name: 'NCAA baseball tournament',
            value: 273,
          },
          {
            name: 'Point',
            value: 273,
          },
          {
            name: 'Point Break',
            value: 265,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Card sx={{height: '600px', padding:3}}>
        <Typography
          variant="h5"
          component="div"
          sx={{marginLeft:3,marginTop:3, fontWeight: "bold" }}>
          你的词云分析
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: 17, marginTop:2, marginLeft:3 }}
          color="text.secondary"
        >
          使用形象化的词云分析你的个人行为！
        </Typography>
          <ReactEcharts
            option={option as any}
            notMerge
            lazyUpdate
            style={{height: '100%', width: '100%'}}
          />
      </Card>
    </>
  )
    ;
};

export default index