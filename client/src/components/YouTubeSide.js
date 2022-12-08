// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import StopIcon from '@mui/icons-material/Stop';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';import PlayArrowIcon from '@mui/icons-material/PlayArrow';import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import YouTube from 'react-youtube';
import { Typography } from "@mui/material";
import Comment from './Comment'
import AuthContext from '../auth'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const YouTubeSide = () => {
    const { store } = useContext(GlobalStoreContext);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [commentval, setCommentval] = useState("");
    const [players, setPlayer] = useState();
    const { auth } = useContext(AuthContext);

    function decSong() {
      currentSong--;
      if (currentSong < 0)
        currentSong = list.length - 1;
    }
    function incSong() {
      currentSong++;
      currentSong = currentSong % list.length;
    }

    const updateText = (event) => {
      setCommentval(event.target.value);
    }

    const submitComment = (event) => {
      event.stopPropagation();
      if (event.code === "Enter") {
        console.log(commentval);
        store.sendComment(commentval);
        setCommentval("");

      }
    }

    const handleStopVideo = (event) => {
      players.pauseVideo();
    }
    const handlePlayVideo = (event) => {
      players.playVideo();
    }
    const handleSkipVideo = (event) => {
      incSong();
      loadAndPlayCurrentSong(players);
    }
    const handlePrevVideo = (event) => {
      decSong();
      loadAndPlayCurrentSong(players);
    }
    const playerOptions = {
        height: '420',
        width: '850',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
      };  

    let commentPossible = false;
    if (store) {
      if (store.currentList && store.currentList.published) {
        commentPossible = true;
      }
    }
    let commentButtonVisible = (auth.loggedIn && commentsVisible && commentPossible) ? 'visible' : 'hidden';

    let commentVisibility = (commentsVisible) ? 'visible' : 'hidden';
    let comments = "";
    if (store && store.currentList) {
      comments = (
        <div>
          <List  sx={{maxHeight: '600px', overflowY: 'scroll', visibility: commentVisibility, position: 'static', width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
      {
      store.currentList.comments.map((pair) => (
                    <Comment
                      key={'comment' + Math.random()}
                      author={pair.comment_author}
                      content={pair.content}
                    />
                ))
      }
    
    </List>
    <TextField
    value={commentval}
    margin="normal"
    placeholder="Add Comment"
    name="name"
    inputProps={{style: {height: 30, fontSize: 30, width: '900px'}}}
    autoFocus
    style={{ position: 'absolute', bottom: '0px', visibility: commentButtonVisible, marginLeft: '10px', backgroundColor: 'white', borderRadius:'16px'}}
    onChange={updateText}
    onKeyPress={submitComment}
/>
        </div>
      
      )
    }

    let listExists = 'hidden';
    let songTitle = "";
    let artist = "";
    let title = "";
    let currentSong = 0;
    let list = []
    if (store.currentList && store.currentList.songs.length > 0) {
        list = (store.currentList.songs.map((test) => {
            return test.youTubeId;
        }))
        songTitle = store.currentList.songs[currentSong].title;
        artist = store.currentList.songs[currentSong].artist;
        title = store.currentList.name;
        if (commentsVisible)
          listExists = 'hidden';
        else
          listExists = 'visible';
    }


  function switchPlayer() {
    setCommentsVisible(false);
  }

  function switchComments() {
    setCommentsVisible(true);

  }
  function loadAndPlayCurrentSong(player) {
    let song = list[currentSong];
    player.loadVideoById(song);
    player.playVideo();
  }

  

  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    setPlayer(player);
    if (playerStatus === -1) {
        // VIDEO UNSTARTED
        // console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
        // THE VIDEO HAS COMPLETED PLAYING
        // console.log("0 Video ended");
        incSong();
        loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
        // THE VIDEO IS PLAYED
        // console.log("1 Video played");
    } else if (playerStatus === 2) {
        // THE VIDEO IS PAUSED
        // console.log("2 Video paused");
    } else if (playerStatus === 3) {
        // THE VIDEO IS BUFFERING
        // console.log("3 Video buffering");
    } else if (playerStatus === 5) {
        // THE VIDEO HAS BEEN CUED
        // console.log("5 Video cued");
    }
  }
  
  return (
    <div>
      <div>
      <Button onClick={switchPlayer} variant='contained' style={{backgroundColor: 'gray'}}>Player</Button>
      <Button onClick={switchComments} variant='contained' style={{backgroundColor: 'gray'}}>Comments</Button>
      </div>
    <Box style={{position: 'absolute', marginLeft: '50px', marginTop: '40px'}}>
            <YouTube
            style={{visibility: listExists}}
            videoId={list[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            
            />
            <Typography style={{position: 'absolute', left: '40%', fontSize:'30px', visibility: listExists}} > Now Playing</Typography>
            <Typography style={{position: 'absolute',  bottom: '-18%', fontSize: '25px', visibility: listExists}} >Playlist: {title}</Typography>
            <Typography style={{position: 'absolute',  bottom: '-24%', fontSize: '25px',visibility: listExists}} >Song #: {currentSong}</Typography>
            <Typography style={{position: 'absolute', bottom: '-30%', fontSize: '25px',visibility: listExists}} >Title: {songTitle}</Typography>
            <Typography style={{position: 'absolute',  bottom: '-36%', fontSize: '25px', visibility: listExists}} >Artist: {artist}</Typography>
    
            <Box style={{position: 'absolute', left: '35%', bottom: '-50%', visibility: listExists}}>
              <SkipPreviousIcon onClick={handlePrevVideo} style={{fontSize: '70px'}}></SkipPreviousIcon>
              <StopIcon onClick={handleStopVideo} style={{fontSize: '70px'}}></StopIcon>
              <PlayArrowIcon onClick={handlePlayVideo} style={{fontSize: '70px'}}></PlayArrowIcon>
              <SkipNextIcon onClick={handleSkipVideo} style={{fontSize: '70px'}}></SkipNextIcon>
            </Box>
    </Box>
    {comments}
    </div>
    
  );
};

export default YouTubeSide;
