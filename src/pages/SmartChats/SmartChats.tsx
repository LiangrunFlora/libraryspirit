
import Chat from "./Chat/Chat";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Sidebar from "./Chat/SideBar";
const SmartChats = ()=>{
  return (
    <>
        <div style={{display: 'flex', alignItems: 'flex-start'}}>
          <div style={{marginRight: '50px',paddingLeft: '50px', paddingTop: '20px'}}>
            <Sidebar/>
          </div>
          <div style={{width: '100%', height: '110vh', padding: '50px'}}>
            <Chat/>
          </div>
        </div>
    </>
  )
}

export default SmartChats