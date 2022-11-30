import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkScreen = () => {
  
  return (
    <div>
      <div id="welcome-screen-box">
        <Box
          sx={{
            width: 800,
            height: 500,
          }}
        >
          <div id="welcome-title"> Welcome To Playlister</div>
          <div id="welcome-description">
           
          </div>
        </Box>
      </div>
      <div id="welcome-screen-copyright">
        <Box

          sx={{
            height: 40,
          }}
        >
          By Joel John
        </Box>
      </div>
    </div>
  );
};

export default WorkScreen;
