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
import MUIDeleteModal from "./MUIDeleteModal";
import SortMenu from "./SortMenu";
import IconButton from "@mui/material/IconButton";
import AuthContext from '../auth'
import YouTubeSide from './YouTubeSide';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      store.loadIdNamePairs();
  }, []);


  const history = useHistory();
  const handleHomeButton = (event) => {
    store.setSearchScreen(0);
    store.setSearchTerm('');
    store.loadIdNamePairs();
    event.stopPropagation();
    store.closeCurrentList();
    setSearchTerm("");


  }
  const handleUniIconButton = (event) => {
    event.stopPropagation();
    store.setSearchScreen(1)
    store.setSearchTerm('');
    store.loadIdNamePairs();
    store.closeCurrentList();
    setSearchTerm("");


  }
  const handleMultiIconButton = (event) => {
    store.setSearchScreen(2);
    store.loadIdNamePairs();
    event.stopPropagation();
    store.closeCurrentList();
    setSearchTerm("");


  }
  const handleCreatePlaylistButton = () => {
    store.createNewList();
  }
  const loadSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  }
  const handleSearch = (event) => {
    if (event.charCode == 13) {
      store.loadIdNamePairs(searchTerm);
    }
    event.stopPropagation();

  }




  let guest = 'visible';
  if (auth.guest_user) {
    guest = 'hidden';
  }
  let searchscreen = 'visible';
  let homescreen = 'hidden';
  if (store.search_screen === 0 && auth.loggedIn) {
    homescreen = 'visible';
    searchscreen = 'hidden';
  }


  let modalJSX = "";
  if (store.isEditSongModalOpen())
    modalJSX = <MUIEditSongModal />;
  if (store.isRemoveSongModalOpen()) 
    modalJSX = <MUIRemoveSongModal />;
  if (store.isDeleteListModalOpen()) 
    modalJSX = <MUIDeleteModal />;
  let listCard = "";
  if (store && store.idNamePairs) {
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
      <Box sx={{ visibility: homescreen, marginLeft: '10px', marginTop:'10px',borderRadius:'16px',width:"90%",height:60,backgroundColor:"#383434",color:'white',display:'flex'}}>
            

            <AddIcon onClick={handleCreatePlaylistButton} sx={{ position: 'absolute', right: '50%', padding: '18px'}}></AddIcon>
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
          <IconButton style = {{visibility: guest}} onClick={handleHomeButton} > <AccountCircle fontSize="large" style ={{ color: 'black'}}/></IconButton>
          <IconButton onClick={handleUniIconButton} > <PersonIcon  fontSize="large"style ={{color: 'black'}}/></IconButton>
          <IconButton onClick={handleMultiIconButton} ><PeopleIcon id="people-icon" fontSize="large" style ={{color: 'black'}}/></IconButton>

          <TextField value={searchTerm} onKeyPress={handleSearch} onChange={loadSearchTerm} id="the-search-bar" label="Search..." variant="filled"  style={{ visibility: searchscreen ,position: 'absolute', right: '47%'}}> </TextField>
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
            height: '50px',
            backgroundColor: "#fffffe",
          }}
        >
          <YouTubeSide></YouTubeSide>
          
        </Box> 
        {modalJSX}

    </div>
  );
};

export default WorkScreen;