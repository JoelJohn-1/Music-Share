// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const NavigationBar = () => {
  // eslint-disable-next-line
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleContinueAsGuest = () => {
    handleMenuClose();
    auth.loginAsGuest();
  };

  
  const handleCloseGuest = () => {
    handleMenuClose();
    auth.exitGuest();
  }

  const handleProfileMenuOpen = (event) => {
    console.log(anchorEl);
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logoutUser();
  };

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
      <MenuItem onClick={handleCloseGuest}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleCloseGuest}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
      <MenuItem onClick={handleContinueAsGuest}>
        <Link to="/">Continue As Guest</Link>
      </MenuItem>
    </Menu>
  );
  const loggedInMenu = (
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
      <MenuItem onClick={handleLogout}>
        <Link to="/">LogOut</Link>
      </MenuItem>
    </Menu>
  );

  const guestMenu = (
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
      <MenuItem onClick={handleCloseGuest}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleCloseGuest}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
    </Menu>
  );
  let menu = loggedOutMenu;
  if (auth.loggedIn || auth.guest_user) {
    if (auth.loggedIn)
      menu = loggedInMenu;
    else if (auth.guest_user)
      menu = guestMenu;
    else 
      menu = loggedOutMenu;
    // if (store.currentList) {
    //   editToolbar = <EditToolbar />;
    // }
  }
  return (
    <div>
      <div id="navigation-bar">
        <Box
          sx={{
            height: 40,
          }}
        >
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              align-content="right"
              onClick={handleProfileMenuOpen}
            >
              {<AccountCircle />}
            </IconButton>
          </Box>
          {menu}
        </Box>
      </div>
    </div>
  );
};

export default NavigationBar;