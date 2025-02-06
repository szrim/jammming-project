import React from 'react';
import styles from '../styles/Track.module.css';

function Track(props){
  
  function renderAction(){
    if(props.isRemoval){
      return <button onClick={passTrackToRemove}>-</button>
    } else {
      return <button onClick={passTrack}>+</button>
    }
  }

  function passTrackToRemove(){
    props.onRemove(props.track)
  }

  const passTrack = () => {
    props.onAdd(props.track)
  }

  return(
    <div className={styles.trackDiv}>
      <h3>{`${props.track.name}  |`}</h3>
      <p>{props.track.artist}</p>
      {renderAction()}
    </div>
  )
};

export default Track;