import Typography from "@mui/material/Typography";
import ReactEcharts from "echarts-for-react";
import Card from "@mui/material/Card";
import React from "react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import MapComponent from "./MapComponent";


const FindLocation = () => {
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <Card sx={{height: '800px', padding: 3, margin: 3}}>
        <Typography
          variant="h5"
          component="div"
          sx={{marginLeft: 3, marginTop: 3, fontWeight: "bold"}}>
          查找图书馆定位
        </Typography>
        <Typography
          sx={{mb: 1.5, fontSize: 17, marginTop: 2, marginLeft: 3}}
          color="text.secondary"
        >
          搜索图书馆位置信息，一键导航！
        </Typography>
        <div className="MapContainerWrapper"
             style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80%"}}
            suffix={suffix}
            onSearch={onSearch}
          />
        </div>
          <MapComponent/>
      </Card>
    </>
)
}

export default FindLocation