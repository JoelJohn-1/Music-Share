// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbUp';
import { GlobalStoreContext } from "../store";

const PlaylistCard = (props) => {

    const { store } = useContext(GlobalStoreContext);

    /*
     * Published
     * Unpublished
     * Selected/Unselected => do it with color theme
     * Expanded/Unexpanded combod with each one
    */

    let visibile = 'hidden';
    if (props.published)
        visibile = 'visible';

    // eslint-disable-next-line
    let expanded = 'false';
    let list_height = 120; 
    const expand_list = () => {
    }
    const unexpanded_card = (
        <Box id={'list-card' + props._id} sx={{marginLeft:"10px",marginTop:'10px',borderRadius:'16px',width:"90%",height:list_height,backgroundColor:"#383434",color:'white',display:'flex',position:'relative'}}>

            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.name}
            </Typography>

            <ThumbUpIcon style={{ visibility: visibile, position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{visibility: visibile, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.likes} 
            </Typography>
        
            <ThumbDownIcon style={{ visibility: visibile, position: 'absolute', left: '85%', marginTop: '2%'}}/>
            <Typography 
            style={{visibility: visibile, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'88%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.dislikes}
            </Typography>
            
            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'5%'}}>
            By {props.ownerName}
            </Typography>

            <Typography 
            style={{visibility: visibile, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'9%'}}>
            Published: {props.published}
            </Typography>

            <Typography 
            style={{visibility: visibile, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'72%',maxHeight:'20%',maxWidth:'17%',marginTop:'9%'}}>
            Listens:ddddddddddddddddddddddddddd
            </Typography>

            <KeyboardDoubleArrowDownIcon onClick={expand_list} style={{ position: 'absolute', left: '94%', marginTop: '10%'}} />

                
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

export default PlaylistCard;
