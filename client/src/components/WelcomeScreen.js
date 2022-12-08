import React from "react";


import Box from "@mui/material/Box";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WelcomeScreen = () => {
  
  return (
    <div>
      <div id="welcome-screen-box">
        <Box
          sx={{
            width: 800,
            height: 500,
          }}
        >
          <div style={{fontSize: '40px'}}> Welcome To Playlister</div>
          <div style={{fontSize: '30px'}}>
            Our site allows users to create and share personalized playlists
            within the community. Features include a rating system, publishing,
            and much more. Please sign in or continue as guest to get started!
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

export default WelcomeScreen;
