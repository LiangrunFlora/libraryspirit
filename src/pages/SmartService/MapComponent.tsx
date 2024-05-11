import {useEffect} from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import "./MapComponent.css"
import Card from "@mui/material/Card";

export default function MapComponent() {
  let map: any = null;


  useEffect(() => {
    // @ts-ignore
    window._AMapSecurityConfig = {
      securityJsCode: "33c55b31680d4950924612382ecf75d3",
    };
    AMapLoader.load({
      key: "87179f201121cf95192c9e8d1dbe12b6", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 18, // 初始化地图级别
          center: [112.990491,28.139395], // 初始化地图中心点位置
        });

        // 创建一个 icon
        const Icon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: 'https://a.amap.com/jsapi/static/image/plugin/marker_red.png',
          imageSize: new AMap.Size(25, 34)
        });

        const marker = new AMap.Marker({
          position: new AMap.LngLat(112.990491,28.139395),
          offset: new AMap.Pixel(-15, -15),
          icon: Icon, //添加 icon 图标 URL
          title: "您查找的图书馆位置",
        });
        map.add(marker)

        //信息窗体的内容
        var content = [
          "<div><b>您查找的图书馆位置</b>",
          "电话 : 0731—82655411  邮编 : 410000",
          "地址 : 湖南省长沙市中南大学铁道校区图书馆</div>",
        ];

        //创建 infoWindow 实例
        var infoWindow = new AMap.InfoWindow({
          content: content.join("<br>"), //传入字符串拼接的 DOM 元素
          anchor: "top-left",
        });

        //打开信息窗体
        infoWindow.open(map, map.getCenter()); //map 为当前地图的实例，map.getCenter() 用于获取地图中心点坐标。

      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <Card sx={{margin:3}}>
      <div className="MapContainerWrapper"
           style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div
          id="container"
          className="MapComponent"
          style={{height: "800px"}}
        ></div>
      </div>
    </Card>
  );
}
