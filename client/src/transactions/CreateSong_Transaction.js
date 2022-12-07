import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class CreateSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong, id) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.song = initSong;
        this.id = id;
    }

    doTransaction() {
        this.store.createSong(this.id, this.index, this.song);
    }
    
    undoTransaction() {
        this.store.removeSong(this.index);
    }
}