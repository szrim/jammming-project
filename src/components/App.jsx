import React, {useState} from 'react';
import styles from '../styles/App.module.css';

import SearchBar from './SearchBar';
import Playlist from './Playlist';
import SearchResults from './SearchResults';
import Spotify from '../util/spotify';

function App() {

  const [playlistName, setPlaylistName] = useState('Playlist Name');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function search(term){
    Spotify.search(term)
    .then((result) => setSearchResults(result))
    console.log(searchResults)
    console.log(`Searching ${term}`)
  }

  const addTrack = track => {
    const trackExists = playlistTracks.find((t) => t.id === track.id)

    if(trackExists){
      console.log('exists')
    } else {
      console.log(playlistTracks)
      setPlaylistTracks((prev) => [...prev, track])
    }
  }

  const removeTrack = track => {
    const exisitingTrack = playlistTracks.filter((t) => t.id !== track.id)
    setPlaylistTracks(exisitingTrack)
  }

  const changePlaylistName = name => {
    if (name !== ' '){
      setPlaylistName(name)
    }
  }

  const savePlaylist = () => {
    const trackURIS = playlistTracks.map((t) => t.uri)
    Spotify.savePlaylist(playlistName, trackURIS)
    .then(() => {
      setPlaylistName("New Playlist")
      setPlaylistTracks([]);
    })
  }

  return (
    <>
    <div className={styles.mainDiv}>

      <SearchBar onSearch={search}/>

      <div className={styles.displays}>

        <SearchResults searchResults={searchResults} onAdd={addTrack}/>

        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={changePlaylistName} onSave={savePlaylist}/>

      </div>
    </div>
    </>
  )
}

export default App
