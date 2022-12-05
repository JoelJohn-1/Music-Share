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

const SongCard = (props) => {

    const { store } = useContext(GlobalStoreContext);

    /*
     * Published
     * Unpublished
     * Selected/Unselected => do it with color theme
     * Expanded/Unexpanded combod with each one
    */

    let visibile = 'hidden';
    let new_Date = '';
    let expanded = 'hidden';
    if (props.published) {
        let new_Date = props.published.substring(5, 7) + "/" + props.published.substring(8,10) + "/" + props.published.substring(0,4)
        visibile = 'visible';
        
    }
    
    // eslint-disable-next-line
    const expand_list = (event) => {
        let element = document.getElementById('list-card-' + props.id);
        element.style.height = '550px';
        let element2 = document.getElementById('edit-bar-' + props.id);
        element2.style.visibility = 'visible';
        
    }
    const unexpanded_card = (
        <Box id={'list-card-' + props.id} sx={{marginLeft: '25px', marginTop:'80px',borderRadius:'16px',width:"90%",height:90,backgroundColor:"#ffffee",color:'black',display:'flex',position:'absolute'}}>
            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.name}
            </Typography>

            <ThumbUpIcon style={{ visibility: visibile, position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{visibility: visibile, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.likes} 
            </Typography>
        
            
            
            




            <Typography 
            style={{visibility: visibile, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'72%',maxHeight:'20%',maxWidth:'17%',bottom:'5%'}}>
            Listens: {props.listens}
            </Typography>

            <KeyboardDoubleArrowDownIcon onClick={expand_list} style={{ position:'absolute', left:'94%',bottom:'5%'}} />

            <Box id={'edit-bar-' + props.id} style={{visibility: expanded, position: 'absolute', bottom : '8%', height: 40, width: '100%', paddingLeft: '9px'}}>  
            <Button variant="Contained" style={{ marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Undo</Button>
            <Button variant="Contained" style={{ fontSize:'11px', backgroundColor: 'lightGray', color: 'black', marginRight:'52%'}}>redo</Button>
            <Button variant="Contained" style={{ marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Publish</Button>
            <Button variant="Contained" style={{ marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Delete</Button>
            <Button variant="Contained" style={{ fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Duplicate</Button>

            </Box>
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
