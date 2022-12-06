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
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import SortMenu from "./SortMenu";
import IconButton from "@mui/material/IconButton";

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
  const handleHomeButton = (event) => {
    event.stopPropagation();
    store.search_screen = false;
    history.push("/");
  }

  const handleUniIconButton = () => {
    
  }

  const handleCreatePlaylistButton = () => {
    store.createNewList();
  }
  
  const handleSortButton = () => {
    store.sortListByName();
  }
  let search_screen = "visible";
  if (store.search_screen)
    search_screen = 'hidden';

  let modalJSX = "";
  if (store.isEditSongModalOpen())
    modalJSX = <MUIEditSongModal />;
  if (store.isRemoveSongModalOpen()) 
    modalJSX = <MUIRemoveSongModal />;
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
                        songs={pair.songs}
                        list={pair}
                    />
                ))
      }
      <Box sx={{ marginLeft: '10px', marginTop:'10px',borderRadius:'16px',width:"90%",height:60,backgroundColor:"#383434",color:'white',display:'flex'}}>
            

            <AddIcon  onClick={handleCreatePlaylistButton} sx={{ position: 'absolute', right: '50%', padding: '18px'}}></AddIcon>
        </Box>
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
          <IconButton > <AccountCircle fontSize="large" onClick={handleHomeButton} style ={{color: 'black'}}/></IconButton>
          <IconButton> <PersonIcon  fontSize="large" onClick={handleUniIconButton} style ={{color: 'black'}}/></IconButton>
          <IconButton><PeopleIcon id="people-icon" fontSize="large" style ={{color: 'black'}}/></IconButton>

          <TextField id="filled-basic-text" label="Search..." variant="filled"  style={{ position: 'absolute', right: '47%'}}> </TextField>
            <SortMenu></SortMenu>
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

        </Box> 

        <Box id="youtube-player-space"
          sx={{
            backgroundColor: "#fffffe",
          }}
        >
        </Box> 
        {modalJSX}

    </div>
  );
};

export default WorkScreen;
