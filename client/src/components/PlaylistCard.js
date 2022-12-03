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
        <Box sx={{marginLeft:"10px",marginTop:'10px',borderRadius:'16px',width:"90%",height:120,backgroundColor:"#383434",color:'white',display:'flex',position:'relative'}}>

            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                Playlist by
            </Typography>

            
        
            
            
            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'5%'}}>
            By
            </Typography>

           
            

            <KeyboardDoubleArrowDownIcon style={{ position: 'absolute', left: '94%', marginTop: '10%'}} />

                
        </Box>
    );

    const published_card = (
        <Box sx={{marginLeft:"10px",marginTop:'10px',borderRadius:'16px',width:"90%",height:120,backgroundColor:"#383434",color:'white',display:'flex',position:'relative'}}>

            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                Playlist by
            </Typography>

            <ThumbUpIcon style={{ position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            Hello 
            </Typography>
        
            <ThumbDownIcon style={{ position: 'absolute', left: '85%', marginTop: '2%'}}/>
            <Typography 
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'88%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            dawdwadawdwadawd
            </Typography>
            
            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'5%'}}>
            By
            </Typography>

            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'9%'}}>
            Published:
            </Typography>

            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'72%',maxHeight:'20%',maxWidth:'17%',marginTop:'9%'}}>
            Listens:ddddddddddddddddddddddddddd
            </Typography>

            <KeyboardDoubleArrowDownIcon style={{ position: 'absolute', left: '94%', marginTop: '10%'}} />

                
        </Box>
);


    return (
        published_card
    )
}

export default PlaylistCard;