import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbUp';

const PlaylistCard = () => {

    /*
     * Published
     * Unpublished
     * Selected/Unselected => do it with color theme
     * Expanded/Unexpanded combod with each one
    */
    const unpublished_card = (
            <Box 
            sx={{ 
                marginLeft: "10px",
                marginTop: '10px',
                borderRadius: '16px', 
                width: "90%", 
                height: 120, 
                backgroundColor: "#383434" 
            }} 
            >

                <Typography className="playlistcard-title" style={{marginLeft: '30px', color: 'white', fontSize: '25pt' }}>
                    Playlist Title
                    {/* Playlist Title Goes Here */}
                </Typography>

                <Typography className="playlistcard-author" style={{marginLeft: '30px', color: 'white', fontSize: '12pt' }}>
                    By Author
                    {/* Playlist Author Goes Here */}
                </Typography>
                <KeyboardDoubleArrowDownIcon style={{ marginLeft: '95%'}}>

                </KeyboardDoubleArrowDownIcon>
            </Box>
    );

    const published_card = (
        <Box 
        sx={{ 
            marginLeft: "10px",
            marginTop: '10px',
            borderRadius: '16px', 
            width: "90%", 
            height: 120, 
            backgroundColor: "#383434",
            color: 'white'
        }} 
        >
            <Box 
            style ={{
                display:'flex',
                alignItems:'center',
                p: 1
            }}
            >
                <Typography className="playlistcard-title" style={{marginLeft: '4%', color: 'white', fontSize: '25pt' }}>
                    Playlist by
                    {/* Playlist Title Goes Here */}
                </Typography>
                <ThumbUpIcon sx={{ color: 'white'}} style={{ marginLeft: '45%'}} />
                insert likes 
                <ThumbDownIcon sx={{ color: 'white'}} style={{ marginLeft: '5%'}}/>
                insert dislikes
            </Box>
            <Typography className="playlistcard-author" style={{marginLeft: '4%', color: 'white', fontSize: '12pt' }}>
                By Author
                {/* Playlist Author Goes Here */}
            </Typography>
            <Box
            style={{
                marginTop: '1%',
                display:'flex',
                alignItems:'center',
                
            }}>
                <div 
                style={{
                    float: 'left',
                    marginLeft: '4%'
                }}>
                    Published: 
                </div>
                <KeyboardDoubleArrowDownIcon style={{ marginLeft: '85%'}} />
            </Box>
            

            
        </Box>
);


    return (
        published_card
    )
}

export default PlaylistCard;