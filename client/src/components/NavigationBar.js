import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const NavigationBar = () => {
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event) => {
    console.log(anchorEl)
    setAnchorEl(event.currentTarget);
  }
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={"primary-search-account-menu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register/">Continue As Guest</Link>
      </MenuItem>
    </Menu>
  );
    
  let menu = loggedOutMenu;

  return (
    <div>
      
      <div id="navigation-bar">
        
      <Box
           sx={{
            height: 40,
          }}
        >       
                <Box >
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            align-content="right"
                            onClick={handleProfileMenuOpen}
                        >
                            { <AccountCircle /> }
                        </IconButton>
                    </Box>
        {
          menu
        }
        </Box>

      </div>
    </div>
  );
};

export default NavigationBar;
