import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);


    function handleConfirmEditSong() {
        let newSong = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        }
     
        store.addUpdateSongTransaction(newSong, store.currentList);
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.listMarkedForDeletion === null}
        >
            <Box sx={{ }}>
            <div
            id="edit-song-modal"
            className="modal is-visible"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                style={{background: "#383434", height: 250, width: 250}}>
                <div
                    id="edit-song-modal-header"
                    style={{fontSize: '30px', position: 'relative', left: '25%'}}>Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="modal-center">
                    <div id="title-prompt" style={{fontSize: '30px', position: 'relative', left: '0%'}}>Title:</div>
                    <input 
                        id="edit-song-modal-title-textfield" 
                        style={{ position: 'absolute', left: '47%', top: '41.5%'}}
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} 
                        />
                    <div id="artist-prompt" style={{fontSize: '30px', position: 'relative', left: '0%'}}>Artist:</div>
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        style={{ position: 'absolute', left: '47.5%', top: '45.1%'}}
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} 
                        />
                    <div id="you-tube-id-prompt" style={{fontSize: '30px', position: 'relative', left: '0%'}}>Youtube Id:</div>
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        style={{ position: 'absolute', left: '51%', top: '49%', width: '90px'}}
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} 
                        />
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        style={{fontSize: '20px', position: 'relative', marginTop: '50px', marginLeft: '20px', marginRight: '50px'}}
                        value='Confirm' 
                        onClick={handleConfirmEditSong} 
                        />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        style={{fontSize: '20px', position: 'relative', left: '0%'}}
                        value='Cancel' 
                        onClick={handleCancelEditSong}
                         />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}