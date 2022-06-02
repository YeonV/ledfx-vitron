import produce from 'immer'

export const storeSpotify = (set:any) => ({
  spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/4sXMBGaUBF2EjPvrq2Z3US?',
  setSpotifyEmbedUrl: (url: string) => {
    set(produce((state:any) => { state.spotify.spotifyEmbedUrl = url }), false, "spotify/setSpotifyEmbedUrl")
  },
  spotifyAuthToken:'',
  setSpotifyAuthToken: (token:any) => {
    set(produce((state:any) => { state.spotify.spotifyAuthToken = token }), false, "spotify/setSpotifyAuthToken")
  },
  thePlayer:'',
  setThePlayer: (ref: any) => {
    set(produce((state:any) => { state.spotify.setThePlayer = ref }), false, "spotify/setThePlayer")
  },
  swSize:'small',
  setSwSize: (x: any) => {
    set(produce((state:any) => { state.spotify.setSwSize = x || 'small' }), false, "spotify/setSwSize")
  },
  swX: 50,
  setSwX: (x: number) => {
    set(produce((state:any) => { state.spotify.swX = x || 50 }), false, "spotify/setSwX")
  },
  swY: 200,
  setSwY: (y: number) => {
    set(produce((state:any) => { state.spotify.swY = y || 200 }), false, "spotify/setSwY")
  },
  swWidth:300,
  setSwWidth: (width: number) => {
    set(produce((state:any) => { state.spotify.swWidth = width }), false, "spotify/setSwWidth")
  },
  spotifyVol:'',
  setSpotifyVol: (vol: number) => {
    set(produce((state:any) => { state.spotify.spotifyVol = vol }), false, "spotify/setSpotifyVol")
  },
  spotifyPos: 0,
  setSpotifyPos: (pos:any) => {
    set(produce((state:any) => { state.spotify.spotifyPos = pos }), false, "spotify/setSpotifyPos")
  },
  spotifyAuthenticated:false,
  setSpotifyAuthenticated: (val: any) => {
    set(produce((state:any) => { state.spotify.spotifyAuthenticated = val }), false, "spotify/setSpotifyAuthenticated")
  },      
  spotifyData:{},
  setSpotifyData: (type: string,data: any) => {
    set(produce((state:any) => { state.spotify.spotifyData[type] = data }), false, "spotify/setSpotifyData")    
  },
  spotifyDevice:{},
  setSpotifyDevice: (id: string) => {
    set(produce((state:any) => { state.spotify.spotifyDevice = id }), false, "spotify/setSpotifyDevice")
  }  
})
