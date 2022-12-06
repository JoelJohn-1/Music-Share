// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbUp';
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button"
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
const SongCard = (props) => {

    const { store } = useContext(GlobalStoreContext);

    /*
     * Published
     * Unpublished
     * Selected/Unselected => do it with color theme
     * Expanded/Unexpanded combod with each one
    */

    
    
    
    // eslint-disable-next-line
    const unexpanded_card = (
        <Box sx={{marginLeft: '25px', marginTop:'10px',borderRadius:'16px',width:"92%",height:60,backgroundColor:"#ffffee",color:'black',display:'flex'}}>
            <Typography  
            style={{ color: 'black',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'40%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.songIndex}. {props.song.title} by {props.song.artist}
            </Typography>

            <CloseIcon sx={{visibility: props.published, position: 'absolute', right: '60px', padding: '18px'}}></CloseIcon>



            



        </Box>
);

    // let card = unpublished_card;
    // if (props.card_id === 'published') {
    //     card = published_card
        
    // }
        
    return (
        unexpanded_card
    )
}

export default SongCard;
