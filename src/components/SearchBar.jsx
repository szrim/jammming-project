import React, {useState} from 'react';
import styles from '../styles/SearchBar.module.css';

function SearchBar(props){
  
  const [term, setTerm] = useState('');

  function passTerm(){
    props.onSearch(term)
  }

  const handleInputChange = ({target}) => {
    setTerm(target.value)
  }

  return(
    <div className={styles.searchDiv}>
      <input className={styles.input} onChange={handleInputChange} placeholder="Search by song or artist..." type="text" value={inputVal}/>
      <button className={styles.btn} onClick={passTerm}>Search</button>
    </div>
  )
}

export default SearchBar;