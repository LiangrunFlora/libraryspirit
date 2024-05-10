import WordClouds from "./WordClouds";
import FindLocation from "./FindLocation";
import MenuService from "./MenuService";
import {Outlet} from "react-router-dom";

const SmartService = ()=>{
  return (
    <>
      <MenuService/>
      <Outlet/>
      {/*<FindLocation/>*/}
      {/*<WordClouds/>*/}
    </>
  )
}

export default SmartService