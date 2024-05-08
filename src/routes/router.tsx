import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/Error/notFound";
import Start from "../pages/Home/Start";
import PublicBooks from "../pages/Books/PublicBooks";
import Information from "../pages/Information/Information";
import SmartChats from "../pages/SmartChats/SmartChats";
import SmartService from "../pages/SmartService/SmartService";
import BookDetails from "../pages/Books/BookDetails";
import RankingList from "../pages/Recommand/RankingList";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Start/>,
    children:[
      {
        path:"publicBooks",
        element:<PublicBooks/>
      },
      {
        path:"bookDetails",
        element:<BookDetails/>
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
        element:<SmartService/>
      },
      {
        path:"rankingList",
        element:<RankingList/>
      }
    ]
  },
  {
    path:"*",
    element:<NotFound/>
  },
  ])


export default router