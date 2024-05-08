import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/Error/notFound";
import Start from "../pages/Home/Start";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Start/>
  },
  {
    path:"*",
    element:<NotFound/>
  }
  ])


export default router