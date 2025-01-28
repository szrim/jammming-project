import React, {useState} from 'react';
import styles from '../styles/App.module.css';

import SearchBar from './SearchBar';
import Playlist from './Playlist';
import SearchResults from './SearchResults';

function App() {

  const [playlistName, setPlaylistName] = useState('Default Playlist Name');
  const [playlistTracks, setPlaylistTracks] = useState([{
    name: 'example1',
    artist: 'exampleArtist1',
    album: 'rando',
    id: 1
  },
  {
    name: 'example2',
    artist: 'exampleArtist2',
    album: 'rando',
    id: 2
  }, 
  {
    name: 'example3',
    artist: 'exampleArtist3',
    album: 'rando',
    id: 3
  }]);

  const [searchResults, setSearchResults] = useState([{
    name: 'count on me',
    artist: 'Bruno Mars',
    album: 'Doo-woops and wooligans',
    id: 5
  },
  {
    name: 'hello',
    artist: 'Adele',
    album: 'value',
    id: 6
  },
  {
    name: 'break my bones',
    artist: 'Matt Hansen',
    album: 'any',
    id: 7
  }]);

  function search(term){
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
