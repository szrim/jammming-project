import React from 'react';
import Tracklist from './Tracklist';
import styles from '../styles/SearchResults.module.css';

function SearchResults(props){

  return(
    <div className={styles.searchResults}>
      <Tracklist searchResults={props.searchResults} isRemoval={false} onAdd={props.onAdd}/>
    </div>
  )
};

export default SearchResults;