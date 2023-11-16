import './App.css'; // imports stylesheets
import React, {useState, useEffect} from 'react'; // imports states and effects
import {ImFloppyDisk} from 'react-icons/im'

// original songlist
let ogSonglist  = []
let getSongs = localStorage.getItem('testing')
ogSonglist = JSON.parse(getSongs)

// songs to be displayed
let songs = ogSonglist

function App() {

  // states for input data
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [changeSong, setChangeSong] = useState('')
  const [changeArtist, setChangeArtist] = useState('')
  const [changeAlbum, setChangeAlbum] = useState('')
  const [changeYear, setChangeYear] = useState('')
  const [changeGenre, setChangeGenre] = useState('')

  // is dark mode on?
  let lights = true

  // effect for the search
  useEffect(() => {
    let filteredSongs = []
    if (searchOption = 'all') {
      filteredSongs = []
      filteredSongs = ogSonglist.filter(
        (song) => 
              song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.rating.toLowerCase().includes(searchTerm.toLowerCase())
    
          
      )
    } else if (searchOption = 'artist') {
      filteredSongs = ogSonglist.filter(
        (song) => 
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())          
      )
    }
    if (searchTerm == '') {
      filteredSongs = ogSonglist;
    }

    // displays the filtered songs, puting them into the song array
    setFilteredSongs(filteredSongs);
    songs = filteredSongs
  }, [searchTerm])



  // toggles dark and light mode
  const lightsOff = () => {
    if (lights) {
      document.body.style.backgroundColor = '#202225'
      document.getElementById('dark').style.backgroundColor = 'white'
      document.body.style.color = 'white'
      document.getElementById('banner').style.backgroundColor = '#323232'
      document.getElementById('search').style.backgroundColor = '#40444b'
      lights = false
    } else {
      document.body.style.backgroundColor = 'white'
      document.getElementById('dark').style.backgroundColor = 'black'
      document.body.style.color = 'black'
      document.getElementById('banner').style.backgroundColor = '#bbdbee'
      document.getElementById('search').style.backgroundColor = '#FFFFFF'
      lights = true
    }
  }

  // adds a new song to the original song list
  const newSong = () => {
      ogSonglist.push({artist: changeArtist, song: changeSong, album: changeAlbum, year: changeYear, genre: changeGenre, rating: ''})
      songs = ogSonglist
  }


  const saveData = () => {    
    let arrayStr = JSON.stringify(ogSonglist)
    localStorage.setItem('testing', arrayStr)

  }

  let searchOption = ''
  const changeSearch = () => {
    searchOption = document.getElementById('searchOpt').value
  }

  // return function
  return (
    <div id="main">
      <div class="banner" id="banner">
        <p class="instructions">MyMusicDB</p> 
        <input  id='search' class="searchbar" type="text" placeholder='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
        <select id='searchOpt' onChange={changeSearch}>
          <option value='all'>All</option>
          <option value='artist'>Artist</option>
          <option value='song'>Song</option>
          <option value='album'>Album</option>
          <option value='year'>Year</option>
          <option value='genre'>Genre</option>
          <option value='rating'>Rating</option>
        </select>
        <button class="darkToggle" id="dark" onClick={lightsOff}></button>
      </div>
      <div class="tableDiv">
        <table class="mainTable">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Song</th>
              <th>Album</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr>
                <td class="clickThing" onClick={() => {document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.artist.replace(" ", "_")
                                                      document.getElementById('bandcampFrame').src = "https://bandcamp.com/search?q=" + song.artist.replace(" ", "%2B") + "&itemItype"}}>{song.artist}</td>
                <td class="clickThing" onClick={() => {document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.song.replace(" ", "_")
                                                      document.getElementById('bandcampFrame').src = "https://bandcamp.com/search?q=" + song.song.replace(" ", "%2B") + "&itemItype"}}>{song.song}</td>
                <td class="clickThing" onClick={() => {document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.album.replace(" ", "_")
                                                      document.getElementById('bandcampFrame').src = "https://bandcamp.com/search?q=" + song.album.replace(" ", "%2B") + "&itemItype"}}>{song.album}</td>
                <td class="clickThing" onClick={() => {document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.year.replace(" ", "_")
                                                      document.getElementById('bandcampFrame').src = "https://bandcamp.com/search?q=" + song.artist.replace(" ", "%2B") + "&itemItype"}}>{song.year}</td>
                <td class="clickThing" onClick={() => {document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.genre.replace(" ", "_")
                                                      document.getElementById('bandcampFrame').src = "https://bandcamp.com/search?q=" + song.genre.replace(" ", "%2B") + "&itemItype"}}>{song.genre}</td>
                <td><select id="rateSel" name="rating" onChange={() => song.rating = document.getElementById('rateSel').value}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  </select></td>
              </tr>
            ))}
            <tr>
              <td>
                <input id="addArtist" type='text' placeholder='add artist' value={changeArtist} onChange={(e) => setChangeArtist(e.target.value)}></input>
              </td>
              <td>
                <input id="addSong" type='text' placeholder='add song' value={changeSong} onChange={(e) => setChangeSong(e.target.value)}></input>
              </td>
              <td>
                <input id="addAlbum" type='text' placeholder='add album' value={changeAlbum} onChange={(e) => setChangeAlbum(e.target.value)}></input>
              </td>
              <td>
                <input id="addYear" type='text' placeholder='add year' value={changeYear} onChange={(e) => setChangeYear(e.target.value)}></input>
              </td>
              <td>
                <input id="addGenre" type="text" placeholder='add genre' value={changeGenre} onChange={(e) => setChangeGenre(e.target.value)}></input>
              </td>
              <td>
                <button onClick={newSong}>Add Song</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class='save'><ImFloppyDisk onClick={saveData}/><br></br>save</p>
      </div>
      <p class="stats">Songs Entered : {ogSonglist.length}</p>
      <div class="frames">
        <iframe id="wikiFrame" src="https://en.wikipedia.org" width={620} height={480}></iframe>
        <iframe id="bandcampFrame" src="https://bandcamp.com" width={620} height={480}></iframe>
      </div>
    </div>
  );
}

export default App;

