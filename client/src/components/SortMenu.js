// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import SegmentIcon from '@mui/icons-material/Segment';
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const SortMenu = () => {
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

  
  const handleSortByName = (event) => {
    store.sortListByName();
  }

  const handleSortByDate = (event) => {
    store.sortListByPublishDate();
  }

  const handleSortByLikes = (event) => {
    store.sortListByLikes();
  }

  const handleSortByDislikes = (event) => {
    store.sortListByDislikes();
  }

  const handleSortByCreation = (event) => {
    store.sortListByCreation();
  }

  const handleSortByEdit = (event) => {
    store.sortListByEdit();
  }

  const handleSortByListens = (event) => {
    store.sortListByListens();
  }

  const home_search = (
    <Menu
      style={{edge: "end"}}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={"primary-search-account-menu"}
      keepMounted
      transformOrigin={{
        vertical: -48,
        horizontal: -10
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSortByCreation}>
        <Button>By Creation Date(Old-New)</Button>
      </MenuItem>
      <MenuItem onClick={handleSortByEdit}>
        <Button>By Last Edit Date(New-Old)</Button>
      </MenuItem>
      <MenuItem onClick={handleSortByName}>
        <Button>By Name(A-Z)</Button>
      </MenuItem>
      
    </Menu>
  );
  const any_search = (
    <Menu
      style={{edge: "end"}}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={"primary-search-account-menu"}
      keepMounted
      transformOrigin={{
        vertical: -48,
        horizontal: -10
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSortByName}>
        <Button>By Name(A-Z)</Button>
      </MenuItem>
      <MenuItem onClick={handleSortByDate}>
        <Button>Publish Date(Newest)</Button>
      </MenuItem>
      <MenuItem onClick={handleSortByListens}>
        <Button>Listens(High-Low)</Button>
      </MenuItem>
      <MenuItem onClick={handleSortByLikes}>
        <Button>Likes(High-Low)</Button>
      </MenuItem>
      <MenuItem onClick={handleSortByDislikes}>
        <Button>Dislikes(High-Low)</Button>
      </MenuItem>
    </Menu>
  );

  
  let menu = home_search;
  if (store.search_screen) {
      menu = any_search;
  }
  
  return (
    <div>
    <div id="search-menus">
      <Box
        sx={{
            width: 40,
            height: 40,
            // border: 'solid',
            position: 'absolute',
            right: 20,
            top: -8
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
            {<SegmentIcon />}
          </IconButton>
        </Box>
        {menu}
      </Box>
    </div>
  </div>
  );
};

export default SortMenu;
