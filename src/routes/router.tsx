import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/Error/notFound";
import Start from "../pages/Home/Start";
import PublicBooks from "../pages/Books/PublicBooks";
import Information from "../pages/Information/Information";
import SmartChats from "../pages/SmartChats/SmartChats";
import SmartService from "../pages/SmartService/SmartService";
import BookDetails from "../pages/Books/BookDetails";
import RankingList from "../pages/Recommand/RankingList";
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
import FindLocation from "../pages/SmartService/FindLocation";
import WordClouds from "../pages/SmartService/WordClouds";
import AudioBooks from "../pages/SmartService/AudioBooks";
import HomePage from "../pages/Home/HomePage";
import ULibrary from "../pages/Books/ULibrary";
import ULibraryDetails from "../pages/Books/ULibraryDetails";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Start/>,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"publicBooks",
        element:<PublicBooks/>
      },
      {
        path:"uLibrary",
        element:<ULibrary/>
      },
      {
        path:"bookDetails",
        element:<BookDetails/>
      },
      {
        path:"uLibraryDetails",
        element:<ULibraryDetails/>
      },
      {
        path:"information",
        element:<Information/>
      },
      {
        path:"smartChats",
        element:<SmartChats/>
      },
      {
        path:"smartServices",
        element:<SmartService/>,
        children: [
          {
            path: "mapService",
            element: <FindLocation/>
          },
          {
            path: "wordClouds",
            element: <WordClouds/>
          },
          {
            path: "audioBooks",
            element: <AudioBooks/>
          }
        ]
      },
      {
        path: "rankingList",
        element: <RankingList/>
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
      }]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"*",
    element:<NotFound/>
  }
  ])


export default router