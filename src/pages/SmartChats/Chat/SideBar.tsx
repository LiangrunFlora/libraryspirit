import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import sideBarImage from "../../../resources/HomeImage/sidebar.png"
import gptImage from "../../../resources/HomeImage/gpt2.png"

const NewChatSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar alt="New Chat" src={gptImage} />
        <Typography variant="h6" className="title">
          New Chat
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Chat with me!" />
        </ListItem>

        {/* Add more list items as needed */}
      </List>
      <Divider />
      <div className="sidebar-footer">
        <Tooltip title="Add New Chat">
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <img src={sideBarImage} alt="Sidebar Image" className="sidebar-image"/>
    </div>
  );
};

export default NewChatSidebar;
