import React, {useState} from 'react';
import Tracklist from './Tracklist';
import styles from '../styles/Playlist.module.css';

function Playlist(props){

  const handleNameChange = ({target}) => {
    props.onNameChange(target.value)
  }

  return(
    <div className={styles.playlistDiv}>
      <input type="text" onChange={handleNameChange} placeholder="Name your playlist..." />
      <Tracklist searchResults={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
      <button onClick={props.onSave}>Save To Spotify</button>
    </div>
  )
};

export default Playlist;