import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/Error/notFound";
import Start from "../pages/Home/Start";
import Login from "../pages/Login/login";
import Personal from "../pages/PersonalCenter/Personal";
import PersonalInformation from "../pages/PersonalCenter/components/Information/PersonalInformation";
import BookCirculate from "../pages/PersonalCenter/components/BookCirculate/BookCirculate";
import BookHistory from "../pages/PersonalCenter/components/BookHistory/BookHistory";
import Announcement from "../pages/PersonalCenter/components/Announcement/Announcement";
import MyAsk from "../pages/PersonalCenter/components/MyAsk/MyAsk";
import MyResources from "../pages/PersonalCenter/components/MyResources/MyResources";
import UploadResource from "../pages/PersonalCenter/components/UploadResources/UploadResource";
import OtherResources from "../pages/PersonalCenter/components/OtherResources/OtherResources";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Start/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/personal",
    element:<Personal></Personal>,
    children:[
      {
        path:'',
        element:<PersonalInformation></PersonalInformation>
      },
      {
        path:'information',
        element:<PersonalInformation></PersonalInformation>
      },
      {
        path:'ask',
        element:<MyAsk></MyAsk>
      },
      {
        path:'circulate',
        element:<BookCirculate></BookCirculate>
      },
      {
        path:'record',
        element:<BookHistory></BookHistory>
      },
      {
        path:'myResources',
        element:<MyResources></MyResources>
      },
      {
        path:'otherResources',
        element:<OtherResources></OtherResources>
      },
      {
        path:'upload',
        element:<UploadResource></UploadResource>
      },
      {
        path:'announcement',
        element:<Announcement></Announcement>
      }
    ]
  },
  {
    path:"*",
    element:<NotFound/>
  }
  ])


export default router