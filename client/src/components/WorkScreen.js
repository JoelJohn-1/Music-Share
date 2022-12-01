import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import PeopleIcon from '@mui/icons-material/People';
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/Home';
import SegmentIcon from '@mui/icons-material/Segment';
import { TextField } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkScreen = () => {
  
  return (
    <div>
      <div id="work-screen-search-bar">
        <Box
          sx={{
            height: 40,
            backgroundColor: "#ffffee",
          }}
        >
          <div>
         <AccountCircle fontSize="large" />
          <PersonIcon  fontSize="large"/>
          <PeopleIcon fontSize="large" sx={{ mr: 90 }}/>
          <TextField id="filled-basic" label="Search..." variant="filled" inputProps={{style: { height: "7px", }}} />

          <SegmentIcon fontSize="large"  style={{ position: "absolute", right: 0 }}> </SegmentIcon>
          </div>
        </Box>
      </div>
       
       <Box id="list-selector-space"
          sx={{
            backgroundColor: "#fffffe",
          }}
        >
        </Box> 

        <Box id="youtube-player-space"
          sx={{
            backgroundColor: "#fffdfe",
          }}
        >
        </Box> 
      
    </div>
  );
};

export default WorkScreen;
