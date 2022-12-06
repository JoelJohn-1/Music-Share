import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 345,
    height: 250,
    backgroundSize: "contain",
    bgcolor: '#383434',
    border: '3px solid #000',
    padding: '20px',
    boxShadow: 24,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        // store.addRemoveSongTransaction();
    store.removeSong();

    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
        open={store.currentModal === "REMOVE_SONG"}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style1}>
            <Typography sx={{color: 'white', fontWeight: 'bold'}} id="modal-modal-title" variant="h4" component="h2">
                Delete Song
            </Typography>
            <Divider sx={{borderBottomWidth: 5, p: '5px', transform: 'translate(-5.5%, 0%)', width:377}}/>
            <Box sx={{background: "#383434"}}>
            <Typography id="modal-modal-description" variant="h6" sx={{color: "white" , mt: 1}}>
                Are you sure you want to remove {songTitle} ?
            </Typography>
            </Box>
            <Button sx={{ color: "black", backgroundColor: "lightgray", fontSize: 13, fontWeight: 'bold',  p:"5px", mt:"60px", mr:"95px"}} variant="outlined" onClick={handleConfirmRemoveSong}> Confirm </Button>
            <Button sx={{ color: "black", backgroundColor: "lightgray", fontSize: 13, fontWeight: 'bold',  p:"5px", mt:"60px", ml:"102px"}} variant="outlined" onClick={handleCancelRemoveSong}> Cancel </Button>
        </Box>
    </Modal>
    );
}