import React, {useState} from 'react';
import styles from '../styles/Tracklist.module.css';
import Track from './Track';

function Tracklist(props){

  return(
    <div className={styles.tracklistDiv}>
      {props.searchResults.map((track) => (
        <Track track={track} key={track.id} onAdd={props.onAdd} isRemoval={props.isRemoval} onRemove={props.onRemove}/>
      ))}
    </div>
  )
};

export default Tracklist;