import './App.css';
import React, {useState, useEffect} from 'react';

let ogSonglist  = []

let songs = ogSonglist

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [changeSong, setChangeSong] = useState('')
  const [changeArtist, setChangeArtist] = useState('')
  const [changeAlbum, setChangeAlbum] = useState('')
  const [changeYear, setChangeYear] = useState('')
  const [changeGenre, setChangeGenre] = useState('')

  let lights = true

  useEffect(() => {
    let filteredSongs = ogSonglist.filter(
      (song) => 
          song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.genre.toLowerCase().includes(searchTerm.toLowerCase())
        
      
      
    )
    if (searchTerm == '') {
      filteredSongs = ogSonglist;
    }

    setFilteredSongs(filteredSongs);
    songs = filteredSongs
  }, [searchTerm])



  const lightsOff = () => {
    if (lights) {
      document.body.style.backgroundColor = 'black'
      document.getElementById('dark').style.backgroundColor = 'white'
      document.body.style.color = 'white'
      document.getElementById('banner').style.backgroundColor = '#11016b'
      lights = false
    } else {
      document.body.style.backgroundColor = 'white'
      document.getElementById('dark').style.backgroundColor = 'black'
      document.body.style.color = 'black'
      document.getElementById('banner').style.backgroundColor = '#bbdbee'
      lights = true
    }
  }

  const newSong = () => {
    ogSonglist.push({artist: changeArtist, song: changeSong, album: changeAlbum, year: changeYear, genre: changeGenre, rating: ''})
    songs = ogSonglist
  }


  return (
    <div id="main">
      <div class="banner" id="banner">
        <p class="instructions">MyMusicDB</p> 
        <input class="searchbar" type="text" placeholder='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
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
                <td class="clickThing" onClick={() => document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.artist.replace(" ", "_").toLowerCase()}>{song.artist}</td>
                <td class="clickThing" onClick={() => document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.song.replace(" ", "_").toLowerCase()}>{song.song}</td>
                <td class="clickThing" onClick={() => document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.album.replace(" ", "_").toLowerCase()}>{song.album}</td>
                <td class="clickThing" onClick={() => document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.year.replace(" ", "_").toLowerCase()}>{song.year}</td>
                <td class="clickThing" onClick={() => document.getElementById('wikiFrame').src = "https://en.wikipedia.org/wiki/" + song.genre.replace(" ", "_").toLowerCase()}>{song.genre}</td>
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
        <button>Save Data</button>
      </div>
      <div class="frames">
        <iframe id="wikiFrame" src="https://en.wikipedia.org" width={620} height={480}></iframe>
      </div>
    </div>
  );
}

export default App;
