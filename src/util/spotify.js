let accessToken;
const clientID = '33c61978d4d546e5aebd9458dea31b91';
const redirectUrl = "http://localhost:5173";

const Spotify = {
  getAccessToken(){
    if(accessToken) return accessToken;

    console.log("URL:", window.location.href);


    const token = window.location.href.match(/access_token=([^&]*)/)
    const expiry = window.location.href.match(/expires_in=([^&]*)/)

    if(token && expiry){
      accessToken= token[1];
      const expiresIn = Number(expiry[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access token", null, "/");

      return accessToken;
    }

    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;

    window.location = redirect;

  },

  search(term){
    accessToken = Spotify.getAccessToken();
    console.log(accessToken)
    return fetch(`https://api.spotify.com/v1/search/?type=track&q=${term}`,{
      method: 'GET',
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then(jsonRes => {
      if(!jsonRes){
        console.error('Response error')
      }

      return jsonRes.tracks.items.map(t => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri
      }))
    })
  },

  savePlaylist(name, trackUris){
    if(!name || !trackUris) return;

    const token = Spotify.getAccessToken();
    const header = {Authorization: `Bearer ${token}`};
    let userId;
    return fetch('https://api.spotify.com/v1/me', {
      headers: header
    }).then(res => res.json())
    .then((jsonRes) => {
      userId = jsonRes.id;
      let playlistId;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({name: name})
      }) 
      .then(res => res.json())
      .then(jsonRes => {
        playlistId = jsonRes.id

        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: header,
          body: JSON.stringify({uris: trackUris})
        })
      })
    })
  }
};

export default Spotify;