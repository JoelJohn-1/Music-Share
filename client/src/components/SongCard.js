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
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, songIndex } = props;
    const callbackRemove = (event) => {
        event.stopPropagation();
        props.removeSong(event, props.songIndex, props.song);
    }

    const handleEditSong = (event) => {
        
        if (!props.ispublished) {
            if (event.detail === 2)
            store.showEditSongModal(props.songIndex, props.song, props.ide);
        }
        event.stopPropagation();

    }
    function handleDragStart(event) {
        event.dataTransfer.setData("song", songIndex);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = songIndex;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
        console.log("WOWOWOW");
    }
    
    const unexpanded_card = (
        <Box 
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleEditSong} id={props.id + '-' + 'songcard' + props.songIndex}sx={{marginLeft: '25px', marginTop:'10px',borderRadius:'16px',width:"92%",height:60,backgroundColor:"#ffffee",color:'black',display:'flex'}}
        >
                <Typography  
                style={{ color: 'black',whiteSpace:'nowrap',display:'block',textOverflow:'ellipsis',overflow:'hidden',maxWidth:'60%',maxHeight:'40%',fontSize:'1vw',marginLeft:'4%',marginTop:'2%'}}>
                    {props.songIndex}. {props.song.title} by {props.song.artist}
                </Typography>

                <CloseIcon onClick={callbackRemove} sx={{visibility: props.published, position: 'absolute', right: '60px', padding: '18px'}}></CloseIcon>



            



        </Box>
);

        
    return (
        unexpanded_card
    )
}

export default SongCard;