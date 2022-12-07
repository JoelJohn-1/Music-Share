// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';
import { Typography } from "@mui/material";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const YouTubeSide = () => {
    const { store } = useContext(GlobalStoreContext);

    const playerOptions = {
        height: '390',
        width: '800',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
      };  

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
        listExists = 'visible';
    }
  function loadAndPlayCurrentSong(player) {
    let song = list[currentSong];
    player.loadVideoById(song);
    player.playVideo();
  }

  function incSong() {
    currentSong++;
    currentSong = currentSong % list.length;
  }

  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
        // VIDEO UNSTARTED
        console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
        // THE VIDEO HAS COMPLETED PLAYING
        console.log("0 Video ended");
        incSong();
        loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
        // THE VIDEO IS PLAYED
        console.log("1 Video played");
    } else if (playerStatus === 2) {
        // THE VIDEO IS PAUSED
        console.log("2 Video paused");
    } else if (playerStatus === 3) {
        // THE VIDEO IS BUFFERING
        console.log("3 Video buffering");
    } else if (playerStatus === 5) {
        // THE VIDEO HAS BEEN CUED
        console.log("5 Video cued");
    }
  }
  
  return (
    
    <Box style={{position: 'absolute', marginLeft: '75px', marginTop: '60px'}}>
            <YouTube
            style={{visibility: listExists}}
            videoId={list[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            />
            <Typography style={{visibility: listExists}} >Playlist: {title}</Typography>
            <Typography style={{visibility: listExists}} >Song #: {currentSong}</Typography>
            <Typography style={{visibility: listExists}} >Title: {songTitle}</Typography>
            <Typography style={{visibility: listExists}} >Artist: {artist}</Typography>
    </Box>

    
  );
};

export default YouTubeSide;
