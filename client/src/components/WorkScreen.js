import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import PeopleIcon from '@mui/icons-material/People';
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkScreen = () => {
  
  return (
    <div id="work-screen-search-bar">
      <div>
        <Box
          sx={{
            height: 50,
            backgroundColor: "#ffffee",
          }}
        >
         
          {<AccountCircle />}
          {<PersonIcon />}
          {<PeopleIcon />}

          <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                          JJ
                        </IconButton>
        </Box>
      </div>
      
    </div>
  );
};

export default WorkScreen;
