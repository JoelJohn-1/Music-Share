const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
const auth = require('../auth')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    
    const playlist = new Playlist(body);
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    User.findOne({ _id: req.userId }, (err, user) => {
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
              
                if (user._id == req.userId) {
                   
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({});
                    }).catch(err => console.log(err))
                }
                else {
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    

    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        // DOES THIS LIST BELONG TO THIS USER?
       
                    return res.status(200).json({ success: true, playlist: list })
               
        
    }).catch(err => console.log(err))
}


getPlaylistByUser = async (req, res) => {
    let string = "" + req.params.user
    await Playlist.find({published: { $ne: null}, ownerName: { "$regex": string, "$options": "i" } }, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        } else {
            let pairs = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let pair = {
                        id: list._id,
                        name: list.name,
                        likes: list.likes,
                        dislikes: list.dislikes,
                        ownerName: list.ownerName,
                        published: list.published,
                        listens: list.listens,
                        songs: list.songs,
                        email: list.ownerEmail,
                        createdAt: list.createdAt,
                        updated: list.updatedAt,
                        comments: list.comments
                    };
                    pairs.push(pair);
                }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
        
    }).catch(err => console.log(err))
    
}

getPlaylistByTitle = async (req, res) => {
    let string = "" + req.params.title
    await Playlist.find({published: { $ne: null}, name: { "$regex": string, "$options": "i" } }, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        } else {
            let pairs = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let pair = {
                        id: list._id,
                        name: list.name,
                        likes: list.likes,
                        dislikes: list.dislikes,
                        ownerName: list.ownerName,
                        published: list.published,
                        listens: list.listens,
                        songs: list.songs,
                        email: list.ownerEmail,
                        createdAt: list.createdAt,
                        updated: list.updatedAt,
                        comments: list.comments
                    };
                    pairs.push(pair);
                }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
        
    }).catch(err => console.log(err))
    
}
getPlaylistPairs = async (req, res) => {
    
    await User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncFindList(email) {
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            id: list._id,
                            name: list.name,
                            likes: list.likes,
                            dislikes: list.dislikes,
                            ownerName: list.ownerName,
                            published: list.published,
                            listens: list.listens,
                            songs: list.songs,
                            email: list.ownerEmail,
                            createdAt: list.createdAt,
                            updated: list.updatedAt,
                            comments: list.comments
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
updatePlaylist = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
            
                list.name = body.playlist.name;
                list.songs = body.playlist.songs;
                list.published = body.playlist.published;
                list.likes = body.playlist.likes;
                list.dislikes = body.playlist.dislikes;
                list.listens = body.playlist.listens;
                list.comments = body.playlist.comments;

                list
                    .save()
                    .then(() => {
                        
                        return res.status(200).json({
                            success: true,
                            id: list._id,
                            message: 'Playlist updated!',
                        })
                    })
                    .catch(error => {
                        
                        return res.status(404).json({
                            error,
                            message: 'Playlist not updated!',
                        })
                    })
            
                
                   
            });
        }
        asyncFindUser(playlist);
    })
}
module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    updatePlaylist,
    getPlaylistByUser,
    getPlaylistByTitle,
}