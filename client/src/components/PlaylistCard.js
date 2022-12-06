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
import SongCard from './SongCard'

const PlaylistCard = (props) => {

    const { store } = useContext(GlobalStoreContext);

    let unpublished='visible';
    let published = 'hidden';
    let new_Date = '';
    if (props.published) {
        new_Date = props.published.substring(5, 7) + "/" + props.published.substring(8,10) + "/" + props.published.substring(0,4)
        published = 'visible';
        unpublished='hidden';
    }
    
    // eslint-disable-next-line
    const expand_list = (event) => {
        store.expandList(props.id);
    }

    let songs = "";
    if (store.expanded_list) {
        songs = 
        <List sx={{width: '100%',  mb:"20px", overflow:'auto', position:'absolute', top: '60px', height: '500px'}}>
        {
        props.songs.map((pair, index) => (
                        <SongCard
                        songIndex={index}
                        song={pair}
                        published={unpublished}
                        />
                    ))
        }
        </List>
        console.log(props.songs)
        console.log(store.idNamePairs)
    }

   
    const unexpanded_card = (
        <Box id={'list-card-' + props.id} sx={{marginLeft:"10px",marginTop:'10px',borderRadius:'16px',width:"90%",height:120,backgroundColor:"#383434",color:'white',display:'flex',position:'relative'}}>
            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.name}
            </Typography>

            <ThumbUpIcon style={{ visibility: published, position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{visibility: published, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.likes} 
            </Typography>
        
            <ThumbDownIcon style={{ visibility: published, position: 'absolute', left: '85%', marginTop: '2%'}}/>
            <Typography 
            style={{visibility: published, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'88%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.dislikes}
            </Typography>
            
            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'5%'}}>
            By {props.ownerName}
            </Typography>

            <Typography 
            style={{visibility: published, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',bottom:'5%'}}>
            Published: {new_Date}
            </Typography>

            <Typography 
            style={{visibility: published, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'72%',maxHeight:'20%',maxWidth:'17%',bottom:'5%'}}>
            Listens: {props.listens}
            </Typography>

            <KeyboardDoubleArrowDownIcon onClick={expand_list} style={{ position:'absolute', left:'94%',bottom:'5%'}} />

            
        </Box>
    );
    
    const expanded_card = (
        <Box id={'list-card-' + props.id} sx={{ marginLeft:"10px",marginTop:'10px',borderRadius:'16px',width:"90%",height:650,backgroundColor:"#383434",color:'white',display:'flex',position:'relative'}}>
            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.name}
            </Typography>

            <ThumbUpIcon style={{ visibility: published, position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{visibility: published, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.likes} 
            </Typography>
        
            <ThumbDownIcon style={{ visibility: published, position: 'absolute', left: '85%', marginTop: '2%'}}/>
            <Typography 
            style={{visibility: published, whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'88%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.dislikes}
            </Typography>
            
            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'5%'}}>
            By {props.ownerName}
            </Typography>

            {songs}
            {/* <SongCard test='bruhing'></SongCard>
            <SongCard test='bruh'></SongCard> */}

            <Typography 
            style={{visibility: published, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',bottom:'5%'}}>
            Published: {new_Date}
            </Typography>

            <Typography 
            style={{visibility: published, padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'72%',maxHeight:'20%',maxWidth:'17%',bottom:'5%'}}>
            Listens: {props.listens}
            </Typography>

            <KeyboardDoubleArrowDownIcon onClick={expand_list} style={{ position:'absolute', left:'94%',bottom:'5%'}} />

            <Box id={'edit-bar-' + props.id} style={{position: 'absolute', bottom : '10%', height: 40, width: '100%', paddingLeft: '9px'}}>  
            <Button variant="Contained" style={{ visibility: unpublished, marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Undo</Button>
            <Button variant="Contained" style={{ visibility: unpublished, fontSize:'11px', backgroundColor: 'lightGray', color: 'black', marginRight:'52%'}}>redo</Button>
            <Button variant="Contained" style={{ visibility: unpublished, marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Publish</Button>
            <Button variant="Contained" style={{ marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Delete</Button>
            <Button variant="Contained" style={{ fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Duplicate</Button>

            </Box>
        </Box>
    );

    
    let card = unexpanded_card;
    if (store.expanded_list) {
        if (store.expanded_list.includes(props.id)) {
            card = expanded_card;
        }
    }
            
    return (
        card
    )
}

export default PlaylistCard;
