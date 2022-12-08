import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    PUBLISH_LIST: "PUBLISH_LIST",
    LIKE_LIST: "LIKE_LIST",
    DISLIKE_LIST: "DISLIKE_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    EXPAND_LIST: "EXPAND_LIST",
    SET_SORT: "SET_SORT",
    SET_SCREEN: "SET_SCREEN",
    SET_EDIT_ID: "SET_EDIT_ID"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    ERROR : "ERROR"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        expanded_list: [],
        sort_option: -1,
        search_screen: 0,
        search_term: '',
        edit_list_id: 0
        
    });
    const history = useHistory();


    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: store.edit_list_id

                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: null,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: [],
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: store.edit_list_id
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: store.edit_list_id
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term, 
                    edit_list_id: null
                });
            }
            case GlobalStoreActionType.EXPAND_LIST: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: payload.newList,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                })
            }
            case GlobalStoreActionType.SET_SORT: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    expanded_list: store.expanded_list,
                    sort_option: payload.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: null
                })
            }
            case GlobalStoreActionType.SET_SCREEN: {
                return setStore({
                    currentModal: store.currentModal,
                    idNamePairs: null,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null, 
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: payload.screen,
                    search_term: store.search_term,
                    edit_list_id: null
                })
            }
            case GlobalStoreActionType.SET_SEARCH_TERM: {
                return setStore({
                    currentModal: store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null, 
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: payload.search_term,
                    edit_list_id: null
                })
            }
            case GlobalStoreActionType.SET_EDIT_ID: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    expanded_list: store.expanded_list,
                    sort_option: store.sort_option,
                    search_screen: store.search_screen,
                    search_term: store.search_term,
                    edit_list_id: payload.edit_list_id
                })
            }
            default:
                return store;
        }
    }

    store.tryAcessingOtherAccountPlaylist = function(){
        let id = "635f203d2e072037af2e6284";
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
            }
        }
        asyncSetCurrentList(id);
        history.push("/playlist/635f203d2e072037af2e6284");
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        store.setEditListId(0);
                        store.loadIdNamePairs();
                        store.updateCurrentList(id, playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], [], auth.user.email, (auth.user.firstName + " " + auth.user.lastName));
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            store.loadIdNamePairs();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function (search_term) {
        if (search_term)
            store.search_term = search_term
        if (store.search_screen === 0 && auth.loggedIn) {
            async function asyncLoadIdNamePairs() {
                const response = await api.getPlaylistsInfo();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    if (store.sort_option == 4) {
                        pairsArray.sort(function(a, b) {                         
                            return ('' + a.name).localeCompare(b.name);
                        })
                    } else if (store.sort_option === 5) {
                        pairsArray.sort(function(a, b) {                         
                            return Date.parse(a.createdAt) - Date.parse(b.createdAt)
                        })
                    } else if (store.sort_option === 6) {
                        pairsArray.sort(function(a, b) {                         
                            return Date.parse(a.updated) - Date.parse(b.updated)
                        })
                    }

                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: pairsArray
                    });
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            asyncLoadIdNamePairs();
        } else if (store.search_screen === 1 || (store.search_screen !== 2 && auth.guest_user)) {
            if (store.search_term === "" || !store.search_term) {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: []
                });
                
            } else {
                async function asyncLoadIdNamePairs() {
                    const response = await api.getPlaylistByTitle(store.search_term);
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if (store.sort_option === 0) {
                            pairsArray.sort(function(a, b) { 
                                return b.listens - a.listens;
                            })
                        } else if (store.sort_option === 1) {
                            pairsArray.sort(function(a, b) { 
                                return Date.parse(b.published) - Date.parse(a.published)
                            })
                        } else if (store.sort_option === 2) {
                            pairsArray.sort(function(a, b) { 
                                return b.likes - a.likes;
                            })
                        } else if (store.sort_option === 3) {
                            pairsArray.sort(function(a, b) { 
                                return b.dislikes - a.dislikes;
                            })
                        } else if (store.sort_option == 4) {
                            pairsArray.sort(function(a, b) {                         
                                return ('' + a.name).localeCompare(b.name);
                            })
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                            payload: pairsArray
                        });
                    }
                }
                asyncLoadIdNamePairs();
            }
        } else if (store.search_screen === 2) {
            if (store.search_term === "" || !store.search_term) {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: []
                });
                
            } else {
                async function asyncLoadIdNamePairs() {
                    const response = await api.getPlaylistByUser(store.search_term);
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if (store.sort_option === 0) {
                            pairsArray.sort(function(a, b) { 
                                return b.listens - a.listens;
                            })
                        } else if (store.sort_option === 1) {
                            pairsArray.sort(function(a, b) { 
                                return Date.parse(b.published) - Date.parse(a.published)
                            })
                        } else if (store.sort_option === 2) {
                            pairsArray.sort(function(a, b) { 
                                return b.likes - a.likes;
                            })
                        } else if (store.sort_option === 3) {
                            pairsArray.sort(function(a, b) { 
                                return b.dislikes - a.dislikes;
                            })
                        } else if (store.sort_option == 4) {
                            pairsArray.sort(function(a, b) {                         
                                return ('' + a.name).localeCompare(b.name);
                            })
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                            payload: pairsArray
                        });
                    }
                }
                asyncLoadIdNamePairs();
            }
        }
    } 


   

    store.expandList = function (id) {
        if (!store.expanded_list.includes(id)) {
            store.expanded_list = [id]
        }else {
            store.expanded_list = [];
        }
        storeReducer({
            type: GlobalStoreActionType.EXPAND_LIST,
            payload: {
                newList: store.expanded_list
            }
        });
        store.loadIdNamePairs();
    }
    
    store.duplicateList = async function (list) {
        const response1 = await api.getPlaylistsInfo();
        const listArray = [];
        if (response1.data.success) {
            for (let i = 0; i < response1.data.idNamePairs.length; i++) {
                console.log(response1.data.idNamePairs[i].name)
                    listArray.push(response1.data.idNamePairs[i].name);
            }
        }
        let numToAdd = 0;
        let newName = list.name;
        while (listArray.includes(newName)) {
            newName = list.name + numToAdd;
            numToAdd++;
        }
        list.name = newName;
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], [], auth.user.email, (auth.user.firstName + " " + auth.user.lastName));
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            newList.name = list.name;
            newList.songs = list.songs;
            console.log(newList);
            store.updateCurrentList(newList, newList._id);
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            store.loadIdNamePairs();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }
    
    store.sortListByListens = async function () {
        store.sort_option = 0;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 0
            }
        });

        store.loadIdNamePairs();
       
    }

    store.sortListByPublishDate = async function () {
        store.sort_option = 1;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 1
            }
        });

        store.loadIdNamePairs();
    }

    store.sortListByLikes = async function () {
        store.sort_option = 2;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 2
            }
        });

        store.loadIdNamePairs();
    }
    
    store.setSearchScreen = function(screen) {
        store.search_screen = screen;
        storeReducer({
            type: GlobalStoreActionType.SET_SCREEN,
            payload: {
                search_screen: screen
            }
        })

        store.loadIdNamePairs();
    }
    store.setSearchTerm = function(term) {
        store.search_term = term;
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_TERM,
            payload: {
                search_term: term
            }
        })
    }
    

    store.setEditListId = function (id) {
        store.edit_list_id = id;
        storeReducer({
            type: GlobalStoreActionType.SET_EDIT_ID,
            payload: {
                edit_list_id: id
            }
        })
    }
    store.sortListByDislikes = async function () {
        store.sort_option = 3;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 3
            }
        });

        store.loadIdNamePairs();
    }

    store.sortListByName = async function () {
        store.sort_option = 4;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 4
            }
        });
        
        store.loadIdNamePairs();
    }

    store.sortListByCreation =async function () {
        store.sort_option = 5;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 5
            }
        });

        store.loadIdNamePairs();
    }

    store.sortListByEdit = async function () {
        store.sort_option = 6;
        storeReducer({
            type: GlobalStoreActionType.SET_SORT,
            payload: {
                sort_option: 6
            }
        })

        store.loadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            store.loadIdNamePairs();
           
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit, id) => {
        async function loadListForEditing() {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.EDIT_SONG,
                    payload: {currentSongIndex: songIndex, currentSong: songToEdit, currentList: response.data.playlist}
                }); 
            }
             
        }
        loadListForEditing();
              
    }
    store.showRemoveSongModal = (songIndex, songToRemove, id) => {
        async function loadListForRemoving() {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.REMOVE_SONG,
                    payload: {currentSongIndex: songIndex, currentSong: songToRemove, currentList: response.data.playlist}
                });      
            }
        }
        loadListForRemoving();
    }

    store.showDeleteListModal = (title, id) => {
        async function loadListForRenaming() {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: response.data.playlist}
                })
            }
        }
        loadListForRenaming();
    }

    store.hideModals = () => {
        auth.errorMessage = null;
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.isErrorModalOpen = () => {
        return store.currentModal === CurrentModal.ERROR;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        if (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (playlist.published)
                    playlist.listens = playlist.listens + 1;
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                }
            }
        }
        asyncSetCurrentList(id);
    }
    }

    store.getCurrentList = function () {
        return store.currentList;
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(id, index, song) {
        async function asyncCreateSong(id, index, song) {
            let response = await api.getPlaylistById(id);
            let list = response.data.playlist;
            list.songs.splice(index, 0, song);
            

            store.updateCurrentList(list, id);
        }
        asyncCreateSong(id, index, song);
    }

    store.publishList = function (id) {
        async function asyncPublishList(id) {
            let response = await api.getPlaylistById(id);
            let list = response.data.playlist;
            list.published = new Date();
            store.updateCurrentList(list, id);
        }

        asyncPublishList(id);
    }

    store.likeList = function (id) {
        async function asyncLikeAuth(id) {

            if (auth.user) {
                if (!auth.user.like_list.includes(id)) {

                    auth.likeList(id);
                    async function asyncLikeList(id) {
                        let response = await api.getPlaylistById(id);
                        let list = response.data.playlist;
                        list.likes = list.likes + 1;
                        store.updateCurrentList(list, id);
                    }
                    asyncLikeList(id);
                }
                store.loadIdNamePairs();
            }
        }

        asyncLikeAuth(id);
    }

    store.dislikeList = function (id) {
        async function asyncDislikeAuth(id) {
            if (auth.user) {
                if (!auth.user.dislike_list.includes(id)) {
                    auth.dislikeList(id);
                    async function asyncDislikeList(id) {
                        let response = await api.getPlaylistById(id);
                        let list = response.data.playlist;
                        list.dislikes = list.dislikes + 1;
                        store.updateCurrentList(list, id);
                    }
                    asyncDislikeList(id);
                }
                store.loadIdNamePairs();
            }
        }

        asyncDislikeAuth(id);
    }

    store.sendComment = function(comment) {
        console.log(store.currentList);
        let newComment = {
            comment_author: (auth.user.firstName + " " + auth.user.lastName),
            content: comment
        }
        store.currentList.comments.push(newComment)
        store.updateCurrentList(store.currentList, store.currentList._id);
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList(store.currentList, store.currentList._id);
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;
        list.songs.splice(index, 1);
        store.updateCurrentList(list, list._id);
    
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData, list) {
        
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;
        store.updateCurrentList(list, list._id);
    }
    
    store.addNewSong = function(list) {
        let index = list.songs.length;
        let id = list.id;
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ", id);
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId, id) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song, id);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song, store.currentList._id);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (newSongData, list) {
        let song = store.currentList.songs[store.currentSongIndex];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, store.currentSongIndex, oldSongData, newSongData, list);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function(list, id) {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(id, list);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
                store.loadIdNamePairs();

            } 
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    function KeyPress(event) {
        

        if (!store.modalOpen && event.ctrlKey){
            if(event.key === 'z'){
                store.undo();
            } 
            if(event.key === 'y'){
                store.redo();
            }
        }
    }
  
    document.onkeydown = (event) => KeyPress(event);

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };