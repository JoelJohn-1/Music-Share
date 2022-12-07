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
const Comment = (props) => {

    const { store } = useContext(GlobalStoreContext);
    
    const comment = (
        <Box  id={props.id + '-' + 'comment-card' + props.songIndex} sx={{marginLeft: '2.5%', marginTop:'10px',borderRadius:'16px',width:"95%",height:60,backgroundColor:"#383434",color:'black',display:'flex'}}>
            <Typography  
                style={{ color: 'black',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'80%',maxHeight:'40%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.author}
            </Typography>
            <Typography
                style={{ color: 'black',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'80%',maxHeight:'40%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.content} 
            </Typography>
        </Box>
);

        
    return (
        comment
    )
}

export default Comment;