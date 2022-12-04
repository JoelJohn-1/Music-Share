// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line
import { GlobalStoreContext } from "../store";

import PeopleIcon from '@mui/icons-material/People';
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/Home';
import SegmentIcon from '@mui/icons-material/Segment';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom'
import PlaylistCard from './PlaylistCard'
import List from '@mui/material/List';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
      store.loadIdNamePairs();
  }, []);


  const history = useHistory();
  const handleHomeButton = () => {
    // load in the users lists and reload the store
    history.push("/");
  }

  const handleUniIconButton = () => {
    let element = document.getElementById('testing')
    element.style.height = '200px';
    console.log("here");
  }

  const handleCreatePlaylistButton = () => {
    store.createNewList();
    console.log(store.idNamePairs);
  }

  let listCard = "";
  if (store) {
    listCard = 
    <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
      {
      store.idNamePairs.map((pair) => (
                    <PlaylistCard
                        key={pair.id}
                        id={pair.id}
                        likes={pair.likes}
                        dislikes={pair.dislikes}
                        published={pair.published}
                        ownerName={pair.ownerName}
                        name={pair.name}
                        listens={pair.listens}
                    />
                ))
      }
    </List>
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
          <AddIcon id="create-playlist-icon" fontSize="large" onClick = {handleCreatePlaylistButton}></AddIcon>

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
          {listCard}
          {/* <div id='testing' style={{height: 100, color: 'white', backgroundColor:'black'}}>adsadas</div> */}

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
