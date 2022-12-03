import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import PeopleIcon from '@mui/icons-material/People';
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/Home';
import SegmentIcon from '@mui/icons-material/Segment';
import { List, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom'
import PlaylistCard from './PlaylistCard'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkScreen = () => {
  const history = useHistory();
  const handleHomeButton = () => {
    // load in the users lists and reload the store
    history.push("/");
  }

  const handleUniIconButton = () => {

  }
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
          <AccountCircle fontSize="large" onClick={handleHomeButton} />
          <PersonIcon  fontSize="large" onClick={handleUniIconButton} />
          <PeopleIcon id="people-icon" fontSize="large" />
          <TextField id="filled-basic-text" label="Search..." variant="filled"  > </TextField>

          <SegmentIcon fontSize="large"  style={{ position: "absolute", right: 0 }}> </SegmentIcon>
          </div>
        </Box>
      </div>
       
       <Box id="list-selector-space"
          sx={{
            overflow: 'auto',
            backgroundColor: "#fffffe",
          }}
        >
          <PlaylistCard></PlaylistCard>
          <PlaylistCard>

          </PlaylistCard>
          <PlaylistCard>
            
            </PlaylistCard>
            <PlaylistCard>
            
            </PlaylistCard>
            <PlaylistCard>
            
            </PlaylistCard>
            <PlaylistCard>
            
            </PlaylistCard>
            <PlaylistCard>
            
            </PlaylistCard>
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
