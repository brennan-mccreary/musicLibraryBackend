//import and assign express
const express = require('express');
const app = express();

//CORS implementation 
const cors = require('cors');

//Middleware implementation
const { validateSong } = require('./middleware/songs-validation');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import repository wrapper
const repoContext = require('./repository/repository-wrapper.js');

//Listener
const PORT = process.env.PORT || 5000; //define port value
app.listen(PORT, () => {
    console.log(`Server started. Listening on port ${PORT}`);
});

//Request handlers
//
//Handle GET REQ -- All Songs
app.get('/api/songs', (req, res) => {
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
});

//Handle GET REQ -- Song by ID
app.get('/api/songs/:id', (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
});

//Handle POST REQ -- New Song (Validate)
app.post('/api/songs', [validateSong], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    const songList = repoContext.songs.findAllSongs();
    return res.send(songList);
});

//Handle PUT REQ -- Edit Song by ID (Validate)
app.put('/api/songs/:id', [validateSong], (req, res) => {
    const id = req.params.id;
    const songUpdatedProperties = req.body;
    const updatedSong = repoContext.songs.updateSong(id, songUpdatedProperties);
    const songList = repoContext.songs.findAllSongs();
    return res.send(songList);
});

//Handle DELETE REQ -- Delete Song by ID
app.delete('/api/songs/:id', (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});


