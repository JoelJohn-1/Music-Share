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
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../auth'

const PlaylistCard = (props) => {

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let unpublished='visible';
    let published = 'hidden';
    let logged='hidden'
    let new_Date = '';
    if (props.published) {
        new_Date = props.published.substring(5, 7) + "/" + props.published.substring(8,10) + "/" + props.published.substring(0,4)
        published = 'visible';
        unpublished='hidden';
    }
    if (auth.loggedIn)
        logged='visible'
    
    let editor = 'hidden';
    if (published === 'visible' && logged === 'visible')
        editor = 'visible'
    console.log(published + ": " + logged + ": " + (published && logged));

    const expand_list = (event) => {
        event.stopPropagation();
        store.expandList(props.id);
    }

    const remove_song = (index, song) => {
        store.showRemoveSongModal(index, song, props.id);
    }

    const handlePublish = (event) => {
        event.stopPropagation();
        store.publishList(props.id);
    }

    const add_song = (event) => {
        event.stopPropagation();
        store.createSong(props.id);
    }

    const like_list = (event) => {
        event.stopPropagation();
        store.likeList(props.id);
    }

    const dislike_list = (event) => {
        event.stopPropagation();
        store.dislikeList(props.id);
    }
    
    const handleDelete = (event) => {
        event.stopPropagation();
        store.deleteList(props.id);
    }

    const handleDuplicate = (event) => {
        event.stopPropagation();
        store.duplicateList(props.list);
    }
    
    let songs = "";
    if (store.expanded_list) {
        songs = 
        <List sx={{width: '100%',  mb:"20px", overflow:'auto', position:'absolute', top: '55px', height: '470px'}}>
        {
        props.songs.map((pair, index) => (
                        <SongCard
                        key={props.id + '-' + index}
                        songIndex={index}
                        song={pair}
                        published={unpublished}
                        id={props.id}
                        removeSong = {remove_song}
                        ide={props.id}
                        
                        />
                    ))
            
        }
        <Box sx={{visibility: unpublished, marginLeft: '25px', marginTop:'10px',borderRadius:'16px',width:"92%",height:60,backgroundColor:"#ffffee",color:'black',display:'flex'}}>
            

            <AddIcon  onClick={add_song} sx={{ position: 'absolute', right: '50%', padding: '18px'}}></AddIcon>
        </Box>
        </List>

    }

   
    const unexpanded_card = (
        <Box id={'list-card-' + props.id} sx={{marginLeft:"10px",marginTop:'10px',borderRadius:'16px',width:"90%",height:120,backgroundColor:"#383434",color:'white',display:'flex',position:'relative'}}>
            <Typography  
            style={{whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'20%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                {props.name}
            </Typography>

            <ThumbUpIcon onClick={like_list} style={{ visibility: (editor), position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{visibility: (editor), whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.likes} 
            </Typography>
        
            <ThumbDownIcon onClick={dislike_list} style={{ visibility: (editor), position: 'absolute', left: '85%', marginTop: '2%'}}/>
            <Typography 
            style={{visibility: (editor), whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'88%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
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

            <ThumbUpIcon onClick={like_list} style={{ visibility: (editor), position: 'absolute', left: '72%', marginTop: '2%'}} />
            <Typography 
            style={{visibility: (editor), whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'75%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.likes} 
            </Typography>
        
            <ThumbDownIcon onClick={dislike_list} style={{ visibility: (editor), position: 'absolute', left: '85%', marginTop: '2%'}}/>
            <Typography 
            style={{visibility: (editor), whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'88%',maxHeight:'20%',maxWidth:'9%',marginTop:'2%'}}>
            {props.dislikes}
            </Typography>
            
            <Typography 
            style={{padding: '1px', fontSize:'0.7vw',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',position:'absolute',left:'4%',maxHeight:'20%',maxWidth:'60%',marginTop:'5%'}}>
            By {props.ownerName}
            </Typography>

            {songs}

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
            <Button onClick={handlePublish} variant="Contained" style={{ visibility: unpublished, marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Publish</Button>
            <Button onClick={handleDelete} variant="Contained" style={{ marginRight:'1%', fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Delete</Button>
            <Button onClick={handleDuplicate} variant="Contained" style={{ fontSize:'11px', backgroundColor: 'lightGray', color: 'black'}}>Duplicate</Button>

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
